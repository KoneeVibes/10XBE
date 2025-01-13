const User = require("../../model/user");
const bcrypt = require("bcrypt");

const resetPassword = async (req, res) => {
    const { user } = req;
    const { id = undefined } = req.params || {};
    const { oldPassword = undefined, newPassword = undefined, confirmPassword = undefined } = req.body || {};
    // check for id param
    if (!id || !user) {
        return res.status(400).json({
            status: "fail",
            message: "Incomplete user details, Cannot Proceed"
        });
    };
    // Validation for complete payload
    if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({
            status: "fail",
            message: "Incomplete or invalid reset credentials, Cannot Proceed"
        });
    };
    // ensure that only logged in users can request this service
    if (user._id.toString() !== id) {
        return res.status(401).json({
            status: "fail",
            message: "Unauthorized, Cannot Proceed"
        });
    };
    // validate against password mismatch
    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            status: "fail",
            message: "Password mismatch, Confirm password and try again"
        });
    };
    try {
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }

        const isValidPassword = await bcrypt.compare(oldPassword, existingUser.password);
        if (!isValidPassword) {
            return res.status(400).json({
                status: "fail",
                message: "Current password is incorrect"
            });
        };

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(confirmPassword, saltRounds);
        const updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            { $set: { password: hashedPassword } },
            { new: true }
        ).select('firstName lastName email phone role');

        return res.status(200).json({
            status: "success",
            message: "Password successfully updated.",
            data: updatedUser
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in updating this password. Please retry"
        });
    }
};

module.exports = resetPassword;
