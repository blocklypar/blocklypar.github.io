// Automatically generated file.  Do not edit!
'use strict';function f(a,b){function c(){}c.prototype=b.prototype;a.A=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.v=function(d,e,m){for(var g=Array(arguments.length-2),k=2;k<arguments.length;k++)g[k-2]=arguments[k];return b.prototype[e].apply(d,g)}};
var h={},l={en:"English"},n="ace ar fa he mzn ps ur".split(" "),p=window.BlocklyGamesLang,q=window.BlocklyGamesLanguages,r=!!window.location.pathname.match(/\.html$/),t=Number,u,v=window.location.search.match(/[?&]level=([^&]+)/);u=v?decodeURIComponent(v[1].replace(/\+/g,"%20")):"NaN";t(u);
function w(){document.title=document.getElementById("title").textContent;document.dir=-1!=n.indexOf(p)?"rtl":"ltr";document.head.parentElement.setAttribute("lang",p);var a=document.getElementById("languageMenu");if(a){for(var b=[],c=0;c<q.length;c++){var d=q[c];b.push([l[d],d])}b.sort(function(m,g){return m[0]>g[0]?1:m[0]<g[0]?-1:0});for(c=a.options.length=0;c<b.length;c++){var e=b[c];d=e[1];e=new Option(e[0],d);d==p&&(e.selected=!0);a.options.add(e)}1>=a.options.length&&(a.style.display="none")}for(c=
1;7>=c;c++)a=document.getElementById("level"+c),b=!!x(h.u,c),a&&b&&(a.className+=" level_done");(c=document.querySelector('meta[name="viewport"]'))&&725>screen.availWidth&&c.setAttribute("content","width=725, initial-scale=.35, user-scalable=no");setTimeout(y,1)}
function z(){var a=document.getElementById("languageMenu");a=encodeURIComponent(a.options[a.selectedIndex].value);var b=window.location.search;b=1>=b.length?"?lang="+a:b.match(/[?&]lang=[^&]*/)?b.replace(/([?&]lang=)[^&]*/,"$1"+a):b.replace(/\?/,"?lang="+a+"&");window.location=window.location.protocol+"//"+window.location.host+window.location.pathname+b}function x(a,b){try{var c=window.localStorage[a+b]}catch(d){}return c}
function y(){if(!r){window.GoogleAnalyticsObject="GoogleAnalyticsFunction";var a=function(c){(a.q=a.q||[]).push(arguments)};window.GoogleAnalyticsFunction=a;a.l=1*new Date;var b=document.createElement("script");b.async=1;b.src="//www.google-analytics.com/analytics.js";document.head.appendChild(b);a("create","UA-50448074-1","auto");a("send","pageview")}};function A(){this.j=""}A.prototype.toString=function(){return"SafeScript{"+this.j+"}"};A.prototype.g=function(a){this.j=a};(new A).g("");function B(){this.o=""}B.prototype.toString=function(){return"SafeStyle{"+this.o+"}"};B.prototype.g=function(a){this.o=a};(new B).g("");function C(){this.m=""}C.prototype.toString=function(){return"SafeStyleSheet{"+this.m+"}"};C.prototype.g=function(a){this.m=a};(new C).g("");function D(){this.i=""}D.prototype.toString=function(){return"SafeHtml{"+this.i+"}"};D.prototype.g=function(a){this.i=a};(new D).g("<!DOCTYPE html>");(new D).g("");(new D).g("<br>");var E={w:!0};function F(){throw Error("Do not instantiate directly");}F.prototype.h=null;F.prototype.toString=function(){return this.content};function G(){if(null!=p)switch(p.h){case 1:return 1;case -1:return-1;case 0:return 0}return null}function H(){F.call(this)}f(H,F);H.prototype.s=E;
var I=function(a){function b(){}b.prototype=a.prototype;return function(c,d){var e=new b;e.content=String(c);void 0!==d&&(e.h=d);return e}}(H),J={"\x00":"&#0;",'"':"&quot;","&":"&amp;","'":"&#39;","<":"&lt;",">":"&gt;","\t":"&#9;","\n":"&#10;","\x0B":"&#11;","\f":"&#12;","\r":"&#13;"," ":"&#32;","-":"&#45;","/":"&#47;","=":"&#61;","`":"&#96;","\u0085":"&#133;","\u00a0":"&#160;","\u2028":"&#8232;","\u2029":"&#8233;"};function K(a){return J[a]}var L=/[\x00\x22\x26\x27\x3c\x3e]/g;var M=["maze"];
window.addEventListener("load",function(){var a=document.body;var b=null!=p&&p.s===E?p:I(String(String(p)).replace(L,K),G());a.innerHTML='<div style="display: none"><span id="title">BlocklyPar</span><span id="Index_clear">Delete all your solutions?</span></div><div class="header"><a href="javascript:window.location.reload(true)" class="logo"><img id="banner" src="index/blocklypar.png" width="100" alt="Blockly Games"></a><div class="nav-spacer"></div><div class="header-right"><a class="color-one" href="about.html">ABOUT</a>&nbsp<a class="language"><select id="languageMenu"></select></a></div></div><div class="main"><div id="play"><h1>A game to introduce parallel programming!</h1><p><br/><br/><a id="button" href="maze.html?lang='+b+
'"> PLAY ALL</a></p></div><div id="games"><p><table align="center" cellspacing="20"><tr><th>Serial</th><th>Introduction to tasks</th><th>Parallel</th></tr><tr><td><a href="" class="logo"><img id="banner" src="index/jogo0.png" width="150" alt="Blockly Games" title="Game 1"></a>      </td><td><a href="" class="logo"><img id="banner" src="index/jogo1.png" width="150" alt="Blockly Games" title="Game 2"></a>      </td><td><a href="" class="logo"><img id="banner" src="index/jogo2.png" width="150" alt="Blockly Games" title="Game 3"></a>      </td></tr></table></p></div></div><div id="clearDataPara" style="visibility: hidden"><a class="text-p">Want to start over?<button class="secondary" id="clearData">CLEAR DATA</span></button></a></div><script src="common/back.js">\x3c/script>';
w();document.getElementById("languageMenu").addEventListener("change",z,!0);a=!1;for(b=1;7>=b;b++)x(M[0],b)&&(a=!0);if(a){document.getElementById("clearDataPara").style.visibility="visible";a="clearData";b=N;if(!a)throw TypeError("Element not found: "+a);"string"==typeof a&&(a=document.getElementById(a));a.addEventListener("click",b,!0);a.addEventListener("touchend",b,!0)}},!1);
function N(){var a=confirm,b;(b=document.getElementById("Index_clear"))?(b=b.textContent,b=b.replace(/\\n/g,"\n")):b=null;if(a(null===b?"[Unknown message: Index_clear]":b)){for(a=1;7>=a;a++)delete window.localStorage[M[0]+a];location.reload()}};
