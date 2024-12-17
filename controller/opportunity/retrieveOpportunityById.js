const Opportunity = require("../../model/opportunity");

const retrieveOpportunityById = async (req, res) => {
    const { id = undefined } = req.params || {};
    // check for id param
    if (!id) {
        return res.status(400).json({
            status: "fail",
            message: "Opportunity Id not found, Cannot Proceed"
        });
    };
    try {
        const opportunity = await Opportunity.findById(
            {
                _id: id,
                status: "active",
            }
        );
        if (!opportunity) {
            return res.status(404).json({
                status: "success",
                message: "Opportunity not found"
            })
        };
        res.json({
            status: "success",
            message: "Successfully retrieved opportunity profile",
            data: opportunity
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in retrieving this opportunity. Please retry"
        });
    }
}

module.exports = retrieveOpportunityById;
