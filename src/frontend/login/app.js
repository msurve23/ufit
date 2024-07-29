function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        localStorage.setItem('username', username);
        window.location.href = "../dashboard/dashboard.html"; // Redirect to dashboard
    } else {
        alert('Error: Please fill input boxes!');
    }
}
