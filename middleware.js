const jwt = require("jsonwebtoken");
const config = require("./config.js");

let checkToken = (req, res, next) => {
    let token = req.headers["x-auth-token"] || req.headers["authorization"];
    console.log(req.decoded);

    if (token) {
        if (token.startsWith("Bearer")) {
            token = token.slice(7, token.length);
        }

        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    message: "Token is not valid"
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).json({
            message: "You are not authorize to access this resource"
        });
    }
};

module.exports = {
    checkToken: checkToken
}