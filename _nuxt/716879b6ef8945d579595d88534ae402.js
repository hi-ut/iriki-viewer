ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],(function(e,t,n){"use strict";var o=e("../range").Range,r=function(){};(function(){this.checkOutdent=function(line,input){return!!/^\s+$/.test(line)&&/^\s*\}/.test(input)},this.autoOutdent=function(e,t){var n=e.getLine(t).match(/^(\s*\})/);if(!n)return 0;var r=n[1].length,l=e.findMatchingBracket({row:t,column:r});if(!l||l.row==t)return 0;var c=this.$getIndent(e.getLine(l.row));e.replace(new o(t,0,t,r-1),c)},this.$getIndent=function(line){return line.match(/^\s*/)[0]}}).call(r.prototype),t.MatchingBraceOutdent=r})),ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(e,t,n){"use strict";var o=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,l=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},l.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:!0}]}};o.inherits(l,r),l.getTagRule=function(e){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},l.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}},l.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=l})),ace.define("ace/mode/dot_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules","ace/mode/doc_comment_highlight_rules"],(function(e,t,n){"use strict";var o=e("../lib/oop"),r=e("../lib/lang"),l=e("./text_highlight_rules").TextHighlightRules,c=(e("./doc_comment_highlight_rules").DocCommentHighlightRules,function(){var e=r.arrayToMap("strict|node|edge|graph|digraph|subgraph".split("|")),t=r.arrayToMap("damping|k|url|area|arrowhead|arrowsize|arrowtail|aspect|bb|bgcolor|center|charset|clusterrank|color|colorscheme|comment|compound|concentrate|constraint|decorate|defaultdist|dim|dimen|dir|diredgeconstraints|distortion|dpi|edgeurl|edgehref|edgetarget|edgetooltip|epsilon|esep|fillcolor|fixedsize|fontcolor|fontname|fontnames|fontpath|fontsize|forcelabels|gradientangle|group|headurl|head_lp|headclip|headhref|headlabel|headport|headtarget|headtooltip|height|href|id|image|imagepath|imagescale|label|labelurl|label_scheme|labelangle|labeldistance|labelfloat|labelfontcolor|labelfontname|labelfontsize|labelhref|labeljust|labelloc|labeltarget|labeltooltip|landscape|layer|layerlistsep|layers|layerselect|layersep|layout|len|levels|levelsgap|lhead|lheight|lp|ltail|lwidth|margin|maxiter|mclimit|mindist|minlen|mode|model|mosek|nodesep|nojustify|normalize|nslimit|nslimit1|ordering|orientation|outputorder|overlap|overlap_scaling|pack|packmode|pad|page|pagedir|pencolor|penwidth|peripheries|pin|pos|quadtree|quantum|rank|rankdir|ranksep|ratio|rects|regular|remincross|repulsiveforce|resolution|root|rotate|rotation|samehead|sametail|samplepoints|scale|searchsize|sep|shape|shapefile|showboxes|sides|size|skew|smoothing|sortv|splines|start|style|stylesheet|tailurl|tail_lp|tailclip|tailhref|taillabel|tailport|tailtarget|tailtooltip|target|tooltip|truecolor|vertices|viewport|voro_margin|weight|width|xlabel|xlp|z".split("|"));this.$rules={start:[{token:"comment",regex:/\/\/.*$/},{token:"comment",regex:/#.*$/},{token:"comment",merge:!0,regex:/\/\*/,next:"comment"},{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/[+\-]?\d+(?:(?:\.\d*)?(?:[eE][+\-]?\d+)?)?\b/},{token:"keyword.operator",regex:/\+|=|\->/},{token:"punctuation.operator",regex:/,|;/},{token:"paren.lparen",regex:/[\[{]/},{token:"paren.rparen",regex:/[\]}]/},{token:"comment",regex:/^#!.*$/},{token:function(n){return e.hasOwnProperty(n.toLowerCase())?"keyword":t.hasOwnProperty(n.toLowerCase())?"variable":"text"},regex:"\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}],qqstring:[{token:"string",regex:'[^"\\\\]+',merge:!0},{token:"string",regex:"\\\\$",next:"qqstring",merge:!0},{token:"string",regex:'"|$',next:"start",merge:!0}],qstring:[{token:"string",regex:"[^'\\\\]+",merge:!0},{token:"string",regex:"\\\\$",next:"qstring",merge:!0},{token:"string",regex:"'|$",next:"start",merge:!0}]}});o.inherits(c,l),t.DotHighlightRules=c})),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],(function(e,t,n){"use strict";var o=e("../../lib/oop"),r=e("../../range").Range,l=e("./fold_mode").FoldMode,c=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};o.inherits(c,l),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var line=e.getLine(n);if(this.singleLineBlockCommentRe.test(line)&&!this.startRegionRe.test(line)&&!this.tripleStarBlockCommentRe.test(line))return"";var o=this._getFoldWidgetBase(e,t,n);return!o&&this.startRegionRe.test(line)?"start":o},this.getFoldWidgetRange=function(e,t,n,o){var r,line=e.getLine(n);if(this.startRegionRe.test(line))return this.getCommentRegionBlock(e,line,n);if(r=line.match(this.foldingStartMarker)){var i=r.index;if(r[1])return this.openingBracketBlock(e,r[1],n,i);var l=e.getCommentFoldRange(n,i+r[0].length,1);return l&&!l.isMultiLine()&&(o?l=this.getSectionRange(e,n):"all"!=t&&(l=null)),l}if("markbegin"!==t&&(r=line.match(this.foldingStopMarker))){i=r.index+r[0].length;return r[1]?this.closingBracketBlock(e,r[1],n,i):e.getCommentFoldRange(n,i,-1)}},this.getSectionRange=function(e,t){for(var line=e.getLine(t),n=line.search(/\S/),o=t,l=line.length,c=t+=1,d=e.getLength();++t<d;){var h=(line=e.getLine(t)).search(/\S/);if(-1!==h){if(n>h)break;var m=this.getFoldWidgetRange(e,"all",t);if(m){if(m.start.row<=o)break;if(m.isMultiLine())t=m.end.row;else if(n==h)break}c=t}}return new r(o,l,c,e.getLine(c).length)},this.getCommentRegionBlock=function(e,line,t){for(var n=line.search(/\s*$/),o=e.getLength(),l=t,c=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,d=1;++t<o;){line=e.getLine(t);var h=c.exec(line);if(h&&(h[1]?d--:d++,!d))break}if(t>l)return new r(l,n,t,line.length)}}.call(c.prototype)})),ace.define("ace/mode/dot",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/matching_brace_outdent","ace/mode/dot_highlight_rules","ace/mode/folding/cstyle"],(function(e,t,n){"use strict";var o=e("../lib/oop"),r=e("./text").Mode,l=e("./matching_brace_outdent").MatchingBraceOutdent,c=e("./dot_highlight_rules").DotHighlightRules,d=e("./folding/cstyle").FoldMode,h=function(){this.HighlightRules=c,this.$outdent=new l,this.foldingRules=new d,this.$behaviour=this.$defaultBehaviour};o.inherits(h,r),function(){this.lineCommentStart=["//","#"],this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,line,t){var n=this.$getIndent(line),o=this.getTokenizer().getLineTokens(line,e),r=o.tokens;o.state;if(r.length&&"comment"==r[r.length-1].type)return n;"start"==e&&(line.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/)&&(n+=t));return n},this.checkOutdent=function(e,line,input){return this.$outdent.checkOutdent(line,input)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.$id="ace/mode/dot"}.call(h.prototype),t.Mode=h})),ace.require(["ace/mode/dot"],(function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)}));