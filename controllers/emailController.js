const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const User = require("../models/UserSchema");
const { getPasswordResetURL, resetPasswordTemplate } = require("../modules/email");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

const usePasswordHashToMakeToken = ({password: passwordHash, _id: userId, createdAt }) => {
  const secret = passwordHash + "-" + createdAt;
  const resetToken = jwt.sign({ userId }, secret, { expiresIn: '1h' });
  return resetToken;
};

exports.sendPasswordResetEmail = async (req, res) => {
  const { email } = req.params;
  let user;
  try {
    user = await User.findOne({ email }).exec();
  } catch (err) {
    res.status(404).json("No user with that email");
  }

  const resetToken = usePasswordHashToMakeToken(user);
  const url = getPasswordResetURL(user, resetToken);
  const emailTemplate = resetPasswordTemplate(user, url);

  const sendEmail = () => {
    transporter.sendMail(emailTemplate, (err, info) => {
      if (err) {
        res.status(500).json("Error sending email");
      } else 
        res.json({ success: true, info: info, msg: "** Email sent **" });
    })
  }
  sendEmail();
};

exports.receiveNewPassword = (req, res) => {
  const { userId, resetToken } = req.params;

  const { password } = req.body;

  User.findOne({ _id: userId })
    .then(user => {
      const secret = user.password + "-" + user.createdAt;
      const payload = jwt.decode(resetToken, secret);
      if (payload.userId === user.id) {
        bcrypt.genSalt(10, function(err, salt) {
          if (err) return
          bcrypt.hash(password, salt, function(err, hash) {
            if (err) return
            User.findOneAndUpdate({ _id: userId }, { password: hash })
              .then(() => res.status(202).json("Password changed accepted"))
              .catch(err => res.status(500).json(err));
          });
        });
      };
    })

    .catch(() => {
      res.status(404).json("Invalid user");
    });
};