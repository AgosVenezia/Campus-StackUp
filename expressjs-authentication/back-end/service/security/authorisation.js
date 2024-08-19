const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = process.env;

const authorisation = ({ isAdmin }) => {
	return (req, res, next) => {
		const user = req.signedCookies;
		let userHasAdminRole = undefined;

		const xAccessToken = req.headers["x-access-token"];
		if (xAccessToken) {
			token = xAccessToken;
			token = JSON.stringify(token)
				.replaceAll('"', "")
				.trim()
				.replaceAll("\\", "");
			const decoded = jwt.verify(token, config.TOKEN_KEY);
			userHasAdminRole = decoded.isAdmin;
		} else {
			userHasAdminRole = user?.user?.isAdmin;
		}

		if (convertToRole(userHasAdminRole) >= convertToRole(isAdmin)) {
			return next();
		}
		// else was omitted here because of early return
		console.log("Not authorised.");
		console.log(typeof userHasAdminRole, typeof isAdmin);
		return res.status(401).send({
			auth: false,
			message: "You are not authorised to access this page.",
			status: 401,
			payload: null,
		});
	};
};

const convertToRole = (role) => {
	switch (role) {
		case false:
			return 1;
		case true:
			return 2;
		default:
			return 0;
	}
};

module.exports = authorisation;
