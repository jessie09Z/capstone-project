import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const api_url ="http://localhost:4000";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//start with the main page

app.get("/", async(req, res)=>{
    try{
        const response = await axios.get(`${api_url}/posts`);
       
        res.render("index.ejs", {posts : response.data});
    }
    catch(error){
        res.status(500).json({messge: "Unable to fetch blog posts from server"});
    }
});
//edit a specific post
app.get("/edit/:id", async(req, res)=>{
    try{
        const response = await axios.get(`${api_url}/posts/${req.params.id}`);
      
        res.render("add.ejs", {post : response.data});
    }
    catch(error){
        res.status(500).json({messge: "Unable to fetch blog posts from server"});
    }
});

app.get("/add", (req, res)=>{
    res.render("add.ejs");
})
app.post("/api/posts", async(req, res)=>{
    try{
        const response = await axios.post(`${api_url}/add`, req.body);
        console.log(response.data);
        res.redirect("/");
    }
    catch(error){
        res.status(500).json({messge: "Unable to fetch blog posts from server"});
    }
});
//patch syntax

app.post("/api/posts/:id", async(req, res)=>{

    try{
        const response = await axios.patch(`${api_url}/posts/${req.params.id}`, req.body);
        console.log(response.data);
        res.redirect("/");
    }
    catch(error){
        res.status(500).json({messge: "Unable to fetch blog posts from server"});
    }

})

app.get("/delete/:id", async(req, res)=>{
    try{
        const response = await axios.delete(`${api_url}/posts/${req.params.id}`);
       
        res.redirect("/");
    }
    catch(error){
        res.status(500).json({messge: "Unable to delete blog posts from server"});
    }
    
});
app.listen(port, ()=>{
    console.log(`Backend server is running on http://localhost:${port}`);

})