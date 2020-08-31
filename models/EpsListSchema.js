const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");

const EpsListSchema = new Schema({
    
    listFandom: { type: String, required: true },

    listType: { type: String, default: "episodes", required: true },

    eps: [{ type: mongoose.Schema.Types.ObjectId, ref: "Episode" }],

    userId: { type: String, required: true },
});


module.exports = mongoose.model("EpsList", EpsListSchema);
