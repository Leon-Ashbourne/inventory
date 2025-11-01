const db = require("../models/query");


const categories = Object.freeze({
    0: "genre",
    1: "year",
    2: "company"
})

//category controller --modified
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

    res.render("category/category", { title: "Available Categories: ", categories: Object.values(categories), genre, year, company });
}

const categoryMid = [ valuesByCategoryGet, categoryValues ];

// values inside category --modified
async function byCategoryGet(req, res, next) {
    const cg = Object.values(categories);
    const { name, id } = req.params;

    const isContains = cg.includes(name);
    if(!isContains) {
        res.status(400).render("error", {title: "Error, entered a bad url. The request reeturned with a 400 status code.."})
    }
    else next();
}

async function valuesGet(req, res) {
    const { name, id } = req.params;

    let values;
    if(name === "genre") {
        values = await db.genreValuesGet(id);
    }else if(name === "company") {
        values = await db.publisherValuesGet(id);
    }else if(name === "year") {
        values = await db.yearValuesGet(id);
    }

    res.render("category/values/values", {values, title: `games with under ${name}`, header: "Available game details", url: `${id}`});
}

const categValMid = [byCategoryGet, valuesGet ];

//category delete --need to modify
async function categDeleteGet(req, res, next) {
    //for now
    res.redirect("/");
}


module.exports = {
    categoryMid,
    categValMid,
    categDeleteGet
}

// delete method similar to the below process 

/*
<a href="/user/12?_method=DELETE" >Delete</a>

router.use( function( req, res, next ) {
    // this middleware will call for each requested
    // and we checked for the requested query properties
    // if _method was existed
    // then we know, clients need to call DELETE request instead
    if ( req.query._method == 'DELETE' ) {
        // change the original METHOD
        // into DELETE method
        req.method = 'DELETE';
        // and set requested url to /user/12
        req.url = req.path;
    }       
    next(); 
});

router.delete( '/user/:id', function ( req, res ) {
  // delete operation stuff
});

*/