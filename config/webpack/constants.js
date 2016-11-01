var path = require('path');
var rootDir = path.join(__dirname, '../..');

module.exports = {
  ROOT_DIR: rootDir,

  CLIENT_DIR: path.join(rootDir, 'client'),
  DIST_DIR: path.join(rootDir, 'dist'),
  SERVER_DIR: path.join(rootDir, 'server'),
  SHARED_DIR: path.join(rootDir, 'shared'),

  NODE_MODULES_DIR: path.join(rootDir, 'node_modules'),
};
