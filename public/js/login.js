class LoginPage {
    constructor() {
        this.form = document.querySelector('form');
        this.emailField = document.getElementById('email');
        this.passwordField = document.getElementById('password');
        this.initialize();
    }

    initialize() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const email = this.emailField.value.trim();
        const password = this.passwordField.value.trim();

        if (!email || !password) {
            alert('Both fields are required!');
            return;
        }

        alert('Login successful (simulated)!');
    }
}

// Initialize the LoginPage class when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LoginPage();
});
