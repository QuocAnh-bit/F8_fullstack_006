import { client } from "./client.js";

const render = (posts) => {
  const postEl = document.querySelector(".posts");
  // postEl.innerHTML = "";
  if (posts.length) {
    posts.forEach(({ id, title, excerpt }) => {
      const postItem = document.createElement("div");
      postItem.className = "post-item";
      const h2 = document.createElement("h2");
      const a = document.createElement("a");
      a.innerText = title;
      a.href = "#";
      h2.append(a);
      postItem.append(h2);

      const p = document.createElement("p");
      p.innerText = excerpt;
      postItem.append(p);
      postEl.append(postItem);
    });
  }
};
const getPost = async (query = {}) => {
  const queryString = new URLSearchParams(query).toString();
  const { data } = await client.get(`/posts?${queryString}`);
  console.log(data);
  render(data);
};
// khởi tạo các giá trị khởi tạo
let sort = "id";
let order = "desc";
let keyWord = "";

getPost({
  _sort: sort,
  _order: order,
});

const searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  keyWord = e.target.children[0].value;
  getPost({
    q: keyWord,
    _sort: sort,
    _order: order,
  });
  e.target.children[0].value = "";
  console.log(keyWord);
});

const sortByEL = document.querySelector(".sort-by");

sortByEL.addEventListener("change", (e) => {
  const order = e.target.value === "latest" ? "desc" : "asc";
  getPost({
    q: keyWord,
    _sort: sort,
    _order: order,
  });
});
