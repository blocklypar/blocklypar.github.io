'use strict';

goog.provide('Tasks.Activity');


Tasks.Activity = function(id, posx, posy, active){
    this.id = id;
    this.pos = {x: posx, y: posy};
    this.active = active;
};