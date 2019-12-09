'use strict';

goog.provide('Parallel.Level1');
goog.require('Blockly.FieldDropdown');
goog.require('BlocklyDialogs');
goog.require('BlocklyGames');
goog.require('BlocklyInterface');
goog.require('Parallel.Blocks');
goog.require('Parallel.soy');

goog.require('Parallel.Avatar');

/** Total of books */
var numbooks = 0;

/** STUDENTS */
var action_std1 = [];
var std1, action;
var start_ = [];
var finish;
var student = [];
var pidList = [];
var log = [];

// Parallel.Level1.taskActivate = false;
/**
 * Background and other elements
 */
Parallel.Level1.VIEW = {
    background: 'static/img/games/parallel/library.png',
    tiles: 'static/img/games/parallel/tiles_ufsm2.png',
    finishMarker: 'static/img/games/parallel/marker.png',
    book: 'static/img/games/parallel/book.png',
    skin: 'static/img/games/parallel/pegman.png',
    graph:false
};

/**
 * First function to be called
 */
Parallel.Level1.DrawMap = function(svg){

    //Create cenario:
    if (Parallel.Level1.VIEW.background) {
        var tile = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
        tile.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Parallel.Level1.VIEW.background);
        tile.setAttribute('height', Parallel.MAZE_HEIGHT);
        tile.setAttribute('width', Parallel.MAZE_WIDTH);
        tile.setAttribute('x', 0);
        tile.setAttribute('y', 0);
        svg.appendChild(tile);
    }

    if (Parallel.Level1.VIEW.graph) {
        // Draw the grid lines.
        // The grid lines are offset so that the lines pass through the centre of
        // each square.  A half-pixel offset is also added to as standard SVG
        // practice to avoid blurriness.
        var offset = Parallel.SQUARE_SIZE / 2 + 0.5;
        for (var k = 0; k < Parallel.ROWS; k++) {
          var h_line = document.createElementNS(Blockly.utils.dom.SVG_NS, 'line');
          h_line.setAttribute('y1', k * Parallel.SQUARE_SIZE + offset);
          h_line.setAttribute('x2', Parallel.MAZE_WIDTH);
          h_line.setAttribute('y2', k * Parallel.SQUARE_SIZE + offset);
          h_line.setAttribute('stroke', Parallel.Level1.VIEW.graph);
          h_line.setAttribute('stroke-width', 1);
          svg.appendChild(h_line);
        }
        for (var k = 0; k < Parallel.COLS; k++) {
          var v_line = document.createElementNS(Blockly.utils.dom.SVG_NS, 'line');
          v_line.setAttribute('x1', k * Parallel.SQUARE_SIZE + offset);
          v_line.setAttribute('x2', k * Parallel.SQUARE_SIZE + offset);
          v_line.setAttribute('y2', Parallel.MAZE_HEIGHT);
          v_line.setAttribute('stroke', Parallel.Level1.VIEW.graph);
          v_line.setAttribute('stroke-width', 1);
          svg.appendChild(v_line);
        }
    }

    // Return a value of '0' if the specified square is wall or out of bounds,
    // '1' otherwise (empty, start, finish).
    var normalize = function(x, y) {
        if (x < 0 || x >= Parallel.COLS || y < 0 || y >= Parallel.ROWS) {
            return '0';
        }
        return (Parallel.map[y][x] == Parallel.SquareType.WALL) ? '0' : '1';
    };

    // Compute and draw the tile for each square.
    var tileId = 0;
    for (var y = 0; y < Parallel.ROWS; y++) {
        for (var x = 0; x < Parallel.COLS; x++) {
            // Compute the tile shape.
            var tileShape = normalize(x, y) +
                normalize(x, y - 1) +  // North.
                normalize(x + 1, y) +  // West.
                normalize(x, y + 1) +  // South.
                normalize(x - 1, y);   // East.

            // Draw the tile.
            if (!Parallel.tile_SHAPES[tileShape]) {
            if (tileShape == '00000' && Math.random() > 0.3) {
                tileShape = 'null0';
            } else {
                tileShape = 'null' + Math.floor(1 + Math.random() * 4);
            }
            }
            var left = Parallel.tile_SHAPES[tileShape][0];
            var top = Parallel.tile_SHAPES[tileShape][1];
            
            // Tile's clipPath element.
            var tileClip = document.createElementNS(Blockly.utils.dom.SVG_NS, 'clipPath');
            tileClip.id = 'tileClipPath' + tileId;

            var clipRect = document.createElementNS(Blockly.utils.dom.SVG_NS, 'rect');
            clipRect.setAttribute('width', Parallel.SQUARE_SIZE);
            clipRect.setAttribute('height', Parallel.SQUARE_SIZE);

            clipRect.setAttribute('x', x * Parallel.SQUARE_SIZE);
            clipRect.setAttribute('y', y * Parallel.SQUARE_SIZE);

            tileClip.appendChild(clipRect);
            svg.appendChild(tileClip);

            // Tile sprite.
            var tile = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
            tile.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Parallel.Level1.VIEW.tiles);
            // Position the tile sprite relative to the clipRect.
            tile.setAttribute('height', Parallel.SQUARE_SIZE * 4);
            tile.setAttribute('width', Parallel.SQUARE_SIZE * 5);
            tile.setAttribute('clip-path', 'url(#tileClipPath' + tileId + ')');
            tile.setAttribute('x', (x - left) * Parallel.SQUARE_SIZE);
            tile.setAttribute('y', (y - top) * Parallel.SQUARE_SIZE);
            svg.appendChild(tile);
            tileId++;
        }
    }

    var cont_start = 0;
    // Locate the start and finish squares.
    for (var y = 0; y < Parallel.ROWS; y++) {
        for (var x = 0; x < Parallel.COLS; x++) {
            if (Parallel.map[y][x] == Parallel.SquareType.START) {
                start_[cont_start] = {x: x, y: y};
                var std = new Parallel.Avatar(cont_start, Parallel.startDirection, x, y, Parallel.Level1.VIEW.skin);
                student.push(std);
                cont_start++;
            } else if (Parallel.map[y][x] == Parallel.SquareType.FINISH) {
                finish = {x: x, y: y};
            }
        }
    }

    //Set the current student as the first student
    Parallel.currentStudent = student[0];
    Parallel.executionTime = document.getElementById("number");
};

