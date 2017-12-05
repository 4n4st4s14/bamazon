
var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');

var padText = require('./pad.js')
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
     name: "supervisorChoice",
     type: "rawlist",
     message: "Hello boss! Please enter the index number of your task to proceed.",
     choices: ["View product sales by department","Create new department"]
  }).then(function(answer){
    switch (answer.supervisorChoice){
      case 'View product sales by department':

        salesByDept();
        break;
      case 'Create new department':
        newDept();
        break;
    }
  });
}


function salesByDept(){
  connection.query(

    //The ugliest query
    `SELECT
    departments.department_id,
    departments.department_name,
    departments.over_head_costs,
      SUM (products.product_sales) AS sales
    FROM departments
    INNER JOIN products
    ON departments.department_name = products.department_name
    GROUP BY departments.department_id, departments.department_name, departments.over_head_costs`, function(err, res){
      if (err) throw err;
      console.table(res);

      //gotta set up this table
      console.log("\n" + ' Department ID  |  Department Name  |  Overhead Costs  |  Product Sales   |  Total Profit');
      console.log("-----------------------------------------------------------------")

      //loop through database and show all Items w/ cool new for loop
      for(var i=0; i<res.length; i++){

        var departmentID = res[i].department_id + '';
        departmentID = padText("  Department ID  ", departmentID);

        var departmentName = res[i].department_name + '';
        departmentName = padText("  Department Name  ", departmentName);

        var overHead = res[i].over_head_costs.toFixed(2);
        var sales = res[i].sales.toFixed(2);
        var totalProfit = (parseFloat(sales) - parseFloat(overHead)).toFixed(2);

        //add $ signs

        overHead = '$' + overHead;
        sales = '$' + sales;
        totalProfit = '$' + totalProfit;

        //padding for looks
        overHead = padText("  OverHead Costs  ", overHead);
        sales = padText("  Product Sales  ", sales);


        console.log(departmentID + '|' + departmentName + '|' + overHead + '|' + '|' + sales + '|' + totalProfit);
      }

      connection.end();
    }
  )

}


function newDept(){

}
