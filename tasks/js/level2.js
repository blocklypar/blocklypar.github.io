'use strict';

goog.provide('Tasks.Level2');
goog.require('Blockly.FieldDropdown');
goog.require('BlocklyDialogs');
goog.require('BlocklyGames');
goog.require('BlocklyInterface');
goog.require('Tasks.Blocks');
goog.require('Tasks.soy');

goog.require('Tasks.Avatar');

var start_;
var finish_;
var student;
var activity_pos = [];
var pidList = [];
var log = [];

Tasks.Level2.activity_ = {
    num:0,
    pos: 0,
    pos0: 0,
    pos1: 0
};


/**
 * Background and other elements
 */
Tasks.Level2.VIEW = {
    background: 'maze/img/bg/level123.png',
    tiles: 'maze/tiles_ufsm2.png',
    finishMarker: 'maze/classroom.png',
    activity: 'maze/activity.png',
    skin: 'maze/pegman.png',
    graph:false
};

/**
 * First function to be called
 */
Tasks.Level2.DrawMap = function(svg){

    //Create cenario:
    if (Tasks.Level2.VIEW.background) {
        var tile = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
        tile.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Tasks.Level2.VIEW.background);
        tile.setAttribute('height', Tasks.MAZE_HEIGHT);
        tile.setAttribute('width', Tasks.MAZE_WIDTH);
        tile.setAttribute('x', 0);
        tile.setAttribute('y', 0);
        svg.appendChild(tile);
    }

    if (Tasks.Level2.VIEW.graph) {
        // Draw the grid lines.
        // The grid lines are offset so that the lines pass through the centre of
        // each square.  A half-pixel offset is also added to as standard SVG
        // practice to avoid blurriness.
        var offset = Tasks.SQUARE_SIZE / 2 + 0.5;
        for (var k = 0; k < Tasks.ROWS; k++) {
          var h_line = document.createElementNS(Blockly.utils.dom.SVG_NS, 'line');
          h_line.setAttribute('y1', k * Tasks.SQUARE_SIZE + offset);
          h_line.setAttribute('x2', Tasks.MAZE_WIDTH);
          h_line.setAttribute('y2', k * Tasks.SQUARE_SIZE + offset);
          h_line.setAttribute('stroke', Tasks.Level2.VIEW.graph);
          h_line.setAttribute('stroke-width', 1);
          svg.appendChild(h_line);
        }
        for (var k = 0; k < Tasks.COLS; k++) {
          var v_line = document.createElementNS(Blockly.utils.dom.SVG_NS, 'line');
          v_line.setAttribute('x1', k * Tasks.SQUARE_SIZE + offset);
          v_line.setAttribute('x2', k * Tasks.SQUARE_SIZE + offset);
          v_line.setAttribute('y2', Tasks.MAZE_HEIGHT);
          v_line.setAttribute('stroke', Tasks.Level2.VIEW.graph);
          v_line.setAttribute('stroke-width', 1);
          svg.appendChild(v_line);
        }
    }

    // Return a value of '0' if the specified square is wall or out of bounds,
    // '1' otherwise (empty, start, finish).
    var normalize = function(x, y) {
        if (x < 0 || x >= Tasks.COLS || y < 0 || y >= Tasks.ROWS) {
            return '0';
        }
        return (Tasks.map[y][x] == Tasks.SquareType.WALL) ? '0' : '1';
    };

    // Compute and draw the tile for each square.
    var tileId = 0;
    for (var y = 0; y < Tasks.ROWS; y++) {
        for (var x = 0; x < Tasks.COLS; x++) {
            // Compute the tile shape.
            var tileShape = normalize(x, y) +
                normalize(x, y - 1) +  // North.
                normalize(x + 1, y) +  // West.
                normalize(x, y + 1) +  // South.
                normalize(x - 1, y);   // East.

            // Draw the tile.
            if (!Tasks.tile_SHAPES[tileShape]) {
            if (tileShape == '00000' && Math.random() > 0.3) {
                tileShape = 'null0';
            } else {
                tileShape = 'null' + Math.floor(1 + Math.random() * 4);
            }
            }
            var left = Tasks.tile_SHAPES[tileShape][0];
            var top = Tasks.tile_SHAPES[tileShape][1];
            
            // Tile's clipPath element.
            var tileClip = document.createElementNS(Blockly.utils.dom.SVG_NS, 'clipPath');
            tileClip.id = 'tileClipPath' + tileId;

            var clipRect = document.createElementNS(Blockly.utils.dom.SVG_NS, 'rect');
            clipRect.setAttribute('width', Tasks.SQUARE_SIZE);
            clipRect.setAttribute('height', Tasks.SQUARE_SIZE);

            clipRect.setAttribute('x', x * Tasks.SQUARE_SIZE);
            clipRect.setAttribute('y', y * Tasks.SQUARE_SIZE);

            tileClip.appendChild(clipRect);
            svg.appendChild(tileClip);

            // Tile sprite.
            var tile = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
            tile.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Tasks.Level2.VIEW.tiles);
            // Position the tile sprite relative to the clipRect.
            tile.setAttribute('height', Tasks.SQUARE_SIZE * 4);
            tile.setAttribute('width', Tasks.SQUARE_SIZE * 5);
            tile.setAttribute('clip-path', 'url(#tileClipPath' + tileId + ')');
            tile.setAttribute('x', (x - left) * Tasks.SQUARE_SIZE);
            tile.setAttribute('y', (y - top) * Tasks.SQUARE_SIZE);
            svg.appendChild(tile);
            tileId++;
        }
    }

    // Locate the start and finish squares.
    for (var y = 0; y < Tasks.ROWS; y++) {
        for (var x = 0; x < Tasks.COLS; x++) {
            if (Tasks.map[y][x] == Tasks.SquareType.START) {
                start_ = {x: x, y: y};
                student = new Tasks.Avatar(0, Tasks.startDirection, x, y, Tasks.Level2.VIEW.skin);
            } else if (Tasks.map[y][x] == Tasks.SquareType.FINISH) {
                finish_ = {x: x, y: y};
            }
        }
    }
};

