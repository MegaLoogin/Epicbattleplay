import { Router } from "express";
import userController from "../controllers/user-controller.js";
import auth from "../middle/auth.js";

export const router = new Router();

router.get("/test2", (req, res, next) => {
    try{
        return res.json({"status": "alive"});
    }catch(e){
        next(e);
    }
});

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);

router.get("/test", auth, (req, res, next) => {
    try{
        return res.json({"status": "alive"});
    }catch(e){
        next(e);
    }
});