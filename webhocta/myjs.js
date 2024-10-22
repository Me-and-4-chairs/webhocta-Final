document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("SI-btn");
    const registerBtn = document.getElementById("SU-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const userIcon = document.getElementById("user-icon");
    const navList = document.querySelector('nav ul'); // Lấy danh sách điều hướng

    // Tạo nút Quản Lý
    const adminBtn = document.createElement('li');
    adminBtn.innerHTML = '<a href="admin.html" id="admin-btn">Quản Lý</a>';
    adminBtn.style.display = 'none'; // Ẩn nút Quản Lý mặc định

    // Kiểm tra xem người dùng đã đăng nhập chưa
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        userIcon.textContent = '🚪'; // Hiển thị icon đăng xuất
        loginBtn.style.display = 'none'; // Ẩn nút đăng nhập
        registerBtn.style.display = 'none'; // Ẩn nút đăng ký
        logoutBtn.style.display = 'block'; // Hiển thị nút đăng xuất

        // Kiểm tra quyền truy cập
        if (loggedInUser === "Admin") {
            adminBtn.style.display = 'inline'; // Hiển thị nút Quản Lý
            logoutBtn.insertAdjacentElement('afterend', adminBtn); // Thêm nút Quản Lý sau nút Đăng Xuất
        }
    } else {
        userIcon.textContent = '🔑'; // Hiển thị icon đăng nhập
        loginBtn.style.display = 'block'; // Hiển thị lại nút đăng nhập
        registerBtn.style.display = 'block'; // Hiển thị lại nút đăng ký
        logoutBtn.style.display = 'none'; // Ẩn nút đăng xuất
    }

    // Chuyển hướng đến trang đăng nhập khi nhấn nút đăng nhập
    if (loginBtn) {
        loginBtn.onclick = function () {
            window.location.href = "signin.html"; // Chuyển hướng đến trang đăng nhập
        };
    }

    // Đăng xuất
    if (logoutBtn) {
        logoutBtn.onclick = function () {
            localStorage.removeItem('loggedInUser');
            alert('Đăng xuất thành công!');
            userIcon.textContent = '🔑'; // Đặt lại icon về trạng thái đăng nhập
            loginBtn.style.display = 'block'; // Hiển thị lại nút đăng nhập
            registerBtn.style.display = 'block'; // Hiển thị lại nút đăng ký
            logoutBtn.style.display = 'none'; // Ẩn nút đăng xuất
            adminBtn.style.display = 'none'; // Ẩn nút Quản Lý
            window.location.href = 'index.html'; // Chuyển hướng về trang chính
        };
    }


    // Carousel hình ảnh
    let currentIndex = 0;
    const images = document.querySelectorAll('.carousel-images img');
    const totalImages = images.length;

    // Hàm hiển thị hình ảnh tiếp theo
    function showNextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    }

    // Hàm hiển thị hình ảnh trước
    function showPreviousImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
    }

    // Hàm cập nhật carousel
    function updateCarousel() {
        const offset = -currentIndex * 100;
        document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
        updateDots();
    }

    // Cập nhật dấu chấm
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Thay đổi hình ảnh mỗi 5 giây
    setInterval(showNextImage, 5000);

    // Thêm sự kiện cho các nút
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (prevBtn) {
        prevBtn.onclick = showPreviousImage;
    }

    if (nextBtn) {
        nextBtn.onclick = showNextImage;
    }

    // Sự kiện cho các nút điều hướng
    document.getElementById("home-btn").onclick = function (event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định
        window.location.href = "index.html"; // Chuyển đến trang chính
    };

    document.getElementById("courses-btn").onclick = function (event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định
        window.location.href = "khoaHoc.html"; // Đường dẫn đến trang khóa học
    };


    document.getElementById("lv-button").onclick = function () {
        window.location.href = "testLevel.html"; // Đường dẫn đến trang kiểm tra
    };

    document.getElementById("contact-btn").onclick = function (event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định
        const footer = document.getElementById("footer");
        footer.scrollIntoView({ behavior: 'smooth' }); // Cuộn mượt mà đến footer
    };

    // Thay đổi màu nền header khi cuộn
    window.onscroll = function () {
        const header = document.querySelector('header');
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
});
