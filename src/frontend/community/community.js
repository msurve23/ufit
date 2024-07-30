document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('username')) window.location.href = "../login/index.html";

    const input = document.getElementById('comment-input');
    const submitComment = document.getElementById('submit-comment');
    const clearComments = document.getElementById('clear-comments');
    const commentArr = document.getElementById('comment-list');

    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(c => addCommentToDOM(c.text, c.likes));

    submitComment.addEventListener('click', function() {
        const commentText = input.value.trim();
        if (commentText) {
            const comment = { text: commentText, likes: 0 };
            comments.push(comment);
            localStorage.setItem('comments', JSON.stringify(comments));
            addCommentToDOM(comment.text, comment.likes);
            input.value = '';
        }
    });

    clearComments.addEventListener('click', function() {
        localStorage.removeItem('comments');
        commentArr.innerHTML = '';
    });

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
            const index = comments.findIndex(c => c.text === text);
            if (index !== -1) {
                comments[index].likes += 1;
                localStorage.setItem('comments', JSON.stringify(comments));
                likeButton.querySelector('.like-count').textContent = comments[index].likes;
            }
        });

        commentDiv.appendChild(commentTextDiv);
        commentDiv.appendChild(likeButton);
        commentArr.appendChild(commentDiv);
    }
});

function logout() {
    localStorage.removeItem('username');
    window.location.href = "../login/index.html";
}

function navigateTo(page) {
    window.location.href = page;
}
