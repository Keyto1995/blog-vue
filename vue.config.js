module.exports = {
  runtimeCompiler: true,
  devServer: {
    // host: "localhost",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8080/",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
