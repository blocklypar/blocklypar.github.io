'use strict';

goog.provide('Parallel.Level4');
goog.require('Blockly.FieldDropdown');
goog.require('BlocklyDialogs');
goog.require('BlocklyGames');
goog.require('BlocklyInterface');
goog.require('Parallel.Blocks');
goog.require('Parallel.soy');

goog.require('Parallel.Avatar');

var bookslist_ = [];
var start_ = [];
var finish;
var student = [];
var pidList = [];
var log = [];

var booksCounterNum;

//****** STUDENTS */
var studentsActive = [];
var action_std1 = [];
var action_std2 = [];
var action_std3 = [];
var std1, std2, std3, action;
var action_ = [];
var executionTime = 0;

/**
 * The student currently executing the code
 */
Parallel.Level4.currentStudent = null;
// Parallel.Level4.taskActivate = false;
/**
 * Background and other elements
 */
Parallel.Level4.VIEW = {
    background: 'maze/library.png',
    tiles: 'maze/tiles_ufsm.png',
    finishMarker: 'maze/marker.png',
    book: 'maze/book.png',
    skin: 'maze/pegman.png',
    graph:false
};

/**
 * First function to be called
 */
Parallel.Level4.DrawMap = function(svg){

    //Create cenario:
    if (Parallel.Level4.VIEW.background) {
        var tile = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
        tile.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Parallel.Level4.VIEW.background);
        tile.setAttribute('height', Parallel.MAZE_HEIGHT);
        tile.setAttribute('width', Parallel.MAZE_WIDTH);
        tile.setAttribute('x', 0);
        tile.setAttribute('y', 0);
        svg.appendChild(tile);
    }

    if (Parallel.Level4.VIEW.graph) {
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
          h_line.setAttribute('stroke', Parallel.Level4.VIEW.graph);
          h_line.setAttribute('stroke-width', 1);
          svg.appendChild(h_line);
        }
        for (var k = 0; k < Parallel.COLS; k++) {
          var v_line = document.createElementNS(Blockly.utils.dom.SVG_NS, 'line');
          v_line.setAttribute('x1', k * Parallel.SQUARE_SIZE + offset);
          v_line.setAttribute('x2', k * Parallel.SQUARE_SIZE + offset);
          v_line.setAttribute('y2', Parallel.MAZE_HEIGHT);
          v_line.setAttribute('stroke', Parallel.Level4.VIEW.graph);
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
            tile.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Parallel.Level4.VIEW.tiles);
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
                var std = new Parallel.Avatar(cont_start, Parallel.startDirection, x, y, Parallel.Level4.VIEW.skin);
                student.push(std);
                cont_start++;
            } else if (Parallel.map[y][x] == Parallel.SquareType.FINISH) {
                finish = {x: x, y: y};
            }
        }
    }

    //Initialize the list of books full
    var cont_book = 0;
    for(var i=0.9; i<10.9; i++){
        bookslist_[cont_book++] = {x: 0.6, y: i/1.3};
    }
    booksCounterNum = 8;

    //Set the current student as the first student
    Parallel.Level4.currentStudent = student[0];
    Parallel.executionTime = document.getElementById("number");
};

/**
 * Add sprites of the books to the svg of the game
 */
Parallel.Level4.AddBooks = function(){

    booksCounterNum = 8;
    var svg = document.getElementById('svgMaze');

    // Edit books list
    var books = [];
    var book = 'book';

    for(var i=0; i < booksCounterNum; i++){
        books[i] = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
        books[i].id = book.concat(i.toString());
        books[i].setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Parallel.Level4.VIEW.book);
        books[i].setAttribute('height', 50);
        books[i].setAttribute('width', 45);
        svg.appendChild(books[i]);
        
        //Move the initial list of books into position
        books[i].setAttribute('x', Parallel.SQUARE_SIZE * (bookslist_[i].x + 0.5) -
            books[i].getAttribute('width') / 2);
        books[i].setAttribute('y', Parallel.SQUARE_SIZE * (bookslist_[i].y + 0.6) -
            books[i].getAttribute('height'));

    }

    // Edit books counter
    var bookscount = [];
    var name = 'booksCounter';
    
    for(var i=0; i<=booksCounterNum; i++){

        bookscount[i] = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
        bookscount[i].id = name.concat(i.toString());
        bookscount[i].setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', 'maze/books/'.concat(i.toString()).concat('.png'));
        bookscount[i].setAttribute('height', 60);
        bookscount[i].setAttribute('width', 80);
        bookscount[i].setAttribute('x', Parallel.SQUARE_SIZE * (0.1) -
        bookscount[i].getAttribute('width') / 2  + 35);
        bookscount[i].setAttribute('y', Parallel.SQUARE_SIZE * (8) -
        bookscount[i].getAttribute('height') + 10);
        svg.appendChild(bookscount[i]);
    }

    student[0].active = 0;
    student[1].active = 0;
    student[2].active = 0;
};

