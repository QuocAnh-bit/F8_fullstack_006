import { client } from "./client.js";

let pagination = 1;
let limitEl = 5;

const getPost = async (query = {}) => {
  const queryString = new URLSearchParams(query).toString();
  await renderLoading();

  const { data } = await client.get(`/posts?${queryString}}`);
  return data;
};
const main = document.querySelector("main");
const container = document.querySelector(".container");

// getPost({
//   _page: pagination,
//   _limit: limitEl,
// });
const renderPost = async () => {
  const datas = await getPost({
    _page: pagination,
    _limit: limitEl,
  });

  datas.forEach((post) => {
    console.log(post);
    const sectionHtml = `
    <section class="section-item">
          <a href="#" class="category-post">${post.category}</a>
          <h2 class="title-post">${post.title}</h2>
          <a href="#" class="user">
            <div class="avt-user">
              <img src="${post.avt}" alt="" />
            </div>
            <span class="name-user">${post.nameUser}</span>
          </a>

          <hr />
          <p class="introductory">${post.introductory}</p>
          <figure class="img-post">
            <img
              src="${post.urlImgPost[0].urlImg}"
              alt="${post.urlImgPost[0].caption}"
            />
            <figcaption>${post.urlImgPost[0].caption}</figcaption>
          </figure>
          <div class="content-post">
            ${
              post.contentPost.length > 0
                ? post.contentPost
                    .map((sentence) => `<p>${sentence.content}</p>`)
                    .join("")
                : ""
            }
          </div>
          <figure class="img-post">
            <img
              src="${post.urlImgPost[1].urlImg}"
              alt="${post.urlImgPost[1].urlImg}
            "
            />
            <figcaption>${post.urlImgPost[1].caption}</figcaption>
          </figure>
          <hr />
          <div class="hashtag">
            ${post.hashtag.length > 0 ? `<p>Chủ đề:</p>` : ""}
            ${
              post.hashtag.length > 0
                ? post.hashtag
                    .map(
                      (tagItem) => `<a class="hashtag-item">${tagItem.tag}</a>`
                    )
                    .join("")
                : ""
            }
          </div>
        </section>`;
    container.innerHTML += sectionHtml;
  });
  main.append(container);
};
const renderLoading = async () => {
  const loader = document.querySelector(".loader-wrap");
  loader.style.display = "flex";
  setTimeout(() => {
    loader.style.display = "none";
  }, 2000);
};

window.addEventListener("scroll", () => {
  console.log(window.scrollY + window.innerHeight);
  console.log(document.documentElement.scrollHeight);

  if (
    window.scrollY + window.innerHeight + 100 >=
    document.documentElement.scrollHeight
  ) {
    renderPost();
  }
});
renderPost();
