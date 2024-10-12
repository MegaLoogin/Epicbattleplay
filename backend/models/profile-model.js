import mongoose, { Schema, model } from "mongoose";

const ProfileSchema = new Schema({
    uuid: {type: String, unique: true, requried: true},
    tags: String,
    email: String,
    title: String,
    status: {type: String, default: "unknown"},
    lastUpdate: {type: Date, default: Date.now},
    lastTry: {type: Date, default: 0},
    process: {type: String, default: "stopped"},
    description: String,
    cost: {type: Number, default: 0},
    nextStart: {type: Date, default: Date.now},
    action: {type: String, default: "check"},
    billingAddress: {
        address: String,
        code: String,
        city: String,
        country: String
    },
    data: {
        _type: String,
        ocid: Number,
        ocids: Array,
        googleAdsId: String,
        billingId: String,
        c: Number,
        u: Number,
        euid: Number,
        campaignId: String,
        geo: String, 
        geoTag: String
    },
    logs: {type: [{}], default: []},
}, { versionKey: false });

export default model('Profile', ProfileSchema);