document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessageDisplay = document.querySelector('.error-message');
    const signUpButton = document.getElementById('signupLink');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const username = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                window.location.href = 'home.html'; // Change to your actual home page
            } else {
                errorMessageDisplay.textContent = 'Login failed. Please check your credentials.';
            }
        } catch (error) {
            console.error('Login error:', error);
            errorMessageDisplay.textContent = 'An error occurred while logging in. Please try again later.';
        }
    });

    signUpButton.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'signup.html'; // Change to your actual signup page
    });

    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'forgotpass.html'; // Change to your actual forgot password page
    });
});
