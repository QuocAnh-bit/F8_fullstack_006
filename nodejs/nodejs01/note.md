#Layout

- Header
- Body --> Views
- Footer

# Cách làm việc với Request - Response theo cơ chế server side (MVC)

- View chỉ được gọi vào Method GET
- Logic: Viết ở post, put, path, delete --> redirect về get để trình duyệt hiển thị giao diện
  Lưu ý: Tuyệt đối không được gọi giao diện vài các phương thức trên

# Có 2 cách để gửi message giữa các req

- Cách 1: Dùng search params
- Cách 2: Dùng session (Flash session)

#note SQL
Mối quan hệ : 1-1, 1-all , all - all
