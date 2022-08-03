const HttpError = require('../models/http-error');
const Recipient = require('../models/recipient');

const createMultiRecipient = async (req, res, next) => {
	const { recipients } = req.body;
	const recipientsMails = recipients.map(recipient => recipient.email);
	let someRecipientExists;

	try {
		someRecipientExists = await Recipient.find({ email: { $in: recipientsMails } })
	} catch {
		const httpError = new HttpError("Something went wrong, try again", 500)
		return next(httpError)
	}

	if (someRecipientExists.length) {
		const httpError = new HttpError("One or more recipients are already registered", 400)
		return next(httpError)
	}

	const newRecipients = recipients.map((recipient) =>
		new Recipient({
			name: recipient.name,
			lastName: recipient.lastName,
			email: recipient.email,
			newsletter: []
		})
	)

	try {
		await Recipient.insertMany(newRecipients)
	} catch {
		const httpError = new HttpError("Create recipients failed", 400)
		return next(httpError)
	}

	res.status(201).json({ recipients: newRecipients })
}


const createRecipient = async (req, res, next) => {
	const { name, lastName, email } = req.body
	let recipientExists;

	try {
		const query = { email: email }
		recipientExists = await Recipient.findOne(query)
	} catch (err) {
		const httpError = new HttpError("Something went wrong, try again", 500)
		return next(httpError)
	}

	if (recipientExists) {
		const httpError = new HttpError("The email is already registered", 400)
		return next(httpError)
	}

	const newRecipient = new Recipient({
		name: name,
		lastName: lastName,
		email: email,
		newsletter: []
	});

	try {
		await newRecipient.save();
	} catch (err) {
		const httpError = new HttpError("Create recipient failed", 400)
		return next(httpError)
	}

	res.status(201).json(newRecipient)
}

exports.createRecipient = createRecipient;
exports.createMultiRecipient = createMultiRecipient;