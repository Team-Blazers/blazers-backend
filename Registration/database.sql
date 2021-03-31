CREATE DATABASE IF NOT EXISTS easylearn;
USE easylearn;
CREATE TABLE students (
    id int AUTO_INCREMENT,
    username varchar(20) NOT NULL, 
    firstname varchar(20) NOT NULL, 
    email varchar(50),
    address varchar(50),
    phonenumber int(14),
    password varchar(128),
    PRIMARY KEY (id)
);

CREATE TABLE students (
    id int AUTO_INCREMENT,
    username varchar(20) NOT NULL, 
    firstname varchar(20) NOT NULL, 
    email varchar(50),
    address varchar(50),
    phonenumber int(14),
    institution varchar(50),
    password varchar(128), 
    PRIMARY KEY(id)
);