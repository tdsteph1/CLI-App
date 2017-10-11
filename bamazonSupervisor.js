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

function menu()
{
	//prompt the user to slect options
	inquirer.prompt([

	{
		type: "rawlist",
		name: "option",
		message: "Welcome superviosr. Please select an option",
		choices: ["View Product Sales by Department", "Create New Department"]
	}




	]).then(function(choice)
	{

		switch(choice.option)
		{
			case "View Product Sales by Department":
			console.log("\n");
			viewProductByDepartment();
			break;

			case "Create New Department":
			console.log("\n");
			createNewDepartment();
			break;
		}

	});
}

function viewProductByDepartment()
{




}



function createNewDepartment()
{

	//prompt user 
	inquirer.prompt([

	{
		type: "input",
		name: "name",
		message: "What is the name of the department?"
	},

	{
		type: "input",
		name: "overhead",
		message: "What is the overhead",
		validate: function(val)
		{
			return val > 0;	//returns only values that are greater than 0 for overhead
		}
	}


	]).then(function(val)
	{
		//insert the data the user entered into the dpartments table
		connection.query("INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)",
			[val.name, val.overhead],

			function(err)
			{
				if(err) throw err;

				console.log("Add was successful \n\n");
			});


	});

	
}