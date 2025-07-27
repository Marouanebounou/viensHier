const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");
const invitationController = require("../controllers/invitationController");

router.post('/', invitationController.sendInvitation);

module.exports = router;