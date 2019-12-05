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
  return Index.soy.messages(null, null, opt_ijData) + '<div class="header"><a href="javascript:window.location.reload(true)" class="logo"><img id="banner" src="static/img/index/blocklypar.png" width="100" alt="Blockly Games"></a><div class="nav-spacer"></div><div class="header-right"><a class="active" href="javascript:window.location.reload(true)">HOME</a><a class="color-one" href="about.html">ABOUT</a>&nbsp<a class="color-one" href="documentation.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '">DOCUMENTATION</a><a class="color-one" href="code.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '">CODE</a></div></div><div class="main"><div id="play"><h1>Games to introduce parallel programming!</h1><p><div align="left"><ol><li><b>Sequential:</b> a game to introduce a block-based programming language;</li><li><b>Introduction to tasks:</b> a game to present the concept of execution of tasks;</li><li><b>Parallel:</b> a game to introduce parallel thinking using parallel programming concepts.</li></ol></div><br/><br/></p></div><div id="games"><p><table align="center" cellspacing="20"><tr><th>Sequential</th><th>Introduction to tasks</th><th>Parallel</th></tr><tr><td><a href="serial.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" class="logo"><img id="banner" src="static/img/index/serial.png" width="150" alt="Blockly Games" title="Game 1" onmouseover="this.src=\'static/img/index/serialb.png\';" onmouseout="this.src=\'static/img/index/serial.png\';"></a></td><td><a href="tasks.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" class="logo"><img id="banner" src="static/img/index/tasks.png" width="150" alt="Blockly Games" title="Game 2" onmouseover="this.src=\'static/img/index/tasksb.png\';" onmouseout="this.src=\'static/img/index/tasks.png\';"></a>      </td><td><a href="parallel.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" class="logo"><img id="banner" src="static/img/index/parallel.png" width="150" alt="Blockly Games" title="Game 3" onmouseover="this.src=\'static/img/index/parallelb.png\';" onmouseout="this.src=\'static/img/index/parallel.png\';"></a>      </td></tr></table></p></div></div><div id="clearDataPara" style="visibility: hidden"><a class="text-p">Want to start over?<button class="secondary" id="clearData">CLEAR DATA</span></button></a></div><script src="common/back.js"><\/script>';
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
