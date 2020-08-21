const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");

const EpListSchema = new Schema({
    
    fandom: { type: String, required: true },

    eps: [{ type: mongoose.Schema.Types.ObjectId, ref: "Episode" }],

    // authorId: { type: String, required: false },
});

module.exports = mongoose.model("EpList", EpListSchema);