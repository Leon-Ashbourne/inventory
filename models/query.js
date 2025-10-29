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




module.exports = {
    getGames,
}
