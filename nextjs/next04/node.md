- Thư viện SWR -> sử dụng để fetch data

* tối ưu hóa tải dữ liệu
* chỉ sử dụng ở client (Trừ page router)

- SD:

* const fetcher = (...args) => fetch(...args).then(res => res.json()) -> tìm nạp , trả về promise
* const { data, error, isLoading } = useSWR('/api/user/123', fetcher) -> sử dụng hook

- env trong next : bắt đầu bằng NEXT_PUBLIC (Check env -> process.env.NEXT_PUBLIC)
- Nếu muốn bỏ NEXTPUBLIC ở phía client thì config tại nextconfig env
- ví dụ config env cho SERVER_API ở phía client
  //const nextConfig = {
  env: {
  SERVER_API: process.env.SERVER_API,
  },
  };

- Xử lý cache fetch SWR :

* const { mutate } = useSWRConfig();
* mutate(keyApi)

- SWR có tính năng tự động đồng bộ

- Sử dụng navigate.onLine để check mạng

SCSS Model : có tác dụng đổi tên class mà không trùng lặp, tránh bị ghi đè thuộc tính css

CSS in JS styled components: (thư viện) chỉ có tác dụng trong components được viết

muốn dùng link image ngoài của next/image thì phải config link

SEO Onpage :

- Semantic
- tag Meta : - title, meta description
- Open Graph (Các mạng xã hội phổ biến )
- file robots.txt: cho phép và ngăn chặn bot của bộ máy tìm kiếm truy cập vào các đường dẫn trên web để thu thập dữ liệu(Index) , để đánh index tất cả url chứa trong trang web đó
- File sitemap.xml --> khai báo file sitemap.xml cho công cụ: GG Search Console
- File favicon.ico
  -json-ld

hàm tự tạo title cho thẻ meta generateMetadata
