'use strict';

goog.provide('Serial.Level1');
goog.require('Blockly.FieldDropdown');
goog.require('BlocklyDialogs');
goog.require('BlocklyGames');
goog.require('BlocklyInterface');
goog.require('Serial.Blocks');
goog.require('Serial.soy');

goog.require('Serial.Avatar');

var start_;
var finish_;
var student;
var pidList = [];
var log = [];


/**
 * Background and other elements
 */
Serial.Level1.VIEW = {
    background: '',
    tiles: 'static/img/games/serial/tiles_ufsm2.png',
    finishMarker: 'static/img/games/serial/marker.png',
    skin: 'static/img/games/serial/pegman.png',
    graph:false
};

/**
 * First function to be called
 */
Serial.Level1.DrawMap = function(svg){

    //Create cenario:
    if (Serial.Level1.VIEW.background) {
        var tile = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
        tile.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Serial.Level1.VIEW.background);
        tile.setAttribute('height', Serial.MAZE_HEIGHT);
        tile.setAttribute('width', Serial.MAZE_WIDTH);
        tile.setAttribute('x', 0);
        tile.setAttribute('y', 0);
        svg.appendChild(tile);
    }

    if (Serial.Level1.VIEW.graph) {
        // Draw the grid lines.
        // The grid lines are offset so that the lines pass through the centre of
        // each square.  A half-pixel offset is also added to as standard SVG
        // practice to avoid blurriness.
        var offset = Serial.SQUARE_SIZE / 2 + 0.5;
        for (var k = 0; k < Serial.ROWS; k++) {
          var h_line = document.createElementNS(Blockly.utils.dom.SVG_NS, 'line');
          h_line.setAttribute('y1', k * Serial.SQUARE_SIZE + offset);
          h_line.setAttribute('x2', Serial.MAZE_WIDTH);
          h_line.setAttribute('y2', k * Serial.SQUARE_SIZE + offset);
          h_line.setAttribute('stroke', Serial.Level1.VIEW.graph);
          h_line.setAttribute('stroke-width', 1);
          svg.appendChild(h_line);
        }
        for (var k = 0; k < Serial.COLS; k++) {
          var v_line = document.createElementNS(Blockly.utils.dom.SVG_NS, 'line');
          v_line.setAttribute('x1', k * Serial.SQUARE_SIZE + offset);
          v_line.setAttribute('x2', k * Serial.SQUARE_SIZE + offset);
          v_line.setAttribute('y2', Serial.MAZE_HEIGHT);
          v_line.setAttribute('stroke', Serial.Level1.VIEW.graph);
          v_line.setAttribute('stroke-width', 1);
          svg.appendChild(v_line);
        }
    }

    // Return a value of '0' if the specified square is wall or out of bounds,
    // '1' otherwise (empty, start, finish).
    var normalize = function(x, y) {
        if (x < 0 || x >= Serial.COLS || y < 0 || y >= Serial.ROWS) {
            return '0';
        }
        return (Serial.map[y][x] == Serial.SquareType.WALL) ? '0' : '1';
    };

    // Compute and draw the tile for each square.
    var tileId = 0;
    for (var y = 0; y < Serial.ROWS; y++) {
        for (var x = 0; x < Serial.COLS; x++) {
            // Compute the tile shape.
            var tileShape = normalize(x, y) +
                normalize(x, y - 1) +  // North.
                normalize(x + 1, y) +  // West.
                normalize(x, y + 1) +  // South.
                normalize(x - 1, y);   // East.

            // Draw the tile.
            if (!Serial.tile_SHAPES[tileShape]) {
            if (tileShape == '00000' && Math.random() > 0.3) {
                tileShape = 'null0';
            } else {
                tileShape = 'null' + Math.floor(1 + Math.random() * 4);
            }
            }
            var left = Serial.tile_SHAPES[tileShape][0];
            var top = Serial.tile_SHAPES[tileShape][1];
            
            // Tile's clipPath element.
            var tileClip = document.createElementNS(Blockly.utils.dom.SVG_NS, 'clipPath');
            tileClip.id = 'tileClipPath' + tileId;

            var clipRect = document.createElementNS(Blockly.utils.dom.SVG_NS, 'rect');
            clipRect.setAttribute('width', Serial.SQUARE_SIZE);
            clipRect.setAttribute('height', Serial.SQUARE_SIZE);

            clipRect.setAttribute('x', x * Serial.SQUARE_SIZE);
            clipRect.setAttribute('y', y * Serial.SQUARE_SIZE);

            tileClip.appendChild(clipRect);
            svg.appendChild(tileClip);

            // Tile sprite.
            var tile = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
            tile.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Serial.Level1.VIEW.tiles);
            // Position the tile sprite relative to the clipRect.
            tile.setAttribute('height', Serial.SQUARE_SIZE * 4);
            tile.setAttribute('width', Serial.SQUARE_SIZE * 5);
            tile.setAttribute('clip-path', 'url(#tileClipPath' + tileId + ')');
            tile.setAttribute('x', (x - left) * Serial.SQUARE_SIZE);
            tile.setAttribute('y', (y - top) * Serial.SQUARE_SIZE);
            svg.appendChild(tile);
            tileId++;
        }
    }

    // Locate the start, finish and itens squares.
    for (var y = 0; y < Serial.ROWS; y++) {
        for (var x = 0; x < Serial.COLS; x++) {
            if (Serial.map[y][x] == Serial.SquareType.START) {
                start_ = {x: x, y: y};
                student = new Serial.Avatar(0, Serial.startDirection, x, y, Serial.Level1.VIEW.skin);
            } else if (Serial.map[y][x] == Serial.SquareType.FINISH) {
                finish_ = {x: x, y: y};
            }
        }
    }
};

