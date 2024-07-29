// To Do: create a function for the button click event to add a new div/column with an item to the inventory list.

//To Do: create a function for the button click event to remove the item from the inventory list and add it to the sold list. with confirmation.

//To Do: create a function for the sold list to add it to a table with the item name, price, date sold, and total revenue.

// Set Variables
let addButton = document.getElementById('add-button');
let inventoryEl = document.getElementById('inventoryEl');
let salesEl = document.getElementById('salesEl');
let soldButton = document.getElementById('sold-button');

let inventoryList = [];
let salesList = [];

// Loads Inventory
localStorage.getItem('inventory') ? inventoryList = JSON.parse(localStorage.getItem('inventory')) : inventoryList = [];


// Add Button Event Listener
addButton.addEventListener('click', function() {
    let item = {
        title: "",
        image: "",
        price: "",
        sold: false,
        dateSold: ""
    };
    item.title = prompt("Enter the item name", "Item Name");
    item.image = prompt("Enter the item image URL", "Image URL");
    item.price = prompt("Enter the item price", "$0.00");

    if(!item.title || !item.image || !item.price) {
        alert("Please enter all the information");
        return;
    }
    else {

    addItem(item);
    }
});

// Add Item Function
function addItem(item, updateList = true) {
    let itemEl = document.createElement("div");
    itemEl.classList.add('card');
    itemEl.classList.add('col');
    itemEl.style.width = "18rem";

    itemEl.innerHTML = `
    <img src="${item.image}" class ="card-img-top" alt="${item.title}">
    <div class="card-body">
    <h5 class="card-title">${item.title}</h5>
    <p class="card-text">$${item.price}</p>
    <button id="sold-button" class="btn btn-primary">Sold</button
    </div>
    `;

    inventoryEl.appendChild(itemEl);

    if(updateList) {
        inventoryList.push(item); // Add the item to the inventory list
        localStorage.setItem('inventory', JSON.stringify(inventoryList)); // Save the inventory list to local storage
    }
}

// Show Inventory Function

function showInventory() {
    localStorage.getItem("inventory");
    inventoryList.forEach(function(item) {
        addItem(item, false);
    }
)
    if(inventoryList.length === 0) {
        let h3 = document.createElement("h3");
        h3.textContent = "No Inventory To Display";
        inventoryEl.appendChild(h3);
    }
};

// Loads Inventory
window.onload = showInventory();
//To Do: create a function for the button click event to remove the item from the inventory list and add it to the sold list. with confirmation.

/* soldButton.addEventListener('click', function(event) {
    event.preventDefault();
    sellItem = confirm("Are you sure you have sold this item?");
    if(sellItem == true) {
        item.sold = true;
        let soldItem = inventoryList.splice(inventoryList.indexOf(item), 1);
        salesList.push(soldItem);
        item.dateSold = prompt("Enter the date sold", "MM/DD/YYYY");
        localStorage.setItem('inventory', JSON.stringify(inventoryList));
        localStorage.setItem('sales', JSON.stringify(salesList));
    }
    else{
        alert("Item not sold");
        return;
    }
}); */

// Sold Button Event Listener

// Assuming you have a way to select all sold buttons, e.g., by a class name
    let divRow = document.querySelector("div.row")
    divRow.addEventListener('click', function(event) {
        const target = event.target;
        if(target.matches('#sold-button')) {
        // Confirm the sale
        sellItem = confirm("Are you sure you have sold this item?");
        event.stopPropagation();
        //event.stopImmediatePropagation();

            if(sellItem == true) {
                // Find the item associated with this button
                let itemElement = event.target.closest('.card');
                let itemTitle = itemElement.querySelector('.card-title').textContent;
                let item = inventoryList.find(i => i.title === itemTitle);

                if (item) {
                    // Mark the item as sold
                    item.sold = true;
                    let soldItem = inventoryList.splice(inventoryList.indexOf(item), 1)[0];
                    salesList.push(soldItem);
                    item.dateSold = prompt("Enter the date sold", "MM/DD/YYYY");

                    // Update localStorage
                    localStorage.setItem('inventory', JSON.stringify(inventoryList));
                    localStorage.setItem('sales', JSON.stringify(salesList));

                    // Optionally, remove the item from the DOM
                    itemElement.remove();
                }
            }
            else{
                alert("Item not sold");
                return;
            }
        }
    });


//To Do: create a function for the sold list to add it to a table with the item name, price, date sold, and total revenue.