document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Add input event listeners for real-time validation
    emailInput.addEventListener('input', () => {
        if (!emailRegex.test(emailInput.value)) {
            emailInput.setCustomValidity('Lütfen geçerli bir e-posta adresi giriniz');
        } else {
            emailInput.setCustomValidity('');
        }
    });

    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length < 6) {
            passwordInput.setCustomValidity('Şifre en az 6 karakter olmalıdır');
        } else {
            passwordInput.setCustomValidity('');
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic validation
        if (!emailRegex.test(emailInput.value)) {
            showNotification('Lütfen geçerli bir e-posta adresi giriniz', 'error');
            return;
        }

        if (passwordInput.value.length < 6) {
            showNotification('Şifre en az 6 karakter olmalıdır', 'error');
            return;
        }

        // Simulate API call
        try {
            // Here you would normally make an API call to your backend
            await simulateLogin(emailInput.value, passwordInput.value);
            
            showNotification('Giriş başarılı! Yönlendiriliyorsunuz...', 'success');
            
            // Redirect after successful login
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);

        } catch (error) {
            showNotification(error.message, 'error');
        }
    });
});

// Simulate login API call
function simulateLogin(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email && password) {
                resolve();
            } else {
                reject(new Error('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.'));
            }
        }, 1000);
    });
}

// Show notification function
function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 8px;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
} 