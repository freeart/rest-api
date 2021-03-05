const { cache: libs } = require('../helpers/dependency'),
	express = require('express')

const router = express.Router();

function getById(id, cb) {
	libs.db.get("SELECT id, name FROM items where id = $id", { $id: id }, cb);
}

router.get('/list', (req, res) => {
	libs.db.all("SELECT id, name FROM items", (err, rows) => {
		if (err) {
			return res.status(500).send({ message: err.message })
		}
		res.send({ result: rows });
	});
});

router.get('/:id', (req, res) => {
	getById(req.params.id, (err, row) => {
		if (err) {
			return res.status(500).send({ message: err.message })
		}
		res.send({ result: row });
	})
});

router.put('/:id', (req, res) => {
	libs.db.run("UPDATE items set name = $name where id = $id", { $id: req.params.id, $name: req.body.name }, function (err, row) {
		if (err) {
			return res.status(500).send({ message: err.message })
		}
		getById(req.params.id, (err, row) => {
			if (err) {
				return res.status(500).send({ message: err.message })
			}
			res.send({ success: this.changes === 1, result: row });
		})
	});
});

router.post('/', (req, res) => {
	libs.db.run("INSERT INTO items (name) values ($name)", { $name: req.body.name }, function (err, row) {
		if (err) {
			return res.status(500).send({ message: err.message })
		}
		getById(this.lastID, (err, row) => {
			if (err) {
				return res.status(500).send({ message: err.message })
			}
			res.send({ success: this.changes === 1, result: row });
		})
	});
});

router.delete('/:id', (req, res) => {
	libs.db.run("DELETE FROM items where id = $id", { $id: req.params.id }, function (err, row) {
		if (err) {
			return res.status(500).send({ message: err.message })
		}
		res.send({ success: this.changes === 1 });
	});
});

module.exports = router;