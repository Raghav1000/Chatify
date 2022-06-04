const generateToken = require("../config/generateToken");
const User = require("../models/userModel");

const registerUser = async(req, res) => {
    const { fullName, email, password, userName, mobileNumber, profilePic } =
    req.body;

    if (!fullName || !email || !password || !userName) {
        res.status(400);
        res.send("Please enter all the fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        console.log("user");
        res.status(409).send("User exists");
    } else {
        const user = await User.create({
            fullName,
            email,
            userName,
            password,
            mobileNumber,
            profilePic,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                userName: user.userName,
                mobileNumber: user.mobileNumber,
                profilePic: user.profilePic,
                token: generateToken(user._id),
            });
        } else {
            res.status(404).send("Registration cannot be completed");
        }
    }
};

const authUser = async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    0;

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            userName: user.userName,
            mobileNumber: user.mobileNumber,
            profilePic: user.profilePic,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        res.send("Invalid credentials");
    }
};

// /api/users
const allUsers = async(req, res) => {
    const keyword = req.query.search ?
        {
            $or: [
                { fullName: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        } :
        {
            /*do nothing */
        };

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

    res.send(users);
};

module.exports = { registerUser, authUser, allUsers };