// /js/login.js

document.addEventListener('DOMContentLoaded', () => {
    // Nếu người dùng đã đăng nhập, tự động chuyển đến trang chủ
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'index.html';
    }

    const loginForm = document.querySelector('.login-box form');
    
    loginForm.addEventListener('submit', (event) => {
        // Ngăn form gửi đi theo cách truyền thống
        event.preventDefault(); 

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // --- MÔ PHỎNG XÁC THỰC ---
        // Trong một ứng dụng thực tế, bạn sẽ gửi thông tin này đến máy chủ.
        // Ở đây, chúng ta sẽ hardcode (gán cứng) tài khoản.
        const validUser = 'admin';
        const validPass = '123'; // Đặt mật khẩu của bạn ở đây

        if (username === validUser && password === validPass) {
            // Đăng nhập thành công
            // Lưu trạng thái đăng nhập vào sessionStorage
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('username', username);

            // Chuyển hướng đến trang chủ
            window.location.href = 'index.html';
        } else {
            // Đăng nhập thất bại
            alert('Tên đăng nhập hoặc mật khẩu không chính xác!');
        }
    });
});
