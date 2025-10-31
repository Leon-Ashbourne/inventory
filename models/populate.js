const { Client } = require("pg");
const process = require("node:process");

const SQL = `
    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255),
        year INTEGER
    );

    CREATE TABLE IF NOT EXISTS game_genres (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        genre VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS game_reviews (
        game_id INTEGER REFERENCES games(id),
        reviews_count INTEGER,
        ratings INTEGER
    );

    CREATE TABLE IF NOT EXISTS game_publishers (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        company VARCHAR(255),
        headquarters VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS game_ranks (
        game_id INTEGER REFERENCES games(id),
        audience INTEGER,
        rank INTEGER
    );

    CREATE TABLE IF NOT EXISTS game_purchases (
        game_id INTEGER REFERENCES games(id),
        total_purchases INTEGER,
        price INTEGER
    );

    CREATE TABLE IF NOT EXISTS game_publishers_genre (
        game_id INTEGER REFERENCES games(id),
        publisher_id INTEGER REFERENCES game_publishers(id),
        genre_id INTEGER REFERENCES game_genres(id)
    );

    INSERT INTO games (name, year)
    VALUES 
    ('The Witcher 3: Wild Hunt', 2015),
    ('Minecraft', 2011),
    ('Overwatch', 2016),
    ('Stardew Valley', 2016),
    ('Elden Ring', 2022),
    ('Hollow Knight', 2017),
    ('DOOM Eternal', 2020),
    ('Among Us', 2018),
    ('Civilization VI', 2016),
    ('Rocket League', 2015),
    ('Hades', 2020),
    ('Valorant', 2020),
    ('Animal Crossing: New Horizons', 2020),
    ('League of Legends', 2009),
    ('God of War Ragnarök', 2022),
    ('Red Dead Redemption 2', 2018),
    ('The Legend of Zelda: Breath of the Wild', 2017),
    ('Apex Legends', 2019),
    ('Cyberpunk 2077', 2020),
    ('Tetris Effect', 2018),
    ('Baldurs Gate 3', 2023),
    ('Helldivers 2', 2024),
    ('Dead Cells', 2018),
    ('Terraria', 2011),
    ('Phasmophobia', 2020),
    ('Forza Horizon 5', 2021),
    ('Dota 2', 2013),
    ('Slay the Spire', 2019),
    ('The Sims 4', 2014),
    ('Fortnite', 2017),
    ('Assassin’s Creed Valhalla', 2020),
    ('Dark Souls III', 2016);

    INSERT INTO game_genres (genre)
    VALUES 
    ('Action RPG'),
    ('Sandbox / Survival'),
    ('First-Person Shooter'),
    ('Simulation / Farming'),
    ('Metroidvania / Platformer'),
    ('Party / Social Deduction'),
    ('Strategy / Turn-Based'),
    ('Sports / Action'),
    ('Roguelike / Action'),
    ('Tactical Shooter'),
    ('Life Simulation'),
    ('MOBA'),
    ('Action / Adventure'),
    ('Battle Royale / Shooter'),
    ('Puzzle'),
    ('Role-Playing / Adventure'),
    ('Third-Person Shooter / Co-op'),
    ('Roguelike / Metroidvania'),
    ('Sandbox / Adventure'),
    ('Horror / Co-op'),
    ('Racing / Open World'),
    ('Card Battler / Roguelike');

    INSERT INTO game_reviews (game_id, reviews_count, ratings)
    VALUES 
    (1, 3500000, 9.7),
    (2, 15000000, 9.4),
    (3, 4000000, 8.9),
    (4, 2500000, 9.2),
    (5, 5000000, 9.8),
    (6, 1500000, 9.0),
    (7, 2000000, 8.8),
    (8, 100000000, 8.5),
    (9, 1200000, 9.1),
    (10, 4500000, 8.7),
    (11, 3000000, 9.6),
    (12, 25000000, 8.9),
    (13, 12000000, 9.3),
    (14, 8000000, 9.2),
    (15, 4000000, 9.8),
    (16, 7000000, 9.7),
    (17, 10000000, 9.8),
    (18, 20000000, 8.8),
    (19, 9000000, 8.6),
    (20, 500000, 9.1),
    (21, 3000000, 9.7),
    (22, 2500000, 8.5),
    (23, 400000, 9.0),
    (24, 11000000, 9.1),
    (25, 1500000, 8.6),
    (26, 5000000, 9.2),
    (27, 8000000, 9.0),
    (28, 1500000, 9.4),
    (29, 12000000, 8.7),
    (30, 100000000, 8.9),
    (31, 2000000, 9.6),
    (32, 3500000, 9.3);

    INSERT INTO game_publishers (company, headquarters)
    VALUES 
    ('CD Projekt Red', 'Warsaw, Poland'),
    ('Mojang Studios', 'Stockholm, Sweden'),
    ('Blizzard Entertainment', 'Irvine, USA'),
    ('ConcernedApe', 'Washington, USA'),
    ('FromSoftware', 'Tokyo, Japan'),
    ('Team Cherry', 'Adelaide, Australia'),
    ('id Software', 'Texas, USA'),
    ('Innersloth', 'Redmond, USA'),
    ('Firaxis Games', 'Maryland, USA'),
    ('Psyonix', 'San Diego, USA'),
    ('Supergiant Games', 'San Francisco, USA'),
    ('Riot Games', 'Los Angeles, USA'),
    ('Nintendo', 'Kyoto, Japan'),
    ('Santa Monica Studio', 'Los Angeles, USA'),
    ('Rockstar Games', 'New York, USA'),
    ('Respawn Entertainment', 'Los Angeles, USA'),
    ('CD Projekt', 'Warsaw, Poland'),
    ('Monstars Inc.', 'Tokyo, Japan'),
    ('Larian Studios', 'Ghent, Belgium'),
    ('Arrowhead Game Studios', 'Stockholm, Sweden'),
    ('Motion Twin', 'Bordeaux, France'),
    ('Re-Logic', 'Indiana, USA'),
    ('Kinetic Games', 'London, UK'),
    ('Playground Games', 'Leamington Spa, UK'),
    ('Valve', 'Bellevue, USA'),
    ('MegaCrit', 'Seattle, USA'),
    ('Maxis', 'California, USA'),
    ('Epic Games', 'Cary, USA');


    INSERT INTO game_ranks (game_id, audience, rank) 
    VALUES 
    (1, 5200000, 4),
    (2, 3100000, 10),
    (3, 8800000, 2),
    (4, 760000, 18),
    (5, 2100000, 14),
    (6, 9500000, 1),
    (7, 4700000, 9),
    (8, 1500000, 15),
    (9, 3300000, 12),
    (10, 250000, 20),
    (11, 6700000, 6),
    (12, 5900000, 8),
    (13, 1300000, 17),
    (14, 900000, 19),
    (15, 7300000, 5),
    (16, 4000000, 11),
    (18, 5600000, 7),
    (19, 490000, 16),
    (20, 8200000, 3),
    (22, 3000000, 13),
    (24, 770000, 21),
    (25, 2400000, 22),
    (27, 6500000, 23),
    (28, 7100000, 24),
    (30, 8700000, 25),
    (32, 6900000, 26);

    INSERT INTO game_purchases (game_id, total_purchases, price )
    VALUES 
    (1, 50000000, 39.99),
    (2, 300000000, 26.95),
    (3, 60000000, 59.99),
    (4, 20000000, 14.99),
    (5, 25000000, 59.99),
    (6, 3000000, 14.99),
    (7, 8000000, 49.99),
    (8, 100000000, 4.99),
    (9, 15000000, 59.99),
    (10, 70000000, 19.99),
    (11, 12000000, 24.99),
    (12, 90000000, 0.00),
    (13, 42000000, 59.99),
    (14, 120000000, 0.00),
    (15, 10000000, 69.99),
    (16, 65000000, 59.99),
    (17, 31000000, 59.99),
    (18, 80000000, 0.00),
    (19, 32000000, 59.99),
    (20, 4000000, 39.99),
    (21, 10000000, 59.99),
    (23, 45000000, 9.99),
    (24, 9000000, 14.99),
    (25, 70000000, 0.00),
    (26, 5000000, 59.99),
    (27, 250000000, 0.00),
    (29, 20000000, 59.99),
    (31, 12000000, 59.99),
    (32, 8000000, 69.99);

    INSERT INTO game_publishers_genre (game_id, publisher_id, genre_id) 
    VALUES 
    (1, 1, 1),
    (2, 2, 2),
    (3, 3, 3),
    (4, 4, 4),
    (5, 5, 1),
    (6, 6, 5),
    (7, 7, 3),
    (8, 8, 6),
    (9, 9, 7),
    (10, 10, 8),
    (11, 11, 9),
    (12, 12, 10),
    (13, 13, 11),
    (14, 12, 12),
    (15, 14, 13),
    (16, 15, 13),
    (17, 13, 13),
    (18, 16, 14),
    (19, 1, 1),
    (20, 18, 15),
    (21, 19, 16),
    (22, 20, 17),
    (23, 21, 18),
    (24, 22, 19),
    (25, 23, 20),
    (26, 24, 21),
    (27, 25, 12),
    (28, 26, 22),
    (29, 27, 11),
    (30, 28, 14),
    (31, 19, 16),
    (32, 20, 17);

`

async function main() {

    console.log("seeding....");
    const dbUrl = process.argv[2];

    const client = new Client({
        connectionString: dbUrl
    });

    await client.connect();
    await client.query(SQL);
    await client.end();

    console.log("done");

}

main();

