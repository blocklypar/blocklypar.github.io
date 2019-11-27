/**
 * Blockly Games: Tasks
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
 * @fileoverview JavaScript for Tasks game.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Tasks');

goog.require('Blockly.FieldDropdown');
goog.require('BlocklyDialogs');
goog.require('BlocklyGames');
goog.require('BlocklyInterface');
goog.require('Tasks.Blocks');
goog.require('Tasks.soy');

goog.require('Tasks.Level1');
goog.require('Tasks.Level2');
goog.require('Tasks.Level3');
goog.require('Tasks.Level4');

BlocklyGames.NAME = 'tasks';

/**
 * Background and other elements
 */
Tasks.VIEW = {
  winSound: ['tasks/win.mp3', 'tasks/win.ogg'],
  crashSound: ['tasks/fail_pegman.mp3', 'tasks/fail_pegman.ogg']
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

Tasks.MAX_BLOCKS = [undefined, // Level 0.
  Infinity, Infinity, Infinity, Infinity][BlocklyGames.LEVEL];

/**
 * Milliseconds between each animation frame.
 */
Tasks.stepSpeed = 80;
Tasks.FirstLevel = {
  ONE: true,
  TWO: true,
  THREE: true,
  FOUR: true
};


/**
 * Execution time of each level
 */
Tasks.executionTime = document.getElementById("number");
Tasks.finalTime = 0;
/**
 * The types of squares in the maze, which is represented
 * as a 2D array of SquareType values.
 * @enum {number}
 */
Tasks.SquareType = {
  WALL: 0,
  OPEN: 1,
  START: 2,
  FINISH: 3,
  ITEM: 4
};

Tasks.map = [
// Level 0.
  undefined,
// Level 1.
 [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 1, 4, 1, 4, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]],
  // Level 2.
  [[0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 1, 4, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 4, 0, 0],
  [0, 0, 0, 0, 0, 0, 3, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]],
  // Level 3.
  [[0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 4, 0, 1, 0, 0],
  [0, 0, 0, 2, 1, 0, 4, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]],
  // Level 4.
  [[0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 4, 0, 4, 0, 0],
  [0, 0, 0, 2, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 3, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]],
][BlocklyGames.LEVEL];

/**
 * Measure maze dimensions and set sizes.
 * ROWS: Number of tiles down.
 * COLS: Number of tiles across.
 * SQUARE_SIZE: Pixel height and width of each maze square (i.e. tile).
 */
Tasks.ROWS = Tasks.map.length;
Tasks.COLS = Tasks.map[0].length;
Tasks.SQUARE_SIZE = 50;
Tasks.PEGMAN_HEIGHT = 52;
Tasks.PEGMAN_WIDTH = 49;

Tasks.MAZE_WIDTH = Tasks.SQUARE_SIZE * Tasks.COLS;
Tasks.MAZE_HEIGHT = Tasks.SQUARE_SIZE * Tasks.ROWS;
Tasks.PATH_WIDTH = Tasks.SQUARE_SIZE / 3;

/**
 * Constants for cardinal directions.  Subsequent code assumes these are
 * in the range 0..3 and that opposites have an absolute difference of 2.
 * @enum {number}
 */
Tasks.DirectionType = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3
};

/**
 * Outcomes of running the user program.
 */
Tasks.ResultType = {
  UNSET: 0,
  SUCCESS: 1,
  FAILURE: -1,
  TIMEOUT: 2,
  ERROR: -2
};

Tasks.result = Tasks.ResultType.UNSET;
Tasks.startDirection = Tasks.DirectionType.EAST;

