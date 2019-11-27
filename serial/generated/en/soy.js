// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Serial.soy.
 */

goog.provide('Serial.soy');

goog.require('soy');
goog.require('soydata');
goog.require('BlocklyGames.soy');


Serial.soy.messages = function(opt_data, opt_ignored, opt_ijData) {
  return BlocklyGames.soy.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">move forward</span><span id="Maze_turnLeft">turn left</span><span id="Maze_turnRight">turn right</span><span id="Maze_doCode">do</span><span id="Maze_elseCode">else</span><span id="Maze_helpIfElse">If-else blocks will do one thing or the other.</span><span id="Maze_pathAhead">if path ahead</span><span id="Maze_pathLeft">if path to the left</span><span id="Maze_pathRight">if path to the right</span><span id="Maze_repeatUntil">repeat until</span><span id="Maze_moveForwardTooltip">Moves the player forward one space.</span><span id="Maze_turnTooltip">Turns the player left or right by 90 degrees.</span><span id="Maze_ifTooltip">If there is a path in the specified direction, then do some actions.</span><span id="Maze_ifelseTooltip">If there is a path in the specified direction, then do the first block of actions. Otherwise, do the second block of actions.</span><span id="Maze_whileTooltip">Repeat the enclosed actions until finish point is reached.</span><span id="Maze_capacity0">You have %0 blocks left.</span><span id="Maze_capacity1">You have %1 block left.</span><span id="Maze_capacity2">You have %2 blocks left.</span><span id="Maze_2activitiesComplete">== 2</span><span id="Maze_4activitiesComplete">== 4</span><span id="Maze_booksZero">== 0</span><span id="Maze_booksZeroPar">== 0 in parallel</span><span id="Maze_student0">student 1</span><span id="Maze_student1">student 2</span><span id="Maze_student2">student 3</span><span id="Maze_repeatTaskUntil">repeat until</span><span id="Maze_time">Time: %2</span><span id="Maze_whileBooksTooltip">Repeat the enclosed actions until return all books to library.</span><span id="Maze_whileBooksTooltipPar">Repeat the enclosed actions in parallel until return all books to library.</span><span id="Maze_whileAct4Tooltip">Repeat the enclosed commands until the student complete all the 4 activities to attend the class</span><span id="Maze_whileAct2Tooltip">Repeat the enclosed commands until the student complete all the 2 activities to attend the class</span><span id="Maze_ifStdTooltip">Do the actions related with the student selected.</span><span id="Maze_help1Student">The student block will set the action of the student.</span><span id="Maze_help2Students">The student block will set the action to a specific student.</span><span id="Maze_helpBooks">This block will execute both students in parallel.</span><span id="Games_dialogStart">Start</span></div>';
};
if (goog.DEBUG) {
  Serial.soy.messages.soyTemplateName = 'Serial.soy.messages';
}


Serial.soy.start = function(opt_data, opt_ignored, opt_ijData) {
  return Serial.soy.messages(null, null, opt_ijData) + '<div class="header"><a id="back" href="index.html" class="logo"><img id="banner" src="index/blocklypar.png" width="70" alt="Blockly Games"></a>&nbsp<td><a><h1>' + BlocklyGames.soy.titleSpan({appName: 'Sequential Programming'}, null, opt_ijData) + BlocklyGames.soy.levelLinks({level: opt_ijData.level, maxLevel: opt_ijData.maxLevel, lang: opt_ijData.lang, suffix: '&skin=' + soy.$$escapeHtml(opt_ijData.skin)}, null, opt_ijData) + '</h1></a></td><div class="nav-spacer"></div></div>&nbsp<div id="visualization"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="400px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg></div><table width="400"><tr><div class=\'parent\'><div align=\'left\' class=\'child inline-block-child\' id="counter"></div><div align=\'center\' class=\'child inline-block-child\' id="number"></div><div align=\'center\' class=\'child inline-block-child\' id="timeBubble"> <div id="time"></div> </div><div align=\'right\' class=\'child inline-block-child\' id="capacityBubble"> <div id="capacity"></div> </div></div><td style="width: 220px; text-align: right; vertical-align: top;"><td><button id="runButton" class="primary" title="Makes the player do what the blocks say."><img src="common/1x1.gif" class="run icon21"> Run Program</button><button id="resetButton" class="primary" style="display: none" title="Put the player back at the start of the maze."><img src="common/1x1.gif" class="stop icon21"> Reset</button></td></tr></table>' + Serial.soy.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + BlocklyGames.soy.dialog(null, null, opt_ijData) + BlocklyGames.soy.doneDialog(null, null, opt_ijData) + BlocklyGames.soy.abortDialog(null, null, opt_ijData) + BlocklyGames.soy.storageDialog(null, null, opt_ijData) + ((opt_ijData.level == 1) ? '<div id="dialog1Intro" class="dialogHiddenContent"><div style="font-size: large; margin: 1em;"><center><h3>LEVEL 1</center></h3></div><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0; text-align: center;">Programming with blocks is easy!<table cellspacing="5"><tr><td><img class="img-responsive" src="serial/img/level1.png"></td><td>Just drag and drop the blocks together, one above the other to build your program.</td></table><button id="playStart" class="secondary">Ok</button></div></div><div id="dialogHelpOneTopBlock" class="dialogHiddenContent"><table><tr><td>You need to stack together all the blocks that you want to use.</td><td><div id="sampleOneTopBlock" class="readonly"></div></td></tr></table></div><div id="dialogHelpRun" class="dialogHiddenContent"><table><tr><td><img src="maze/img/modals/left.png"></td><td>Run your program by clicking here!</td></tr></table></div>' : (opt_ijData.level == 2) ? '<div id="dialogHelpReset" class="dialogHiddenContent"><table><tr><td colspan="2">Your program didn\'t solve this level.</td></tr><tr><td><img src="maze/img/modals/left.png"></td><td>Click \'Reset\' and try again.</td></tr></table></div><div id="dialogHelpIfElse" class="dialogHiddenContent">An \'if-else\' block will do one thing if the condition is true or the other, if the condition is false.</div>' : '');
};
if (goog.DEBUG) {
  Serial.soy.start.soyTemplateName = 'Serial.soy.start';
}


Serial.soy.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;" xmlns="https://developers.google.com/blockly/xml"><block type="maze_moveForward"></block><block type="maze_turn"><field name="DIR">turnLeft</field></block><block type="maze_turn"><field name="DIR">turnRight</field></block>' + ((opt_ijData.level > 1) ? '<block type="maze_if"><field name="DIR">isPathRight</field></block><block type="maze_forever"></block>' + ((opt_ijData.level > 2) ? '<block type="maze_ifElse"></block>' : '') : '') + '</xml>';
};
if (goog.DEBUG) {
  Serial.soy.toolbox.soyTemplateName = 'Serial.soy.toolbox';
}
