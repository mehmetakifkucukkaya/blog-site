// Beğeni fonksiyonu
function handleLike() {
    const likeButton = document.querySelector('.btn-outline-primary');
    const likeCount = likeButton.querySelector('.badge');

    likeButton.addEventListener('click', () => {
        // Beğeni sayısını artır
        let count = parseInt(likeCount.textContent);
        likeCount.textContent = count + 1;

        // Butonu aktif hale getir
        likeButton.classList.add('active');
    });
}

// Paylaşım fonksiyonları
function shareOnFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`);
}

function shareOnTwitter() {
    window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`);
}

function shareOnWhatsApp() {
    window.open(`https://api.whatsapp.com/send?text=${window.location.href}`);
}

function shareOnLinkedIn() {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`);
} 