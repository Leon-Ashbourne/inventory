const { Client } = require("pg");
const process = require("node:process");

const SQL = `
    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255),
        genre VARCHAR(255),
        released INTEGER
    );

    CREATE TABLE IF NOT EXISTS game_reviews (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        game_id INTEGER REFERENCES games (id),
        no_of_reviews INTEGER,
        ratings INTEGER
    );

    CREATE TABLE IF NOT EXISTS game_company (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        game_id INTEGER REFERENCES games (id),
        company VARCHAR(255),
        headquarters VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS game_rankings (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        game_id INTEGER REFERENCES games(id),
        audience INTEGER,
        global_rankings INTEGER
    );

    CREATE TABLE IF NOT EXISTS stock (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        game_id INTEGER REFERENCES games(id),
        total_purchases INTEGER,
        cost_of_each_product INTEGER,
        average_monthly_profits INTEGER
    );

    CREATE TABLE IF NOT EXISTS category (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        category VARCHAR (255)
    );

    INSERT INTO games (name, genre, released)
    VALUES 
    ('The Witcher 3: Wild Hunt', 'Action RPG', 2015),
    ('Minecraft', 'Sandbox / Survival', 2011),
    ('Overwatch', 'First-Person Shooter', 2016),
    ('Stardew Valley', 'Simulation / Farming', 2016),
    ('Elden Ring', 'Action RPG', 2022),
    ('Hollow Knight', 'Metroidvania / Platformer', 2017),
    ('DOOM Eternal', 'First-Person Shooter', 2020),
    ('Among Us', 'Party / Social Deduction', 2018),
    ('Civilization VI', 'Strategy / Turn-Based', 2016),
    ('Rocket League', 'Sports / Action', 2015),
    ('Hades', 'Roguelike / Action', 2020),
    ('Valorant', 'Tactical Shooter', 2020),
    ('Animal Crossing: New Horizons', 'Life Simulation', 2020),
    ('League of Legends', 'MOBA', 2009),
    ('God of War Ragnarök', 'Action / Adventure', 2022),
    ('Red Dead Redemption 2', 'Action / Adventure', 2018),
    ('The Legend of Zelda: Breath of the Wild', 'Action / Adventure', 2017),
    ('Apex Legends', 'Battle Royale / Shooter', 2019),
    ('Cyberpunk 2077', 'Action RPG', 2020),
    ('Tetris Effect', 'Puzzle', 2018),
    ('Dark Souls III', 'Action RPG', 2016),
    ('Celeste', 'Platformer', 2018),
    ('Terraria', 'Sandbox / Adventure', 2011),
    ('Undertale', 'Indie RPG', 2015),
    ('Genshin Impact', 'Action RPG', 2020),
    ('Resident Evil 4 Remake', 'Survival Horror', 2023),
    ('Fortnite', 'Battle Royale', 2017),
    ('The Sims 4', 'Life Simulation', 2014),
    ('Super Mario Odyssey', 'Platformer', 2017),
    ('Call of Duty: Modern Warfare III', 'First-Person Shooter', 2023);


    INSERT INTO game_reviews (game_id, no_of_reviews, ratings)
    VALUES 
    (1, 950000, 9.5),
    (2, 2100000, 9.2),
    (3, 870000, 8.8),
    (4, 550000, 9.0),
    (5, 1600000, 9.6),
    (6, 720000, 9.1),
    (7, 640000, 8.9),
    (8, 1300000, 8.7),
    (9, 480000, 8.6),
    (10, 900000, 8.9),
    (11, 600000, 9.3),
    (12, 950000, 8.8),
    (13, 700000, 9.0),
    (14, 2400000, 9.1),
    (15, 850000, 9.4),
    (16, 1900000, 9.7),
    (17, 1700000, 9.8),
    (18, 1300000, 8.7),
    (19, 1000000, 8.6),
    (20, 300000, 8.5),
    (21, 800000, 9.1),
    (22, 450000, 9.4),
    (23, 1100000, 8.9),
    (24, 600000, 9.2),
    (25, 1900000, 9.0),
    (26, 950000, 8.9),
    (27, 2800000, 8.8),
    (28, 1400000, 8.7),
    (29, 1200000, 9.5),
    (30, 800000, 8.4);

    INSERT INTO game_company (game_id, company, headquarters)
    VALUES 
    (1, 'CD Projekt Red', 'Warsaw, Poland'),
    (2, 'Mojang Studios', 'Stockholm, Sweden'),
    (3, 'Blizzard Entertainment', 'Irvine, California, USA'),
    (4, 'ConcernedApe', 'Seattle, Washington, USA'),
    (5, 'FromSoftware', 'Tokyo, Japan'),
    (6, 'Team Cherry', 'Adelaide, Australia'),
    (7, 'id Software', 'Richardson, Texas, USA'),
    (8, 'Innersloth', 'Redmond, Washington, USA'),
    (9, 'Firaxis Games', 'Hunt Valley, Maryland, USA'),
    (10, 'Psyonix', 'San Diego, California, USA'),
    (11, 'Supergiant Games', 'San Francisco, California, USA'),
    (12, 'Riot Games', 'Los Angeles, California, USA'),
    (13, 'Nintendo', 'Kyoto, Japan'),
    (15, 'Santa Monica Studio', 'Los Angeles, California, USA'),
    (16, 'Rockstar Games', 'New York City, USA'),
    (17, 'Nintendo', 'Kyoto, Japan'),
    (18, 'Respawn Entertainment', 'Los Angeles, California, USA'),
    (21, 'FromSoftware', 'Tokyo, Japan'),
    (23, 'Re-Logic', 'Indiana, USA'),
    (25, 'HoYoverse', 'Shanghai, China'),
    (26, 'Capcom', 'Osaka, Japan'),
    (27, 'Epic Games', 'Cary, North Carolina, USA'),
    (29, 'Nintendo', 'Kyoto, Japan'),
    (30, 'Infinity Ward', 'Woodland Hills, California, USA');


    INSERT INTO game_rankings (game_id, audience, global_rankings) 
    VALUES 
    (1, 32000000, 12),
    (2, 180000000, 2),
    (3, 25000000, 15),
    (4, 15000000, 20),
    (5, 34000000, 10),
    (6, 12000000, 23),
    (7, 17000000, 18),
    (8, 90000000, 5),
    (9, 8000000, 25),
    (10, 45000000, 11),
    (11, 14000000, 19),
    (12, 70000000, 6),
    (13, 35000000, 9),
    (14, 115000000, 3),
    (15, 28000000, 14),
    (16, 60000000, 7),
    (17, 50000000, 8),
    (19, 20000000, 16),
    (20, 5000000, 28),
    (21, 16000000, 21),
    (23, 30000000, 13),
    (24, 12000000, 24),
    (25, 75000000, 4),
    (26, 18000000, 17),
    (27, 150000000, 1),
    (29, 40000000, 10),
    (9, 9000000, 26);

    INSERT INTO stock (game_id, total_purchases, cost_of_each_product, average_monthly_profits)
    VALUES 
    (1, 50000000, 39.99, 120000000),
    (2, 300000000, 26.95, 250000000),
    (3, 60000000, 59.99, 85000000),
    (4, 20000000, 14.99, 40000000),
    (5, 25000000, 59.99, 100000000),
    (6, 3000000, 14.99, 12000000),
    (7, 8000000, 49.99, 30000000),
    (8, 100000000, 4.99, 200000000),
    (9, 15000000, 59.99, 35000000),
    (10, 70000000, 19.99, 60000000),
    (11, 12000000, 24.99, 25000000),
    (12, 90000000, 0.00, 180000000),
    (13, 42000000, 59.99, 80000000),
    (14, 120000000, 0.00, 300000000),
    (15, 10000000, 69.99, 60000000),
    (16, 65000000, 59.99, 150000000),
    (17, 31000000, 59.99, 90000000),
    (18, 80000000, 0.00, 250000000),
    (19, 32000000, 59.99, 50000000),
    (20, 4000000, 39.99, 7000000),
    (21, 10000000, 59.99, 20000000),
    (23, 45000000, 9.99, 40000000),
    (24, 9000000, 14.99, 12000000),
    (25, 70000000, 0.00, 200000000),
    (26, 5000000, 59.99, 10000000),
    (27, 250000000, 0.00, 600000000),
    (29, 20000000, 59.99, 50000000);

    INSERT INTO category (category) 
    VALUES ('company'),
    ('genre'),
    ('year');

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

