import express from "express";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});