// Automatically generated file.  Do not edit!
'use strict';function f(a,b){function c(){}c.prototype=b.prototype;a.A=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.v=function(d,e,g){for(var h=Array(arguments.length-2),l=2;l<arguments.length;l++)h[l-2]=arguments[l];return b.prototype[e].apply(d,h)}};
var k={},m={en:"English","pt-br":"Portugu\u00eas Brasileiro"},n="ace ar fa he mzn ps ur".split(" "),p=window.BlocklyGamesLang,q=window.BlocklyGamesLanguages,r=!!window.location.pathname.match(/\.html$/),t=Number,u,v=window.location.search.match(/[?&]level=([^&]+)/);u=v?decodeURIComponent(v[1].replace(/\+/g,"%20")):"NaN";t(u);
function w(){document.title=document.getElementById("title").textContent;document.dir=-1!=n.indexOf(p)?"rtl":"ltr";document.head.parentElement.setAttribute("lang",p);var a=document.getElementById("languageMenu");if(a){for(var b=[],c=0;c<q.length;c++){var d=q[c];b.push([m[d],d])}b.sort(function(g,h){return g[0]>h[0]?1:g[0]<h[0]?-1:0});for(c=a.options.length=0;c<b.length;c++){var e=b[c];d=e[1];e=new Option(e[0],d);d==p&&(e.selected=!0);a.options.add(e)}1>=a.options.length&&(a.style.display="none")}for(c=
1;10>=c;c++)a=document.getElementById("level"+c),b=!!x(k.u,c),a&&b&&(a.className+=" level_done");(c=document.querySelector('meta[name="viewport"]'))&&725>screen.availWidth&&c.setAttribute("content","width=725, initial-scale=.35, user-scalable=no");setTimeout(y,1)}
function z(){var a=document.getElementById("languageMenu");a=encodeURIComponent(a.options[a.selectedIndex].value);var b=window.location.search;b=1>=b.length?"?lang="+a:b.match(/[?&]lang=[^&]*/)?b.replace(/([?&]lang=)[^&]*/,"$1"+a):b.replace(/\?/,"?lang="+a+"&");window.location=window.location.protocol+"//"+window.location.host+window.location.pathname+b}function x(a,b){try{var c=window.localStorage[a+b]}catch(d){}return c}
function A(){var a="clearData",b=B;if(!a)throw TypeError("Element not found: "+a);"string"==typeof a&&(a=document.getElementById(a));a.addEventListener("click",b,!0);a.addEventListener("touchend",b,!0)}
function y(){if(!r){window.GoogleAnalyticsObject="GoogleAnalyticsFunction";var a=function(c){(a.q=a.q||[]).push(arguments)};window.GoogleAnalyticsFunction=a;a.l=1*new Date;var b=document.createElement("script");b.async=1;b.src="//www.google-analytics.com/analytics.js";document.head.appendChild(b);a("create","UA-50448074-1","auto");a("send","pageview")}};function C(){this.j=""}C.prototype.toString=function(){return"SafeScript{"+this.j+"}"};C.prototype.g=function(a){this.j=a};(new C).g("");function D(){this.o=""}D.prototype.toString=function(){return"SafeStyle{"+this.o+"}"};D.prototype.g=function(a){this.o=a};(new D).g("");function E(){this.m=""}E.prototype.toString=function(){return"SafeStyleSheet{"+this.m+"}"};E.prototype.g=function(a){this.m=a};(new E).g("");function F(){this.i=""}F.prototype.toString=function(){return"SafeHtml{"+this.i+"}"};F.prototype.g=function(a){this.i=a};(new F).g("<!DOCTYPE html>");(new F).g("");(new F).g("<br>");var G={w:!0};function H(){throw Error("Do not instantiate directly");}H.prototype.h=null;H.prototype.toString=function(){return this.content};function I(){if(null!=p)switch(p.h){case 1:return 1;case -1:return-1;case 0:return 0}return null}function J(){H.call(this)}f(J,H);J.prototype.s=G;
var K=function(a){function b(){}b.prototype=a.prototype;return function(c,d){var e=new b;e.content=String(c);void 0!==d&&(e.h=d);return e}}(J),L={"\x00":"&#0;",'"':"&quot;","&":"&amp;","'":"&#39;","<":"&lt;",">":"&gt;","\t":"&#9;","\n":"&#10;","\x0B":"&#11;","\f":"&#12;","\r":"&#13;"," ":"&#32;","-":"&#45;","/":"&#47;","=":"&#61;","`":"&#96;","\u0085":"&#133;","\u00a0":"&#160;","\u2028":"&#8232;","\u2029":"&#8233;"};function M(a){return L[a]}var N=/[\x00\x22\x26\x27\x3c\x3e]/g;var O=["maze"];
window.addEventListener("load",function(){function a(e,g){return function(){P(e,0,g)}}document.body.innerHTML='<div style="display: none"><span id="title">BlocklyPar</span><span id="Index_clear">Delete all your solutions?</span></div><div class="header"><div class="nav-spacer"></div><div class="header-right"><a class="color-one" href="about.html">ABOUT</a>&nbsp<a class="color-one" href="parallel.html">PARALLEL PROGRAMMING</a><a class="color-one" href="code.html">CODE</a><a class="language"><select id="languageMenu"></select></a></div></div><div class="main"><div id="play"><h1>A game for introduce parallel programming!</h1><p><br/><br/><a id="button" href="maze.html?lang='+(null!=
p&&p.s===G?p:K(String(String(p)).replace(N,M),I()))+'"> PLAY </a></p></div></div><div id="clearDataPara" style="visibility: hidden"><a class="text-p">Want to start over?<button class="secondary" id="clearData">CLEAR DATA</span></button></a></div><script src="common/back.js">\x3c/script>';w();document.getElementById("languageMenu").addEventListener("change",z,!0);var b=!1;var c=0;for(var d=1;10>=d;d++)x(O[0],d)&&(b=!0,c++);b&&(document.getElementById("clearDataPara").style.visibility="visible",A());
for(b=0;b<c;b++)(d=b/(0==b?1:10)*270)?setTimeout(a(O[0],d),1500):(d=document.getElementById("gauge-"+O[0]),d.parentNode.removeChild(d))},!1);function P(a,b,c){b+=4;Q(a,Math.min(b,c));b<c&&setTimeout(function(){P(a,b,c)},10)}function Q(a,b){var c=(b-45)/180*Math.PI,d=150-52.75*Math.cos(c),e=60-52.75*Math.sin(c);b=180<b?1:0;c=-.25*Math.PI;var g=150-52.75*Math.cos(c);c=60-52.75*Math.sin(c);document.getElementById("gauge-"+a).setAttribute("d",["M "+g+","+c+" A",52.75,52.75,0,b,1,d,e].join(" "))}
function B(){var a=confirm,b;(b=document.getElementById("Index_clear"))?(b=b.textContent,b=b.replace(/\\n/g,"\n")):b=null;if(a(null===b?"[Unknown message: Index_clear]":b)){for(a=1;10>=a;a++)delete window.localStorage[O[0]+a];location.reload()}};
