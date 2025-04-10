import '@asyncdesign-css/webui.css';
import '@/assets/index.css';


const isString = (el) => {
  return typeof el === "string";
}

const isArray = (el) => {
  return Array.isArray(el);
}

const isObject = function (el) {
  return el instanceof Object;
}

const isFunction = (el) => {
  return ({}).toString.call(el) === "[object Function]";
}

const isElement = function (el) {
  return el instanceof Element;
}

const isTextarea = function (el) {
  return el && el.nodeName === "TEXTAREA";
}

const isSelect = function (el) {
  return el && el.nodeName === "SELECT";
}

const isDatalist = function (el) {
  return el && el.nodeName === "DATALIST";
}

const isCheckbox = function (el) {
  return el && el.getAttribute("type") === "checkbox";
}

const isRadio = function (el) {
  return el && el.getAttribute("type") === "radio";
}

const isButton = function (el) {
  if (el && el.nodeName === "BUTTON" || el && el.nodeName === "INPUT" && el.getAttribute("type") === "button") {
    return true;
  }
  return false;
}

const isTextbox = function (el) {
  if (el && el.nodeName === "INPUT") {
    if (el.getAttribute("type") === null || ~["text", "number", "password", "date", "time", "search", "tel", "email", "url"].indexOf(el.getAttribute("type"))) {
      return true;
    }
  }
  return false;
}

const isArrayLike = (obj) => {
  let length = obj.length,
    type = typeof obj;

  if (isFunction(type) || obj === window) {
    return false;
  }

  if (obj.nodeType === 1 && length) {
    return true;
  }

  return isArray(type) || length === 0 ||
    typeof length === "number" &&
    length > 0;
}

const addNodes = (wrapper, nl) => {
  let w = wrapper || [],
    i = w.length,
    j = nl.length,
    k = 0;

  while (k < j) {
    w[i++] = nl[k++];
  }
  w.length = i;

  return w;
}

const addObjects = (wrapper, obj) => {
  let w = wrapper || [];

  if (obj !== null) {
    if (isArrayLike(obj)) {
      addNodes(w, isString(obj) ? [obj] : obj);
    } else {
      w.push(obj);
    }
  }
  return w;
}	

const selectorValueEquals = (selector, value) => {
  let el = webui(selector);

  if (el.length === 1) {
    return (isTextbox(el[0]) && el.val() === value) || (isTextarea(el[0]) && el.text() === value) || (isButton(el[0]) && el.text() === value) ||
      (isSelect(el[0]) && el.find("option:checked").text() === value) ||
      (isCheckbox(el[0]) && el.is(":checked") === value) ||
      (isRadio(el[0]) && el.is(":checked") === value);
  }
  return false;
}

const switchClasses = (selector, currentCssClass, newCssClass) => {
  let els = webui(selector);

  if (isString(currentCssClass) && currentCssClass.trim()) {
    els.removeClass(currentCssClass);
  }
  if (isString(newCssClass) && newCssClass.trim()) {
    els.addClass(newCssClass);
  }
}

const delay = (delay, callback) => {
  if (delay) {
    setTimeout(() => {
        callback();
    }, delay);
  }
  else {
    callback();
  }
}

