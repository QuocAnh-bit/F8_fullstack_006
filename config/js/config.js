// const postUser = async (data) => {
//   // chuyển cú pháp cho phù hợp với application/x-www-form-urlencoded
//   const dataUrlEndcoded = new URLSearchParams(data).toString();

//   const response = await fetch(`${severApi}/todos`, {
//     method: "POST",
//     headers: {
//       //   "Content-Type": "application/json",
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     // body: JSON.stringify(data)
//     body: dataUrlEndcoded,
//   });
//   console.log(response);
// };

// const getUser = async () => {
//   const response = await fetch(`${severApi}/todos`);
//   const todos = await response.json();
//   // đọc response headers
//   console.log(response.headers.get("Content-Type"));
// };
// getUser();
// // postUser({
// //   name: "User 7",
// //   email: "user7@gmail.com",
// // });
export const config = {
  SERVER_API: "http://localhost:3000",
  PAGE_LIMIT: 3,
};
