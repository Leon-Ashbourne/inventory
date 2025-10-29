const { Router } = require("express");
const createController = require("../controller/createController");

const createRouter = Router();


createRouter.post("/authenticate", createController.authenticate);
createRouter.post("/create", createController.createPost);
createRouter.use(createController.authenticateGet);


module.exports = createRouter;
