const User = require("../../model/user");

const suspendUser = async (req, res) => {
    const { user } = req;
    const { id = undefined } = req.params || {};
    // ensure that this service is not allowable to role: users
    if (user.role === "User") {
        return res.status(401).json({
            status: "fail",
            message: "Unauthorized, Cannot Proceed"
        });
    };
    // check for id param
    if (!id) {
        return res.status(400).json({
            status: "fail",
            message: "User Id not found, Cannot Proceed"
        });
    };
    try {
        const updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            { $set: { status: "inactive" } },
            { new: true }
        ).select('firstName lastName email phone role');
        if (!updatedUser) {
            return res.status(404).json({
                status: "success",
                message: "User not found"
            })
        };
        res.json({
            status: "success",
            message: "success",
            data: updatedUser
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in suspending this user at this moment. Please retry"
        });
    }
}

module.exports = suspendUser;
