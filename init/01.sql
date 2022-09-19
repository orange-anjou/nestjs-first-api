-- Create the database
CREATE DATABASE IF NOT EXISTS dog_api_db;
GRANT ALL ON dog_api_db.* TO user;
USE dog_api_db;

-- Create the table person
CREATE TABLE person
(
	person_id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50)
);

-- Create the dog table
CREATE TABLE dog
(
	id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50),
	age TINYINT UNSIGNED,
	person_id INT,
	CONSTRAINT person_id
	    FOREIGN KEY (person_id) REFERENCES person (person_id)
);

-- Add multiple persons to the person table
INSERT INTO person(first_name, last_name)
VALUES ('Raphael', 'Anjou'),
	 ('David', 'Milazzo'),
	 ('Random', 'Guy'),
	 ('Daniel', 'Craig');

-- Add multiple dogs to the dog table
INSERT INTO dog(name, age, person_id)
VALUES ('Max', 12, 3),
	 ('Charlie', 3, 4),
	 ('Cooper', 4, 4),
	 ('Milo', 5, 3),
	 ('Rocky', 2, 1),
	 ('Tucker', 8, 4);