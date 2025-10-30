const db = require("../models/query");
const { body, validationResult, matchedData } = require("express-validator");


exports.updateGet = (req, res) => {
    res.render("update/update", {title: "update", header: "Update data: "});    
}


// validate

const validate = [
    body("name").trim()
        .notEmpty().withMessage("title must not be empty")
]


exports.updatePost = [
    validate,
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).render("update/update", {
                errors: errors.array()
            })
        }

        const { /* column fields */ } = matchedData(req);
        // await db.update

    }
]


