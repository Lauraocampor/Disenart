const express = require ("express");
const app = express();
const dotenv = require('dotenv').config();


const path = require('path'); 
app.use(express.static('public'));

app.set('view engine', 'ejs');


const mainRouter = require('./routes/mainRoutes')

/* falta cambiar bien la ruta 25-7*/
app.use('/', (req,res) => {
    res.sendFile (path.join(__dirname, '/views/home.html'))});

 app.get('/details', (req,res) => {
    res.sendFile (path.join(__dirname, '/views/details.html'))});

app.get('/register', (req,res) => {
     res.sendFile (path.join(__dirname, '/views/register.html'))});
    
app.get('/login', (req,res) => {
    res.sendFile (path.join(__dirname, '/views/login.html'))});

app.get('/productCart', (req,res) => {
     res.sendFile (path.join(__dirname, '/views/productCart.html'))});




app.listen(process.env.PORT || 3000) , () => {
    console.log ('Servidor corriendo en puerto ' + process.env.PORT || 3000)
};