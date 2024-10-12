import userModel from "../models/user-model.js";
import tokenService from "./token-service.js";
import { ApiError } from "../middle/error.js";
import bcrypt from "bcrypt";

class UserService{
    async registration(email, password){
        const can = await userModel.findOne({email});
        if(can) throw ApiError.BadRequest("User already exists");
        console.log(email, password)
        const hash = await bcrypt.hash(password, 3);
        const user = await userModel.create({email, password: hash});
        
        const session = await tokenService.saveToken(user._id);
        const tokens = tokenService.generateTokens({email: user.email, id: user._id, session});
        await tokenService.saveToken(user._id, tokens.refreshToken, session);

        return {...tokens, session};
    }

    async login(email, password){
        const user = await userModel.findOne({email});
        if(!user) throw ApiError.BadRequest("User not found");
        
        const isPass = await bcrypt.compare(password, user.password);
        if(!isPass) throw ApiError.BadRequest("Incorrect password");

        const session = await tokenService.saveToken(user._id);
        const tokens = tokenService.generateTokens({email: user.email, id: user._id, session});
        await tokenService.saveToken(user._id, tokens.refreshToken, session);

        return {...tokens, session};
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken) throw ApiError.UnauthorizedError();

        const userData = tokenService.validateToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if(!userData || !tokenFromDb) throw ApiError.UnauthorizedError();

        const tokens = tokenService.generateTokens({email: userData.email, id: userData.id, session: userData.session});
        await tokenService.saveToken(userData.id, tokens.refreshToken, userData.session);

        return {...tokens, session: userData.session};
    }

    async getUserByToken(refreshToken){
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if(!tokenFromDb) throw ApiError.BadRequest("token not found " + tokenFromDb);

        return await userModel.findById(tokenFromDb.user);
    }

    async getUsers(){
        const users = await userModel.find();
        return users;
    }
}

export default new UserService();