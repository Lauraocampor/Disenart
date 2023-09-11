const express = require('express');
const app = express();
const session = require('express-session');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const cookies = require('cookie-parser');
const path = require('path');
const methodOverride = require('method-override');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')

const mainRouter = require('./routes/mainRoutes');
const productRouter = require('./routes/productRoutes');
const usersRouter = require('./routes/usersRoutes');

app.set('view engine', 'ejs');

/* se hace la ruta hasta la carpeta, no el archivo */
app.set('views', [
	path.join(__dirname, './views/users'),
	path.join(__dirname, './views/products'),
]);

// --- Middlewares ---
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: "Is a secret", 
  resave: false,
  saveUninitialized: true
}));
app.use(cookies());
app.use(userLoggedMiddleware)

/* --- Routers --- */
app.use('/', mainRouter);
app.use('/products', productRouter);
app.use("/users", usersRouter);
app.use((req,res)=>{
  res.render('404')
})

/* app.get('/productCart', (req,res) => {
  res.sendFile (path.join(__dirname, '/views/productCart.html'));
}) */

app.listen(process.env.PORT || 3000, () => {
	console.log('Servidor corriendo en puerto ' + (process.env.PORT || 3000));
});
