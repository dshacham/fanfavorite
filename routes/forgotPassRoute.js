const emailRouter = require("express").Router();
const { sendPasswordResetEmail, receiveNewPassword } = require("../controllers/emailController");

emailRouter.post("/user/:email", sendPasswordResetEmail);
emailRouter.post("/receive_new_password/:userId/:resetToken", receiveNewPassword);

module.exports = emailRouter;