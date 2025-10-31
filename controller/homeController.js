const db = require("../models/query");

async function homeController(req, res) {
    const games = await db.getGames()
    res.render("home/index", {games: games, title: "All the available games from our inventory: "});
}


module.exports = homeController;