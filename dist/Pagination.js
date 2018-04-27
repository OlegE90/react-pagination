!function(e,r){if("object"==typeof exports&&"object"==typeof module)module.exports=r(require("react"));else if("function"==typeof define&&define.amd)define(["react"],r);else{var n=r("object"==typeof exports?require("react"):e.React);for(var t in n)("object"==typeof exports?exports:e)[t]=n[t]}}("undefined"!=typeof self?self:this,function(e){return function(e){function r(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}var n={};return r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},r.p="",r(r.s=1)}([function(r,n){r.exports=e},function(e,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.EDirection=void 0,n(2);var t=n(0),a=function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r.default=e,r}(t),o=n(3),i=function(e){return e&&e.__esModule?e:{default:e}}(o),l=function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])};return function(r,n){function t(){this.constructor=r}e(r,n),r.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)}}(),u=r.EDirection=void 0;!function(e){e.RIGHT="RIGHT",e.LEFT="LEFT"}(u||(r.EDirection=u={}));var c=function(e){function r(){var r=null!==e&&e.apply(this,arguments)||this;return r.isAvailableNumber=function(e){return e>0&&e<=r.props.totalPageRange},r.getNumber=function(){var e=r.props,n=e.activePage,t=e.totalPageRange,a=e.pageRangeDisplayed,o=Math.min(t,a);if(!(o<2)){for(var i=Math.ceil((o-1)/2),l=Math.floor((o-1)/2),u=[],c=[],s=0,p=0;i>0||l>0;){if(s++,p++,i){var f=n-s;r.isAvailableNumber(f)?(u.push(f),--i):(l+=i,i=0)}if(l){var f=n+p;r.isAvailableNumber(f)?(c.push(f),--l):(i+=l,l=0)}}return u.reverse().concat([n],c)}},r.handlerChangePage=function(e){return function(n){r.props.onChange(e)}},r.renderArrowBackOneStep=function(){var e=r.props,n=e.activePage,t=e.hideArrows,o=e.renderArrowOneStep,l=n-1,c=r.isAvailableNumber(l);return t&&!c?null:a.createElement(i.default,{onClick:r.handlerChangePage(l),className:"arrow_step-back",disable:!c},o&&o(u.LEFT)||a.createElement("span",null,"<"))},r.renderArrowToFirst=function(){var e=r.props,n=e.activePage,t=e.hideArrows,o=e.renderArrowLast,l=r.isAvailableNumber(n-1);return t&&!l?null:a.createElement(i.default,{onClick:r.handlerChangePage(1),disable:!l,className:"arrow_first"},o&&o(u.LEFT)||a.createElement("span",null,"<<"))},r.renderArrowNextOneStep=function(){var e=r.props,n=e.activePage,t=e.hideArrows,o=e.renderArrowOneStep,l=n+1,c=r.isAvailableNumber(l);return t&&!c?null:a.createElement(i.default,{onClick:r.handlerChangePage(l),className:"arrow_step-next",disable:!c},o&&o(u.RIGHT)||a.createElement("span",null,">"))},r.renderArrowToLast=function(){var e=r.props,n=e.activePage,t=e.hideArrows,o=e.totalPageRange,l=e.renderArrowLast,c=r.isAvailableNumber(n+1);return t&&!c?null:a.createElement(i.default,{onClick:r.handlerChangePage(o),disable:!c,className:"arrow_last"},l&&l(u.RIGHT)||a.createElement("span",null,">>"))},r.renderCustomVersion=function(){var e=r.props,n=e.activePage,t=e.children,a=e.totalPageRange;return t({rowRenderLeft:function(e){return[!0,!1].map(function(t){return e({isLastArrow:t,isAvailable:r.isAvailableNumber(n-1),handleChange:r.handlerChangePage(t?1:n-1)})})},numbers:r.getNumber().map(function(e){return{number:e,isActive:n===e,handleChange:r.handlerChangePage(e)}}),rowRenderRight:function(e){return[!1,!0].map(function(t){return e({isLastArrow:t,isAvailable:r.isAvailableNumber(n+1),handleChange:r.handlerChangePage(t?a:n+1)})})}})},r.renderDefault=function(){var e=r.props.activePage;return a.createElement("ul",{className:r.props.className||"pagination"},r.renderArrowToFirst(),r.renderArrowBackOneStep(),r.getNumber().map(function(n){return a.createElement("li",{key:n,onClick:r.handlerChangePage(n),className:"page-item "+(n===e?"active":"")},a.createElement("a",{className:"page-link"},n))}),r.renderArrowNextOneStep(),r.renderArrowToLast())},r}return l(r,e),r.prototype.render=function(){return"function"==typeof this.props.children?this.renderCustomVersion():this.renderDefault()},r}(a.Component);r.default=c},function(e,r){},function(e,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e){var r=e.onClick,n=e.disable,t=e.className,o=e.children;return n?a.createElement("li",{className:t+" arrow_disable page-item"},a.createElement("div",null,o)):a.createElement("li",{className:t+" page-item"},a.createElement("a",{onClick:r,className:"page-link"},o))};var t=n(0),a=function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r.default=e,r}(t)}])});