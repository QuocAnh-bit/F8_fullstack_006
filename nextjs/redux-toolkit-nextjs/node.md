npm i @reduxjs/toolkit react-redux ( cài các gói cần thiết )

Để reduxTool kit có thể hiện lên devtool : thêm một key có tên là devtool: true vào Oj của store

- Create Api (Redux/toolkit): sẽ được tạo trong founder services của store

* b1: Thêm vào reducer của store
* b2: Thêm key middleware vào Oj của store

  middleware: (getDefaultMiddleware) => {
  return getDefaultMiddleware();
  },
  hoặc
  middleware: (getDefaultMiddleware) => {
  return [...getDefaultMiddleware(), postApi.middleware]}

* b3: sử dụng Hook: useGetPostQuery để truy xuất dữ liệu
* setupListeners để kích hoạt một tiên ích Vd: refetchOnReconnect
