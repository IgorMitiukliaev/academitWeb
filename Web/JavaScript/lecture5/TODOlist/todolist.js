var addButton = document.getElementById('addButton');
var addField = document.getElementById('addField');

var list = [];
addButton.addEventListener("click", addItem);
addField.addEventListener("submit", addItem);
document.getElementById('refreshButton').addEventListener("click", showList);

function deleteItem() {
	var item = document.activeElement.parentElement;
	var itemId = Number(document.activeElement.parentElement.getAttribute('id'));

	item.parentElement.removeChild(item);
	list.splice(itemId, 1);
}

function addItem() {
	var itemDetail = addField.value;
	list.push({
			itemDetail: itemDetail
		}
	);
	addField.value = '';
	showList();
}

function showList() {
	var item = document.getElementById('todo-list');
	item.innerHTML = '';
	for (i = list.length - 1; i >= 0; i--) {
		var e = document.createElement('li');
		e.innerHTML = "<div id=\"" + i + "\" class=\"clearfix\"> <span class=\"item\">" + list[i].itemDetail +
			"</span><button class=\"item my-button edit\" onclick=\"editListItem()\">Edit</button>" +
			"<button class=\"item my-button delete\" id=\"" + i + "\" onclick=\"deleteItem()\">Del</button>"
			+ "</div>";
		item.appendChild(e);
	}
}

function editListItem() {
	var item = document.activeElement.parentElement;
	var itemId = Number(document.activeElement.parentElement.getAttribute('id'));
	item.innerHTML = "<textarea class=\"edit item todo-list-item\">" + list[itemId].itemDetail +
		"</textarea><button class=\"item my-button edit\" onclick=\"saveItemDetail()\">Save</button>" +
		"<button class=\"item my-button delete\" onclick=\"deleteItem()\">Del</button>"
}

function saveItemDetail() {
	var item = document.activeElement.parentElement;
	var textArea = item.firstChild;
	var itemId = Number(item.getAttribute('id'));
	list[itemId].itemDetail = textArea.value;
	showList();
}