const Opportunity = require("../../model/opportunity");

const updateOpportunity = async (req, res) => {
    const { id = undefined } = req.params || {};
    const { organizationName = undefined, opportunityDescription = undefined, organizationType = undefined, organizationContactEmail = undefined, organizationContactName = undefined, organizationContactPhone = undefined, organizationLocation = undefined, organizationWebsite = undefined, SDGs = undefined, others = undefined } = req.body || {};
    // check for complete payload
    if (!organizationName || !organizationType || !organizationContactName || !organizationLocation) {
        return res.status(400).json({
            status: "fail",
            message: "Incomplete Opportunity Details, Cannot Proceed"
        });
    };
    try {
        const updatedOpportunity = await Opportunity.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    organizationName,
                    opportunityDescription,
                    organizationType,
                    organizationContactEmail,
                    organizationContactName,
                    organizationContactPhone,
                    organizationLocation,
                    organizationWebsite,
                    SDGs,
                    others,
                }
            },
            { new: true }
        );
        if (!updatedOpportunity) {
            return res.status(404).json({
                status: "fail",
                message: "Opportunity not found. Update operation failed."
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Opportunity successfully updated.",
            data: updatedOpportunity
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in updating this opportunity. Please retry"
        });
    }
}

module.exports = updateOpportunity;
