'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/**
 * @fileOverview
 *
 * The main entry point for Docjam. This defines the `Docjam` class.
 */

var fs = require('fs');
var prettyJson = require('prettyjson');
var babel = require('babel');
var Class = require('class-extend');

/**
 * A Docjam instance.
 *
 * Use this to parse one or more JS files and construct the final documentation
 * structure.
 */

var Docjam = (function () {
  function Docjam() {
    _classCallCheck(this, Docjam);
  }

  _createClass(Docjam, [{
    key: 'process',

    /**
     * Process given file.
     *
     * @param  {String} pathToFile Path to file.
     */
    value: function process(pathToFile) {
      var code = fs.readFileSync(pathToFile, 'utf-8');

      var comments = [];

      var opts = {
        ecmaVersion: 6,
        onComment: function onComment(block, text, start, end) {
          if (block) {
            comments.push({ block: block, text: text, start: start, end: end });
          }
        }
      };

      var ast;

      try {
        ast = babel.parse(code, opts);
      } catch (err) {
        throw err;
      }

      // now let's match up comments to code
      console.log(prettyJson.render(ast));

      console.log(prettyJson.render(comments));
    }
  }]);

  return Docjam;
})();

exports['default'] = Docjam;

Docjam.extend = Class.extend;
module.exports = exports['default'];