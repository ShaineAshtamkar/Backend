USE sql_intro;

SELECT COUNT (*)
FROM Patient as p
WHERE p.disease IS NOT NULL
