const Opportunity = require("../../model/opportunity");
const User = require("../../model/user");

const deleteOpportunity = async (req, res) => {
    const { user } = req;
    const { id = undefined } = req.params || {};
    // check for id param
    if (!id) {
        return res.status(400).json({
            status: "fail",
            message: "Opportunity Id not found, Cannot Proceed"
        });
    };
    try {
        // ensure that only user that entered an opportunity
        // or Admin, Super Admin can utilize this service
        const opportunity = await Opportunity.findById(id);
        const requestMakingUser = await User.findById(user?.id);
        if (!opportunity) {
            return res.status(404).json({
                status: "fail",
                message: "Opportunity not found.",
            });
        }
        const allowedRoles = ["Admin", "Super Admin"];
        const isCreator = opportunity.createdBy === user.email;
        const isAuthorizedRole = allowedRoles.includes(requestMakingUser?.role);
        if (!isCreator && !isAuthorizedRole) {
            return res.status(403).json({
                status: "fail",
                message: "You are not authorized to delete this opportunity.",
            });
        };
        const deletedOpportunity = await Opportunity.findByIdAndUpdate(
            { _id: id },
            { $set: { status: "inactive" } },
            { new: true }
        );
        if (!deletedOpportunity) {
            return res.status(404).json({
                status: "success",
                message: "Opportunity not found"
            })
        };
        res.json({
            status: "success",
            message: "success",
            data: deletedOpportunity
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in deleting this opportunity at this moment. Please retry"
        });
    }
}

module.exports = deleteOpportunity;
