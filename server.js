
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

  topArtists();
});

function topArtists() {
  console.log("Selecting the best artists...\n");
  connection.query("SELECT * FROM topSongs INNER JOIN topAlbums ON topSongs.artist = topAlbums.artist AND topSongs.year = topAlbums.year", function(err, res) {
    if (err) throw err;

            var artistInfo = [];
            for (var i = 0; i < res.length; i++) {
              artistInfo.push(res[i].artist);
            }
            let uniqueArray = (a) => a.filter((el,i)=> a.indexOf(el) === i);
    console.log(uniqueArray(artistInfo));
    connection.end();
  });
}

// var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
//       query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
//       query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year ";
