let navbar = document.getElementById("navbar");
let hamburger = document.getElementById("hamburger");
let checkbox = document.getElementById("nav_button");

function OpenNavBar() {
    navbar.style.maxWidth = "none";
}

function CloseNavBar() {
    navbar.style.maxWidth = "48px";
}

hamburger.onclick = function() {

    if(checkbox.checked){
        CloseNavBar();
    }else {
        OpenNavBar();
    }

};