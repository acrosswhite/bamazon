var mysql = require("mysql");
var inquirer = require("inquirer")

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

function menu(){
	inquirer.prompt([
	{
		name: "menu",
		message: "What would you like to do?",
		choices: ["View all products", "View low inventory", "Update Quantity", "Add new product"]
	}
	]).then(function(answers){
		console.log(answers)
		switch (answers){
			case "View all products":
			viewAllProducts();
			break;

			case "View low inventory":
			viewLowInventory();
			break;

			case "Update quantity":
			inquirer.prompt([])
			updateQuantity(newUnits, productId);
			break;

			case "Add new product":
			addNew(product_name, department_name, price, stock_quantity);
			break;

			default:
			console.log("Please select from the menu options")
		}
	})
}

function viewAllProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, result) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(result);
    //connection.end();
  });
}

function viewLowInventory() {
  console.log("Selecting low inventory products...\n");
  connection.query("SELECT id, product_name, department_name, price, stock_quantity FROM products WHERE stock_quantity < 5", 
  	function(err, result) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(result);
    //connection.end();
  });
}


function updateQuantity(newUnits, productId){

var productUpdate = connection.query(
  "UPDATE products SET ? WHERE ?",
  [{
    stock_quantity: newUnits
  },
  {
    id: productId
  }],
  function(err, result){
    //console.log(result)
    if (err) throw err;
    console.log(result.affectedRows + " quantity updated\n")
  });
  //connection.end();
}

function addNew(product_name, department_name, price, stock_quantity){
	console.log("new");
	console.log("Inserting a new product...\n");
  
  var query = connection.query(
    "INSERT INTO products SET ?",
    {
      name: "product_name",
      department: "department_name"
      price: price,
      quantity: stock_quantity
    },
    function(err, res) {
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      updateProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}
