// Set Variables
let addButton = document.getElementById('add-button');
let inventoryEl = document.getElementById('inventoryEl');
let salesEl = document.getElementById('salesEl');
let soldButton = document.getElementById('sold-button');
let tableBody = document.querySelector('#tableBody');
let revenueEl = document.getElementById('revenueEl');
let divRow = document.querySelector("div.row");
let addItemButton = document.getElementById('addItemButton')

let modalTitle = document.querySelector("#Item-title");
let modalImage = document.querySelector("#Item-image");
let modalPrice = document.querySelector("#Item-price");


//Helper Functions
function loadInventory() {
    let inventoryList = JSON.parse(localStorage.getItem('inventory'));
    if (!inventoryList) {
        inventoryList = [];
    }
    return inventoryList;
}

function loadSales() {
    let salesList = JSON.parse(localStorage.getItem('sales'));
    if (!salesList) {
        salesList = [];
    }
    return salesList;
}

function updateNoInventoryText () {
    let inventoryList = loadInventory();
    let h3 = inventoryEl.querySelector("h3");
    if(h3 && inventoryList.length > 0) {
        h3.remove();
    }
    else if(!h3 && inventoryList.length == 0) {
        h3 = document.createElement("h3");
        h3.textContent = "No Inventory To Display";
        inventoryEl.appendChild(h3);
    }
}

//Add Button Event Listener

const myModalAlternative = new bootstrap.Modal('#myModal');

const modal = new bootstrap.Modal('#myModal') 

addButton.addEventListener('click', function() {

    modal.show();

    
});

// Modal Function
addItemButton.addEventListener('click', function() {
    let item = {
        title: "",
        image: "",
        price: "",
        sold: false,
        dateSold: ""
    };
    if (true) {
        item.title = modalTitle.value;
        item.image = modalImage.value;
        item.price = modalPrice.value;
        if(!item.title || !item.price) {
            alert("Please enter the required information");
            return;
        }
        else if(!item.image.includes("http")) {
            item.image = "./assets/images/placeholderimage.png";
            addItem(item);
        }
        else {
            addItem(item);
            modal.hide();
            
        }
    }
});   

// Add Item Function
function addItem(item, updateList = true) {
    let inventoryList = loadInventory();
    let itemEl = document.createElement("div");
    
    itemEl.classList.add('card');
    itemEl.classList.add('col');
    itemEl.style.width = "18rem";

    itemEl.innerHTML = `
    <img src="${item.image}" class ="card-img-top" alt="${item.title}">
    <div class="card-body">
    <h5 class="card-title">${item.title}</h5>
    <p class="card-text">$${item.price}</p>
    <button id="sold-button" class="btn btn-primary">Sold</button>
    </div>
    `;

    inventoryEl.appendChild(itemEl);

    if(updateList) {
        inventoryList.push(item); // Add the item to the inventory list
        localStorage.setItem('inventory', JSON.stringify(inventoryList)); // Save the inventory list to local storage
    }
    updateNoInventoryText();
}

// Show Inventory Function

function showInventory() {
    let inventoryList = loadInventory();
    
    inventoryList.forEach(function(item) {
        addItem(item, false);
    }
) 
    if(inventoryList.length === 0) {
        let h3 = document.createElement("h3");
        h3.textContent = "No Inventory To Display";
        inventoryEl.appendChild(h3);
    }
    updateNoInventoryText();
};

// Sold Button Event Listener

divRow.addEventListener('click', function(event) {
    
    let inventoryList = loadInventory();
    let salesList = loadSales();
    
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
                item.dateSold = prompt("Enter the date sold", "MM/DD");
                
                if(item.dateSold.length !== 5 || !item.dateSold.includes("/")) {
                    alert("Please enter a valid date");
                    return;
                }

                // Update localStorage
                localStorage.setItem('inventory', JSON.stringify(inventoryList));
                localStorage.setItem('sales', JSON.stringify(salesList));

                // Optionally, remove the item from the DOM
                itemElement.remove();
                renderSales();
                updateNoInventoryText();
                updateChart(salesChart);
            }
        }
        else{
            alert("Item not sold");
            return;
        }
    }
});



// Load Sales

function renderSales() {
    let salesList = loadSales();
    let sum = 0;
    tableBody.innerHTML = "";
    if (!salesList) {
        salesList = [];
        showInventory();
        return;
    }
    for(let i = 0; i < salesList.length; i++) {
        let item = salesList[i];
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${item.title}</td>
        <td>$${item.price}</td>
        <td>${item.dateSold}/2024</td>
        `;
        tableBody.appendChild(row);
        localStorage.setItem('sales', JSON.stringify(salesList));
        //getRevenue();
        
        sum += parseFloat(item.price);
    }
    revenueEl.textContent = `Total Revenue: $${sum.toFixed(2)}`;
}

window.onload = renderSales();
window.onload = showInventory();

// Total Revenue Math

// function getRevenue() {
//     let salesList = loadSales();
//     let sum = 0;
//     for(let i = 0; i < salesList.length; i++) {
//         sum += parseFloat(salesList[i].price);
//         revenueEl.textContent = `Total Revenue: $${sum}`;
//     }
// }

// Projected Revenue Math

// function projectedRevenue() {
//     let inventoryList = loadInventory();
//     let salesList = loadSales();
//     let projected = 0;
//     for(let i = 0; i < inventoryList.length; i++) {
//         projected += parseFloat(inventoryList[i].price);
//     }
//     for(let j = 0; j < salesList.length; j++) {
//         projected += parseFloat(salesList[j].price);
//     }
//     console.log(projected.toFixed(2));
// }