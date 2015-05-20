'use strict';

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
export default class Docjam {
  /**
   * Process given file.
   *
   * @param  {String} pathToFile Path to file.
   */
  process (pathToFile) {
    var code = fs.readFileSync(pathToFile, 'utf-8');

    var comments = [];

    var opts = {
      ecmaVersion: 6,
      onComment: function(block, text, start, end) {
        if (block) {
          comments.push({block, text, start, end});
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
    console.log( prettyJson.render(ast) );

    console.log( prettyJson.render(comments) );
  }
}


Docjam.extend = Class.extend;

