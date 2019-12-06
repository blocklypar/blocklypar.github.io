/**
 * Blockly Games: Parallel
 *
 * Copyright 2012 Google Inc.
 * https://github.com/google/blockly-games
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview JavaScript for Parallel game.
 * @author fraser@google.com (Neil Fraser)
 */

/**
* Modified by: Ana Solórzano (alsolorzano@inf.ufsm.br)
* Year: 2019
*/

'use strict';

goog.provide('Parallel');

goog.require('Blockly.FieldDropdown');
goog.require('BlocklyDialogs');
goog.require('BlocklyGames');
goog.require('BlocklyInterface');
goog.require('Parallel.Blocks');
goog.require('Parallel.soy');

goog.require('Parallel.Level1');
goog.require('Parallel.Level2');
goog.require('Parallel.Level3');
goog.require('Parallel.Level4');

BlocklyGames.NAME = 'parallel';

/**
 * Background and other elements
 */
Parallel.VIEW = {
  winSound: ['parallel/win.mp3', 'parallel/win.ogg'],
  crashSound: ['parallel/fail_pegman.mp3', 'parallel/fail_pegman.ogg']
};


/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */
BlocklyInterface.nextLevel = function() {
  if (BlocklyGames.LEVEL < 4) {
    window.location = window.location.protocol + '//' +
        window.location.host + window.location.pathname +
        '?lang=' + BlocklyGames.LANG + '&level=' + (BlocklyGames.LEVEL + 1) +
        '&skin=' + 0;
  } else {
    BlocklyInterface.indexPage();
  }
};

Parallel.MAX_BLOCKS = [undefined, // Level 0.
  5, 11, 10, 12, Infinity][BlocklyGames.LEVEL];

/**
 * Milliseconds between each animation frame.
 */
Parallel.stepSpeed = 80;
Parallel.FirstLevel = {
  ONE: true,
  TWO: true,
  THREE: true,
  FOUR: true
};


/**
 * Execution time of each level
 */
Parallel.executionTime = document.getElementById("number");
Parallel.finalTime = 0;
/**
 * The types of squares in the parallel, which is represented
 * as a 2D array of SquareType values.
 * @enum {number}
 */
Parallel.SquareType = {
  WALL: 0,
  OPEN: 1,
  START: 2,
  FINISH: 3,
  ITEM: 4
};

Parallel.map = [
// Level 0.
  undefined,
// Level 1.
 [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]],
  // Level 2.
  [[0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 2, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]],
  // Level 3.
  [[0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 2, 1, 1, 1, 1, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]],
  //Level 4
  [[0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 2, 1, 1, 1, 1, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 2, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]]
][BlocklyGames.LEVEL];

/**
 * Measure parallel dimensions and set sizes.
 * ROWS: Number of tiles down.
 * COLS: Number of tiles across.
 * SQUARE_SIZE: Pixel height and width of each parallel square (i.e. tile).
 */
Parallel.ROWS = Parallel.map.length;
Parallel.COLS = Parallel.map[0].length;
Parallel.SQUARE_SIZE = 50;
Parallel.PEGMAN_HEIGHT = 52;
Parallel.PEGMAN_WIDTH = 49;

Parallel.MAZE_WIDTH = Parallel.SQUARE_SIZE * Parallel.COLS;
Parallel.MAZE_HEIGHT = Parallel.SQUARE_SIZE * Parallel.ROWS;
Parallel.PATH_WIDTH = Parallel.SQUARE_SIZE / 3;

/**
 * Constants for cardinal directions.  Subsequent code assumes these are
 * in the range 0..3 and that opposites have an absolute difference of 2.
 * @enum {number}
 */
Parallel.DirectionType = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3
};

/**
 * Outcomes of running the user program.
 */
Parallel.ResultType = {
  UNSET: 0,
  SUCCESS: 1,
  FAILURE: -1,
  TIMEOUT: 2,
  ERROR: -2
};

Parallel.result = Parallel.ResultType.UNSET;
Parallel.startDirection = Parallel.DirectionType.EAST;

