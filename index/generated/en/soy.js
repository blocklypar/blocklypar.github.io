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
  return Index.soy.messages(null, null, opt_ijData) + '<div class="header"><a href="https://blocklypar.github.io/" class="logo"><img id="banner" src="index/blocklypar.png" width="100" alt="Blockly Games"></a><div class="nav-spacer"></div><div class="header-right"><a class="color-one" href="about.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '">ABOUT</a><a class="color-two" href="about.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '">PARALLEL PROGRAMMING</a><a class="color-three" href="about.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '">CODE</a><a class="language"><select id="languageMenu"></select></a></div></div><div class="main"><div id="play"><h1>A game for introduce parallel programming!</h1><p><br/><br/><a id="button" href="maze.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '"> PLAY </a></p></div><div id="about"><h3>ABOUT</h3><br/>A game for introduce parallel programming!</br></div><div id="parallel"><h3>PARALLEL</h3><br/>Resize the browser window to see the effect. Em meio a esse mar de posts das redes sociais, pode ser dif\u00EDcil conseguir captar a aten\u00E7\u00E3o dos seus seguidores. Mas algumas dicas simples podem te ajudar a se destacar no meio da multid\u00E3o. Com o Canva, criar designs para as redes sociais \u00E9 muito f\u00E1cil. Voc\u00EA pode escolher entre milhares de templates feitos por designers, editar as suas pr\u00F3prias fotos com as nossas ferramentas simples de usar (que n\u00E3o exigem nenhuma experi\u00EAncia pr\u00E9via) e fascinar os seus seguidores com anima\u00E7\u00F5es.</p><br/></div><div id="code"><h3>CODE</h3><a href="https://github.com/blocklypar">The code is available here!</a><br/></div></div>';
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
