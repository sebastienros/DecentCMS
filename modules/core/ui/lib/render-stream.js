// DecentCMS (c) 2014 Bertrand Le Roy, under MIT. See LICENSE.txt for licensing details.
'use strict';

// TODO: morph this so this enables sequential rendering while maintaining asynchronicity.

var stream = require('stream');
var Transform = stream.Transform;
var util = require('util');
var html = require('htmlencode');

util.inherits(RenderStream, Transform);

/**
 * @description
 * A transform stream for rendering shapes.
 * @param shell
 * @param [options.contentManager]
 * @constructor
 */
function RenderStream(shell, options) {
  Transform.call(this, {
    objectMode: true
  });
  this.shell = shell;
  this.scripts = [];
  this.stylesheets = [];
  this.meta = [];
  this.title = options.title || '';
  this.contentManager = options.contentManager;
};

RenderStream.prototype._transform = function(chunk, encoding, next) {
  this.push(chunk);
  next();
};

// TODO: more html rendering API
RenderStream.prototype.writeEncoded = function(text) {
  this.write(html.htmlEncode(text));
};

// TODO: script, stylesheet registering API

// TODO: add API to render a shape, that internally triggers the rendering event

module.exports = RenderStream;