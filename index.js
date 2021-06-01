const express = require('express');
const path = require("path");
require('dotenv').config();


// Express.js instance
const app = express();

// DB Instance
const mongoose  = require('mongoose');
const Articles  = require('./public/mongoose/schemas/sch_article.js');

// Listen PORT 9000
const PORT = 9000;

// localhost HOST
const HOST = "localhost";

app.get('/', (req, res) => {
        Articles.find().populate('author category').exec().then(articles => {
            res.render("index.pug", { articles });
        }).catch(error => res.send(error.message))
});

app.get('/article/:uid', (req, res) => {
    let id = req.params.uid;
    Articles.find({_id: id}).populate('author category').exec().then(article => {
        if (article && article.length == 1){
            res.render("article.pug", { article });
        }
        else{
            res.render("nonexistent.pug");
        }
    }).catch(error => res.send(error.message))
});

// App Config.
    app.set('title', 'Blog Node JS');
    app.get('title');
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "pug");
    // Express Static Middleware - Resources (CSS/JS/Images/Fonts)
    app.use(express.static('public'));

// DB Config.
    const DB_String = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// Promise
    mongoose.connect(DB_String).then(()=>{
        app.listen(PORT, HOST, () => console.log(`Le serveur est disponible à l'adresse web : http://localhost:${PORT}`));
    });