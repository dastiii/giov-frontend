module.exports = {
  publicPath: "./",
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Dein Lieblingsrestaurant.";
      return args;
    });
  },
  pwa: {
    name: "Dein Lieblingsrestaurant.",
    themeColor: "#499161",
    msTileColor: "#499161",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    iconPaths: {
      favicon32: 'img/icons/favicon.png',
      appleTouchIcon: 'img/icons/favicon-152.png',
      msTileImage: 'img/icons/favicon-144.png'
    }
  }
};
