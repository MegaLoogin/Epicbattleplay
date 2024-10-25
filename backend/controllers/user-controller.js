import userService from "../service/user-service.js";

const maxAge = 30 * 24 * 60 * 60 * 1000

class UserController{
    async registration(req, res, next){
        try{
            const {email, password, host} = req.body;
            const userData = await userService.registration(email, password, host);
            res.cookie('refreshToken', userData.refreshToken, {maxAge, httpOnly: true});
            res.cookie('session', userData.session, {httpOnly: true});
            return res.json(userData);
        }catch(e){
            next(e);
        }
    }

    async login(req, res, next){
        try{
            const {email, password, host} = req.body;
            const userData = await userService.login(email, password, host);
            res.cookie('refreshToken', userData.refreshToken, {maxAge, httpOnly: true})
            res.cookie('session', userData.session, {httpOnly: true});
            return res.json(userData);
        }catch(e){
            next(e);
        }
    }

    async logout(req, res, next){
        try{
            const { host } = req.body;
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken, host);
            res.clearCookie('refreshToken');
            res.clearCookie('session');
            return res.json(token);
        }catch(e){
            next(e);
        }
    }

    async refresh(req, res, next){
        try{
            const { host } = req.body;
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken, host);
            res.cookie('refreshToken', userData.refreshToken, {maxAge, httpOnly: true});
            return res.json(userData);
        }catch(e){
            next(e);
        }
    }

    async get(req, res, next){
        try{
            const { host } = req.body;
            const { refreshToken } = req.cookies;
            const userData = await userService.getUserByToken(refreshToken, host);
            return res.json({email: userData.email, coins: userData.coins});
        }catch(e){
            next(e);
        }
    }

    async subCoins(req, res, next){
        try{
            const { refreshToken } = req.cookies;
            const { count, host } = req.body;
            const userData = await userService.getUserByToken(refreshToken, host);

            if(userData.coins - count >= 0){
                userData.coins -= count;
                await userData.save();

                return res.json({'status': 'success', 'count': userData.coins});
            }else{
                return res.json({'status': 'error'});
            }
        }catch(e){
            next(e);
        }
    }

    async addCoins(req, res, next){
        try{
            const { refreshToken } = req.cookies;
            const { count, host } = req.body;
            const userData = await userService.getUserByToken(refreshToken, host);

            userData.coins += count;
            await userData.save();

            return res.json({'status': 'success', 'count': userData.coins});
        }catch(e){
            next(e);
        }
    }
}

export default new UserController();