// /js/auth.js

// 1. KIỂM TRA TRẠNG THÁI ĐĂNG NHẬP (BẢO VỆ TRANG)
// Mã này chạy ngay lập tức
if (sessionStorage.getItem('isLoggedIn') !== 'true') {
    // Nếu chưa đăng nhập, chuyển hướng về trang login
    alert('Bạn cần đăng nhập để truy cập trang này!');
    window.location.href = 'login.html';
}

// 2. XỬ LÝ NÚT ĐĂNG XUẤT
// Mã này chạy sau khi trang đã tải xong
document.addEventListener('DOMContentLoaded', () => {
    const authLink = document.getElementById('auth-link');

    if (authLink) {
        // Thay đổi văn bản từ "Đăng nhập" thành "Đăng xuất"
        authLink.textContent = 'Đăng xuất';
        authLink.style.backgroundColor = '#DC143C'; // Đổi màu nút thành màu đỏ
        
        // Gán sự kiện click để đăng xuất
        authLink.addEventListener('click', (event) => {
            event.preventDefault(); // Ngăn chuyển trang mặc định

            // Xóa thông tin đăng nhập khỏi sessionStorage
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('username');

            // Chuyển hướng về trang đăng nhập
            window.location.href = 'login.html';
        });
    }
});