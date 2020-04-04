let menuArray = new Array();
let icons = {
    meat: "images/icons/009-meat.png",
    egg: "images/icons/001-fried-egg.png",
    wheat: "images/icons/025-wheat.png",
    bread: "images/icons/012-bread.png",
    radish: "images/icons/016-radish.png",
    avocado: "images/icons/024-avocado.png",
    mushroom: "images/icons/037-mushroom-1.png",
    pepper: "images/icons/041-pepper.png",
    corn: "images/icons/063-corn.png",
    fish: "images/icons/077-fish-1.png",
    milk: "images/icons/084-milk.png",
    onion: "images/icons/087-onion.png",
    lemon: "images/icons/095-lemon.png",
    cheese: "images/icons/098-cheese.png"
}

let food_1 = {
    name: "Avocado Toast" ,
    icons: ["bread", "radish", "avocado"],
    description: "Whole wheat toasted bread with avocado, radish, salad and tomatoes.",
    img: "images/foods/avocado_toast.jfif"
};
menuArray.push(food_1);

let food_2 = {
    name: "Chicken Sandwich",
    icons: ["meat", "bread", "onion"],
    description: "Bread sandwich with onions, chicken breast and salad.",
    img: "images/foods/chicken_sandwich.jfif"
};
menuArray.push(food_2);

let food_3 = {
    name: "Nacho Burger",
    icons: ["meat", "bread", "onion", "corn"],
    description: "Beef patty, red onion, mayo based sauce and tortilla chips in a whole wheat bun.",
    img: "images/foods/chips_burger.jfif"
};
menuArray.push(food_3);

let food_4 = {
    name: "Cucumber Wrap",
    icons: ["wheat", "onion"],
    description: "Tortilla wrap with cucumber, chives and mayo sauce.",
    img: "images/foods/cucumber_wrap.jfif"
};
menuArray.push(food_4);

let food_5 = {
    name: "BBQ Wings",
    icons: ["meat", "corn", "onion"],
    description: "Chicken wings grilled BBQ style, served with corn cobs.",
    img: "images/foods/grilled_corn.jfif"
};
menuArray.push(food_5);

let food_6 = {
    name: "Coconut Salmon",
    icons: ["fish", "lemon", "bread"],
    description: "Salmon fillet with salad, lemon, and coconut slices.",
    img: "images/foods/salmon_coconut_plate.jfif"
};
menuArray.push(food_6);


let food_7 = {
    name: "Vegan tacos",
    icons: ["wheat", "corn", "avocado", "onion", "pepper"],
    description: "Taco shells filled with avocado, corn, red onions and beans, served with hot salsa and garlic dips.",
    img: "images/foods/vegan_tortillas.jfif"
};
menuArray.push(food_7);
