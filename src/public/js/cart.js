document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    var userName = document.getElementById("userName").value; // Get the entered username

    // Send an AJAX request to retrieve user information
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/cart?userName=" + encodeURIComponent(userName), true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var userInformation = JSON.parse(xhr.responseText); // Parse the response as JSON

            // Display the user information in the searchResults div
            var searchResultsDiv = document.getElementById("searchResults");
            searchResultsDiv.innerHTML = ""; // Clear previous results

            if (userInformation) {
                var h2 = document.createElement("h2");
                h2.textContent = "User Information:";
                searchResultsDiv.appendChild(h2);

                // Create paragraphs for each property and append them to the searchResults div
                for (var key in userInformation) {
                    if (userInformation.hasOwnProperty(key)) {
                        var p = document.createElement("p");
                        p.textContent = key + ": " + userInformation[key];
                        searchResultsDiv.appendChild(p);
                    }
                }
            } else {
                var p = document.createElement("p");
                p.textContent = "User not found.";
                searchResultsDiv.appendChild(p);
            }
        }
    };
    xhr.send();
});