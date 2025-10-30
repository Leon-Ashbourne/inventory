const express = require("express");
const homeRouter = require("./routes/homeRouter");
const createRouter = require("./routes/createRouter");
const categoryRouter = require("./routes/categoryRouter");
const path = require("path");

const app = express();

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//setting views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));  

//router
app.use("/create", createRouter);
app.use("/category", categoryRouter);
app.use("/", homeRouter);


const PORT = process.env.PORT || 3030;

app.listen(PORT, (error) => {
    if(error) throw error;

    console.log(`Connection successful and the port listening at: ${PORT}`)
})



app.use((error, req, res, next) => {
    if(error) throw new Error(error);
})