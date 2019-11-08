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
  return BlocklyGames.soy.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">move forward</span><span id="Maze_turnLeft">turn left</span><span id="Maze_turnRight">turn right</span><span id="Maze_doCode">do</span><span id="Maze_elseCode">else</span><span id="Maze_helpIfElse">If-else blocks will do one thing or the other.</span><span id="Maze_pathAhead">if path ahead</span><span id="Maze_pathLeft">if path to the left</span><span id="Maze_pathRight">if path to the right</span><span id="Maze_repeatUntil">repeat until</span><span id="Maze_moveForwardTooltip">Moves the player forward one space.</span><span id="Maze_turnTooltip">Turns the player left or right by 90 degrees.</span><span id="Maze_ifTooltip">If there is a path in the specified direction, then do some actions.</span><span id="Maze_ifelseTooltip">If there is a path in the specified direction, then do the first block of actions. Otherwise, do the second block of actions.</span><span id="Maze_whileTooltip">Repeat the enclosed actions until finish point is reached.</span><span id="Maze_capacity0">You have %0 blocks left.</span><span id="Maze_capacity1">You have %1 block left.</span><span id="Maze_capacity2">You have %2 blocks left.</span><span id="Maze_2activitiesComplete">== 2</span><span id="Maze_4activitiesComplete">== 4</span><span id="Maze_booksZero">== 0</span><span id="Maze_booksZeroPar">== 0 in parallel</span><span id="Maze_student0">student 1</span><span id="Maze_student1">student 2</span><span id="Maze_student2">student 3</span><span id="Maze_repeatTaskUntil">repeat until</span><span id="Maze_time">Time: %2</span><span id="Maze_whileBooksTooltip">Repeat the enclosed actions until return all books to library.</span><span id="Maze_whileBooksTooltipPar">Repeat the enclosed actions in parallel until return all books to library.</span><span id="Maze_whileAct4Tooltip">Repeat the enclosed commands until the student complete all the 4 activities to attend the class</span><span id="Maze_whileAct2Tooltip">Repeat the enclosed commands until the student complete all the 2 activities to attend the class</span><span id="Maze_ifStdTooltip">Do the actions related with the student selected.</span><span id="Maze_help1Student">The student block will set the action of the student.</span><span id="Maze_help2Students">The student block will set the action to a specific student.</span><span id="Maze_helpBooks">This block will execute both students in parallel.</span><span id="Games_dialogStart">Start</span></div>';
};
if (goog.DEBUG) {
  Maze.soy.messages.soyTemplateName = 'Maze.soy.messages';
}


