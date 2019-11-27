// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Maze.soy.
 */

goog.provide('Maze.soy');

goog.require('soy');
goog.require('soydata');
goog.require('BlocklyGames.soy');


Maze.soy.messages = function(opt_data, opt_ignored, opt_ijData) {
  return BlocklyGames.soy.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">cho\u010F dopredu</span><span id="Maze_turnLeft">oto\u010D sa v\u013Eavo</span><span id="Maze_turnRight">oto\u010D sa vpravo</span><span id="Maze_doCode">urob</span><span id="Maze_elseCode">inak</span><span id="Maze_helpIfElse">Pr\u00EDkaz ak-inak urob\u00ED bu\u010F jedno alebo druh\u00E9.</span><span id="Maze_pathAhead">ak je cesta pred</span><span id="Maze_pathLeft">ak je cesta v\u013Eavo</span><span id="Maze_pathRight">ak je cesta vpravo</span><span id="Maze_repeatUntil">opakuj k\u00FDm nebude</span><span id="Maze_moveForwardTooltip">Posun hr\u00E1\u010Da o jednu d\u013A\u017Eku dopredu.</span><span id="Maze_turnTooltip">Oto\u010Denie hr\u00E1\u010Da o 90\u00B0 v\u013Eavo \u010Di vpravo.</span><span id="Maze_ifTooltip">Ak je t\u00FDm smerom cesta, vykonaj pr\u00EDkazy.</span><span id="Maze_ifelseTooltip">Ak je t\u00FDm smerom cesta, vykonaj prv\u00FD blok pr\u00EDkazov.\\nInak vykonaj druh\u00FD blok pr\u00EDkazov.</span><span id="Maze_whileTooltip">Opakuj pr\u00EDkazy vo vn\u00FAtri bloku, \\na\u017E k\u00FDm nepr\u00EDde\u0161 do cie\u013Ea. </span><span id="Maze_capacity0">Zostalo ti %0 blokov.</span><span id="Maze_capacity1">M\u00E1\u0161 u\u017E iba %1 blok.</span><span id="Maze_capacity2">Zostalo ti e\u0161te %2 blokov.</span></div>';
};
if (goog.DEBUG) {
  Maze.soy.messages.soyTemplateName = 'Maze.soy.messages';
}


