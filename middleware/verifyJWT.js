const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    // we are getting the token from the api call of header 
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.sendStatus(401);
    }
    console.log(authHeader);
    // here seperating the token from the authorization header 
    const token = authHeader.split(" ")[1];

    // verifying whether the token and the access token were same or not 
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, encoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = encoded.userInfo.username;
        req.roles = encoded.userInfo.roles;
        next();
    });
}

// now we can consume this jwt verification middleware in the respective routes 
module.exports = verifyJWT;

