document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('forgotPasswordForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;

        // Burada normalde backend'e istek atılacak
        // Şimdilik sadece alert gösteriyoruz
        alert(`${email} adresine şifre sıfırlama bağlantısı gönderildi. Lütfen e-postanızı kontrol edin.`);

        // Formu temizle
        this.reset();
    });
}); 