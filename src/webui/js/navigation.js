import webui from '@asyncdesign/webui';
import '@asyncdesign-css/navigation.css';

const NavbarInstance = (navbar, defaultOptions) => {

	const settings = defaultOptions;

	const navMenu = navbar.children(".nav-menu").first();

	const navLogo = navMenu.find(".nav-logo").first();
	const navItems = navMenu.children(".nav-item");
	const navComponents = navMenu.children(".nav-component");
	const navToggle = navMenu.children(".nav-toggle");
	const navToggler = navToggle.find("[class*='nav-toggler']").first();

	const navActivators = navMenu.find(".nav-activator");

	const navSubMenus = navMenu.find(".nav-sub-menu");
	const navSubMenuItems = navSubMenus.find(".nav-item");


	const setSmallDeviceProperties = () => {

		if (settings.smallDeviceMenuReverse) {
			navMenu.css("flex-direction", "row-reverse");	
		}

		navItems.css("margin-bottom", settings.smallDeviceMenuSpacing);
		navSubMenus.css("padding", settings.smallDeviceSubMenuPadding);
		navSubMenus.css("margin-top", settings.smallDeviceSubMenuGap);

		navSubMenuItems.css("margin-bottom", settings.smallDeviceSubMenuSpacing);

		navLogo.css("color", settings.smallDeviceLogoColor);
		if (settings.smallDeviceLogoBackground) {
			navLogo.css("background", settings.smallDeviceLogoBackground);
		}
		navMenu.css("color", settings.smallDeviceMenuColor);
		if (settings.smallDeviceMenuBackground) {
			navMenu.css("background", settings.smallDeviceMenuBackground);
		}
		navSubMenus.css("color", settings.smallDeviceSubMenuColor);
		if (settings.smallDeviceSubMenuBackground) {
			navSubMenus.css("background", settings.smallDeviceSubMenuBackground);
		}

		navMenu.children(".nav-item").last().css("margin-bottom", "1rem");
		navMenu.find(".nav-sub-menu").children().last().css("margin-bottom", "0.5rem");
	};

	const setMediumDeviceProperties = () => {

		navLogo.css("display", "flex");

		if (settings.mediumDeviceMenuReverse) {
			navMenu.css("flex-direction", "row-reverse");
			navLogo.css("justify-content", "end").css("text-align", "right");
			navLogo.children().css("flex", "none");	
		}

		navItems.css("margin-bottom", settings.mediumDeviceMenuSpacing);
		navSubMenus.css("padding", settings.mediumDeviceSubMenuPadding);
		navSubMenus.css("margin-top", settings.mediumDeviceSubMenuGap);

		navSubMenuItems.css("margin-bottom", settings.mediumDeviceSubMenuSpacing);

		navLogo.css("color", settings.mediumDeviceLogoColor);
		if (settings.mediumDeviceLogoBackground) {
			navLogo.css("background", settings.mediumDeviceLogoBackground);
		}
		navMenu.css("color", settings.mediumDeviceMenuColor);
		if (settings.mediumDeviceMenuBackground) {
			navMenu.css("background", settings.mediumDeviceMenuBackground);		
		}
		navSubMenus.css("color", settings.mediumDeviceSubMenuColor);
		if (settings.mediumDeviceSubMenuBackground) {
			navSubMenus.css("background", settings.mediumDeviceSubMenuBackground);
		}

		navMenu.children(".nav-item").last().css("margin-bottom", "1rem");
		navMenu.find(".nav-sub-menu").children().last().css("margin-bottom", "0.5rem");
	};

	const setLargeDeviceProperties = () => {

		navLogo.css("display", "flex");

		if (settings.largeDeviceMenuReverse) {
			navMenu.css("flex-direction", "row-reverse");
			navLogo.css("justify-content", "end").css("text-align", "right");
			navLogo.children().css("flex", "none");
			
			if (navItems.last().css("margin-right")) {
				navItems.last().css("margin-left", settings.largeDeviceMenuOffset);
			}
		}
		else {
			navItems.last().css("margin-right", settings.largeDeviceMenuOffset);
		}
		
		navItems.css("margin-left", settings.largeDeviceMenuSpacing);
		navSubMenus.css("margin-left", settings.largeDeviceSubMenuOffset);
		navSubMenus.css("margin-top", settings.largeDeviceSubMenuGap);
		navSubMenus.css("padding", settings.largeDeviceSubMenuPadding);

		navSubMenuItems.css("margin-bottom", settings.largeDeviceSubMenuSpacing);
		
		navLogo.css("color", settings.largeDeviceLogoColor);
		if (settings.largeDeviceLogoBackground) {
			navLogo.css("background", settings.largeDeviceLogoBackground);
		}
		navMenu.css("color", settings.largeDeviceMenuColor);
		if (settings.largeDeviceMenuBackground) {
			navMenu.css("background", settings.largeDeviceMenuBackground);
		}
		navSubMenus.css("color", settings.largeDeviceSubMenuColor);
		if (settings.largeDeviceSubMenuBackground) {
			navSubMenus.css("background", settings.largeDeviceSubMenuBackground);
		}

		navMenu.children(".nav-item").last().css("margin-bottom", "0");
		navMenu.find(".nav-sub-menu").children().last().css("margin-bottom", "0.5rem");

		if (settings.largeDeviceSubMenuReverse) {
			let totalWidth = parseFloat(navSubMenus.last().css("right", settings.largeDeviceMenuOffset).css("right"));
				
			let navItemWidth = 0;
			let navItemsMarginRight = parseFloat(navItems.last().css("margin-right"));
			let navComponentsWidth = 0;
			let menuSpacing = parseFloat(settings.largeDeviceMenuSpacing);
			let navComponentsPadding = 0;
			
			if (navSubMenus.length > 0) {

				navComponents.forEach((nc) => { 
					navComponentsWidth += nc.offsetWidth; 
					navComponentsPadding += parseFloat(webui(nc).css("padding-right"));
				});

				totalWidth += navComponentsWidth === 0 ? navItemsMarginRight * 2 : 0;

				navSubMenus.reverse().forEach((sm) => {
					webui(sm).css("right", navComponentsWidth + navComponentsPadding + totalWidth + "px");
					navItemWidth = parseFloat(webui(sm).closest(".nav-item").css("width"));
					totalWidth += navItemWidth + menuSpacing;							
				});

				navSubMenus.reverse();

				navSubMenus.css("margin-right", settings.largeDeviceSubMenuOffset);
			}
		}
	};

	const resetNavbar = () => {	

		navLogo.attr("style", "");
		navMenu.attr("style","");
		navItems.attr("style", "");
		navComponents.attr("style", "");
		navSubMenus.attr("style", "");

		navMenu.removeClass("md-device").removeClass("lg-device")

		if (webui.isWindowInBreakPointRange([0, 3])) {

			navToggle.siblings(".nav-item, .nav-component").hide();
			navToggler.removeClass("active");
			navSubMenus.hide();
			navActivators.removeClass("active");
			navActivators.find(".nav-indicator").removeClass("active");

			setSmallDeviceProperties();	
		}
		else if (webui.isWindowInBreakPointRange([3, 4])) {

			navMenu.addClass("md-device");

			navToggle.siblings(".nav-item").hide();
			navToggler.removeClass("active");
			navSubMenus.hide();
			navActivators.removeClass("active");
			navActivators.find(".nav-indicator").removeClass("active");

			navToggle.siblings(".nav-component").show();

			setMediumDeviceProperties();
		}
		else {

			navMenu.addClass("lg-device");

			navSubMenus.hide();
			navActivators.removeClass("active");
			navActivators.find(".nav-indicator").removeClass("active");
			
			navToggle.siblings(".nav-item, .nav-component").show();
			navSubMenus.children(".nav-item").show();

			setLargeDeviceProperties();
		}

	};


	const updateInstance = (newSettings) => {
	
		if (newSettings.transitionDuration !== undefined) { settings.transitionDuration = newSettings.transitionDuration; }

		if (newSettings.smallDeviceMenuReverse !== undefined) { settings.smallDeviceMenuReverse = newSettings.smallDeviceMenuReverse; }
		if (newSettings.smallDeviceSubMenuPadding !== undefined) { settings.smallDeviceSubMenuPadding = newSettings.smallDeviceSubMenuPadding; }
		if (newSettings.smallDeviceSubMenuGap !== undefined) { settings.smallDeviceSubMenuGap = newSettings.smallDeviceSubMenuGap; }
		if (newSettings.smallDeviceMenuSpacing !== undefined) { settings.smallDeviceMenuSpacing = newSettings.smallDeviceMenuSpacing; }

		if (newSettings.mediumDeviceMenuReverse !== undefined) { settings.mediumDeviceMenuReverse = newSettings.mediumDeviceMenuReverse; }
		if (newSettings.mediumDeviceSubMenuPadding !== undefined) { settings.mediumDeviceSubMenuPadding = newSettings.mediumDeviceSubMenuPadding; }
		if (newSettings.mediumDeviceSubMenuGap !== undefined) { settings.mediumDeviceSubMenuGap = newSettings.mediumDeviceSubMenuGap; }
		if (newSettings.mediumDeviceMenuSpacing !== undefined) { settings.mediumDeviceMenuSpacing = newSettings.mediumDeviceMenuSpacing; }

		if (newSettings.largeDeviceMenuReverse !== undefined) { settings.largeDeviceMenuReverse = newSettings.largeDeviceMenuReverse; }
		if (newSettings.largeDeviceSubMenuPadding !== undefined) { settings.largeDeviceSubMenuPadding = newSettings.largeDeviceSubMenuPadding; }
		if (newSettings.largeDeviceSubMenuGap !== undefined) { settings.largeDeviceSubMenuGap = newSettings.largeDeviceSubMenuGap; }
		if (newSettings.largeDeviceMenuSpacing !== undefined) { settings.largeDeviceMenuSpacing = newSettings.largeDeviceMenuSpacing; }
		if (newSettings.largeDeviceMenuOffset !== undefined) { settings.largeDeviceMenuOffset = newSettings.largeDeviceMenuOffset; }
		if (newSettings.largeDeviceSubMenuOffset !== undefined) { settings.largeDeviceSubMenuOffset = newSettings.largeDeviceSubMenuOffset; }	
		if (newSettings.largeDeviceSubMenuReverse !== undefined) { settings.largeDeviceSubMenuReverse = newSettings.largeDeviceSubMenuReverse; }

		if (newSettings.smallDeviceLogoColor !== undefined) { settings.smallDeviceLogoColor = newSettings.smallDeviceLogoColor; }
		if (newSettings.smallDeviceLogoBackground !== undefined) { settings.smallDeviceLogoBackground = newSettings.smallDeviceLogoBackground; }
		if (newSettings.smallDeviceMenuColor !== undefined) { settings.smallDeviceMenuColor = newSettings.smallDeviceMenuColor; }
		if (newSettings.smallDeviceMenuBackground !== undefined) { settings.smallDeviceMenuBackground = newSettings.smallDeviceMenuBackground; }
		if (newSettings.smallDeviceSubMenuColor !== undefined) { settings.smallDeviceSubMenuColor = newSettings.smallDeviceSubMenuColor; }
		if (newSettings.smallDeviceSubMenuBackground !== undefined) { settings.smallDeviceSubMenuBackground = newSettings.smallDeviceSubMenuBackground; }

		if (newSettings.mediumDeviceLogoColor !== undefined) { settings.mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }
		if (newSettings.mediumDeviceLogoBackground !== undefined) { settings.mediumDeviceLogoBackground = newSettings.mediumDeviceLogoBackground; }
		if (newSettings.mediumDeviceMenuColor !== undefined) { settings.mediumDeviceMenuColor = newSettings.mediumDeviceMenuColor; }
		if (newSettings.mediumDeviceMenuBackground !== undefined) { settings.mediumDeviceMenuBackground = newSettings.mediumDeviceMenuBackground; }
		if (newSettings.mediumDeviceSubMenuColor !== undefined) { settings.mediumDeviceSubMenuColor = newSettings.mediumDeviceSubMenuColor; }
		if (newSettings.mediumDeviceSubMenuBackground !== undefined) { settings.mediumDeviceSubMenuBackground = newSettings.mediumDeviceSubMenuBackground; }

		if (newSettings.largeDeviceLogoColor !== undefined) { settings.largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
		if (newSettings.largeDeviceLogoBackground !== undefined) { settings.largeDeviceLogoBackground = newSettings.largeDeviceLogoBackground; }
		if (newSettings.largeDeviceMenuColor !== undefined) { settings.largeDeviceMenuColor = newSettings.largeDeviceMenuColor; }
		if (newSettings.largeDeviceMenuBackground !== undefined) { settings.largeDeviceMenuBackground = newSettings.largeDeviceMenuBackground; }
		if (newSettings.largeDeviceSubMenuColor !== undefined) { settings.largeDeviceSubMenuColor = newSettings.largeDeviceSubMenuColor; }
		if (newSettings.largeDeviceSubMenuBackground !== undefined) { settings.largeDeviceSubMenuBackground = newSettings.largeDeviceSubMenuBackground; }
		
		resetNavbar();
	};


	/* EVENTS */

	webui.breakpointChange(() => {
		resetNavbar();
	});
	

	navActivators.click(function(e) {
		e.preventDefault();

		let navActivator = webui(this),
			subMenu = navActivator.nextSibling(".nav-sub-menu");

		navActivator.toggleClass("active");
		navActivator.find(".nav-indicator").toggleClass("active");


		if (webui.isWindowInBreakPointRange([0, 3])) {
			subMenu.css("padding", settings.smallDeviceSubMenuPadding);
		}
		else if (webui.isWindowInBreakPointRange([3, 4])) {
			subMenu.css("padding", settings.mediumDeviceSubMenuPadding);
		}
		else {
			subMenu.css("padding", settings.largeDeviceSubMenuPadding);
		}

		if (navActivator.hasClass("active")) {

			let siblingActivators = navActivator.parent().siblings().children(".nav-activator");

			for (let i = 0; i < siblingActivators.length; i++) {

				let siblingActivator = webui(siblingActivators[i]);

				if (siblingActivator.hasClass("active")) {

					navbar.trigger("ui.navbar.submenu.hide.before");

					siblingActivator.removeClass("active");
					siblingActivator.find(".nav-indicator").removeClass("active");
	
					siblingActivator.nextSibling(".nav-sub-menu")
					.collapseVertical({ duration: settings.transitionDuration }, function() {
						navbar.trigger("ui.navbar.submenu.hide.after");
					});
				}
			}
			
			navbar.trigger("ui.navbar.submenu.show.before");

			subMenu.expandVertical({ duration: settings.transitionDuration }, function() {
				navbar.trigger("ui.navbar.submenu.show.after");
			});
			
		}
		else {
			navbar.trigger("ui.navbar.submenu.hide.before");

			subMenu.collapseVertical({ duration: settings.transitionDuration }, function() {
				navbar.trigger("ui.navbar.submenu.hide.after");
			});

		}		
	
	});
	
	navToggler.click(function(e) {
		e.preventDefault();

		let toggleButton = webui(this);
		let rootItems = toggleButton.parent().siblings(".nav-item");
		let rootComponents = toggleButton.parent().siblings(".nav-component");
		let triggered = false;

		toggleButton.toggleClass("active");


		if (toggleButton.hasClass("active")) {

			navbar.trigger("ui.navbar.menu.show.before");
			
			rootItems.expandVertical({ duration: settings.transitionDuration }, function() {
				if (!triggered) { 
					triggered = true;
					navbar.trigger("ui.navbar.menu.show.after");
				}
			});

			if (webui.isWindowInBreakPointRange([0, 3])) {
				rootComponents.expandVertical({ duration: settings.transitionDuration }, function() {
					if (!triggered) { 
						triggered = true;
						navbar.trigger("ui.navbar.menu.show.after");
					}	
				});
			}
		}
		else {
			navbar.trigger("ui.navbar.menu.hide.before");
		
			rootItems.collapseVertical({ duration: settings.transitionDuration }, function() {

				if (!triggered) { 
					triggered = true;		
					navbar.trigger("ui.navbar.menu.hide.after");
				}
			});
			
	
			if (webui.isWindowInBreakPointRange([0, 3])) {
				rootComponents.collapseVertical({ duration: settings.transitionDuration }, function() {
	
					if (!triggered) { 
						triggered = true;	
						navbar.trigger("ui.navbar.menu.hide.after");
					}
				});
			}	

		}

	});

	resetNavbar();
	
	return {
		updateInstance: (newOptions) => updateInstance(newOptions)
	};

};

/* PUBLIC */

export const navBar = (selector, options) => {

	let defaultOptions = webui.extend({

		transitionDuration: 300,

		smallDeviceMenuReverse: false,
		smallDeviceMenuSpacing: "0.5rem",
		smallDeviceSubMenuGap: "0.2rem",
		smallDeviceSubMenuPadding: "0.2rem 1rem",
		smallDeviceSubMenuSpacing: "0.4rem",
		
		mediumDeviceMenuReverse: false,
		mediumDeviceMenuSpacing: "0.5rem",
		mediumDeviceSubMenuGap: "0.2rem",
		mediumDeviceSubMenuPadding: "0.2rem 1rem",
		mediumDeviceSubMenuSpacing: "0.4rem",

		largeDeviceMenuReverse: false,	
		largeDeviceMenuSpacing: 0,
		largeDeviceMenuOffset: 0,
		largeDeviceSubMenuReverse: false,
		largeDeviceSubMenuGap: "0.125rem",
		largeDeviceSubMenuPadding: "0.5rem 1rem",
		largeDeviceSubMenuSpacing: "0.7rem",
		largeDeviceSubMenuOffset: 0,
		
		smallDeviceLogoColor: "inherit",
		smallDeviceLogoBackground: "",
		smallDeviceMenuColor: "inherit",
		smallDeviceMenuBackground: "",
		smallDeviceSubMenuColor: "inherit",
		smallDeviceSubMenuBackground: "rgba(255, 255, 255, 0.2)",

		mediumDeviceLogoColor: "inherit",
		mediumDeviceLogoBackground: "",
		mediumDeviceMenuColor: "inherit",
		mediumDeviceMenuBackground: "",
		mediumDeviceSubMenuColor: "inherit",
		mediumDeviceSubMenuBackground: "rgba(255, 255, 255, 0.2)",

		largeDeviceLogoColor: "inherit",
		largeDeviceLogoBackground: "",
		largeDeviceMenuColor: "inherit",
		largeDeviceMenuBackground: "",
		largeDeviceSubMenuColor: "inherit",
		largeDeviceSubMenuBackground: "inherit"

	}, options);

	let o = webui(selector);

	if (o.length > 1) { console.warn("WebUI navbar component does not support initialising multiple controls. Initialize a new component instead.") }

	let control = NavbarInstance(o.first(), defaultOptions);

	
	return {
		update: (newOptions) => control.updateInstance(newOptions)
	};
	
};


export const navToggler = function (selector, options) {

	let settings = webui.extend({
		transitionDuration: 300, 
		backgroundColor: "transparent", 
		color: "#000000"
	}, options);

	let controls = webui(selector);

	for (let i = 0; i < controls.length; i++) {
		
		let control = webui(controls[i]);

		control.append("<span class='nav-toggler-item'></span><span class='nav-toggler-item'></span><span class='nav-toggler-item'></span>");
		control.find(".nav-toggler-item").css("display", "block").css("transition-duration", settings.transitionDuration / 1000 + "s");

		control.css("background-color", settings.backgroundColor);
		control.find(".nav-toggler-item").css("background-color", settings.color);	
	}	
	
	return this;
};


export const navIndicator = function (selector, options) {

	let settings = webui.extend({
		indicatorType: "caret",
		indicatorSize: "medium",
		backgroundColor: "transparent", 
		color: "#000000",
		transitionDuration: 500
	}, options);

	let controls = webui(selector);

	let size = settings.indicatorSize === "small" ? "16" : settings.indicatorSize === "medium" ? "20" : settings.indicatorSize === "large" ? "24" : "20";

	for (let i = 0; i < controls.length; i++) {
		
		let control = webui(controls[i]);

		control.append("<span class='indicator-item'>");

		let indicator = control.children(".indicator-item").first();

		if (indicator) {

			if (settings.indicatorType === "arrow") {
				indicator.css("background-image", "url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + size + "' height='" + size + "' fill='none' viewBox='0 0 24 24'%3E%3Cpath d='M12 20L12 4' stroke='" +  settings.color.replace(/#/i, '%23') + "' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M5 13L12 20L19 13' stroke='" +  settings.color.replace(/#/i, '%23') + "' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")");
			}
			else if (settings.indicatorType === "caret") {
				indicator.css("background-image", "url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + size + "' height='" + size + "' fill='" +  settings.color.replace(/#/i, '%23') + "' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E\")");
			}
			else if (settings.indicatorType === "chevron") {
				indicator.css("background-image", "url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + size + "' height='" + size + "' fill='" +  settings.color.replace(/#/i, '%23') + "' viewBox='0 0 16 16'%3E%3Cpath d='M12.2929,5.292875 C12.6834,4.902375 13.3166,4.902375 13.7071,5.292875 C14.0976,5.683375 14.0976,6.316555 13.7071,6.707085 L8.70711,11.707085 C8.31658,12.097605 7.68342,12.097605 7.29289,11.707085 L2.29289,6.707085 C1.90237,6.316555 1.90237,5.683375 2.29289,5.292875 C2.68342,4.902375 3.31658,4.902375 3.70711,5.292875 L8,9.585765 L12.2929,5.292875 Z'/%3E%3C/svg%3E\")");
			}
			
			indicator.css("background-color", settings.backgroundColor);
			indicator.css("transition-duration", settings.transitionDuration / 1000 + "s");
		}

	} 
	return this;
};



