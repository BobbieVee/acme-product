const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const methodOveride = require('method-override');
const routes = require('./routes');

console.log('routes = ', routes)

const app = express();

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOveride('_method'));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

app.use('/', routes)

const port = 3000 || process.env.PORT;
app.listen(port, () => console.log(`Listening intently on port ${port}`) );
