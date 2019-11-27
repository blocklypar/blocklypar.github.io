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
Index.APPS = ['maze', 'parallel', 'tasks', 'serial'];

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
  var levelsDone = [];
  for (var i = 0; i < Index.APPS.length; i++) {
    levelsDone[i] = 0;
    for (var j = 1; j <= BlocklyGames.MAX_LEVEL; j++) {
      if (BlocklyGames.loadFromLocalStorage(Index.APPS[i], j)) {
        storedData = true;
        levelsDone[i]++;
      }
    }
  }
  if (storedData) {
    var clearButtonPara = document.getElementById('clearDataPara');
    clearButtonPara.style.visibility = 'visible';
    BlocklyGames.bindClick('clearData', Index.clearData_);
  }

};

window.addEventListener('load', Index.init, false);

/**
 * Clear all stored data.
 * @private
 */
Index.clearData_ = function() {
  if (!confirm(BlocklyGames.getMsg('Index_clear'))) {
    return;
  }
  for (var i = 0; i < Index.APPS.length; i++) {
    for (var j = 1; j <= BlocklyGames.MAX_LEVEL; j++) {
      delete window.localStorage[Index.APPS[i] + j];
    }
  }
  location.reload();
};