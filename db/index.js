var mysql =require('mysql2');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sham201420030',
    database: 'thinksyria'
});

connection.connect(function(err) {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log('Yay! You are connected to the database!');
  });

module.exports= connection