Maze.soy.start = function(opt_data, opt_ignored, opt_ijData) {
  return Maze.soy.messages(null, null, opt_ijData) + '<div class="header"><a id="back" href="index.html" class="logo"><img id="banner" src="index/blocklypar.png" width="70" alt="Blockly Games"></a>&nbsp<td><a><h1>' + BlocklyGames.soy.titleSpan({appName: 'Parallel Maze'}, null, opt_ijData) + BlocklyGames.soy.levelLinks({level: opt_ijData.level, maxLevel: opt_ijData.maxLevel, lang: opt_ijData.lang, suffix: '&skin=' + soy.$$escapeHtml(opt_ijData.skin)}, null, opt_ijData) + '</h1></a></td><div class="header-right"><a class="language"><select id="languageMenu"></select></a></div><div class="nav-spacer"></div></div>&nbsp<div id="visualization"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="400px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg></div><table width="400"><tr><div class=\'parent\'><div align=\'left\' class=\'child inline-block-child\' id="counter"></div><div align=\'center\' class=\'child inline-block-child\' id="number"></div><div align=\'center\' class=\'child inline-block-child\' id="timeBubble"> <div id="time"></div> </div><div align=\'right\' class=\'child inline-block-child\' id="capacityBubble"> <div id="capacity"></div> </div></div><td style="width: 220px; text-align: right; vertical-align: top;"><td><button id="runButton" class="primary" title="Makes the player do what the blocks say."><img src="common/1x1.gif" class="run icon21"> Run Program</button><button id="resetButton" class="primary" style="display: none" title="Put the player back at the start of the maze."><img src="common/1x1.gif" class="stop icon21"> Reset</button></td></tr></table>' + Maze.soy.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + BlocklyGames.soy.dialog(null, null, opt_ijData) + BlocklyGames.soy.doneDialog(null, null, opt_ijData) + BlocklyGames.soy.abortDialog(null, null, opt_ijData) + BlocklyGames.soy.storageDialog(null, null, opt_ijData) + ((opt_ijData.level == 1) ? '<div id="dialog1Intro" class="dialogHiddenContent"><div style="font-size: large; margin: 1em;"><center><h3>LEVEL 1</center></h3></div><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0; text-align: center;"><div style="font-size: large; margin: 1em;">Can you help the student go to the class? But before that... there is some homework to be done.</div><br/><table><tr><td><img src="maze/activity.png"></td><td><div style="font-size: large; margin: 1em;">Collect all the homeworks on the way and achieve the classroom successfully!</div></td></tr></table><button id="playStart" class="secondary">Start</button></div></div><div id="dialogHelpOneTopBlock" class="dialogHiddenContent"><table><tr><td>Hey! You need to stack together all the blocks that you want to use in the white workspace.<div id="sampleOneTopBlock" class="readonly"></div></td></tr></table></div><div id="dialogHelpStack" class="dialogHiddenContent"><table><tr><td>Stack a \'move forward\' block in the \'repeat until\' block to finish the task.</td></tr></table></div><div id="dialogHelpRun" class="dialogHiddenContent"><table><tr><td><img src="maze/left.png"></td><td>Run your program by clicking here!</td></tr></table></div>' : (opt_ijData.level == 2) ? '<div id="dialog2Intro" class="dialogHiddenContent"><div style="font-size: large; margin: 1em;"><center><h3>LEVEL 2</center></h3></div><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0; text-align: center;"><table><tr><td><img src="maze/level2.png"></td><td><div style="font-size: large; margin: 1em;">The student has more homework now! Collect the 4 homework activities to attend the class.</div></td></tr></table><button id="playStart" class="secondary">Start</button></div></div><div id="dialogHelpReset" class="dialogHiddenContent"><table><tr><td colspan="2">Your program didn\'t solve this level.</td></tr><tr><td><img src="maze/left.png"></td><td>Click \'Reset\' and try again.</td></tr></table></div><div id="dialogHelpIfElse" class="dialogHiddenContent"><table><tr><td>An \'if-else\' block will do one thing if the condition is true or the other, if the condition is false.</td></tr></table></div>' : (opt_ijData.level == 3) ? '<div id="dialog3Intro" class="dialogHiddenContent"><div style="font-size: large; margin: 1em;"><center><h3>LEVEL 3</center></h3></div><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0; text-align: center;"><div style="font-size: large; margin: 1em;">The student has to return all the 4 books to the library.</div><table><tr><td><div style="font-size: large; margin: 1em;">You need to asign this task to the student using this block:</div></td><td><img src="maze/level3.png"></td></tr></table><button id="playStart" class="secondary">Start</button></div></div><div id="dialogHelp1Student" class="dialogHiddenContent"><table><tr><td>To move the student you need to stack the blocks inside the \'student do\' block.</td></tr></table></div>' : (opt_ijData.level == 4) ? '<div id="dialog4Intro" class="dialogHiddenContent"><div style="font-size: large; margin: 1em;"><center><h3>LEVEL 4</center></h3></div><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0; text-align: center;"><div style="font-size: large; margin: 1em;">Another student came to help!</div><table><tr><td><div style="font-size: large; margin: 1em;">Try to use the 2 students to return the books at the same time, in <b>parallel</b> and see what happens with the execution time!</div></td><td><img src="maze/level4.png"></td></tr></table><button id="playStart" class="secondary">Start</button></div></div><div id="dialogHelp2Students" class="dialogHiddenContent"><table><tr><td>Now you can switch between the 2 students available for the task.</td></tr></table></div>' : (opt_ijData.level == 5) ? '<div id="dialog5Intro" class="dialogHiddenContent"><div style="font-size: large; margin: 1em;"><center><h3>LEVEL 5</center></h3></div><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0; text-align: center;"><div style="font-size: large; margin: 1em;">The students have to return 8 books now, can you help them?</div><table><tr><td><img src="maze/level5.png"></td><td><div style="font-size: large; margin: 1em;">Oh! Pay attention in the execution time spent in this level using both students.<div></td></tr></table><button id="playStart" class="secondary">Start</button></div></div><div id="dialogHelpBooks" class="dialogHiddenContent"><table><tr><td><img src="maze/down.png"></td><td colspan="2">This block allows you to move both students at the same time, in parallel.</td></tr></table></div>' : (opt_ijData.level == 6) ? '<div id="dialog6Intro" class="dialogHiddenContent"><div style="font-size: large; margin: 1em;"><center><h3>LEVEL 6</center></h3></div><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0; text-align: center;"><div style="font-size: large; margin: 1em;">Now we have 3 students to return the 8 books!</div><div style="font-size: large; margin: 1.5em;">Let\'s see the <b>execution time</b> compared with 2 students used before!<div><button id="playStart" class="secondary">Start</button></div></div><div id="dialogHelpBooks" class="dialogHiddenContent"><table><tr><td colspan="2">Try to use all the students to perform the task to see what happens!</td></tr></table></div>' : (opt_ijData.level == 5) ? '<div id="dialogHelpSkins" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td width="95%">Choose your favourite player from this menu.</td><td><img src="maze/help_up.png"></td></tr></table></div>' : (opt_ijData.level == 6) ? '<div id="dialogHelpIf" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>An \'if\' block will do something only if the condition is true. Try turning left if there is a path to the left.</td><td><img src="common/help.png"></td></tr></table></div>' : (opt_ijData.level == 7) ? '<div id="dialogHelpMenu" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td id="helpMenuText">Click on %1 in the \'if\' block to change its condition.</td><td><img src="common/help.png"></td></tr></table></div>' : '');
};
if (goog.DEBUG) {
  Maze.soy.start.soyTemplateName = 'Maze.soy.start';
}


