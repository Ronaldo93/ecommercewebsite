$(document).ready(function () {
    showAllItems(); // Display all items with no filter applied
 
  
    $("#search-button").on("click", function () {
      searchByTitle();
    });
    // create a enter action
    $("#search-input").on("keyup", function (event) {
      if (event.keyCode === 13) {
        searchByTitle();
      }
    });
  });
  
  function searchByTitle() {
    var searchTerm = $("#search-input").val().toLowerCase();
  
    $("#display-items-div").empty();
  
    for (var i = 0; i < category_items.length; i++) {
      var item = category_items[i];
  
      if (item.title.toLowerCase().includes(searchTerm)) {
        var itemContent =
          '<div class="product-card"><b>' +
          item.title +
          '</b><br><img src="' +
          item.thumbnail +
          '" height="300px" width="300px" alt="shoe thumbnail"><b>$' +
          item.price +
          "</b></div>";
  
        $("#display-items-div").append(itemContent);
      }
    }
  }