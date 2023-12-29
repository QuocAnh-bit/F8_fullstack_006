//import từ node_module
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment/moment";

import "./assets/style.css";
import "./assets/footer.scss";

import { header } from "./components/header";
import { footer } from "./components/footer";
import image1 from "./img/img1.jpg";
import config from "./config.json";

const { SERVER_API } = config;

console.log(process.env.APP_NAME);

export const App = () => {
  return `<div>
  ${header()}
  <main>
    <h1>Trang chủ</h1>
    <a href="" class="btn btn-primary">Vào hệ thống</a>
    <hr>
    ${moment().format("DD/MM/YYYY HH:mm:ss")}
    <img src="${image1}" width="300">
    
  </main>
  ${footer()}
  </div>`;
};
