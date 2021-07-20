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

      var figlet = require('figlet');
 
        figlet('Employee-O-Matic!', function(err, data) {
            if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
            console.log(data)
    });
  });

  //create inquirer prompts

//   figlet terminal graphic
