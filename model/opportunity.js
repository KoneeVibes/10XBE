const mongoose = require("mongoose");
const { Schema } = mongoose;

const opportunitySchema = new Schema({
    organizationName: {
        type: String,
        required: true
    },
    opportunityDescription: {
        type: String,
    },
    organizationType: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.trim().length > 0;
            },
            message: `Select a valid organization type`
        },
    },
    organizationContactEmail: {
        type: String,
    },
    organizationContactName: {
        type: String,
        required: true,
    },
    organizationContactPhone: {
        type: String,
    },
    organizationLocation: {
        type: String,
        required: true,
    },
    organizationWebsite: {
        type: String,
    },
    SDGs: [
        {
            type: String,
            validate: [
                {
                    validator: function (v) {
                        return v.trim().length > 0;
                    },
                    message: "Each SDG must be a valid goal.",
                },
                {
                    validator: function (v) {
                        const validGoals = [
                            "No Poverty",
                            "Zero Hunger",
                            "Good Health and Well-being",
                            "Quality Education",
                            "Gender Equality",
                            "Clean Water and Sanitation",
                            "Affordable and Clean Energy",
                            "Decent Work and Economic Growth",
                            "Industry, Innovation, and Infrastructure",
                            "Reduced Inequality",
                            "Sustainable Cities and Communities",
                            "Responsible Consumption and Production",
                            "Climate Action",
                            "Life Below Water",
                            "Life on Land",
                            "Peace, Justice, and Strong Institutions",
                            "Partnerships for the Goals",
                        ];
                        return validGoals.includes(v);
                    },
                    message: "Each SDG must be one of the predefined goals.",
                },
            ],
        },
    ],
    waysToSupport: {
        type: String,
    },
    others: {
        type: String,
    },
    createdBy: {
        type: String,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "active",
        enum: ["active", "inactive"]
    },
}, { timestamps: true });

module.exports = mongoose.model("Opportunity", opportunitySchema);
