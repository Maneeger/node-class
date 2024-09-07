import express, { Request, Response } from "express";
import { createuser, getusersbyemail } from "../db/users";
import { random, authentication } from "../helper";

export const register = async (req: Request, res: Response) => {
  try {
    const { fullname, email, phone, userType, password } = req.body;
    if (!fullname || !email || !phone || !userType || !password) {
      console.log("all fields are required");

      return res.sendStatus(400);
    }
    const existingemail = await getusersbyemail(email);
    if (existingemail) {
      console.log;
      ("email already exists");
      return res.sendStatus(400);
    }
    const salt = random();
    const user = await createuser({
      fullname,
      email,
      phone,
      userType,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getusersbyemail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) {
      return res.sendStatus(400);
    }
    const expectedhash = authentication(user.authentication.salt, password);
    if (user.authentication.password != expectedhash) {
      return res.sendStatus(403);
    }
    const salt = random();
    user.authentication.sessiontoken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();

    res.cookie("ebube", user.authentication.sessiontoken, {
      domain: "localhost",
      path: "/",
    });
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
