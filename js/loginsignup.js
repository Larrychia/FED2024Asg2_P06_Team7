/* async function login( email, password) {
    const BASE_URL = 'https://database-90b8.restdb.io/rest/login';
    const API_KEY = '677b36236ad1907ce53cbff9	';
  
    try {
      const response = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': API_KEY,
          "cache-control": "no-cache"
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`); 
      }
  
      const users = await response.json();
      const user = users.find(u =>  u.email === email && u.password === password);
      
  
      if (user) {
        alert('Login successful!');
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/html/profile.html'; // Redirect to profile.html if login is successful

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
    const BASE_URL = 'https://database-90b8.restdb.io/rest/login';
    const API_KEY = '677b36236ad1907ce53cbff9';
  
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
    const loginForm = document.getElementById('loginform');
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 
       
        const emailInput = document.getElementById('loginEmail');
        const passwordInput = document.getElementById('loginPassword');
  
        if (emailInput && passwordInput ) {
          
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
        const confpw = document.getElementById('confirmPassword');


       if (emailInput && passwordInput && confpw ) {
        const email = emailInput.value;
        const password = passwordInput.value;
        const confirmPassword = confpw.value;
        

        if(confirmPassword===password){
          console.log('Attempting signup with:', {email, password });
          await signup( email, password);
          loginsignSuccess=true;
        }else if(confpw!==passwordInput){
          alert("Passwords do not match")
        }
        else {
          console.warn('Signup input fields not found.');
        }}
      });
    } else {
      console.warn('Signup form not found.');
    }


  const profileButton = document.getElementById('profileButton');
  if (profileButton) {
    profileButton.addEventListener('click', (event) => {
      event.preventDefault();
      const user = localStorage.getItem('user');
      if (user) {
        window.location.href = '/html/profile.html'; // Redirect to profile.html if logged in
      } else {
        window.location.href = '/html/login.html'; // Redirect to login.html if not logged in
      }
    });
  } else {
    console.warn('Profile button not found.');
  }
  
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', (event) => {
      event.preventDefault();
      logout(); // Call the logout function
    });
  } else {
    console.warn('Logout button not found.');
  }
});

function logout() {
  localStorage.removeItem('user'); // Remove user information from local storage
  window.location.href = '/html/login.html'; // Redirect to login page
}


  document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const profileContainer = document.getElementById('profile-container');
    const loginPrompt = document.getElementById('login-prompt');
  
    if (user) {
      document.getElementById('profile-name').innerText = user.name || 'User';
      document.getElementById('profile-email').innerText = user.email || 'User@gmail.com';
      profileContainer.style.display = 'block';
      loginPrompt.style.display = 'none';
    } else {
      profileContainer.style.display = 'none';
      loginPrompt.style.display = 'block';
    }
  });
  


  function editProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    const name = prompt("Enter your name:", document.getElementById("profile-name").innerText);
    const email = prompt("Enter your email:", document.getElementById("profile-email").innerText);


    if (name) document.getElementById("profile-name").innerText = name;
    if (email) document.getElementById("profile-email").innerText = email;


    const newuser = {
        
        email: email || document.getElementById("profile-email").innerText,
        password: user.password,
        name: name || document.getElementById("profile-name").innerText,
    };

   
    const BASE_URL = `https://database-90b8.restdb.io/rest/login/${user._id}`;
    const API_KEY = '677b36236ad1907ce53cbff9';

    fetch(BASE_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': API_KEY,
            "cache-control": "no-cache"
        },
        body: JSON.stringify(newuser),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Profile updated successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
}
*/
async function login(email, password) {
  const BASE_URL = '../login.json'; // Path to the local login.json file

  try {
      const response = await fetch(BASE_URL, {
          headers: {
              'Content-Type': 'application/json',
              'cache-control': 'no-cache'
          }
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const users = data.users;
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
          alert('Login successful!');
          localStorage.setItem('user', JSON.stringify(user));
          window.location.href = 'profile.html'; // Redirect to profile.html if login is successful
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
  const BASE_URL = '../login.json'; // Path to the local login.json file

  try {
      const response = await fetch(BASE_URL, {
          headers: {
              'Content-Type': 'application/json',
              'cache-control': 'no-cache'
          }
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const users = data.users;

      // Check if the email already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
          alert('Email already exists. Please use a different email.');
          return;
      }

      // Add the new user to the users array
      const newUser = {
          _id: Date.now().toString(),
          email: email,
          password: password,
          cartitems: [],
          token: 0
      };
      users.push(newUser);

      // Save the updated users array back to local storage (simulating saving to a file)
      localStorage.setItem('users', JSON.stringify(users));

      alert('Signup successful!');
      const signupForm = document.getElementById('signup');
      if (signupForm) {
          signupForm.reset();
      }
  } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup. Please try again.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginform');
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
          const confpw = document.getElementById('confirmPassword');

          if (emailInput && passwordInput && confpw) {
              const email = emailInput.value;
              const password = passwordInput.value;
              const confirmPassword = confpw.value;

              if (confirmPassword === password) {
                  console.log('Attempting signup with:', { email, password });
                  await signup(email, password);
              } else {
                  alert("Passwords do not match");
              }
          } else {
              console.warn('Signup input fields not found.');
          }
      });
  } else {
      console.warn('Signup form not found.');
  }

  const profileButton = document.getElementById('profileButton');
  if (profileButton) {
      profileButton.addEventListener('click', (event) => {
          event.preventDefault();
          const user = localStorage.getItem('user');
          if (user) {
              window.location.href = 'FED2024Asg2_P06_Team7/html/profile.html'; // Redirect to profile.html if logged in
          } else {
              window.location.href = 'FED2024Asg2_P06_Team7/html/login.html'; // Redirect to login.html if not logged in
          }
      });
  } else {
      console.warn('Profile button not found.');
  }

  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
      logoutButton.addEventListener('click', (event) => {
          event.preventDefault();
          logout(); // Call the logout function
      });
  } else {
      console.warn('Logout button not found.');
  }
});

function logout() {
  localStorage.removeItem('user'); // Remove user information from local storage
  window.location.href = '/html/login.html'; // Redirect to login page
}

document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const profileContainer = document.getElementById('profile-container');
  const loginPrompt = document.getElementById('login-prompt');

  if (user) {
      document.getElementById('profile-name').innerText = user.name || 'User';
      document.getElementById('profile-email').innerText = user.email || 'User@gmail.com';
      profileContainer.style.display = 'block';
      loginPrompt.style.display = 'none';
  } else {
      profileContainer.style.display = 'none';
      loginPrompt.style.display = 'block';
  }
});

function editProfile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const name = prompt("Enter your name:", document.getElementById("profile-name").innerText);
  const email = prompt("Enter your email:", document.getElementById("profile-email").innerText);

  if (name) document.getElementById("profile-name").innerText = name;
  if (email) document.getElementById("profile-email").innerText = email;

  const newuser = {
      email: email || document.getElementById("profile-email").innerText,
      password: user.password,
      name: name || document.getElementById("profile-name").innerText,
  };

  // Save the updated user information to local storage (simulating saving to a file)
  localStorage.setItem('user', JSON.stringify(newuser));

  alert('Profile updated successfully!');
}
