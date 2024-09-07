import { Request, Response } from "express";
import { getusers } from "../db/users";

export const getallusers = async (req: Request, res: Response) => {
  try {
    const users = await getusers();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

// assignment

// only users with a user type of 1
// should access get 'all users'
