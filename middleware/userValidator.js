const { body, validationResult } = require("express-validator");
const User = require("../models/UserSchema");

exports.validateUser = () => {
    return [
        body("username")
            .isLength({ min: 6 })
            .trim()
            .withMessage("Username must be at least 6 characters long.")
            .custom((value, {req}) => {
                return new Promise((resolve, reject) => {
                  User.findOne({username: req.body.username}, function(err, user){
                    if (err) {
                      reject(new Error('Server Error'));
                    }
                    if (Boolean(user)) {
                      reject(new Error('Username already in use'));
                    }
                    resolve(true);
                  });
                });
              }),

        body("email")
            .isEmail()
            .normalizeEmail()
            .trim()
            .withMessage("Invalid email")
            .custom((value, {req}) => {
                return new Promise((resolve, reject) => {
                  User.findOne({email: req.body.email}, function(err, user){
                    if (err) {
                      reject(new Error('Server Error'));
                    }
                    if (Boolean(user)) {
                      reject(new Error('E-mail already in use'));
                    }
                    resolve(true);
                  });
                });
              }),

        body("password")
            .isLength({ min: 6 })
            .trim()
            .withMessage("Password is too short"),

        (req, res, next) => {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                let err = errors.errors.map(er => ({ [er.param]: er.msg }));
                return res.json({ status: 203, message: err });
            };
            next();
        }
    ];
};