const User = require("../model/User");

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ "message": "No users found in the database" });
    res.json(users);
}


const deleteUser = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ "message": "User id value is required to delete the user" });
    }
    const user = await User.findOne({ _id: req.body.id }).exec();

    if (!user) return res.status().json({ "message": `User with id ${req.body.id} is not available` });

    const result = await user.deleteOne();

    res.json(result);
}

const getUserById = async (req, res) => {
    if (!req?.params?.id) {
        return res.status().json({ "message": "User id parameter is required" });
    }

    const user = await User.findOne({ _id: req.params.id }).exec();

    if (!user) {
        return res.status().json({ "message": `User with id ${req.body.id} is not available` });
    }

    res.json(user);
}

module.exports = { getAllUsers, deleteUser, getUserById };
