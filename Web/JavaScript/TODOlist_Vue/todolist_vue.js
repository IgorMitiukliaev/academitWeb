new Vue({
	el: "#my-form",

	data: {
		newId: 0,
		items: [],
		currentText: ""
	},

	methods: {
		addItem: function () {
			if (this.currentText !== "") {
				this.items.push({
					id: this.newId,
					text: this.currentText
				});
				++this.newId;
				this.currentText = "";
			}
		},

		deleteItem: function (key) {
			var pos = this.items.map(function (e) {
				return Number(e.id);
			}).indexOf(Number(key));

			this.items.splice(pos, 1);
		}
	}
});