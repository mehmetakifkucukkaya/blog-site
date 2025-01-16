// Yorum formunu dinle
document.getElementById('commentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
    const date = new Date().toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Yeni yorum oluştur
    const newComment = document.createElement('div');
    newComment.className = 'comment';

    // Modern yorum tasarımı
    newComment.innerHTML = `
        <div class="comment-header">
            <div class="author-info">
                <div class="author-avatar">
                    ${name.charAt(0).toUpperCase()}
                </div>
                <div class="author-details">
                    <div class="comment-author">${name}</div>
                </div>
            </div>
            <div class="comment-date">
                <i class="far fa-clock"></i>
                ${date}
            </div>
        </div>
        <div class="comment-content">
            ${comment}
        </div>
    `;

    // Yorumu listeye ekle ve animasyon uygula
    newComment.style.opacity = '0';
    document.getElementById('commentsList').prepend(newComment);

    // Fade-in animasyonu
    setTimeout(() => {
        newComment.style.transition = 'opacity 0.5s ease';
        newComment.style.opacity = '1';
    }, 10);

    // Formu temizle
    this.reset();

    // Başarılı mesajı göster
    showNotification('Yorumunuz başarıyla eklendi!');
});

// Bildirim gösterme fonksiyonu
function showNotification(message) {
    // Eğer zaten bir bildirim varsa onu kaldır
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Yeni bildirim oluştur
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
    `;

    // Başarı ikonu ekle
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        ${message}
    `;

    document.body.appendChild(notification);

    // Animasyon
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    });

    // 3 saniye sonra kaldır
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Yorum sayısını güncelle
function updateCommentCount() {
    const commentsList = document.getElementById('commentsList');
    const commentCount = commentsList.children.length;
    const countDisplay = document.querySelector('.comments-title');
    if (countDisplay) {
        countDisplay.textContent = `Yorumlar (${commentCount})`;
    }
}

// Sayfa yüklendiğinde yorum sayısını güncelle
document.addEventListener('DOMContentLoaded', updateCommentCount);

// Her yeni yorum eklendiğinde sayıyı güncelle
document.getElementById('commentForm').addEventListener('submit', function () {
    setTimeout(updateCommentCount, 100);
});

function addNewComment(name, comment, date) {
    // Yeni yorum elementi oluştur
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';

    // Yorum içeriğini oluştur
    commentDiv.innerHTML = `
        <div class="comment-header">
            <div class="author-info">
                <div class="author-avatar">
                    ${name.charAt(0).toUpperCase()}
                </div>
                <div class="author-details">
                    <div class="comment-author">${name}</div>
                </div>
            </div>
            <div class="comment-date">
                <i class="far fa-clock"></i>
                ${date}
            </div>
        </div>
        <div class="comment-content">
            ${comment}
        </div>
    `;

    // Yorumu sayfaya ekle
    document.querySelector('.comments-list').appendChild(commentDiv);
}

// Blog detaylarını yükle
async function loadBlogDetails() {
    try {
        const response = await fetch('../data/blogs.json');
        const data = await response.json();

        // URL'den blog ID'sini al
        const blogId = window.location.hash.substring(1);
        const blog = data.blogs.find(b => b.id === blogId);

        if (blog) {
            // ... mevcut blog içeriği yükleme kodu ...

            // Varolan yorumları yükle
            if (blog.comments && blog.comments.length > 0) {
                const commentsList = document.getElementById('commentsList');
                blog.comments.forEach(comment => {
                    const commentElement = createCommentElement(comment);
                    commentsList.appendChild(commentElement);
                });
            }
        }
    } catch (error) {
        console.error('Blog detayları yüklenirken hata:', error);
    }
}

// Yorum elementi oluştur
function createCommentElement(comment) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';

    commentDiv.innerHTML = `
        <div class="comment-header">
            <div class="author-info">
                <div class="author-avatar">
                    ${comment.author.charAt(0).toUpperCase()}
                </div>
                <div class="author-details">
                    <div class="comment-author">${comment.author}</div>
                </div>
            </div>
            <div class="comment-date">
                <i class="far fa-clock"></i>
                ${comment.date}
            </div>
        </div>
        <div class="comment-content">
            ${comment.content}
        </div>
    `;

    return commentDiv;
}

// Sayfa yüklendiğinde blog detaylarını yükle
document.addEventListener('DOMContentLoaded', loadBlogDetails);

// Mevcut yorum form event listener'ı
document.getElementById('commentForm').addEventListener('submit', function (e) {
    // ... mevcut yorum ekleme kodu ...
});