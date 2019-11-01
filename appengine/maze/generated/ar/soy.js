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
  return BlocklyGames.soy.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">\u062A\u062D\u0631\u0651\u0643 \u0625\u0644\u0649 \u0627\u0644\u0623\u0645\u0627\u0645</span><span id="Maze_turnLeft">\u0627\u0633\u062A\u062F\u0631 \u0625\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631</span><span id="Maze_turnRight">\u0627\u0633\u062A\u062F\u0631 \u0627\u0644\u0649 \u0627\u0644\u064A\u0645\u064A\u0646</span><span id="Maze_doCode">\u0627\u0641\u0639\u0644</span><span id="Maze_elseCode">\u0648\u0627\u0644\u0627</span><span id="Maze_helpIfElse">\u0643\u062A\u0644 (\u0625\u0630\u0627-\u0648\u0625\u0644\u0627) \u0633\u062A\u0641\u0639\u0644 \u0634\u064A\u0626\u0627 \u0645\u062D\u062F\u062F\u0627 \u0623\u0648 \u0634\u064A\u0626\u0627 \u0622\u062E\u0631.</span><span id="Maze_pathAhead">\u0625\u0630\u0627 \u0647\u0646\u0627\u0643 \u0645\u0633\u0627\u0631 \u0641\u064A \u0627\u0644\u0623\u0645\u0627\u0645</span><span id="Maze_pathLeft">\u0625\u0630\u0627 \u0643\u0627\u0646 \u0627\u0644\u0645\u0633\u0627\u0631 \u0625\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631</span><span id="Maze_pathRight">\u0625\u0630\u0627 \u0643\u0627\u0646 \u0627\u0644\u0645\u0633\u0627\u0631 \u0625\u0644\u0649 \u0627\u0644\u064A\u0645\u064A\u0646</span><span id="Maze_repeatUntil">\u0643\u0631\u0650\u0651\u0631 \u062D\u062A\u0649</span><span id="Maze_moveForwardTooltip">\u064A\u062D\u0631\u0643 \u0627\u0644\u0644\u0627\u0639\u0628 \u0645\u0633\u0627\u0641\u0629 \u0648\u0627\u062D\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0645\u0627\u0645.</span><span id="Maze_turnTooltip">\u064A\u062F\u0648\u0631 \u0627\u0644\u0644\u0627\u0639\u0628 \u0627\u0644\u0649 \u0627\u0644\u064A\u0645\u064A\u0646 \u0623\u0648 \u0627\u0644\u064A\u0633\u0627\u0631 \u0628\u0645\u0642\u062F\u0627\u0631 90 \u062F\u0631\u062C\u0629.</span><span id="Maze_ifTooltip">\u0625\u0630\u0627 \u0643\u0627\u0646 \u0647\u0646\u0627\u0643 \u0645\u0633\u0627\u0631 \u0641\u064A \u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0645\u062D\u062F\u062F\u060C \u0627\u0646\u062C\u0632 \u0628\u0639\u0636 \\n\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A. </span><span id="Maze_ifelseTooltip">\u0627\u0630\u0627 \u0643\u0627\u0646 \u0647\u0646\u0627\u0643 \u0645\u0633\u0627\u0631 \u0641\u064A \u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0645\u064C\u062D\u062F\u062F\u060C \u0644\u0630\u0627 \u064A\u064C\u0645\u0643\u0646\u0643 \\n\u062A\u0646\u0641\u064A\u0630 \u0623\u0648\u0644 \u0643\u062A\u0644\u0629 \u0645\u0646 \u0627\u0644\u0623\u0648\u0627\u0645\u0631. \u063A\u064A\u0631 \u0630\u0644\u0643\u060C \u0642\u0645 \u0628\u062A\u0646\u0641 </span><span id="Maze_whileTooltip">\u0642\u0645 \u0628\u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u062D\u062A\u0649 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0646\u0642\u0637\u0629 \\n\u0627\u0644\u0645\u064C\u062D\u062F\u062F\u0629. </span><span id="Maze_capacity0">\u0644\u062F\u064A\u0643 %0 \u0628\u0644\u0648\u0643\u0627\u062A \u0645\u062A\u0628\u0642\u064A\u0629.</span><span id="Maze_capacity1">\u0644\u062F\u064A\u0643 %1 \u0628\u0644\u0648\u0643 \u0645\u062A\u0628\u0642\u064A.</span><span id="Maze_capacity2">\u0644\u062F\u064A\u0643 %2 \u0628\u0644\u0648\u0643 \u0645\u062A\u0628\u0642\u064A.</span></div>';
};
if (goog.DEBUG) {
  Maze.soy.messages.soyTemplateName = 'Maze.soy.messages';
}


