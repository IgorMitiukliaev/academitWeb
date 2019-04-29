$(document).ready(function () {
	var list = [];
	$("#addButton")[0].addEventListener("click", addItem, false);
	$("#addField")[0].addEventListener("change", addItem, false);
	var escButton = $("<button class=\"item my-button esc\">Esc</button>")
		.click(showList);
	var saveButton = $("<button class=\"item my-button save\">Save</button>")
		.click(saveItemDetail);

	function addItem() {
		var itemDetail = $("#addField").val();
		if (itemDetail.length > 0) {
			list.push({
				itemDetail: itemDetail
			});
			$("#addField").val("");
			showList();
		}
	}

	function showList() {
		var item = $("#todo-list");
		var editButton = $("</div><button class=\"item my-button edit\">Edit</button>")
			.click(editListItem);
		var delButton = $("<button class=\"item my-button delete\">Del</button>")
			.click(deleteItem);

		item[0].innerHTML = "";
		for (var i = list.length - 1; i >= 0; i--) {
			var itemContent = $("<div></div>")
				.attr("id", i)
				.addClass("list-item clearfix");
			var itemText = $("<div><div")
				.addClass("item todo-list-item")
				.text(list[i].itemDetail);
			itemContent.append(itemText)
				.wrap("<li></li>")
				.appendTo(item[0]);
		}
		$(".list-item")
			.append(editButton)
			.append(delButton);
	}

	function editListItem() {
		var item = $(this).parent();
		var itemId = Number(item[0].id);
		var element = $("<textarea></textarea>")
			.text(list[itemId].itemDetail)
			.addClass("edit item todo-list-item");

		item.html(element)
			.append(escButton)
			.append(saveButton);
	}

	function saveItemDetail() {
		var item = $(this).parent();
		var itemId = Number(item[0].id);
		list[itemId].itemDetail = $(this).siblings().filter("textarea").val();
		showList();
	}

	function deleteItem() {
		var item = $(this).parent();
		var itemId = Number(item[0].id);
		$("div").filter("#" + itemId).remove();
		list.splice(itemId, 1);
	}
});
