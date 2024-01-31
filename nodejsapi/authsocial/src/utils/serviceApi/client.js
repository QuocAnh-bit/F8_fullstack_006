import config from "@/config/config";
const { SERVER_API } = config;

export const client = {
  serverApi: SERVER_API,

  setUrl: function (url) {
    this.serverApi = url;
  },

  send: async function (url, method = "GET", body = null, api = null) {
    url = `${this.serverApi}${url}`;

    const headers = {
      "Content-Type": "application/json",
    };
    if (api) {
      headers["X-Api-Key"] = api;
    }
    const options = {
      method,
      credentials: "include",
      headers,
    };
    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    const response = await fetch(url, options);

    const data = await response.json();

    return { response, data };
  },

  get: function (url, body = null, api = null) {
    return this.send(url, "GET", body, api);
  },

  post: function (url, body = {}, api = null) {
    return this.send(url, "POST", body, api);
  },

  put: function (url, body = {}, api = null) {
    return this.send(url, "PUT", body, api);
  },

  patch: function (url, body = {}, api = null) {
    return this.send(url, "PATCH", body, api);
  },

  delete: function (url, api = null) {
    return this.send(url, "DELETE", null, api);
  },
};
