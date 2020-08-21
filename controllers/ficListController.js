const createError = require("http-errors");
const FicList = require("../models/ficListSchema");
const User = require("../models/UserSchema");
const env = require("../config/config");


exports.getFicLists = async (req, res, next) => {
    try {
        const ficLists = await FicList.find();
        res.json({ success: true, ficLists: ficLists });
    }
    catch (err) {
        next(err);
    };
};

exports.getFicList = async (req, res, next) => {
    const { id } = req.params;

    try {
        const ficList = await FicList.findById(id);
        if (!ficList) throw createError(404);
        res.json({ success: true, ficList: ficList });
    }
    catch (err) {
        next(err);
    };
};

exports.postFicList = async (req, res, next) => {
    try {
        const newFicList = new FicList(req.body);
        // ({
        //     fandom: req.body.fandom,
        //     fics: req.body.fics,
        //     ship: req.body.ship,
        //     genre: req.body.genre,
        //     description: req.body.description,
        //     source: req.body.source,
        //     // authorId: req.user._id
        // });
        await newFicList.save();
        let userData = await User.findById(req.user._id);
        userData.ficLists.push(newFicList._id);
        userData.save();

        res.json({ success: true, ficList: newFicList, user: userData });
    }
    catch (err) {
        next(err);
    };
};

exports.putFicList = async (req, res, next) => {
    const { id } = req.params;
    const ficList = req.body;

    try {
        const updateFicList = await FicList.findByIdAndUpdate(id, ficList, { new: true });
        if (!ficList) throw createError(404);
        res.json({ success: true, ficList: updateFicList });
    }
    catch (err) {
        next(err);
    };
};

exports.deleteFicList = async (req, res, next) => {
    const { id } = req.params;

    try {
        const ficList = await FicList.findByIdAndDelete(id);
        if (!ficList) throw createError(404);
        const ficLists = await FicList.find({});
        res.json({ success: true, ficList: ficLists });
    }
    catch (err) {
        next(err);
    };
};