/**
 * Add sprites of the books to the svg of the game
 */
Parallel.Level1.AddBooks = function(books){

    numbooks = books;
    var svg = document.getElementById('svgMaze');
    var bookname = 'book';
    var countername = 'booksCounter';
    var i;

    for(i=0; i < numbooks; i++){

        var book = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
        book.id = bookname.concat(i.toString());
        book.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Parallel.Level1.VIEW.book);
        book.setAttribute('height', 50);
        book.setAttribute('width', 45);
        svg.appendChild(book);
        
        //Move the initial list of books into position
        book.setAttribute('x', Parallel.SQUARE_SIZE * (0.6 + 0.5) -
            book.getAttribute('width') / 2);
        book.setAttribute('y', Parallel.SQUARE_SIZE * ((i/1.3) + 1.3) -
            book.getAttribute('height'));

        // Edit books counter
        var counter = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
        counter.id = countername.concat(i.toString());
        counter.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', 
        'static/img/games/parallel/books/'.concat(i.toString()).concat('.png'));
        counter.setAttribute('height', 60);
        counter.setAttribute('width', 80);
        counter.setAttribute('x', Parallel.SQUARE_SIZE * (0.1) -
        counter.getAttribute('width') / 2  + 35);
        counter.setAttribute('y', Parallel.SQUARE_SIZE * (8) -
        counter.getAttribute('height') + 10);
        svg.appendChild(counter);
    }

    // Edit books counter
    var counter = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
    counter.id = countername.concat(i.toString());
    counter.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', 
    'static/img/games/parallel/books/'.concat(i.toString()).concat('.png'));
    counter.setAttribute('height', 60);
    counter.setAttribute('width', 80);
    counter.setAttribute('x', Parallel.SQUARE_SIZE * (0.1) -
    counter.getAttribute('width') / 2  + 35);
    counter.setAttribute('y', Parallel.SQUARE_SIZE * (8) -
    counter.getAttribute('height') + 10);
    svg.appendChild(counter);

};

