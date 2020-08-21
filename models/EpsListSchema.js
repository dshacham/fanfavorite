const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");

const EpsListSchema = new Schema({
    
    fandom: { type: String, required: true },

    listType: { type: String, default: "episodes", required: true },

    eps: [{ type: mongoose.Schema.Types.ObjectId, ref: "Episode" }],

    // authorId: { type: String, required: false },
});


module.exports = mongoose.model("EpsList", EpsListSchema);