/**
 * Add sprites to the svg of the game
 */
Parallel.Level4.AddSprites = function(svg, document){

    // Create finish markers.
    var finishMarkers = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
    finishMarkers.id = 'finish';
    finishMarkers.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Parallel.Level4.VIEW.finishMarker);
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
    pegmanIcon.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Parallel.Level4.VIEW.skin);
    pegmanIcon.setAttribute('height', Parallel.PEGMAN_HEIGHT);
    pegmanIcon.setAttribute('width', Parallel.PEGMAN_WIDTH * 21); // 49 * 21 = 1029
    pegmanIcon.setAttribute('clip-path', 'url(#pegmanClipPath)');
    svg.appendChild(pegmanIcon);

    //Estudante 2
    var estudanteClip2 = document.createElementNS(Blockly.utils.dom.SVG_NS, 'clipPath');
    estudanteClip2.id = 'estudanteClip2Path';
    var clipRect2 = document.createElementNS(Blockly.utils.dom.SVG_NS, 'rect');
    clipRect2.id = 'clipRect1';
    clipRect2.setAttribute('width', Parallel.PEGMAN_WIDTH);
    clipRect2.setAttribute('height', Parallel.PEGMAN_HEIGHT);
    estudanteClip2.appendChild(clipRect2);
    svg.appendChild(estudanteClip2);

    var estudante2 = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
    estudante2.id = 'estudante1';
    estudante2.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Parallel.Level4.VIEW.skin);
    estudante2.setAttribute('height', Parallel.PEGMAN_HEIGHT);
    estudante2.setAttribute('width', Parallel.PEGMAN_WIDTH*21); // 49 * 21 = 1029
    estudante2.setAttribute('clip-path', 'url(#estudanteClip2Path)');
    svg.appendChild(estudante2);

    //Estudante 3
    var estudanteClip3 = document.createElementNS(Blockly.utils.dom.SVG_NS, 'clipPath');
    estudanteClip3.id = 'estudanteClip3Path';
    var clipRect3 = document.createElementNS(Blockly.utils.dom.SVG_NS, 'rect');
    clipRect3.id = 'clipRect2';
    clipRect3.setAttribute('width', Parallel.PEGMAN_WIDTH);
    clipRect3.setAttribute('height', Parallel.PEGMAN_HEIGHT);
    estudanteClip3.appendChild(clipRect3);
    svg.appendChild(estudanteClip3);

    var estudante3 = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');
    estudante3.id = 'estudante2';
    estudante3.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Parallel.Level4.VIEW.skin);
    estudante3.setAttribute('height', Parallel.PEGMAN_HEIGHT);
    estudante3.setAttribute('width', Parallel.PEGMAN_WIDTH*21); // 49 * 21 = 1029
    estudante3.setAttribute('clip-path', 'url(#estudanteClip3Path)');
    svg.appendChild(estudante3);

};

/**
 * Second function to be called
 */
