const { Router } = require("express");
const createController = require("../controller/createControler");

const createRouter = Router();

createRouter.get("/", createController.createGet);
createRouter.post("/", createController.createPost);




module.exports = createRouter;
