const router = require("express").Router();

const creditorRouter = require("./creditor");
// const placeholder = require("./");

router.use("/creditor", creditorRouter);

module.exports = router;