const runToggleAction = (selector, toggleContainer, toggleActivator) => {
  
  if (toggleContainer.length) {

    let toggleBody = webui(".off-canvas-body"),
      toggleItem = toggleContainer.find(selector),

      transitionDuration = parseInt(toggleContainer.data("transition-duration")),
      transitionInDelay = toggleContainer.data("transition-in-delay"),
      transitionOutDelay = toggleContainer.data("transition-out-delay"),
      transitionType = toggleContainer.data("transition-type"),
      transitionOrientation = toggleContainer.data("transition-orientation"),
      transitionDistance = toggleContainer.data("transition-distance"),
      focusElement = toggleContainer.data("focus-element"),
      focusReturnElement = toggleContainer.data("focus-return-element"),
      allowEscapeKey = toggleContainer.data("allow-escape-key"),


      offCanvasDrawer = toggleItem.hasClass("off-canvas-drawer"),
      offCanvas = toggleItem.hasClass("off-canvas-left") || toggleItem.hasClass("off-canvas-right"),
      offCanvasLeft = toggleItem.hasClass("off-canvas-left"),

      activator = arguments.length === 3 && toggleActivator ? webui(toggleActivator) : null;	


    if (toggleItem.length) {

      let toggleItemWidth = toggleItem[0].offsetWidth;

      if (!offCanvasDrawer && offCanvas && toggleBody.length) {

        webui(".off-canvas-left, .off-canvas-right").css("transition-duration", (transitionDuration / 1000) + "s");
        toggleBody.css("transition-duration", (transitionDuration / 1000) + "s");

        if (toggleItem.hasClass("off-canvas-closed")) {

          toggleItem.trigger("ui.toggleItem.show.before");

          delay(transitionInDelay, () => {
            toggleItem.find(".toggle-item-content").show();
            toggleItem.removeClass("off-canvas-closed");
            
            if (offCanvasLeft) {
              toggleItem.css("transform", "translate(0, 0)");
              toggleBody.css("transform", "translate(" + toggleItemWidth + "px, 0)");
            }
            else {
              toggleItem.css("transform", "translate(0, 0)");
              toggleBody.css("transform", "translate(-" + toggleItemWidth + "px, 0)");
            }
            toggleItem[0].ontransitionend = (event) => { toggleItem.trigger("ui.toggleItem.show.after"); }
        
            if (focusElement) {
              let focusEl = toggleItem.find(focusElement).first();
        
              if (focusEl && !focusEl.attr("disabled") === null && !focusEl.attr("readonly")) {
                focusEl[0].focus();
              }	
            }
  
          });				
        } 
        else {
                
          toggleItem.trigger("ui.toggleItem.hide.before");

          delay(transitionOutDelay, () => {
            if (offCanvasLeft) {
              toggleItem.css("transform", "translate(-" + toggleItemWidth + "px, 0)");
              toggleBody.css("transform", "translate(0, 0)");								
            }
            else {
              toggleItem.css("transform", "translate(" + toggleItemWidth + "px, 0)");
              toggleBody.css("transform", "translate(0, 0)");
            }
            toggleItem.addClass("off-canvas-closed");
            toggleItem.find(".toggle-item-content").hide();
            toggleItem[0].ontransitionend = (event) => { toggleItem.trigger("ui.toggleItem.hide.after"); }

            if (focusReturnElement) {
              let returnEl = webui(focusReturnElement).first();
  
              if (returnEl && !returnEl.attr("disabled") === null && !returnEl.attr("readonly")) {
                returnEl[0].focus();
              }
            }
  
          });				
        }
      }
      else if (offCanvas) {

        webui(".off-canvas-left, .off-canvas-right").css("transition-duration", (transitionDuration / 1000) + "s");
      
        if (toggleItem.hasClass("off-canvas-closed")) {

          toggleItem.trigger("ui.toggleItem.show.before");

          delay(transitionInDelay, () => {
            toggleItem.find(".toggle-item-content").show();
            toggleItem.removeClass("off-canvas-closed");
            
            if (offCanvasLeft) {
              toggleItem.css("transform", "translate(0, 0)");
            }
            else {
              toggleItem.css("transform", "translate(0, 0)");
            }
            toggleItem[0].ontransitionend = (event) => { toggleItem.trigger("ui.toggleItem.show.after"); }

            if (focusElement) {
              let focusEl = toggleItem.find(focusElement).first();
        
              if (focusEl && !focusEl.attr("disabled") === null && !focusEl.attr("readonly")) {
                focusEl[0].focus();
              }	
            }

          });			
        } 
        else {
                
          toggleItem.trigger("ui.toggleItem.hide.before");

          delay(transitionOutDelay, () => {
            if (offCanvasLeft) {
              toggleItem.css("transform", "translate(-" + toggleItemWidth + "px, 0)");
            }
            else {
              toggleItem.css("transform", "translate(" + toggleItemWidth + "px, 0)");
            }
            toggleItem.addClass("off-canvas-closed");
            toggleItem.find(".toggle-item-content").hide();
            toggleItem[0].ontransitionend = (event) => { toggleItem.trigger("ui.toggleItem.hide.after"); }

            if (focusReturnElement) {
              let returnEl = webui(focusReturnElement).first();
  
              if (returnEl && !returnEl.attr("disabled") === null && !returnEl.attr("readonly")) {
                returnEl[0].focus();
              }
            }

          });						
        }
      }
      else {
        let els = toggleItem, el;

        for (let i = 0; i < els.length; i++) {

          el = webui(els[i]);

          if (el.css("display") === "block") {

            el.trigger("ui.toggleItem.hide.before");

            delay(transitionOutDelay, () => {
              if (transitionDuration && transitionType === "fade") {
                el.fadeOut(transitionDuration, 0, () => {
                  el.trigger("ui.toggleItem.hide.after");

                  if (activator) {
                    activator.find("[class*='nav-indicator']").removeClass("active");				
                  }			
                });
              }
              else if (transitionDuration && transitionType === "collapse") {
                if (transitionOrientation === "horizontal") {
                  el.collapseHorizontal({ duration: transitionDuration }, () => {
                    el.trigger("ui.toggleItem.hide.after");
      
                    if (activator) {
                      activator.find("[class*='nav-indicator']").removeClass("active");				
                    }
                  });
                }
                else {
                  el.collapseVertical({ duration: transitionDuration }, () => {
                    el.trigger("ui.toggleItem.hide.after");

                    if (activator) {
                      activator.find("[class*='nav-indicator']").removeClass("active");				
                    }
                  });
                }
              }
              else {
                el.hide();
                el.trigger("ui.toggleItem.hide.after");

                if (activator) {
                  activator.find("[class*='nav-indicator']").removeClass("active");				
                }
              }	

              if (focusReturnElement) {
                let returnEl = webui(focusReturnElement).first();
    
                if (returnEl && !returnEl.attr("disabled") === null && !returnEl.attr("readonly")) {
                  returnEl[0].focus();
                }
              }

            });	
          } 
          else {
            el.trigger("ui.toggleItem.show.before");

            delay(transitionInDelay, () => {
              if (transitionDuration && transitionType === "fade") {
                el.fadeIn(transitionDuration, 0, () => {
                  el.trigger("ui.toggleItem.show.after");

                  if (activator) {
                    activator.find("[class*='nav-indicator']").addClass("active");
                  }
                });
              }
              else if (transitionDuration && transitionType === "collapse") {
                if (transitionOrientation === "horizontal") {
                  if (transitionDistance) {
                    el.expandHorizontal({ duration: transitionDuration, targetWidth: transitionDistance }, () => {
                      el.trigger("ui.toggleItem.show.after");

                      if (activator) {
                        activator.find("[class*='nav-indicator']").addClass("active");
                      }
                    });											
                  }
                  else {
                    el.expandHorizontal({ duration: transitionDuration }, () => {
                      el.trigger("ui.toggleItem.show.after");

                      if (activator) {
                        activator.find("[class*='nav-indicator']").addClass("active");
                      }
                    });
                  }
                }
                else {
                  if (transitionDistance) {
                    el.expandVertical({ duration: transitionDuration, targetHeight: transitionDistance }, () => {
                      el.trigger("ui.toggleItem.show.after");

                      if (activator) {
                        activator.find("[class*='nav-indicator']").addClass("active");
                      }
                    });
                  }
                  else {
                    el.expandVertical({ duration: transitionDuration }, () => {
                      el.trigger("ui.toggleItem.show.after");

                      if (activator) {
                        activator.find("[class*='nav-indicator']").addClass("active");
                      }
                    });										
                  }
                }
              }
              else {
                el.show();
                el.trigger("ui.toggleItem.show.after");

                if (activator) {
                  activator.find("[class*='nav-indicator']").addClass("active");
                }
              }

              if (focusElement) {
                let focusEl = toggleItem.find(focusElement).first();
          
                if (focusEl && !focusEl.attr("disabled") === null && !focusEl.attr("readonly")) {
                  focusEl[0].focus();
                }	
              }

            });
            
            if (!toggleContainer.hasClass("toggle-inclusive")) {

              delay(transitionOutDelay, () => {
                if (transitionDuration && transitionType === "fade") {
                  el.siblings(".toggle-item").fadeOut(transitionDuration);

                  if (activator) {
                    activator.siblings(".toggle-activator").find("[class*='nav-indicator']").removeClass("active");				
                  }
                }
                else if (transitionDuration && transitionType === "collapse") {
                  if (transitionOrientation === "horizontal") {
                    el.siblings(".toggle-item").collapseHorizontal({ duration: transitionDuration });	

                    if (activator) {
                      activator.siblings(".toggle-activator").find("[class*='nav-indicator']").removeClass("active");				
                    }
                  }
                  else {
                    el.siblings(".toggle-item").collapseVertical({ duration: transitionDuration });	

                    if (activator) {
                      activator.siblings(".toggle-activator").find("[class*='nav-indicator']").removeClass("active");				
                    }
                  }
                }
                else {
                  el.siblings(".toggle-item").hide();

                  if (activator) {
                    activator.siblings(".toggle-activator").find("[class*='nav-indicator']").removeClass("active");				
                  }
                }
              });
            }
          }
        }
      }
    }

    if (allowEscapeKey === "true") {
      toggleContainer.keyDown((e) => {	
        if (e.which === 27) {
          e.preventDefault();
          toggleContainer[0].click();
        }
      });
    }	

  }
}