Parallel.Level4.Reset = function(first){

    // Kill all tasks.
    for(var i = 0; i < pidList.length; i++) {
        window.clearTimeout(pidList[i]);
    }
    pidList = [];

    student[0].reset(Parallel.startDirection, start_[student[0].id].x, start_[student[0].id].y);
    student[1].reset(Parallel.startDirection, start_[student[1].id].x, start_[student[1].id].y);
    student[2].reset(Parallel.startDirection, start_[student[2].id].x, start_[student[2].id].y);
    student[0].time = 0;
    student[1].time = 0;
    student[2].time = 0;
    std1 = 0;
    std2 = 0;
    std3 = 0;
    action = 0;
    action_std1 = [];
    action_std2 = [];
    action_std3 = [];
    action_ = [];

    // Move all students into initial position
    if (first) {
        // Student 1
        student[0].startDirection++;
        pidList.push(setTimeout(function() {
            Parallel.Level4.Schedule([student[0].startLoc.x, student[0].startLoc.y, student[0].startDirection * 4],
                        [student[0].startLoc.x, student[0].startLoc.y, student[0].startDirection * 4 - 4], student[0].id);
                        student[0].startDirection++;
        }, Parallel.stepSpeed * 4));

        // Student 2   
        student[1].startDirection++;
        pidList.push(setTimeout(function() {
            Parallel.Level4.Schedule([student[1].startLoc.x, student[1].startLoc.y, student[1].startDirection * 4],
                        [student[1].startLoc.x, student[1].startLoc.y, student[1].startDirection * 4 - 4], student[1].id);
                        student[1].startDirection++;
        }, Parallel.stepSpeed * 4));
        
        // Student 3  
        student[2].startDirection++;
        pidList.push(setTimeout(function() {
            Parallel.Level4.Schedule([student[2].startLoc.x, student[2].startLoc.y, student[2].startDirection * 4],
                        [student[2].startLoc.x, student[2].startLoc.y, student[2].startDirection * 4 - 4], student[2].id);
                        student[2].startDirection++;
        }, Parallel.stepSpeed * 4));

    } else {
        Parallel.Level4.DisplayStudent(0, student[0].startLoc.x, student[0].startLoc.y, Parallel.startDirection * 4);
        Parallel.Level4.DisplayStudent(1, student[1].startLoc.x, student[1].startLoc.y, Parallel.startDirection * 4);
        Parallel.Level4.DisplayStudent(2, student[2].startLoc.x, student[2].startLoc.y, Parallel.startDirection * 4);
    }

    // Move the finish icons into positions.
    var finishIcon = document.getElementById('finish');
    finishIcon.setAttribute('x', Parallel.SQUARE_SIZE * (finish.x + 0.5) -
        finishIcon.getAttribute('width') / 2);
    finishIcon.setAttribute('y', Parallel.SQUARE_SIZE * (finish.y + 0.6) -
        finishIcon.getAttribute('height'));

};

Parallel.Level4.ExecuteFirst = function(){

    if (!('Interpreter' in window)) {
        // Interpreter lazy loads and hasn't arrived yet. Try again later.
        setTimeout(Parallel.execute, 250);
        return;
    }

    log = [];
    Blockly.selected && Blockly.selected.unselect();
    Parallel.result = Parallel.ResultType.UNSET;

    var code = Blockly.JavaScript.workspaceToCode(BlocklyGames.workspace);
    var interpreter = new Interpreter(code, Parallel.Level4.InitInterpreter);

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
        Parallel.result = Parallel.Level4.NotDone() ?
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
    Parallel.Level4.Reset(false);
    Parallel.Level4.PreAnimate(0);
    pidList.push(setTimeout(Parallel.Level4.Animate, 150));
};

Parallel.Level4.Execute = function(){

    if (!('Interpreter' in window)) {
        setTimeout(Parallel.execute, 250);
        return;
    }

    Parallel.result = Parallel.Level4.NotDone() ? Parallel.ResultType.FAILURE : Parallel.ResultType.SUCCESS;

    //Fast animation if execution is successful. Slow otherwise.
    if (Parallel.result == Parallel.ResultType.SUCCESS) {

        BlocklyInterface.saveToLocalStorage();
        BlocklyGames.workspace.getAudioManager().play('win', 0.5);
        Parallel.FinalCounter();
        Parallel.updateTime(0);

        setTimeout(BlocklyDialogs.congratulations, 1000);
        return;
    }

    pidList.push(setTimeout(Parallel.Level4.Animate, 150));
};

Parallel.Level4.PreAnimate = function(id){

    var action = log.shift();

    if(!action) {
        BlocklyInterface.highlight(null);
        Parallel.levelHelp();
        return;
    }

    if(action[0] == 'student0')
        id = 1;
    else if(action[0] == 'student1')
        id = 2;
    else if(action[0] == 'student2')
        id = 3;

    switch(id){
        case 1:
            action_std1.push(action);
            break;
        case 2:
            action_std2.push(action);
            break;
        case 3:
            action_std3.push(action);
            break;
        default:
            action_.push(action);
    }

    Parallel.Level4.PreAnimate(id);
}

