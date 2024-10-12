import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    email: {type: String, unique: true, requried: true},
    password: {type: String, requried: true},
    coins: {type: Number, default: 100}
});

export default model('User', UserSchema);