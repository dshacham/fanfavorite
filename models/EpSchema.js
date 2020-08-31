const mongoose = require("mongoose");
const { Schema } = mongoose;


const EpSchema = new Schema({

    title: { type: String, required: true },

    season: { type: Number, required: true },

    number: { type: Number, required: true },

    whyFave: { type: String, required: false },

    source: { type: String, required: false },

    listId: { type: String, required: true },

    userId: { type: String, required: true },
});

module.exports = mongoose.model("Episode", EpSchema);