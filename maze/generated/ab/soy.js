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
  return BlocklyGames.soy.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">\u0438\u0446\u0430\u0442\u04D9\u0443\u043F \u04A7\u0445\u044C\u0430\u049F\u0430</span><span id="Maze_turnLeft">\u0438\u0440\u0433\u0435\u0436\u044C\u0442\u04D9\u0443\u043F \u0430\u0440\u043C\u0430\u0440\u0430\u0445\u044C</span><span id="Maze_turnRight">\u0438\u0433\u044C\u0435\u0436\u044C\u0442\u04D9\u0443\u043F \u0430\u0440\u04F7\u044C\u0430\u0440\u0430\u0445\u044C</span><span id="Maze_doCode">\u0438\u043D\u0430\u0433\u04E1\u0430\u0442\u04D9\u0443\u043F</span><span id="Maze_elseCode">\u0430\u043A\u04D9\u044B\u043C\u0437\u0430\u0440</span><span id="Maze_helpIfElse">If-else blocks will do one thing or the other.</span><span id="Maze_pathAhead">\u0430\u043C\u04A9\u0430 \u0430\u04A7\u0445\u044C\u0430\u049F\u0430 \u0438\u049F\u0430\u0437\u0430\u0440</span><span id="Maze_pathLeft">\u0430\u043C\u04A9\u0430 \u0430\u0440\u043C\u0430\u0440\u0430\u0445\u044C \u0438\u049F\u0430\u0437\u0430\u0440</span><span id="Maze_pathRight">\u0430\u043C\u04A9\u0430 \u0430\u0440\u04F7\u044C\u0430\u0440\u0430\u0445\u044C \u0438\u049F\u0430\u0437\u0430\u0440</span><span id="Maze_repeatUntil">\u0438\u043D\u0430\u0433\u04E1\u0430\u043B\u0430\u0442\u04D9\u0443\u043F \u0430\u043A\u04D9\u044B\u043C\u0437\u0430\u0440</span><span id="Maze_moveForwardTooltip">Moves the player forward one space.</span><span id="Maze_turnTooltip">\u0414\u044B\u0440\u0433\u044C\u0435\u0436\u044C\u0442\u04D9\u0443\u043F \u0430\u043D\u044B\u049F\u04D9\u0430\u04A9 90 \u0433\u0440\u0430\u0434\u0443\u0441 \u0440\u044B\u043B\u0430 \u0430\u0440\u043C\u0430\u0440\u0430\u0445\u044C \u043C\u0430 \\n\u0430\u0440\u04F7\u044C\u0430\u0440\u0430\u0445\u044C. </span><span id="Maze_ifTooltip">If there is a path in the specified direction, then do some actions.</span><span id="Maze_ifelseTooltip">If there is a path in the specified direction, then do the first block of actions. Otherwise, do the second block of actions.</span><span id="Maze_whileTooltip">Repeat the enclosed actions until finish point is reached.</span><span id="Maze_capacity0">\u0428\u04D9\u0430\u0440\u0430 \u0438\u0448\u04D9\u0437\u044B\u043D\u0445\u0435\u0438\u0442 %0 \u0431\u043B\u043E\u043A\u043A.</span><span id="Maze_capacity1">\u0428\u04D9\u0430\u0440\u0430 \u0438\u0448\u04D9\u0437\u044B\u043D\u0445\u0435\u0438\u0442 \u0430\u0431\u043B\u043E\u043A\u049B\u04D9\u0430 %1.</span><span id="Maze_capacity2">\u0428\u04D9\u0430\u0440\u0430 \u0438\u0448\u04D9\u0437\u044B\u043D\u0445\u0435\u0438\u0442 \u0430\u0431\u043B\u043E\u043A\u049B\u04D9\u0430 %2.</span></div>';
};
if (goog.DEBUG) {
  Maze.soy.messages.soyTemplateName = 'Maze.soy.messages';
}


