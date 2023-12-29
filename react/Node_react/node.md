// Cơ chế Client-Side rendering và Server-Side rendering

- Server-Side rendering :

* gửi 1 req tới web server
* Tất cả các logic đa số đc xử lý tại server
  => xử lý xong thì trả về client toàn bộ HTML

- kn khác multi-page application

* Ưu điểm :

- Load nhanh, đễ tối ưu
- SEO tốt => vì bot của các bộ máy tìm kiếm sẽ thấy tòa bộ dữ liệu
- chạy trên phần lớn mọi trình duyệt , kể cả disableJS

* Nhược điểm:

- mỗi lần chuyển trang phải load lại nhiều lần
- nặng server, vì xử lý nhiều logic
- tốn băng thông vì phải tải nhiều dữ liêu trùng và thừa

\*Client-Side rendering

- Tạo nên giao diện bằng js
- khi có req lên thì server sẽ trả về một chuỗi json, trình duyệt sẽ sử dụng json đó để render ra html

- logic chuyển trang và hiển thị dữ liệu nằm chủ yếu ở client
- kn khác là singlePage ( chỉ 1 trang duy nhất tất cả các hàng động url chỉ là fake)

* ưu điểm :

- chỉ cần load 1 lần duy nhất
- khi người dùng có sự điều trỉnh, người dùng sẽ thấy dữ liệu mới mà không cần chuyển trang
- giảm tải 1 phần logic cho server
- chạy mượt mà trên client

- nhược điểm :
- lần đầu load sẽ chậm hơn nếu như không biết tối ưu hóa
- Seo không tốt

REACT (sử dụng client side)

-> Thư viện hỗ trợ về mặt xây dụng UI theo cơ chế client side
-> vì là thư viện nên react không có đóng gói phải cài rời rạc
-> Sử dụng vite (build tool ) để xử lý đóng gói thư viện thành các file có sẵn, không cần tạo thủ công
