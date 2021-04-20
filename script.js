updateMenu();

function addPizza(){

	var pizzaName = document.getElementById('name').value.trim();
	pizzaName = pizzaName.charAt(0).toUpperCase() + pizzaName.slice(1);

	for(let i = 0; i < sessionStorage.length; i++){
		if(pizzaName === sessionStorage.key(i)){
			alert("Please enter a unique name");
			return false;
		}
	}

	const newDiv = document.createElement('div');
	newDiv.className = "menu-row";
	newDiv.id = pizzaName;

	if (document.getElementById('photo').value !== ""){
		const newImage = document.createElement('img');
		newImage.className = "menu-picture";
	 	newImage.src = "images/" + document.getElementById('photo').value + ".jpg";
	 	newImage.alt = document.getElementById('photo').value;

	 	newDiv.appendChild(newImage);
 	}

 	for (let i = 0; i < document.getElementById('heat').value; i++){
		const newImage = document.createElement('img');
	 	newImage.className = "pepper-picture";
	 	newImage.src = "images/pepper.png";
	 	newImage.alt = "Pepper";

	 	newDiv.appendChild(newImage);
 	}

 	const newName = document.createElement('h3');
 	newName.innerHTML = pizzaName;
 	newDiv.appendChild(newName);

 	const newPrice = document.createElement('h4');
 	newPrice.innerHTML = "Price: " + document.getElementById('price').value;
 	newDiv.appendChild(newPrice);

 	var input = document.getElementsByName('toppings[]');
 	var toppings = [];

 	for(let i = 0; i < input.length; i++){
		if(input[i].value !== ""){
			toppings.push(input[i].value.trim());
	 	}
 	}

	if (toppings.length < 2){
	  alert("Please enter at least 2 toppings");
	  return false;
	}

 	const newToppings = document.createElement('h4');
 	newToppings.innerHTML = "Toppings: " + toppings.join(', ');
 	newDiv.appendChild(newToppings);

 	const deleteButton = document.createElement('button');
 	deleteButton.id = "delete";
 	deleteButton.type = "button";
 	deleteButton.setAttribute("onClick", "deletePizza('"+pizzaName+"')");
 	deleteButton.innerHTML = "Delete";
 	newDiv.appendChild(deleteButton);

	const obj = {price: document.getElementById('price').value,
			  	heat: document.getElementById('heat').value,
			  	toppings: document.getElementById('toppings').value,
			  	image: document.getElementById('photo').value,
			  	insertBlock: newDiv.outerHTML + "<hr/>"};

  sessionStorage.setItem(pizzaName, JSON.stringify(obj));

	var childNodesToRemove = document.getElementById('pizza-form').getElementsByClassName('deletable-toppings');
	for(let i = childNodesToRemove.length-1; i >= 0; i--){
		 var childNode = childNodesToRemove[i];
		 childNode.parentNode.removeChild(childNode);
 	}

	document.getElementById('pizza-form').reset();

  updateMenu();

  return false;
}

function updateMenu(){

	var names = [];
	for(let i = 0; i < sessionStorage.length; i++) {
		const key = sessionStorage.key(i);
	  names.push(key);
	}
	names.sort();

  var selectedSort = document.getElementById('sort-by').value;

	switch(selectedSort) {
	  case 'priceLH':
			var sortable = [];
			for(let i = 0; i < names.length; i++) {
			  var price = JSON.parse(sessionStorage.getItem(names[i])).price;
			  sortable.push([names[i], price]);
			}

			sortable.sort(function(a, b) {
			     return a[1] - b[1];});

			document.getElementById('menu-rows-container').innerHTML = "";

			for(let i = 0; i < sortable.length; i++) {
				var newBlock = JSON.parse(sessionStorage.getItem(sortable[i][0])).insertBlock;
			  document.getElementById('menu-rows-container').innerHTML += newBlock;
			}
			break;

	  case 'priceHL':
			var sortable = [];
			for(let i = 0; i < names.length; i++) {
			  var price = JSON.parse(sessionStorage.getItem(names[i])).price;
			  sortable.push([names[i], price]);
			}

			sortable.sort(function(a, b) {
			     return b[1] - a[1];});

			document.getElementById('menu-rows-container').innerHTML = "";

			for(let i = 0; i < sortable.length; i++) {
				var newBlock = JSON.parse(sessionStorage.getItem(sortable[i][0])).insertBlock;
			  document.getElementById('menu-rows-container').innerHTML += newBlock;
			}
			break;

	  case 'heatLH':
			var sortable = [];
			for(let i = 0; i < names.length; i++) {
			  var heat = JSON.parse(sessionStorage.getItem(names[i])).heat;
			  sortable.push([names[i], heat]);
			}

			sortable.sort(function(a, b) {
			     return a[1] - b[1];});

			document.getElementById('menu-rows-container').innerHTML = "";

			for(let i = 0; i < sortable.length; i++) {
				var newBlock = JSON.parse(sessionStorage.getItem(sortable[i][0])).insertBlock;
			  document.getElementById('menu-rows-container').innerHTML += newBlock;
			}
			break;

	  case 'heatHL':
			var sortable = [];
			for(let i = 0; i < names.length; i++) {
			  var heat = JSON.parse(sessionStorage.getItem(names[i])).heat;
			  sortable.push([names[i], heat]);
			}

			sortable.sort(function(a, b) {
			return b[1] - a[1];});

			document.getElementById('menu-rows-container').innerHTML = "";

			for(let i = 0; i < sortable.length; i++) {
				var newBlock = JSON.parse(sessionStorage.getItem(sortable[i][0])).insertBlock;
			  document.getElementById('menu-rows-container').innerHTML += newBlock;
			}
			break;

	  case 'nameZA':

			names.reverse();

			document.getElementById('menu-rows-container').innerHTML = "";
			for(let i = 0; i < names.length; i++) {
				var newBlock = JSON.parse(sessionStorage.getItem(names[i])).insertBlock;
			  document.getElementById('menu-rows-container').innerHTML += newBlock;
			}
			break;

	  default:
			document.getElementById('menu-rows-container').innerHTML = "";
			for(let i = 0; i < names.length; i++) {
				var newBlock = JSON.parse(sessionStorage.getItem(names[i])).insertBlock;
			  document.getElementById('menu-rows-container').innerHTML += newBlock;
			}
	}
}

function addTopping(){
	const newTopping = document.createElement('input');
	newTopping.type = "text";
	newTopping.className = "deletable-toppings";
	newTopping.id = "deletable-toppings";
	newTopping.name = "toppings[]";
	newTopping.setAttribute("placeholder", "Additional topping");

	var parentNode = document.getElementById('pizza-form');

  parentNode.insertBefore(newTopping,document.getElementById('add-topping'));
}

function deletePizza(id){
	var d = confirm("Are you sure you want to delete this pizza?");
	if(d == true) {
		var parentNode = document.getElementById('menu-rows-container');
		var pizza = document.getElementById(id);
		pizza.nextSibling.remove();
		parentNode.removeChild(pizza);
		sessionStorage.removeItem(id);
	}
}
