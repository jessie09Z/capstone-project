import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/jokes", async (req, res) => {
    try {
        const word = req.body.word;
        const result = await axios.get(`https://v2.jokeapi.dev/joke/Any?contains=${word}`);
        const joke = result.data;
        
        let jokeText = "";
        if (joke.error) {
            jokeText = `Sorry, no jokes found related to ${word}.`;
        }
        else{
        if (joke.type === "single") {
            jokeText = joke.joke;
        } else if (joke.type === "twopart") {
            jokeText = `${joke.setup} ${joke.delivery}`;
        }}

        res.render("joke.ejs",{joke:jokeText});
    } catch (error) {
        console.log("Error for fetching jokes", error.message);
        res.status(500).json({ message: "Unable to fetch jokes" });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});