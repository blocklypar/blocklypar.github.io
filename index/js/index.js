/**
 * Blockly Games: Index
 *
 * Copyright 2014 Google Inc.
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
 * @fileoverview JavaScript for index page.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Index');

goog.require('BlocklyGames');
goog.require('Index.soy');


/**
 * Array of application names.
 */
Index.APPS = ['maze'];

/**
 * Initialize Blockly and the maze.  Called on page load.
 */
Index.init = function() {
  
  // Render the Soy template.
  document.body.innerHTML = Index.soy.start({}, null,
    {lang: BlocklyGames.LANG,
     html: BlocklyGames.IS_HTML,
     rtl: BlocklyGames.isRtl()});

  BlocklyGames.init();

  var languageMenu = document.getElementById('languageMenu');
  languageMenu.addEventListener('change', BlocklyGames.changeLanguage, true);

  var storedData = false;
  var levelsDone;
  
  levelsDone = 0;
  for (var j = 1; j <= BlocklyGames.MAX_LEVEL; j++) {
    if (BlocklyGames.loadFromLocalStorage(Index.APPS[0], j)) {
      storedData = true;
      levelsDone++;
    }
  }

  if (storedData) {
    var clearButtonPara = document.getElementById('clearDataPara');
    clearButtonPara.style.visibility = 'visible';
    BlocklyGames.bindClick('clearData', Index.clearData_);
  }

  // function animateFactory(app, angle) {
  //   return function() {
  //     Index.animateGauge(app, 0, angle);
  //   };
  // }
  
  // //Number of levels done
  // for (var i = 0; i < levelsDone; i++) {
  //   var denominator = i == 0 ? 1 : BlocklyGames.MAX_LEVEL;
  //   var angle = i / denominator * 270;
  //   if (angle) {
  //     setTimeout(animateFactory(Index.APPS[0], angle), 1500);
  //   } else {
  //     // Remove gauge if zero, since IE renders a stub.
  //     var path = document.getElementById('gauge-' + Index.APPS[0]);
  //     path.parentNode.removeChild(path);
  //   }
  // }
};

window.addEventListener('load', Index.init, false);

/**
 * Animate a gauge from zero to a target value.
 * @param {string} app Name of application.
 * @param {number} cur Current angle of gauge in degrees.
 * @param {number} max Final angle of gauge in degrees.
 */
Index.animateGauge = function(app, cur, max) {
  var step = 4;
  cur += step;
  Index.drawGauge(app, Math.min(cur, max));
  if (cur < max) {
    setTimeout(function() {
      Index.animateGauge(app, cur, max);
    }, 10);
  }
};

/**
 * Draw the gauge for an app.
 * @param {string} app Name of application.
 * @param {number} angle Angle of gauge in degrees.
 */
Index.drawGauge = function(app, angle) {
  var xOffset = 150;
  var yOffset = 60;
  var radius = 52.75;
  var theta = (angle - 45) / 180 * Math.PI;
  var x = xOffset - Math.cos(theta) * radius;
  var y = yOffset - Math.sin(theta) * radius;
  var flag = angle > 180 ? 1 : 0;
  // The starting point is at angle zero.
  theta = (0 - 45) / 180 * Math.PI;
  var mx = xOffset - Math.cos(theta) * radius;
  var my = yOffset - Math.sin(theta) * radius;
  var path = document.getElementById('gauge-' + app);
  path.setAttribute('d',
      ['M ' + mx + ',' + my + ' A', radius, radius, 0, flag, 1, x, y].join(' '));
};

/**
 * Clear all stored data.
 * @private
 */
Index.clearData_ = function() {
  if (!confirm(BlocklyGames.getMsg('Index_clear'))) {
    return;
  }
  for (var j = 1; j <= BlocklyGames.MAX_LEVEL; j++) {
    delete window.localStorage[Index.APPS[0] + j];
  }
  location.reload();
};
