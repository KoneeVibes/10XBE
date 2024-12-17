const User = require("../../model/user");

const retrieveUser = async (req, res) => {
    try {
        const { user } = req;
        if (!user) return res.status(401).json({
            status: "fail",
            message: "Unauthorized action. Please sign up/log in."
        });
        res.json({
            status: "success",
            message: "Successfully retrieved user",
            data: user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in retrieving this user. Please retry"
        });
    }
}

module.exports = retrieveUser;
