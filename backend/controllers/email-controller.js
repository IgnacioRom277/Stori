const HttpError = require('../models/http-error');
const emailer = require('../config/mailer');

const sendMail = async (req, res, next) => {
  let mailSend;

  try {
    mailSend = await emailer.allMail()
  } catch (error) {
    const httpError = new HttpError("Ups, something went wrong, try again." + error, 500)
		return next(httpError)
  }

  res.json({ message: "Email send" })
}

exports.sendMail = sendMail;