/**
 * Add sprites to the svg of the game
 */
Tasks.Level2.AddSprites = function(svg, document){

    // Create finish markers.
    var finishMarkers = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
    finishMarkers.id = 'finish';
    finishMarkers.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Tasks.Level2.VIEW.finishMarker);
    finishMarkers.setAttribute('height', 85);
    finishMarkers.setAttribute('width', 60);
    svg.appendChild(finishMarkers);

    //student
    var pegmanClip = document.createElementNS(Blockly.utils.dom.SVG_NS, 'clipPath');
    pegmanClip.id = 'pegmanClipPath';
    var clipRect = document.createElementNS(Blockly.utils.dom.SVG_NS, 'rect');
    clipRect.id = 'clipRect';
    clipRect.setAttribute('width', Tasks.PEGMAN_WIDTH);
    clipRect.setAttribute('height', Tasks.PEGMAN_HEIGHT);
    pegmanClip.appendChild(clipRect);
    svg.appendChild(pegmanClip);
  
    var pegmanIcon = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
    pegmanIcon.id = 'student';
    pegmanIcon.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Tasks.Level2.VIEW.skin);
    pegmanIcon.setAttribute('height', Tasks.PEGMAN_HEIGHT);
    pegmanIcon.setAttribute('width', Tasks.PEGMAN_WIDTH * 21); // 49 * 21 = 1029
    pegmanIcon.setAttribute('clip-path', 'url(#pegmanClipPath)');
    svg.appendChild(pegmanIcon);
};

/**
 * Create the activities to be display in the maze
 * and move them to they initial positions
 */
