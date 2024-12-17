const Opportunity = require("../../model/opportunity");

const retrieveAllOpportunities = async (req, res) => {
    const { filter } = req.query;
    try {
        const query = filter
            ? { firstName: { $regex: filter, $options: 'i' }, status: "active" }
            : { status: "active" };
        const opportunities = await Opportunity.find(query);
        if (!opportunities || opportunities.length === 0) {
            return res.status(404).json({
                status: "success",
                message: "No opportunities found",
                data: []
            });
        }
        res.status(200).json({
            status: "success",
            message: "Opportunities retrieved successfully",
            data: opportunities
        });
    } catch (error) {
        console.error("Error retrieving opportunities:", error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in retrieving opportunities at this moment. Please retry"
        });
    }
}

module.exports = retrieveAllOpportunities;
