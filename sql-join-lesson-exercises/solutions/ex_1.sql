USE sql_intro;

CREATE TABLE ethnicity (
    id integer PRIMARY KEY,
    name varchar(20)
);

CREATE TABLE gender (
    id integer PRIMARY KEY,
    name varchar(20)
);

CREATE TABLE symptoms (
    family integer PRIMARY KEY,
    fever boolean,
    blue_whelts boolean,
    low_bp boolean
);

CREATE TABLE disease (
    name varchar(20) PRIMARY KEY,
    survival_rate float
);

CREATE TABLE patient (
    id SERIAL PRIMARY KEY,
    ethnicity integer,
    gender integer,
    symptoms_family integer,
    disease varchar(20),
    FOREIGN KEY (ethnicity) REFERENCES ethnicity(id),
    FOREIGN KEY (gender) REFERENCES gender(id),
    FOREIGN KEY (symptoms_family) REFERENCES symptoms(family),
    FOREIGN KEY (disease) REFERENCES disease(name)
);