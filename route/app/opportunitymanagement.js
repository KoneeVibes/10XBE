const express = require("express");
const router = express.Router();

// To retrieve opportunity collection overview
router.get(
    "/overview/opportunity",
    require("../../controller/opportunity/retrieveOverview")
)
// To retrieve all opportunities
router.get(
    "/all/opportunity",
    require("../../controller/opportunity/retrieveAllOpportunities")
);
// To retrieve an opportunity  by id
router.get(
    "/opportunity/:id",
    require("../../controller/opportunity/retrieveOpportunityById")
);
// To add an opportunity
router.post(
    "/opportunity",
    require("../../controller/opportunity/addOpportunity")
);
// To update an opportunity
router.patch(
    "/opportunity/:id",
    require("../../controller/opportunity/updateOpportunity")
);
// To delete an opportunity
router.delete(
    "/opportunity/status/:id",
    require("../../controller/opportunity/deleteOpportunity")
);

module.exports = router;
