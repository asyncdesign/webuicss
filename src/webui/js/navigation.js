import webui from '@asyncdesign/webui';
import '@asyncdesign-css/navigation.css';

const NavbarInstance = function (navbar, settings) {

	let
		transitionDuration = settings.transitionDuration,

		smallDeviceMenuReverse = settings.smallDeviceMenuReverse,
		smallDeviceSubMenuPadding = settings.smallDeviceSubMenuPadding,
		smallDeviceSubMenuGap = settings.smallDeviceSubMenuGap,
		smallDeviceMenuSpacing = settings.smallDeviceMenuSpacing,

		mediumDeviceMenuReverse = settings.mediumDeviceMenuReverse,
		mediumDeviceSubMenuPadding = settings.mediumDeviceSubMenuPadding,
		mediumDeviceSubMenuGap = settings.mediumDeviceSubMenuGap,
		mediumDeviceMenuSpacing = settings.mediumDeviceMenuSpacing,

		largeDeviceMenuReverse = settings.largeDeviceMenuReverse,
		largeDeviceSubMenuPadding = settings.largeDeviceSubMenuPadding,
		largeDeviceSubMenuGap = settings.largeDeviceSubMenuGap,
		largeDeviceMenuSpacing = settings.largeDeviceMenuSpacing,
		largeDeviceMenuOffset = settings.largeDeviceMenuOffset,
		largeDeviceSubMenuOffset = settings.largeDeviceSubMenuOffset,
		largeDeviceSubMenuReverse = settings.largeDeviceSubMenuReverse,

		smallDeviceLogoColor = settings.smallDeviceLogoColor,
		smallDeviceLogoBackground = settings.smallDeviceLogoBackground,
		smallDeviceMenuColor = settings.smallDeviceMenuColor,
		smallDeviceMenuBackground = settings.smallDeviceMenuBackground,
		smallDeviceSubMenuColor = settings.smallDeviceSubMenuColor,
		smallDeviceSubMenuBackground = settings.smallDeviceSubMenuBackground,

		mediumDeviceLogoColor = settings.mediumDeviceLogoColor,
		mediumDeviceLogoBackground = settings.mediumDeviceLogoBackground,
		mediumDeviceMenuColor = settings.mediumDeviceMenuColor,
		mediumDeviceMenuBackground = settings.mediumDeviceMenuBackground,
		mediumDeviceSubMenuColor = settings.mediumDeviceSubMenuColor,
		mediumDeviceSubMenuBackground = settings.mediumDeviceSubMenuBackground,

		largeDeviceLogoColor = settings.largeDeviceLogoColor,
		largeDeviceLogoBackground = settings.largeDeviceLogoBackground,
		largeDeviceMenuColor = settings.largeDeviceMenuColor,
		largeDeviceMenuBackground = settings.largeDeviceMenuBackground,
		largeDeviceSubMenuColor = settings.largeDeviceSubMenuColor,
		largeDeviceSubMenuBackground = settings.largeDeviceSubMenuBackground,

		navButton = navbar.find("[class*='nav-button']").first(),
		navActivators = navbar.find(".nav-activator"),	

		navLogo = navbar.find(".nav-logo").first(),
		navMenu = navbar.children(".nav-menu").first(),
		navItems = navMenu.children(".nav-item"),
		navComponents = navMenu.children(".nav-component"),
		navSubMenus = navbar.find(".nav-sub-menu"),


		setSmallDeviceProperties = () => {

			if (smallDeviceMenuReverse) {
				navMenu.css("flex-direction", "row-reverse");	
			}

			navItems.css("margin-bottom", smallDeviceMenuSpacing);
			navSubMenus.css("padding", smallDeviceSubMenuPadding);
			navSubMenus.css("margin-top", smallDeviceSubMenuGap);

			navLogo.css("color", smallDeviceLogoColor);
			if (smallDeviceLogoBackground) {
				navLogo.css("background", smallDeviceLogoBackground);
			}
			navMenu.css("color", smallDeviceMenuColor);
			if (smallDeviceMenuBackground) {
				navMenu.css("background", smallDeviceMenuBackground);
			}
			navSubMenus.css("color", smallDeviceSubMenuColor);
			if (smallDeviceSubMenuBackground) {
				navSubMenus.css("background", smallDeviceSubMenuBackground);
			}

			navMenu.children(".nav-item").last().css("margin-bottom", "1rem");
			navMenu.find(".nav-sub-menu").children().last().css("margin-bottom", "0.5rem");
		},

		setMediumDeviceProperties = () => {

			navLogo.css("display", "flex");

			if (mediumDeviceMenuReverse) {
				navMenu.css("flex-direction", "row-reverse");
				navLogo.css("justify-content", "end").css("text-align", "right");
				navLogo.children().css("flex", "none");	
			}

			navItems.css("margin-bottom", mediumDeviceMenuSpacing);
			navSubMenus.css("padding", mediumDeviceSubMenuPadding);
			navSubMenus.css("margin-top", mediumDeviceSubMenuGap);

			navLogo.css("color", mediumDeviceLogoColor);
			if (mediumDeviceLogoBackground) {
				navLogo.css("background", mediumDeviceLogoBackground);
			}
			navMenu.css("color", mediumDeviceMenuColor);
			if (mediumDeviceMenuBackground) {
				navMenu.css("background", mediumDeviceMenuBackground);		
			}
			navSubMenus.css("color", mediumDeviceSubMenuColor);
			if (mediumDeviceSubMenuBackground) {
				navSubMenus.css("background", mediumDeviceSubMenuBackground);
			}

			navMenu.children(".nav-item").last().css("margin-bottom", "1rem");
			navMenu.find(".nav-sub-menu").children().last().css("margin-bottom", "0.5rem");
		},

		setLargeDeviceProperties = () => {

			navLogo.css("display", "flex");

			if (largeDeviceMenuReverse) {
				navMenu.css("flex-direction", "row-reverse");
				navLogo.css("justify-content", "end").css("text-align", "right");
				navLogo.children().css("flex", "none");
				
				if (navItems.last().css("margin-right")) {
					navItems.last().css("margin-left", largeDeviceMenuOffset);
				}
			}
			else {
				navItems.last().css("margin-right", largeDeviceMenuOffset);
			}
			
			navItems.css("margin-left", largeDeviceMenuSpacing);
			navSubMenus.css("margin-left", largeDeviceSubMenuOffset);
			navSubMenus.css("margin-top", largeDeviceSubMenuGap);
			navSubMenus.css("padding", largeDeviceSubMenuPadding);
			
			navLogo.css("color", largeDeviceLogoColor);
			if (largeDeviceLogoBackground) {
				navLogo.css("background", largeDeviceLogoBackground);
			}
			navMenu.css("color", largeDeviceMenuColor);
			if (largeDeviceMenuBackground) {
				navMenu.css("background", largeDeviceMenuBackground);
			}
			navSubMenus.css("color", largeDeviceSubMenuColor);
			if (largeDeviceSubMenuBackground) {
				navSubMenus.css("background", largeDeviceSubMenuBackground);
			}

			navMenu.children(".nav-item").last().css("margin-bottom", "0");
			navMenu.find(".nav-sub-menu").children().last().css("margin-bottom", "0.5rem");

			if (largeDeviceSubMenuReverse) {
				let totalWidth = parseFloat(navSubMenus.last().css("right", largeDeviceMenuOffset).css("right"));
					
				let navItemWidth = 0;
				let navItemsMarginRight = parseFloat(navItems.last().css("margin-right"));
				let navComponentsWidth = 0;
				let menuSpacing = parseFloat(largeDeviceMenuSpacing);
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

					navSubMenus.css("margin-right", largeDeviceSubMenuOffset);
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

				navButton.parent().siblings(".nav-item, .nav-component").hide();
				navButton.removeClass("active");
				navSubMenus.hide();
				navActivators.removeClass("active");
				navActivators.find(".nav-indicator").removeClass("active");

				setSmallDeviceProperties();	
			}
			else if (webui.isWindowInBreakPointRange([3, 5])) {

				navMenu.addClass("md-device");

				navButton.parent().siblings(".nav-item").hide();
				navButton.removeClass("active");
				navSubMenus.hide();
				navActivators.removeClass("active");
				navActivators.find(".nav-indicator").removeClass("active");
	
				navButton.parent().siblings(".nav-component").show();

				setMediumDeviceProperties();
			}
			else {

				navMenu.addClass("lg-device");

				navSubMenus.hide();
				navActivators.removeClass("active");
				navActivators.find(".nav-indicator").removeClass("active");
				
				navButton.parent().siblings(".nav-item, .nav-component").show();
				navSubMenus.children(".nav-item").show();

				setLargeDeviceProperties();
			}
	
		};


	this.updateInstance = function (newSettings) {
		
		if (newSettings.transitionDuration !== undefined) { transitionDuration = newSettings.transitionDuration; }

		if (newSettings.smallDeviceMenuReverse !== undefined) { smallDeviceMenuReverse = newSettings.smallDeviceMenuReverse; }
		if (newSettings.smallDeviceSubMenuPadding !== undefined) { smallDeviceSubMenuPadding = newSettings.smallDeviceSubMenuPadding; }
		if (newSettings.smallDeviceSubMenuGap !== undefined) { smallDeviceSubMenuGap = newSettings.smallDeviceSubMenuGap; }
		if (newSettings.smallDeviceMenuSpacing !== undefined) { smallDeviceMenuSpacing = newSettings.smallDeviceMenuSpacing; }

		if (newSettings.mediumDeviceMenuReverse !== undefined) { mediumDeviceMenuReverse = newSettings.mediumDeviceMenuReverse; }
		if (newSettings.mediumDeviceSubMenuPadding !== undefined) { mediumDeviceSubMenuPadding = newSettings.mediumDeviceSubMenuPadding; }
		if (newSettings.mediumDeviceSubMenuGap !== undefined) { mediumDeviceSubMenuGap = newSettings.mediumDeviceSubMenuGap; }
		if (newSettings.mediumDeviceMenuSpacing !== undefined) { mediumDeviceMenuSpacing = newSettings.mediumDeviceMenuSpacing; }

		if (newSettings.largeDeviceMenuReverse !== undefined) { largeDeviceMenuReverse = newSettings.largeDeviceMenuReverse; }
		if (newSettings.largeDeviceSubMenuPadding !== undefined) { largeDeviceSubMenuPadding = newSettings.largeDeviceSubMenuPadding; }
		if (newSettings.largeDeviceSubMenuGap !== undefined) { largeDeviceSubMenuGap = newSettings.largeDeviceSubMenuGap; }
		if (newSettings.largeDeviceMenuSpacing !== undefined) { largeDeviceMenuSpacing = newSettings.largeDeviceMenuSpacing; }
		if (newSettings.largeDeviceMenuOffset !== undefined) { largeDeviceMenuOffset = newSettings.largeDeviceMenuOffset; }
		if (newSettings.largeDeviceSubMenuOffset !== undefined) { largeDeviceSubMenuOffset = newSettings.largeDeviceSubMenuOffset; }	
		if (newSettings.largeDeviceSubMenuReverse !== undefined) { largeDeviceSubMenuReverse = newSettings.largeDeviceSubMenuReverse; }

		if (newSettings.smallDeviceLogoColor !== undefined) { smallDeviceLogoColor = newSettings.smallDeviceLogoColor; }
		if (newSettings.smallDeviceLogoBackground !== undefined) { smallDeviceLogoBackground = newSettings.smallDeviceLogoBackground; }
		if (newSettings.smallDeviceMenuColor !== undefined) { smallDeviceMenuColor = newSettings.smallDeviceMenuColor; }
		if (newSettings.smallDeviceMenuBackground !== undefined) { smallDeviceMenuBackground = newSettings.smallDeviceMenuBackground; }
		if (newSettings.smallDeviceSubMenuColor !== undefined) { smallDeviceSubMenuColor = newSettings.smallDeviceSubMenuColor; }
		if (newSettings.smallDeviceSubMenuBackground !== undefined) { smallDeviceSubMenuBackground = newSettings.smallDeviceSubMenuBackground; }

		if (newSettings.mediumDeviceLogoColor !== undefined) { mediumDeviceLogoColor = newSettings.mediumDeviceLogoColor; }
		if (newSettings.mediumDeviceLogoBackground !== undefined) { mediumDeviceLogoBackground = newSettings.mediumDeviceLogoBackground; }
		if (newSettings.mediumDeviceMenuColor !== undefined) { mediumDeviceMenuColor = newSettings.mediumDeviceMenuColor; }
		if (newSettings.mediumDeviceMenuBackground !== undefined) { mediumDeviceMenuBackground = newSettings.mediumDeviceMenuBackground; }
		if (newSettings.mediumDeviceSubMenuColor !== undefined) { mediumDeviceSubMenuColor = newSettings.mediumDeviceSubMenuColor; }
		if (newSettings.mediumDeviceSubMenuBackground !== undefined) { mediumDeviceSubMenuBackground = newSettings.mediumDeviceSubMenuBackground; }

		if (newSettings.largeDeviceLogoColor !== undefined) { largeDeviceLogoColor = newSettings.largeDeviceLogoColor; }
		if (newSettings.largeDeviceLogoBackground !== undefined) { largeDeviceLogoBackground = newSettings.largeDeviceLogoBackground; }
		if (newSettings.largeDeviceMenuColor !== undefined) { largeDeviceMenuColor = newSettings.largeDeviceMenuColor; }
		if (newSettings.largeDeviceMenuBackground !== undefined) { largeDeviceMenuBackground = newSettings.largeDeviceMenuBackground; }
		if (newSettings.largeDeviceSubMenuColor !== undefined) { largeDeviceSubMenuColor = newSettings.largeDeviceSubMenuColor; }
		if (newSettings.largeDeviceSubMenuBackground !== undefined) { largeDeviceSubMenuBackground = newSettings.largeDeviceSubMenuBackground; }
		
		resetNavbar();
	};


	//setNavbarProperties();
	resetNavbar();
	

	/* EVENTS */

	webui.breakpointChange(function() {
		console.log(webui.isWindowInBreakPointRange([0, 3]) ? "[0, 3]"
		 : webui.isWindowInBreakPointRange([3, 5]) ? "[3, 5]" 
		 : webui.isWindowInBreakPointRange([5, 0]) ? "[5, 0]" 
		 : "???");

		resetNavbar();
	});
	

	navActivators.click(function(e) {
		e.preventDefault();

		var navActivator = webui(this),
			subMenu = navActivator.nextSibling(".nav-sub-menu");

		navActivator.toggleClass("active");
		navActivator.find(".nav-indicator").toggleClass("active");


		if (webui.isWindowInBreakPointRange([0, 3])) {
			subMenu.css("padding", smallDeviceSubMenuPadding);
		}
		else if (webui.isWindowInBreakPointRange([3, 5])) {
			subMenu.css("padding", mediumDeviceSubMenuPadding);
		}
		else {
			subMenu.css("padding", largeDeviceSubMenuPadding);
		}

		var navSubMenuPaddingTop = parseFloat(subMenu.css("padding-top"));
		var navSubMenuPaddingBottom = parseFloat(subMenu.css("padding-bottom"));


		if (navActivator.hasClass("active")) {

			var siblingActivators = navActivator.parent().siblings().children(".nav-activator");

			for (var i = 0; i < siblingActivators.length; i++) {

				var siblingActivator = webui(siblingActivators[i]);

				if (siblingActivator.hasClass("active")) {

					navbar.trigger("ui.navbar.submenu.hide.before");

					siblingActivator.removeClass("active");
					siblingActivator.find(".nav-indicator").removeClass("active");
	
					siblingActivator.nextSibling(".nav-sub-menu")
					.collapseVertical({ duration: transitionDuration, paddingTop: navSubMenuPaddingTop, paddingBottom: navSubMenuPaddingBottom }, function() {
						navbar.trigger("ui.navbar.submenu.hide.after");
					});
				}
			}
			
			navbar.trigger("ui.navbar.submenu.show.before");

			subMenu.expandVertical({ duration: transitionDuration, targetHeight: 0, paddingTop: navSubMenuPaddingTop, paddingBottom: navSubMenuPaddingBottom }, function() {
				navbar.trigger("ui.navbar.submenu.show.after");
			});
			
		}
		else {
			navbar.trigger("ui.navbar.submenu.hide.before");

			subMenu.collapseVertical({ duration: transitionDuration, paddingTop: navSubMenuPaddingTop, paddingBottom: navSubMenuPaddingBottom }, function() {
				navbar.trigger("ui.navbar.submenu.hide.after");
			});

		}		
	
	});
	
	navButton.click(function(e) {
		e.preventDefault();

		var toggleButton = webui(this);
		var rootItems = toggleButton.parent().siblings(".nav-item");
		var rootComponents = toggleButton.parent().siblings(".nav-component");
		var triggered = false;

		toggleButton.toggleClass("active");

		if (toggleButton.hasClass("active")) {

			navbar.trigger("ui.navbar.menu.show.before");
			
			rootItems.expandVertical({ duration: transitionDuration }, function() {
				if (!triggered) { 
					triggered = true;
					navbar.trigger("ui.navbar.menu.show.after");
				}
			});

			if (webui.isWindowInBreakPointRange([0, 3])) {
				rootComponents.expandVertical({ duration: transitionDuration }, function() {
					if (!triggered) { 
						triggered = true;
						navbar.trigger("ui.navbar.menu.show.after");
					}	
				});
			}
		}
		else {
			navbar.trigger("ui.navbar.menu.hide.before");

			rootItems.collapseVertical({ duration: transitionDuration }, function() {
				//rootItems.attr("style", "");

				if (!triggered) { 
					triggered = true;		
					navbar.trigger("ui.navbar.menu.hide.after");
				}
			});

			if (webui.isWindowInBreakPointRange([0, 3])) {
				rootComponents.collapseVertical({ duration: transitionDuration }, function() {
					//rootComponents.attr("style", "");

					if (!triggered) { 
						triggered = true;	
						navbar.trigger("ui.navbar.menu.hide.after");
					}
				});

			}
		}

	});		

};

