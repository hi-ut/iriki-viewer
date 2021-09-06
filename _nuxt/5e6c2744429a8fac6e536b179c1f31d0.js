ace.define("ace/mode/c9search_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],(function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("../lib/lang"),c=e("./text_highlight_rules").TextHighlightRules;var h=function(){this.$rules={start:[{tokenNames:["c9searchresults.constant.numeric","c9searchresults.text","c9searchresults.text","c9searchresults.keyword"],regex:/(^\s+[0-9]+)(:)(\d*\s?)([^\r\n]+)/,onMatch:function(e,t,n){var r=this.splitRegex.exec(e),o=this.tokenNames,c=[{type:o[0],value:r[1]},{type:o[1],value:r[2]}];r[3]&&(" "==r[3]?c[1]={type:o[1],value:r[2]+" "}:c.push({type:o[1],value:r[3]}));var h,l=n[1],d=r[4],f=0;if(l&&l.exec)for(l.lastIndex=0;h=l.exec(d);){var x=d.substring(f,h.index);if(f=l.lastIndex,x&&c.push({type:o[2],value:x}),h[0])c.push({type:o[3],value:h[0]});else if(!x)break}return f<d.length&&c.push({type:o[2],value:d.substr(f)}),c}},{regex:"^Searching for [^\\r\\n]*$",onMatch:function(e,t,n){var r,c,h=e.split("");if(h.length<3)return"text";var i=0,l=[{value:h[i++]+"'",type:"text"},{value:c=h[i++],type:"text"},{value:"'"+h[i++],type:"text"}];for(" in"!==h[2]&&l.push({value:"'"+h[i++]+"'",type:"text"},{value:h[i++],type:"text"}),l.push({value:" "+h[i++]+" ",type:"text"}),h[i+1]?(r=h[i+1],l.push({value:"("+h[i+1]+")",type:"text"}),i+=1):i-=1;i++<h.length;)h[i]&&l.push({value:h[i],type:"text"});c&&(/regex/.test(r)||(c=o.escapeRegExp(c)),/whole/.test(r)&&(c="\\b"+c+"\\b"));var d=c&&function(source,e){try{return new RegExp(source,e)}catch(e){}}("("+c+")",/ sensitive/.test(r)?"g":"ig");return d&&(n[0]=t,n[1]=d),l}},{regex:"^(?=Found \\d+ matches)",token:"text",next:"numbers"},{token:"string",regex:"^\\S:?[^:]+",next:"numbers"}],numbers:[{regex:"\\d+",token:"constant.numeric"},{regex:"$",token:"text",next:"start"}]},this.normalizeRules()};r.inherits(h,c),t.C9SearchHighlightRules=h})),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],(function(e,t,n){"use strict";var r=e("../range").Range,o=function(){};(function(){this.checkOutdent=function(line,input){return!!/^\s+$/.test(line)&&/^\s*\}/.test(input)},this.autoOutdent=function(e,t){var n=e.getLine(t).match(/^(\s*\})/);if(!n)return 0;var o=n[1].length,c=e.findMatchingBracket({row:t,column:o});if(!c||c.row==t)return 0;var h=this.$getIndent(e.getLine(c.row));e.replace(new r(t,0,t,o-1),h)},this.$getIndent=function(line){return line.match(/^\s*/)[0]}}).call(o.prototype),t.MatchingBraceOutdent=o})),ace.define("ace/mode/folding/c9search",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],(function(e,t,n){"use strict";var r=e("../../lib/oop"),o=e("../../range").Range,c=e("./fold_mode").FoldMode,h=t.FoldMode=function(){};r.inherits(h,c),function(){this.foldingStartMarker=/^(\S.*:|Searching for.*)$/,this.foldingStopMarker=/^(\s+|Found.*)$/,this.getFoldWidgetRange=function(e,t,n){var r=e.doc.getAllLines(n),line=r[n],c=/^(Found.*|Searching for.*)$/,h=c.test(line)?c:/^(\S.*:|\s*)$/,l=n,d=n;if(this.foldingStartMarker.test(line)){for(var i=n+1,f=e.getLength();i<f&&!h.test(r[i]);i++);d=i}else if(this.foldingStopMarker.test(line)){for(i=n-1;i>=0&&(line=r[i],!h.test(line));i--);l=i}if(l!=d){var col=line.length;return h===c&&(col=line.search(/\(Found[^)]+\)$|$/)),new o(l,col,d,0)}}}.call(h.prototype)})),ace.define("ace/mode/c9search",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/c9search_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/c9search"],(function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("./text").Mode,c=e("./c9search_highlight_rules").C9SearchHighlightRules,h=e("./matching_brace_outdent").MatchingBraceOutdent,l=e("./folding/c9search").FoldMode,d=function(){this.HighlightRules=c,this.$outdent=new h,this.foldingRules=new l};r.inherits(d,o),function(){this.getNextLineIndent=function(e,line,t){return this.$getIndent(line)},this.checkOutdent=function(e,line,input){return this.$outdent.checkOutdent(line,input)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.$id="ace/mode/c9search"}.call(d.prototype),t.Mode=d})),ace.require(["ace/mode/c9search"],(function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)}));