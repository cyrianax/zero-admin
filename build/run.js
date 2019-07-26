const webpack = require('webpack');
const colors = require('colors');
const webpackConfig = require('./webpack.config');
const WebpackDevServer = require('webpack-dev-server');
const FriendlyErrors = require('friendly-errors-webpack-plugin');
const os = require('os');

const ENV = process.env.NODE_ENV;
const port = 9000;
// 打印编译信息
const outputInfo = false;

if(ENV === 'development') {
  const localhost = `http://localhost:${port}`.underline.green;
  const ipAddress = `http://${getIPAdress()}:${port}`.underline.green;

  webpackConfig.plugins.push(new FriendlyErrors({
    compilationSuccessInfo: {
      messages: [`You application is running here ${localhost} and ${ipAddress}`],
    }
  }));
  const compiler = webpack(webpackConfig);

  new WebpackDevServer(compiler, {
    hot: true,
    open: true,
    quiet: true,
    clientLogLevel: "none",
  }).listen(port);

}else {
  const compiler = webpack(webpackConfig);
  compiler.run(function(err, stats) {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }
    const jsonInfo = stats.toJson();
  
    if (stats.hasErrors()) {
      console.error(jsonInfo.errors.join('\n').red);
    }
  
    if (stats.hasWarnings() && jsonInfo.warnings.length) {
      console.warn(jsonInfo.warnings.join('\n').yellow);
    }
  });
}

function getIPAdress() {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
      var iface = interfaces[devName];
      for (var i = 0; i < iface.length; i++) {
          var alias = iface[i];
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
              return alias.address;
          }
      }
  }
}
