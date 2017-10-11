# CLI-App
**Challenge 1**
![Image of product Table](https://github.com/tdsteph1/CLI-App/blob/master/images/pic1.png)

As you can see I've created the database called **Bamazon** and a table called **products** with the following columns: 

* item_id (unique id for each product)
* product_name (Name of product)
* department_name
* price (cost to customer)
* stock_quantity (how much of the product is available in stores)

![Image of product Table](https://github.com/tdsteph1/CLI-App/blob/master/images/pic2.png)

This is the current table called **products** and we will add changes to this table by using 2 Node.js apps called:

* bamazonCustomer
* bamazonManager

**bamazonCustomer.js**
![Image of product Table](https://github.com/tdsteph1/CLI-App/blob/master/images/pic3.png)

As you can see the node.js app displays the table currently in our database by selecting all data from products table. The table with 10 items allows the user to select an item he or she wants to purchase by selecting the id number 1 through 10. (NOTE: this table willcan have more than 10 items or rows when the manager adds new products in the bamazonManager app). As you can see the user enters 1(Iphone5) and then selects the quantity of Iphone that person may want to purchase, in this case 1 and then we calculate the total cost which is 1(quantity) * 100(price) = $100.00.

![Image of product Table](https://github.com/tdsteph1/CLI-App/blob/master/images/pic4.png)

As you can see the table inside our database makes updates by subtracting 1 from the current quantity of iphones in stock and also adds the product sale relating to the iphone5.


![Image of product Table](https://github.com/tdsteph1/CLI-App/blob/master/images/pic5.png)

Here we select id 1 and buy 2 iphones. We then calculate the total cost of 2 phones the quantity(2) * price(100.00) = 200.00 then we update the product sales by taking the current product sales and adding the total cost(200.00) to that which should equal to 100.00 + 200.00 = 300.00. Lastly we substract 2 from the current quantity and add that update to our products table.

![Image of product Table](https://github.com/tdsteph1/CLI-App/blob/master/images/pic6.png)

As you can see the quantity is 97 since 3 phones have been sold becasue 1 customer purchased 1 Iphone5 and another customer purchased 2 iphone5s. Also the product sale is 300.00.

![Image of product Table](https://github.com/tdsteph1/CLI-App/blob/master/images/pic7.png)

As you can see the user wants to purchase 3 copies of Destiny 2 so the user enters id number 10 and the user gets an error message saying that the quantity is insufficient since the current quantity is 0. You can also see that in the products table inside workbench in the previous pics.

![Image of product Table](https://github.com/tdsteph1/CLI-App/blob/master/images/pic8.png)

Here the user purchases 50 Alienware computers by entering the id 5. The total is $50,000 since each Alienware computer cost $1000.00. The app then updates the quantity and the product sales.

![Image of product Table](https://github.com/tdsteph1/CLI-App/blob/master/images/pic9.png)

The new quantity is 50 and the product sales is $50.000


**bamazonManager.js**
![Image of product Table](https://github.com/tdsteph1/CLI-App/blob/master/images/pic10.png)

As you can see the manager has 4 options
* View Products for Sale
* View Low Inventory
* Add to Inventory
* Add New Product

Here in the picture the manager selects view products which is identical to our table inside the workbench. The manger also selects view low inventory option and diplays GTA 5 and Destiny 2 due to the fact that both quanities are less than 5.

![Image of product Table](https://github.com/tdsteph1/CLI-App/blob/master/images/pic11.png)

Here the manager updates the quantity of Destiny 2 and sets it to 20. We then display the table again and you can see the updates have been made inside the table, in this case quantity for Destiny 2 is equals to 20.

![Image of product Table](https://github.com/tdsteph1/CLI-App/blob/master/images/pic12.png)

Lastly, The manager adds a new product called 4k Television set. The manger enters information pertaining to that product:
* Name: 4k Television
* Category: Electronics
* Price: 2000.00
* Quantity: 100

then we display the table again which shows the newly added product called 4k Television.

![Image of product Table](https://github.com/tdsteph1/CLI-App/blob/master/images/pic13.png)

The 4k Televisoin added to Products table inside bamazon database with all of its columns.

**bamazonSupervisor**
![Image of product Table](https://github.com/tdsteph1/CLI-App/blob/master/images/pic14.png)
