const User = require("../model/User");

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt)
        return res.sendStatus(201);
    const refreshToken = cookies.jwt;

    // is refresh token available in db :
    const foundUser = await User.findOne({ refreshToken }).exec();

    // here if we havent found the user , but anyway we will clear 
    // - the cookie from current login 
    if (!foundUser) {
        res.clearCookie("jwt", { httpOnly: true });
        return res.sendStatus(204);
    }

    // need to delete the refresh token from the database for that particular user :

    // const otherUsers = userDB.users.filter(person => person.refreshToken != foundUser.refreshToken);

    // const currentUser = { ...foundUser, refreshToken: "" };

    // userDB.setUsers([...otherUsers, currentUser]);

    // await fsPromises.writeFile(path.join(__dirname, "..", "model", "users.json"),
    //     JSON.stringify(userDB.users));

    foundUser.refreshToken = ""; // here we are deleting the refresh token to that particular user 
    const result = await foundUser.save(); // and saving this user to the database

    console.log(result + "===> Logout completed");
    // in production env we need to add the secure : true ---> for servers on https 
    res.clearCookie("jwt", { httpOnly: true });
    res.sendStatus(204);

}

module.exports = { handleLogout };