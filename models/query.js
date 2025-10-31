const pool = require("./pool");

async function getGames() {
    const sql = `
        SELECT games.id AS ID, games.name AS title , genre AS Genre , gr.rank AS Rank, audience AS Players
        FROM games
        LEFT JOIN game_ranks as gr ON gr.game_id = games.id
        LEFT JOIN game_publishers_genre as gpg ON gpg.game_id = gr.game_id
        LEFT JOIN game_genres as gg ON gg.id = gpg.genre_id;
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

async function genreGet() {
    const { rows } = await pool.query(`SELECT DISTINCT genre FROM games`);
    return rows;
}

async function companyGet() {
    const { rows } = await pool.query(`SELECT DISTINCT company FROM game_company`);
    return rows;
}

async function yearGet() {
    const { rows } = await pool.query(`SELECT DISTINCT released AS year FROM games`);
    return rows;
}

async function categoriesGet() {
    const { rows } = await pool.query(`SELECT category FROM category`);
    return rows;
}

async function addGame({ name, genre, released }) {
    await pool.query(`INSERT INTO games (name, genre, released) VALUES ($1, $2, $3);`, [name, genre, released]);
    return;
}

async function categoryValuesGet(name, value) {
    let sql = `
        SELECT name, rank 
        FROM games
        WHERE ($1) = ($2);
    `
    if(name === "company") {
        sql = `
            SELECT name, rank
            FROM games
            RIGHT JOIN games_company ON game_id = games.id
            WHERE ($1) = ($2); 
        `
    }
    

    const { rows } = pool.query(sql, [name, value]);
    return rows;
}

module.exports = {
    getGames,
    getEachCategory,
    gamesByCategoryGet,
    addGame,
    genreGet,
    companyGet,
    yearGet,
    categoriesGet,
    categoryValuesGet
}
