// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Index.soy.
 */

goog.provide('Index.soy');

goog.require('soy');
goog.require('soydata');


Index.soy.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="title">\u0CAC\u0CCD\u0CB2\u0CBE\u0C95\u0CCD\u0CB2\u0CBF\u0C86\u0C9F\u0C97\u0CB3\u0CC1</span><span id="Index_clear">\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0C8E\u0CB2\u0CCD\u0CB2\u0CBE \u0CAA\u0CB0\u0CBF\u0CB9\u0CBE\u0CB0\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0C85\u0CB3\u0CBF\u0CB8\u0CC1\u0CB5\u0CC1\u0CA6\u0CC7?</span></div>';
};
if (goog.DEBUG) {
  Index.soy.messages.soyTemplateName = 'Index.soy.messages';
}


Index.soy.start = function(opt_data, opt_ignored, opt_ijData) {
  return Index.soy.messages(null, null, opt_ijData) + '<div id="header"><img id="banner" src="index/title-beta.png" height="51" width="244" alt="Blockly Games"><div id="subtitle">\u0CAD\u0CB5\u0CBF\u0CB7\u0CCD\u0CAF\u0CA6 \u0CAA\u0CCD\u0CB0\u0CCB\u0C97\u0CCD\u0CB0\u0CBE\u0CAE\u0CB0\u0CCD\u0CB8\u0CCD \u0CB8\u0CB2\u0CC1\u0CB5\u0CBE\u0C97\u0CBF \u0C87\u0CB0\u0CC1\u0CB5 \u0C86\u0C9F\u0C97\u0CB3\u0CC1. &nbsp;' + ((opt_ijData.html) ? '<a href="about.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '">' : '<a href="about?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '">') + '\u0CB9\u0CC6\u0C9A\u0CCD\u0C9A\u0CBF\u0CA8 \u0CAE\u0CBE\u0CB9\u0CBF\u0CA4\u0CBF...</a></div></div><svg height="100%" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g transform="translate(-150,-60)"><svg height="100%" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="none" x="150" y="60"><path id="path" d="M 10,15 C 15,60 35,100 50,70 S 80,20 90,85"' + ((opt_ijData.rtl) ? 'transform="translate(100) scale(-1, 1)"' : '') + '/></svg>' + Index.soy.appLink({app: 'puzzle', x: 10, y: 15, contentText: '\u0C92\u0C97\u0C9F\u0CC1'}, null, opt_ijData) + Index.soy.appLink({app: 'maze', x: 16, y: 45, contentText: '\u0C9C\u0C9F\u0CBF\u0CB2 \u0CAE\u0CBE\u0CB0\u0CCD\u0C97 \u0C9C\u0CBE\u0CB2'}, null, opt_ijData) + Index.soy.appLink({app: 'bird', x: 26, y: 69, contentText: '\u0CAA\u0C95\u0CCD\u0CB7\u0CBF'}, null, opt_ijData) + Index.soy.appLink({app: 'turtle', x: 41, y: 80, contentText: '\u0C86\u0CAE\u0CC6'}, null, opt_ijData) + Index.soy.appLink({app: 'movie', x: 55, y: 61, contentText: '\u0C9A\u0CB2\u0CA8\u0C9A\u0CBF\u0CA4\u0CCD\u0CB0'}, null, opt_ijData) + Index.soy.appLink({app: 'music', x: 69, y: 43, contentText: '\u0CB8\u0C82\u0C97\u0CC0\u0CA4'}, null, opt_ijData) + Index.soy.appLink({app: 'pond-tutor', x: 83, y: 55, contentText: '\u0C95\u0CCA\u0CB3 \u0CB6\u0CBF\u0C95\u0CCD\u0CB7\u0C95'}, null, opt_ijData) + Index.soy.appLink({app: 'pond-duck', x: 90, y: 85, contentText: '\u0C95\u0CCA\u0CB3'}, null, opt_ijData) + '</g></svg><select id="languageMenu"></select><p id="clearDataPara" style="visibility: hidden">\u0CAA\u0CC1\u0CA8\u0C83 \u0CAA\u0CCD\u0CB0\u0CBE\u0CB0\u0C82\u0CAD\u0CBF\u0CB8\u0CB2\u0CC1 \u0CAC\u0CAF\u0CB8\u0CC1\u0CB5\u0CBF\u0CB0\u0CBE?<button class="secondary" id="clearData">\u0CAE\u0CBE\u0CB9\u0CBF\u0CA4\u0CBF\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0C85\u0CB3\u0CB8\u0CBF \u0CB9\u0CBE\u0C95\u0CBF</span></button></p>';
};
if (goog.DEBUG) {
  Index.soy.start.soyTemplateName = 'Index.soy.start';
}


Index.soy.appLink = function(opt_data, opt_ignored, opt_ijData) {
  return '<svg height="150" width="300" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' + ((opt_ijData.rtl) ? 'x="' + soy.$$escapeHtml(100 - opt_data.x) + '%"' : 'x="' + soy.$$escapeHtml(opt_data.x) + '%"') + 'y="' + soy.$$escapeHtml(opt_data.y) + '%"><path d="M 111.11,98.89 A 55 55 0 1 1 188.89,98.89" class="gaugeBack" id="back-' + soy.$$escapeHtml(opt_data.app) + '" /><g class="icon" id="icon-' + soy.$$escapeHtml(opt_data.app) + '"><circle cx="150" cy="60" r="50" class="iconBack" /><image xlink:href="index/' + soy.$$escapeHtml(opt_data.app) + '.png" height="100" width="100" x="100" y="10" />' + ((opt_ijData.html) ? '<a id="link-' + soy.$$escapeHtml(opt_data.app) + '" xlink:href="' + soy.$$escapeHtml(opt_data.app) + '.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '">' : '<a xlink:href="' + soy.$$escapeHtml(opt_data.app) + '?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '">') + '<circle cx="150" cy="60" r="50" class="iconBorder" /><path class="gaugeFront" id="gauge-' + soy.$$escapeHtml(opt_data.app) + '" /><text x="150" y="135">' + soy.$$escapeHtml(opt_data.contentText) + '</text></a></g></svg>';
};
if (goog.DEBUG) {
  Index.soy.appLink.soyTemplateName = 'Index.soy.appLink';
}
