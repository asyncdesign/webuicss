(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const E=e=>typeof e=="string",F=e=>Array.isArray(e),H=e=>e instanceof Object,R=e=>({}).toString.call(e)==="[object Function]",P=e=>e&&e.nodeName==="SELECT",W=e=>{let t=e.length,n=typeof e;return R(n)||e===window?!1:e.nodeType===1&&t?!0:F(n)||t===0||typeof t=="number"&&t>0},O=(e,t)=>{let n=e||[],s=n.length,i=t.length,r=0;for(;r<i;)n[s++]=t[r++];return n.length=s,n},M=(e,t)=>{let n=e||[];return t!==null&&(W(t)?O(n,E(t)?[t]:t):n.push(t)),n},y=(e,t)=>{e?setTimeout(()=>{t()},e):t()},x=(e,t,n)=>{if(t.length){let s=l(".off-canvas-body"),i=t.find(e),r=parseInt(t.data("transition-duration")),o=t.data("transition-in-delay"),f=t.data("transition-out-delay"),h=t.data("transition-type"),v=t.data("transition-orientation"),b=t.data("transition-distance"),c=t.data("focus-element"),w=t.data("focus-return-element"),z=t.data("allow-escape-key"),A=i.hasClass("off-canvas-drawer"),S=i.hasClass("off-canvas-left")||i.hasClass("off-canvas-right"),C=i.hasClass("off-canvas-left"),u=arguments.length===3&&n?l(n):null;if(i.length){let m=i[0].offsetWidth;if(!A&&S&&s.length)l(".off-canvas-left, .off-canvas-right").css("transition-duration",r/1e3+"s"),s.css("transition-duration",r/1e3+"s"),i.hasClass("off-canvas-closed")?(i.trigger("ui.toggleItem.show.before"),y(o,()=>{if(i.find(".toggle-item-content").show(),i.removeClass("off-canvas-closed"),C?(i.css("transform","translate(0, 0)"),s.css("transform","translate("+m+"px, 0)")):(i.css("transform","translate(0, 0)"),s.css("transform","translate(-"+m+"px, 0)")),i[0].ontransitionend=g=>{i.trigger("ui.toggleItem.show.after")},c){let g=i.find(c).first();g&&!g.attr("disabled")===null&&!g.attr("readonly")&&g[0].focus()}})):(i.trigger("ui.toggleItem.hide.before"),y(f,()=>{if(C?(i.css("transform","translate(-"+m+"px, 0)"),s.css("transform","translate(0, 0)")):(i.css("transform","translate("+m+"px, 0)"),s.css("transform","translate(0, 0)")),i.addClass("off-canvas-closed"),i.find(".toggle-item-content").hide(),i[0].ontransitionend=g=>{i.trigger("ui.toggleItem.hide.after")},w){let g=l(w).first();g&&!g.attr("disabled")===null&&!g.attr("readonly")&&g[0].focus()}}));else if(S)l(".off-canvas-left, .off-canvas-right").css("transition-duration",r/1e3+"s"),i.hasClass("off-canvas-closed")?(i.trigger("ui.toggleItem.show.before"),y(o,()=>{if(i.find(".toggle-item-content").show(),i.removeClass("off-canvas-closed"),i.css("transform","translate(0, 0)"),i[0].ontransitionend=g=>{i.trigger("ui.toggleItem.show.after")},c){let g=i.find(c).first();g&&!g.attr("disabled")===null&&!g.attr("readonly")&&g[0].focus()}})):(i.trigger("ui.toggleItem.hide.before"),y(f,()=>{if(C?i.css("transform","translate(-"+m+"px, 0)"):i.css("transform","translate("+m+"px, 0)"),i.addClass("off-canvas-closed"),i.find(".toggle-item-content").hide(),i[0].ontransitionend=g=>{i.trigger("ui.toggleItem.hide.after")},w){let g=l(w).first();g&&!g.attr("disabled")===null&&!g.attr("readonly")&&g[0].focus()}}));else{let g=i,d;for(let T=0;T<g.length;T++)d=l(g[T]),d.css("display")==="block"?(d.trigger("ui.toggleItem.hide.before"),y(f,()=>{if(r&&h==="fade"?d.fadeOut(r,0,()=>{d.trigger("ui.toggleItem.hide.after"),u&&u.find("[class*='nav-indicator']").removeClass("active")}):r&&h==="collapse"?v==="horizontal"?d.collapseHorizontal({duration:r},()=>{d.trigger("ui.toggleItem.hide.after"),u&&u.find("[class*='nav-indicator']").removeClass("active")}):d.collapseVertical({duration:r},()=>{d.trigger("ui.toggleItem.hide.after"),u&&u.find("[class*='nav-indicator']").removeClass("active")}):(d.hide(),d.trigger("ui.toggleItem.hide.after"),u&&u.find("[class*='nav-indicator']").removeClass("active")),w){let p=l(w).first();p&&!p.attr("disabled")===null&&!p.attr("readonly")&&p[0].focus()}})):(d.trigger("ui.toggleItem.show.before"),y(o,()=>{if(r&&h==="fade"?d.fadeIn(r,0,()=>{d.trigger("ui.toggleItem.show.after"),u&&u.find("[class*='nav-indicator']").addClass("active")}):r&&h==="collapse"?v==="horizontal"?b?d.expandHorizontal({duration:r,targetWidth:b},()=>{d.trigger("ui.toggleItem.show.after"),u&&u.find("[class*='nav-indicator']").addClass("active")}):d.expandHorizontal({duration:r},()=>{d.trigger("ui.toggleItem.show.after"),u&&u.find("[class*='nav-indicator']").addClass("active")}):b?d.expandVertical({duration:r,targetHeight:b},()=>{d.trigger("ui.toggleItem.show.after"),u&&u.find("[class*='nav-indicator']").addClass("active")}):d.expandVertical({duration:r},()=>{d.trigger("ui.toggleItem.show.after"),u&&u.find("[class*='nav-indicator']").addClass("active")}):(d.show(),d.trigger("ui.toggleItem.show.after"),u&&u.find("[class*='nav-indicator']").addClass("active")),c){let p=i.find(c).first();p&&!p.attr("disabled")===null&&!p.attr("readonly")&&p[0].focus()}}),t.hasClass("toggle-inclusive")||y(f,()=>{r&&h==="fade"?(d.siblings(".toggle-item").fadeOut(r),u&&u.siblings(".toggle-activator").find("[class*='nav-indicator']").removeClass("active")):r&&h==="collapse"?v==="horizontal"?(d.siblings(".toggle-item").collapseHorizontal({duration:r}),u&&u.siblings(".toggle-activator").find("[class*='nav-indicator']").removeClass("active")):(d.siblings(".toggle-item").collapseVertical({duration:r}),u&&u.siblings(".toggle-activator").find("[class*='nav-indicator']").removeClass("active")):(d.siblings(".toggle-item").hide(),u&&u.siblings(".toggle-activator").find("[class*='nav-indicator']").removeClass("active"))}))}}z==="true"&&t.keyDown(m=>{m.which===27&&(m.preventDefault(),t[0].click())})}},U=/^([a-zA-Z0-9_=\-\s\[\]\.\#\*\,\>\+\~\(\)\:\"\']{1,255})$/,D=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,l=e=>new a.o(e),a=l.fn=l.prototype={length:0,o:function(e){if(!e)return this;if(e.nodeType)return this[0]=e,this.length=1,this;if(e instanceof l)return e;if(E(e)){if(U.test(e)){let t=document.querySelectorAll(e);if(t.length===0)return this;if(t.length===1)return this[0]=t[0],this.length=1,this;if(t.length>1)return O(this,t)}else if(D.test(e)){let t=document.createRange().createContextualFragment(e).childNodes;return O(this,t)}}return M(this,e)},at:[].at,concat:[].concat,every:[].every,filter:[].filter,find:[].find,forEach:[].forEach,includes:[].includes,indexOf:[].indexOf,join:[].join,map:[].map,pop:[].pop,push:[].push,reduce:[].reduce,reduceRight:[].reduceRight,reverse:[].reverse,shift:[].shift,slice:[].slice,some:[].some,sort:[].sort,splice:[].splice,toReversed:[].toReversed,toSorted:[].toSorted,toSpliced:[].toSpliced,unshift:[].unshift};a.constructor=l;a.o.prototype=a;a.add=function(e){if(NodeList.prototype.isPrototypeOf(e)||F(e)&&e.every(t=>t instanceof HTMLElement)){let t=this.elements().concat(e);return l(t)}return this};a.get=function(e){if(this.length)return l(this[e])};a.first=function(){if(this.length)return l(this[0])};a.last=function(){if(this.length)return l(this[this.length-1])};a.find=function(e){let t=[],n;for(let s=0;s<this.length;s++){let i=this[s].querySelectorAll(e);for(let r=0;r<i.length;r++)!~t.indexOf(n=i[r])&&n&&t.push(n)}return l(t)};a.select=function(e){let t=Array.from(this.elements()).filter(n=>n.matches(e));return l(t)};a.element=function(){if(this.length&&this.length===1)return this[0]};a.elements=function(){let e=[];for(let t=0;t<this.length;t++)e.push(this[t]);return e};a.siblings=function(e){let t=arguments.length,n=[];for(let s=0;s<this.length;s++){let i=t?l(this[s].parentNode.children).select(e):l(this[s].parentNode.children).select("*");if(i&&i.length)for(let r=0;r<i.length;r++)i[r]!==this[s]&&!~n.indexOf(i[r])&&n.unshift(i[r])}return l(n)};a.prevSibling=function(e){let t=arguments.length,n=[];for(let s=0;s<this.length;s++){let i=this[s].previousElementSibling;i&&n.push(i)}return t?l(n).select(e):l(n)};a.prevSiblings=function(e){let t=arguments.length,n=[];for(let s=0;s<this.length;s++){let i=this[s];for(;i=i.previousElementSibling;)n.push(i)}return t?l(n).select(e):l(n)};a.nextSibling=function(e){let t=arguments.length,n=[];for(let s=0;s<this.length;s++){let i=this[s].nextElementSibling;i&&n.push(i)}return t?l(n).select(e):l(n)};a.nextSiblings=function(e){let t=arguments.length,n=[];for(let s=0;s<this.length;s++){let i=this[s];for(;i=i.nextElementSibling;)n.push(i)}return t?l(n).select(e):l(n)};a.parent=function(e){let t=arguments.length,n=[],s;for(let i=0;i<this.length;i++)!~n.indexOf(s=this[i].parentElement)&&s&&n.push(s);return t?l(n).select(e):l(n)};a.parents=function(e){let t=arguments.length,n=[],s;for(let i=0;i<this.length;i++)for(s=this[i];s=s.parentElement;)s&&(~n.indexOf(s)||n.push(s));return t?l(n).select(e):l(n)};a.closest=function(e){let t=[],n,s;for(let i=0;i<this.length;i++)for(n=this[i];n=n.parentElement;)if(s=l(n).selectFirst(e),s){~t.indexOf(s[0])||t.push(s[0]);break}return l(t)};a.children=function(e){let t=arguments,n=[],s;if(t.length===0)for(let i=0;i<this.length;i++){let r=this[i].children;for(let o=0;o<r.length;o++)!~n.indexOf(s=r[o])&&s&&n.push(s)}else{let i=document.querySelectorAll(e);for(let r=0;r<this.length;r++){let o=this[r].children;for(let f=0;f<o.length;f++)for(let h=0;h<i.length;h++)!~n.indexOf(s=o[f])&&s&&s===i[h]&&n.push(s)}}return l(n)};a.append=function(e,t){let n=arguments,s,i;if(H(e)||E(e)&&D.exec(e)){if(s=l(e),n.length===1||n.length===2&&!t){for(let r=0;r<this.length;r++)if(i=this[r],i.nodeType===1||i.nodeType===11||i.nodeType===9)for(let o=0;o<s.length;o++)i.appendChild(s[o])}else if(n.length===2&&t){for(let r=0;r<this.length;r++)if(i=this[r],i.nodeType===1||i.nodeType===11||i.nodeType===9)for(let o=0;o<s.length;o++)i.insertBefore(s[o],i.firstChild)}}return this};a.appendTo=function(e){return l(e).append(this),this};a.prependTo=function(e){return l(e).append(this,!0),this};a.remove=function(){for(let e=0;e<this.length;e++)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return l([])};a.removeChildren=function(e){if(arguments.length)l(this).children().select(e).remove();else{let t;for(let n=0;n<this.length;n++)for(t=this[n];t.lastChild;)t.removeChild(t.lastChild)}return this};a.hasClass=function(e){for(let t=0;t<this.length;t++)if(this[t].classList){if(this[t].classList.contains(e))return!0}else if(new RegExp("(^| )"+e+"( |$)","gi").test(this[t].className))return!0;return!1};a.addClass=function(e){for(let t=0;t<this.length;t++)if(this[t].classList){let n=e.split(" ");for(let s=0;s<n.length;s++)this[t].classList.add(n[s])}else this[t].className+=" "+e;return this};a.removeClass=function(e){for(let t=0;t<this.length;t++)if(e==="*")this[t].className="";else if(this[t].classList){let n=e.split(" ");for(let s=0;s<n.length;s++)this[t].classList.remove(n[s])}else this[t].className=this[t].className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ");return this};a.attr=function(e,t){let n=arguments,s=[];if(n.length===1){for(let i=0;i<this.length;i++)s.push(this[i].getAttribute(e));return s.length===1?s[0]:s}else if(n.length===2)if(t===null||t==="")for(let i=0;i<this.length;i++)this[i].removeAttribute(e);else for(let i=0;i<this.length;i++)this[i].setAttribute(e,t);return this};a.data=function(e,t){let n=arguments,s=e.toLowerCase(),i=[];if(n.length===1){for(let r=0;r<this.length;r++)i.push(this[r].getAttribute("data-"+s));return i.length===1?i[0]:i}else if(n.length===2)if(t===null||t==="")for(let r=0;r<this.length;r++)this[r].removeAttribute("data-"+s);else for(let r=0;r<this.length;r++)this[r].setAttribute("data-"+s,t);return this};a.css=function(e,t){let n=arguments,s=[];if(n.length===1){for(let i=0;i<this.length;i++){let r=window.getComputedStyle(this[i])[e],o=e==="height"||e==="width"?this[i].getBoundingClientRect():null;o&&(e==="height"&&o.height>parseFloat(r)?r=o.height+"px":e==="width"&&o.width>parseFloat(r)&&(r=o.width+"px")),s.push(r!=""?r:this[i].style[e])}return s.length===1?s[0]:s}else if(n.length===2)for(let i=0;i<this.length;i++)this[i].style[e]=t;return this};a.val=function(e){let t=arguments,n=[];if(t.length===1)for(let s=0;s<this.length;s++)this[s].value=e;else{for(let s=0;s<this.length;s++)n.push(this[s].value);return n.length===1?n[0]:n}return this};a.checked=function(e){let t=arguments,n=[];if(t.length===1)for(let s=0;s<this.length;s++)this[s].checked=e;else{for(let s=0;s<this.length;s++)n.push(this[s].checked);return n.length===1?n[0]:n}return this};a.indeterminate=function(e){let t=arguments,n=[];if(t.length===1)for(let s=0;s<this.length;s++)this[s].indeterminate=e;else{for(let s=0;s<this.length;s++)n.push(this[s].indeterminate);return n.length===1?n[0]:n}return this};a.html=function(e){let t=arguments,n=[];if(t.length===1)for(let s=0;s<this.length;s++)this[s].innerHTML=e;else{for(let s=0;s<this.length;s++)n.push(this[s].innerHTML);return n.length===1?n[0]:n}return this};a.text=function(e){let t=arguments,n=[];if(t.length===1)for(let s=0;s<this.length;s++)this[s].textContent=e;else{for(let s=0;s<this.length;s++)n.push(this[s].textContent);return n.length===1?n[0]:n}return this};a.show=function(e){let t=arguments.length>0&&e?e.toLowerCase():"block";for(let n=0;n<this.length;n++)this[n].style.display=t;return this};a.hide=function(){for(let e=0;e<this.length;e++)this[e].style.display="none";return this};a.visible=function(){for(let e=0;e<this.length;e++)this[e].style.visibility="visible";return this};a.hidden=function(){for(let e=0;e<this.length;e++)this[e].style.visibility="hidden";return this};a.has=function(e){return this.find(e).length>0};a.is=function(e){let t=this.parent().find(e);for(let n=0;n<this.length;n++)for(let s=0;s<t.length;s++)if(this[n]===t[s])return!0;return!1};a.hoverIn=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("mouseenter",e);return this};a.hoverOut=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("mouseleave",e);return this};a.mouseUp=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("mouseup",e);return this};a.mouseDown=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("mousedown",e);return this};a.mouseMove=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("mousemove",e);return this};a.focusIn=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("focusin",e);return this};a.focusOut=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("focusout",e);return this};a.focus=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("focus",e);return this};a.blur=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("blur",e);return this};a.change=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("change",e);return this};a.input=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("input",e);return this};a.paste=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("paste",e);return this};a.keyDown=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("keydown",e);return this};a.keyUp=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("keyup",e);return this};a.click=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("click",e);return this};a.dblclick=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("dblclick",e);return this};a.submit=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("submit",e);return this};a.resize=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("resize",e);return this};a.scroll=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("scroll",e);return this};a.dragStart=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("dragstart",e);return this};a.drag=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("drag",e);return this};a.dragEnd=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("dragend",e);return this};a.dragEnter=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("dragenter",e);return this};a.dragOver=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("dragover",e);return this};a.dragLeave=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("dragleave",e);return this};a.drop=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("drop",e);return this};a.transitionStart=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("transitionstart",e);return this};a.transitionRun=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("transitionrun",e);return this};a.transitionEnd=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("transitionend",e);return this};a.touchStart=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("touchstart",e);return this};a.touchEnd=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("touchend",e);return this};a.touchMove=function(e){for(let t=0;t<this.length;t++)this[t].addEventListener("touchmove",e);return this};a.on=function(e,t){for(let n=0;n<this.length;n++)this[n].addEventListener(e,t);return this};a.off=function(e,t){for(let n=0;n<this.length;n++)this[n].removeEventListener(e,t);return this};a.trigger=function(e,t){return t&&t.length?this[0].dispatchEvent(new CustomEvent(e,{bubbles:!0,cancelable:!0,detail:t})):this[0].dispatchEvent(new CustomEvent(e,{bubbles:!0,cancelable:!0})),this};a.toggle=function(e){let t,n;if(arguments.length===1){let s=e.toLowerCase();s!=="off"&&s!=="none"?(s==="on"?this.css("display","block"):this.css("display",s),this.attr("aria-hidden","false")):(this.css("display","none"),this.attr("aria-hidden","true"))}else for(let s=0;s<this.length;s++)t=this[s],n=window.getComputedStyle(t).display,n==="none"?(t.style.display="block",t.setAttribute("aria-hidden","false")):(t.style.display="none",t.setAttribute("aria-hidden","true"));return this};a.toggleClass=function(e){let t;for(let n=0;n<this.length;n++)t=l(this[n]),t.hasClass(e)?t.removeClass(e):t.addClass(e);return this};a.setFocus=function(){this.first()[0].focus()};a.addOption=function(e,t){if(arguments.length===2)for(let n=0;n<this.length;n++)P(this[n])&&l(this[n]).append(new Option(t,e));return this};a.removeOptions=function(e){let t;for(let n=0;n<this.length;n++)t=this[n],arguments.length===1&&e?l(t).find("option:checked").remove():l(t).find("option:not(:first-child)").remove();return this};a.setSelectedOption=function(e){if(arguments.length===1)for(let t=0;t<this.length;t++){let n=l(this[t]).find("option")[e];n&&(n.selected=!0)}return this};a.setOptionText=function(e,t){if(arguments.length===2)for(let n=0;n<this.length;n++){let s=l(this[n]).find("option").eq(e);s&&s.html(t)}return this};a.getOptionValues=function(e){let t=arguments,n=[],s=[];if(t.length===0||t.length===1&&!e)for(let i=0;i<this.length;i++)n=l.addNodes(n,l(this[i]).find("option"));else if(t.length===1&&e)for(let i=0;i<this.length;i++)n=l.addNodes(n,l(this[i]).find("option:checked"));for(let i=0;i<n.length;i++)s.push(n[i].value);return s};a.getOptionLabels=function(e,t){let n=arguments,s=[],i=[];if(n.length===0||n.length===1&&!e)for(let r=0;r<this.length;r++)s=l.addNodes(s,l(this[r]).find("option"));else if(n.length>0&&e){if(n.length===1&&e)for(let r=0;r<this.length;r++)s=l.addNodes(s,l(this[r]).find("option:checked"));else if(n.length===2)if(t)for(let r=0;r<s.length;r++)i.push(s[r].innerHTML);else for(let r=0;r<s.length;r++)i.push(s[r].textContent)}return i};a.moveOptionsTo=function(e,t,n){let s=arguments,i=l(e);if(s.length===1||s.length>1&&!t)for(let r=0;r<this.length;r++)l(this[r]).find("option:checked").appendTo(i),l(this[r]).find("option:checked").remove();else if(s.length>1&&t)for(let r=0;r<this.length;r++)l(this[r]).find("option").appendTo(i),l(this[r]).find("option").remove();if(s.length===3&&n)for(let r=0;r<i.length;r++)i[r].selectedIndex=-1;return this};l.getGuid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){let t=Math.random()*16|0;return(e==="x"?t:t&3|8).toString(16)})};l.sum=(...e)=>e.reduce((t,n)=>t+n,0);l.elementHoverAt=function(e,t){return l(document.elementFromPoint(e,t))};l.calculatePointerSpeed=function(e,t){let n=e.clientX,s=e.clientY,i,r,o,f,h,v,b,c;return t?(f=t.time,i=t.clientX,r=t.clientY,o=Date.now(),h=i-n,v=r-s,b=o-f,n=i,s=r,c=Math.sqrt(h*h+v*v)/b,c):0};l.pxToRem=function(e){let t=document.getElementsByTagName("html")[0];return parseFloat(e)/parseFloat(window.getComputedStyle(t).fontSize)};l.remToPx=function(e){let t=document.getElementsByTagName("html")[0];return parseFloat(window.getComputedStyle(t).fontSize)*parseFloat(e)};l.percentHeightToPx=function(e,t){return parseFloat(e.parent().css("height"))/100*t};l.percentWidthToPx=function(e,t){return parseFloat(e.parent().css("width"))/100*t};l.getStyleValue=function(e){if(arguments.length===1){let s=getComputedStyle(document.documentElement).getPropertyValue(e);return s||void 0}};l.getValueFromCssSize=function(e){if(e&&E(e)){let t=parseFloat(e.replace(/[^0-9.]+/gi,""));return isNaN(t)?0:t}else if(e&&!isNaN(e)){let t=parseFloat(e);return isNaN(t)?0:t}return 0};l.getUnitFromCssSize=function(e){if(e&&E(e)){let t=e.replace(/[^a-z%]+/gi,"");return t.length?t:"px"}return"px"};l.getAvgWidth=function(e){const t=l(e);if(t&&t.length){let n=t.length,s=0;for(let i=0;i<n;i++)s+=parseFloat(l(t[i]).css("width"));return s/n}};l.getAvgHeight=function(e){const t=l(e);if(t&&t.length){let n=t.length,s=0;for(let i=0;i<n;i++)s+=parseFloat(l(t[i]).css("height"));return s/n}};l.getMaxWidth=function(e){const t=l(e);if(t&&t.length){let n=t.length,s=0,i=0;for(let r=0;r<n;r++)i=parseFloat(l(t[r]).css("width")),i>s&&(s=i);return s}};l.getMaxHeight=function(e){const t=l(e);if(t&&t.length){let n=t.length,s=0,i=0;for(let r=0;r<n;r++)i=parseFloat(l(t[r]).css("height")),i>s&&(s=i);return s}};l.getScrollbarWidth=()=>window.innerWidth-document.documentElement.clientWidth;l.rgbToHex=function(e,t,n){if(!isNaN(e)&&e>-1&&e<256&&!isNaN(t)&&t>-1&&t<256&&!isNaN(n)&&n>-1&&n<256)return"#"+((1<<24)+(e<<16)+(t<<8)+n).toString(16).slice(1)};l.rgbStringToHex=function(e){let t=e.replace(/[^\d,]/g,"").split(",");if(t=t.slice(0,3),t&&t.length===3)return"#"+((1<<24)+(parseInt(t[0])<<16)+(parseInt(t[1])<<8)+parseInt(t[2])).toString(16).slice(1)};l.getAccessibilityContrastColor=function(e){if(e.indexOf("#")===0&&(e=e.slice(1)),e.length===3&&(e=""+e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),e.length===6){let t=parseInt(e.slice(0,2),16),n=parseInt(e.slice(2,4),16),s=parseInt(e.slice(4,6),16);return t*.299+n*.587+s*.114>156?"#000000":"#FFFFFF"}};l.getColorShade=function(e,t){if(arguments.length===2&&(e.length===6||e.length===7)&&!isNaN(t)){let n=!1;e[0]==="#"&&(e=e.slice(1),n=!0);let s=parseInt(e,16),i=(s>>16)+t;i>255?i=255:i<0&&(i=0);let r=(s&255)+t;r>255?r=255:r<0&&(r=0);let o=(s>>8&255)+t;return o>255?o=255:o<0&&(o=0),(n?"#":"")+("000000"+(r|o<<8|i<<16).toString(16)).slice(-6)}};l.getElementViewportStatus=function(e,t){let n=arguments,s=l(e),i=0,r;if(n.length>0&&s.length===1){r=s[0],n.length>1&&t!=null&&!isNaN(t)&&(i=t);let o={left:0,top:0,right:window.innerWidth,bottom:window.innerHeight},f=r.getBoundingClientRect(),h={top:f.top-i,left:f.left-i,bottom:f.bottom+r.offsetHeight+i,right:f.right+r.offsetWidth+i};return{result:!(o.top>h.top||o.left>h.left||o.bottom<h.bottom||o.right<h.right),topExceeded:h.top<o.top,leftExceeded:h.left<o.left,bottomExceeded:h.bottom>o.bottom,rightExceeded:h.right>o.right}}};l.getSelectedContent=function(e,t,n){let s=arguments,i=l(e);if(typeof window.getSelection!==void 0){let r=window.getSelection();if(r.rangeCount){let o=document.createElement("div");o.appendChild(r.getRangeAt(0).cloneContents());let f=o.innerText;return s.length>0&&(s.length>1&&i.length&&t&&i[0].focus(),s.length===3&&(n?f=o.innerHTML:f=o.innerText),i.val(f)),f}}};l.copyTextToClipboard=function(e){var t;return(t=navigator==null?void 0:navigator.clipboard)!=null&&t.writeText?navigator.clipboard.writeText(e):Promise.reject("The Clipboard API is not available.")};l.pad=function(e,t,n){if(arguments.length>1){let s=""+e;for(;s.length<t;)arguments.length>2&&n?s=s+"0":s="0"+s;return s}return e};l.truncate=function(e,t,n){if(arguments.length>1){let s="";for(let i=0;i<t;i++)s+=e.charAt(i);return n?s+" &hellip;":s}return e};l.capitalizeFirstLetter=function(e){return e&&e.length?e.length>1?e[0].toUpperCase()+e.slice(1):e[0].toUpperCase():e};l.limitWords=function(e,t,n){if(arguments.length>1){let s=e.split(" ");return s.splice(t,s.length-1),s.join(" ")+(s.length<e.split(" ").length&&n?"&hellip;":"")}return e};l.getCookie=function(e){try{let t=document.cookie.indexOf(e+"="),n=t+e.length+1;if(!t&&e!=document.cookie.substring(0,e.length)||t===-1)return;let s=document.cookie.indexOf(";",n);return s===-1&&(s=document.cookie.length),decodeURIComponent(document.cookie.substring(n,s))}catch{return}};l.setCookie=function(e,t,n,s,i,r){try{let o=new Date;o.setTime(o.getTime()),n&&(n=n*1e3*60*60*24);let f=new Date(o.getTime()+n);return document.cookie=e+"="+encodeURIComponent(t)+(n?";expires="+f.toUTCString():"")+(s?";path="+s:"")+(i?";domain="+i:"")+(r?";secure":""),!0}catch{return!1}};l.deleteCookie=function(e,t,n){try{return ui.getCookie(e)?(document.cookie=e+"="+(t?";path="+t:"")+(n?";domain="+n:"")+";expires=Thu, 01-Jan-1970 00:00:01 GMT",!0):!1}catch{return!1}};l.bind=e=>{const t=Object.assign({},e);for(const n in e)delete e[n];for(const n in t){Object.defineProperty(e,n,{get(){let i=l("[data-model='"+n+"']");if(i&&i.length===1){if("value"in i.element())return i.val();if("innerText"in i.element())return i.text()}else if(i&&i.length>1){let r=[];for(let o=0;o<i.length;o++){let f=i[o];"value"in f?r.push(l(f).val()):"innerText"in f&&r.push(l(f).innerText)}return r}},set(i){let r=l("[data-model='"+n+"']");if(r&&r.length===1)"value"in r.element()?r.val(i):"innerText"in r.element()&&r.text(i);else if(r&&r.length>1)for(let f=0;f<r.length;f++){let h=r[f];"value"in h?l(h).val(i):"innerText"in h&&l(h).text(i)}let o=l("[data-bind='"+n+"']");if(o&&o.length===1)"value"in o.element()?o.val(e[n]):"innerText"in o.element()&&o.text(e[n]);else if(o&&o.length>1)for(let f=0;f<o.length;f++){let h=o[f];"value"in h?l(h).val(e[n]):"innerText"in h&&l(h).text(e[n])}}}),e[n]=t[n];let s=l("[data-model='"+n+"']");if(s&&s.length===1)"value"in s.element()&&s.input(()=>{let i=l("[data-bind='"+n+"']");if(i&&i.length===1)"value"in i.element()?i.val(e[n]):"innerText"in i.element()&&i.text(e[n]);else if(i&&i.length>1)for(let r=0;r<i.length;r++){let o=i[r];"value"in o?l(o).val(e[n]):"innerText"in o&&l(o).text(e[n])}});else if(s&&s.length>1)for(let i=0;i<s.length;i++){let r=s[i];l(r).input(()=>{let o=l("[data-bind='"+n+"']");if(o&&o.length===1)"value"in o.element()?o.val(e[n]):"innerText"in o.element()&&o.text(e[n]);else if(o&&o.length>1)for(let f=0;f<o.length;f++){let h=o[f];"value"in h?l(h).val(e[n]):"innerText"in h&&l(h).text(e[n])}})}}};let k=null;l.signal=e=>{const t=new Set;return{get value(){return k&&t.add(k),e},set value(n){e=n,t.forEach(s=>s())}}};l.watch=e=>{k=e,e(),k=null};l.computed=e=>{const t=l.signal();return l.watch(()=>{t.value=e()}),t};l.getFormData=e=>{const t=l(e);if(t&&t.length&&t.length===1){const n=new FormData(t[0]),s=Object.fromEntries(n);if(Object.keys(s).length>0)return s}};l.getJsonFormData=e=>{const t=l.getFormData(e);return t&&JSON.stringify(t)};l.extend=function(){for(let e=1;e<arguments.length;e++)for(let t in arguments[e])arguments[e].hasOwnProperty(t)&&(typeof arguments[0][t]=="object"&&typeof arguments[e][t]=="object"?l.extend(arguments[0][t],arguments[e][t]):arguments[0][t]=arguments[e][t]);return arguments[0]};l.on=(e,t)=>{document.addEventListener(e,t)};l.off=(e,t)=>{document.removeEventListener(e,t)};l.ready=function(e,t){t?document.readyState==="complete"?e():window.addEventListener("load",e):document.readyState!=="loading"?e():document.addEventListener("DOMContentLoaded",e)};l.version="0.0.2";l(".checkbox input:not([disabled]):not([readonly]) + label").keyDown(function(e){(e.which===13||e.which===32)&&(e.preventDefault(),this.click())});l(".radio input:not([disabled]):not([readonly]) + label").keyDown(function(e){(e.which===13||e.which===32)&&(e.preventDefault(),this.click())});l("[class*='toggle-button'] input:not([disabled]):not([readonly]) + label").keyDown(function(e){(e.which===13||e.which===32)&&(e.preventDefault(),this.click())});l("[class*='toggle-switch'] input:not([disabled]):not([readonly]) + label").keyDown(function(e){(e.which===13||e.which===32)&&(e.preventDefault(),this.click())});l(".toggle-activator").click(function(e){e.preventDefault();let t=l(this).data("target");if(t||(t=l(this).attr("href")),t&&t.length){let n=l(this).closest(".toggle-container");x(t,n,this)}});l(".toggle-deactivator").click(function(e){e.preventDefault();let t=l(this).data("target");if(t||(t=l(this).attr("href")),t&&t.length){let n=l(this).closest(".toggle-container");x(t,n)}});l(".toggle-activator-focus").focus(function(e){e.preventDefault();let t=l(this).data("target");if(t||(t=l(this).attr("href")),t&&t.length){let n=l(this).closest(".toggle-container");x(t,n)}});l(".toggle-deactivator-focus").blur(function(e){e.preventDefault();let t=l(this).data("target");if(t||(t=l(this).attr("href")),t&&t.length){let n=l(this).closest(".toggle-container");x(t,n)}});l(".toggle-activator-hover").hoverIn(function(e){e.preventDefault();let t=l(this).data("target");if(t||(t=l(this).attr("href")),t&&t.length){let n=l(this).closest(".toggle-container");x(t,n)}});l(".toggle-deactivator-hover").hoverOut(function(e){e.preventDefault();let t=l(this).data("target");if(t||(t=l(this).attr("href")),t&&t.length){let n=l(this).closest(".toggle-container");x(t,n)}});l(document).click(function(e){if(!l(e.target).parents(".toggle-container").length){let n=l(this).find(".toggle-container");if(n.length)for(let s=0;s<n.length;s++){let i=l(n[s]),r=i.data("close-external");if(r&&r.length){let o=i.find(r);if(o.length)for(let f=0;f<o.length;f++){let h=l(o[f]);!h.hasClass("off-canvas-closed")&&h.css("display")!=="none"&&x(r,i)}}}}});l.ready(()=>{l(".checkbox label").attr("tabindex","0").attr("role","checkbox"),l(".radio label").attr("tabindex","0").attr("role","radio"),l("[class*='toggle-button'] label").attr("tabindex","0").attr("role","button"),l("[class*='toggle-button'] input").attr("tabindex","-1"),l("[class*='toggle-switch'] label").attr("tabindex","0").attr("role","button"),l("[class*='toggle-switch'] input").attr("tabindex","-1"),l(".checkbox input[disabled] + label").attr("tabindex","-1"),l(".radio input[disabled] + label").attr("tabindex","-1"),l("[class*='toggle-button'] input[disabled] + label").attr("tabindex","-1"),l("[class*='toggle-switch'] input[disabled] + label").attr("tabindex","-1"),l(".checkbox.disabled label").attr("tabindex","-1"),l(".radio.disabled label").attr("tabindex","-1"),l("[class*='toggle-button'].disabled label").attr("tabindex","-1"),l("[class*='toggle-switch'].disabled label").attr("tabindex","-1"),l(".disabled-group .checkbox label").attr("tabindex","-1"),l(".disabled-group .radio label").attr("tabindex","-1"),l(".disabled-group [class*='toggle-button'] label").attr("tabindex","-1"),l(".disabled-group [class*='toggle-switch'] label").attr("tabindex","-1"),l(".off-canvas-left, .off-canvas-right").addClass("off-canvas-closed"),l(".off-canvas-body").parents("body").css("overflow-x","hidden")});const B=(e,t)=>{for(var n=l.extend({zoomFactor:1.1,trigger:"hover",transitionDuration:300,zoomInCallback:null,zoomOutCallback:null},t),s=l(e),i=0;i<s.length;i++){var r=l(s[i]);r.css("transition","all "+n.transitionDuration/1e3+"s ease-in"),n.trigger==="hover"?(r.hoverIn(function(o){l(this).css("transform","scale("+n.zoomFactor+")"),n.zoomInCallback&&n.zoomInCallback(o)}),r.hoverOut(function(o){l(this).css("transform","scale(1)"),n.zoomOutCallback&&n.zoomOutCallback(o)})):n.trigger==="focus"&&(r.focus(function(o){l(this).css("transform","scale("+n.zoomFactor+")"),n.zoomInCallback&&n.zoomInCallback(o)}),r.blur(function(o){l(this).css("transform","scale(1)"),n.zoomOutCallback&&n.zoomOutCallback(o)}))}};B(".zoom-image",{zoomFactor:1.2,trigger:"hover",transitionDuration:300,zoomInCallback:null,zoomOutCallback:null});let I=l.signal(0);const $=l("#btnCount").click(()=>I.value++);l.watch(()=>{$.text(I.value)});let j=l.computed(()=>I.value*2);l.watch(()=>{l("#computed").text(j.value)});l.bind({firstName:"",lastName:""});const L=new Object;L.fname="";L.lname="";L.address="";l.bind(L);let N=l.signal("");l.watch(()=>{l("textarea").val(N.value)});l("form").submit(e=>{e.preventDefault(),N.value=l.getJsonFormData("form")});
