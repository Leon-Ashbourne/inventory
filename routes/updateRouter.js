const { Router } = require("express");
const { authenticatePost, authenticateGet } = require("../controller/createController")
const updateController = require("../controller/updateController");

const updateRouter = Router();


updateRouter.post("/", updateController.updatePost);
updateRouter.post("/updategame", authenticatePost, updateController.updateGet);
updateRouter.use( updateController.updateAuthGet, authenticateGet );
// updateRouter


module.exports = updateRouter;
