const express = require ("express");
const app = express();
const dotenv = require('dotenv').config();


const path = require('path'); 
app.use(express.static('public'));

app.set('view engine', 'ejs');


const mainRouter = require('./routes/mainRoutes')

app.use('/', mainRouter);


 app.get('/details', (req,res) => {
    res.sendFile (path.join(__dirname, '/views/details.html'))});


app.get('/productCart', (req,res) => {
     res.sendFile (path.join(__dirname, '/views/productCart.html'))});




app.listen(process.env.PORT || 3000) , () => {
    console.log ('Servidor corriendo en puerto ' + process.env.PORT || 3000)
};