// Map each possible shape to a sprite.
// Input: Binary string representing Centre/North/West/South/East squares.
// Output: [x, y] coordinates of each tile's sprite in tiles.png.
Tasks.tile_SHAPES = {
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
Tasks.drawMap = function() {

  var svg = document.getElementById('svgMaze');
  var scale = Math.max(Tasks.ROWS, Tasks.COLS) * Tasks.SQUARE_SIZE;
  svg.setAttribute('viewBox', '0 0 ' + scale + ' ' + scale);

  // Draw the outer square.
  var square = document.createElementNS(Blockly.utils.dom.SVG_NS, 'rect');
  square.setAttribute('width', Tasks.MAZE_WIDTH);
  square.setAttribute('height', Tasks.MAZE_HEIGHT);
  square.setAttribute('fill', '#F1EEE7');
  square.setAttribute('stroke-width', 1);
  square.setAttribute('stroke', '#CCB');
  svg.appendChild(square);
  
  switch(BlocklyGames.LEVEL){

    case 1: 
      Tasks.Level1.DrawMap(svg);
      Tasks.Level1.AddSprites(svg, document);
      Tasks.Level1.AddActivitySprites();
    break;

    case 2: 
      Tasks.Level2.DrawMap(svg);
      Tasks.Level2.AddSprites(svg, document);
      Tasks.Level2.AddActivitySprites();
    break;

    case 3: 
      Tasks.Level3.DrawMap(svg);
      Tasks.Level3.AddSprites(svg, document);
      Tasks.Level3.AddActivitySprites();
    break;

    case 4: 
    Tasks.Level4.DrawMap(svg);
    Tasks.Level4.AddSprites(svg, document);
    Tasks.Level4.AddActivitySprites();
    break;

  }
};

/**
 * Initialize Blockly and the maze. Called on page load.
 */
Tasks.init = function() {
  // Render the Soy template.
  document.body.innerHTML = Tasks.soy.start({}, null,
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
       'maxBlocks': Tasks.MAX_BLOCKS,
       'rtl': rtl,
       'toolbox': toolbox,
       'trashcan': true,
       'zoom': {'startScale': scale}});

  BlocklyGames.workspace.getAudioManager().load(Tasks.VIEW.winSound, 'win');
  BlocklyGames.workspace.getAudioManager().load(Tasks.VIEW.crashSound, 'fail');
  
  // Not really needed, there are no user-defined functions or variables.
  Blockly.JavaScript.addReservedWords('moveForward,moveBackward,booksZero,activitiesComplete0,activitiesComplete' +
      'turnRight,turnLeft,isPathForward,isPathRight,isPathBackward,isPathLeft');

  //Level 1 must use the tasks block    
  var defaultXml =
  '<xml>' +
    '<block movable="' + '" ' +
    'type="maze_forever_2activities" x="70" y="70"></block>' +
  '</xml>';
  
  
  BlocklyInterface.loadBlocks(defaultXml, false);
  
  Tasks.drawMap();
  Tasks.reset(true);

  BlocklyGames.workspace.addChangeListener(function() {Tasks.updateCapacity();});

  if(BlocklyGames.LEVEL > 3)
    BlocklyGames.workspace.addChangeListener(function() {Tasks.updateTime(0);});
  
  BlocklyGames.bindClick('runButton', Tasks.runButtonClick);
  BlocklyGames.bindClick('resetButton', Tasks.resetButtonClick);

  // Make connecting blocks easier for beginners.
  if (BlocklyGames.LEVEL == 1 || BlocklyGames.LEVEL == 2) {
    Blockly.SNAP_RADIUS *= 2;
    Blockly.CONNECTING_SNAP_RADIUS = Blockly.SNAP_RADIUS;
  }

  //Timeout help messages

  setTimeout(function() {
    BlocklyGames.workspace.addChangeListener(Tasks.levelHelp);
    Tasks.levelHelp();
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
Tasks.levelHelp = function(opt_event) {

  if (opt_event && opt_event.type == Blockly.Events.UI) {
    // Just a change to highlighting or somesuch.
    return;
  } else if (BlocklyGames.workspace.isDragging()) {
    // Don't change helps during drags.
    return;
  } else if (Tasks.result == Tasks.ResultType.SUCCESS ||
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
  
  if (BlocklyGames.LEVEL == 1) {

    if(Tasks.FirstLevel.ONE){
      content = document.getElementById('dialog1Intro');
      style = {'width': '30%', 'top': '8em'};
      style[rtl ? 'right' : 'left'] = '40%';
      origin = toolbar[0].getSvgRoot();

      var ok = document.getElementById('playStart');
      ok.addEventListener('click', BlocklyDialogs.hideDialog, true);
      ok.addEventListener('touchend', BlocklyDialogs.hideDialog, true);
      Tasks.FirstLevel.ONE = false;
    }
    else{
      if (BlocklyGames.workspace.getAllBlocks().length < 2) {
        content = document.getElementById('dialogHelpStack');
        style = {'width': '190px', 'top': '150px'};
        style[rtl ? 'right' : 'left'] = '215px';
        origin = toolbar[0].getSvgRoot();
      } else {
        var topBlocks = BlocklyGames.workspace.getTopBlocks(true);
        if (topBlocks.length > 1) {
          var xml = [
              '<xml>',
                '<block type="maze_forever_2activities" x="10" y="10">',
                  '<statement name="DO">',
                    '<block type="maze_moveForward"></block>',
                  '</statement>',
                '</block>',
              '</xml>'];
          BlocklyInterface.injectReadonly('sampleOneTopBlock', xml);
          content = document.getElementById('dialogHelpOneTopBlock');
          style = {'width': '360px', 'top': '170px'};
          style[rtl ? 'right' : 'left'] = '300px';
          origin = topBlocks[0].getSvgRoot();
        } else if (Tasks.result == Tasks.ResultType.UNSET) {
          // Show run help dialog.
          content = document.getElementById('dialogHelpRun');
          style = {'width': '220px', 'top': '525px'};
          style[rtl ? 'right' : 'left'] = '410px';
          origin = document.getElementById('runButton');
        }
      }
    }
  }else if(BlocklyGames.LEVEL == 2){
    if(Tasks.FirstLevel.TWO){
      content = document.getElementById('dialog2Intro');
      style = {'width': '30%', 'top': '8em'};
      style[rtl ? 'right' : 'left'] = '40%';
      origin = toolbar[0].getSvgRoot();

      var ok = document.getElementById('playStart');
      ok.addEventListener('click', BlocklyDialogs.hideDialog, true);
      ok.addEventListener('touchend', BlocklyDialogs.hideDialog, true);
      Tasks.FirstLevel.TWO = false;
    }
    else{
      if (userBlocks.indexOf('maze_ifElse') == -1) {
        content = document.getElementById('dialogHelpIfElse');
        style = {'width': '240px', 'top': '450px'};
        style[rtl ? 'right' : 'left'] = '625px';
        origin = toolbar[5].getSvgRoot();
      }

      if (Tasks.result != Tasks.ResultType.UNSET &&
        document.getElementById('runButton').style.display == 'none') {
        content = document.getElementById('dialogHelpReset');
        style = {'width': '260px', 'top': '505px'};
        style[rtl ? 'right' : 'left'] = '410px';
        origin = document.getElementById('resetButton');
      }
    }

    }else if(BlocklyGames.LEVEL == 3){

      if(Tasks.FirstLevel.THREE){
        content = document.getElementById('dialog3Intro');
        style = {'width': '30%', 'top': '8em'};
        style[rtl ? 'right' : 'left'] = '40%';
        origin = toolbar[0].getSvgRoot();
  
        var ok = document.getElementById('playStart');
        ok.addEventListener('click', BlocklyDialogs.hideDialog, true);
        ok.addEventListener('touchend', BlocklyDialogs.hideDialog, true);
        Tasks.FirstLevel.THREE = false;
      }
    }else if(BlocklyGames.LEVEL == 4){

      if(Tasks.FirstLevel.FOUR){
        content = document.getElementById('dialog4Intro');
        style = {'width': '30%', 'top': '8em'};
        style[rtl ? 'right' : 'left'] = '40%';
        origin = toolbar[0].getSvgRoot();
  
        var ok = document.getElementById('playStart');
        ok.addEventListener('click', BlocklyDialogs.hideDialog, true);
        ok.addEventListener('touchend', BlocklyDialogs.hideDialog, true);
        Tasks.FirstLevel.FOUR = false;
      }
      else{
        if (userBlocks.indexOf('maze_1student') == -1) {
          content = document.getElementById('dialogHelp1Student');
          style = {'width': '300px', 'top': '400px'};
          style[rtl ? 'right' : 'left'] = '585px';
          origin = toolbar[5].getSvgRoot();
        }
      }
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
Tasks.saveToStorage = function() {
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
Tasks.reset = function(first) {

  switch(BlocklyGames.LEVEL){
    case 1:
      Tasks.Level1.Reset(first);
      break;
    case 2:
      Tasks.Level2.Reset(first);
      break;
    case 3:
      Tasks.Level3.Reset(first);
      break;
    case 4:
      Tasks.Level4.Reset(first);
      break;
  }
};

/**
 * Click the run button.  Start the program.
 * @param {!Event} e Mouse or touch event.
 */
Tasks.runButtonClick = function(e) {
  // Prevent double-clicks or double-taps.
  if (BlocklyInterface.eventSpam(e)) {
    return;
  }
  BlocklyDialogs.hideDialog(false);

  // Only allow a single top block on level 1.
  if (BlocklyGames.LEVEL == 1 &&
      BlocklyGames.workspace.getTopBlocks(false).length > 1 &&
      Tasks.result != Tasks.ResultType.SUCCESS &&
      !BlocklyGames.loadFromLocalStorage(BlocklyGames.NAME,
                                        BlocklyGames.LEVEL)) {
    Tasks.levelHelp();
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
  Tasks.reset(false);
  Tasks.execute();
};

/**
 * Updates the document's 'capacity' element with a message
 * indicating how many more blocks are permitted.  The capacity
 * is retrieved from BlocklyGames.workspace.remainingCapacity().
 */
Tasks.updateCapacity = function() {
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
      var msg = BlocklyGames.getMsg('Tasks_capacity0');
    } else if (cap == 1) {
      var msg = BlocklyGames.getMsg('Tasks_capacity1');
    } else {
      var msg = BlocklyGames.getMsg('Tasks_capacity2');
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
Tasks.resetButtonClick = function(e) {
  // Prevent double-clicks or double-taps.
  if (BlocklyInterface.eventSpam(e)) {
    return;
  }

  switch(BlocklyGames.LEVEL){
    case 1:
      Tasks.Level1.RemoveActivities();
      Tasks.Level1.AddActivitySprites();
    break;
    case 2:
      Tasks.Level2.RemoveActivities();
      Tasks.Level2.AddActivitySprites();
    break;
    case 3:
      Tasks.Level3.RemoveActivities();
      Tasks.Level3.AddActivitySprites();
    break;
    case 4:
      Tasks.Level4.RemoveActivities();
      Tasks.Level4.AddActivitySprites();
    break;
  }
    
  var runButton = document.getElementById('runButton');
  runButton.style.display = 'inline';
  document.getElementById('resetButton').style.display = 'none';

  BlocklyGames.workspace.highlightBlock(null);
  Tasks.reset(false);
  Tasks.levelHelp();
};

/**
 * Execute the user's code.  Heaven help us...
 */
Tasks.execute = function() {

  switch(BlocklyGames.LEVEL){
    case 1:
      Tasks.Level1.Execute();
      break;
    case 2:
      Tasks.Level2.Execute();
      break;
    case 3:
      Tasks.Level3.Execute();
    break;
    case 4:
      Tasks.Level4.ExecuteFirst();
    break;

  }
};

/**
 * Keep the direction within 0-3, wrapping at both ends.
 * @param {number} d Potentially out-of-bounds direction value.
 * @return {number} Legal direction value.
 */
Tasks.constrainDirection4 = function(d) {
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
Tasks.constrainDirection16 = function(d) {
  d = Math.round(d) % 16;
  if (d < 0) {
    d += 16;
  }
  return d;
};


window.addEventListener('load', Tasks.init);

