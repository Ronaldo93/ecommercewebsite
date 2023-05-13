const form = document.getElementById('upload-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  fetch('/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((response) => {
    if (response.ok) {
      console.log('Image uploaded successfully');
    } else {
      console.error('Error uploading image');
    }
  })
  .catch((error) => {
    console.error(error);
  });
});