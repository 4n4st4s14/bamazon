
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
  
    //console.log("so far so good");
  })
}
