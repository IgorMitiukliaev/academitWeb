$(document).ready(function () {
	var records = [];
	$("#addButton").click(addItem);
	var addField = $("#addField")
		.change(addItem);
	var editButton = $("<button class=\"btn btn-sm btn-outline-primary edit my-btn \">Edit</button>");
	var delButton = $("<button class=\"my-btn btn btn-sm btn-outline-primary del my-btn \">Del</button>");
	var escButton = $("<button class=\"my-btn btn btn-sm btn-outline-primary esc my-btn \">Esc</button>");
	var saveButton = $("<button class=\"my-btn btn btn-sm btn-outline-primary save my-btn \">Save</button>");

	function addEventListeners() {
		$(".esc").click(showList);
		$(".save").click(saveItemDetail);
		$(".del").click(deleteItem);
		$(".edit").click(editListItem);
	}

	function addItem() {
		var itemDetail = addField.val();
		if (itemDetail.length > 0) {
			records.push({
				itemDetail: itemDetail
			});
			addField.val("");
			showList();
		}
	}

	function showList() {
		var item = $("#list");
		item.empty();
		for (var i = records.length - 1; i >= 0; i--) {
			var itemContent = $("<div></div>")
				.attr("id", i)
				.addClass("list-item input-group");
			var itemText = $("<div></div>")
				.addClass("text form-control")
				.text(records[i].itemDetail);
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
		var element = $("<input id=\"editText\" class=\"form-control input-field\" type=\"text\">")
			.val(records[itemId].itemDetail)
			.addClass("form-control input-field");
		var buttonGroup = $("<div class=\"input-group-append\" id=\"button-addon4\"></div>");
		buttonGroup.append(escButton)
			.append(saveButton);
		item.html(element)
			.append(buttonGroup);
		addEventListeners();
		$("#editText").focus();
	}

	function saveItemDetail() {
		var item = $(this).parent().parent();
		var itemId = Number(item[0].id);
		records[itemId].itemDetail = item.children()
			.filter("#editText")
			.val();
		showList();
	}

	function deleteItem() {
		var item = $(this).parent().parent();
		var itemId = Number(item[0].id);
		records.splice(itemId, 1);
		showList();
	}
});
