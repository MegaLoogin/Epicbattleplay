import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { router } from "./router/index.js";
import cookieParser from "cookie-parser";
import error from "./middle/error.js";

const app = express();
const {MONGO_USER, MONGO_PASS, MONGO_DB} = process.env;

app.use(cors({
    credentials: true
}));
app.use(express.json());
// app.use(express.urlencoded());
app.use(cookieParser());
app.use(router);
app.use(error);

(async () => {
    await mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASS}@mongodb:27017/${MONGO_DB}?authSource=admin`);
    app.listen(8181, () => console.log("Backend started!"));
})();