/**
 * Add sprites to the svg of the game
 */
Parallel.Level1.AddSprites = function(svg, document){

    // Create finish markers.
    var finishMarkers = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
    finishMarkers.id = 'finish';
    finishMarkers.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Parallel.Level1.VIEW.finishMarker);
    finishMarkers.setAttribute('height', 34);
    finishMarkers.setAttribute('width', 20);
    svg.appendChild(finishMarkers);

    //Estudante 1
    var pegmanClip = document.createElementNS(Blockly.utils.dom.SVG_NS, 'clipPath');
    pegmanClip.id = 'pegmanClipPath';
    var clipRect = document.createElementNS(Blockly.utils.dom.SVG_NS, 'rect');
    clipRect.id = 'clipRect0';
    clipRect.setAttribute('width', Parallel.PEGMAN_WIDTH);
    clipRect.setAttribute('height', Parallel.PEGMAN_HEIGHT);
    pegmanClip.appendChild(clipRect);
    svg.appendChild(pegmanClip);
  
    var pegmanIcon = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
    pegmanIcon.id = 'estudante0';
    pegmanIcon.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Parallel.Level1.VIEW.skin);
    pegmanIcon.setAttribute('height', Parallel.PEGMAN_HEIGHT);
    pegmanIcon.setAttribute('width', Parallel.PEGMAN_WIDTH * 21); // 49 * 21 = 1029
    pegmanIcon.setAttribute('clip-path', 'url(#pegmanClipPath)');
    svg.appendChild(pegmanIcon);

};

/**
 * Second function to be called
 */
Parallel.Level1.Reset = function(first){

    // Kill all tasks.
    for(var i = 0; i < pidList.length; i++) {
        window.clearTimeout(pidList[i]);
    }
    pidList = [];

    student[0].reset(Parallel.startDirection, start_[student[0].id].x, start_[student[0].id].y);

    student[0].time = 0;
    std1 = 0;
    action = 0;
    action_std1 = [];

    // Move the student into initial position
    if (first) {

        student[0].startDirection++;
        pidList.push(setTimeout(function() {
            Parallel.Level1.Schedule([student[0].startLoc.x, student[0].startLoc.y, student[0].startDirection * 4],
                        [student[0].startLoc.x, student[0].startLoc.y, student[0].startDirection * 4 - 4], student[0].id);
                        student[0].startDirection++;
        }, Parallel.stepSpeed * 4));

    } else 
        Parallel.Level1.DisplayStudent(0, student[0].startLoc.x, student[0].startLoc.y, Parallel.startDirection * 4);
       

    // Move the finish icons into positions.
    var finishIcon = document.getElementById('finish');
    finishIcon.setAttribute('x', Parallel.SQUARE_SIZE * (finish.x + 0.5) -
        finishIcon.getAttribute('width') / 2);
    finishIcon.setAttribute('y', Parallel.SQUARE_SIZE * (finish.y + 0.6) -
        finishIcon.getAttribute('height'));

};

