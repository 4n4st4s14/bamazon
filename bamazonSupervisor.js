
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
