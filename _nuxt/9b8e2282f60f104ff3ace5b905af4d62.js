ace.define("ace/ext/linking",["require","exports","module","ace/editor","ace/config"],(function(e,o,n){var t=e("../editor").Editor;function r(e){var n=e.editor;if(e.getAccelKey()){n=e.editor;var t=e.getDocumentPosition(),r=n.session.getTokenAt(t.row,t.column);o.previousLinkingHover&&o.previousLinkingHover!=r&&n._emit("linkHoverOut"),n._emit("linkHover",{position:t,token:r}),o.previousLinkingHover=r}else o.previousLinkingHover&&(n._emit("linkHoverOut"),o.previousLinkingHover=!1)}function c(e){var o=e.getAccelKey();if(0==e.getButton()&&o){var n=e.editor,t=e.getDocumentPosition(),r=n.session.getTokenAt(t.row,t.column);n._emit("linkClick",{position:t,token:r})}}e("../config").defineOptions(t.prototype,"editor",{enableLinking:{set:function(e){e?(this.on("click",c),this.on("mousemove",r)):(this.off("click",c),this.off("mousemove",r))},value:!1}}),o.previousLinkingHover=!1})),ace.require(["ace/ext/linking"],(function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)}));