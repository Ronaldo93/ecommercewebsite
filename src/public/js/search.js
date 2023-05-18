// search.js

// Function to search for products based on the title
function searchProducts() {
  // Get the search input value
  var searchInput = document.getElementById("search-input").value.toLowerCase();

  // Get all the product cards
  var productCards = document.getElementsByClassName("product-card");

  // Loop through each product card
  for (var i = 0; i < productCards.length; i++) {
    var productCard = productCards[i];
    var titleElement = productCard.getElementsByTagName("b")[0];
    var title = titleElement.textContent.toLowerCase();

    // Check if the title matches the search input
    if (title.includes(searchInput)) {
      // Display the product card
      productCard.style.display = "block";
    } else {
      // Hide the product card
      productCard.style.display = "none";
    }
  }
}

// Add event listener to the search button
var searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", searchProducts);

// Add event listener to the search input for Enter key press
var searchInput = document.getElementById("search-input");
searchInput.addEventListener("keyup", function (event) {
  // Check if the Enter key is pressed
  if (event.keyCode === 13) {
    // Call the searchProducts function
    searchProducts();
  }
});
