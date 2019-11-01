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
  return BlocklyGames.soy.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">\u0627\u06B3\u062A\u064A \u0647\u0644\u0648</span><span id="Maze_turnLeft">\u06A9\u0627\u067B\u064A \u0645\u064F\u0699\u0648</span><span id="Maze_turnRight">\u0633\u0627\u0684\u064A \u0645\u064F\u0699\u0648</span><span id="Maze_doCode">\u06AA\u0631\u064A\u0648</span><span id="Maze_elseCode">\u0646\u06C1 \u062A\u06C1</span><span id="Maze_helpIfElse">\u062C\u064A\u06AA\u068F\u06BE\u0646-\u0646\u06C1 \u062A\u06C1 \u0628\u0644\u0627\u06AA\u0648\u0646 \u06BE\u06AA \u06AA\u0645 \u06AA\u0646\u062F\u064A\u0648\u0646 \u064A\u0627 \u0648\u0631\u064A \u067B\u064A\u0648 \u06AA\u0645.</span><span id="Maze_pathAhead">\u062C\u064A\u06AA\u068F\u06BE\u0646 \u0627\u06B3\u064A\u0627\u0646 \u0631\u0633\u062A\u0648 \u06BE\u062C\u064A</span><span id="Maze_pathLeft">\u062C\u064A\u06AA\u068F\u06BE\u0646 \u06A9\u0627\u067B\u064A \u067E\u0627\u0633\u064A \u0631\u0633\u062A\u0648 \u06BE\u062C\u064A</span><span id="Maze_pathRight">\u062C\u064A\u06AA\u068F\u06BE\u0646 \u0633\u0627\u0684\u064A \u067E\u0627\u0633\u064A \u0631\u0633\u062A\u0648 \u06BE\u062C\u064A</span><span id="Maze_repeatUntil">\u0648\u0631\u062C\u0627\u064A\u0648 \u062C\u064A\u0633\u062A\u0627\u0626\u064A\u0646</span><span id="Maze_moveForwardTooltip">\u06A9\u0644\u0627\u0699\u064A \u06A9\u064A \u06BE\u06AA \u062E\u0627\u0646\u0648 \u0627\u06B3\u062A\u064A \u0648\u068C\u0627\u064A\u0648</span><span id="Maze_turnTooltip">\u06A9\u0644\u0627\u0699\u064A \u06A9\u064A 90 \u068A\u06AF\u0631\u064A \u06A9\u0627\u067B\u064A \u064A\u0627 \u0633\u0627\u0684\u064A \u067E\u0627\u0633\u064A \u0645\u0648\u0699\u064A\u0648.</span><span id="Maze_ifTooltip">\u062C\u064A\u06AA\u068F\u06BE\u0646 \u0627\u062A\u064A \u06AA\u0646\u06BE\u0646 \u0645\u062E\u0635\u0648\u0635 \u0637\u0631\u0641 \u068F\u0627\u0646\u06BE\u0646 \u0631\u0633\u062A\u0648 \u06BE\u062C\u064A\u060C \u062A\u06C1 \u06AA\u062C\u06BE \\n\u0639\u0645\u0644 \u06AA\u064A\u0648. </span><span id="Maze_ifelseTooltip">\u062C\u064A\u06AA\u068F\u06BE\u0646 \u0627\u062A\u064A \u06AA\u0646\u06BE\u0646 \u0645\u062E\u0635\u0648\u0635 \u0637\u0631\u0641 \u0631\u0633\u062A\u0648 \u06BE\u062C\u064A\u060C \u062A\u06C1 \u0639\u0645\u0644\u0646 \u062C\u0648 \\n\u067E\u06BE\u0631\u064A\u0648\u0646 \u0628\u0644\u0627\u06AA \u0634\u0631\u0648\u0639 \u06AA\u064A\u0648\u060C \u067B\u064A \u0635\u0648\u0631\u062A \u06FE\u060C \u0639\u0645\u0644\u0646 \u062C\u0648 \u067B\u064A\u0648 \u0628\u0644\u0627\u06AA \\n\u06BE\u0644\u0627\u064A\u0648. </span><span id="Maze_whileTooltip">\u0634\u0627\u0645\u0644 \u06AA\u064A\u0644 \u0639\u0645\u0644 \u0648\u0631\u062C\u0627\u0626\u064A\u0646\u062F\u0627 \u0631\u06BE\u0648\u060C \u062C\u064A\u0633\u064A\u062A\u0627\u0626\u064A\u0646 \u0645\u06AA\u0645\u0644 \u0646\u0642\u0637\u064A \\n\u062A\u064A \u067E\u06BE\u0686\u064A \u0648\u0683\u064A. </span><span id="Maze_capacity0">\u0627\u0648\u06BE\u0627\u0646 \u0648\u067D %0 \u0686\u0648\u06AA\u0646\u068A\u0648\u0646 \u0628\u0686\u064A\u0648\u0646 \u0622\u06BE\u0646.</span><span id="Maze_capacity1">\u0627\u0648\u06BE\u0627\u0646 \u0648\u067D %1 \u0686\u0648\u06AA\u0646\u068A\u0648 \u0628\u0686\u064A\u0644 \u0622\u06BE\u0646.</span><span id="Maze_capacity2">\u0627\u0648\u06BE\u0627\u0646 \u0648\u067D %2 \u0686\u0648\u06AA\u0646\u068A\u0648\u0646 \u0628\u0686\u064A\u0644 \u0622\u06BE\u0646.</span></div>';
};
if (goog.DEBUG) {
  Maze.soy.messages.soyTemplateName = 'Maze.soy.messages';
}


