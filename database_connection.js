var
	mysql = require('mysql');

var connection = mysql.createConnection({
  host   	: 'localhost',
  database	: 'onlineretail',
  user 		: 'root',
  password	: '',
  timezone	: 'utc'
});
 
// connect to database
connection.connect(function(err) {
  if(err){
		console.log(err);
  }  
});

module.exports = connection;