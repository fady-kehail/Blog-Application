import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let posts = [];

app.get("/", (req, res) => {
    res.render("pages/home.ejs", {posts} );
});

app.get('/posts/new', (req, res) => {
    res.render('pages/create');
  });

// Route to handle new post submission
app.post('/posts', (req, res) => {
    const newPost = {
      id: posts.length + 1,
      title: req.body.title,
      content: req.body.content,
    };
    posts.push(newPost);
    res.redirect('/');
  });

// Route to show the edit post form
app.get('/posts/:id/edit', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.render('pages/edit', { post });
  });
  


// Route to handle post update
app.post('/posts/:id/edit', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) {
      return res.status(404).send('Post not found');
    }
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect('/');
  });
  
  // Route to delete a post
  app.post('/posts/:id/delete', (req, res) => {
    posts = posts.filter(p => p.id !== parseInt(req.params.id));
    res.redirect('/');
  });
  
  // Start server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  