const selectorRegExp = /^([a-zA-Z0-9_=\-\s\[\]\.\#\*\,\>\+\~\(\)\:\"\']{1,255})$/;
const domFragRegExp = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;

const webui = (selector) => {
  return new fn.o(selector);
}

const fn = webui.fn = webui.prototype = {
  length: 0,

  o: function (selector) {    

    if (!selector) {
      return this;
    }

    if (selector.nodeType) {
      this[0] = selector;
      this.length = 1;
      return this;
    }

    if (selector instanceof webui) {
      return selector;
    }

    if (isString(selector)) {
      if (selectorRegExp.test(selector)) {
        let nl = document.querySelectorAll(selector);
        if (nl.length === 0) {
          return this;
        }
        else if (nl.length === 1) {
          this[0] = nl[0];
          this.length = 1;
          return this;
        }
        else if (nl.length > 1) {
          return addNodes(this, nl);
        }
      }
      else if (domFragRegExp.test(selector)) {
        let nl = document.createRange().createContextualFragment(selector).childNodes;

        return addNodes(this, nl);
      }
    }
    return addObjects(this, selector);
  },
  at: [].at,
  concat: [].concat,
  every: [].every,
  filter: [].filter,
  find: [].find,
  forEach: [].forEach,
  includes: [].includes,
  indexOf: [].indexOf,
  join: [].join,
  map: [].map,
  pop: [].pop,
  push: [].push,
  reduce: [].reduce,
  reduceRight: [].reduceRight,
  reverse: [].reverse,
  shift: [].shift,
  slice: [].slice,
  some: [].some,
  sort: [].sort,
  splice: [].splice,
  toReversed: [].toReversed,
  toSorted: [].toSorted,
  toSpliced: [].toSpliced,
  unshift: [].unshift
};

fn.constructor = webui;
fn.o.prototype = fn;


fn.add = function (nodeList) {
  if (NodeList.prototype.isPrototypeOf(nodeList) || (isArray(nodeList) && nodeList.every(item => item instanceof HTMLElement))) {
    let nl = this.elements().concat(nodeList);
    return webui(nl);
  }
  return this;
};

fn.get = function (index) {
  if (this.length) {
    return webui(this[index]);
  }
  return undefined;
};

fn.first = function () {
  if (this.length) {
    return webui(this[0]);
  }
  return undefined;
};

fn.last = function () {
  if (this.length) {
    return webui(this[this.length - 1]);
  }
  return undefined;
};

fn.find = function (query) {
  let nodes = [],
    el;

  for (let i = 0; i < this.length; i++) {
    let els = this[i].querySelectorAll(query);
    for (let j = 0; j < els.length; j++) {
      if (!~nodes.indexOf(el = els[j]) && el) {
        nodes.push(el);
      }
    }
  }
  return webui(nodes);
};

fn.select = function (query) {

  let nodes = Array.from(this.elements()).filter(element => 
    element.matches(query)
  );
  return webui(nodes);
};

fn.element = function () {
  if (this.length && this.length === 1) {
    return this[0];
  }
  return undefined;
};

fn.elements = function () {
  let nodes = [];
  for (let i = 0; i < this.length; i++) {
    nodes.push(this[i]);
  }
  return nodes;
};

fn.siblings = function (query) {
  let args = arguments.length,
    nodes = [];

  for (let i = 0; i < this.length; i++) {
    let els = args ? webui(this[i].parentNode.children).select(query) : webui(this[i].parentNode.children).select("*");

    if (els && els.length) {
      for (let j = 0; j < els.length; j++) {
        if (els[j] !== this[i] && !~nodes.indexOf(els[j])) {
          nodes.unshift(els[j]);
        }
      }
    }
  }
  return webui(nodes);
};

fn.prevSibling = function (query) {
  let args = arguments.length,
    nodes = [];

  for (let i = 0; i < this.length; i++) {
    let el = this[i].previousElementSibling;
    if (el) {
      nodes.push(el);
    }
  }
  return args ? webui(nodes).select(query) : webui(nodes);
};

fn.prevSiblings = function (query) {
  let args = arguments.length,
    nodes = [];

  for (let i = 0; i < this.length; i++) {
    let el = this[i];

    while (el = el.previousElementSibling) {
      nodes.push(el);
    }
  }
  return args ? webui(nodes).select(query) : webui(nodes);
};


fn.nextSibling = function (query) {
  let args = arguments.length,
    nodes = [];

  for (let i = 0; i < this.length; i++) {
    let el = this[i].nextElementSibling;
    if (el) {
      nodes.push(el);
    }
  }
  return args ? webui(nodes).select(query) : webui(nodes);
};

fn.nextSiblings = function (query) {
  let args = arguments.length,
    nodes = [];

  for (let i = 0; i < this.length; i++) {
    let el = this[i];

    while (el = el.nextElementSibling) {
      nodes.push(el);
    }
  }
  return args ? webui(nodes).select(query) : webui(nodes);
};


fn.parent = function (query) {
  let args = arguments.length,
    nodes = [],
    parent;

  for (let i = 0; i < this.length; i++) {
    if (!~nodes.indexOf(parent = this[i].parentElement) && parent) {
      nodes.push(parent);
    }
  }
  return args ? webui(nodes).select(query) : webui(nodes);
};

fn.parents = function (query) {
  let args = arguments.length,
    nodes = [],
    el;

  for (let i = 0; i < this.length; i++) {
    el = this[i];

    while (el = el.parentElement) {

      if (el) {
        if (!~nodes.indexOf(el)) {
          nodes.push(el);
        }
      }
    }
  }
  return args ? webui(nodes).select(query) : webui(nodes);
};

fn.closest = function (query) {
  let nodes = [],
    el, matchedEl;

  for (let i = 0; i < this.length; i++) {
    el = this[i];
    
    while (el = el.parentElement) {
      matchedEl = webui(el).selectFirst(query);

      if (matchedEl) {
        if (!~nodes.indexOf(matchedEl[0])) {
          nodes.push(matchedEl[0]);
        }
        break;
      }
    }
  }
  return webui(nodes);
};

fn.children = function (query) {
  let args = arguments,
    nodes = [],
    child;

  if (args.length === 0) {
    for (let i = 0; i < this.length; i++) {
      let children = this[i].children;
      for (let j = 0; j < children.length; j++) {
        if (!~nodes.indexOf(child = children[j]) && child) {
          nodes.push(child);
        }
      }
    }
  }
  else {
    let els = document.querySelectorAll(query);
    for (let i = 0; i < this.length; i++) {
      let children = this[i].children;
      for (let j = 0; j < children.length; j++) {
        for (let k = 0; k < els.length; k++) {
          if (!~nodes.indexOf(child = children[j]) && child && child === els[k]) {
            nodes.push(child);
          }
        }
      }
    }				
  }
  return webui(nodes);
};

fn.append = function (elements, appendToStart) {
  let args = arguments,
    els, el;

  if (isObject(elements) || (isString(elements) && domFragRegExp.exec(elements))) {
    els = webui(elements);

    if (args.length === 1 || (args.length === 2 && !appendToStart)) {
      for (let i = 0; i < this.length; i++) {
        el = this[i];
        if (el.nodeType === 1 || el.nodeType === 11 || el.nodeType === 9) {
          for (let j = 0; j < els.length; j++) {
            el.appendChild(els[j]);
          }
        }
      }
    }
    else if (args.length === 2 && appendToStart) {
      for (let i = 0; i < this.length; i++) {
        el = this[i];
        if (el.nodeType === 1 || el.nodeType === 11 || el.nodeType === 9) {
          for (let j = 0; j < els.length; j++) {
            el.insertBefore(els[j], el.firstChild);
          }
        }
      }
    }
  }
  return this;
};

fn.appendTo = function (to) {
  webui(to).append(this);

  return this;
};

fn.prependTo = function (to) {
  webui(to).append(this, true);

  return this;
};

fn.remove = function () {
  for (let i = 0; i < this.length; i++) {
    this[i].parentNode && this[i].parentNode.removeChild(this[i]);
  }
  return webui([]);
};

fn.removeChildren = function (query) {

  if (arguments.length) {
    webui(this).children().select(query).remove();
  }
  else {
    let el;
    for (let i = 0; i < this.length; i++) {
      el = this[i];
      while (el.lastChild) {
        el.removeChild(el.lastChild);
      }
    }
  }
  return this;
};

fn.hasClass = function (className) {
  for (let i = 0; i < this.length; i++) {
    if (this[i].classList) {
      if (this[i].classList.contains(className)) {
        return true;
      }
    }
    else {
      if (new RegExp("(^| )" + className + "( |$)", "gi").test(this[i].className)) {
        return true;
      }
    }
  }
  return false;
};

fn.addClass = function (className) {
  for (let i = 0; i < this.length; i++) {
    if (this[i].classList) {
      let classNames = className.split(" ");
      for (let j = 0; j < classNames.length; j++) {
        this[i].classList.add(classNames[j]);
      }
    } else {
      this[i].className += " " + className;
    }
  }
  return this;
};

fn.removeClass = function (className) {
  for (let i = 0; i < this.length; i++) {
    if (className === "*") {
      this[i].className = "";
    } else {
      if (this[i].classList) {
        let classNames = className.split(" ");
        for (let j = 0; j < classNames.length; j++) {
          this[i].classList.remove(classNames[j]);
        }
      } else {
        this[i].className = this[i].className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
      }	
    }
  }
  return this;
};

fn.attr = function (attrName, attrValue) {
  let args = arguments,
    values = [];

  if (args.length === 1) {
    for (let i = 0; i < this.length; i++) {
      values.push(this[i].getAttribute(attrName));
    }
    return values.length === 1 ? values[0] : values;
  }
  else if (args.length === 2) {
    if (attrValue === null || attrValue === "") {
      for (let i = 0; i < this.length; i++) {
        this[i].removeAttribute(attrName);
      }
    }
    else {
      for (let i = 0; i < this.length; i++) {
        this[i].setAttribute(attrName, attrValue);
      }
    }
  }
  return this;
};

fn.data = function (dataName, dataValue) {
  let args = arguments,
    name = dataName.toLowerCase(),
    values = [];

  if (args.length === 1) {
    for (let i = 0; i < this.length; i++) {
      values.push(this[i].getAttribute("data-" + name));
    }
    return values.length === 1 ? values[0] : values;
  }
  else if (args.length === 2) {
    if (dataValue === null || dataValue === "") {
      for (let i = 0; i < this.length; i++) {
        this[i].removeAttribute("data-" + name);
      }
    }
    else {
      for (let i = 0; i < this.length; i++) {
        this[i].setAttribute("data-" + name, dataValue);
      }
    }
  }
  return this;
};

fn.css = function (ruleName, ruleValue) {
  let args = arguments,
    styles = [];

  if (args.length === 1) {
    for (let i = 0; i < this.length; i++) {
      let val = window.getComputedStyle(this[i])[ruleName];
      let rect = ruleName === "height" || ruleName === "width" ? this[i].getBoundingClientRect() : null;
      
      if (rect) {
        if (ruleName === "height" && rect.height > parseFloat(val)) {
            val = rect.height + "px";
        }
        else if (ruleName === "width" && rect.width > parseFloat(val)) {
            val = rect.width + "px";
        }
      }
      styles.push(val != "" ? val : this[i].style[ruleName]);
    }
    return styles.length === 1 ? styles[0] : styles;
  }
  else if (args.length === 2) {
    for (let i = 0; i < this.length; i++) {
      this[i].style[ruleName] = ruleValue;
    }
  }
  return this;
};


fn.val = function (value) {
  let args = arguments,
    values = [];

  if (args.length === 1) {
    for (let i = 0; i < this.length; i++) {
      this[i].value = value;
    }
  }
  else {
    for (let i = 0; i < this.length; i++) {
      values.push(this[i].value);
    }
    return values.length === 1 ? values[0] : values;
  }
  return this;
};

fn.checked = function (value) {
  let args = arguments,
    values = [];

  if (args.length === 1) {
    for (let i = 0; i < this.length; i++) {
      this[i].checked = value;
    }
  }
  else {
    for (let i = 0; i < this.length; i++) {
      values.push(this[i].checked);
    }
    return values.length === 1 ? values[0] : values;
  }
  return this;
};

fn.indeterminate = function (value) {
  let args = arguments,
    values = [];

  if (args.length === 1) {
    for (let i = 0; i < this.length; i++) {
      this[i].indeterminate = value;
    }
  }
  else {
    for (let i = 0; i < this.length; i++) {
      values.push(this[i].indeterminate);
    }
    return values.length === 1 ? values[0] : values;
  }
  return this;
};

fn.html = function (value) {
  let args = arguments,
    values = [];

  if (args.length === 1) {
    for (let i = 0; i < this.length; i++) {
      this[i].innerHTML = value;
    }
  }
  else {
    for (let i = 0; i < this.length; i++) {
      values.push(this[i].innerHTML);
    }
    return values.length === 1 ? values[0] : values;
  }
  return this;
};

fn.text = function (value) {
  let args = arguments,
    values = [];

  if (args.length === 1) {
    for (let i = 0; i < this.length; i++) {
      this[i].textContent = value;
    }
  }
  else {
    for (let i = 0; i < this.length; i++) {
      values.push(this[i].textContent);
    }
    return values.length === 1 ? values[0] : values;
  }
  return this;
};

fn.show = function (displayType) {
  let dt = arguments.length > 0 && displayType ? displayType.toLowerCase() : "block";
  for (let i = 0; i < this.length; i++) {
    this[i].style["display"] = dt;
  }
  return this;
};

fn.hide = function () {
  for (let i = 0; i < this.length; i++) {
    this[i].style["display"] = "none";
  }
  return this;
};

fn.visible = function () {
  for (let i = 0; i < this.length; i++) {
    this[i].style["visibility"] = "visible";
  }
  return this;
};

fn.hidden = function () {
  for (let i = 0; i < this.length; i++) {
    this[i].style["visibility"] = "hidden";
  }
  return this;
};

fn.has = function (query) {
  return this.find(query).length > 0 ? true : false;
};

fn.is = function (query) {
  let els = this.parent().find(query);

  for (let i = 0; i < this.length; i++) {
    for (let j = 0; j < els.length; j++) {
      if (this[i] === els[j]) {
        return true;
      }
    }
  }			
  return false;
};

fn.hoverIn = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("mouseenter", callback);
  }
  return this;
};