// Map each possible shape to a sprite.
// Input: Binary string representing Centre/North/West/South/East squares.
// Output: [x, y] coordinates of each tile's sprite in tiles.png.
Parallel.tile_SHAPES = {
  '10010': [4, 0],  // Dead ends
  '10001': [3, 3],
  '11000': [0, 1],
  '10100': [0, 2],
  '11010': [4, 1],  // Vertical
  '10101': [3, 2],  // Horizontal
  '10110': [0, 0],  // Elbows
  '10011': [2, 0],
  '11001': [4, 2],
  '11100': [2, 3],
  '11110': [1, 1],  // Junctions
  '10111': [1, 0],
  '11011': [2, 1],
  '11101': [1, 2],
  '11111': [2, 2],  // Cross
  'null0': [4, 3],  // Empty
  'null1': [3, 0],
  'null2': [3, 1],
  'null3': [0, 3],
  'null4': [1, 3]
};

/**
 * Create and layout all the nodes for the path, scenery, Pegman, and goal.
 */
Parallel.drawMap = function() {

  var svg = document.getElementById('svgMaze');
  var scale = Math.max(Parallel.ROWS, Parallel.COLS) * Parallel.SQUARE_SIZE;
  svg.setAttribute('viewBox', '0 0 ' + scale + ' ' + scale);

  // Draw the outer square.
  var square = document.createElementNS(Blockly.utils.dom.SVG_NS, 'rect');
  square.setAttribute('width', Parallel.MAZE_WIDTH);
  square.setAttribute('height', Parallel.MAZE_HEIGHT);
  square.setAttribute('fill', '#F1EEE7');
  square.setAttribute('stroke-width', 1);
  square.setAttribute('stroke', '#CCB');
  svg.appendChild(square);
  
  switch(BlocklyGames.LEVEL){

    case 1:
      Parallel.Level1.DrawMap(svg);
      Parallel.Level1.AddBooks();
      Parallel.Level1.AddSprites(svg, document);
    break;
    
    case 2:
      Parallel.Level2.DrawMap(svg);
      Parallel.Level2.AddBooks();
      Parallel.Level2.AddSprites(svg, document);
    break;
    
    case 3:
      Parallel.Level3.DrawMap(svg);
      Parallel.Level3.AddBooks();
      Parallel.Level3.AddSprites(svg, document);
    break;
    
    case 4:
      Parallel.Level4.DrawMap(svg);
      Parallel.Level4.AddBooks();
      Parallel.Level4.AddSprites(svg, document);
    break;
  }
};

/**
 * Initialize Blockly and the parallel. Called on page load.
 */
Parallel.init = function() {
  // Render the Soy template.
  document.body.innerHTML = Parallel.soy.start({}, null,
      {lang: BlocklyGames.LANG,
       level: BlocklyGames.LEVEL,
       maxLevel: 4,
       skin: 0,
       html: BlocklyGames.IS_HTML});

  BlocklyInterface.init();
  
  var rtl = BlocklyGames.isRtl();
  var blocklyDiv = document.getElementById('blockly');
  var visualization = document.getElementById('visualization');
  var onresize = function(e) {
    var top = visualization.offsetTop;
    blocklyDiv.style.top = Math.max(10, top - window.pageYOffset) + 'px';
    blocklyDiv.style.left = rtl ? '10px' : '420px';
    blocklyDiv.style.width = (window.innerWidth - 440) + 'px';
  };
  window.addEventListener('scroll', function() {
    onresize(null);
    Blockly.svgResize(BlocklyGames.workspace);
  });
  window.addEventListener('resize', onresize);
  onresize(null);

  var toolbox = document.getElementById('toolbox');
  // Scale the workspace so level 1 = 1.3, and level 10 = 1.0.
  var scale = 1 + (1 - (BlocklyGames.LEVEL / BlocklyGames.MAX_LEVEL)) / 3;
  BlocklyGames.workspace = Blockly.inject('blockly',
      {'media': 'third-party/blockly/media/',
       'maxBlocks': Parallel.MAX_BLOCKS,
       'rtl': rtl,
       'toolbox': toolbox,
       'trashcan': true,
       'zoom': {'startScale': scale}});

  BlocklyGames.workspace.getAudioManager().load(Parallel.VIEW.winSound, 'win');
  BlocklyGames.workspace.getAudioManager().load(Parallel.VIEW.crashSound, 'fail');
  
  // Not really needed, there are no user-defined functions or variables.
  Blockly.JavaScript.addReservedWords('moveForward,moveBackward,booksZero,activitiesComplete0,activitiesComplete' +
      'turnRight,turnLeft,isPathForward,isPathRight,isPathBackward,isPathLeft');

  if(BlocklyGames.LEVEL == 1){
    var defaultXml =
    '<xml>' +
      '<block movable="' + (BlocklyGames.LEVEL != 1) + '" ' +
      'type="maze_forever_books" x="70" y="70"></block>' +
    '</xml>';
  }
  else{
    var defaultXml =
    '<xml>' +
      '<block movable="' + false + '" ' +
      'type="maze_forever_booksPar" x="70" y="70"></block>' +
    '</xml>';
  }

  // if(BlocklyGames.LEVEL == 1){
  //   var defaultXml =
  //   '<xml>' +
  //     '<block movable="' + (BlocklyGames.LEVEL != 1) + '" ' +
  //     'type="maze_forever_books" x="70" y="70"></block>' +
  //   '</xml>';
  // }
  // else{
  //   var defaultXml =
  //   '<xml>' +
  //     '<block movable="' + (BlocklyGames.LEVEL != 1) + '" ' +
  //     'type="maze_forever_booksPar" x="70" y="70"></block>' +
  //   '</xml>';
  // }

  BlocklyInterface.loadBlocks(defaultXml, false);
  
  Parallel.drawMap();
  Parallel.reset(true);

  BlocklyGames.workspace.addChangeListener(function() {Parallel.updateCapacity();});

  if(BlocklyGames.LEVEL > 3)
    BlocklyGames.workspace.addChangeListener(function() {Parallel.updateTime(0);});
  
  BlocklyGames.bindClick('runButton', Parallel.runButtonClick);
  BlocklyGames.bindClick('resetButton', Parallel.resetButtonClick);

  
  //Timeout help messages
  setTimeout(function() {
    BlocklyGames.workspace.addChangeListener(Parallel.levelHelp);
    Parallel.levelHelp();
  }, 1000);
  
  // Lazy-load the JavaScript interpreter.
  setTimeout(BlocklyInterface.importInterpreter, 1);
  // Lazy-load the syntax-highlighting.
  setTimeout(BlocklyInterface.importPrettify, 1);
};

