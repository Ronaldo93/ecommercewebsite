/*  RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023A
  Assessment: Assignment 2
  Author: BrotherHood group 
  ID: Bao Tuan (s3977886),Phu Chau(s3975133),Tuan Minh(s3978609),Tuan Kiet(s3978885),Minh Hien(s3978807)
  Acknowledgement: https://www.w3schools.com/ */
  
const searchButton = document.getElementById("search-button");
const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const searchInput = document.getElementById("search-input");
const productCards = document.getElementsByClassName("product-card");

searchButton.addEventListener("click", filterProducts);
minPriceInput.addEventListener("input", filterProducts);
maxPriceInput.addEventListener("input", filterProducts);
searchInput.addEventListener("keydown", handleSearchInput);

function filterProducts() {
  const minPrice = parseFloat(minPriceInput.value) || 0;
  const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
  const searchQuery = searchInput.value.trim().toLowerCase();

  for (let i = 0; i < productCards.length; i++) {
    const productCard = productCards[i];
    const productTitle = productCard
      .getElementsByTagName("b")[0]
      .textContent.toLowerCase();
    const productPrice = parseFloat(productCard.getAttribute("data-price"));

    const matchPrice = productPrice >= minPrice && productPrice <= maxPrice;
    const matchTitle = productTitle.includes(searchQuery);

    if (matchPrice && matchTitle) {
      productCard.style.display = "block";
    } else {
      productCard.style.display = "none";
    }
  }
}

function handleSearchInput(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    filterProducts();
  }
}
