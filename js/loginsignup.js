async function login(email, password) {
    const BASE_URL = 'https://fedassignment-6e81.restdb.io/rest/login';
    const API_KEY = '67939028845908919c097e5e';
  
    try {
      const response = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': API_KEY
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`); 
      }
  
      const users = await response.json();
      const user = users.find(u => u.email === email && u.password === password);
  
      if (user) {
        alert('Login successful!');
      } else {
        const errorMessageElement = document.getElementById('errorMessage');
        if (errorMessageElement) {
          errorMessageElement.innerText = 'Invalid email or password';
        } else {
          console.warn('Error message element not found.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessageElement = document.getElementById('errorMessage');
      if (errorMessageElement) {
        errorMessageElement.innerText = 'An error occurred. Please try again.';
      } else {
        console.warn('Error message element not found.');
      }
    }
  }
  
  async function signup(email, password) {
    const BASE_URL = 'https://fedassignment-6e81.restdb.io/rest/login';
    const API_KEY = '67939028845908919c097e5e';
  
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': API_KEY,
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify({email, password }),
      });
  
      if (response.ok) {
        alert('Signup successful!');
        const signupForm = document.getElementById('signup');
        if (signupForm) {
          signupForm.reset();
        }
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup. Please try again.');
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 
  
        const emailInput = document.getElementById('loginEmail');
        const passwordInput = document.getElementById('loginPassword');
  
        if (emailInput && passwordInput) {
          const email = emailInput.value;
          const password = passwordInput.value;
          await login(email, password);
        } else {
          console.warn('Email or password input fields not found.');
        }
      });
    } else {
      console.warn('Login form element not found.');
    }
  
    const signupForm = document.getElementById('signup');
    if (signupForm) {
      signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const emailInput = document.getElementById('signupEmail');
        const passwordInput = document.getElementById('signupPassword');
  
        if (emailInput && passwordInput) {
          const email = emailInput.value;
          const password = passwordInput.value;
  
          console.log('Attempting signup with:', {email, password });
          await signup(email, password);
        } else {
          console.warn('Signup input fields not found.');
        }
      });
    } else {
      console.warn('Signup form not found.');
    }
  });