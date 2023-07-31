SELECT * FROM test.user_info;

SELECT * FROM test.user_info
WHERE gender = "Female";

SELECT * FROM test.user_info
WHERE gender = "Male" AND (age <= 26 AND age >= 20);

SELECT * FROM test.user_info
WHERE email like '%.com' ORDER BY name DESC;

SELECT * FROM test.user_info
WHERE name like '%e%' AND id > 100 AND age > 40;

INSERT INTO test.user_info (id, name, email, gender, age) VALUES (508, 'jihong lee', 'teen0132@gmail.com', 'Male', '23');
SELECT * FROM test.user_info;

UPDATE test.user_info SET age = '21', email = 'teen0132@ks.ac.kr' WHERE id = 508;
SELECT * FROM test.user_info;

DELETE FROM test.user_info WHERE gender != 'Male' AND gender != 'Female';
SELECT * FROM test.user_info;