/**
 * When the workspace changes, update the help as needed.
 * @param {Blockly.Events.Abstract=} opt_event Custom data for event.
 */
Parallel.levelHelp = function(opt_event) {

  if (opt_event && opt_event.type == Blockly.Events.UI) {
    // Just a change to highlighting or somesuch.
    return;
  } else if (BlocklyGames.workspace.isDragging()) {
    // Don't change helps during drags.
    return;
  } else if (Parallel.result == Parallel.ResultType.SUCCESS ||
             BlocklyGames.loadFromLocalStorage(BlocklyGames.NAME,
                                               BlocklyGames.LEVEL)) {
    // The user has already won.  They are just playing around.
    return;
  }
  var rtl = BlocklyGames.isRtl();
  var userBlocks = Blockly.Xml.domToText(
      Blockly.Xml.workspaceToDom(BlocklyGames.workspace));
  var toolbar = BlocklyGames.workspace.flyout_.workspace_.getTopBlocks(true);
  var content = null;
  var origin = null;
  var style = null;
  
  //If fail shows message with remaining blocks or to help with the repeat block
  
  if(BlocklyGames.LEVEL == 1){

    if(Parallel.FirstLevel.ONE){
      content = document.getElementById('dialog1Intro');
      style = {'width': '30%', 'top': '8em'};
      style[rtl ? 'right' : 'left'] = '40%';
      origin = toolbar[0].getSvgRoot();

      var ok = document.getElementById('playStart');
      ok.addEventListener('click', BlocklyDialogs.hideDialog, true);
      ok.addEventListener('touchend', BlocklyDialogs.hideDialog, true);
      Parallel.FirstLevel.ONE = false;
    }
    // else{
      // if (Serial.result == Serial.ResultType.UNSET) {
      //   // Show run help dialog.
      //   content = document.getElementById('dialogHelpTime');
      //   style = {'width': '220px', 'top': '525px'};
      //   style[rtl ? 'right' : 'left'] = '410px';
      //   origin = document.getElementById('runButton');
      // }
    // }
  }else if(BlocklyGames.LEVEL == 2){

    if(Parallel.FirstLevel.TWO){
      content = document.getElementById('dialog2Intro');
      style = {'width': '40%', 'top': '8em'};
      style[rtl ? 'right' : 'left'] = '40%';
      origin = toolbar[0].getSvgRoot();

      var ok = document.getElementById('playStart');
      ok.addEventListener('click', BlocklyDialogs.hideDialog, true);
      ok.addEventListener('touchend', BlocklyDialogs.hideDialog, true);
      Parallel.FirstLevel.TWO = false;
    }else{
      if (userBlocks.indexOf('maze_2students') == -1) {
        content = document.getElementById('dialogHelp2Students');
        style = {'width': '270px', 'top': '555px'};
        style[rtl ? 'right' : 'left'] = '585px';
        origin = toolbar[5].getSvgRoot();
      }
    }
  }else if(BlocklyGames.LEVEL == 3){
    if(Parallel.FirstLevel.THREE){
      content = document.getElementById('dialog3Intro');
      style = {'width': '30%', 'top': '8em'};
      style[rtl ? 'right' : 'left'] = '40%';
      origin = toolbar[0].getSvgRoot();

      var ok = document.getElementById('playStart');
      ok.addEventListener('click', BlocklyDialogs.hideDialog, true);
      ok.addEventListener('touchend', BlocklyDialogs.hideDialog, true);
      Parallel.FirstLevel.THREE = false;
    }else{
      if (userBlocks.indexOf('maze_foreverbooks') == -1) {
        content = document.getElementById('dialogHelpBooks');
        style = {'width': '270px', 'top': '85px'};
        style[rtl ? 'right' : 'left'] = '785px';
        origin = toolbar[5].getSvgRoot();
      }
    }
  }else if(BlocklyGames.LEVEL == 4){
    if(Parallel.FirstLevel.FOUR){
      content = document.getElementById('dialog4Intro');
      style = {'width': '30%', 'top': '8em'};
      style[rtl ? 'right' : 'left'] = '40%';
      origin = toolbar[0].getSvgRoot();

      var ok = document.getElementById('playStart');
      ok.addEventListener('click', BlocklyDialogs.hideDialog, true);
      ok.addEventListener('touchend', BlocklyDialogs.hideDialog, true);
      Parallel.FirstLevel.FOUR = false;
    }
    content = document.getElementById('dialogHelpBooks');
    style = {'width': '270px', 'top': '85px'};
    style[rtl ? 'right' : 'left'] = '785px';
    origin = toolbar[5].getSvgRoot();
      
  }

  if (content) {
    if (content.parentNode != document.getElementById('dialog')) {
      BlocklyDialogs.showDialog(content, origin, true, false, style, null);
    }
  } else {
    BlocklyDialogs.hideDialog(false);
  }

};