Maze.soy.start = function(opt_data, opt_ignored, opt_ijData) {
  return Maze.soy.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1>' + BlocklyGames.soy.titleSpan({appName: '\u0627\u0644\u0645\u062A\u0627\u0647\u0629'}, null, opt_ijData) + BlocklyGames.soy.levelLinks({level: opt_ijData.level, maxLevel: opt_ijData.maxLevel, lang: opt_ijData.lang, suffix: '&skin=' + soy.$$escapeHtml(opt_ijData.skin)}, null, opt_ijData) + '</h1></td><td class="farSide"><select id="languageMenu"></select>&nbsp;<button id="linkButton" title="\u0627\u062D\u0641\u0638 \u0648\u0623\u0639\u0637\u064A \u0648\u0635\u0644\u0629 \u0625\u0644\u0649 \u0627\u0644\u0628\u0644\u0648\u0643\u0627\u062A."><img src="common/1x1.gif" class="link icon21"></button>&nbsp;<button id="pegmanButton"><img src="common/1x1.gif"><span id="pegmanButtonArrow"></span></button></td></tr></table><div id="visualization"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="400px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><td><button id="runButton" class="primary" title="\u064A\u062C\u0639\u0644 \u0627\u0644\u0644\u0627\u0639\u0628 \u064A\u0642\u0648\u0645 \u0628\u0645\u0627 \u062A\u0642\u0648\u0644\u0647 \u0627\u0644\u0628\u0644\u0648\u0643\u0627\u062A."><img src="common/1x1.gif" class="run icon21"> \u0634\u063A\u0650\u0651\u0644 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C</button><button id="resetButton" class="primary" style="display: none" title="\u0627\u0633\u062A\u0631\u062C\u0627\u0639 \u0627\u0644\u0644\u0627\u0639\u0628 \u0627\u0644\u0649  \u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0645\u062A\u0627\u0647\u0629."><img src="common/1x1.gif" class="stop icon21"> \u0625\u0639\u0627\u062F\u0629 \u0636\u0628\u0637</button></td></tr></table>' + Maze.soy.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + BlocklyGames.soy.dialog(null, null, opt_ijData) + BlocklyGames.soy.doneDialog(null, null, opt_ijData) + BlocklyGames.soy.abortDialog(null, null, opt_ijData) + BlocklyGames.soy.storageDialog(null, null, opt_ijData) + ((opt_ijData.level == 1) ? '<div id="dialogHelpStack" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>\u0642\u0645 \u0628\u0639\u0645\u0644 \u062D\u0631\u0643\u062A\u064A\u0646 \u0641\u064A \u0622\u0646 \u0648\u0627\u062D\u062F \u0644\u0644\u0622\u0645\u0627\u0645 \u0644\u0645\u064C\u0633\u0627\u0639\u062F\u062A\u064A \u0644\u0644\u0648\u0635\u0648\u0644 \u0627\u0644\u0649 \u0627\u0644\u0647\u062F\u0641.</td><td valign="top"><img src="maze/help_stack.png" class="mirrorImg" height=63 width=136></td></tr></table></div><div id="dialogHelpOneTopBlock" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>\u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u0648\u0649, \u0633\u062A\u062D\u062A\u0627\u062C \u0627\u0644\u0649 \u062A\u062C\u0645\u064A\u0639 \u0643\u0644 \u0627\u0644\u0643\u062A\u0644 \u0645\u0639 \u0628\u0639\u0636\u0647\u0627 \u0627\u0644\u0628\u0639\u0636 \u0641\u064A \u0633\u0627\u062D\u0629 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0628\u064A\u0636\u0627\u0621.<div id="sampleOneTopBlock" class="readonly"></div></td></tr></table></div><div id="dialogHelpRun" class="dialogHiddenContent"><table><tr><td>\u0642\u0645 \u0628\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062E\u0627\u0635 \u0628\u0643 \u0644\u0631\u0624\u064A\u0629 \u0645\u0627 \u064A\u062D\u062F\u062B.</td><td rowspan=2><img src="common/help.png"></td></tr><tr><td><div><img src="maze/help_run.png" class="mirrorImg" height=27 width=141></div></td></tr></table></div>' : (opt_ijData.level == 2) ? '<div id="dialogHelpReset" class="dialogHiddenContent"><table><tr><td>\u0628\u0631\u0646\u0627\u0645\u062C\u0643 \u0644\u0645 \u064A\u062D\u0644 \u0627\u0644\u0645\u062A\u0627\u0647\u0629.  \u0627\u0636\u063A\u0637 \'\u0625\u0639\u0627\u062F\u0629\' \u0648\u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.</td><td rowspan=2><img src="common/help.png"></td></tr><tr><td><div><img src="maze/help_run.png" class="mirrorImg" height=27 width=141></div></td></tr></table></div>' : (opt_ijData.level == 3 || opt_ijData.level == 4) ? ((opt_ijData.level == 3) ? '<div id="dialogHelpRepeat" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0645\u0633\u0627\u0631 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0641\u0642\u0637 \u0643\u062A\u0644\u062A\u064A\u0646. \u0627\u0633\u062A\u062E\u062F\u0645 \'\u0643\u0631\u0631 \u062D\u062A\u0649\' \u0644\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0643\u062A\u0644\u0629 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0645\u0631\u0629.</td><td><img src="common/help.png"></td></tr></table></div>' : '') + '<div id="dialogHelpCapacity" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>\u0644\u0642\u062F \u0642\u0645\u062A \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062C\u0645\u064A\u0639 \u0627\u0644\u0643\u062A\u0644 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u0648\u0649. \u0644\u0639\u0645\u0644 \u0643\u062A\u0644\u0629 \u062C\u062F\u064A\u062F\u0629. \u0639\u0644\u064A\u0643 \u0627\u0648\u0644\u0627 \u0645\u0633\u062D \u0643\u062A\u0644 \u0645\u0648\u062C\u0648\u062F\u0629.</td></tr></table></div><div id="dialogHelpRepeatMany" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>\u064A\u064C\u0645\u0643\u0646\u0643 \u0636\u0628\u0637 \u0627\u0643\u062B\u0631 \u0645\u0646 \u0643\u062A\u0644\u0629 \u0648\u0627\u062D\u062F\u0629 \u062F\u0627\u062E\u0644 \u0643\u062A\u0644\u0629 \'\u0643\u0631\u0631 \u062D\u062A\u0649\'.</td><td><img src="common/help.png"></td></tr></table></div>' : (opt_ijData.level == 5) ? '<div id="dialogHelpSkins" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td width="95%">\u0627\u062E\u062A\u0631 \u0644\u0627\u0639\u0628\u0643 \u0627\u0644\u0645\u0641\u0636\u0644 \u0645\u0646 \u0647\u0630\u0647 \u0627\u0644\u0642\u0627\u0626\u0645\u0629.</td><td><img src="maze/help_up.png"></td></tr></table></div><div id="dialogHelpIf" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>\u0643\u062A\u0644\u0629 \'\u0625\u0630\u0627 \u0633\u062A\u0642\u0648\u0645 \u0628\u0639\u0645\u0644 \u0634\u064A\u0621 \u0645\u0627 \u0641\u064A \u062D\u0627\u0644\u0629 \u0643\u0646 \u0627\u0644\u0634\u0631\u0637 \u0635\u062D\u064A\u062D\u0627. \u062D\u0627\u0648\u0644 \u0627\u0644\u062F\u0648\u0631\u0627\u0646 \u0625\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631 \u0625\u0630\u0627 \u0643\u0627\u0646 \u0647\u0646\u0627\u0643 \u0645\u0633\u0627\u0631 \u0625\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631.</td><td><img src="common/help.png"></td></tr></table></div><div id="dialogHelpWallFollow" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>\u0647\u0644 \u064A\u0645\u0643\u0646\u0643 \u062D\u0644 \u0647\u0630\u0647 \u0627\u0644\u0645\u062A\u0627\u0647\u0629 \u0627\u0644\u0645\u0639\u0642\u062F\u0629\u061F  \u062D\u0627\u0648\u0644 \u0627\u0646 \u062A\u0644\u062D\u0642 \u0627\u0644\u062C\u062F\u0627\u0631 \u0627\u0644\u0623\u064A\u0633\u0631.  \u0644\u0644\u0645\u0628\u0631\u0645\u062C\u064A\u0646 \u0627\u0644\u0645\u062A\u0642\u062F\u0645\u064A\u0646 \u0641\u0642\u0637!' + BlocklyGames.soy.ok(null, null, opt_ijData) + '</td></tr></table></div><div id="dialogHelpMenu" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td id="helpMenuText">\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 %1 \u0641\u064A \u0643\u062A\u0644\u0629 "\u0625\u0630\u0627" \u0644\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629.</td><td><img src="common/help.png"></td></tr></table></div>' : '');
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
