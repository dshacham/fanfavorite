const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");

const FicListSchema = new Schema({
    
    fandom: { type: String, required: true },

    fics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fic" }],

    // authorId: { type: String, required: false },
});

module.exports = mongoose.model("FicList", FicListSchema);