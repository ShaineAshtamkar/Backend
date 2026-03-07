USE sql_intro;
--Write a query that determines how many patients have the lettuce disease, per ethnicity


SELECT e.name,COUNT(*)
FROM patient as p ,disease as d,ethnicity as e
WHERE p.disease ILIKE 'Lettuce disease'
AND p.disease=d.name
AND p.ethnicity=e.id
GROUP BY e.name



