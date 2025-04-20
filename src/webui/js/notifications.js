import webui from '@asyncdesign/webui';
import '@asyncdesign-css/notifications.css';

const ToastInstance = (container, defaultOptions) => {

  const settings = defaultOptions;

  const showToastItem = () => {

    const toastContainer = container.removeClass("*").addClass("toast-container toast-" + settings.position).css("width", settings.width);
    const itemTemplate = webui(settings.toastItemTemplate);

    if (itemTemplate.length) {

      const toastItem = webui(itemTemplate[0].cloneNode(true));

      if (settings.displayOrder.toLowerCase() === "descending") {
        toastItem.appendTo(toastContainer);
      }
      else {
        if (toastContainer.find(".toast-item").length > 0) {
          toastItem.prependTo(toastContainer);
        }
        else {
          toastItem.appendTo(toastContainer);
        }
      }

      toastItem.trigger("ui.toast.show.before");

      if (settings.transitionDuration) {
        toastItem.fadeIn(settings.transitionDuration).trigger("ui.toast.show.after");
      }
      else {
        toastItem.show().trigger("ui.toast.show.after");
      }

      if (settings.autoHide) {
        setTimeout(function() {
          hideToastItem(toastItem);
        }, settings.duration);
      }	

      var toastClose = toastItem.find(".toast-close");
      if (toastClose.length > 0) {
        toastClose.first().click(function () {
          hideToastItem(toastItem);
        });
      }
    
    }
      
  };

  const hideToastItem = (toastItem) => {

    if (toastItem) {

      toastItem.trigger("ui.toast.hide.before");
      
      if (settings.transitionDuration) {

        toastItem.fadeOut(settings.transitionDuration).trigger("ui.toast.hide.after");
        
        setTimeout(() => {
          toastItem.remove();
        }, settings.transitionDuration);
        
      }
      else {
        toastItem.hide().trigger("ui.toast.hide.after");
      }
    }
  };


  const updateInstance = (newSettings) => {

    if (newSettings.position !== undefined) { settings.position = newSettings.position; }
    if (newSettings.width !== undefined) { settings.width = newSettings.width; }
    if (newSettings.duration !== undefined) { settings.duration = newSettings.duration; }
    if (newSettings.transitionDuration !== undefined) { settings.transitionDuration = newSettings.transitionDuration; }
    if (newSettings.toastItemTemplate !== undefined) { settings.toastItemTemplate = newSettings.toastItemTemplate; }
    if (newSettings.displayOrder !== undefined) { settings.displayOrder = newSettings.displayOrder; }
    if (newSettings.autoHide !== undefined) { settings.autoHide = newSettings.autoHide; }
  };


	return {
		showToastItem: () => showToastItem(),
    updateInstance: (newOptions) => updateInstance(newOptions)
	};

};


export const toast = (selector, options) => {

  let defaultOptions = webui.extend({

    position: "top-right",
    width: "25rem",
    duration: 3000,
    transitionDuration: 300,
    toastItemTemplate: null,
    displayOrder: "ascending",
    autoHide: false

  }, options);

  let o = webui(selector);

  if (o.length > 1) { console.warn("WebUI toast component does not support initialising multiple controls. Initialize a new component instead.") }

  var control = ToastInstance(o.first(), defaultOptions);

  return {
    showToast: () => control.showToastItem(),
		update: (newOptions) => control.updateInstance(newOptions)
	};

};