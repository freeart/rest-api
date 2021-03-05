const async = require("async"),
	sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

const cache = {};

module.exports = {
	cache,
	load: async () => {
		return async.auto({
			db: (cb) => {
				db.run("CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR)", err => cb(err, db));
			}
		}).then(scope => {
			Object.keys(scope).forEach(key => {
				cache[key] = scope[key];
			})
			return scope;
		})
	}
}