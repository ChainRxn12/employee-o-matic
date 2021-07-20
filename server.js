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

// BEGIN INQUIRER PROMPTS

// Start Menu Prompt
const start = () => {
    inquirer.prompt({
        message: 'Where do you want to go?',
        name: 'menu',
        type: 'list',
        choices: [
            'View all departments',
            'View all jobs',
            'View all employees',
            'Add a department',
            'Add a job',
            'Add an employee',
            'Update employee job',
            'EXIT',
        ],
    })
// Create switch case options
    .then (response => {
        switch (response.menu) {
            case 'View all departments':
                viewDepartment();
                break;
            case 'View all jobs':
                viewJobs();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a job':
                addJob();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update employee job':
                updateEmloyeeJob();
                break;
            case 'EXIT':
                connection.end();
                break;
            default:
                connection.end();
        }
    });
};