/**
 * Add main sprites to the svg of the game
 */
Serial.Level1.AddSprites = function(svg, document){

    // Create finish marker
    var finishMarker = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
    finishMarker.id = 'finish';
    finishMarker.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Serial.Level1.VIEW.finishMarker);
    finishMarker.setAttribute('height', 34);
    finishMarker.setAttribute('width', 20);
    svg.appendChild(finishMarker);

    // Create the student
    var student = document.createElementNS(Blockly.utils.dom.SVG_NS, 'clipPath');
    student.id = 'studentClipPath';
    var clipRect = document.createElementNS(Blockly.utils.dom.SVG_NS, 'rect');
    clipRect.id = 'clipRect';
    clipRect.setAttribute('width', Serial.PEGMAN_WIDTH);
    clipRect.setAttribute('height', Serial.PEGMAN_HEIGHT);
    student.appendChild(clipRect);
    svg.appendChild(student);
  
    var pegmanIcon = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
    pegmanIcon.id = 'student';
    pegmanIcon.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Serial.Level1.VIEW.skin);
    pegmanIcon.setAttribute('height', Serial.PEGMAN_HEIGHT);
    pegmanIcon.setAttribute('width', Serial.PEGMAN_WIDTH * 21); // 49 * 21 = 1029
    pegmanIcon.setAttribute('clip-path', 'url(#studentClipPath)');
    svg.appendChild(pegmanIcon);
};

