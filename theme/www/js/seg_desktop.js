/*
asset-builder @ 2023-11-08 08:14:13
*/

/*seg_desktop_guide_include.js*/

/*seg_desktop.js*/
if(!u || !Util) {
	var u, Util = u = new function() {};
	u.version = "0.9.3";
	u.bug = u.nodeId = u.exception = function() {};
	u.stats = new function() {this.pageView = function(){};this.event = function(){};}
	u.txt = function(index) {return index;}
}
function fun(v) {return (typeof(v) === "function")}
function obj(v) {return (typeof(v) === "object")}
function str(v) {return (typeof(v) === "string")}
u.bug_console_only = true;
Util.debugURL = function(url) {
	if(u.bug_force) {
		return true;
	}
	return document.domain.match(/(\.local|\.proxy)$/);
}
Util.nodeId = function(node, include_path) {
	console.log("Util.nodeId IS DEPRECATED. Use commas in u.bug in stead.");
	console.log(arguments.callee.caller);
	try {
		if(!include_path) {
			return node.id ? node.nodeName+"#"+node.id : (node.className ? node.nodeName+"."+node.className : (node.name ? node.nodeName + "["+node.name+"]" : node.nodeName));
		}
		else {
			if(node.parentNode && node.parentNode.nodeName != "HTML") {
				return u.nodeId(node.parentNode, include_path) + "->" + u.nodeId(node);
			}
			else {
				return u.nodeId(node);
			}
		}
	}
	catch(exception) {
		u.exception("u.nodeId", arguments, exception);
	}
	return "Unindentifiable node!";
}
Util.exception = function(name, _arguments, _exception) {
	u.bug("Exception in: " + name + " (" + _exception + ")");
	console.error(_exception);
	u.bug("Invoked with arguments:");
	console.log(_arguments);
}
Util.bug = function() {
	if(u.debugURL()) {
		if(!u.bug_console_only) {
			var i, message;
			if(obj(console)) {
				for(i = 0; i < arguments.length; i++) {
					if(arguments[i] || typeof(arguments[i]) == "undefined") {
						console.log(arguments[i]);
					}
				}
			}
			var option, options = new Array([0, "auto", "auto", 0], [0, 0, "auto", "auto"], ["auto", 0, 0, "auto"], ["auto", "auto", 0, 0]);
			var corner = u.bug_corner ? u.bug_corner : 0;
			var color = u.bug_color ? u.bug_color : "black";
			option = options[corner];
			if(!document.getElementById("debug_id_"+corner)) {
				var d_target = u.ae(document.body, "div", {"class":"debug_"+corner, "id":"debug_id_"+corner});
				d_target.style.position = u.bug_position ? u.bug_position : "absolute";
				d_target.style.zIndex = 16000;
				d_target.style.top = option[0];
				d_target.style.right = option[1];
				d_target.style.bottom = option[2];
				d_target.style.left = option[3];
				d_target.style.backgroundColor = u.bug_bg ? u.bug_bg : "#ffffff";
				d_target.style.color = "#000000";
				d_target.style.fontSize = "11px";
				d_target.style.lineHeight = "11px";
				d_target.style.textAlign = "left";
				if(d_target.style.maxWidth) {
					d_target.style.maxWidth = u.bug_max_width ? u.bug_max_width+"px" : "auto";
				}
				d_target.style.padding = "2px 3px";
			}
			for(i = 0; i < arguments.length; i++) {
				if(arguments[i] === undefined) {
					message = "undefined";
				}
				else if(!str(arguments[i]) && fun(arguments[i].toString)) {
					message = arguments[i].toString();
				}
				else {
					message = arguments[i];
				}
				var debug_div = document.getElementById("debug_id_"+corner);
				message = message ? message.replace(/\>/g, "&gt;").replace(/\</g, "&lt;").replace(/&lt;br&gt;/g, "<br>") : "Util.bug with no message?";
				u.ae(debug_div, "div", {"style":"color: " + color, "html": message});
			}
		}
		else if(typeof(console) !== "undefined" && obj(console)) {
			var i;
			for(i = 0; i < arguments.length; i++) {
				console.log(arguments[i]);
			}
		}
	}
}
Util.xInObject = function(object, _options) {
	if(u.debugURL()) {
		var return_string = false;
		var explore_objects = false;
		if(obj(_options)) {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "return"     : return_string               = _options[_argument]; break;
					case "objects"    : explore_objects             = _options[_argument]; break;
				}
			}
		}
		var x, s = "--- start object ---\n";
		for(x in object) {
			if(explore_objects && object[x] && obj(object[x]) && !str(object[x].nodeName)) {
				s += x + "=" + object[x]+" => \n";
				s += u.xInObject(object[x], true);
			}
			else if(object[x] && obj(object[x]) && str(object[x].nodeName)) {
				s += x + "=" + object[x]+" -> " + u.nodeId(object[x], 1) + "\n";
			}
			else if(object[x] && fun(object[x])) {
				s += x + "=function\n";
			}
			else {
				s += x + "=" + object[x]+"\n";
			}
		}
		s += "--- end object ---\n";
		if(return_string) {
			return s;
		}
		else {
			u.bug(s);
		}
	}
}
Util.Animation = u.a = new function() {
	this.support3d = function() {
		if(this._support3d === undefined) {
			var node = u.ae(document.body, "div");
			try {
				u.as(node, "transform", "translate3d(10px, 10px, 10px)");
				if(u.gcs(node, "transform").match(/matrix3d\(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 10, 10, 1\)/)) {
					this._support3d = true;
				}
	 			else {
					this._support3d = false;
				}
			}
			catch(exception) {
				this._support3d = false;
			}
			document.body.removeChild(node);
		}
		return this._support3d;
	}
	this.transition = function(node, transition, callback) {
		try {
			var duration = transition.match(/[0-9.]+[ms]+/g);
			if(duration) {
				node.duration = duration[0].match("ms") ? parseFloat(duration[0]) : (parseFloat(duration[0]) * 1000);
				if(callback) {
					var transitioned;
					transitioned = (function(event) {
						u.e.removeEvent(event.target, u.a.transitionEndEventName(), transitioned);
						if(event.target == this) {
							u.a.transition(this, "none");
							if(fun(callback)) {
								var key = u.randomString(4);
								node[key] = callback;
								node[key](event);
								delete node[key];
								callback = null;
							}
							else if(fun(this[callback])) {
								this[callback](event);
							}
						}
						else {
						}
					});
					u.e.addEvent(node, u.a.transitionEndEventName(), transitioned);
				}
				else {
					u.e.addEvent(node, u.a.transitionEndEventName(), this._transitioned);
				}
			}
			else {
				node.duration = false;
			}
			u.as(node, "transition", transition);
		}
		catch(exception) {
			u.exception("u.a.transition", arguments, exception);
		}
	}
	this.transitionEndEventName = function() {
		if(!this._transition_end_event_name) {
			this._transition_end_event_name = "transitionend";
			var transitions = {
				"transition": "transitionend",
				"MozTransition": "transitionend",
				"msTransition": "transitionend",
				"webkitTransition": "webkitTransitionEnd",
				"OTransition": "otransitionend"
			};
			var x, div = document.createElement("div");
			for(x in transitions){
				if(typeof(div.style[x]) !== "undefined") {
					this._transition_end_event_name = transitions[x];
					break;
				}
			}
		}
		return this._transition_end_event_name;
	}
	this._transitioned = function(event) {
		if(event.target == this) {
			u.e.removeEvent(event.target, u.a.transitionEndEventName(), u.a._transitioned);
			u.a.transition(event.target, "none");
			if(fun(this.transitioned)) {
				this.transitioned_before = this.transitioned;
				this.transitioned(event);
				if(this.transitioned === this.transitioned_before) {
					delete this.transitioned;
				}
			}
		}
	}
	this.translate = function(node, x, y) {
		if(this.support3d()) {
			u.as(node, "transform", "translate3d("+x+"px, "+y+"px, 0)");
		}
		else {
			u.as(node, "transform", "translate("+x+"px, "+y+"px)");
		}
		node._x = x;
		node._y = y;
		node.offsetHeight;
	}
	this.rotate = function(node, deg) {
		u.as(node, "transform", "rotate("+deg+"deg)");
		node._rotation = deg;
		node.offsetHeight;
	}
	this.scale = function(node, scale) {
		u.as(node, "transform", "scale("+scale+")");
		node._scale = scale;
		node.offsetHeight;
	}
	this.setOpacity = this.opacity = function(node, opacity) {
		u.as(node, "opacity", opacity);
		node._opacity = opacity;
		node.offsetHeight;
	}
	this.setWidth = this.width = function(node, width) {
		width = width.toString().match(/\%|auto|px/) ? width : (width + "px");
		node.style.width = width;
		node._width = width;
		node.offsetHeight;
	}
	this.setHeight = this.height = function(node, height) {
		height = height.toString().match(/\%|auto|px/) ? height : (height + "px");
		node.style.height = height;
		node._height = height;
		node.offsetHeight;
	}
	this.setBgPos = this.bgPos = function(node, x, y) {
		x = x.toString().match(/\%|auto|px|center|top|left|bottom|right/) ? x : (x + "px");
		y = y.toString().match(/\%|auto|px|center|top|left|bottom|right/) ? y : (y + "px");
		node.style.backgroundPosition = x + " " + y;
		node._bg_x = x;
		node._bg_y = y;
		node.offsetHeight;
	}
	this.setBgColor = this.bgColor = function(node, color) {
		node.style.backgroundColor = color;
		node._bg_color = color;
		node.offsetHeight;
	}
	this._animationqueue = {};
	this.requestAnimationFrame = function(node, callback, duration) {
		if(!u.a.__animation_frame_start) {
			u.a.__animation_frame_start = Date.now();
		}
		var id = u.randomString();
		u.a._animationqueue[id] = {};
		u.a._animationqueue[id].id = id;
		u.a._animationqueue[id].node = node;
		u.a._animationqueue[id].callback = callback;
		u.a._animationqueue[id].duration = duration;
		u.t.setTimer(u.a, function() {u.a.finalAnimationFrame(id)}, duration);
		if(!u.a._animationframe) {
			window._requestAnimationFrame = eval(u.vendorProperty("requestAnimationFrame"));
			window._cancelAnimationFrame = eval(u.vendorProperty("cancelAnimationFrame"));
			u.a._animationframe = function(timestamp) {
				var id, animation;
				for(id in u.a._animationqueue) {
					animation = u.a._animationqueue[id];
					if(!animation["__animation_frame_start_"+id]) {
						animation["__animation_frame_start_"+id] = timestamp;
					}
					if(fun(animation.node[animation.callback])) {
						animation.node[animation.callback]((timestamp-animation["__animation_frame_start_"+id]) / animation.duration);
					}
				}
				if(Object.keys(u.a._animationqueue).length) {
					u.a._requestAnimationId = window._requestAnimationFrame(u.a._animationframe);
				}
			}
		}
		if(!u.a._requestAnimationId) {
			u.a._requestAnimationId = window._requestAnimationFrame(u.a._animationframe);
		}
		return id;
	}
	this.finalAnimationFrame = function(id) {
		var animation = u.a._animationqueue[id];
		animation["__animation_frame_start_"+id] = false;
		if(fun(animation.node[animation.callback])) {
			animation.node[animation.callback](1);
		}
		if(fun(animation.node.transitioned)) {
			animation.node.transitioned({});
		}
		delete u.a._animationqueue[id];
		if(!Object.keys(u.a._animationqueue).length) {
			this.cancelAnimationFrame(id);
		}
	}
	this.cancelAnimationFrame = function(id) {
		if(id && u.a._animationqueue[id]) {
			delete u.a._animationqueue[id];
		}
		if(u.a._requestAnimationId) {
			window._cancelAnimationFrame(u.a._requestAnimationId);
			u.a.__animation_frame_start = false;
			u.a._requestAnimationId = false;
		}
	}
}
Util.saveCookie = function(name, value, _options) {
	var expires = true;
	var path = false;
	var samesite = "lax";
	var force = false;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "expires"	: expires	= _options[_argument]; break;
				case "path"		: path		= _options[_argument]; break;
				case "samesite"	: samesite	= _options[_argument]; break;
				case "force"	: force		= _options[_argument]; break;
			}
		}
	}
	if(!force && obj(window.localStorage) && obj(window.sessionStorage)) {
		if(expires === true) {
			window.sessionStorage.setItem(name, value);
		}
		else {
			window.localStorage.setItem(name, value);
		}
		return;
	}
	if(expires === false) {
		expires = ";expires="+(new Date((new Date()).getTime() + (1000*60*60*24*365))).toGMTString();
	}
	else if(str(expires)) {
		expires = ";expires="+expires;
	}
	else {
		expires = "";
	}
	if(str(path)) {
		path = ";path="+path;
	}
	else {
		path = "";
	}
	samesite = ";samesite="+samesite;
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + path + expires + samesite;
}
Util.getCookie = function(name) {
	var matches;
	if(obj(window.sessionStorage) && window.sessionStorage.getItem(name)) {
		return window.sessionStorage.getItem(name)
	}
	else if(obj(window.localStorage) && window.localStorage.getItem(name)) {
		return window.localStorage.getItem(name)
	}
	return (matches = document.cookie.match(encodeURIComponent(name) + "=([^;]+)")) ? decodeURIComponent(matches[1]) : false;
}
Util.deleteCookie = function(name, _options) {
	var path = false;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "path"	: path	= _options[_argument]; break;
			}
		}
	}
	if(obj(window.sessionStorage)) {
		window.sessionStorage.removeItem(name);
	}
	if(obj(window.localStorage)) {
		window.localStorage.removeItem(name);
	}
	if(str(path)) {
		path = ";path="+path;
	}
	else {
		path = "";
	}
	document.cookie = encodeURIComponent(name) + "=" + path + ";expires=Thu, 01-Jan-70 00:00:01 GMT";
}
Util.saveNodeCookie = function(node, name, value, _options) {
	var ref = u.cookieReference(node, _options);
	var mem = JSON.parse(u.getCookie("man_mem"));
	if(!mem) {
		mem = {};
	}
	if(!mem[ref]) {
		mem[ref] = {};
	}
	mem[ref][name] = (value !== false && value !== undefined) ? value : "";
	u.saveCookie("man_mem", JSON.stringify(mem), {"path":"/"});
}
Util.getNodeCookie = function(node, name, _options) {
	var ref = u.cookieReference(node, _options);
	var mem = JSON.parse(u.getCookie("man_mem"));
	if(mem && mem[ref]) {
		if(name) {
			return (typeof(mem[ref][name]) != "undefined") ? mem[ref][name] : false;
		}
		else {
			return mem[ref];
		}
	}
	return false;
}
Util.deleteNodeCookie = function(node, name, _options) {
	var ref = u.cookieReference(node, _options);
	var mem = JSON.parse(u.getCookie("man_mem"));
	if(mem && mem[ref]) {
		if(name) {
			delete mem[ref][name];
		}
		else {
			delete mem[ref];
		}
	}
	u.saveCookie("man_mem", JSON.stringify(mem), {"path":"/"});
}
Util.cookieReference = function(node, _options) {
	var ref;
	var ignore_classnames = false;
	var ignore_classvars = false;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "ignore_classnames"	: ignore_classnames	= _options[_argument]; break;
				case "ignore_classvars" 	: ignore_classvars	= _options[_argument]; break;
			}
		}
	}
	if(node.id) {
		ref = node.nodeName + "#" + node.id;
	}
	else {
		var node_identifier = "";
		if(node.name) {
			node_identifier = node.nodeName + "["+node.name+"]";
		}
		else if(node.className) {
			var classname = node.className;
			if(ignore_classnames) {
				var regex = new RegExp("(^| )("+ignore_classnames.split(",").join("|")+")($| )", "g");
				classname = classname.replace(regex, " ").replace(/[ ]{2,4}/, " ");
			}
			if(ignore_classvars) {
				classname = classname.replace(/\b[a-zA-Z_]+\:[\?\=\w\/\\#~\:\.\,\+\&\%\@\!\-]+\b/g, "").replace(/[ ]{2,4}/g, " ");
			}
			node_identifier = node.nodeName+"."+classname.trim().replace(/ /g, ".");
		}
		else {
			node_identifier = node.nodeName
		}
		var id_node = node;
		while(!id_node.id) {
			id_node = id_node.parentNode;
		}
		if(id_node.id) {
			ref = id_node.nodeName + "#" + id_node.id + " " + node_identifier;
		}
		else {
			ref = node_identifier;
		}
	}
	return ref;
}
Util.querySelector = u.qs = function(query, scope) {
	scope = scope ? scope : document;
	return scope.querySelector(query);
}
Util.querySelectorAll = u.qsa = function(query, scope) {
	try {
		scope = scope ? scope : document;
		return scope.querySelectorAll(query);
	}
	catch(exception) {
		u.exception("u.qsa", arguments, exception);
	}
	return [];
}
Util.getElement = u.ge = function(identifier, scope) {
	var node, nodes, i, regexp;
	if(document.getElementById(identifier)) {
		return document.getElementById(identifier);
	}
	scope = scope ? scope : document;
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	nodes = scope.getElementsByTagName("*");
	for(i = 0; i < nodes.length; i++) {
		node = nodes[i];
		if(regexp.test(node.className)) {
			return node;
		}
	}
	return scope.getElementsByTagName(identifier).length ? scope.getElementsByTagName(identifier)[0] : false;
}
Util.getElements = u.ges = function(identifier, scope) {
	var node, nodes, i, regexp;
	var return_nodes = new Array();
	scope = scope ? scope : document;
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	nodes = scope.getElementsByTagName("*");
	for(i = 0; i < nodes.length; i++) {
		node = nodes[i];
		if(regexp.test(node.className)) {
			return_nodes.push(node);
		}
	}
	return return_nodes.length ? return_nodes : scope.getElementsByTagName(identifier);
}
Util.parentNode = u.pn = function(node, _options) {
	var exclude = "";
	var include = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude) : [];
	var include_nodes = include ? u.qsa(include) : [];
	node = node.parentNode;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || (exclude && (u.inNodeList(node, exclude_nodes))) || (include && (!u.inNodeList(node, include_nodes))))) {
		node = node.parentNode;
	}
	return node;
}
Util.previousSibling = u.ps = function(node, _options) {
	var exclude = "";
	var include = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude, node.parentNode) : [];
	var include_nodes = include ? u.qsa(include, node.parentNode) : [];
	node = node.previousSibling;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || (exclude && (u.inNodeList(node, exclude_nodes))) || (include && (!u.inNodeList(node, include_nodes))))) {
		node = node.previousSibling;
	}
	return node;
}
Util.nextSibling = u.ns = function(node, _options) {
	var exclude = "";
	var include = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude, node.parentNode) : [];
	var include_nodes = include ? u.qsa(include, node.parentNode) : [];
	node = node.nextSibling;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || (exclude && (u.inNodeList(node, exclude_nodes))) || (include && (!u.inNodeList(node, include_nodes))))) {
		node = node.nextSibling;
	}
	return node;
}
Util.childNodes = u.cn = function(node, _options) {
	var exclude = "";
	var include = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude, node) : [];
	var include_nodes = include ? u.qsa(include, node) : [];
	var i, child;
	var children = new Array();
	for(i = 0; i < node.childNodes.length; i++) {
		child = node.childNodes[i]
		if(child && child.nodeType != 3 && child.nodeType != 8 && (!exclude || (!u.inNodeList(child, exclude_nodes))) && (!include || (u.inNodeList(child, include_nodes)))) {
			children.push(child);
		}
	}
	return children;
}
Util.appendElement = u.ae = function(_parent, node_type, attributes) {
	try {
		var node = (obj(node_type)) ? node_type : (node_type == "svg" ? document.createElementNS("http://www.w3.org/2000/svg", node_type) : document.createElement(node_type));
		node = _parent.appendChild(node);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				if(attribute == "html") {
					node.innerHTML = attributes[attribute];
				}
				else {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
		}
		return node;
	}
	catch(exception) {
		u.exception("u.ae", arguments, exception);
	}
	return false;
}
Util.insertElement = u.ie = function(_parent, node_type, attributes) {
	try {
		var node = (obj(node_type)) ? node_type : (node_type == "svg" ? document.createElementNS("http://www.w3.org/2000/svg", node_type) : document.createElement(node_type));
		node = _parent.insertBefore(node, _parent.firstChild);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				if(attribute == "html") {
					node.innerHTML = attributes[attribute];
				}
				else {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
		}
		return node;
	}
	catch(exception) {
		u.exception("u.ie", arguments, exception);
	}
	return false;
}
Util.wrapElement = u.we = function(node, node_type, attributes) {
	try {
		var wrapper_node = node.parentNode.insertBefore(document.createElement(node_type), node);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				wrapper_node.setAttribute(attribute, attributes[attribute]);
			}
		}	
		wrapper_node.appendChild(node);
		return wrapper_node;
	}
	catch(exception) {
		u.exception("u.we", arguments, exception);
	}
	return false;
}
Util.wrapContent = u.wc = function(node, node_type, attributes) {
	try {
		var wrapper_node = document.createElement(node_type);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				wrapper_node.setAttribute(attribute, attributes[attribute]);
			}
		}	
		while(node.childNodes.length) {
			wrapper_node.appendChild(node.childNodes[0]);
		}
		node.appendChild(wrapper_node);
		return wrapper_node;
	}
	catch(exception) {
		u.exception("u.wc", arguments, exception);
	}
	return false;
}
Util.textContent = u.text = function(node) {
	try {
		return node.textContent;
	}
	catch(exception) {
		u.exception("u.text", arguments, exception);
	}
	return "";
}
Util.clickableElement = u.ce = function(node, _options) {
	node._use_link = "a";
	node._click_type = "manual";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "use"			: node._use_link		= _options[_argument]; break;
				case "type"			: node._click_type		= _options[_argument]; break;
			}
		}
	}
	var a = (node.nodeName.toLowerCase() == "a" ? node : u.qs(node._use_link, node));
	if(a) {
		u.ac(node, "link");
		if(a.getAttribute("href") !== null) {
			node.url = a.href;
			a.url = a.href;
			node.onclick = function(event) {
				event.preventDefault();
			}
			node._a = a;
		}
	}
	else {
		u.ac(node, "clickable");
	}
	if(obj(u.e) && fun(u.e.click)) {
		u.e.click(node, _options);
		if(node._click_type == "link") {
			node.clicked = function(event) {
				if(fun(node.preClicked)) {
					node.preClicked();
				}
				if(event && (event.metaKey || event.ctrlKey || (this._a && this._a.target))) {
					window.open(this.url);
				}
				else {
					if(obj(u.h) && u.h.is_listening) {
						u.h.navigate(this.url, this);
					}
					else {
						location.href = this.url;
					}
				}
			}
		}
	}
	return node;
}
Util.classVar = u.cv = function(node, var_name) {
	try {
		var regexp = new RegExp("(\^| )" + var_name + ":[?=\\w/\\#~:.,?+=?&%@!\\-]*");
		var match = node.className.match(regexp);
		if(match) {
			return match[0].replace(var_name + ":", "").trim();
		}
	}
	catch(exception) {
		u.exception("u.cv", arguments, exception);
	}
	return false;
}
Util.setClass = u.sc = function(node, classname, dom_update) {
	var old_class;
	if(node instanceof SVGElement) {
		old_class = node.className.baseVal;
		node.setAttribute("class", classname);
	}
	else {
		old_class = node.className;
		node.className = classname;
	}
	dom_update = (dom_update === false) || (node.offsetTop);
	return old_class;
}
Util.hasClass = u.hc = function(node, classname) {
	if(node.classList.contains(classname)) {
		return true;
	}
	else {
		var regexp = new RegExp("(^|\\s)(" + classname + ")(\\s|$)");
		if(node instanceof SVGElement) {
			if(regexp.test(node.className.baseVal)) {
				return true;
			}
		}
		else {
			if(regexp.test(node.className)) {
				return true;
			}
		}
	}
	return false;
}
Util.addClass = u.ac = function(node, classname, dom_update) {
	var classnames = classname.split(" ");
	while(classnames.length) {
		node.classList.add(classnames.shift());
	}
	dom_update = (dom_update === false) || (node.offsetTop);
	return node.className;
}
Util.removeClass = u.rc = function(node, classname, dom_update) {
	if(node.classList.contains(classname)) {
		node.classList.remove(classname);
	}
	else {
		var regexp = new RegExp("(^|\\s)(" + classname + ")(?=[\\s]|$)", "g");
		if(node instanceof SVGElement) {
			node.setAttribute("class", node.className.baseVal.replace(regexp, " ").trim().replace(/[\s]{2}/g, " "));
		}
		else {
			node.className = node.className.replace(regexp, " ").trim().replace(/[\s]{2}/g, " ");
		}
	}
	dom_update = (dom_update === false) || (node.offsetTop);
	return node.className;
}
Util.toggleClass = u.tc = function(node, classname, _classname, dom_update) {
	if(u.hc(node, classname)) {
		u.rc(node, classname, dom_update);
		if(_classname) {
			u.ac(node, _classname, dom_update);
		}
	}
	else {
		u.ac(node, classname);
		if(_classname) {
			u.rc(node, _classname, dom_update);
		}
	}
	dom_update = (dom_update === false) || (node.offsetTop);
	return node.className;
}
Util.applyStyle = u.as = function(node, property, value, dom_update) {
	node.style[u.vendorProperty(property)] = value;
	dom_update = (dom_update === false) || (node.offsetTop);
}
Util.applyStyles = u.ass = function(node, styles, dom_update) {
	if(styles) {
		var style;
		for(style in styles) {
			if(obj(u.a) && style == "transition") {
				u.a.transition(node, styles[style]);
			}
			else {
				node.style[u.vendorProperty(style)] = styles[style];
			}
		}
	}
	dom_update = (dom_update === false) || (node.offsetTop);
}
Util.getComputedStyle = u.gcs = function(node, property) {
	var dom_update = node.offsetHeight;
	property = (u.vendorProperty(property).replace(/([A-Z]{1})/g, "-$1")).toLowerCase().replace(/^(webkit|ms)/, "-$1");
	return window.getComputedStyle(node, null).getPropertyValue(property);
}
Util.hasFixedParent = u.hfp = function(node) {
	while(node.nodeName.toLowerCase() != "body") {
		if(u.gcs(node.parentNode, "position").match("fixed")) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}
u.contains = function(scope, node) {
	if(scope != node) {
		if(scope.contains(node)) {
			return true
		}
	}
	return false;
}
u.containsOrIs = function(scope, node) {
	if(scope == node || u.contains(scope, node)) {
		return true
	}
	return false;
}
u.elementMatches = u.em = function(node, selector) {
	return node.matches(selector);
}
Util.insertAfter = u.ia = function(insert_node, after_node) {
	var next_node = u.ns(after_node);
	if(next_node) {
		after_node.parentNode.insertBefore(insert_node, next_node);
	}
	else {
		after_node.parentNode.appendChild(insert_node);
	}
}
Util.selectText = function(node) {
	var selection = window.getSelection();
	var range = document.createRange();
	range.selectNodeContents(node);
	selection.removeAllRanges();
	selection.addRange(range);
}
Util.inNodeList = function(node, list) {
	var i, list_node;
	for(i = 0; i < list.length; i++) {
		list_node = list[i]
		if(list_node === node) {
			return true;
		}
	}
	return false;
}
u.easings = new function() {
	this["ease-in"] = function(progress) {
		return Math.pow((progress), 3);
	}
	this["linear"] = function(progress) {
		return progress;
	}
	this["ease-out"] = function(progress) {
		return 1 - Math.pow(1 - ((progress)), 3);
	}
	this["linear"] = function(progress) {
		return (progress);
	}
	this["ease-in-out-veryslow"] = function(progress) {
		if(progress > 0.5) {
			return 4*Math.pow((progress-1),3)+1;
		}
		return 4*Math.pow(progress,3);  
	}
	this["ease-in-out"] = function(progress) {
		if(progress > 0.5) {
			return 1 - Math.pow(1 - ((progress)), 2);
		}
		return Math.pow((progress), 2);
	}
	this["ease-out-slow"] = function(progress) {
		return 1 - Math.pow(1 - ((progress)), 2);
	}
	this["ease-in-slow"] = function(progress) {
		return Math.pow((progress), 2);
	}
	this["ease-in-veryslow"] = function(progress) {
		return Math.pow((progress), 1.5);
	}
	this["ease-in-fast"] = function(progress) {
		return Math.pow((progress), 4);
	}
	this["easeOutQuad"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		t /= d;
		return -c * t*(t-2) + b;
	};
	this["easeOutCubic"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		t /= d;
		t--;
		return c*(t*t*t + 1) + b;
	};
	this["easeOutQuint"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		t /= d;
		t--;
		return c*(t*t*t*t*t + 1) + b;
	};
	this["easeInOutSine"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	};
	this["easeInOutElastic"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	}
	this["easeOutBounce"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
	}
	this["easeInBack"] = function (progress) {
		var s = 1.70158;
		d = 1;
		b = 0;
		c = progress;
		t = progress;
			return c*(t/=d)*t*((s+1)*t - s) + b;
	}
}
Util.Events = u.e = new function() {
	this.event_pref = typeof(document.ontouchmove) == "undefined" || (navigator.maxTouchPoints > 1 && navigator.userAgent.match(/Windows/i)) ? "mouse" : "touch";
	if (navigator.userAgent.match(/Windows/i) && ((obj(document.ontouchmove) && obj(document.onmousemove)) || (fun(document.ontouchmove) && fun(document.onmousemove)))) {
		this.event_support = "multi";
	}
	else if (obj(document.ontouchmove) || fun(document.ontouchmove)) {
		this.event_support = "touch";
	}
	else {
		this.event_support = "mouse";
	}
	this.events = {
		"mouse": {
			"start":"mousedown",
			"move":"mousemove",
			"end":"mouseup",
			"over":"mouseover",
			"out":"mouseout"
		},
		"touch": {
			"start":"touchstart",
			"move":"touchmove",
			"end":"touchend",
			"over":"touchstart",
			"out":"touchend"
		}
	}
	this.kill = function(event) {
		if(event) {
			event.preventDefault();
			event.stopPropagation();
		}
	}
	this.addEvent = function(node, type, action) {
		try {
			node.addEventListener(type, action, false);
		}
		catch(exception) {
			u.exception("u.e.addEvent", arguments, exception);
		}
	}
	this.removeEvent = function(node, type, action) {
		try {
			node.removeEventListener(type, action, false);
		}
		catch(exception) {
			u.exception("u.e.removeEvent", arguments, exception);
		}
	}
	this.addStartEvent = this.addDownEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.start, action);
			u.e.addEvent(node, this.events.touch.start, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].start, action);
		}
	}
	this.removeStartEvent = this.removeDownEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.start, action);
			u.e.removeEvent(node, this.events.touch.start, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].start, action);
		}
	}
	this.addMoveEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.move, action);
			u.e.addEvent(node, this.events.touch.move, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].move, action);
		}
	}
	this.removeMoveEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.move, action);
			u.e.removeEvent(node, this.events.touch.move, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].move, action);
		}
	}
	this.addEndEvent = this.addUpEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.end, action);
			u.e.addEvent(node, this.events.touch.end, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].end, action);
		}
	}
	this.removeEndEvent = this.removeUpEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.end, action);
			u.e.removeEvent(node, this.events.touch.end, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].end, action);
		}
	}
	this.addOverEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.over, action);
			u.e.addEvent(node, this.events.touch.over, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].over, action);
		}
	}
	this.removeOverEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.over, action);
			u.e.removeEvent(node, this.events.touch.over, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].over, action);
		}
	}
	this.addOutEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.out, action);
			u.e.addEvent(node, this.events.touch.out, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].out, action);
		}
	}
	this.removeOutEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.out, action);
			u.e.removeEvent(node, this.events.touch.out, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].out, action);
		}
	}
	this.resetClickEvents = function(node) {
		u.t.resetTimer(node.t_held);
		u.t.resetTimer(node.t_clicked);
		this.removeEvent(node, "mouseup", this._dblclicked);
		this.removeEvent(node, "touchend", this._dblclicked);
		this.removeEvent(node, "mouseup", this._rightclicked);
		this.removeEvent(node, "touchend", this._rightclicked);
		this.removeEvent(node, "mousemove", this._cancelClick);
		this.removeEvent(node, "touchmove", this._cancelClick);
		this.removeEvent(node, "mouseout", this._cancelClick);
		this.removeEvent(node, "mousemove", this._move);
		this.removeEvent(node, "touchmove", this._move);
	}
	this.resetEvents = function(node) {
		this.resetClickEvents(node);
		if(fun(this.resetDragEvents)) {
			this.resetDragEvents(node);
		}
	}
	this.resetNestedEvents = function(node) {
		while(node && node.nodeName != "HTML") {
			this.resetEvents(node);
			node = node.parentNode;
		}
	}
	this._inputStart = function(event) {
		this.event_var = event;
		this.input_timestamp = event.timeStamp;
		this.start_event_x = u.eventX(event);
		this.start_event_y = u.eventY(event);
		this.current_xps = 0;
		this.current_yps = 0;
		this.move_timestamp = event.timeStamp;
		this.move_last_x = 0;
		this.move_last_y = 0;
		this.swiped = false;
		if(!event.button) {
			if(this.e_click || this.e_dblclick || this.e_hold) {
				if(event.type.match(/mouse/)) {
					var node = this;
					while(node) {
						if(node.e_drag || node.e_swipe) {
							u.e.addMoveEvent(this, u.e._cancelClick);
							break;
						}
						else {
							node = node.parentNode;
						}
					}
					u.e.addEvent(this, "mouseout", u.e._cancelClick);
				}
				else {
					u.e.addMoveEvent(this, u.e._cancelClick);
				}
				u.e.addMoveEvent(this, u.e._move);
				u.e.addEndEvent(this, u.e._dblclicked);
				if(this.e_hold) {
					this.t_held = u.t.setTimer(this, u.e._held, 750);
				}
			}
			if(this.e_drag || this.e_swipe) {
				u.e.addMoveEvent(this, u.e._pick);
				this.e_cancelPick = u.e.addWindowEndEvent(this, u.e._cancelPick);
			}
			if(this.e_scroll) {
				u.e.addMoveEvent(this, u.e._scrollStart);
				u.e.addEndEvent(this, u.e._scrollEnd);
			}
		}
		else if(event.button === 2) {
			if(this.e_rightclick) {
				if(event.type.match(/mouse/)) {
					u.e.addEvent(this, "mouseout", u.e._cancelClick);
				}
				else {
					u.e.addMoveEvent(this, u.e._cancelClick);
				}
				u.e.addMoveEvent(this, u.e._move);
				u.e.addEndEvent(this, u.e._rightclicked);
			}
		}
		if(fun(this.inputStarted)) {
			this.inputStarted(event);
		}
	}
	this._cancelClick = function(event) {
		var offset_x = u.eventX(event) - this.start_event_x;
		var offset_y = u.eventY(event) - this.start_event_y;
		if(event.type.match(/mouseout/) || (event.type.match(/move/) && (Math.abs(offset_x) > 15 || Math.abs(offset_y) > 15))) {
			u.e.resetClickEvents(this);
			if(fun(this.clickCancelled)) {
				this.clickCancelled(event);
			}
		}
	}
	this._move = function(event) {
		if(fun(this.moved)) {
			this.current_x = u.eventX(event) - this.start_event_x;
			this.current_y = u.eventY(event) - this.start_event_y;
			this.current_xps = Math.round(((this.current_x - this.move_last_x) / (event.timeStamp - this.move_timestamp)) * 1000);
			this.current_yps = Math.round(((this.current_y - this.move_last_y) / (event.timeStamp - this.move_timestamp)) * 1000);
			this.move_timestamp = event.timeStamp;
			this.move_last_x = this.current_x;
			this.move_last_y = this.current_y;
			this.moved(event);
		}
	}
	this.hold = function(node, _options) {
		node.e_hold_options = _options ? _options : {};
		node.e_hold_options.eventAction = u.stringOr(node.e_hold_options.eventAction, "Held");
		node.e_hold = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._held = function(event) {
		this.e_hold_options.event = this.e_hold_options.event || "hold";
		u.stats.event(this, this.e_hold_options);
		u.e.resetNestedEvents(this);
		if(fun(this.held)) {
			this.held(event);
		}
	}
	this.click = this.tap = function(node, _options) {
		node.e_click_options = _options ? _options : {};
		node.e_click_options.eventAction = u.stringOr(node.e_click_options.eventAction, "Clicked");
		node.e_click = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._clicked = function(event) {
		if(this.e_click_options) {
			this.e_click_options.event = this.e_click_options.event || "click";
			u.stats.event(this, this.e_click_options);
		}
		u.e.resetNestedEvents(this);
		if(fun(this.clicked)) {
			this.clicked(event);
		}
	}
	this.rightclick = function(node, _options) {
		node.e_rightclick_options = _options ? _options : {};
		node.e_rightclick_options.eventAction = u.stringOr(node.e_rightclick_options.eventAction, "RightClicked");
		node.e_rightclick = true;
		u.e.addStartEvent(node, this._inputStart);
		u.e.addEvent(node, "contextmenu", function(event){u.e.kill(event);});
	}
	this._rightclicked = function(event) {
		u.bug("_rightclicked:", this);
		if(this.e_rightclick_options) {
			this.e_rightclick_options.event = this.e_rightclick_options.event || "rightclick";
			u.stats.event(this, this.e_rightclick_options);
		}
		u.e.resetNestedEvents(this);
		if(fun(this.rightclicked)) {
			this.rightclicked(event);
		}
	}
	this.dblclick = this.doubleclick = this.doubletap = this.dbltap = function(node, _options) {
		node.e_dblclick_options = _options ? _options : {};
		node.e_dblclick_options.eventAction = u.stringOr(node.e_dblclick_options.eventAction, "DblClicked");
		node.e_dblclick = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._dblclicked = function(event) {
		if(u.t.valid(this.t_clicked) && event) {
			this.e_dblclick_options.event = this.e_dblclick_options.event || "doubleclick";
			u.stats.event(this, this.e_dblclick_options);
			u.e.resetNestedEvents(this);
			if(fun(this.dblclicked)) {
				this.dblclicked(event);
			}
			return;
		}
		else if(!this.e_dblclick) {
			this._clicked = u.e._clicked;
			this._clicked(event);
		}
		else if(event.type == "timeout") {
			this._clicked = u.e._clicked;
			this._clicked(this.event_var);
		}
		else {
			u.e.resetNestedEvents(this);
			this.t_clicked = u.t.setTimer(this, u.e._dblclicked, 400);
		}
	}
	this.hover = function(node, _options) {
		node._hover_out_delay = 100;
		node._hover_over_delay = 0;
		node._callback_out = "out";
		node._callback_over = "over";
		if(obj(_options)) {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "over"				: node._callback_over		= _options[argument]; break;
					case "out"				: node._callback_out		= _options[argument]; break;
					case "delay_over"		: node._hover_over_delay	= _options[argument]; break;
					case "delay"			: node._hover_out_delay		= _options[argument]; break;
				}
			}
		}
		node.e_hover = true;
		u.e.addOverEvent(node, this._over);
		u.e.addOutEvent(node, this._out);
	}
	this._over = function(event) {
		u.t.resetTimer(this.t_out);
		if(!this._hover_over_delay) {
			u.e.__over.call(this, event);
		}
		else if(!u.t.valid(this.t_over)) {
			this.t_over = u.t.setTimer(this, u.e.__over, this._hover_over_delay, event);
		}
	}
	this.__over = function(event) {
		u.t.resetTimer(this.t_out);
		if(!this.is_hovered) {
			this.is_hovered = true;
			u.e.removeOverEvent(this, u.e._over);
			u.e.addOverEvent(this, u.e.__over);
			if(fun(this[this._callback_over])) {
				this[this._callback_over](event);
			}
		}
	}
	this._out = function(event) {
		u.t.resetTimer(this.t_over);
		u.t.resetTimer(this.t_out);
		this.t_out = u.t.setTimer(this, u.e.__out, this._hover_out_delay, event);
	}
	this.__out = function(event) {
		this.is_hovered = false;
		u.e.removeOverEvent(this, u.e.__over);
		u.e.addOverEvent(this, u.e._over);
		if(fun(this[this._callback_out])) {
			this[this._callback_out](event);
		}
	}
}
u.e.addDOMReadyEvent = function(action) {
	if(document.readyState && document.addEventListener) {
		if((document.readyState == "interactive" && !u.browser("ie")) || document.readyState == "complete" || document.readyState == "loaded") {
			action();
		}
		else {
			var id = u.randomString();
			window["_DOMReady_" + id] = {
				id: id,
				action: action,
				callback: function(event) {
					if(fun(this.action)) {
						this.action.bind(window)(event);
					}
					else if(fun(this[this.action])){
						this[this.action].bind(window)(event);
					}
 					u.e.removeEvent(document, "DOMContentLoaded", window["_DOMReady_" + this.id].eventCallback); 
					delete window["_DOMReady_" + this.id];
				}
			}
			eval('window["_DOMReady_' + id + '"].eventCallback = function() {window["_DOMReady_'+id+'"].callback(event);}');
			u.e.addEvent(document, "DOMContentLoaded", window["_DOMReady_" + id].eventCallback);
		}
	}
	else {
		u.e.addOnloadEvent(action);
	}
}
u.e.addOnloadEvent = function(action) {
	if(document.readyState && (document.readyState == "complete" || document.readyState == "loaded")) {
		action();
	}
	else {
		var id = u.randomString();
		window["_Onload_" + id] = {
			id: id,
			action: action,
			callback: function(event) {
				if(fun(this.action)) {
					this.action.bind(window)(event);
				}
				else if(fun(this[this.action])){
					this[this.action].bind(window)(event);
				}
				u.e.removeEvent(document, "load", window["_Onload_" + this.id].eventCallback); 
				delete window["_Onload_" + this.id];
			}
		}
		eval('window["_Onload_' + id + '"].eventCallback = function() {u.bug("load");window["_Onload_'+id+'"].callback(event);}');
		u.e.addEvent(window, "load", window["_Onload_" + id].eventCallback);
	}
}
u.e.addWindowEvent = function(node, type, action) {
	var id = u.randomString();
	window["_OnWindowEvent_"+ id] = {
		id: id,
		node: node,
		type: type,
		action: action,
		callback: function(event) {
			if(fun(this.action)) {
				this.action.bind(this.node)(event);
			}
			else if(fun(this[this.action])){
				this[this.action](event);
			}
		}
	};
	eval('window["_OnWindowEvent_' + id + '"].eventCallback = function(event) {window["_OnWindowEvent_'+ id + '"].callback(event);}');
	u.e.addEvent(window, type, window["_OnWindowEvent_" + id].eventCallback);
	return id;
}
u.e.removeWindowEvent = function(id) {
	if(window["_OnWindowEvent_" + id]) {
		u.e.removeEvent(window, window["_OnWindowEvent_"+id].type, window["_OnWindowEvent_"+id].eventCallback);
		delete window["_OnWindowEvent_"+id];
	}
}
u.e.addWindowStartEvent = function(node, action) {
	var id = u.randomString();
	window["_OnWindowStartEvent_"+ id] = {
		id: id,
		node: node,
		action: action,
		callback: function(event) {
			if(fun(this.action)) {
				this.action.bind(this.node)(event);
			}
			else if(fun(this[this.action])){
				this[this.action](event);
			}
		}
	};
	eval('window["_OnWindowEvent_' + id + '"].eventCallback = function(event) {window["_OnWindowStartEvent_'+ id + '"].callback(event);}');
	u.e.addEvent(window, type, window["_OnWindowStartEvent_" + id].eventCallback);
	return id;
}
u.e.removeWindowStartEvent = function(id) {
	if(window["_OnWindowStartEvent_" + id]) {
		u.e.removeEvent(window, window["_OnWindowStartEvent_"+id].type, window["_OnWindowStartEvent_"+id].eventCallback);
		delete window["_OnWindowStartEvent_"+id];
	}
}
u.e.addWindowMoveEvent = function(node, action) {
	var id = u.randomString();
	window["_OnWindowMoveEvent_"+ id] = {
		id: id,
		node: node,
		action: action,
		callback: function(event) {
			if(fun(this.action)) {
				this.action.bind(this.node)(event);
			}
			else if(fun(this[this.action])){
				this[this.action](event);
			}
		}
	};
	eval('window["_OnWindowMoveEvent_' + id + '"].eventCallback = function(event) {window["_OnWindowMoveEvent_'+ id + '"].callback(event);}');
	u.e.addEvent(window, type, window["_OnWindowMoveEvent_" + id].eventCallback);
	return id;
}
u.e.removeWindowMoveEvent = function(id) {
	if(window["_OnWindowMoveEvent_" + id]) {
		u.e.removeEvent(window, window["_OnWindowMoveEvent_"+id].type, window["_OnWindowMoveEvent_"+id].eventCallback);
		delete window["_OnWindowMoveEvent_"+id];
	}
}
u.e.addWindowEndEvent = function(node, action) {
	var id = u.randomString();
	window["_OnWindowEndEvent_"+ id] = {
		id: id,
		node: node,
		action: action,
		callback: function(event) {
			if(fun(this.action)) {
				this.action.bind(this.node)(event);
			}
			else if(fun(this[this.action])){
				this[this.action](event);
			}
		}
	};
	eval('window["_OnWindowEndEvent_' + id + '"].eventCallback = function(event) {window["_OnWindowEndEvent_'+ id + '"].callback(event);}');
	u.e.addEndEvent(window, window["_OnWindowEndEvent_" + id].eventCallback);
	return id;
}
u.e.removeWindowEndEvent = function(id) {
	if(window["_OnWindowEndEvent_" + id]) {
		u.e.removeEndEvent(window, window["_OnWindowEndEvent_" + id].eventCallback);
		delete window["_OnWindowEndEvent_"+id];
	}
}
u.e.resetDragEvents = function(node) {
	node._moves_pick = 0;
	this.removeEvent(node, "mousemove", this._pick);
	this.removeEvent(node, "touchmove", this._pick);
	this.removeEvent(node, "mousemove", this._drag);
	this.removeEvent(node, "touchmove", this._drag);
	this.removeEvent(node, "mouseup", this._drop);
	this.removeEvent(node, "touchend", this._drop);
	this.removeWindowEndEvent(node.e_cancelPick);
	this.removeEvent(node, "mouseout", this._dropOut);
	this.removeEvent(node, "mousemove", this._scrollStart);
	this.removeEvent(node, "touchmove", this._scrollStart);
	this.removeEvent(node, "mousemove", this._scrolling);
	this.removeEvent(node, "touchmove", this._scrolling);
	this.removeEvent(node, "mouseup", this._scrollEnd);
	this.removeEvent(node, "touchend", this._scrollEnd);
}
u.e.overlap = function(node, boundaries, strict) {
	if(boundaries.constructor.toString().match("Array")) {
		var boundaries_start_x = Number(boundaries[0]);
		var boundaries_start_y = Number(boundaries[1]);
		var boundaries_end_x = Number(boundaries[2]);
		var boundaries_end_y = Number(boundaries[3]);
	}
	else if(boundaries.constructor.toString().match("HTML")) {
		var boundaries_start_x = u.absX(boundaries) - u.absX(node);
		var boundaries_start_y =  u.absY(boundaries) - u.absY(node);
		var boundaries_end_x = Number(boundaries_start_x + boundaries.offsetWidth);
		var boundaries_end_y = Number(boundaries_start_y + boundaries.offsetHeight);
	}
	var node_start_x = Number(node._x);
	var node_start_y = Number(node._y);
	var node_end_x = Number(node_start_x + node.offsetWidth);
	var node_end_y = Number(node_start_y + node.offsetHeight);
	if(strict) {
		if(node_start_x >= boundaries_start_x && node_start_y >= boundaries_start_y && node_end_x <= boundaries_end_x && node_end_y <= boundaries_end_y) {
			return true;
		}
		else {
			return false;
		}
	} 
	else if(node_end_x < boundaries_start_x || node_start_x > boundaries_end_x || node_end_y < boundaries_start_y || node_start_y > boundaries_end_y) {
		return false;
	}
	return true;
}
u.e.drag = function(node, boundaries, _options) {
	node.e_drag_options = _options ? _options : {};
	node.e_drag = true;
	if(node.childNodes.length < 2 && node.innerHTML.trim() == "") {
		node.innerHTML = "&nbsp;";
	}
	node.distance_to_pick = 2;
	node.drag_strict = true;
	node.drag_overflow = false;
	node.drag_elastica = 0;
	node.drag_dropout = true;
	node.show_bounds = false;
	node.callback_ready = "ready";
	node.callback_picked = "picked";
	node.callback_moved = "moved";
	node.callback_dropped = "dropped";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "strict"			: node.drag_strict			= _options[_argument]; break;
				case "overflow"			: node.drag_overflow		= _options[_argument]; break;
				case "elastica"			: node.drag_elastica		= Number(_options[_argument]); break;
				case "dropout"			: node.drag_dropout			= _options[_argument]; break;
				case "show_bounds"		: node.show_bounds			= _options[_argument]; break; 
				case "vertical_lock"	: node.vertical_lock		= _options[_argument]; break;
				case "horizontal_lock"	: node.horizontal_lock		= _options[_argument]; break;
				case "callback_picked"	: node.callback_picked		= _options[_argument]; break;
				case "callback_moved"	: node.callback_moved		= _options[_argument]; break;
				case "callback_dropped"	: node.callback_dropped		= _options[_argument]; break;
			}
		}
	}
	u.e.setDragBoundaries(node, boundaries);
	u.e.addStartEvent(node, this._inputStart);
	if(fun(node[node.callback_ready])) {
		node[node.callback_ready]();
	}
}
u.e._pick = function(event) {
	var init_speed_x = Math.abs(this.start_event_x - u.eventX(event));
	var init_speed_y = Math.abs(this.start_event_y - u.eventY(event));
	if(
		(init_speed_x > init_speed_y && this.only_horizontal) || 
		(init_speed_x < init_speed_y && this.only_vertical) ||
		(!this.only_vertical && !this.only_horizontal)) {
		if((init_speed_x > this.distance_to_pick || init_speed_y > this.distance_to_pick)) {
			u.e.resetNestedEvents(this);
			u.e.kill(event);
			if(u.hasFixedParent(this)) {
				this.has_fixed_parent = true;
			}
			else {
				this.has_fixed_parent = false;
			}
			this.move_timestamp = event.timeStamp;
			this.move_last_x = this._x;
			this.move_last_y = this._y;
			if(u.hasFixedParent(this)) {
				this.start_input_x = u.eventX(event) - this._x - u.scrollX(); 
				this.start_input_y = u.eventY(event) - this._y - u.scrollY();
			}
			else {
				this.start_input_x = u.eventX(event) - this._x; 
				this.start_input_y = u.eventY(event) - this._y;
			}
			this.current_xps = 0;
			this.current_yps = 0;
			u.a.transition(this, "none");
			u.e.addMoveEvent(this, u.e._drag);
			u.e.addEndEvent(this, u.e._drop);
			if(fun(this[this.callback_picked])) {
				this[this.callback_picked](event);
			}
			if(this.drag_dropout && event.type.match(/mouse/)) {
				this._dropOutDrag = u.e._drag;
				this._dropOutDrop = u.e._drop;
				u.e.addOutEvent(this, u.e._dropOut);
			}
		}
	}
}
u.e._drag = function(event) {
	if(this.has_fixed_parent) {
		this.current_x = u.eventX(event) - this.start_input_x - u.scrollX();
		this.current_y = u.eventY(event) - this.start_input_y - u.scrollY();
	}
	else {
		this.current_x = u.eventX(event) - this.start_input_x;
		this.current_y = u.eventY(event) - this.start_input_y;
	}
	this.current_xps = Math.round(((this.current_x - this.move_last_x) / (event.timeStamp - this.move_timestamp)) * 1000);
	this.current_yps = Math.round(((this.current_y - this.move_last_y) / (event.timeStamp - this.move_timestamp)) * 1000);
	this.last_x_distance_travelled = (this.current_xps) ? this.current_x - this.move_last_x : this.last_x_distance_travelled;
	this.last_y_distance_travelled = (this.current_yps) ? this.current_y - this.move_last_y : this.last_y_distance_travelled;
	this.move_timestamp = event.timeStamp;
	this.move_last_x = this.current_x;
	this.move_last_y = this.current_y;
	if(!this.locked && this.only_vertical) {
		this._y = this.current_y;
	}
	else if(!this.locked && this.only_horizontal) {
		this._x = this.current_x;
	}
	else if(!this.locked) {
		this._x = this.current_x;
		this._y = this.current_y;
	}
	if(this.e_swipe) {
		if(this.only_horizontal) {
			if(this.current_xps < 0 || this.current_xps === 0 && this.last_x_distance_travelled < 0) {
				this.swiped = "left";
			}
			else {
				this.swiped = "right";
			}
		}
		else if(this.only_vertical) {
			if(this.current_yps < 0 || this.current_yps === 0 && this.last_y_distance_travelled < 0) {
				this.swiped = "up";
			}
			else {
				this.swiped = "down";
			}
		}
		else {
			if(Math.abs(this.current_xps) > Math.abs(this.current_yps)) {
				if(this.current_xps < 0) {
					this.swiped = "left";
				}
				else {
					this.swiped = "right";
				}
			}
			else if(Math.abs(this.current_xps) < Math.abs(this.current_yps)) {
				if(this.current_yps < 0) {
					this.swiped = "up";
				}
				else {
					this.swiped = "down";
				}
			}
		}
	}
	if(!this.locked) {
		if(u.e.overlap(this, [this.start_drag_x, this.start_drag_y, this.end_drag_x, this.end_drag_y], true)) {
			u.a.translate(this, this._x, this._y);
		}
		else if(this.drag_elastica) {
			this.swiped = false;
			this.current_xps = 0;
			this.current_yps = 0;
			var offset = false;
			if(!this.only_vertical && this._x < this.start_drag_x) {
				offset = this._x < this.start_drag_x - this.drag_elastica ? - this.drag_elastica : this._x - this.start_drag_x;
				this._x = this.start_drag_x;
				this.current_x = this._x + offset + (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else if(!this.only_vertical && this._x + this.offsetWidth > this.end_drag_x) {
				offset = this._x + this.offsetWidth > this.end_drag_x + this.drag_elastica ? this.drag_elastica : this._x + this.offsetWidth - this.end_drag_x;
				this._x = this.end_drag_x - this.offsetWidth;
				this.current_x = this._x + offset - (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else {
				this.current_x = this._x;
			}
			if(!this.only_horizontal && this._y < this.start_drag_y) {
				offset = this._y < this.start_drag_y - this.drag_elastica ? - this.drag_elastica : this._y - this.start_drag_y;
				this._y = this.start_drag_y;
				this.current_y = this._y + offset + (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else if(!this.horizontal && this._y + this.offsetHeight > this.end_drag_y) {
				offset = (this._y + this.offsetHeight > this.end_drag_y + this.drag_elastica) ? this.drag_elastica : (this._y + this.offsetHeight - this.end_drag_y);
				this._y = this.end_drag_y - this.offsetHeight;
				this.current_y = this._y + offset - (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else {
				this.current_y = this._y;
			}
			if(offset) {
				u.a.translate(this, this.current_x, this.current_y);
			}
		}
		else {
			this.swiped = false;
			this.current_xps = 0;
			this.current_yps = 0;
			if(this._x < this.start_drag_x) {
				this._x = this.start_drag_x;
			}
			else if(this._x + this.offsetWidth > this.end_drag_x) {
				this._x = this.end_drag_x - this.offsetWidth;
			}
			if(this._y < this.start_drag_y) {
				this._y = this.start_drag_y;
			}
			else if(this._y + this.offsetHeight > this.end_drag_y) { 
				this._y = this.end_drag_y - this.offsetHeight;
			}
			u.a.translate(this, this._x, this._y);
		}
	}
	if(fun(this[this.callback_moved])) {
		this[this.callback_moved](event);
	}
}
u.e._drop = function(event) {
	u.e.resetEvents(this);
	if(this.e_swipe && this.swiped) {
		this.e_swipe_options.eventAction = "Swiped "+ this.swiped;
		u.stats.event(this, this.e_swipe_options);
		if(this.swiped == "left" && fun(this.swipedLeft)) {
			this.swipedLeft(event);
		}
		else if(this.swiped == "right" && fun(this.swipedRight)) {
			this.swipedRight(event);
		}
		else if(this.swiped == "down" && fun(this.swipedDown)) {
			this.swipedDown(event);
		}
		else if(this.swiped == "up" && fun(this.swipedUp)) {
			this.swipedUp(event);
		}
	}
	else if(!this.drag_strict && !this.locked) {
		this.current_x = Math.round(this._x + (this.current_xps/2));
		this.current_y = Math.round(this._y + (this.current_yps/2));
		if(this.only_vertical || this.current_x < this.start_drag_x) {
			this.current_x = this.start_drag_x;
		}
		else if(this.current_x + this.offsetWidth > this.end_drag_x) {
			this.current_x = this.end_drag_x - this.offsetWidth;
		}
		if(this.only_horizontal || this.current_y < this.start_drag_y) {
			this.current_y = this.start_drag_y;
		}
		else if(this.current_y + this.offsetHeight > this.end_drag_y) {
			this.current_y = this.end_drag_y - this.offsetHeight;
		}
		this.transitioned = function() {
			if(fun(this.projected)) {
				this.projected(event);
			}
		}
		if(this.current_xps || this.current_yps) {
			u.a.transition(this, "all 1s cubic-bezier(0,0,0.25,1)");
		}
		else {
			u.a.transition(this, "none");
		}
		u.a.translate(this, this.current_x, this.current_y);
	}
	if(this.e_drag && !this.e_swipe) {
		this.e_drag_options.eventAction = u.stringOr(this.e_drag_options.eventAction, "Dropped");
		u.stats.event(this, this.e_drag_options);
	}
	if(fun(this[this.callback_dropped])) {
		this[this.callback_dropped](event);
	}
}
u.e._dropOut = function(event) {
	this._drop_out_id = u.randomString();
	document["_DroppedOutNode" + this._drop_out_id] = this;
	eval('document["_DroppedOutMove' + this._drop_out_id + '"] = function(event) {document["_DroppedOutNode' + this._drop_out_id + '"]._dropOutDrag(event);}');
	eval('document["_DroppedOutOver' + this._drop_out_id + '"] = function(event) {u.e.removeEvent(document, "mousemove", document["_DroppedOutMove' + this._drop_out_id + '"]);u.e.removeEvent(document, "mouseup", document["_DroppedOutEnd' + this._drop_out_id + '"]);u.e.removeEvent(document["_DroppedOutNode' + this._drop_out_id + '"], "mouseover", document["_DroppedOutOver' + this._drop_out_id + '"]);}');
	eval('document["_DroppedOutEnd' + this._drop_out_id + '"] = function(event) {u.e.removeEvent(document, "mousemove", document["_DroppedOutMove' + this._drop_out_id + '"]);u.e.removeEvent(document, "mouseup", document["_DroppedOutEnd' + this._drop_out_id + '"]);u.e.removeEvent(document["_DroppedOutNode' + this._drop_out_id + '"], "mouseover", document["_DroppedOutOver' + this._drop_out_id + '"]);document["_DroppedOutNode' + this._drop_out_id + '"]._dropOutDrop(event);}');
	u.e.addEvent(document, "mousemove", document["_DroppedOutMove" + this._drop_out_id]);
	u.e.addEvent(this, "mouseover", document["_DroppedOutOver" + this._drop_out_id]);
	u.e.addEvent(document, "mouseup", document["_DroppedOutEnd" + this._drop_out_id]);
}
u.e._cancelPick = function(event) {
	u.e.resetDragEvents(this);
	if(fun(this.pickCancelled)) {
		this.pickCancelled(event);
	}
}
u.e.setDragBoundaries = function(node, boundaries) {
	if((boundaries.constructor && boundaries.constructor.toString().match("Array")) || (boundaries.scopeName && boundaries.scopeName != "HTML")) {
		node.start_drag_x = Number(boundaries[0]);
		node.start_drag_y = Number(boundaries[1]);
		node.end_drag_x = Number(boundaries[2]);
		node.end_drag_y = Number(boundaries[3]);
	}
	else if((boundaries.constructor && boundaries.constructor.toString().match("HTML")) || (boundaries.scopeName && boundaries.scopeName == "HTML")) {
		if(node.drag_overflow == "scroll") {
			node.start_drag_x = node.offsetWidth > boundaries.offsetWidth ? boundaries.offsetWidth - node.offsetWidth : 0;
			node.start_drag_y = node.offsetHeight > boundaries.offsetHeight ? boundaries.offsetHeight - node.offsetHeight : 0;
			node.end_drag_x = node.offsetWidth > boundaries.offsetWidth ? node.offsetWidth : boundaries.offsetWidth;
			node.end_drag_y = node.offsetHeight > boundaries.offsetHeight ? node.offsetHeight : boundaries.offsetHeight;
		}
		else {
			node.start_drag_x = u.absX(boundaries) - u.absX(node);
			node.start_drag_y = u.absY(boundaries) - u.absY(node);
			node.end_drag_x = node.start_drag_x + boundaries.offsetWidth;
			node.end_drag_y = node.start_drag_y + boundaries.offsetHeight;
		}
	}
	if(node.show_bounds) {
		var debug_bounds = u.ae(document.body, "div", {"class":"debug_bounds"})
		debug_bounds.style.position = "absolute";
		debug_bounds.style.background = "red"
		debug_bounds.style.left = (u.absX(node) + node.start_drag_x - 1) + "px";
		debug_bounds.style.top = (u.absY(node) + node.start_drag_y - 1) + "px";
		debug_bounds.style.width = (node.end_drag_x - node.start_drag_x) + "px";
		debug_bounds.style.height = (node.end_drag_y - node.start_drag_y) + "px";
		debug_bounds.style.border = "1px solid white";
		debug_bounds.style.zIndex = 9999;
		debug_bounds.style.opacity = .5;
		if(document.readyState && document.readyState == "interactive") {
			debug_bounds.innerHTML = "WARNING - injected on DOMLoaded"; 
		}
		u.bug("node: ", node, " in (" + u.absX(node) + "," + u.absY(node) + "), (" + (u.absX(node)+node.offsetWidth) + "," + (u.absY(node)+node.offsetHeight) +")");
		u.bug("boundaries: (" + node.start_drag_x + "," + node.start_drag_y + "), (" + node.end_drag_x + ", " + node.end_drag_y + ")");
	}
	node._x = node._x ? node._x : 0;
	node._y = node._y ? node._y : 0;
	if(node.drag_overflow == "scroll" && (boundaries.constructor && boundaries.constructor.toString().match("HTML")) || (boundaries.scopeName && boundaries.scopeName == "HTML")) {
		node.locked = ((node.end_drag_x - node.start_drag_x <= boundaries.offsetWidth) && (node.end_drag_y - node.start_drag_y <= boundaries.offsetHeight));
		node.only_vertical = (node.vertical_lock || (!node.locked && node.end_drag_x - node.start_drag_x <= boundaries.offsetWidth));
		node.only_horizontal = (node.horizontal_lock || (!node.locked && node.end_drag_y - node.start_drag_y <= boundaries.offsetHeight));
	}
	else {
		node.locked = ((node.end_drag_x - node.start_drag_x == node.offsetWidth) && (node.end_drag_y - node.start_drag_y == node.offsetHeight));
		node.only_vertical = (node.vertical_lock || (!node.locked && node.end_drag_x - node.start_drag_x == node.offsetWidth));
		node.only_horizontal = (node.horizontal_lock || (!node.locked && node.end_drag_y - node.start_drag_y == node.offsetHeight));
	}
}
u.e.setDragPosition = function(node, x, y) {
	node.current_xps = 0;
	node.current_yps = 0;
	node._x = x;
	node._y = y;
	u.a.translate(node, node._x, node._y);
	if(fun(node[node.callback_moved])) {
		node[node.callback_moved](event);
	}
}
u.e.swipe = function(node, boundaries, _options) {
	node.e_swipe_options = _options ? _options : {};
	node.e_swipe = true;
	u.e.drag(node, boundaries, _options);
}
Util.Form = u.f = new function() {
	this.customInit = {};
	this.customValidate = {};
	this.customDataFormat = {};
	this.customHintPosition = {};
	this.customLabelStyle = {};
	this.init = function(_form, _options) {
		var i, j, field, action, input, hidden_input;
		_form._bulk_operation = true;
		if(_form.nodeName.toLowerCase() != "form") {
			_form.native_form = u.pn(_form, {"include":"form"});
			if(!_form.native_form) {
				u.bug("there is no form in this document??");
				return;
			}
		}
		else {
			_form.native_form = _form;
		}
		_form._focus_z_index = 50;
		_form._validation = true;
		_form._debug = false;
		_form._label_style = u.cv(_form, "labelstyle");
		_form._callback_ready = "ready";
		_form._callback_submitted = "submitted";
		_form._callback_submit_failed = "submitFailed";
		_form._callback_pre_submitted = "preSubmitted";
		_form._callback_resat = "resat";
		_form._callback_updated = "updated";
		_form._callback_changed = "changed";
		_form._callback_blurred = "blurred";
		_form._callback_focused = "focused";
		_form._callback_validation_failed = "validationFailed";
		_form._callback_validation_passed = "validationPassed";
		if(obj(_options)) {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "validation"               : _form._validation                = _options[_argument]; break;
					case "debug"                    : _form._debug                     = _options[_argument]; break;
					case "focus_z"                  : _form._focus_z_index             = _options[_argument]; break;
					case "label_style"              : _form._label_style               = _options[_argument]; break;
					case "callback_ready"           : _form._callback_ready            = _options[_argument]; break;
					case "callback_submitted"       : _form._callback_submitted        = _options[_argument]; break;
					case "callback_submit_failed"   : _form._callback_submit_failed    = _options[_argument]; break;
					case "callback_pre_submitted"   : _form._callback_pre_submitted    = _options[_argument]; break;
					case "callback_resat"           : _form._callback_resat            = _options[_argument]; break;
					case "callback_updated"         : _form._callback_updated          = _options[_argument]; break;
					case "callback_changed"         : _form._callback_changed          = _options[_argument]; break;
					case "callback_blurred"         : _form._callback_blurred          = _options[_argument]; break;
					case "callback_focused"         : _form._callback_focused          = _options[_argument]; break;
					case "callback_validation_failed"         : _form._callback_validation_failed          = _options[_argument]; break;
					case "callback_validation_passed"         : _form._callback_validation_passed          = _options[_argument]; break;
				}
			}
		}
		_form._hover_z_index = _form._focus_z_index - 1;
		_form.native_form.onsubmit = function(event) {
			if(event.target._form) {
				return false;
			}
		}
		_form.native_form.setAttribute("novalidate", "novalidate");
		_form.DOMsubmit = _form.native_form.submit;
		_form.submit = this._submit;
		_form.DOMreset = _form.native_form.reset;
		_form.reset = this._reset;
		_form.getData = function(_options) {
			return u.f.getFormData(this, _options);
		}
		_form.inputs = {};
		_form.actions = {};
		_form._error_inputs = {};
		var fields = u.qsa(".field", _form);
		for(i = 0; i < fields.length; i++) {
			field = fields[i];
			u.f.initField(_form, field);
		}
		var hidden_inputs = u.qsa("input[type=hidden]", _form);
		for(i = 0; i < hidden_inputs.length; i++) {
			hidden_input = hidden_inputs[i];
			if(!_form.inputs[hidden_input.name]) {
				_form.inputs[hidden_input.name] = hidden_input;
				hidden_input._form = _form;
				hidden_input.val = this._value;
			}
		}
		var actions = u.qsa(".actions li input[type=button],.actions li input[type=submit],.actions li input[type=reset],.actions li a.button", _form);
		for(i = 0; i < actions.length; i++) {
			action = actions[i];
			this.initButton(_form, action);
		}
		u.t.setTimer(_form, function() {
			var validate_inputs = [];
			for(input in this.inputs) {
				if(this.inputs[input].field) {
					validate_inputs.push(this.inputs[input]);
				}
			}
			u.f.bulkValidate(validate_inputs);
			if(_form._debug) {
				u.bug(_form, "inputs:", _form.inputs, "actions:", _form.actions);
			}
			if(fun(this[this._callback_ready])) {
				this[this._callback_ready]();
			}
		}, 100);
	}
	this.initField = function(_form, field) {
		field._form = _form;
		field._base_z_index = u.gcs(field, "z-index");
		field.help = u.qs(".help", field);
		field.hint = u.qs(".hint", field);
		field.error = u.qs(".error", field);
		field.label = u.qs("label", field);
		field.indicator = u.ae(field, "div", {"class":"indicator"});
		if(fun(u.f.fixFieldHTML)) {
			u.f.fixFieldHTML(field);
		}
		field._custom_initialized = false;
		var custom_init;
		for(custom_init in this.customInit) {
			if(u.hc(field, custom_init)) {
				this.customInit[custom_init](field);
				field._custom_initialized = true;
				break;
			}
		}
		if(!field._custom_initialized) {
			if(u.hc(field, "string|email|tel|number|integer|password|date|datetime")) {
				field.type = field.className.match(/(?:^|\b)(string|email|tel|number|integer|password|date|datetime)(?:\b|$)/)[0];
				field.input = u.qs("input", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value;
				u.e.addEvent(field.input, "keyup", this._updated);
				u.e.addEvent(field.input, "change", this._changed);
				this.inputOnEnter(field.input);
				this.activateInput(field.input);
			}
			else if(u.hc(field, "text")) {
				field.type = "text";
				field.input = u.qs("textarea", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value;
				if(u.hc(field, "autoexpand")) {
					u.ass(field.input, {
						"overflow": "hidden"
					});
					field.input.setHeight = function() {
						u.ass(this, {
							height: "auto"
						});
						u.ass(this, {
							height: (this.scrollHeight) + "px"
						});
					}
					u.e.addEvent(field.input, "input", field.input.setHeight);
					field.input.setHeight();
				}
				u.e.addEvent(field.input, "keyup", this._updated);
				u.e.addEvent(field.input, "change", this._changed);
				this.activateInput(field.input);
			}
			else if(u.hc(field, "json")) {
				field.type = "json";
				field.input = u.qs("textarea", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value;
				if(u.hc(field, "autoexpand")) {
					u.ass(field.input, {
						"overflow": "hidden"
					});
					field.input.setHeight = function() {
						u.ass(this, {
							height: "auto"
						});
						u.ass(this, {
							height: (this.scrollHeight) + "px"
						});
					}
					u.e.addEvent(field.input, "input", field.input.setHeight);
					field.input.setHeight();
				}
				u.e.addEvent(field.input, "keyup", this._updated);
				u.e.addEvent(field.input, "change", this._changed);
				this.activateInput(field.input);
			}
			else if(u.hc(field, "select")) {
				field.type = "select";
				field.input = u.qs("select", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value_select;
				u.e.addEvent(field.input, "change", this._updated);
				u.e.addEvent(field.input, "keyup", this._updated);
				u.e.addEvent(field.input, "change", this._changed);
				this.activateInput(field.input);
			}
			else if(u.hc(field, "checkbox|boolean")) {
				field.type = field.className.match(/(?:^|\b)(checkbox|boolean)(?:\b|$)/)[0];
				field.input = u.qs("input[type=checkbox]", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value_checkbox;
				u.f._update_checkbox_field.bind(field.input)();
				u.e.addEvent(field.input, "change", this._changed);
				u.e.addEvent(field.input, "change", this._updated);
				u.e.addEvent(field.input, "change", this._update_checkbox_field);
				this.inputOnEnter(field.input);
				this.activateInput(field.input);
			}
			else if(u.hc(field, "radiobuttons")) {
				field.type = "radiobuttons";
				field.inputs = u.qsa("input", field);
				field.input = field.inputs[0];
				for(j = 0; j < field.inputs.length; j++) {
					input = field.inputs[j];
					input._form = _form;
					input.label = u.qs("label[for='"+input.id+"']", field);
					input.field = field;
					input.val = this._value_radiobutton;
					u.e.addEvent(input, "change", this._changed);
					u.e.addEvent(input, "change", this._updated);
					this.inputOnEnter(input);
					this.activateInput(input);
				}
			}
			else if(u.hc(field, "files")) {
				field.type = "files";
				field.input = u.qs("input", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value_file;
				field.filelist = u.qs("ul.filelist", field);
				if(!field.filelist) {
					field.filelist = u.ae(field, "ul", {"class":"filelist"});
					field.insertBefore(field.help, field.filelist);
				}
				field.filelist.field = field;
				field.uploaded_files = u.qsa("li.uploaded", field.filelist);
				this._update_filelist.bind(field.input)();
				u.e.addEvent(field.input, "change", this._update_filelist);
				if(u.e.event_support != "touch") {
					u.e.addEvent(field.input, "dragenter", this._focus);
					u.e.addEvent(field.input, "dragleave", this._blur);
					u.e.addEvent(field.input, "drop", this._blur);
				}
				this.activateInput(field.input);
			}
			else {
				u.bug("UNKNOWN FIELD IN FORM INITIALIZATION:", field);
			}
		}
		if(field.input) {
			_form.inputs[field.input.name] = field.input;
			if(!_form._bulk_operation) {
				this.validate(field.input);
			}
		}
		if(field.virtual_input && !field.virtual_input.tabindex) {
			field.virtual_input.setAttribute("tabindex", 0);
			field.input.setAttribute("tabindex", 0);
		}
		else if(field.input && field.input.getAttribute("readonly")) {
			field.input.setAttribute("tabindex", -1);
		}
		else if(field.input && !field.input.tabindex) {
			field.input.setAttribute("tabindex", 0);
		}
	}
	this.initButton = function(_form, action) {
		action._form = _form;
		action.setAttribute("tabindex", 0);
		this.buttonOnEnter(action);
		this.activateButton(action);
	}
	this._reset = function(event, iN) {
		for (name in this.inputs) {
			if (this.inputs[name] && this.inputs[name].field && this.inputs[name].type != "hidden" && !this.inputs[name].getAttribute("readonly")) {
				this.inputs[name]._used = false;
				this.inputs[name].val("");
				if(fun(u.f.updateDefaultState)) {
					u.f.updateDefaultState(this.inputs[name]);
				}
			}
		}
		if(fun(this[this._callback_resat])) {
			this[this._callback_resat](iN);
		}
	}
	this._submit = function(event, iN) {
		var validate_inputs = [];
		for(name in this.inputs) {
			if(this.inputs[name] && this.inputs[name].field && fun(this.inputs[name].val)) {
				this.inputs[name]._used = true;
				validate_inputs.push(this.inputs[name]);
			}
		}
		u.f.bulkValidate(validate_inputs);
		if(!Object.keys(this._error_inputs).length) {
			if(fun(this[this._callback_pre_submitted])) {
				this[this._callback_pre_submitted](iN);
			}
			if(fun(this[this._callback_submitted])) {
				this[this._callback_submitted](iN);
			}
			else {
				for(name in this.inputs) {
					if(this.inputs[name] && this.inputs[name].default_value && this.inputs[name].nodeName.match(/^(input|textarea)$/i)) {
						if(fun(this.inputs[name].val) && !this.inputs[name].val()) {
							this.inputs[name].value = "";
						}
					}
				}
				this.DOMsubmit();
			}
		}
		else {
			if(fun(this[this._callback_submit_failed])) {
				this[this._callback_submit_failed](iN);
			}
		}
	}
	this._value = function(value) {
		if(value !== undefined) {
			this.value = value;
			if(value !== this.default_value) {
				u.rc(this, "default");
			}
			u.f.validate(this);
		}
		return (this.value != this.default_value) ? this.value : "";
	}
	this._value_radiobutton = function(value) {
		var i, option;
		if(value !== undefined) {
			for(i = 0; i < this.field.inputs.length; i++) {
				option = this.field.inputs[i];
				if(option.value == value || (option.value == "true" && value) || (option.value == "false" && value === false)) {
					option.checked = true;
					u.f.validate(this);
				}
				else {
					option.checked = false;
				}
			}
		}
		for(i = 0; i < this.field.inputs.length; i++) {
			option = this.field.inputs[i];
			if(option.checked) {
				return option.value;
			}
		}
		return "";
	}
	this._value_checkbox = function(value) {
		if(value !== undefined) {
			if(value) {
				this.checked = true
			}
			else {
				this.checked = false;
			}
			u.f._update_checkbox_field.bind(this)();
			u.f.validate(this);
		}
		if(this.checked) {
			return this.value;
		}
		return "";
	}
	this._value_select = function(value) {
		if(value !== undefined) {
			var i, option;
			for(i = 0; i < this.options.length; i++) {
				option = this.options[i];
				if(option.value == value) {
					this.selectedIndex = i;
					u.f.validate(this);
					return this.options[this.selectedIndex].value;
				}
			}
			if (value === "") {
				this.selectedIndex = -1;
				u.f.validate(this);
				return "";
			}
		}
		return (this.selectedIndex >= 0 && this.default_value != this.options[this.selectedIndex].value) ? this.options[this.selectedIndex].value : "";
	}
	this._value_file = function(value) {
		if(value !== undefined) {
			if(value === "") {
				this.value = null;
			}
			else {
				u.bug('ADDING VALUES MANUALLY TO INPUT type="file" IS NOT SUPPORTED IN JAVASCRIPT');
			}
			u.f._update_filelist.bind(this)();
			u.f.validate(this);
		}
		if(this.files && this.files.length) {
			var i, file, files = [];
			for(i = 0; i < this.files.length; i++) {
				file = this.files[i];
				files.push(file);
			}
			return files;
		}
		else if(!this.files && this.value) {
			return this.value;
		}
		else if(this.field.uploaded_files && this.field.uploaded_files.length){
			return true;
		}
		return "";
	}
	this._changed = function(event) {
		u.f.positionHint(this.field);
		if(fun(this[this._form._callback_changed])) {
			this[this._form._callback_changed](this);
		}
		else if(fun(this.field.input[this._form._callback_changed])) {
			this.field.input[this._form._callback_changed](this);
		}
		if(fun(this._form[this._form._callback_changed])) {
			this._form[this._form._callback_changed](this);
		}
	}
	this._updated = function(event) {
		if(event.keyCode != 9 && event.keyCode != 13 && event.keyCode != 16 && event.keyCode != 17 && event.keyCode != 18) {
			u.f.validate(this);
			if(fun(this[this._form._callback_updated])) {
				this[this._form._callback_updated](this);
			}
			else if(fun(this.field.input[this._form._callback_updated])) {
				this.field.input[this._form._callback_updated](this);
			}
			if(fun(this._form[this._form._callback_updated])) {
				this._form[this._form._callback_updated](this);
			}
		}
	}
	this._update_checkbox_field = function(event) {
		if(this.checked) {
			u.ac(this.field, "checked");
		}
		else {
			u.rc(this.field, "checked");
		}
	}
	this._update_filelist = function(event) {
		var i;
		var files = this.val();
		this.field.filelist.innerHTML = "";
		this.e_updated = event;
		u.ae(this.field.filelist, "li", {
			"html":this.field.hint ? u.text(this.field.hint) : u.text(this.label), class:"label",
		});
		if(files && files.length) {
			u.ac(this.field, "has_new_files");
			var i, file, li_file;
			this.field.filelist.load_queue = 0;
			for(i = 0; i < files.length; i++) {
				file = files[i];
				li_file = u.ae(this.field.filelist, "li", {"html":file.name, "class":"new format:"+file.name.substring(file.name.lastIndexOf(".")+1).toLowerCase()})
				li_file.input = this;
				if(file.type.match(/image/)) {
					li_file.image = new Image();
					li_file.image.li = li_file;
					u.ac(li_file, "loading");
					this.field.filelist.load_queue++;
					li_file.image.onload = function() {
						u.ac(this.li, "width:"+this.width);
						u.ac(this.li, "height:"+this.height);
						u.rc(this.li, "loading");
						this.li.input.field.filelist.load_queue--;
						delete this.li.image;
						u.f.filelistUpdated(this.li.input);
					}
					li_file.image.src = URL.createObjectURL(file);
				}
				else if(file.type.match(/video/)) {
					li_file.video = document.createElement("video");
					li_file.video.preload = "metadata";
					li_file.video.li = li_file;
					u.ac(li_file, "loading");
					this.field.filelist.load_queue++;
					li_file.video.onloadedmetadata = function() {
						u.bug("loaded", this);
						u.ac(this.li, "width:"+this.videoWidth);
						u.ac(this.li, "height:"+this.videoHeight);
						u.rc(this.li, "loading");
						this.li.input.field.filelist.load_queue--;
						delete this.li.video;
						u.f.filelistUpdated(this.li.input);
					}
					li_file.video.src = URL.createObjectURL(file);
				}
			}
			if(this.multiple) {
				for(i = 0; i < this.field.uploaded_files.length; i++) {
					u.ae(this.field.filelist, this.field.uploaded_files[i]);
				}
			}
			else {
				this.field.uploaded_files = [];
			}
			u.f.filelistUpdated(this);
		}
		else if(this.field.uploaded_files && this.field.uploaded_files.length) {
			u.rc(this.field, "has_new_files");
			var i;
			for(i = 0; i < this.field.uploaded_files.length; i++) {
				u.ae(this.field.filelist, this.field.uploaded_files[i]);
			}
		}
		else {
			u.rc(this.field, "has_new_files");
		}
	}
	this.filelistUpdated = function(input) {
		if(input.field.filelist.load_queue === 0) {
			this._changed.bind(input.field.input)(input.e_updated);
			this._updated.bind(input.field.input)(input.e_updated);
			delete input.e_updated;
		}
	}
	this.updateFilelistStatus = function(form, response) {
		if(form && form.inputs && response && response.cms_status == "success" && response.cms_object && response.cms_object.mediae) {
			var mediae = JSON.parse(JSON.stringify(response.cms_object.mediae));
			var filelists = u.qsa("div.field.files ul.filelist", form);
			var i, j, k, filelist, old_files, old_file, new_files, new_files;
			for(i = 0; i < filelists.length; i++) {
				filelist = filelists[i];
				new_files = u.qsa("li.new", filelist);
				if(new_files.length) {
					old_files = u.qsa("li.uploaded", filelist);
					if(old_files.length) {
						for(j in mediae) {
							media = mediae[j];
							if(media.variant.match("^" + filelist.field.input.name.replace(/\[\]$/, "") + "(\-|$)")) {
								for(k = 0; k < old_files.length; k++) {
									old_file = old_files[k];
									if(u.cv(old_file, "media_id") == media.id) {
										delete mediae[j];
									}
								}
							}
						}
					}
					if(Object.keys(mediae).length) {
						for(j in mediae) {
							media = mediae[j];
							if(media.variant.match("^"+filelist.field.input.name.replace(/\[\]$/, "")+"(\-|$)")) {
								for(k = 0; k < new_files.length; k++) {
									new_file = new_files[k];
									if(u.text(new_file) == media.name || u.text(new_file)+".zip" == media.name) {
										new_file.innerHTML = media.name;
										u.rc(new_file, "new");
										u.ac(new_file, "uploaded media_id:"+media.id+" variant:"+media.variant+" format:"+media.format+" width:"+media.width+" height:"+media.height);
										delete mediae[j];
									}
								}
							}
						}
					}
				}
				filelist.field.uploaded_files = u.qsa("li.uploaded", filelist);
			}
		}
	}
	this._mouseenter = function(event) {
		u.ac(this.field, "hover");
		u.ac(this, "hover");
		u.as(this.field, "zIndex", this._form._hover_z_index);
		u.f.positionHint(this.field);
	}
	this._mouseleave = function(event) {
		u.rc(this.field, "hover");
		u.rc(this, "hover");
		u.as(this.field, "zIndex", this.field._base_z_index);
		u.f.positionHint(this.field);
	}
	this._focus = function(event) {
		this.field.is_focused = true;
		this.is_focused = true;
		u.ac(this.field, "focus");
		u.ac(this, "focus");
		u.as(this.field, "zIndex", this._form._focus_z_index);
		u.f.positionHint(this.field);
		if(fun(this[this._form._callback_focused])) {
			this[this._form._callback_focused](this);
		}
		else if(fun(this.field.input[this._form._callback_focused])) {
			this.field.input[this._form._callback_focused](this);
		}
		if(fun(this._form[this._form._callback_focused])) {
			this._form[this._form._callback_focused](this);
		}
	}
	this._blur = function(event) {
		this.field.is_focused = false;
		this.is_focused = false;
		u.rc(this.field, "focus");
		u.rc(this, "focus");
		u.as(this.field, "zIndex", this.field._base_z_index);
		u.f.positionHint(this.field);
		this._used = true;
		if(fun(this[this._form._callback_blurred])) {
			this[this._form._callback_blurred](this);
		}
		else if(fun(this.field.input[this._form._callback_blurred])) {
			this.field.input[this._form._callback_blurred](this);
		}
		if(fun(this._form[this._form._callback_blurred])) {
			this._form[this._form._callback_blurred](this);
		}
	}
	this._button_focus = function(event) {
		u.ac(this, "focus");
		if(fun(this[this._form._callback_focused])) {
			this[this._form._callback_focused](this);
		}
		if(fun(this._form[this._form._callback_focused])) {
			this._form[this._form._callback_focused](this);
		}
	}
	this._button_blur = function(event) {
		u.rc(this, "focus");
		if(fun(this[this._form._callback_blurred])) {
			this[this._form._callback_blurred](this);
		}
		if(fun(this._form[this._form._callback_blurred])) {
			this._form[this._form._callback_blurred](this);
		}
	}
	this._validate = function(event) {
		u.f.validate(this);
	}
	this.inputOnEnter = function(node) {
		node.keyPressed = function(event) {
			if(this.nodeName.match(/input/i) && (event.keyCode == 40 || event.keyCode == 38)) {
				this._submit_disabled = true;
			}
			else if(this.nodeName.match(/input/i) && this._submit_disabled && (
				event.keyCode == 46 || 
				(event.keyCode == 39 && u.browser("firefox")) || 
				(event.keyCode == 37 && u.browser("firefox")) || 
				event.keyCode == 27 || 
				event.keyCode == 13 || 
				event.keyCode == 9 ||
				event.keyCode == 8
			)) {
				this._submit_disabled = false;
			}
			else if(event.keyCode == 13 && !this._submit_disabled) {
				u.e.kill(event);
				this.blur();
				this._form.submitInput = this;
				this._form.submitButton = false;
				this._form.submit(event, this);
			}
		}
		u.e.addEvent(node, "keydown", node.keyPressed);
	}
	this.buttonOnEnter = function(node) {
		node.keyPressed = function(event) {
			if(event.keyCode == 13 && !u.hc(this, "disabled") && fun(this.clicked)) {
				u.e.kill(event);
				this.clicked(event);
			}
		}
		u.e.addEvent(node, "keydown", node.keyPressed);
	}
	this.activateInput = function(iN) {
		u.e.addEvent(iN, "focus", this._focus);
		u.e.addEvent(iN, "blur", this._blur);
		if(u.e.event_support != "touch") {
			u.e.addEvent(iN, "mouseenter", this._mouseenter);
			u.e.addEvent(iN, "mouseleave", this._mouseleave);
		}
		u.e.addEvent(iN, "blur", this._validate);
		if(iN._form._label_style && fun(this.customLabelStyle[iN._form._label_style])) {
			this.customLabelStyle[iN._form._label_style](iN);
		}
		else {
			iN.default_value = "";
		}
	}
	this.activateButton = function(action) {
		if(action.type && action.type == "submit" || action.type == "reset") {
			action.onclick = function(event) {
				u.e.kill(event);
			}
		}
		u.ce(action);
		if(!action.clicked) {
			action.clicked = function(event) {
				if(!u.hc(this, "disabled")) {
					if(this.type && this.type.match(/submit/i)) {
						this._form._submit_button = this;
						this._form._submit_input = false;
						this._form.submit(event, this);
					}
					else if(this.type && this.type.match(/reset/i)) {
						this._form._submit_button = false;
						this._form._submit_input = false;
						this._form.reset(event, this);
					}
					else if(this.url) {
						if(event && (event.metaKey || event.ctrlKey)) {
							window.open(this.url);
						}
						else {
							if(obj(u.h) && u.h.is_listening) {
								u.h.navigate(this.url, this);
							}
							else {
								location.href = this.url;
							}
						}
					}
				}
			}
		}
		var action_name = action.name ? action.name : (action.parentNode.className ? u.superNormalize(action.parentNode.className) : (action.value ? u.superNormalize(action.value) : u.superNormalize(u.text(action))));
		if(action_name && !action._form.actions[action_name]) {
			action._form.actions[action_name] = action;
		}
		if(obj(u.k) && u.hc(action, "key:[a-z0-9]+")) {
			u.k.addKey(action, u.cv(action, "key"));
		}
		u.e.addEvent(action, "focus", this._button_focus);
		u.e.addEvent(action, "blur", this._button_blur);
	}
	this.positionHint = function(field) {
		if(field.help) {
			var custom_hint_position;
			for(custom_hint_position in this.customHintPosition) {
				if(u.hc(field, custom_hint_position)) {
					this.customHintPosition[custom_hint_position](field);
					return;
				}
			}
			var input_middle, help_top;
			if(field.virtual_input) {
				input_middle = field.virtual_input.parentNode.offsetTop + (field.virtual_input.parentNode.offsetHeight / 2);
			}
			else {
				input_middle = field.input.offsetTop + (field.input.offsetHeight / 2);
			}
			help_top = input_middle - field.help.offsetHeight / 2;
			u.ass(field.help, {
				"top": help_top + "px"
			});
		}
	}
	this.inputHasError = function(iN) {
		u.rc(iN, "correct");
		u.rc(iN.field, "correct");
		delete iN.is_correct;
		if(iN.val() !== "") {
			if(!iN.has_error && (iN._used || iN._form._bulk_operation)) {
				iN._form._error_inputs[iN.name] = true;
				u.ac(iN, "error");
				u.ac(iN.field, "error");
				iN.has_error = true;
				this.updateInputValidationState(iN);
			 }
		}
		else if(!iN.has_error && iN._used) {
			iN._form._error_inputs[iN.name] = true;
			u.ac(iN, "error");
			u.ac(iN.field, "error");
			iN.has_error = true;
			this.updateInputValidationState(iN);
		}
		else if(!iN._used) {
			delete iN._form._error_inputs[iN.name];
			u.rc(iN, "error");
			u.rc(iN.field, "error");
			delete iN.has_error;
		}
		this.positionHint(iN.field);
	}
	this.inputIsCorrect = function(iN) {
		u.rc(iN, "error");
		u.rc(iN.field, "error");
		delete iN.has_error;
		delete iN._form._error_inputs[iN.name];
		if(iN.val() !== "") {
			if(!iN.is_correct) {
				iN._used = true;
				u.ac(iN, "correct");
				u.ac(iN.field, "correct");
				iN.is_correct = true;
				this.updateInputValidationState(iN);
			}
		}
		else if(iN.is_correct || iN.has_error) {
			u.rc(iN, "correct");
			u.rc(iN.field, "correct");
			delete iN.is_correct;
			this.updateInputValidationState(iN);
		}
		this.positionHint(iN.field);
	}
	this.updateInputValidationState = function(iN) {
		if(iN.has_error && fun(iN[iN._form._callback_validation_failed])) {
			iN[iN._form._callback_validation_failed]();
		}
		else if(iN.is_correct && fun(iN[iN._form._callback_validation_passed])) {
			iN[iN._form._callback_validation_passed]();
		}
		this.updateFormValidationState(iN._form);
	}
	this.updateFormValidationState = function(_form) {
		if(!_form._bulk_operation) {
			if(Object.keys(_form._error_inputs).length) {
				_form._validation_state = "error";
				if(_form._error_inputs !== _form._reference_error_inputs) {
					if(fun(_form[_form._callback_validation_failed])) {
						_form[_form._callback_validation_failed](_form._error_inputs);
					}
				}
			}
			else if(u.qsa(".field.required", _form).length === u.qsa(".field.required.correct", _form).length) {
				if(fun(_form[_form._callback_validation_passed]) && _form._validation_state !== "correct") {
					_form[_form._callback_validation_passed]();
				}
				_form._validation_state = "correct";
			}
			else {
				_form._validation_state = "void";
			}
			_form._reference_error_inputs = JSON.parse(JSON.stringify(_form._error_inputs));
		}
	}
	this.bulkValidate = function(inputs) {
		if(inputs && inputs.length) {
			var _form = inputs[0]._form;
			_form._bulk_operation = true;
			var i;
			for(i = 0; i < inputs.length; i++) {
				u.f.validate(inputs[i]);
			}
			_form._bulk_operation = false;
			this.updateFormValidationState(_form);
		}
	}
	this.validate = function(iN) {
		if(!iN._form._validation || !iN.field) {
			return true;
		}
		var min, max, pattern;
		var validated = false;
		var compare_to = iN.getAttribute("data-compare-to");
		if(!u.hc(iN.field, "required") && iN.val() === "" && (!compare_to || iN._form.inputs[compare_to].val() === "")) {
			this.inputIsCorrect(iN);
			return true;
		}
		else if(u.hc(iN.field, "required") && iN.val() === "") {
			this.inputHasError(iN);
			return false;
		}
		var custom_validate;
		for(custom_validate in u.f.customValidate) {
			if(u.hc(iN.field, custom_validate)) {
				u.f.customValidate[custom_validate](iN);
				validated = true;
			}
		}
		if(!validated) {
			if(u.hc(iN.field, "password")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 8;
				max = max ? max : 255;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min && 
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$")) &&
					(!compare_to || iN.val() == iN._form.inputs[compare_to].val())
				) {
					this.inputIsCorrect(iN);
					if(compare_to) {
						this.inputIsCorrect(iN._form.inputs[compare_to]);
					}
				}
				else {
					this.inputHasError(iN);
					if(compare_to) {
						this.inputHasError(iN._form.inputs[compare_to]);
					}
				}
			}
			else if(u.hc(iN.field, "number")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 0;
				max = max ? max : 99999999999999999999999999999;
				pattern = iN.getAttribute("pattern");
				if(
					!isNaN(iN.val()) && 
					iN.val() >= min && 
					iN.val() <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "integer")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 0;
				max = max ? max : 99999999999999999999999999999;
				pattern = iN.getAttribute("pattern");
				if(
					!isNaN(iN.val()) && 
					Math.round(iN.val()) == iN.val() && 
					iN.val() >= min && 
					iN.val() <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "tel")) {
				pattern = iN.getAttribute("pattern");
				if(
					(
						(!pattern && iN.val().match(/^([\+0-9\-\.\s\(\)]){5,18}$/))
						||
						(pattern && iN.val().match("^"+pattern+"$"))
					)
					&&
					(!compare_to || iN.val() == iN._form.inputs[compare_to].val())
				) {
					this.inputIsCorrect(iN);
					if(compare_to) {
						this.inputIsCorrect(iN._form.inputs[compare_to]);
					}
				}
				else {
					this.inputHasError(iN);
					if(compare_to) {
						this.inputHasError(iN._form.inputs[compare_to]);
					}
				}
			}
			else if(u.hc(iN.field, "email")) {
				pattern = iN.getAttribute("pattern");
				if(
					(
						(!pattern && iN.val().match(/^([^<>\\\/%$])+\@([^<>\\\/%$])+\.([^<>\\\/%$]{2,20})$/))
						||
						(pattern && iN.val().match("^"+pattern+"$"))
					)
					&&
					(!compare_to || iN.val() == iN._form.inputs[compare_to].val())
				) {
					this.inputIsCorrect(iN);
					if(compare_to) {
						this.inputIsCorrect(iN._form.inputs[compare_to]);
					}
				}
				else {
					this.inputHasError(iN);
					if(compare_to) {
						this.inputHasError(iN._form.inputs[compare_to]);
					}
				}
			}
			else if(u.hc(iN.field, "text")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 10000000;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min && 
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "json")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 2;
				max = max ? max : 10000000;
				if(
					iN.val().length >= min && 
					iN.val().length <= max && 
					(function(value) {
						try {
							JSON.parse(value);
							return true;
						}
						catch(exception) {
							return false;
						}
					}(iN.val()))
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "date")) {
				min = u.cv(iN.field, "min");
				max = u.cv(iN.field, "max");
				pattern = iN.getAttribute("pattern");
				if(
					(!min || new Date(decodeURIComponent(min)) <= new Date(iN.val())) &&
					(!max || new Date(decodeURIComponent(max)) >= new Date(iN.val())) &&
					(
						(!pattern && iN.val().match(/^([\d]{4}[\-\/\ ]{1}[\d]{2}[\-\/\ ][\d]{2})$/))
						||
						(pattern && iN.val().match("^"+pattern+"$"))
					)
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "datetime")) {
				min = u.cv(iN.field, "min");
				max = u.cv(iN.field, "max");
				pattern = iN.getAttribute("pattern");
				if(
					(!min || new Date(decodeURIComponent(min)) <= new Date(iN.val())) &&
					(!max || new Date(decodeURIComponent(max)) >= new Date(iN.val())) &&
					(
						(!pattern && iN.val().match(/^([\d]{4}[\-\/\ ]{1}[\d]{2}[\-\/\ ][\d]{2} [\d]{2}[\-\/\ \:]{1}[\d]{2}[\-\/\ \:]{0,1}[\d]{0,2})$/))
						||
						(pattern && iN.val().match(pattern))
					)
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "files")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 10000000;
				pattern = iN.getAttribute("accept");
				if(pattern) {
					pattern = pattern.split(",");
				}
				var i, files = Array.prototype.slice.call(u.qsa("li:not(.label)", iN.field.filelist));
				var min_width = Number(iN.getAttribute("data-min-width"));
				var min_height = Number(iN.getAttribute("data-min-height"));
				var allowed_sizes = iN.getAttribute("data-allowed-sizes");
				if(allowed_sizes) {
					allowed_sizes = allowed_sizes.split(",");
				}
				var allowed_proportions = iN.getAttribute("data-allowed-proportions");
				if(allowed_proportions) {
					allowed_proportions = allowed_proportions.split(",");
					for(i = 0; i < allowed_proportions.length; i++) {
						allowed_proportions[i] = u.round(eval(allowed_proportions[i]), 4);
					}
				}
				if(
					(files.length >= min && files.length <= max)
					&&
					(!pattern || files.every(function(node) {return pattern.indexOf("."+u.cv(node, "format")) !== -1}))
					&&
					(!min_width || files.every(function(node) {return u.cv(node, "width") >= min_width}))
					&&
					(!min_height || files.every(function(node) {return u.cv(node, "height") >= min_height}))
					&&
					(!allowed_sizes || files.every(function(node) {return allowed_sizes.indexOf(u.cv(node, "width")+"x"+u.cv(node, "height")) !== -1}))
					&&
					(!allowed_proportions || files.every(function(node) {return allowed_proportions.indexOf(u.round(Number(u.cv(node, "width"))/Number(u.cv(node, "height")), 4)) !== -1}))
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "select")) {
				if(iN.val() !== "") {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "checkbox|boolean|radiobuttons")) {
				if(iN.val() !== "") {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "string")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 255;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min &&
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
					&&
					(!compare_to || iN.val() == iN._form.inputs[compare_to].val())
				) {
					this.inputIsCorrect(iN);
					if(compare_to) {
						this.inputIsCorrect(iN._form.inputs[compare_to]);
					}
				}
				else {
					this.inputHasError(iN);
					if(compare_to) {
						this.inputHasError(iN._form.inputs[compare_to]);
					}
				}
			}
		}
		if(u.hc(iN.field, "error")) {
			return false;
		}
		else {
			return true;
		}
	}
	this.getFormData = this.getParams = function(_form, _options) {
		var format = "formdata";
		var ignore_inputs = "ignoreinput";
		if(obj(_options)) {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "ignore_inputs"    : ignore_inputs     = _options[_argument]; break;
					case "format"           : format            = _options[_argument]; break;
				}
			}
		}
		var i, input, select, textarea, param, params;
		if(format == "formdata") {
			params = new FormData();
		}
		else {
			params = new Object();
			params.append = function(name, value, filename) {
				this[name] = filename || value;
			}
		}
		if(_form._submit_button && _form._submit_button.name) {
			params.append(_form._submit_button.name, _form._submit_button.value);
		}
		var inputs = u.qsa("input", _form);
		var selects = u.qsa("select", _form)
		var textareas = u.qsa("textarea", _form)
		for(i = 0; i < inputs.length; i++) {
			input = inputs[i];
			if(!u.hc(input, ignore_inputs)) {
				if((input.type == "checkbox" || input.type == "radio") && input.checked) {
					if(fun(input.val)) {
						params.append(input.name, input.val());
					}
					else {
						params.append(input.name, input.value);
					}
				}
				else if(input.type == "file") {
					var f, file, files;
					if(fun(input.val)) {
						files = input.val();
					}
					else if(input.files) {
						files = input.files;
					}
					if(files && files.length) {
						for(f = 0; f < files.length; f++) {
							file = files[f];
							params.append(input.name, file, file.name);
						}
					}
					else {
						params.append(input.name, (input.value || ""));
					}
				}
				else if(!input.type.match(/button|submit|reset|file|checkbox|radio/i)) {
					if(fun(input.val)) {
						params.append(input.name, input.val());
					}
					else {
						params.append(input.name, input.value);
					}
				}
			}
		}
		for(i = 0; i < selects.length; i++) {
			select = selects[i];
			if(!u.hc(select, ignore_inputs)) {
				if(fun(select.val)) {
					params.append(select.name, select.val());
				}
				else {
					params.append(select.name, select.options[select.selectedIndex] ? select.options[select.selectedIndex].value : "");
				}
			}
		}
		for(i = 0; i < textareas.length; i++) {
			textarea = textareas[i];
			if(!u.hc(textarea, ignore_inputs)) {
				if(fun(textarea.val)) {
					params.append(textarea.name, textarea.val());
				}
				else {
					params.append(textarea.name, textarea.value);
				}
			}
		}
		if(format && fun(this.customDataFormat[format])) {
			return this.customDataFormat[format](params, _form);
		}
		else if(format == "formdata") {
			return params;
		}
		else if(format == "object") {
			delete params.append;
			return params;
		}
		else {
			var string = "";
			for(param in params) {
				if(!fun(params[param])) {
					string += (string ? "&" : "") + param + "=" + encodeURIComponent(params[param]);
				}
			}
			return string;
		}
	}
}
Util.Form.customLabelStyle["inject"] = function(iN) {
	if(!iN.type || !iN.type.match(/file|radio|checkbox/)) {
		iN.default_value = u.text(iN.label);
		u.e.addEvent(iN, "focus", u.f._changed_state);
		u.e.addEvent(iN, "blur", u.f._changed_state);
		u.e.addEvent(iN, "change", u.f._changed_state);
		if(iN.type.match(/number|integer|password|datetime|date/)) {
			iN.pseudolabel = u.ae(iN.parentNode, "span", {"class":"pseudolabel", "html":iN.default_value});
			iN.pseudolabel.iN = iN;
			u.as(iN.pseudolabel, "top", iN.offsetTop+"px");
			u.as(iN.pseudolabel, "left", iN.offsetLeft+"px");
			u.ce(iN.pseudolabel)
			iN.pseudolabel.inputStarted = function(event) {
				u.e.kill(event);
				this.iN.focus();
			}
		}
		u.f.updateDefaultState(iN);
	}
}
u.f._changed_state = function() {
	u.f.updateDefaultState(this);
}
u.f.updateDefaultState = function(iN) {
	if(iN.is_focused || iN.val() !== "") {
		u.rc(iN, "default");
		if(iN.field.virtual_input) {
			u.rc(iN.field.virtual_input, "default");
		}
		if(iN.val() === "") {
			iN.val("");
		}
	}
	else {
		if(iN.val() === "") {
			u.ac(iN, "default");
			if(obj(iN.field.virtual_input)) {
				u.ac(iN.field.virtual_input, "default");
			}
			iN.val(iN.default_value);
		}
	}
}
u.includeGoogleTagManager = function() {
	if(typeof(gtag) !== "function") {
		window.dataLayer = window.dataLayer || [];
		dataLayer.push({'gtm.start': new Date().getTime()});
		dataLayer.push({'event': 'gtm.js'});
		u.ae(document.head, "script", {src: "https://www.googletagmanager.com/gtm.js?id="+u.gtm_account, async: true})
		u.stats = new function() {
			this.pageView = function(url) {
				window.dataLayer.push({
					'event': 'pageview'
				});
			}
			this.event = function(node, _options) {
				var event = false;
				var eventCategory = "Uncategorized";
				var eventAction = null;
				var eventLabel = null;
				var eventValue = null;
				var nonInteraction = false;
				var hitCallback = null;
				if(obj(_options)) {
					var _argument;
					for(_argument in _options) {
						switch(_argument) {
							case "event"				: event					= _options[_argument]; break;
							case "eventCategory"		: eventCategory			= _options[_argument]; break;
							case "eventAction"			: eventAction			= _options[_argument]; break;
							case "eventLabel"			: eventLabel			= _options[_argument]; break;
							case "eventValue"			: eventValue			= _options[_argument]; break;
							case "nonInteraction"		: nonInteraction		= _options[_argument]; break;
							case "hitCallback"			: hitCallback			= _options[_argument]; break;
						}
					}
				}
				if(!eventAction && event && event.type) {
					eventAction = event.type;
				}
				else if(!eventAction && event) {
					eventAction = event;
				}
				else if(!eventAction) {
					eventAction = "Unknown";
				}
				if(!eventLabel) {
					eventLabel = this.nodeSnippet(node);
				}
				if(!event) {
					event = eventLabel + " " + eventAction;
				}
				window.dataLayer.push({
					"event": event,
					"eventCategory": eventCategory, 
					"eventAction": eventAction,
					"eventLabel": eventLabel,
					"eventValue": eventValue,
					"nonInteraction": nonInteraction,
					"hitCallback": hitCallback
				});
			}
			this.nodeSnippet = function(node) {
				if(node.id) {
					return node.id;
				}
				else if(node._a && node._a.id) {
					return node._a.id;
				}
				else if(u.text(node)) {
					return u.cutString(u.text(node).trim(), 20);
				}
				else if(event && event.currentTarget && event.currentTarget.url) {
					return event.currentTarget.url;
				}
				else {
					return node.nodeName + (node.className ? "."+node.className : "");
				}
			}
		}
	}
}
if(u.gtm_account && !u.cookies_disallowed) {
	u.includeGoogleTagManager();
}
Util.absoluteX = u.absX = function(node) {
	if(node.offsetParent) {
		return node.offsetLeft + u.absX(node.offsetParent);
	}
	return node.offsetLeft;
}
Util.absoluteY = u.absY = function(node) {
	if(node.offsetParent) {
		return node.offsetTop + u.absY(node.offsetParent);
	}
	return node.offsetTop;
}
Util.relativeX = u.relX = function(node) {
	if(u.gcs(node, "position").match(/absolute/) == null && node.offsetParent && u.gcs(node.offsetParent, "position").match(/relative|absolute|fixed/) == null) {
		return node.offsetLeft + u.relX(node.offsetParent);
	}
	return node.offsetLeft;
}
Util.relativeY = u.relY = function(node) {
	if(u.gcs(node, "position").match(/absolute/) == null && node.offsetParent && u.gcs(node.offsetParent, "position").match(/relative|absolute|fixed/) == null) {
		return node.offsetTop + u.relY(node.offsetParent);
	}
	return node.offsetTop;
}
Util.actualWidth = u.actualW = function(node) {
	return parseInt(u.gcs(node, "width"));
}
Util.actualHeight = u.actualH = function(node) {
	return parseInt(u.gcs(node, "height"));
}
Util.eventX = function(event){
	return (event.targetTouches && event.targetTouches.length ? event.targetTouches[0].pageX : event.pageX);
}
Util.eventY = function(event){
	return (event.targetTouches && event.targetTouches.length ? event.targetTouches[0].pageY : event.pageY);
}
Util.browserWidth = u.browserW = function() {
	return document.documentElement.clientWidth;
}
Util.browserHeight = u.browserH = function() {
	return document.documentElement.clientHeight;
}
Util.htmlWidth = u.htmlW = function() {
	return document.body.offsetWidth + parseInt(u.gcs(document.body, "margin-left")) + parseInt(u.gcs(document.body, "margin-right"));
}
Util.htmlHeight = u.htmlH = function() {
	return document.body.offsetHeight + parseInt(u.gcs(document.body, "margin-top")) + parseInt(u.gcs(document.body, "margin-bottom"));
}
Util.pageScrollX = u.scrollX = function() {
	return window.pageXOffset;
}
Util.pageScrollY = u.scrollY = function() {
	return window.pageYOffset;
}
u.googlemaps = new function() {
	this.api_loading = false;
	this.api_loaded = false;
	this.api_load_queue = [];
	this.map = function(map, center, _options) {
		map._center_latitude = center[0];
		map._center_longitude = center[1];
		map._zoom = 10;
		map._streetview = false;
		map._scrollwheel = true;
		map._styles = false;
		map._disable_ui = false;
		map._fullscreenControl = false;
		map._zoomControl = true;
		map._zoomControlOptions = false;
		map._keyboardShortcuts = false;
		if(obj(_options)) {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "zoom"                  : map._zoom                    = _options[_argument]; break;
					case "scrollwheel"           : map._scrollwheel             = _options[_argument]; break;
					case "streetview"            : map._streetview              = _options[_argument]; break;
					case "styles"                : map._styles                  = _options[_argument]; break;
					case "disableUI"             : map._disable_ui              = _options[_argument]; break;
					case "fullscreenControl"     : map._fullscreenControl       = _options[_argument]; break;
					case "zoomControl"           : map._zoomControl             = _options[_argument]; break;
					case "zoomControlOptions"    : map._zoomControlOptions      = _options[_argument]; break;
					case "keyboardShortcuts"     : map._keyboardShortcuts       = _options[_argument]; break;
				}
			}
		}
		var map_key = u.randomString(8);
		window[map_key] = function() {
			u.googlemaps.api_loaded = true;
			u.googlemaps.api_loading = false;
			var map;
			while(u.googlemaps.api_load_queue.length) {
				map = u.googlemaps.api_load_queue.shift();
				map.init();
			}
		}
		map.init = function() {
			var mapOptions = {
				center: new google.maps.LatLng(this._center_latitude, this._center_longitude), 
				zoom: this._zoom, 
				scrollwheel: this._scrollwheel, 
				streetViewControl: this._streetview, 
				zoomControl: this._zoomControl, 
				zoomControlOptions: this._zoomControlOptions ? this._zoomControlOptions : {position: google.maps.ControlPosition.LEFT_TOP}, 
				styles: this._styles, 
				disableDefaultUI: this._disable_ui,
				fullscreenControl: this._fullscreenControl,
				keyboardShortcuts: this._keyboardShortcuts,
			};
			this.g_map = new google.maps.Map(this, mapOptions);
			this.g_map.m_map = this
			if(fun(this.APIloaded)) {
				this.APIloaded();
			}
			google.maps.event.addListener(this.g_map, 'tilesloaded', function() {
				if(fun(this.m_map.tilesloaded)) {
					this.m_map.tilesloaded();
				}
			});
			google.maps.event.addListenerOnce(this.g_map, 'tilesloaded', function() {
				if(fun(this.m_map.loaded)) {
					this.m_map.loaded();
				}
			});
		}
		if(!this.api_loaded && !this.api_loading) {
			u.ae(document.head, "script", {"src":"https://maps.googleapis.com/maps/api/js?callback="+map_key+(u.gapi_key ? "&key="+u.gapi_key : "")});
			this.api_loading = true;
			this.api_load_queue.push(map);
		}
		else if(this.api_loading) {
			this.api_load_queue.push(map);
		}
		else {
			map.init();
		}
	}
	this.addMarker = function(map, coords, _options) {
		var _icon;
		var _label = null;
		if(obj(_options)) {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "icon"           : _icon               = _options[_argument]; break;
					case "label"          : _label              = _options[_argument]; break;
				}
			}
		}
		var marker = new google.maps.Marker({position: new google.maps.LatLng(coords[0], coords[1]), animation:google.maps.Animation.DROP, icon: _icon, label: _label});
		marker.setMap(map.g_map);
		marker.g_map = map.g_map;
		google.maps.event.addListener(marker, 'click', function() {
			if(fun(this.clicked)) {
				this.clicked();
			}
		});
		google.maps.event.addListener(marker, 'mouseover', function() {
			if(fun(this.entered)) {
				this.entered();
			}
		});
		google.maps.event.addListener(marker, 'mouseout', function() {
			if(fun(this.exited)) {
				this.exited();
			}
		});
		return marker;
	}
	this.removeMarker = function(map, marker, _options) {
		marker._animation = true;
		if(obj(_options)) {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "animation"      : marker._animation            = _options[_argument]; break;
				}
			}
		}
		if(marker._animation) {
			var key = u.randomString(8);
			marker.pick_step = 0;
			marker.c_zoom = (1 << map.getZoom());
			marker.c_projection = map.getProjection();
			marker.c_exit = map.getBounds().getNorthEast().lat();
			marker._pickUp = function() {
				var new_position = this.c_projection.fromLatLngToPoint(this.getPosition());
				new_position.y -= (20*this.pick_step) / this.c_zoom; 
				new_position = this.c_projection.fromPointToLatLng(new_position);
				this.setPosition(new_position);
				if(this.c_exit < new_position.lat()) {
					this.setMap(null);
					if(fun(this.removed)) {
						this.removed();
					}
				}
				else{
					this.pick_step++;
					u.t.setTimer(this, this._pickUp, 20);
				}
			}
			marker._pickUp();
		}
		else {
			marker.setMap(null);
		}
	}
	this.infoWindow = function(map) {
		map.g_infowindow = new google.maps.InfoWindow({"maxWidth":250});
		google.maps.event.addListener(map.g_infowindow, 'closeclick', function() {
			if(this._marker && fun(this._marker.closed)) {
				this._marker.closed();
				this._marker = false;
			}
		});
	}
	this.showInfoWindow = function(map, marker, content) {
		map.g_infowindow.setContent(content);
		map.g_infowindow.open(map, marker);
		map.g_infowindow._marker = marker;
	}
	this.hideInfoWindow = function(map) {
		map.g_infowindow.close();
		if(map.g_infowindow._marker && fun(map.g_infowindow._marker.closed)) {
			map.g_infowindow._marker.closed();
			map.g_infowindow._marker = false;
		}
		map.g_infowindow._marker = false;
	}
	this.zoom = function() {
	}
	this.center = function() {
	}
}
Util.History = u.h = new function() {
	this.popstate = ("onpopstate" in window);
	this.callbacks = [];
	this.is_listening = false;
	this.navigate = function(url, node, silent) {
		silent = silent || false;
		if((!url.match(/^http[s]?\:\/\//) || url.match(document.domain)) && (!node || !node._a || !node._a.target)) {
			if(this.popstate) {
				history.pushState({}, url, url);
				if(!silent) {
					this.callback(url);
				}
			}
			else {
				if(silent) {
					this.next_hash_is_silent = true;
				}
				location.hash = u.h.getCleanUrl(url);
			}
		}
		else {
			if(!node || !node._a || !node._a.target) {
				location.href = url;
			}
			else {
				window.open(this.url);
			}
		}
	}
	this.callback = function(url) {
		var i, recipient;
		for(i = 0; i < this.callbacks.length; i++) {
			recipient = this.callbacks[i];
			if(fun(recipient.node[recipient.callback])) {
				recipient.node[recipient.callback](url);
			}
		}
	}
	this.removeEvent = function(node, _options) {
		var callback_urlchange = "navigate";
		if(obj(_options)) {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "callback"		: callback_urlchange		= _options[argument]; break;
				}
			}
		}
		var i, recipient;
		for(i = 0; recipient = this.callbacks[i]; i++) {
			if(recipient.node == node && recipient.callback == callback_urlchange) {
				this.callbacks.splice(i, 1);
				break;
			}
		}
	}
	this.addEvent = function(node, _options) {
		var callback_urlchange = "navigate";
		if(obj(_options)) {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "callback"		: callback_urlchange		= _options[argument]; break;
				}
			}
		}
		if(!this.is_listening) {
			this.is_listening = true;
			if(this.popstate) {
				u.e.addEvent(window, "popstate", this._urlChanged);
			}
			else if("onhashchange" in window && !u.browser("explorer", "<=7")) {
				u.e.addEvent(window, "hashchange", this._hashChanged);
			}
			else {
				u.h._current_hash = window.location.hash;
				window.onhashchange = this._hashChanged;
				setInterval(
					function() {
						if(window.location.hash !== u.h._current_hash) {
							u.h._current_hash = window.location.hash;
							window.onhashchange();
						}
					}, 200
				);
			}
		}
		this.callbacks.push({"node":node, "callback":callback_urlchange});
	}
	this._urlChanged = function(event) {
		var url = u.h.getCleanUrl(location.href);
		if(event.state || (!event.state && event.path)) {
			u.h.callback(url);
		}
		else {
			history.replaceState({}, url, url);
		}
	}
	this._hashChanged = function(event) {
		if(!location.hash || !location.hash.match(/^#\//)) {
			location.hash = "#/"
			return;
		}
		var url = u.h.getCleanHash(location.hash);
		if(u.h.next_hash_is_silent) {
			delete u.h.next_hash_is_silent;
		}
		else {
			u.h.callback(url);
		}
	}
	this.trail = [];
	this.addToTrail = function(url, node) {
		this.trail.push({"url":url, "node":node});
	}
	this.getCleanUrl = function(string, levels) {
		string = string.replace(location.protocol+"//"+document.domain, "") ? string.replace(location.protocol+"//"+document.domain, "").match(/[^#$]+/)[0] : "/";
		if(!levels) {
			return string;
		}
		else {
			var i, return_string = "";
			var path = string.split("/");
			levels = levels > path.length-1 ? path.length-1 : levels;
			for(i = 1; i <= levels; i++) {
				return_string += "/" + path[i];
			}
			return return_string;
		}
	}
	this.getCleanHash = function(string, levels) {
		string = string.replace("#", "");
		if(!levels) {
			return string;
		}
		else {
			var i, return_string = "";
			var hash = string.split("/");
			levels = levels > hash.length-1 ? hash.length-1 : levels;
			for(i = 1; i <= levels; i++) {
				return_string += "/" + hash[i];
			}
			return return_string;
		}
	}
	this.resolveCurrentUrl = function() {
		return !location.hash ? this.getCleanUrl(location.href) : this.getCleanHash(location.hash);
	}
}
Util.Modules = u.m = new Object();
Util.init = function(scope) {
	var i, node, nodes, module;
	scope = scope && scope.nodeName ? scope : document;
	nodes = u.ges("i\:([_a-zA-Z0-9])+", scope);
	for(i = 0; i < nodes.length; i++) {
		node = nodes[i];
		while((module = u.cv(node, "i"))) {
			u.rc(node, "i:"+module);
			if(module && obj(u.m[module])) {
				u.m[module].init(node);
			}
		}
	}
}
Util.random = function(min, max) {
	return Math.round((Math.random() * (max - min)) + min);
}
Util.numToHex = function(num) {
	return num.toString(16);
}
Util.hexToNum = function(hex) {
	return parseInt(hex,16);
}
Util.round = function(number, decimals) {
	var round_number = number*Math.pow(10, decimals);
	return Math.round(round_number)/Math.pow(10, decimals);
}
Util.audioPlayer = function(_options) {
	_options = _options || {};
	_options.type = "audio";
	return u.mediaPlayer(_options);
}
Util.videoPlayer = function(_options) {
	_options = _options || {};
	_options.type = "video";
	return u.mediaPlayer(_options);
}
Util.mediaPlayer = function(_options) {
	var player = document.createElement("div");
	player.type = _options && _options.type || "video";
	u.ac(player, player.type+"player");
	player._autoplay = false;
	player._muted = false;
	player._loop = false;
	player._preload = false;
	player._playsinline = false;
	player._crossorigin = "anonymous";
	player._controls = false;
	player._controls_playpause = false;
	player._controls_play = false;
	player._controls_pause = false;
	player._controls_stop = false;
	player._controls_zoom = false;
	player._controls_volume = false;
	player._controls_search = false;
	player._ff_skip = 2;
	player._rw_skip = 2;
	player.media = u.ae(player, player.type);
	if(player.media && fun(player.media.play)) {
		player.load = function(src, _options) {
			if(u.hc(this, "playing")) {
				this.stop();
			}
			u.setupMedia(this, _options);
			if(src) {
				this.media.src = u.correctMediaSource(this, src);
				this.media.load();
			}
		}
		player.play = function(position) {
			if(this.media.currentTime && position !== undefined) {
				this.media.currentTime = position;
			}
			if(this.media.src) {
				return this.media.play();
			}
		}
		player.loadAndPlay = function(src, _options) {
			var position = 0;
			if(obj(_options)) {
				var _argument;
				for(_argument in _options) {
					switch(_argument) {
						case "position"		: position		= _options[_argument]; break;
					}
				}
			}
			this.load(src, _options);
			return this.play(position);
		}
		player.pause = function() {
			this.media.pause();
		}
		player.stop = function() {
			this.media.pause();
			if(this.media.currentTime) {
				this.media.currentTime = 0;
			}
		}
		player.ff = function() {
			if(this.media.src && this.media.currentTime && this.mediaLoaded) {
				this.media.currentTime = (this.media.duration - this.media.currentTime >= this._ff_skip) ? (this.media.currentTime + this._ff_skip) : this.media.duration;
				this.media._timeupdate();
			}
		}
		player.rw = function() {
			if(this.media.src && this.media.currentTime && this.mediaLoaded) {
				this.media.currentTime = (this.media.currentTime >= this._rw_skip) ? (this.media.currentTime - this._rw_skip) : 0;
				this.media._timeupdate();
			}
		}
		player.togglePlay = function() {
			if(u.hc(this, "playing")) {
				this.pause();
			}
			else {
				this.play();
			}
		}
		player.volume = function(value) {
			this.media.volume = value;
			if(value === 0) {
				u.ac(this, "muted");
			}
			else {
				u.rc(this, "muted");
			}
		}
		player.toggleSound = function() {
			if(this.media.volume) {
				this.media.volume = 0;
				u.ac(this, "muted");
			}
			else {
				this.media.volume = 1;
				u.rc(this, "muted");
			}
		}
		player.mute = function() {
			this._muted = true;
			this.media.muted = true;
		}
		player.unmute = function() {
			this._muted = false;
			this.media.muted = false;
		}
	}
	else {
		player.load = function() {}
		player.play = function() {}
		player.loadAndPlay = function() {}
		player.pause = function() {}
		player.stop = function() {}
		player.ff = function() {}
		player.rw = function() {}
		player.togglePlay = function() {}
	}
	u.setupMedia(player, _options);
	u.detectMediaAutoplay(player);
	return player;
}
u.setupMedia = function(player, _options) {
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "autoplay"     : player._autoplay               = _options[_argument]; break;
				case "muted"        : player._muted                  = _options[_argument]; break;
				case "loop"         : player._loop                   = _options[_argument]; break;
				case "preload"      : player._preload                = _options[_argument]; break;
				case "playsinline"  : player._playsinline            = _options[_argument]; break;
				case "controls"     : player._controls               = _options[_argument]; break;
				case "ff_skip"      : player._ff_skip                = _options[_argument]; break;
				case "rw_skip"      : player._rw_skip                = _options[_argument]; break;
			}
		}
	}
	player.media.autoplay = player._autoplay;
	player.media.loop = player._loop;
	player.media.muted = player._muted;
	player.media.playsinline = player._playsinline;
	player.media.setAttribute("playsinline", player._playsinline);
	player.media.setAttribute("preload", player._preload);
	player.media.setAttribute("crossorigin", player._crossorigin);
	u.setupMediaControls(player, player._controls);
	player.currentTime = 0;
	player.duration = 0;
	player.mediaLoaded = false;
	player.metaLoaded = false;
	if(!player.media.player) {
		player.media.player = player;
		player.media._loadstart = function(event) {
			u.ac(this.player, "loading");
			if(fun(this.player.loading)) {
				this.player.loading(event);
			}
		}
		u.e.addEvent(player.media, "loadstart", player.media._loadstart);
		player.media._canplaythrough = function(event) {
			u.rc(this.player, "loading");
			if(fun(this.player.canplaythrough)) {
				this.player.canplaythrough(event);
			}
		}
		u.e.addEvent(player.media, "canplaythrough", player.media._canplaythrough);
		player.media._playing = function(event) {
			u.rc(this.player, "loading|paused");
			u.ac(this.player, "playing");
			if(fun(this.player.playing)) {
				this.player.playing(event);
			}
		}
		u.e.addEvent(player.media, "playing", player.media._playing);
		player.media._paused = function(event) {
			u.rc(this.player, "playing|loading");
			u.ac(this.player, "paused");
			if(fun(this.player.paused)) {
				this.player.paused(event);
			}
		}
		u.e.addEvent(player.media, "pause", player.media._paused);
		player.media._stalled = function(event) {
			u.rc(this.player, "playing|paused");
			u.ac(this.player, "loading");
			if(fun(this.player.stalled)) {
				this.player.stalled(event);
			}
		}
		u.e.addEvent(player.media, "stalled", player.media._paused);
		player.media._error = function(event) {
			if(fun(this.player.error)) {
				this.player.error(event);
			}
		}
		u.e.addEvent(player.media, "error", player.media._error);
		player.media._ended = function(event) {
			u.rc(this.player, "playing|paused");
			if(fun(this.player.ended)) {
				this.player.ended(event);
			}
		}
		u.e.addEvent(player.media, "ended", player.media._ended);
		player.media._loadedmetadata = function(event) {
			this.player.duration = this.duration;
			this.player.currentTime = this.currentTime;
			this.player.metaLoaded = true;
			if(fun(this.player.loadedmetadata)) {
				this.player.loadedmetadata(event);
			}
		}
		u.e.addEvent(player.media, "loadedmetadata", player.media._loadedmetadata);
		player.media._loadeddata = function(event) {
			this.player.mediaLoaded = true;
			if(fun(this.player.loadeddata)) {
				this.player.loadeddata(event);
			}
		}
		u.e.addEvent(player.media, "loadeddata", player.media._loadeddata);
		player.media._timeupdate = function(event) {
			this.player.currentTime = this.currentTime;
			if(fun(this.player.timeupdate)) {
				this.player.timeupdate(event);
			}
		}
		u.e.addEvent(player.media, "timeupdate", player.media._timeupdate);
	}
}
u.correctMediaSource = function(player, src) {
	var param = src.match(/(\?|\#)[^$]+/) ? src.match(/((\?|\#)[^$]+)/)[1] : "";
	src = src.replace(/(\?|\#)[^$]+/, "");
	if(player.type == "video") {
		src = src.replace(/(\.m4v|\.mp4|\.webm|\.ogv|\.3gp|\.mov)$/, "");
		if(player.flash) {
			return src+".mp4"+param;
		}
		else if(player.media.canPlayType("video/mp4")) {
			return src+".mp4"+param;
		}
		else if(player.media.canPlayType("video/ogg")) {
			return src+".ogv"+param;
		}
		else if(player.media.canPlayType("video/3gpp")) {
			return src+".3gp"+param;
		}
		else {
			return src+".mov"+param;
		}
	}
	else {
		src = src.replace(/(.mp3|.ogg|.wav)$/, "");
		if(player.flash) {
			return src+".mp3"+param;
		}
		if(player.media.canPlayType("audio/mpeg")) {
			return src+".mp3"+param;
		}
		else if(player.media.canPlayType("audio/ogg")) {
			return src+".ogg"+param;
		}
		else {
			return src+".wav"+param;
		}
	}
}
u.setupMediaControls = function(player, _options) {
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "playpause"    : player._controls_playpause     = _options[_argument]; break;
				case "play"         : player._controls_play          = _options[_argument]; break;
				case "stop"         : player._controls_stop          = _options[_argument]; break;
				case "pause"        : player._controls_pause         = _options[_argument]; break;
				case "volume"       : player._controls_volume        = _options[_argument]; break;
				case "search"       : player._controls_search        = _options[_argument]; break;
			}
		}
	}
	player._custom_controls = obj(_options) && (
		player._controls_playpause ||
		player._controls_play ||
		player._controls_stop ||
		player._controls_pause ||
		player._controls_volume ||
		player._controls_search
	) || false;
	if(player._custom_controls || !_options) {
		player.media.removeAttribute("controls");
	}
	else {
		player.media.controls = player._controls;
	}
	if(!player._custom_controls && player.controls) {
		player.removeChild(player.controls);
		delete player.controls;
	}
	else if(player._custom_controls) {
		if(!player.controls) {
			player.controls = u.ae(player, "div", {"class":"controls"});
			player.controls.player = player;
			player.controls.out = function() {
				u.a.transition(this, "all 0.3s ease-out");
				u.ass(this, {
					"opacity":0
				});
			}
			player.controls.over = function() {
				u.a.transition(this, "all 0.5s ease-out");
				u.ass(this, {
					"opacity":1
				});
			}
			u.e.hover(player.controls);
		}
		if(player._controls_playpause) {
			if(!player.controls.playpause) {
				player.controls.playpause = u.ae(player.controls, "a", {"class":"playpause"});
				player.controls.playpause.player = player;
				u.e.click(player.controls.playpause);
				player.controls.playpause.clicked = function(event) {
					this.player.togglePlay();
				}
			}
		}
		else if(player.controls.playpause) {
			player.controls.playpause.parentNode.removeChild(player.controls.playpause);
			delete player.controls.playpause;
		}
		if(player._controls_play) {
			if(!player.controls.play) {
				player.controls.play = u.ae(player.controls, "a", {"class":"play"});
				player.controls.play.player = player;
				u.e.click(player.controls.play);
				player.controls.play.clicked = function(event) {
					this.player.togglePlay();
				}
			}
		}
		else if(player.controls.play) {
			player.controls.play.parentNode.removeChild(player.controls.play);
			delete player.controls.play;
		}
		if(player._controls_pause) {
			if(!player.controls.pause) {
				player.controls.pause = u.ae(player.controls, "a", {"class":"pause"});
				player.controls.pause.player = player;
				u.e.click(player.controls.pause);
				player.controls.pause.clicked = function(event) {
					this.player.togglePlay();
				}
			}
		}
		else if(player.controls.pause) {
			player.controls.pause.parentNode.removeChild(player.controls.pause);
			delete player.controls.pause;
		}
		if(player._controls_stop) {
			if(!player.controls.stop) {
				player.controls.stop = u.ae(player.controls, "a", {"class":"stop" });
				player.controls.stop.player = player;
				u.e.click(player.controls.stop);
				player.controls.stop.clicked = function(event) {
					this.player.stop();
				}
			}
		}
		else if(player.controls.stop) {
			player.controls.stop.parentNode.removeChild(player.controls.stop);
			delete player.controls.stop;
		}
		if(player._controls_search) {
			if(!player.controls.search) {
				player.controls.search_ff = u.ae(player.controls, "a", {"class":"ff"});
				player.controls.search_ff._default_display = u.gcs(player.controls.search_ff, "display");
				player.controls.search_ff.player = player;
				player.controls.search_rw = u.ae(player.controls, "a", {"class":"rw"});
				player.controls.search_rw._default_display = u.gcs(player.controls.search_rw, "display");
				player.controls.search_rw.player = player;
				u.e.click(player.controls.search_ff);
				player.controls.search_ff.ffing = function() {
					this.t_ffing = u.t.setTimer(this, this.ffing, 100);
					this.player.ff();
				}
				player.controls.search_ff.inputStarted = function(event) {
					this.ffing();
				}
				player.controls.search_ff.clicked = function(event) {
					u.t.resetTimer(this.t_ffing);
				}
				u.e.click(player.controls.search_rw);
				player.controls.search_rw.rwing = function() {
					this.t_rwing = u.t.setTimer(this, this.rwing, 100);
					this.player.rw();
				}
				player.controls.search_rw.inputStarted = function(event) {
					this.rwing();
				}
				player.controls.search_rw.clicked = function(event) {
					u.t.resetTimer(this.t_rwing);
					this.player.rw();
				}
				player.controls.search = true;
			}
			else {
				u.as(player.controls.search_ff, "display", player.controls.search_ff._default_display);
				u.as(player.controls.search_rw, "display", player.controls.search_rw._default_display);
			}
		}
		else if(player.controls.search) {
			u.as(player.controls.search_ff, "display", "none");
			u.as(player.controls.search_rw, "display", "none");
		}
		if(player._controls_zoom && !player.controls.zoom) {}
		else if(player.controls.zoom) {}
		if(player._controls_volume && !player.controls.volume) {}
		else if(player.controls.volume) {}
	}
}
u.detectMediaAutoplay = function(player) {
	if(!u.media_autoplay_detection) {
		u.media_autoplay_detection = [player];
		u.test_autoplay = document.createElement("video");
		u.test_autoplay.check = function() {
			if(u.media_can_autoplay !== undefined && u.media_can_autoplay_muted !== undefined) {
				for(var i = 0, player; i < u.media_autoplay_detection.length; i++) {
					player = u.media_autoplay_detection[i];
					player.can_autoplay = u.media_can_autoplay;
					player.can_autoplay_muted = u.media_can_autoplay_muted;
					if(fun(player.ready)) {
						player.ready();
					}
				}
				u.media_autoplay_detection = true;
				u.test_autoplay.pause();
				delete u.test_autoplay;
			}
		}
		u.test_autoplay.playing = function(event) {
			u.media_can_autoplay = true;
			u.media_can_autoplay_muted = true;
			this.check();
		}
		u.test_autoplay.notplaying = function() {
			u.media_can_autoplay = false;
			u.test_autoplay.muted = true;
			var promise = u.test_autoplay.play();
			if(promise && fun(promise.then)) {
				promise.then(
					function(){
						if(u.test_autoplay) {
							u.t.resetTimer(window.u.test_autoplay.t_check);
							u.test_autoplay.playing_muted();
						}
					}
				).catch(
					function() {
						if(u.test_autoplay) {
							u.t.resetTimer(window.u.test_autoplay.t_check)
							u.test_autoplay.notplaying_muted();
						}
					}
				);
				u.test_autoplay.t_check = u.t.setTimer(u.test_autoplay, function(){
					u.test_autoplay.pause();
				}, 1000);
			}
		}
		u.test_autoplay.playing_muted = function() {
			u.media_can_autoplay_muted = true;
			this.check();
		}
		u.test_autoplay.notplaying_muted = function() {
			u.media_can_autoplay_muted = false;
			this.check();
		}
		u.test_autoplay.error = function(event) {
			u.media_can_autoplay = false;
			u.media_can_autoplay_muted = false;
			this.check();
		}
		u.e.addEvent(u.test_autoplay, "playing", u.test_autoplay.playing);
		u.e.addEvent(u.test_autoplay, "error", u.test_autoplay.error);
		if(u.test_autoplay.canPlayType("video/mp4")) {
			var data = "data:audio/aac;base64,//FQgAPf/N4CAExhdmM1OC45MS4xMDAAQiAIwRg4//FQgAG//CEQBGCMHP/xUIABv/whEARgjBz/8VCAAb/8IRAEYIwc//FQgAG//CEQBGCMHP/xUIABv/whEARgjBw=";
			// var data = "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAxJtZGF0AAACoAYF//+c3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1NyAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTggLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0xIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDM6MHgxMTMgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTEgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz0xIGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MyBiX3B5cmFtaWQ9MiBiX2FkYXB0PTEgYl9iaWFzPTAgZGlyZWN0PTEgd2VpZ2h0Yj0xIG9wZW5fZ29wPTAgd2VpZ2h0cD0yIGtleWludD0yNTAga2V5aW50X21pbj0yNSBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmNfbG9va2FoZWFkPTQwIHJjPWNyZiBtYnRyZWU9MSBjcmY9MjMuMCBxY29tcD0wLjYwIHFwbWluPTAgcXBtYXg9NjkgcXBzdGVwPTQgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAABpliIQAM//+9uy+BTYUyFCXESoMDuxA1w9RcQAAAAlBmiJsQr/+RRgAAAAIAZ5BeQr/IeHeAgBMYXZjNTguMzUuMTAwAEIgCMEYOCEQBGCMHCEQBGCMHCEQBGCMHCEQBGCMHAAABXNtb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAeAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAACb3RyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAeAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAMAAAADAAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAHgAAAQAAAEAAAAAAedtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAADIAAAAGAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAGSbWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAABUnN0YmwAAACmc3RzZAAAAAAAAAABAAAAlmF2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAMAAwAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAwYXZjQwFkAAr/4QAXZ2QACqzZTewEQAAAAwBAAAAMg8SJZYABAAZo6+PLIsAAAAAQcGFzcAAAAAEAAAABAAAAGHN0dHMAAAAAAAAAAQAAAAMAAAIAAAAAFHN0c3MAAAAAAAAAAQAAAAEAAAAoY3R0cwAAAAAAAAADAAAAAQAABAAAAAABAAAGAAAAAAEAAAIAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAADAAAAAQAAACBzdHN6AAAAAAAAAAAAAAADAAACwgAAAA0AAAAMAAAAFHN0Y28AAAAAAAAAAQAAADAAAAIudHJhawAAAFx0a2hkAAAAAwAAAAAAAAAAAAAAAgAAAAAAAAB1AAAAAAAAAAAAAAABAQAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAJGVkdHMAAAAcZWxzdAAAAAAAAAABAAAAdQAAAAAAAQAAAAABpm1kaWEAAAAgbWRoZAAAAAAAAAAAAAAAAAAArEQAABQAVcQAAAAAAC1oZGxyAAAAAAAAAABzb3VuAAAAAAAAAAAAAAAAU291bmRIYW5kbGVyAAAAAVFtaW5mAAAAEHNtaGQAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAARVzdGJsAAAAZ3N0c2QAAAAAAAAAAQAAAFdtcDRhAAAAAAAAAAEAAAAAAAAAAAACABAAAAAArEQAAAAAADNlc2RzAAAAAAOAgIAiAAIABICAgBRAFQAAAAAAEX4AAAymBYCAgAISEAaAgIABAgAAABhzdHRzAAAAAAAAAAEAAAAFAAAEAAAAABxzdHNjAAAAAAAAAAEAAAABAAAABQAAAAEAAAAoc3RzegAAAAAAAAAAAAAABQAAABcAAAAGAAAABgAAAAYAAAAGAAAAFHN0Y28AAAAAAAAAAQAAAwsAAAAac2dwZAEAAAByb2xsAAAAAgAAAAH//wAAABxzYmdwAAAAAHJvbGwAAAABAAAABQAAAAEAAABidWR0YQAAAFptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJal0b28AAAAdZGF0YQAAAAEAAAAATGF2ZjU4LjIwLjEwMA==";
			u.test_autoplay.volume = 0.01;
			u.test_autoplay.autoplay = true;
			u.test_autoplay.playsinline = true;
			u.test_autoplay.setAttribute("playsinline", true);
			u.test_autoplay.src = data;
			var promise = u.test_autoplay.play();
			if(promise && fun(promise.then)) {
				u.e.removeEvent(u.test_autoplay, "playing", u.test_autoplay.playing);
				u.e.removeEvent(u.test_autoplay, "error", u.test_autoplay.error);
				promise.then(
					u.test_autoplay.playing.bind(u.test_autoplay)
				).catch(
					u.test_autoplay.notplaying.bind(u.test_autoplay)
				);
			}
		}
		else {
			u.media_can_autoplay = true;
			u.media_can_autoplay_muted = true;
			u.t.setTimer(u.test_autoplay, function() {
				this.check();
			}, 20);
		}
	}
	else if(u.media_autoplay_detection !== true) {
		u.media_autoplay_detection.push(player);
	}
	else {
		u.t.setTimer(player, function() {
			this.can_autoplay = u.media_can_autoplay;
			this.can_autoplay_muted = u.media_can_autoplay_muted;
			if(fun(this.ready)){
				this.ready();
			}
		}, 20);
	}
}
u.navigation = function(_options) {
	var navigation_node = page;
	var callback_navigate = "_navigate";
	var initialization_scope = page.cN;
	if(obj(_options)) {
		var argument;
		for(argument in _options) {
			switch(argument) {
				case "callback"       : callback_navigate           = _options[argument]; break;
				case "node"           : navigation_node             = _options[argument]; break;
				case "scope"          : initialization_scope        = _options[argument]; break;
			}
		}
	}
	window._man_nav_path = window._man_nav_path ? window._man_nav_path : u.h.getCleanUrl(location.href, 1);
	navigation_node._navigate = function(url) {
		var clean_url = u.h.getCleanUrl(url);
		u.stats.pageView(url);
		if(
			!window._man_nav_path || 
			(!u.h.popstate && window._man_nav_path != u.h.getCleanHash(location.hash, 1)) || 
			(u.h.popstate && window._man_nav_path != u.h.getCleanUrl(location.href, 1))
		) {
			if(this.cN && fun(this.cN.navigate)) {
				this.cN.navigate(clean_url, url);
			}
		}
		else {
			if(this.cN.scene && this.cN.scene.parentNode && fun(this.cN.scene.navigate)) {
				this.cN.scene.navigate(clean_url, url);
			}
			else if(this.cN && fun(this.cN.navigate)) {
				this.cN.navigate(clean_url, url);
			}
		}
		if(!u.h.popstate) {
			window._man_nav_path = u.h.getCleanHash(location.hash, 1);
		}
		else {
			window._man_nav_path = u.h.getCleanUrl(location.href, 1);
		}
	}
	if(location.hash.length && location.hash.match(/^#!/)) {
		location.hash = location.hash.replace(/!/, "");
	}
	var callback_after_init = false;
	if(!this.is_initialized) {
		this.is_initialized = true;
		if(!u.h.popstate) {
			if(location.hash.length < 2) {
				window._man_nav_path = u.h.getCleanUrl(location.href);
				u.h.navigate(window._man_nav_path);
			}
			else if(location.hash.match(/^#\//) && u.h.getCleanHash(location.hash) != u.h.getCleanUrl(location.href)) {
				callback_after_init = u.h.getCleanHash(location.hash);
			}
			else {
			}
		}
		else {
			if(u.h.getCleanHash(location.hash) != u.h.getCleanUrl(location.href) && location.hash.match(/^#\//)) {
				window._man_nav_path = u.h.getCleanHash(location.hash);
				u.h.navigate(window._man_nav_path);
				callback_after_init = window._man_nav_path;
			}
			else {
			}
		}
		var random_string = u.randomString(8);
		if(callback_after_init) {
			eval('navigation_node._initNavigation_'+random_string+' = function() {u.h.addEvent(this, {"callback":"'+callback_navigate+'"});u.h.callback("'+callback_after_init+'");}');
		}
		else {
			eval('navigation_node._initNavigation_'+random_string+' = function() {u.h.addEvent(this, {"callback":"'+callback_navigate+'"});}');
		}
		u.t.setTimer(navigation_node, "_initNavigation_"+random_string, 100);
	}
	else {
		u.h.callbacks.push({"node":navigation_node, "callback":callback_navigate});
	}
}
u.objectValues = function(obj) {
	var key, values = [];
	for(key in obj) {
		if(obj.hasOwnProperty(key)) {
			values.push(obj[key]);
		}
	}
	return values;
}
u.overlay = function (_options) {
	var title = "Overlay";
	var drag = true;
	var width = 400;
	var height = 400;
	var content_scroll = false;
	var classname = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "title"            : title             = _options[_argument]; break;
				case "drag"             : drag              = _options[_argument]; break;
				case "class"            : classname         = _options[_argument]; break;
				case "width"            : width             = _options[_argument]; break;
				case "height"           : height            = _options[_argument]; break;
				case "content_scroll"   : content_scroll    = _options[_argument]; break;
			}
		}
	}
	if (width > 500) {
		classname = " large " + classname;
	}
	else {
		classname = " small " + classname;
	}
	if(content_scroll) {
		classname += "content_scroll"
	}
	var overlay = u.ae(document.body, "div", {
		"class": "overlay" + classname, 
		"tabindex": "-1"
	});
	overlay.protection = u.ae(document.body, "div", {
		"class": "overlay_protection"
	});
	u.ass(overlay, {
		"opacity": 0,
		"width": width + "px",
		"height": height + "px",
		"left": ((u.browserW() - width) / 2) + "px",
		"top": ((u.browserH() - height) / 2) + "px",
	});
	overlay.w = width;
	overlay.h = height;
	if (window._overlay_stack_index) {
		u.ass(overlay.protection, { "z-index": window._overlay_stack_index});
		u.ass(overlay, { "z-index": window._overlay_stack_index + 1 });
	}
	window._overlay_stack_index = Number(u.gcs(overlay, "z-index")) + 2;
	u.as(document.body, "overflow", "hidden");
	overlay._resized = function (event) {
		u.ass(this, {
			"left": ((u.browserW() - this.w) / 2) + "px",
			"top": ((u.browserH() - this.h) / 2) + "px",
		});
		u.ass(this.div_content, {
			"height": ((this.offsetHeight - this.div_header.offsetHeight) - this.div_footer.offsetHeight - parseInt(u.gcs(this, "border-bottom")) - parseInt(u.gcs(this, "border-top"))) + "px"
		});
		if(fun(this.resized)) {
			this.resized(event);
		}
	}
	u.e.addWindowEvent(overlay, "resize", "_resized");
	overlay.div_header = u.ae(overlay, "div", {class:"header"});
	if(title) {
		overlay.div_header.h2 = u.ae(overlay.div_header, "h2", {html: title});
		overlay.div_header.overlay = overlay;
	}
	overlay.div_content = u.ae(overlay, "div", {class: "content"});
	overlay.div_content.overlay = overlay;
	overlay.div_footer = u.ae(overlay, "div", {class: "footer"});
	overlay.div_footer.overlay = overlay;
	if (drag) {
		u.e.drag(overlay.div_header, overlay.div_header);
		overlay._x = 0;
		overlay._y = 0;
		overlay.div_header.moved = function (event) {
			var new_x = this.overlay._x + this.current_x;
			var new_y = this.overlay._y + this.current_y;
			u.ass(this.overlay, {
				"transform": "translate(" + new_x + "px, " + new_y + "px)",
			});
		}
		overlay.div_header.dropped = function (event) {
			this.overlay._x += this.current_x;
			this.overlay._y += this.current_y;
		}
	}
	overlay.close = function (event) {
		u.as(document.body, "overflow", "auto");
		document.body.removeChild(this);
		document.body.removeChild(this.protection);
		if(fun(this.closed)) {
			this.closed(event);
		}
	}
	overlay.x_close = u.ae(overlay.div_header, "div", {class: "close"});
	overlay.x_close.overlay = overlay;
	u.ce(overlay.x_close);
	overlay.x_close.clicked = function (event) {
		this.overlay.close(event);
	}
	overlay._resized();
	u.ass(overlay, {
		"transition": "all .4s ease-in-out .1s",
		"opacity": 1,
	});
	return overlay;
}
u.preloader = function(node, files, _options) {
	var callback_preloader_loaded = "loaded";
	var callback_preloader_loading = "loading";
	var callback_preloader_waiting = "waiting";
	node._callback_min_delay = 0;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "loaded"               : callback_preloader_loaded       = _options[_argument]; break;
				case "loading"              : callback_preloader_loading      = _options[_argument]; break;
				case "waiting"              : callback_preloader_waiting      = _options[_argument]; break;
				case "callback_min_delay"   : node._callback_min_delay              = _options[_argument]; break;
			}
		}
	}
	if(!u._preloader_queue) {
		u._preloader_queue = document.createElement("div");
		u._preloader_processes = 0;
		if(u.e && u.e.event_support == "touch") {
			u._preloader_max_processes = 1;
		}
		else {
			u._preloader_max_processes = 2;
		}
	}
	if(node && files) {
		var entry, file;
		var new_queue = u.ae(u._preloader_queue, "ul");
		new_queue._callback_loaded = callback_preloader_loaded;
		new_queue._callback_loading = callback_preloader_loading;
		new_queue._callback_waiting = callback_preloader_waiting;
		new_queue._node = node;
		new_queue._files = files;
		new_queue.nodes = new Array();
		new_queue._start_time = new Date().getTime();
		for(i = 0; i < files.length; i++) {
			file = files[i];
			entry = u.ae(new_queue, "li", {"class":"waiting"});
			entry.i = i;
			entry._queue = new_queue
			entry._file = file;
		}
		u.ac(node, "waiting");
		if(fun(node[new_queue._callback_waiting])) {
			node[new_queue._callback_waiting](new_queue.nodes);
		}
	}
	u._queueLoader();
	return u._preloader_queue;
}
u._queueLoader = function() {
	if(u.qs("li.waiting", u._preloader_queue)) {
		while(u._preloader_processes < u._preloader_max_processes) {
			var next = u.qs("li.waiting", u._preloader_queue);
			if(next) {
				if(u.hc(next._queue._node, "waiting")) {
					u.rc(next._queue._node, "waiting");
					u.ac(next._queue._node, "loading");
					if(fun(next._queue._node[next._queue._callback_loading])) {
						next._queue._node[next._queue._callback_loading](next._queue.nodes);
					}
				}
				u._preloader_processes++;
				u.rc(next, "waiting");
				u.ac(next, "loading");
				if(next._file.match(/png|jpg|gif|svg/)) {
					next.loaded = function(event) {
						this.image = event.target;
						this._image = this.image;
						this._queue.nodes[this.i] = this;
						u.rc(this, "loading");
						u.ac(this, "loaded");
						u._preloader_processes--;
						if(!u.qs("li.waiting,li.loading", this._queue)) {
							u.rc(this._queue._node, "loading");
							if(fun(this._queue._node[this._queue._callback_loaded])) {
								this._queue._node[this._queue._callback_loaded](this._queue.nodes);
							}
						}
						u._queueLoader();
					}
					u.loadImage(next, next._file);
				}
				else if(next._file.match(/mp3|aac|wav|ogg/)) {
					next.loaded = function(event) {
						console.log(event);
						this._queue.nodes[this.i] = this;
						u.rc(this, "loading");
						u.ac(this, "loaded");
						u._preloader_processes--;
						if(!u.qs("li.waiting,li.loading", this._queue)) {
							u.rc(this._queue._node, "loading");
							if(fun(this._queue._node[this._queue._callback_loaded])) {
								this._queue._node[this._queue._callback_loaded](this._queue.nodes);
							}
						}
						u._queueLoader();
					}
					if(fun(u.audioPlayer)) {
						next.audioPlayer = u.audioPlayer();
						next.load(next._file);
					}
					else {
						u.bug("You need u.audioPlayer to preload MP3s");
					}
				}
				else {
				}
			}
			else {
				break
			}
		}
	}
}
u.loadImage = function(node, src) {
	var image = new Image();
	image.node = node;
	u.ac(node, "loading");
    u.e.addEvent(image, 'load', u._imageLoaded);
	u.e.addEvent(image, 'error', u._imageLoadError);
	image.src = src;
}
u._imageLoaded = function(event) {
	u.rc(this.node, "loading");
	if(fun(this.node.loaded)) {
		this.node.loaded(event);
	}
}
u._imageLoadError = function(event) {
	u.rc(this.node, "loading");
	u.ac(this.node, "error");
	if(fun(this.node.loaded) && typeof(this.node.failed) != "function") {
		this.node.loaded(event);
	}
	else if(fun(this.node.failed)) {
		this.node.failed(event);
	}
}
u._imageLoadProgress = function(event) {
	u.bug("progress")
	if(fun(this.node.progress)) {
		this.node.progress(event);
	}
}
u._imageLoadDebug = function(event) {
	u.bug("event:" + event.type);
	u.xInObject(event);
}
Util.createRequestObject = function() {
	return new XMLHttpRequest();
}
Util.request = function(node, url, _options) {
	var request_id = u.randomString(6);
	node[request_id] = {};
	node[request_id].request_url = url;
	node[request_id].request_method = "GET";
	node[request_id].request_async = true;
	node[request_id].request_data = "";
	node[request_id].request_headers = false;
	node[request_id].request_credentials = false;
	node[request_id].response_type = false;
	node[request_id].callback_response = "response";
	node[request_id].callback_error = "responseError";
	node[request_id].jsonp_callback = "callback";
	node[request_id].request_timeout = false;
	if(obj(_options)) {
		var argument;
		for(argument in _options) {
			switch(argument) {
				case "method"				: node[request_id].request_method			= _options[argument]; break;
				case "params"				: node[request_id].request_data				= _options[argument]; break;
				case "data"					: node[request_id].request_data				= _options[argument]; break;
				case "async"				: node[request_id].request_async			= _options[argument]; break;
				case "headers"				: node[request_id].request_headers			= _options[argument]; break;
				case "credentials"			: node[request_id].request_credentials		= _options[argument]; break;
				case "responseType"			: node[request_id].response_type			= _options[argument]; break;
				case "callback"				: node[request_id].callback_response		= _options[argument]; break;
				case "error_callback"		: node[request_id].callback_error			= _options[argument]; break;
				case "jsonp_callback"		: node[request_id].jsonp_callback			= _options[argument]; break;
				case "timeout"				: node[request_id].request_timeout			= _options[argument]; break;
			}
		}
	}
	if(node[request_id].request_method.match(/GET|POST|PUT|PATCH/i)) {
		node[request_id].HTTPRequest = this.createRequestObject();
		node[request_id].HTTPRequest.node = node;
		node[request_id].HTTPRequest.request_id = request_id;
		if(node[request_id].request_async) {
			node[request_id].HTTPRequest.statechanged = function() {
				if(this.readyState == 4 || this.IEreadyState) {
					u.validateResponse(this);
				}
			}
			if(fun(node[request_id].HTTPRequest.addEventListener)) {
				u.e.addEvent(node[request_id].HTTPRequest, "readystatechange", node[request_id].HTTPRequest.statechanged);
			}
		}
		try {
			if(node[request_id].request_method.match(/GET/i)) {
				var params = u.JSONtoParams(node[request_id].request_data);
				node[request_id].request_url += params ? ((!node[request_id].request_url.match(/\?/g) ? "?" : "&") + params) : "";
				node[request_id].HTTPRequest.open(node[request_id].request_method, node[request_id].request_url, node[request_id].request_async);
				if(node[request_id].response_type) {
					node[request_id].HTTPRequest.responseType = node[request_id].response_type;
				}
				if(node[request_id].request_timeout) {
					node[request_id].HTTPRequest.timeout = node[request_id].request_timeout;
				}
				if(node[request_id].request_credentials) {
					node[request_id].HTTPRequest.withCredentials = true;
				}
				if(typeof(node[request_id].request_headers) != "object" || (!node[request_id].request_headers["Content-Type"] && !node[request_id].request_headers["content-type"])) {
					node[request_id].HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				}
				if(obj(node[request_id].request_headers)) {
					var header;
					for(header in node[request_id].request_headers) {
						node[request_id].HTTPRequest.setRequestHeader(header, node[request_id].request_headers[header]);
					}
				}
				node[request_id].HTTPRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				node[request_id].HTTPRequest.send("");
			}
			else if(node[request_id].request_method.match(/POST|PUT|PATCH|DELETE/i)) {
				var params;
				if(obj(node[request_id].request_data) && node[request_id].request_data.constructor.toString().match(/function Object/i)) {
					params = JSON.stringify(node[request_id].request_data);
				}
				else {
					params = node[request_id].request_data;
				}
				node[request_id].HTTPRequest.open(node[request_id].request_method, node[request_id].request_url, node[request_id].request_async);
				if(node[request_id].response_type) {
					node[request_id].HTTPRequest.responseType = node[request_id].response_type;
				}
				if(node[request_id].request_timeout) {
					node[request_id].HTTPRequest.timeout = node[request_id].request_timeout;
				}
				if(node[request_id].request_credentials) {
					node[request_id].HTTPRequest.withCredentials = true;
				}
				if(!params.constructor.toString().match(/FormData/i) && (typeof(node[request_id].request_headers) != "object" || (!node[request_id].request_headers["Content-Type"] && !node[request_id].request_headers["content-type"]))) {
					node[request_id].HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				}
				if(obj(node[request_id].request_headers)) {
					var header;
					for(header in node[request_id].request_headers) {
						node[request_id].HTTPRequest.setRequestHeader(header, node[request_id].request_headers[header]);
					}
				}
				node[request_id].HTTPRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				node[request_id].HTTPRequest.send(params);
			}
		}
		catch(exception) {
			node[request_id].HTTPRequest.exception = exception;
			u.validateResponse(node[request_id].HTTPRequest);
			return;
		}
		if(!node[request_id].request_async) {
			u.validateResponse(node[request_id].HTTPRequest);
		}
	}
	else if(node[request_id].request_method.match(/SCRIPT/i)) {
		if(node[request_id].request_timeout) {
			node[request_id].timedOut = function(requestee) {
				this.status = 0;
				delete this.timedOut;
				delete this.t_timeout;
				Util.validateResponse({node: requestee.node, request_id: requestee.request_id, status:this.status});
			}
			node[request_id].t_timeout = u.t.setTimer(node[request_id], "timedOut", node[request_id].request_timeout, {node: node, request_id: request_id});
		}
		var key = u.randomString();
		document[key] = new Object();
		document[key].key = key;
		document[key].node = node;
		document[key].request_id = request_id;
		document[key].responder = function(response) {
			var response_object = new Object();
			response_object.node = this.node;
			response_object.request_id = this.request_id;
			response_object.responseText = response;
			u.t.resetTimer(this.node[this.request_id].t_timeout);
			delete this.node[this.request_id].timedOut;
			delete this.node[this.request_id].t_timeout;
			u.qs("head").removeChild(this.node[this.request_id].script_tag);
			delete this.node[this.request_id].script_tag;
			delete document[this.key];
			u.validateResponse(response_object);
		}
		var params = u.JSONtoParams(node[request_id].request_data);
		node[request_id].request_url += params ? ((!node[request_id].request_url.match(/\?/g) ? "?" : "&") + params) : "";
		node[request_id].request_url += (!node[request_id].request_url.match(/\?/g) ? "?" : "&") + node[request_id].jsonp_callback + "=document."+key+".responder";
		node[request_id].script_tag = u.ae(u.qs("head"), "script", ({"type":"text/javascript", "src":node[request_id].request_url}));
	}
	return request_id;
}
Util.JSONtoParams = function(json) {
	if(obj(json)) {
		var params = "", param;
		for(param in json) {
			params += (params ? "&" : "") + param + "=" + json[param];
		}
		return params
	}
	var object = u.isStringJSON(json);
	if(object) {
		return u.JSONtoParams(object);
	}
	return json;
}
Util.evaluateResponseText = function(responseText) {
	var object;
	if(obj(responseText)) {
		responseText.isJSON = true;
		return responseText;
	}
	else {
		var response_string;
		if(responseText.trim().substr(0, 1).match(/[\"\']/i) && responseText.trim().substr(-1, 1).match(/[\"\']/i)) {
			response_string = responseText.trim().substr(1, responseText.trim().length-2);
		}
		else {
			response_string = responseText;
		}
		var json = u.isStringJSON(response_string);
		if(json) {
			return json;
		}
		var html = u.isStringHTML(response_string);
		if(html) {
			return html;
		}
		return responseText;
	}
}
Util.validateResponse = function(HTTPRequest){
	var object = false;
	if(HTTPRequest) {
		var node = HTTPRequest.node;
		var request_id = HTTPRequest.request_id;
		var request = node[request_id];
		request.response_url = HTTPRequest.responseURL || request.request_url;
		delete request.HTTPRequest;
		if(request.finished) {
			return;
		}
		request.finished = true;
		try {
			request.status = HTTPRequest.status;
			if(HTTPRequest.status && !HTTPRequest.status.toString().match(/[45][\d]{2}/)) {
				if(HTTPRequest.responseType && HTTPRequest.response) {
					object = HTTPRequest.response;
				}
				else if(HTTPRequest.responseText) {
					object = u.evaluateResponseText(HTTPRequest.responseText);
				}
			}
			else if(HTTPRequest.responseText && typeof(HTTPRequest.status) == "undefined") {
				object = u.evaluateResponseText(HTTPRequest.responseText);
			}
		}
		catch(exception) {
			request.exception = exception;
		}
	}
	else {
		console.log("Lost track of this request. There is no way of routing it back to requestee.")
		return;
	}
	if(object !== false) {
		if(fun(request.callback_response)) {
			request.callback_response(object, request_id);
		}
		else if(fun(node[request.callback_response])) {
			node[request.callback_response](object, request_id);
		}
	}
	else {
		if(fun(request.callback_error)) {
			request.callback_error({error:true,status:request.status}, request_id);
		}
		else if(fun(node[request.callback_error])) {
			node[request.callback_error]({error:true,status:request.status}, request_id);
		}
		else if(fun(request.callback_response)) {
			request.callback_response({error:true,status:request.status}, request_id);
		}
		else if(fun(node[request.callback_response])) {
			node[request.callback_response]({error:true,status:request.status}, request_id);
		}
	}
}
u.scrollTo = function(node, _options) {
	node._callback_scroll_to = "scrolledTo";
	node._callback_scroll_cancelled = "scrollToCancelled";
	var offset_y = 0;
	var offset_x = 0;
	var scroll_to_x = 0;
	var scroll_to_y = 0;
	var to_node = false;
	node._force_scroll_to = false;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "callback"             : node._callback_scroll_to            = _options[_argument]; break;
				case "callback_cancelled"   : node._callback_scroll_cancelled     = _options[_argument]; break;
				case "offset_y"             : offset_y                           = _options[_argument]; break;
				case "offset_x"             : offset_x                           = _options[_argument]; break;
				case "node"                 : to_node                            = _options[_argument]; break;
				case "x"                    : scroll_to_x                        = _options[_argument]; break;
				case "y"                    : scroll_to_y                        = _options[_argument]; break;
				case "scrollIn"             : scrollIn                           = _options[_argument]; break;
				case "force"                : node._force_scroll_to              = _options[_argument]; break;
			}
		}
	}
	if(to_node) {
		node._to_x = u.absX(to_node);
		node._to_y = u.absY(to_node);
	}
	else {
		node._to_x = scroll_to_x;
		node._to_y = scroll_to_y;
	}
	node._to_x = offset_x ? node._to_x - offset_x : node._to_x;
	node._to_y = offset_y ? node._to_y - offset_y : node._to_y;
	if (Util.support("scrollBehavior")) {
		var test = node.scrollTo({top:node._to_y, left:node._to_x, behavior: 'smooth'});
	}
	else {
		if(node._to_y > (node == window ? document.body.scrollHeight : node.scrollHeight)-u.browserH()) {
			node._to_y = (node == window ? document.body.scrollHeight : node.scrollHeight)-u.browserH();
		}
		if(node._to_x > (node == window ? document.body.scrollWidth : node.scrollWidth)-u.browserW()) {
			node._to_x = (node == window ? document.body.scrollWidth : node.scrollWidth)-u.browserW();
		}
		node._to_x = node._to_x < 0 ? 0 : node._to_x;
		node._to_y = node._to_y < 0 ? 0 : node._to_y;
		node._x_scroll_direction = node._to_x - u.scrollX();
		node._y_scroll_direction = node._to_y - u.scrollY();
		node._scroll_to_x = u.scrollX();
		node._scroll_to_y = u.scrollY();
		node._ignoreWheel = function(event) {
			u.e.kill(event);
		}
		if(node._force_scroll_to) {
			u.e.addEvent(node, "wheel", node._ignoreWheel);
		}
		node._scrollToHandler = function(event) {
			u.t.resetTimer(this.t_scroll);
			this.t_scroll = u.t.setTimer(this, this._scrollTo, 25);
		}
		node._cancelScrollTo = function() {
			if(!this._force_scroll_to) {
				u.t.resetTimer(this.t_scroll);
				this._scrollTo = null;
			}
		}
		node._scrollToFinished = function() {
			u.t.resetTimer(this.t_scroll);
			u.e.removeEvent(this, "wheel", this._ignoreWheel);
			this._scrollTo = null;
		}
		node._ZoomScrollFix = function(s_x, s_y) {
			if(Math.abs(this._scroll_to_y - s_y) <= 2 && Math.abs(this._scroll_to_x - s_x) <= 2) {
				return true;
			}
			return false;
		}
		node._scrollTo = function(start) {
			var s_x = u.scrollX();
			var s_y = u.scrollY();
			if((s_y == this._scroll_to_y && s_x == this._scroll_to_x) || this._force_scroll_to || this._ZoomScrollFix(s_x, s_y)) {
				if(this._x_scroll_direction > 0 && this._to_x > s_x) {
					this._scroll_to_x = Math.ceil(this._scroll_to_x + (this._to_x - this._scroll_to_x)/6);
				}
				else if(this._x_scroll_direction < 0 && this._to_x < s_x) {
					this._scroll_to_x = Math.floor(this._scroll_to_x - (this._scroll_to_x - this._to_x)/6);
				}
				else {
					this._scroll_to_x = this._to_x;
				}
				if(this._y_scroll_direction > 0 && this._to_y > s_y) {
					this._scroll_to_y = Math.ceil(this._scroll_to_y + (this._to_y - this._scroll_to_y)/6);
				}
				else if(this._y_scroll_direction < 0 && this._to_y < s_y) {
					this._scroll_to_y = Math.floor(this._scroll_to_y - (this._scroll_to_y - this._to_y)/6);
				}
				else {
					this._scroll_to_y = this._to_y;
				}
				if(this._scroll_to_x == this._to_x && this._scroll_to_y == this._to_y) {
					this._scrollToFinished();
					this.scrollTo(this._to_x, this._to_y);
					if(fun(this[this._callback_scroll_to])) {
						this[this._callback_scroll_to]();
					}
					return;
				}
				this.scrollTo(this._scroll_to_x, this._scroll_to_y);
				this._scrollToHandler();
			}
			else {
				this._cancelScrollTo();
				if(fun(this[this._callback_scroll_cancelled])) {
					this[this._callback_scroll_cancelled]();
				}
			}	
		}
		node._scrollTo();
	}
}
Util.cutString = function(string, length) {
	var matches, match, i;
	if(string.length <= length) {
		return string;
	}
	else {
		length = length-3;
	}
	matches = string.match(/\&[\w\d]+\;/g);
	if(matches) {
		for(i = 0; i < matches.length; i++){
			match = matches[i];
			if(string.indexOf(match) < length){
				length += match.length-1;
			}
		}
	}
	return string.substring(0, length) + (string.length > length ? "..." : "");
}
Util.prefix = function(string, length, prefix) {
	string = string.toString();
	prefix = prefix ? prefix : "0";
	while(string.length < length) {
		string = prefix + string;
	}
	return string;
}
Util.randomString = function(length) {
	var key = "", i;
	length = length ? length : 8;
	var pattern = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
	for(i = 0; i < length; i++) {
		key += pattern[u.random(0,35)];
	}
	return key;
}
Util.uuid = function() {
	var chars = '0123456789abcdef'.split('');
	var uuid = [], rnd = Math.random, r, i;
	uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	uuid[14] = '4';
	for(i = 0; i < 36; i++) {
		if(!uuid[i]) {
			r = 0 | rnd()*16;
			uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
		}
 	}
	return uuid.join('');
}
Util.stringOr = u.eitherOr = function(value, replacement) {
	if(value !== undefined && value !== null) {
		return value;
	}
	else {
		return replacement ? replacement : "";
	}	
}
Util.getMatches = function(string, regex) {
	var match, matches = [];
	while(match = regex.exec(string)) {
		matches.push(match[1]);
	}
	return matches;
}
Util.upperCaseFirst = u.ucfirst = function(string) {
	return string.replace(/^(.){1}/, function($1) {return $1.toUpperCase()});
}
Util.lowerCaseFirst = u.lcfirst = function(string) {
	return string.replace(/^(.){1}/, function($1) {return $1.toLowerCase()});
}
Util.normalize = function(string) {
	var table = {
		'À':'A',  'à':'a',
		'Á':'A',  'á':'a',
		'Â':'A',  'â':'a',
		'Ã':'A',  'ã':'a',
		'Ä':'A',  'ä':'a',
		'Å':'Aa', 'å':'aa',
		'Æ':'Ae', 'æ':'ae',
		'Ç':'C',  'ç':'c',
		'Č':'C',  'ć':'c',
		'Ć':'C',  'č':'c',
		'Đ':'D',  'đ':'d',  'ð':'d',
		'È':'E',  'è':'e',
		'É':'E',  'é':'e',
		'Ê':'E',  'ê':'e',
		'Ë':'E',  'ë':'e',
		'Ģ':'G',  'ģ':'g',
		'Ğ':'G',  'ğ':'g',
		'Ì':'I',  'ì':'i',
		'Í':'I',  'í':'i',
		'Î':'I',  'î':'i',
		'Ï':'I',  'ï':'i',
		'Ī':'I',  'ī':'i',
		'Ķ':'K',  'ķ':'k',
		'Ļ':'L',  'ļ':'l',
		'Ñ':'N',  'ñ':'n',
		'Ņ':'N',  'ņ':'n',
		'Ò':'O',  'ò':'o',
		'Ó':'O',  'ó':'o',
		'Ô':'O',  'ô':'o',
		'Õ':'O',  'õ':'o',
		'Ö':'O',  'ö':'o',
		'Ō':'O',  'ō':'o',
		'Ø':'Oe', 'ø':'oe',
		'Ŕ':'R',  'ŕ':'r',
		'Š':'S',  'š':'s',
		'Ş':'S',  'ş':'s',
		'Ṩ':'S',  'ṩ':'s',
		'Ù':'U',  'ù':'u',
		'Ú':'U',  'ú':'u',
		'Û':'U',  'û':'u',
		'Ü':'U',  'ü':'u',
		'Ū':'U',  'ū':'u',
		'Ų':'U',  'ų':'u',
		'Ŭ':'U',  'ŭ':'u',
		'Ý':'Y',  'ý':'y',
		'Ÿ':'Y',  'ÿ':'y',
		'Ž':'Z',  'ž':'z',
		'Þ':'B',  'þ':'b',
		'ß':'Ss',
		'@':' at ',
		'&':'and',
		'%':' percent',
		'\\$':'USD',
		'¥':'JPY',
		'€':'EUR',
		'£':'GBP',
		'™':'trademark',
		'©':'copyright',
		'§':'s',
		'\\*':'x',
		'×':'x'
	}
	var char, regex;
	for(char in table) {
		regex = new RegExp(char, "g");
		string = string.replace(regex, table[char]);
	}
	return string;
}
Util.superNormalize = function(string) {
	string = u.normalize(string);
	string = string.toLowerCase();
	string = u.stripTags(string);
	string = string.replace(/[^a-z0-9\_]/g, '-');
	string = string.replace(/-+/g, '-');
	string = string.replace(/^-|-$/g, '');
	return string;
}
Util.stripTags = function(string) {
	var node = document.createElement("div");
	node.innerHTML = string;
	return u.text(node);
}
Util.pluralize = function(count, singular, plural) {
	if(count != 1) {
		return count + " " + plural;
	}
	return count + " " + singular;
}
Util.isStringJSON = function(string) {
	if(string.trim().substr(0, 1).match(/[\{\[]/i) && string.trim().substr(-1, 1).match(/[\}\]]/i)) {
		try {
			var test = JSON.parse(string);
			if(obj(test)) {
				test.isJSON = true;
				return test;
			}
		}
		catch(exception) {
			console.log(exception)
		}
	}
	return false;
}
Util.isStringHTML = function(string) {
	if(string.trim().substr(0, 1).match(/[\<]/i) && string.trim().substr(-1, 1).match(/[\>]/i)) {
		try {
			var test = document.createElement("div");
			test.innerHTML = string;
			if(test.childNodes.length) {
				var body_class = string.match(/<body class="([a-z0-9A-Z_: ]+)"/);
				test.body_class = body_class ? body_class[1] : "";
				var head_title = string.match(/<title>([^$]+)<\/title>/);
				test.head_title = head_title ? head_title[1] : "";
				test.isHTML = true;
				return test;
			}
		}
		catch(exception) {}
	}
	return false;
}
Util.svg = function(svg_object) {
	var svg, shape, svg_shape;
	if(svg_object.name && u._svg_cache && u._svg_cache[svg_object.name]) {
		svg = u._svg_cache[svg_object.name].cloneNode(true);
	}
	if(!svg) {
		svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		for(shape in svg_object.shapes) {
			Util.svgShape(svg, svg_object.shapes[shape]);
		}
		if(svg_object.name) {
			if(!u._svg_cache) {
				u._svg_cache = {};
			}
			u._svg_cache[svg_object.name] = svg.cloneNode(true);
		}
	}
	if(svg_object.title) {
		svg.setAttributeNS(null, "title", svg_object.title);
	}
	if(svg_object["class"]) {
		svg.setAttributeNS(null, "class", svg_object["class"]);
	}
	if(svg_object.width) {
		svg.setAttributeNS(null, "width", svg_object.width);
	}
	if(svg_object.height) {
		svg.setAttributeNS(null, "height", svg_object.height);
	}
	if(svg_object.id) {
		svg.setAttributeNS(null, "id", svg_object.id);
	}
	if(svg_object.viewBox) {
		svg.setAttributeNS(null, "viewBox", svg_object.viewBox);
	}
	if(svg_object.node) {
		svg.node = svg_object.node;
	}
	if(svg_object.node) {
		svg_object.node.appendChild(svg);
	}
	return svg;
}
Util.svgShape = function(svg, svg_object) {
	var detail, svg_shape;
	svg_shape = document.createElementNS("http://www.w3.org/2000/svg", svg_object["type"]);
	delete svg_object["type"];
	for(detail in svg_object) {
		svg_shape.setAttributeNS(null, detail, svg_object[detail]);
	}
	return svg.appendChild(svg_shape);
}
Util.browser = function(model, version) {
	var current_version = false;
	if(model.match(/\bedge\b/i)) {
		if(navigator.userAgent.match(/Windows[^$]+Gecko[^$]+Edge\/(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Edge\/(\d+)/i)[1];
		}
	}
	if(model.match(/\bexplorer\b|\bie\b/i)) {
		if(window.ActiveXObject && navigator.userAgent.match(/MSIE (\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/MSIE (\d+.\d)/i)[1];
		}
		else if(navigator.userAgent.match(/Trident\/[\d+]\.\d[^$]+rv:(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Trident\/[\d+]\.\d[^$]+rv:(\d+.\d)/i)[1];
		}
	}
	if(model.match(/\bfirefox\b|\bgecko\b/i) && !u.browser("ie,edge")) {
		if(navigator.userAgent.match(/Firefox\/(\d+\.\d+)/i)) {
			current_version = navigator.userAgent.match(/Firefox\/(\d+\.\d+)/i)[1];
		}
	}
	if(model.match(/\bwebkit\b/i)) {
		if(navigator.userAgent.match(/WebKit/i) && !u.browser("ie,edge")) {
			current_version = navigator.userAgent.match(/AppleWebKit\/(\d+.\d)/i)[1];
		}
	}
	if(model.match(/\bchrome\b/i)) {
		if(window.chrome && !u.browser("ie,edge")) {
			current_version = navigator.userAgent.match(/Chrome\/(\d+)(.\d)/i)[1];
		}
	}
	if(model.match(/\bsafari\b/i)) {
		u.bug(navigator.userAgent);
		if(!window.chrome && navigator.userAgent.match(/WebKit[^$]+Version\/(\d+)(.\d)/i) && !u.browser("ie,edge")) {
			current_version = navigator.userAgent.match(/Version\/(\d+)(.\d)/i)[1];
		}
	}
	if(model.match(/\bopera\b/i)) {
		if(window.opera) {
			if(navigator.userAgent.match(/Version\//)) {
				current_version = navigator.userAgent.match(/Version\/(\d+)(.\d)/i)[1];
			}
			else {
				current_version = navigator.userAgent.match(/Opera[\/ ]{1}(\d+)(.\d)/i)[1];
			}
		}
	}
	if(current_version) {
		if(!version) {
			return current_version;
		}
		else {
			if(!isNaN(version)) {
				return current_version == version;
			}
			else {
				return eval(current_version + version);
			}
		}
	}
	else {
		return false;
	}
}
Util.segment = function(segment) {
	if(!u.current_segment) {
		var scripts = document.getElementsByTagName("script");
		var script, i, src;
		for(i = 0; i < scripts.length; i++) {
			script = scripts[i];
			seg_src = script.src.match(/\/seg_([a-z_]+)/);
			if(seg_src) {
				u.current_segment = seg_src[1];
			}
		}
	}
	if(segment) {
		return segment == u.current_segment;
	}
	return u.current_segment;
}
Util.system = function(os, version) {
	var current_version = false;
	if(os.match(/\bwindows\b/i)) {
		if(navigator.userAgent.match(/(Windows NT )(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/(Windows NT )(\d+.\d)/i)[2];
		}
	}
	else if(os.match(/\bmac\b/i)) {
		if(navigator.userAgent.match(/(Macintosh; Intel Mac OS X )(\d+[._]{1}\d)/i)) {
			current_version = navigator.userAgent.match(/(Macintosh; Intel Mac OS X )(\d+[._]{1}\d)/i)[2].replace("_", ".");
		}
	}
	else if(os.match(/\blinux\b/i)) {
		if(navigator.userAgent.match(/linux|x11/i) && !navigator.userAgent.match(/android/i)) {
			current_version = true;
		}
	}
	else if(os.match(/\bios\b/i)) {
		if(navigator.userAgent.match(/(OS )(\d+[._]{1}\d+[._\d]*)( like Mac OS X)/i)) {
			current_version = navigator.userAgent.match(/(OS )(\d+[._]{1}\d+[._\d]*)( like Mac OS X)/i)[2].replace(/_/g, ".");
		}
	}
	else if(os.match(/\bandroid\b/i)) {
		if(navigator.userAgent.match(/Android[ ._]?(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Android[ ._]?(\d+.\d)/i)[1];
		}
	}
	else if(os.match(/\bwinphone\b/i)) {
		if(navigator.userAgent.match(/Windows[ ._]?Phone[ ._]?(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Windows[ ._]?Phone[ ._]?(\d+.\d)/i)[1];
		}
	}
	if(current_version) {
		if(!version) {
			return current_version;
		}
		else {
			if(!isNaN(version)) {
				return current_version == version;
			}
			else {
				return eval(current_version + version);
			}
		}
	}
	else {
		return false;
	}
}
Util.support = function(property) {
	if(document.documentElement) {
		var style_property = u.lcfirst(property.replace(/^(-(moz|webkit|ms|o)-|(Moz|webkit|Webkit|ms|O))/, "").replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()}));
		if(style_property in document.documentElement.style) {
			return true;
		}
		else if(u.vendorPrefix() && (u.vendorPrefix()+u.ucfirst(style_property)) in document.documentElement.style) {
			return true;
		}
	}
	return false;
}
Util.vendor_properties = {};
Util.vendorProperty = function(property) {
	if(!Util.vendor_properties[property]) {
		Util.vendor_properties[property] = property.replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()});
		if(document.documentElement) {
			var style_property = u.lcfirst(property.replace(/^(-(moz|webkit|ms|o)-|(Moz|webkit|Webkit|ms|O))/, "").replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()}));
			if(style_property in document.documentElement.style) {
				Util.vendor_properties[property] = style_property;
			}
			else if(u.vendorPrefix() && (u.vendorPrefix()+u.ucfirst(style_property)) in document.documentElement.style) {
				Util.vendor_properties[property] = u.vendorPrefix()+u.ucfirst(style_property);
			}
		}
	}
	return Util.vendor_properties[property];
}
Util.vendor_prefix = false;
Util.vendorPrefix = function() {
	if(Util.vendor_prefix === false) {
		Util.vendor_prefix = "";
		if(document.documentElement && fun(window.getComputedStyle)) {
			var styles = window.getComputedStyle(document.documentElement, "");
			if(styles.length) {
				var i, style, match;
				for(i = 0; i < styles.length; i++) {
					style = styles[i];
					match = style.match(/^-(moz|webkit|ms)-/);
					if(match) {
						Util.vendor_prefix = match[1];
						if(Util.vendor_prefix == "moz") {
							Util.vendor_prefix = "Moz";
						}
						break;
					}
				}
			}
			else {
				var x, match;
				for(x in styles) {
					match = x.match(/^(Moz|webkit|ms|OLink)/);
					if(match) {
						Util.vendor_prefix = match[1];
						if(Util.vendor_prefix === "OLink") {
							Util.vendor_prefix = "O";
						}
						break;
					}
				}
			}
		}
	}
	return Util.vendor_prefix;
}
u.template = function(template, json, _options) {
	var string = "";
	var template_string = "";
	var clone, container, item_template, dom, node_list, type_template, type_parent;
	var append_to_node = false;
	if (obj(_options)) {
		var _argument;
		for (_argument in _options) {
			switch (_argument) {
				case "append": 	append_to_node = _options[_argument];			break;
			}
		}
	}
	if(obj(template) && typeof(template.nodeName) != "undefined") {
		type_template = "HTML";
	}
	else if(obj(template) && JSON.stringify(template)) {
		type_template = "JSON";
	}
	else if(str(template) && template.match(/^(\{|\[)/)) {
		type_template = "JSON_STRING";
	}
	else if(str(template) && template.match(/^<.+>$/)) {
		type_template = "HTML_STRING";
	}
	else if(str(template)) {
		type_template = "STRING";
	}
	if(type_template == "HTML_STRING" || type_template == "HTML") {
		if(type_template == "HTML") {
			clone = template.cloneNode(true);
			u.rc(clone, "template");
			if(template.nodeName == "LI") {
				type_parent = "ul";
				container = document.createElement(type_parent);
			}
			else if(template.nodeName == "TR") {
				type_parent = "table";
				container = document.createElement("table").appendChild(document.createElement("tbody"));
			}
			else {
				type_parent = "div";
				container = document.createElement("div");
			}
			container.appendChild(clone);
			template_string = container.innerHTML;
			template_string = template_string.replace(/href\=\"([^\"]+)\"/g, function(string) {return decodeURIComponent(string);});
			template_string = template_string.replace(/src\=\"([^\"]+)\"/g, function(string) {return decodeURIComponent(string);});
		}
		else {
			if(template.match(/^<li/i)) {
				type_parent = "ul";
			}
			else if(template.match(/^<tr/i)) {
				type_parent = "table";
			}
			else {
				type_parent = "div";
			}
			template_string = template;
		}
	}
	else if(type_template == "JSON") {
		template_string = JSON.stringify(template).replace(/^{/g, "MAN_JSON_START").replace(/}$/g, "MAN_JSON_END");
	}
	else if(type_template == "JSON_STRING") {
		template_string = template.replace(/^{/g, "MAN_JSON_START").replace(/}$/g, "MAN_JSON_END");
	}
	else if(type_template == "STRING") {
		template_string = template;
	}
	if(obj(json) && ((json.length == undefined && Object.keys(json).length) || json.length)) {
		if(json.length) {
			for(_item in json) {
				if(json.hasOwnProperty(_item)) {
					item_template = template_string;
					string += item_template.replace(/\{(.+?)\}/g, function(string) {
						var key = string.toString().replace(/[\{\}]/g, "");
						if(str(json[_item][key]) && json[_item][key]) {
							return json[_item][key].toString().replace(/(\\|\"|\')/g, "\\$1").replace(/\n/g, "\\n");
						}
						else if(typeof(json[_item][key]) == "number") {
							return "MAN_NUM" + json[_item][key] + "MAN_NUM";
						}
						else if(typeof(json[_item][key]) == "boolean") {
							return "MAN_BOOL" + json[_item][key] + "MAN_BOOL";
						}
						else if(json[_item][key] === null) {
							return "MAN_NULL";
						}
						else if(obj(json[_item][key])) {
							return "MAN_OBJ" + JSON.stringify(json[_item][key]).replace(/(\"|\')/g, "\\$1") + "MAN_OBJ";
						}
						else {
							return "";
						}
					});
				}
			}
		}
		else {
			string += template_string.replace(/\{(.+?)\}/g, function(string) {
				var key = string.toString().replace(/[\{\}]/g, "");
				if(str(json[key]) && json[key]) {
					return json[key].replace(/(\\|\"|\')/g, "\\$1").replace(/\n/g, "\\n");
				}
				else if(typeof(json[key]) == "number") {
					return "MAN_NUM" + json[key] + "MAN_NUM";
				}
				else if(typeof(json[key]) == "boolean") {
					return "MAN_BOOL" + json[key] + "MAN_BOOL";
				}
				else if(json[key] === null) {
					return "MAN_NULL";
				}
				else if(obj(json[key])) {
					return "MAN_OBJ" + JSON.stringify(json[key]).replace(/(\"|\')/g, "\\$1") + "MAN_OBJ";
				}
				else {
					return "";
				}
			});
		}
	}
	if(type_template == "HTML_STRING" || type_template == "HTML") {
		string = string.replace(/MAN_(BOOL|NUM)(.+?(?=MAN_(BOOL|NUM)))MAN_(BOOL|NUM)/g, "$2");
		string = string.replace(/MAN_NULL/g, "");
		string = string.replace(/MAN_OBJ(.+?(?=MAN_OBJ))MAN_OBJ/g, function(string) {
			string = string.replace(/MAN_OBJ(.+?(?=MAN_OBJ))MAN_OBJ/g, "$1");
			return string.replace(/\\(\\|"|')/g, "$1");
		});
		string = string.replace(/\\(\\|"|')/g, "$1");
		if(type_parent == "table") {
			dom = document.createElement("div");
			dom.innerHTML = "<table><tbody>"+string+"</tbody></table>";
			dom = u.qs("tbody", dom);
		}
		else {
			dom = document.createElement(type_parent);
			dom.innerHTML = string;
		}
		if(append_to_node) {
			node_list = [];
			while(dom.childNodes.length) {
				node_list.push(u.ae(append_to_node, dom.childNodes[0]));
			}
			return node_list;
		}
		return dom.childNodes;
	}
	else if(type_template == "JSON_STRING" || type_template == "JSON") {
		string = string.replace(/[\"]?MAN_(BOOL|NUM)(.+?(?=MAN_(BOOL|NUM)))MAN_(BOOL|NUM)[\"]?/g, "$2");
		string = string.replace(/[\"]?MAN_NULL[\"]?/g, "null");
		string = string.replace(/[\"]?MAN_OBJ(.+?(?=MAN_OBJ))MAN_OBJ[\"]?/g, function(string) {
			string = string.replace(/[\"]?MAN_OBJ(.+?(?=MAN_OBJ))MAN_OBJ[\"]?/g, "$1");
			return string.replace(/\\("|')/g, "$1");
		});
		return eval("["+string.replace(/MAN_JSON_START/g, "{").replace(/MAN_JSON_END/g, "},")+"]");
	}
	else if(type_template == "STRING") {
		string = string.replace(/MAN_(BOOL|NUM)(.+?(?=MAN_(BOOL|NUM)))MAN_(BOOL|NUM)/g, "$2");
		string = string.replace(/MAN_NULL/g, "");
		string = string.replace(/MAN_OBJ(.+?(?=MAN_OBJ))MAN_OBJ/g, function(string) {
			string = string.replace(/MAN_OBJ(.+?(?=MAN_OBJ))MAN_OBJ/g, "$1");
			return string.replace(/\\(\\|"|')/g, "$1");
		});
		return string.replace(/\\(\\|"|')/g, "$1");
	}
}
Util.Timer = u.t = new function() {
	this._timers = new Array();
	this.setTimer = function(node, action, timeout, param) {
		var id = this._timers.length;
		param = param != undefined ? param : {"target":node, "type":"timeout"};
		this._timers[id] = {"_a":action, "_n":node, "_p":param, "_t":setTimeout("u.t._executeTimer("+id+")", timeout)};
		return id;
	}
	this.resetTimer = function(id) {
		if(this._timers[id]) {
			clearTimeout(this._timers[id]._t);
			this._timers[id] = false;
		}
	}
	this._executeTimer = function(id) {
		var timer = this._timers[id];
		this._timers[id] = false;
		var node = timer._n;
		if(fun(timer._a)) {
			node._timer_action = timer._a;
			node._timer_action(timer._p);
			node._timer_action = null;
		}
		else if(fun(node[timer._a])) {
			node[timer._a](timer._p);
		}
	}
	this.setInterval = function(node, action, interval, param) {
		var id = this._timers.length;
		param = param ? param : {"target":node, "type":"timeout"};
		this._timers[id] = {"_a":action, "_n":node, "_p":param, "_i":setInterval("u.t._executeInterval("+id+")", interval)};
		return id;
	}
	this.resetInterval = function(id) {
		if(this._timers[id]) {
			clearInterval(this._timers[id]._i);
			this._timers[id] = false;
		}
	}
	this._executeInterval = function(id) {
		var node = this._timers[id]._n;
		if(fun(this._timers[id]._a)) {
			node._interval_action = this._timers[id]._a;
			node._interval_action(this._timers[id]._p);
			node._interval_action = null;
		}
		else if(fun(node[this._timers[id]._a])) {
			node[this._timers[id]._a](this._timers[id]._p);
		}
	}
	this.valid = function(id) {
		return this._timers[id] ? true : false;
	}
	this.resetAllTimers = function() {
		var i, t;
		for(i = 0; i < this._timers.length; i++) {
			if(this._timers[i] && this._timers[i]._t) {
				this.resetTimer(i);
			}
		}
	}
	this.resetAllIntervals = function() {
		var i, t;
		for(i = 0; i < this._timers.length; i++) {
			if(this._timers[i] && this._timers[i]._i) {
				this.resetInterval(i);
			}
		}
	}
}
Util.getVar = function(param, url) {
	var string = url ? url.split("#")[0] : location.search;
	var regexp = new RegExp("(?:^|\b|&|\\?)"+param.replace(/[\[\]\(\)]{1}/g, "\\$&")+"\=([^\&\b]+)");
	var match = string.match(regexp);
	if(match && match.length > 1) {
		return decodeURIComponent(match[1]);
	}
	else {
		return "";
	}
}


/*u-settings-guide.js*/
u.cookies_disallowed = true;
u.gtm_account = 'GTM-MJQCX9L';
u.gapi_key = '';
u.assets = {
	"bg-intro": "/img/guide/smartphone/intro/pi_intro_poster.png",
	"bg-rolemodels": "/img/guide/smartphone/rolemodels/bg.jpg",
	"bg-podcasts": "/img/guide/smartphone/podcasts/bg.jpg",
	"hd-podcasts": "/img/guide/smartphone/podcasts/txt_podcast_circus.png",
	"bn-play-1": "/img/guide/smartphone/podcasts/bn_play_1.png",
	"bn-play-2": "/img/guide/smartphone/podcasts/bn_play_2.png",
	"bn-play-3": "/img/guide/smartphone/podcasts/bn_play_3.png",
	"bn-play-4": "/img/guide/smartphone/podcasts/bn_play_4.png",
	"gx-link-0": "/img/guide/smartphone/podcasts/gx_link_0.png",
	"gx-link-1": "/img/guide/smartphone/podcasts/gx_link_1.png",
	"gx-link-2": "/img/guide/smartphone/podcasts/gx_link_2.png",
	"gx-link-3": "/img/guide/smartphone/podcasts/gx_link_3.png",
	"gx-frame": "/img/guide/smartphone/podcasts/gx_frame.png",
	"bg-events": "/img/guide/smartphone/events/bg.jpg",
	"bg-skillsuniverset": "/img/guide/smartphone/skillsuniverset/bg.jpg",
	"su-circle-1": "/img/guide/smartphone/skillsuniverset/gx_circle_1.png",
	"su-circle-2": "/img/guide/smartphone/skillsuniverset/gx_circle_2.png",
	"su-circle-3": "/img/guide/smartphone/skillsuniverset/gx_circle_3.png",
	"su-circle-4": "/img/guide/smartphone/skillsuniverset/gx_circle_4.png",
	"su-block": "/img/guide/smartphone/skillsuniverset/gx_block.png",
	"su-bn": "/img/guide/smartphone/skillsuniverset/bn_skillsuniverset.svg",
}

/*beta-u-sequence.js*/
u.sequencePlayer = function(node, _options) {
	var player;
	if(node) {
		player = u.ae(node, "div", {"class":"sequenceplayer"});
	}
	else {
		player = document.createElement("div");
		u.ac(player, "sequenceplayer");
	}
	player.node = node;
	player.t_playback = false;
	player._framerate = 12;
	player._loop = false;
	player._direction = 1;
	player._callback_loaded = "loaded";
	player._callback_ended = "ended";
	var classname = false;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "framerate"          : player._framerate         = _options[_argument]; break;
				case "loop"               : player._loop              = _options[_argument]; break;
				case "callback_ended"     : player._callback_ended    = _options[_argument]; break;
				case "callback_loaded"    : player._callback_loaded   = _options[_argument]; break;
				case "direction"          : player._direction         = _options[_argument]; break;
				case "class"              : classname                 = _options[_argument]; break;
			}
		}
	}
	if(classname) {
		u.ac(player, classname);
	}
	player.load = function(images, _options) {
		this._autoplay = false;
		// 
		this.setup(images);
	}
	player.loadAndPlay = function(images, _options) {
		// 
		// 
		this._autoplay = true;
		this.load(images, _options);
	}
	player.play = function(_options) {
		this._from = this.sequence._start;
		this._to = this.sequence._end;
		var _direction = false;
		if(obj(_options)) {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "framerate"		: this._framerate				= _options[argument]; break;
					case "direction"		: _direction					= _options[argument]; break;
					case "to"				: this._to						= _options[argument]; break;
					case "from"				: this._from					= _options[argument]; break;
				}
			}
		}
		if(_direction) {
			this._direction = _direction;
		}
		else if(this._from <= this._to) {
			this._direction = 1;
		}
		else {
			this._direction = -1;
		}
			if(this._direction > 0) {
				var start_z_index = 4000;
				for(i = this.sequence._start; i <= this.sequence._end; i++) {
					if(i == this._from) {
						u.as(this._nodes[i], "display", "block", 1);
					}
					else {
						u.as(this._nodes[i], "display", "none", 1);
					}
					u.as(this._nodes[i], "zIndex", start_z_index-i, 1);
				}
			}
			else {
				var start_z_index = 4000 - this._nodes.length;
				for(i = this.sequence._end; i <= this.sequence._start; i--) {
					if(i == this._from) {
						u.as(this._nodes[i], "display", "block", 1);
					}
					else {
						u.as(this._nodes[i], "display", "none", 1);
					}
					u.as(this._nodes[i], "zIndex", start_z_index+i, 1);
				}
			}
			// 
			// 
			this.offsetHeight;
			this._current_frame = this._from;
		this.playback(true);
	}
	player.playback = function(start) {
			this.nextFrame();
		if(!this._loop && this._to == this._current_frame) {
			if(fun(this[this._callback_ended])) {
				this[this._callback_ended]();
			}
		}
		else {
			this.t_playback = u.t.setTimer(this, this.playback, (1000/this._framerate));
		}
	}
	player.nextFrame = function() {
		var next_frame = this._current_frame + this._direction;
		if(this._direction > 0) {
			next_frame = (next_frame <= this.sequence._end ? next_frame : this.sequence._start);
		}
		else {
			next_frame = (next_frame >= 0 ? next_frame: this.sequence._end);
		}
			u.as(this._nodes[next_frame], "opacity", 1);
		if(this._nodes[this._current_frame]) {
			u.as(this._nodes[this._current_frame], "opacity", 0);
		}
		this._current_frame = next_frame;
	}
	player.prevFrame = function(frame) {
		var after_next = (frame + this._direction);
		var prev = (frame - this._direction);
		if(this._nodes[prev]) {
			u.as(this._nodes[prev], "opacity", 1);
			if(this._nodes[after_next] && (this._direction > 0 ? after_next <= this._to : after_next >= this._to)) {
				u.as(this._nodes[after_next], "opacity", 0);
			}
		}
		else {
			for(i = this._from; i < this._to; i += this._direction) {
				if(i == this._to || i == this._to-this._direction) {
					u.as(this._nodes[i], "display", "block");
				}
				else {
					u.as(this._nodes[i], "display", "none");
				}
			}
		}
	}
	player.first = function() {
		u.as(this._nodes[this._current_frame], "opacity", 0);
		this._current_frame = this.sequence._start;
		u.as(this._nodes[this._current_frame], "opacity", 1);
	}
	player.frame = function(index) {
		u.as(this._nodes[index], "opacity", 1);
		u.as(this._nodes[this._current_frame], "opacity", 0);
		this._current_frame = index;
	}
	player.next = function() {
		if(!this._loop && 
			(
				this._direction > 0 && this._current_frame < this.sequence._end
				||
				this._direction < 0 && this._current_frame > 0
			)
		) {
			this.nextFrame();
		}
		else if(this._loop) {
			this.nextFrame();
		}
	}
	player.prev = function(loop) {
		if(!loop || this._current_frame - this._direction >= this._from) {
			this.prevFrame(this._current_frame);
			this._current_frame = this._current_frame - this._direction;
		}
		else if(loop) {
			this.prevFrame(this._current_frame);
			this._current_frame = this._to;
		}
	}
	player.resume = function() {
		this.t_playback = u.t.setTimer(this, this.playback, (1000/this._framerate));
	}
	player.pause = function() {
		u.t.resetTimer(this.t_playback);
	}
	player.stop = function() {
		u.t.resetTimer(this.t_playback);
	}
	player.setup = function(images) {
		if(this.sequence) {
			this.removeChild(this.sequence);
		}
		this.sequence = u.ie(this, "ul", {"class":"sequence"});
		this.sequence.player = this;
		this._images = images;
		this._nodes = new Array();
		this.sequence._start = 0;
		this.sequence._end = this._images.length-1;
		this._current_frame = 0;
		this._setup = function(queue) {
			var i;
			for(i = 0; i <= this.sequence._end; i++) {
				this._nodes[i] = u.ae(this.sequence, "li", {"style":"background-image: url(" + this._images[i] + ");"});
				u.as(this._nodes[i], "opacity", 0);
			}
			this.offsetHeight;
			if(fun(this[this._callback_loaded])) {
				this[this._callback_loaded]();
			}
			if(this._autoplay) {
			 	this.play();
			}
		}
		u.preloader(this, this._images, {"loaded":"_setup"});
	}
	return player;
}


/*beta-u-viewtracker.js*/
u.viewTracker = function(node, _options) {
	node._view_offset_top = 0;
	node._view_offset_bottom = 0;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "offset_top"       : node._view_offset_top             = _options[_argument]; break;
				case "offset_bottom"    : node._view_offset_bottom          = _options[_argument]; break;
			}
		}
	}
	node._is_visible = function(event) {
		var bounding = this.getBoundingClientRect();
		var top = bounding.top;
		var bottom = bounding.bottom;
		var window_height = (window.innerHeight || document.documentElement.clientHeight);
		if(
			(top  > 0 + this._view_offset_top || bottom > 0 + this._view_offset_top)
			&&
			top < window_height
		) {
			if(fun(this.isVisible)) {
				this.isVisible({top: top, bottom: window_height - bottom, event:event});
			}
		}
		else {
			if(fun(this.isHidden)) {
				this.isHidden();
			}
		}
	}
	u.e.addWindowEvent(node, "scroll", node._is_visible);
}

/*beta-u-columns.js*/
u.columns = function(node, _columns, insert) {
	var current_node = node;
	insert = insert || false;
	if(!node._tree) {
		if(insert) {
			node._tree = u.ie(node, "div", {
				"class":"c"
			})
		}
		else {
			node._tree = u.ae(node, "div", {
				"class":"c"
			})
		}
		node._tree.node = node;
		current_node = node._tree;
	}
	var _column, div_column, column, i, key, value, j;
	for(j = 0; j < _columns.length; j++) {
		_column = _columns[j];
		if(typeof(_column) === "object") {
			key = Object.keys(_column)[0];
			value = _column[key];
			div_column = u.ae(current_node, "div", {
				"class":key
			});
			div_column._tree = node._tree;
			u.columns(div_column, value);
		}
		else {
			var target = u.qs(_column, node._tree.node);
			if(target) {
				div_column = u.ae(current_node, target);
				div_column._tree = node._tree;
			}
		}
	}
}


/*m-page.js*/
Util.Modules["page"] = new function() {
	this.init = function(page) {
		page.js_rev = 8;
		page.hN = u.qs("#header");
		page.hN.service = u.qs("ul.servicenavigation", page.hN);
		page.cN = u.qs("#content", page);
		page.nN = u.qs("#navigation", page);
		page.nN = u.ie(page.hN, page.nN);
		page.fN = u.qs("#footer");
		page.fN.service = u.qs("ul.servicenavigation", page.fN);
		page.resized = function() {
			this.browser_h = u.browserH();
			this.browser_w = u.browserW();
			if(this.scene && typeof(this.scene.resized) == "function") {
				this.scene.resized();
			}
		}
		page.scrolled = function() {
			if(this.scene && typeof(this.scene.scrolled) == "function") {
				this.scene.scrolled();
			}
		}
		page.ready = function() {
			if(!this.is_ready) {
				u.rc(this, "i:page");
				this.is_ready = true;
				u.ac(page, "loading");
				var cookies = u.getCookie(page.getAttribute("data-cookie-consent"));
				if(cookies) {
					u.cookies_disallowed = false;
					u.includeGoogleTagManager();
				}
				else {
					this.showCookieConsent();
				}
				this.data = JSON.parse(u.getCookie("data")) || {};
				u.e.addWindowEvent(this, "resize", this.resized);
				u.e.addWindowEvent(this, "scroll", this.scrolled);
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
		page.ready();
	}
}
u.e.addDOMReadyEvent(u.init);


/*m-front.js*/
Util.Modules["front"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
			var i, node;
			if(this.loading) {
				u.ass(this.loading, {
					"height": page.browser_h + "px",
				});
			}
			if(u.segment() === "desktop" || u.segment() === "desktop_guide") {
				if(this.div_intro) {
				}
				if(this.div_rolemodels && this.rolemodels) {
				}
				if(this.div_podcasts) {
					if(this.edge_podcast) {
						if(u.hc(this.div_podcasts, "collapsed")) {
							u.ass(this.div_podcasts, {
								"height": (u.absY(this.edge_podcast) - u.absY(this.div_podcasts)) + (this.edge_podcast.offsetHeight / 2) + "px"
							});
						}
						else {
							u.ass(this.div_podcasts, {
								"height": (u.absY(this.last_podcasts) - u.absY(this.div_podcasts)) + (this.last_podcasts.offsetHeight) + 100 + "px"
							});
						}
					}
				}
				if(this.div_events) {
				}
			}
			else {
				if(this.div_intro) {
				}
				if(this.div_rolemodels && this.rolemodels) {
					for(i = 0; i < this.rolemodels.length; i++) {
						node = this.rolemodels[i];
						u.ass(node.div_profile, {
							"height": (((page.browser_w - 70) / 4) * 5) + "px",
						});
						u.ass(node.story, {
							"height": window.innerHeight + "px",
						});
					}
				}
				if(this.div_podcasts) {
					if(this.edge_podcast) {
						if(u.hc(this.div_podcasts, "collapsed")) {
							u.ass(this.div_podcasts, {
								"height": (u.absY(this.edge_podcast) - u.absY(this.div_podcasts)) + (this.edge_podcast.offsetHeight / 2) + "px"
							});
						}
						else {
							u.ass(this.div_podcasts, {
								"height": (u.absY(this.last_podcasts) - u.absY(this.div_podcasts)) + (this.last_podcasts.offsetHeight) + 100 + "px"
							});
						}
					}
				}
				if(this.div_events) {
					u.ass(this.ul_events, {
						"height": (((page.browser_w - 50) / 4) * 5) + "px",
						"width": ((page.browser_w - 50) * this.events.length) + "px"
					});
					for(i = 0; i < this.events.length; i++) {
						node = this.events[i];
						u.ass(node, {
							"width": (page.browser_w - 70) + "px",
						});
					}
				}
			}
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			this.loading = u.ae(page, "div", {
				"class":"loading"
			});
			var images = [];
			var i, node;
			this.div_intro = u.qs("div.intro", this);
			if(this.div_intro) {
				images.push(u.assets["bg-intro"]);
			}
			this.div_statement = u.qs("div.statement", this);
			if(this.div_statement) {
				if(u.segment() === "desktop_guide" || u.segment() === "desktop") {
					images.push("/img/guide/desktop/txt_statement.png");
				}
			}
			this.div_rolemodels = u.qs("div.rolemodels", this);
			if(this.div_rolemodels) {
				images.push(u.assets["bg-rolemodels"]);
				this.div_rolemodels.h2 = u.qs("h2", this.div_rolemodels);
				this.div_rolemodels.h2_offset = u.ae(this.div_rolemodels, "h2", {"class":"offset", "html":this.div_rolemodels.h2.innerHTML});
				this.rolemodels = u.qsa("li.rolemodel", this.div_rolemodels);
				if(this.rolemodels.length) {
					for(i = 0; i < this.rolemodels.length; i++) {
						node = this.rolemodels[i];
						node.div = this;
						node.rolemodel = node.getAttribute("data-rolemodel");
						this["div_rolemodel_"+node.rolemodel] = node;
						node.thumb_src = node.getAttribute("data-thumb-src");
						node.poster_src = node.getAttribute("data-poster-src");
						node.video_src = node.getAttribute("data-video-src");
						node.div_profile = u.qs("div.profile", node);
						node.div_profile.node = node;
						node.div_image = u.qs("div.image", node);
						node.h3 = u.qs("h3", node);
						node.div_shadow = u.ae(node.div_profile, "div", {"class":"shadow"});
						node.story = u.qs("div.story", node);
						node.story.node = node;
						node.story.div_image = u.qs("div.image", node.story);
						node.story.ul_chapters = u.qs("ul.chapters", node.story);
						node.story.links = node.story.ul_chapters.getAttribute("data-links-json");
						if(node.story.links) {
							node.story.links = JSON.parse(atob(node.story.links));
						}
						node.story.chapters = u.qsa("li.chapter", node.story);
						images.push(node.thumb_src);
						images.push(node.poster_src);
					}
				}
			}
			this.div_podcasts = u.qs("div.podcasts", this);
			if(this.div_podcasts) {
				this.div_podcasts.div = this;
				images.push(u.assets["bg-podcasts"]);
				images.push(u.assets["gx-link-0"]);
				images.push(u.assets["gx-link-1"]);
				images.push(u.assets["gx-link-2"]);
				images.push(u.assets["gx-link-3"]);
				images.push(u.assets["gx-frame"]);
				this.podcast_intro = u.qs("div.intro", this.div_podcasts);
				this.podcast_headline = u.qs("h2", this.div_podcasts);
				this.podcast_headline = u.qs("h2", this.div_podcasts);
				this.podcast_headline_offset = u.ae(this.div_podcasts, "h2", {"class":"offset", "html":this.podcast_headline.innerHTML});
				this.podcast_featured = u.qs("div.podcast.featured", this.div_podcasts);
				this.podcast_featured.h3 = u.qs("h3", this.podcast_featured);
				this.podcast_featured.h3.node = this.podcast_featured;
				this.podcast_featured.bn_play = u.qs("ul.actions a", this.podcast_featured);
				this.podcast_featured.bn_play.node = this.podcast_featured;
				this.podcast_featured.div_platforms = u.qs("div.platforms", this.podcast_featured);
				this.podcast_featured.platforms = u.qsa("li", this.podcast_featured.div_platforms);
				this.podcast_featured.div_image = u.qs("div.image", this.podcast_featured);
				this.podcast_featured.image_src = this.podcast_featured.div_image.getAttribute("data-image-src");
				this.podcast_featured.video_src = this.podcast_featured.div_image.getAttribute("data-video-src");
				images.push(this.podcast_featured.image_src);
				this.podcasts = u.qsa("li.podcast", this.div_podcasts);
				for(i = 0; i < this.podcasts.length; i++) {
					node = this.podcasts[i];
					node.h3 = u.qs("h3", node);
					node.bn_play = u.qs("ul.actions a", node);
					node.bn_play.node = node;
					node.div_platforms = u.qs("div.platforms", node);
					node.platforms = u.qsa("li", node.div_platforms);
					node.div_image = u.qs("div.image", node);
					node.image_src = node.div_image.getAttribute("data-image-src");
					images.push(node.image_src);
				}
				if(u.segment() === "desktop" || u.segment() === "desktop_guide") {
					u.columns(this.div_podcasts, [
						{"c1": [
							"h2",
							"h2.offset",
							"div.intro",
						]},
						{"c2": [
							"div.featured",
							"ul.podcasts"
						]}
					]);
				}
			}
			this.div_events = u.qs("div.events", this);
			if(this.div_events) {
				this.div_events.h2 = u.qs("h2", this.div_events);
				this.div_events.h2_offset = u.ae(this.div_events, "h2", {"class":"offset", "html":this.div_events.h2.innerHTML});
				images.push(u.assets["bg-events"]);
				this.ul_events = u.qs("ul.events", this.div_events);
				this.ul_events.div = this;
				this.events = u.qsa("li.event", this.div_events);
				if(this.events) {
					for(i = 0; i < this.events.length; i++) {
						node = this.events[i];
						node.div = this;
						node.h3 = u.qs("h3", node);
						node.p = u.qs("p", node);
						node.dl_info_date = u.qs("dl.info.date", node);
						node.dl_info_time = u.qs("dl.info.time", node);
						node.bn_readmore = u.qs("li.readmore", node);
						node.div_image = u.qs("div.image", node);
						node.image_src = node.div_image.getAttribute("data-image-src");
						images.push(node.image_src);
					}
				}
			}
			this.div_skillsuniverset = u.qs("div.skillsuniverset", this);
			if(this.div_skillsuniverset) {
				this.h2_skillsuniverset = u.qs("h2", this.div_skillsuniverset);
				this.h2_skillsuniverset.h2_offset = u.ae(this.div_skillsuniverset, "h2", {"class":"offset", "html":this.h2_skillsuniverset.innerHTML});
				this.p_skillsuniverset = u.qs("p", this.div_skillsuniverset);
				this.bn_skillsuniverset = u.qs("ul.actions li", this.div_skillsuniverset);
				this.bn_skillsuniverset.a = u.qs("a", this.bn_skillsuniverset);
				u.ce(this.bn_skillsuniverset.a, {"type":"link"});
				this.bn_skillsuniverset.a_offset = u.ae(this.bn_skillsuniverset.a, "span", {"class":"offset", "html":this.bn_skillsuniverset.a.innerHTML});
				images.push(u.assets["bg-skillsuniverset"]);
				images.push(u.assets["su-circle-1"]);
				images.push(u.assets["su-circle-2"]);
				images.push(u.assets["su-circle-3"]);
				images.push(u.assets["su-circle-4"]);
				this.div_skillsuniverset.intro_images = [
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216018.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216020.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216022.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216024.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216026.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216028.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216030.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216032.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216034.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216036.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216038.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216040.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216042.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216044.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216046.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216048.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216050.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216052.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216054.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216056.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216058.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216060.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216062.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216064.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216066.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216068.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216070.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216072.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216074.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216076.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216078.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216080.jpg",
					"/img/guide/smartphone/skillsuniverset/Tiny-Planet-v1_00216082.jpg",
				];
				for(i = 0; i < this.div_skillsuniverset.intro_images.length; i++) {
					images.push(this.div_skillsuniverset.intro_images[i]);
				}
				if(u.segment() === "desktop" || u.segment() === "desktop_guide") {
					u.columns(this.div_skillsuniverset, [
						{"c1": [
							"ul.actions",
						]},
						{"c2": [
							"h2",
							"h2.offset",
							"div.smartphone",
							"div.desktop"
						]}
					]);
				}
			}
			this.div_instagram = u.qs("div.instagram", this);
			if(this.div_instagram) {
				this.div_instagram.h2 = u.qs("h2", this.div_instagram);
				this.div_instagram.h2_offset = u.ae(this.div_instagram, "h2", {"class":"offset", "html":this.div_instagram.h2.innerHTML});
				this.instagram_posts = u.qsa("li.post", this.div_instagram);
				if(this.instagram_posts.length) {
					for(i = 0; i < this.instagram_posts.length; i++) {
						images.push("/img/guide/smartphone/instagram/pi_instagram_"+i+".jpg");
					}
				}
				if(u.segment() === "desktop" || u.segment() === "desktop_guide") {
					u.columns(this.div_instagram, [
						{"c1": [
							"h2",
							"h2.offset",
							"ul.actions",
						]},
						{"c2": [
							"ul.instagram"
						]}
					]);
				}
			}
			if(u.segment() === "desktop" || u.segment() === "desktop_guide") {
				this.ul_navigation = u.ae(page.nN, "ul", {"class":"navigation"});
				var li_nav_rolemodels = u.ae(this.ul_navigation, "li", {"class":"rolemodels", "html":"Stories"});
				u.ce(li_nav_rolemodels).clicked = function() {
					u.scrollTo(window, {node:page.scene.div_rolemodels});
				}
				var li_nav_podcasts = u.ae(this.ul_navigation, "li", {"class":"podcasts", "html":"Podcasts"});
				u.ce(li_nav_podcasts).clicked = function() {
					u.scrollTo(window, {node:page.scene.div_podcasts});
				}
				var li_nav_events = u.ae(this.ul_navigation, "li", {"class":"events", "html":"Events"});
				u.ce(li_nav_events).clicked = function() {
					u.scrollTo(window, {node:page.scene.div_events});
				}
				var li_nav_skillsuniverset = u.ae(this.ul_navigation, "li", {"class":"skillsuniverset", "html":"Skillsuniverset"});
				u.ce(li_nav_skillsuniverset).clicked = function() {
					u.scrollTo(window, {node:page.scene.div_skillsuniverset});
				}
			}
			page.resized();
			this.loaded = function() {
				this.loading.transitioned = function() {
					u.rc(page, "loading");
					page.removeChild(page.scene.loading);
					delete page.scene.loading;
				}
				u.ass(this.loading, {
					"transition":"all 0.3s ease-in-out",
					"opacity": 0,
				});
				this.build();
				page.scrolled();
			}
			u.preloader(this, images);
		}
		scene.build = function() {
			var i, node;
			if(this.div_intro) {
				u.viewTracker(this.div_intro);
				this.div_intro.isVisible = function(position) {
					if(position.top < (page.browser_h * 0.5) && position.bottom < (page.browser_h * 0.5)) {
						page.updateUrl("");
						if(!this.is_playing) {
							this.video_player.play();
							this.is_playing = true;
						}
					}
					else {
						this.video_player.pause();
						this.is_playing = false;
					}
				}
				u.ass(this.div_intro, {
					"background-image":"url("+u.assets["bg-intro"]+")",
				});
				this.div_intro.video_player = u.videoPlayer({muted:true, loop:true, playsinline:true});
				this.div_intro.video_player.ready = function() {
					u.ae(page.scene.div_intro, this);
					if(u.segment() === "smartphone" || u.segment() === "smartphone_guide") {
						this.loadAndPlay("/img/guide/smartphone/intro/intro.mp4");
					}
					else {
						this.loadAndPlay("/img/guide/desktop/intro/intro.mp4");
					}
				}
			}
			this.div_statement = u.qs("div.statement", this);
			if(this.div_statement) {
				if(u.segment() === "desktop_guide" || u.segment() === "desktop") {
					u.ae(this.div_statement, "img", {src: "/img/guide/desktop/txt_statement.png"});
				}
			}
			if(this.div_rolemodels && this.rolemodels) {
				u.ass(this.div_rolemodels, {
					"background-image": "url("+u.assets["bg-rolemodels"]+")"
				});
				for(i = 0; i < this.rolemodels.length; i++) {
					node = this.rolemodels[i];
					u.ass(node.div_profile, {
						"background-image":"url("+node.poster_src+")",
					});
					u.ass(node.div_image, {
						"background-image":"url("+node.thumb_src+")",
					});
					node.div_frame = u.ae(node.div_profile, "div", {"class":"frame"});
					u.ass(node.div_frame, {
						"background-image":"url("+u.assets["su-circle-"+(i+1)]+")",
					});
					node.video_player = u.videoPlayer({
						playsinline:true,
						preload: "metadata",
						muted: true,
						loop: true
					});
					node.video_player.node = node;
					u.ae(node.div_profile, node.video_player);
					node.video_player.load(node.video_src);
					if(u.segment() === "smartphone" || u.segment() === "smartphone_guide") {
						u.viewTracker(node);
						node.isVisible = function(position) {
							if(position.top < (page.browser_h / 2) && position.bottom < page.browser_h / 2) {
								if(!this.is_playing) {
									this.is_playing = true;
									this.video_player.play();
								}
							}
							else if(this.is_playing) {
								this.is_playing = false;
								this.video_player.pause();
							}
							if(position.top < (page.browser_h * 0.5) && position.bottom < (page.browser_h * 0.5)) {
								page.updateUrl("rolemodels/"+this.rolemodel);
							}
						}
					}
					else {
						u.viewTracker(node);
						node.isVisible = function(position) {
							if(position.top < (page.browser_h * 0.5) && position.bottom < (page.browser_h * 0.5)) {
								page.updateUrl("rolemodels");
							}
						}
						u.e.hover(node);
						node.over = function() {
							if(!this.is_playing) {
								this.is_playing = true;
								this.video_player.play();
							}
						}
						node.out = function() {
							if(this.is_playing) {
								this.is_playing = false;
								this.video_player.pause();
							}
						}
					}
					u.ass(node.story.div_image, {
						"background-image":"url("+node.thumb_src+")",
					});
					node.story.video_player = u.videoPlayer({
						preload: "metadata",
					});
					node.story.video_player.node = node;
					u.ae(node.story, node.story.video_player);
					node.story.video_player.ended = function() {
						var next_chapter = u.ns(this.node.current_chapter);
						if(next_chapter) {
							this.node.playStory(next_chapter);
						}
					}
					node.story.video_player.timeupdate = function(event) {
						u.ass(this.node.current_chapter.div_progress_bar, {
							"width": this.currentTime/this.duration * 100 + "%",
						});
					}
					node.playStory = function(chapter) {
						if(this.current_chapter) {
							u.rc(this.current_chapter, "playing");
							u.ass(this.current_chapter.div_progress_bar, {
								"width":"0",
							});
						}
						var i, li, found = false;
						for(i = 0; i < this.story.chapters.length; i++) {
							li = this.story.chapters[i];
							if(found) {
								u.rc(li, "played");
							}
							else if(li !== chapter) {
								u.ac(li, "played");
							}
							else {
								u.rc(li, "played");
								found = true;
							}
						}
						var link;
						for(i = 0; i < this.story.dynlinks.length; i++) {
							link = this.story.dynlinks[i];
							if(link.chapter == chapter) {
								u.ass(link, {
									"display":"block"
								});
							}
							else {
								u.ass(link, {
									"display":"none"
								});
							}
						}
						u.ac(chapter, "playing");
						page.updateUrl("rolemodels/"+this.rolemodel+"/"+chapter.index);
						this.story.video_player.loadAndPlay(chapter.video_src);
						this.current_chapter = chapter
					}
					node.story.bn_close = u.ae(node.story, "div", {"class":"close"});
					node.story.bn_close.node = node;
					u.ce(node.story.bn_close);
					node.story.bn_close.inputStarted = function(event) {
						u.e.kill(event);
					}
					node.story.bn_close.clicked = function(){
						this.node.closeStory();
					}
					node.story.bn_mute = u.ae(node.story, "div", {"class":"mute"});
					node.story.bn_mute.node = node;
					u.ce(node.story.bn_mute);
					node.story.bn_mute.inputStarted = function(event) {
						u.e.kill(event);
					}
					node.story.bn_mute.clicked = function(){
						if(this.node.story.video_player._muted) {
							u.rc(this, "selected");
							this.node.story.video_player.unmute();
							this.node.story.video_player._muted = false;
						}
						else {
							u.ac(this, "selected");
							this.node.story.video_player.mute();
							this.node.story.video_player._muted = true;
						}
					}
					node.story.bn_share = u.ae(node.story, "div", {"class":"share"});
					node.story.bn_share.node = node;
					u.ce(node.story.bn_share);
					node.story.bn_share.inputStarted = function(event) {
						u.e.kill(event);
					}
					node.story.bn_share.clicked = function(event){
						window.share_data = {
						  title: this.node.rolemodel + ", Rollemodel",
						  text: "Skillsguiden",
						  url: location.href
						}
						window.share_node = this;
						if(navigator.canShare) {
							navigator.share(window.share_data).then(function() {}, function() {});
						}
						else {
							navigator.clipboard.writeText(window.share_data.url).then(function() {
								window.linkCopied();
							}, function(err) {
								window.linkCopyFailed();
							});
						}
					}
					window.linkCopied = function() {
						var copied = u.ae(window.share_node, "div", {"class": "copied", "html": "Linket er kopieret"});
						u.t.setTimer(copied, function() {u.ass(this, {transition: "all 0.5s ease-in-out", "opacity": 0})}, 1500);
					}
					window.linkCopyFailed = function() {
						var copied = u.ae(window.share_node, "div", {"class": "copied", "html": "Deling er ikke understøttet i din browser"});
						u.t.setTimer(copied, function() {u.ass(this, {transition: "all 0.5s ease-in-out", "opacity": 0})}, 1500);
					}
					u.e.click(node.story);
					node.story.clicked = function(event) {
						u.t.resetTimer(this.t_hold);
						if(this.hold_to_pause) {
							this.node.story.video_player.play();
							this.hold_to_pause = false;
						}
						else {
							var event_x = u.eventX(event);
							if(event_x < this.offsetWidth / 2) {
								this.swipedRight();
							}
							else {
								this.swipedLeft();
							}
						}
					}
					node.story.inputStarted = function(event) {
						this.t_hold = u.t.setTimer(this, function(){this.hold_to_pause = true; this.node.story.video_player.pause()}, 200);
					}
					u.e.swipe(node.story, node.story);
					node.story.swipedLeft = function() {
						var next_chapter = u.ns(this.node.current_chapter);
						if(next_chapter) {
							this.node.playStory(next_chapter);
						}
					}
					node.story.swipedRight = function() {
						var prev_chapter = u.ps(this.node.current_chapter);
						if(prev_chapter) {
							this.node.playStory(prev_chapter);
						}
					}
					node.story.swipedUp = node.story.swipedDown = function() {
						this.node.closeStory();
					}
					node.closeStory = function() {
						this.story.transitioned = function() {
							u.ass(this, {
								"display":"none"
							});
						}
						this.story.video_player.stop();
						page.updateUrl("rolemodels/"+this.rolemodel);
						u.ass(this.story, {
							"transition":"all 0.2s ease-in-out",
							"opacity": 0
						});
						u.ass(document.body, {
							"overflow":"visible"
						});
					}
					node.openStory = function(chapter) {
						chapter = chapter || this.story.chapters[0];
						u.ass(document.body, {
							"overflow":"hidden"
						});
						u.ass(this.story, {
							opacity: 0,
							display: "block",
							height: window.innerHeight+"px",
						});
						u.ass(this.story, {
							transition: "all 0.4s ease-in-out",
							opacity: 1,
						});
						this.playStory(chapter);
					}
					var j, li;
					for(j = 0; j < node.story.chapters.length; j++) {
						li = node.story.chapters[j];
						li.node = node;
						li.index = j+1;
						li.video_src = li.getAttribute("data-video-src");
						li.div_bar = u.ae(li, "div", {"class":"bar"});
						li.div_progress_bar = u.ae(li.div_bar, "div", {"class":"progress_bar"});
						if(node.story.links && node.story.links[j]) {
							li.links = [];
							var k, link, dynlink, links = node.story.links[j];
							for(k = 0; k < links.length; k++) {
								link = links[k];
								dynlink = u.ae(node.story.video_player, "a", {
									"class": "dynlink", 
									"html": link.text, 
									"href": link.href,
									"id": "story_link_"+node.rolemodel+"_"+u.superNormalize(link.text),
								});
								u.ass(dynlink, {
									"top": (link.y ? link.y : "20%"),
									"left": (link.x ? link.x : "20%"),
									"max_width": (link.max_width ? "max-width:"+link.max_width : "auto"),
									"color": (link.color ? link.color : "#283583"),
									"background-color": (link.background ? link.background : "#ffffff")
								});
								dynlink.chapter = li;
								u.ce(dynlink);
								dynlink.clicked = function(event) {
									u.e.kill(event);
									location.href = this.url;
								}
							} 
						}
						u.ce(li);
						li.inputStarted = function(event) {
							u.e.kill(event);
						}
						li.clicked = function() {
							this.node.playStory(this);
						}
					}
					node.story.dynlinks = u.qsa("a.dynlink", node.story.video_player);
					node.story.ul_profiles = u.ae(node.story, "ul", {"class":"profiles"});
					for(j = 0; j < this.rolemodels.length; j++) {
						li = u.ae(node.story.ul_profiles, "li", {"class":"profile"});
						li.node = node;
						li.rolemodel = this.rolemodels[j];
						li.div_image = u.ae(li, "div", {"class":"image"});
						u.ass(li.div_image, {
							"background-image":"url("+this.rolemodels[j].thumb_src+")",
						});
						if(node.rolemodel === li.rolemodel.rolemodel) {
							u.ac(li, "selected");
						}
						else {
							li.div_frame = u.ae(li, "div", {"class":"frame"});
							u.ass(li.div_frame, {
								"background-image":"url("+u.assets["su-circle-"+(j+1)]+")",
							});
							u.ce(li);
							li.clicked = function() {
								this.node.closeStory()
								this.rolemodel.openStory();
								u.bug("change profile", this.rolemodel.rolemodel)
							}
						}
					}
					u.e.click(node.div_profile);
					node.div_profile.clicked = function() {
						this.node.openStory();
					}
				}
			}
			if(this.div_podcasts) {
				u.viewTracker(this.div_podcasts);
				this.div_podcasts.isVisible = function(position) {
					if(position.top < (page.browser_h * 0.5) && position.bottom < (page.browser_h * 0.5)) {
						page.updateUrl("podcasts");
					}
				}
				u.ass(this.div_podcasts, {
					"background-image": "url("+u.assets["bg-podcasts"]+")",
				});
				u.ass(this.podcast_featured.h3, {
					"background-image": "url("+u.assets["gx-link-0"]+")",
				});
				u.ass(this.podcast_featured.div_image, {
					"background-image": "url("+this.podcast_featured.image_src+")",
				});
				u.ce(this.podcast_featured.h3);
				this.podcast_featured.h3.clicked = function() {
					this.node.bn_play.clicked();
				}
				u.ce(this.podcast_featured.bn_play);
				this.podcast_featured.bn_play.clicked = function() {
					u.ac(this.node.div_platforms, "open");
					u.ass(this.node.div_platforms, {
						"height": window.innerHeight+"px",
					});
					u.ass(document.body, {
						"overflow":"hidden",
					});
				}
				u.ce(this.podcast_featured.div_platforms);
				this.podcast_featured.div_platforms.clicked = function() {
					u.rc(this, "open");
					u.ass(document.body, {
						"overflow":"visible",
					});
				}
				for(i = 0; i < this.podcast_featured.platforms.length; i++) {
					u.ce(this.podcast_featured.platforms[i], {"type":"link"});
				}
				this.podcast_featured.bn_play_sequence_player = u.sequencePlayer(this.podcast_featured.bn_play, {"loop":true, "framerate": 10});
				this.podcast_featured.bn_play_sequence_player.loaded = function() {
					this.first();
				}
				this.podcast_featured.bn_play_sequence_player.load([
					u.assets["bn-play-1"],
					u.assets["bn-play-2"],
					u.assets["bn-play-3"],
					u.assets["bn-play-4"],
				]);
				u.viewTracker(this.podcast_featured);
				this.podcast_featured.isVisible = function(position) {
					if(position.top > 0 && position.bottom > 0) {
						if(!this.is_playing) {
							this.video_player.play();
							this.is_playing = true;
						}
					}
					else {
						this.video_player.pause();
						this.is_playing = false;
					}
				}
				this.podcast_featured.video_player = u.videoPlayer({muted:true, loop:true, playsinline:true});
				this.podcast_featured.video_player.node = this.podcast_featured;
				this.podcast_featured.video_player.ready = function() {
					u.ae(this.node.div_image, this);
					this.load(this.node.video_src);
				}
				this.podcast_featured.bn_mute = u.ae(this.podcast_featured.div_image, "div", {"class":"mute selected"});
				this.podcast_featured.bn_mute.node = this.podcast_featured;
				u.ce(this.podcast_featured.bn_mute);
				this.podcast_featured.bn_mute.clicked = function(){
					if(this.node.video_player._muted) {
						u.rc(this, "selected");
						this.node.video_player.unmute();
						this.node.video_player._muted = false;
					}
					else {
						u.ac(this, "selected");
						this.node.video_player.mute();
						this.node.video_player._muted = true;
					}
				}
				if(this.podcasts) {
					for(i = 0; i < this.podcasts.length; i++) {
						node = this.podcasts[i];
						u.ass(node, {
							"background-image": "url("+u.assets["gx-link-"+(((i+1)%3) ? ((i+1)%3) : 3)]+")",
						});
						node.div_frame = u.ae(node, "div", {"class":"frame"});
						u.ass(node.div_frame, {
							"background-image": "url("+u.assets["gx-frame"]+")",
						});
						u.ass(node.div_image, {
							"background-image": "url("+node.image_src+")",
						});
						u.ce(node);
						node.clicked = function() {
							u.ac(this.div_platforms, "open");
							u.ass(this.div_platforms, {
								"height": window.innerHeight+"px",
							});
							u.ass(document.body, {
								"overflow":"hidden",
							});
						}
						u.ce(node.div_platforms);
						node.div_platforms.clicked = function() {
							u.rc(this, "open");
							u.ass(document.body, {
								"overflow":"visible",
							});
						}
						var j;
						for(j = 0; j < node.platforms.length; j++) {
							u.ce(node.platforms[j], {"type":"link"});
						}
						node.bn_play_sequence_player = u.sequencePlayer(node.bn_play, {"loop":true, "framerate": 10});
						node.bn_play_sequence_player.node = node;
						node.bn_play_sequence_player.loaded = function() {
							this.first();
						}
						node.bn_play_sequence_player.load([
							u.assets["bn-play-1"],
							u.assets["bn-play-2"],
							u.assets["bn-play-3"],
							u.assets["bn-play-4"],
						]);
					}
					if(u.segment() === "desktop" || u.segment() === "desktop_guide") {
						var edge_count = 2;
					}
					else {
						var edge_count = 3;
					}
					if(this.podcasts.length > edge_count) {
						this.edge_podcast = this.podcasts[edge_count-1];
						this.last_podcasts = this.podcasts[this.podcasts.length-1];
						u.ac(this.div_podcasts, "collapsed");
						u.ass(this.div_podcasts, {
							"height": (u.absY(this.edge_podcast) - u.absY(this.div_podcasts)) + (this.edge_podcast.offsetHeight / 2) + "px"
						});
						this.div_podcasts.bn_expand = u.ae(this.div_podcasts, "div", {"class":"expand"});
						this.div_podcasts.bn_expand.icon = u.ae(this.div_podcasts.bn_expand, "div", {"class":"icon"});
						this.div_podcasts.bn_expand.div = this;
						u.ce(this.div_podcasts.bn_expand);
						this.div_podcasts.bn_expand.clicked = function(event) {
							if(u.hc(this.div.div_podcasts, "collapsed")) {
								// 	
								// 	
								// 	
								u.ass(this.div.div_podcasts, {
									"transition": "all 0.4s ease-in-out",
									"height": (u.absY(this.div.last_podcasts) - u.absY(this.div.div_podcasts)) + (this.div.last_podcasts.offsetHeight) + 100 + "px"
								});
								u.rc(this.div.div_podcasts, "collapsed");
							}
							else {
								u.ass(this.div.div_podcasts, {
									"transition": "all 0.4s ease-in-out",
									"height": (u.absY(this.div.edge_podcast) - u.absY(this.div.div_podcasts)) + (this.div.edge_podcast.offsetHeight / 2) + "px"
								});
								u.ac(this.div.div_podcasts, "collapsed");
							}
						}
					}
				}
			}
			if(this.div_events) {
				u.viewTracker(this.div_events);
				this.div_events.isVisible = function(position) {
					if(position.top < (page.browser_h * 0.5) && position.bottom < (page.browser_h * 0.5)) {
						page.updateUrl("events");
					}
				}
				u.ass(this.div_events, {
					"background-image": "url("+u.assets["bg-events"]+")"
				});
				if(this.events) {
					// 			
					// 			
					// 	
					// 	
					// 	
					// 	
					if(u.segment() === "smartphone" || u.segment() === "smartphone_guide") {
						this.ul_events.current_event = 0;
						u.e.swipe(this.ul_events, this.ul_events, {"horizontal_lock":true});
						this.ul_events.inputStarted = function(event) {
							u.e.kill(event);
							u.t.resetTimer(this.t_auto_rotation);
						}
						this.ul_events.moved = function(event) {
							u.ass(this, {
								"transform": "translate("+(this.current_x -((page.browser_w - 50) * this.current_event)) +"px, 0)"
							});
						}
						this.ul_events.swipedLeft = function() {
							if(this.current_event + 1 >= this.div.events.length) {
								this.current_event = 0;
								u.ass(this, {
									"transition":"all 0.2s ease-in-out",
									"transform": "translate("+(-((page.browser_w - 50) * this.current_event))+"px, 0)"
								});
							}
							else {
								this.current_event++;
								u.ass(this, {
									"transition":"all 0.2s ease-in-out",
									"transform": "translate("+(-((page.browser_w - 50) * this.current_event))+"px, 0)"
								});
							}
						}
						this.ul_events.swipedRight = function() {
							if(this.current_event - 1 < 0) {
								this.current_event = this.div.events.length-1;
								u.ass(this, {
									"transition":"all 0.3s ease-in-out",
									"transform": "translate("+(-((page.browser_w - 50) * this.current_event))+"px, 0)"
								});
							}
							else {
								this.current_event--;
								u.ass(this, {
									"transition":"all 0.2s ease-in-out",
									"transform": "translate("+(-((page.browser_w - 50) * this.current_event))+"px, 0)"
								});
							}
						}
						this.ul_events.auto_rotation = function() {
							u.t.resetTimer(this.t_auto_rotation);
							this.t_auto_rotation = u.t.setTimer(this, function() {this.swipedLeft(); this.auto_rotation()}, 4000);
						}
						u.e.addEndEvent(this.ul_events, this.ul_events.auto_rotation);
						this.ul_events.auto_rotation();
					}
					for(i = 0; i < this.events.length; i++) {
						node = this.events[i];
						if(u.segment() === "smartphone" || u.segment() === "smartphone_guide") {
							u.ce(node.bn_readmore, {"type":"link"});
						}
						u.ass(node.div_image, {
							"background-image": "url("+node.image_src+")",
						});
						u.ae(node.div_image, "div", {"class":"coloroverlay"});
					}
				}
			}
			if(this.div_skillsuniverset) {
				u.viewTracker(this.div_skillsuniverset);
				this.div_skillsuniverset.isVisible = function(position) {
					if(position.top < (page.browser_h * 0.5) && position.bottom < (page.browser_h * 0.5)) {
						page.updateUrl("skillsuniverset");
					}
				}
				u.ass(this.div_skillsuniverset, {
					"background-image": "url("+u.assets["bg-skillsuniverset"]+")"
				});
				u.ce(this.bn_skillsuniverset);
				this.bn_skillsuniverset.gx_frame_sequence_player = u.sequencePlayer(this.bn_skillsuniverset, {"loop":true, "framerate": 10, "class":"frame"});
				this.bn_skillsuniverset.gx_frame_sequence_player.loaded = function() {
					this.first();
				}
				this.bn_skillsuniverset.gx_frame_sequence_player.load([
					u.assets["su-circle-2"],
				]);
				this.bn_skillsuniverset.room_sequence_player = u.sequencePlayer(this.bn_skillsuniverset, {"loop":true, "framerate": 10, "class":"room"});
				this.bn_skillsuniverset.room_sequence_player.node = this.bn_skillsuniverset;
				this.bn_skillsuniverset.room_sequence_player.loaded = function() {
					this.first();
					u.viewTracker(this.node);
					this.node.isVisible = function(position) {
						if(position.top > this.scroll_end && position.top < this.scroll_start) {
							i = Math.floor(((-(this.scroll_start) + (position.top)) / this.scroll_per_image));
							if(i != this.frame_index) {
								this.room_sequence_player.frame(i);
								this.frame_index = i;
							}
						}
					}
				}
				this.bn_skillsuniverset.room_sequence_player.load(this.div_skillsuniverset.intro_images);
				this.bn_skillsuniverset.scroll_start = page.browser_h - 100;
				this.bn_skillsuniverset.scroll_end = (page.browser_h / 2) - (this.bn_skillsuniverset.offsetHeight / 2);
				this.bn_skillsuniverset.scroll_per_image = (-this.bn_skillsuniverset.scroll_start + this.bn_skillsuniverset.scroll_end) / this.div_skillsuniverset.intro_images.length;
				this.bn_skillsuniverset.frame_timestamp = 0;
				this.bn_skillsuniverset.frame_index = 0;
				if(u.segment() === "smartphone_guide" || u.segment() === "smartphone") {
					u.ass(this.p_skillsuniverset, {
						"background-image": "url("+u.assets["su-block"]+")"
					});
				}
			}
			if(this.div_instagram) {
				u.viewTracker(this.div_instagram);
				this.div_instagram.isVisible = function(position) {
					if(position.top < (page.browser_h * 0.5) && position.bottom < (page.browser_h * 0.5)) {
						page.updateUrl("instagram");
					}
				}
				u.ass(this.div_instagram, {
					"background-image": "url("+u.assets["bg-events"]+")"
				});
				if(this.instagram_posts) {
					for(i = 0; i < this.instagram_posts.length; i++) {
						node = this.instagram_posts[i];
						u.ce(node, {type:"link"});
						u.ae(node._a, "img", {
							"src":"/img/guide/smartphone/instagram/pi_instagram_"+i+".jpg",
						});
					}
				}
			}
			var current_section_url = u.h.getCleanUrl(location.href);
			if(current_section_url.replace(/^\/index\//, "").match(/^(podcasts|events|skillsuniverset|instagram|rolemodels)$/)) {
				u.bug("test", this["div_"+current_section_url.replace(/^\/index\//, "")].offsetTop);
				u.t.setTimer(this["div_"+current_section_url.replace(/^\/index\//, "")], function() {
					u.scrollTo(window, {"node":this});
				}, 500);
			}
			else if(current_section_url.replace(/^\/index\//, "").match(/^(rolemodels\/[a-z]+)/)) {
				var fragments = current_section_url.split("/");
				var rolemodel_node = this["div_rolemodel_"+fragments[3]];
				u.t.setTimer(rolemodel_node, function() {
					u.scrollTo(window, {"node":this});
				}, 500);
				if(fragments.length > 4) {
					rolemodel_node.story.bn_mute.clicked();
					rolemodel_node.openStory(rolemodel_node.story.chapters[(Number(fragments[4])-1)], true);
				}
			}
		}
		scene.ready();
	}
}

