$(function () {
    $('#loginForm').on('submit', function (event) {
        event.preventDefault(); // Ngăn form submit
        const username = $('#username').val();
        const password = $('#password').val();

        console.log(`Username: ${username}, Password: ${password}`); // In ra giá trị để kiểm tra

        $.post('api.aspx?action=login', { username, password }, function (response) {
            if (response === 'success') {
                localStorage.setItem('loggedInUser', username);
                alert('Đăng nhập thành công!');
                window.location.href = 'index.html'; // Chuyển hướng đến trang chính
            } else if (response === 'admin') {
                localStorage.setItem('loggedInUser', username);
                alert('Đăng nhập thành công với quyền quản trị!');
                window.location.href = 'index.html'; // Chuyển hướng đến trang chính
            } else {
                alert('Tài khoản hoặc mật khẩu không đúng!');
            }
        }).fail(function () {
            alert('Đã xảy ra lỗi khi gửi yêu cầu.'); // Thông báo lỗi nếu có sự cố với yêu cầu
        });
    });
});


$(function () {
    $('#signup-form').on('submit', function (event) {
        event.preventDefault(); // Ngăn form submit

        const username = $('#new-username').val();
        const password = $('#new-password').val();

        console.log(`Username: ${username}, Password: ${password}`); // In ra giá trị để kiểm tra

        $.post('api.aspx?action=signup', { username, password }, function (response) {
            // Xử lý phản hồi từ server
            if (response === "Đăng ký thành công!") {
                alert(response); // Hiển thị thông báo
                window.location.href = 'signin.html'; // Chuyển hướng đến trang đăng nhập
            } else {
                alert(response); // Hiển thị thông báo lỗi
            }
        }).fail(function () {
            alert('Đã xảy ra lỗi khi gửi yêu cầu.'); // Thông báo lỗi nếu có sự cố với yêu cầu
        });
    });
});


