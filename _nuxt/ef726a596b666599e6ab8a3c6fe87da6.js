ace.define("ace/ext/code_lens",["require","exports","module","ace/line_widgets","ace/lib/event","ace/lib/lang","ace/lib/dom","ace/editor","ace/config"],(function(e,n,t){"use strict";var o=e("../line_widgets").LineWidgets,r=e("../lib/event"),d=e("../lib/lang"),c=e("../lib/dom");function l(e,n){if(e&n.CHANGE_LINES||e&n.CHANGE_FULL||e&n.CHANGE_SCROLL||e&n.CHANGE_TEXT){var t=n.session,o=n.session.lineWidgets,r=n.$textLayer,d=r.$lenses;if(o){var l=n.$textLayer.$lines.cells,f=n.layerConfig,v=n.$padding;d||(d=r.$lenses=[]);for(var L=0,i=0;i<l.length;i++){var h=l[i].row,m=o[h],$=m&&m.lenses;if($&&$.length){var C=d[L];C||(C=d[L]=c.buildDom(["div",{class:"ace_codeLens"}],n.container)),C.style.height=f.lineHeight+"px",L++;for(var w=0;w<$.length;w++){var x=C.childNodes[2*w];x||(0!=w&&C.appendChild(c.createTextNode(" | ")),x=c.buildDom(["a"],C)),x.textContent=$[w].title,x.lensCommand=$[w]}for(;C.childNodes.length>2*w-1;)C.lastChild.remove();var _=n.$cursorLayer.getPixelPosition({row:h,column:0},!0).top-f.lineHeight*m.rowsAbove-f.offset;C.style.top=_+"px";var y=n.gutterWidth,E=t.getLine(h).search(/\S|$/);-1==E&&(E=0),y+=E*f.characterWidth,y-=n.scrollLeft,C.style.paddingLeft=v+y+"px"}}for(;L<d.length;)d.pop().remove()}else d&&function(e){var n=e.$textLayer,t=n.$lenses;t&&t.forEach((function(e){e.remove()})),n.$lenses=null}(n)}}function f(e){e.codeLensProviders=[],e.renderer.on("afterRender",l),e.$codeLensClickHandler||(e.$codeLensClickHandler=function(n){var t=n.target.lensCommand;t&&e.execCommand(t.id,t.arguments)},r.addListener(e.container,"click",e.$codeLensClickHandler,e)),e.$updateLenses=function(){var t=e.session;if(t){t.widgetManager||(t.widgetManager=new o(t),t.widgetManager.attach(e));var r=e.codeLensProviders.length,d=[];e.codeLensProviders.forEach((function(o){o.provideCodeLenses(t,(function(o,c){o||(c.forEach((function(e){d.push(e)})),0==--r&&function(){var cursor=t.selection.cursor,o=t.documentToScreenRow(cursor);n.setLenses(t,d);var r=t.$undoManager&&t.$undoManager.$lastDelta;if(r&&"remove"==r.action&&r.lines.length>1)return;var c=t.documentToScreenRow(cursor),l=e.renderer.layerConfig.lineHeight,f=t.getScrollTop()+(c-o)*l;t.setScrollTop(f)}())}))}))}};var t=d.delayedCall(e.$updateLenses);e.$updateLensesOnInput=function(){t.delay(250)},e.on("input",e.$updateLensesOnInput)}n.setLenses=function(e,n){var t=Number.MAX_VALUE;!function(e){if(e.lineWidgets){var n=e.widgetManager;e.lineWidgets.forEach((function(e){e&&e.lenses&&n.removeLineWidget(e)}))}}(e),n&&n.forEach((function(n){var o=n.start.row,r=n.start.column,d=e.lineWidgets&&e.lineWidgets[o];d&&d.lenses||(d=e.widgetManager.$registerLineWidget({rowCount:1,rowsAbove:1,row:o,column:r,lenses:[]})),d.lenses.push(n.command),o<t&&(t=o)})),e._emit("changeFold",{data:{start:{row:t}}})},n.registerCodeLensProvider=function(e,n){e.setOption("enableCodeLens",!0),e.codeLensProviders.push(n),e.$updateLensesOnInput()},n.clear=function(e){n.setLenses(e,null)};var v=e("../editor").Editor;e("../config").defineOptions(v.prototype,"editor",{enableCodeLens:{set:function(e){var n;e?f(this):((n=this).off("input",n.$updateLensesOnInput),n.renderer.off("afterRender",l),n.$codeLensClickHandler&&n.container.removeEventListener("click",n.$codeLensClickHandler))}}}),c.importCssString(".ace_codeLens {    position: absolute;    color: #aaa;    font-size: 88%;    background: inherit;    width: 100%;    display: flex;    align-items: flex-end;    pointer-events: none;}.ace_codeLens > a {    cursor: pointer;    pointer-events: auto;}.ace_codeLens > a:hover {    color: #0000ff;    text-decoration: underline;}.ace_dark > .ace_codeLens > a:hover {    color: #4e94ce;}","")})),ace.require(["ace/ext/code_lens"],(function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)}));