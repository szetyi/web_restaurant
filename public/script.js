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

//hides all pages, used in changeTo(page)
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

// Generate the menu. 
let menu_content = document.getElementById("menu-content");
// menuArray is in menu_data.js, which is a database for each menu item
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
    menu_content.appendChild(menu_div);
}


//Google Maps API initialization for INFO page. Change options.center and marker.position coordinates.
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


// Booking

// let booking_form = document.getElementById('booking-form');

// These are the clickable tables for selecting where you sit
let frames = document.querySelectorAll('.frame');
let selectedFrame = "";
let selectedTabl;

// This clears all the selected frames.
function clearSelectedFrames() {
    frames.forEach(element => {
        element.classList.remove("selected-frame");
    });
}

// This is called by an onclick listener on the frames(inline HTML)
function selectFrame(frame) {
    clearSelectedFrames();
    frame.classList.add("selected-frame");
    selectedFrame = frame.parentNode.classList[1];
    // selectedFrame stores "box#" class, where # is the number of the table.
    // selectedFrame[3]therefore returns the number.
    console.log(selectedFrame[3]);
    selectedTable = selectedFrame[3];
}


// Set minimum value of the date input to today, max is already set to 2099-12-31
let booking_date = document.getElementById('booking-date');
updateToday();

// When the date is changed, we need to update the opening hours
booking_date.onchange = () => {dateChange()};
let booking_hour = document.getElementById("booking-time");
let extra_hours = document.querySelectorAll('.extra');

// Gets today's date, and sets the form date's min to it.
// Min attribute accepts yyyy-mm-dd date format, so Date's extensive format is reduced
function updateToday() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

    today = yyyy+'-'+mm+'-'+dd;
    booking_date.setAttribute("min", today);
}


// this updated the date input
function dateChange() {
    // Get the value of the user's input, and get the day value. 0-6 -> Sunday-Saturday
    let date = new Date(booking_date.value);
    let day = date.getDay();

    // If it's Friday or Saturday, the restaurant opens earlier and closes later,
    // so we add the previously stored extra hours(marked by a class)
    if(day === 5 || day === 6) {
        for (let i = 3; i >=0; i--) {
            booking_hour.insertBefore(extra_hours[i], booking_hour.firstChild);
        }
        for (let i = 4; i <8; i++) {
            booking_hour.appendChild(extra_hours[i]);
        }
    // If it's NOT a Friday or Saturday, we have to remove those extra hours.
    } else {
        extra_hours.forEach(hour => {
            try{
                booking_hour.removeChild(hour);
            }
            catch(error) {
                console.log("Error catched.");
            }
        });
    }

    requestData(booking_date.value);
}

function requestData(date){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           console.log("RESPONSE RECEIVED: " + xhttp.responseText)
        }
    };
    xhttp.open("GET", `mongo-${date}`, true);
    xhttp.send();


}