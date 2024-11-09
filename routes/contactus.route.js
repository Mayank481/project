const { sendEmailController } = require("../Controller/contactus.controller");

const router = require("express").Router();

router.post("/sendEmail", sendEmailController);

module.exports = router;
