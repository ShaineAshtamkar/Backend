USE sql_intro;

CREATE TABLE Student(
    s_id SERIAL PRIMARY KEY,
    s_name VARCHAR(100),
    is_brilliant BOOLEAN
);

CREATE TABLE Teacher (
    t_id SERIAL PRIMARY KEY,
    t_name VARCHAR(100),
    is_tenured BOOLEAN
);

CREATE TABLE student_teacher (
    student_id INT,
    teacher_id INT,
     PRIMARY KEY (student_id, teacher_id),
    FOREIGN KEY (student_id) REFERENCES student(s_id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(t_id)
);

-- INSERT INTO Student VALUES (1, 'Ryan', true); -- note the use of true for TRUE
-- INSERT INTO Student VALUES (2, 'Leo', true); 
-- INSERT INTO Student VALUES (3, 'Ernie', false); -- and false for FALSE in PostgreSQL

-- INSERT INTO Teacher VALUES (1, 'Levine', true);
-- INSERT INTO Teacher VALUES (2, 'Foster', false);
-- INSERT INTO Teacher VALUES (3, 'Schwimmer', false);

--Ryan's teachers: Levine, Foster 
--Leo's teachers: all three 
--Ernie's teachers: Levine (Ernie is a slacker)

-- INSERT INTO student_teacher VALUES (1,1);
-- INSERT INTO student_teacher VALUES (1,2);
-- INSERT INTO student_teacher VALUES (2,1);
-- INSERT INTO student_teacher VALUES (2,2);
-- INSERT INTO student_teacher VALUES (2,3);
-- INSERT INTO student_teacher VALUES (3,1);

-- SELECT * FROM student_teacher




