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

//category values --modified
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

//category-values 
async function genreGet({ name, id }) {
    const SQL = `
        SELECT name AS title, price, audience, reviews_count, ratings 
        FROM genre
        LEFT JOIN game_publishers_genre as gpg ON gpg.genre_id = genre.id
        LEFT JOIN  games ON gpg.game_id = games.id
        LEFT JOIN game_ranks as gr ON games.id = gr.game_id
        LEFT JOIN game_ratings as gt ON gt.game_id = gr.game_id
        LEFT JOIN game_purchases as gp ON gp.game_id = gt.game_id
        WHERE ($1) = ($2)
    `

    const { rows } = await pool.query(SQL, [name, id]);
    return rows;
}

//new game -- need to modify
async function addGame({ name, genre, released }) {
    await pool.query(`INSERT INTO games (name, genre, released) VALUES ($1, $2, $3);`, [name, genre, released]);
    return;
}




module.exports = {
    getGames,
    genreGet,
    companyGet,
    yearGet,
    genreGet,

    //verify
    addGame,
}
