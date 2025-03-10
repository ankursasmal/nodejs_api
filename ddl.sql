create database school;
use school;

CREATE TABLE IF NOT EXISTS school_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(100),
    latitude  float ,
    longitude float

);