Parallel.Level1.ExecuteFirst = function(){

    if (!('Interpreter' in window)) {
        // Interpreter lazy loads and hasn't arrived yet. Try again later.
        setTimeout(Parallel.execute, 250);
        return;
    }

    log = [];
    Blockly.selected && Blockly.selected.unselect();
    Parallel.result = Parallel.ResultType.UNSET;

    var code = Blockly.JavaScript.workspaceToCode(BlocklyGames.workspace);
    var interpreter = new Interpreter(code, Parallel.Level1.InitInterpreter);

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
        // Verify if the user finish the Parallel
        Parallel.result = Parallel.Level1.NotDone() ?
           Parallel.ResultType.FAILURE : Parallel.ResultType.SUCCESS;
    } catch (e) {
        // A boolean is thrown for normal termination.
        if (e === Infinity) {
            Parallel.result = Parallel.ResultType.TIMEOUT;
        } else if (e === false) {
            Parallel.result = Parallel.ResultType.ERROR;
        } else {
            // Syntax error, can't happen.
            Parallel.result = Parallel.ResultType.ERROR;
            alert(e);
        }
    }

    // Fast animation if execution is successful.  Slow otherwise.
    if (Parallel.result == Parallel.ResultType.SUCCESS) 
        log.push(['finish', null]);

    //Animate the transcript
    Parallel.Level1.Reset(false);
    Parallel.Level1.PreAnimate(0);
    pidList.push(setTimeout(Parallel.Level1.Animate, Parallel.stepSpeed));
};

Parallel.Level1.PreAnimate = function(id){

    var action = log.shift();

    if(!action) {
        BlocklyInterface.highlight(null);
        Parallel.levelHelp();
        return;
    }

    if(action[0] == 'student0')
        id = 1;

    switch(id){
        case 1:
            action_std1.push(action);
            break;
        case 0:
            log = [];
            Parallel.Level1.Reset(true);
            Parallel.levelHelp();
            return;
    }

    Parallel.Level1.PreAnimate(id);
};


Parallel.Level1.Execute = function(){

    if (!('Interpreter' in window)) {
        setTimeout(Parallel.execute, 250);
        return;
    }

    Parallel.result = Parallel.Level1.NotDone() ? Parallel.ResultType.FAILURE : Parallel.ResultType.SUCCESS;

    //Fast animation if execution is successful. Slow otherwise.
    if (Parallel.result == Parallel.ResultType.SUCCESS) {

        BlocklyInterface.saveToLocalStorage();

        Parallel.FinalCounter();
        Parallel.updateTime(0);
        BlocklyGames.workspace.getAudioManager().play('win', 0.5);
        setTimeout(BlocklyDialogs.congratulations, 1000);
        return;
    }

    pidList.push(setTimeout(Parallel.Level1.Animate, Parallel.stepSpeed));
};

Parallel.Level1.Animate = function(){

    var action1 = action_std1[std1++];
    if(!action1) {
        BlocklyInterface.highlight(null);
        Parallel.levelHelp();
        return;
    }
    if(action1)
        Parallel.Level1.AnimateMove(student[0], action1);

    Parallel.updateTime(student[0].time);
    pidList.push(setTimeout(Parallel.Level1.Animate, Parallel.stepSpeed * 4));
}

