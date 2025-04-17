
import webui from '@asyncdesign/webui';

export const zoom = (selector, options) => {

  let settings = webui.extend({
    zoomFactor: 1.1,
    trigger: "hover",
    transitionDuration: 300,
    zoomInCallback: null,
    zoomOutCallback: null
  }, options);


  let controls = webui(selector);

  for (let i = 0; i < controls.length; i++) {

    let control = webui(controls[i]);
    
    control.css("transition", "all " + settings.transitionDuration / 1e3 + "s ease-in");

    if (settings.trigger === "hover") {
      control.hoverIn(function (e) {
        webui(this).css("transform", "scale(" + settings.zoomFactor + ")");
        if (settings.zoomInCallback) {
          settings.zoomInCallback(e);
        }		
      });
      control.hoverOut(function (e) {
        webui(this).css("transform", "scale(1)");
        if (settings.zoomOutCallback) {
          settings.zoomOutCallback(e);
        }		
      });
    }
    else if (settings.trigger === "focus") {
      control.focus(function (e) {
        webui(this).css("transform", "scale(" + settings.zoomFactor + ")");
        if (settings.zoomInCallback) {
          settings.zoomInCallback(e);
        }		
      });
      control.blur(function (e) {
        webui(this).css("transform", "scale(1)");
        if (settings.zoomOutCallback) {
          settings.zoomOutCallback(e);
        }
      });
    }	
  }
  return this;
}
