// let navbar = document.getElementById("navbar");
// let hamburger = document.getElementById("hamburger");
// let checkbox = document.getElementById("nav_button");

// DOM elements for the four "pages"
let index = document.getElementById("index");
let menu = document.getElementById("menu");
let booking = document.getElementById("booking");
let info = document.getElementById("info");

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

// function to reveal each page
function changeTo(page) {
    // console.log(page.id);
    hideAll();
    page.style.display = "block";
    let link = document.getElementById(String(page.id) + "_Link");
    // console.log(link);
    link.className = "selected";
}

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


//Google Maps API initialization for INFO page.
function initMap() {

    let options = {
        center: {lat: 47.497699, lng: 19.071365},
        zoom: 16,
        gestureHandling: 'cooperative'
    };

    let map = new google.maps.Map(document.getElementById('map'), options);

    let marker = new google.maps.Marker({
        position: {lat: 47.497699, lng: 19.071365},
        map: map,
        icon: "images/logo_icon.png"
    });

    let infoWindow = new google.maps.InfoWindow({
        content: "<h2 style='color: #000'> Beyond Health Bar </h2> <p style='color: #000'>Magyarország 1074 Budapest, Rákóczi út 52.</p>"
    });

    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });

    
}