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
  return BlocklyGames.soy.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">Ar zdat</span><span id="Maze_turnLeft">Zzi s azelma\u1E0D</span><span id="Maze_turnRight">Zzi s ayeffus</span><span id="Maze_doCode">eg</span><span id="Maze_elseCode">ne\u0263</span><span id="Maze_helpIfElse">I\u1E25der \'ma-ne\u0263\' yeselkam ta\u0263awsa ne\u0263 taye\u1E0D.</span><span id="Maze_pathAhead">ma d abrid n zdat</span><span id="Maze_pathLeft">ma d abrid n uzelma\u1E0D</span><span id="Maze_pathRight">ma d abrid n uyeffus</span><span id="Maze_repeatUntil">ales arama</span><span id="Maze_moveForwardTooltip">Saz amyurar s yiwen n umkan.</span><span id="Maze_turnTooltip">Zzi amyurar s aezlma\u1E0D nes s ayeffus s 90 n \\nntfesniwin. </span><span id="Maze_ifTooltip">Ma yella yiwen n ubrid deg tnilla d\'ittunefken, \\neg tigawin-agi. </span><span id="Maze_ifelseTooltip">Ma yella yiwen n ubrid deg tnilla d-tittunefken, \\neg tigawin n i\u1E25der amezwaru. Ma ulac eg tigawin n \\ni\u1E25der wis sin. </span><span id="Maze_whileTooltip">Ales i\u1E25edran n ugensu arama yewwe\u1E0D iswi.</span><span id="Maze_capacity0">Qqimen-ak-d %0 n i\u1E25edran.</span><span id="Maze_capacity1">Iqqimen-ak-d %1 n i\u1E25eder.</span><span id="Maze_capacity2">Qqimen-ak-d %2 n i\u1E25edran.</span></div>';
};
if (goog.DEBUG) {
  Maze.soy.messages.soyTemplateName = 'Maze.soy.messages';
}


Maze.soy.start = function(opt_data, opt_ignored, opt_ijData) {
  return Maze.soy.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1>' + BlocklyGames.soy.titleSpan({appName: 'Tazibba'}, null, opt_ijData) + BlocklyGames.soy.levelLinks({level: opt_ijData.level, maxLevel: opt_ijData.maxLevel, lang: opt_ijData.lang, suffix: '&skin=' + soy.$$escapeHtml(opt_ijData.skin)}, null, opt_ijData) + '</h1></td><td class="farSide"><select id="languageMenu"></select>&nbsp;<button id="linkButton" title="Sekles sakin n\u0263el akk i\u1E25edran. "><img src="common/1x1.gif" class="link icon21"></button>&nbsp;<button id="pegmanButton"><img src="common/1x1.gif"><span id="pegmanButtonArrow"></span></button></td></tr></table><div id="visualization"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="400px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><td><button id="runButton" class="primary" title="Err amyurar ad yeg ayen i d-qqaren i\u1E25edran."><img src="common/1x1.gif" class="run icon21"> Selkem ahil</button><button id="resetButton" class="primary" style="display: none" title="Sers amyurar di tazwara n tzibba."><img src="common/1x1.gif" class="stop icon21"> Ales awennez</button></td></tr></table>' + Maze.soy.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + BlocklyGames.soy.dialog(null, null, opt_ijData) + BlocklyGames.soy.doneDialog(null, null, opt_ijData) + BlocklyGames.soy.abortDialog(null, null, opt_ijData) + BlocklyGames.soy.storageDialog(null, null, opt_ijData) + ((opt_ijData.level == 1) ? '<div id="dialogHelpStack" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>Asembibb lwa\u1E25id n sin i\u1E25edran n tinadin ad \'isa\u1E93\' ar zdat akken ad d-imudd tallelt ad aw\u1E0De\u0263 iswi.</td><td valign="top"><img src="maze/help_stack.png" class="mirrorImg" height=63 width=136></td></tr></table></div><div id="dialogHelpOneTopBlock" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>Deg uswir-agi, tesri\u1E0D ad tsembibbe\u1E0D i\u1E25edran wa \u0263ef wa nnig n wiya\u1E0D eg temna\u1E6D tamellalt n umahil.<div id="sampleOneTopBlock" class="readonly"></div></td></tr></table></div><div id="dialogHelpRun" class="dialogHiddenContent"><table><tr><td>Selkem ahil-ik akken ad twalid ayen  i\u1E0Derrun.</td><td rowspan=2><img src="common/help.png"></td></tr><tr><td><div><img src="maze/help_run.png" class="mirrorImg" height=27 width=141></div></td></tr></table></div>' : (opt_ijData.level == 2) ? '<div id="dialogHelpReset" class="dialogHiddenContent"><table><tr><td>Ahil-ik ur yefri ara tazibba.\nSenned \u0263ef \'Ales awennez\' sakin \u025Bre\u1E0D tikelt-nni\u1E0Den.</td><td rowspan=2><img src="common/help.png"></td></tr><tr><td><div><img src="maze/help_run.png" class="mirrorImg" height=27 width=141></div></td></tr></table></div>' : (opt_ijData.level == 3 || opt_ijData.level == 4) ? ((opt_ijData.level == 3) ? '<div id="dialogHelpRepeat" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>Seqdec kan sin n i\u1E25edran akken ad taw\u1E0De\u1E0D iswi.\nSeqdec i\u1E25der \'ales\' akken ad tselkme\u1E0D i\u1E25der ugar n tikelt.</td><td><img src="common/help.png"></td></tr></table></div>' : '') + '<div id="dialogHelpCapacity" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>Tesqedce\u1E0D akk i\u1E25edran deg uswir-agi. Akken ad ternu\u1E0D i\u1E25der amaynut, yessef ad tekkse\u1E0D i\u1E25der yellan.</td></tr></table></div><div id="dialogHelpRepeatMany" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>Tzerme\u1E0D ad terre\u1E0D ugar n yiwen n yi\u1E25der ar yi\u1E25der "ales".</td><td><img src="common/help.png"></td></tr></table></div>' : (opt_ijData.level == 5) ? '<div id="dialogHelpSkins" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td width="95%">Fren amyurar-ik anurif seg umu\u0263-agi.</td><td><img src="maze/help_up.png"></td></tr></table></div><div id="dialogHelpIf" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>I\u1E25der \'ma\' ad iselkem ayen yellan daxel-is ma yella tawtilit d tidettit. Ad ye\u025Bre\u1E0D ad yezzi s azelma\u1E0D ma yella ubrid azelma\u1E0D.</td><td><img src="common/help.png"></td></tr></table></div><div id="dialogHelpWallFollow" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>Tzemre\u1E0D ad tefru\u1E0D tazibba-agi iwe\u025Bren?\n\u0190re\u1E0D ad t\u1E0Defre\u1E0D a\u0263rab seg idis n ufus-ik azelma\u1E0D. I yimsihal-kan imusnawen.' + BlocklyGames.soy.ok(null, null, opt_ijData) + '</td></tr></table></div><div id="dialogHelpMenu" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td id="helpMenuText">Sit \u0263ef %1 deg i\u1E25der \'ma\' akken ad tbeddle\u1E0D tawtilt-is.</td><td><img src="common/help.png"></td></tr></table></div>' : '');
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
