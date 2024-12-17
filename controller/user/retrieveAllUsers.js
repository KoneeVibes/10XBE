const User = require("../../model/user");

const retrieveAllUsers = async (req, res) => {
    const { user } = req;
    const { filter } = req.query;
    // ensure that this service is not allowable to role: users
    if (user.role === "User") {
        return res.status(401).json({
            status: "fail",
            message: "Unauthorized, Cannot Proceed"
        });
    };
    try {
        const query = filter
            ? { firstName: { $regex: filter, $options: 'i' }, status: "active" }
            : { status: "active" };
        const users = await User.find(query, {
            firstName: 1, lastName: 1, email: 1, phone: 1, role: 1
        });
        if (!users || users.length === 0) {
            return res.status(404).json({
                status: "success",
                message: "No users found",
                data: []
            });
        }
        res.status(200).json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    } catch (error) {
        console.error("Error retrieving users:", error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in retrieving users at this moment. Please retry"
        });
    }
};

module.exports = retrieveAllUsers;