/**
 * Save the blocks for a one-time reload.
 */
Parallel.saveToStorage = function() {
  // MSIE 11 does not support sessionStorage on file:// URLs.
  if (typeof Blockly != undefined && window.sessionStorage) {
    var xml = Blockly.Xml.workspaceToDom(BlocklyGames.workspace);
    var text = Blockly.Xml.domToText(xml);
    window.sessionStorage.loadOnceBlocks = text;
  }
};


/**
 * Reset the maze to the start position and kill any pending animation tasks.
 * @param {boolean} first True if an opening animation is to be played.
 */
Parallel.reset = function(first) {

  switch(BlocklyGames.LEVEL){
    case 1:
      Parallel.Level1.Reset(first);
      break;
    case 2:
      Parallel.Level2.Reset(first);
      break;
    case 3:
      Parallel.Level3.Reset(first);
      break;
    case 4:
      Parallel.Level4.Reset(first);
      break;
  }
};

/**
 * Click the run button.  Start the program.
 * @param {!Event} e Mouse or touch event.
 */
Parallel.runButtonClick = function(e) {
  // Prevent double-clicks or double-taps.
  if (BlocklyInterface.eventSpam(e)) {
    return;
  }
  BlocklyDialogs.hideDialog(false);

  // Only allow a single top block on level 1.
  if (BlocklyGames.LEVEL == 1 &&
      BlocklyGames.workspace.getTopBlocks(false).length > 1 &&
      Parallel.result != Parallel.ResultType.SUCCESS &&
      !BlocklyGames.loadFromLocalStorage(BlocklyGames.NAME,
                                        BlocklyGames.LEVEL)) {
    Parallel.levelHelp();
    return;
  }
  var runButton = document.getElementById('runButton');
  var resetButton = document.getElementById('resetButton');
  // Ensure that Reset button is at least as wide as Run button.
  if (!resetButton.style.minWidth) {
    resetButton.style.minWidth = runButton.offsetWidth + 'px';
  }

  runButton.style.display = 'none';
  resetButton.style.display = 'inline';
  Parallel.reset(false);
  Parallel.execute();
};

