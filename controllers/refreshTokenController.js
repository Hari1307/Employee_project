const User = require("../model/User");

const jwt = require("jsonwebtoken");

// this is used for regenerating the refresh token based on the username of user 
const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt)
        return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    // if the modal property and the local variable name is of same name then we just need to specify once like below 
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser)
        return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {
                "userInfo": {
                    "username": decoded.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
        );

        res.json({ accessToken });
    });

}

module.exports = { handleRefreshToken };