Serial.Level1.Reset = function(first){

    // Kill all activities.
    for(var i = 0; i < pidList.length; i++) {
        window.clearTimeout(pidList[i]);
    }
    pidList = [];

    // Move the student into initial position
    student.reset(Serial.startDirection, start_.x, start_.y);

    if (first) {
        student.startDirection++;
        pidList.push(setTimeout(function() {
            Serial.Level1.Schedule([student.startLoc.x, student.startLoc.y, student.startDirection * 4],
                        [student.startLoc.x, student.startLoc.y, student.startDirection * 4 - 4]);
                        student.startDirection++;
        }, Serial.stepSpeed * 5));

    } else {
        Serial.Level1.DisplayStudent(student.startLoc.x, student.startLoc.y, Serial.startDirection * 4);
    }

    // Move the finish icon into position
    var finishIcon = document.getElementById('finish');
    finishIcon.setAttribute('x', Serial.SQUARE_SIZE * (finish_.x + 0.5) -
        finishIcon.getAttribute('width') / 2);
    finishIcon.setAttribute('y', Serial.SQUARE_SIZE * (finish_.y + 0.6) -
        finishIcon.getAttribute('height')/2);
    
};

/**
 * Read the input blocks and run the program
 */
Serial.Level1.Execute = function(){

    if (!('Interpreter' in window)) {
        setTimeout(Serial.execute, 250);
        return;
    }

    log = [];
    Blockly.selected && Blockly.selected.unselect();
    Serial.result = Serial.ResultType.UNSET;

    var code = Blockly.JavaScript.workspaceToCode(BlocklyGames.workspace);
    var interpreter = new Interpreter(code, Serial.Level1.InitInterpreter);

    // Try running the user's code.  There are four possible outcomes:
    // 1. If pegman reaches the finish [SUCCESS], true is thrown.
    // 2. If the program is terminated due to running too long [TIMEOUT] false is thrown.
    // 3. If another error occurs [ERROR], that error is thrown.
    // 4. If the program ended normally but without solving the maze [FAILURE]
    try {
        var ticks = 100000;  
        while (interpreter.step()) {
            if (ticks-- == 0) {
                throw Infinity;
            }
        }
        // Verify if the user finish the Maze
        Serial.result = Serial.Level1.NotDone() ?
           Serial.ResultType.FAILURE : Serial.ResultType.SUCCESS;
    } catch (e) {
        // A boolean is thrown for normal termination.
        if (e === Infinity) {
            Serial.result = Serial.ResultType.TIMEOUT;
        } else if (e === false) {
            Serial.result = Serial.ResultType.ERROR;
        } else {
            // Syntax error, can't happen.
            Serial.result = Serial.ResultType.ERROR;
            alert(e);
        }
    }

    // Fast animation if execution is successful.  Slow otherwise.
    if (Serial.result == Serial.ResultType.SUCCESS){
        // BlocklyGames.workspace.getAudioManager().play('win', 0.5);
        log.push(['finish', null]);
    }
        

    Serial.Level1.Reset(false);
    pidList.push(setTimeout(Serial.Level1.Animate, 100));
};

/**
 * Inject the Maze API into a JavaScript interpreter.
 * @param {!Interpreter} interpreter The JS Interpreter.
 * @param {!Interpreter.Object} scope Global scope.
 */
Serial.Level1.InitInterpreter = function(interpreter, scope){

    var wrapper;

    wrapper = function(id) {
        Serial.Level1.move(0, id);
    };
    interpreter.setProperty(scope, 'moveForward',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        Serial.Level1.move(2, id);
    };
    interpreter.setProperty(scope, 'moveBackward',
        interpreter.createNativeFunction(wrapper));
        
    wrapper = function(id) {
        Serial.Level1.turn(0, id);
    };
    interpreter.setProperty(scope, 'turnLeft',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        Serial.Level1.turn(1, id);
    };
    interpreter.setProperty(scope, 'turnRight',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
    return Serial.Level1.isPath(0, id);
    };
    interpreter.setProperty(scope, 'isPathForward',
    interpreter.createNativeFunction(wrapper));
   
    wrapper = function(id) {
        return Serial.Level1.isPath(1, id);
    };
    interpreter.setProperty(scope, 'isPathRight',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        return Serial.Level1.isPath(2, id);
    };
    interpreter.setProperty(scope, 'isPathBackward',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        return Serial.Level1.isPath(3, id);
    };
    interpreter.setProperty(scope, 'isPathLeft',
        interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        return Serial.Level1.NotDone();
    };
    interpreter.setProperty(scope, 'notDone',
        interpreter.createNativeFunction(wrapper));
    
};

