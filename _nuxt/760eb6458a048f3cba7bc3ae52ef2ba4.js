ace.define("ace/mode/ada_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("./text_highlight_rules").TextHighlightRules,c=function(){var e=this.createKeywordMapper({"support.function":"count|min|max|avg|sum|rank|now|coalesce|main",keyword:"abort|else|new|return|abs|elsif|not|reverse|abstract|end|null|accept|entry|select|access|exception|of|separate|aliased|exit|or|some|all|others|subtype|and|for|out|synchronized|array|function|overriding|at|tagged|generic|package|task|begin|goto|pragma|terminate|body|private|then|if|procedure|type|case|in|protected|constant|interface|until||is|raise|use|declare|range|delay|limited|record|when|delta|loop|rem|while|digits|renames|with|do|mod|requeue|xor","constant.language":"true|false|null"},"identifier",!0);this.$rules={start:[{token:"comment",regex:"--.*$"},{token:"string",regex:'".*?"'},{token:"string",regex:"'.'"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"paren.lparen",regex:"[\\(]"},{token:"paren.rparen",regex:"[\\)]"},{token:"text",regex:"\\s+"}]}};r.inherits(c,o),t.AdaHighlightRules=c})),ace.define("ace/mode/ada",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/ada_highlight_rules","ace/range"],(function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("./text").Mode,c=e("./ada_highlight_rules").AdaHighlightRules,d=e("../range").Range,l=function(){this.HighlightRules=c,this.$behaviour=this.$defaultBehaviour};r.inherits(l,o),function(){this.lineCommentStart="--",this.getNextLineIndent=function(e,line,t){var n=this.$getIndent(line),r=this.getTokenizer().getLineTokens(line,e).tokens;if(r.length&&"comment"==r[r.length-1].type)return n;"start"==e&&(line.match(/^.*(begin|loop|then|is|do)\s*$/)&&(n+=t));return n},this.checkOutdent=function(e,line,input){return!!(line+input).match(/^\s*(begin|end)$/)},this.autoOutdent=function(e,t,n){var line=t.getLine(n),r=t.getLine(n-1),o=this.$getIndent(r).length;this.$getIndent(line).length<=o||t.outdentRows(new d(n,0,n+2,0))},this.$id="ace/mode/ada"}.call(l.prototype),t.Mode=l})),ace.require(["ace/mode/ada"],(function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)}));