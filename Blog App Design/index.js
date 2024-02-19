import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
/* later modify style via public */

/* I will add all posts into the pgAdmin database blog */

const db = new pg.Client(
    {
        user: "postgres",
        host: "localhost",
        database: "Blog",
        password: "Zfj8399598",
        port: 5432,
    }
);
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// add partials later.

async function loadAllPosts() {
    try {
        const result = await db.query("select * from posts");

        return result.rows;
    }
    catch (error) {
        console.error("Unable to load posts", error);
        return [];
    }

}
//homepage load all existing posts
app.get("/posts", async (req, res) => {
    try {
        const posts = await loadAllPosts();

        res.json(posts);
    }
    catch (error) {
        console.error("Unable to render index.ejs", error);
        res.status(500).send("Internal server error");
    }

});


//add new posts, render to /add
app.post("/add", async (req, res) => {

    console.log(req.body);

    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;
    const date = new Date();

    try {
        const p = await db.query("insert into posts (title, content, author, date) values ($1, $2, $3, $4) returning *", [title, content, author, date]);
        console.log(p);
        res.status(201).json(p);

    }
    catch (error) {
        console.error("Unable to add new post", error);
        res.status(500).send("Server error");
    }



});
//get a specific post by id 
app.get("/posts/:id", async (req, res) => {
    try {
        const posts = await loadAllPosts();
        const p = posts.find((post) => post.id === parseInt(req.params.id));

        if (!p) res.status(404).json({ message: `Unable to find ${parseInt(req.params.id)}` });

        res.json(p);

    }
    catch (error) {
        console.error("Unable to read all posts", error);
        res.status(500).send("Internal server error");
    }
});


//patch a specific post by id

app.patch("/posts/:id", async (req, res) => {
    try {
        const posts = await loadAllPosts();
        const p = posts.find((post) => post.id === parseInt(req.params.id));

        if (!p) res.status(404).json({ message: `Unable to find ${parseInt(req.params.id)}` });
        const date = new Date();
        const newPost = {
            id: req.params.id,
            title: req.body.title || p.title,
            content: req.body.content || p.content,
            author: req.body.author || p.author,
            date: date
        }
try{
   await db.query("update posts set title=$1, content=$2, author =$3, date=$4 where id=$5",[newPost.title, newPost.content, newPost.author, newPost.date, newPost.id]); 
    res.json(newPost);
}catch(error){
    console.error(`Unable to patch ${req.params.id} post `, error);
    res.status(500).send("Internal server error");
}
}
      

    
    catch (error) {
        console.error("Unable to read all posts", error);
        res.status(500).send("Internal server error");
    }
});


// delete specified post by id. 
app.delete("/posts/:id", async(req, res)=>{
    const posts = await loadAllPosts();
    const postId=parseInt(req.params.id);
    const post=posts.findIndex((post)=>post.id === postId);
  if(!post) res.status(404).json({messge: `cannot find ${postId}, unable to delete it`});
try{await db.query("delete from posts where id=$1", [postId]);
res.status(200).json({ message: `Post with id ${postId} deleted successfully` });
}

catch(error){
    console.error(`Unable to delete ${postId}`, error);
    res.status(500).send("Internal server error");
}
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});