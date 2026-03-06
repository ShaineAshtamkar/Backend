-- Make sure you're connected to your PostgreSQL database

-- Make sure you're connected to your PostgreSQL database

CREATE TABLE Deity(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    mythology VARCHAR(20),
    main_power VARCHAR(50),
    coolness INT,
    creation_date INT
);

INSERT INTO Deity(name, coolness)
VALUES('Zeus', 11);

SELECT * FROM deity;

INSERT INTO Deity(name, mythology, main_power, coolness, creation_date)
VALUES('Zeus', 'Greek', 'Thunder', 11, -1400);

UPDATE deity
SET coolness = 4,
    creation_date = -1400
WHERE name = 'Hephaestus';

CREATE TABLE Worker(
    email VARCHAR(80) NOT NULL PRIMARY KEY,
    username VARCHAR(20)
);

-- CREATE TABLE table_name(
--     id SERIAL PRIMARY KEY,
--     ...
-- );



DROP TABLE deity



