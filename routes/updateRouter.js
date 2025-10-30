const { Router } = require("express");
const { authenticatePost } = require("../controller/createController")
const updateController = require("../controller/updateController");

const updateRouter = Router();


updateRouter.post("/", updateController.updatePost);
updateRouter.use(authenticatePost, updateController.updateGet );


module.exports = updateRouter;
