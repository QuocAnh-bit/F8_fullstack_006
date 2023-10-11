import { client } from "./client.js";

import { config } from "./config.js";
const { PAGE_LIMIT } = config;

const render = (posts) => {
  const postEl = document.querySelector(".posts");
  postEl.innerHTML = "";
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
      const removeBtn = document.createElement("spam");
      removeBtn.innerText = "Xóa";
      removeBtn.classList.add("remove");

      removeBtn.addEventListener("click", () => {
        if (confirm("Bạn có chắc chắn ?")) {
          removePost(id);
        }
      });
      postItem.append(removeBtn);
      postEl.append(postItem);
    });
  }
};
const renderPaginate = (totalPage) => {
  const paginateEl = document.querySelector(".paginate");
  paginateEl.innerHTML = "";
  //
  if (totalPage > 1) {
    if (currentPage > 1) {
      const spanPrev = document.createElement("span");
      const aPrev = document.createElement("a");
      aPrev.href = "#";
      aPrev.innerText = "prev";
      aPrev.addEventListener("click", (e) => {
        e.preventDefault();
        goPage(--currentPage);
      });
      spanPrev.append(aPrev);
      paginateEl.append(spanPrev);
    }

    for (let page = 1; page <= totalPage; page++) {
      const span = document.createElement("span");
      if (page === currentPage) {
        span.classList.add("active");
      }
      const a = document.createElement("a");
      a.href = "#";
      a.innerText = page;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        goPage(page);
      });
      span.append(a);
      paginateEl.append(span);
    }
    //Next
    if (currentPage < totalPage) {
      const spanNext = document.createElement("span");
      const aNext = document.createElement("a");
      aNext.href = "#";
      aNext.innerText = "next";
      aNext.addEventListener("click", (e) => {
        e.preventDefault();
        goPage(++currentPage);
      });
      spanNext.append(aNext);
      paginateEl.append(spanNext);
    }
  }
};

// Xử lý phân trang (Luôn làm tròn lên )

const goPage = (page) => {
  currentPage = page;
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
  getPost({
    q: keyWord,
    _sort: sort,
    _order: order,
    _limit: limit,
    _page: currentPage,
  });
};

const getPost = async (query = {}) => {
  const queryString = new URLSearchParams(query).toString();
  const { response, data } = await client.get(`/posts?${queryString}`);
  const total = response.headers.get("x-total-count");
  const totalPage = Math.ceil(total / PAGE_LIMIT);
  renderPaginate(totalPage);
  render(data);
};

// khởi tạo các giá trị khởi tạo
let sort = "id";
let order = "desc";
let keyWord = "";
let limit = PAGE_LIMIT;
let currentPage = 1;

getPost({
  _sort: sort,
  _order: order,
  _limit: limit,
  _page: currentPage,
});

const addPost = async (data) => {
  const { response } = await client.post(`/posts`, data);
  if (response.ok) {
    currentPage = 1;
    getPost({
      // render giao diện
      _sort: "id",
      _order: "desc",
      _limit: limit,
      _page: currentPage,
    });
    // đóng form
    postForm.innerText = "";
    // Reset
    sortByEL.value = "latest";
  }
};
const removePost = async (id) => {
  const { response } = await client.delete(`/posts/${id}`);
  if (response.ok) {
    console.log(currentPage);
    getPost({
      // render giao diện
      _sort: "id",
      _order: "desc",
      _limit: limit,
      _page: currentPage,
    });
    if (lim)
      // đóng form
      postForm.innerText = "";
    // Reset
    sortByEL.value = "latest";
  }
};
const searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  keyWord = e.target.children[0].value;
  getPost({
    q: keyWord,
    _sort: sort,
    _order: order,
    _limit: limit,
    _page: currentPage,
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
    _limit: limit,
    _page: currentPage,
  });
});

const postNewBtn = document.querySelector(".post-new");
const postForm = document.querySelector(".post-form");

postNewBtn.addEventListener("click", () => {
  postForm.innerHTML = "";
  const from = document.createElement("form");
  from.addEventListener("submit", handleSubmit);

  const titleEl = document.createElement("input");
  titleEl.placeholder = `Title Post`;
  titleEl.required = true;
  from.append(titleEl);

  const excerptEl = document.createElement("textarea");
  excerptEl.placeholder = "Mô Tả Ngắn";
  excerptEl.required = true;
  from.append(excerptEl);

  const contentEl = document.createElement("textarea");
  contentEl.placeholder = "Nội Dung";
  contentEl.required = true;
  from.append(contentEl);

  const submitBtn = document.createElement("button");
  submitBtn.innerText = "save";
  from.append(submitBtn);

  postForm.append(from);
});

const handleSubmit = (e) => {
  e.preventDefault();
  const fieldList = e.target.children;
  const [titleEl, excerptEl, contentEl] = Array.from(fieldList);
  const title = titleEl.value;
  const excerpt = excerptEl.value;
  const content = contentEl.value;
  addPost({ title, excerpt, content });
  console.log(title, excerpt, content);
};
