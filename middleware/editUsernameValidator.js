const { body, validationResult } = require("express-validator");
const User = require("../models/UserSchema");

exports.editUsernameValidator = () => {
    return [
        body("username")
            .isLength({ min: 4 })
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