fn.hoverOut = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("mouseleave", callback);
  }
  return this;
};

fn.mouseUp = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("mouseup", callback);
  }
  return this;
};

fn.mouseDown = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("mousedown", callback);
  }
  return this;
};

fn.mouseMove = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("mousemove", callback);
  }
  return this;
};

fn.focusIn = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("focusin", callback);
  }
  return this;
};

fn.focusOut = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("focusout", callback);
  }
  return this;
};

fn.focus = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("focus", callback);
  }
  return this;
};

fn.blur = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("blur", callback);
  }
  return this;
};

fn.change = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("change", callback);
  }
  return this;
};

fn.input = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("input", callback);
  }
  return this;
};

fn.paste = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("paste", callback);
  }
  return this;
};

fn.keyDown = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("keydown", callback);
  }
  return this;
};

fn.keyUp = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("keyup", callback);
  }
  return this;
};

fn.click = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("click", callback);
  }
  return this;
};

fn.dblclick = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("dblclick", callback);
  }
  return this;
};

fn.submit = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("submit", callback);
  }
  return this;
};

fn.resize = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("resize", callback);
  }
  return this;
};

fn.scroll = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("scroll", callback);
  }
  return this;
};

fn.dragStart = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("dragstart", callback);
  }
  return this;
};

