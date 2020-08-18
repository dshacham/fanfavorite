const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");
const jwt = require("jsonwebtoken");

const EpListSchema = new Schema({
    
    fandom: { type: String, required: true, unique: true },

    eps: [{ type: mongoose.Schema.Types.ObjectId, ref: "Episode" }],

    // authorId: { type: String, required: false },
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("EpList", EpListSchema);