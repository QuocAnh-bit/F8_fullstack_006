import Navigo from "navigo";
import { Error } from "../Err";

const root = document.querySelector("#root");
const routerObject = new Navigo("/", { linksSelector: "a" });
const renderRouter = (content, target, params = null) => {
  target.innerHTML = content(params);
};

export function router(arrRegister = [{ path, component }], DefaultLayout) {
  if (DefaultLayout) {
    renderRouter(DefaultLayout, root);
  }
  const bodyRouter = document.querySelector(".col-9");
  if (arrRegister.length !== 0) {
    arrRegister.forEach((item) => {
      routerObject.on(item.path, (params) => {
        console.log(params);
        renderRouter(item.component, bodyRouter, params);
      });
    });

    routerObject.notFound(() => {
      renderRouter(Error, root);
    });
    routerObject.resolve();
  }
}

window.navigate = (path) => routerObject.navigate(path);
