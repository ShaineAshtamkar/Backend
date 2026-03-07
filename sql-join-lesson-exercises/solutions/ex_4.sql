USE sql_intro;


SELECT p.id,d.survival_rate
FROM Patient as p, disease as d
WHERE p.disease IS NOT NULL AND
p.disease=d.name


