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
            loadComments();
        })
        .catch(() => {
            window.location.href = "../login/index.html";
        });
    
    const input = document.getElementById('comment-input');
    const submitComment = document.getElementById('submit-comment');
    const clearComments = document.getElementById('clear-comments');
    const commentArr = document.getElementById('comment-list');

    submitComment.addEventListener('click', function() {
        const commentText = input.value.trim();
        if (commentText) {
            const comment = { text: commentText, likes: 0 };
            saveComment(comment);
            input.value = '';
        }
    });

    clearComments.addEventListener('click', function() {
        deleteAllComments();
    });
});

function saveComment(comment) {
    fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    .then(response => response.json())
    .then(savedComment => {
        addCommentToDOM(savedComment.text, savedComment.likes);
    })
    .catch(error => console.error('Error saving comment:', error));
}

function loadComments() {
    fetch('/api/comments')
        .then(response => response.json())
        .then(comments => {
            comments.forEach(c => addCommentToDOM(c.text, c.likes));
        })
        .catch(error => console.error('Error loading comments:', error));
}

function deleteAllComments() {
    fetch('/api/comments', {
        method: 'DELETE'
    })
    .then(() => {
        document.getElementById('comment-list').innerHTML = '';
    })
    .catch(error => console.error('Error deleting comments:', error));
}

function addCommentToDOM(text, likes) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';

    const commentTextDiv = document.createElement('div');
    commentTextDiv.className = 'comment-text';
    commentTextDiv.textContent = text;

    const likeButton = document.createElement('button');
    likeButton.className = 'like-button';
    likeButton.innerHTML = `❤️ <span class="like-count">${likes}</span>`;
    likeButton.addEventListener('click', function() {
        likeComment(text);
        likeButton.querySelector('.like-count').textContent = ++likes;
    });

    commentDiv.appendChild(commentTextDiv);
    commentDiv.appendChild(likeButton);
    document.getElementById('comment-list').appendChild(commentDiv);
}

function likeComment(commentText) {
    fetch(`/api/comments/like`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: commentText })
    })
    .catch(error => console.error('Error liking comment:', error));
}

function logout() {
    fetch('/api/logout')
        .then(() => window.location.href = "../login/index.html")
        .catch(error => console.error('Error logging out:', error));
}

function navigateTo(page) {
    window.location.href = page;
}
