/*  RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023A
  Assessment: Assignment 2
  Author: BrotherHood group 
  ID: Bao Tuan (s3977886),Phu Chau(s3975133),Tuan Minh(s3978609),Tuan Kiet(s3978885),Minh Hien(s3978807)
  Acknowledgement: https://www.w3schools.com/ */

function searchProducts() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();
  const table = document.querySelector("table");
  const rows = table.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    // Start from index 1 to skip the table header row
    const titleColumn = rows[i].getElementsByTagName("td")[2];
    if (titleColumn) {
      const title = titleColumn.textContent || titleColumn.innerText;
      if (title.toLowerCase() === filter) {
        rows[i].style.display = ""; // Display the row if the title matches the search term
      } else {
        rows[i].style.display = "none"; // Hide the row if the title doesn't match
      }
    }
  }
}

// Hide all product rows initially
window.onload = function () {
  const table = document.querySelector("table");
  const rows = table.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    rows[i].style.display = "none";
  }
};