Tasks.Level2.AddActivitySprites = function(){

    var svg = document.getElementById('svgMaze');

    for (var y = 0; y < Tasks.ROWS; y++) {
        for (var x = 0; x < Tasks.COLS; x++) {
            if(Tasks.map[y][x] == Tasks.SquareType.ITEM) {
                if(Tasks.Level2.activity_.pos0 == 0)
                    Tasks.Level2.activity_.pos0 = {x: x, y:y};
                else
                    Tasks.Level2.activity_.pos1 = {x: x, y:y};
            }
        }
    }

    var activity1 = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
    activity1.id = 'activity0';
    activity1.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Tasks.Level2.VIEW.activity);
    activity1.setAttribute('height', 45);
    activity1.setAttribute('width', 35);

    svg.appendChild(activity1);
    activity1.setAttribute('x', Tasks.SQUARE_SIZE * (Tasks.Level2.activity_.pos0.x + 0.5) -
    activity1.getAttribute('width') / 2);
    activity1.setAttribute('y', Tasks.SQUARE_SIZE * (Tasks.Level2.activity_.pos0.y + 0.6) - activity1.getAttribute('height'));


    var activity2 = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
    activity2.id = 'activity1';
    activity2.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Tasks.Level2.VIEW.activity);
    activity2.setAttribute('height', 45);
    activity2.setAttribute('width', 35);
    svg.appendChild(activity2);
    activity2.setAttribute('x', Tasks.SQUARE_SIZE * (Tasks.Level2.activity_.pos1.x + 0.5) -
    activity2.getAttribute('width') / 2);
    activity2.setAttribute('y', Tasks.SQUARE_SIZE * (Tasks.Level2.activity_.pos1.y + 0.6) - activity2.getAttribute('height'));

};

/**
 * Add activity to the list of activities completed
 * Remove the respective activity of the maze
 */
Tasks.Level2.ActivityDone = function(){

    var svg = document.getElementById('svgMaze');

    var activity = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');

    activity.id = 'activity';
    activity.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Tasks.Level2.VIEW.activity);
    activity.setAttribute('height', 45);
    activity.setAttribute('width', 35);
    svg.appendChild(activity);

    //Move the activity into the list
    activity.setAttribute('x', Tasks.SQUARE_SIZE * (0.3 + 0.8) - activity.getAttribute('width') / 2);
    Tasks.Level2.activity_.pos = Tasks.Level2.activity_.pos + 1;
    activity.setAttribute('y', Tasks.SQUARE_SIZE * (Tasks.Level2.activity_.pos + 2.5) - activity.getAttribute('height'));

    //Remove activity from the maze
    var name = 'activity';
    var svg = document.getElementById('svgMaze');
    if(Tasks.Level2.activity_.num == 2)
        activity = document.getElementById(name.concat('0'));
    else if(Tasks.Level2.activity_.num == 3)
        activity = document.getElementById(name.concat('1'));
    else
        activity = document.getElementById(name.concat(Tasks.Level2.activity_.num.toString()));

    svg.removeChild(activity);

};


/**
 * Second function to be called
 */
Tasks.Level2.Reset = function(first){

    // Kill all activities.
    for(var i = 0; i < pidList.length; i++) {
        window.clearTimeout(pidList[i]);
    }
    pidList = [];

    student.reset(Tasks.startDirection, start_.x, start_.y);

    // Move the student into initial position
    if (first) {
        student.startDirection++;
        pidList.push(setTimeout(function() {
            Tasks.Level2.Schedule([student.startLoc.x, student.startLoc.y, student.startDirection * 4],
                        [student.startLoc.x, student.startLoc.y, student.startDirection * 4 - 4]);
                        student.startDirection++;
        }, Tasks.stepSpeed * 4));
    } else {
        Tasks.Level2.DisplayStudent(student.startLoc.x, student.startLoc.y, Tasks.startDirection * 4);
    }

    // Move the finish icon into position
    var finishIcon = document.getElementById('finish');
    finishIcon.setAttribute('x', Tasks.SQUARE_SIZE * (finish_.x + 0.5) -
        finishIcon.getAttribute('width') / 2);
    finishIcon.setAttribute('y', Tasks.SQUARE_SIZE * (finish_.y + 0.6) -
        finishIcon.getAttribute('height') / 2);

};

