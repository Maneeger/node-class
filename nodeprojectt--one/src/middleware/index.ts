import { NextFunction, Request, Response } from "express";
import { get, merge } from "lodash";
import { getuserbysesssiontoken } from "../db/users";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessiontoken = req.cookies["ebube"];
    if (!sessiontoken) {
      return res.sendStatus(403);
    }
    const existinguser = await getuserbysesssiontoken(sessiontoken);
    if (!existinguser) {
      return res.sendStatus(403);
    }
    merge(req, { identity: existinguser });
    return next();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
