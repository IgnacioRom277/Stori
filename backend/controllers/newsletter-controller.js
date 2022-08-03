const HttpError = require('../models/http-error');
const Newsletter = require('../models/newsletter');

const createNewsletter = async (req, res, next) => {
	const { filename, size, extension, url } = req.body;

	let newsletterUrlExists;

	try {
		newsletterUrlExists = await Newsletter.findOne({$or: [{filename: filename}, {url: url}]});
	} catch {
		const httpError = new HttpError("Something went wrong, try again", 500);
		return next(httpError);
	}

	if(newsletterUrlExists) {
		const httpError = new HttpError("There is an image with same name or url", 401);
		return next(httpError);
	}

	const newNewsletter = new Newsletter({
		filename,
		size,
		extension,
		url
	})

	try {
		await newNewsletter.save();
	} catch {
		const httpError = new HttpError("Newsletter was not created", 401);
		return next(httpError);
	}

	res.status(201).json(newNewsletter)
}

exports.createNewsletter = createNewsletter;