fn.drag = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("drag", callback);
  }
  return this;
};

fn.dragEnd = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("dragend", callback);
  }
  return this;
};

fn.dragEnter = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("dragenter", callback);
  }
  return this;
};

fn.dragOver = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("dragover", callback);
  }
  return this;
};

fn.dragLeave = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("dragleave", callback);
  }
  return this;
};

fn.drop = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("drop", callback);
  }
  return this;
};

fn.transitionStart = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("transitionstart", callback);
  }
  return this;
};

fn.transitionRun = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("transitionrun", callback);
  }
  return this;
};

fn.transitionEnd = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("transitionend", callback);
  }
  return this;
};

fn.touchStart = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("touchstart", callback);
  }
  return this;
};

fn.touchEnd = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("touchend", callback);
  }
  return this;
};

fn.touchMove = function (callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener("touchmove", callback);
  }
  return this;
};

fn.on = function (name, callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener(name, callback);
  }
  return this;
};

fn.off = function (name, callback) {
  for (let i = 0; i < this.length; i++) {
    this[i].removeEventListener(name, callback);
  }
  return this;
};

fn.trigger = function (eventName, args) {
  if (args && args.length) {
    this[0].dispatchEvent(new CustomEvent(eventName, { bubbles: true, cancelable: true, detail: args }));	
  }
  else { 
    this[0].dispatchEvent(new CustomEvent(eventName, { bubbles: true, cancelable: true }));
  }
  return this;
};

fn.toggle = function (displayType) {
  let el, st;

  if (arguments.length === 1) {
    let dt = displayType.toLowerCase();

    if (dt !== "off" && dt !== "none") {
      if (dt === "on") {
        this.css("display", "block");
      }
      else {
        this.css("display", dt);
      }
      this.attr("aria-hidden", "false");
    }
    else {
      this.css("display", "none");
      this.attr("aria-hidden", "true");
    }
  }
  else {
    for (let i = 0; i < this.length; i++) {
      el = this[i];
      st = window.getComputedStyle(el)["display"];

      if (st === "none") {
        el.style["display"] = "block";
        el.setAttribute("aria-hidden", "false");
      }
      else {
        el.style["display"] = "none";
        el.setAttribute("aria-hidden", "true");
      }
    }
  }
  return this;
};

fn.toggleClass = function (className) {
  let el;

  for (let i = 0; i < this.length; i++) {
      el = webui(this[i]);
      if (el.hasClass(className)) {
        el.removeClass(className);
      }
      else {
        el.addClass(className);
      }
  }
  return this;
};

fn.setFocus = function () {
  this.first()[0].focus();
};

fn.reset = function (resetData) {

  this.attr("disabled", null);
  this.attr("readonly", null);

  if (arguments.length === 1 && resetData) {
    let el;
    for (let i = 0; i < this.length; i++) {
      el = this[i];
      if (isTextbox(el) || isSelect(el)) {
        el.value = "";
      }
      else if (isCheckbox(el) || isRadio(el)) {
        el.checked = false;
      }
      else {
        el.textContent = "";
      }
    }
  }
  return this;
};

fn.clear = function () {
  let el;
  for (let i = 0; i < this.length; i++) {
    el = this[i];
    if (isTextbox(el) || isTextarea(el)) {
      el.value = "";
    } 
    else if (isCheckbox(el) || isRadio(el)) {
      el.checked = false;
    } 
    else if (isSelect(el)) {
      webui(el).find("option").remove();
    } 
    else {
      el.textContent = "";
    }
  }
  return this;
};

fn.addOption = function (optionValue, optionText) {
  if (arguments.length === 2) {
    for (let i = 0; i < this.length; i++) {
      if (isSelect(this[i])) {
        webui(this[i]).append(new Option(optionText, optionValue));
      }
    }
  }
  return this;
};

fn.removeOptions = function (selectedOnly) {
  let el;

  for (let i = 0; i < this.length; i++) {
    el = this[i];

    if (arguments.length === 1 && selectedOnly) {
      webui(el).find("option:checked").remove();
    }
    else {
      webui(el).find("option:not(:first-child)").remove();
    }
  }
  return this;
};

fn.setSelectedOption = function (optionIndex) {
  if (arguments.length === 1) {
    for (let i = 0; i < this.length; i++) {
      let option = webui(this[i]).find("option")[optionIndex];
      if (option) { option.selected = true; }
    }
  }
  return this;
};

fn.setOptionText = function (optionIndex, optionText) {
  if (arguments.length === 2) {
    for (let i = 0; i < this.length; i++) {
      let option = webui(this[i]).find("option").eq(optionIndex);
      if (option) { option.html(optionText); }
    }
  }
  return this;
};

fn.getOptionValues = function (selectedOnly) {
  let args = arguments,
    options = [],
    values = [];

  if (args.length === 0 || (args.length === 1 && !selectedOnly)) {
    for (let i = 0; i < this.length; i++) {
      options = webui.addNodes(options, webui(this[i]).find("option"));
    }
  }
  else if (args.length === 1 && selectedOnly) {
    for (let i = 0; i < this.length; i++) {
      options = webui.addNodes(options, webui(this[i]).find("option:checked"));
    }
  }
  for (let i = 0; i < options.length; i++) {
    values.push(options[i].value);
  }
  return values;
};

fn.getOptionLabels = function (selectedOnly, includeHtml) {
  let args = arguments,
    options = [],
    values = [];

  if (args.length === 0 || (args.length === 1 && !selectedOnly)) {
    for (let i = 0; i < this.length; i++) {
      options = webui.addNodes(options, webui(this[i]).find("option"));
    }
  }
  else if (args.length > 0 && selectedOnly) {
    if (args.length === 1 && selectedOnly) {
      for (let i = 0; i < this.length; i++) {
        options = webui.addNodes(options, webui(this[i]).find("option:checked"));
      }
    }
    else if (args.length === 2) {
      if (includeHtml) {
        for (let i = 0; i < options.length; i++) {
          values.push(options[i].innerHTML);
        }
      } 
      else {
        for (let i = 0; i < options.length; i++) {
          values.push(options[i].textContent);
        }      
      }
    }
  }
  return values;
};

fn.moveOptionsTo = function (toSelector, moveAll, deselectAll) {
  let args = arguments,
    toElement = webui(toSelector);

  if (args.length === 1 || (args.length > 1 && !moveAll)) {
    for (let i = 0; i < this.length; i++) {
      webui(this[i]).find("option:checked").appendTo(toElement);
      webui(this[i]).find("option:checked").remove();
    }
  }
  else if (args.length > 1 && moveAll) {
    for (let i = 0; i < this.length; i++) {
      webui(this[i]).find("option").appendTo(toElement);
      webui(this[i]).find("option").remove();
    }
  }
  if (args.length === 3) {
    if (deselectAll) {
      for (let i = 0; i < toElement.length; i++) {
        toElement[i].selectedIndex = -1;
      }
    }
  }
  return this;
};


