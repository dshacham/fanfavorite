const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");

const FicListSchema = new Schema({
    
    listFandom: { type: String, required: true },

    listType: { type: String, default: "fanfiction" },

    fics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fic" }],

    userId: { type: String, required: true },
});

module.exports = mongoose.model("FicList", FicListSchema);
