import { Router } from "express";
import userController from "../controllers/user-controller.js";
import auth from "../middle/auth.js";

export const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/refresh", userController.refresh);

router.post('/sendContact', async (req, res, next) => {
    try{
        const { name, email } = req.body;
        const txt = `<b></b>Name: ${name}%0A<b>Email: </b>${email}`;
        const resp = await fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}&parse_mode=html&text=${txt}`);
        return res.status(resp.status).send("OK");
    }catch(e){
        console.log(e);
        next(e);
    }
});

router.post("/get", auth, userController.get);
router.post("/subCoins", auth, userController.subCoins);
router.post("/addCoins", auth, userController.addCoins);