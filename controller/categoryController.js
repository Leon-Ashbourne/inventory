const db = require("../models/query");

async function categoryGet(req, res) {
    const categories = await db.getEachCategory();

    res.render("category", {categories: categories, title: "Categories"});
}

async function byCategoryGet(req, res) {
    const { name } = req.params;
    const data = await db.gamesByCategoryGet(name);

    res.render("categoryRender", {title: name, data: data})
}


module.exports = {
    categoryGet,
    byCategoryGet
}

