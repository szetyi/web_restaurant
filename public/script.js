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
let selectedTable;
let currentResponseTables = [];
let name_field = document.getElementById('name');
let seats_field = document.getElementById('seats');
let phone_field = document.getElementById('phone');
let email_field = document.getElementById('email');
let form_error = document.getElementById('form_error');

let submit_button = document.getElementById('submit');
submit_button.addEventListener("click", function(event) {
    event.preventDefault();
    submitBooking();
}, false);

async function submitBooking() {
    
    if(validateForm()) {
        // console.log("Valid");

        let json = {
            name:  name_field.value,
            seats: parseInt(seats_field.value),
            phone : phone_field.value,
            email : email_field.value,
            date : booking_date.value,
            time : booking_hour.value,
            table : parseInt(selectedTable)
        };
        // console.log("sent JSON: " + JSON.stringify(json));
                
        await sendData(json);
        requestData(
            {
                date : booking_date.value,
                time : booking_hour.value
            }
        );
    }
}

function validateForm() {
    // console.log("NAME: " + name_field.value);
    // console.log("SEATS: " + seats_field.value);
    // console.log("PHONE: " + phone_field.value);
    // console.log("EMAIL: " + email_field.value);
    // console.log("DATE: " + booking_date.value);
    // console.log("TIME: " + booking_hour.value);
    // console.log("TABLE: " + selectedTable);
    
    if(
            checkName()
        &&  checkSeats()
        &&  checkPhone()
        &&  checkEmail()
        &&  checkDate()
        &&  checkHour()
        &&  checkTables()
        
    ) {
        alert("Thank you for your reservation! See you soon!")
        form_error.innerHTML = "Thank you for your reservation! See you soon!";
        return true;
    }

    return false;
}

function checkName() {
    if(name_field.value == "") {
        form_error.innerHTML = "Please enter your name!";
        console.log("No name entered");
        return false;
    } else {
        return true;
    }
}

function checkSeats() {
    if(seats_field.value == "") {
        form_error.innerHTML = "Please enter how many seats you would like to book!";
        console.log("No seats selected");
        return false;
    } else if( parseInt(seats_field.value) < 1) {
        form_error.innerHTML = "You have to book at least one seat!";
        console.log("At least one seat has to be booked.")
        return false;
    } else {
        return true;
    }
}

function checkPhone() {
    if( phone_field.value == "") {
        form_error.innerHTML = "Please enter your phone number!";
        console.log("No phone number entered.");
        return false;
    } else {
        return true;
    }
}

function checkEmail() {
    if(email_field.value == "") {
        form_error.innerHTML = "Please enter your email!";
        console.log("No email entered.");
        return false;
    } else {
        return true;
    }
}

function checkDate() {
    if(booking_date.value == "") {
        form_error.innerHTML = "Please select a date!";
        console.log("No date selected");
        return false;
    } else {
        return true;
    }
}

function checkHour() {
    if(booking_hour.value == "") {
        form_error.innerHTML = "Please select an hour!";
        console.log("No hour selected");
        return false;
    } else {
        return true;
    }
}

function checkTables() {

    if(selectedTable == undefined) {
        form_error.innerHTML = "Please select a table!";
        console.log("No selected table");
        return false;
    }

    for (let i = 0; i < currentResponseTables.length; i++) {
        if(currentResponseTables[i] == selectedTable){    
            form_error.innerHTML = "Your selected table is unavailable. Please select another one!";
            console.log("Selected table conflicts with an already taken table");
            return false;
        }
    }
    return true;
}

async function sendData(data){
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
            // console.log("RESPONSE RECEIVED: " + (xhttp.responseText));
        }
    };
    xhttp.open("POST", ``, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));
}

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
    selectedTable = selectedFrame[3];
    // console.log(selectedTable);
}

function resetFrames() {
    frames.forEach(element => {
        element.classList.remove("selected-frame");
        element.classList.remove("taken-frame");
        element.setAttribute('onclick','selectFrame(this)');
    });

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


let currBookingResponse = [];

// this updated the date input
function dateChange(date_time) {
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
                if(error.name != "NotFoundError") {
                    console.log("Error catched: " + error);
                }
            }
        });
    }
}

function requestData(date_time){
    if(date_time.date == "") {
        return;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
            // console.log("RESPONSE RECEIVED: " + (xhttp.responseText));
            currBookingResponse = JSON.parse(xhttp.responseText);
                    
            resetFrames();
            currentResponseTables = [];
            selectedTable = undefined;

            var now = parseTimeToObj(date_time.time);
            var before = {};
            before = Object.assign(before, now);
            var after = {};
            after = Object.assign(after, now);
            
            if(now.min == 30) {
                before.min = 0;
                after.hr = after.hr+1;
                after.min = 0;
            } else {
                before.min = 30;
                before.hr = before.hr-1;
                after.min = 30;
            }
            
            // console.log("Before: ");
            // console.log(before);
            // console.log("Now: ");
            // console.log(now);
            // console.log("After: ");
            // console.log(after);


            currBookingResponse.forEach(function(booking){
                if (
                    (booking.time == parseTimeToString(before))
                    || (booking.time == parseTimeToString(now))
                    || (booking.time == parseTimeToString(after))
                ) {
                    // console.log("conflict at table " + booking.table);
                    currentResponseTables.push(booking.table);
                    // console.log("Currently taken tables: ");
                    // for (let i = 0; i < currentResponseTables.length; i++) {
                    //     console.log(currentResponseTables[i]);
                        
                    // }
                    frames[booking.table - 1].classList.add('taken-frame');
                    frames[booking.table - 1].onclick = null;

                } else {
                    // console.log("no conflict");
                }
                

            });

            
            
        }
    };
    xhttp.open("GET", `mongo-${date_time.date}`, true);
    xhttp.send();
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
};

function parseTimeToObj(timeInString) {
    let obj = {
        hr : 0,
        min : 0
    };
    obj.hr = Number(timeInString.substr(0,2));
    obj.min = Number(timeInString.substr(3,4));

    return obj;
}

// setInterval(()=> {console.log("value of date: " + booking_date.value + "value of time: " + booking_hour.value)}, 2000)
let old_date_time = {
    date : booking_date.value,
    time : booking_hour.value
};

function parseTimeToString(timeInObj) {
    if(timeInObj.min < 10) {
        return timeInObj.hr + ":0" + timeInObj.min; 
    } else {
        return timeInObj.hr + ":" + timeInObj.min; 
    }
}

setInterval(()=> {
    let date_time = {
        date : booking_date.value,
        time : booking_hour.value
    }

    dateChange(date_time);

    if (
        !(
        (date_time.date == old_date_time.date)
        &&
        (date_time.time == old_date_time.time)
        )
    ) {
        requestData(date_time);
    } else {
        // console.log("up to date");
    }

    old_date_time = Object.assign(old_date_time, date_time);

}, 2000)

// frames.forEach(element => {
//     console.log(element.parentNode.classList);
// });