Maze.soy.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;" xmlns="https://developers.google.com/blockly/xml"><block type="maze_moveForward"></block><block type="maze_turn"><field name="DIR">turnLeft</field></block><block type="maze_turn"><field name="DIR">turnRight</field></block>' + ((opt_ijData.level == 1) ? '<block type="maze_forever_2activities"></block>' : '') + ((opt_ijData.level > 1) ? '<block type="maze_if"><field name="DIR">isPathRight</field></block><block type="maze_ifElse"></block>' + ((opt_ijData.level == 2) ? '<block type="maze_forever_4activities"></block>' : (opt_ijData.level == 3) ? '<block type="maze_1student"><field name="STD">isStudent0</field></block><block type="maze_forever_books"></block>' : (opt_ijData.level == 4 || opt_ijData.level == 5) ? '<block type="maze_2students"><field name="STD">isStudent0</field></block>' : '') + ((opt_ijData.level > 3) ? '<block type="maze_forever_booksPar"></block>' + ((opt_ijData.level == 6 || opt_ijData.level == 7) ? '<block type="maze_student"><field name="STD">isStudent0</field></block>' : '') : '') : '') + '</xml>';
};
if (goog.DEBUG) {
  Maze.soy.toolbox.soyTemplateName = 'Maze.soy.toolbox';
}
