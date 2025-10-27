const { Router } = require("express");
const homeController = require("../controller/homeController");


const homeRouter = Router();

homeRouter.get("/", homeController);


module.exports = homeRouter;