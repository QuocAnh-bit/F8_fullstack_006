// 1. LocalStorage -> Lưu trữ vô thời hạn
// 1.1 setLocalStorage: localStorage.setItem("key", 'value')
// 1.2 getLocalStorage: localStorage.getItem('key')
// 1.3 removeLocalStorage :  localStorage.remove('key')
// 1.4 clear all : localStorage.clear

// 2. sessionStorage -> Lưu trữ theo phiên (tắt trình duyệt tự xóa);
// Giống local

// 3. Cookie -> Lưu trữ theo phiên, lưu trữ theo thời gian

// localStorage.setItem("username", "hoangan.wed");

// if (typeof Storage !== "undefined") {
//   console.log(localStorage.getItem("username"));

//   sessionStorage.setItem("username", "aaa");
// }

// cookie tự độn đính kèm vào http Request (Dùng trình duyệt)
// Chuỗi cookie: key1=value; key2=value2; ...

// 1.setCookie
// Expire sẽ chấp nhận định dạng thời gian UTC

const expire = new Date("2023-10-16 09:00:00").toUTCString();
// console.log(expire);
// document.cookie = `username=hoangan.wed;expires=${expire}`;
document.cookie = `username=hoangan.wed;path=/`;
document.cookie = `username=hoangan.88`;
// đọc cookie

// console.log(document.cookie);

// 3. cập nhật cookie

// document.cookie = "username=hoanganit19";

// 4. xóa cookie

// document.cookie = `username=;expires=${new Date().toUTCString()}`;

/*
Http Only -> chỉ cho phép back-end lấy cookie(lấy thông qua http)
secure -> thao tac với cookie nếu sử dụng https 
Thư viện cookie npn
*/
