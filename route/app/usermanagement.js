const express = require("express");
const router = express.Router();

// To retrieve user collection overview
router.get(
    "/overview/user",
    require("../../controller/user/retrieveOverview")
)
// To retrieve all users
router.get(
    "/all/user",
    require("../../controller/user/retrieveAllUsers")
);
// To retrieve a user by id
router.get(
    "/user/:id",
    require("../../controller/user/retrieveUserById")
);
// To retrieve logged in user
router.get(
    "/user",
    require("../../controller/user/retrieveUser")
);
// To create a user
router.post(
    "/user",
    require("../../controller/user/createuser")
);
// To update a user
router.patch(
    "/user/:id",
    require("../../controller/user/updateUser")
);
// Admin to update a user role
router.patch(
    "/user/role/:id",
    require("../../controller/user/updateUserRole")
);
// To suspend a user
router.patch(
    "/user/status/:id",
    require("../../controller/user/suspendUser")
);
// To update user password
router.patch(
    "/user/password/:id",
    require("../../controller/user/resetPassword")
)

module.exports = router;
