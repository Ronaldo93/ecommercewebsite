let min_price = 0;
let max_price = 100;

$(document).ready(function () {
  showAllItems(); //Display all items with no filter applied
});

$("#min-price").on("change mousemove", function () {
  min_price = parseInt($("#min-price").val());
  $("#min-price-txt").text("$" + min_price);
  showItemsFiltered();
});

$("#max-price").on("change mousemove", function () {
  max_price = parseInt($("#max-price").val());
  $("#max-price-txt").text("$" + max_price);
  showItemsFiltered();
});

 let category_items = [
  {
    id: 1,
    category_id: 8,
    price: 39.42,
    title: "Shoes with id 1",
    thumbnail:
      "https://m.media-amazon.com/images/I/71qFb2FIz5L._UL1500_.jpg",
      description :'Sneakers (also called trainers, athletic shoes, tennis shoes, gym shoes, kicks, sport shoes, flats, running shoes, or runners) are shoes primarily designed for sports or other forms of physical exercise, but which are also widely used for everyday casual wear.',
  },
  {
    id: 2,
    category_id: 8,
    price: 31.93,
    title: "Shoes with id 2",
    thumbnail:
      "https://www.transparentpng.com/download/adidas-shoes/a4xO3G-adidas-shoes-adidas-shoe-kids-superstar-daddy-grade.png",
      description :'Mon 2',
  },
  {
    id: 3,
    category_id: 8,
    price: 49.44,
    title: "Shoes with id 3",
    thumbnail:
      "https://www.transparentpng.com/download/adidas-shoes/a4xO3G-adidas-shoes-adidas-shoe-kids-superstar-daddy-grade.png",
      description :'Mon 3',
  },
  {
    id: 4,
    category_id: 58,
    price: 65.38,
    title: "Shoes with id 4",
    thumbnail:
      "https://www.transparentpng.com/download/adidas-shoes/a4xO3G-adidas-shoes-adidas-shoe-kids-superstar-daddy-grade.png",
      description :'Mon 4',
  },
  {
    id: 5,
    category_id: 8,
    price: 27.21,
    title: "Shoes with id 5",
    thumbnail:
      "https://www.transparentpng.com/download/adidas-shoes/a4xO3G-adidas-shoes-adidas-shoe-kids-superstar-daddy-grade.png",
      description :'Mon 5',
  },
  {
    id: 6,
    category_id: 8,
    price: 73.05,
    title: "Shoes with id 6",
    thumbnail:
      "https://www.transparentpng.com/download/adidas-shoes/a4xO3G-adidas-shoes-adidas-shoe-kids-superstar-daddy-grade.png",
      description :'Mon 6',
    
  },
  {
    id: 7,
    category_id: 8,
    price: 51.96,
    title: "Shoes with id 7",
    thumbnail:
      "https://www.transparentpng.com/download/adidas-shoes/a4xO3G-adidas-shoes-adidas-shoe-kids-superstar-daddy-grade.png",
      description :'Mon 7',
  },
  {
    id: 8,
    category_id: 8,
    price: 29.35,
    title: "Shoes with id 8",
    thumbnail:
      "https://www.transparentpng.com/download/adidas-shoes/a4xO3G-adidas-shoes-adidas-shoe-kids-superstar-daddy-grade.png",
      description :'Mon 8',
  },
  {
    id: 9,
    category_id: 8,
    price: 80.0,
    title: "Shoes with id 9",
    thumbnail:
      "https://www.transparentpng.com/download/adidas-shoes/a4xO3G-adidas-shoes-adidas-shoe-kids-superstar-daddy-grade.png",
      description :'Mon 9',
  },
  {
    id: 10,
    category_id: 8,
    price: 70.07,
    title: "Shoes with id 10",
    thumbnail:
      "https://www.transparentpng.com/download/adidas-shoes/a4xO3G-adidas-shoes-adidas-shoe-kids-superstar-daddy-grade.png",
      description :'Mon 10',
  },
  {
    id: 11,
    category_id: 8,
    price: 79.37,
    title: "Shoes with id 11",
    thumbnail:
      "https://www.transparentpng.com/download/adidas-shoes/a4xO3G-adidas-shoes-adidas-shoe-kids-superstar-daddy-grade.png",
      description :'Mon 11',
  },
  {
    id: 12,
    category_id: 8,
    price: 27.14,
    title: "Shoes with id 12",
    thumbnail:
      "https://www.transparentpng.com/download/adidas-shoes/a4xO3G-adidas-shoes-adidas-shoe-kids-superstar-daddy-grade.png",
      description :'Mon 12',
  }
];

function showAllItems() {
  //Default grid to show all items on page load in
  $("#display-items-div").empty();
//   jQuery code that selects the element with the ID "display-items-div" and empties its contents.
  for (let i = 0; i < category_items.length; i++) {
    let item_content =
      '<div class="product-card"><b>' +
      category_items[i]["title"] +
      '</b><br><img src="' +
      category_items[i]["thumbnail"] +
      '" height="300px" width="300px" alt="shoe thumbnail"><div><b>$' +
      category_items[i]["price"] +
      '</b></div><div class="button"><a href="http://localhost:3000/' +
    category_items[i].title.toLowerCase().replace(/\s+/g, '-') +'">View Product</a></div></div>';
    $("#display-items-div").append(item_content);
  }
}

function showItemsFiltered() {
  //Default grid to show all items on page load in
  $("#display-items-div").empty();
  for (let i = 0; i < category_items.length; i++) {
    //Go through the items but only show items that have size from show_sizes_array
    if (
      category_items[i]["price"] <= max_price &&
      category_items[i]["price"] >= min_price
    ) {
      let item_content =
        '<div class="product-card"><b>' +
        category_items[i]["title"] +
        '</b><br><img src="' +
        category_items[i]["thumbnail"] +
        '" height="300px" width="300px" alt="shoe thumbnail"><div><b>$' +
        category_items[i]["price"] +
        '</b></div><div class="button"><a href="http://localhost:3000/' +
    category_items[i].title.toLowerCase().replace(/\s+/g, '-') +
    '">View Product</a></div></div>';
      $("#display-items-div").append(item_content); //Display in grid
    }
  }
}

module.exports = category_items;
