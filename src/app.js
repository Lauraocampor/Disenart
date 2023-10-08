// EXPRESS CALL
const express = require('express');
const app = express();

// MIDDLEWARE REQUIRE'S
const session = require('express-session');
const cookies = require('cookie-parser');
const path = require('path');
const methodOverride = require('method-override');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

// ROUTER REQUIRE'S
const mainRouter = require('./routes/mainRoutes');
const productRouter = require('./routes/productRoutes');
const usersRouter = require('./routes/usersRoutes');

// VIEW ENGINE CONFIG
app.set('view engine', 'ejs');
app.set('views', [
	path.join(__dirname, './views/users'),
	path.join(__dirname, './views/products'),
]);

// MIDDLEWARES USAGE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(
	session({
		secret: 'Is a secret',
		resave: false,
		saveUninitialized: true,
	}),
);
app.use(cookies());
app.use(userLoggedMiddleware);

// ROUTERS USAGE
app.use('/', mainRouter);
app.use('/products', productRouter);
app.use('/users', usersRouter);
app.use((req, res) => {
	res.render('404');
});

// SERVER ACTIVATION
app.listen(process.env.PORT || 3000, () => {
	console.log('Servidor corriendo en puerto ' + (process.env.PORT || 3000));
});
