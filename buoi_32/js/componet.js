class F8 {
  constructor() {}
  static component(name, options) {
    customElements.define(
      name,
      class extends HTMLElement {
        constructor() {
          super();
        }
        connectedCallback() {
          const template = options.template;
          if (options.data) {
            var data = options.data();
            Object.keys(data).forEach((key) => {
              window[key] = data[key];
            });
          }

          if (template) {
            const reGex = template.match(/{{.+?}}/g);
            const regexTrim = [];
            reGex.forEach((value) => {
              const variableRegex = value.match(/{{(.+?)}}/);
              regexTrim.push(variableRegex[1].trim());
            });
            var replaceTemplate = template;
            regexTrim.forEach((replaceEl) => {
              replaceTemplate = replaceTemplate.replace(
                /{{.+?}}/,
                `${window[replaceEl]}`
              );
            });

            const templateEl = document.createElement("template");
            templateEl.innerHTML = replaceTemplate;
            const templateNode = templateEl.content.cloneNode(true);

            const btnAll = templateNode.querySelectorAll("button");
            const span = templateNode.querySelector(".count-span");
            const h1 = templateNode.querySelector("h1");
            btnAll.forEach((btn) => {
              const btnAttribute = btn.getAttributeNames();
              let getEvent = btnAttribute[0].split(":");
              let eventBtn = getEvent[1];
              let checkAttribute = btn.getAttribute(`v-on:${eventBtn}`);

              btn.addEventListener(eventBtn, () => {
                if (checkAttribute === "count--") {
                  count--;
                  span.innerText = count;
                }
                if (checkAttribute === "count++") {
                  count++;
                  span.innerText = count;
                }
                if (checkAttribute.includes("title=")) {
                  let contentTitle = checkAttribute.split("=");
                  h1.innerHTML = contentTitle[1];
                }
              });
            });

            this.append(templateNode);
          }
        }
      }
    );
  }
}
