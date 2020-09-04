const createError = require("http-errors");
const User = require("../models/UserSchema");
const { encrypt } = require("../lib/encryption");


exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json({ success: true, users: users });
    } catch (err) {
        next(err);
    }
};

exports.getUser = async (req, res, next) => {
    const { token } = req.header;
    const { id } = req.user;
    try {
        const user = await User.findById(id).populate("ficLists").populate("epsLists").exec();
        res.json({ success: true, user: user });
    } catch (err) {
        next(err);
    }
};

exports.putUserInfo = async (req, res, next) => {
    const user = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(req.user._id, user, { new: true }).populate("ficLists").populate("epsLists").exec();
        const users = await User.find();
        if (!updatedUser) throw createError(500);

        res.json({ success: true, user: updatedUser, users: users });
    } catch (err) {
        next(err);
    }
};

exports.putPassword = async (req, res, next) => {
    const user = req.body;

    try {
        if (Object.keys(req.body).includes("password")) {
            const hashedPassword = await encrypt(user.password);
            user.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(req.user._id, user, { new: true }).populate("ficLists").populate("epsLists").exec();
        if (!updatedUser) throw createError(500);

        res.json({ success: true, user: updatedUser });
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) throw createError(404);
        res.json({ success: true, user: user });
    } catch (err) {
        next(err);
    }
};