/**
 * Updates the document's 'capacity' element with a message
 * indicating how many more blocks are permitted.  The capacity
 * is retrieved from BlocklyGames.workspace.remainingCapacity().
 */
Parallel.updateCapacity = function() {
  var cap = BlocklyGames.workspace.remainingCapacity();
  var p = document.getElementById('capacity');
  if (cap == Infinity) {
    p.style.display = 'none';
  } else {
    p.style.display = 'inline';
    p.innerHTML = '';
    cap = Number(cap);
    var capSpan = document.createElement('span');
    capSpan.className = 'capacityNumber';
    capSpan.appendChild(document.createTextNode(cap));
    if (cap == 0) {
      var msg = BlocklyGames.getMsg('Maze_capacity0');
    } else if (cap == 1) {
      var msg = BlocklyGames.getMsg('Maze_capacity1');
    } else {
      var msg = BlocklyGames.getMsg('Maze_capacity2');
    }
    var parts = msg.split(/%\d/);
    for (var i = 0; i < parts.length; i++) {
      p.appendChild(document.createTextNode(parts[i]));
      if (i != parts.length - 1) {
        p.appendChild(capSpan.cloneNode(true));
      }
    }
  }
};



/**
 * Click the reset button.  Reset the maze.
 * @param {!Event} e Mouse or touch event.
 */
Parallel.resetButtonClick = function(e) {
  // Prevent double-clicks or double-taps.
  if (BlocklyInterface.eventSpam(e)) {
    return;
  }

  Parallel.updateTime(0);

  switch(BlocklyGames.LEVEL){
    case 1:
      Parallel.Level1.AddBooks();
    break;
    case 2:
      Parallel.Level2.AddBooks();
    break;
    case 3:
      Parallel.Level3.AddBooks();
    break;
    case 4:
      Parallel.Level4.AddBooks();
    break;
  }
    
  var runButton = document.getElementById('runButton');
  runButton.style.display = 'inline';
  document.getElementById('resetButton').style.display = 'none';

  BlocklyGames.workspace.highlightBlock(null);
  Parallel.reset(false);
  Parallel.levelHelp();
};

/**
 * Execute the user's code.  Heaven help us...
 */
Parallel.execute = function() {

  // Insert and Reset counter
  //   Parallel.InsertCounter();

  switch(BlocklyGames.LEVEL){
    case 1:
      Parallel.Level1.ExecuteFirst();
      break;
    case 2:
      Parallel.Level2.ExecuteFirst();
      break;
    case 3:
      Parallel.Level3.ExecuteFirst();
    break;
    case 4:
      Parallel.Level4.ExecuteFirst();
      break;
  }
  
};

/**
 * Keep the direction within 0-3, wrapping at both ends.
 * @param {number} d Potentially out-of-bounds direction value.
 * @return {number} Legal direction value.
 */
Parallel.constrainDirection4 = function(d) {
  d = Math.round(d) % 4;
  if (d < 0) {
    d += 4;
  }
  return d;
};

/**
 * Keep the direction within 0-15, wrapping at both ends.
 * @param {number} d Potentially out-of-bounds direction value.
 * @return {number} Legal direction value.
 */
Parallel.constrainDirection16 = function(d) {
  d = Math.round(d) % 16;
  if (d < 0) {
    d += 16;
  }
  return d;
};


Parallel.FinalCounter = function(){

  var runningTime = document.getElementById('dialogRunText');
  runningTime.appendChild(document.createTextNode(BlocklyGames.getMsg('Games_execTime').replace('%2', Parallel.finalTime)));

}

/**
 * Updates the document's 'capacity' element with a message
 * indicating how many more blocks are permitted.  The capacity
 * is retrieved from BlocklyGames.workspace.remainingCapacity().
 */
Parallel.updateTime = function(time) {
  
  var cap = time;
  Parallel.finalTime = time;
  var p = document.getElementById('time');

  p.style.display = 'inline';
  p.innerHTML = '';
  cap = Number(cap);

  var capSpan = document.createElement('span');
  capSpan.className = 'timeNumber';
  capSpan.appendChild(document.createTextNode(cap));

  var msg = BlocklyGames.getMsg('Maze_time');
  var parts = msg.split(/%\d/);

  for (var i = 0; i < parts.length; i++) {
    p.appendChild(document.createTextNode(parts[i]));
    if (i != parts.length - 1) {
      p.appendChild(capSpan.cloneNode(true));
    }
  }
};

window.addEventListener('load', Parallel.init);

