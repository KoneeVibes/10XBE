const Opportunity = require("../../model/opportunity");

const addOpportunity = async (req, res) => {
    const { user } = req;
    const { organizationName = undefined, opportunityDescription = undefined, organizationType = undefined, organizationContactEmail = undefined, organizationContactName = undefined, organizationContactPhone = undefined, organizationLocation = undefined, organizationWebsite = undefined, SDGs = undefined, others = undefined } = req.body || {};
    // check for complete payload
    if (!organizationName || !organizationType || !organizationContactName || !organizationLocation) {
        return res.status(400).json({
            status: "fail",
            message: "Incomplete Opportunity Details, Cannot Proceed"
        });
    };
    try {
        const existingOpportunity = await Opportunity.findOne({ opportunityDescription: opportunityDescription });
        // check for duplicity
        if (existingOpportunity) {
            return res.status(409).json({
                status: "fail",
                message: "Opportunity with this exact description already exists. Looks duplicitous"
            });
        };
        const opportunity = new Opportunity({
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
            createdBy: user.email
        });
        const savedOpportunity = await opportunity.save();
        if (savedOpportunity) {
            return res.status(201).json({
                status: "success",
                message: "Opportunity successfully added"
            });
        } else {
            return res.status(500).json({
                status: "fail",
                message: "Server encountered an issue adding this opportunity to the db. Please contact support"
            });
        }
    } catch (err) {
        if (err.name === "ValidationError") {
            const validationMessage = Object.values(err.errors)
                .map((error) => error.message)
                .join(" and ");
            return res.status(400).json({
                status: "fail",
                message: validationMessage,
            });
        };
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an issue in adding this opportunity. Please retry"
        });
    }
};

module.exports = addOpportunity;
