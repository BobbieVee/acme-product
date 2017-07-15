const app = require('express').Router();
const db = require('../db');

const add = db.add;
const remove = db.remove;
const list = db.list;
const find = db.find;
const favorite = db.favorite;
const seed = db.seed;

app.get('/seed', (req, res) => {
	seed();
	res.redirect('/products');
})

app.get('/', (req, res) => {
	res.render('index', { favorite: favorite() });
}); 

app.get('/products', (req, res) => {
	res.render('products', {products: list()});
});

app.post('/products', (req, res) => {
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
	remove(req.params.id*1);
	res.redirect('/products');
});

module.exports = app;