'use strict';

var through = require('through')
  , loader = require('./loader')
  , async = require('async');

function angularify() {
  var buf = '';

  return through(function(chunk) {
    buf += chunk.toString();
  }, function () {
    var rexSingle = new RegExp(/require\('angula[^']+'\)[,;]/g)
      , rexDouble = new RegExp(/require\("angula[^']+"\)[,;]/g)
      // , rexModule = new RegExp(/\(.*?\)/)
      , requires = []
      , self = this;

    requires = requires.concat(buf.match(rexSingle));
    requires = requires.concat(buf.match(rexDouble));

    async.eachSeries(requires, function (req, callback) {
      if (req === null)  {
        return callback();
      }

      var modVer = req
          .replace('require(', '')
          .replace(/\)[,;]/, '')
          .replace(/\'|\"/g, '')
          .split('@');

      loader.getModule(modVer[0], modVer[1], function (err, module) {
        // JavaScript String.replace gives unexpected result with $ chars
        // replace these temporarily...
        module = module.replace(/\$/g, '_');

        // Insert angular
        buf = buf.replace(req, module);

        // Now insert the $ chars again...
        buf = buf.replace('_', '$');

        callback();
      });
    }, function (err) {
      if (err) {
        throw err;
      }

      self.queue(buf);
      self.queue(null);
    });
  });
}

module.exports = angularify;
