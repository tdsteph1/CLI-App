var mysql = require("mysql");
var inquirer = require("inquirer");

//Create the connection information for the sql database
var connection = mysql.createConnection({

	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"

});

//connect to mysql server and sql database
connection.connect(function(err)
{
	if(err) throw err;

	displayItems();
});

//Display all items availible for sale.
//include id's, names, prices of product for sale
function displayItems()
{
	//Select All from (products) table within (bamazon) DB
	connection.query("SELECT * FROM products", function(err, res)
	{

		if(err) throw err;

		//Display all products in table by looping through each row inside table
		for(var i = 0; i < res.length; i++)
		{
			console.log("ID: " + res[i].item_id + " | " +
						"Product Name: " + res[i].product_name + " | " +
						"Category: " + res[i].department_name + " | " +
						"Price: " + res[i].price );
		}

		console.log("-----------------------------------------------------------------\n");

		//Allow Customer to make purchase
		buy();

	});
}


//Function allows user to buy item inside table by quantity
function buy()
{
	//query the databse for all items being sold
	connection.query("SELECT * FROM products", function(err, res)
	{
		
		if(err) throw err;

		//Prompt the user to input data
		inquirer.prompt([

			{
				//Ask for id of the product the user wants to buy
				name: "id",
				type: "list",
				choices: function()
				{
					var idChoiceArray = [];

					for(var i = 0; i < res.length; i++)
					{

						//push all items_ids into (idChoiceArray) in order to display all ids to choose from
						//NOTE: For rawlist cannot use type(INT) only (string) hence convert int to string by JSON.stringify
						idChoiceArray.push(JSON.stringify(res[i].item_id));
					}

					//display all item_id's to choose from
					return idChoiceArray;
				},
				message: "Enter the id of the product you want to purchase"
			},

			{
				//Ask customer for how many units they'd like to buy
				type: "input",
				name: "quantity",
				message: "How many units would you like to buy?"
			}

			]).then(function(answer)
			{
				//get the entire item object & store in variable
				var chosenItem;

				for(var i = 0; i < res.length; i++)
				{
					//if id == user id choice then store entire object
					if(res[i].item_id === parseInt(answer.id) )
					{
						chosenItem = res[i];
					}
				}

				

				//call the checkQuantity function & update the table if the quantity entered is sufficient
				checkQuantity(chosenItem, answer, err);

			});

	});
}

//Function Allows user to make a purchase if the quantity is sufficient
function checkQuantity(chosenItem, answer, err)
{
	//subtract current quantity from number of items that customer wants to purchase
	//in order to determine there is enough
	if( (chosenItem.stock_quantity - parseInt(answer.quantity) ) >= 0)
	{
		//Subtract the slected quantity from current quantity(stock_quantity) in stock
		var newQuantity = chosenItem.stock_quantity - parseInt(answer.quantity);

		//update the product_sales by (quantity) * (price) then do a running sum of current product sals + the recently added product sales
		var productSales = parseInt(answer.quantity) * chosenItem.price;

			productSales = productSales + chosenItem.product_sales;

		//update stock_quantity
		connection.query("UPDATE products SET ? WHERE ?",
		[
			
			{
				//Update: change to the new quantity after purchase
				stock_quantity: newQuantity,

				//Update the total # in sales or product sales
				product_sales: productSales
			},

			{
				//Used to find the location in the table where the updates will occure
				item_id: answer.id
			}

		],

		function(err)
		{
			if(err) throw err;

			console.log("Purchase successfull");
			console.log("The Total Cost is: $" + (chosenItem.price * answer.quantity).toFixed(2) );

			console.log("\n\n");

			displayItems();
		});
	}
	else
	{
		//insufficient quantity
		console.log("Insufficient Quantity.");
		console.log("We currently stock " + chosenItem.stock_quantity );

		console.log("\n\n");

		//start over
		buy();
	}
}