const express = require ("express");
const app = express();
const dotenv = require('dotenv').config();
const path = require('path'); 
const methodOverride = require('method-override');

const mainRouter = require('./routes/mainRoutes');
const productRouter = require('./routes/productRoutes');

app.set('view engine', 'ejs');

/* se hace la ruta hasta la carpeta, no el archivo */
app.set('views', [
  path.join(__dirname, './views/users'),
  path.join(__dirname, './views/products')
]);


// --- Middlewares ---
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));



/* --- Routers --- */
app.use('/', mainRouter);
app.use('/products', productRouter);


/* app.get('/productCart', (req,res) => {
  res.sendFile (path.join(__dirname, '/views/productCart.html'));
}) */




app.listen(process.env.PORT || 3000) , () => {
    console.log ('Servidor corriendo en puerto ' + process.env.PORT || 3000)
};