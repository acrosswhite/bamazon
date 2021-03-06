var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
//var bamazonCustomer = require("./bamazonCustomer.js")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  superMenu();
});

// View Product Sales by Department
// Create New Department

function superMenu(){
	inquirer.prompt([
	{
		type: "list",
		name: "superMenu",
		message: "What would you like to do?",
		choices: [new inquirer.Separator(), 
		"View product sales by department", "Create new department"
			]
	}
	]).then(function(answers){
		//console.log(answers)
		console.log(JSON.stringify(answers, null, '  '));
		switch (answers.superMenu){
			case "View product sales by department":
			displayDepartments();
			break;

			case "Create new department\n":
			newDepartment();
			break;

			default:
			console.log("Please select from the menu options")
		}
	})
}

function displayDepartments(data){
var table = new Table({
    head: ["department_id", "department_name", "over_head_costs", "product_sales", "total_profit"],
   colWidths: [20]
});
 
//table is an Array, so you can `push`, `unshift`, `splice` and friends 
table.push(data);
 
//console.log(table.toString());
//console.log("departments table")
}


function newDepartment(){
	console.log("new dept")
}