/* NON-CHAINABLE FUNCTIONS */

webui.getGuid = function () {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0, v = c === "x" ? r : r & 3 | 8;
      return v.toString(16);
  });
};

webui.sum = (...args) => args.reduce((total, num) => total + num, 0);


webui.elementHoverAt = function (x, y) {
  return webui(document.elementFromPoint(x, y));
};

webui.calculatePointerSpeed = function (event, previousEvent) {
  let 
    x = event.clientX,
    y = event.clientY,
    prevX,
    prevY,
    prevT,
    previousTime,
    distX,
    distY,
    interval,
    velocity;

  if (!previousEvent) { 
    return 0;
  }

  previousTime = previousEvent.time;
  prevX = previousEvent.clientX;
  prevY = previousEvent.clientY;
  prevT = Date.now();
  distX = prevX - x;
  distY = prevY - y;
  interval = prevT - previousTime;

  x = prevX;
  y = prevY;
  velocity = Math.sqrt(distX * distX + distY * distY) / interval;

  return velocity;
};

webui.pxToRem = function (pxValue) {
  let el = document.getElementsByTagName("html")[0];
  return parseFloat(pxValue) / parseFloat(window.getComputedStyle(el)["fontSize"]);
};

webui.remToPx = function (remValue) {
  let el = document.getElementsByTagName("html")[0];
  return parseFloat(window.getComputedStyle(el)["fontSize"]) * parseFloat(remValue);
};

webui.percentHeightToPx = function (element, percentValue) {
  return parseFloat(element.parent().css("height")) / 100 * percentValue;
};

webui.percentWidthToPx = function (element, percentValue) {
  return parseFloat(element.parent().css("width")) / 100 * percentValue;
};

webui.getValueFromCssSize = function (cssSize) {
  if (cssSize && isString(cssSize)) {
    let value = parseFloat(cssSize.replace(/[^0-9.]+/gi, ""));	
    return !isNaN(value) ? value : 0;	
  }
  else if (cssSize && !isNaN(cssSize)) {
    let value = parseFloat(cssSize);
    return !isNaN(value) ? value : 0;	
  }
  return 0;
};

webui.getUnitFromCssSize = function (cssSize) {
  if (cssSize && isString(cssSize)) {
    let value = cssSize.replace(/[^a-z%]+/gi, "");	
    return value.length ? value : "px";		
  }
  return "px";
};

webui.getAvgWidth = function (elements) {
  const els = webui(elements);

  if (els && els.length) {
    let len = els.length, sum = 0;

    for (let i = 0; i < len; i++){
      sum += parseFloat(webui(els[i]).css("width"));
    }	
    return sum/len;
  }
  return undefined;
};

webui.getAvgHeight = function (elements) {
  const els = webui(elements);

  if (els && els.length) {
    let len = els.length, sum = 0;

    for (let i = 0; i < len; i++){
      sum += parseFloat(webui(els[i]).css("height"));
    }	
    return sum/len;
  }
  return undefined;
};

webui.getMaxWidth = function (elements) {
  const els = webui(elements);

  if (els && els.length) {
    let len = els.length, max = 0, width = 0;

    for (let i = 0; i < len; i++) {
        width = parseFloat(webui(els[i]).css("width"));
        if (width > max) {
            max = width;
        }
    }
    return max;
  }
  return undefined;
};

webui.getMaxHeight = function (elements) {
  const els = webui(elements);

  if (els && els.length) {
    let len = els.length, max = 0, height = 0;
    
    for (let i = 0; i < len; i++) {
        height = parseFloat(webui(els[i]).css("height"));
        if (height > max) {
            max = height;
        }
    }
    return max;
  }
  return undefined;
};

webui.getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;


webui.rgbToHex = function (r, g, b) {
  if ((!isNaN(r) && r > -1 && r < 256) && (!isNaN(g) && g > -1 && g < 256) && (!isNaN(b) && b > -1 && b < 256)) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  return undefined;
};

webui.rgbStringToHex = function (rgb) {
  var rgbValues = rgb.replace(/[^\d,]/g, '').split(',');
  rgbValues = rgbValues.slice(0, 3);
  if (rgbValues && rgbValues.length === 3) {
    return "#" + ((1 << 24) + (parseInt(rgbValues[0]) << 16) + (parseInt(rgbValues[1]) << 8) + parseInt(rgbValues[2])).toString(16).slice(1);
  }
  return undefined;
};

webui.getAccessibilityContrastColor = function (hexColor) {
  if (hexColor.indexOf("#") === 0) {
    hexColor = hexColor.slice(1);
  }
  if (hexColor.length === 3) {
    hexColor = "" + hexColor[0] + hexColor[0] + hexColor[1] + hexColor[1] + hexColor[2] + hexColor[2];
  }
  if (hexColor.length === 6) {
    var r = parseInt(hexColor.slice(0, 2), 16), g = parseInt(hexColor.slice(2, 4), 16), b = parseInt(hexColor.slice(4, 6), 16);
    return r * .299 + g * .587 + b * .114 > 156 ? "#000000" : "#FFFFFF";
  }
  return undefined;
};

webui.getColorShade = function (hexColor, rgbValue) {
  if (arguments.length === 2) {
    if ((hexColor.length === 6 || hexColor.length === 7) && !isNaN(rgbValue)) {
      var hasHash = false;
      if (hexColor[0] === "#") {
        hexColor = hexColor.slice(1);
        hasHash = true;
      }
      var num = parseInt(hexColor, 16);
      var r = (num >> 16) + rgbValue;
      if (r > 255) {
        r = 255;
      } else if (r < 0) {
        r = 0;
      }
      var g = (num & 255) + rgbValue;
      if (g > 255) {
        g = 255;
      } else if (g < 0) {
        g = 0;
      }
      var b = (num >> 8 & 255) + rgbValue;
      if (b > 255) {
        b = 255;
      } else if (b < 0) {
        b = 0;
      }
      return (hasHash ? "#" : "") + String("000000" + (g | b << 8 | r << 16).toString(16)).slice(-6);
    }
  }
  return undefined;
};

webui.getElementViewportStatus = function (selector, requiredMargin) {
  let args = arguments,
    els = webui(selector),
    margin = 0,
    el;

  if (args.length > 0) {

    if (els.length === 1) {
      el = els[0];

      if (args.length > 1 && requiredMargin != null && !isNaN(requiredMargin)) {
        margin = requiredMargin;
      }
      let viewport = {
        left: 0,
        top: 0,
        right: window.innerWidth,
        bottom: window.innerHeight
      };
      let clientRect = el.getBoundingClientRect();
      let bounds = {
        top: clientRect.top - margin,
        left: clientRect.left - margin,
        bottom: clientRect.bottom + el.offsetHeight + margin,
        right: clientRect.right + el.offsetWidth + margin
      };
      return {
        result: !(viewport.top > bounds.top || viewport.left > bounds.left || viewport.bottom < bounds.bottom || viewport.right < bounds.right),
        topExceeded: bounds.top < viewport.top,
        leftExceeded: bounds.left < viewport.left,
        bottomExceeded: bounds.bottom > viewport.bottom,
        rightExceeded: bounds.right > viewport.right
      };
    }
  }
  return undefined;
};