Maze.soy.start = function(opt_data, opt_ignored, opt_ijData) {
  return Maze.soy.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1>' + BlocklyGames.soy.titleSpan({appName: '\u0410\u043B\u0430\u0431\u0438\u0440\u0438\u043D\u0442'}, null, opt_ijData) + BlocklyGames.soy.levelLinks({level: opt_ijData.level, maxLevel: opt_ijData.maxLevel, lang: opt_ijData.lang, suffix: '&skin=' + soy.$$escapeHtml(opt_ijData.skin)}, null, opt_ijData) + '</h1></td><td class="farSide"><select id="languageMenu"></select>&nbsp;<button id="linkButton" title="\u0415\u0438\u049B\u04D9\u044B\u0440\u0445\u0430\u0442\u04D9\u0443\u043F \u0438\u0430\u0433\u044C\u0430\u0430\u0440\u04A7\u0448\u0442\u04D9\u0443\u043F \u0430\u0431\u043B\u043E\u043A\u049B\u04D9\u0430 \u0440\u0430\u0445\u044C \u0430\u0437\u0445\u044C\u0430\u0440\u04A7\u0448."><img src="common/1x1.gif" class="link icon21"></button>&nbsp;<button id="pegmanButton"><img src="common/1x1.gif"><span id="pegmanButtonArrow"></span></button></td></tr></table><div id="visualization"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="400px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><td><button id="runButton" class="primary" title="\u0410\u043D\u044B\u049F\u04D9\u0430\u04A9 \u0438\u049F\u0430\u0438\u04B5\u043E\u0438\u0442 \u0430\u0431\u043B\u043E\u043A\u049B\u04D9\u0430 \u0438\u0430\u0440\u04B3\u04D9\u043E \u0437\u0435\u0433\u044C\u044B."><img src="common/1x1.gif" class="run icon21"> \u0418\u0434\u04D9\u044B\u049B\u04D9\u04B5\u0430\u0442\u04D9\u0443\u043F \u0430\u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430</button><button id="resetButton" class="primary" style="display: none" title="\u0414\u044B\u0440\u0445\u044B\u043D\u04B3\u04D9\u0442\u04D9\u0443\u043F \u0430\u043D\u044B\u049F\u04D9\u0430\u04A9 \u0430\u043B\u0438\u0431\u0438\u0440\u0438\u043D\u0442 \u0430\u043B\u0430\u0433\u0430\u043C\u04AD\u0430\u0445\u044C."><img src="common/1x1.gif" class="stop icon21"> \u0418\u049B\u04D9\u0433\u0430\u0442\u04D9\u0443\u043F</button></td></tr></table>' + Maze.soy.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + BlocklyGames.soy.dialog(null, null, opt_ijData) + BlocklyGames.soy.doneDialog(null, null, opt_ijData) + BlocklyGames.soy.abortDialog(null, null, opt_ijData) + BlocklyGames.soy.storageDialog(null, null, opt_ijData) + ((opt_ijData.level == 1) ? '<div id="dialogHelpStack" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>Stack a couple of \'move forward\' blocks together to help me reach the goal.</td><td valign="top"><img src="maze/help_stack.png" class="mirrorImg" height=63 width=136></td></tr></table></div><div id="dialogHelpOneTopBlock" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>On this level, you need to stack together all of the blocks in the white workspace.<div id="sampleOneTopBlock" class="readonly"></div></td></tr></table></div><div id="dialogHelpRun" class="dialogHiddenContent"><table><tr><td>Run your program to see what happens.</td><td rowspan=2><img src="common/help.png"></td></tr><tr><td><div><img src="maze/help_run.png" class="mirrorImg" height=27 width=141></div></td></tr></table></div>' : (opt_ijData.level == 2) ? '<div id="dialogHelpReset" class="dialogHiddenContent"><table><tr><td>Your program didn\'t solve the maze. Press \'Reset\' and try again.</td><td rowspan=2><img src="common/help.png"></td></tr><tr><td><div><img src="maze/help_run.png" class="mirrorImg" height=27 width=141></div></td></tr></table></div>' : (opt_ijData.level == 3 || opt_ijData.level == 4) ? ((opt_ijData.level == 3) ? '<div id="dialogHelpRepeat" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>Reach the end of this path using only two blocks. Use \'repeat\' to run a block more than once.</td><td><img src="common/help.png"></td></tr></table></div>' : '') + '<div id="dialogHelpCapacity" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>You have used up all the blocks for this level. To create a new block, you first need to delete an existing block.</td></tr></table></div><div id="dialogHelpRepeatMany" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>You can fit more than one block inside a \'repeat\' block.</td><td><img src="common/help.png"></td></tr></table></div>' : (opt_ijData.level == 5) ? '<div id="dialogHelpSkins" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td width="95%">Choose your favourite player from this menu.</td><td><img src="maze/help_up.png"></td></tr></table></div><div id="dialogHelpIf" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>An \'if\' block will do something only if the condition is true. Try turning left if there is a path to the left.</td><td><img src="common/help.png"></td></tr></table></div><div id="dialogHelpWallFollow" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>Can you solve this complicated maze? Try following the left-hand wall. Advanced programmers only!' + BlocklyGames.soy.ok(null, null, opt_ijData) + '</td></tr></table></div><div id="dialogHelpMenu" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td id="helpMenuText">Click on %1 in the \'if\' block to change its condition.</td><td><img src="common/help.png"></td></tr></table></div>' : '');
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