Parallel.Level1.AnimateMove = function(avatar, action){

    BlocklyInterface.highlight(action[1]);

    switch (action[0]) {
        case 'north': //value: 1
        Parallel.Level1.Schedule([avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4],
            [avatar.startLoc.x, avatar.startLoc.y - 1, avatar.startDirection * 4], avatar.id);
        avatar.startLoc.y--;
        avatar.time++;
        break;

        case 'east': //value 1
        Parallel.Level1.Schedule([avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4],
            [avatar.startLoc.x + 1, avatar.startLoc.y, avatar.startDirection * 4], avatar.id);
        avatar.startLoc.x++;
        avatar.time++;
        break;

        case 'south': //value 1
        Parallel.Level1.Schedule([avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4],
            [avatar.startLoc.x, avatar.startLoc.y + 1, avatar.startDirection * 4], avatar.id);
        avatar.startLoc.y++;
        avatar.time++;
        break;

        case 'west': //value 1
        Parallel.Level1.Schedule([avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4],
            [avatar.startLoc.x - 1, avatar.startLoc.y, avatar.startDirection * 4], avatar.id);
        avatar.startLoc.x--;
        avatar.time++;
        break;

        case 'look_north': //value 0.5
        Parallel.Level1.ScheduleLook(Parallel.DirectionType.NORTH, avatar.startLoc.x, avatar.startLoc.y);
        avatar.time = avatar.time + 0.5;
        break;

        case 'look_east': //value 0.5
        Parallel.Level1.ScheduleLook(Parallel.DirectionType.EAST, avatar.startLoc.x, avatar.startLoc.y);
        avatar.time = avatar.time + 0.5;
        break;
        
        case 'look_south': //value 0.5
        Parallel.Level1.ScheduleLook(Parallel.DirectionType.SOUTH, avatar.startLoc.x, avatar.startLoc.y);
        avatar.time = avatar.time + 0.5;
        break;
        
        case 'look_west': //value 0.5
        Parallel.Level1.ScheduleLook(Parallel.DirectionType.WEST, avatar.startLoc.x, avatar.startLoc.y);
        avatar.time = avatar.time + 0.5;
        break;
        
        case 'fail_forward':
        Parallel.Level1.ScheduleFail(true, avatar);
        break;
        
        case 'fail_backward':
        Parallel.Level1.ScheduleFail(false, avatar);
        break;
        
        case 'left': //value 1
        Parallel.Level1.Schedule([avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4],
            [avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4 - 4], avatar.id);
        avatar.startDirection = Parallel.constrainDirection4(avatar.startDirection - 1);
        avatar.time++;
        break;
        
        case 'right': //value 1
        Parallel.Level1.Schedule([avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4],
            [avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4 + 4], avatar.id);
        avatar.startDirection = Parallel.constrainDirection4(avatar.startDirection + 1);
        avatar.time++;
        break; 
        
        case 'finish':
        BlocklyInterface.saveToLocalStorage();
        setTimeout(BlocklyDialogs.congratulations, 1000);     
    }
}

/**
 * Inject the Parallel API into a JavaScript interpreter.
 * @param {!Interpreter} interpreter The JS Interpreter.
 * @param {!Interpreter.Object} scope Global scope.
 */
Parallel.Level1.InitInterpreter = function(interpreter, scope){
    
    // API
    var wrapper;

    wrapper = function(id) {
        Parallel.Level1.move(0, id, Parallel.currentStudent);
    };
    interpreter.setProperty(scope, 'moveForward',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        Parallel.Level1.move(2, id, Parallel.currentStudent);
    };
    interpreter.setProperty(scope, 'moveBackward',
        interpreter.createNativeFunction(wrapper));
        
    wrapper = function(id) {
        Parallel.Level1.turn(0, id, Parallel.currentStudent);
    };
    interpreter.setProperty(scope, 'turnLeft',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        Parallel.Level1.turn(1, id, Parallel.currentStudent);
    };
    interpreter.setProperty(scope, 'turnRight',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
    return Parallel.Level1.isPath(0, id, Parallel.currentStudent);
    };
    interpreter.setProperty(scope, 'isPathForward',
    interpreter.createNativeFunction(wrapper));

    //Students control:
    wrapper = function(id) {
        return Parallel.Level1.isStudent(0, id);
    };
    interpreter.setProperty(scope, 'isStudent0',
    interpreter.createNativeFunction(wrapper));
   
    wrapper = function(id) {
        return Parallel.Level1.isPath(1, id, Parallel.currentStudent);
    };
    interpreter.setProperty(scope, 'isPathRight',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        return Parallel.Level1.isPath(2, id, Parallel.currentStudent);
    };
    interpreter.setProperty(scope, 'isPathBackward',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        return Parallel.Level1.isPath(3, id, Parallel.currentStudent);
    };
    interpreter.setProperty(scope, 'isPathLeft',
        interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        return Parallel.Level1.NotDone();
    };
    interpreter.setProperty(scope, 'notDone',
        interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        return Parallel.Level1.ReturnBook(Parallel.currentStudent.startLoc.x, Parallel.currentStudent.startLoc.y);
    };
    interpreter.setProperty(scope, 'booksZero',
        interpreter.createNativeFunction(wrapper));

};

/**
 * Attempt to move pegman forward or backward.
 * @param {number} direction Direction to move (0 = forward, 2 = backward).
 * @param {string} id ID of block that triggered this action.
 * @throws {true} If the end of the maze is reached.
 * @throws {false} If Pegman collides with a wall.
 */
