const Opportunity = require("../../model/opportunity");

const retrieveOverview = async (req, res) => {
    try {
        const [totalActiveOpportunities, totalInactiveOpportunities] = await Promise.all([
            Opportunity.countDocuments({ status: "active" }),
            Opportunity.countDocuments({ status: "inactive" })
        ]);
        res.status(200).json({
            status: "success",
            data: {
                totalActiveOpportunities,
                totalInactiveOpportunities,
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in retrieving system overview. Please retry"
        });
    }
}

module.exports = retrieveOverview;
