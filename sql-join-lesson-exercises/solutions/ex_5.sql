USE sql_intro;

SELECT symptoms_family,COUNT(*)
FROM patient as p
WHERE p.disease ILIKE 'Cabbage disease'
GROUP BY p.symptoms_family

