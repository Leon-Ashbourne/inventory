const express = require("express");
const homeRouter = require("./routes/homeRouter");
const path = require("node:path");
const createRouter = require("./routes/createRouter");
const dotenv = require("dotenv");
const categoryRouter = require("./routes/categoryRouter");

dotenv.config();


const app = express();

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