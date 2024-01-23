Util.Modules["page"] = new function() {
	this.init = function(page) {

		page.js_rev = 8;

		// header reference
		page.hN = u.qs("#header");
		page.hN.service = u.qs("ul.servicenavigation", page.hN);

		// content reference
		page.cN = u.qs("#content", page);

		// navigation reference
		page.nN = u.qs("#navigation", page);
		page.nN = u.ie(page.hN, page.nN);

		// footer reference
		page.fN = u.qs("#footer");
		page.fN.service = u.qs("ul.servicenavigation", page.fN);


		// global resize handler 
		page.resized = function() {
			// u.bug("page.resized", this);

			this.browser_h = u.browserH();
			this.browser_w = u.browserW();

			// forward scroll event to current scene
			if(this.scene && typeof(this.scene.resized) == "function") {
				this.scene.resized();
			}

		}

		// global scroll handler 
		page.scrolled = function() {
			// u.bug("page.scrolled", this);

			// forward scroll event to current scene
			if(this.scene && typeof(this.scene.scrolled) == "function") {
				this.scene.scrolled();
			}

		}


		// Page is ready
		page.ready = function() {
			// u.bug("page.ready", this);

			// page is ready to be shown - only initalize if not already shown
			if(!this.is_ready) {

				u.rc(this, "i:page");

				// page is ready
				this.is_ready = true;

				u.ac(page, "loading");
				// u.bug(page.getAttribute("data-cookie-consent"), u.getCookie(page.getAttribute("data-cookie-consent")))

				var cookies = u.getCookie(page.getAttribute("data-cookie-consent"));
				if(cookies) {
					u.cookies_disallowed = false;
					u.includeGoogleTagManager();
				}
				else {
					this.showCookieConsent();
				}

				this.data = JSON.parse(u.getCookie("data")) || {};

				// set resize handler
				u.e.addWindowEvent(this, "resize", this.resized);
				// set scroll handler
				u.e.addWindowEvent(this, "scroll", this.scrolled);
				// set scroll handler
				u.e.addWindowEvent(this, "orientationchange", this.orientationchanged);

				this.scene = u.qs(".scene", this);


				this.resized();

			}

		}

		page.showCookieConsent = function() {

			u.ass(document.body, {
				"overflow": "hidden",
			});

			this.cookie_underlay = u.ae(this, "div", {"class":"cookie_underlay"});

			this.cookie_box = u.ae(this, "div", {"class":"cookie"});
			this.cookie_box_icon = u.ae(this.cookie_box, "div", {"class":"icon"});


			u.ae(this.cookie_box, "h3", {"html":"Cookies"})
			u.ae(this.cookie_box, "p", {"html":"Vi bruger cookies for at give dig den bedst mulige oplevelse på hjemmesiden. <br />Håber det er ok med dig."})

			this.cookie_box.ul_actions = u.ae(this.cookie_box, "ul", {"class":"actions"});
			this.cookie_box.bn_readmore = u.ae(this.cookie_box.ul_actions, "li", {"class":"read_more", "html":'<a href="https://copenhagenskills.dk/cookiepolitik/" target="_blank" id="guide_cookies_read_more">Læs mere</a>'});
			this.cookie_box.bn_ok = u.ae(this.cookie_box.ul_actions, "li", {"class":"ok", "html":"Yes, helt ok"});

			u.ce(this.cookie_box.bn_ok);
			this.cookie_box.bn_ok.clicked = function(event) {
				u.cookies_disallowed = false;
				u.includeGoogleTagManager();
				u.saveCookie(page.getAttribute("data-cookie-consent"), true, {"force":true, "path":"/", "expires":false});
				page.hideCookieConsent();
			}
			u.ce(this.cookie_box.bn_readmore, {"type":"link"});

			u.ass(this.cookie_box, {
				"transform":"translate(0, "+window.innerHeight+"px)",
			});

			u.ass(this.cookie_underlay, {
				"transition": "all 0.1s ease-in-out 1s",
				"opacity": 1,
			});

			u.ass(this.cookie_box, {
				"transition": "all 0.3s ease-in-out 1s",
				"opacity": 1,
				"transform":"translate(0, 0)",
			});

		}

		page.hideCookieConsent = function() {

			this.cookie_box.transitioned = function() {
				page.removeChild(page.cookie_box);
				page.removeChild(page.cookie_underlay);

				delete page.cookie_box;
				delete page.cookie_underlay;

				u.ass(document.body, {
					"overflow": "auto",
				});
			}
			u.ass(this.cookie_box, {
				"transition": "all 0.3s ease-in-out",
				"transform": "translate(0, "+page.browser_h+"px)",
			});
			u.ass(this.cookie_underlay, {
				"transition": "all 0.2s ease-in-out",
				"opacity": 0,
			});
		}

		page.updateUrl = function(section) {
			if(section != this.current_section) {
				u.h.navigate("/index/"+section, this, true);
				this.current_section = section;
				u.sc(document.body, "guide "+section);
			}

		}


		// ready to start page builing process
		page.ready();
	}
}
u.e.addDOMReadyEvent(u.init);
