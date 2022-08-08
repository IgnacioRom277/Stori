const HttpError = require('../models/http-error');
const emailer = require('../config/mailer');

const sendMail = async (req, res, next) => {
  let {recipients, newsletter} = req.body;
  newsletter = {
    filename: 'tapout.png',
    url: 'https://firebasestorage.googleapis.com/v0/b/stori-challenge-9a98c.appspot.com/o/newsletters%2Fagua%20mayoce26122a-293f-438c-9307-0d77f69dc983?alt=media&token=ff345803-9f8a-4356-b079-89039cc67673',
    id: '62eddf283573f9a87085dd57'
  } 
  console.log('recipients :>> ', recipients);

  let mailSend;
  try {
    mailSend = await emailer.allMail(recipients, newsletter)
  } catch (error) {
    const httpError = new HttpError("Ups, something went wrong, try again." + error, 500)
		return next(httpError)
  }

  res.json({ message: "Email send" })
}

exports.sendMail = sendMail;