Parallel.Level4.Animate = function(){

    var action1 = action_std1[++std1];
    var action2 = action_std2[++std2];
    var action3 = action_std3[++std3];

    if(action_[action]){
        action++;
        return;
    }

    if(action1){
        Parallel.Level4.currentStudent = student[0];
        Parallel.Level4.AnimateMove(student[0], action1);
    }    

    if(action2){
        Parallel.Level4.currentStudent = student[1];
        Parallel.Level4.AnimateMove(student[1], action2);
    }   

    if(action3){
        Parallel.Level4.currentStudent = student[2];
        Parallel.Level4.AnimateMove(student[2], action3);
    }   

    Parallel.updateTime(((student[0].time + student[1].time + student[2].time)/(student[0].active + student[1].active + student[2].active)).toFixed(2));
    pidList.push(setTimeout(Parallel.Level4.Animate, Parallel.stepSpeed * 4));
}

Parallel.Level4.AnimateMove = function(avatar, action){

    BlocklyInterface.highlight(action[1]);

    switch (action[0]) {
        case 'north': //value: 1
        Parallel.Level4.Schedule([avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4],
            [avatar.startLoc.x, avatar.startLoc.y - 1, avatar.startDirection * 4], avatar.id);
        avatar.startLoc.y--;
        avatar.time++;
        break;

        case 'east': //value 1
        Parallel.Level4.Schedule([avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4],
            [avatar.startLoc.x + 1, avatar.startLoc.y, avatar.startDirection * 4], avatar.id);
        avatar.startLoc.x++;
        avatar.time++;
        break;

        case 'south': //value 1
        Parallel.Level4.Schedule([avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4],
            [avatar.startLoc.x, avatar.startLoc.y + 1, avatar.startDirection * 4], avatar.id);
        avatar.startLoc.y++;
        avatar.time++;
        break;

        case 'west': //value 1
        Parallel.Level4.Schedule([avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4],
            [avatar.startLoc.x - 1, avatar.startLoc.y, avatar.startDirection * 4], avatar.id);
        avatar.startLoc.x--;
        avatar.time++;
        break;

        case 'look_north': //value 0.5
        Parallel.Level4.ScheduleLook(Parallel.DirectionType.NORTH, avatar.startLoc.x, avatar.startLoc.y);
        avatar.time = avatar.time + 0.5;
        break;

        case 'look_east': //value 0.5
        Parallel.Level4.ScheduleLook(Parallel.DirectionType.EAST, avatar.startLoc.x, avatar.startLoc.y);
        avatar.time = avatar.time + 0.5;
        break;
        
        case 'look_south': //value 0.5
        Parallel.Level4.ScheduleLook(Parallel.DirectionType.SOUTH, avatar.startLoc.x, avatar.startLoc.y);
        avatar.time = avatar.time + 0.5;
        break;
        
        case 'look_west': //value 0.5
        Parallel.Level4.ScheduleLook(Parallel.DirectionType.WEST, avatar.startLoc.x, avatar.startLoc.y);
        avatar.time = avatar.time + 0.5;
        break;
        
        case 'fail_forward':
        Parallel.Level4.ScheduleFail(true, avatar);
        break;
        
        case 'fail_backward':
        Parallel.Level4.ScheduleFail(false, avatar);
        break;
        
        case 'left': //value 1
        Parallel.Level4.Schedule([avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4],
            [avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4 - 4], avatar.id);
        avatar.startDirection = Parallel.constrainDirection4(avatar.startDirection - 1);
        avatar.time++;
        break;
        
        case 'right': //value 1
        Parallel.Level4.Schedule([avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4],
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
 * Inject the Maze API into a JavaScript interpreter.
 * @param {!Interpreter} interpreter The JS Interpreter.
 * @param {!Interpreter.Object} scope Global scope.
 */
Parallel.Level4.InitInterpreter = function(interpreter, scope){

    // API
    var wrapper;

    wrapper = function(id) {
        Parallel.Level4.move(0, id, Parallel.Level4.currentStudent);
    };
    interpreter.setProperty(scope, 'moveForward',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        Parallel.Level4.move(2, id, Parallel.Level4.currentStudent);
    };
    interpreter.setProperty(scope, 'moveBackward',
        interpreter.createNativeFunction(wrapper));
        
    wrapper = function(id) {
        Parallel.Level4.turn(0, id, Parallel.Level4.currentStudent);
    };
    interpreter.setProperty(scope, 'turnLeft',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        Parallel.Level4.turn(1, id, Parallel.Level4.currentStudent);
    };
    interpreter.setProperty(scope, 'turnRight',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
    return Parallel.Level4.isPath(0, id, Parallel.Level4.currentStudent);
    };
    interpreter.setProperty(scope, 'isPathForward',
    interpreter.createNativeFunction(wrapper));

    //Students control:
    wrapper = function(id) {
        return Parallel.Level4.isStudent(0, id);
    };
    interpreter.setProperty(scope, 'isStudent0',
    interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        return Parallel.Level4.isStudent(1, id);
    };
    interpreter.setProperty(scope, 'isStudent1',
    interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        return Parallel.Level4.isStudent(2, id);
    };
    interpreter.setProperty(scope, 'isStudent2',
    interpreter.createNativeFunction(wrapper));
   
    wrapper = function(id) {
        return Parallel.Level4.isPath(1, id, Parallel.Level4.currentStudent);
    };
    interpreter.setProperty(scope, 'isPathRight',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        return Parallel.Level4.isPath(2, id, Parallel.Level4.currentStudent);
    };
    interpreter.setProperty(scope, 'isPathBackward',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        return Parallel.Level4.isPath(3, id, Parallel.Level4.currentStudent);
    };
    interpreter.setProperty(scope, 'isPathLeft',
        interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        return Parallel.Level4.NotDone();
    };
    interpreter.setProperty(scope, 'notDone',
        interpreter.createNativeFunction(wrapper));

    //Books == 0
    wrapper = function() {
        return Parallel.Level4.ReturnBook(Parallel.Level4.currentStudent.startLoc.x, Parallel.Level4.currentStudent.startLoc.y);
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
Parallel.Level4.move = function(direction, id, avatar) {

    if (!Parallel.Level4.isPath(direction, null, avatar)) {
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
Parallel.Level4.turn = function(direction, id, avatar) {

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
Parallel.Level4.isPath = function(direction, id, avatar) {

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
Parallel.Level4.isStudent = function(student_id, id) {
    var command;

    switch(student_id) {
      case 0:
        command = 'student0';
        Parallel.Level4.currentStudent = student[0];
        student[0].active = 1;
        break;
      case 1:
        command = 'student1';
        Parallel.Level4.currentStudent = student[1];
        student[1].active = 1;
        break;
      case 2:
        command = 'student2';
        Parallel.Level4.currentStudent = student[2];
        student[2].active = 1;
        break;
      default:
        break;
    }

    if(id) {
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
Parallel.Level4.Schedule = function(startPos, endPos, est) {

    var deltas = [(endPos[0] - startPos[0])/4, (endPos[1] - startPos[1])/4, (endPos[2] - startPos[2])/4];

    pidList.push(setTimeout(function() {
    Parallel.Level4.DisplayStudent(est, startPos[0] + deltas[0],
        startPos[1] + deltas[1],
        Parallel.constrainDirection16(startPos[2] + deltas[2]));
    }, Parallel.stepSpeed));

    pidList.push(setTimeout(function() {
        Parallel.Level4.DisplayStudent(est, startPos[0] + deltas[0] * 2,
            startPos[1] + deltas[1] * 2,
            Parallel.constrainDirection16(startPos[2] + deltas[2] * 2));
    }, Parallel.stepSpeed));

    pidList.push(setTimeout(function() {
    Parallel.Level4.DisplayStudent(est, startPos[0] + deltas[0] * 3,
        startPos[1] + deltas[1] * 3,
        Parallel.constrainDirection16(startPos[2] + deltas[2] * 3));
    }, Parallel.stepSpeed * 2));

    pidList.push(setTimeout(function() {
        Parallel.Level4.DisplayStudent(est, endPos[0], endPos[1],
            Parallel.constrainDirection16(endPos[2]));
        }, Parallel.stepSpeed * 3));

};

/**
 * Schedule the animations and sounds for a failed move.
 * @param {boolean} forward True if forward, false if backward.
 */
Parallel.Level4.ScheduleFail = function(forward, avatar) {

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

    Parallel.Level4.DisplayStudent(avatar.id, avatar.startLoc.x + deltaX,
                        avatar.startLoc.y + deltaY,
                        direction16);

    BlocklyGames.workspace.getAudioManager().play('fail', 0.5);
    pidList.push(setTimeout(function() {
        Parallel.Level4.DisplayStudent(avatar.id, avatar.startLoc.x,
                            avatar.startLoc.y,
                            direction16);
    }, Parallel.stepSpeed));

    pidList.push(setTimeout(function() {
        Parallel.Level4.DisplayStudent(avatar.id, avatar.startLoc.x + deltaX,
                            avatar.startLoc.y + deltaY,
                            direction16);

        BlocklyGames.workspace.getAudioManager().play('fail', 0.5);
    }, Parallel.stepSpeed * 2));

    pidList.push(setTimeout(function() {
        Parallel.Level4.DisplayStudent(avatar.id, avatar.startLoc.x, avatar.startLoc.y, direction16);
    }, Parallel.stepSpeed * 3));
};

Parallel.Level4.ScheduleFinish = function(sound) {
    var direction16 = Parallel.constrainDirection16(Parallel.Level4.currentStudent.direction * 4);
    Parallel.Level4.DisplayStudent(Parallel.Level4.currentStudent.startLoc.x, Parallel.Level4.currentStudent.startLoc.y, 16);
    if (sound) {
      BlocklyGames.workspace.getAudioManager().play('win', 0.5);
    }
    Parallel.stepSpeed = speed;  // Slow down victory animation a bit.
    pidList.push(setTimeout(function() {
        Parallel.Level4.DisplayStudent(Parallel.Level4.currentStudent.startLoc.x, Parallel.Level4.currentStudent.startLoc.y, 18);
      }, Parallel.stepSpeed));
    pidList.push(setTimeout(function() {
        Parallel.Level4.DisplayStudent(Parallel.Level4.currentStudent.startLoc.x, Parallel.Level4.currentStudent.startLoc.y, 16);
      }, Parallel.stepSpeed * 2));
    pidList.push(setTimeout(function() {
        Parallel.Level4.DisplayStudent(Parallel.Level4.currentStudent.startLoc.x, Parallel.Level4.currentStudent.startLoc.y, direction16);
      }, Parallel.stepSpeed * 3));
  };

/**
 * Display one student at the specified location, facing the specified direction.
 * @param {number} x Horizontal grid (or fraction thereof).
 * @param {number} y Vertical grid (or fraction thereof).
 * @param {number} d Direction (0 - 15) or dance (16 - 17).
 * @param {number=} opt_angle Optional angle (in degrees) to rotate Pegman.
 */
Parallel.Level4.DisplayStudent = function(est, x, y, d, opt_angle) {

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

    var svg = document.getElementById('svgMaze');

    if(Parallel.Level4.ReturnBook(x, y)){
        //Move the student to the initial position and run the code again
        Parallel.Level4.ResetOneStd(est);
        //Remove one book from the list and decrement the counter
        booksCounterNum--;
        Parallel.Level4.RemoveBooks(svg, document);
        Parallel.Level4.Execute();
    }
};


Parallel.Level4.ResetOneStd = function(est){

    for(var i = 0; i < pidList.length; i++) {
        window.clearTimeout(pidList[i]);
    }
    
    pidList = [];
    
    if(est == 0){
        std1 = 0;
        student[0].reset(Parallel.startDirection, start_[student[0].id].x, start_[student[0].id].y);
        Parallel.Level4.DisplayStudent(0, student[0].startLoc.x, student[0].startLoc.y, Parallel.startDirection * 4);
    }else if(est == 1){
        std2 = 0;
        student[1].reset(Parallel.startDirection, start_[student[1].id].x, start_[student[1].id].y);
        Parallel.Level4.DisplayStudent(1, student[1].startLoc.x, student[1].startLoc.y, Parallel.startDirection * 4);
    }else if(est == 2){
        std3 = 0;
        student[2].reset(Parallel.startDirection, start_[student[2].id].x, start_[student[2].id].y);
        Parallel.Level4.DisplayStudent(2, student[2].startLoc.x, student[2].startLoc.y, Parallel.startDirection * 4);
    }

};

/**
 * Display the look icon at Pegman's current location,
 * in the specified direction.
 * @param {!Parallel.DirectionType} d Direction (0 - 3).
 */
Parallel.Level4.ScheduleLook = function(d, x, y) {

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
Parallel.Level4.ReturnBook = function(x, y){
    if( (x == finish.x ) && (finish.y == y) )
        return true;

    return false;
}

/**
 * Remove the books one by one
 */
Parallel.Level4.RemoveBooks = function(svg, document){
    var book = 'book';
    const bookremove = document.getElementById(book.concat(booksCounterNum.toString()));
    svg.removeChild(bookremove);

    var bookcont = 'booksCounter';
    var id = booksCounterNum + 1;
    const bookcontremove = document.getElementById(bookcont.concat(id.toString()));
    svg.removeChild(bookcontremove);
}

Parallel.Level4.NotDone = function(){
    return booksCounterNum != 0;
};