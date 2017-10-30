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
  menu();
});

function menu(){
	inquirer.prompt([
	{
		type: "list",
		name: "menu",
		message: "What would you like to do?",
		choices: [new inquirer.Separator(), "View all products", 
			"View low inventory", 
			"Update Quantity", 
			"Add new product" 
			]
	}
	]).then(function(answers){
		//console.log(answers)
		console.log(JSON.stringify(answers, null, '  '));
		switch (answers.menu){
			case "View all products":
			viewAllProducts();
			break;

			case "View low inventory":
			viewLowInventory();
			break;

			case "Update quantity":
			callQuantity();
			break;

			case "Add new product":
			newProduct();
			break;

			default:
			console.log("Please select from the menu options")
		}
	})
}

function viewAllProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, data) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for (var i = 0; i < data.length; i++) {
      var row = data[i]
      console.log("Product Code " + row.id + "\nProduct: " + row.product_name + "\nDepartment: " + row.department_name + "\nPrice: " + row.price + "\nInventory: " + row.stock_quantity);
      console.log("\n________________________\n")
    }
    //console.log(data);
    connection.end();
  });
}

function viewLowInventory() {
  console.log("Selecting low inventory products...\n");
  connection.query("SELECT id, product_name, department_name, price, stock_quantity FROM products WHERE stock_quantity < 5", 
  	function(err, data) {
    if (err) throw err;
    for (var i = 0; i < data.length; i++) {
      var row = data[i]
      console.log("Product Code " + row.id + "\nProduct: " + row.product_name + "\nDepartment: " + row.department_name + "\nPrice: " + row.price + "\nInventory: " + row.stock_quantity);
      console.log("\n________________________\n")
    }
    // Log all results of the SELECT statement
    //console.log(result);
    connection.end();
  });
}

function callQuantity(){
	viewAllProducts();
		inquirer.prompt([
	{
		name: "productId",
		message: "Which product would you like to update?"
	},
	{
		name: "units",
		message: "How many would you like to add to inventory?"
	}
	]).then(function(answers){
		for (var i = 0; i < data.length; i++) {
			var row = data[i]
			var newUnits = (parseFloat(answers.units) + (row.stock_quantity));
			updateQuantity(newUnits, answers.productId);
		};
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
  connection.end();
}

function newProduct(){
	inquirer.prompt([
		{
			name: "product_name",
			message: "What is the new product name?"
		},
		{
			name: "department_name",
			message: "What department does it belong in?"
		},
		{
			name: "price",
			message: "How much does it cost, per unit?"
		},
		{
			name: "stock_quantity",
			message: "How many do you need to stock?"
		}
		]).then(function(answers){
			console.log(answers)
			addNew(answers.product_name, answers.department_name, parseFloat(answers.price), parseFloat(answers.stock_quantity));
		})
}

function addNew(product_name, department_name, price, stock_quantity){
	console.log("new");
	console.log("Inserting a new product...\n");
  
  var query = connection.query(
    "INSERT INTO products SET ?",
    {
      product_name: product_name,
      department_name: department_name,
      price: price,
      stock_quantity: stock_quantity
    },
    function(err, result) {
    	if (err) throw err;
      	console.log(result.affectedRows + " product inserted!\n");
      	connection.end();
    }

  );


  // logs the actual query being run
  console.log(query.sql);
}
