const { Router } = require("express");
const categoryController = require("../controller/categoryController");

const categoryRouter = Router();

categoryRouter.get("/:name/:value", categoryController.categValMid);
categoryRouter.get("/", categoryController.categoryMid);


module.exports = categoryRouter;


