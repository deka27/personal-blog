const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

// Content for different pages
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing..";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// Initializing express app
const app = express();

// creating global variable called posts to save all the composed posts
let posts = [];

//setting the view engine to EJS

app.set("view engine", "ejs");

//using bodyparser

app.use(bodyParser.urlencoded({ extended: true }));

//using public folder to access static assests like CSS

app.use(express.static("public"));

// Home route
app.get("/", function (req, res) {
  res.render("home", {
    post1: homeStartingContent,
    blogPosts: posts,
  });
});

// About route
app.get("/about", function (req, res) {
  res.render("about", { post2: aboutContent });
});

// Contact route
app.get("/contact", function (req, res) {
  res.render("contact", { post3: contactContent });
});

// Compose route
app.get("/compose", function (req, res) {
  res.render("compose");
});

// Individual post route
app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  // Iterate through the stored posts to find a match
  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      // If the post title matches the requested title, render the post.ejs view with the corresponding title and content
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    } else {
      // If no match is found, render the 404.ejs view
      res.render("404");
    }
  });
});

// Compose post route
app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postContent,
  };

  // Add the new post to the posts array
  posts.push(post);

  // Redirect back to the home page
  res.redirect("/");
});

// Start the server
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
