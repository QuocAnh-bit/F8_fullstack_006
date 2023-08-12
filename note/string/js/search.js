var keyWord = "a";
var titleSearch = `<p> Tìm kiếm từ khóa <b> ${keyWord} </b>  </p>`;
var content = `Lorem Ipsum is hoàng an simply dummy text of HOÀNG AN the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived hoàng An not hOàng aN only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
document.write(titleSearch);

var results = "";
var count = 0;
var positive = content.toLowerCase().indexOf(keyWord.toLowerCase());

while (positive !== -1) {
  results +=
    content.slice(0, positive) +
    `<span>${content.slice(positive, positive + keyWord.length)}</span>`;

  content = content.slice(positive + keyWord.length);

  positive = content.toLowerCase().indexOf(keyWord.toLowerCase());

  count++;
}

document.write(results + count);
