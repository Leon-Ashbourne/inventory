const pool = require("./pool");

//homepage query --modified
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

//category values -- modified
async function genreGet() {
    const { rows } = await pool.query(`SELECT DISTINCT id, genre FROM game_genres`);
    return rows;
}

async function companyGet() {
    const { rows } = await pool.query(`SELECT DISTINCT id, company FROM game_publishers`);
    return rows;
}

async function yearGet() {
    const { rows } = await pool.query(`SELECT DISTINCT year FROM games`);
    return rows;
}

//new game -- need to modify
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
    genreGet,
    companyGet,
    yearGet,

    //verify
    addGame,
    categoryValuesGet
}
