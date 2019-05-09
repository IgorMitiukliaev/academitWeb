$(document).ready(function () {
	new Vue({
		el: "#phoneBook",
		data: {
			formIncomplete: false,
			fieldIncomplete: {
				firstName: false,
				lastName: false,
				phone: false
			},
			currentId: 0,
			contacts: [],
			currentContact: {
				firstName: "",
				lastName: "",
				phone: ""
			}
		},
		methods: {
			addContact: function () {
				this.formIncomplete = false;
				for (var el in this.currentContact) {
					this.fieldIncomplete[el] = this.currentContact[el] === "";
					if (this.fieldIncomplete[el]) {
						this.formIncomplete = true;
					}
				}
				if (!this.formIncomplete) {
					this.contacts.push({
						id: this.currentId,
						details: this.currentContact
					});
					++this.currentId;
					this.currentContact = {
						firstName: "",
						lastName: "",
						phone: ""
					}
				}
			},

			deleteContact: function (key) {
				var pos = this.contacts.map(function (e) {
					return Number(e.id);
				}).indexOf(Number(key));
				this.contacts.splice(pos, 1);
			}
		}
	})
})
;