Parallel.Level1.move = function(direction, id, avatar) {

    if (!Parallel.Level1.isPath(direction, null, avatar)) {
      log.push(['fail_' + (direction ? 'backward' : 'forward'), id]);
      //throw false;
    }
    else{
        var effectiveDirection = avatar.startDirection + direction;
        var command;
        switch (Parallel.constrainDirection4(effectiveDirection)) {
        case Parallel.DirectionType.NORTH:
            avatar.startLoc.y--;
            command = 'north';
            break;
        case Parallel.DirectionType.EAST:
            avatar.startLoc.x++;
            command = 'east';
            break;
        case Parallel.DirectionType.SOUTH:
            avatar.startLoc.y++;
            command = 'south';
            break;
        case Parallel.DirectionType.WEST:
            avatar.startLoc.x--;
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
Parallel.Level1.turn = function(direction, id, avatar) {

    if (direction) {
      // Right turn (clockwise).
      avatar.startDirection++;
      log.push(['right', id]);
    } else {
      // Left turn (counterclockwise).
      avatar.startDirection--;
      log.push(['left', id]);
    }

    avatar.startDirection = Parallel.constrainDirection4(avatar.startDirection);
};

/**
 * Is there a path next to pegman?
 * @param {number} direction Direction to look
 *     (0 = forward, 1 = right, 2 = backward, 3 = left).
 * @param {?string} id ID of block that triggered this action.
 *     Null if called as a helper function in Parallel.move().
 * @return {boolean} True if there is a path.
 */
Parallel.Level1.isPath = function(direction, id, avatar) {

    var effectiveDirection = avatar.startDirection + direction;
    var square;
    var command;
  
    switch (Parallel.constrainDirection4(effectiveDirection)) {
      case Parallel.DirectionType.NORTH:
        square = Parallel.map[avatar.startLoc.y - 1] &&
            Parallel.map[avatar.startLoc.y - 1][avatar.startLoc.x];
        command = 'look_north';
        break;
      case Parallel.DirectionType.EAST:
        square = Parallel.map[avatar.startLoc.y][avatar.startLoc.x + 1];
        command = 'look_east';
        break;
      case Parallel.DirectionType.SOUTH:
        square = Parallel.map[avatar.startLoc.y + 1] &&
            Parallel.map[avatar.startLoc.y + 1][avatar.startLoc.x];
        command = 'look_south';
        break;
      case Parallel.DirectionType.WEST:
        square = Parallel.map[avatar.startLoc.y][avatar.startLoc.x - 1];
        command = 'look_west';
        break;
    }
    if (id) {
      log.push([command, id]);
    }
  
    return square !== Parallel.SquareType.WALL && square !== undefined;
};

/**
 * Find the student setted using the block
 * @param {student_id} Student ID
 * @return {boolean} True if it is a student.
 */
Parallel.Level1.isStudent = function(student_id, id) {

    var command = 'student0';
    
    if(id) {
        Parallel.currentStudent = student[0];
        log.push([command, id]);
    }

    if(command == undefined)
        return false;

    return true;
};


/**
 * Schedule the animations for a move or turn.
 * @param {!Array.<number>} startPos X, Y and direction starting points.
 * @param {!Array.<number>} endPos X, Y and direction ending points.
 */
Parallel.Level1.Schedule = function(startPos, endPos, est) {

    var deltas = [(endPos[0] - startPos[0])/4, (endPos[1] - startPos[1])/4, (endPos[2] - startPos[2])/4];

    pidList.push(setTimeout(function() {
    Parallel.Level1.DisplayStudent(est, startPos[0] + deltas[0],
        startPos[1] + deltas[1],
        Parallel.constrainDirection16(startPos[2] + deltas[2]));
    }, Parallel.stepSpeed));

    pidList.push(setTimeout(function() {
        Parallel.Level1.DisplayStudent(est, startPos[0] + deltas[0] * 2,
            startPos[1] + deltas[1] * 2,
            Parallel.constrainDirection16(startPos[2] + deltas[2] * 2));
    }, Parallel.stepSpeed));

    pidList.push(setTimeout(function() {
    Parallel.Level1.DisplayStudent(est, startPos[0] + deltas[0] * 3,
        startPos[1] + deltas[1] * 3,
        Parallel.constrainDirection16(startPos[2] + deltas[2] * 3));
    }, Parallel.stepSpeed * 2));

    pidList.push(setTimeout(function() {
        Parallel.Level1.DisplayStudent(est, endPos[0], endPos[1],
            Parallel.constrainDirection16(endPos[2]));
        }, Parallel.stepSpeed * 3));
};

/**
 * Schedule the animations and sounds for a failed move.
 * @param {boolean} forward True if forward, false if backward.
 */
Parallel.Level1.ScheduleFail = function(forward, avatar) {

    var deltaX = 0;
    var deltaY = 0;

    switch (avatar.startDirection) {
        case Parallel.DirectionType.NORTH:
        deltaY = -1;
        break;
        case Parallel.DirectionType.EAST:
        deltaX = 1;
        break;
        case Parallel.DirectionType.SOUTH:
        deltaY = 1;
        break;
        case Parallel.DirectionType.WEST:
        deltaX = -1;
        break;
    }
    if (!forward) {
        deltaX = -deltaX;
        deltaY = -deltaY;
    }

    deltaX /= 4;
    deltaY /= 4;
    var direction16 = Parallel.constrainDirection16(avatar.startDirection * 4);

    Parallel.Level1.DisplayStudent(avatar.id, avatar.startLoc.x + deltaX,
                        avatar.startLoc.y + deltaY,
                        direction16);

    BlocklyGames.workspace.getAudioManager().play('fail', 0.5);
    pidList.push(setTimeout(function() {
        Parallel.Level1.DisplayStudent(avatar.id, avatar.startLoc.x,
                            avatar.startLoc.y,
                            direction16);
    }, Parallel.stepSpeed));

    pidList.push(setTimeout(function() {
        Parallel.Level1.DisplayStudent(avatar.id, avatar.startLoc.x + deltaX,
                            avatar.startLoc.y + deltaY,
                            direction16);

        BlocklyGames.workspace.getAudioManager().play('fail', 0.5);
    }, Parallel.stepSpeed * 2));

    pidList.push(setTimeout(function() {
        Parallel.Level1.DisplayStudent(avatar.id, avatar.startLoc.x, avatar.startLoc.y, direction16);
    }, Parallel.stepSpeed * 3));
};

Parallel.Level1.ScheduleFinish = function(sound) {
    var direction16 = Parallel.constrainDirection16(Parallel.currentStudent.direction * 4);
    Parallel.Level1.DisplayStudent(Parallel.currentStudent.startLoc.x, Parallel.currentStudent.startLoc.y, 16);
    if (sound) {
      BlocklyGames.workspace.getAudioManager().play('win', 0.5);
    }
    pidList.push(setTimeout(function() {
        Parallel.Level1.DisplayStudent(Parallel.currentStudent.startLoc.x, Parallel.currentStudent.startLoc.y, 18);
      }, Parallel.stepSpeed));
    pidList.push(setTimeout(function() {
        Parallel.Level1.DisplayStudent(Parallel.currentStudent.startLoc.x, Parallel.currentStudent.startLoc.y, 16);
      }, Parallel.stepSpeed * 2));
    pidList.push(setTimeout(function() {
        Parallel.Level1.DisplayStudent(Parallel.currentStudent.startLoc.x, Parallel.currentStudent.startLoc.y, direction16);
      }, Parallel.stepSpeed * 3));
  };

/**
 * Display one student at the specified location, facing the specified direction.
 * @param {number} x Horizontal grid (or fraction thereof).
 * @param {number} y Vertical grid (or fraction thereof).
 * @param {number} d Direction (0 - 15) or dance (16 - 17).
 * @param {number=} opt_angle Optional angle (in degrees) to rotate Pegman.
 */
Parallel.Level1.DisplayStudent = function(est, x, y, d, opt_angle) {

    var std = 'estudante';
    var clip = 'clipRect';

    var estudante = document.getElementById(std.concat(est.toString()));
    estudante.setAttribute('x', x * Parallel.SQUARE_SIZE - d * Parallel.PEGMAN_WIDTH + 1);
    estudante.setAttribute('y', Parallel.SQUARE_SIZE * (y + 0.5) - Parallel.PEGMAN_HEIGHT / 2 - 8);

    if (opt_angle) {
        estudante.setAttribute('transform', 'rotate(' + opt_angle + ', ' +
            (x * Parallel.SQUARE_SIZE + Parallel.SQUARE_SIZE / 2) + ', ' +
            (y * Parallel.SQUARE_SIZE + Parallel.SQUARE_SIZE / 2) + ')');
    } else {
        estudante.setAttribute('transform', 'rotate(0, 0, 0)');
    }

    var clipRect = document.getElementById(clip.concat(est.toString()));
    clipRect.setAttribute('x', x * Parallel.SQUARE_SIZE + 1);
    clipRect.setAttribute('y', estudante.getAttribute('y'));

    if(Parallel.Level1.ReturnBook(x, y)){
        //Remove one book from the list and decrement the counter
        Parallel.Level1.ResetOneStd(est);
        Parallel.Level1.Execute();
    }
};


Parallel.Level1.ResetOneStd = function(est){

    for(var i = 0; i < pidList.length; i++) {
        window.clearTimeout(pidList[i]);
    }
    
    pidList = [];
    student[est].reset(Parallel.startDirection, start_[est].x, start_[est].y);
    Parallel.Level1.DisplayStudent(est, student[est].startLoc.x, student[est].startLoc.y, Parallel.startDirection * 4);
    std1 = 0;
};

/**
 * Display the look icon at Pegman's current location,
 * in the specified direction.
 * @param {!Parallel.DirectionType} d Direction (0 - 3).
 */
Parallel.Level1.ScheduleLook = function(d, x, y) {

    switch (d) {
        case Parallel.DirectionType.NORTH:
        x += 0.5;
        break;
        case Parallel.DirectionType.EAST:
        x += 1;
        y += 0.5;
        break;
        case Parallel.DirectionType.SOUTH:
        x += 0.5;
        y += 1;
        break;
        case Parallel.DirectionType.WEST:
        y += 0.5;
        break;
    }
};

/**
 * Verify if the student arrive on the library
 */
Parallel.Level1.ReturnBook = function(x, y){
    if( (x == finish.x ) && (finish.y == y) ){
        numbooks--;
        Parallel.Level1.RemoveBooks();
        return true;
    }      
    else{
        return false;
    }
        
}

/**
 * Remove the books one by one
 */
Parallel.Level1.RemoveBooks = function(){

    var book = 'book';
    var svg = (document.getElementById('svgMaze'));

    const bookremove = document.getElementById(book.concat(numbooks.toString()));
    svg.removeChild(bookremove);

    var bookcont = 'booksCounter';
    var id = numbooks + 1;
    const bookcontremove = document.getElementById(bookcont.concat(id.toString()));
    svg.removeChild(bookcontremove);
}

Parallel.Level1.RemoveAllBooks = function(){
    
    var svg = document.getElementById('svgMaze');
    var bookname = 'book';
    var countername = 'booksCounter';

    for(var i=numbooks-1; i >= 0; i--){

        const bookremove = document.getElementById(bookname.concat(i.toString()));
        svg.removeChild(bookremove);

        var id = i + 1;
        const bookcontremove = document.getElementById(countername.concat(id.toString()));
        svg.removeChild(bookcontremove);
    }

    const bookcontremove = document.getElementById(countername.concat('0'));
    svg.removeChild(bookcontremove);
}

Parallel.Level1.NotDone = function(){
    return numbooks != 0;
};