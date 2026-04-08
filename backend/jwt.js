const express = require("express");
const jwt = require("jsonwebtoken");

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const SECRET_KEY = "mysecretkey"

// Login Api (Generate token)
app.post('/login', (req, res) => {
    const {username, password} = req.body 

    if (username === "admin" && password === "1234" ) {
        const token = jwt.sign(
            {username: username},
            SECRET_KEY,
            {expiresIn: "1h"}
        )
        return res.json({
            message: "login successfull",
             token
        })
    }
    else {
        return res.status(401).json({message:"Invalid credentials"})
    }
}) 


// middleware to verify the token

function VerifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];

    if(!bearerHeader) {
        return res.status(401).json({message: "Token required"})
    }

    const token = bearerHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, decode) => {

        if(err) {
            return res.status(403).json({message: "invalid token"})
        }

        req.user = decode
        next();

    })


}

// protected route dashboard 

app.get("/profile", VerifyToken, (req, res) => {
    res.json({
        message: "welcome to the dashboard",
        user: req.user
    })
} )

app.listen(8001, () => console.log("server running at http://localhost:8001"))