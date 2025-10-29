const pool = require("./pool");

async function getGames() {
    const sql = `
        SELECT games.id AS ID, games.name AS title , games.genre AS Genre , game_rankings.global_rankings AS Rank
        FROM games
        JOIN game_rankings ON games.id = game_rankings.game_id
    `
    const { rows } = await pool.query(sql);

    return rows;
}

async function getEachCategory() {
    const { rows } = await pool.query("SELECT DISTINCT category AS category FROM category");
    return rows;
}

async function gamesByCategoryGet(category) {

    let sql = `
        SELECT genre AS category, name AS title, global_rankings AS rank, cost_of_each_product AS price
        FROM  games
        JOIN stock ON games.id = game_id
        JOIN game_rankings ON game_rankings.game_id = stock.game_id
        GROUP BY genre, name, global_rankings, cost_of_each_product
        ORDER BY genre, name, global_rankings, cost_of_each_product;
    `

    if(category === "company") {
        sql = `
            SELECT company AS category, name AS title, global_rankings AS rank, cost_of_each_product AS price
            FROM game_company
            JOIN stock ON game_company.game_id = stock.game_id
            JOIN games ON games.id = stock.game_id
            JOIN game_rankings ON game_rankings.game_id = games.id
            GROUP BY company, name, global_rankings, cost_of_each_product
            ORDER BY company, name, global_rankings, cost_of_each_product;
        `
    }

    const { rows } = await pool.query(sql);

    return rows;
}


module.exports = {
    getGames,
    getEachCategory,
    gamesByCategoryGet
}
