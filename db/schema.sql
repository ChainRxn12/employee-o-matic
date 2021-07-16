DROP DATABASE IF EXISTS astrosDB;

CREATE DATABASE astrosDB;

USE astrosDB;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS job;
DROP TABLE IF EXISTS employee;

-- create department table
CREATE TABLE department (
    id INT AUTO_INCREMENT,
    deptName VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

-- create job table
CREATE TABLE job (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    deptID INTEGER,
    PRIMARY KEY(id)
);

-- create employee table
CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    jobID VARCHAR(30),
    managerID INTEGER,
    PRIMARY KEY(id)
);

-- create department values
INSERT INTO department (deptName)
VALUES 
('Player'),
('Coach'),
('Executive Office'),
('Baseball Operations');

-- create job values
INSERT INTO job (title, salary, deptID)
VALUES
('First Base', 10000000, 1),
('Second Base', 50000000, 1),
('Third Base', 15000000, 1),
('Short Stop', 30000000, 1),
('Pitcher', 20000000, 1),
('Catcher', 12500000, 1),
('Right Field', 17500000, 1),
('Left Field', 10000000, 1),
('Center Field', 2500000, 1),
('Head Coach', 3000000, 2),
('Assistant Coach', 500000, 2),
('Head GM', 10000000, 3),
('Assistant GM', 2000000, 3),
('Owner', 100000000, 4),
('Vice President', 50000000, 4);

-- create employee values
INSERT INTO employee (firstName, lastName, jobID, managerID)
VALUES
("Yuli", "Gurriel", "1B", null),
("Jose", "Altuve", "2B", null),
("Alex", "Bregman", "3B", null),
("Carlos", "Correa", "SS", null),
("Zack", "Greinke", "P", null),
("Martin", "Maldonado", "C", null),
("Kyle", "Tucker", "RF", null),
("Michael", "Brantley", "LF", null),
("Myles", "Straw", "CF", null),
("Dusty", "Baker", "HC", 4),
("Joe", "Espada", "AC", null),
("Alex", "Cintron", "AC", null),
("James", "Click", "GM", 3),
("Brandon", "Taubman", "AGM", 3),
("Jim", "Crane", "OW", 1),
("Creighton", "Kahoalii", "VP", 2);

-- check to see if tables populate correctly
SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM job;

-- try joining information from three tables
SELECT employee.id,
deptName,
jobID,
title,
salary,
firstName,
lastName,
managerID
FROM ((department
JOIN job ON department.id = job.deptID)
JOIN employee on job.id = employee.jobID);