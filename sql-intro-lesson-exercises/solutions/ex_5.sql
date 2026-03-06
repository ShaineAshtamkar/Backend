USE sql_intro;

UPDATE Dolphin
SET healthy=FALSE
WHERE color ILIKE 'green' OR
    color ILIKE 'brown'
