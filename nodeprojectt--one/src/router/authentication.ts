import { register, login } from "../controller/authentication";
import express, { Router } from "express";

export default (router: Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};
