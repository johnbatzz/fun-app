import Vue from "vue";

import store from "../store";

var MockAdapter = require("axios-mock-adapter");

// mock testing user accounts
const users = [
  {
    username: "user",
    password: "myPass",
    firstName: "John",
    lastName: "Smith",
    token: "mgfi5juf74j"
  },
  {
    username: "admin",
    password: "admin",
    firstName: "Jikan",
    lastName: "Yamamoto",
    token: "fgj8fjdfk43"
  },
  {
    username: "user2",
    password: "myPass2",
    firstName: "Sho",
    lastName: "Toshiro",
    token: "fgj8fjdfk433"
  }
];

const MockService = {
  init() {
    // this sets the mock adapter on the default instance
    var mock = new MockAdapter(Vue.axios);

    // mock login request
    mock.onPost("/login").reply(data => {
      const credential = JSON.parse(data.data);
      store.state.auth.user = credential;
      const found = users.find(user => {
        return (
          credential.username === user.username &&
          credential.password === user.password
        );
      });
      if (found) {
        return [200, found];
      }
      return [404, { errors: ["The login detail is incorrect"] }];
    });

    // mock to verify authentication
    mock.onGet(/\/verify\/?/).reply(data => {
      const token = data.headers.Authorization.replace("Token ", "");
      if (token !== "undefined") {
        const found = users.find(user => {
          return token === user.token;
        });
        return [200, found];
      }
      return [401, { errors: ["Invalid authentication"] }];
    });
  }
};

export default MockService;
