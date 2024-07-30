document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('username')) {
        window.location.href = "../login/index.html";
    }

    const stars = document.querySelectorAll('#star-rating .star');
    const crowdMeter = document.getElementById('crowd-level');
    let currRating = localStorage.getItem('crowdRating') || 0;

    updateStars(currRating);
    updateCrowdLevel(currRating);

    stars.forEach(star => {
        star.addEventListener('click', function() {
            currRating = this.getAttribute('data-value');
            localStorage.setItem('crowdRating', currRating);
            updateStars(currRating);
            updateCrowdLevel(currRating);
        });
    });

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
    localStorage.removeItem('username');
    window.location.href = "../login/index.html";
}

function navigateTo(page) {
    window.location.href = page;
}
