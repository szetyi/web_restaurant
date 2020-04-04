// let navbar = document.getElementById("navbar");
// let hamburger = document.getElementById("hamburger");
// let checkbox = document.getElementById("nav_button");

// DOM elements for the four "pages"
let index = document.getElementById("index");
let menu = document.getElementById("menu");
let booking = document.getElementById("booking");
let info = document.getElementById("info");

// DOM elements for nav links
let index_Link = document.getElementById("index_Link");
let menu_Link = document.getElementById("menu_Link");
let booking_Link = document.getElementById("booking_Link");
let info_Link = document.getElementById("info_Link");



// function OpenNavBar() {
//     navbar.style.maxWidth = "none";
// }

// function CloseNavBar() {
//     navbar.style.maxWidth = "48px";
// }

// hamburger.onclick = function() {

//     if(checkbox.checked){
//         CloseNavBar();
//     }else {
//         OpenNavBar();
//     }

// };

//hides all pages
function hideAll() {
    index.style.display = "none";
    menu.style.display = "none";
    booking.style.display = "none";
    info.style.display = "none";

    index_Link.className = "";
    menu_Link.className = "";
    booking_Link.className = "";
    info_Link.className = "";
}

// functions to reveal each page

function changeToIndex() {
    console.log("index!");

    hideAll();
    index.style.display = "block";
    index_Link.className = "selected";
}

function changeToMenu() {
    console.log("menu!");

    hideAll();
    menu.style.display = "block";
    menu_Link.className = "selected";
}

function changeToBooking() {
    console.log("booking!");

    hideAll();
    booking.style.display = "block";
    booking_Link.className = "selected";
}

function changeToInfo() {
    console.log("info!");

    hideAll();
    info.style.display = "block";
    info_Link.className = "selected";
}
//

// Generate the menu
for (let i = 0; i < menuArray.length; i++) {

    // Create new divs for the menu entry, the text div inside, and the icon div inside that.
    let menu_div = document.createElement('div');
    let text_div = document.createElement('div');
    let icon_div = document.createElement('div');

    // Create Menu image
    let image = document.createElement('img');
    image.src = menuArray[i].img;

    // Create heading for menu item name
    let name = document.createElement('h2');
    name.innerHTML = menuArray[i].name;

    // Create a paragraph for description
    let description = document.createElement('p');
    description.innerHTML = menuArray[i].description;

    // This places the image left or right alternating.
    if(i % 2 === 0){
        menu_div.appendChild(image);
        text_div.appendChild(name);
        text_div.appendChild(icon_div);
        text_div.appendChild(description);
        menu_div.appendChild(text_div);
    } else {
        text_div.appendChild(name);
        text_div.appendChild(icon_div);
        text_div.appendChild(description);
        menu_div.appendChild(text_div);
        menu_div.appendChild(image);
    }
    
    //Populate the icons div, icons are determined in menu_data.js
    for (let j = 0; j < menuArray[i].icons.length; j++) {
        let new_icon = document.createElement('img'); 
        new_icon.src = icons[menuArray[i].icons[j]];
        icon_div.appendChild(new_icon);
    }

    //Finally add the whole thing to the menu page
    menu.appendChild(menu_div);
}