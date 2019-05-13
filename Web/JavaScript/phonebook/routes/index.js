var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'Express'});
});

var contacts = [];
var id = 0;

router.get('/getContacts', function (req, res) {
	var term = (req.query.term || '').toUpperCase();
	var filteredContacts = term === "" ? contacts : contacts.filter(function (c) {
		return term === '' || c.phone.toUpperCase().indexOf(term) >= 0
			|| c.name.toUpperCase().indexOf(term) >= 0;
	});
	res.send(filteredContacts
	);
});

router.post('/deleteContact', function (req, res) {
	var id = req.body.id;
	contacts = contacts.filter(function (c) {
		return c.id !== id;
	});
	res.send(true)
});

router.post('/addContact', function (req, res) {
	var contact = req.body.contacts;
	contact.id = id;
	++id;
	contacts.push(contact);
	res.send({success: true});
});

module.exports = router;
