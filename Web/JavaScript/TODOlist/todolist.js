function f() {
	var list = [];
	var addButton;
	var addField;
	document.addEventListener("DOMContentLoaded", ready);

	function ready() {
		addButton = document.getElementById("addButton");
		addField = document.getElementById("addField");
		addButton.addEventListener("click", addItem);
		addField.addEventListener("submit", addItem);
	}

	function addItem() {
		var itemDetail = addField.value;
		if (itemDetail.length > 0) {
			list.push({
				itemDetail: itemDetail
			});
			addField.value = "";
			showList();
		}
	}

	function deleteItem() {
		var item = document.activeElement.parentElement;
		var itemId = Number(item.getAttribute("id"));
		item.parentElement.removeChild(item);
		list.splice(itemId, 1);
	}

	function showList() {
		var item = document.getElementById("todo-list");
		item.innerHTML = "";
		for (var i = list.length - 1; i >= 0; i--) {
			var e = document.createElement("li");
			e.innerHTML = "<div id=\"" + i + "\" class=\"clearfix\"><div class=\"item todo-list-item\">"
				+ "</div><button class=\"item my-button edit\">Edit</button>"
				+ "<button class=\"item my-button delete\" id=\"" + i + "\">Del</button>"
				+ "</div>";
			var el = e.firstChild.firstChild;
			el.innerText = list[i].itemDetail;
			item.appendChild(e);
			e.getElementsByClassName("my-button edit")[0].addEventListener("click", editListItem);
			e.getElementsByClassName("my-button delete")[0].addEventListener("click", deleteItem);
		}
	}

	function editListItem() {
		var item = document.activeElement.parentElement;
		var itemId = Number(item.getAttribute("id"));
		item.innerHTML = "<textarea class=\"edit item todo-list-item\">"
			+ list[itemId].itemDetail
			+ "</textarea><button class=\"item my-button esc\">Esc</button>"
			+ "<button class=\"item my-button edit\">Save</button>";
		item.getElementsByClassName("my-button esc")[0].addEventListener("click", showList);
		item.getElementsByClassName("my-button edit")[0].addEventListener("click", saveItemDetail);
	}

	function saveItemDetail() {
		var item = document.activeElement.parentElement;
		var textArea = item.firstChild;
		var itemId = Number(item.getAttribute("id"));
		list[itemId].itemDetail = textArea.value;
		showList();
	}
}

f();