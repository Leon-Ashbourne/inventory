const db = require("../models/query");

async function categoryGet(req, res, next) {
    const categories = await db.getEachCategory();
    res.locals.categories = categories
    next();
}

async function valuesByCategoryGet(req, res, next) {
    // write a more flexible code to get category wise details
    const genre = await db.genreGet();
    const year = await db.yearGet();
    const company = await db.companyGet();

    await Promise.all([genre, year, company]);

    res.locals.categoryValues = [genre, year, company];
    next();
}

function categoryValues(req, res) {
    const [ genre, year, company ] = [...res.locals.categoryValues];
    const { categories } = res.locals;

    res.render("category/category", { title: "Available Categories: ", categories: categories, genre, year, company });
}

const categoryMid = [categoryGet, valuesByCategoryGet, categoryValues];

async function byCategoryGet(req, res, next) {
    const category = await db.categoriesGet();

    res.locals.category = category.map((cg) => {
        return cg.category;
    });

    next();
}

async function checkCategoryGet(req, res, next) {
    const { name, value } = req.params;
    const isContains = res.locals.category.includes(name);

    if(!isContains) {
        res.status(400).render("error", {title: "Error, entered a bad url. The request reeturned with a 400 status code.."})
    }
    else next();
}

async function valuesGet(req, res) {
    const { name, value } = req.params;
    let newName = name;

    if(value === "rank") newName = "global_rankings"
    else if(value === "year") newName = "released"

    const categoryValues = await db.categoryValuesGet(newName, value);

    res.render("category/values/values", {values: categoryValues, title:`Values under ${name} for ${value}`});
}

const categValMid = [byCategoryGet, checkCategoryGet, valuesGet ];


module.exports = {
    categoryMid,
    categValMid
}