Maze.soy.start = function(opt_data, opt_ignored, opt_ijData) {
  return Maze.soy.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1>' + BlocklyGames.soy.titleSpan({appName: 'Bludisko'}, null, opt_ijData) + BlocklyGames.soy.levelLinks({level: opt_ijData.level, maxLevel: opt_ijData.maxLevel, lang: opt_ijData.lang, suffix: '&skin=' + soy.$$escapeHtml(opt_ijData.skin)}, null, opt_ijData) + '</h1></td><td class="farSide"><select id="languageMenu"></select>&nbsp;<button id="linkButton" title="Ulo\u017Ei\u0165 a zdie\u013Ea\u0165 odkaz na tento program."><img src="common/1x1.gif" class="link icon21"></button>&nbsp;<button id="pegmanButton"><img src="common/1x1.gif"><span id="pegmanButtonArrow"></span></button></td></tr></table><div id="visualization"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="400px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><td><button id="runButton" class="primary" title="Postavi\u010Dka vykon\u00E1 to, \u010Do je nap\u00EDsan\u00E9 na bloku."><img src="common/1x1.gif" class="run icon21"> Spusti\u0165</button><button id="resetButton" class="primary" style="display: none" title="Presun\u00FA\u0165 hr\u00E1\u010Da sp\u00E4\u0165 na za\u010Diatok bludiska."><img src="common/1x1.gif" class="stop icon21"> Odznova</button></td></tr></table>' + Maze.soy.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + BlocklyGames.soy.dialog(null, null, opt_ijData) + BlocklyGames.soy.doneDialog(null, null, opt_ijData) + BlocklyGames.soy.abortDialog(null, null, opt_ijData) + BlocklyGames.soy.storageDialog(null, null, opt_ijData) + ((opt_ijData.level == 1) ? '<div id="dialogHelpStack" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>Program je postupnos\u0165 blokov. Posp\u00E1jaj nieko\u013Eko blokov \'vpred\' a pom\u00F4\u017E mi d\u00F4js\u0165 do cie\u013Ea.</td><td valign="top"><img src="maze/help_stack.png" class="mirrorImg" height=63 width=136></td></tr></table></div><div id="dialogHelpOneTopBlock" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>V tejto \u00FArovni m\u00E1\u0161 na bielej ploche posklada\u0165 v\u0161etky diely sklada\u010Dky.<div id="sampleOneTopBlock" class="readonly"></div></td></tr></table></div><div id="dialogHelpRun" class="dialogHiddenContent"><table><tr><td>Spusti svoj program a uvid\u00ED\u0161, \u010Do sa stane.</td><td rowspan=2><img src="common/help.png"></td></tr><tr><td><div><img src="maze/help_run.png" class="mirrorImg" height=27 width=141></div></td></tr></table></div>' : (opt_ijData.level == 2) ? '<div id="dialogHelpReset" class="dialogHiddenContent"><table><tr><td>Tvoj program nepre\u0161iel cez bludisko. Stla\u010D "Obnovi\u0165" a sk\u00FAs to znova.</td><td rowspan=2><img src="common/help.png"></td></tr><tr><td><div><img src="maze/help_run.png" class="mirrorImg" height=27 width=141></div></td></tr></table></div>' : (opt_ijData.level == 3 || opt_ijData.level == 4) ? ((opt_ijData.level == 3) ? '<div id="dialogHelpRepeat" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>Dosiahni cie\u013E pou\u017Eit\u00EDm len dvoch blokov. Na zopakovanie bloku pou\u017Ei blok \'opakuj\'.</td><td><img src="common/help.png"></td></tr></table></div>' : '') + '<div id="dialogHelpCapacity" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>Vyu\u017Eil si v\u0161etky bloky dostupn\u00E9 v tejto \u00FArovni. Ak chce\u0161 nov\u00FD blok, odstr\u00E1\u0148 najprv nejak\u00FD existuj\u00FAci.</td></tr></table></div><div id="dialogHelpRepeatMany" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>Do opakovacieho bloku m\u00F4\u017Ee\u0161 umiestni\u0165 aj viac ako jeden blok.</td><td><img src="common/help.png"></td></tr></table></div>' : (opt_ijData.level == 5) ? '<div id="dialogHelpSkins" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td width="95%">Zvo\u013E si svojho ob\u013E\u00FAben\u00E9ho hr\u00E1\u010Da z ponuky.</td><td><img src="maze/help_up.png"></td></tr></table></div><div id="dialogHelpIf" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>Rozhodovac\u00ED blok \'ak\' urob\u00ED nie\u010Do len v pr\u00EDpade, \u017Ee je splnen\u00E1 podmienka. Sk\u00FAs oto\u010Denie v\u013Eavo, ak je cesta na\u013Eavo.</td><td><img src="common/help.png"></td></tr></table></div><div id="dialogHelpWallFollow" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>Zvl\u00E1dne\u0161 aj toto komplikovan\u00E9 bludisko?\nSk\u00FAs \u00EDs\u0165 popri \u013Eavej stene. Len pre pokro\u010Dil\u00FDch program\u00E1torov!' + BlocklyGames.soy.ok(null, null, opt_ijData) + '</td></tr></table></div><div id="dialogHelpMenu" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td id="helpMenuText">Klikni na %1 v rozhodovacom bloku a nastav podmienku.</td><td><img src="common/help.png"></td></tr></table></div>' : '');
};
if (goog.DEBUG) {
  Maze.soy.start.soyTemplateName = 'Maze.soy.start';
}


Maze.soy.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;" xmlns="https://developers.google.com/blockly/xml"><block type="maze_moveForward"></block><block type="maze_turn"><field name="DIR">turnLeft</field></block><block type="maze_turn"><field name="DIR">turnRight</field></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level > 4) ? '<block type="maze_if"><field name="DIR">isPathLeft</field></block>' : '') : '') + '</xml>';
};
if (goog.DEBUG) {
  Maze.soy.toolbox.soyTemplateName = 'Maze.soy.toolbox';
}