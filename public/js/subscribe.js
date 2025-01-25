class SubscriptionPage {
    constructor() {
        // Form elements
        this.form = document.getElementById('subscriptionForm');
        this.nameField = document.getElementById('name');
        this.usernameField = document.getElementById('username');
        this.passwordField = document.getElementById('password');
        this.confirmPasswordField = document.getElementById('confirmPassword');
        this.universityField = document.getElementById('university');
        this.levelField = document.getElementById('level');
        this.selectedModules = []; // Array to store selected modules (not needed for this task)
    }

    initialize() {
        // Attach event listener to the form
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        // Get form values
        const name = this.nameField.value.trim();
        const username = this.usernameField.value.trim();
        const password = this.passwordField.value.trim();
        const confirmPassword = this.confirmPasswordField.value.trim();
        const university = this.universityField.value;
        const level = this.levelField.value;

        // Basic validations
        if (!name || !username || !password || !confirmPassword || !university || !level) {
            alert('All fields are required!');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Ensure that 'level' is set to 'Master' before sending
        if (level !== "1" && level !== "Master 2") {
            alert('Only Master levels are allowed.');
            return;
        }

        // Create data object to send via AJAX
        const subscriptionData = {
            name: name,
            username: username,
            password: password,
            university: university,
            level: level
        };

        // Log the data to the console for verification
        console.log("Data to be sent via AJAX:", subscriptionData);

        // Send the data via AJAX to the Symfony controller
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/subscription/submit', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    alert(response.message);
                } else {
                    const errorResponse = JSON.parse(xhr.responseText);
                    alert(`Error: ${errorResponse.message}`);
                }
            }
        };
        xhr.send(JSON.stringify(subscriptionData));
    }
}

// Initialize the SubscriptionPage class when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const subscriptionPage = new SubscriptionPage();
    subscriptionPage.initialize();
    console.log('SubscriptionPage JavaScript file loaded successfully!');
});
