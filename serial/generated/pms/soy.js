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
  return BlocklyGames.soy.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">and\u00E9 drit</span><span id="Maze_turnLeft">voltesse a snistra</span><span id="Maze_turnRight">voltesse a drita</span><span id="Maze_doCode">f\u00E9</span><span id="Maze_elseCode">opura</span><span id="Maze_helpIfElse">Un bl\u00F2ch si-opura a far\u00E0 na c\u00F2sa u l\'\u00E0utra.</span><span id="Maze_pathAhead">se s\u00EBnt\u00E9 d\u00EB dnans</span><span id="Maze_pathLeft">se s\u00EBnt\u00E9 a snistra</span><span id="Maze_pathRight">se s\u00EBnt\u00E9 a drita</span><span id="Maze_repeatUntil">arpete fin-a a</span><span id="Maze_moveForwardTooltip">F\u00E0 and\u00E9 \u00EBl giugador anans \u00EBd n\u00EB spassi.</span><span id="Maze_turnTooltip">F\u00E9 volt\u00E9 \u00EBl giugador a snistra o a drita \u00EBd 90 gr\u00E9.</span><span id="Maze_ifTooltip">S\'a-i \u00E9 na stra ant la diression \u00EBspessific\u00E0, \\nantlora fa ch\u00E8iche assion. </span><span id="Maze_ifelseTooltip">S\'a-i \u00E9 na stra ant la diression \u00EBspessific\u00E0, \\nantlora fa \u00EBl prim bl\u00F2ch d\'assion. \\nD\u00EBsn\u00F2, f\u00E0 \u00EBl second bl\u00F2ch d\'assion. </span><span id="Maze_whileTooltip">Arpet j\'assion contn\u00F9e fin-a a argionze \u00EBl pont \\nfinal. </span><span id="Maze_capacity0">At resto %0 bl\u00F2ch.</span><span id="Maze_capacity1">At resta %1 bl\u00F2ch.</span><span id="Maze_capacity2">At resto %2 bl\u00F2ch.</span></div>';
};
if (goog.DEBUG) {
  Maze.soy.messages.soyTemplateName = 'Maze.soy.messages';
}


Maze.soy.start = function(opt_data, opt_ignored, opt_ijData) {
  return Maze.soy.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1>' + BlocklyGames.soy.titleSpan({appName: 'Labirint'}, null, opt_ijData) + BlocklyGames.soy.levelLinks({level: opt_ijData.level, maxLevel: opt_ijData.maxLevel, lang: opt_ijData.lang, suffix: '&skin=' + soy.$$escapeHtml(opt_ijData.skin)}, null, opt_ijData) + '</h1></td><td class="farSide"><select id="languageMenu"></select>&nbsp;<button id="linkButton" title="Argistr\u00E9 e lij\u00E9 ai bl\u00F2ch."><img src="common/1x1.gif" class="link icon21"></button>&nbsp;<button id="pegmanButton"><img src="common/1x1.gif"><span id="pegmanButtonArrow"></span></button></td></tr></table><div id="visualization"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="400px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><td><button id="runButton" class="primary" title="A f\u00E0 f\u00E9 al giugador l\u00F2n ch\'a diso ij block."><img src="common/1x1.gif" class="run icon21"> F\u00E9 and\u00E9 \u00EBl programa</button><button id="resetButton" class="primary" style="display: none" title="Buta torna \u00EBl giugador al prinsipi d\u00EBl labirint."><img src="common/1x1.gif" class="stop icon21"> But\u00E9 torna coma al prinsipi</button></td></tr></table>' + Maze.soy.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + BlocklyGames.soy.dialog(null, null, opt_ijData) + BlocklyGames.soy.doneDialog(null, null, opt_ijData) + BlocklyGames.soy.abortDialog(null, null, opt_ijData) + BlocklyGames.soy.storageDialog(null, null, opt_ijData) + ((opt_ijData.level == 1) ? '<div id="dialogHelpStack" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>Ambaron-a un p\u00E0ira \u00EBd bl\u00F2ch \'va anans\' p\u00EBr giuteme a argionze me but.</td><td valign="top"><img src="maze/help_stack.png" class="mirrorImg" height=63 width=136></td></tr></table></div><div id="dialogHelpOneTopBlock" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>An cost livel, it deve ambaron\u00E9 ij bl\u00F2ch un ansima a l\'\u00E0utr ant la z\u00F2na \u00EBd travaj bianca.<div id="sampleOneTopBlock" class="readonly"></div></td></tr></table></div><div id="dialogHelpRun" class="dialogHiddenContent"><table><tr><td>F\u00E0 marc\u00E9 t\u00F2 programa p\u00EBr v\u00EBdde l\u00F2n ch\'a-i suced.</td><td rowspan=2><img src="common/help.png"></td></tr><tr><td><div><img src="maze/help_run.png" class="mirrorImg" height=27 width=141></div></td></tr></table></div>' : (opt_ijData.level == 2) ? '<div id="dialogHelpReset" class="dialogHiddenContent"><table><tr><td>T\u00F2 programa a l\'ha nen arzolv\u00F9 \u00EBl labirint. Sgnaca \'But\u00E9 torna coma al prinsipi\' e preuva torna.</td><td rowspan=2><img src="common/help.png"></td></tr><tr><td><div><img src="maze/help_run.png" class="mirrorImg" height=27 width=141></div></td></tr></table></div>' : (opt_ijData.level == 3 || opt_ijData.level == 4) ? ((opt_ijData.level == 3) ? '<div id="dialogHelpRepeat" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>J\'ordinator a l\'han na mem\u00F2ria limit\u00E0. Riva a la fin \u00EBd sa stra dovrand mach doi bl\u00F2ch. Deuvra \'arpet\' p\u00EBr esegu\u00EC un bl\u00F2ch pi \'d na vira.</td><td><img src="common/help.png"></td></tr></table></div>' : '') + '<div id="dialogHelpCapacity" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>It l\'has consum\u00E0 tuti ij bl\u00F2ch p\u00EBr cost livel. P\u00EBr cre\u00E9 un bl\u00F2ch neuv, tl\'has prima damanca d\u00EB scancel\u00E9 un bl\u00F2ch esistent.</td></tr></table></div><div id="dialogHelpRepeatMany" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>A peul but\u00E9 pi d\'un bl\u00F2ch andrinta a \'n bl\u00F2ch \u00ABarpete\u00BB.</td><td><img src="common/help.png"></td></tr></table></div>' : (opt_ijData.level == 5) ? '<div id="dialogHelpSkins" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td width="95%">Ch\'a serna s\u00F2 giugador prefer\u00EC da s\u00EB mn\u00F9.</td><td><img src="maze/help_up.png"></td></tr></table></div><div id="dialogHelpIf" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>Un bl\u00F2ch \'si\' a far\u00E0 cheic\u00F2s mach si la condission a l\'\u00E9 vera. Preuva a svolt\u00E9 a snistra s\'a-i \u00E9 na stra a snistra.</td><td><img src="common/help.png"></td></tr></table></div><div id="dialogHelpWallFollow" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>Peul\u00EBs-to arz\u00F2lve cost labirint complic\u00E0? S\u00EBrca d\'andeje dapress a la muraja a snistra. Mach p\u00EBr programator coj barbis!' + BlocklyGames.soy.ok(null, null, opt_ijData) + '</td></tr></table></div><div id="dialogHelpMenu" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td id="helpMenuText">Sgnaca su %1 ant \u00EBl bl\u00F2ch \'si\' p\u00EBr cang\u00E9 soa condission.</td><td><img src="common/help.png"></td></tr></table></div>' : '');
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