/**
 * Animate the execution, call the function to move the student
 */
Serial.Level1.Animate = function(){

    var action = log.shift();

    if (!action) {
      BlocklyInterface.highlight(null);
      Serial.levelHelp();
      return;
    }
    
    BlocklyInterface.highlight(action[1]);

    switch (action[0]) {
        case 'north':
        Serial.Level1.Schedule([student.startLoc.x, student.startLoc.y, student.startDirection * 4],
            [student.startLoc.x, student.startLoc.y - 1, student.startDirection * 4]);
        student.startLoc.y--;
        break;

        case 'east':
        Serial.Level1.Schedule([student.startLoc.x, student.startLoc.y, student.startDirection * 4],
            [student.startLoc.x + 1, student.startLoc.y, student.startDirection * 4]);
        student.startLoc.x++;
        break;

        case 'south':
        Serial.Level1.Schedule([student.startLoc.x, student.startLoc.y, student.startDirection * 4],
            [student.startLoc.x, student.startLoc.y + 1, student.startDirection * 4]);
        student.startLoc.y++;
        break;

        case 'west':
        Serial.Level1.Schedule([student.startLoc.x, student.startLoc.y, student.startDirection * 4],
            [student.startLoc.x - 1, student.startLoc.y, student.startDirection * 4]);
        student.startLoc.x--;
        break;

        case 'look_north':
        Serial.Level1.ScheduleLook(Serial.DirectionType.NORTH, student.startLoc.x, student.startLoc.y);
        break;

        case 'look_east':
        Serial.Level1.ScheduleLook(Serial.DirectionType.EAST, student.startLoc.x, student.startLoc.y);
        break;
        
        case 'look_south':
        Serial.Level1.ScheduleLook(Serial.DirectionType.SOUTH, student.startLoc.x, student.startLoc.y);
        break;
        
        case 'look_west':
        Serial.Level1.ScheduleLook(Serial.DirectionType.WEST, student.startLoc.x, student.startLoc.y);
        break;
        
        case 'fail_forward':
        Serial.Level1.ScheduleFail(true);
        break;
        
        case 'fail_backward':
        Serial.Level1.ScheduleFail(false);
        break;
        
        case 'left':
        Serial.Level1.Schedule([student.startLoc.x, student.startLoc.y, student.startDirection * 4],
            [student.startLoc.x, student.startLoc.y, student.startDirection * 4 - 4], student.id);
        student.startDirection = Serial.constrainDirection4(student.startDirection - 1);
        break;
        
        case 'right':
        Serial.Level1.Schedule([student.startLoc.x, student.startLoc.y, student.startDirection * 4],
            [student.startLoc.x, student.startLoc.y, student.startDirection * 4 + 4], student.id);
        student.startDirection = Serial.constrainDirection4(student.startDirection + 1);
        break; 

        case 'finish':
        BlocklyInterface.saveToLocalStorage();
        setTimeout(BlocklyDialogs.congratulations, 1000);  
        
    }

    pidList.push(setTimeout(Serial.Level1.Animate, Serial.stepSpeed * 5));
}

/**
 * Attempt to move pegman forward or backward.
 * @param {number} direction Direction to move (0 = forward, 2 = backward).
 * @param {string} id ID of block that triggered this action.
 * @throws {true} If the end of the maze is reached.
 * @throws {false} If Pegman collides with a wall.
 */
