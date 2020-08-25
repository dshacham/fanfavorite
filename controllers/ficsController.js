const createError = require("http-errors");
const Fic = require("../models/FicSchema");
const FicList = require("../models/FicListSchema");
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
        const newFic = new Fic(req.body);
        await newFic.save();
        let userData = await User.findById(req.user._id);
        let listData = await FicList.findById(req.body.listId);
        listData.fics.push(newFic._id);
        userData.save();
        listData.save();

        res.json({ success: true, fic: newFic, ficList: listData, user: userData });
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
        let listData = await FicList.findById(fic.listId);
        if (!fic) throw createError(404);
        res.json({ success: true, fic: updateFic, ficList: listData });
    }
    catch (err) {
        next(err);
    };
};

exports.deleteFic = async (req, res, next) => {
    const { id } = req.params;

    try {
        const ficData = await Fic.findById(id);
        const fic = await Fic.findByIdAndDelete(id);
        const fics = await Fic.find();
        const ficList =  await FicList.findById(ficData.listId);
        ficList.fics.pull({_id: id});
        ficList.save();
        if (!fic) throw createError(404);
        res.json({ success: true, fics: fics, ficList: ficList });
    }
    catch (err) {
        next(err);
    };
};