Maze.soy.start = function(opt_data, opt_ignored, opt_ijData) {
  return Maze.soy.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1>' + BlocklyGames.soy.titleSpan({appName: '\u0648\u0631 \u0648\u06AA\u0699'}, null, opt_ijData) + BlocklyGames.soy.levelLinks({level: opt_ijData.level, maxLevel: opt_ijData.maxLevel, lang: opt_ijData.lang, suffix: '&skin=' + soy.$$escapeHtml(opt_ijData.skin)}, null, opt_ijData) + '</h1></td><td class="farSide"><select id="languageMenu"></select>&nbsp;<button id="linkButton" title="\u0645\u062D\u0641\u0648\u0638 \u06AA\u064A\u0648 \u06FD \u0628\u0644\u0627\u06AA\u0646 \u0633\u0627\u0646 \u06B3\u0646\u068D\u064A\u0648"><img src="common/1x1.gif" class="link icon21"></button>&nbsp;<button id="pegmanButton"><img src="common/1x1.gif"><span id="pegmanButtonArrow"></span></button></td></tr></table><div id="visualization"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="400px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><td><button id="runButton" class="primary" title="\u06A9\u0644\u0627\u0699\u064A \u0627\u06BE\u0648 \u06AA\u0631\u064A \u062C\u064A\u06AA\u0648 \u0628\u0644\u0627\u06AA \u0686\u0626\u064A \u0631\u06BE\u064A\u0627 \u0622\u06BE\u0646."><img src="common/1x1.gif" class="run icon21"> \u067E\u0631\u0648\u06AF\u0631\u0627\u0645 \u0647\u0644\u0627\u064A\u0648</button><button id="resetButton" class="primary" style="display: none" title="\u06A9\u0644\u0627\u0699\u064A \u06A9\u064A \u0648\u0699 \u0648\u06AA\u0699 \u062C\u064A \u0634\u0631\u0648\u0639\u0627\u062A \u06FE \u0648\u0627\u067E\u0633 \u06AA\u064A\u0648."><img src="common/1x1.gif" class="stop icon21"> \u067B\u064A\u0647\u0631 \u062A\u0631\u062A\u064A\u0628 \u068F\u064A\u0648</button></td></tr></table>' + Maze.soy.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + BlocklyGames.soy.dialog(null, null, opt_ijData) + BlocklyGames.soy.doneDialog(null, null, opt_ijData) + BlocklyGames.soy.abortDialog(null, null, opt_ijData) + BlocklyGames.soy.storageDialog(null, null, opt_ijData) + ((opt_ijData.level == 1) ? '<div id="dialogHelpStack" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>\'\u0627\u06B3\u062A\u064A \u06BE\u0644\u0648\' \u0648\u0627\u0631\u0646 \u0628\u0644\u0627\u06AA\u0646 \u062C\u0648 \u0632\u062E\u064A\u0631\u0648 \u06AA\u064A\u0648\u060C \u062C\u064A\u0633\u064A\u062A\u0627\u0626\u064A\u0646 \u0645\u0648\u0646\u06A9\u064A \u0645\u0646\u0632\u0644 \u0646\u067F\u064A \u0645\u0644\u064A \u0648\u0683\u064A.</td><td valign="top"><img src="maze/help_stack.png" class="mirrorImg" height=63 width=136></td></tr></table></div><div id="dialogHelpOneTopBlock" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>\u06BE\u0646 \u0645\u0631\u062D\u0644\u064A \u06FE\u060C \u0627\u0648\u06BE\u0627\u0646 \u06A9\u064A \u0627\u0687\u064A \u0648\u0631\u06AA\u0634\u0627\u067E \u0648\u0627\u0631\u0646 \u0628\u0644\u0627\u06AA\u0646 \u062C\u0648 \u0632\u062E\u064A\u0631\u0648 \u06AA\u0631\u06BB\u0648 \u0622\u06BE\u064A.<div id="sampleOneTopBlock" class="readonly"></div></td></tr></table></div><div id="dialogHelpRun" class="dialogHiddenContent"><table><tr><td>\u067E\u0631\u0648\u06AF\u0631\u0627\u0645 \u06BE\u0644\u0627\u064A\u0648 \u068F\u0633\u0648 \u062A\u06C1 \u0687\u0627 \u067E\u064A\u0648 \u067F\u064A.</td><td rowspan=2><img src="common/help.png"></td></tr><tr><td><div><img src="maze/help_run.png" class="mirrorImg" height=27 width=141></div></td></tr></table></div>' : (opt_ijData.level == 2) ? '<div id="dialogHelpReset" class="dialogHiddenContent"><table><tr><td>\u0627\u0648\u06BE\u0627\u0646 \u062C\u064A \u067E\u0631\u0648\u06AF\u0631\u0627\u0645 \u0648\u0699 \u0648\u06AA\u0699 \u06A9\u064A \u062D\u0644 \u0646\u0627\u06BE\u064A \u06AA\u064A\u0648\u060C \'\u067B\u064A\u06BE\u0631 \u062A\u0631\u062A\u064A\u0628 \u068F\u064A\u0648\' \u06A9\u064A \u062F\u067B\u0627\u064A\u0648 \u06FD \u067B\u064A\u06BE\u0631 \u06AA\u0648\u0634\u0634 \u06AA\u064A\u0648.</td><td rowspan=2><img src="common/help.png"></td></tr><tr><td><div><img src="maze/help_run.png" class="mirrorImg" height=27 width=141></div></td></tr></table></div>' : (opt_ijData.level == 3 || opt_ijData.level == 4) ? ((opt_ijData.level == 3) ? '<div id="dialogHelpRepeat" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>\u06BE\u0646 \u0631\u0633\u062A\u064A \u062C\u064A \u0622\u062E\u0631 \u062A\u0627\u0626\u064A\u0646 \u0635\u0631\u0641 \u067B\u0646 \u0628\u0644\u0627\u06AA\u0646 \u062C\u064A \u0645\u062F\u062F \u0633\u0627\u0646 \u067E\u06BE\u0686\u0648. \'\u0648\u0631\u062C\u0627\u064A\u0648\' \u062C\u064A \u0645\u062F\u062F \u0633\u0627\u0646 \u06BE\u06AA \u0628\u0644\u0627\u06AA \u06A9\u064A \u06BE\u06AA \u06A9\u0627\u0646 \u0648\u068C\u064A\u06AA \u0680\u064A\u0631\u0627 \u06BE\u0644\u0627\u064A\u0648.</td><td><img src="common/help.png"></td></tr></table></div>' : '') + '<div id="dialogHelpCapacity" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>\u0627\u0648\u06BE\u0627\u0646 \u06BE\u0646 \u0645\u0631\u062D\u0644\u064A \u0644\u0627\u0621\u0650 \u0633\u0628 \u0628\u0644\u0627\u06AA \u0627\u0633\u062A\u0639\u0645\u0627\u0644 \u06AA\u0631\u064A \u0687\u068F\u064A\u0627 \u0622\u06BE\u0646. \u0646\u0626\u064A\u0646 \u0628\u0644\u0627\u06AA \u062C\u0648\u0699\u06BB \u0644\u0627\u0621\u0650\u060C \u0627\u0648\u06BE\u0627\u0646 \u06A9\u064A \u0627\u06B3 \u06A9\u0627\u0646 \u0645\u0648\u062C\u0648\u062F \u0628\u0644\u0627\u06AA \u06A9\u064A \u0645\u067D\u0627\u0626\u06BB\u0648 \u067E\u0648\u0646\u062F\u0648.</td></tr></table></div><div id="dialogHelpRepeatMany" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>\'\u0648\u0631\u062C\u0627\u064A\u0648\' \u0628\u0644\u0627\u06AA \u062C\u064A \u0627\u0646\u062F\u0631 \u0627\u0648\u06BE\u0627\u0646 \u06BE\u06AA \u06A9\u0627\u0646 \u0648\u068C\u064A\u06AA \u0628\u0644\u0627\u06AA \u0644\u06B3\u0627\u0626\u064A \u0633\u06AF\u0647\u0648 \u067F\u0627.</td><td><img src="common/help.png"></td></tr></table></div>' : (opt_ijData.level == 5) ? '<div id="dialogHelpSkins" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td width="95%">\u067E\u0646\u06BE\u0646\u062C\u0648 \u067E\u0633\u0646\u062F\u064A\u062F\u06BE\u06C1 \u0631\u0627\u0646\u062F\u064A\u06AF\u0631 \u06BE\u0646 \u0645\u064A\u0646\u064A\u0648 \u0645\u0627\u0646 \u0686\u0648\u0646\u068A\u064A \u0633\u06AF\u0647\u0648 \u067F\u0627.</td><td><img src="maze/help_up.png"></td></tr></table></div><div id="dialogHelpIf" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>\'\u062C\u064A\u06AA\u068F\u06BE\u0646\' \u0648\u0627\u0631\u0648 \u0628\u0644\u0627\u06AA \u0635\u0631\u0641 \u0627\u0646 \u0648\u0642\u062A \u06AA\u062C\u06BE\u06C1 \u06AA\u0646\u062F\u0648 \u062A\u068F\u06BE\u0646 \u0634\u0631\u0637 \u062F\u0631\u0633\u062A \u06BE\u062C\u064A\u060C \u06A9\u0627\u067B\u064A \u067E\u0627\u0633\u064A \u0645\u0648\u0699\u06BB \u062C\u064A \u06AA\u0648\u0634\u0634 \u06AA\u064A\u0648 \u062C\u064A\u06AA\u068F\u06BE\u0646 \u0627\u0646 \u0637\u0631\u0641 \u0631\u0633\u062A\u0648 \u0622\u06BE\u064A.</td><td><img src="common/help.png"></td></tr></table></div><div id="dialogHelpWallFollow" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>\u0627\u0648\u06BE\u0627\u0646 \u06BE\u0646 \u0645\u0634\u06AA\u0644 \u0648\u0631 \u0648\u06AA\u0699 \u06A9\u064A \u062D\u0644 \u06AA\u0631\u064A \u0633\u06AF\u0647\u0648 \u067F\u0627\u061F \u06A9\u0627\u067B\u064A \u062F\u064A\u0648\u0627\u0631 \u062A\u064A \u06AA\u0648\u0634\u0634 \u06AA\u064A\u0648. \u06BE\u064A \u0635\u0631\u0641 \u0645\u0627\u06BE\u0631 \u067E\u0631\u06AF\u0631\u0627\u0645\u0631\u0633 \u0644\u0627\u0621\u0650 \u0622\u06BE\u064A.' + BlocklyGames.soy.ok(null, null, opt_ijData) + '</td></tr></table></div><div id="dialogHelpMenu" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td id="helpMenuText">\'\u062C\u064A\u06AA\u068F\u06BE\u0646\' \u062C\u064A %1 \u0628\u0644\u0627\u06AA \u062A\u064A \u06AA\u0644\u06AA \u06AA\u064A\u0648 \u062A\u06C1 \u062C\u064A\u0626\u0646 \u0634\u0631\u0637 \u062A\u0628\u062F\u064A\u0644 \u06AA\u0631\u064A \u0633\u06AF\u0647\u062C\u064A.</td><td><img src="common/help.png"></td></tr></table></div>' : '');
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
