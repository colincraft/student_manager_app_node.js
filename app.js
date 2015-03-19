var express = require("express"),
app = express(),
redis = require("redis"),
client = redis.createClient(),
methodOverride = require("method-override"),
bodyParser = require("body-parser");


//middleware

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// static fiels
app.use(express.static(__dirname +'/public'));

//routes 
app.get("/", function(req,res){
client.lrange("students", 0, -1, function(err, students){
  res.render("index", {students: students});
  });
});

//post to creat a students
app.post("/create", function(req,res){
  console.log(req.body)
  client.lpush("students", req.body.student)
  res.redirect("/")
});

// delete a student
app.delete("/remove/:student", function(req,res){
  client.lrange("students", 0, -1, function(err, students){
    students.forEach(function(student){
      if (student === req.params.student){
        client.lrem("students", 1, student);
        res.redirect("/")
      }
    })
  })
});

//delete all students
app.delete("/remove/students", function(req,res){
  client.lrange("students", 0, -1, function(err, students){
    console.log(params.body)
      client.lrem("students", client.llen("students"));
      res.redirect("/")
  })
})


app.listen(3000, function(){
  console.log("server is running")
});