webui.getSelectedContent = function (targetSelector, focusTargetSelector, includeHtml) {
  let args = arguments,
    target = webui(targetSelector);

  if (typeof window.getSelection !== void 0) {
    let selection = window.getSelection();
    if (selection.rangeCount) {
      let container = document.createElement("div");
      container.appendChild(selection.getRangeAt(0).cloneContents());
      let content = container.innerText;
      if (args.length > 0) {
        if (args.length > 1 && target.length && focusTargetSelector) {
          target[0].focus();
        }
        if (args.length === 3) {
          if (includeHtml) {
            content = container.innerHTML;
          } else {
            content = container.innerText;
          }
        }
        target.val(content);
      }
      return content;
    }
  }
  return undefined;
};

webui.copyTextToClipboard = function(textToCopy) {
  if (navigator?.clipboard?.writeText) {
    return navigator.clipboard.writeText(textToCopy);
  }
  return Promise.reject('The Clipboard API is not available.');
}

webui.pad = function (number, length, padRight) {
  if (arguments.length > 1) {
    let str = "" + number;
    while (str.length < length) {
      if (arguments.length > 2 && padRight) {
        str = str + "0";
      } else {
        str = "0" + str;
      }
    }
    return str;
  }
  return number;
};

webui.truncate = function (text, length, addEllipsis) {
  if (arguments.length > 1) {
    let str = "";
    for (let i = 0; i < length; i++) {
      str += text.charAt(i);
    }
    return addEllipsis ? str + " &hellip;" : str;
  } 
  return text;
};

webui.capitalizeFirstLetter = function (text) {
  if (text && text.length) {
    return text.length > 1 ? text[0].toUpperCase() + text.slice(1) : text[0].toUpperCase();
  }
  return text;
}

webui.limitWords = function (text, wordCount, addEllipsis) {
  if (arguments.length > 1) {
    let words = text.split(" ");
    words.splice(wordCount, words.length - 1);
    return words.join(" ") + (words.length < text.split(" ").length ? addEllipsis ? "&hellip;" : "" : "");
  } 
  return text;
};

webui.getCookie = function (name) {
  try {
    let start = document.cookie.indexOf(name + "=");
    let len = start + name.length + 1;
    if (!start && name != document.cookie.substring(0, name.length)) {
      return undefined;
    }
    if (start === -1) {
      return undefined;
    }
    let end = document.cookie.indexOf(";", len);
    if (end === -1) {
      end = document.cookie.length;
    }
    return decodeURIComponent(document.cookie.substring(len, end));
  } 
  catch (ex) {
    return undefined;
  }
};

webui.setCookie = function (name, value, expires, path, domain, secure) {
  try {
    let today = new Date();
    today.setTime(today.getTime());
    if (expires) {
      expires = expires * 1e3 * 60 * 60 * 24;
    }
    let expiryDate = new Date(today.getTime() + expires);
    document.cookie = name + "=" + encodeURIComponent(value) + (expires ? ";expires=" + expiryDate.toUTCString() : "") + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + (secure ? ";secure" : "");
    return true;
  } 
  catch (ex) {
    return false;
  }
};

webui.deleteCookie = function (name, path, domain) {
  try {
    if (ui.getCookie(name)) {
      document.cookie = name + "=" + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
      return true;
    } 
    return false;   
  } 
  catch (ex) {
    return false;
  }
};

webui.bind = (object) => {

  const copyObject = Object.assign({}, object);

  for (const key in object) {
    delete object[key];
  }

  for (const propertyName in copyObject) {

    Object.defineProperty(object, propertyName, {

      get () {
        let modelEls = webui("[data-model='" + propertyName + "']");

        if (modelEls && modelEls.length === 1) {
          if ("value" in modelEls.element()) {
            return modelEls.val();
          }
          else if ("innerText" in modelEls.element()) {
            return modelEls.text();
          }
        }
        else if (modelEls && modelEls.length > 1) {
          let values = [];

          for (let i = 0; i < modelEls.length; i++) {
            let el = modelEls[i];

            if ("value" in el) {
              values.push(webui(el).val());
            }
            else if ("innerText" in el) {
              values.push(webui(el).innerText);
            }
          }
          return values;
        }
      },

      set (newValue) {
        let modelEls = webui("[data-model='" + propertyName + "']");

        if (modelEls && modelEls.length === 1) {
          if ("value" in modelEls.element()) {
            modelEls.val(newValue);
          }
          else if ("innerText" in modelEls.element()) {
            modelEls.text(newValue);
          }
        }
        else if (modelEls && modelEls.length > 1) {

          for (let i = 0; i < modelEls.length; i++) {
            let el = modelEls[i];

            if ("value" in el) {
              webui(el).val(newValue);
            }
            else if ("innerText" in el) {
              webui(el).text(newValue);
            }
          }
        }

        let boundlEls = webui("[data-bind='" + propertyName + "']");

        if (boundlEls && boundlEls.length === 1) {
          if ("value" in boundlEls.element()) {
            boundlEls.val(object[propertyName]);
          }
          else if ("innerText" in boundlEls.element()) {
            boundlEls.text(object[propertyName]);
          }
        }
        else if (boundlEls && boundlEls.length > 1) {

          for (let i = 0; i < boundlEls.length; i++) {
            let el = boundlEls[i];

            if ("value" in el) {
              webui(el).val(object[propertyName]);
            }
            else if ("innerText" in el) {
              webui(el).text(object[propertyName]);
            }
          }

        }
      }
    });

    object[propertyName] = copyObject[propertyName];

    let els = webui("[data-model='" + propertyName + "']");

    if (els && els.length === 1) {
      if ("value" in els.element()) {
        els.input(() => {
          let boundlEls = webui("[data-bind='" + propertyName + "']");

          if (boundlEls && boundlEls.length === 1) {
            if ("value" in boundlEls.element()) {
              boundlEls.val(object[propertyName]);
            }
            else if ("innerText" in boundlEls.element()) {
              boundlEls.text(object[propertyName]);
            }
          }
          else if (boundlEls && boundlEls.length > 1) {

            for (let i = 0; i < boundlEls.length; i++) {
              let el = boundlEls[i];

              if ("value" in el) {
                webui(el).val(object[propertyName]);
              }
              else if ("innerText" in el) {
                webui(el).text(object[propertyName]);
              }
            }    
          }
        });
      }
    }
    else if (els && els.length > 1) {
      for (let i = 0; i < els.length; i++) {
        let valueEl = els[i];

        webui(valueEl).input(() => {
          let boundlEls = webui("[data-bind='" + propertyName + "']");

          if (boundlEls && boundlEls.length === 1) {
            if ("value" in boundlEls.element()) {
              boundlEls.val(object[propertyName]);
            }
            else if ("innerText" in boundlEls.element()) {
              boundlEls.text(object[propertyName]);
            }
          }
          else if (boundlEls && boundlEls.length > 1) {

            for (let i = 0; i < boundlEls.length; i++) {
              let el = boundlEls[i];

              if ("value" in el) {
                webui(el).val(object[propertyName]);
              }
              else if ("innerText" in el) {
                webui(el).text(object[propertyName]);
              }
            }    
          }
        });
      }
    }      
  }
}

let subscriber = null

webui.signal = (value) => {

  const subscriptions = new Set();

  return {
    get value() {
      if (subscriber) {
        subscriptions.add(subscriber);
      }
      return value;
    },
    set value(updated) {
      value = updated;
      subscriptions.forEach((fn) => fn());
    }
  }
}

