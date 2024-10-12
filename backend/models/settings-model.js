import mongoose, { Schema, model } from "mongoose";

const SettingsSchema = new Schema({
    maxStackSize: Number,
    maxAttemptsCount: Number,
    attemptRetry: Number,
    updateRetry: Number
});

export default model('Settings', SettingsSchema);