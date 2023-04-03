const jwt = require("jsonwebtoken");

const SECRET_KEY = 'ha34523jiosf123dhfj';
const errorMessage = "Unauthorized User"

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
        } else {
            res.status(401).json({ message: errorMessage });
        }
        next();
    } catch (error) {
        console.log("Auth Error", error)
        res.status(500).json({ message: errorMessage })
    }
}

module.exports = auth;