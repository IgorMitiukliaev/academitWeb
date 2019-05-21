var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", {title: "Express"});
});

var contacts = [];
var id = 0;

router.get("/getContacts", function (req, res) {
	var term = (req.query.term || "").toUpperCase();
	var filteredContacts = term === "" ? contacts : contacts.filter(function (c) {
		return c.phone.toUpperCase().indexOf(term) >= 0
			|| c.name.toUpperCase().indexOf(term) >= 0;
	});
	res.send(filteredContacts);
});

router.post("/addContact", function (req, res) {
	var contact = req.body.contacts;
	var phone = contact.phone;
	var phoneExists = (contacts.length > 0 ? contacts.some(function (c) {
		return c.phone === phone;
	}) : false);
	if (phoneExists) {
		res.send({success: false});
	} else {
		contact.id = id;
		++id;
		contacts.push(contact);
		res.send({success: true});
	}
});

router.post("/deleteContact", function (req, res) {
	var id = req.body.id;
	contacts = contacts.filter(function (c) {
		return c.id !== id;
	});
	res.send(true);
});

router.post("/batchDeleteContacts", function (req, res) {
	var checkedItems = req.body.contacts;
	var term = (req.body.term || "").toUpperCase();
	var filteredCheckedItems = contacts.filter(function (c) {
		return checkedItems.indexOf(c.id) >= 0;
	});
	if (term !== "") {
		filteredCheckedItems = filteredCheckedItems.filter(function (c) {
			console.log(c.phone.toUpperCase().indexOf(term));
			console.log(c.name.toUpperCase().indexOf(term));
			return c.phone.toUpperCase().indexOf(term) >= 0
				|| c.name.toUpperCase().indexOf(term) >= 0;
		});
	}

	contacts = contacts.filter(function (c) {
		return filteredCheckedItems.indexOf(c) < 0;
	});

	res.send(true);
});

module.exports = router;
