$(document).ready(function () {
	var list = [];
	$("#addButton")[0].addEventListener("click", addItem, false);
	var addField = $("#addField");
	addField[0].addEventListener("change", addItem, false);
	var editButton = $("</div><button class=\"btn btn-sm btn-outline-primary edit\">Edit</button>");
	var delButton = $("<button class=\"btn btn-sm btn-outline-primary del\">Del</button>");
	var escButton = $("<button class=\"btn btn-sm btn-outline-primary esc\">Esc</button>");
	var saveButton = $("<button class=\"btn btn-sm btn-outline-primary save\">Save</button>");

	function addEventListeners() {
		$(".esc").click(showList);
		$(".save").click(saveItemDetail);
		$(".del").click(deleteItem);
		$(".edit").click(editListItem);
	}

	function addItem() {
		var itemDetail = addField.val();
		if (itemDetail.length > 0) {
			list.push({
				itemDetail: itemDetail
			});
			addField.val("");
			showList();
		}
	}

	function showList() {
		var item = $("#list");
		item[0].innerHTML = "";
		for (var i = list.length - 1; i >= 0; i--) {
			var itemContent = $("<div></div>")
				.attr("id", i)
				.addClass("list-item input-group");
			var itemText = $("<div><div")
				.addClass("text form-control")
				.text(list[i].itemDetail);
			itemContent.append(itemText)
				.appendTo(item[0]);
		}
		var buttonGroup = $("<div class=\"input-group-append\" id=\"button-addon4\"></div>");
		buttonGroup.append(editButton)
			.append(delButton);
		$(".list-item")
			.append(buttonGroup);
		addEventListeners();
	}

	function editListItem() {
		var item = $(this).parent().parent();
		var itemId = Number(item[0].id);
		var element = $("<textarea id=\"textarea\" rows=\"1\"></textarea>")
			.text(list[itemId].itemDetail)
			.addClass("form-control input-field");
		var buttonGroup = $("<div class=\"input-group-append\" id=\"button-addon4\"></div>");
		buttonGroup.append(escButton)
			.append(saveButton);
		item.html(element)
			.append(buttonGroup);
		addEventListeners();
		$("#textarea").focus();
	}

	function saveItemDetail() {
		var item = $(this).parent().parent();
		var itemId = Number(item[0].id);
		list[itemId].itemDetail = item.children()
			.filter("textarea")
			.val();
		showList();
	}

	function deleteItem() {
		var item = $(this).parent().parent();
		var itemId = Number(item[0].id);
		$("div").filter("#" + itemId).remove();
		list.splice(itemId, 1);
	}
});
