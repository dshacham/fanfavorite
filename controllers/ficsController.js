const createError = require("http-errors");
const Fic = require("../models/FicSchema");
const User = require("../models/UserSchema");
const env = require("../config/config");


exports.getFics = async (req, res, next) => {
    try {
        const fics = await Fic.find();
        res.json({ success: true, fics: fics });
    }
    catch (err) {
        next(err);
    };
};

exports.getFic = async (req, res, next) => {
    const { id } = req.params;

    try {
        const fic = await Fic.findById(id);
        if (!fic) throw createError(404);
        res.json({ success: true, fic: fic });
    }
    catch (err) {
        next(err);
    };
};

exports.postFic = async (req, res, next) => {
    try {
        const newFic = new Fic({
            fandom: req.body.fandom,
            title: req.body.title,
            author: req.body.author,
            ship: req.body.ship,
            genre: req.body.genre,
            description: req.body.description,
            source: req.body.source,
            // authorId: req.user._id
        });
        await newFic.save();
        let userData = await User.findById(req.user._id);
        userData.fics.push(newFic._id);
        userData.save();

        res.json({ success: true, fic: newFic, user: userData });
    }
    catch (err) {
        next(err);
    };
};

exports.putFic = async (req, res, next) => {
    const { id } = req.params;
    const fic = req.body;

    try {
        const updateFic = await Fic.findByIdAndUpdate(id, fic, { new: true });
        if (!fic) throw createError(404);
        res.json({ success: true, fic: updateFic });
    }
    catch (err) {
        next(err);
    };
};

exports.deleteFic = async (req, res, next) => {
    const { id } = req.params;

    try {
        const fic = await Fic.findByIdAndDelete(id);
        if (!fic) throw createError(404);
        const fics = await Fic.find({});
        res.json({ success: true, fic: fics });
    }
    catch (err) {
        next(err);
    };
};