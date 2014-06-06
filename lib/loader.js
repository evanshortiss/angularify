'use strict';

var fs = require('fs')
  , url = require('url')
  , path = require('path')
  , request = require('request')
  , ANGULAR_DIR = path.join(__dirname, '../angular')
  , DEFAULT_VERSION = '1.0.2'
  , CDN_URL = 'https://code.angularjs.org/';


function buildDownloadUrl (module, version) {
  return url.resolve(CDN_URL, path.join(version, module));
}

function buildModuleFilePath (module, version) {
  return path.join(ANGULAR_DIR, version, module);
}

function downloadModule (module, version, callback) {
  var url = buildDownloadUrl(module, version);

  console.log('Downloading dependency %s', url);

  request.get({
    url: url
  }, function (err, res, data) {
    if (err) {
      callback(err);
    } else if (res && res.statusCode !== 200) {
      if (res.statusCode === 404) {
        callback('Module ' + module + ' could not be found on CDN');
      } else {
        callback('Unexpected response from CDN (Status Code: ' + res.statusCode
        + ')');
      }
    } else {
      fs.writeFile(buildModuleFilePath(module, version), data, callback);
    }
  });
};


exports.getModule = function (module, version, callback) {
  version = version || DEFAULT_VERSION;

  // Add angular prefix if necessary
  if (module.indexOf('angular') === -1) {
    module = 'angular-' + module;
  }

  // Add .js suffix if required
  if (module.indexOf('.js') === -1) {
    module += '.js';
  }

  fs.exists(buildModuleFilePath(module, version), function (exists) {
    if (exists) {
      // Return file contents
      fs.readFile(buildModuleFilePath(module, version), {
        encoding: 'utf8'
      }, callback);
    } else {
      var versionPath = path.join(__dirname, '../angular', version);
      // Create directory for version
      if(!fs.existsSync(versionPath)) {
        fs.mkdirSync(versionPath);
      }

      // Download the requested module
      downloadModule(module, version, function (err) {
        if (err) {
          // TODO: Handle it
          console.error('brng failed:', err);
        } else {
          // We know the module is local now so just get it by calling this
          exports.getModule(module, version, callback);
        }
      });
    }
  });
};
