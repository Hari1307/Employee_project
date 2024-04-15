const User = require("../model/User");

// const fsPromises = require("fs").promises;
// const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) {
        return res.status(500).json({ "message": "username and password are required." });
    }

    // checking Duplicate Condition with the Database Entries :
    // const duplicate = userDB.users.find(person => person.username === user);

    const duplicate = await User.findOne({ username: user }).exec();

    if (duplicate) {
        return res.sendStatus(409);
    }

    // actual data insertion to the database 
    try {
        // hashing the password 
        const hashPWD = await bcrypt.hash(pwd, 10);
        const result = await User.create({
            "username": user,
            "password": hashPWD
        });

        console.log(result);

        // // saving data to object
        // userDB.setUsers([...userDB.users, newUser]);

        // // saving the data in the json file 
        // await fsPromises.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(userDB.users));

        // console.log(userDB.users);
        res.status(201).json({ "Success": `New User is created ${user}` });
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }

}

module.exports = { handleNewUser };


