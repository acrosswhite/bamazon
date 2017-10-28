
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
  displayProducts();
});

function displayProducts(){
  var productQueryAll = "SELECT id, product_name, price FROM products";
  
  connection.query(productQueryAll, function(err, data){
    if (err) throw err;
    for (var i = 0; i < data.length; i++) {
      var row = data[i]
      console.log("Product Code " + row.id + "\nProduct: " + row.product_name + "\nPrice: " + row.price + "\n");
    }
    inquirer.prompt({
      name: "productId",
      message: "What is the ID of the product you would like?"
    },
    {
      name: "units",
      message: "How many would you like?"
    }).then(function(answers){
      for (var i = 0; i < data.length; i++) {
        if (answers.productId === row.id){
          //check for quantity
          console.log("Thank you for your order")
          //update database with new totals
          console.log("Customer Total: " )
          //give customer a total cost of quantity and price
        }

      }
      //if no product left
      console.log("Insufficient quantity")
    })
          connection.end();
  });
}