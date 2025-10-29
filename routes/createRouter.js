const { Router } = require("express");
const createController = require("../controller/createController");

const createRouter = Router();


createRouter.post("/authenticate", createController.authenticate);
createRouter.use(createController.authenticateGet);


module.exports = createRouter;
