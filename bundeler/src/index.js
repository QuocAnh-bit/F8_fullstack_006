import { App } from "./App";
configDotenv.config();
const root = document.querySelector("#root");
root.innerHTML = App();
