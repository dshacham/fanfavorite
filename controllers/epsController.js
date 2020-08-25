const createError = require("http-errors");
const Episode = require("../models/EpSchema");
const EpList = require("../models/EpsListSchema");
const User = require("../models/UserSchema");
const env = require("../config/config");


exports.getEps = async (req, res, next) => {
    try {
        const eps = await Episode.find();
        res.json({ success: true, eps: eps });
    }
    catch (err) {
        next(err);
    };
};

exports.getEp = async (req, res, next) => {
    const { id } = req.params;

    try {
        const ep = await Episode.findById(id);
        if (!ep) throw createError(404);
        res.json({ success: true, ep: ep });
    }
    catch (err) {
        next(err);
    };
};

exports.postEp = async (req, res, next) => {
    try {
        const newEp = new Episode(req.body);
        await newEp.save();
        let userData = await User.findById(req.user._id);
        let listData = await EpList.findById(req.body.listId);
        listData.eps.push(newEp._id);
        userData.save();
        listData.save();

        res.json({ success: true, ep: newEp, epList: listData, user: userData });
    }
    catch (err) {
        next(err);
    };
};

exports.putEp = async (req, res, next) => {
    const { id } = req.params;
    const ep = req.body;

    try {
        const updateEp = await Episode.findByIdAndUpdate(id, ep, { new: true });
        let listData = await EpList.findById(ep.listId);
        if (!ep) throw createError(404);
        res.json({ success: true, ep: updateEp, epList: listData });
    }
    catch (err) {
        next(err);
    };
};

exports.deleteEp = async (req, res, next) => {
    const { id } = req.params;

    try {
        const epData = await Episode.findById(id);
        const ep = await Episode.findByIdAndDelete(id);
        const eps = await Episode.find();
        const epList = await EpList.findById(epData.listId);
        epList.eps.pull({_id: id});
        epList.save();
        if (!ep) throw createError(404);
        res.json({ success: true, epList: epList });
    }
    catch (err) {
        next(err);
    };
};