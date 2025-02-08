class LoginPage {
    constructor() {
        this.form = document.querySelector('form');
        this.usernameField = document.getElementById('username');
        this.passwordField = document.getElementById('password');
        this.initialize();
    }

    initialize() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(event) {
        event.preventDefault();

        const username = this.usernameField.value.trim();
        const password = this.passwordField.value.trim();

        if (!username || !password) {
            alert('Both fields are required!');
            return;
        }

        try {
            const response = await fetch('/login/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();

            if (response.ok) {
                alert('Login successful! Redirecting...');
                window.location.href = 'home'; // Redirect to home page
            } else {
                alert(result.message || 'Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred. Please try again.');
        }
    }
}

// Initialize the LoginPage class when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LoginPage();
});
