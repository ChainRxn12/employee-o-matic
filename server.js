// require dependencies

const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

//create mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'astrosDB',
  });

  connection.connect((err) => {
      if(err) throw err;
      console.log("Welcome to Houston Astros Employee-O-Matic!");
  });

  //create inquirer prompts