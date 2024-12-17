const User = require("../../model/user");
const systemRoles = require("../../config/systemRoles");

const updateUserRole = async (req, res) => {
    const { user } = req;
    const { id = undefined } = req.params || {};
    const { role } = req.body;
    // ensure that this service is not allowable to role: users
    if (user.role === "User") {
        return res.status(401).json({
            status: "fail",
            message: "Unauthorized, Cannot Proceed"
        });
    }
    // check for id param
    if (!id) {
        return res.status(400).json({
            status: "fail",
            message: "User Id not found, Cannot Proceed"
        });
    };
    // Validate that role exists and is not only whitespace
    if (role === undefined || String(role).trim() === "") {
        return res.status(400).json({
            status: "fail",
            message: "Role is required and cannot be empty or whitespace.",
        });
    };
    try {
        const transformedRole = systemRoles.find((systemRole) => systemRole.id === role)?.name;
        const updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            { $set: { role: transformedRole } },
            { new: true }
        ).select('firstName lastName email phone role');
        if (!updatedUser) {
            return res.status(404).json({
                status: "fail",
                message: "User not found. Update operation failed."
            });
        }
        return res.status(200).json({
            status: "success",
            message: "User successfully updated.",
            data: updatedUser
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in updating this user. Please retry"
        });
    }
};

module.exports = updateUserRole;
