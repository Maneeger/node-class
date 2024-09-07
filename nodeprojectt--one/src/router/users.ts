import { Router } from "express";
import { getallusers } from "../controller/user";
import { isAuthenticated } from "middleware";

export default (router: Router) => {
  router.get("/getallusers", isAuthenticated, getallusers);
};
