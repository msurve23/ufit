function logout() {
    window.location.href = "../login/index.html";
}

document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatusAndLoadData();
});

function checkLoginStatusAndLoadData() {
    fetch('/api/users/me')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('User not logged in');
            }
        })
        .then(user => {
            loadData(user.id);
        })
        .catch(() => {
            window.location.href = "../login/index.html";
        });
}

function saveData() {
    const exercise = document.getElementById('exercise').value;
    const water = document.getElementById('water').value;
    const calories = document.getElementById('calories').value;
    const sleep = document.getElementById('sleep').value;

    const data = { exercise, water, calories, sleep };

    fetch('/api/users/me/data', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            loadData();
        } else {
            alert('Error saving data');
        }
    })
    .catch(error => console.error('Error saving data:', error));
}

function loadData() {
    fetch('/api/users/me/data')
        .then(response => response.json())
        .then(data => {
            document.getElementById('exercise-value').textContent = `${data.exercise} mins`;
            document.getElementById('water-value').textContent = `${data.water}/64 oz`;
            document.getElementById('calories-value').textContent = `${data.calories}/500`;
            document.getElementById('sleep-value').textContent = `${data.sleep}/8 hours`;
        })
        .catch(error => console.error('Error loading data:', error));
}
