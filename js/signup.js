document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordConfirmInput = document.getElementById('password-confirm');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Real-time validation
    nameInput.addEventListener('input', () => {
        if (nameInput.value.length < 3) {
            nameInput.setCustomValidity('İsim en az 3 karakter olmalıdır');
        } else {
            nameInput.setCustomValidity('');
        }
    });

    emailInput.addEventListener('input', () => {
        if (!emailRegex.test(emailInput.value)) {
            emailInput.setCustomValidity('Lütfen geçerli bir e-posta adresi giriniz');
        } else {
            emailInput.setCustomValidity('');
        }
    });

    passwordInput.addEventListener('input', validatePassword);
    passwordConfirmInput.addEventListener('input', validatePassword);

    function validatePassword() {
        if (passwordInput.value.length < 6) {
            passwordInput.setCustomValidity('Şifre en az 6 karakter olmalıdır');
        } else {
            passwordInput.setCustomValidity('');
        }

        if (passwordInput.value !== passwordConfirmInput.value) {
            passwordConfirmInput.setCustomValidity('Şifreler eşleşmiyor');
        } else {
            passwordConfirmInput.setCustomValidity('');
        }
    }

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validation checks
        if (nameInput.value.length < 3) {
            showNotification('İsim en az 3 karakter olmalıdır', 'error');
            return;
        }

        if (!emailRegex.test(emailInput.value)) {
            showNotification('Lütfen geçerli bir e-posta adresi giriniz', 'error');
            return;
        }

        if (passwordInput.value.length < 6) {
            showNotification('Şifre en az 6 karakter olmalıdır', 'error');
            return;
        }

        if (passwordInput.value !== passwordConfirmInput.value) {
            showNotification('Şifreler eşleşmiyor', 'error');
            return;
        }

        // Simulate API call
        try {
            await simulateSignup({
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            });

            showNotification('Kayıt başarılı! Yönlendiriliyorsunuz...', 'success');

            // Redirect after successful signup
            setTimeout(() => {
                window.location.href = '../pages/login.html';
            }, 2000);

        } catch (error) {
            showNotification(error.message, 'error');
        }
    });
});

// Simulate signup API call
function simulateSignup(userData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userData.email && userData.password && userData.name) {
                resolve();
            } else {
                reject(new Error('Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.'));
            }
        }, 1000);
    });
}

// Show notification function (same as in login.js)
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

    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
} 