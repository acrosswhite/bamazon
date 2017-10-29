
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
  var productQueryAll = "SELECT id, product_name, price, stock_quantity FROM products";
  
  connection.query(productQueryAll, function(err, data){
    if (err) throw err;
    for (var i = 0; i < data.length; i++) {
      var row = data[i]
      console.log("Product Code " + row.id + "\nProduct: " + row.product_name + "\nPrice: " + row.price + "\n");
    }
    inquirer.prompt([
    {
      name: "productId",
      message: "What is the ID of the product you would like?"
    },
    {
      name: "units",
      message: "How many would you like?"

    }
    ]).then(function(answers){
      console.log(answers)
      for (var j = 0; j < data.length; j++) {
        var productRow = data[j]
        if (answers.productId == productRow.id){
         // console.log(productRow)
         //check for quantity
         //console.log(parseInt(answers.units))
         //console.log(typeof(productRow.stock_quantity))
          if(parseInt(answers.units) <= productRow.stock_quantity){

            console.log("Thank you for your order")
            //update database with new totals
            console.log("\nCustomer Total: " + (parseInt(answers.units))*(productRow.price))
            console.log("_______________________________")
            updateQuantity(answers.units, answers.productId);

          }
          //if no product left
          else if (parseInt(answers.units) > productRow.stock_quantity){
          console.log("Insufficient quantity")
        }
      }
    }

  })
//          connection.end();
  });
}


function updateQuantity(units, productId){

var productUpdate = connection.query(
  "UPDATE products SET ? WHERE ?",
  [{
    stock_quantity: units
  },
  {
    id: productId
  }],
  function(err, result){
    console.log(result)
    if (err) throw err;
    console.log(result.affectedRows + " quantity updated\n")
  });
}



