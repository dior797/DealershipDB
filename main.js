var http = require('http')
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var ejs = require('ejs');
var fs = require('fs');


//app object of express
const app = express();

// connect mongoose with localhost:27017
mongoose.connect('mongodb://localhost:27017/DealershipDB');

// working with body parser
app.use(express.urlencoded({ extended: true }));

// set port number
const port = 9090;

// export schema
const user = require("./model/frontEnd");
const { nextTick } = require('process');
const { exec } = require('child_process');
const { ObjectId } = require('mongodb');

// set up ejs engine
app.set('view engine', 'ejs');
app.use(express.static('public/'));


app.get("/edit", async(req, res) => {
    res.render("edit");
})
app.get("/index", async(req, res) => {
    res.render("index");
})
app.get("/delete", async(req, res) => {
    res.render("delete");
})
app.post('/', async(req,res)=>{
    const data = new user(req.body)
    await data.save();
    res.redirect("/existing")
})

app.get("/existing", async(req, res) => {
 const items = await user.find();
    res.render("existing", {items:items});
})

app.get('/output/:id/edit', async (req, res) => {
    const {id} = req.params;
    const items = await user.findById(id);
    res.render('output', { items })
});

app.post("/edit/:id", async(req, res) => {
    const {id} = req.params;
    items = await user.findByIdAndUpdate(id, {
        'make':req.body.make,
        'model':req.body.model,
        'year':req.body.year,
        'img':req.body.img
    });
    res.redirect("/existing");
});
app.post('/delete/:id', async (req, res) => {
    const {id} = req.params;
    console.log(id);
    await user.deleteOne({_id: ObjectId(id)});
    res.redirect("/existing");
});
// activate server at port 9090
app.listen(port, () => {
    console.log('App listening on port')
})
