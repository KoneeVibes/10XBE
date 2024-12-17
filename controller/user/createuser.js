const User = require("../../model/user");

const createUser = async (req, res) => {
    const { user } = req;
    const { firstName = undefined, lastName = undefined, email = undefined, phone = undefined, role = undefined } = req.body || {};
    // ensure that this service is not allowable to role: users
    if (user.role === "User") {
        return res.status(401).json({
            status: "fail",
            message: "Unauthorized, Cannot Proceed"
        });
    };
    // check for complete payload
    if (!firstName || !lastName || !email || !phone || !role) {
        return res.status(400).json({
            status: "fail",
            message: "Incomplete User Details, Cannot Proceed"
        });
    };
    // Validate role for non-empty, non-whitespace only value
    if (!role.trim()) {
        return res.status(400).json({
            status: "fail",
            message: "Role cannot be empty"
        });
    };
    try {
        const existingUser = await User.findOne({ email: email });
        // check for duplicity
        if (existingUser) {
            return res.status(409).json({
                status: "fail",
                message: "User with this email already exists."
            });
        };
        const user = new User({
            firstName,
            lastName,
            email,
            phone,
            password: process.env.DEFAULT_USER_PASSWORD,
            role
        });
        const savedUser = await user.save();
        if (savedUser) {
            return res.status(201).json({
                status: "success",
                message: "User successfully created"
            });
        } else {
            return res.status(500).json({
                status: "fail",
                message: "Server encountered an issue saving this user to the db. Please contact support"
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in creating this user. Please retry"
        });
    }
};

module.exports = createUser;
