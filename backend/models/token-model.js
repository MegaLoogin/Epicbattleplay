import mongoose, { Schema, model } from "mongoose";

const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, requried: true}
});

const dbs = process.env.MONGO_DB.split(',');

export default function (dbName) {
    if(dbs.includes(dbName)){
        const db = mongoose.connection.useDb(dbName, { useCache: true });
        return db.model('Token', TokenSchema);
    }
}