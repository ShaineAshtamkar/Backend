--We'll work with these two tables for starters:

-- make sure you're connected to the right database

CREATE TABLE customer(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    city VARCHAR(20),
    gender INT
);

CREATE TABLE company(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    industry VARCHAR(20),
    employees INT
);

CREATE TABLE transaction(
    id SERIAL PRIMARY KEY,
    
    item_purchased VARCHAR(20),
    amount INT,
    discount FLOAT DEFAULT 0, 
   
    customer_id INT,
    company_id INT,
    FOREIGN KEY(customer_id) REFERENCES customer(id),
    FOREIGN KEY(company_id) REFERENCES company(id)
);

INSERT INTO transaction (item_purchased, amount, customer_id, company_id)
VALUES('The Everlasting Wind', 2, 1711, 32);

INSERT INTO customer (id, name, city, gender)
VALUES(1000, 'Byron Trunks', 'Corinth', 3);

INSERT INTO company(id, name, industry, employees)
VALUES(10, 'Twitch', 'Entertainment', 800);

INSERT INTO transaction (item_purchased, amount, customer_id, company_id)
VALUES('The Everlasting Wind', 2, 1000, 10);


SELECT * 
FROM transaction, customer
WHERE transaction.customer_id = customer.id;


SELECT *
FROM transaction, customer, company
WHERE 
    transaction.customer_id = customer.id AND
    transaction.company_id = company.id;


SELECT 
    item_purchased, amount, 
    customer.name AS cust_name, -- aliasing
    company.name AS comp_name
FROM 
    transaction, 
    customer, 
    company
WHERE 
    transaction.customer_id = customer.id AND
    transaction.company_id = company.id;

