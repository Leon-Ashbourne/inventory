const db = require("../models/query");
const { body, validationResult, matchedData } = require("express-validator");
const dotenv = require("dotenv");

dotenv.config();

//authenticate to add new game details
exports.authenticateGet = (req, res) => {
    res.render("auth/auth", {head: "Admin password is required: ", title: "authenticate"});
};


exports.authenticatePost = (req, res, next) => {
    const { password } = req.body;

    if(password === process.env.AUTH_PASSWORD) {
        console.log("success");
        next();
    }
    else {
        res.render("auth/error", {msg: "You entered a wrong password"});
    }
};

exports.createGet = (req, res) => {
    res.render("create/create", {title: "New game"});
}


// validate game details
const nameErr = "must not be empty";
const genreErr = "must not be empty";
const relErr= "must only contain numbers";
const restErr = "must be a positive number";

const validate = [
    //add flexible validators next time
    body("name").trim()
        .not().isEmpty().withMessage(`name ${nameErr}`),
    body("genre").trim()
        .notEmpty().withMessage(`genre ${genreErr}`),
    body("released").trim()
        .isInt().withMessage(`relase date ${relErr}`)
        .custom((value) => {
            const num = Number(value);
            if(isNaN(num) || num < 0) throw new Error(`num ${restErr}`) ;
            else return true;
        })
]


exports.createPost = [
    validate,
    async (req, res) => {
        // get more column values from the user
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).render("create/create", {
                title: "Add Game",
                errors: errors.array()
            })
        }
        
        const { name, genre, released } = matchedData(req);
        await db.addGame({ name, genre, released });

        res.redirect("/");
    }
]
