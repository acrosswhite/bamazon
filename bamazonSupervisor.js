var mysql = require("mysql");
var inquirer = require("inquirer");
var table_cli = require("cli-table");

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

});


var Table = require('cli-table');
 
// instantiate 
var table = new Table({
    head: ['TH 1 label', 'TH 2 label']
  , colWidths: [100, 200]
});
 
// table is an Array, so you can `push`, `unshift`, `splice` and friends 
table.push(
    ['First value', 'Second value']
  , ['First value', 'Second value']
);
 
console.log(table.toString());