const { Router } = require("express");
const categoryController = require("../controller/categoryController");

const categoryRouter = Router();

categoryRouter.get("/:name", categoryController.byCategoryGet);
categoryRouter.get("/", categoryController.categoryGet);


module.exports = categoryRouter;


