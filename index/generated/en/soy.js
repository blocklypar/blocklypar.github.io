// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Index.soy.
 */

goog.provide('Index.soy');

goog.require('soy');
goog.require('soydata');


Index.soy.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="title">BlocklyPar</span><span id="Index_clear">Delete all your solutions?</span></div>';
};
if (goog.DEBUG) {
  Index.soy.messages.soyTemplateName = 'Index.soy.messages';
}


Index.soy.start = function(opt_data, opt_ignored, opt_ijData) {
  return Index.soy.messages(null, null, opt_ijData) + '<div class="header"><a id="back" href="/" class="logo"><img id="banner" src="index/blocklypar.png" width="100" alt="Blockly Games"></a><div class="nav-spacer"></div><div class="header-right"><a class="color-one" href="about.html">ABOUT</a>&nbsp<a class="color-one" href="parallel.html">PARALLEL PROGRAMMING</a><a class="color-one" href="code.html">CODE</a><a class="language"><select id="languageMenu"></select></a></div></div><div class="main"><div id="play"><h1>A game for introduce parallel programming!</h1><p><br/><br/><a id="button" href="maze.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '"> PLAY </a></p></div></div><div id="clearDataPara" style="visibility: hidden"><a class="text-p">Want to start over?<button class="secondary" id="clearData">CLEAR DATA</span></button></a></div>';
};
if (goog.DEBUG) {
  Index.soy.start.soyTemplateName = 'Index.soy.start';
}


Index.soy.appLink = function(opt_data, opt_ignored, opt_ijData) {
  return '<svg height="150" width="300" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' + ((opt_ijData.rtl) ? 'x="' + soy.$$escapeHtml(100 - opt_data.x) + '%"' : 'x="' + soy.$$escapeHtml(opt_data.x) + '%"') + 'y="' + soy.$$escapeHtml(opt_data.y) + '%">' + ((opt_ijData.html) ? '<a id="link-' + soy.$$escapeHtml(opt_data.app) + '" xlink:href="' + soy.$$escapeHtml(opt_data.app) + '.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '">' : '<a xlink:href="' + soy.$$escapeHtml(opt_data.app) + '?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '">') + '<text x="100" y="100">' + soy.$$escapeHtml(opt_data.contentText) + '</text></a></svg>';
};
if (goog.DEBUG) {
  Index.soy.appLink.soyTemplateName = 'Index.soy.appLink';
}
