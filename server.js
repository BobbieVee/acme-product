const express = require('express');
const nunjucks = require('nunjucks');

const db = require('./db');
const list = db.list;
const find = db.find;
const favorite = db.favorite;


const app = express();

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});


app.get('/', (req, res) => {
	console.log('favorite = ', favorite())
	res.render('index', { favorite: favorite() });
}); 

app.get('/products', (req, res) => {
	res.render('products', {products: list()});
}); 

app.get('/products/:id', (req, res) => {
	console.log('product = ', find(req.params.id*1))
	res.render('product', {product: find(req.params.id*1)});
} )

const port = 3000 || process.env.PORT;
app.listen(port, () => console.log(`Listening intently on port ${port}`) );
