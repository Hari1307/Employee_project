const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    // console.log("process env is ====> ");
    // console.log(process.env);
    if (!user || !pwd) {
        return res.status(400).json({ "message": "Username and password required for authentication" });
    }

    const foundUser = await User.findOne({ username: user }).exec();

    if (!foundUser)
        return res.sendStatus(401);

    //  evaluating the password :

    const match = await bcrypt.compare(pwd, foundUser.password);

    if (match) {
        const roles = Object.values(foundUser.roles);

        // here we will be going to create the jwt
        const accessToken = jwt.sign(
            {
                "userInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );

        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result + "===>refresh Token to the user is updated and login successful");
        // const otherUsers = userDB.users.filter(person => person.username !== foundUser.username);
        // const currentUser = { ...foundUser, refreshToken };
        // userDB.setUsers([...otherUsers, currentUser]);

        // await fsPromises.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(userDB.users));

        res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };