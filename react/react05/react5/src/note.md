# Vấn đề

- chia sẻ dữ liệu giữa các component -> Render props + state của component Cha
- Dữ liệu dùng chung cho các component -> Thông tin user sau khi đăng nhập,...

# Giải pháp

- local State -> Dùng useState
- Global State : ContextApi + useReducer , thư viện bên ngoài : Redux

Muốn lấy dữ liệu từ context

- Import đối tượng context
- Import Hook useContexet

=> Gom thành 1 hook mới - > tạo hàm bắn đầu bằng từ khóa use
