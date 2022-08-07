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

const getRecipients = async (req, res, next) => {
	let recipientsExists;

	try {
		recipientsExists = await Recipient.find();
	} catch {
		const httpError = new HttpError("Something went wrong, try again", 500);
		return next(httpError);
	}

	if(!recipientsExists) {
		const httpError = new HttpError("There is no info available", 400);
		return next(httpError);
	}

	res.status(201).json(recipientsExists);
} 

const unsubscribeRecipient = async (req, res, next) => {
	const {userOId, newsletterOId} = req.query;

	let userExists;
	try {
		userExists = await Recipient.findById(userOId);
	} catch {
		const httpError = new HttpError("Something went wrong, try again", 500);
		return next(httpError);
	}

	if (!userExists) {
		const httpError = new HttpError("There is no user subscribed", 400);
		return next(httpError);
	}

	let recipientStatus;
	try {
		recipientStatus = await Recipient.updateOne({ _id: userOId }, {$pull: {newsletters: newsletterOId}});
	} catch (err) {
		const httpError = new HttpError("Something went wrong when unsubscribe" + err, 400);
		return next(httpError);
	}

	res.send(`
		<!doctype html>
		<html
			style="
				width: 900px; 
				margin: auto; 
				text-align: center; 
				background: #dfdddd79;
				font-family: 'Graphik Web', Helvetica, sans-serif;"
		>
			<head>
				<h1 style="
				font-size: 3.2em;
				line-height: 1.25em;
				font-weight: 500;
				color: #111324;
				width: 100%;
				margin: 0 auto 14px;
				padding: 0;
				margin-top: 10vh
				">
					Tu suscripción ha terminado
				</h1>
			</head>
			<body>
				<img
					style="border-radius: 40px"
					src="https://www.storicard.com/static/images/stori_iconoOG_small.png"
					alt="stori_logo"
				/>
				<h3 style="
					font-size: 1.8em;
					line-height: 1.5em;
					color: #111324;
					padding: 0;
					margin: 20px;
				">
					Lamentamos que tengas que irte, esperamos vuelvas pronto.
				</h3>
				<h1 style="
					font-size: 2.1em;
					line-height: 1.5em;
					color: #111324;
					padding: 0;
					margin: 20px;
				">
					¡Te vamos a extrañar!
				</h1>
			</body>
		</html>
	`)
}

exports.createRecipient = createRecipient;
exports.createMultiRecipient = createMultiRecipient;
exports.unsubscribeRecipient = unsubscribeRecipient;
exports.getRecipients = getRecipients;