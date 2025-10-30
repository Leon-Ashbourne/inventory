const { Router } = require("express");
const createController = require("../controller/createController");

const createRouter = Router();


createRouter.post("/authenticate", createController.authenticatePost, createController.createGet);
createRouter.post("/", createController.createPost);
createRouter.use(createController.authenticateGet);


module.exports = createRouter;