/* PUBLIC */

export const navBar = function(selector, options) {

	let settings = webui.extend({

		transitionDuration: 300,

		smallDeviceMenuReverse: false,
		smallDeviceSubMenuPadding: "0 1rem",
		smallDeviceSubMenuGap: 0,
		smallDeviceMenuSpacing: 0,

		mediumDeviceMenuReverse: false,
		mediumDeviceSubMenuPadding: "0 1rem",
		mediumDeviceSubMenuGap: 0,
		mediumDeviceMenuSpacing: 0,

		largeDeviceMenuReverse: false,
		largeDeviceSubMenuPadding: "0 1rem",
		largeDeviceSubMenuGap: 0,
		largeDeviceMenuSpacing: 0,
		largeDeviceMenuOffset: 0,				
		largeDeviceSubMenuOffset: 0,
		largeDeviceSubMenuReverse: false,

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

	let control = new NavbarInstance(o, settings);

	/*
	this.update = function (newSettings) {
		control.updateInstance(newSettings);
	};
	*/

	//return this;
	return control;
};


export const navButton = (selector, options) => {

	var settings = webui.extend({
		transitionDuration: 300, 
		backgroundColor: "transparent", 
		color: "#000000"
	}, options);

	var controls = webui(selector);

	for (var i = 0; i < controls.length; i++) {
		
		var control = webui(controls[i]);

		control.append("<span class='nav-button-item'></span><span class='nav-button-item'></span><span class='nav-button-item'></span>");
		control.find(".nav-button-item").css("display", "block").css("transition-duration", settings.transitionDuration / 1000 + "s");

		control.css("background-color", settings.backgroundColor);
		control.find(".nav-button-item").css("background-color", settings.color);	
	}	
	
	return this;
};


export const navIndicator = (selector, options) => {

	var settings = webui.extend({
		indicatorType: "caret",
		indicatorSize: "medium",
		backgroundColor: "transparent", 
		color: "#000000",
		transitionDuration: 500
	}, options);

	var controls = webui(selector);

	var size = settings.indicatorSize === "small" ? "16" : settings.indicatorSize === "medium" ? "20" : settings.indicatorSize === "large" ? "24" : "20";

	for (var i = 0; i < controls.length; i++) {
		
		var control = webui(controls[i]);

		control.append("<span class='indicator-item'>");

		var indicator = control.children(".indicator-item").first();

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



