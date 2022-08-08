const HttpError = require('../models/http-error');
const User = require('../models/user');

const login = async (req, res, next) => {
	const { email, password } = req.body;
	let userFound;

	try {
		const query = { email: email };
		userFound = await User.findOne(query);
	} catch (err) {
		const httpError = new HttpError("Ups, something went wrong, try again.", 500)
		return next(httpError)
	}

	if (!userFound || password !== userFound.password) {
		const httpError = new HttpError("Invalid user or password, try again.", 401)
		return next(httpError)
	}

	res.json(userFound)
}

const getUsers = async (req, res, next) => {
	let userList;

	try {
		userList = await User.find()
	} catch {
		const httpError = new HttpError("Could not retrieve data.", 500)
		return next(httpError)
	}

	if (!userList.length) {
		const httpError = new HttpError("No users found", 401)
		return next(httpError)
	}

	res.status(201).json({ users: userList })
}

const createUser = async (req, res, next) => {
	const { name, lastName, email, username, password, isAdmin } = req.body

	let userExists;

	try {
		userExists = await User.findOne({ $or: [{ email: email }, { username: username }] })
	} catch {
		const httpError = new HttpError("Something went wrong, try again", 500)
		return next(httpError)
	}

	if (userExists) {
		const httpError = new HttpError("A user with email or username already exists", 401)
		return next(httpError)
	}

	const userCreated = new User({
		name: name,
		lastName: lastName,
		username: username,
		email: email,
		password: password,
		isAdmin: isAdmin
	})

	try {
		await userCreated.save()
	} catch {
		const httpError = new HttpError("Create user failed, try again", 400)
		return next(httpError)
	}

	res.status(201).json(userCreated)
}

exports.login = login;
exports.getUsers = getUsers;
exports.createUser = createUser;