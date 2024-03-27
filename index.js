import express from "express";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

let posty = [];

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/createPost", (req, res) => {
    res.render("createPost.ejs");
});

app.get("/viewPosts", (req, res) => {
    res.render("viewPosts.ejs", {posty: posty});
});

app.post("/submit", (req, res) => {
    posty.push(req.body["tekst"]);
    // console.log(posty);
    res.redirect("/viewPosts");
});

app.post("/delete/:id", (req, res) => {
    const postId = req.params.id;
    posty.splice(postId, 1);
    res.redirect("/viewPosts");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});