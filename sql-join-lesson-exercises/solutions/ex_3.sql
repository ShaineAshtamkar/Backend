USE sql_intro;


SELECT COUNT (*)
FROM Patient as p, disease as d
WHERE p.disease=d.name
AND d.name ILIKE'Cabbage disease'



