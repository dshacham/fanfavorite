const createError = require("http-errors");
const EpsList = require("../models/EpsListSchema");
const Episode = require("../models/EpSchema");
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
        const updateEpList = await EpsList.findByIdAndUpdate(id, epList, { new: true });
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
        const epList = await EpsList.findByIdAndDelete(id);
        const epLists = await EpsList.find({});
        Episode.deleteMany({ listId: id }).then(function() { 
            console.log("Data deleted");
        }).catch(function(error){ 
            console.log(error);
        }); 
        if (!epList) throw createError(404);
        res.json({ success: true, epList: epLists });
    }
    catch (err) {
        next(err);
    };
};