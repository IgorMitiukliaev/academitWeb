$(document).ready(function () {
	var list = [];
	var table = $("#mainTable");
	var tbody = table.find("#tBody");

	function render() {
		tbody.html("");
		$(".inputForm").children().val("");
		list.forEach(function (item, i, list) {
			var row = $("<tr></tr>");
			var delButton = $("<button id=\"" + i + "\" class=\"btn delete\">X</button>")
				.click(deleteItem);
			row.append("<td class=\"colNumber\">" + (i + 1) + "</td>")
				.append("<td class=\"colFirstName\">" + list[i].firstName + "</td>")
				.append("<td class=\"colLastName\">" + list[i].lastName + "</td>")
				.append("<td class=\"colPhone\">" + list[i].phone + "</td>")
				.append("<td class=\"colDelete\"></td></tr>");
			row.children(".colDelete").append(delButton);
			tbody.append(row);
		});
	}

	function addItem() {
		var formData = $(".inputForm");
		var itemFirstName = formData.find("#formFirstName").val();
		var itemLastName = formData.find("#formLastName").val();
		var itemPhone = formData.find("#formPhone").val();

		if (validateInput()) {
			$("#alertTxt").addClass("noDisplay");
			list.push({
				firstName: itemFirstName,
				lastName: itemLastName,
				phone: itemPhone
			});
			render();
		} else {
			$("#alertTxt").removeClass("noDisplay");
		}
	}

	function validateInput() {
		var check = true;
		$(".input").each(function () {
			el = $(this);
			if (el.val() === "") {
				el.addClass("alert");
				check = false;
			} else {
				el.removeClass("alert");
			}
		});
		return check;
	}

	function deleteItem() {
		i = $(this).attr("id");
		list.splice(i, 1);
		render();
	}

	$("#addButton").click(addItem);
});