Tasks.Level2.Execute = function(){

    if (!('Interpreter' in window)) {
        // Interpreter lazy loads and hasn't arrived yet. Try again later.
        setTimeout(Tasks.execute, 250);
        return;
    }

    log = [];
    Blockly.selected && Blockly.selected.unselect();
    Tasks.result = Tasks.ResultType.UNSET;

    var code = Blockly.JavaScript.workspaceToCode(BlocklyGames.workspace);
    var interpreter = new Interpreter(code, Tasks.Level2.InitInterpreter);

    // Try running the user's code.  There are four possible outcomes:
    // 1. If pegman reaches the finish [SUCCESS], true is thrown.
    // 2. If the program is terminated due to running too long [TIMEOUT] false is thrown.
    // 3. If another error occurs [ERROR], that error is thrown.
    // 4. If the program ended normally but without solving the maze [FAILURE]
    try {
        var ticks = 100000;  // 10k ticks runs Pegman for about 8 minutes.
        while (interpreter.step()) {
            if (ticks-- == 0) {
                throw Infinity;
            }
        }
        // Verify if the user finish the Maze
        Tasks.result = Tasks.Level2.NotDone() ?
           Tasks.ResultType.FAILURE : Tasks.ResultType.SUCCESS;
    } catch (e) {
        // A boolean is thrown for normal termination.
        if (e === Infinity) {
            Tasks.result = Tasks.ResultType.TIMEOUT;
        } else if (e === false) {
            Tasks.result = Tasks.ResultType.ERROR;
        } else {
            // Syntax error, can't happen.
            Tasks.result = Tasks.ResultType.ERROR;
            alert(e);
        }
    }

    // Fast animation if execution is successful. Slow otherwise.
    if (Tasks.result == Tasks.ResultType.SUCCESS){
        BlocklyGames.workspace.getAudioManager().play('win', 0.5);
        log.push(['finish', null]);
    }
        
    Tasks.Level2.Reset(false);
    pidList.push(setTimeout(Tasks.Level2.Animate, 150));
};


Tasks.Level2.Animate = function(){

    var action = log.shift();
    if (!action) {
      BlocklyInterface.highlight(null);
      Tasks.levelHelp();
      return;
    }
    BlocklyInterface.highlight(action[1]);

    switch (action[0]) {
        case 'north':
        Tasks.Level2.Schedule([student.startLoc.x, student.startLoc.y, student.startDirection * 4],
            [student.startLoc.x, student.startLoc.y - 1, student.startDirection * 4]);
        student.startLoc.y--;
        break;

        case 'east':
        Tasks.Level2.Schedule([student.startLoc.x, student.startLoc.y, student.startDirection * 4],
            [student.startLoc.x + 1, student.startLoc.y, student.startDirection * 4]);
        student.startLoc.x++;
        break;

        case 'south':
        Tasks.Level2.Schedule([student.startLoc.x, student.startLoc.y, student.startDirection * 4],
            [student.startLoc.x, student.startLoc.y + 1, student.startDirection * 4]);
        student.startLoc.y++;
        break;

        case 'west':
        Tasks.Level2.Schedule([student.startLoc.x, student.startLoc.y, student.startDirection * 4],
            [student.startLoc.x - 1, student.startLoc.y, student.startDirection * 4]);
        student.startLoc.x--;
        break;

        case 'look_north':
        Tasks.Level2.ScheduleLook(Tasks.DirectionType.NORTH, student.startLoc.x, student.startLoc.y);
        break;

        case 'look_east':
        Tasks.Level2.ScheduleLook(Tasks.DirectionType.EAST, student.startLoc.x, student.startLoc.y);
        break;
        
        case 'look_south':
        Tasks.Level2.ScheduleLook(Tasks.DirectionType.SOUTH, student.startLoc.x, student.startLoc.y);
        break;
        
        case 'look_west':
        Tasks.Level2.ScheduleLook(Tasks.DirectionType.WEST, student.startLoc.x, student.startLoc.y);
        break;
        
        case 'fail_forward':
        Tasks.Level2.ScheduleFail(true);
        break;
        
        case 'fail_backward':
        Tasks.Level2.ScheduleFail(false);
        break;
        
        case 'left':
        Tasks.Level2.Schedule([student.startLoc.x, student.startLoc.y, student.startDirection * 4],
            [student.startLoc.x, student.startLoc.y, student.startDirection * 4 - 4], student.id);
        student.startDirection = Tasks.constrainDirection4(student.startDirection - 1);
        break;
        
        case 'right':
        Tasks.Level2.Schedule([student.startLoc.x, student.startLoc.y, student.startDirection * 4],
            [student.startLoc.x, student.startLoc.y, student.startDirection * 4 + 4], student.id);
        student.startDirection = Tasks.constrainDirection4(student.startDirection + 1);
        break; 

        case 'finish':
        BlocklyInterface.saveToLocalStorage();
        setTimeout(BlocklyDialogs.congratulations, 1000);  
        
    }
    pidList.push(setTimeout(Tasks.Level2.Animate, Tasks.stepSpeed * 4));
}

