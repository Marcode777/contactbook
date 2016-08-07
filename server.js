var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactbookdb', ['contactbookdb']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true})); //this is a new addition
app.use(bodyParser.json());

app.get('/contactbookdb', function(req, res){
  console.log("I received a get request")

  

  db.contactbookdb.find(function(err, docs){
    console.log(docs);
    res.json(docs);
  })
});

app.post('/contactbookdb', function(req, res){
    console.log(req.body);
    db.contactbookdb.insert(req.body, function(err, doc){
        res.json(doc);
    })
})

app.delete('/contactbookdb/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.contactbookdb.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    })
})

app.get('/contactbookdb/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.contactbookdb.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });
});

app.put('/contactbookdb/:id', function(req, res){
    var id = req.params.id;
    console.log(req.body.name);
    db.contactbookdb.findAndModify({query: {_id: mongojs.ObjectId(id)}, //changed from outer () to outer {}
        update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}}, // changed inner () to {}
        new: true}, function (err, doc) {
            res.json(doc);
        });

});



app.listen(3200);
console.log("server running on PORT 3200!")

// expressjs helps organize the web app into an mvc structure on the server side, it basically helps manage everything from routes to handling requests and views, then a database such as mongodb, etc. can then be used provide a backend for this nodejs application
//mongodb is the database used
//requiring mongojs requires the mongojs module so we can use it
// var db = mongojs specifies contactbookdb is the database used within mongodb
// bodyParser is needed to for the server to parse through body of the data of the input, so we require it
// app.get is used to define the route
// db.contactbookdb.find has the server find the data
// app.get, app.post, and so on and so forth