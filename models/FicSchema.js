const mongoose = require("mongoose");
const { Schema } = mongoose;


const FicSchema = new Schema({

    fandom: { type: String, required: true },

    title: { type: String, required: true },

    author: { type: String, required: true },

    ship: { type: String, required: true },

    genre: { type: String, required: true },

    description: { type: String, required: true },

    source: { type: String, required: true },

    // authorId: { type: String, required: false },
});

module.exports = mongoose.model("Fic", FicSchema);