/**
 * Inject the Maze API into a JavaScript interpreter.
 * @param {!Interpreter} interpreter The JS Interpreter.
 * @param {!Interpreter.Object} scope Global scope.
 */
Tasks.Level2.InitInterpreter = function(interpreter, scope){

    // API
    var wrapper;

    wrapper = function(id) {
        Tasks.Level2.move(0, id);
    };
    interpreter.setProperty(scope, 'moveForward',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        Tasks.Level2.move(2, id);
    };
    interpreter.setProperty(scope, 'moveBackward',
        interpreter.createNativeFunction(wrapper));
        
    wrapper = function(id) {
        Tasks.Level2.turn(0, id);
    };
    interpreter.setProperty(scope, 'turnLeft',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        Tasks.Level2.turn(1, id);
    };
    interpreter.setProperty(scope, 'turnRight',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
    return Tasks.Level2.isPath(0, id);
    };
    interpreter.setProperty(scope, 'isPathForward',
    interpreter.createNativeFunction(wrapper));
   
    wrapper = function(id) {
        return Tasks.Level2.isPath(1, id);
    };
    interpreter.setProperty(scope, 'isPathRight',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        return Tasks.Level2.isPath(2, id);
    };
    interpreter.setProperty(scope, 'isPathBackward',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        return Tasks.Level2.isPath(3, id);
    };
    interpreter.setProperty(scope, 'isPathLeft',
        interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        return Tasks.Level2.NotDone();
    };
    interpreter.setProperty(scope, 'notDone',
        interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        // Tasks.Level7.activityActivate = true;
        // return Tasks.Level2.GetActivity(student.startLoc.x, student.startLoc.y);
    };
    interpreter.setProperty(scope, '2activitiesComplete',
        interpreter.createNativeFunction(wrapper));
};


/**
 * Attempt to move pegman forward or backward.
 * @param {number} direction Direction to move (0 = forward, 2 = backward).
 * @param {string} id ID of block that triggered this action.
 * @throws {true} If the end of the maze is reached.
 * @throws {false} If Pegman collides with a wall.
 */
Tasks.Level2.move = function(direction, id) {

    if (!Tasks.Level2.isPath(direction, null)) {
      log.push(['fail_' + (direction ? 'backward' : 'forward'), id]);
      //throw false;
    }
    else{
        var effectiveDirection = student.startDirection + direction;
        var command;
        switch (Tasks.constrainDirection4(effectiveDirection)) {
        case Tasks.DirectionType.NORTH:
            student.startLoc.y--;
            command = 'north';
            break;
        case Tasks.DirectionType.EAST:
            student.startLoc.x++;
            command = 'east';
            break;
        case Tasks.DirectionType.SOUTH:
            student.startLoc.y++;
            command = 'south';
            break;
        case Tasks.DirectionType.WEST:
            student.startLoc.x--;
            command = 'west';
            break;
        }
        log.push([command, id]);
    }
};

/**
 * Turn pegman left or right.
 * @param {number} direction Direction to turn (0 = left, 1 = right).
 * @param {string} id ID of block that triggered this action.
 */
Tasks.Level2.turn = function(direction, id) {

    if (direction) {
      // Right turn (clockwise).
      student.startDirection++;
      log.push(['right', id]);
    } else {
      // Left turn (counterclockwise).
      student.startDirection--;
      log.push(['left', id]);
    }

    student.startDirection = Tasks.constrainDirection4(student.startDirection);
};

