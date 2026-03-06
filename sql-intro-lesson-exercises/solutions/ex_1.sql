USE sql_intro;

CREATE TABLE Dolphin(
    name VARCHAR(50) PRIMARY KEY,
    color VARCHAR(20),
    height INT,
    healthy BOOLEAN DEFAULT TRUE
);

INSERT INTO Dolphin (name,color,height)
VALUES ('Daron','Blue',1)

INSERT INTO dolphin (name, color, height)
VALUES ('Milo', 'Green', 3);

INSERT INTO dolphin (name, color, height)
VALUES ('Nina', 'Gray', 2);

INSERT INTO dolphin (name, color, height)
VALUES ('Bubbles', 'Blue', 1);

INSERT INTO dolphin (color, height)
VALUES ('Pink', 2);