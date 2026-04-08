const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

exports.VerifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        return res.status(401).json({ message: "Token required" });
    }

    if (!bearerHeader.startsWith("Bearer ")) {
        return res.status(400).json({ message: "Invalid token format" });
    }

    const token = bearerHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.user = decoded;
        next();
        
    });

};