/**
 * Is there a path next to pegman?
 * @param {number} direction Direction to look
 *     (0 = forward, 1 = right, 2 = backward, 3 = left).
 * @param {?string} id ID of block that triggered this action.
 *     Null if called as a helper function in Tasks.move().
 * @return {boolean} True if there is a path.
 */
Tasks.Level2.isPath = function(direction, id) {

    var effectiveDirection = student.startDirection + direction;
    var square;
    var command;
  
    switch (Tasks.constrainDirection4(effectiveDirection)) {
      case Tasks.DirectionType.NORTH:
        square = Tasks.map[student.startLoc.y - 1] &&
            Tasks.map[student.startLoc.y - 1][student.startLoc.x];
        command = 'look_north';
        break;
      case Tasks.DirectionType.EAST:
        square = Tasks.map[student.startLoc.y][student.startLoc.x + 1];
        command = 'look_east';
        break;
      case Tasks.DirectionType.SOUTH:
        square = Tasks.map[student.startLoc.y + 1] &&
            Tasks.map[student.startLoc.y + 1][student.startLoc.x];
        command = 'look_south';
        break;
      case Tasks.DirectionType.WEST:
        square = Tasks.map[student.startLoc.y][student.startLoc.x - 1];
        command = 'look_west';
        break;
    }
    if (id) {
      log.push([command, id]);
    }
  
    return square !== Tasks.SquareType.WALL && square !== undefined;
};


/**
 * Schedule the animations for a move or turn.
 * @param {!Array.<number>} startPos X, Y and direction starting points.
 * @param {!Array.<number>} endPos X, Y and direction ending points.
 */
Tasks.Level2.Schedule = function(startPos, endPos) {

    var deltas = [(endPos[0] - startPos[0])/4, (endPos[1] - startPos[1])/4, (endPos[2] - startPos[2])/4];

    pidList.push(setTimeout(function() {
    Tasks.Level2.DisplayStudent(startPos[0] + deltas[0],
        startPos[1] + deltas[1],
        Tasks.constrainDirection16(startPos[2] + deltas[2]));
    }, Tasks.stepSpeed));

    pidList.push(setTimeout(function() {
        Tasks.Level2.DisplayStudent(startPos[0] + deltas[0] * 2,
            startPos[1] + deltas[1] * 2,
            Tasks.constrainDirection16(startPos[2] + deltas[2] * 2));
    }, Tasks.stepSpeed));

    pidList.push(setTimeout(function() {
    Tasks.Level2.DisplayStudent(startPos[0] + deltas[0] * 3,
        startPos[1] + deltas[1] * 3,
        Tasks.constrainDirection16(startPos[2] + deltas[2] * 3));
    }, Tasks.stepSpeed * 2));

    pidList.push(setTimeout(function() {
        Tasks.Level2.DisplayStudent(endPos[0], endPos[1],
            Tasks.constrainDirection16(endPos[2]));
        }, Tasks.stepSpeed * 3));
};

/**
 * Schedule the animations and sounds for a failed move.
 * @param {boolean} forward True if forward, false if backward.
 */
Tasks.Level2.ScheduleFail = function(forward) {

    var deltaX = 0;
    var deltaY = 0;

    switch (student.startDirection) {
        case Tasks.DirectionType.NORTH:
        deltaY = -1;
        break;
        case Tasks.DirectionType.EAST:
        deltaX = 1;
        break;
        case Tasks.DirectionType.SOUTH:
        deltaY = 1;
        break;
        case Tasks.DirectionType.WEST:
        deltaX = -1;
        break;
    }
    if (!forward) {
        deltaX = -deltaX;
        deltaY = -deltaY;
    }

    deltaX /= 4;
    deltaY /= 4;
    var direction16 = Tasks.constrainDirection16(student.startDirection * 4);

    Tasks.Level2.DisplayStudent(student.startLoc.x, student.startLoc.y + deltaY,
                        direction16);

    BlocklyGames.workspace.getAudioManager().play('fail', 0.5);
    pidList.push(setTimeout(function() {
        Tasks.Level2.DisplayStudent(student.startLoc.x, student.startLoc.y,
                            direction16);
    }, Tasks.stepSpeed));

    pidList.push(setTimeout(function() {
        Tasks.Level2.DisplayStudent(student.startLoc.x + deltaX,
                            student.startLoc.y + deltaY,
                            direction16);

        BlocklyGames.workspace.getAudioManager().play('fail', 0.5);
    }, Tasks.stepSpeed * 2));

    pidList.push(setTimeout(function() {
        Tasks.Level2.DisplayStudent(student.startLoc.x, student.startLoc.y, direction16);
    }, Tasks.stepSpeed * 3));
};

