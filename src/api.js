const express = require('express'),
	bodyParser = require('body-parser');

const item = require('./routers/item.js'),
	{ load } = require('./helpers/dependency.js')

const app = express()
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

app.use('/api/item', item);

load().then(() => {
	app.listen(process.env.PORT || 3000);
})