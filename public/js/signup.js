const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const firstName = document.querySelector('#first-name-input').value.trim();
    const lastName = document.querySelector('#last-name-input').value.trim();
    const email = document.querySelector('#email-input').value.trim();
    const password = document.querySelector('#password-input').value.trim();
  
    if (firstName && lastName && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  