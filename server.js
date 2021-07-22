/////////////// REQUIRE DEPENDENCIES ///////////////

const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

/////////////// CREATE MYSQL CONNECTION ///////////////

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345678",
  database: "astrosDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Welcome to Houston Astros Employee-O-Matic!");
  var figlet = require("figlet");

  figlet("Employee-O-Matic!", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
    start();
  });
});

/////////////// BEGIN INQUIRER PROMPTS ///////////////
/////////////////////////////////////////////////////

/////////////// Start Menu Prompt ///////////////
const start = () => {
  inquirer
    .prompt({
      message: "Where do you want to go?",
      name: "menu",
      type: "list",
      choices: [
        "View all departments",
        "View all jobs",
        "View all employees",
        "Add a department",
        "Add a job",
        "Add an employee",
        "Update employee job",
        "Delete employee",
        "EXIT",
      ],
    })
    /////////////// Create switch case options ///////////////
    .then((response) => {
      switch (response.menu) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all jobs":
          viewJobs();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a job":
          addJob();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update employee job":
          updateEmployeeJob();
          break;
        /////////////////   Delete Employee /////////////////
        case "Delete employee":
          deleteEmployee();
          break;
        case "EXIT":
          connection.end();
          break;
        default:
          connection.end();
      }
    });
};

/////////////// BEGIN CREATE FUNCTIONS FOR SWITCH CASES ///////////////
/////////////// MUST USE CONSOLE.TABLE ////////////////////////////////
//////////////////////////////////////////////////////////////////////

///////////////// viewDepartments function ///////////////
const viewDepartments = () => {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
};

///////////////// viewJobs function /////////////////
const viewJobs = () => {
  connection.query("SELECT * FROM job", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
};

///////////////// viewEmployees function /////////////////
const viewEmployees = () => {
  connection.query(
    "SELECT employee.id, deptName, jobID, title, salary, firstName,lastName, managerID FROM ((department JOIN job ON department.id = job.deptID) JOIN employee on job.id = employee.jobID);",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
};

///////////////// addDepartment function /////////////////
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the department name?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department (deptName) VALUES (?)",
        [answer.department],
        function (err, res) {
          if (err) throw err;
          console.log("...Adding Department...");
          start();
        }
      );
    });
};

///////////////// addJob function /////////////////
const addJob = () => {
  inquirer
    .prompt([
      {
        name: "jobTitle",
        type: "input",
        message: "What is the job title?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary?",
      },
      {
        name: "deptID",
        type: "input",
        message: "What is the department ID number?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO job (title, salary, deptID) VALUES (?, ?, ?)",
        [answer.jobTitle, answer.salary, answer.deptID],
        function (err, res) {
          if (err) throw err;
          console.log("...Adding Job...");
          start();
        }
      );
    });
};

///////////////// addEmployee function /////////////////
const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "jobID",
        type: "input",
        message: "What is the employee's job id?",
      },
      {
        name: "managerID",
        type: "input",
        message: "What is the manager's id?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employee (firstName, lastName, jobID, managerID) VALUES (?, ?, ?, ?)",
        [answer.first_name, answer.last_name, answer.jobID, answer.managerID],
        function (err, res) {
          if (err) throw err;
          console.log("...Adding Employee...");
          start();
        }
      );
    });
};

///////////////// updateEmployeeJob function /////////////////
const updateEmployeeJob = () => {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Enter Employee Id",
      },
      {
        name: "jobID",
        type: "input",
        message: "Enter new Job Id",
      },
    ])
    .then((answer) => {
      connection.query(
        "UPDATE employee SET jobID=? WHERE ID=?",
        [answer.jobID, answer.id],
        function (err, res) {
          if (err) throw err;
          console.log("...Updating Employee...");
          start();
        }
      );
    });
};

///////////////// deleteEmployee function /////////////////
///////////////// simplify prompt, select employee by id, create secondary prompt "are you sure/confirm delete"/////////////////
const deleteEmployee = () => {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the id of employee to delete?",
      },
      {
        name: "delete",
        type: "confirm",
        message: "Are you sure you want to delete this employee",
      },
    ])
    .then((answer) => {
      switch (answer.delete) {
        case true:
          connection.query(
            "DELETE FROM employee WHERE id=?",
            [answer.id],
            function (err, res) {
              if (err) throw err;
              console.log("...Deleting employee...");
              viewEmployees();
              //start();
            }
          );
          break;
        case false:
          console.log("Who do you want to delete?");
          deleteEmployee();
          break;
        default:
          start();
      }
    });
};
