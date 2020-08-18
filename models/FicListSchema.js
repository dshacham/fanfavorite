const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");
const jwt = require("jsonwebtoken");

const FicListSchema = new Schema({
    
    fandom: { type: String, required: true, unique: true },

    fics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fic" }],

    // authorId: { type: String, required: false },
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("FicList", FicListSchema);