/**
 * Display one student at the specified location, facing the specified direction.
 * @param {number} x Horizontal grid (or fraction thereof).
 * @param {number} y Vertical grid (or fraction thereof).
 * @param {number} d Direction (0 - 15) or dance (16 - 17).
 * @param {number=} opt_angle Optional angle (in degrees) to rotate Pegman.
 */
Tasks.Level2.DisplayStudent = function(x, y, d, opt_angle) {
    
    var student = document.getElementById('student');
    student.setAttribute('x', x * Tasks.SQUARE_SIZE - d * Tasks.PEGMAN_WIDTH + 1);
    student.setAttribute('y', Tasks.SQUARE_SIZE * (y + 0.5) - Tasks.PEGMAN_HEIGHT / 2 - 8);

    if (opt_angle) {
        student.setAttribute('transform', 'rotate(' + opt_angle + ', ' +
            (x * Tasks.SQUARE_SIZE + Tasks.SQUARE_SIZE / 2) + ', ' +
            (y * Tasks.SQUARE_SIZE + Tasks.SQUARE_SIZE / 2) + ')');
    } else {
        student.setAttribute('transform', 'rotate(0, 0, 0)');
    }

    var clipRect = document.getElementById('clipRect');
    clipRect.setAttribute('x', x * Tasks.SQUARE_SIZE + 1);
    clipRect.setAttribute('y', student.getAttribute('y'));

    if(Tasks.Level2.isActivity(x, y)){
        Tasks.Level2.ActivityDone();
        Tasks.Level2.activity_.num++;
    }

    //Verify if student is at classroom and if the activities over
    if((x == finish_.x) && (y == finish_.y)){
        Tasks.Level2.Reset(false);
        Tasks.Level2.Execute();
    }
};

/**
 * Display the look icon at Pegman's current location,
 * in the specified direction.
 * @param {!Tasks.DirectionType} d Direction (0 - 3).
 */
Tasks.Level2.ScheduleLook = function(d, x, y) {

    switch (d) {
        case Tasks.DirectionType.NORTH:
        x += 0.5;
        break;
        case Tasks.DirectionType.EAST:
        x += 1;
        y += 0.5;
        break;
        case Tasks.DirectionType.SOUTH:
        x += 0.5;
        y += 1;
        break;
        case Tasks.DirectionType.WEST:
        y += 0.5;
        break;
    }
};

Tasks.Level2.NotDone = function(){
    return Tasks.Level2.activity_.num != 2;
};

Tasks.Level2.isActivity = function(x, y){

    if((x == Tasks.Level2.activity_.pos0.x) && (y == Tasks.Level2.activity_.pos0.y)){
        Tasks.Level2.activity_.pos0 = 0;
        return true;
    }
       
    
    if((x == Tasks.Level2.activity_.pos1.x) && (y == Tasks.Level2.activity_.pos1.y)){
        Tasks.Level2.activity_.pos1 = 0;
        return true;
    }
    
    return false;
};

Tasks.Level2.RemoveActivities = function(){

    var svg = document.getElementById('svgMaze');
    var actremove;

    for(var i=0 ; i<Tasks.Level2.activity_.num; i++){
        actremove = document.getElementById('activity');
        svg.removeChild(actremove);
    }

    actremove = document.getElementById('activity0');
    if(actremove)
        svg.removeChild(actremove);

    actremove = document.getElementById('activity1');
    if(actremove)
        svg.removeChild(actremove);

    Tasks.Level2.activity_.num = 0;
    Tasks.Level2.activity_.pos = 0;
};