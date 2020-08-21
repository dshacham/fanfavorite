const createError = require("http-errors");
const Episode = require("../models/epSchema");
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
        const newEp = new Episode({
            title: req.body.title,
            season: req.body.season,
            number: req.body.number,
            whyFave: req.body.whyFave,
            source: req.body.source,
            // authorId: req.user._id
        });
        await newEp.save();
        let userData = await User.findById(req.user._id);
        userData.eps.push(newEp._id);
        userData.save();

        res.json({ success: true, ep: newEp, user: userData });
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
        if (!ep) throw createError(404);
        res.json({ success: true, ep: updateEp });
    }
    catch (err) {
        next(err);
    };
};

exports.deleteEp = async (req, res, next) => {
    const { id } = req.params;

    try {
        const ep = await Episode.findByIdAndDelete(id);
        if (!ep) throw createError(404);
        const eps = await Episode.find({});
        res.json({ success: true, ep: eps });
    }
    catch (err) {
        next(err);
    };
};