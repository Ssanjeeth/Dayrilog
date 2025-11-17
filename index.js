import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;


let savedUsername = "";
let savedTopic = "";
let savedBlog = "";
let editingMode;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
  res.render("index.ejs");
});

app.get("/home", (req,res)=>{
   res.render("index.ejs");
});

app.get("/login",(req,res)=>{
  res.render("login.ejs");
});

app.get("/create",(req, res)=>{
  res.render("myblog.ejs");
});

app.post("/publish",(req,res)=>{
  savedUsername = req.body.username;
  savedTopic = req.body.topic;
  savedBlog = req.body.blog;
  res.render("myblog.ejs",{
    username: savedUsername,
    topic: savedTopic,
    blog: savedBlog});
});
app.get("/myblogs", (req,res)=>{
  if(savedUsername.trim() !== "" && savedTopic.trim() !== "" && savedBlog.trim() !== ""){
    res.render("myblog.ejs",{
      username: savedUsername,
      topic: savedTopic,
      blog: savedBlog});
  } else {
    res.render("noblog.ejs");
  } 
});
app.post("/delete",(req,res)=>{
    savedUsername = "";
    savedTopic = "";
    savedBlog = "";
    res.redirect("/home");
    
});
app.post("/edit", (req,res)=>{
      res.render("myblog.ejs",{
      username: savedUsername,
      topic: savedTopic,
      blog: savedBlog,
      editingMode: true});
});

app.listen(port, ()=>{
    console.log(`Listening in port ${port}`);
})
