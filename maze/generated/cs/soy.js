// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Maze.soy.
 */

goog.provide('Maze.soy');

goog.require('soy');
goog.require('soydata');
goog.require('BlocklyGames.soy');


Maze.soy.messages = function(opt_data, opt_ignored, opt_ijData) {
  return BlocklyGames.soy.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">pohyb vp\u0159ed</span><span id="Maze_turnLeft">oto\u010Dit lev\u00E1</span><span id="Maze_turnRight">oto\u010Dit prav\u00E1</span><span id="Maze_doCode">ud\u011Blej</span><span id="Maze_elseCode">jinak</span><span id="Maze_helpIfElse">P\u0159\u00EDkaz \'pokud-jinak\' provede bu\u010F n\u011Bco, nebo n\u011Bco jin\u00E9ho.</span><span id="Maze_pathAhead">pokud cesta vp\u0159ed</span><span id="Maze_pathLeft">pokud cesta doleva</span><span id="Maze_pathRight">pokud cesta doprava</span><span id="Maze_repeatUntil">opakuj a\u017E do</span><span id="Maze_moveForwardTooltip">Pohne Pegmanem vp\u0159ed o jedno pole.</span><span id="Maze_turnTooltip">Oto\u010D\u00ED Pegmana vlevo nebo vpravo o 90 stup\u0148\u016F.</span><span id="Maze_ifTooltip">Pokud je v dan\u00E9m sm\u011Bru cesta, pak prove\u010F n\u011Bjakou \\nakci. </span><span id="Maze_ifelseTooltip">Pokud je v dann\u00E9m sm\u011Bru cesta, \\npak prove\u010F posloupnost akc\u00ED. V \\nopa\u010Dn\u00E9m p\u0159\u00EDpad\u011B prove\u010F druhou \\nposloupnost akc\u00ED. </span><span id="Maze_whileTooltip">Opakuj obsa\u017Een\u00E9 akce do t\u00E9 doby, \\ndokud nen\u00ED dosa\u017Een c\u00EDlov\u00FD bod. </span><span id="Maze_capacity0">Po\u010Det zb\u00FDvaj\u00EDc\u00EDch blok\u016F %0.</span><span id="Maze_capacity1">Po\u010Det zb\u00FDvaj\u00EDc\u00EDch blok\u016F %1.</span><span id="Maze_capacity2">Po\u010Det zb\u00FDvaj\u00EDc\u00EDch blok\u016F %2.</span></div>';
};
if (goog.DEBUG) {
  Maze.soy.messages.soyTemplateName = 'Maze.soy.messages';
}


