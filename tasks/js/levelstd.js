'use strict';

goog.provide('Tasks.LevelStd');
goog.require('Blockly.FieldDropdown');
goog.require('BlocklyDialogs');
goog.require('BlocklyGames');
goog.require('BlocklyInterface');
goog.require('Tasks.Blocks');
goog.require('Tasks.soy');

goog.require('Tasks.Avatar');
goog.require('Tasks.Activity');

var start_;
var finish_;
var student;
var activities = [];
var pidList = [];
var log = [];
var action_std1 = [];
var std1, action;
var action_ = [];
var num = 0;
var list_pos = 0;

/**
 * Background and other elements
 */
Tasks.LevelStd.VIEW = {
    background: 'static/img/games/tasks/level123.png',
    tiles: 'static/img/games/tasks/tiles_ufsm2.png',
    finishMarker: 'static/img/games/tasks/classroom.png',
    activity: 'static/img/games/tasks/activity.png',
    skin: 'static/img/games/tasks/pegman.png',
    graph:false
};

/**
 * Add activity to the list of activities completed
 * Remove the respective activity of the maze
 */
Tasks.LevelStd.ActivityDone = function(id){

    var svg = document.getElementById('svgMaze');

    var activity = document.createElementNS(Blockly.utils.dom.SVG_NS, 'image');

    //Put an activity into the list
    activity.id = 'activity';
    activity.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', Tasks.Level.VIEW.activity);
    activity.setAttribute('height', 45);
    activity.setAttribute('width', 35);
    svg.appendChild(activity);

    //Move the activity into the list
    activity.setAttribute('x', Tasks.SQUARE_SIZE * (0.3 + 0.8) -
    activity.getAttribute('width') / 2);
    list_pos = list_pos + 1;
    activity.setAttribute('y', Tasks.SQUARE_SIZE * (list_pos + 2.5) -
    activity.getAttribute('height'));

    //Remove activity from the maze
    activities[id].active = false;
    var name = 'activity';
    var svg = document.getElementById('svgMaze');
    activity = document.getElementById(name.concat(id.toString()));
    svg.removeChild(activity);

};

/**
 * Second function to be called
 */
Tasks.LevelStd.Reset = function(first){

    // Kill all activities.
    for(var i = 0; i < pidList.length; i++) {
        window.clearTimeout(pidList[i]);
    }
    pidList = [];

    student.reset(Tasks.startDirection, start_.x, start_.y);

    std1 = 0;
    action = 0;
    action_std1 = [];
    action_ = [];

    // Move the student into initial position
    if (first) {
        student.startDirection++;
        pidList.push(setTimeout(function() {
            Tasks.LevelStd.Schedule([student.startLoc.x, student.startLoc.y, student.startDirection * 4],
                        [student.startLoc.x, student.startLoc.y, student.startDirection * 4 - 4]);
                        student.startDirection++;
        }, Tasks.stepSpeed * 4));
    } else {
        Tasks.LevelStd.DisplayStudent(student.startLoc.x, student.startLoc.y, Tasks.startDirection * 4);
    }

    // Move the finish icon into position
    var finishIcon = document.getElementById('finish');
    finishIcon.setAttribute('x', Tasks.SQUARE_SIZE * (finish_.x + 0.5) -
        finishIcon.getAttribute('width') / 2);
    finishIcon.setAttribute('y', Tasks.SQUARE_SIZE * (finish_.y + 0.6) -
        finishIcon.getAttribute('height') / 2);

};

Tasks.LevelStd.ExecuteFirst = function(){

    if (!('Interpreter' in window)) {
        // Interpreter lazy loads and hasn't arrived yet. Try again later.
        setTimeout(Tasks.execute, 250);
        return;
    }

    log = [];
    Blockly.selected && Blockly.selected.unselect();
    Tasks.result = Tasks.ResultType.UNSET;

    var code = Blockly.JavaScript.workspaceToCode(BlocklyGames.workspace);
    var interpreter = new Interpreter(code, Tasks.LevelStd.InitInterpreter);

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
        Tasks.result = Tasks.LevelStd.NotDone() ?
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

    // Fast animation if execution is successful.  Slow otherwise.
    if (Tasks.result == Tasks.ResultType.SUCCESS) 
        log.push(['finish', null]);

    //Animate the transcript
    Tasks.LevelStd.Reset(false);
    Tasks.LevelStd.PreAnimate(0);
    pidList.push(setTimeout(Tasks.LevelStd.Animate, 100));
};

Tasks.LevelStd.Execute = function(){

    if (!('Interpreter' in window)) {
        setTimeout(Tasks.execute, 250);
        return;
    }

    Tasks.result = Tasks.LevelStd.NotDone() ? Tasks.ResultType.FAILURE : Tasks.ResultType.SUCCESS;

    //Fast animation if execution is successful. Slow otherwise.
    if (Tasks.result == Tasks.ResultType.SUCCESS) {
        BlocklyGames.workspace.getAudioManager().play('win', 0.5);
        BlocklyInterface.saveToLocalStorage();
        setTimeout(BlocklyDialogs.congratulations, 1000);
        return;
    }

    pidList.push(setTimeout(Tasks.LevelStd.Animate, 100));
};

