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
    res.render("potwierdzUsuniecie.ejs", {index: postId});
});

app.post("/edit-btn", (req, res) => {
    const idPostu = req.body.postId;
    let postValue = posty[idPostu];
    // console.log(postValue);
    res.render("edytujPost.ejs", {post: postValue, index: idPostu});
});

app.post("/edit", (req, res) => {
    posty[req.body.postIndex] = req.body["tekst-edit"];
    res.redirect("/viewPosts");
});

app.post("/deleteConfirm", (req, res) => {
    const postId = req.body.postIndex;
    const confirmed = req.body.confirmed;

    if (confirmed === "true") {
        posty.splice(postId, 1);
        res.redirect("/viewPosts");
    } else {
        res.redirect("/viewPosts");
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});