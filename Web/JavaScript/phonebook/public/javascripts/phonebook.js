Vue.use(VeeValidate, {
	validity: true
});

new Vue({
	el: "#app",
	data: {
		err: {
			name: false,
			phone: false
		},
		searchTerm: "",
		contacts: [],
		checkedItems: [],
		name: null,
		phone: null
	},

	created: function () {
		this.loadContacts();
	},

	methods: {
		addContact: function () {
			if (this.name === "") {
				this.err.name = true;
				return;
			} else {
				this.err.name = false;
			}
			if (isNaN(this.phone) || this.phone === "") {
				this.err.phone = true;
				return;
			} else {
				this.err.phone = false;
			}

			var self = this;
			var checkPhone = false;

			$.get("/checkPhone", {phone: this.phone}, checkPhone)
				.done(function (checkPhone) {
					var confirmAdd = (checkPhone.phoneExists ? confirm("Phone already exists, add new contact?") : true);
					if (confirmAdd) {
						var request = {
							contacts: {
								name: self.name,
								phone: self.phone
							}
						};

						$.post({
							url: "/addContact",
							data: JSON.stringify(request),
							contentType: "application/json"
						});
					}
					self.name = "";
					self.phone = "";
					self.loadContacts()
				});
		},

		deleteContact: function (contact) {
			var answer = confirm("Delete data?");
			if (answer) {
				var self = this;
				$.post({
					url: "/deleteContact",
					data: JSON.stringify({
						id: contact.id
					}),
					contentType: "application/json"
				}).done(function () {
					self.loadContacts();
				});
			}
		},

		loadContacts: function (term) {
			var self = this;
			self.searchTerm = term;
			$.get("/getContacts", {term: term}).done(function (contacts) {
				self.contacts = contacts;
			});
		},

		batchDeleteContacts: function () {
			var answer = confirm("Delete data?");
			if (answer) {
				var self = this;
				$.post({
					url: "/batchDeleteContacts",
					data: JSON.stringify({
						contacts: this.checkedItems
					}),
					contentType: "application/json"
				}).done(function () {
					self.loadContacts();
				});
			}
		}
	}
});