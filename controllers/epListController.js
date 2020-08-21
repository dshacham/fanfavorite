const createError = require("http-errors");
const EpsList = require("../models/EpsListSchema");
const User = require("../models/UserSchema");
const env = require("../config/config");

exports.getEpLists = async (req, res, next) => {
    try {
        const epLists = await EpsList.find();
        res.json({ success: true, epLists: epLists });
    }
    catch (err) {
        next(err);
    };
};

exports.getEpList = async (req, res, next) => {
    const { id } = req.params;

    try {
        const epList = await EpsList.findById(id);
        if (!epList) throw createError(404);
        res.json({ success: true, epList: epList });
    }
    catch (err) {
        next(err);
    };
};

exports.postEpList = async (req, res, next) => {
    try {
        const newEpList = new EpsList(req.body);
        // ({
        //     title: req.body.title,
        //     season: req.body.season,
        //     number: req.body.number,
        //     whyFave: req.body.whyFave,
        //     source: req.body.source,
        //     // authorId: req.user._id
        // });
        await newEpList.save();
        let userData = await User.findById(req.user._id);
        userData.epsLists.push(newEpList._id);
        userData.save();

        res.json({ success: true, epList: newEpList, user: userData });
    }
    catch (err) {
        next(err);
    };
};

exports.putEpList = async (req, res, next) => {
    const { id } = req.params;
    const epList = req.body;

    try {
        const updateEpList = await EpsList.findByIdAndUpdate(id, ep, { new: true });
        if (!epList) throw createError(404);
        res.json({ success: true, epList: updateEpList });
    }
    catch (err) {
        next(err);
    };
};

exports.deleteEpList = async (req, res, next) => {
    const { id } = req.params;

    try {
        const epList = await EpList.findByIdAndDelete(id);
        if (!epList) throw createError(404);
        const epLists = await EpList.find({});
        res.json({ success: true, epList: epLists });
    }
    catch (err) {
        next(err);
    };
};