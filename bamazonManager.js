
var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');
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

function start(){
  inquirer.prompt({
     name: "managerChoice",
     type: "rawlist",
     message: "Hello valued employee #35467! Please enter the index number of your task to proceed.",
     choices: ["View products for sale","View low inventory","Add to inventory","Add new product"]
  }).then(function(answer){
    switch (answer.managerChoice){
      case 'View products for sale':

        allProducts();
        break;
      case 'View low inventory':
        lowInventory();
        break;
      case 'Add to inventory':
        addInventory();
        break;
      case 'Add new product':
        addNew();
        break;
    }
  });
}

//function for if the manager choses to view all Products
function allProducts(){
  connection.query(
    "SELECT * FROM products", function(err, res){
      if(err) throw err;
      console.table(res);
        inquirer.prompt({
          type: "confirm",
          name: "exit",
          message: "Back to main menu?"
        }).then(function(answer){
          console.log(answer);
          if(answer.exit === true){
            start();
          } else {

          }//NEED TO RERUN CONFRIM PROMPT IF USER SELECTS "N"
        })
    }
  )
}; //end allProducts

function lowInventory(){
  connection.query(
    "SELECT * FROM products WHERE stock_quantity < 5", function(err, res){
      if (err) throw err;
      console.table(res);
      inquirer.prompt({
        type: "confirm",
        name: "exit",
        message: "Back to main menu?"
      }).then(function(answer){
        console.log(answer);
        if(answer.exit === true){
          start();
        }

        //NEED TO RERUN CONFRIM PROMPT IF USER SELECTS "N"
      });
    }
  )
};

function addInventory(){

  connection.query(
    "SELECT * FROM products", function(err, res){
      if(err) throw err;
      console.table(res);

      inquirer.prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function(){
            var items = [];
            for(var i=0; i< res.length; i++){
              items.push(res[i].product_name);
            }
            return items;
          },
          message: "Which item's stock are you adding to?"
        },
        {
          name: "amount",
          type: "input",
          message: "How many are you adding to the stock?",
          validate: function(value){
            if(isNaN(value)===false){
              return true;
            }
            return false;
          }
        }
      ]).then(function(answer){
        //console.log(answer);
        var item;

        for(var i = 0; i< res.length; i++){
          if(res[i].product_name == answer.choice){
            item = res[i]

          }
        }
        var addition = parseInt(answer.amount) + parseInt(item.stock_quantity);
        //console.log(item);

        connection.query(
          `UPDATE products SET stock_quantity = ${addition} WHERE product_name = ${item.product_name}`,

           function(err, res){
            if (err) throw err;
            //console.table(res);
            console.log(`You have added ${answer.amount} ${answer.choice} to the stock. The total count is now ${addition}`);
            start();
          }
        )
      });
    }
  )

  //update products.stock_quantity with  stockquantity + add
};

function addNew(){
  inquirer.prompt([
    { name: "item",
      type: "input",
      message: "Input product name"
    },
    {
      name: "department",
      type: "input",
      message: "Input department"
    },
    {
      name: "price",
      type: "input",
      message: "Input product price",
      validate: function(value){
        if(isNaN(value) === false){
          return true;
        }
        return false;
      }
    },
    {
      name: "quantity",
      type: "input",
      message: "Input stock quantity"
    }
  ]).then(function(answer){

    connection.query(
      "INSERT INTO products SET ?",
      {
        product_name: answer.item,
        department_name: answer.department,
        price: answer.price,
        stock_quantity: answer.quantity
      },
      function(err){
        if (err) throw err;
        console.log("Your entry was succesful!");
        start();
      }
    );
  });
}
