    const generatePasswordButton = document.getElementById('generatePassword');
    const passwordDisplay = document.getElementById('generatedPassword');
    const checkPasswordButton = document.getElementById('checkPasswordHealth');
    const passwordToCheck = document.getElementById('passwordToCheck');
    const healthResult = document.getElementById('healthResult');
    const passwordLengthInput = document.getElementById('passwordLength');
    const passwordSeedInput = document.getElementById('passwordSeed');
    const includeNumbersCheckbox = document.getElementById('includeNumbers');
    const includeSymbolsCheckbox = document.getElementById('includeSymbols');

    document.addEventListener('DOMContentLoaded', function() {
        const loginForm = document.getElementById('login-form');
        const errorMessageDisplay = document.querySelector('.error-message'); // This must match an element in your HTML
        const signUpButton = document.getElementById('/signup'); // This must match the ID of your sign-up link
    
        if (loginForm) {    
            loginForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const username = document.getElementById('username').value; // Make sure this matches the ID of your username input
                const password = document.getElementById('password').value; // Make sure this matches the ID of your password input
                login(username, password);
            });
        }
    
        if (signUpButton) {
            signUpButton.addEventListener('click', function(event) {
                event.preventDefault();
                window.location.href = 'signup.html';
            });
        }
    });

    function login(username, password) {
        fetch('http://localhost:8080/getusers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {
            // Handle login success
            console.log('Login successful', data);
            // Redirect user to home page or any other page
            window.location.href = 'home.html'; // Update 'home.html' with the path you want
        })
        .catch(error => {
            // Handle login error
            console.error('Login error:', error);
            errorMessageDisplay.textContent = 'Login failed. Please check your credentials.';
        });
    }
    

function generatePassword() {
    const length = document.getElementById('passwordLength').value || 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                    (document.getElementById('includeNumbers').checked ? "0123456789" : "") +
                    (document.getElementById('includeSymbols').checked ? "!@#$%^&*()_+~`|}{[]:;?><,./-=" : "");
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function checkPasswordHealth(password) {
    // Simple check (extend this according to real health check logic)
    if (password.length < 8) {
        return "Weak";
    } else if (password.length < 12) {
        return "Moderate";
    } else {
        return "Strong";
    }
}
