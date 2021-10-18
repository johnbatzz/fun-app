// const path = require("path");
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  devServer: {
    host: 'localhost',
    port: '8080'
  },
  transpileDependencies: [
    'vuetify'
  ]
}