Serial.Level1.move = function(direction, id) {

    if (!Serial.Level1.isPath(direction, null)) {
      log.push(['fail_' + (direction ? 'backward' : 'forward'), id]);
      throw false;
    }
    
    var effectiveDirection = student.startDirection + direction;
    var command;
    switch (Serial.constrainDirection4(effectiveDirection)) {
    case Serial.DirectionType.NORTH:
        student.startLoc.y--;
        command = 'north';
        break;
    case Serial.DirectionType.EAST:
        student.startLoc.x++;
        command = 'east';
        break;
    case Serial.DirectionType.SOUTH:
        student.startLoc.y++;
        command = 'south';
        break;
    case Serial.DirectionType.WEST:
        student.startLoc.x--;
        command = 'west';
        break;
    }
    log.push([command, id]);
};

/**
 * Turn pegman left or right.
 * @param {number} direction Direction to turn (0 = left, 1 = right).
 * @param {string} id ID of block that triggered this action.
 */
Serial.Level1.turn = function(direction, id) {

    if (direction) {
      // Right turn (clockwise).
      student.startDirection++;
      log.push(['right', id]);
    } else {
      // Left turn (counterclockwise).
      student.startDirection--;
      log.push(['left', id]);
    }

    student.startDirection = Serial.constrainDirection4(student.startDirection);
};

/**
 * Is there a path next to pegman?
 * @param {number} direction Direction to look
 *     (0 = forward, 1 = right, 2 = backward, 3 = left).
 * @param {?string} id ID of block that triggered this action.
 *     Null if called as a helper function in Serial.move().
 * @return {boolean} True if there is a path.
 */
Serial.Level1.isPath = function(direction, id) {

    var effectiveDirection = student.startDirection + direction;
    var square;
    var command;
  
    switch (Serial.constrainDirection4(effectiveDirection)) {
      case Serial.DirectionType.NORTH:
        square = Serial.map[student.startLoc.y - 1] &&
            Serial.map[student.startLoc.y - 1][student.startLoc.x];
        command = 'look_north';
        break;
      case Serial.DirectionType.EAST:
        square = Serial.map[student.startLoc.y][student.startLoc.x + 1];
        command = 'look_east';
        break;
      case Serial.DirectionType.SOUTH:
        square = Serial.map[student.startLoc.y + 1] &&
            Serial.map[student.startLoc.y + 1][student.startLoc.x];
        command = 'look_south';
        break;
      case Serial.DirectionType.WEST:
        square = Serial.map[student.startLoc.y][student.startLoc.x - 1];
        command = 'look_west';
        break;
    }
    if (id) {
      log.push([command, id]);
    }
  
    return square !== Serial.SquareType.WALL && square !== undefined;
};


/**
 * Schedule the animations for a move or turn.
 * @param {!Array.<number>} startPos X, Y and direction starting points.
 * @param {!Array.<number>} endPos X, Y and direction ending points.
 */
Serial.Level1.Schedule = function(startPos, endPos) {

    var deltas = [(endPos[0] - startPos[0])/4, (endPos[1] - startPos[1])/4, (endPos[2] - startPos[2])/4];

    pidList.push(setTimeout(function() {
    Serial.Level1.DisplayStudent(startPos[0] + deltas[0],
        startPos[1] + deltas[1],
        Serial.constrainDirection16(startPos[2] + deltas[2]));
    }, Serial.stepSpeed));

    pidList.push(setTimeout(function() {
        Serial.Level1.DisplayStudent(startPos[0] + deltas[0] * 2,
            startPos[1] + deltas[1] * 2,
            Serial.constrainDirection16(startPos[2] + deltas[2] * 2));
    }, Serial.stepSpeed));

    pidList.push(setTimeout(function() {
    Serial.Level1.DisplayStudent(startPos[0] + deltas[0] * 3,
        startPos[1] + deltas[1] * 3,
        Serial.constrainDirection16(startPos[2] + deltas[2] * 3));
    }, Serial.stepSpeed * 2));

    pidList.push(setTimeout(function() {
        Serial.Level1.DisplayStudent(endPos[0], endPos[1],
            Serial.constrainDirection16(endPos[2]));
        }, Serial.stepSpeed * 3));
};

