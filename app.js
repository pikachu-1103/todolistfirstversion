const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
const app = express();
const port = process.env.PORT;

const items =["Buy Food","Cook Food","Eat Food"];
const workItems =[];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get("/", function (req, res) {
  let day = date.getDate(); // OR  date.getDay()
  res.render("List", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/",function(req,res) {
   let item = req.body.newItem;
   if (req.body.list==="Work List") {
    workItems.push(item);
    res.redirect("/work");
   } else {
   items.push(item);
   res.redirect("/");
   }
});

app.get("/work",function(req,res) {
  res.render("list",{listTitle:"Work List",newListItems:workItems});
});

app.post("/",function(req,res) {
 let item = req.body.newItem;
 workItems.push(item);
 res.redirect("/work");
});


app.get("/contact-me",function(req,res) {
  res.render("contact-me");
});



app.listen(port, function () {
  console.log("Server in running on port " + port + ".");
});

