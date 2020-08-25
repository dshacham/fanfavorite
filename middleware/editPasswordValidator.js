const { body, validationResult } = require("express-validator");

exports.editPasswordValidator = () => {
    return [
        body("password")
        .isLength({ min: 6 })
        .trim()
        .withMessage("Password must be at least 6 characters long."),
        

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