import userModelDb from "../models/user-model.js";
import tokenService from "./token-service.js";
import { ApiError } from "../middle/error.js";
import bcrypt from "bcrypt";

class UserService{
    async registration(email, password, dbName){
        const userModel = userModelDb(dbName);
        const can = await userModel.findOne({email});
        if(can) throw ApiError.BadRequest("User already exists");
        console.log(email, password)
        const hash = await bcrypt.hash(password, 3);
        const user = await userModel.create({email, password: hash});
        
        const session = await tokenService.saveToken(user._id, null, null, dbName);
        const tokens = tokenService.generateTokens({email: user.email, id: user._id, session});
        await tokenService.saveToken(user._id, tokens.refreshToken, session, dbName);

        return {...tokens, session};
    }

    async login(email, password, dbName){
        const userModel = userModelDb(dbName);
        const user = await userModel.findOne({email});
        if(!user) throw ApiError.BadRequest("User not found");
        
        const isPass = await bcrypt.compare(password, user.password);
        if(!isPass) throw ApiError.BadRequest("Incorrect password");

        const session = await tokenService.saveToken(user._id, null, null, dbName);
        const tokens = tokenService.generateTokens({email: user.email, id: user._id, session});
        await tokenService.saveToken(user._id, tokens.refreshToken, session, dbName);

        return {...tokens, session};
    }

    async logout(refreshToken, dbName){
        // const userModel = userModelDb(dbName);
        const token = await tokenService.removeToken(refreshToken, dbName);
        return token;
    }

    async refresh(refreshToken, dbName){
        // const userModel = userModelDb(dbName);
        if(!refreshToken) throw ApiError.UnauthorizedError();

        const userData = tokenService.validateToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken, dbName);

        if(!userData || !tokenFromDb) throw ApiError.UnauthorizedError();

        const tokens = tokenService.generateTokens({email: userData.email, id: userData.id, session: userData.session});
        await tokenService.saveToken(userData.id, tokens.refreshToken, userData.session, dbName);

        return {...tokens, session: userData.session};
    }

    async getUserByToken(refreshToken, dbName){
        const userModel = userModelDb(dbName);

        const tokenFromDb = await tokenService.findToken(refreshToken, dbName);

        if(!tokenFromDb) throw ApiError.BadRequest("token not found " + tokenFromDb);

        return await userModel.findById(tokenFromDb.user);
    }

    async getUsers(dbName){
        const userModel = userModelDb(dbName);
        const users = await userModel.find();
        return users;
    }
}

export default new UserService();