Maze.soy.start = function(opt_data, opt_ignored, opt_ijData) {
  return Maze.soy.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1>' + BlocklyGames.soy.titleSpan({appName: 'Bludi\u0161t\u011B'}, null, opt_ijData) + BlocklyGames.soy.levelLinks({level: opt_ijData.level, maxLevel: opt_ijData.maxLevel, lang: opt_ijData.lang, suffix: '&skin=' + soy.$$escapeHtml(opt_ijData.skin)}, null, opt_ijData) + '</h1></td><td class="farSide"><select id="languageMenu"></select>&nbsp;<button id="linkButton" title="Ulo\u017E a spoj bloky.."><img src="common/1x1.gif" class="link icon21"></button>&nbsp;<button id="pegmanButton"><img src="common/1x1.gif"><span id="pegmanButtonArrow"></span></button></td></tr></table><div id="visualization"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="400px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><td><button id="runButton" class="primary" title="Hr\u00E1\u010D d\u011Bl\u00E1 to, co bloky \u0159\u00EDkaj\u00ED. "><img src="common/1x1.gif" class="run icon21"> Spus\u0165 program</button><button id="resetButton" class="primary" style="display: none" title="Postav hr\u00E1\u010De zp\u011Bt na za\u010D\u00E1tek bludi\u0161t\u011B."><img src="common/1x1.gif" class="stop icon21"> Reset</button></td></tr></table>' + Maze.soy.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + BlocklyGames.soy.dialog(null, null, opt_ijData) + BlocklyGames.soy.doneDialog(null, null, opt_ijData) + BlocklyGames.soy.abortDialog(null, null, opt_ijData) + BlocklyGames.soy.storageDialog(null, null, opt_ijData) + ((opt_ijData.level == 1) ? '<div id="dialogHelpStack" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>Poskl\u00E1dej n\u011Bkolik pohyb\u016F vp\u0159ed dohromady a pomoc mi dos\u00E1hnout c\u00EDle.</td><td valign="top"><img src="maze/help_stack.png" class="mirrorImg" height=63 width=136></td></tr></table></div><div id="dialogHelpOneTopBlock" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>V tomto levelu mus\u00ED\u0161 posb\u00EDrat v\u0161echny bloky na b\u00EDl\u00E9m pozad\u00ED.<div id="sampleOneTopBlock" class="readonly"></div></td></tr></table></div><div id="dialogHelpRun" class="dialogHiddenContent"><table><tr><td>Spus\u0165te v\u00E1\u0161 program, abyste zjistili, co se stane.</td><td rowspan=2><img src="common/help.png"></td></tr><tr><td><div><img src="maze/help_run.png" class="mirrorImg" height=27 width=141></div></td></tr></table></div>' : (opt_ijData.level == 2) ? '<div id="dialogHelpReset" class="dialogHiddenContent"><table><tr><td>V\u00E1\u0161 program nevy\u0159e\u0161il bludi\u0161t\u011B. Stiskn\u011Bte "Reset" a opakujte akci.</td><td rowspan=2><img src="common/help.png"></td></tr><tr><td><div><img src="maze/help_run.png" class="mirrorImg" height=27 width=141></div></td></tr></table></div>' : (opt_ijData.level == 3 || opt_ijData.level == 4) ? ((opt_ijData.level == 3) ? '<div id="dialogHelpRepeat" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>Po\u010D\u00EDta\u010De maj\u00ED omezenou pam\u011B\u0165. Dos\u00E1hni c\u00EDle s pou\u017Eit\u00EDm pouze dvou blok\u016F. Pou\u017Eij p\u0159\u00EDkaz \'opakuj\' pro zopakov\u00E1n\u00ED p\u0159\u00EDkazu.</td><td><img src="common/help.png"></td></tr></table></div>' : '') + '<div id="dialogHelpCapacity" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>Pou\u017Eili jste v\u0161echny bloky povolen\u00E9 pro tuto \u00FArove\u0148. Chcete-li p\u0159idat dal\u0161\u00ED blok, mus\u00EDte smazat n\u011Bjak\u00FD st\u00E1vaj\u00EDc\u00ED.</td></tr></table></div><div id="dialogHelpRepeatMany" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>Do bloku "opakuj" m\u016F\u017Ee\u0161 vlo\u017Eit v\u00EDce ne\u017E jeden blok.</td><td><img src="common/help.png"></td></tr></table></div>' : (opt_ijData.level == 5) ? '<div id="dialogHelpSkins" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td width="95%">Vyberte si obl\u00EDben\u00E9ho hr\u00E1\u010De z nab\u00EDdky.</td><td><img src="maze/help_up.png"></td></tr></table></div><div id="dialogHelpIf" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>Podm\u00EDnka \'pokud\' ud\u011Bl\u00E1 n\u011Bco pouze v p\u0159\u00EDpad\u011B, \u017Ee je spln\u011Bna jej\u00ED podm\u00EDnka. Zkus se oto\u010Dit vlevo, pokud je nalevo cesta.</td><td><img src="common/help.png"></td></tr></table></div><div id="dialogHelpWallFollow" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>Dok\u00E1\u017Ee\u0161 vy\u0159e\u0161it toto komplikovan\u00E9 bludi\u0161t\u011B? Zkus se p\u0159idr\u017Eovat zdi po lev\u00E9 ruce.' + BlocklyGames.soy.ok(null, null, opt_ijData) + '</td></tr></table></div><div id="dialogHelpMenu" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td id="helpMenuText">Kliknut\u00ED na %1 dovol\u00ED v bloku "kdy\u017E" zm\u011Bnit podm\u00EDnku.</td><td><img src="common/help.png"></td></tr></table></div>' : '');
};
if (goog.DEBUG) {
  Maze.soy.start.soyTemplateName = 'Maze.soy.start';
}


Maze.soy.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;" xmlns="https://developers.google.com/blockly/xml"><block type="maze_moveForward"></block><block type="maze_turn"><field name="DIR">turnLeft</field></block><block type="maze_turn"><field name="DIR">turnRight</field></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level > 4) ? '<block type="maze_if"><field name="DIR">isPathLeft</field></block>' : '') : '') + '</xml>';
};
if (goog.DEBUG) {
  Maze.soy.toolbox.soyTemplateName = 'Maze.soy.toolbox';
}
