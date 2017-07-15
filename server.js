const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const methodOveride = require('method-override');

const db = require('./db');
const add = db.add;
const remove = db.remove;
const list = db.list;
const find = db.find;
const favorite = db.favorite;
const seed = db.seed;


const app = express();

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOveride('_method'));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

app.get('/seed', (req, res) => {
	seed();
	res.redirect('/products');
})
app.get('/', (req, res) => {
	console.log('favorite = ', favorite())
	res.render('index', { favorite: favorite() });
}); 

app.get('/products', (req, res) => {
	res.render('products', {products: list()});
});

app.post('/products', (req, res) => {
	console.log('typeof req.body.rating = ', typeof req.body.rating)
	if (!req.body.product) {
		res.render('Error', {message: "Must enter a Product name"});
	} 
	else if (req.body.rating ===  'Choose...' ) {
		res.render('Error', {message: "Must select Rating between 1 and 10"});
	} else {
		add(req.body.product, req.body.rating)
		res.redirect('/products');
	}
}) 

app.get('/products/:id', (req, res) => {
	res.render('product', {product: find(req.params.id*1)});
} );

app.delete('/products/:id', (req, res) => {
	console.log('delete me')
	remove(req.params.id*1);
	res.redirect('/products');
})

const port = 3000 || process.env.PORT;
app.listen(port, () => console.log(`Listening intently on port ${port}`) );
