
exports.getPasswordResetURL = (user, resetToken) => {
    return `http://localhost:3000/password/reset/${user._id}/${resetToken}`
}

exports.resetPasswordTemplate = (user, url) => {
  const from = 'FanFavorite';
  const to = user.email;
  const subject = "FanFavorite Password Reset"
  const html = `
  <p>Hey ${user.username},</p>
  <p>you are receiving this because you (or someone else) have requested to reset your account's password.</p>
  <p>Please click on the following link or paste it into your browser within one hour of receiving this email, to complete the process:</p>
  <a href=${url}>${url}</a>
  <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
  `

  return { from, to, subject, html };
}