var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://minhhoang:thangngo12345@cluster0.lgnla.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { address: 'Mountain 21' };
  dbo.collection("chatrooms").deleteMany(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
});