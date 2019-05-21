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
			this.err.name = this.name === "";
			this.err.phone = (isNaN(this.phone) || this.phone === "");
			if(this.err.name||this.err.phone){
				return;
			}

			var self = this;
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
			}).done(function () {
				self.name = "";
				self.phone = "";
				self.loadContacts();
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
		}
		,

		batchDeleteContacts: function (term) {
			var answer = confirm("Delete data?");
			if (answer) {
				var self = this;
				$.post({
					url: "/batchDeleteContacts",
					data: JSON.stringify({
						contacts: this.checkedItems,
						term: term
					}),
					contentType: "application/json"
				}).done(function () {
					self.loadContacts();
				});
			}
		}
	}
})
;