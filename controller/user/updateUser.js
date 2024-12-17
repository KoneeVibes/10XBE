const User = require("../../model/user");
const systemRoles = require("../../config/systemRoles");

const updateUserById = async (req, res) => {
    const { id = undefined } = req.params || {};
    const { firstName = undefined, lastName = undefined, email = undefined, phone = undefined, role = undefined } = req.body || {};
    // Validation for complete payload
    if (!id || !firstName || !lastName || !email || !phone || !role) {
        return res.status(400).json({
            status: "fail",
            message: "Incomplete or invalid User Details, Cannot Proceed"
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
        const transformedRole = systemRoles.find((systemRole) => systemRole.id === role).name;
        const updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            { $set: { firstName, lastName, email, phone, role: transformedRole } },
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

module.exports = updateUserById;
