const { JWT_TOKEN } = require("../utils/constants");
const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {

    let token = req.headers["x-access-token"] || req.headers["authorization"] || req.body.token || req.query.token;

    if (!token) {
        res.json({ message: "Authorization required", success: false });
    }

    let jwtPayload;
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimStart();
    }

    try {
        jwtPayload = jwt.verify(token, JWT_TOKEN);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        return res.send({ message: 'Unauthorised Request.', error: error, success: false });
    }

    next();

}

module.exports = Auth;