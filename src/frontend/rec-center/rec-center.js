document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/users/me')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('User not logged in');
            }
        })
        .then(() => {
            loadCrowdRating();
        })
        .catch(() => {
            window.location.href = "../login/index.html";
        });

    const stars = document.querySelectorAll('#star-rating .star');
    const crowdMeter = document.getElementById('crowd-level');
    let currRating = 0;

    function updateStars(rating) {
        stars.forEach(star => {
            star.classList.toggle('selected', star.getAttribute('data-value') <= rating);
        });
    }

    function updateCrowdLevel(rating) {
        let crowdOutput = `Current Level: ${rating} star${rating > 1 ? 's' : ''}`;
        if (rating == 1) {
            crowdOutput += " - Not Busy (Nearly empty!)";
        } else if (rating == 2) {
            crowdOutput += " - Not too Busy (Great time to workout)";
        } else if (rating == 3) {
            crowdOutput += " - Kind of Busy (Check back in 15 minutes)";
        } else if (rating == 4) {
            crowdOutput += " - Busy (Check back in 30 minutes)";
        } else if (rating == 5) {
            crowdOutput += " - Very Busy (Check back in an hour)";
        }
        crowdMeter.textContent = crowdOutput;
    }

    function loadCrowdRating() {
        fetch('/api/crowdrating')
            .then(response => response.json())
            .then(data => {
                currRating = data.rating;
                updateStars(currRating);
                updateCrowdLevel(currRating);
            })
            .catch(error => console.error('Error loading crowd rating:', error));
    }

    stars.forEach(star => {
        star.addEventListener('click', function() {
            currRating = this.getAttribute('data-value');
            updateCrowdRating(currRating);
            updateStars(currRating);
            updateCrowdLevel(currRating);
        });
    });

    function updateCrowdRating(rating) {
        fetch('/api/crowdrating', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rating })
        })
        .catch(error => console.error('Error updating crowd rating:', error));
    }

    const buttons = document.querySelectorAll('.day-button');
    const schedules = document.querySelectorAll('.day-schedule');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const day = this.getAttribute('data-day');
            schedules.forEach(schedule => {
                schedule.style.display = schedule.id === day ? 'block' : 'none';
            });
        });
    });
});

function logout() {
    fetch('/api/logout')
        .then(() => window.location.href = "../login/index.html")
        .catch(error => console.error('Error logging out:', error));
}

function navigateTo(page) {
    window.location.href = page;
}
