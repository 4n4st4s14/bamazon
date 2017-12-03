
var mysql = require("mysql");
var inquirer = require("inquirer");

//creat the connection information of rhte sql DATABASE
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "",
  database: "bamazon_DB"
});

//connect to the mysql server and sql DATABASE
connection.connect(function(err){
  if (err) throw err;
  //run the start function after the connection is made to prompt the user
  console.log("success");

  start();
});


function start() {
  console.log("Selecting All Items from Bamazon\n");
  //gets all items from database
  connection.query("SELECT * FROM products ", function(err, res) {
    if (err) throw err;

for(var i = 0; i < res.length; i++){
  console.log(res[i].id + " | " + res[i].product_name + " | " + "$" + res[i].price);
}
    console.log("--------------------------------------");
    toBuy(res);
  });
}

//function asking user what they would like to buy
function toBuy(res) {
  inquirer.prompt([{
    name: "idOfItem",
    type: "input",
    message: "What is the list number of the item you would like to buy?",
    validate: function(value){
      if(value > res.length){

        console.log("\nPlease enter a valid list number.");
        return false;
      }
      return true;
    }
  },
  {
    //prompts user asking the amount they would like to buy
    name: "amount",
    type: "input",
    message: "How many of this item would you like to buy?",
    validate: function(value){
      if (isNaN(value)=== false){
        return true;
      }
      console.log("\nPlease enter a number")
      return false;
    }
  }]).then(function(answer){
     //console.log("ANSWERS", answer.idOfItem);
    //  console.log("RESPONSE", res[4].id);
   for(var i=0; i<res.length; i++){
     if(parseInt(res[i].id) === parseInt(answer.idOfItem)){
       var purchase = res[i];
       //console.log(purchase);
       if(parseInt(answer.amount) > parseInt(purchase.stock_quantity)){
         console.log("Sorry, insufficient quantity!")
         toBuy(res);
       }
       else {
         //new amount to push to DATABASE
         purchase.stock_quantity = parseInt(purchase.stock_quantity) - parseInt(answer.amount);

         var updatedStock = purchase.stock_quantity;
         console.log(updatedStock);
         var total = parseInt(answer.amount) * parseInt(purchase.price);

         connection.query(`UPDATE products SET stock_quantity = ${updatedStock}  WHERE id = ${purchase.id}`, function(error){
           if(error) throw error;
           console.log("Your purchase was successful!\nYour total cost for your " + purchase.product_name + "(s) is $" + total);
         })
       }
     }
   };
    //console.log("so far so good");
  });
}
