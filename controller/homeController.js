const db = require("../models/query");

async function homeController(req, res) {
    const games = await db.getGames()
    res.render("index", {games: games, title: "Games: "});
}


module.exports = homeController;