webui.watch = (fn) => {

  subscriber = fn;
  fn();
  subscriber = null;
}

webui.computed = (fn) => {

  const computed = webui.signal();

  webui.watch(() => {
    computed.value = fn();
  })
  return computed;
}

webui.getFormData = (selector) => {

  const els = webui(selector);

  if (els && els.length && els.length === 1) {

    const formData = new FormData(els[0]);
    const entries = Object.fromEntries(formData);

    if (Object.keys(entries).length > 0) {
      return entries;
    }
  }
  return undefined;
};

webui.getJsonFormData = (selector) => {
  const entries = webui.getFormData(selector);

  if (entries) {
    return JSON.stringify(entries);
  }
  return entries;
}

webui.extend = function () {
  for (let i = 1; i < arguments.length; i++) {
    for (let key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) {
        if (typeof arguments[0][key] === 'object' && typeof arguments[i][key] === 'object') {
          webui.extend(arguments[0][key], arguments[i][key]);
        }
        else {
          arguments[0][key] = arguments[i][key];
        }
      }
    }
  }
  return arguments[0];
};

/* EVENT METHODS */

webui.on = (name, callback) => {
  document.addEventListener(name, callback);
};

webui.off = (name, callback) => {
  document.removeEventListener(name, callback);
};


webui.ready = function (callback, waitForComplete) { 

  if (waitForComplete) {
      if (document.readyState === "complete") {
          callback();        
      }
      else {
          window.addEventListener("load", callback);	
      } 
  }
  else {
      if (document.readyState !== "loading") {
          callback();
      }
      else {
          document.addEventListener("DOMContentLoaded", callback);
      }
  }
};

webui.version = "0.0.1";


/* EVENT HANDLERS */

webui(".checkbox input:not([disabled]):not([readonly]) + label").keyDown(function (e) {		
  if (e.which === 13 || e.which === 32) {
    e.preventDefault();
    this.click();
  }
});

webui(".radio input:not([disabled]):not([readonly]) + label").keyDown(function (e) {	
  if (e.which === 13 || e.which === 32) {
    e.preventDefault();
    this.click();
  }
});

webui("[class*='toggle-button'] input:not([disabled]):not([readonly]) + label").keyDown(function (e) {	
  if (e.which === 13 || e.which === 32) {
    e.preventDefault();
    this.click();
  }
});

webui("[class*='toggle-switch'] input:not([disabled]):not([readonly]) + label").keyDown(function (e) {	
  if (e.which === 13 || e.which === 32) {
    e.preventDefault();
    this.click();
  }
});

webui(".toggle-activator").click(function (e) {
  e.preventDefault();
  let selector = webui(this).data("target");
  if (!selector) {
    selector = webui(this).attr("href");
  }

  if (selector && selector.length) {
    let toggleContainer = webui(this).closest(".toggle-container");
    runToggleAction(selector, toggleContainer, this);
  }
});

webui(".toggle-deactivator").click(function (e) {
  e.preventDefault();
  let selector = webui(this).data("target");
  if (!selector) {
    selector = webui(this).attr("href");
  }

  if (selector && selector.length) {
    let toggleContainer = webui(this).closest(".toggle-container");
    runToggleAction(selector, toggleContainer);
  }
});

webui(".toggle-activator-focus").focus(function (e) {
  e.preventDefault();
  let selector = webui(this).data("target");
  if (!selector) {
    selector = webui(this).attr("href");
  }

  if (selector && selector.length) {
    let toggleContainer = webui(this).closest(".toggle-container");
    runToggleAction(selector, toggleContainer);
  }
});

webui(".toggle-deactivator-focus").blur(function (e) {
  e.preventDefault();
  let selector = webui(this).data("target");
  if (!selector) {
      selector = webui(this).attr("href");
  }
  if (selector && selector.length) {
      let toggleContainer = webui(this).closest(".toggle-container");
      runToggleAction(selector, toggleContainer);
  }
});

webui(".toggle-activator-hover").hoverIn(function (e) {
  e.preventDefault();
  let selector = webui(this).data("target");
  if (!selector) {
    selector = webui(this).attr("href");
  }

  if (selector && selector.length) {
    let toggleContainer = webui(this).closest(".toggle-container");
    runToggleAction(selector, toggleContainer);
  }
});

webui(".toggle-deactivator-hover").hoverOut(function (e) {
  e.preventDefault();
  let selector = webui(this).data("target");
  if (!selector) {
      selector = webui(this).attr("href");
  }
  if (selector && selector.length) {
      let toggleContainer = webui(this).closest(".toggle-container");
      runToggleAction(selector, toggleContainer);
  }
});

webui(document).click(function (e) {
  let toggleContainer = webui(e.target).parents(".toggle-container");
  if (!toggleContainer.length) {
    let toggleContainers = webui(this).find(".toggle-container");
    if (toggleContainers.length) {
      for (let i = 0; i < toggleContainers.length; i++) {
        let toggleContainer = webui(toggleContainers[i]);
        let selector = toggleContainer.data("close-external");
        if (selector && selector.length) {
          let toggleItems = toggleContainer.find(selector);
          if (toggleItems.length) {
            for (let j = 0; j < toggleItems.length; j++) {
              let toggleItem = webui(toggleItems[j]);
              if (!toggleItem.hasClass("off-canvas-closed") && toggleItem.css("display") !== "none") {
                runToggleAction(selector, toggleContainer);
              }
            }
          }
        }
      }
    }
  }
});


/* RUN */

webui.ready(() => {

  webui(".checkbox label").attr("tabindex", "0").attr("role", "checkbox");
  webui(".radio label").attr("tabindex", "0").attr("role", "radio");
  webui("[class*='toggle-button'] label").attr("tabindex", "0").attr("role", "button");
  webui("[class*='toggle-button'] input").attr("tabindex", "-1");
  webui("[class*='toggle-switch'] label").attr("tabindex", "0").attr("role", "button");
  webui("[class*='toggle-switch'] input").attr("tabindex", "-1");
  
  webui(".checkbox input[disabled] + label").attr("tabindex", "-1");
  webui(".radio input[disabled] + label").attr("tabindex", "-1");
  webui("[class*='toggle-button'] input[disabled] + label").attr("tabindex", "-1");
  webui("[class*='toggle-switch'] input[disabled] + label").attr("tabindex", "-1");

  webui(".checkbox.disabled label").attr("tabindex", "-1");
  webui(".radio.disabled label").attr("tabindex", "-1");
  webui("[class*='toggle-button'].disabled label").attr("tabindex", "-1");
  webui("[class*='toggle-switch'].disabled label").attr("tabindex", "-1");
  
  webui(".disabled-group .checkbox label").attr("tabindex", "-1");
  webui(".disabled-group .radio label").attr("tabindex", "-1");
  webui(".disabled-group [class*='toggle-button'] label").attr("tabindex", "-1");
  webui(".disabled-group [class*='toggle-switch'] label").attr("tabindex", "-1");
  
  webui(".off-canvas-left, .off-canvas-right").addClass("off-canvas-closed");
  webui(".off-canvas-body").parents("body").css("overflow-x", "hidden");
  
});



export default webui;