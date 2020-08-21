const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");
const jwt = require("jsonwebtoken");
const { encrypt, compare } = require("../lib/encryption");
const env = require("../config/config");


const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: "User", required: true },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    password: { type: String, required: true },
    ficLists: [{ type: mongoose.Schema.Types.ObjectId, ref: "FicList" }],
    epsLists: [{ type: mongoose.Schema.Types.ObjectId, ref: "EpsList" }],
    fics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fic" }],
    eps: [{ type: mongoose.Schema.Types.ObjectId, ref: "Episode" }],
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, env.jwt_key).toString();
    user.tokens.push({ token });
    return token;
};

UserSchema.methods.getPublicFields = function () {
    let returnObject = {
        username: this.username,
        email: this.email,
        password: this.password,
        ficLists: this.ficLists,
        epsLists: this.epsLists,
        fics: this.fics,
        eps: this.eps,
        _id: this._id
    }
    return returnObject;
};

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await encrypt(this.password);
    next();
});

UserSchema.methods.checkPassword = async function (password) {
    const user = this;
    return await compare(password, user.password);
};

UserSchema.statics.findByToken = function (token) {
    const User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, env.jwt_key);
    } catch (err) {
        return;
    }

    return User.findOne({ _id: decoded._id }).select("-password -__v");
};

module.exports = mongoose.model("User", UserSchema);