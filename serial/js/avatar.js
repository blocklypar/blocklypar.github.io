'use strict';

goog.provide('Serial.Avatar');


Serial.Avatar = function(id, startDirection, startLocX, startLocY, sprite){
    this.id = id;
    //If the avatar can't move because the task is over
    this.locked = false;
    //If its already active by one block
    this.active = 0;
    //Execution time of the avatar actions
    this.time = 0;
    this.startLoc = {x: startLocX, y: startLocY};
    this.sprite = sprite;
    this.startDirection = startDirection;
    this.interpreter = null;
    this.reset(this.startDirection, this.startLoc.x, this.startLoc.y);
    
};

Serial.Avatar.prototype.reset = function(startDirection, startLocX, startLocY) {

    this.locked = false;
    this.startLoc = {x: startLocX, y: startLocY};
    this.startDirection = startDirection;
};