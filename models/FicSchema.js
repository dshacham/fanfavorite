const mongoose = require("mongoose");
const { Schema } = mongoose;


const FicSchema = new Schema({

    title: { type: String, required: true },

    author: { type: String, required: true },

    ship: { type: String, required: true },

    genre: { type: String, required: false },

    description: { type: String, required: false },

    source: { type: String, required: true },

    listId: { type: String, required: true },

    userId: { type: String, required: true },
});


module.exports = mongoose.model("Fic", FicSchema);