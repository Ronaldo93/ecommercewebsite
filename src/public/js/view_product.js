function searchProducts() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const table = document.querySelector('table');
    const rows = table.getElementsByTagName('tr');
  
    for (let i = 1; i < rows.length; i++) { // Start from index 1 to skip the table header row
      const titleColumn = rows[i].getElementsByTagName('td')[2];
      if (titleColumn) {
        const title = titleColumn.textContent || titleColumn.innerText;
        if (title.toLowerCase() === filter) {
          rows[i].style.display = ''; // Display the row if the title matches the search term
        } else {
          rows[i].style.display = 'none'; // Hide the row if the title doesn't match
        }
      }
    }
  
  }

  // Hide all product rows initially
window.onload = function() {
    const table = document.querySelector('table');
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 1; i < rows.length; i++) {
      rows[i].style.display = 'none';
    }
  }