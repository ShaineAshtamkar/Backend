USE sql_intro;

SELECT s.s_name
FROM student_teacher as st,student as s,teacher as t
WHERE st.student_id=s.s_id
AND st.teacher_id=t.t_id
AND t.t_name='Foster'