Vue.use(VeeValidate, {
    validity: true
    /*,
    mode: "lazy",
    events: 'change'*/
});

new Vue({
    el: "#app",
    data: {
        err: {
            name: false,
            phone: false,
            phoneExists: false
        },
        searchTerm: "",
        contacts: [],
        checkedItems: [],
        name: null,
        phone: null,
        response: {}
    },

    created: function () {
        this.loadContacts();
    },

    computed: {
        classError: function () {
            var error = {};
            error.name = (this.name === "" || this.name === null);
            error.phone = (isNaN(this.phone) || this.phone === "" || this.phone === null || this.phone.indexOf(" ") >= 0);
            return error;
        },

        batchDelDisabled: function () {
            return this.checkedItems.length === 0;
        },

        addDisabled: function () {
            return (this.classError.name || this.classError.phone);
        }
    },

    methods: {
        post: function (url, request) {
            return $.post({
                url: url, data: JSON.stringify(request), contentType: "application/json"
            });
        },

        get: function (url, request) {
            return $.get(url, request);
        },

        addContact: function () {
            var self = this;
            if (this.classError.name || this.classError.phone) {
                return;
            }
            var request = {
                contacts: {
                    name: self.name,
                    phone: self.phone
                }
            };

            var response = this.post("/addContact", request);
            response.done(function () {
                self.loadContacts();
            });

            this.err.phoneExists = !response.success;
            if (this.err.phoneExists) {
                self.loadContacts();
            } else {
                self.name = "";
                self.phone = "";
                this.err = {
                    name: false,
                    phone: false,
                    phoneExists: false
                }
            }
        },

        deleteContact: function (contact) {
            var answer = confirm("Delete data?");
            if (answer) {
                var self = this;
                this.post("/deleteContact", {id: contact.id})
                    .done(function () {
                        self.loadContacts();
                    });
            }
        }
        ,

        loadContacts: function (term) {
            var self = this;
            self.searchTerm = term;
            this.get("/getContacts", {term: term})
                .done(function (contacts) {
                    self.contacts = contacts;
                });
        }
        ,

        batchDeleteContacts: function (term) {
            var answer = confirm("Delete data?");
            if (answer) {
                var self = this;
                var request = {
                    contacts: this.checkedItems,
                    term: term
                };
                this.post("/batchDeleteContacts", request)
                    .done(function () {
                        self.loadContacts();
                    });
                this.checkedItems = [];
            }
        }
    }
})
;