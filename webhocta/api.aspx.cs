using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI;

namespace webhocta
{
    public partial class api : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request.QueryString["action"];
            if (action == "login")
            {
                HandleLogin();
            }
            else if (action == "signup")
            {
                HandleSignup();
            }
        }

        private void HandleLogin()
        {
            string username = Request.Form["username"];
            string password = Request.Form["password"];

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                Response.Write("Tài khoản hoặc mật khẩu không được để trống!");
                Response.End();
            }

            if (CheckLogin(username, password))
            {
                Session["LoggedInUser"] = username;
                Response.Write("success");
            }
            else
            {
                Response.Write("Tài khoản hoặc mật khẩu không đúng!");
            }
            Response.End();
        }

        private bool CheckLogin(string username, string password)
        {
            string connectionString = "Data Source=DESKTOP-DV3F9RF;Initial Catalog=webta;Integrated Security=True;Encrypt=False";
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("SELECT MatKhau FROM QuanLyTaiKhoan WHERE TenTaiKhoan = @username", conn))
                {
                    cmd.Parameters.AddWithValue("@username", username);
                    var sha256 = new System.Security.Cryptography.SHA256Managed();
                    var passwordHash = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                    string hashedPassword = Convert.ToBase64String(passwordHash);

                    string storedPassword = cmd.ExecuteScalar()?.ToString();
                    return storedPassword == hashedPassword; // So sánh mật khẩu đã băm
                }
            }
        }

        private void HandleSignup()
        {
            string username = Request.Form["username"];
            string password = Request.Form["password"];

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                Response.Write("Tên người dùng và mật khẩu không được để trống!");
                Response.End();
            }

            if (CheckUserExists(username))
            {
                Response.Write("Tên người dùng đã tồn tại!");
                Response.End();
            }

            if (CreateUser(username, password))
            {
                Response.Write("Đăng ký thành công!"); // Thông báo xác nhận
            }
            else
            {
                Response.Write("Đã xảy ra lỗi khi đăng ký.");
            }
            Response.End();
        }

        private bool CheckUserExists(string username)
        {
            string connectionString = "Data Source=DESKTOP-DV3F9RF;Initial Catalog=webta;Integrated Security=True;Encrypt=False";
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("SELECT COUNT(*) FROM QuanLyTaiKhoan WHERE TenTaiKhoan = @username", conn))
                {
                    cmd.Parameters.AddWithValue("@username", username);
                    return (int)cmd.ExecuteScalar() > 0; // Trả về true nếu có ít nhất một bản ghi
                }
            }
        }

        private bool CreateUser(string username, string password)
        {
            string connectionString = "Data Source=DESKTOP-DV3F9RF;Initial Catalog=webta;Integrated Security=True;Encrypt=False";
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("INSERT INTO QuanLyTaiKhoan (TenTaiKhoan, MatKhau, QuyenHan) VALUES (@username, @password, 2)", conn)) // QuyenHan = 2 cho User
                {
                    cmd.Parameters.AddWithValue("@username", username);
                    var sha256 = new System.Security.Cryptography.SHA256Managed();
                    var passwordHash = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                    cmd.Parameters.AddWithValue("@password", Convert.ToBase64String(passwordHash));
                    return cmd.ExecuteNonQuery() > 0; // Trả về true nếu có bản ghi mới được thêm
                }
            }
        }
    }
}
