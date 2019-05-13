new Vue({
	el: "#app",
	data: {
		searchTerm: "",
		contacts: [],
		name: "",
		phone: ""
	},
	created: function () {
		this.loadContacts();
	},
	methods: {
		deleteContact: function (contact) {
			var self = this;
			$.post({
				url: "/deleteContact",
				data: JSON.stringify({
					id: contact.id
				}),
				contentType: "application/json"
			}).done(function () {
				self.loadContacts();
			})
		},
		addContact: function () {
			var request = {
				contacts: {
					name: this.name,
					phone: this.phone
				}
			};
			if (this.name === "") {
				return;
			}
			if (this.phone === "") {
				return;
			}

			var self = this;
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
		loadContacts: function () {
			var self = this;
			$.get("/getContacts", {term: this.searchTerm}).done(function (contacts) {
				self.contacts = contacts;
			});
		},
			}
});