(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{1867:function(e,t,n){"use strict";n.r(t);var r=n(473),o=n(471),c=n(1862),f=n(480),l=n(472),d=n(467),y=n.n(d);function O(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function w(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function m(e,p){return(m=Object.setPrototypeOf||function(e,p){return e.__proto__=p,e})(e,p)}function h(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=v(e);if(t){var o=v(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return j(this,n)}}function j(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(c,e);var t,n,r,o=h(c);function c(){return O(this,c),o.apply(this,arguments)}return t=c,(n=[{key:"render",value:function(){var e=this.props,t=e.captions,n=e.classes,r=e.audioOptions,o=e.audioResources;return y.a.createElement("div",{className:n.container},y.a.createElement("audio",Object.assign({className:n.audio},r),o.map((function(audio){return y.a.createElement(d.Fragment,{key:audio.id},y.a.createElement("source",{src:audio.id,type:audio.getFormat()}))})),t.map((function(caption){return y.a.createElement(d.Fragment,{key:caption.id},y.a.createElement("track",{src:caption.id,label:caption.getDefaultLabel(),srcLang:caption.getProperty("language")}))}))))}}])&&w(t.prototype,n),r&&w(t,r),c}(d.Component);E.defaultProps={audioOptions:{},audioResources:[],captions:[]};var R=n(568),k=n(534),P=Object(o.compose)(Object(c.a)(),Object(f.a)((function(){return{audio:{width:"100%"},container:{alignItems:"center",display:"flex",width:"100%"}}})),Object(r.b)((function(e,t){var n=t.windowId;return{audioOptions:Object(R.a)(e).audioOptions,audioResources:Object(k.j)(e,{windowId:n})||[],captions:Object(k.k)(e,{windowId:n})||[]}}),null),Object(l.a)("AudioViewer"));t.default=P(E)}}]);