Tasks.LevelStd.PreAnimate = function(id){

    var action = log.shift();

    if(!action) {
        BlocklyInterface.highlight(null);
        Tasks.levelHelp();
        return;
    }

    if(action[0] == 'student0')
        id = 1;

    switch(id){
        case 1:
            action_std1.push(action);
            break;
        default:
            action_.push(action);
    }

    Tasks.LevelStd.PreAnimate(id);
};

Tasks.LevelStd.Animate = function(){

    var action1 = action_std1[std1++];

    if(action1)
        Tasks.LevelStd.AnimateMove(student, action1);

    pidList.push(setTimeout(Tasks.LevelStd.Animate, Tasks.stepSpeed * 4));
}

Tasks.LevelStd.AnimateMove = function(avatar, action){

    BlocklyInterface.highlight(action[1]);

    switch (action[0]) {
        case 'north': //value: 1
        Tasks.LevelStd.Schedule([avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4],
            [avatar.startLoc.x, avatar.startLoc.y - 1, avatar.startDirection * 4], avatar.id);
        avatar.startLoc.y--;
        break;

        case 'east': //value 1
        Tasks.LevelStd.Schedule([avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4],
            [avatar.startLoc.x + 1, avatar.startLoc.y, avatar.startDirection * 4], avatar.id);
        avatar.startLoc.x++;
        break;

        case 'south': //value 1
        Tasks.LevelStd.Schedule([avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4],
            [avatar.startLoc.x, avatar.startLoc.y + 1, avatar.startDirection * 4], avatar.id);
        avatar.startLoc.y++;
        break;

        case 'west': //value 1
        Tasks.LevelStd.Schedule([avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4],
            [avatar.startLoc.x - 1, avatar.startLoc.y, avatar.startDirection * 4], avatar.id);
        avatar.startLoc.x--;
        break;

        case 'look_north': //value 0.5
        Tasks.LevelStd.ScheduleLook(Tasks.DirectionType.NORTH, avatar.startLoc.x, avatar.startLoc.y);
        break;

        case 'look_east': //value 0.5
        Tasks.LevelStd.ScheduleLook(Tasks.DirectionType.EAST, avatar.startLoc.x, avatar.startLoc.y);
        break;
        
        case 'look_south': //value 0.5
        Tasks.LevelStd.ScheduleLook(Tasks.DirectionType.SOUTH, avatar.startLoc.x, avatar.startLoc.y);
        break;
        
        case 'look_west': //value 0.5
        Tasks.LevelStd.ScheduleLook(Tasks.DirectionType.WEST, avatar.startLoc.x, avatar.startLoc.y);
        break;
        
        case 'fail_forward':
        Tasks.LevelStd.ScheduleFail(true, avatar);
        break;
        
        case 'fail_backward':
        Tasks.LevelStd.ScheduleFail(false, avatar);
        break;
        
        case 'left': //value 1
        Tasks.LevelStd.Schedule([avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4],
            [avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4 - 4], avatar.id);
        avatar.startDirection = Tasks.constrainDirection4(avatar.startDirection - 1);
        break;
        
        case 'right': //value 1
        Tasks.LevelStd.Schedule([avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4],
            [avatar.startLoc.x, avatar.startLoc.y, avatar.startDirection * 4 + 4], avatar.id);
        avatar.startDirection = Tasks.constrainDirection4(avatar.startDirection + 1);
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
Tasks.LevelStd.InitInterpreter = function(interpreter, scope){

    // API
    var wrapper;

    wrapper = function(id) {
        Tasks.LevelStd.move(0, id);
    };
    interpreter.setProperty(scope, 'moveForward',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        Tasks.LevelStd.move(2, id);
    };
    interpreter.setProperty(scope, 'moveBackward',
        interpreter.createNativeFunction(wrapper));
        
    wrapper = function(id) {
        Tasks.LevelStd.turn(0, id);
    };
    interpreter.setProperty(scope, 'turnLeft',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        Tasks.LevelStd.turn(1, id);
    };
    interpreter.setProperty(scope, 'turnRight',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
    return Tasks.LevelStd.isPath(0, id);
    };
    interpreter.setProperty(scope, 'isPathForward',
    interpreter.createNativeFunction(wrapper));
   
    wrapper = function(id) {
        return Tasks.LevelStd.isPath(1, id);
    };
    interpreter.setProperty(scope, 'isPathRight',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        return Tasks.LevelStd.isPath(2, id);
    };
    interpreter.setProperty(scope, 'isPathBackward',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        return Tasks.LevelStd.isPath(3, id);
    };
    interpreter.setProperty(scope, 'isPathLeft',
        interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        return Tasks.LevelStd.NotDone();
    };
    interpreter.setProperty(scope, 'notDone',
        interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        // Tasks.Level7.activityActivate = true;
        // return Tasks.LevelStd.GetActivity(student.startLoc.x, student.startLoc.y);
    };
    interpreter.setProperty(scope, '2activitiesComplete',
        interpreter.createNativeFunction(wrapper));

    //Students control:
    wrapper = function(id) {
        return Tasks.LevelStd.isStudent(0, id);
    };
    interpreter.setProperty(scope, 'isStudent0',
    interpreter.createNativeFunction(wrapper));
};

/**
 * Find the student setted using the block
 * @param {student_id} Student ID
 * @return {boolean} True if it is a student.
 */
Tasks.LevelStd.isStudent = function(student_id, id) {

    var command = 'student0';
       
    if(id) {
        log.push([command, id]);
    }

    if(command == undefined)
        return false;

    return true;
};

/**
 * Attempt to move pegman forward or backward.
 * @param {number} direction Direction to move (0 = forward, 2 = backward).
 * @param {string} id ID of block that triggered this action.
 * @throws {true} If the end of the maze is reached.
 * @throws {false} If Pegman collides with a wall.
 */
Tasks.LevelStd.move = function(direction, id) {

    if (!Tasks.LevelStd.isPath(direction, null)) {
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
Tasks.LevelStd.turn = function(direction, id) {

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
Tasks.LevelStd.isPath = function(direction, id) {

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
Tasks.LevelStd.Schedule = function(startPos, endPos) {

    var deltas = [(endPos[0] - startPos[0])/4, (endPos[1] - startPos[1])/4, (endPos[2] - startPos[2])/4];

    pidList.push(setTimeout(function() {
    Tasks.LevelStd.DisplayStudent(startPos[0] + deltas[0],
        startPos[1] + deltas[1],
        Tasks.constrainDirection16(startPos[2] + deltas[2]));
    }, Tasks.stepSpeed));

    pidList.push(setTimeout(function() {
        Tasks.LevelStd.DisplayStudent(startPos[0] + deltas[0] * 2,
            startPos[1] + deltas[1] * 2,
            Tasks.constrainDirection16(startPos[2] + deltas[2] * 2));
    }, Tasks.stepSpeed));

    pidList.push(setTimeout(function() {
    Tasks.LevelStd.DisplayStudent(startPos[0] + deltas[0] * 3,
        startPos[1] + deltas[1] * 3,
        Tasks.constrainDirection16(startPos[2] + deltas[2] * 3));
    }, Tasks.stepSpeed * 2));

    pidList.push(setTimeout(function() {
        Tasks.LevelStd.DisplayStudent(endPos[0], endPos[1],
            Tasks.constrainDirection16(endPos[2]));
        }, Tasks.stepSpeed * 3));
};

/**
 * Schedule the animations and sounds for a failed move.
 * @param {boolean} forward True if forward, false if backward.
 */
Tasks.LevelStd.ScheduleFail = function(forward) {

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

    Tasks.LevelStd.DisplayStudent(student.startLoc.x, student.startLoc.y + deltaY,
                        direction16);

    BlocklyGames.workspace.getAudioManager().play('fail', 0.5);
    pidList.push(setTimeout(function() {
        Tasks.LevelStd.DisplayStudent(student.startLoc.x, student.startLoc.y,
                            direction16);
    }, Tasks.stepSpeed));

    pidList.push(setTimeout(function() {
        Tasks.LevelStd.DisplayStudent(student.startLoc.x + deltaX,
                            student.startLoc.y + deltaY,
                            direction16);

        BlocklyGames.workspace.getAudioManager().play('fail', 0.5);
    }, Tasks.stepSpeed * 2));

    pidList.push(setTimeout(function() {
        Tasks.LevelStd.DisplayStudent(student.startLoc.x, student.startLoc.y, direction16);
    }, Tasks.stepSpeed * 3));
};

/**
 * Display one student at the specified location, facing the specified direction.
 * @param {number} x Horizontal grid (or fraction thereof).
 * @param {number} y Vertical grid (or fraction thereof).
 * @param {number} d Direction (0 - 15) or dance (16 - 17).
 * @param {number=} opt_angle Optional angle (in degrees) to rotate Pegman.
 */
Tasks.LevelStd.DisplayStudent = function(x, y, d, opt_angle) {
    
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

    //Verify if is activity
    if(Tasks.Level.isActivity(x, y))
        num++;

    //Verify if student is at classroom and if the activities over
    if((x == finish_.x) && (y == finish_.y)){
        Tasks.LevelStd.Reset(false);
        Tasks.LevelStd.Execute();
    }
};

/**
 * Display the look icon at Pegman's current location,
 * in the specified direction.
 * @param {!Tasks.DirectionType} d Direction (0 - 3).
 */
Tasks.LevelStd.ScheduleLook = function(d, x, y) {

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

Tasks.LevelStd.NotDone = function(){
    return num != 2;
};

Tasks.LevelStd.isActivity = function(x, y){

    for(var i=0; i<activities.length; i++){
        if(activities[i].active && (x == activities[i].pos.x) && (y == activities[i].pos.y)){
            Tasks.Level.ActivityDone(i);
            return true;
        }    
    }
    
    return false;
};
