import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    email: {type: String, unique: true, requried: true},
    password: {type: String, requried: true},
    coins: {type: Number, default: 100}
});

const dbs = process.env.MONGO_DB.split(',');

export default function(dbName){
    if(dbs.includes(dbName)){
        const db = mongoose.connection.useDb(dbName, { useCache: true });
        return db.model('User', UserSchema);
    }
}