const express = require('express'),
	bodyParser = require('body-parser');

const item = require('./routers/item.js'),
	{ load } = require('./helpers/dependency.js')

const app = express()
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

app.use('/api/item', item);

load().then(() => {
	const port = process.env.PORT || 3000
	console.log(`server is ready on 0.0.0.0:${port}`)
	app.listen(port);
})