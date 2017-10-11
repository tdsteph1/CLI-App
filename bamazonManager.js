var mysql = require("mysql");
var inquirer = require("inquirer");

//Newline
console.log("\n");

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

	menu();

});

//Function(Lists a set of menu options)
function menu()
{

	//prompt the user to select options
	inquirer.prompt([

		{
			type: "rawlist",
			name: "option",
			message: "Welcome manager. Please select an option",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]

		}

		]).then(function(choice)
		{
			//User choice determines which function to execute
			switch(choice.option)
			{
				case "View Products for Sale":
				console.log("\n");
				viewProducts();
				break;

				case "View Low Inventory":
				console.log("\n");
				viewLowInventory();
				break;

				case "Add to Inventory":
				console.log("\n");
				addToInventory();
				break;

				case "Add New Product":
				console.log("\n");
				addNewProduct();
				break;


			}


		});


}

//Function(Allows Manager to view products)
function viewProducts()
{
	//list ID, name, price & quantity.

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
						"Price: " + res[i].price + " | " +
						"Quantity: " + res[i].stock_quantity);
		}

		console.log("-----------------------------------------------------------------------------------------------------\n \n");

		//Recursion
		menu();
	});


}

//Function(List all items with an inventory count lower than 5)
function viewLowInventory()
{

	
	connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res)
	{


		for(var i = 0; i < res.length; i++)
		{
			console.log("Product Name: " + res[i].product_name + " | Quantity: " + res[i].stock_quantity);
			console.log("________________________________________________________________________________ \n \n");
		}

		//Recursion
		menu();
	});
}

//Function(your app should display a prompt that will let the manager "add more" of any item currently in the store)
function addToInventory()
{

	//query the database so manager can select items that he wants to update(quantity)
	connection.query("SELECT * FROM products", function(err, res)
	{
		if(err) throw err;

		//Prompt the manager to select item he wants to update
		inquirer.prompt([

		{
			//Have user select product he would like to update

			name: "product",
			type: "rawlist",
			choices: function()
			{
				var productArray = [];

				for(var i = 0; i < res.length; i++)
				{
					//Push all product_name onto array so user can choose which he'd like to update
					productArray.push(res[i].product_name);
				}
				return productArray;
			},
			message: "Choose the product you would like to add more of."
		},

		{
			//Have user choose how much of a particular item he'd like to add to inventory
			name: "amount",
			type: "input",
			message: "Enter the amount you would like to update"
		}

		]).then(function(answer)
		{
			//get the entire object stored in a variable
			var chosenItem;

			//get the entire item object & store in variable
			for(var i = 0; i < res.length; i++)
			{
				if(res[i].product_name === answer.product)
				{
					chosenItem = res[i];

				}
			}

			//Call updateQuantity function to update the stock_quantity
			updateQuantity(chosenItem, answer, err);
		});

	});



}

//Support Function(adds user input(answer.amount) to the current quantity(stock_quantity))
function updateQuantity(chosenItem, answer, err)
{
	var newQuantity = chosenItem.stock_quantity + parseInt(answer.amount);

	//Update stock_quantity with new amount
	connection.query("UPDATE products SET ? WHERE ?",
	[


		{
			//Update: change to new quantity
			stock_quantity: newQuantity
		},

		{
			//Used to find the location in the table where update will occure
			product_name: answer.product
		}

	],

	function(err)
	{
		if(err) throw err;

		console.log("The stock Quantity successfully updated \n \n");

		//Recursion
		menu();
	});
}


//Function(Allows the manager to add a completely new product to the store)
function addNewProduct()
{
	//prompt the manager to enter new product
	inquirer.prompt([

	{
		type: "input",
		name: "product",
		message: "Enter the product name"
	},

	{
		type: "input",
		name: "category",
		message: "Enter the category or department name"
	},

	{
		type: "input",
		name: "thePrice",
		message: "Enter the price of the item you're currently entering",
		validate: function(value)
		{
			if(isNaN(value) === false)
			{
				return true;
			}
			
			return false;
		}
	},

	{
		type: "input",
		name: "quantity",
		message: "Enter the quantity of your item",
		validate: function(value)
		{
			if(isNaN(value) === false)
			{
				return true;
			}
			
			return false;
		}
	}

	]).then(function(ans)
	{

		//Insert into products table and set the folllowing table columns
		connection.query("INSERT INTO products SET ?",
		{
			//Store user input from prompt into mySQL variables
			//which will add a new product item to the table.
			product_name: ans.product,
			department_name: ans.category,
			price: ans.thePrice,
			stock_quantity: ans.quantity,
			product_sales: 0.00

		},

		function(err)
		{
			if(err) throw err;

			console.log("Your Item was successfully added to the database \n \n");

			//recursion
			menu();

		});


	});



	


}