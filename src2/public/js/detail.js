document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    var productId = '<%= product._id %>';
    var productName = '<%= product.name %>';
    var userName = document.getElementById('userName').value;
    var address = document.getElementById('address').value;
    var distributionHub = document.getElementById('distributionHub').value;
    var quantity = parseInt(document.getElementById('quantity').value);
    var price = parseFloat('<%= product.price %>');

    // Calculate total price based on quantity
    var totalPrice = price * quantity;

    // Create an object with the form data
    var formData = {
        productId: productId,
        productName: productName,
        userName: userName,
        address: address,
        distributionHub: distributionHub,
        quantity: quantity,
        totalPrice: totalPrice
    };

    // Generate a unique key based on the product ID
    var key = 'productData-' + productId;

    // Save form data to localStorage with the unique key
    localStorage.setItem(key, JSON.stringify(formData));

    // Display a success message
    alert('Form submitted successfully!');

    // Optionally, you can redirect the user to another page or perform other actions here
});
var key = 'productData-' + productId;
var formData = localStorage.getItem(key);

if (formData) {
  // Data exists in localStorage
  var parsedData = JSON.parse(formData);
  console.log(parsedData); // Display the stored form data
} else {
  // Data does not exist in localStorage
  console.log('No data found in localStorage');
}