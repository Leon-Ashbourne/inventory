const { Router } = require("express");
const createController = require("../controller/createController");

const createRouter = Router();


createRouter.post("/", createController.createPost);
createRouter.post("/newgame", createController.authenticatePost, createController.createGet);
createRouter.use(createController.createAuthGet, createController.authenticateGet);


module.exports = createRouter;