/**
 * Display the look icon at Pegman's current location,
 * in the specified direction.
 * @param {!Serial.DirectionType} d Direction (0 - 3).
 */
Serial.Level1.ScheduleLook = function(d, x, y) {

    switch (d) {
        case Serial.DirectionType.NORTH:
        x += 0.5;
        break;
        case Serial.DirectionType.EAST:
        x += 1;
        y += 0.5;
        break;
        case Serial.DirectionType.SOUTH:
        x += 0.5;
        y += 1;
        break;
        case Serial.DirectionType.WEST:
        y += 0.5;
        break;
    }
};

/**
 * Schedule the animations and sounds for a failed move.
 * @param {boolean} forward True if forward, false if backward.
 */
Serial.Level1.ScheduleFail = function(forward) {

    var deltaX = 0;
    var deltaY = 0;

    switch (student.startDirection) {
        case Serial.DirectionType.NORTH:
        deltaY = -1;
        break;
        case Serial.DirectionType.EAST:
        deltaX = 1;
        break;
        case Serial.DirectionType.SOUTH:
        deltaY = 1;
        break;
        case Serial.DirectionType.WEST:
        deltaX = -1;
        break;
    }
    if (!forward) {
        deltaX = -deltaX;
        deltaY = -deltaY;
    }

    deltaX /= 4;
    deltaY /= 4;
    var direction16 = Serial.constrainDirection16(student.startDirection * 4);

    Serial.Level1.DisplayStudent(student.startLoc.x, student.startLoc.y + deltaY,
                        direction16);

    BlocklyGames.workspace.getAudioManager().play('fail', 0.5);
    pidList.push(setTimeout(function() {
        Serial.Level1.DisplayStudent(student.startLoc.x, student.startLoc.y,
                            direction16);
    }, Serial.stepSpeed));

    pidList.push(setTimeout(function() {
        Serial.Level1.DisplayStudent(student.startLoc.x + deltaX,
                            student.startLoc.y + deltaY,
                            direction16);

        BlocklyGames.workspace.getAudioManager().play('fail', 0.5);
    }, Serial.stepSpeed * 2));

    pidList.push(setTimeout(function() {
        Serial.Level1.DisplayStudent(student.startLoc.x, student.startLoc.y, direction16);
    }, Serial.stepSpeed * 3));
};

/**
 * Display one student at the specified location, facing the specified direction.
 * @param {number} x Horizontal grid (or fraction thereof).
 * @param {number} y Vertical grid (or fraction thereof).
 * @param {number} d Direction (0 - 15) or dance (16 - 17).
 * @param {number=} opt_angle Optional angle (in degrees) to rotate Pegman.
 */
Serial.Level1.DisplayStudent = function(x, y, d, opt_angle) {
    
    var student = document.getElementById('student');
    student.setAttribute('x', x * Serial.SQUARE_SIZE - d * Serial.PEGMAN_WIDTH + 1);
    student.setAttribute('y', Serial.SQUARE_SIZE * (y + 0.5) - Serial.PEGMAN_HEIGHT / 2 - 8);

    if (opt_angle) {
        student.setAttribute('transform', 'rotate(' + opt_angle + ', ' +
            (x * Serial.SQUARE_SIZE + Serial.SQUARE_SIZE / 2) + ', ' +
            (y * Serial.SQUARE_SIZE + Serial.SQUARE_SIZE / 2) + ')');
    } else {
        student.setAttribute('transform', 'rotate(0, 0, 0)');
    }

    var clipRect = document.getElementById('clipRect');
    clipRect.setAttribute('x', x * Serial.SQUARE_SIZE + 1);
    clipRect.setAttribute('y', student.getAttribute('y'));
};


Serial.Level1.NotDone = function(){
    return student.startLoc.x != finish_.x || student.startLoc.y != finish_.y;
};