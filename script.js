// let navbar = document.getElementById("navbar");
// let hamburger = document.getElementById("hamburger");
// let checkbox = document.getElementById("nav_button");

let index = document.getElementById("index");
let menu = document.getElementById("menu");
let booking = document.getElementById("booking");
let info = document.getElementById("info");

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

for (let i = 0; i < menuArray.length; i++) {

    console.log(menuArray[i]);
    
    let menu_div = document.createElement('div');

    let text_div = document.createElement('div');

    let image = document.createElement('img');
    image.src = menuArray[i].img;

    let name = document.createElement('h2');
    name.innerHTML = menuArray[i].name;

    let description = document.createElement('p');
    description.innerHTML = menuArray[i].description;

    if(i % 2 === 0){
        menu_div.appendChild(image);
        text_div.appendChild(name);
        text_div.appendChild(description);
        menu_div.appendChild(text_div);
    } else {
        text_div.appendChild(name);
        text_div.appendChild(description);
        menu_div.appendChild(text_div);
        menu_div.appendChild(image);
    }

    menu.appendChild(menu_div);
}