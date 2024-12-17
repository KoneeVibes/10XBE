
const User = require("../../model/user");

const retrieveOverview = async (req, res) => {
    try {
        const [totalActiveUsers, totalInactiveUsers] = await Promise.all([
            User.countDocuments({ status: "active" }),
            User.countDocuments({ status: "inactive" })
        ]);
        res.status(200).json({
            status: "success",
            data: {
                totalActiveUsers,
                totalInactiveUsers,
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in retrieving system overview. Please retry"
        });
    }
};

module.exports = retrieveOverview;
