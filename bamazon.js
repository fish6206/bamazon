var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// this is from GreatBay
// function which prompts the user for what action they should take
function start() {
  connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
  //user prompts
  inquirer
    .prompt({
      name: "item_id",
      type: "input",
      message: "What is the product ID of the item you would like to buy?",
    },
      {
        type: 'input',
        name: 'quantity',
        message: 'How many do you need?',
        filter: Number
      }
    ).then(function (input) {

      //grabs user input from questions above
      var item = input.item_id;
      var quantity = input.quantity;

      // Query db to make sure given item ID has enough quantity
      var queryStr = 'SELECT * FROM products WHERE ?';

      connection.query(queryStr, { item_id: item }, function (err, data) {
        if (err) throw err;
        // If user selects invalid item ID, data array will be empty

        if (data.length === 0) {
          console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
          displayInventory();

        } else {
          var productData = data[0];
          // If quantity user requested is available
          if (quantity <= productData.stock_quantity) {
            console.log('Congratulations, the product you requested is in stock! Placing order!');

            // Construct the updating query string
            var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
            // console.log('updateQueryStr = ' + updateQueryStr);

            // Update inventory
            connection.query(updateQueryStr, function (err, data) {
              if (err) throw err;

              console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
              console.log('Thank you for shopping with us!');
              console.log("\n---------------------------------------------------------------------\n");
              /*
               // End the database connection
               connection.end();
               */
            })
          } else {
            console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
            console.log('Please modify your order.');
            console.log("\n---------------------------------------------------------------------\n");

            displayInventory();
          }

        }
      })
    });
}

// displayInventory will retrieve the current inventory from the database and output it to the console
function displayInventory() {
  // console.log('___ENTER displayInventory___');

  // Construct the db query string
  queryStr = 'SELECT * FROM products';

  // Make the db query
  connection.query(queryStr, function (err, data) {
    if (err) throw err;

    console.log('Existing Inventory: ');
    console.log('...................\n');

    /*
		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].item_id + '  //  ';
			strOut += 'Product Name: ' + data[i].product_name + '  //  ';
			strOut += 'Department: ' + data[i].department_name + '  //  ';
			strOut += 'Price: $' + data[i].price + '\n';

			console.log(strOut);
		}
    */

    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, res) {
      if (err) throw err;

      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
    console.log("---------------------------------------------------------------------\n");

    //Prompt the user for item/quantity they would like to purchase
    promptUserPurchase();
  })
}
