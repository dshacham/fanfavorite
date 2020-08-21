const mongoose = require("mongoose");
const { Schema } = mongoose;


const EpSchema = new Schema({

    fandom: { type: String, required: true },

    title: { type: String, required: true },

    season: { type: String, required: true },

    number: { type: String, required: true },

    whyFave: { type: String, required: true },

    source: { type: String, required: false },

    // authorId: { type: String, required: false },
});

module.exports = mongoose.model("Episode", EpSchema);