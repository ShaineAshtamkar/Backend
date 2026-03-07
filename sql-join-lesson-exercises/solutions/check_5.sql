USE sql_intro;

SELECT t.t_name
FROM student_teacher as st,student as s,teacher as t
WHERE st.student_id=s.s_id
AND st.teacher_id=t.t_id
AND s.s_name='Leo'
AND t.is_tenured=TRUE