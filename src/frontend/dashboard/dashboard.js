function logout() {
    localStorage.removeItem('username');
    window.location.href = "../login/index.html"; // Redirect to login page
}

document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = "../login/index.html"; // Redirect to login if not logged in
    }
    loadData();
});

function saveData() {
    const exercise = document.getElementById('exercise').value;
    const water = document.getElementById('water').value;
    const calories = document.getElementById('calories').value;
    const sleep = document.getElementById('sleep').value;

    localStorage.setItem('exercise', exercise);
    localStorage.setItem('water', water);
    localStorage.setItem('calories', calories);
    localStorage.setItem('sleep', sleep);

    loadData();
}

function loadData() {
    const exercise = localStorage.getItem('exercise') || 0;
    const water = localStorage.getItem('water') || 0;
    const calories = localStorage.getItem('calories') || 0;
    const sleep = localStorage.getItem('sleep') || 0;

    document.getElementById('exercise-value').textContent = `${exercise} mins`;
    document.getElementById('water-value').textContent = `${water}/64 oz`;
    document.getElementById('calories-value').textContent = `${calories}/500`;
    document.getElementById('sleep-value').textContent = `${sleep}/8 hours`;
}
