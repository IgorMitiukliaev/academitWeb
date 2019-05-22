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
		phone: null,
		batchDelDisabled: true
	},

	created: function () {
		this.loadContacts();
	},

	computed: {
		classError: function () {
			var self = this;
			this.err.name = this.name === "" || this.name === null;
			this.err.phone = isNaN(this.phone) || this.phone === "" || this.phone === null;
			return this.err;
		}
	},

	methods: {
		request: function (url, data, context) {
			$.post({
				url: url,
				data: data,
				contentType: "application/json"
			}).done(function () {
				context.loadContacts();
			});
		},

		addContact: function () {
			var self = this;
			if (this.classError.name||this.classError.phone) {
				return;
			}

			var request = {
				contacts: {
					name: self.name,
					phone: self.phone
				}
			};
			this.request(
				"/addContact",
				JSON.stringify(request),
				self);
			self.name = "";
			self.phone = "";
			this.err = {
				name: false,
				phone: false
			}
		},

		deleteContact: function (contact) {
			var answer = confirm("Delete data?");
			if (answer) {
				var self = this;
				this.request(
					"/deleteContact",
					JSON.stringify({
						id: contact.id
					}),
					self);
			}
		},

		loadContacts: function (term) {
			var self = this;
			self.searchTerm = term;
			$.get("/getContacts", {term: term}).done(function (contacts) {
				self.contacts = contacts;
			});
		},

		enableBatchDelete: function () {
			this.batchDelDisabled = this.checkedItems.length === 0;
		},

		batchDeleteContacts: function (term) {
			var answer = confirm("Delete data?");
			if (answer) {
				var self = this;
				this.request(
					"/batchDeleteContacts",
					JSON.stringify({
						contacts: this.checkedItems,
						term: term
					}),
					self);
				this.checkedItems = [];
				this.batchDelDisabled = true;
			}
		}
	}
});