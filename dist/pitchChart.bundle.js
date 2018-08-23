(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("pitchChart", [], factory);
	else if(typeof exports === 'object')
		exports["pitchChart"] = factory();
	else
		root["RaPlayer"] = root["RaPlayer"] || {}, root["RaPlayer"]["pitchChart"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 146);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rerender", function() { return rerender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
var VNode = function VNode() {};

var options = {};

var stack = [];

var EMPTY_CHILDREN = [];

function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

function cloneElement(vnode, props) {
  return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

function isSameNodeType(node, vnode, hydrating) {
	if (typeof vnode === 'string' || typeof vnode === 'number') {
		return node.splitText !== undefined;
	}
	if (typeof vnode.nodeName === 'string') {
		return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	}
	return hydrating || node._componentConstructor === vnode.nodeName;
}

function isNamedNode(node, nodeName) {
	return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

function getNodeProps(vnode) {
	var props = extend({}, vnode.attributes);
	props.children = vnode.children;

	var defaultProps = vnode.nodeName.defaultProps;
	if (defaultProps !== undefined) {
		for (var i in defaultProps) {
			if (props[i] === undefined) {
				props[i] = defaultProps[i];
			}
		}
	}

	return props;
}

function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {} else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		try {
			node[name] = value == null ? '' : value;
		} catch (e) {}
		if ((value == null || value === false) && name != 'spellcheck') node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));

		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

var mounts = [];

var diffLevel = 0;

var isSvgMode = false;

var hydrating = false;

function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	if (!diffLevel++) {
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	if (! --diffLevel) {
		hydrating = false;

		if (!componentRoot) flushMounts();
	}

	return ret;
}

function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	if (typeof vnode === 'string' || typeof vnode === 'number') {
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			}
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	} else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	diffAttributes(out, vnode.attributes, props);

	isSvgMode = prevSvgMode;

	return out;
}

function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			} else if (min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		unmountComponent(component);
	} else {
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

function diffAttributes(dom, attrs, old) {
	var name;

	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

var recyclerComponents = [];

function createComponent(Ctor, props, context) {
	var inst,
	    i = recyclerComponents.length;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	while (i--) {
		if (recyclerComponents[i].constructor === Ctor) {
			inst.nextBase = recyclerComponents[i].nextBase;
			recyclerComponents.splice(i, 1);
			return inst;
		}
	}

	return inst;
}

function doRender(props, state, context) {
	return this.constructor(props, context);
}

function setComponentProps(component, props, renderMode, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	component.__ref = props.ref;
	component.__key = props.key;
	delete props.ref;
	delete props.key;

	if (typeof component.constructor.getDerivedStateFromProps === 'undefined') {
		if (!component.base || mountAll) {
			if (component.componentWillMount) component.componentWillMount();
		} else if (component.componentWillReceiveProps) {
			component.componentWillReceiveProps(props, context);
		}
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (renderMode !== 0) {
		if (renderMode === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

function renderComponent(component, renderMode, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    snapshot = previousContext,
	    rendered,
	    inst,
	    cbase;

	if (component.constructor.getDerivedStateFromProps) {
		state = extend(extend({}, state), component.constructor.getDerivedStateFromProps(props, state));
		component.state = state;
	}

	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (renderMode !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		if (isUpdate && component.getSnapshotBeforeUpdate) {
			snapshot = component.getSnapshotBeforeUpdate(previousProps, previousState);
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || renderMode === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, snapshot);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	while (component._renderCallbacks.length) {
		component._renderCallbacks.pop().call(component);
	}if (!diffLevel && !isChild) flushMounts();
}

function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;

			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		recyclerComponents.push(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

function Component(props, context) {
	this._dirty = true;

	this.context = context;

	this.props = props;

	this.state = this.state || {};

	this._renderCallbacks = [];
}

extend(Component.prototype, {
	setState: function setState(state, callback) {
		var prev = this.prevState = this.state;
		if (typeof state === 'function') state = state(prev, this.props);
		this.state = extend(extend({}, prev), state);
		if (callback) this._renderCallbacks.push(callback);
		enqueueRender(this);
	},
	forceUpdate: function forceUpdate(callback) {
		if (callback) this._renderCallbacks.push(callback);
		renderComponent(this, 2);
	},
	render: function render() {}
});

function render(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent, false);
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options
};

/* harmony default export */ __webpack_exports__["default"] = (preact);

//# sourceMappingURL=preact.mjs.map


/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(16), __webpack_require__(17)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports !== "undefined") {
		factory(exports, require("is-plain-object"), require("deepmerge"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.isPlainObject, global.deepmerge);
		global.core = mod.exports;
	}
})(this, function (exports) {
	"use strict";

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	(function (global, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(16), __webpack_require__(17)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports !== "undefined") {
			factory(exports);
		} else {
			var mod = {
				exports: {}
			};
			factory(mod.exports, global.isPlainObject, global.deepmerge);
			global.core = mod.exports;
		}
	})(undefined, function (exports, _isPlainObject, _deepmerge2) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.isUndefined = exports.isString = exports.deepmerge = undefined;
		exports.hasClass = hasClass;
		exports.addClass = addClass;
		exports.removeClass = removeClass;
		exports.getPrefixes = getPrefixes;
		exports.titleCase = titleCase;
		exports.runPrefixMethod = runPrefixMethod;
		exports.isObject = isObject;
		exports.isEmpty = isEmpty;
		exports.toHHMMSS = toHHMMSS;
		exports.getElementOffset = getElementOffset;
		exports.getColorMap = getColorMap;
		exports.parseText = parseText;
		exports.isIE = isIE;
		exports.insertAtCursor = insertAtCursor;
		exports.capitalizeKeys = capitalizeKeys;

		var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

		var _deepmerge3 = _interopRequireDefault(_deepmerge2);

		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}

		var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
			return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
		} : function (obj) {
			return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
		};

		exports.deepmerge = _deepmerge3.default;

		var colorMap = {};

		/**
   * Throws an error if the passed string has whitespace. This is used by
   * class methods to be relatively consistent with the classList API.
   *
   * @param {string} str
   *         The string to check for whitespace.
   *
   * @throws {Error}
   *         Throws an error if there is whitespace in the string.
   *
   */
		function throwIfWhitespace(str) {
			if (/\s/.test(str)) {
				throw new Error("class has illegal whitespace characters");
			}
		}

		/**
   * Produce a regular expression for matching a className within an elements className.
   *
   * @param {string} className
   *         The className to generate the RegExp for.
   *
   * @return {RegExp}
   *         The RegExp that will check for a specific `className` in an elements
   *         className.
   */
		function classRegExp(className) {
			return new RegExp("(^|\\s)" + className + "($|\\s)");
		}

		/**
   * Check if an element has a CSS class
   *
   * @param {Element} element
   *        Element to check
   *
   * @param {string} classToCheck
   *        Class name to check for
   *
   * @return {boolean}
   *         - True if the element had the class
   *         - False otherwise.
   *
   * @throws {Error}
   *         Throws an error if `classToCheck` has white space.
   */
		function hasClass(element, classToCheck) {
			throwIfWhitespace(classToCheck);
			if (element.classList) {
				return element.classList.contains(classToCheck);
			}
			return classRegExp(classToCheck).test(element.className);
		}

		/**
   * Add a CSS class name to an element
   *
   * @param {Element} element
   *        Element to add class name to.
   *
   * @param {string} classToAdd
   *        Class name to add.
   *
   * @return {Element}
   *         The dom element with the added class name.
   */
		function addClass(element, classToAdd) {
			if (element.classList) {
				element.classList.add(classToAdd);

				// Don't need to `throwIfWhitespace` here because `hasElClass` will do it
				// in the case of classList not being supported.
			} else if (!hasClass(element, classToAdd)) {
				element.className = (element.className + " " + classToAdd).trim();
			}

			return element;
		}

		/**
   * Remove a CSS class name from an element
   *
   * @param {Element} element
   *        Element to remove a class name from.
   *
   * @param {string} classToRemove
   *        Class name to remove
   *
   * @return {Element}
   *         The dom element with class name removed.
   */
		function removeClass(element, classToRemove) {
			if (element.classList) {
				element.classList.remove(classToRemove);
			} else {
				throwIfWhitespace(classToRemove);
				element.className = element.className.split(/\s+/).filter(function (c) {
					return c !== classToRemove;
				}).join(" ");
			}

			return element;
		}

		function getPrefixes() {
			var pfx = ["webkit", "moz", "ms", "o", "", "MS"];
			return pfx;
		}

		function titleCase(str) {
			str = str.toLowerCase().split(" ");
			for (var i = 0; i < str.length; i++) {
				str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
			}
			return str.join(" ");
		}

		function runPrefixMethod(obj, method) {
			var pfx = getPrefixes();
			var p = 0,
			    m,
			    t;
			while (p < pfx.length && !obj[m]) {
				m = method;
				if (pfx[p] == "") {
					m = m.substr(0, 1).toLowerCase() + m.substr(1);
				}
				m = pfx[p] + m;
				t = _typeof(obj[m]);
				if (t != "undefined") {
					pfx = [pfx[p]];
					return t == "function" ? obj[m]() : obj[m];
				}
				p++;
			}
		}

		function isObject(x) {
			return (0, _isPlainObject2.default)(x);
		}

		var isString = exports.isString = function isString(value) {
			return typeof value === "string";
		};

		var isUndefined = exports.isUndefined = function isUndefined(value) {
			return typeof value === "undefined";
		};

		function isEmpty(x) {
			if (isObject(x) && !Object.keys(x).length) return true;
			if (Array.isArray(x) && !x.length) return true;
			if (isString(x) && !x.length) return true;
			return false;
		}

		function toHHMMSS(str) {
			if (!str) {
				return "00:00";
			}
			var sec_num = Math.round(str);
			var hours = Math.floor(sec_num / 3600);
			var minutes = Math.floor((sec_num - hours * 3600) / 60);
			var seconds = sec_num - hours * 3600 - minutes * 60;
			if (hours < 10) {
				hours = "0" + hours;
			}
			if (minutes < 10) {
				minutes = "0" + minutes;
			}
			if (seconds < 10) {
				seconds = "0" + seconds;
			}
			var minsec = minutes + ":" + seconds;
			return hours != "00" ? hours + ":" + minsec : minsec;
		}

		function getElementOffset(element) {
			var de = document.documentElement;
			var box = element.getBoundingClientRect();
			var top = box.top + window.pageYOffset - de.clientTop;
			var left = box.left + window.pageXOffset - de.clientLeft;
			return { top: top, left: left };
		}

		function getColorMap(authors) {
			if (!authors || !authors.length) {
				return colorMap;
			}
			var colors = ["#0ed5c9", "#069eff", "#000000"];
			var j = 0;
			authors.map(function (author) {
				if (!colorMap[author]) {
					colorMap[author] = colors[j++];
				}
			});
			return colorMap;
		}

		function parseText(text) {
			if (!text) {
				return "";
			}
			return text.replace(/\r?\n/g, "\n");
		}

		function isIE() {
			var ua = window.navigator.userAgent;

			var msie = ua.indexOf("MSIE ");
			if (msie > 0) {
				// IE 10 or older => return version number
				return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
			}

			var trident = ua.indexOf("Trident/");
			if (trident > 0) {
				// IE 11 => return version number
				var rv = ua.indexOf("rv:");
				return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
			}

			var edge = ua.indexOf("Edge/");
			if (edge > 0) {
				// Edge (IE 12+) => return version number
				return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
			}

			// other browser
			return false;
		}

		function insertAtCursor(myField, myValue) {
			var sel = void 0;
			//IE support
			if (document.selection) {
				myField.focus();
				sel = document.selection.createRange();
				sel.text = myValue;
			} else if (myField.selectionStart || myField.selectionStart == "0") {
				//MOZILLA and others
				var startPos = myField.selectionStart;
				var endPos = myField.selectionEnd;
				myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
			} else {
				myField.value += myValue;
			}
		}

		function capitalizeKeys(obj) {
			var isObject = function isObject(o) {
				return Object.prototype.toString.apply(o) === "[object Object]";
			};
			var isArray = function isArray(o) {
				return Object.prototype.toString.apply(o) === "[object Array]";
			};

			var transformedObj = isArray(obj) ? [] : {};

			for (var key in obj) {
				var transformedKey = key.replace(/^\w/, function (c) {
					return c.toUpperCase();
				});
				if (isObject(obj[key]) || isArray(obj[key])) {
					transformedObj[transformedKey] = capitalizeKeys(obj[key]);
				} else {
					transformedObj[transformedKey] = obj[key];
				}
			}
			return transformedObj;
		}
	});
});

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require("preact"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.preact);
    global.preact = mod.exports;
  }
})(this, function (exports, t) {
  "use strict";

  function n(t, n) {
    for (var r in n) {
      t[r] = n[r];
    }return t;
  }function r(t) {
    this.getChildContext = function () {
      return { store: t.store };
    };
  }r.prototype.render = function (t) {
    return t.children[0];
  }, exports.connect = function (r, e) {
    var o;return "function" != typeof r && ("string" == typeof (o = r || []) && (o = o.split(/\s*,\s*/)), r = function r(t) {
      for (var n = {}, r = 0; r < o.length; r++) {
        n[o[r]] = t[o[r]];
      }return n;
    }), function (o) {
      function i(i, u) {
        var c = this,
            f = u.store,
            s = r(f ? f.getState() : {}, i),
            a = e ? function (t, n) {
          "function" == typeof t && (t = t(n));var r = {};for (var e in t) {
            r[e] = n.action(t[e]);
          }return r;
        }(e, f) : { store: f },
            p = function p() {
          var t = r(f ? f.getState() : {}, c.props);for (var n in t) {
            if (t[n] !== s[n]) return s = t, c.setState(null);
          }for (var e in s) {
            if (!(e in t)) return s = t, c.setState(null);
          }
        };this.componentDidMount = function () {
          p(), f.subscribe(p);
        }, this.componentWillUnmount = function () {
          f.unsubscribe(p);
        }, this.render = function (r) {
          return t.h(o, n(n(n({}, a), r), s));
        };
      }return (i.prototype = new t.Component()).constructor = i;
    };
  }, exports.Provider = r;
  //# sourceMappingURL=preact.js.map
});

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(19), __webpack_require__(18), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports !== "undefined") {
		factory(exports, require("unistore"), require("unistore/devtools"), require("@utils/core"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.unistore, global.devtools, global.core);
		global.store = mod.exports;
	}
})(this, function (exports) {
	"use strict";

	(function (global, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(19), __webpack_require__(18), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports !== "undefined") {
			factory(exports);
		} else {
			var mod = {
				exports: {}
			};
			factory(mod.exports, global.unistore, global.devtools, global.core);
			global.store = mod.exports;
		}
	})(undefined, function (exports, _unistore, _devtools, _core) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.getStore = getStore;

		var _unistore2 = _interopRequireDefault(_unistore);

		var _devtools2 = _interopRequireDefault(_devtools);

		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}

		var initialState = {
			app: {},
			commentHelperBox: {
				show: false,
				data: {}
			},
			commentBox: {
				show: false,
				data: {
					text: ""
				}
			},
			media: {
				currentTime: 0,
				state: "PAUSE"
			},
			commentPane: {
				allComments: [],
				activeComments: []
			},
			pitch: {},
			transcriptionPane: {
				searchBar: {
					searchWords: [],
					currentMatchNumber: 0,
					numberOfMatches: 0
				},
				filter: {
					evaluationParameters: [],
					selectedEvalParams: []
				},
				timestampedTranscripts: [],
				searchedTranscripts: [],
				matchedTranscriptIndices: [],
				transcriptionApiStatus: "FETCHING",
				transcriptionStatus: "NOT_ENABLED"
			}
		};

		var state = {};
		var store = void 0;

		function getStore(namespace) {
			var initialProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			if (!namespace && store) {
				return store;
			}
			if (namespace) {
				state[namespace] = state[namespace] || (0, _core.deepmerge)(initialState, initialProps);
			}
			store = process.env.ENV === "prod" ? (0, _unistore2.default)(state) : (0, _devtools2.default)((0, _unistore2.default)(state));
			return store;
		}
	});
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.fetch = mod.exports;
  }
})(this, function () {
  'use strict';

  (function (self) {
    'use strict';

    if (self.fetch) {
      return;
    }

    var support = {
      searchParams: 'URLSearchParams' in self,
      iterable: 'Symbol' in self && 'iterator' in Symbol,
      blob: 'FileReader' in self && 'Blob' in self && function () {
        try {
          new Blob();
          return true;
        } catch (e) {
          return false;
        }
      }(),
      formData: 'FormData' in self,
      arrayBuffer: 'ArrayBuffer' in self
    };

    if (support.arrayBuffer) {
      var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

      var isDataView = function isDataView(obj) {
        return obj && DataView.prototype.isPrototypeOf(obj);
      };

      var isArrayBufferView = ArrayBuffer.isView || function (obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
      };
    }

    function normalizeName(name) {
      if (typeof name !== 'string') {
        name = String(name);
      }
      if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
      }
      return name.toLowerCase();
    }

    function normalizeValue(value) {
      if (typeof value !== 'string') {
        value = String(value);
      }
      return value;
    }

    // Build a destructive iterator for the value list
    function iteratorFor(items) {
      var iterator = {
        next: function next() {
          var value = items.shift();
          return { done: value === undefined, value: value };
        }
      };

      if (support.iterable) {
        iterator[Symbol.iterator] = function () {
          return iterator;
        };
      }

      return iterator;
    }

    function Headers(headers) {
      this.map = {};

      if (headers instanceof Headers) {
        headers.forEach(function (value, name) {
          this.append(name, value);
        }, this);
      } else if (Array.isArray(headers)) {
        headers.forEach(function (header) {
          this.append(header[0], header[1]);
        }, this);
      } else if (headers) {
        Object.getOwnPropertyNames(headers).forEach(function (name) {
          this.append(name, headers[name]);
        }, this);
      }
    }

    Headers.prototype.append = function (name, value) {
      name = normalizeName(name);
      value = normalizeValue(value);
      var oldValue = this.map[name];
      this.map[name] = oldValue ? oldValue + ',' + value : value;
    };

    Headers.prototype['delete'] = function (name) {
      delete this.map[normalizeName(name)];
    };

    Headers.prototype.get = function (name) {
      name = normalizeName(name);
      return this.has(name) ? this.map[name] : null;
    };

    Headers.prototype.has = function (name) {
      return this.map.hasOwnProperty(normalizeName(name));
    };

    Headers.prototype.set = function (name, value) {
      this.map[normalizeName(name)] = normalizeValue(value);
    };

    Headers.prototype.forEach = function (callback, thisArg) {
      for (var name in this.map) {
        if (this.map.hasOwnProperty(name)) {
          callback.call(thisArg, this.map[name], name, this);
        }
      }
    };

    Headers.prototype.keys = function () {
      var items = [];
      this.forEach(function (value, name) {
        items.push(name);
      });
      return iteratorFor(items);
    };

    Headers.prototype.values = function () {
      var items = [];
      this.forEach(function (value) {
        items.push(value);
      });
      return iteratorFor(items);
    };

    Headers.prototype.entries = function () {
      var items = [];
      this.forEach(function (value, name) {
        items.push([name, value]);
      });
      return iteratorFor(items);
    };

    if (support.iterable) {
      Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
    }

    function consumed(body) {
      if (body.bodyUsed) {
        return Promise.reject(new TypeError('Already read'));
      }
      body.bodyUsed = true;
    }

    function fileReaderReady(reader) {
      return new Promise(function (resolve, reject) {
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = function () {
          reject(reader.error);
        };
      });
    }

    function readBlobAsArrayBuffer(blob) {
      var reader = new FileReader();
      var promise = fileReaderReady(reader);
      reader.readAsArrayBuffer(blob);
      return promise;
    }

    function readBlobAsText(blob) {
      var reader = new FileReader();
      var promise = fileReaderReady(reader);
      reader.readAsText(blob);
      return promise;
    }

    function readArrayBufferAsText(buf) {
      var view = new Uint8Array(buf);
      var chars = new Array(view.length);

      for (var i = 0; i < view.length; i++) {
        chars[i] = String.fromCharCode(view[i]);
      }
      return chars.join('');
    }

    function bufferClone(buf) {
      if (buf.slice) {
        return buf.slice(0);
      } else {
        var view = new Uint8Array(buf.byteLength);
        view.set(new Uint8Array(buf));
        return view.buffer;
      }
    }

    function Body() {
      this.bodyUsed = false;

      this._initBody = function (body) {
        this._bodyInit = body;
        if (!body) {
          this._bodyText = '';
        } else if (typeof body === 'string') {
          this._bodyText = body;
        } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
          this._bodyBlob = body;
        } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
          this._bodyFormData = body;
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this._bodyText = body.toString();
        } else if (support.arrayBuffer && support.blob && isDataView(body)) {
          this._bodyArrayBuffer = bufferClone(body.buffer);
          // IE 10-11 can't handle a DataView body.
          this._bodyInit = new Blob([this._bodyArrayBuffer]);
        } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
          this._bodyArrayBuffer = bufferClone(body);
        } else {
          throw new Error('unsupported BodyInit type');
        }

        if (!this.headers.get('content-type')) {
          if (typeof body === 'string') {
            this.headers.set('content-type', 'text/plain;charset=UTF-8');
          } else if (this._bodyBlob && this._bodyBlob.type) {
            this.headers.set('content-type', this._bodyBlob.type);
          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
          }
        }
      };

      if (support.blob) {
        this.blob = function () {
          var rejected = consumed(this);
          if (rejected) {
            return rejected;
          }

          if (this._bodyBlob) {
            return Promise.resolve(this._bodyBlob);
          } else if (this._bodyArrayBuffer) {
            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as blob');
          } else {
            return Promise.resolve(new Blob([this._bodyText]));
          }
        };

        this.arrayBuffer = function () {
          if (this._bodyArrayBuffer) {
            return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
          } else {
            return this.blob().then(readBlobAsArrayBuffer);
          }
        };
      }

      this.text = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text');
        } else {
          return Promise.resolve(this._bodyText);
        }
      };

      if (support.formData) {
        this.formData = function () {
          return this.text().then(decode);
        };
      }

      this.json = function () {
        return this.text().then(JSON.parse);
      };

      return this;
    }

    // HTTP methods whose capitalization should be normalized
    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

    function normalizeMethod(method) {
      var upcased = method.toUpperCase();
      return methods.indexOf(upcased) > -1 ? upcased : method;
    }

    function Request(input, options) {
      options = options || {};
      var body = options.body;

      if (input instanceof Request) {
        if (input.bodyUsed) {
          throw new TypeError('Already read');
        }
        this.url = input.url;
        this.credentials = input.credentials;
        if (!options.headers) {
          this.headers = new Headers(input.headers);
        }
        this.method = input.method;
        this.mode = input.mode;
        if (!body && input._bodyInit != null) {
          body = input._bodyInit;
          input.bodyUsed = true;
        }
      } else {
        this.url = String(input);
      }

      this.credentials = options.credentials || this.credentials || 'omit';
      if (options.headers || !this.headers) {
        this.headers = new Headers(options.headers);
      }
      this.method = normalizeMethod(options.method || this.method || 'GET');
      this.mode = options.mode || this.mode || null;
      this.referrer = null;

      if ((this.method === 'GET' || this.method === 'HEAD') && body) {
        throw new TypeError('Body not allowed for GET or HEAD requests');
      }
      this._initBody(body);
    }

    Request.prototype.clone = function () {
      return new Request(this, { body: this._bodyInit });
    };

    function decode(body) {
      var form = new FormData();
      body.trim().split('&').forEach(function (bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
      return form;
    }

    function parseHeaders(rawHeaders) {
      var headers = new Headers();
      // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
      // https://tools.ietf.org/html/rfc7230#section-3.2
      var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
      preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
        var parts = line.split(':');
        var key = parts.shift().trim();
        if (key) {
          var value = parts.join(':').trim();
          headers.append(key, value);
        }
      });
      return headers;
    }

    Body.call(Request.prototype);

    function Response(bodyInit, options) {
      if (!options) {
        options = {};
      }

      this.type = 'default';
      this.status = options.status === undefined ? 200 : options.status;
      this.ok = this.status >= 200 && this.status < 300;
      this.statusText = 'statusText' in options ? options.statusText : 'OK';
      this.headers = new Headers(options.headers);
      this.url = options.url || '';
      this._initBody(bodyInit);
    }

    Body.call(Response.prototype);

    Response.prototype.clone = function () {
      return new Response(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new Headers(this.headers),
        url: this.url
      });
    };

    Response.error = function () {
      var response = new Response(null, { status: 0, statusText: '' });
      response.type = 'error';
      return response;
    };

    var redirectStatuses = [301, 302, 303, 307, 308];

    Response.redirect = function (url, status) {
      if (redirectStatuses.indexOf(status) === -1) {
        throw new RangeError('Invalid status code');
      }

      return new Response(null, { status: status, headers: { location: url } });
    };

    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;

    self.fetch = function (input, init) {
      return new Promise(function (resolve, reject) {
        var request = new Request(input, init);
        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
          var options = {
            status: xhr.status,
            statusText: xhr.statusText,
            headers: parseHeaders(xhr.getAllResponseHeaders() || '')
          };
          options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
          var body = 'response' in xhr ? xhr.response : xhr.responseText;
          resolve(new Response(body, options));
        };

        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };

        xhr.ontimeout = function () {
          reject(new TypeError('Network request failed'));
        };

        xhr.open(request.method, request.url, true);

        if (request.credentials === 'include') {
          xhr.withCredentials = true;
        } else if (request.credentials === 'omit') {
          xhr.withCredentials = false;
        }

        if ('responseType' in xhr && support.blob) {
          xhr.responseType = 'blob';
        }

        request.headers.forEach(function (value, name) {
          xhr.setRequestHeader(name, value);
        });

        xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
      });
    };
    self.fetch.polyfill = true;
  })(typeof self !== 'undefined' ? self : undefined);
});

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod);
        global.browser = mod.exports;
    }
})(this, function (module) {
    'use strict';

    // shim for using process in browser
    var process = module.exports = {};

    // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.

    var cachedSetTimeout;
    var cachedClearTimeout;

    function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
    }
    function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
    }
    (function () {
        try {
            if (typeof setTimeout === 'function') {
                cachedSetTimeout = setTimeout;
            } else {
                cachedSetTimeout = defaultSetTimout;
            }
        } catch (e) {
            cachedSetTimeout = defaultSetTimout;
        }
        try {
            if (typeof clearTimeout === 'function') {
                cachedClearTimeout = clearTimeout;
            } else {
                cachedClearTimeout = defaultClearTimeout;
            }
        } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
        }
    })();
    function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
            //normal enviroments in sane situations
            return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedSetTimeout(fun, 0);
        } catch (e) {
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                return cachedSetTimeout.call(null, fun, 0);
            } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                return cachedSetTimeout.call(this, fun, 0);
            }
        }
    }
    function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
            //normal enviroments in sane situations
            return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedClearTimeout(marker);
        } catch (e) {
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                return cachedClearTimeout.call(null, marker);
            } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                return cachedClearTimeout.call(this, marker);
            }
        }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
        if (!draining || !currentQueue) {
            return;
        }
        draining = false;
        if (currentQueue.length) {
            queue = currentQueue.concat(queue);
        } else {
            queueIndex = -1;
        }
        if (queue.length) {
            drainQueue();
        }
    }

    function drainQueue() {
        if (draining) {
            return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
                if (currentQueue) {
                    currentQueue[queueIndex].run();
                }
            }
            queueIndex = -1;
            len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
    }

    process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
            }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
        }
    };

    // v8 likes predictible objects
    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function () {
        this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues
    process.versions = {};

    function noop() {}

    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;

    process.listeners = function (name) {
        return [];
    };

    process.binding = function (name) {
        throw new Error('process.binding is not supported');
    };

    process.cwd = function () {
        return '/';
    };
    process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
    };
    process.umask = function () {
        return 0;
    };
});

/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(11), __webpack_require__(10), __webpack_require__(95), __webpack_require__(94), __webpack_require__(13)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports !== "undefined") {
		factory(module, exports, require("preact"), require("./app/store"), require("unistore/preact"), require("./app/containers/PitchChartWrapper"), require("promise-polyfill/src/polyfill"), require("whatwg-fetch"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod, mod.exports, global.preact, global.store, global.preact, global.PitchChartWrapper, global.polyfill, global.whatwgFetch);
		global.pitchChart = mod.exports;
	}
})(this, function (module, exports) {
	"use strict";

	(function (global, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(11), __webpack_require__(10), __webpack_require__(95), __webpack_require__(94), __webpack_require__(13)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports !== "undefined") {
			factory(module, exports);
		} else {
			var mod = {
				exports: {}
			};
			factory(mod, mod.exports, global.preact, global.store, global.preact, global.PitchChartWrapper, global.polyfill, global.whatwgFetch);
			global.pitchChart = mod.exports;
		}
	})(undefined, function (module, exports, _preact, _store, _preact2, _PitchChartWrapper) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _PitchChartWrapper2 = _interopRequireDefault(_PitchChartWrapper);

		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}

		var _extends = Object.assign || function (target) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];

				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}

			return target;
		};

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					descriptor.enumerable = descriptor.enumerable || false;
					descriptor.configurable = true;
					if ("value" in descriptor) descriptor.writable = true;
					Object.defineProperty(target, descriptor.key, descriptor);
				}
			}

			return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);
				if (staticProps) defineProperties(Constructor, staticProps);
				return Constructor;
			};
		}();

		var count = 0;

		var PitchChart = function () {
			function PitchChart() {
				var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				_classCallCheck(this, PitchChart);

				this.props = props;
			}

			_createClass(PitchChart, [{
				key: "setup",
				value: function setup() {
					var targetChartContainer = this.props.targetChartContainer;

					var namespace = "pitch_" + count++;
					var store = (0, _store.getStore)(namespace, {
						app: this.props.app || {}
					});
					try {
						this.root = (0, _preact.render)((0, _preact.h)(_preact2.Provider, { store: store }, (0, _preact.h)(_PitchChartWrapper2.default, _extends({}, this.props, { namespace: namespace })), "dasdasdasdas"), document.getElementById(targetChartContainer));
					} catch (ex) {
						console.log(ex); //eslint-disable-line
					}
					window.store = store;
				}
			}, {
				key: "destroy",
				value: function destroy() {
					var targetChartContainer = this.props.targetChartContainer;

					(0, _preact.render)("", document.getElementById(targetChartContainer), this.root);
					return this;
				}
			}]);

			return PitchChart;
		}();

		exports.default = PitchChart;
		module.exports = exports["default"];
	});
});

/***/ }),

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.index = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}

  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (!(this instanceof Promise)) throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function () {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new this.constructor(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.prototype['finally'] = function (callback) {
    var constructor = this.constructor;
    return this.then(function (value) {
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return constructor.resolve(callback()).then(function () {
        return constructor.reject(reason);
      });
    });
  };

  Promise.all = function (arr) {
    return new Promise(function (resolve, reject) {
      if (!arr || typeof arr.length === 'undefined') throw new TypeError('Promise.all accepts an array');
      var args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn = typeof setImmediate === 'function' && function (fn) {
    setImmediate(fn);
  } || function (fn) {
    setTimeoutFunc(fn, 0);
  };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  exports.default = Promise;
  module.exports = exports['default'];
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(148).setImmediate))

/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(149)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require("setimmediate"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.setimmediate);
    global.main = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  var scope = typeof global !== "undefined" && global || typeof self !== "undefined" && self || window;
  var apply = Function.prototype.apply;

  // DOM APIs, for completeness

  exports.setTimeout = function () {
    return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
  };
  exports.setInterval = function () {
    return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
  };
  exports.clearTimeout = exports.clearInterval = function (timeout) {
    if (timeout) {
      timeout.close();
    }
  };

  function Timeout(id, clearFn) {
    this._id = id;
    this._clearFn = clearFn;
  }
  Timeout.prototype.unref = Timeout.prototype.ref = function () {};
  Timeout.prototype.close = function () {
    this._clearFn.call(scope, this._id);
  };

  // Does not start the time, just sets up the members needed.
  exports.enroll = function (item, msecs) {
    clearTimeout(item._idleTimeoutId);
    item._idleTimeout = msecs;
  };

  exports.unenroll = function (item) {
    clearTimeout(item._idleTimeoutId);
    item._idleTimeout = -1;
  };

  exports._unrefActive = exports.active = function (item) {
    clearTimeout(item._idleTimeoutId);

    var msecs = item._idleTimeout;
    if (msecs >= 0) {
      item._idleTimeoutId = setTimeout(function onTimeout() {
        if (item._onTimeout) item._onTimeout();
      }, msecs);
    }
  };

  // setimmediate attaches itself to the global object

  // On some exotic environments, it's not clear which object `setimmediate` was
  // able to install onto.  Search each possibility in the same order as the
  // `setimmediate` library.
  exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || undefined && undefined.setImmediate;
  exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || undefined && undefined.clearImmediate;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory();
    } else {
        var mod = {
            exports: {}
        };
        factory();
        global.setImmediate = mod.exports;
    }
})(this, function () {
    "use strict";

    (function (global, undefined) {
        "use strict";

        if (global.setImmediate) {
            return;
        }

        var nextHandle = 1; // Spec says greater than zero
        var tasksByHandle = {};
        var currentlyRunningATask = false;
        var doc = global.document;
        var registerImmediate;

        function setImmediate(callback) {
            // Callback can either be a function or a string
            if (typeof callback !== "function") {
                callback = new Function("" + callback);
            }
            // Copy function arguments
            var args = new Array(arguments.length - 1);
            for (var i = 0; i < args.length; i++) {
                args[i] = arguments[i + 1];
            }
            // Store and register the task
            var task = { callback: callback, args: args };
            tasksByHandle[nextHandle] = task;
            registerImmediate(nextHandle);
            return nextHandle++;
        }

        function clearImmediate(handle) {
            delete tasksByHandle[handle];
        }

        function run(task) {
            var callback = task.callback;
            var args = task.args;
            switch (args.length) {
                case 0:
                    callback();
                    break;
                case 1:
                    callback(args[0]);
                    break;
                case 2:
                    callback(args[0], args[1]);
                    break;
                case 3:
                    callback(args[0], args[1], args[2]);
                    break;
                default:
                    callback.apply(undefined, args);
                    break;
            }
        }

        function runIfPresent(handle) {
            // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
            // So if we're currently running a task, we'll need to delay this invocation.
            if (currentlyRunningATask) {
                // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
                // "too much recursion" error.
                setTimeout(runIfPresent, 0, handle);
            } else {
                var task = tasksByHandle[handle];
                if (task) {
                    currentlyRunningATask = true;
                    try {
                        run(task);
                    } finally {
                        clearImmediate(handle);
                        currentlyRunningATask = false;
                    }
                }
            }
        }

        function installNextTickImplementation() {
            registerImmediate = function registerImmediate(handle) {
                process.nextTick(function () {
                    runIfPresent(handle);
                });
            };
        }

        function canUsePostMessage() {
            // The test against `importScripts` prevents this implementation from being installed inside a web worker,
            // where `global.postMessage` means something completely different and can't be used for this purpose.
            if (global.postMessage && !global.importScripts) {
                var postMessageIsAsynchronous = true;
                var oldOnMessage = global.onmessage;
                global.onmessage = function () {
                    postMessageIsAsynchronous = false;
                };
                global.postMessage("", "*");
                global.onmessage = oldOnMessage;
                return postMessageIsAsynchronous;
            }
        }

        function installPostMessageImplementation() {
            // Installs an event handler on `global` for the `message` event: see
            // * https://developer.mozilla.org/en/DOM/window.postMessage
            // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

            var messagePrefix = "setImmediate$" + Math.random() + "$";
            var onGlobalMessage = function onGlobalMessage(event) {
                if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
                    runIfPresent(+event.data.slice(messagePrefix.length));
                }
            };

            if (global.addEventListener) {
                global.addEventListener("message", onGlobalMessage, false);
            } else {
                global.attachEvent("onmessage", onGlobalMessage);
            }

            registerImmediate = function registerImmediate(handle) {
                global.postMessage(messagePrefix + handle, "*");
            };
        }

        function installMessageChannelImplementation() {
            var channel = new MessageChannel();
            channel.port1.onmessage = function (event) {
                var handle = event.data;
                runIfPresent(handle);
            };

            registerImmediate = function registerImmediate(handle) {
                channel.port2.postMessage(handle);
            };
        }

        function installReadyStateChangeImplementation() {
            var html = doc.documentElement;
            registerImmediate = function registerImmediate(handle) {
                // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                var script = doc.createElement("script");
                script.onreadystatechange = function () {
                    runIfPresent(handle);
                    script.onreadystatechange = null;
                    html.removeChild(script);
                    script = null;
                };
                html.appendChild(script);
            };
        }

        function installSetTimeoutImplementation() {
            registerImmediate = function registerImmediate(handle) {
                setTimeout(runIfPresent, 0, handle);
            };
        }

        // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
        var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
        attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

        // Don't get fooled by e.g. browserify environments.
        if ({}.toString.call(global.process) === "[object process]") {
            // For Node.js before 0.9
            installNextTickImplementation();
        } else if (canUsePostMessage()) {
            // For non-IE10 modern browsers
            installPostMessageImplementation();
        } else if (global.MessageChannel) {
            // For web workers, where supported
            installMessageChannelImplementation();
        } else if (doc && "onreadystatechange" in doc.createElement("script")) {
            // For IE 6–8
            installReadyStateChangeImplementation();
        } else {
            // For older browsers
            installSetTimeoutImplementation();
        }

        attachTo.setImmediate = setImmediate;
        attachTo.clearImmediate = clearImmediate;
    })(typeof self === "undefined" ? typeof global === "undefined" ? undefined : global : self);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15), __webpack_require__(14)))

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports !== "undefined") {
		factory(module);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod);
		global.global = mod.exports;
	}
})(this, function (module) {
	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	var g;

	// This works in non-strict mode
	g = function () {
		return this;
	}();

	try {
		// This works if eval is allowed (see CSP)
		g = g || Function("return this")() || (1, eval)("this");
	} catch (e) {
		// This works if the window reference is available
		if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
	}

	// g can still be undefined, but nothing to do about it...
	// We return undefined, instead of nothing here, so it's
	// easier to handle this case. if(!global) { ...}

	module.exports = g;
});

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(24)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, require('isobject'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.isobject);
    global.index = mod.exports;
  }
})(this, function (module, isObject) {
  /*!
   * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   */

  'use strict';

  function isObjectObject(o) {
    return isObject(o) === true && Object.prototype.toString.call(o) === '[object Object]';
  }

  module.exports = function isPlainObject(o) {
    var ctor, prot;

    if (isObjectObject(o) === false) return false;

    // If has modified constructor
    ctor = o.constructor;
    if (typeof ctor !== 'function') return false;

    // If has modified prototype
    prot = ctor.prototype;
    if (isObjectObject(prot) === false) return false;

    // If constructor does not have an Object-specific method
    if (prot.hasOwnProperty('isPrototypeOf') === false) {
      return false;
    }

    // Most likely a plain Object
    return true;
  };
});

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports !== "undefined") {
		factory(module, exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod, mod.exports);
		global.es = mod.exports;
	}
})(this, function (module, exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	var isMergeableObject = function isMergeableObject(value) {
		return isNonNullObject(value) && !isSpecial(value);
	};

	function isNonNullObject(value) {
		return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
	}

	function isSpecial(value) {
		var stringValue = Object.prototype.toString.call(value);

		return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
	}

	// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
	var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

	function isReactElement(value) {
		return value.$$typeof === REACT_ELEMENT_TYPE;
	}

	function emptyTarget(val) {
		return Array.isArray(val) ? [] : {};
	}

	function cloneUnlessOtherwiseSpecified(value, options) {
		return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
	}

	function defaultArrayMerge(target, source, options) {
		return target.concat(source).map(function (element) {
			return cloneUnlessOtherwiseSpecified(element, options);
		});
	}

	function mergeObject(target, source, options) {
		var destination = {};
		if (options.isMergeableObject(target)) {
			Object.keys(target).forEach(function (key) {
				destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
			});
		}
		Object.keys(source).forEach(function (key) {
			if (!options.isMergeableObject(source[key]) || !target[key]) {
				destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
			} else {
				destination[key] = deepmerge(target[key], source[key], options);
			}
		});
		return destination;
	}

	function deepmerge(target, source, options) {
		options = options || {};
		options.arrayMerge = options.arrayMerge || defaultArrayMerge;
		options.isMergeableObject = options.isMergeableObject || isMergeableObject;

		var sourceIsArray = Array.isArray(source);
		var targetIsArray = Array.isArray(target);
		var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

		if (!sourceAndTargetTypesMatch) {
			return cloneUnlessOtherwiseSpecified(source, options);
		} else if (sourceIsArray) {
			return options.arrayMerge(target, source, options);
		} else {
			return mergeObject(target, source, options);
		}
	}

	deepmerge.all = function deepmergeAll(array, options) {
		if (!Array.isArray(array)) {
			throw new Error('first argument should be an array');
		}

		return array.reduce(function (prev, next) {
			return deepmerge(prev, next, options);
		}, {});
	};

	var deepmerge_1 = deepmerge;

	exports.default = deepmerge_1;
	module.exports = exports['default'];
});

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports !== "undefined") {
		factory(module);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod);
		global.devtools = mod.exports;
	}
})(this, function (module) {
	'use strict';

	module.exports = function unistoreDevTools(store) {
		var extension = window.__REDUX_DEVTOOLS_EXTENSION__ || window.top.__REDUX_DEVTOOLS_EXTENSION__;
		var ignoreState = false;

		if (!extension) {
			console.warn('Please install/enable Redux devtools extension');
			store.devtools = null;

			return store;
		}

		if (!store.devtools) {
			store.devtools = extension.connect();
			store.devtools.subscribe(function (message) {
				if (message.type === 'DISPATCH' && message.state) {
					ignoreState = message.payload.type === 'JUMP_TO_ACTION' || message.payload.type === 'JUMP_TO_STATE';
					store.setState(JSON.parse(message.state), true);
				}
			});
			store.devtools.init(store.getState());
			store.subscribe(function (state, action) {
				var actionName = action && action.name || 'setState';

				if (!ignoreState) {
					store.devtools.send(actionName, state);
				} else {
					ignoreState = false;
				}
			});
		}

		return store;
	};
});

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.unistoreEs = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (t) {
    var r = [];function u(n) {
      for (var t = [], u = 0; u < r.length; u++) {
        r[u] === n ? n = null : t.push(r[u]);
      }r = t;
    }function e(u, e, f) {
      t = e ? u : n(n({}, t), u);for (var i = r, o = 0; o < i.length; o++) {
        i[o](t, f);
      }
    }return t = t || {}, { action: function action(n) {
        function r(t) {
          e(t, !1, n);
        }return function () {
          for (var u = arguments, e = [t], f = 0; f < arguments.length; f++) {
            e.push(u[f]);
          }var i = n.apply(this, e);if (null != i) return i.then ? i.then(r) : r(i);
        };
      }, setState: e, subscribe: function subscribe(n) {
        return r.push(n), function () {
          u(n);
        };
      }, unsubscribe: u, getState: function getState() {
        return t;
      } };
  };

  function n(n, t) {
    for (var r in t) {
      n[r] = t[r];
    }return n;
  };
  //# sourceMappingURL=unistore.es.js.map

  module.exports = exports["default"];
});

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.index = mod.exports;
  }
})(this, function (module) {
  /*!
   * isobject <https://github.com/jonschlinkert/isobject>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   */

  'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  module.exports = function isObject(val) {
    return val != null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && Array.isArray(val) === false;
  };
});

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(10), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports !== "undefined") {
		factory(exports, require("unistore/preact"), require("../store"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.preact, global.store);
		global.enhancer = mod.exports;
	}
})(this, function (exports) {
	"use strict";

	(function (global, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(10), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports !== "undefined") {
			factory(exports);
		} else {
			var mod = {
				exports: {}
			};
			factory(mod.exports, global.preact, global.store);
			global.enhancer = mod.exports;
		}
	})(undefined, function (exports, _preact, _store) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.normalizeStateForNamespace = normalizeStateForNamespace;
		exports.namespaceConnect = namespaceConnect;

		function _defineProperty(obj, key, value) {
			if (key in obj) {
				Object.defineProperty(obj, key, {
					value: value,
					enumerable: true,
					configurable: true,
					writable: true
				});
			} else {
				obj[key] = value;
			}

			return obj;
		}

		var _extends = Object.assign || function (target) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];

				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}

			return target;
		};

		function normalizeStateForNamespace(namespace, object, state) {
			return _extends({}, state, _defineProperty({}, namespace, _extends({}, object)));
		}

		function namespaceStateToProps(mapStateToProps) {
			return function (state, ownProp) {
				var namespaceState = state[ownProp.namespace];
				if (typeof mapStateToProps === "function") {
					return mapStateToProps(namespaceState);
				}
				return namespaceState;
			};
		}

		function namespaceActions(actions) {
			var keys = Object.keys(actions());
			var wrappedActions = {};

			var _loop = function _loop(i) {
				var boundedAction = actions()[keys[i]]; // in case you want to access store in action, please pass store(getStore()) here
				wrappedActions[keys[i]] = function (state, payload) {
					var namespace = this.namespace;
					// in case no namespace is present, we won't dispatch action
					if (!namespace) {
						return state;
					}
					var namespaceState = state[namespace];
					var setState = function setState(mutatedState) {
						var namespaceState = state[namespace];
						var obj = normalizeStateForNamespace(namespace, _extends({}, namespaceState, mutatedState), state);
						(0, _store.getStore)().setState(obj);
					};
					var updatedState = boundedAction(namespaceState, payload, setState);
					if (updatedState instanceof Promise) {
						return new Promise(function (resolve, reject) {
							updatedState.then(function (mutatedState) {
								// because this is promise, state might have been updated by that time,hence we are fetching state again
								var state = (0, _store.getStore)().getState();
								var namespaceState = state[namespace];
								var obj = normalizeStateForNamespace(namespace, _extends({}, namespaceState, mutatedState), state);
								resolve(obj);
							}, function () {
								reject(state);
							});
						});
					}
					return normalizeStateForNamespace(namespace, _extends({}, namespaceState, updatedState), state);
				};
			};

			for (var i = 0; i < keys.length; i++) {
				_loop(i);
			}

			/*eslint-disable*/
			return function (store) {
				return wrappedActions;
			};
			/*eslint-disable*/
		}

		function namespaceConnect(mapStateToProps, actions) {
			var wrappedMapStateToProps = namespaceStateToProps(mapStateToProps);
			var wrappedActions = namespaceActions(actions);
			return function (component) {
				return (0, _preact.connect)(wrappedMapStateToProps, wrappedActions)(component);
			};
		}
	});
});

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(147)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(require('./index'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.index);
    global.polyfill = mod.exports;
  }
})(this, function (_index) {
  'use strict';

  var _index2 = _interopRequireDefault(_index);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var globalNS = function () {
    // the only reliable means to get the global object is
    // `Function('return this')()`
    // However, this causes CSP violations in Chrome apps.
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    throw new Error('unable to locate global object');
  }();

  if (!globalNS.Promise) {
    globalNS.Promise = _index2.default;
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(4), __webpack_require__(1), __webpack_require__(97), __webpack_require__(96)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports !== "undefined") {
		factory(module, exports, require("preact"), require("@utils/enhancer"), require("@utils/core"), require("@components/PitchChart"), require("./actions"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod, mod.exports, global.preact, global.enhancer, global.core, global.PitchChart, global.actions);
		global.index = mod.exports;
	}
})(this, function (module, exports) {
	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	(function (global, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(4), __webpack_require__(1), __webpack_require__(97), __webpack_require__(96)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports !== "undefined") {
			factory(module, exports);
		} else {
			var mod = {
				exports: {}
			};
			factory(mod, mod.exports, global.preact, global.enhancer, global.core, global.PitchChart, global.actions);
			global.index = mod.exports;
		}
	})(undefined, function (module, exports, _preact, _enhancer, _core, _PitchChart, _actions) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _PitchChart2 = _interopRequireDefault(_PitchChart);

		var _actions2 = _interopRequireDefault(_actions);

		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}

		var _extends = Object.assign || function (target) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];

				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}

			return target;
		};

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					descriptor.enumerable = descriptor.enumerable || false;
					descriptor.configurable = true;
					if ("value" in descriptor) descriptor.writable = true;
					Object.defineProperty(target, descriptor.key, descriptor);
				}
			}

			return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);
				if (staticProps) defineProperties(Constructor, staticProps);
				return Constructor;
			};
		}();

		function _possibleConstructorReturn(self, call) {
			if (!self) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}

			return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
			}

			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value: subClass,
					enumerable: false,
					writable: true,
					configurable: true
				}
			});
			if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
		}

		var PitchChartWrapper = function (_Component) {
			_inherits(PitchChartWrapper, _Component);

			function PitchChartWrapper() {
				var _ref;

				var _temp, _this, _ret;

				_classCallCheck(this, PitchChartWrapper);

				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PitchChartWrapper.__proto__ || Object.getPrototypeOf(PitchChartWrapper)).call.apply(_ref, [this].concat(args))), _this), _this.getProps = function () {
					var _this$props = _this.props,
					    _this$props$pitchLeng = _this$props.pitchLength,
					    pitchLength = _this$props$pitchLeng === undefined ? {} : _this$props$pitchLeng,
					    _this$props$pitchPace = _this$props.pitchPace,
					    pitchPace = _this$props$pitchPace === undefined ? {} : _this$props$pitchPace;

					var pitchLengthProps = _extends({}, pitchLength, {
						chartType: "length"
					});
					var pitchPaceProps = _extends({}, pitchPace, {
						chartType: "pace"
					});
					return {
						pitchLength: pitchLengthProps,
						pitchPace: pitchPaceProps
					};
				}, _temp), _possibleConstructorReturn(_this, _ret);
			}

			_createClass(PitchChartWrapper, [{
				key: "componentDidMount",
				value: function componentDidMount() {
					this.props.getPitchData();
				}
			}, {
				key: "render",
				value: function render(_ref2) {
					var isLoading = _ref2.isLoading,
					    error = _ref2.error,
					    userName = _ref2.userName;

					if ((0, _core.isUndefined)(isLoading) || isLoading || !(0, _core.isUndefined)(error)) {
						return null;
					}

					var _getProps = this.getProps(),
					    pitchLength = _getProps.pitchLength,
					    pitchPace = _getProps.pitchPace;

					return (0, _preact.h)("div", null, !(0, _core.isEmpty)(this.props.pitchLength) && (0, _preact.h)(_PitchChart2.default, _extends({}, pitchLength, {
						userName: userName,
						style: "width:324px; height:250px; float:left"
					})), !(0, _core.isEmpty)(this.props.pitchPace) && (0, _preact.h)(_PitchChart2.default, _extends({}, pitchPace, {
						userName: userName,
						style: "width:324px; height:250px; float:right"
					})));
				}
			}]);

			return PitchChartWrapper;
		}(_preact.Component);

		function mapStateToProps(state) {
			var _ref3 = state.pitch || {},
			    _ref3$data = _ref3.data,
			    data = _ref3$data === undefined ? {} : _ref3$data,
			    isLoading = _ref3.isLoading,
			    error = _ref3.error;

			var userName = state.app.userName;

			return {
				pitchLength: data.pitchLength,
				pitchPace: data.pitchPace,
				isLoading: isLoading,
				error: error,
				userName: userName
			};
		}

		exports.default = (0, _enhancer.namespaceConnect)(mapStateToProps, _actions2.default)(PitchChartWrapper);
		module.exports = exports["default"];
	});
});

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports !== "undefined") {
		factory(module, exports, require("@utils/core"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod, mod.exports, global.core);
		global.actions = mod.exports;
	}
})(this, function (module, exports) {
	"use strict";

	(function (global, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports !== "undefined") {
			factory(module, exports);
		} else {
			var mod = {
				exports: {}
			};
			factory(mod, mod.exports, global.core);
			global.actions = mod.exports;
		}
	})(undefined, function (module, exports, _core) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _extends = Object.assign || function (target) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];

				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}

			return target;
		};

		// import apiConfig from "./api.config";

		var getLabel = function getLabel(value) {
			if ((0, _core.isUndefined)(value)) return "";
			return value > 60 ? (value / 60).toFixed(2) + " min" : value + " sec";
		};

		var pitchParser = function pitchParser(length, pace) {
			var result = { pitchLength: {}, pitchPace: {} };
			if (!(0, _core.isEmpty)(length)) result.pitchLength = {
				average: length.averageLength,
				current: length.contentLength,
				expected: length.targetLength,
				averageLabel: getLabel(length.averageLength),
				currentLabel: getLabel(length.contentLength),
				expectedLabel: getLabel(length.targetLength)
			};
			if (!(0, _core.isEmpty)(pace)) result.pitchPace = {
				average: pace.averagePace,
				current: pace.contentPace,
				expected: pace.industryPace,
				averageLabel: Math.round(pace.averagePace),
				currentLabel: Math.round(pace.contentPace) + " words/min",
				expectedLabel: Math.round(pace.industryPace)
			};
			return result;
		};

		var actions = function actions() {
			return {
				getPitchData: function getPitchData(state, payload, setState) {
					setState(_extends({}, state, {
						pitch: {
							isLoading: true
						}
					}));
					return Promise.resolve({
						length: {
							averageLength: 30,
							contentLength: 15,
							targetLength: 90
						},
						pace: {
							averagePace: 4.761904761904763,
							contentPace: 4.761904761904763,
							industryPace: 2.5
						}
					}).then(function () {
						var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
						    length = _ref.length,
						    pace = _ref.pace;

						setState(_extends({}, state, {
							pitch: { isLoading: false, data: pitchParser(length, pace) }
						}));
					});
					// return get(apiConfig.getPitchData(state.app)).then(
					// 	response => {
					// 		const { length = {}, pace = {} } = response;

					// 		setState({
					// 			...state,
					// 			pitch: { isLoading: false, data:pitchParser(length, pace) }
					// 		});
					// 	},
					// 	error => {
					// 		setState({
					// 			...state,
					// 			pitch: { isLoading: false, error: error }
					// 		});
					// 	}
					// );
				}
			};
		};

		exports.default = actions;
		module.exports = exports["default"];
	});
});

/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(99), __webpack_require__(98)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports !== "undefined") {
		factory(module, exports, require("preact"), require("highcharts/highcharts.js"), require("./constants"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod, mod.exports, global.preact, global.highcharts, global.constants);
		global.index = mod.exports;
	}
})(this, function (module, exports) {
	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	(function (global, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(99), __webpack_require__(98)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports !== "undefined") {
			factory(module, exports);
		} else {
			var mod = {
				exports: {}
			};
			factory(mod, mod.exports, global.preact, global.highcharts, global.constants);
			global.index = mod.exports;
		}
	})(undefined, function (module, exports, _preact, _highcharts, _constants) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _highcharts2 = _interopRequireDefault(_highcharts);

		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					descriptor.enumerable = descriptor.enumerable || false;
					descriptor.configurable = true;
					if ("value" in descriptor) descriptor.writable = true;
					Object.defineProperty(target, descriptor.key, descriptor);
				}
			}

			return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);
				if (staticProps) defineProperties(Constructor, staticProps);
				return Constructor;
			};
		}();

		function _possibleConstructorReturn(self, call) {
			if (!self) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}

			return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
			}

			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value: subClass,
					enumerable: false,
					writable: true,
					configurable: true
				}
			});
			if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
		}

		var PitchChart = function (_Component) {
			_inherits(PitchChart, _Component);

			function PitchChart() {
				var _ref;

				var _temp, _this, _ret;

				_classCallCheck(this, PitchChart);

				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PitchChart.__proto__ || Object.getPrototypeOf(PitchChart)).call.apply(_ref, [this].concat(args))), _this), _this.getChartContainerId = function () {
					return _this.props.chartType + "-" + _this.props.containerId;
				}, _temp), _possibleConstructorReturn(_this, _ret);
			}

			_createClass(PitchChart, [{
				key: "componentDidMount",
				value: function componentDidMount() {
					var _props = this.props,
					    average = _props.average,
					    current = _props.current,
					    expected = _props.expected,
					    chartType = _props.chartType,
					    expectedLabel = _props.expectedLabel,
					    averageLabel = _props.averageLabel,
					    currentLabel = _props.currentLabel,
					    userName = _props.userName;

					var config = (0, _constants.GET_CHART_CONFIG_BY_TYPE)({
						chartType: chartType,
						expected: expected,
						expectedLabel: expectedLabel,
						averageLabel: averageLabel,
						currentLabel: currentLabel,
						average: average,
						current: current,
						userName: userName
					});
					return _highcharts2.default.chart(this.getChartContainerId(), config);
				}
			}, {
				key: "render",
				value: function render(_ref2) {
					var style = _ref2.style;

					var id = this.getChartContainerId();
					return (0, _preact.h)("div", { style: style, id: id });
				}
			}]);

			return PitchChart;
		}(_preact.Component);

		exports.default = PitchChart;
		module.exports = exports["default"];
	});
});

/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports !== "undefined") {
		factory(exports, require("@utils/core"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.core);
		global.constants = mod.exports;
	}
})(this, function (exports) {
	"use strict";

	(function (global, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports !== "undefined") {
			factory(exports);
		} else {
			var mod = {
				exports: {}
			};
			factory(mod.exports, global.core);
			global.constants = mod.exports;
		}
	})(undefined, function (exports, _core) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.GET_CHART_CONFIG_BY_TYPE = exports.COMMON_HIGHCHART_CONFIG = exports.CHART_TYPE = undefined;
		var CHART_TYPE = exports.CHART_TYPE = {
			PITCH_PACE: "pace",
			PITCH_LENGTH: "length"
		};

		var COMMON_HIGHCHART_CONFIG = exports.COMMON_HIGHCHART_CONFIG = {
			title: {
				align: "left",
				style: {
					fontWeight: "normal",
					fontSize: "11px",
					color: "#666666"
				}
			},
			subtitle: {
				align: "left",
				style: {
					fontWeight: "600",
					fontSize: "16px",
					color: "#000000"
				}
			},
			credits: {
				enabled: false
			},
			chart: {
				borderWidth: 1,
				borderColor: "#e0e0e0",
				spacing: [20, 20, 20, 20],
				marginTop: 80,
				style: {
					fontFamily: "Open Sans"
				}
			},
			yAxis: {
				labels: {
					enabled: false
				},
				title: {
					enabled: false
				},
				lineWidth: 1,
				lineColor: "#b1b1b1",
				gridLineWidth: 0
			},
			exporting: {
				enabled: false
			},
			tooltip: {
				enabled: false
			},
			legend: {
				align: "left",
				itemMarginBottom: 3,
				itemStyle: {
					fontSize: "12px",
					fontWeight: "normal",
					cursor: "default",
					color: "#999999"
				}
			},
			plotOptions: {
				series: {
					states: {
						hover: {
							enabled: false
						}
					},
					label: {
						enabled: false
					},
					marker: {
						enabled: false
					},
					dataLabels: {
						enabled: true,
						formatter: function formatter() {
							if (this.x == 0) return this.point.label;
						}
					},
					events: {
						legendItemClick: function legendItemClick() {
							return false;
						}
					},
					allowPointSelect: false
				},
				line: {
					dashStyle: "dash"
				},
				bar: {
					pointWidth: 20
				}
			}
		};

		var HIGHCHART_CONSTANT_BY_CHART_TYPE = function HIGHCHART_CONSTANT_BY_CHART_TYPE(_ref) {
			var chartType = _ref.chartType,
			    userName = _ref.userName,
			    average = _ref.average,
			    current = _ref.current,
			    expected = _ref.expected,
			    averageLabel = _ref.averageLabel,
			    expectedLabel = _ref.expectedLabel,
			    currentLabel = _ref.currentLabel;

			var highchartConstants = {};
			highchartConstants.subtitle = currentLabel;
			highchartConstants.average = {
				label: averageLabel,
				seriesName: "Avg for this submission",
				value: average
			};
			highchartConstants.current = {
				label: currentLabel,
				value: current,
				seriesName: "Learner"
			};
			switch (chartType) {
				case CHART_TYPE.PITCH_PACE:
					highchartConstants.title = "PITCH PACE OF " + userName;
					highchartConstants.xAxis = {
						category: "Pace"
					};
					highchartConstants.expected = {
						label: expectedLabel,
						seriesName: "Industry Standard",
						value: expected
					};
					break;
				case CHART_TYPE.PITCH_LENGTH:
					highchartConstants.title = "LENGTH OF SUBMISSION OF " + userName;
					highchartConstants.xAxis = {
						category: "length"
					};
					highchartConstants.expected = {
						label: expectedLabel,
						seriesName: "Expected length of submission",
						value: expected
					};
					break;
			}
			return highchartConstants;
		};

		var GET_LINE_CHART_DATA = function GET_LINE_CHART_DATA(_ref2) {
			var value = _ref2.value,
			    label = _ref2.label;

			var result = [];
			for (var i = 0; i < 10; i++) {
				result.push({
					y: value,
					label: label
				});
			}
			return result;
		};

		var GET_CHART_CONFIG_BY_TYPE = exports.GET_CHART_CONFIG_BY_TYPE = function GET_CHART_CONFIG_BY_TYPE(params) {
			var highchartConstants = HIGHCHART_CONSTANT_BY_CHART_TYPE(params);

			var config = {
				title: {
					text: highchartConstants.title
				},
				subtitle: {
					text: highchartConstants.subtitle
				},
				xAxis: [{
					categories: [highchartConstants.xAxis.category],
					tickWidth: 0,
					lineColor: "#b1b1b1",
					labels: {
						style: {
							color: "#000000"
						}
					}
				}, {
					opposite: true,
					visible: false
				}],
				series: [{
					name: highchartConstants.average.seriesName,
					color: "#58b75b",
					data: [],
					legendIndex: 1,
					type: "bar"
				}, {
					name: highchartConstants.current.seriesName,
					type: "bar",
					xAxis: 0,
					color: "#ffa800",
					legendIndex: 0,
					data: [highchartConstants.current.value]
				}, {
					name: highchartConstants.expected.seriesName,
					color: "#1e88e5",
					data: [],
					legendIndex: 2,
					type: "bar"
				}, {
					name: highchartConstants.average.value,
					type: "line",
					showInLegend: false,
					xAxis: 1,
					color: "#58b75b",
					dataLabels: {
						align: highchartConstants.average.value < highchartConstants.expected.value ? "right" : "left",
						color: "#58b75b"
					},
					data: GET_LINE_CHART_DATA(highchartConstants.average)
				}, {
					name: highchartConstants.expected.value,
					type: "line",
					xAxis: 1,
					showInLegend: false,
					dataLabels: {
						align: highchartConstants.expected.value < highchartConstants.average.value ? "right" : "left",
						color: "#1e88e5"
					},
					color: "#1e88e5",
					data: GET_LINE_CHART_DATA(highchartConstants.expected)
				}]
			};
			debugger; //eslint-disable-line
			return (0, _core.deepmerge)(COMMON_HIGHCHART_CONFIG, config);
		};
	});
});

/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.highcharts = mod.exports;
  }
})(this, function (module) {
  "use strict";

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  /*
   Highcharts JS v5.0.14 (2017-07-28)
  
   (c) 2009-2016 Torstein Honsi
  
   License: www.highcharts.com/license
  */
  (function (M, S) {
    "object" === (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = M.document ? S(M) : S : M.Highcharts = S(M);
  })("undefined" !== typeof window ? window : undefined, function (M) {
    M = function () {
      var a = window,
          C = a.document,
          A = a.navigator && a.navigator.userAgent || "",
          F = C && C.createElementNS && !!C.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
          E = /(edge|msie|trident)/i.test(A) && !window.opera,
          m = !F,
          f = /Firefox/.test(A),
          l = f && 4 > parseInt(A.split("Firefox/")[1], 10);return a.Highcharts ? a.Highcharts.error(16, !0) : { product: "Highcharts",
        version: "5.0.14", deg2rad: 2 * Math.PI / 360, doc: C, hasBidiBug: l, hasTouch: C && void 0 !== C.documentElement.ontouchstart, isMS: E, isWebKit: /AppleWebKit/.test(A), isFirefox: f, isTouchDevice: /(Mobile|Android|Windows Phone)/.test(A), SVG_NS: "http://www.w3.org/2000/svg", chartCount: 0, seriesTypes: {}, symbolSizes: {}, svg: F, vml: m, win: a, marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"], noop: function noop() {}, charts: [] };
    }();(function (a) {
      var C = [],
          A = a.charts,
          F = a.doc,
          E = a.win;a.error = function (m, f) {
        m = a.isNumber(m) ? "Highcharts error #" + m + ": www.highcharts.com/errors/" + m : m;if (f) throw Error(m);E.console && console.log(m);
      };a.Fx = function (a, f, l) {
        this.options = f;this.elem = a;this.prop = l;
      };a.Fx.prototype = { dSetter: function dSetter() {
          var a = this.paths[0],
              f = this.paths[1],
              l = [],
              r = this.now,
              u = a.length,
              t;if (1 === r) l = this.toD;else if (u === f.length && 1 > r) for (; u--;) {
            t = parseFloat(a[u]), l[u] = isNaN(t) ? a[u] : r * parseFloat(f[u] - t) + t;
          } else l = f;this.elem.attr("d", l, null, !0);
        }, update: function update() {
          var a = this.elem,
              f = this.prop,
              l = this.now,
              r = this.options.step;if (this[f + "Setter"]) this[f + "Setter"]();else a.attr ? a.element && a.attr(f, l, null, !0) : a.style[f] = l + this.unit;r && r.call(a, l, this);
        }, run: function run(a, f, l) {
          var r = this,
              m = function m(a) {
            return m.stopped ? !1 : r.step(a);
          },
              t;this.startTime = +new Date();this.start = a;this.end = f;this.unit = l;this.now = this.start;this.pos = 0;m.elem = this.elem;m.prop = this.prop;m() && 1 === C.push(m) && (m.timerId = setInterval(function () {
            for (t = 0; t < C.length; t++) {
              C[t]() || C.splice(t--, 1);
            }C.length || clearInterval(m.timerId);
          }, 13));
        }, step: function step(m) {
          var f = +new Date(),
              l,
              r = this.options,
              u = this.elem,
              t = r.complete,
              g = r.duration,
              d = r.curAnim;u.attr && !u.element ? m = !1 : m || f >= g + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), l = d[this.prop] = !0, a.objectEach(d, function (a) {
            !0 !== a && (l = !1);
          }), l && t && t.call(u), m = !1) : (this.pos = r.easing((f - this.startTime) / g), this.now = this.start + (this.end - this.start) * this.pos, this.update(), m = !0);return m;
        }, initPath: function initPath(m, f, l) {
          function r(a) {
            var c, e;for (n = a.length; n--;) {
              c = "M" === a[n] || "L" === a[n], e = /[a-zA-Z]/.test(a[n + 3]), c && e && a.splice(n + 1, 0, a[n + 1], a[n + 2], a[n + 1], a[n + 2]);
            }
          }
          function u(a, c) {
            for (; a.length < v;) {
              a[0] = c[v - a.length];var b = a.slice(0, e);[].splice.apply(a, [0, 0].concat(b));D && (b = a.slice(a.length - e), [].splice.apply(a, [a.length, 0].concat(b)), n--);
            }a[0] = "M";
          }function t(a, c) {
            for (var q = (v - a.length) / e; 0 < q && q--;) {
              y = a.slice().splice(a.length / J - e, e * J), y[0] = c[v - e - q * e], b && (y[e - 6] = y[e - 2], y[e - 5] = y[e - 1]), [].splice.apply(a, [a.length / J, 0].concat(y)), D && q--;
            }
          }f = f || "";var g,
              d = m.startX,
              k = m.endX,
              b = -1 < f.indexOf("C"),
              e = b ? 7 : 3,
              v,
              y,
              n;f = f.split(" ");l = l.slice();var D = m.isArea,
              J = D ? 2 : 1,
              c;b && (r(f), r(l));if (d && k) {
            for (n = 0; n < d.length; n++) {
              if (d[n] === k[0]) {
                g = n;break;
              } else if (d[0] === k[k.length - d.length + n]) {
                g = n;c = !0;break;
              }
            }void 0 === g && (f = []);
          }f.length && a.isNumber(g) && (v = l.length + g * J * e, c ? (u(f, l), t(l, f)) : (u(l, f), t(f, l)));return [f, l];
        } };a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter = function () {
        this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0);
      };a.extend = function (a, f) {
        var m;a || (a = {});for (m in f) {
          a[m] = f[m];
        }return a;
      };a.merge = function () {
        var m,
            f = arguments,
            l,
            r = {},
            u = function u(f, g) {
          "object" !== (typeof f === "undefined" ? "undefined" : _typeof(f)) && (f = {});a.objectEach(g, function (d, k) {
            !a.isObject(d, !0) || a.isClass(d) || a.isDOMElement(d) ? f[k] = g[k] : f[k] = u(f[k] || {}, d);
          });return f;
        };!0 === f[0] && (r = f[1], f = Array.prototype.slice.call(f, 2));l = f.length;for (m = 0; m < l; m++) {
          r = u(r, f[m]);
        }return r;
      };a.pInt = function (a, f) {
        return parseInt(a, f || 10);
      };a.isString = function (a) {
        return "string" === typeof a;
      };a.isArray = function (a) {
        a = Object.prototype.toString.call(a);return "[object Array]" === a || "[object Array Iterator]" === a;
      };a.isObject = function (m, f) {
        return !!m && "object" === (typeof m === "undefined" ? "undefined" : _typeof(m)) && (!f || !a.isArray(m));
      };a.isDOMElement = function (m) {
        return a.isObject(m) && "number" === typeof m.nodeType;
      };a.isClass = function (m) {
        var f = m && m.constructor;return !(!a.isObject(m, !0) || a.isDOMElement(m) || !f || !f.name || "Object" === f.name);
      };a.isNumber = function (a) {
        return "number" === typeof a && !isNaN(a);
      };a.erase = function (a, f) {
        for (var m = a.length; m--;) {
          if (a[m] === f) {
            a.splice(m, 1);break;
          }
        }
      };a.defined = function (a) {
        return void 0 !== a && null !== a;
      };a.attr = function (m, f, l) {
        var r;a.isString(f) ? a.defined(l) ? m.setAttribute(f, l) : m && m.getAttribute && (r = m.getAttribute(f)) : a.defined(f) && a.isObject(f) && a.objectEach(f, function (a, f) {
          m.setAttribute(f, a);
        });return r;
      };a.splat = function (m) {
        return a.isArray(m) ? m : [m];
      };a.syncTimeout = function (a, f, l) {
        if (f) return setTimeout(a, f, l);a.call(0, l);
      };a.pick = function () {
        var a = arguments,
            f,
            l,
            r = a.length;for (f = 0; f < r; f++) {
          if (l = a[f], void 0 !== l && null !== l) return l;
        }
      };a.css = function (m, f) {
        a.isMS && !a.svg && f && void 0 !== f.opacity && (f.filter = "alpha(opacity\x3d" + 100 * f.opacity + ")");a.extend(m.style, f);
      };a.createElement = function (m, f, l, r, u) {
        m = F.createElement(m);var t = a.css;f && a.extend(m, f);u && t(m, { padding: 0, border: "none", margin: 0 });l && t(m, l);r && r.appendChild(m);return m;
      };a.extendClass = function (m, f) {
        var l = function l() {};l.prototype = new m();a.extend(l.prototype, f);return l;
      };a.pad = function (a, f, l) {
        return Array((f || 2) + 1 - String(a).length).join(l || 0) + a;
      };a.relativeLength = function (a, f, l) {
        return (/%$/.test(a) ? f * parseFloat(a) / 100 + (l || 0) : parseFloat(a)
        );
      };a.wrap = function (a, f, l) {
        var r = a[f];a[f] = function () {
          var a = Array.prototype.slice.call(arguments),
              f = arguments,
              g = this;g.proceed = function () {
            r.apply(g, arguments.length ? arguments : f);
          };a.unshift(r);a = l.apply(this, a);g.proceed = null;return a;
        };
      };a.getTZOffset = function (m) {
        var f = a.Date;return 6E4 * (f.hcGetTimezoneOffset && f.hcGetTimezoneOffset(m) || f.hcTimezoneOffset || 0);
      };a.dateFormat = function (m, f, l) {
        if (!a.defined(f) || isNaN(f)) return a.defaultOptions.lang.invalidDate || "";m = a.pick(m, "%Y-%m-%d %H:%M:%S");var r = a.Date,
            u = new r(f - a.getTZOffset(f)),
            t = u[r.hcGetHours](),
            g = u[r.hcGetDay](),
            d = u[r.hcGetDate](),
            k = u[r.hcGetMonth](),
            b = u[r.hcGetFullYear](),
            e = a.defaultOptions.lang,
            v = e.weekdays,
            y = e.shortWeekdays,
            n = a.pad,
            r = a.extend({ a: y ? y[g] : v[g].substr(0, 3), A: v[g], d: n(d), e: n(d, 2, " "), w: g, b: e.shortMonths[k], B: e.months[k], m: n(k + 1), y: b.toString().substr(2, 2), Y: b, H: n(t), k: t, I: n(t % 12 || 12), l: t % 12 || 12, M: n(u[r.hcGetMinutes]()), p: 12 > t ? "AM" : "PM", P: 12 > t ? "am" : "pm", S: n(u.getSeconds()), L: n(Math.round(f % 1E3), 3) }, a.dateFormats);a.objectEach(r, function (a, e) {
          for (; -1 !== m.indexOf("%" + e);) {
            m = m.replace("%" + e, "function" === typeof a ? a(f) : a);
          }
        });return l ? m.substr(0, 1).toUpperCase() + m.substr(1) : m;
      };a.formatSingle = function (m, f) {
        var l = /\.([0-9])/,
            r = a.defaultOptions.lang;/f$/.test(m) ? (l = (l = m.match(l)) ? l[1] : -1, null !== f && (f = a.numberFormat(f, l, r.decimalPoint, -1 < m.indexOf(",") ? r.thousandsSep : ""))) : f = a.dateFormat(m, f);return f;
      };a.format = function (m, f) {
        for (var l = "{", r = !1, u, t, g, d, k = [], b; m;) {
          l = m.indexOf(l);if (-1 === l) break;u = m.slice(0, l);if (r) {
            u = u.split(":");t = u.shift().split(".");d = t.length;b = f;for (g = 0; g < d; g++) {
              b = b[t[g]];
            }u.length && (b = a.formatSingle(u.join(":"), b));k.push(b);
          } else k.push(u);
          m = m.slice(l + 1);l = (r = !r) ? "}" : "{";
        }k.push(m);return k.join("");
      };a.getMagnitude = function (a) {
        return Math.pow(10, Math.floor(Math.log(a) / Math.LN10));
      };a.normalizeTickInterval = function (m, f, l, r, u) {
        var t,
            g = m;l = a.pick(l, 1);t = m / l;f || (f = u ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === r && (1 === l ? f = a.grep(f, function (a) {
          return 0 === a % 1;
        }) : .1 >= l && (f = [1 / l])));for (r = 0; r < f.length && !(g = f[r], u && g * l >= m || !u && t <= (f[r] + (f[r + 1] || f[r])) / 2); r++) {}return g = a.correctFloat(g * l, -Math.round(Math.log(.001) / Math.LN10));
      };a.stableSort = function (a, f) {
        var l = a.length,
            r,
            m;for (m = 0; m < l; m++) {
          a[m].safeI = m;
        }a.sort(function (a, g) {
          r = f(a, g);return 0 === r ? a.safeI - g.safeI : r;
        });for (m = 0; m < l; m++) {
          delete a[m].safeI;
        }
      };a.arrayMin = function (a) {
        for (var f = a.length, l = a[0]; f--;) {
          a[f] < l && (l = a[f]);
        }return l;
      };a.arrayMax = function (a) {
        for (var f = a.length, l = a[0]; f--;) {
          a[f] > l && (l = a[f]);
        }return l;
      };a.destroyObjectProperties = function (m, f) {
        a.objectEach(m, function (a, r) {
          a && a !== f && a.destroy && a.destroy();delete m[r];
        });
      };a.discardElement = function (m) {
        var f = a.garbageBin;f || (f = a.createElement("div"));
        m && f.appendChild(m);f.innerHTML = "";
      };a.correctFloat = function (a, f) {
        return parseFloat(a.toPrecision(f || 14));
      };a.setAnimation = function (m, f) {
        f.renderer.globalAnimation = a.pick(m, f.options.chart.animation, !0);
      };a.animObject = function (m) {
        return a.isObject(m) ? a.merge(m) : { duration: m ? 500 : 0 };
      };a.timeUnits = { millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5, month: 24192E5, year: 314496E5 };a.numberFormat = function (m, f, l, r) {
        m = +m || 0;f = +f;var u = a.defaultOptions.lang,
            t = (m.toString().split(".")[1] || "").split("e")[0].length,
            g,
            d,
            k = m.toString().split("e");-1 === f ? f = Math.min(t, 20) : a.isNumber(f) || (f = 2);d = (Math.abs(k[1] ? k[0] : m) + Math.pow(10, -Math.max(f, t) - 1)).toFixed(f);t = String(a.pInt(d));g = 3 < t.length ? t.length % 3 : 0;l = a.pick(l, u.decimalPoint);r = a.pick(r, u.thousandsSep);m = (0 > m ? "-" : "") + (g ? t.substr(0, g) + r : "");m += t.substr(g).replace(/(\d{3})(?=\d)/g, "$1" + r);f && (m += l + d.slice(-f));k[1] && (m += "e" + k[1]);return m;
      };Math.easeInOutSine = function (a) {
        return -.5 * (Math.cos(Math.PI * a) - 1);
      };a.getStyle = function (m, f, l) {
        if ("width" === f) return Math.min(m.offsetWidth, m.scrollWidth) - a.getStyle(m, "padding-left") - a.getStyle(m, "padding-right");if ("height" === f) return Math.min(m.offsetHeight, m.scrollHeight) - a.getStyle(m, "padding-top") - a.getStyle(m, "padding-bottom");if (m = E.getComputedStyle(m, void 0)) m = m.getPropertyValue(f), a.pick(l, !0) && (m = a.pInt(m));return m;
      };a.inArray = function (a, f) {
        return f.indexOf ? f.indexOf(a) : [].indexOf.call(f, a);
      };a.grep = function (a, f) {
        return [].filter.call(a, f);
      };a.find = function (a, f) {
        return [].find.call(a, f);
      };a.map = function (a, f) {
        for (var l = [], r = 0, m = a.length; r < m; r++) {
          l[r] = f.call(a[r], a[r], r, a);
        }return l;
      };a.offset = function (a) {
        var f = F.documentElement;a = a.getBoundingClientRect();return { top: a.top + (E.pageYOffset || f.scrollTop) - (f.clientTop || 0), left: a.left + (E.pageXOffset || f.scrollLeft) - (f.clientLeft || 0) };
      };a.stop = function (a, f) {
        for (var l = C.length; l--;) {
          C[l].elem !== a || f && f !== C[l].prop || (C[l].stopped = !0);
        }
      };a.each = function (a, f, l) {
        return Array.prototype.forEach.call(a, f, l);
      };a.objectEach = function (a, f, l) {
        for (var r in a) {
          a.hasOwnProperty(r) && f.call(l, a[r], r, a);
        }
      };
      a.addEvent = function (m, f, l) {
        function r(a) {
          a.target = a.srcElement || E;l.call(m, a);
        }var u = m.hcEvents = m.hcEvents || {};m.addEventListener ? m.addEventListener(f, l, !1) : m.attachEvent && (m.hcEventsIE || (m.hcEventsIE = {}), l.hcGetKey || (l.hcGetKey = a.uniqueKey()), m.hcEventsIE[l.hcGetKey] = r, m.attachEvent("on" + f, r));u[f] || (u[f] = []);u[f].push(l);return function () {
          a.removeEvent(m, f, l);
        };
      };a.removeEvent = function (m, f, l) {
        function r(a, b) {
          m.removeEventListener ? m.removeEventListener(a, b, !1) : m.attachEvent && (b = m.hcEventsIE[b.hcGetKey], m.detachEvent("on" + a, b));
        }function u() {
          var d, b;m.nodeName && (f ? (d = {}, d[f] = !0) : d = g, a.objectEach(d, function (a, d) {
            if (g[d]) for (b = g[d].length; b--;) {
              r(d, g[d][b]);
            }
          }));
        }var t,
            g = m.hcEvents,
            d;g && (f ? (t = g[f] || [], l ? (d = a.inArray(l, t), -1 < d && (t.splice(d, 1), g[f] = t), r(f, l)) : (u(), g[f] = [])) : (u(), m.hcEvents = {}));
      };a.fireEvent = function (m, f, l, r) {
        var u;u = m.hcEvents;var t, g;l = l || {};if (F.createEvent && (m.dispatchEvent || m.fireEvent)) u = F.createEvent("Events"), u.initEvent(f, !0, !0), a.extend(u, l), m.dispatchEvent ? m.dispatchEvent(u) : m.fireEvent(f, u);else if (u) for (u = u[f] || [], t = u.length, l.target || a.extend(l, { preventDefault: function preventDefault() {
            l.defaultPrevented = !0;
          }, target: m, type: f }), f = 0; f < t; f++) {
          (g = u[f]) && !1 === g.call(m, l) && l.preventDefault();
        }r && !l.defaultPrevented && r(l);
      };a.animate = function (m, f, l) {
        var r,
            u = "",
            t,
            g,
            d;a.isObject(l) || (d = arguments, l = { duration: d[2], easing: d[3], complete: d[4] });a.isNumber(l.duration) || (l.duration = 400);l.easing = "function" === typeof l.easing ? l.easing : Math[l.easing] || Math.easeInOutSine;l.curAnim = a.merge(f);a.objectEach(f, function (d, b) {
          a.stop(m, b);g = new a.Fx(m, l, b);t = null;"d" === b ? (g.paths = g.initPath(m, m.d, f.d), g.toD = f.d, r = 0, t = 1) : m.attr ? r = m.attr(b) : (r = parseFloat(a.getStyle(m, b)) || 0, "opacity" !== b && (u = "px"));t || (t = d);t && t.match && t.match("px") && (t = t.replace(/px/g, ""));g.run(r, t, u);
        });
      };a.seriesType = function (m, f, l, r, u) {
        var t = a.getOptions(),
            g = a.seriesTypes;t.plotOptions[m] = a.merge(t.plotOptions[f], l);g[m] = a.extendClass(g[f] || function () {}, r);g[m].prototype.type = m;u && (g[m].prototype.pointClass = a.extendClass(a.Point, u));return g[m];
      };a.uniqueKey = function () {
        var a = Math.random().toString(36).substring(2, 9),
            f = 0;return function () {
          return "highcharts-" + a + "-" + f++;
        };
      }();E.jQuery && (E.jQuery.fn.highcharts = function () {
        var m = [].slice.call(arguments);if (this[0]) return m[0] ? (new a[a.isString(m[0]) ? m.shift() : "Chart"](this[0], m[0], m[1]), this) : A[a.attr(this[0], "data-highcharts-chart")];
      });F && !F.defaultView && (a.getStyle = function (m, f) {
        var l = { width: "clientWidth", height: "clientHeight" }[f];if (m.style[f]) return a.pInt(m.style[f]);"opacity" === f && (f = "filter");if (l) return m.style.zoom = 1, Math.max(m[l] - 2 * a.getStyle(m, "padding"), 0);m = m.currentStyle[f.replace(/\-(\w)/g, function (a, f) {
          return f.toUpperCase();
        })];"filter" === f && (m = m.replace(/alpha\(opacity=([0-9]+)\)/, function (a, f) {
          return f / 100;
        }));return "" === m ? 1 : a.pInt(m);
      });Array.prototype.forEach || (a.each = function (a, f, l) {
        for (var r = 0, m = a.length; r < m; r++) {
          if (!1 === f.call(l, a[r], r, a)) return r;
        }
      });Array.prototype.indexOf || (a.inArray = function (a, f) {
        var l,
            r = 0;if (f) for (l = f.length; r < l; r++) {
          if (f[r] === a) return r;
        }return -1;
      });Array.prototype.filter || (a.grep = function (a, f) {
        for (var l = [], r = 0, m = a.length; r < m; r++) {
          f(a[r], r) && l.push(a[r]);
        }return l;
      });Array.prototype.find || (a.find = function (a, f) {
        var l,
            r = a.length;for (l = 0; l < r; l++) {
          if (f(a[l], l)) return a[l];
        }
      });
    })(M);(function (a) {
      var C = a.each,
          A = a.isNumber,
          F = a.map,
          E = a.merge,
          m = a.pInt;a.Color = function (f) {
        if (!(this instanceof a.Color)) return new a.Color(f);this.init(f);
      };a.Color.prototype = { parsers: [{ regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/, parse: function parse(a) {
            return [m(a[1]), m(a[2]), m(a[3]), parseFloat(a[4], 10)];
          } }, { regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function parse(a) {
            return [m(a[1]), m(a[2]), m(a[3]), 1];
          } }], names: { none: "rgba(255,255,255,0)", white: "#ffffff", black: "#000000" }, init: function init(f) {
          var l, r, m, t;if ((this.input = f = this.names[f && f.toLowerCase ? f.toLowerCase() : ""] || f) && f.stops) this.stops = F(f.stops, function (g) {
            return new a.Color(g[1]);
          });else if (f && "#" === f.charAt() && (l = f.length, f = parseInt(f.substr(1), 16), 7 === l ? r = [(f & 16711680) >> 16, (f & 65280) >> 8, f & 255, 1] : 4 === l && (r = [(f & 3840) >> 4 | (f & 3840) >> 8, (f & 240) >> 4 | f & 240, (f & 15) << 4 | f & 15, 1])), !r) for (m = this.parsers.length; m-- && !r;) {
            t = this.parsers[m], (l = t.regex.exec(f)) && (r = t.parse(l));
          }this.rgba = r || [];
        }, get: function get(a) {
          var f = this.input,
              r = this.rgba,
              m;this.stops ? (m = E(f), m.stops = [].concat(m.stops), C(this.stops, function (f, g) {
            m.stops[g] = [m.stops[g][0], f.get(a)];
          })) : m = r && A(r[0]) ? "rgb" === a || !a && 1 === r[3] ? "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")" : "a" === a ? r[3] : "rgba(" + r.join(",") + ")" : f;return m;
        }, brighten: function brighten(a) {
          var f,
              r = this.rgba;
          if (this.stops) C(this.stops, function (f) {
            f.brighten(a);
          });else if (A(a) && 0 !== a) for (f = 0; 3 > f; f++) {
            r[f] += m(255 * a), 0 > r[f] && (r[f] = 0), 255 < r[f] && (r[f] = 255);
          }return this;
        }, setOpacity: function setOpacity(a) {
          this.rgba[3] = a;return this;
        }, tweenTo: function tweenTo(a, l) {
          var f, m;a.rgba.length ? (f = this.rgba, a = a.rgba, m = 1 !== a[3] || 1 !== f[3], a = (m ? "rgba(" : "rgb(") + Math.round(a[0] + (f[0] - a[0]) * (1 - l)) + "," + Math.round(a[1] + (f[1] - a[1]) * (1 - l)) + "," + Math.round(a[2] + (f[2] - a[2]) * (1 - l)) + (m ? "," + (a[3] + (f[3] - a[3]) * (1 - l)) : "") + ")") : a = a.input || "none";return a;
        } };a.color = function (f) {
        return new a.Color(f);
      };
    })(M);(function (a) {
      var C,
          A,
          F = a.addEvent,
          E = a.animate,
          m = a.attr,
          f = a.charts,
          l = a.color,
          r = a.css,
          u = a.createElement,
          t = a.defined,
          g = a.deg2rad,
          d = a.destroyObjectProperties,
          k = a.doc,
          b = a.each,
          e = a.extend,
          v = a.erase,
          y = a.grep,
          n = a.hasTouch,
          D = a.inArray,
          J = a.isArray,
          c = a.isFirefox,
          G = a.isMS,
          q = a.isObject,
          B = a.isString,
          K = a.isWebKit,
          p = a.merge,
          z = a.noop,
          I = a.objectEach,
          L = a.pick,
          h = a.pInt,
          w = a.removeEvent,
          P = a.stop,
          H = a.svg,
          O = a.SVG_NS,
          Q = a.symbolSizes,
          R = a.win;C = a.SVGElement = function () {
        return this;
      };e(C.prototype, { opacity: 1, SVG_NS: O, textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "), init: function init(a, h) {
          this.element = "span" === h ? u(h) : k.createElementNS(this.SVG_NS, h);this.renderer = a;
        }, animate: function animate(x, h, c) {
          h = a.animObject(L(h, this.renderer.globalAnimation, !0));0 !== h.duration ? (c && (h.complete = c), E(this, x, h)) : (this.attr(x, null, c), h.step && h.step.call(this));return this;
        }, colorGradient: function colorGradient(x, h, c) {
          var w = this.renderer,
              e,
              q,
              N,
              d,
              n,
              g,
              k,
              H,
              G,
              v,
              z = [],
              f;x.radialGradient ? q = "radialGradient" : x.linearGradient && (q = "linearGradient");q && (N = x[q], n = w.gradients, k = x.stops, v = c.radialReference, J(N) && (x[q] = N = { x1: N[0], y1: N[1], x2: N[2], y2: N[3], gradientUnits: "userSpaceOnUse" }), "radialGradient" === q && v && !t(N.gradientUnits) && (d = N, N = p(N, w.getRadialAttr(v, d), { gradientUnits: "userSpaceOnUse" })), I(N, function (a, x) {
            "id" !== x && z.push(x, a);
          }), I(k, function (a) {
            z.push(a);
          }), z = z.join(","), n[z] ? v = n[z].attr("id") : (N.id = v = a.uniqueKey(), n[z] = g = w.createElement(q).attr(N).add(w.defs), g.radAttr = d, g.stops = [], b(k, function (x) {
            0 === x[1].indexOf("rgba") ? (e = a.color(x[1]), H = e.get("rgb"), G = e.get("a")) : (H = x[1], G = 1);x = w.createElement("stop").attr({ offset: x[0], "stop-color": H, "stop-opacity": G }).add(g);g.stops.push(x);
          })), f = "url(" + w.url + "#" + v + ")", c.setAttribute(h, f), c.gradient = z, x.toString = function () {
            return f;
          });
        }, applyTextOutline: function applyTextOutline(x) {
          var h = this.element,
              c,
              w,
              p,
              e,
              q;-1 !== x.indexOf("contrast") && (x = x.replace(/contrast/g, this.renderer.getContrast(h.style.fill)));x = x.split(" ");w = x[x.length - 1];
          if ((p = x[0]) && "none" !== p && a.svg) {
            this.fakeTS = !0;x = [].slice.call(h.getElementsByTagName("tspan"));this.ySetter = this.xSetter;p = p.replace(/(^[\d\.]+)(.*?)$/g, function (a, x, h) {
              return 2 * x + h;
            });for (q = x.length; q--;) {
              c = x[q], "highcharts-text-outline" === c.getAttribute("class") && v(x, h.removeChild(c));
            }e = h.firstChild;b(x, function (a, x) {
              0 === x && (a.setAttribute("x", h.getAttribute("x")), x = h.getAttribute("y"), a.setAttribute("y", x || 0), null === x && h.setAttribute("y", 0));a = a.cloneNode(1);m(a, { "class": "highcharts-text-outline",
                fill: w, stroke: w, "stroke-width": p, "stroke-linejoin": "round" });h.insertBefore(a, e);
            });
          }
        }, attr: function attr(a, h, c, w) {
          var x,
              p = this.element,
              e,
              q = this,
              b,
              N;"string" === typeof a && void 0 !== h && (x = a, a = {}, a[x] = h);"string" === typeof a ? q = (this[a + "Getter"] || this._defaultGetter).call(this, a, p) : (I(a, function (x, h) {
            b = !1;w || P(this, h);this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(h) && (e || (this.symbolAttr(a), e = !0), b = !0);!this.rotation || "x" !== h && "y" !== h || (this.doTransform = !0);b || (N = this[h + "Setter"] || this._defaultSetter, N.call(this, x, h, p), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(h) && this.updateShadows(h, x, N));
          }, this), this.afterSetters());c && c();return q;
        }, afterSetters: function afterSetters() {
          this.doTransform && (this.updateTransform(), this.doTransform = !1);
        }, updateShadows: function updateShadows(a, h, c) {
          for (var x = this.shadows, w = x.length; w--;) {
            c.call(x[w], "height" === a ? Math.max(h - (x[w].cutHeight || 0), 0) : "d" === a ? this.d : h, a, x[w]);
          }
        }, addClass: function addClass(a, h) {
          var x = this.attr("class") || "";-1 === x.indexOf(a) && (h || (a = (x + (x ? " " : "") + a).replace("  ", " ")), this.attr("class", a));return this;
        }, hasClass: function hasClass(a) {
          return -1 !== D(a, (this.attr("class") || "").split(" "));
        }, removeClass: function removeClass(a) {
          return this.attr("class", (this.attr("class") || "").replace(a, ""));
        }, symbolAttr: function symbolAttr(a) {
          var x = this;b("x y r start end width height innerR anchorX anchorY".split(" "), function (h) {
            x[h] = L(a[h], x[h]);
          });x.attr({ d: x.renderer.symbols[x.symbolName](x.x, x.y, x.width, x.height, x) });
        }, clip: function clip(a) {
          return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none");
        }, crisp: function crisp(a, h) {
          var x = this,
              c = {},
              w;h = h || a.strokeWidth || 0;w = Math.round(h) % 2 / 2;a.x = Math.floor(a.x || x.x || 0) + w;a.y = Math.floor(a.y || x.y || 0) + w;a.width = Math.floor((a.width || x.width || 0) - 2 * w);a.height = Math.floor((a.height || x.height || 0) - 2 * w);t(a.strokeWidth) && (a.strokeWidth = h);I(a, function (a, h) {
            x[h] !== a && (x[h] = c[h] = a);
          });return c;
        }, css: function css(a) {
          var x = this.styles,
              c = {},
              w = this.element,
              p,
              q = "",
              b,
              d = !x,
              n = ["textOutline", "textOverflow", "width"];a && a.color && (a.fill = a.color);
          x && I(a, function (a, h) {
            a !== x[h] && (c[h] = a, d = !0);
          });d && (x && (a = e(x, c)), p = this.textWidth = a && a.width && "auto" !== a.width && "text" === w.nodeName.toLowerCase() && h(a.width), this.styles = a, p && !H && this.renderer.forExport && delete a.width, G && !H ? r(this.element, a) : (b = function b(a, x) {
            return "-" + x.toLowerCase();
          }, I(a, function (a, x) {
            -1 === D(x, n) && (q += x.replace(/([A-Z])/g, b) + ":" + a + ";");
          }), q && m(w, "style", q)), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
          return this;
        }, strokeWidth: function strokeWidth() {
          return this["stroke-width"] || 0;
        }, on: function on(a, h) {
          var x = this,
              c = x.element;n && "click" === a ? (c.ontouchstart = function (a) {
            x.touchEventFired = Date.now();a.preventDefault();h.call(c, a);
          }, c.onclick = function (a) {
            (-1 === R.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (x.touchEventFired || 0)) && h.call(c, a);
          }) : c["on" + a] = h;return this;
        }, setRadialReference: function setRadialReference(a) {
          var x = this.renderer.gradients[this.element.gradient];this.element.radialReference = a;x && x.radAttr && x.animate(this.renderer.getRadialAttr(a, x.radAttr));return this;
        }, translate: function translate(a, h) {
          return this.attr({ translateX: a, translateY: h });
        }, invert: function invert(a) {
          this.inverted = a;this.updateTransform();return this;
        }, updateTransform: function updateTransform() {
          var a = this.translateX || 0,
              h = this.translateY || 0,
              c = this.scaleX,
              w = this.scaleY,
              p = this.inverted,
              e = this.rotation,
              q = this.element;p && (a += this.width, h += this.height);a = ["translate(" + a + "," + h + ")"];p ? a.push("rotate(90) scale(-1,1)") : e && a.push("rotate(" + e + " " + (q.getAttribute("x") || 0) + " " + (q.getAttribute("y") || 0) + ")");(t(c) || t(w)) && a.push("scale(" + L(c, 1) + " " + L(w, 1) + ")");a.length && q.setAttribute("transform", a.join(" "));
        }, toFront: function toFront() {
          var a = this.element;a.parentNode.appendChild(a);return this;
        }, align: function align(a, h, c) {
          var x,
              w,
              p,
              e,
              q = {};w = this.renderer;p = w.alignedObjects;var b, d;if (a) {
            if (this.alignOptions = a, this.alignByTranslate = h, !c || B(c)) this.alignTo = x = c || "renderer", v(p, this), p.push(this), c = null;
          } else a = this.alignOptions, h = this.alignByTranslate, x = this.alignTo;c = L(c, w[x], w);x = a.align;w = a.verticalAlign;p = (c.x || 0) + (a.x || 0);e = (c.y || 0) + (a.y || 0);"right" === x ? b = 1 : "center" === x && (b = 2);b && (p += (c.width - (a.width || 0)) / b);q[h ? "translateX" : "x"] = Math.round(p);"bottom" === w ? d = 1 : "middle" === w && (d = 2);d && (e += (c.height - (a.height || 0)) / d);q[h ? "translateY" : "y"] = Math.round(e);this[this.placed ? "animate" : "attr"](q);this.placed = !0;this.alignAttr = q;return this;
        }, getBBox: function getBBox(a, h) {
          var x,
              c = this.renderer,
              w,
              p = this.element,
              q = this.styles,
              d,
              n = this.textStr,
              k,
              N = c.cache,
              H = c.cacheKeys,
              G;h = L(h, this.rotation);w = h * g;d = q && q.fontSize;void 0 !== n && (G = n.toString(), -1 === G.indexOf("\x3c") && (G = G.replace(/[0-9]/g, "0")), G += ["", h || 0, d, q && q.width, q && q.textOverflow].join());G && !a && (x = N[G]);if (!x) {
            if (p.namespaceURI === this.SVG_NS || c.forExport) {
              try {
                (k = this.fakeTS && function (a) {
                  b(p.querySelectorAll(".highcharts-text-outline"), function (x) {
                    x.style.display = a;
                  });
                }) && k("none"), x = p.getBBox ? e({}, p.getBBox()) : { width: p.offsetWidth, height: p.offsetHeight }, k && k("");
              } catch (W) {}if (!x || 0 > x.width) x = { width: 0, height: 0 };
            } else x = this.htmlGetBBox();c.isSVG && (a = x.width, c = x.height, q && "11px" === q.fontSize && 17 === Math.round(c) && (x.height = c = 14), h && (x.width = Math.abs(c * Math.sin(w)) + Math.abs(a * Math.cos(w)), x.height = Math.abs(c * Math.cos(w)) + Math.abs(a * Math.sin(w))));if (G && 0 < x.height) {
              for (; 250 < H.length;) {
                delete N[H.shift()];
              }N[G] || H.push(G);N[G] = x;
            }
          }return x;
        }, show: function show(a) {
          return this.attr({ visibility: a ? "inherit" : "visible" });
        }, hide: function hide() {
          return this.attr({ visibility: "hidden" });
        }, fadeOut: function fadeOut(a) {
          var x = this;x.animate({ opacity: 0 }, { duration: a || 150, complete: function complete() {
              x.attr({ y: -9999 });
            } });
        }, add: function add(a) {
          var x = this.renderer,
              h = this.element,
              c;a && (this.parentGroup = a);this.parentInverted = a && a.inverted;void 0 !== this.textStr && x.buildText(this);this.added = !0;if (!a || a.handleZ || this.zIndex) c = this.zIndexSetter();c || (a ? a.element : x.box).appendChild(h);if (this.onAdd) this.onAdd();return this;
        }, safeRemoveChild: function safeRemoveChild(a) {
          var x = a.parentNode;x && x.removeChild(a);
        }, destroy: function destroy() {
          var a = this,
              h = a.element || {},
              c = a.renderer.isSVG && "SPAN" === h.nodeName && a.parentGroup,
              w = h.ownerSVGElement;h.onclick = h.onmouseout = h.onmouseover = h.onmousemove = h.point = null;P(a);a.clipPath && w && (b(w.querySelectorAll("[clip-path]"), function (x) {
            -1 < x.getAttribute("clip-path").indexOf(a.clipPath.element.id + ")") && x.removeAttribute("clip-path");
          }), a.clipPath = a.clipPath.destroy());if (a.stops) {
            for (w = 0; w < a.stops.length; w++) {
              a.stops[w] = a.stops[w].destroy();
            }a.stops = null;
          }a.safeRemoveChild(h);for (a.destroyShadows(); c && c.div && 0 === c.div.childNodes.length;) {
            h = c.parentGroup, a.safeRemoveChild(c.div), delete c.div, c = h;
          }a.alignTo && v(a.renderer.alignedObjects, a);I(a, function (x, h) {
            delete a[h];
          });
          return null;
        }, shadow: function shadow(a, h, c) {
          var x = [],
              w,
              p,
              q = this.element,
              e,
              b,
              d,
              n;if (!a) this.destroyShadows();else if (!this.shadows) {
            b = L(a.width, 3);d = (a.opacity || .15) / b;n = this.parentInverted ? "(-1,-1)" : "(" + L(a.offsetX, 1) + ", " + L(a.offsetY, 1) + ")";for (w = 1; w <= b; w++) {
              p = q.cloneNode(0), e = 2 * b + 1 - 2 * w, m(p, { isShadow: "true", stroke: a.color || "#000000", "stroke-opacity": d * w, "stroke-width": e, transform: "translate" + n, fill: "none" }), c && (m(p, "height", Math.max(m(p, "height") - e, 0)), p.cutHeight = e), h ? h.element.appendChild(p) : q.parentNode.insertBefore(p, q), x.push(p);
            }this.shadows = x;
          }return this;
        }, destroyShadows: function destroyShadows() {
          b(this.shadows || [], function (a) {
            this.safeRemoveChild(a);
          }, this);this.shadows = void 0;
        }, xGetter: function xGetter(a) {
          "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));return this._defaultGetter(a);
        }, _defaultGetter: function _defaultGetter(a) {
          a = L(this[a], this.element ? this.element.getAttribute(a) : null, 0);/^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));return a;
        }, dSetter: function dSetter(a, h, c) {
          a && a.join && (a = a.join(" "));/(NaN| {2}|^$)/.test(a) && (a = "M 0 0");this[h] !== a && (c.setAttribute(h, a), this[h] = a);
        }, dashstyleSetter: function dashstyleSetter(a) {
          var x,
              c = this["stroke-width"];"inherit" === c && (c = 1);if (a = a && a.toLowerCase()) {
            a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");for (x = a.length; x--;) {
              a[x] = h(a[x]) * c;
            }a = a.join(",").replace(/NaN/g, "none");this.element.setAttribute("stroke-dasharray", a);
          }
        }, alignSetter: function alignSetter(a) {
          this.element.setAttribute("text-anchor", { left: "start", center: "middle", right: "end" }[a]);
        }, opacitySetter: function opacitySetter(a, h, c) {
          this[h] = a;c.setAttribute(h, a);
        }, titleSetter: function titleSetter(a) {
          var h = this.element.getElementsByTagName("title")[0];h || (h = k.createElementNS(this.SVG_NS, "title"), this.element.appendChild(h));h.firstChild && h.removeChild(h.firstChild);h.appendChild(k.createTextNode(String(L(a), "").replace(/<[^>]*>/g, "")));
        }, textSetter: function textSetter(a) {
          a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this));
        }, fillSetter: function fillSetter(a, h, c) {
          "string" === typeof a ? c.setAttribute(h, a) : a && this.colorGradient(a, h, c);
        }, visibilitySetter: function visibilitySetter(a, h, c) {
          "inherit" === a ? c.removeAttribute(h) : this[h] !== a && c.setAttribute(h, a);this[h] = a;
        }, zIndexSetter: function zIndexSetter(a, c) {
          var x = this.renderer,
              w = this.parentGroup,
              p = (w || x).element || x.box,
              q,
              e = this.element,
              b;q = this.added;var d;t(a) && (e.zIndex = a, a = +a, this[c] === a && (q = !1), this[c] = a);if (q) {
            (a = this.zIndex) && w && (w.handleZ = !0);c = p.childNodes;for (d = 0; d < c.length && !b; d++) {
              w = c[d], q = w.zIndex, w !== e && (h(q) > a || !t(a) && t(q) || 0 > a && !t(q) && p !== x.box) && (p.insertBefore(e, w), b = !0);
            }b || p.appendChild(e);
          }return b;
        }, _defaultSetter: function _defaultSetter(a, h, c) {
          c.setAttribute(h, a);
        } });C.prototype.yGetter = C.prototype.xGetter;C.prototype.translateXSetter = C.prototype.translateYSetter = C.prototype.rotationSetter = C.prototype.verticalAlignSetter = C.prototype.scaleXSetter = C.prototype.scaleYSetter = function (a, h) {
        this[h] = a;this.doTransform = !0;
      };C.prototype["stroke-widthSetter"] = C.prototype.strokeSetter = function (a, h, c) {
        this[h] = a;this.stroke && this["stroke-width"] ? (C.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === h && 0 === a && this.hasStroke && (c.removeAttribute("stroke"), this.hasStroke = !1);
      };A = a.SVGRenderer = function () {
        this.init.apply(this, arguments);
      };e(A.prototype, { Element: C, SVG_NS: O, init: function init(a, h, w, p, q, e) {
          var x;p = this.createElement("svg").attr({ version: "1.1", "class": "highcharts-root" }).css(this.getStyle(p));x = p.element;a.appendChild(x);-1 === a.innerHTML.indexOf("xmlns") && m(x, "xmlns", this.SVG_NS);this.isSVG = !0;this.box = x;this.boxWrapper = p;this.alignedObjects = [];this.url = (c || K) && k.getElementsByTagName("base").length ? R.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";this.createElement("desc").add().element.appendChild(k.createTextNode("Created with Highcharts 5.0.14"));this.defs = this.createElement("defs").add();this.allowHTML = e;this.forExport = q;this.gradients = {};this.cache = {};this.cacheKeys = [];this.imgCount = 0;this.setSize(h, w, !1);var b;c && a.getBoundingClientRect && (h = function h() {
            r(a, { left: 0, top: 0 });b = a.getBoundingClientRect();r(a, { left: Math.ceil(b.left) - b.left + "px", top: Math.ceil(b.top) - b.top + "px" });
          }, h(), this.unSubPixelFix = F(R, "resize", h));
        }, getStyle: function getStyle(a) {
          return this.style = e({ fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: "12px" }, a);
        }, setStyle: function setStyle(a) {
          this.boxWrapper.css(this.getStyle(a));
        }, isHidden: function isHidden() {
          return !this.boxWrapper.getBBox().width;
        }, destroy: function destroy() {
          var a = this.defs;this.box = null;this.boxWrapper = this.boxWrapper.destroy();d(this.gradients || {});this.gradients = null;a && (this.defs = a.destroy());this.unSubPixelFix && this.unSubPixelFix();return this.alignedObjects = null;
        }, createElement: function createElement(a) {
          var h = new this.Element();h.init(this, a);return h;
        }, draw: z, getRadialAttr: function getRadialAttr(a, h) {
          return { cx: a[0] - a[2] / 2 + h.cx * a[2], cy: a[1] - a[2] / 2 + h.cy * a[2], r: h.r * a[2] };
        }, getSpanWidth: function getSpanWidth(a, h) {
          var c = a.getBBox(!0).width;!H && this.forExport && (c = this.measureSpanWidth(h.firstChild.data, a.styles));return c;
        }, applyEllipsis: function applyEllipsis(a, h, c, w) {
          var x = a.rotation,
              p = c,
              q,
              e = 0,
              b = c.length,
              d = function d(a) {
            h.removeChild(h.firstChild);a && h.appendChild(k.createTextNode(a));
          },
              n;a.rotation = 0;p = this.getSpanWidth(a, h);if (n = p > w) {
            for (; e <= b;) {
              q = Math.ceil((e + b) / 2), p = c.substring(0, q) + "\u2026", d(p), p = this.getSpanWidth(a, h), e === b ? e = b + 1 : p > w ? b = q - 1 : e = q;
            }0 === b && d("");
          }a.rotation = x;return n;
        }, buildText: function buildText(a) {
          var c = a.element,
              w = this,
              x = w.forExport,
              p = L(a.textStr, "").toString(),
              q = -1 !== p.indexOf("\x3c"),
              e = c.childNodes,
              d,
              n,
              g,
              G,
              v = m(c, "x"),
              z = a.styles,
              f = a.textWidth,
              I = z && z.lineHeight,
              B = z && z.textOutline,
              D = z && "ellipsis" === z.textOverflow,
              l = z && "nowrap" === z.whiteSpace,
              P = z && z.fontSize,
              t,
              J,
              u = e.length,
              z = f && !a.added && this.box,
              K = function K(a) {
            var x;x = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : P || w.style.fontSize || 12;return I ? h(I) : w.fontMetrics(x, a.getAttribute("style") ? a : c).h;
          };t = [p, D, l, I, B, P, f].join();if (t !== a.textCache) {
            for (a.textCache = t; u--;) {
              c.removeChild(e[u]);
            }q || B || D || f || -1 !== p.indexOf(" ") ? (d = /<.*class="([^"]+)".*>/, n = /<.*style="([^"]+)".*>/, g = /<.*href="([^"]+)".*>/, z && z.appendChild(c), p = q ? p.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [p], p = y(p, function (a) {
              return "" !== a;
            }), b(p, function (h, p) {
              var q,
                  e = 0;h = h.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");q = h.split("|||");b(q, function (h) {
                if ("" !== h || 1 === q.length) {
                  var b = {},
                      z = k.createElementNS(w.SVG_NS, "tspan"),
                      y,
                      I;d.test(h) && (y = h.match(d)[1], m(z, "class", y));n.test(h) && (I = h.match(n)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), m(z, "style", I));g.test(h) && !x && (m(z, "onclick", 'location.href\x3d"' + h.match(g)[1] + '"'), r(z, { cursor: "pointer" }));h = (h.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e");if (" " !== h) {
                    z.appendChild(k.createTextNode(h));e ? b.dx = 0 : p && null !== v && (b.x = v);m(z, b);c.appendChild(z);!e && J && (!H && x && r(z, { display: "block" }), m(z, "dy", K(z)));if (f) {
                      b = h.replace(/([^\^])-/g, "$1- ").split(" ");y = 1 < q.length || p || 1 < b.length && !l;var B = [],
                          N,
                          P = K(z),
                          t = a.rotation;for (D && (G = w.applyEllipsis(a, z, h, f)); !D && y && (b.length || B.length);) {
                        a.rotation = 0, N = w.getSpanWidth(a, z), h = N > f, void 0 === G && (G = h), h && 1 !== b.length ? (z.removeChild(z.firstChild), B.unshift(b.pop())) : (b = B, B = [], b.length && !l && (z = k.createElementNS(O, "tspan"), m(z, { dy: P, x: v }), I && m(z, "style", I), c.appendChild(z)), N > f && (f = N)), b.length && z.appendChild(k.createTextNode(b.join(" ").replace(/- /g, "-")));
                      }a.rotation = t;
                    }e++;
                  }
                }
              });J = J || c.childNodes.length;
            }), G && a.attr("title", a.textStr), z && z.removeChild(c), B && a.applyTextOutline && a.applyTextOutline(B)) : c.appendChild(k.createTextNode(p.replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")));
          }
        }, getContrast: function getContrast(a) {
          a = l(a).rgba;return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF";
        }, button: function button(a, h, c, w, q, b, d, n, g) {
          var x = this.label(a, h, c, g, null, null, null, null, "button"),
              k = 0;x.attr(p({ padding: 8, r: 2 }, q));var z, H, v, f;q = p({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1,
            style: { color: "#333333", cursor: "pointer", fontWeight: "normal" } }, q);z = q.style;delete q.style;b = p(q, { fill: "#e6e6e6" }, b);H = b.style;delete b.style;d = p(q, { fill: "#e6ebf5", style: { color: "#000000", fontWeight: "bold" } }, d);v = d.style;delete d.style;n = p(q, { style: { color: "#cccccc" } }, n);f = n.style;delete n.style;F(x.element, G ? "mouseover" : "mouseenter", function () {
            3 !== k && x.setState(1);
          });F(x.element, G ? "mouseout" : "mouseleave", function () {
            3 !== k && x.setState(k);
          });x.setState = function (a) {
            1 !== a && (x.state = k = a);x.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);x.attr([q, b, d, n][a || 0]).css([z, H, v, f][a || 0]);
          };x.attr(q).css(e({ cursor: "default" }, z));return x.on("click", function (a) {
            3 !== k && w.call(x, a);
          });
        }, crispLine: function crispLine(a, h) {
          a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - h % 2 / 2);a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + h % 2 / 2);return a;
        }, path: function path(a) {
          var h = { fill: "none" };J(a) ? h.d = a : q(a) && e(h, a);return this.createElement("path").attr(h);
        }, circle: function circle(a, h, c) {
          a = q(a) ? a : { x: a, y: h, r: c };h = this.createElement("circle");h.xSetter = h.ySetter = function (a, h, c) {
            c.setAttribute("c" + h, a);
          };return h.attr(a);
        }, arc: function arc(a, h, c, w, p, b) {
          q(a) ? (w = a, h = w.y, c = w.r, a = w.x) : w = { innerR: w, start: p, end: b };a = this.symbol("arc", a, h, c, c, w);a.r = c;return a;
        }, rect: function rect(a, h, c, w, p, b) {
          p = q(a) ? a.r : p;var x = this.createElement("rect");a = q(a) ? a : void 0 === a ? {} : { x: a, y: h, width: Math.max(c, 0), height: Math.max(w, 0) };void 0 !== b && (a.strokeWidth = b, a = x.crisp(a));a.fill = "none";p && (a.r = p);x.rSetter = function (a, h, c) {
            m(c, { rx: a, ry: a });
          };return x.attr(a);
        }, setSize: function setSize(a, h, c) {
          var w = this.alignedObjects,
              p = w.length;this.width = a;this.height = h;for (this.boxWrapper.animate({ width: a, height: h }, { step: function step() {
              this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") });
            }, duration: L(c, !0) ? void 0 : 0 }); p--;) {
            w[p].align();
          }
        }, g: function g(a) {
          var h = this.createElement("g");return a ? h.attr({ "class": "highcharts-" + a }) : h;
        }, image: function image(a, h, c, w, p) {
          var x = { preserveAspectRatio: "none" };1 < arguments.length && e(x, { x: h, y: c, width: w, height: p });x = this.createElement("image").attr(x);x.element.setAttributeNS ? x.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : x.element.setAttribute("hc-svg-href", a);return x;
        }, symbol: function symbol(a, h, c, w, p, q) {
          var x = this,
              d,
              n = /^url\((.*?)\)$/,
              g = n.test(a),
              z = !g && (this.symbols[a] ? a : "circle"),
              G = z && this.symbols[z],
              H = t(h) && G && G.call(this.symbols, Math.round(h), Math.round(c), w, p, q),
              v,
              y;G ? (d = this.path(H), d.attr("fill", "none"), e(d, { symbolName: z, x: h, y: c, width: w, height: p }), q && e(d, q)) : g && (v = a.match(n)[1], d = this.image(v), d.imgwidth = L(Q[v] && Q[v].width, q && q.width), d.imgheight = L(Q[v] && Q[v].height, q && q.height), y = function y() {
            d.attr({ width: d.width, height: d.height });
          }, b(["width", "height"], function (a) {
            d[a + "Setter"] = function (a, h) {
              var c = {},
                  w = this["img" + h],
                  p = "width" === h ? "translateX" : "translateY";this[h] = a;t(w) && (this.element && this.element.setAttribute(h, w), this.alignByTranslate || (c[p] = ((this[h] || 0) - w) / 2, this.attr(c)));
            };
          }), t(h) && d.attr({ x: h, y: c }), d.isImg = !0, t(d.imgwidth) && t(d.imgheight) ? y() : (d.attr({ width: 0, height: 0 }), u("img", { onload: function onload() {
              var a = f[x.chartIndex];0 === this.width && (r(this, { position: "absolute", top: "-999em" }), k.body.appendChild(this));Q[v] = { width: this.width, height: this.height };d.imgwidth = this.width;d.imgheight = this.height;d.element && y();this.parentNode && this.parentNode.removeChild(this);x.imgCount--;if (!x.imgCount && a && a.onload) a.onload();
            }, src: v }), this.imgCount++));return d;
        }, symbols: { circle: function circle(a, h, c, w) {
            return this.arc(a + c / 2, h + w / 2, c / 2, w / 2, { start: 0, end: 2 * Math.PI, open: !1 });
          }, square: function square(a, h, c, w) {
            return ["M", a, h, "L", a + c, h, a + c, h + w, a, h + w, "Z"];
          }, triangle: function triangle(a, h, c, w) {
            return ["M", a + c / 2, h, "L", a + c, h + w, a, h + w, "Z"];
          }, "triangle-down": function triangleDown(a, h, c, w) {
            return ["M", a, h, "L", a + c, h, a + c / 2, h + w, "Z"];
          }, diamond: function diamond(a, h, c, w) {
            return ["M", a + c / 2, h, "L", a + c, h + w / 2, a + c / 2, h + w, a, h + w / 2, "Z"];
          }, arc: function arc(a, h, c, w, p) {
            var q = p.start,
                b = p.r || c,
                x = p.r || w || c,
                e = p.end - .001;c = p.innerR;w = L(p.open, .001 > Math.abs(p.end - p.start - 2 * Math.PI));var d = Math.cos(q),
                n = Math.sin(q),
                g = Math.cos(e),
                e = Math.sin(e);p = .001 > p.end - q - Math.PI ? 0 : 1;b = ["M", a + b * d, h + x * n, "A", b, x, 0, p, 1, a + b * g, h + x * e];t(c) && b.push(w ? "M" : "L", a + c * g, h + c * e, "A", c, c, 0, p, 0, a + c * d, h + c * n);b.push(w ? "" : "Z");return b;
          }, callout: function callout(a, h, c, w, p) {
            var q = Math.min(p && p.r || 0, c, w),
                b = q + 6,
                e = p && p.anchorX;p = p && p.anchorY;var d;d = ["M", a + q, h, "L", a + c - q, h, "C", a + c, h, a + c, h, a + c, h + q, "L", a + c, h + w - q, "C", a + c, h + w, a + c, h + w, a + c - q, h + w, "L", a + q, h + w, "C", a, h + w, a, h + w, a, h + w - q, "L", a, h + q, "C", a, h, a, h, a + q, h];e && e > c ? p > h + b && p < h + w - b ? d.splice(13, 3, "L", a + c, p - 6, a + c + 6, p, a + c, p + 6, a + c, h + w - q) : d.splice(13, 3, "L", a + c, w / 2, e, p, a + c, w / 2, a + c, h + w - q) : e && 0 > e ? p > h + b && p < h + w - b ? d.splice(33, 3, "L", a, p + 6, a - 6, p, a, p - 6, a, h + q) : d.splice(33, 3, "L", a, w / 2, e, p, a, w / 2, a, h + q) : p && p > w && e > a + b && e < a + c - b ? d.splice(23, 3, "L", e + 6, h + w, e, h + w + 6, e - 6, h + w, a + q, h + w) : p && 0 > p && e > a + b && e < a + c - b && d.splice(3, 3, "L", e - 6, h, e, h - 6, e + 6, h, c - q, h);return d;
          } }, clipRect: function clipRect(h, c, w, p) {
          var q = a.uniqueKey(),
              b = this.createElement("clipPath").attr({ id: q }).add(this.defs);h = this.rect(h, c, w, p, 0).add(b);h.id = q;h.clipPath = b;h.count = 0;return h;
        }, text: function text(a, h, c, w) {
          var p = !H && this.forExport,
              q = {};if (w && (this.allowHTML || !this.forExport)) return this.html(a, h, c);q.x = Math.round(h || 0);c && (q.y = Math.round(c));if (a || 0 === a) q.text = a;a = this.createElement("text").attr(q);p && a.css({ position: "absolute" });w || (a.xSetter = function (a, h, c) {
            var w = c.getElementsByTagName("tspan"),
                p,
                q = c.getAttribute(h),
                b;for (b = 0; b < w.length; b++) {
              p = w[b], p.getAttribute(h) === q && p.setAttribute(h, a);
            }c.setAttribute(h, a);
          });return a;
        }, fontMetrics: function fontMetrics(a, c) {
          a = a || c && c.style && c.style.fontSize || this.style && this.style.fontSize;a = /px/.test(a) ? h(a) : /em/.test(a) ? parseFloat(a) * (c ? this.fontMetrics(null, c.parentNode).f : 16) : 12;
          c = 24 > a ? a + 3 : Math.round(1.2 * a);return { h: c, b: Math.round(.8 * c), f: a };
        }, rotCorr: function rotCorr(a, h, c) {
          var w = a;h && c && (w = Math.max(w * Math.cos(h * g), 4));return { x: -a / 3 * Math.sin(h * g), y: w };
        }, label: function label(h, c, q, d, n, g, k, z, G) {
          var x = this,
              H = x.g("button" !== G && "label"),
              v = H.text = x.text("", 0, 0, k).attr({ zIndex: 1 }),
              f,
              y,
              I = 0,
              B = 3,
              D = 0,
              r,
              l,
              P,
              m,
              J,
              O = {},
              L,
              u,
              N = /^url\((.*?)\)$/.test(d),
              K = N,
              U,
              T,
              Q,
              R;G && H.addClass("highcharts-" + G);K = N;U = function U() {
            return (L || 0) % 2 / 2;
          };T = function T() {
            var a = v.element.style,
                h = {};y = (void 0 === r || void 0 === l || J) && t(v.textStr) && v.getBBox();H.width = (r || y.width || 0) + 2 * B + D;H.height = (l || y.height || 0) + 2 * B;u = B + x.fontMetrics(a && a.fontSize, v).b;K && (f || (H.box = f = x.symbols[d] || N ? x.symbol(d) : x.rect(), f.addClass(("button" === G ? "" : "highcharts-label-box") + (G ? " highcharts-" + G + "-box" : "")), f.add(H), a = U(), h.x = a, h.y = (z ? -u : 0) + a), h.width = Math.round(H.width), h.height = Math.round(H.height), f.attr(e(h, O)), O = {});
          };Q = function Q() {
            var a = D + B,
                h;h = z ? 0 : u;t(r) && y && ("center" === J || "right" === J) && (a += { center: .5, right: 1 }[J] * (r - y.width));if (a !== v.x || h !== v.y) v.attr("x", a), void 0 !== h && v.attr("y", h);v.x = a;v.y = h;
          };R = function R(a, h) {
            f ? f.attr(a, h) : O[a] = h;
          };H.onAdd = function () {
            v.add(H);H.attr({ text: h || 0 === h ? h : "", x: c, y: q });f && t(n) && H.attr({ anchorX: n, anchorY: g });
          };H.widthSetter = function (h) {
            r = a.isNumber(h) ? h : null;
          };H.heightSetter = function (a) {
            l = a;
          };H["text-alignSetter"] = function (a) {
            J = a;
          };H.paddingSetter = function (a) {
            t(a) && a !== B && (B = H.padding = a, Q());
          };H.paddingLeftSetter = function (a) {
            t(a) && a !== D && (D = a, Q());
          };H.alignSetter = function (a) {
            a = { left: 0, center: .5, right: 1 }[a];a !== I && (I = a, y && H.attr({ x: P }));
          };
          H.textSetter = function (a) {
            void 0 !== a && v.textSetter(a);T();Q();
          };H["stroke-widthSetter"] = function (a, h) {
            a && (K = !0);L = this["stroke-width"] = a;R(h, a);
          };H.strokeSetter = H.fillSetter = H.rSetter = function (a, h) {
            "r" !== h && ("fill" === h && a && (K = !0), H[h] = a);R(h, a);
          };H.anchorXSetter = function (a, h) {
            n = H.anchorX = a;R(h, Math.round(a) - U() - P);
          };H.anchorYSetter = function (a, h) {
            g = H.anchorY = a;R(h, a - m);
          };H.xSetter = function (a) {
            H.x = a;I && (a -= I * ((r || y.width) + 2 * B));P = Math.round(a);H.attr("translateX", P);
          };H.ySetter = function (a) {
            m = H.y = Math.round(a);
            H.attr("translateY", m);
          };var V = H.css;return e(H, { css: function css(a) {
              if (a) {
                var h = {};a = p(a);b(H.textProps, function (c) {
                  void 0 !== a[c] && (h[c] = a[c], delete a[c]);
                });v.css(h);
              }return V.call(H, a);
            }, getBBox: function getBBox() {
              return { width: y.width + 2 * B, height: y.height + 2 * B, x: y.x - B, y: y.y - B };
            }, shadow: function shadow(a) {
              a && (T(), f && f.shadow(a));return H;
            }, destroy: function destroy() {
              w(H.element, "mouseenter");w(H.element, "mouseleave");v && (v = v.destroy());f && (f = f.destroy());C.prototype.destroy.call(H);H = x = T = Q = R = null;
            } });
        } });a.Renderer = A;
    })(M);(function (a) {
      var C = a.attr,
          A = a.createElement,
          F = a.css,
          E = a.defined,
          m = a.each,
          f = a.extend,
          l = a.isFirefox,
          r = a.isMS,
          u = a.isWebKit,
          t = a.pInt,
          g = a.SVGRenderer,
          d = a.win,
          k = a.wrap;f(a.SVGElement.prototype, { htmlCss: function htmlCss(a) {
          var b = this.element;if (b = a && "SPAN" === b.tagName && a.width) delete a.width, this.textWidth = b, this.updateTransform();a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");this.styles = f(this.styles, a);F(this.element, a);return this;
        }, htmlGetBBox: function htmlGetBBox() {
          var a = this.element;"text" === a.nodeName && (a.style.position = "absolute");return { x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight };
        }, htmlUpdateTransform: function htmlUpdateTransform() {
          if (this.added) {
            var a = this.renderer,
                e = this.element,
                d = this.translateX || 0,
                g = this.translateY || 0,
                n = this.x || 0,
                k = this.y || 0,
                f = this.textAlign || "left",
                c = { left: 0, center: .5, right: 1 }[f],
                G = this.styles;F(e, { marginLeft: d, marginTop: g });this.shadows && m(this.shadows, function (a) {
              F(a, { marginLeft: d + 1, marginTop: g + 1 });
            });this.inverted && m(e.childNodes, function (c) {
              a.invertChild(c, e);
            });if ("SPAN" === e.tagName) {
              var q = this.rotation,
                  B = t(this.textWidth),
                  r = G && G.whiteSpace,
                  p = [q, f, e.innerHTML, this.textWidth, this.textAlign].join();p !== this.cTT && (G = a.fontMetrics(e.style.fontSize).b, E(q) && this.setSpanRotation(q, c, G), F(e, { width: "", whiteSpace: r || "nowrap" }), e.offsetWidth > B && /[ \-]/.test(e.textContent || e.innerText) && F(e, { width: B + "px", display: "block", whiteSpace: r || "normal" }), this.getSpanCorrection(e.offsetWidth, G, c, q, f));F(e, { left: n + (this.xCorr || 0) + "px", top: k + (this.yCorr || 0) + "px" });u && (G = e.offsetHeight);this.cTT = p;
            }
          } else this.alignOnAdd = !0;
        }, setSpanRotation: function setSpanRotation(a, e, g) {
          var b = {},
              n = r ? "-ms-transform" : u ? "-webkit-transform" : l ? "MozTransform" : d.opera ? "-o-transform" : "";b[n] = b.transform = "rotate(" + a + "deg)";b[n + (l ? "Origin" : "-origin")] = b.transformOrigin = 100 * e + "% " + g + "px";F(this.element, b);
        }, getSpanCorrection: function getSpanCorrection(a, e, d) {
          this.xCorr = -a * d;this.yCorr = -e;
        } });f(g.prototype, { html: function html(a, e, d) {
          var b = this.createElement("span"),
              n = b.element,
              g = b.renderer,
              v = g.isSVG,
              c = function c(a, _c) {
            m(["opacity", "visibility"], function (q) {
              k(a, q + "Setter", function (a, p, q, b) {
                a.call(this, p, q, b);_c[q] = p;
              });
            });
          };b.textSetter = function (a) {
            a !== n.innerHTML && delete this.bBox;n.innerHTML = this.textStr = a;b.htmlUpdateTransform();
          };v && c(b, b.element.style);b.xSetter = b.ySetter = b.alignSetter = b.rotationSetter = function (a, c) {
            "align" === c && (c = "textAlign");b[c] = a;b.htmlUpdateTransform();
          };b.attr({ text: a, x: Math.round(e), y: Math.round(d) }).css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize, position: "absolute" });n.style.whiteSpace = "nowrap";b.css = b.htmlCss;v && (b.add = function (a) {
            var q,
                e = g.box.parentNode,
                d = [];if (this.parentGroup = a) {
              if (q = a.div, !q) {
                for (; a;) {
                  d.push(a), a = a.parentGroup;
                }m(d.reverse(), function (a) {
                  var p,
                      n = C(a.element, "class");n && (n = { className: n });q = a.div = a.div || A("div", n, { position: "absolute", left: (a.translateX || 0) + "px", top: (a.translateY || 0) + "px", display: a.display, opacity: a.opacity, pointerEvents: a.styles && a.styles.pointerEvents }, q || e);p = q.style;f(a, { classSetter: function classSetter(a) {
                      this.element.setAttribute("class", a);q.className = a;
                    }, on: function on() {
                      d[0].div && b.on.apply({ element: d[0].div }, arguments);return a;
                    }, translateXSetter: function translateXSetter(c, h) {
                      p.left = c + "px";a[h] = c;a.doTransform = !0;
                    }, translateYSetter: function translateYSetter(c, h) {
                      p.top = c + "px";a[h] = c;a.doTransform = !0;
                    } });c(a, p);
                });
              }
            } else q = e;q.appendChild(n);b.added = !0;b.alignOnAdd && b.htmlUpdateTransform();return b;
          });return b;
        } });
    })(M);(function (a) {
      var C,
          A,
          F = a.createElement,
          E = a.css,
          m = a.defined,
          f = a.deg2rad,
          l = a.discardElement,
          r = a.doc,
          u = a.each,
          t = a.erase,
          g = a.extend;C = a.extendClass;var d = a.isArray,
          k = a.isNumber,
          b = a.isObject,
          e = a.merge;A = a.noop;var v = a.pick,
          y = a.pInt,
          n = a.SVGElement,
          D = a.SVGRenderer,
          J = a.win;a.svg || (A = { docMode8: r && 8 === r.documentMode, init: function init(a, b) {
          var c = ["\x3c", b, ' filled\x3d"f" stroked\x3d"f"'],
              e = ["position: ", "absolute", ";"],
              d = "div" === b;("shape" === b || d) && e.push("left:0;top:0;width:1px;height:1px;");e.push("visibility: ", d ? "hidden" : "visible");c.push(' style\x3d"', e.join(""), '"/\x3e');b && (c = d || "span" === b || "img" === b ? c.join("") : a.prepVML(c), this.element = F(c));this.renderer = a;
        }, add: function add(a) {
          var c = this.renderer,
              b = this.element,
              e = c.box,
              d = a && a.inverted,
              e = a ? a.element || a : e;a && (this.parentGroup = a);d && c.invertChild(b, e);e.appendChild(b);this.added = !0;this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();if (this.onAdd) this.onAdd();this.className && this.attr("class", this.className);return this;
        }, updateTransform: n.prototype.htmlUpdateTransform, setSpanRotation: function setSpanRotation() {
          var a = this.rotation,
              b = Math.cos(a * f),
              q = Math.sin(a * f);E(this.element, { filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11\x3d", b, ", M12\x3d", -q, ", M21\x3d", q, ", M22\x3d", b, ", sizingMethod\x3d'auto expand')"].join("") : "none" });
        }, getSpanCorrection: function getSpanCorrection(a, b, q, e, d) {
          var c = e ? Math.cos(e * f) : 1,
              n = e ? Math.sin(e * f) : 0,
              g = v(this.elemHeight, this.element.offsetHeight),
              k;this.xCorr = 0 > c && -a;this.yCorr = 0 > n && -g;k = 0 > c * n;this.xCorr += n * b * (k ? 1 - q : q);this.yCorr -= c * b * (e ? k ? q : 1 - q : 1);d && "left" !== d && (this.xCorr -= a * q * (0 > c ? -1 : 1), e && (this.yCorr -= g * q * (0 > n ? -1 : 1)), E(this.element, { textAlign: d }));
        }, pathToVML: function pathToVML(a) {
          for (var c = a.length, b = []; c--;) {
            k(a[c]) ? b[c] = Math.round(10 * a[c]) - 5 : "Z" === a[c] ? b[c] = "x" : (b[c] = a[c], !a.isArc || "wa" !== a[c] && "at" !== a[c] || (b[c + 5] === b[c + 7] && (b[c + 7] += a[c + 7] > a[c + 5] ? 1 : -1), b[c + 6] === b[c + 8] && (b[c + 8] += a[c + 8] > a[c + 6] ? 1 : -1)));
          }return b.join(" ") || "x";
        }, clip: function clip(a) {
          var c = this,
              b;a ? (b = a.members, t(b, c), b.push(c), c.destroyClip = function () {
            t(b, c);
          }, a = a.getCSS(c)) : (c.destroyClip && c.destroyClip(), a = { clip: c.docMode8 ? "inherit" : "rect(auto)" });return c.css(a);
        }, css: n.prototype.htmlCss, safeRemoveChild: function safeRemoveChild(a) {
          a.parentNode && l(a);
        }, destroy: function destroy() {
          this.destroyClip && this.destroyClip();return n.prototype.destroy.apply(this);
        },
        on: function on(a, b) {
          this.element["on" + a] = function () {
            var a = J.event;a.target = a.srcElement;b(a);
          };return this;
        }, cutOffPath: function cutOffPath(a, b) {
          var c;a = a.split(/[ ,]/);c = a.length;if (9 === c || 11 === c) a[c - 4] = a[c - 2] = y(a[c - 2]) - 10 * b;return a.join(" ");
        }, shadow: function shadow(a, b, e) {
          var c = [],
              q,
              p = this.element,
              d = this.renderer,
              n,
              g = p.style,
              h,
              w = p.path,
              k,
              H,
              f,
              D;w && "string" !== typeof w.value && (w = "x");H = w;if (a) {
            f = v(a.width, 3);D = (a.opacity || .15) / f;for (q = 1; 3 >= q; q++) {
              k = 2 * f + 1 - 2 * q, e && (H = this.cutOffPath(w.value, k + .5)), h = ['\x3cshape isShadow\x3d"true" strokeweight\x3d"', k, '" filled\x3d"false" path\x3d"', H, '" coordsize\x3d"10 10" style\x3d"', p.style.cssText, '" /\x3e'], n = F(d.prepVML(h), null, { left: y(g.left) + v(a.offsetX, 1), top: y(g.top) + v(a.offsetY, 1) }), e && (n.cutOff = k + 1), h = ['\x3cstroke color\x3d"', a.color || "#000000", '" opacity\x3d"', D * q, '"/\x3e'], F(d.prepVML(h), null, null, n), b ? b.element.appendChild(n) : p.parentNode.insertBefore(n, p), c.push(n);
            }this.shadows = c;
          }return this;
        }, updateShadows: A, setAttr: function setAttr(a, b) {
          this.docMode8 ? this.element[a] = b : this.element.setAttribute(a, b);
        },
        classSetter: function classSetter(a) {
          (this.added ? this.element : this).className = a;
        }, dashstyleSetter: function dashstyleSetter(a, b, e) {
          (e.getElementsByTagName("stroke")[0] || F(this.renderer.prepVML(["\x3cstroke/\x3e"]), null, null, e))[b] = a || "solid";this[b] = a;
        }, dSetter: function dSetter(a, b, e) {
          var c = this.shadows;a = a || [];this.d = a.join && a.join(" ");e.path = a = this.pathToVML(a);if (c) for (e = c.length; e--;) {
            c[e].path = c[e].cutOff ? this.cutOffPath(a, c[e].cutOff) : a;
          }this.setAttr(b, a);
        }, fillSetter: function fillSetter(a, b, e) {
          var c = e.nodeName;"SPAN" === c ? e.style.color = a : "IMG" !== c && (e.filled = "none" !== a, this.setAttr("fillcolor", this.renderer.color(a, e, b, this)));
        }, "fill-opacitySetter": function fillOpacitySetter(a, b, e) {
          F(this.renderer.prepVML(["\x3c", b.split("-")[0], ' opacity\x3d"', a, '"/\x3e']), null, null, e);
        }, opacitySetter: A, rotationSetter: function rotationSetter(a, b, e) {
          e = e.style;this[b] = e[b] = a;e.left = -Math.round(Math.sin(a * f) + 1) + "px";e.top = Math.round(Math.cos(a * f)) + "px";
        }, strokeSetter: function strokeSetter(a, b, e) {
          this.setAttr("strokecolor", this.renderer.color(a, e, b, this));
        }, "stroke-widthSetter": function strokeWidthSetter(a, b, e) {
          e.stroked = !!a;
          this[b] = a;k(a) && (a += "px");this.setAttr("strokeweight", a);
        }, titleSetter: function titleSetter(a, b) {
          this.setAttr(b, a);
        }, visibilitySetter: function visibilitySetter(a, b, e) {
          "inherit" === a && (a = "visible");this.shadows && u(this.shadows, function (c) {
            c.style[b] = a;
          });"DIV" === e.nodeName && (a = "hidden" === a ? "-999em" : 0, this.docMode8 || (e.style[b] = a ? "visible" : "hidden"), b = "top");e.style[b] = a;
        }, xSetter: function xSetter(a, b, e) {
          this[b] = a;"x" === b ? b = "left" : "y" === b && (b = "top");this.updateClipping ? (this[b] = a, this.updateClipping()) : e.style[b] = a;
        }, zIndexSetter: function zIndexSetter(a, b, e) {
          e.style[b] = a;
        } }, A["stroke-opacitySetter"] = A["fill-opacitySetter"], a.VMLElement = A = C(n, A), A.prototype.ySetter = A.prototype.widthSetter = A.prototype.heightSetter = A.prototype.xSetter, A = { Element: A, isIE8: -1 < J.navigator.userAgent.indexOf("MSIE 8.0"), init: function init(a, b, e) {
          var c, d;this.alignedObjects = [];c = this.createElement("div").css({ position: "relative" });d = c.element;a.appendChild(c.element);this.isVML = !0;this.box = d;this.boxWrapper = c;this.gradients = {};this.cache = {};this.cacheKeys = [];this.imgCount = 0;this.setSize(b, e, !1);if (!r.namespaces.hcv) {
            r.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");try {
              r.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
            } catch (p) {
              r.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
            }
          }
        }, isHidden: function isHidden() {
          return !this.box.offsetWidth;
        }, clipRect: function clipRect(a, e, d, n) {
          var c = this.createElement(),
              p = b(a);return g(c, { members: [],
            count: 0, left: (p ? a.x : a) + 1, top: (p ? a.y : e) + 1, width: (p ? a.width : d) - 1, height: (p ? a.height : n) - 1, getCSS: function getCSS(a) {
              var c = a.element,
                  b = c.nodeName,
                  h = a.inverted,
                  w = this.top - ("shape" === b ? c.offsetTop : 0),
                  p = this.left,
                  c = p + this.width,
                  e = w + this.height,
                  w = { clip: "rect(" + Math.round(h ? p : w) + "px," + Math.round(h ? e : c) + "px," + Math.round(h ? c : e) + "px," + Math.round(h ? w : p) + "px)" };!h && a.docMode8 && "DIV" === b && g(w, { width: c + "px", height: e + "px" });return w;
            }, updateClipping: function updateClipping() {
              u(c.members, function (a) {
                a.element && a.css(c.getCSS(a));
              });
            } });
        }, color: function color(c, b, e, d) {
          var q = this,
              p,
              n = /^rgba/,
              g,
              k,
              h = "none";c && c.linearGradient ? k = "gradient" : c && c.radialGradient && (k = "pattern");if (k) {
            var w,
                v,
                H = c.linearGradient || c.radialGradient,
                f,
                D,
                y,
                x,
                r,
                B = "";c = c.stops;var l,
                G = [],
                m = function m() {
              g = ['\x3cfill colors\x3d"' + G.join(",") + '" opacity\x3d"', y, '" o:opacity2\x3d"', D, '" type\x3d"', k, '" ', B, 'focus\x3d"100%" method\x3d"any" /\x3e'];F(q.prepVML(g), null, null, b);
            };f = c[0];l = c[c.length - 1];0 < f[0] && c.unshift([0, f[1]]);1 > l[0] && c.push([1, l[1]]);u(c, function (h, c) {
              n.test(h[1]) ? (p = a.color(h[1]), w = p.get("rgb"), v = p.get("a")) : (w = h[1], v = 1);G.push(100 * h[0] + "% " + w);c ? (y = v, x = w) : (D = v, r = w);
            });if ("fill" === e) {
              if ("gradient" === k) e = H.x1 || H[0] || 0, c = H.y1 || H[1] || 0, f = H.x2 || H[2] || 0, H = H.y2 || H[3] || 0, B = 'angle\x3d"' + (90 - 180 * Math.atan((H - c) / (f - e)) / Math.PI) + '"', m();else {
                var h = H.r,
                    t = 2 * h,
                    J = 2 * h,
                    A = H.cx,
                    C = H.cy,
                    E = b.radialReference,
                    M,
                    h = function h() {
                  E && (M = d.getBBox(), A += (E[0] - M.x) / M.width - .5, C += (E[1] - M.y) / M.height - .5, t *= E[2] / M.width, J *= E[2] / M.height);B = 'src\x3d"' + a.getOptions().global.VMLRadialGradientURL + '" size\x3d"' + t + "," + J + '" origin\x3d"0.5,0.5" position\x3d"' + A + "," + C + '" color2\x3d"' + r + '" ';m();
                };d.added ? h() : d.onAdd = h;h = x;
              }
            } else h = w;
          } else n.test(c) && "IMG" !== b.tagName ? (p = a.color(c), d[e + "-opacitySetter"](p.get("a"), e, b), h = p.get("rgb")) : (h = b.getElementsByTagName(e), h.length && (h[0].opacity = 1, h[0].type = "solid"), h = c);return h;
        }, prepVML: function prepVML(a) {
          var c = this.isIE8;a = a.join("");c ? (a = a.replace("/\x3e", ' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'), a = -1 === a.indexOf('style\x3d"') ? a.replace("/\x3e", ' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e') : a.replace('style\x3d"', 'style\x3d"display:inline-block;behavior:url(#default#VML);')) : a = a.replace("\x3c", "\x3chcv:");return a;
        }, text: D.prototype.html, path: function path(a) {
          var c = { coordsize: "10 10" };d(a) ? c.d = a : b(a) && g(c, a);return this.createElement("shape").attr(c);
        }, circle: function circle(a, e, d) {
          var c = this.symbol("circle");b(a) && (d = a.r, e = a.y, a = a.x);c.isCircle = !0;c.r = d;return c.attr({ x: a, y: e });
        }, g: function g(a) {
          var c;a && (c = { className: "highcharts-" + a, "class": "highcharts-" + a });return this.createElement("div").attr(c);
        },
        image: function image(a, b, e, d, n) {
          var c = this.createElement("img").attr({ src: a });1 < arguments.length && c.attr({ x: b, y: e, width: d, height: n });return c;
        }, createElement: function createElement(a) {
          return "rect" === a ? this.symbol(a) : D.prototype.createElement.call(this, a);
        }, invertChild: function invertChild(a, b) {
          var c = this;b = b.style;var e = "IMG" === a.tagName && a.style;E(a, { flip: "x", left: y(b.width) - (e ? y(e.top) : 1), top: y(b.height) - (e ? y(e.left) : 1), rotation: -90 });u(a.childNodes, function (b) {
            c.invertChild(b, a);
          });
        }, symbols: { arc: function arc(a, b, e, d, n) {
            var c = n.start,
                q = n.end,
                g = n.r || e || d;e = n.innerR;d = Math.cos(c);var k = Math.sin(c),
                h = Math.cos(q),
                w = Math.sin(q);if (0 === q - c) return ["x"];c = ["wa", a - g, b - g, a + g, b + g, a + g * d, b + g * k, a + g * h, b + g * w];n.open && !e && c.push("e", "M", a, b);c.push("at", a - e, b - e, a + e, b + e, a + e * h, b + e * w, a + e * d, b + e * k, "x", "e");c.isArc = !0;return c;
          }, circle: function circle(a, b, e, d, n) {
            n && m(n.r) && (e = d = 2 * n.r);n && n.isCircle && (a -= e / 2, b -= d / 2);return ["wa", a, b, a + e, b + d, a + e, b + d / 2, a + e, b + d / 2, "e"];
          }, rect: function rect(a, b, e, d, n) {
            return D.prototype.symbols[m(n) && n.r ? "callout" : "square"].call(0, a, b, e, d, n);
          } } }, a.VMLRenderer = C = function C() {
        this.init.apply(this, arguments);
      }, C.prototype = e(D.prototype, A), a.Renderer = C);D.prototype.measureSpanWidth = function (a, b) {
        var c = r.createElement("span");a = r.createTextNode(a);c.appendChild(a);E(c, b);this.box.appendChild(c);b = c.offsetWidth;l(c);return b;
      };
    })(M);(function (a) {
      function C() {
        var f = a.defaultOptions.global,
            l = r.moment;if (f.timezone) {
          if (l) return function (a) {
            return -l.tz(a, f.timezone).utcOffset();
          };a.error(25);
        }return f.useUTC && f.getTimezoneOffset;
      }function A() {
        var f = a.defaultOptions.global,
            t,
            g = f.useUTC,
            d = g ? "getUTC" : "get",
            k = g ? "setUTC" : "set";a.Date = t = f.Date || r.Date;t.hcTimezoneOffset = g && f.timezoneOffset;t.hcGetTimezoneOffset = C();t.hcMakeTime = function (a, e, d, k, n, f) {
          var b;g ? (b = t.UTC.apply(0, arguments), b += m(b)) : b = new t(a, e, l(d, 1), l(k, 0), l(n, 0), l(f, 0)).getTime();return b;
        };E("Minutes Hours Day Date Month FullYear".split(" "), function (a) {
          t["hcGet" + a] = d + a;
        });E("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function (a) {
          t["hcSet" + a] = k + a;
        });
      }var F = a.color,
          E = a.each,
          m = a.getTZOffset,
          f = a.merge,
          l = a.pick,
          r = a.win;a.defaultOptions = { colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "), symbols: ["circle", "diamond", "square", "triangle", "triangle-down"], lang: { loading: "Loading...", months: "January February March April May June July August September October November December".split(" "), shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
          decimalPoint: ".", numericSymbols: "kMGTPE".split(""), resetZoom: "Reset zoom", resetZoomTitle: "Reset zoom level 1:1", thousandsSep: " " }, global: { useUTC: !0, VMLRadialGradientURL: "http://code.highcharts.com/5.0.14/gfx/vml-radial-gradient.png" }, chart: { borderRadius: 0, defaultSeriesType: "line", ignoreHiddenSeries: !0, spacing: [10, 10, 15, 10], resetZoomButton: { theme: { zIndex: 20 }, position: { align: "right", x: -10, y: 10 } }, width: null, height: null, borderColor: "#335cad", backgroundColor: "#ffffff", plotBorderColor: "#cccccc" }, title: { text: "Chart title",
          align: "center", margin: 15, widthAdjust: -44 }, subtitle: { text: "", align: "center", widthAdjust: -44 }, plotOptions: {}, labels: { style: { position: "absolute", color: "#333333" } }, legend: { enabled: !0, align: "center", layout: "horizontal", labelFormatter: function labelFormatter() {
            return this.name;
          }, borderColor: "#999999", borderRadius: 0, navigation: { activeColor: "#003399", inactiveColor: "#cccccc" }, itemStyle: { color: "#333333", fontSize: "12px", fontWeight: "bold", textOverflow: "ellipsis" }, itemHoverStyle: { color: "#000000" }, itemHiddenStyle: { color: "#cccccc" },
          shadow: !1, itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" }, squareSymbol: !0, symbolPadding: 5, verticalAlign: "bottom", x: 0, y: 0, title: { style: { fontWeight: "bold" } } }, loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center" } }, tooltip: { enabled: !0, animation: a.svg, borderRadius: 3, dateTimeLabelFormats: { millisecond: "%A, %b %e, %H:%M:%S.%L", second: "%A, %b %e, %H:%M:%S", minute: "%A, %b %e, %H:%M", hour: "%A, %b %e, %H:%M",
            day: "%A, %b %e, %Y", week: "Week from %A, %b %e, %Y", month: "%B %Y", year: "%Y" }, footerFormat: "", padding: 8, snap: a.isTouchDevice ? 25 : 10, backgroundColor: F("#f7f7f7").setOpacity(.85).get(), borderWidth: 1, headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e', pointFormat: "<span style=\"color:{point.color}\">\u25CF</span> {series.name}: <b>{point.y}</b><br/>", shadow: !0, style: { color: "#333333", cursor: "default", fontSize: "12px", pointerEvents: "none",
            whiteSpace: "nowrap" } }, credits: { enabled: !0, href: "http://www.highcharts.com", position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "9px" }, text: "Highcharts.com" } };a.setOptions = function (r) {
        a.defaultOptions = f(!0, a.defaultOptions, r);A();return a.defaultOptions;
      };a.getOptions = function () {
        return a.defaultOptions;
      };a.defaultPlotOptions = a.defaultOptions.plotOptions;A();
    })(M);(function (a) {
      var C = a.correctFloat,
          A = a.defined,
          F = a.destroyObjectProperties,
          E = a.isNumber,
          m = a.merge,
          f = a.pick,
          l = a.deg2rad;a.Tick = function (a, f, l, g) {
        this.axis = a;this.pos = f;this.type = l || "";this.isNewLabel = this.isNew = !0;l || g || this.addLabel();
      };a.Tick.prototype = { addLabel: function addLabel() {
          var a = this.axis,
              l = a.options,
              t = a.chart,
              g = a.categories,
              d = a.names,
              k = this.pos,
              b = l.labels,
              e = a.tickPositions,
              v = k === e[0],
              y = k === e[e.length - 1],
              d = g ? f(g[k], d[k], k) : k,
              g = this.label,
              e = e.info,
              n;a.isDatetimeAxis && e && (n = l.dateTimeLabelFormats[e.higherRanks[k] || e.unitName]);this.isFirst = v;this.isLast = y;l = a.labelFormatter.call({ axis: a,
            chart: t, isFirst: v, isLast: y, dateTimeLabelFormat: n, value: a.isLog ? C(a.lin2log(d)) : d, pos: k });A(g) ? g && g.attr({ text: l }) : (this.labelLength = (this.label = g = A(l) && b.enabled ? t.renderer.text(l, 0, 0, b.useHTML).css(m(b.style)).add(a.labelGroup) : null) && g.getBBox().width, this.rotation = 0);
        }, getLabelSize: function getLabelSize() {
          return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0;
        }, handleOverflow: function handleOverflow(a) {
          var r = this.axis,
              m = a.x,
              g = r.chart.chartWidth,
              d = r.chart.spacing,
              k = f(r.labelLeft, Math.min(r.pos, d[3])),
              d = f(r.labelRight, Math.max(r.pos + r.len, g - d[1])),
              b = this.label,
              e = this.rotation,
              v = { left: 0, center: .5, right: 1 }[r.labelAlign],
              y = b.getBBox().width,
              n = r.getSlotWidth(),
              D = n,
              J = 1,
              c,
              G = {};if (e) 0 > e && m - v * y < k ? c = Math.round(m / Math.cos(e * l) - k) : 0 < e && m + v * y > d && (c = Math.round((g - m) / Math.cos(e * l)));else if (g = m + (1 - v) * y, m - v * y < k ? D = a.x + D * (1 - v) - k : g > d && (D = d - a.x + D * v, J = -1), D = Math.min(n, D), D < n && "center" === r.labelAlign && (a.x += J * (n - D - v * (n - Math.min(y, D)))), y > D || r.autoRotation && (b.styles || {}).width) c = D;c && (G.width = c, (r.options.labels.style || {}).textOverflow || (G.textOverflow = "ellipsis"), b.css(G));
        }, getPosition: function getPosition(a, f, l, g) {
          var d = this.axis,
              k = d.chart,
              b = g && k.oldChartHeight || k.chartHeight;return { x: a ? d.translate(f + l, null, null, g) + d.transB : d.left + d.offset + (d.opposite ? (g && k.oldChartWidth || k.chartWidth) - d.right - d.left : 0), y: a ? b - d.bottom + d.offset - (d.opposite ? d.height : 0) : b - d.translate(f + l, null, null, g) - d.transB };
        }, getLabelPosition: function getLabelPosition(a, f, m, g, d, k, b, e) {
          var v = this.axis,
              y = v.transA,
              n = v.reversed,
              D = v.staggerLines,
              r = v.tickRotCorr || { x: 0, y: 0 },
              c = d.y;A(c) || (c = 0 === v.side ? m.rotation ? -8 : -m.getBBox().height : 2 === v.side ? r.y + 8 : Math.cos(m.rotation * l) * (r.y - m.getBBox(!1, 0).height / 2));a = a + d.x + r.x - (k && g ? k * y * (n ? -1 : 1) : 0);f = f + c - (k && !g ? k * y * (n ? 1 : -1) : 0);D && (m = b / (e || 1) % D, v.opposite && (m = D - m - 1), f += v.labelOffset / D * m);return { x: a, y: Math.round(f) };
        }, getMarkPath: function getMarkPath(a, f, l, g, d, k) {
          return k.crispLine(["M", a, f, "L", a + (d ? 0 : -l), f + (d ? l : 0)], g);
        }, renderGridLine: function renderGridLine(a, f, l) {
          var g = this.axis,
              d = g.options,
              k = this.gridLine,
              b = {},
              e = this.pos,
              v = this.type,
              y = g.tickmarkOffset,
              n = g.chart.renderer,
              D = v ? v + "Grid" : "grid",
              r = d[D + "LineWidth"],
              c = d[D + "LineColor"],
              d = d[D + "LineDashStyle"];k || (b.stroke = c, b["stroke-width"] = r, d && (b.dashstyle = d), v || (b.zIndex = 1), a && (b.opacity = 0), this.gridLine = k = n.path().attr(b).addClass("highcharts-" + (v ? v + "-" : "") + "grid-line").add(g.gridGroup));if (!a && k && (a = g.getPlotLinePath(e + y, k.strokeWidth() * l, a, !0))) k[this.isNew ? "attr" : "animate"]({ d: a, opacity: f });
        }, renderMark: function renderMark(a, l, m) {
          var g = this.axis,
              d = g.options,
              k = g.chart.renderer,
              b = this.type,
              e = b ? b + "Tick" : "tick",
              v = g.tickSize(e),
              y = this.mark,
              n = !y,
              D = a.x;a = a.y;var r = f(d[e + "Width"], !b && g.isXAxis ? 1 : 0),
              d = d[e + "Color"];v && (g.opposite && (v[0] = -v[0]), n && (this.mark = y = k.path().addClass("highcharts-" + (b ? b + "-" : "") + "tick").add(g.axisGroup), y.attr({ stroke: d, "stroke-width": r })), y[n ? "attr" : "animate"]({ d: this.getMarkPath(D, a, v[0], y.strokeWidth() * m, g.horiz, k), opacity: l }));
        }, renderLabel: function renderLabel(a, l, m, g) {
          var d = this.axis,
              k = d.horiz,
              b = d.options,
              e = this.label,
              v = b.labels,
              y = v.step,
              n = d.tickmarkOffset,
              D = !0,
              r = a.x;a = a.y;e && E(r) && (e.xy = a = this.getLabelPosition(r, a, e, k, v, n, g, y), this.isFirst && !this.isLast && !f(b.showFirstLabel, 1) || this.isLast && !this.isFirst && !f(b.showLastLabel, 1) ? D = !1 : !k || d.isRadial || v.step || v.rotation || l || 0 === m || this.handleOverflow(a), y && g % y && (D = !1), D && E(a.y) ? (a.opacity = m, e[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (e.attr("y", -9999), this.isNewLabel = !0), this.isNew = !1);
        }, render: function render(a, l, m) {
          var g = this.axis,
              d = g.horiz,
              k = this.getPosition(d, this.pos, g.tickmarkOffset, l),
              b = k.x,
              e = k.y,
              g = d && b === g.pos + g.len || !d && e === g.pos ? -1 : 1;m = f(m, 1);this.isActive = !0;this.renderGridLine(l, m, g);this.renderMark(k, m, g);this.renderLabel(k, l, m, a);
        }, destroy: function destroy() {
          F(this, this.axis);
        } };
    })(M);var S = function (a) {
      var C = a.addEvent,
          A = a.animObject,
          F = a.arrayMax,
          E = a.arrayMin,
          m = a.color,
          f = a.correctFloat,
          l = a.defaultOptions,
          r = a.defined,
          u = a.deg2rad,
          t = a.destroyObjectProperties,
          g = a.each,
          d = a.extend,
          k = a.fireEvent,
          b = a.format,
          e = a.getMagnitude,
          v = a.grep,
          y = a.inArray,
          n = a.isArray,
          D = a.isNumber,
          J = a.isString,
          c = a.merge,
          G = a.normalizeTickInterval,
          q = a.objectEach,
          B = a.pick,
          K = a.removeEvent,
          p = a.splat,
          z = a.syncTimeout,
          I = a.Tick,
          L = function L() {
        this.init.apply(this, arguments);
      };a.extend(L.prototype, { defaultOptions: { dateTimeLabelFormats: { millisecond: "%H:%M:%S.%L", second: "%H:%M:%S", minute: "%H:%M", hour: "%H:%M", day: "%e. %b", week: "%e. %b", month: "%b '%y", year: "%Y" }, endOnTick: !1, labels: { enabled: !0, style: { color: "#666666", cursor: "default", fontSize: "11px" }, x: 0 }, minPadding: .01, maxPadding: .01, minorTickLength: 2, minorTickPosition: "outside", startOfWeek: 1, startOnTick: !1, tickLength: 10, tickmarkPlacement: "between", tickPixelInterval: 100,
          tickPosition: "outside", title: { align: "middle", style: { color: "#666666" } }, type: "linear", minorGridLineColor: "#f2f2f2", minorGridLineWidth: 1, minorTickColor: "#999999", lineColor: "#ccd6eb", lineWidth: 1, gridLineColor: "#e6e6e6", tickColor: "#ccd6eb" }, defaultYAxisOptions: { endOnTick: !0, tickPixelInterval: 72, showLastLabel: !0, labels: { x: -8 }, maxPadding: .05, minPadding: .05, startOnTick: !0, title: { rotation: 270, text: "Values" }, stackLabels: { allowOverlap: !1, enabled: !1, formatter: function formatter() {
              return a.numberFormat(this.total, -1);
            },
            style: { fontSize: "11px", fontWeight: "bold", color: "#000000", textOutline: "1px contrast" } }, gridLineWidth: 1, lineWidth: 0 }, defaultLeftAxisOptions: { labels: { x: -15 }, title: { rotation: 270 } }, defaultRightAxisOptions: { labels: { x: 15 }, title: { rotation: 90 } }, defaultBottomAxisOptions: { labels: { autoRotation: [-45], x: 0 }, title: { rotation: 0 } }, defaultTopAxisOptions: { labels: { autoRotation: [-45], x: 0 }, title: { rotation: 0 } }, init: function init(a, c) {
          var h = c.isX,
              b = this;b.chart = a;b.horiz = a.inverted && !b.isZAxis ? !h : h;b.isXAxis = h;b.coll = b.coll || (h ? "xAxis" : "yAxis");b.opposite = c.opposite;b.side = c.side || (b.horiz ? b.opposite ? 0 : 2 : b.opposite ? 1 : 3);b.setOptions(c);var w = this.options,
              e = w.type;b.labelFormatter = w.labels.formatter || b.defaultLabelFormatter;b.userOptions = c;b.minPixelPadding = 0;b.reversed = w.reversed;b.visible = !1 !== w.visible;b.zoomEnabled = !1 !== w.zoomEnabled;b.hasNames = "category" === e || !0 === w.categories;b.categories = w.categories || b.hasNames;b.names = b.names || [];b.plotLinesAndBandsGroups = {};b.isLog = "logarithmic" === e;b.isDatetimeAxis = "datetime" === e;b.positiveValuesOnly = b.isLog && !b.allowNegativeLog;b.isLinked = r(w.linkedTo);b.ticks = {};b.labelEdge = [];b.minorTicks = {};b.plotLinesAndBands = [];b.alternateBands = {};b.len = 0;b.minRange = b.userMinRange = w.minRange || w.maxZoom;b.range = w.range;b.offset = w.offset || 0;b.stacks = {};b.oldStacks = {};b.stacksTouched = 0;b.max = null;b.min = null;b.crosshair = B(w.crosshair, p(a.options.tooltip.crosshairs)[h ? 0 : 1], !1);c = b.options.events;-1 === y(b, a.axes) && (h ? a.axes.splice(a.xAxis.length, 0, b) : a.axes.push(b), a[b.coll].push(b));b.series = b.series || [];a.inverted && !b.isZAxis && h && void 0 === b.reversed && (b.reversed = !0);q(c, function (a, h) {
            C(b, h, a);
          });b.lin2log = w.linearToLogConverter || b.lin2log;b.isLog && (b.val2lin = b.log2lin, b.lin2val = b.lin2log);
        }, setOptions: function setOptions(a) {
          this.options = c(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], c(l[this.coll], a));
        }, defaultLabelFormatter: function defaultLabelFormatter() {
          var h = this.axis,
              c = this.value,
              e = h.categories,
              p = this.dateTimeLabelFormat,
              d = l.lang,
              n = d.numericSymbols,
              d = d.numericSymbolMagnitude || 1E3,
              q = n && n.length,
              x,
              g = h.options.labels.format,
              h = h.isLog ? Math.abs(c) : h.tickInterval;if (g) x = b(g, this);else if (e) x = c;else if (p) x = a.dateFormat(p, c);else if (q && 1E3 <= h) for (; q-- && void 0 === x;) {
            e = Math.pow(d, q + 1), h >= e && 0 === 10 * c % e && null !== n[q] && 0 !== c && (x = a.numberFormat(c / e, -1) + n[q]);
          }void 0 === x && (x = 1E4 <= Math.abs(c) ? a.numberFormat(c, -1) : a.numberFormat(c, -1, void 0, ""));return x;
        }, getSeriesExtremes: function getSeriesExtremes() {
          var a = this,
              b = a.chart;a.hasVisibleSeries = !1;a.dataMin = a.dataMax = a.threshold = null;a.softThreshold = !a.isXAxis;a.buildStacks && a.buildStacks();g(a.series, function (h) {
            if (h.visible || !b.options.chart.ignoreHiddenSeries) {
              var c = h.options,
                  w = c.threshold,
                  e;a.hasVisibleSeries = !0;a.positiveValuesOnly && 0 >= w && (w = null);if (a.isXAxis) c = h.xData, c.length && (h = E(c), D(h) || h instanceof Date || (c = v(c, function (a) {
                return D(a);
              }), h = E(c)), a.dataMin = Math.min(B(a.dataMin, c[0]), h), a.dataMax = Math.max(B(a.dataMax, c[0]), F(c)));else if (h.getExtremes(), e = h.dataMax, h = h.dataMin, r(h) && r(e) && (a.dataMin = Math.min(B(a.dataMin, h), h), a.dataMax = Math.max(B(a.dataMax, e), e)), r(w) && (a.threshold = w), !c.softThreshold || a.positiveValuesOnly) a.softThreshold = !1;
            }
          });
        }, translate: function translate(a, b, c, e, p, d) {
          var h = this.linkedParent || this,
              w = 1,
              n = 0,
              q = e ? h.oldTransA : h.transA;e = e ? h.oldMin : h.min;var g = h.minPixelPadding;p = (h.isOrdinal || h.isBroken || h.isLog && p) && h.lin2val;q || (q = h.transA);c && (w *= -1, n = h.len);h.reversed && (w *= -1, n -= w * (h.sector || h.len));b ? (a = (a * w + n - g) / q + e, p && (a = h.lin2val(a))) : (p && (a = h.val2lin(a)), a = w * (a - e) * q + n + w * g + (D(d) ? q * d : 0));return a;
        }, toPixels: function toPixels(a, b) {
          return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos);
        }, toValue: function toValue(a, b) {
          return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0);
        }, getPlotLinePath: function getPlotLinePath(a, b, c, e, p) {
          var h = this.chart,
              w = this.left,
              d = this.top,
              n,
              q,
              g = c && h.oldChartHeight || h.chartHeight,
              k = c && h.oldChartWidth || h.chartWidth,
              f;n = this.transB;var v = function v(a, h, b) {
            if (a < h || a > b) e ? a = Math.min(Math.max(h, a), b) : f = !0;return a;
          };p = B(p, this.translate(a, null, null, c));a = c = Math.round(p + n);n = q = Math.round(g - p - n);D(p) ? this.horiz ? (n = d, q = g - this.bottom, a = c = v(a, w, w + this.width)) : (a = w, c = k - this.right, n = q = v(n, d, d + this.height)) : f = !0;return f && !e ? null : h.renderer.crispLine(["M", a, n, "L", c, q], b || 1);
        }, getLinearTickPositions: function getLinearTickPositions(a, b, c) {
          var h,
              w = f(Math.floor(b / a) * a);c = f(Math.ceil(c / a) * a);var e = [];if (this.single) return [b];for (b = w; b <= c;) {
            e.push(b);b = f(b + a);if (b === h) break;h = b;
          }return e;
        }, getMinorTickPositions: function getMinorTickPositions() {
          var a = this,
              b = a.options,
              c = a.tickPositions,
              e = a.minorTickInterval,
              p = [],
              d = a.pointRangePadding || 0,
              n = a.min - d,
              d = a.max + d,
              q = d - n;if (q && q / e < a.len / 3) if (a.isLog) g(this.paddedTicks, function (h, b, c) {
            b && p.push.apply(p, a.getLogTickPositions(e, c[b - 1], c[b], !0));
          });else if (a.isDatetimeAxis && "auto" === b.minorTickInterval) p = p.concat(a.getTimeTicks(a.normalizeTimeTickInterval(e), n, d, b.startOfWeek));else for (b = n + (c[0] - n) % e; b <= d && b !== p[0]; b += e) {
            p.push(b);
          }0 !== p.length && a.trimTicks(p);return p;
        }, adjustForMinRange: function adjustForMinRange() {
          var a = this.options,
              b = this.min,
              c = this.max,
              e,
              p,
              d,
              n,
              q,
              k,
              f,
              v;this.isXAxis && void 0 === this.minRange && !this.isLog && (r(a.min) || r(a.max) ? this.minRange = null : (g(this.series, function (a) {
            k = a.xData;for (n = f = a.xIncrement ? 1 : k.length - 1; 0 < n; n--) {
              if (q = k[n] - k[n - 1], void 0 === d || q < d) d = q;
            }
          }), this.minRange = Math.min(5 * d, this.dataMax - this.dataMin)));c - b < this.minRange && (p = this.dataMax - this.dataMin >= this.minRange, v = this.minRange, e = (v - c + b) / 2, e = [b - e, B(a.min, b - e)], p && (e[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = F(e), c = [b + v, B(a.max, b + v)], p && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), c = E(c), c - b < v && (e[0] = c - v, e[1] = B(a.min, c - v), b = F(e)));this.min = b;this.max = c;
        }, getClosest: function getClosest() {
          var a;this.categories ? a = 1 : g(this.series, function (h) {
            var b = h.closestPointRange,
                c = h.visible || !h.chart.options.chart.ignoreHiddenSeries;!h.noSharedTooltip && r(b) && c && (a = r(a) ? Math.min(a, b) : b);
          });return a;
        }, nameToX: function nameToX(a) {
          var h = n(this.categories),
              b = h ? this.categories : this.names,
              c = a.options.x,
              e;a.series.requireSorting = !1;r(c) || (c = !1 === this.options.uniqueNames ? a.series.autoIncrement() : y(a.name, b));-1 === c ? h || (e = b.length) : e = c;void 0 !== e && (this.names[e] = a.name);return e;
        }, updateNames: function updateNames() {
          var a = this;0 < this.names.length && (this.names.length = 0, this.minRange = this.userMinRange, g(this.series || [], function (h) {
            h.xIncrement = null;if (!h.points || h.isDirtyData) h.processData(), h.generatePoints();g(h.points, function (b, c) {
              var e;b.options && (e = a.nameToX(b), void 0 !== e && e !== b.x && (b.x = e, h.xData[c] = e));
            });
          }));
        }, setAxisTranslation: function setAxisTranslation(a) {
          var h = this,
              b = h.max - h.min,
              c = h.axisPointRange || 0,
              e,
              p = 0,
              d = 0,
              n = h.linkedParent,
              q = !!h.categories,
              k = h.transA,
              f = h.isXAxis;if (f || q || c) e = h.getClosest(), n ? (p = n.minPointOffset, d = n.pointRangePadding) : g(h.series, function (a) {
            var b = q ? 1 : f ? B(a.options.pointRange, e, 0) : h.axisPointRange || 0;a = a.options.pointPlacement;c = Math.max(c, b);h.single || (p = Math.max(p, J(a) ? 0 : b / 2), d = Math.max(d, "on" === a ? 0 : b));
          }), n = h.ordinalSlope && e ? h.ordinalSlope / e : 1, h.minPointOffset = p *= n, h.pointRangePadding = d *= n, h.pointRange = Math.min(c, b), f && (h.closestPointRange = e);a && (h.oldTransA = k);h.translationSlope = h.transA = k = h.options.staticScale || h.len / (b + d || 1);h.transB = h.horiz ? h.left : h.bottom;h.minPixelPadding = k * p;
        }, minFromRange: function minFromRange() {
          return this.max - this.range;
        }, setTickInterval: function setTickInterval(h) {
          var b = this,
              c = b.chart,
              p = b.options,
              d = b.isLog,
              n = b.log2lin,
              q = b.isDatetimeAxis,
              x = b.isXAxis,
              v = b.isLinked,
              z = p.maxPadding,
              y = p.minPadding,
              l = p.tickInterval,
              I = p.tickPixelInterval,
              m = b.categories,
              J = b.threshold,
              t = b.softThreshold,
              L,
              u,
              K,
              A;q || m || v || this.getTickAmount();K = B(b.userMin, p.min);A = B(b.userMax, p.max);v ? (b.linkedParent = c[b.coll][p.linkedTo], c = b.linkedParent.getExtremes(), b.min = B(c.min, c.dataMin), b.max = B(c.max, c.dataMax), p.type !== b.linkedParent.options.type && a.error(11, 1)) : (!t && r(J) && (b.dataMin >= J ? (L = J, y = 0) : b.dataMax <= J && (u = J, z = 0)), b.min = B(K, L, b.dataMin), b.max = B(A, u, b.dataMax));d && (b.positiveValuesOnly && !h && 0 >= Math.min(b.min, B(b.dataMin, b.min)) && a.error(10, 1), b.min = f(n(b.min), 15), b.max = f(n(b.max), 15));b.range && r(b.max) && (b.userMin = b.min = K = Math.max(b.dataMin, b.minFromRange()), b.userMax = A = b.max, b.range = null);k(b, "foundExtremes");b.beforePadding && b.beforePadding();b.adjustForMinRange();
          !(m || b.axisPointRange || b.usePercentage || v) && r(b.min) && r(b.max) && (n = b.max - b.min) && (!r(K) && y && (b.min -= n * y), !r(A) && z && (b.max += n * z));D(p.softMin) && (b.min = Math.min(b.min, p.softMin));D(p.softMax) && (b.max = Math.max(b.max, p.softMax));D(p.floor) && (b.min = Math.max(b.min, p.floor));D(p.ceiling) && (b.max = Math.min(b.max, p.ceiling));t && r(b.dataMin) && (J = J || 0, !r(K) && b.min < J && b.dataMin >= J ? b.min = J : !r(A) && b.max > J && b.dataMax <= J && (b.max = J));b.tickInterval = b.min === b.max || void 0 === b.min || void 0 === b.max ? 1 : v && !l && I === b.linkedParent.options.tickPixelInterval ? l = b.linkedParent.tickInterval : B(l, this.tickAmount ? (b.max - b.min) / Math.max(this.tickAmount - 1, 1) : void 0, m ? 1 : (b.max - b.min) * I / Math.max(b.len, I));x && !h && g(b.series, function (a) {
            a.processData(b.min !== b.oldMin || b.max !== b.oldMax);
          });b.setAxisTranslation(!0);b.beforeSetTickPositions && b.beforeSetTickPositions();b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));b.pointRange && !l && (b.tickInterval = Math.max(b.pointRange, b.tickInterval));h = B(p.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
          !l && b.tickInterval < h && (b.tickInterval = h);q || d || l || (b.tickInterval = G(b.tickInterval, null, e(b.tickInterval), B(p.allowDecimals, !(.5 < b.tickInterval && 5 > b.tickInterval && 1E3 < b.max && 9999 > b.max)), !!this.tickAmount));this.tickAmount || (b.tickInterval = b.unsquish());this.setTickPositions();
        }, setTickPositions: function setTickPositions() {
          var a = this.options,
              b,
              c = a.tickPositions,
              e = a.tickPositioner,
              p = a.startOnTick,
              d = a.endOnTick;this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;this.minorTickInterval = "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;this.single = this.min === this.max && r(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);this.tickPositions = b = c && c.slice();!b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()]), this.tickPositions = b, e && (e = e.apply(this, [this.min, this.max]))) && (this.tickPositions = b = e);this.paddedTicks = b.slice(0);this.trimTicks(b, p, d);this.isLinked || (this.single && 2 > b.length && (this.min -= .5, this.max += .5), c || e || this.adjustTickAmount());
        }, trimTicks: function trimTicks(a, b, c) {
          var h = a[0],
              e = a[a.length - 1],
              p = this.minPointOffset || 0;if (!this.isLinked) {
            if (b && -Infinity !== h) this.min = h;else for (; this.min - p > a[0];) {
              a.shift();
            }if (c) this.max = e;else for (; this.max + p < a[a.length - 1];) {
              a.pop();
            }0 === a.length && r(h) && a.push((e + h) / 2);
          }
        }, alignToOthers: function alignToOthers() {
          var a = {},
              b,
              c = this.options;!1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || this.isLog || g(this.chart[this.coll], function (h) {
            var c = h.options,
                c = [h.horiz ? c.left : c.top, c.width, c.height, c.pane].join();h.series.length && (a[c] ? b = !0 : a[c] = 1);
          });return b;
        }, getTickAmount: function getTickAmount() {
          var a = this.options,
              b = a.tickAmount,
              c = a.tickPixelInterval;!r(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);!b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1);4 > b && (this.finalTickAmt = b, b = 5);this.tickAmount = b;
        }, adjustTickAmount: function adjustTickAmount() {
          var a = this.tickInterval,
              b = this.tickPositions,
              c = this.tickAmount,
              e = this.finalTickAmt,
              p = b && b.length;if (p < c) {
            for (; b.length < c;) {
              b.push(f(b[b.length - 1] + a));
            }this.transA *= (p - 1) / (c - 1);this.max = b[b.length - 1];
          } else p > c && (this.tickInterval *= 2, this.setTickPositions());if (r(e)) {
            for (a = c = b.length; a--;) {
              (3 === e && 1 === a % 2 || 2 >= e && 0 < a && a < c - 1) && b.splice(a, 1);
            }this.finalTickAmt = void 0;
          }
        }, setScale: function setScale() {
          var a, b;this.oldMin = this.min;this.oldMax = this.max;this.oldAxisLength = this.len;this.setAxisSize();b = this.len !== this.oldAxisLength;g(this.series, function (b) {
            if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0;
          });b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
        }, setExtremes: function setExtremes(a, b, c, e, p) {
          var h = this,
              n = h.chart;c = B(c, !0);g(h.series, function (a) {
            delete a.kdTree;
          });p = d(p, { min: a, max: b });k(h, "setExtremes", p, function () {
            h.userMin = a;h.userMax = b;h.eventArgs = p;c && n.redraw(e);
          });
        }, zoom: function zoom(a, b) {
          var h = this.dataMin,
              c = this.dataMax,
              e = this.options,
              p = Math.min(h, B(e.min, h)),
              e = Math.max(c, B(e.max, c));if (a !== this.min || b !== this.max) this.allowZoomOutside || (r(h) && (a < p && (a = p), a > e && (a = e)), r(c) && (b < p && (b = p), b > e && (b = e))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, { trigger: "zoom" });return !0;
        }, setAxisSize: function setAxisSize() {
          var b = this.chart,
              c = this.options,
              e = c.offsets || [0, 0, 0, 0],
              p = this.horiz,
              d = this.width = Math.round(a.relativeLength(B(c.width, b.plotWidth - e[3] + e[1]), b.plotWidth)),
              n = this.height = Math.round(a.relativeLength(B(c.height, b.plotHeight - e[0] + e[2]), b.plotHeight)),
              q = this.top = Math.round(a.relativeLength(B(c.top, b.plotTop + e[0]), b.plotHeight, b.plotTop)),
              c = this.left = Math.round(a.relativeLength(B(c.left, b.plotLeft + e[3]), b.plotWidth, b.plotLeft));this.bottom = b.chartHeight - n - q;this.right = b.chartWidth - d - c;this.len = Math.max(p ? d : n, 0);this.pos = p ? c : q;
        }, getExtremes: function getExtremes() {
          var a = this.isLog,
              b = this.lin2log;return { min: a ? f(b(this.min)) : this.min, max: a ? f(b(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax };
        }, getThreshold: function getThreshold(a) {
          var b = this.isLog,
              h = this.lin2log,
              c = b ? h(this.min) : this.min,
              b = b ? h(this.max) : this.max;
          null === a ? a = c : c > a ? a = c : b < a && (a = b);return this.translate(a, 0, 1, 0, 1);
        }, autoLabelAlign: function autoLabelAlign(a) {
          a = (B(a, 0) - 90 * this.side + 720) % 360;return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center";
        }, tickSize: function tickSize(a) {
          var b = this.options,
              h = b[a + "Length"],
              c = B(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);if (c && h) return "inside" === b[a + "Position"] && (h = -h), [h, c];
        }, labelMetrics: function labelMetrics() {
          var a = this.tickPositions && this.tickPositions[0] || 0;return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label);
        }, unsquish: function unsquish() {
          var a = this.options.labels,
              b = this.horiz,
              c = this.tickInterval,
              e = c,
              p = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c),
              d,
              n = a.rotation,
              q = this.labelMetrics(),
              k,
              f = Number.MAX_VALUE,
              v,
              z = function z(a) {
            a /= p || 1;a = 1 < a ? Math.ceil(a) : 1;return a * c;
          };b ? (v = !a.staggerLines && !a.step && (r(n) ? [n] : p < B(a.autoRotationLimit, 80) && a.autoRotation)) && g(v, function (a) {
            var b;if (a === n || a && -90 <= a && 90 >= a) k = z(Math.abs(q.h / Math.sin(u * a))), b = k + Math.abs(a / 360), b < f && (f = b, d = a, e = k);
          }) : a.step || (e = z(q.h));this.autoRotation = v;this.labelRotation = B(d, n);return e;
        }, getSlotWidth: function getSlotWidth() {
          var a = this.chart,
              b = this.horiz,
              c = this.options.labels,
              e = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
              p = a.margin[3];return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * this.len / e || !b && (p && p - a.spacing[3] || .33 * a.chartWidth);
        }, renderUnsquish: function renderUnsquish() {
          var a = this.chart,
              b = a.renderer,
              e = this.tickPositions,
              p = this.ticks,
              d = this.options.labels,
              n = this.horiz,
              q = this.getSlotWidth(),
              k = Math.max(1, Math.round(q - 2 * (d.padding || 5))),
              f = {},
              v = this.labelMetrics(),
              z = d.style && d.style.textOverflow,
              D,
              y = 0,
              l,
              I;J(d.rotation) || (f.rotation = d.rotation || 0);g(e, function (a) {
            (a = p[a]) && a.labelLength > y && (y = a.labelLength);
          });this.maxLabelLength = y;if (this.autoRotation) y > k && y > v.h ? f.rotation = this.labelRotation : this.labelRotation = 0;else if (q && (D = { width: k + "px" }, !z)) for (D.textOverflow = "clip", l = e.length; !n && l--;) {
            if (I = e[l], k = p[I].label) k.styles && "ellipsis" === k.styles.textOverflow ? k.css({ textOverflow: "clip" }) : p[I].labelLength > q && k.css({ width: q + "px" }), k.getBBox().height > this.len / e.length - (v.h - v.f) && (k.specCss = { textOverflow: "ellipsis" });
          }f.rotation && (D = { width: (y > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px" }, z || (D.textOverflow = "ellipsis"));if (this.labelAlign = d.align || this.autoLabelAlign(this.labelRotation)) f.align = this.labelAlign;g(e, function (a) {
            var b = (a = p[a]) && a.label;b && (b.attr(f), D && b.css(c(D, b.specCss)), delete b.specCss, a.rotation = f.rotation);
          });this.tickRotCorr = b.rotCorr(v.b, this.labelRotation || 0, 0 !== this.side);
        },
        hasData: function hasData() {
          return this.hasVisibleSeries || r(this.min) && r(this.max) && !!this.tickPositions;
        }, addTitle: function addTitle(a) {
          var b = this.chart.renderer,
              c = this.horiz,
              h = this.opposite,
              e = this.options.title,
              p;this.axisTitle || ((p = e.textAlign) || (p = (c ? { low: "left", middle: "center", high: "right" } : { low: h ? "right" : "left", middle: "center", high: h ? "left" : "right" })[e.align]), this.axisTitle = b.text(e.text, 0, 0, e.useHTML).attr({ zIndex: 7, rotation: e.rotation || 0, align: p }).addClass("highcharts-axis-title").css(e.style).add(this.axisGroup), this.axisTitle.isNew = !0);e.style.width || this.isRadial || this.axisTitle.css({ width: this.len });this.axisTitle[a ? "show" : "hide"](!0);
        }, generateTick: function generateTick(a) {
          var b = this.ticks;b[a] ? b[a].addLabel() : b[a] = new I(this, a);
        }, getOffset: function getOffset() {
          var a = this,
              b = a.chart,
              c = b.renderer,
              e = a.options,
              p = a.tickPositions,
              d = a.ticks,
              n = a.horiz,
              k = a.side,
              f = b.inverted && !a.isZAxis ? [1, 0, 3, 2][k] : k,
              v,
              z,
              D = 0,
              y,
              l = 0,
              I = e.title,
              m = e.labels,
              G = 0,
              J = b.axisOffset,
              b = b.clipOffset,
              t = [-1, 1, 1, -1][k],
              L = e.className,
              u = a.axisParent,
              K = this.tickSize("tick");
          v = a.hasData();a.showAxis = z = v || B(e.showEmpty, !0);a.staggerLines = a.horiz && m.staggerLines;a.axisGroup || (a.gridGroup = c.g("grid").attr({ zIndex: e.gridZIndex || 1 }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (L || "")).add(u), a.axisGroup = c.g("axis").attr({ zIndex: e.zIndex || 2 }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (L || "")).add(u), a.labelGroup = c.g("axis-labels").attr({ zIndex: m.zIndex || 7 }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (L || "")).add(u));v || a.isLinked ? (g(p, function (b, c) {
            a.generateTick(b, c);
          }), a.renderUnsquish(), !1 === m.reserveSpace || 0 !== k && 2 !== k && { 1: "left", 3: "right" }[k] !== a.labelAlign && "center" !== a.labelAlign || g(p, function (a) {
            G = Math.max(d[a].getLabelSize(), G);
          }), a.staggerLines && (G *= a.staggerLines, a.labelOffset = G * (a.opposite ? -1 : 1))) : q(d, function (a, b) {
            a.destroy();delete d[b];
          });I && I.text && !1 !== I.enabled && (a.addTitle(z), z && !1 !== I.reserveSpace && (a.titleOffset = D = a.axisTitle.getBBox()[n ? "height" : "width"], y = I.offset, l = r(y) ? 0 : B(I.margin, n ? 5 : 10)));a.renderLine();a.offset = t * B(e.offset, J[k]);a.tickRotCorr = a.tickRotCorr || { x: 0, y: 0 };c = 0 === k ? -a.labelMetrics().h : 2 === k ? a.tickRotCorr.y : 0;l = Math.abs(G) + l;G && (l = l - c + t * (n ? B(m.y, a.tickRotCorr.y + 8 * t) : m.x));a.axisTitleMargin = B(y, l);J[k] = Math.max(J[k], a.axisTitleMargin + D + t * a.offset, l, v && p.length && K ? K[0] + t * a.offset : 0);p = 2 * Math.floor(a.axisLine.strokeWidth() / 2);0 < e.offset && (p -= 2 * e.offset);b[f] = Math.max(b[f] || p, p);
        }, getLinePath: function getLinePath(a) {
          var b = this.chart,
              c = this.opposite,
              h = this.offset,
              e = this.horiz,
              p = this.left + (c ? this.width : 0) + h,
              h = b.chartHeight - this.bottom - (c ? this.height : 0) + h;c && (a *= -1);return b.renderer.crispLine(["M", e ? this.left : p, e ? h : this.top, "L", e ? b.chartWidth - this.right : p, e ? h : b.chartHeight - this.bottom], a);
        }, renderLine: function renderLine() {
          this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }));
        }, getTitlePosition: function getTitlePosition() {
          var a = this.horiz,
              b = this.left,
              c = this.top,
              e = this.len,
              p = this.options.title,
              d = a ? b : c,
              n = this.opposite,
              q = this.offset,
              k = p.x || 0,
              g = p.y || 0,
              f = this.axisTitle,
              v = this.chart.renderer.fontMetrics(p.style && p.style.fontSize, f),
              f = Math.max(f.getBBox(null, 0).height - v.h - 1, 0),
              e = { low: d + (a ? 0 : e), middle: d + e / 2, high: d + (a ? e : 0) }[p.align],
              b = (a ? c + this.height : b) + (a ? 1 : -1) * (n ? -1 : 1) * this.axisTitleMargin + [-f, f, v.f, -f][this.side];return { x: a ? e + k : b + (n ? this.width : 0) + q + k, y: a ? b + g - (n ? this.height : 0) + q : e + g };
        }, renderMinorTick: function renderMinorTick(a) {
          var b = this.chart.hasRendered && D(this.oldMin),
              c = this.minorTicks;c[a] || (c[a] = new I(this, a, "minor"));b && c[a].isNew && c[a].render(null, !0);c[a].render(null, !1, 1);
        }, renderTick: function renderTick(a, b) {
          var c = this.isLinked,
              e = this.ticks,
              h = this.chart.hasRendered && D(this.oldMin);if (!c || a >= this.min && a <= this.max) e[a] || (e[a] = new I(this, a)), h && e[a].isNew && e[a].render(b, !0, .1), e[a].render(b);
        }, render: function render() {
          var b = this,
              c = b.chart,
              e = b.options,
              p = b.isLog,
              d = b.lin2log,
              n = b.isLinked,
              k = b.tickPositions,
              f = b.axisTitle,
              v = b.ticks,
              y = b.minorTicks,
              l = b.alternateBands,
              m = e.stackLabels,
              r = e.alternateGridColor,
              B = b.tickmarkOffset,
              G = b.axisLine,
              J = b.showAxis,
              t = A(c.renderer.globalAnimation),
              L,
              u;b.labelEdge.length = 0;b.overlap = !1;g([v, y, l], function (a) {
            q(a, function (a) {
              a.isActive = !1;
            });
          });if (b.hasData() || n) b.minorTickInterval && !b.categories && g(b.getMinorTickPositions(), function (a) {
            b.renderMinorTick(a);
          }), k.length && (g(k, function (a, c) {
            b.renderTick(a, c);
          }), B && (0 === b.min || b.single) && (v[-1] || (v[-1] = new I(b, -1, null, !0)), v[-1].render(-1))), r && g(k, function (e, h) {
            u = void 0 !== k[h + 1] ? k[h + 1] + B : b.max - B;0 === h % 2 && e < b.max && u <= b.max + (c.polar ? -B : B) && (l[e] || (l[e] = new a.PlotLineOrBand(b)), L = e + B, l[e].options = { from: p ? d(L) : L, to: p ? d(u) : u, color: r }, l[e].render(), l[e].isActive = !0);
          }), b._addedPlotLB || (g((e.plotLines || []).concat(e.plotBands || []), function (a) {
            b.addPlotBandOrLine(a);
          }), b._addedPlotLB = !0);g([v, y, l], function (a) {
            var b,
                e = [],
                h = t.duration;q(a, function (a, b) {
              a.isActive || (a.render(b, !1, 0), a.isActive = !1, e.push(b));
            });z(function () {
              for (b = e.length; b--;) {
                a[e[b]] && !a[e[b]].isActive && (a[e[b]].destroy(), delete a[e[b]]);
              }
            }, a !== l && c.hasRendered && h ? h : 0);
          });G && (G[G.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(G.strokeWidth()) }), G.isPlaced = !0, G[J ? "show" : "hide"](!0));f && J && (e = b.getTitlePosition(), D(e.y) ? (f[f.isNew ? "attr" : "animate"](e), f.isNew = !1) : (f.attr("y", -9999), f.isNew = !0));m && m.enabled && b.renderStackTotals();b.isDirty = !1;
        }, redraw: function redraw() {
          this.visible && (this.render(), g(this.plotLinesAndBands, function (a) {
            a.render();
          }));g(this.series, function (a) {
            a.isDirty = !0;
          });
        }, keepProps: "extKey hcEvents names series userMax userMin".split(" "), destroy: function destroy(a) {
          var b = this,
              c = b.stacks,
              e = b.plotLinesAndBands,
              h;a || K(b);q(c, function (a, b) {
            t(a);c[b] = null;
          });g([b.ticks, b.minorTicks, b.alternateBands], function (a) {
            t(a);
          });if (e) for (a = e.length; a--;) {
            e[a].destroy();
          }g("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function (a) {
            b[a] && (b[a] = b[a].destroy());
          });for (h in b.plotLinesAndBandsGroups) {
            b.plotLinesAndBandsGroups[h] = b.plotLinesAndBandsGroups[h].destroy();
          }q(b, function (a, c) {
            -1 === y(c, b.keepProps) && delete b[c];
          });
        }, drawCrosshair: function drawCrosshair(a, b) {
          var c,
              e = this.crosshair,
              h = B(e.snap, !0),
              p,
              d = this.cross;a || (a = this.cross && this.cross.e);this.crosshair && !1 !== (r(b) || !h) ? (h ? r(b) && (p = this.isXAxis ? b.plotX : this.len - b.plotY) : p = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), r(p) && (c = this.getPlotLinePath(b && (this.isXAxis ? b.x : B(b.stackY, b.y)), null, null, null, p) || null), r(c) ? (b = this.categories && !this.isRadial, d || (this.cross = d = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (b ? "category " : "thin ") + e.className).attr({ zIndex: B(e.zIndex, 2) }).add(), d.attr({ stroke: e.color || (b ? m("#ccd6eb").setOpacity(.25).get() : "#cccccc"), "stroke-width": B(e.width, 1) }), e.dashStyle && d.attr({ dashstyle: e.dashStyle })), d.show().attr({ d: c }), b && !e.width && d.attr({ "stroke-width": this.transA }), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair();
        }, hideCrosshair: function hideCrosshair() {
          this.cross && this.cross.hide();
        } });return a.Axis = L;
    }(M);(function (a) {
      var C = a.Axis,
          A = a.Date,
          F = a.dateFormat,
          E = a.defaultOptions,
          m = a.defined,
          f = a.each,
          l = a.extend,
          r = a.getMagnitude,
          u = a.getTZOffset,
          t = a.normalizeTickInterval,
          g = a.pick,
          d = a.timeUnits;C.prototype.getTimeTicks = function (a, b, e, v) {
        var k = [],
            n = {},
            D = E.global.useUTC,
            r,
            c = new A(b - Math.max(u(b), u(e))),
            G = A.hcMakeTime,
            q = a.unitRange,
            B = a.count,
            t,
            p;if (m(b)) {
          c[A.hcSetMilliseconds](q >= d.second ? 0 : B * Math.floor(c.getMilliseconds() / B));if (q >= d.second) c[A.hcSetSeconds](q >= d.minute ? 0 : B * Math.floor(c.getSeconds() / B));if (q >= d.minute) c[A.hcSetMinutes](q >= d.hour ? 0 : B * Math.floor(c[A.hcGetMinutes]() / B));if (q >= d.hour) c[A.hcSetHours](q >= d.day ? 0 : B * Math.floor(c[A.hcGetHours]() / B));if (q >= d.day) c[A.hcSetDate](q >= d.month ? 1 : B * Math.floor(c[A.hcGetDate]() / B));q >= d.month && (c[A.hcSetMonth](q >= d.year ? 0 : B * Math.floor(c[A.hcGetMonth]() / B)), r = c[A.hcGetFullYear]());if (q >= d.year) c[A.hcSetFullYear](r - r % B);if (q === d.week) c[A.hcSetDate](c[A.hcGetDate]() - c[A.hcGetDay]() + g(v, 1));r = c[A.hcGetFullYear]();v = c[A.hcGetMonth]();var z = c[A.hcGetDate](),
              I = c[A.hcGetHours]();if (A.hcTimezoneOffset || A.hcGetTimezoneOffset) p = (!D || !!A.hcGetTimezoneOffset) && (e - b > 4 * d.month || u(b) !== u(e)), c = c.getTime(), t = u(c), c = new A(c + t);D = c.getTime();for (b = 1; D < e;) {
            k.push(D), D = q === d.year ? G(r + b * B, 0) : q === d.month ? G(r, v + b * B) : !p || q !== d.day && q !== d.week ? p && q === d.hour ? G(r, v, z, I + b * B, 0, 0, t) - t : D + q * B : G(r, v, z + b * B * (q === d.day ? 1 : 7)), b++;
          }k.push(D);q <= d.hour && 1E4 > k.length && f(k, function (a) {
            0 === a % 18E5 && "000000000" === F("%H%M%S%L", a) && (n[a] = "day");
          });
        }k.info = l(a, { higherRanks: n, totalRange: q * B });return k;
      };C.prototype.normalizeTimeTickInterval = function (a, b) {
        var e = b || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];b = e[e.length - 1];var k = d[b[0]],
            g = b[1],
            n;for (n = 0; n < e.length && !(b = e[n], k = d[b[0]], g = b[1], e[n + 1] && a <= (k * g[g.length - 1] + d[e[n + 1][0]]) / 2); n++) {}k === d.year && a < 5 * k && (g = [1, 2, 5]);a = t(a / k, g, "year" === b[0] ? Math.max(r(a / k), 1) : 1);return { unitRange: k, count: a, unitName: b[0] };
      };
    })(M);(function (a) {
      var C = a.Axis,
          A = a.getMagnitude,
          F = a.map,
          E = a.normalizeTickInterval,
          m = a.pick;C.prototype.getLogTickPositions = function (a, l, r, u) {
        var f = this.options,
            g = this.len,
            d = this.lin2log,
            k = this.log2lin,
            b = [];u || (this._minorAutoInterval = null);if (.5 <= a) a = Math.round(a), b = this.getLinearTickPositions(a, l, r);else if (.08 <= a) for (var g = Math.floor(l), e, v, y, n, D, f = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; g < r + 1 && !D; g++) {
          for (v = f.length, e = 0; e < v && !D; e++) {
            y = k(d(g) * f[e]), y > l && (!u || n <= r) && void 0 !== n && b.push(n), n > r && (D = !0), n = y;
          }
        } else l = d(l), r = d(r), a = f[u ? "minorTickInterval" : "tickInterval"], a = m("auto" === a ? null : a, this._minorAutoInterval, f.tickPixelInterval / (u ? 5 : 1) * (r - l) / ((u ? g / this.tickPositions.length : g) || 1)), a = E(a, null, A(a)), b = F(this.getLinearTickPositions(a, l, r), k), u || (this._minorAutoInterval = a / 5);u || (this.tickInterval = a);return b;
      };C.prototype.log2lin = function (a) {
        return Math.log(a) / Math.LN10;
      };C.prototype.lin2log = function (a) {
        return Math.pow(10, a);
      };
    })(M);(function (a, C) {
      var A = a.arrayMax,
          F = a.arrayMin,
          E = a.defined,
          m = a.destroyObjectProperties,
          f = a.each,
          l = a.erase,
          r = a.merge,
          u = a.pick;a.PlotLineOrBand = function (a, g) {
        this.axis = a;g && (this.options = g, this.id = g.id);
      };a.PlotLineOrBand.prototype = { render: function render() {
          var f = this,
              g = f.axis,
              d = g.horiz,
              k = f.options,
              b = k.label,
              e = f.label,
              v = k.to,
              l = k.from,
              n = k.value,
              D = E(l) && E(v),
              m = E(n),
              c = f.svgElem,
              G = !c,
              q = [],
              B = k.color,
              K = u(k.zIndex, 0),
              p = k.events,
              q = { "class": "highcharts-plot-" + (D ? "band " : "line ") + (k.className || "") },
              z = {},
              I = g.chart.renderer,
              L = D ? "bands" : "lines",
              h = g.log2lin;g.isLog && (l = h(l), v = h(v), n = h(n));m ? (q = { stroke: B, "stroke-width": k.width }, k.dashStyle && (q.dashstyle = k.dashStyle)) : D && (B && (q.fill = B), k.borderWidth && (q.stroke = k.borderColor, q["stroke-width"] = k.borderWidth));z.zIndex = K;L += "-" + K;(B = g.plotLinesAndBandsGroups[L]) || (g.plotLinesAndBandsGroups[L] = B = I.g("plot-" + L).attr(z).add());G && (f.svgElem = c = I.path().attr(q).add(B));if (m) q = g.getPlotLinePath(n, c.strokeWidth());else if (D) q = g.getPlotBandPath(l, v, k);else return;G && q && q.length ? (c.attr({ d: q }), p && a.objectEach(p, function (a, b) {
            c.on(b, function (a) {
              p[b].apply(f, [a]);
            });
          })) : c && (q ? (c.show(), c.animate({ d: q })) : (c.hide(), e && (f.label = e = e.destroy())));b && E(b.text) && q && q.length && 0 < g.width && 0 < g.height && !q.flat ? (b = r({ align: d && D && "center", x: d ? !D && 4 : 10, verticalAlign: !d && D && "middle", y: d ? D ? 16 : 10 : D ? 6 : -4, rotation: d && !D && 90 }, b), this.renderLabel(b, q, D, K)) : e && e.hide();return f;
        }, renderLabel: function renderLabel(a, g, d, k) {
          var b = this.label,
              e = this.axis.chart.renderer;b || (b = { align: a.textAlign || a.align, rotation: a.rotation, "class": "highcharts-plot-" + (d ? "band" : "line") + "-label " + (a.className || "") }, b.zIndex = k, this.label = b = e.text(a.text, 0, 0, a.useHTML).attr(b).add(), b.css(a.style));k = [g[1], g[4], d ? g[6] : g[1]];g = [g[2], g[5], d ? g[7] : g[2]];d = F(k);e = F(g);b.align(a, !1, { x: d, y: e,
            width: A(k) - d, height: A(g) - e });b.show();
        }, destroy: function destroy() {
          l(this.axis.plotLinesAndBands, this);delete this.axis;m(this);
        } };a.extend(C.prototype, { getPlotBandPath: function getPlotBandPath(a, g) {
          var d = this.getPlotLinePath(g, null, null, !0),
              k = this.getPlotLinePath(a, null, null, !0),
              b = this.horiz,
              e = 1;a = a < this.min && g < this.min || a > this.max && g > this.max;k && d ? (a && (k.flat = k.toString() === d.toString(), e = 0), k.push(b && d[4] === k[4] ? d[4] + e : d[4], b || d[5] !== k[5] ? d[5] : d[5] + e, b && d[1] === k[1] ? d[1] + e : d[1], b || d[2] !== k[2] ? d[2] : d[2] + e)) : k = null;return k;
        },
        addPlotBand: function addPlotBand(a) {
          return this.addPlotBandOrLine(a, "plotBands");
        }, addPlotLine: function addPlotLine(a) {
          return this.addPlotBandOrLine(a, "plotLines");
        }, addPlotBandOrLine: function addPlotBandOrLine(f, g) {
          var d = new a.PlotLineOrBand(this, f).render(),
              k = this.userOptions;d && (g && (k[g] = k[g] || [], k[g].push(f)), this.plotLinesAndBands.push(d));return d;
        }, removePlotBandOrLine: function removePlotBandOrLine(a) {
          for (var g = this.plotLinesAndBands, d = this.options, k = this.userOptions, b = g.length; b--;) {
            g[b].id === a && g[b].destroy();
          }f([d.plotLines || [], k.plotLines || [], d.plotBands || [], k.plotBands || []], function (e) {
            for (b = e.length; b--;) {
              e[b].id === a && l(e, e[b]);
            }
          });
        }, removePlotBand: function removePlotBand(a) {
          this.removePlotBandOrLine(a);
        }, removePlotLine: function removePlotLine(a) {
          this.removePlotBandOrLine(a);
        } });
    })(M, S);(function (a) {
      var C = a.dateFormat,
          A = a.each,
          F = a.extend,
          E = a.format,
          m = a.isNumber,
          f = a.map,
          l = a.merge,
          r = a.pick,
          u = a.splat,
          t = a.syncTimeout,
          g = a.timeUnits;a.Tooltip = function () {
        this.init.apply(this, arguments);
      };a.Tooltip.prototype = { init: function init(a, k) {
          this.chart = a;this.options = k;this.crosshairs = [];this.now = { x: 0, y: 0 };
          this.isHidden = !0;this.split = k.split && !a.inverted;this.shared = k.shared || this.split;
        }, cleanSplit: function cleanSplit(a) {
          A(this.chart.series, function (d) {
            var b = d && d.tt;b && (!b.isActive || a ? d.tt = b.destroy() : b.isActive = !1);
          });
        }, getLabel: function getLabel() {
          var a = this.chart.renderer,
              k = this.options;this.label || (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, k.shape || "callout", null, null, k.useHTML, null, "tooltip").attr({ padding: k.padding, r: k.borderRadius }), this.label.attr({ fill: k.backgroundColor, "stroke-width": k.borderWidth }).css(k.style).shadow(k.shadow)), this.label.attr({ zIndex: 8 }).add());return this.label;
        }, update: function update(a) {
          this.destroy();l(!0, this.chart.options.tooltip.userOptions, a);this.init(this.chart, l(!0, this.options, a));
        }, destroy: function destroy() {
          this.label && (this.label = this.label.destroy());this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout);
        }, move: function move(a, k, b, e) {
          var d = this,
              g = d.now,
              n = !1 !== d.options.animation && !d.isHidden && (1 < Math.abs(a - g.x) || 1 < Math.abs(k - g.y)),
              f = d.followPointer || 1 < d.len;F(g, { x: n ? (2 * g.x + a) / 3 : a, y: n ? (g.y + k) / 2 : k, anchorX: f ? void 0 : n ? (2 * g.anchorX + b) / 3 : b, anchorY: f ? void 0 : n ? (g.anchorY + e) / 2 : e });d.getLabel().attr(g);n && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
            d && d.move(a, k, b, e);
          }, 32));
        }, hide: function hide(a) {
          var d = this;clearTimeout(this.hideTimer);a = r(a, this.options.hideDelay, 500);this.isHidden || (this.hideTimer = t(function () {
            d.getLabel()[a ? "fadeOut" : "hide"]();d.isHidden = !0;
          }, a));
        }, getAnchor: function getAnchor(a, k) {
          var b,
              e = this.chart,
              d = e.inverted,
              g = e.plotTop,
              n = e.plotLeft,
              l = 0,
              m = 0,
              c,
              r;a = u(a);b = a[0].tooltipPos;this.followPointer && k && (void 0 === k.chartX && (k = e.pointer.normalize(k)), b = [k.chartX - e.plotLeft, k.chartY - g]);b || (A(a, function (a) {
            c = a.series.yAxis;r = a.series.xAxis;l += a.plotX + (!d && r ? r.left - n : 0);m += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!d && c ? c.top - g : 0);
          }), l /= a.length, m /= a.length, b = [d ? e.plotWidth - m : l, this.shared && !d && 1 < a.length && k ? k.chartY - g : d ? e.plotHeight - l : m]);return f(b, Math.round);
        }, getPosition: function getPosition(a, g, b) {
          var e = this.chart,
              d = this.distance,
              k = {},
              n = b.h || 0,
              f,
              l = ["y", e.chartHeight, g, b.plotY + e.plotTop, e.plotTop, e.plotTop + e.plotHeight],
              c = ["x", e.chartWidth, a, b.plotX + e.plotLeft, e.plotLeft, e.plotLeft + e.plotWidth],
              m = !this.followPointer && r(b.ttBelow, !e.inverted === !!b.negative),
              q = function q(a, b, c, e, p, _q) {
            var h = c < e - d,
                g = e + d + c < b,
                f = e - d - c;e += d;if (m && g) k[a] = e;else if (!m && h) k[a] = f;else if (h) k[a] = Math.min(_q - c, 0 > f - n ? f : f - n);else if (g) k[a] = Math.max(p, e + n + c > b ? e : e + n);else return !1;
          },
              B = function B(a, b, c, e) {
            var h;e < d || e > b - d ? h = !1 : k[a] = e < c / 2 ? 1 : e > b - c / 2 ? b - c - 2 : e - c / 2;return h;
          },
              t = function t(a) {
            var b = l;l = c;c = b;f = a;
          },
              p = function p() {
            !1 !== q.apply(0, l) ? !1 !== B.apply(0, c) || f || (t(!0), p()) : f ? k.x = k.y = 0 : (t(!0), p());
          };(e.inverted || 1 < this.len) && t();p();return k;
        }, defaultFormatter: function defaultFormatter(a) {
          var d = this.points || u(this),
              b;b = [a.tooltipFooterHeaderFormatter(d[0])];b = b.concat(a.bodyFormatter(d));b.push(a.tooltipFooterHeaderFormatter(d[0], !0));return b;
        }, refresh: function refresh(a, g) {
          var b,
              e = this.options,
              d,
              k = a,
              n,
              f = {},
              l = [];b = e.formatter || this.defaultFormatter;var f = this.shared,
              c;e.enabled && (clearTimeout(this.hideTimer), this.followPointer = u(k)[0].series.tooltipOptions.followPointer, n = this.getAnchor(k, g), g = n[0], d = n[1], !f || k.series && k.series.noSharedTooltip ? f = k.getLabelConfig() : (A(k, function (a) {
            a.setState("hover");l.push(a.getLabelConfig());
          }), f = { x: k[0].category, y: k[0].y }, f.points = l, k = k[0]), this.len = l.length, f = b.call(f, this), c = k.series, this.distance = r(c.tooltipOptions.distance, 16), !1 === f ? this.hide() : (b = this.getLabel(), this.isHidden && b.attr({ opacity: 1 }).show(), this.split ? this.renderSplit(f, a) : (e.style.width || b.css({ width: this.chart.spacingBox.width }), b.attr({ text: f && f.join ? f.join("") : f }), b.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + r(k.colorIndex, c.colorIndex)), b.attr({ stroke: e.borderColor || k.color || c.color || "#666666" }), this.updatePosition({ plotX: g, plotY: d, negative: k.negative, ttBelow: k.ttBelow, h: n[2] || 0 })), this.isHidden = !1));
        }, renderSplit: function renderSplit(d, k) {
          var b = this,
              e = [],
              g = this.chart,
              f = g.renderer,
              n = !0,
              l = this.options,
              m = 0,
              c = this.getLabel();A(d.slice(0, k.length + 1), function (a, d) {
            if (!1 !== a) {
              d = k[d - 1] || { isHeader: !0, plotX: k[0].plotX };var q = d.series || b,
                  v = q.tt,
                  p = d.series || {},
                  z = "highcharts-color-" + r(d.colorIndex, p.colorIndex, "none");v || (q.tt = v = f.label(null, null, null, "callout").addClass("highcharts-tooltip-box " + z).attr({ padding: l.padding, r: l.borderRadius, fill: l.backgroundColor, stroke: l.borderColor || d.color || p.color || "#333333", "stroke-width": l.borderWidth }).add(c));v.isActive = !0;v.attr({ text: a });v.css(l.style).shadow(l.shadow);a = v.getBBox();p = a.width + v.strokeWidth();
              d.isHeader ? (m = a.height, p = Math.max(0, Math.min(d.plotX + g.plotLeft - p / 2, g.chartWidth - p))) : p = d.plotX + g.plotLeft - r(l.distance, 16) - p;0 > p && (n = !1);a = (d.series && d.series.yAxis && d.series.yAxis.pos) + (d.plotY || 0);a -= g.plotTop;e.push({ target: d.isHeader ? g.plotHeight + m : a, rank: d.isHeader ? 1 : 0, size: q.tt.getBBox().height + 1, point: d, x: p, tt: v });
            }
          });this.cleanSplit();a.distribute(e, g.plotHeight + m);A(e, function (a) {
            var b = a.point,
                c = b.series;a.tt.attr({ visibility: void 0 === a.pos ? "hidden" : "inherit", x: n || b.isHeader ? a.x : b.plotX + g.plotLeft + r(l.distance, 16), y: a.pos + g.plotTop, anchorX: b.isHeader ? b.plotX + g.plotLeft : b.plotX + c.xAxis.pos, anchorY: b.isHeader ? a.pos + g.plotTop - 15 : b.plotY + c.yAxis.pos });
          });
        }, updatePosition: function updatePosition(a) {
          var d = this.chart,
              b = this.getLabel(),
              b = (this.options.positioner || this.getPosition).call(this, b.width, b.height, a);this.move(Math.round(b.x), Math.round(b.y || 0), a.plotX + d.plotLeft, a.plotY + d.plotTop);
        }, getDateFormat: function getDateFormat(a, k, b, e) {
          var d = C("%m-%d %H:%M:%S.%L", k),
              f,
              n,
              l = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 },
              m = "millisecond";for (n in g) {
            if (a === g.week && +C("%w", k) === b && "00:00:00.000" === d.substr(6)) {
              n = "week";break;
            }if (g[n] > a) {
              n = m;break;
            }if (l[n] && d.substr(l[n]) !== "01-01 00:00:00.000".substr(l[n])) break;"week" !== n && (m = n);
          }n && (f = e[n]);return f;
        }, getXDateFormat: function getXDateFormat(a, g, b) {
          g = g.dateTimeLabelFormats;var e = b && b.closestPointRange;return (e ? this.getDateFormat(e, a.x, b.options.startOfWeek, g) : g.day) || g.year;
        }, tooltipFooterHeaderFormatter: function tooltipFooterHeaderFormatter(a, g) {
          var b = g ? "footer" : "header";g = a.series;var e = g.tooltipOptions,
              d = e.xDateFormat,
              k = g.xAxis,
              n = k && "datetime" === k.options.type && m(a.key),
              b = e[b + "Format"];n && !d && (d = this.getXDateFormat(a, e, k));n && d && (b = b.replace("{point.key}", "{point.key:" + d + "}"));return E(b, { point: a, series: g });
        }, bodyFormatter: function bodyFormatter(a) {
          return f(a, function (a) {
            var b = a.series.tooltipOptions;return (b.pointFormatter || a.point.tooltipFormatter).call(a.point, b.pointFormat);
          });
        } };
    })(M);(function (a) {
      var C = a.addEvent,
          A = a.attr,
          F = a.charts,
          E = a.color,
          m = a.css,
          f = a.defined,
          l = a.each,
          r = a.extend,
          u = a.find,
          t = a.fireEvent,
          g = a.isObject,
          d = a.offset,
          k = a.pick,
          b = a.removeEvent,
          e = a.splat,
          v = a.Tooltip,
          y = a.win;a.Pointer = function (a, b) {
        this.init(a, b);
      };a.Pointer.prototype = { init: function init(a, b) {
          this.options = b;this.chart = a;this.runChartClick = b.chart.events && !!b.chart.events.click;this.pinchDown = [];this.lastValidTouch = {};v && (a.tooltip = new v(a, b.tooltip), this.followTouchMove = k(b.tooltip.followTouchMove, !0));this.setDOMEvents();
        }, zoomOption: function zoomOption(a) {
          var b = this.chart,
              e = b.options.chart,
              c = e.zoomType || "",
              b = b.inverted;/touch/.test(a.type) && (c = k(e.pinchType, c));
          this.zoomX = a = /x/.test(c);this.zoomY = c = /y/.test(c);this.zoomHor = a && !b || c && b;this.zoomVert = c && !b || a && b;this.hasZoom = a || c;
        }, normalize: function normalize(a, b) {
          var e, c;a = a || y.event;a.target || (a.target = a.srcElement);c = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;b || (this.chartPosition = b = d(this.chart.container));void 0 === c.pageX ? (e = Math.max(a.x, a.clientX - b.left), b = a.y) : (e = c.pageX - b.left, b = c.pageY - b.top);return r(a, { chartX: Math.round(e), chartY: Math.round(b) });
        }, getCoordinates: function getCoordinates(a) {
          var b = { xAxis: [], yAxis: [] };l(this.chart.axes, function (e) {
            b[e.isXAxis ? "xAxis" : "yAxis"].push({ axis: e, value: e.toValue(a[e.horiz ? "chartX" : "chartY"]) });
          });return b;
        }, findNearestKDPoint: function findNearestKDPoint(a, b, e) {
          var c;l(a, function (a) {
            var d = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y");a = a.searchPoint(e, d);if ((d = g(a, !0)) && !(d = !g(c, !0))) var d = c.distX - a.distX,
                n = c.dist - a.dist,
                k = (a.series.group && a.series.group.zIndex) - (c.series.group && c.series.group.zIndex),
                d = 0 < (0 !== d && b ? d : 0 !== n ? n : 0 !== k ? k : c.series.index > a.series.index ? -1 : 1);d && (c = a);
          });return c;
        }, getPointFromEvent: function getPointFromEvent(a) {
          a = a.target;for (var b; a && !b;) {
            b = a.point, a = a.parentNode;
          }return b;
        }, getChartCoordinatesFromPoint: function getChartCoordinatesFromPoint(a, b) {
          var e = a.series,
              c = e.xAxis,
              e = e.yAxis;if (c && e) return b ? { chartX: c.len + c.pos - a.clientX, chartY: e.len + e.pos - a.plotY } : { chartX: a.clientX + c.pos, chartY: a.plotY + e.pos };
        }, getHoverData: function getHoverData(b, e, d, c, f, q) {
          var n,
              v = [];c = !(!c || !b);var p = e && !e.stickyTracking ? [e] : a.grep(d, function (a) {
            return a.visible && !(!f && a.directTouch) && k(a.options.enableMouseTracking, !0) && a.stickyTracking;
          });e = (n = c ? b : this.findNearestKDPoint(p, f, q)) && n.series;n && (f && !e.noSharedTooltip ? (p = a.grep(d, function (a) {
            return a.visible && !(!f && a.directTouch) && k(a.options.enableMouseTracking, !0) && !a.noSharedTooltip;
          }), l(p, function (a) {
            a = u(a.points, function (a) {
              return a.x === n.x;
            });g(a) && !a.isNull && v.push(a);
          })) : v.push(n));return { hoverPoint: n, hoverSeries: e, hoverPoints: v };
        }, runPointActions: function runPointActions(b, e) {
          var d = this.chart,
              c = d.tooltip,
              g = c ? c.shared : !1,
              n = e || d.hoverPoint,
              f = n && n.series || d.hoverSeries,
              f = this.getHoverData(n, f, d.series, !!e || f && f.directTouch && this.isDirectTouch, g, b),
              v,
              n = f.hoverPoint;v = f.hoverPoints;e = (f = f.hoverSeries) && f.tooltipOptions.followPointer;g = g && f && !f.noSharedTooltip;if (n && (n !== d.hoverPoint || c && c.isHidden)) {
            l(d.hoverPoints || [], function (b) {
              -1 === a.inArray(b, v) && b.setState();
            });l(v || [], function (a) {
              a.setState("hover");
            });if (d.hoverSeries !== f) f.onMouseOver();d.hoverPoint && d.hoverPoint.firePointEvent("mouseOut");n.firePointEvent("mouseOver");d.hoverPoints = v;d.hoverPoint = n;c && c.refresh(g ? v : n, b);
          } else e && c && !c.isHidden && (n = c.getAnchor([{}], b), c.updatePosition({ plotX: n[0], plotY: n[1] }));this.unDocMouseMove || (this.unDocMouseMove = C(d.container.ownerDocument, "mousemove", function (b) {
            var c = F[a.hoverChartIndex];if (c) c.pointer.onDocumentMouseMove(b);
          }));l(d.axes, function (c) {
            var e = k(c.crosshair.snap, !0),
                p = e ? a.find(v, function (a) {
              return a.series[c.coll] === c;
            }) : void 0;p || !e ? c.drawCrosshair(b, p) : c.hideCrosshair();
          });
        }, reset: function reset(a, b) {
          var d = this.chart,
              c = d.hoverSeries,
              g = d.hoverPoint,
              n = d.hoverPoints,
              f = d.tooltip,
              k = f && f.shared ? n : g;a && k && l(e(k), function (b) {
            b.series.isCartesian && void 0 === b.plotX && (a = !1);
          });if (a) f && k && (f.refresh(k), g && (g.setState(g.state, !0), l(d.axes, function (a) {
            a.crosshair && a.drawCrosshair(null, g);
          })));else {
            if (g) g.onMouseOut();n && l(n, function (a) {
              a.setState();
            });if (c) c.onMouseOut();f && f.hide(b);this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());l(d.axes, function (a) {
              a.hideCrosshair();
            });this.hoverX = d.hoverPoints = d.hoverPoint = null;
          }
        }, scaleGroups: function scaleGroups(a, b) {
          var e = this.chart,
              c;l(e.series, function (d) {
            c = a || d.getPlotBox();d.xAxis && d.xAxis.zoomEnabled && d.group && (d.group.attr(c), d.markerGroup && (d.markerGroup.attr(c), d.markerGroup.clip(b ? e.clipRect : null)), d.dataLabelsGroup && d.dataLabelsGroup.attr(c));
          });e.clipRect.attr(b || e.clipBox);
        }, dragStart: function dragStart(a) {
          var b = this.chart;b.mouseIsDown = a.type;b.cancelClick = !1;b.mouseDownX = this.mouseDownX = a.chartX;b.mouseDownY = this.mouseDownY = a.chartY;
        }, drag: function drag(a) {
          var b = this.chart,
              e = b.options.chart,
              c = a.chartX,
              d = a.chartY,
              g = this.zoomHor,
              n = this.zoomVert,
              f = b.plotLeft,
              p = b.plotTop,
              k = b.plotWidth,
              v = b.plotHeight,
              l,
              h = this.selectionMarker,
              w = this.mouseDownX,
              m = this.mouseDownY,
              r = e.panKey && a[e.panKey + "Key"];h && h.touch || (c < f ? c = f : c > f + k && (c = f + k), d < p ? d = p : d > p + v && (d = p + v), this.hasDragged = Math.sqrt(Math.pow(w - c, 2) + Math.pow(m - d, 2)), 10 < this.hasDragged && (l = b.isInsidePlot(w - f, m - p), b.hasCartesianSeries && (this.zoomX || this.zoomY) && l && !r && !h && (this.selectionMarker = h = b.renderer.rect(f, p, g ? 1 : k, n ? 1 : v, 0).attr({ fill: e.selectionMarkerFill || E("#335cad").setOpacity(.25).get(), "class": "highcharts-selection-marker",
            zIndex: 7 }).add()), h && g && (c -= w, h.attr({ width: Math.abs(c), x: (0 < c ? 0 : c) + w })), h && n && (c = d - m, h.attr({ height: Math.abs(c), y: (0 < c ? 0 : c) + m })), l && !h && e.panning && b.pan(a, e.panning)));
        }, drop: function drop(a) {
          var b = this,
              e = this.chart,
              c = this.hasPinched;if (this.selectionMarker) {
            var d = { originalEvent: a, xAxis: [], yAxis: [] },
                g = this.selectionMarker,
                n = g.attr ? g.attr("x") : g.x,
                k = g.attr ? g.attr("y") : g.y,
                p = g.attr ? g.attr("width") : g.width,
                v = g.attr ? g.attr("height") : g.height,
                I;if (this.hasDragged || c) l(e.axes, function (e) {
              if (e.zoomEnabled && f(e.min) && (c || b[{ xAxis: "zoomX", yAxis: "zoomY" }[e.coll]])) {
                var h = e.horiz,
                    g = "touchend" === a.type ? e.minPixelPadding : 0,
                    q = e.toValue((h ? n : k) + g),
                    h = e.toValue((h ? n + p : k + v) - g);d[e.coll].push({ axis: e, min: Math.min(q, h), max: Math.max(q, h) });I = !0;
              }
            }), I && t(e, "selection", d, function (a) {
              e.zoom(r(a, c ? { animation: !1 } : null));
            });this.selectionMarker = this.selectionMarker.destroy();c && this.scaleGroups();
          }e && (m(e.container, { cursor: e._cursor }), e.cancelClick = 10 < this.hasDragged, e.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = []);
        }, onContainerMouseDown: function onContainerMouseDown(a) {
          a = this.normalize(a);this.zoomOption(a);a.preventDefault && a.preventDefault();this.dragStart(a);
        }, onDocumentMouseUp: function onDocumentMouseUp(b) {
          F[a.hoverChartIndex] && F[a.hoverChartIndex].pointer.drop(b);
        }, onDocumentMouseMove: function onDocumentMouseMove(a) {
          var b = this.chart,
              e = this.chartPosition;a = this.normalize(a, e);!e || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset();
        }, onContainerMouseLeave: function onContainerMouseLeave(b) {
          var e = F[a.hoverChartIndex];e && (b.relatedTarget || b.toElement) && (e.pointer.reset(), e.pointer.chartPosition = null);
        }, onContainerMouseMove: function onContainerMouseMove(b) {
          var e = this.chart;f(a.hoverChartIndex) && F[a.hoverChartIndex] && F[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = e.index);b = this.normalize(b);b.returnValue = !1;"mousedown" === e.mouseIsDown && this.drag(b);!this.inClass(b.target, "highcharts-tracker") && !e.isInsidePlot(b.chartX - e.plotLeft, b.chartY - e.plotTop) || e.openMenu || this.runPointActions(b);
        }, inClass: function inClass(a, b) {
          for (var e; a;) {
            if (e = A(a, "class")) {
              if (-1 !== e.indexOf(b)) return !0;if (-1 !== e.indexOf("highcharts-container")) return !1;
            }a = a.parentNode;
          }
        }, onTrackerMouseOut: function onTrackerMouseOut(a) {
          var b = this.chart.hoverSeries;a = a.relatedTarget || a.toElement;this.isDirectTouch = !1;if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut();
        }, onContainerClick: function onContainerClick(a) {
          var b = this.chart,
              e = b.hoverPoint,
              c = b.plotLeft,
              d = b.plotTop;a = this.normalize(a);b.cancelClick || (e && this.inClass(a.target, "highcharts-tracker") ? (t(e.series, "click", r(a, { point: e })), b.hoverPoint && e.firePointEvent("click", a)) : (r(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - c, a.chartY - d) && t(b, "click", a)));
        }, setDOMEvents: function setDOMEvents() {
          var b = this,
              e = b.chart.container,
              d = e.ownerDocument;e.onmousedown = function (a) {
            b.onContainerMouseDown(a);
          };e.onmousemove = function (a) {
            b.onContainerMouseMove(a);
          };e.onclick = function (a) {
            b.onContainerClick(a);
          };C(e, "mouseleave", b.onContainerMouseLeave);1 === a.chartCount && C(d, "mouseup", b.onDocumentMouseUp);
          a.hasTouch && (e.ontouchstart = function (a) {
            b.onContainerTouchStart(a);
          }, e.ontouchmove = function (a) {
            b.onContainerTouchMove(a);
          }, 1 === a.chartCount && C(d, "touchend", b.onDocumentTouchEnd));
        }, destroy: function destroy() {
          var e = this,
              d = this.chart.container.ownerDocument;e.unDocMouseMove && e.unDocMouseMove();b(e.chart.container, "mouseleave", e.onContainerMouseLeave);a.chartCount || (b(d, "mouseup", e.onDocumentMouseUp), a.hasTouch && b(d, "touchend", e.onDocumentTouchEnd));clearInterval(e.tooltipTimeout);a.objectEach(e, function (a, b) {
            e[b] = null;
          });
        } };
    })(M);(function (a) {
      var C = a.charts,
          A = a.each,
          F = a.extend,
          E = a.map,
          m = a.noop,
          f = a.pick;F(a.Pointer.prototype, { pinchTranslate: function pinchTranslate(a, f, m, t, g, d) {
          this.zoomHor && this.pinchTranslateDirection(!0, a, f, m, t, g, d);this.zoomVert && this.pinchTranslateDirection(!1, a, f, m, t, g, d);
        }, pinchTranslateDirection: function pinchTranslateDirection(a, f, m, t, g, d, k, b) {
          var e = this.chart,
              v = a ? "x" : "y",
              l = a ? "X" : "Y",
              n = "chart" + l,
              r = a ? "width" : "height",
              u = e["plot" + (a ? "Left" : "Top")],
              c,
              G,
              q = b || 1,
              B = e.inverted,
              K = e.bounds[a ? "h" : "v"],
              p = 1 === f.length,
              z = f[0][n],
              I = m[0][n],
              L = !p && f[1][n],
              h = !p && m[1][n],
              w;m = function m() {
            !p && 20 < Math.abs(z - L) && (q = b || Math.abs(I - h) / Math.abs(z - L));G = (u - I) / q + z;c = e["plot" + (a ? "Width" : "Height")] / q;
          };m();f = G;f < K.min ? (f = K.min, w = !0) : f + c > K.max && (f = K.max - c, w = !0);w ? (I -= .8 * (I - k[v][0]), p || (h -= .8 * (h - k[v][1])), m()) : k[v] = [I, h];B || (d[v] = G - u, d[r] = c);d = B ? 1 / q : q;g[r] = c;g[v] = f;t[B ? a ? "scaleY" : "scaleX" : "scale" + l] = q;t["translate" + l] = d * u + (I - d * z);
        }, pinch: function pinch(a) {
          var l = this,
              u = l.chart,
              t = l.pinchDown,
              g = a.touches,
              d = g.length,
              k = l.lastValidTouch,
              b = l.hasZoom,
              e = l.selectionMarker,
              v = {},
              y = 1 === d && (l.inClass(a.target, "highcharts-tracker") && u.runTrackerClick || l.runChartClick),
              n = {};1 < d && (l.initiated = !0);b && l.initiated && !y && a.preventDefault();E(g, function (a) {
            return l.normalize(a);
          });"touchstart" === a.type ? (A(g, function (a, b) {
            t[b] = { chartX: a.chartX, chartY: a.chartY };
          }), k.x = [t[0].chartX, t[1] && t[1].chartX], k.y = [t[0].chartY, t[1] && t[1].chartY], A(u.axes, function (a) {
            if (a.zoomEnabled) {
              var b = u.bounds[a.horiz ? "h" : "v"],
                  e = a.minPixelPadding,
                  d = a.toPixels(f(a.options.min, a.dataMin)),
                  g = a.toPixels(f(a.options.max, a.dataMax)),
                  k = Math.max(d, g);b.min = Math.min(a.pos, Math.min(d, g) - e);b.max = Math.max(a.pos + a.len, k + e);
            }
          }), l.res = !0) : l.followTouchMove && 1 === d ? this.runPointActions(l.normalize(a)) : t.length && (e || (l.selectionMarker = e = F({ destroy: m, touch: !0 }, u.plotBox)), l.pinchTranslate(t, g, v, e, n, k), l.hasPinched = b, l.scaleGroups(v, n), l.res && (l.res = !1, this.reset(!1, 0)));
        }, touch: function touch(l, m) {
          var r = this.chart,
              t,
              g;if (r.index !== a.hoverChartIndex) this.onContainerMouseLeave({ relatedTarget: !0 });a.hoverChartIndex = r.index;1 === l.touches.length ? (l = this.normalize(l), (g = r.isInsidePlot(l.chartX - r.plotLeft, l.chartY - r.plotTop)) && !r.openMenu ? (m && this.runPointActions(l), "touchmove" === l.type && (m = this.pinchDown, t = m[0] ? 4 <= Math.sqrt(Math.pow(m[0].chartX - l.chartX, 2) + Math.pow(m[0].chartY - l.chartY, 2)) : !1), f(t, !0) && this.pinch(l)) : m && this.reset()) : 2 === l.touches.length && this.pinch(l);
        }, onContainerTouchStart: function onContainerTouchStart(a) {
          this.zoomOption(a);this.touch(a, !0);
        }, onContainerTouchMove: function onContainerTouchMove(a) {
          this.touch(a);
        }, onDocumentTouchEnd: function onDocumentTouchEnd(f) {
          C[a.hoverChartIndex] && C[a.hoverChartIndex].pointer.drop(f);
        } });
    })(M);(function (a) {
      var C = a.addEvent,
          A = a.charts,
          F = a.css,
          E = a.doc,
          m = a.extend,
          f = a.noop,
          l = a.Pointer,
          r = a.removeEvent,
          u = a.win,
          t = a.wrap;if (!a.hasTouch && (u.PointerEvent || u.MSPointerEvent)) {
        var g = {},
            d = !!u.PointerEvent,
            k = function k() {
          var b = [];b.item = function (a) {
            return this[a];
          };a.objectEach(g, function (a) {
            b.push({ pageX: a.pageX, pageY: a.pageY, target: a.target });
          });return b;
        },
            b = function b(_b, d, g, n) {
          "touch" !== _b.pointerType && _b.pointerType !== _b.MSPOINTER_TYPE_TOUCH || !A[a.hoverChartIndex] || (n(_b), n = A[a.hoverChartIndex].pointer, n[d]({ type: g, target: _b.currentTarget, preventDefault: f, touches: k() }));
        };m(l.prototype, { onContainerPointerDown: function onContainerPointerDown(a) {
            b(a, "onContainerTouchStart", "touchstart", function (a) {
              g[a.pointerId] = { pageX: a.pageX, pageY: a.pageY, target: a.currentTarget };
            });
          }, onContainerPointerMove: function onContainerPointerMove(a) {
            b(a, "onContainerTouchMove", "touchmove", function (a) {
              g[a.pointerId] = { pageX: a.pageX, pageY: a.pageY };g[a.pointerId].target || (g[a.pointerId].target = a.currentTarget);
            });
          }, onDocumentPointerUp: function onDocumentPointerUp(a) {
            b(a, "onDocumentTouchEnd", "touchend", function (a) {
              delete g[a.pointerId];
            });
          }, batchMSEvents: function batchMSEvents(a) {
            a(this.chart.container, d ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);a(this.chart.container, d ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);a(E, d ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp);
          } });t(l.prototype, "init", function (a, b, d) {
          a.call(this, b, d);this.hasZoom && F(b.container, { "-ms-touch-action": "none", "touch-action": "none" });
        });t(l.prototype, "setDOMEvents", function (a) {
          a.apply(this);
          (this.hasZoom || this.followTouchMove) && this.batchMSEvents(C);
        });t(l.prototype, "destroy", function (a) {
          this.batchMSEvents(r);a.call(this);
        });
      }
    })(M);(function (a) {
      var C = a.addEvent,
          A = a.css,
          F = a.discardElement,
          E = a.defined,
          m = a.each,
          f = a.isFirefox,
          l = a.marginNames,
          r = a.merge,
          u = a.pick,
          t = a.setAnimation,
          g = a.stableSort,
          d = a.win,
          k = a.wrap;a.Legend = function (a, e) {
        this.init(a, e);
      };a.Legend.prototype = { init: function init(a, e) {
          this.chart = a;this.setOptions(e);e.enabled && (this.render(), C(this.chart, "endResize", function () {
            this.legend.positionCheckboxes();
          }));
        },
        setOptions: function setOptions(a) {
          var b = u(a.padding, 8);this.options = a;this.itemStyle = a.itemStyle;this.itemHiddenStyle = r(this.itemStyle, a.itemHiddenStyle);this.itemMarginTop = a.itemMarginTop || 0;this.padding = b;this.initialItemY = b - 5;this.itemHeight = this.maxItemWidth = 0;this.symbolWidth = u(a.symbolWidth, 16);this.pages = [];
        }, update: function update(a, e) {
          var b = this.chart;this.setOptions(r(!0, this.options, a));this.destroy();b.isDirtyLegend = b.isDirtyBox = !0;u(e, !0) && b.redraw();
        }, colorizeItem: function colorizeItem(a, e) {
          a.legendGroup[e ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");var b = this.options,
              d = a.legendItem,
              g = a.legendLine,
              f = a.legendSymbol,
              k = this.itemHiddenStyle.color,
              b = e ? b.itemStyle.color : k,
              c = e ? a.color || k : k,
              l = a.options && a.options.marker,
              q = { fill: c };d && d.css({ fill: b, color: b });g && g.attr({ stroke: c });f && (l && f.isMarker && (q = a.pointAttribs(), e || (q.stroke = q.fill = k)), f.attr(q));
        }, positionItem: function positionItem(a) {
          var b = this.options,
              d = b.symbolPadding,
              b = !b.rtl,
              g = a._legendItemPos,
              f = g[0],
              g = g[1],
              k = a.checkbox;(a = a.legendGroup) && a.element && a.translate(b ? f : this.legendWidth - f - 2 * d - 4, g);k && (k.x = f, k.y = g);
        }, destroyItem: function destroyItem(a) {
          var b = a.checkbox;m(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
            a[b] && (a[b] = a[b].destroy());
          });b && F(a.checkbox);
        }, destroy: function destroy() {
          function a(a) {
            this[a] && (this[a] = this[a].destroy());
          }m(this.getAllItems(), function (b) {
            m(["legendItem", "legendGroup"], a, b);
          });m("clipRect up down pager nav box title group".split(" "), a, this);this.display = null;
        }, positionCheckboxes: function positionCheckboxes(a) {
          var b = this.group && this.group.alignAttr,
              d,
              g = this.clipHeight || this.legendHeight,
              f = this.titleHeight;b && (d = b.translateY, m(this.allItems, function (e) {
            var k = e.checkbox,
                c;k && (c = d + f + k.y + (a || 0) + 3, A(k, { left: b.translateX + e.checkboxOffset + k.x - 20 + "px", top: c + "px", display: c > d - 6 && c < d + g - 6 ? "" : "none" }));
          }));
        }, renderTitle: function renderTitle() {
          var a = this.options,
              e = this.padding,
              d = a.title,
              g = 0;d.text && (this.title || (this.title = this.chart.renderer.label(d.text, e - 3, e - 4, null, null, null, a.useHTML, null, "legend-title").attr({ zIndex: 1 }).css(d.style).add(this.group)), a = this.title.getBBox(), g = a.height, this.offsetWidth = a.width, this.contentGroup.attr({ translateY: g }));this.titleHeight = g;
        }, setText: function setText(b) {
          var e = this.options;b.legendItem.attr({ text: e.labelFormat ? a.format(e.labelFormat, b) : e.labelFormatter.call(b) });
        }, renderItem: function renderItem(a) {
          var b = this.chart,
              d = b.renderer,
              g = this.options,
              f = "horizontal" === g.layout,
              k = this.symbolWidth,
              l = g.symbolPadding,
              c = this.itemStyle,
              m = this.itemHiddenStyle,
              q = this.padding,
              B = f ? u(g.itemDistance, 20) : 0,
              t = !g.rtl,
              p = g.width,
              z = g.itemMarginBottom || 0,
              I = this.itemMarginTop,
              L = a.legendItem,
              h = !a.series,
              w = !h && a.series.drawLegendSymbol ? a.series : a,
              P = w.options,
              H = this.createCheckboxForItem && P && P.showCheckbox,
              P = k + l + B + (H ? 20 : 0),
              O = g.useHTML,
              A = a.options.className;L || (a.legendGroup = d.g("legend-item").addClass("highcharts-" + w.type + "-series highcharts-color-" + a.colorIndex + (A ? " " + A : "") + (h ? " highcharts-series-" + a.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup), a.legendItem = L = d.text("", t ? k + l : -l, this.baseline || 0, O).css(r(a.visible ? c : m)).attr({ align: t ? "left" : "right", zIndex: 2 }).add(a.legendGroup), this.baseline || (k = c.fontSize, this.fontMetrics = d.fontMetrics(k, L), this.baseline = this.fontMetrics.f + 3 + I, L.attr("y", this.baseline)), this.symbolHeight = g.symbolHeight || this.fontMetrics.f, w.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, L, O), H && this.createCheckboxForItem(a));this.colorizeItem(a, a.visible);c.width || L.css({ width: (g.itemWidth || g.width || b.spacingBox.width) - P });this.setText(a);d = L.getBBox();c = a.checkboxOffset = g.itemWidth || a.legendItemWidth || d.width + P;this.itemHeight = d = Math.round(a.legendItemHeight || d.height || this.symbolHeight);f && this.itemX - q + c > (p || b.spacingBox.width - 2 * q - g.x) && (this.itemX = q, this.itemY += I + this.lastLineHeight + z, this.lastLineHeight = 0);this.maxItemWidth = Math.max(this.maxItemWidth, c);this.lastItemY = I + this.itemY + z;this.lastLineHeight = Math.max(d, this.lastLineHeight);a._legendItemPos = [this.itemX, this.itemY];f ? this.itemX += c : (this.itemY += I + d + z, this.lastLineHeight = d);this.offsetWidth = p || Math.max((f ? this.itemX - q - (a.checkbox ? 0 : B) : c) + q, this.offsetWidth);
        }, getAllItems: function getAllItems() {
          var a = [];m(this.chart.series, function (b) {
            var e = b && b.options;b && u(e.showInLegend, E(e.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === e.legendType ? b.data : b)));
          });return a;
        }, adjustMargins: function adjustMargins(a, e) {
          var b = this.chart,
              d = this.options,
              g = d.align.charAt(0) + d.verticalAlign.charAt(0) + d.layout.charAt(0);d.floating || m([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (f, k) {
            f.test(g) && !E(a[k]) && (b[l[k]] = Math.max(b[l[k]], b.legend[(k + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][k] * d[k % 2 ? "x" : "y"] + u(d.margin, 12) + e[k]));
          });
        }, render: function render() {
          var a = this,
              e = a.chart,
              d = e.renderer,
              f = a.group,
              k,
              l,
              t,
              c,
              u = a.box,
              q = a.options,
              B = a.padding;a.itemX = B;a.itemY = a.initialItemY;a.offsetWidth = 0;a.lastItemY = 0;f || (a.group = f = d.g("legend").attr({ zIndex: 7 }).add(), a.contentGroup = d.g().attr({ zIndex: 1 }).add(f), a.scrollGroup = d.g().add(a.contentGroup));a.renderTitle();k = a.getAllItems();g(k, function (a, b) {
            return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0);
          });q.reversed && k.reverse();a.allItems = k;a.display = l = !!k.length;a.lastLineHeight = 0;m(k, function (b) {
            a.renderItem(b);
          });t = (q.width || a.offsetWidth) + B;c = a.lastItemY + a.lastLineHeight + a.titleHeight;c = a.handleOverflow(c);c += B;u || (a.box = u = d.rect().addClass("highcharts-legend-box").attr({ r: q.borderRadius }).add(f), u.isNew = !0);u.attr({ stroke: q.borderColor, "stroke-width": q.borderWidth || 0, fill: q.backgroundColor || "none" }).shadow(q.shadow);0 < t && 0 < c && (u[u.isNew ? "attr" : "animate"](u.crisp({ x: 0, y: 0, width: t, height: c }, u.strokeWidth())), u.isNew = !1);u[l ? "show" : "hide"]();a.legendWidth = t;a.legendHeight = c;m(k, function (b) {
            a.positionItem(b);
          });l && f.align(r(q, { width: t, height: c }), !0, "spacingBox");e.isResizing || this.positionCheckboxes();
        }, handleOverflow: function handleOverflow(a) {
          var b = this,
              d = this.chart,
              g = d.renderer,
              f = this.options,
              k = f.y,
              l = this.padding,
              d = d.spacingBox.height + ("top" === f.verticalAlign ? -k : k) - l,
              k = f.maxHeight,
              c,
              r = this.clipRect,
              q = f.navigation,
              B = u(q.animation, !0),
              t = q.arrowSize || 12,
              p = this.nav,
              z = this.pages,
              I,
              L = this.allItems,
              h = function h(a) {
            "number" === typeof a ? r.attr({ height: a }) : r && (b.clipRect = r.destroy(), b.contentGroup.clip());b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + l + "px,9999px," + (l + a) + "px,0)" : "auto");
          };"horizontal" !== f.layout || "middle" === f.verticalAlign || f.floating || (d /= 2);k && (d = Math.min(d, k));z.length = 0;a > d && !1 !== q.enabled ? (this.clipHeight = c = Math.max(d - 20 - this.titleHeight - l, 0), this.currentPage = u(this.currentPage, 1), this.fullHeight = a, m(L, function (a, b) {
            var e = a._legendItemPos[1];a = Math.round(a.legendItem.getBBox().height);var d = z.length;if (!d || e - z[d - 1] > c && (I || e) !== z[d - 1]) z.push(I || e), d++;b === L.length - 1 && e + a - z[d - 1] > c && z.push(e);e !== I && (I = e);
          }), r || (r = b.clipRect = g.clipRect(0, l, 9999, 0), b.contentGroup.clip(r)), h(c), p || (this.nav = p = g.g().attr({ zIndex: 1 }).add(this.group), this.up = g.symbol("triangle", 0, 0, t, t).on("click", function () {
            b.scroll(-1, B);
          }).add(p), this.pager = g.text("", 15, 10).addClass("highcharts-legend-navigation").css(q.style).add(p), this.down = g.symbol("triangle-down", 0, 0, t, t).on("click", function () {
            b.scroll(1, B);
          }).add(p)), b.scroll(0), a = d) : p && (h(), this.nav = p.destroy(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0);return a;
        }, scroll: function scroll(a, e) {
          var b = this.pages,
              d = b.length;a = this.currentPage + a;var g = this.clipHeight,
              f = this.options.navigation,
              k = this.pager,
              c = this.padding;a > d && (a = d);0 < a && (void 0 !== e && t(e, this.chart), this.nav.attr({ translateX: c, translateY: g + this.padding + 7 + this.titleHeight, visibility: "visible" }), this.up.attr({ "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }), k.attr({ text: a + "/" + d }), this.down.attr({ x: 18 + this.pager.getBBox().width, "class": a === d ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }), this.up.attr({ fill: 1 === a ? f.inactiveColor : f.activeColor }).css({ cursor: 1 === a ? "default" : "pointer" }), this.down.attr({ fill: a === d ? f.inactiveColor : f.activeColor }).css({ cursor: a === d ? "default" : "pointer" }), e = -b[a - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: e }), this.currentPage = a, this.positionCheckboxes(e));
        } };a.LegendSymbolMixin = { drawRectangle: function drawRectangle(a, e) {
          var b = a.symbolHeight,
              d = a.options.squareSymbol;e.legendSymbol = this.chart.renderer.rect(d ? (a.symbolWidth - b) / 2 : 0, a.baseline - b + 1, d ? b : a.symbolWidth, b, u(a.options.symbolRadius, b / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(e.legendGroup);
        }, drawLineMarker: function drawLineMarker(a) {
          var b = this.options,
              d = b.marker,
              g = a.symbolWidth,
              f = a.symbolHeight,
              k = f / 2,
              l = this.chart.renderer,
              c = this.legendGroup;a = a.baseline - Math.round(.3 * a.fontMetrics.b);var m;m = { "stroke-width": b.lineWidth || 0 };b.dashStyle && (m.dashstyle = b.dashStyle);this.legendLine = l.path(["M", 0, a, "L", g, a]).addClass("highcharts-graph").attr(m).add(c);d && !1 !== d.enabled && (b = Math.min(u(d.radius, k), k), 0 === this.symbol.indexOf("url") && (d = r(d, { width: f, height: f }), b = 0), this.legendSymbol = d = l.symbol(this.symbol, g / 2 - b, a - b, 2 * b, 2 * b, d).addClass("highcharts-point").add(c), d.isMarker = !0);
        } };(/Trident\/7\.0/.test(d.navigator.userAgent) || f) && k(a.Legend.prototype, "positionItem", function (a, e) {
        var b = this,
            d = function d() {
          e._legendItemPos && a.call(b, e);
        };d();setTimeout(d);
      });
    })(M);(function (a) {
      var C = a.addEvent,
          A = a.animate,
          F = a.animObject,
          E = a.attr,
          m = a.doc,
          f = a.Axis,
          l = a.createElement,
          r = a.defaultOptions,
          u = a.discardElement,
          t = a.charts,
          g = a.css,
          d = a.defined,
          k = a.each,
          b = a.extend,
          e = a.find,
          v = a.fireEvent,
          y = a.getStyle,
          n = a.grep,
          D = a.isNumber,
          J = a.isObject,
          c = a.isString,
          G = a.Legend,
          q = a.marginNames,
          B = a.merge,
          K = a.objectEach,
          p = a.Pointer,
          z = a.pick,
          I = a.pInt,
          L = a.removeEvent,
          h = a.seriesTypes,
          w = a.splat,
          P = a.svg,
          H = a.syncTimeout,
          O = a.win,
          Q = a.Renderer,
          R = a.Chart = function () {
        this.getArgs.apply(this, arguments);
      };a.chart = function (a, b, c) {
        return new R(a, b, c);
      };b(R.prototype, { callbacks: [], getArgs: function getArgs() {
          var a = [].slice.call(arguments);
          if (c(a[0]) || a[0].nodeName) this.renderTo = a.shift();this.init(a[0], a[1]);
        }, init: function init(b, c) {
          var e,
              d,
              h = b.series,
              p = b.plotOptions || {};b.series = null;e = B(r, b);for (d in e.plotOptions) {
            e.plotOptions[d].tooltip = p[d] && B(p[d].tooltip) || void 0;
          }e.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;e.series = b.series = h;this.userOptions = b;b = e.chart;d = b.events;this.margin = [];this.spacing = [];this.bounds = { h: {}, v: {} };this.callback = c;this.isResizing = 0;this.options = e;this.axes = [];this.series = [];this.hasCartesianSeries = b.showAxes;var g = this;g.index = t.length;t.push(g);a.chartCount++;d && K(d, function (a, b) {
            C(g, b, a);
          });g.xAxis = [];g.yAxis = [];g.pointCount = g.colorCounter = g.symbolCounter = 0;g.firstRender();
        }, initSeries: function initSeries(b) {
          var c = this.options.chart;(c = h[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0);c = new c();c.init(this, b);return c;
        }, orderSeries: function orderSeries(a) {
          var b = this.series;for (a = a || 0; a < b.length; a++) {
            b[a] && (b[a].index = a, b[a].name = b[a].name || "Series " + (b[a].index + 1));
          }
        }, isInsidePlot: function isInsidePlot(a, b, c) {
          var e = c ? b : a;a = c ? a : b;return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight;
        }, redraw: function redraw(c) {
          var e = this.axes,
              d = this.series,
              h = this.pointer,
              p = this.legend,
              g = this.isDirtyLegend,
              f,
              q,
              l = this.hasCartesianSeries,
              n = this.isDirtyBox,
              z,
              m = this.renderer,
              x = m.isHidden(),
              w = [];this.setResponsive && this.setResponsive(!1);a.setAnimation(c, this);x && this.temporaryDisplay();this.layOutTitles();for (c = d.length; c--;) {
            if (z = d[c], z.options.stacking && (f = !0, z.isDirty)) {
              q = !0;break;
            }
          }if (q) for (c = d.length; c--;) {
            z = d[c], z.options.stacking && (z.isDirty = !0);
          }k(d, function (a) {
            a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), g = !0);a.isDirtyData && v(a, "updatedData");
          });g && p.options.enabled && (p.render(), this.isDirtyLegend = !1);f && this.getStacks();l && k(e, function (a) {
            a.updateNames();a.setScale();
          });this.getMargins();l && (k(e, function (a) {
            a.isDirty && (n = !0);
          }), k(e, function (a) {
            var c = a.min + "," + a.max;a.extKey !== c && (a.extKey = c, w.push(function () {
              v(a, "afterSetExtremes", b(a.eventArgs, a.getExtremes()));delete a.eventArgs;
            }));(n || f) && a.redraw();
          }));n && this.drawChartBox();v(this, "predraw");k(d, function (a) {
            (n || a.isDirty) && a.visible && a.redraw();a.isDirtyData = !1;
          });h && h.reset(!0);m.draw();v(this, "redraw");v(this, "render");x && this.temporaryDisplay(!0);k(w, function (a) {
            a.call();
          });
        }, get: function get(a) {
          function b(b) {
            return b.id === a || b.options && b.options.id === a;
          }var c,
              d = this.series,
              h;c = e(this.axes, b) || e(this.series, b);for (h = 0; !c && h < d.length; h++) {
            c = e(d[h].points || [], b);
          }return c;
        }, getAxes: function getAxes() {
          var a = this,
              b = this.options,
              c = b.xAxis = w(b.xAxis || {}),
              b = b.yAxis = w(b.yAxis || {});k(c, function (a, b) {
            a.index = b;a.isX = !0;
          });k(b, function (a, b) {
            a.index = b;
          });c = c.concat(b);k(c, function (b) {
            new f(a, b);
          });
        }, getSelectedPoints: function getSelectedPoints() {
          var a = [];k(this.series, function (b) {
            a = a.concat(n(b.data || [], function (a) {
              return a.selected;
            }));
          });return a;
        }, getSelectedSeries: function getSelectedSeries() {
          return n(this.series, function (a) {
            return a.selected;
          });
        }, setTitle: function setTitle(a, b, c) {
          var e = this,
              d = e.options,
              h;h = d.title = B({ style: { color: "#333333", fontSize: d.isStock ? "16px" : "18px" } }, d.title, a);d = d.subtitle = B({ style: { color: "#666666" } }, d.subtitle, b);k([["title", a, h], ["subtitle", b, d]], function (a, b) {
            var c = a[0],
                d = e[c],
                h = a[1];a = a[2];d && h && (e[c] = d = d.destroy());a && a.text && !d && (e[c] = e.renderer.text(a.text, 0, 0, a.useHTML).attr({ align: a.align, "class": "highcharts-" + c, zIndex: a.zIndex || 4 }).add(), e[c].update = function (a) {
              e.setTitle(!b && a, b && a);
            }, e[c].css(a.style));
          });e.layOutTitles(c);
        }, layOutTitles: function layOutTitles(a) {
          var c = 0,
              e,
              d = this.renderer,
              h = this.spacingBox;k(["title", "subtitle"], function (a) {
            var e = this[a],
                p = this.options[a];
            a = "title" === a ? -3 : p.verticalAlign ? 0 : c + 2;var g;e && (g = p.style.fontSize, g = d.fontMetrics(g, e).b, e.css({ width: (p.width || h.width + p.widthAdjust) + "px" }).align(b({ y: a + g }, p), !1, "spacingBox"), p.floating || p.verticalAlign || (c = Math.ceil(c + e.getBBox(p.useHTML).height)));
          }, this);e = this.titleOffset !== c;this.titleOffset = c;!this.isDirtyBox && e && (this.isDirtyBox = e, this.hasRendered && z(a, !0) && this.isDirtyBox && this.redraw());
        }, getChartSize: function getChartSize() {
          var b = this.options.chart,
              c = b.width,
              b = b.height,
              e = this.renderTo;d(c) || (this.containerWidth = y(e, "width"));d(b) || (this.containerHeight = y(e, "height"));this.chartWidth = Math.max(0, c || this.containerWidth || 600);this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || this.containerHeight || 400);
        }, temporaryDisplay: function temporaryDisplay(b) {
          var c = this.renderTo;if (b) for (; c && c.style;) {
            c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (m.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode;
          } else for (; c && c.style;) {
            m.body.contains(c) || (c.hcOrigDetached = !0, m.body.appendChild(c));
            if ("none" === y(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = { display: c.style.display, height: c.style.height, overflow: c.style.overflow }, b = { display: "block", overflow: "hidden" }, c !== this.renderTo && (b.height = 0), a.css(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important");c = c.parentNode;if (c === m.body) break;
          }
        }, setClassName: function setClassName(a) {
          this.container.className = "highcharts-container " + (a || "");
        }, getContainer: function getContainer() {
          var e,
              d = this.options,
              h = d.chart,
              p,
              g;e = this.renderTo;var f = a.uniqueKey(),
              k;e || (this.renderTo = e = h.renderTo);c(e) && (this.renderTo = e = m.getElementById(e));e || a.error(13, !0);p = I(E(e, "data-highcharts-chart"));D(p) && t[p] && t[p].hasRendered && t[p].destroy();E(e, "data-highcharts-chart", this.index);e.innerHTML = "";h.skipClone || e.offsetWidth || this.temporaryDisplay();this.getChartSize();p = this.chartWidth;g = this.chartHeight;k = b({ position: "relative", overflow: "hidden", width: p + "px", height: g + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)" }, h.style);
          this.container = e = l("div", { id: f }, k, e);this._cursor = e.style.cursor;this.renderer = new (a[h.renderer] || Q)(e, p, g, null, h.forExport, d.exporting && d.exporting.allowHTML);this.setClassName(h.className);this.renderer.setStyle(h.style);this.renderer.chartIndex = this.index;
        }, getMargins: function getMargins(a) {
          var b = this.spacing,
              c = this.margin,
              e = this.titleOffset;this.resetMargins();e && !d(c[0]) && (this.plotTop = Math.max(this.plotTop, e + this.options.title.margin + b[0]));this.legend.display && this.legend.adjustMargins(c, b);this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value);this.extraTopMargin && (this.plotTop += this.extraTopMargin);a || this.getAxisMargins();
        }, getAxisMargins: function getAxisMargins() {
          var a = this,
              b = a.axisOffset = [0, 0, 0, 0],
              c = a.margin;a.hasCartesianSeries && k(a.axes, function (a) {
            a.visible && a.getOffset();
          });k(q, function (e, h) {
            d(c[h]) || (a[e] += b[h]);
          });a.setChartSize();
        }, reflow: function reflow(a) {
          var b = this,
              c = b.options.chart,
              e = b.renderTo,
              h = d(c.width) && d(c.height),
              p = c.width || y(e, "width"),
              c = c.height || y(e, "height"),
              e = a ? a.target : O;if (!h && !b.isPrinting && p && c && (e === O || e === m)) {
            if (p !== b.containerWidth || c !== b.containerHeight) clearTimeout(b.reflowTimeout), b.reflowTimeout = H(function () {
              b.container && b.setSize(void 0, void 0, !1);
            }, a ? 100 : 0);b.containerWidth = p;b.containerHeight = c;
          }
        }, initReflow: function initReflow() {
          var a = this,
              b;b = C(O, "resize", function (b) {
            a.reflow(b);
          });C(a, "destroy", b);
        }, setSize: function setSize(b, c, e) {
          var d = this,
              h = d.renderer;d.isResizing += 1;a.setAnimation(e, d);d.oldChartHeight = d.chartHeight;d.oldChartWidth = d.chartWidth;void 0 !== b && (d.options.chart.width = b);void 0 !== c && (d.options.chart.height = c);d.getChartSize();b = h.globalAnimation;(b ? A : g)(d.container, { width: d.chartWidth + "px", height: d.chartHeight + "px" }, b);d.setChartSize(!0);h.setSize(d.chartWidth, d.chartHeight, e);k(d.axes, function (a) {
            a.isDirty = !0;a.setScale();
          });d.isDirtyLegend = !0;d.isDirtyBox = !0;d.layOutTitles();d.getMargins();d.redraw(e);d.oldChartHeight = null;v(d, "resize");H(function () {
            d && v(d, "endResize", null, function () {
              --d.isResizing;
            });
          }, F(b).duration);
        }, setChartSize: function setChartSize(a) {
          function b(a) {
            a = f[a] || 0;return Math.max(m || a, a) / 2;
          }var c = this.inverted,
              e = this.renderer,
              d = this.chartWidth,
              h = this.chartHeight,
              p = this.options.chart,
              g = this.spacing,
              f = this.clipOffset,
              q,
              n,
              l,
              z,
              m;this.plotLeft = q = Math.round(this.plotLeft);this.plotTop = n = Math.round(this.plotTop);this.plotWidth = l = Math.max(0, Math.round(d - q - this.marginRight));this.plotHeight = z = Math.max(0, Math.round(h - n - this.marginBottom));this.plotSizeX = c ? z : l;this.plotSizeY = c ? l : z;this.plotBorderWidth = p.plotBorderWidth || 0;this.spacingBox = e.spacingBox = { x: g[3], y: g[0],
            width: d - g[3] - g[1], height: h - g[0] - g[2] };this.plotBox = e.plotBox = { x: q, y: n, width: l, height: z };m = 2 * Math.floor(this.plotBorderWidth / 2);c = Math.ceil(b(3));e = Math.ceil(b(0));this.clipBox = { x: c, y: e, width: Math.floor(this.plotSizeX - b(1) - c), height: Math.max(0, Math.floor(this.plotSizeY - b(2) - e)) };a || k(this.axes, function (a) {
            a.setAxisSize();a.setAxisTranslation();
          });
        }, resetMargins: function resetMargins() {
          var a = this,
              b = a.options.chart;k(["margin", "spacing"], function (c) {
            var e = b[c],
                d = J(e) ? e : [e, e, e, e];k(["Top", "Right", "Bottom", "Left"], function (e, h) {
              a[c][h] = z(b[c + e], d[h]);
            });
          });k(q, function (b, c) {
            a[b] = z(a.margin[c], a.spacing[c]);
          });a.axisOffset = [0, 0, 0, 0];a.clipOffset = [];
        }, drawChartBox: function drawChartBox() {
          var a = this.options.chart,
              b = this.renderer,
              c = this.chartWidth,
              e = this.chartHeight,
              d = this.chartBackground,
              h = this.plotBackground,
              p = this.plotBorder,
              g,
              f = this.plotBGImage,
              k = a.backgroundColor,
              q = a.plotBackgroundColor,
              l = a.plotBackgroundImage,
              n,
              z = this.plotLeft,
              m = this.plotTop,
              w = this.plotWidth,
              I = this.plotHeight,
              v = this.plotBox,
              r = this.clipRect,
              B = this.clipBox,
              y = "animate";
          d || (this.chartBackground = d = b.rect().addClass("highcharts-background").add(), y = "attr");g = a.borderWidth || 0;n = g + (a.shadow ? 8 : 0);k = { fill: k || "none" };if (g || d["stroke-width"]) k.stroke = a.borderColor, k["stroke-width"] = g;d.attr(k).shadow(a.shadow);d[y]({ x: n / 2, y: n / 2, width: c - n - g % 2, height: e - n - g % 2, r: a.borderRadius });y = "animate";h || (y = "attr", this.plotBackground = h = b.rect().addClass("highcharts-plot-background").add());h[y](v);h.attr({ fill: q || "none" }).shadow(a.plotShadow);l && (f ? f.animate(v) : this.plotBGImage = b.image(l, z, m, w, I).add());r ? r.animate({ width: B.width, height: B.height }) : this.clipRect = b.clipRect(B);y = "animate";p || (y = "attr", this.plotBorder = p = b.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add());p.attr({ stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none" });p[y](p.crisp({ x: z, y: m, width: w, height: I }, -p.strokeWidth()));this.isDirtyBox = !1;
        }, propFromSeries: function propFromSeries() {
          var a = this,
              b = a.options.chart,
              c,
              e = a.options.series,
              d,
              p;k(["inverted", "angular", "polar"], function (g) {
            c = h[b.type || b.defaultSeriesType];
            p = b[g] || c && c.prototype[g];for (d = e && e.length; !p && d--;) {
              (c = h[e[d].type]) && c.prototype[g] && (p = !0);
            }a[g] = p;
          });
        }, linkSeries: function linkSeries() {
          var a = this,
              b = a.series;k(b, function (a) {
            a.linkedSeries.length = 0;
          });k(b, function (b) {
            var e = b.options.linkedTo;c(e) && (e = ":previous" === e ? a.series[b.index - 1] : a.get(e)) && e.linkedParent !== b && (e.linkedSeries.push(b), b.linkedParent = e, b.visible = z(b.options.visible, e.options.visible, b.visible));
          });
        }, renderSeries: function renderSeries() {
          k(this.series, function (a) {
            a.translate();a.render();
          });
        }, renderLabels: function renderLabels() {
          var a = this,
              c = a.options.labels;c.items && k(c.items, function (e) {
            var d = b(c.style, e.style),
                h = I(d.left) + a.plotLeft,
                p = I(d.top) + a.plotTop + 12;delete d.left;delete d.top;a.renderer.text(e.html, h, p).attr({ zIndex: 2 }).css(d).add();
          });
        }, render: function render() {
          var a = this.axes,
              b = this.renderer,
              c = this.options,
              e,
              d,
              h;this.setTitle();this.legend = new G(this, c.legend);this.getStacks && this.getStacks();this.getMargins(!0);this.setChartSize();c = this.plotWidth;e = this.plotHeight -= 21;k(a, function (a) {
            a.setScale();
          });this.getAxisMargins();d = 1.1 < c / this.plotWidth;h = 1.05 < e / this.plotHeight;if (d || h) k(a, function (a) {
            (a.horiz && d || !a.horiz && h) && a.setTickInterval(!0);
          }), this.getMargins();this.drawChartBox();this.hasCartesianSeries && k(a, function (a) {
            a.visible && a.render();
          });this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({ zIndex: 3 }).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive && this.setResponsive();this.hasRendered = !0;
        }, addCredits: function addCredits(a) {
          var b = this;a = B(!0, this.options.credits, a);a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
            a.href && (O.location.href = a.href);
          }).attr({ align: a.position.align, zIndex: 8 }).css(a.style).add().align(a.position), this.credits.update = function (a) {
            b.credits = b.credits.destroy();b.addCredits(a);
          });
        }, destroy: function destroy() {
          var b = this,
              c = b.axes,
              e = b.series,
              d = b.container,
              h,
              p = d && d.parentNode;v(b, "destroy");b.renderer.forExport ? a.erase(t, b) : t[b.index] = void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");
          L(b);for (h = c.length; h--;) {
            c[h] = c[h].destroy();
          }this.scroller && this.scroller.destroy && this.scroller.destroy();for (h = e.length; h--;) {
            e[h] = e[h].destroy();
          }k("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (a) {
            var c = b[a];c && c.destroy && (b[a] = c.destroy());
          });d && (d.innerHTML = "", L(d), p && u(d));K(b, function (a, c) {
            delete b[c];
          });
        }, isReadyToRender: function isReadyToRender() {
          var a = this;return P || O != O.top || "complete" === m.readyState ? !0 : (m.attachEvent("onreadystatechange", function () {
            m.detachEvent("onreadystatechange", a.firstRender);"complete" === m.readyState && a.firstRender();
          }), !1);
        }, firstRender: function firstRender() {
          var a = this,
              b = a.options;if (a.isReadyToRender()) {
            a.getContainer();v(a, "init");a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();k(b.series || [], function (b) {
              a.initSeries(b);
            });a.linkSeries();v(a, "beforeRender");p && (a.pointer = new p(a, b));a.render();if (!a.renderer.imgCount && a.onload) a.onload();
            a.temporaryDisplay(!0);
          }
        }, onload: function onload() {
          k([this.callback].concat(this.callbacks), function (a) {
            a && void 0 !== this.index && a.apply(this, [this]);
          }, this);v(this, "load");v(this, "render");d(this.index) && !1 !== this.options.chart.reflow && this.initReflow();this.onload = null;
        } });
    })(M);(function (a) {
      var C,
          A = a.each,
          F = a.extend,
          E = a.erase,
          m = a.fireEvent,
          f = a.format,
          l = a.isArray,
          r = a.isNumber,
          u = a.pick,
          t = a.removeEvent;a.Point = C = function C() {};a.Point.prototype = { init: function init(a, d, f) {
          this.series = a;this.color = a.color;this.applyOptions(d, f);a.options.colorByPoint ? (d = a.options.colors || a.chart.options.colors, this.color = this.color || d[a.colorCounter], d = d.length, f = a.colorCounter, a.colorCounter++, a.colorCounter === d && (a.colorCounter = 0)) : f = a.colorIndex;this.colorIndex = u(this.colorIndex, f);a.chart.pointCount++;return this;
        }, applyOptions: function applyOptions(a, d) {
          var g = this.series,
              b = g.options.pointValKey || g.pointValKey;a = C.prototype.optionsToObject.call(this, a);F(this, a);this.options = this.options ? F(this.options, a) : a;a.group && delete this.group;b && (this.y = this[b]);this.isNull = u(this.isValid && !this.isValid(), null === this.x || !r(this.y, !0));this.selected && (this.state = "select");"name" in this && void 0 === d && g.xAxis && g.xAxis.hasNames && (this.x = g.xAxis.nameToX(this));void 0 === this.x && g && (this.x = void 0 === d ? g.autoIncrement(this) : d);return this;
        }, optionsToObject: function optionsToObject(a) {
          var d = {},
              g = this.series,
              b = g.options.keys,
              e = b || g.pointArrayMap || ["y"],
              f = e.length,
              m = 0,
              n = 0;if (r(a) || null === a) d[e[0]] = a;else if (l(a)) for (!b && a.length > f && (g = _typeof(a[0]), "string" === g ? d.name = a[0] : "number" === g && (d.x = a[0]), m++); n < f;) {
            b && void 0 === a[m] || (d[e[n]] = a[m]), m++, n++;
          } else "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && (d = a, a.dataLabels && (g._hasPointLabels = !0), a.marker && (g._hasPointMarkers = !0));return d;
        }, getClassName: function getClassName() {
          return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "");
        }, getZone: function getZone() {
          var a = this.series,
              d = a.zones,
              a = a.zoneAxis || "y",
              f = 0,
              b;for (b = d[f]; this[a] >= b.value;) {
            b = d[++f];
          }b && b.color && !this.options.color && (this.color = b.color);return b;
        }, destroy: function destroy() {
          var a = this.series.chart,
              d = a.hoverPoints,
              f;a.pointCount--;d && (this.setState(), E(d, this), d.length || (a.hoverPoints = null));if (this === a.hoverPoint) this.onMouseOut();if (this.graphic || this.dataLabel) t(this), this.destroyElements();this.legendItem && a.legend.destroyItem(this);
          for (f in this) {
            this[f] = null;
          }
        }, destroyElements: function destroyElements() {
          for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], d, f = 6; f--;) {
            d = a[f], this[d] && (this[d] = this[d].destroy());
          }
        }, getLabelConfig: function getLabelConfig() {
          return { x: this.category, y: this.y, color: this.color, colorIndex: this.colorIndex, key: this.name || this.category, series: this.series, point: this, percentage: this.percentage, total: this.total || this.stackTotal };
        }, tooltipFormatter: function tooltipFormatter(a) {
          var d = this.series,
              g = d.tooltipOptions,
              b = u(g.valueDecimals, ""),
              e = g.valuePrefix || "",
              l = g.valueSuffix || "";A(d.pointArrayMap || ["y"], function (d) {
            d = "{point." + d;if (e || l) a = a.replace(d + "}", e + d + "}" + l);a = a.replace(d + "}", d + ":,." + b + "f}");
          });return f(a, { point: this, series: this.series });
        }, firePointEvent: function firePointEvent(a, d, f) {
          var b = this,
              e = this.series.options;(e.point.events[a] || b.options && b.options.events && b.options.events[a]) && this.importEvents();"click" === a && e.allowPointSelect && (f = function f(a) {
            b.select && b.select(null, a.ctrlKey || a.metaKey || a.shiftKey);
          });m(this, a, d, f);
        }, visible: !0 };
    })(M);
    (function (a) {
      var C = a.addEvent,
          A = a.animObject,
          F = a.arrayMax,
          E = a.arrayMin,
          m = a.correctFloat,
          f = a.Date,
          l = a.defaultOptions,
          r = a.defaultPlotOptions,
          u = a.defined,
          t = a.each,
          g = a.erase,
          d = a.extend,
          k = a.fireEvent,
          b = a.grep,
          e = a.isArray,
          v = a.isNumber,
          y = a.isString,
          n = a.merge,
          D = a.objectEach,
          J = a.pick,
          c = a.removeEvent,
          G = a.splat,
          q = a.SVGElement,
          B = a.syncTimeout,
          K = a.win;a.Series = a.seriesType("line", null, { lineWidth: 2, allowPointSelect: !1, showCheckbox: !1, animation: { duration: 1E3 }, events: {}, marker: { lineWidth: 0, lineColor: "#ffffff", radius: 4,
          states: { hover: { animation: { duration: 50 }, enabled: !0, radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 } } }, point: { events: {} }, dataLabels: { align: "center", formatter: function formatter() {
            return null === this.y ? "" : a.numberFormat(this.y, -1);
          }, style: { fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom", x: 0, y: 0, padding: 5 }, cropThreshold: 300, pointRange: 0, softThreshold: !0, states: { hover: { animation: { duration: 50 }, lineWidthPlus: 1, marker: {},
            halo: { size: 10, opacity: .25 } }, select: { marker: {} } }, stickyTracking: !0, turboThreshold: 1E3, findNearestPointBy: "x" }, { isCartesian: !0, pointClass: a.Point, sorted: !0, requireSorting: !0, directTouch: !1, axisTypes: ["xAxis", "yAxis"], colorCounter: 0, parallelArrays: ["x", "y"], coll: "series", init: function init(a, b) {
          var c = this,
              e,
              h = a.series,
              p;c.chart = a;c.options = b = c.setOptions(b);c.linkedSeries = [];c.bindAxes();d(c, { name: b.name, state: "", visible: !1 !== b.visible, selected: !0 === b.selected });e = b.events;D(e, function (a, b) {
            C(c, b, a);
          });if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;c.getColor();c.getSymbol();t(c.parallelArrays, function (a) {
            c[a + "Data"] = [];
          });c.setData(b.data, !1);c.isCartesian && (a.hasCartesianSeries = !0);h.length && (p = h[h.length - 1]);c._i = J(p && p._i, -1) + 1;a.orderSeries(this.insert(h));
        }, insert: function insert(a) {
          var b = this.options.index,
              c;if (v(b)) {
            for (c = a.length; c--;) {
              if (b >= J(a[c].options.index, a[c]._i)) {
                a.splice(c + 1, 0, this);break;
              }
            }-1 === c && a.unshift(this);c += 1;
          } else a.push(this);return J(c, a.length - 1);
        }, bindAxes: function bindAxes() {
          var b = this,
              c = b.options,
              e = b.chart,
              d;t(b.axisTypes || [], function (h) {
            t(e[h], function (a) {
              d = a.options;if (c[h] === d.index || void 0 !== c[h] && c[h] === d.id || void 0 === c[h] && 0 === d.index) b.insert(a.series), b[h] = a, a.isDirty = !0;
            });b[h] || b.optionalAxis === h || a.error(18, !0);
          });
        }, updateParallelArrays: function updateParallelArrays(a, b) {
          var c = a.series,
              e = arguments,
              d = v(b) ? function (e) {
            var d = "y" === e && c.toYData ? c.toYData(a) : a[e];c[e + "Data"][b] = d;
          } : function (a) {
            Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(e, 2));
          };t(c.parallelArrays, d);
        }, autoIncrement: function autoIncrement() {
          var a = this.options,
              b = this.xIncrement,
              c,
              e = a.pointIntervalUnit,
              b = J(b, a.pointStart, 0);this.pointInterval = c = J(this.pointInterval, a.pointInterval, 1);e && (a = new f(b), "day" === e ? a = +a[f.hcSetDate](a[f.hcGetDate]() + c) : "month" === e ? a = +a[f.hcSetMonth](a[f.hcGetMonth]() + c) : "year" === e && (a = +a[f.hcSetFullYear](a[f.hcGetFullYear]() + c)), c = a - b);this.xIncrement = b + c;return b;
        }, setOptions: function setOptions(a) {
          var b = this.chart,
              c = b.options,
              e = c.plotOptions,
              d = (b.userOptions || {}).plotOptions || {},
              p = e[this.type];this.userOptions = a;b = n(p, e.series, a);this.tooltipOptions = n(l.tooltip, l.plotOptions.series && l.plotOptions.series.tooltip, l.plotOptions[this.type].tooltip, c.tooltip.userOptions, e.series && e.series.tooltip, e[this.type].tooltip, a.tooltip);this.stickyTracking = J(a.stickyTracking, d[this.type] && d[this.type].stickyTracking, d.series && d.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : b.stickyTracking);null === p.marker && delete b.marker;this.zoneAxis = b.zoneAxis;a = this.zones = (b.zones || []).slice();!b.negativeColor && !b.negativeFillColor || b.zones || a.push({ value: b[this.zoneAxis + "Threshold"] || b.threshold || 0, className: "highcharts-negative", color: b.negativeColor, fillColor: b.negativeFillColor });a.length && u(a[a.length - 1].value) && a.push({ color: this.color, fillColor: this.fillColor });return b;
        }, getCyclic: function getCyclic(a, b, c) {
          var e,
              d = this.chart,
              p = this.userOptions,
              f = a + "Index",
              g = a + "Counter",
              k = c ? c.length : J(d.options.chart[a + "Count"], d[a + "Count"]);b || (e = J(p[f], p["_" + f]), u(e) || (d.series.length || (d[g] = 0), p["_" + f] = e = d[g] % k, d[g] += 1), c && (b = c[e]));void 0 !== e && (this[f] = e);this[a] = b;
        }, getColor: function getColor() {
          this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || r[this.type].color, this.chart.options.colors);
        }, getSymbol: function getSymbol() {
          this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols);
        }, drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker, setData: function setData(b, c, d, f) {
          var h = this,
              p = h.points,
              g = p && p.length || 0,
              k,
              q = h.options,
              l = h.chart,
              n = null,
              m = h.xAxis,
              z = q.turboThreshold,
              r = this.xData,
              B = this.yData,
              I = (k = h.pointArrayMap) && k.length;b = b || [];k = b.length;c = J(c, !0);if (!1 !== f && k && g === k && !h.cropped && !h.hasGroupedData && h.visible) t(b, function (a, b) {
            p[b].update && a !== q.data[b] && p[b].update(a, !1, null, !1);
          });else {
            h.xIncrement = null;h.colorCounter = 0;t(this.parallelArrays, function (a) {
              h[a + "Data"].length = 0;
            });if (z && k > z) {
              for (d = 0; null === n && d < k;) {
                n = b[d], d++;
              }if (v(n)) for (d = 0; d < k; d++) {
                r[d] = this.autoIncrement(), B[d] = b[d];
              } else if (e(n)) {
                if (I) for (d = 0; d < k; d++) {
                  n = b[d], r[d] = n[0], B[d] = n.slice(1, I + 1);
                } else for (d = 0; d < k; d++) {
                  n = b[d], r[d] = n[0], B[d] = n[1];
                }
              } else a.error(12);
            } else for (d = 0; d < k; d++) {
              void 0 !== b[d] && (n = { series: h }, h.pointClass.prototype.applyOptions.apply(n, [b[d]]), h.updateParallelArrays(n, d));
            }y(B[0]) && a.error(14, !0);h.data = [];h.options.data = h.userOptions.data = b;for (d = g; d--;) {
              p[d] && p[d].destroy && p[d].destroy();
            }m && (m.minRange = m.userMinRange);h.isDirty = l.isDirtyBox = !0;h.isDirtyData = !!p;d = !1;
          }"point" === q.legendType && (this.processData(), this.generatePoints());c && l.redraw(d);
        }, processData: function processData(b) {
          var c = this.xData,
              e = this.yData,
              d = c.length,
              h;h = 0;var p,
              f,
              g = this.xAxis,
              k,
              q = this.options;k = q.cropThreshold;var n = this.getExtremesFromAll || q.getExtremesFromAll,
              l = this.isCartesian,
              q = g && g.val2lin,
              m = g && g.isLog,
              v,
              r;if (l && !this.isDirty && !g.isDirty && !this.yAxis.isDirty && !b) return !1;g && (b = g.getExtremes(), v = b.min, r = b.max);if (l && this.sorted && !n && (!k || d > k || this.forceCrop)) if (c[d - 1] < v || c[0] > r) c = [], e = [];else if (c[0] < v || c[d - 1] > r) h = this.cropData(this.xData, this.yData, v, r), c = h.xData, e = h.yData, h = h.start, p = !0;for (k = c.length || 1; --k;) {
            d = m ? q(c[k]) - q(c[k - 1]) : c[k] - c[k - 1], 0 < d && (void 0 === f || d < f) ? f = d : 0 > d && this.requireSorting && a.error(15);
          }this.cropped = p;this.cropStart = h;this.processedXData = c;this.processedYData = e;this.closestPointRange = f;
        }, cropData: function cropData(a, b, c, e) {
          var d = a.length,
              p = 0,
              g = d,
              f = J(this.cropShoulder, 1),
              k;for (k = 0; k < d; k++) {
            if (a[k] >= c) {
              p = Math.max(0, k - f);break;
            }
          }for (c = k; c < d; c++) {
            if (a[c] > e) {
              g = c + f;break;
            }
          }return { xData: a.slice(p, g), yData: b.slice(p, g), start: p, end: g };
        }, generatePoints: function generatePoints() {
          var a = this.options,
              b = a.data,
              c = this.data,
              e,
              d = this.processedXData,
              g = this.processedYData,
              f = this.pointClass,
              k = d.length,
              q = this.cropStart || 0,
              n,
              l = this.hasGroupedData,
              a = a.keys,
              m,
              v = [],
              r;c || l || (c = [], c.length = b.length, c = this.data = c);a && l && (this.options.keys = !1);for (r = 0; r < k; r++) {
            n = q + r, l ? (m = new f().init(this, [d[r]].concat(G(g[r]))), m.dataGroup = this.groupMap[r]) : (m = c[n]) || void 0 === b[n] || (c[n] = m = new f().init(this, b[n], d[r])), m && (m.index = n, v[r] = m);
          }this.options.keys = a;if (c && (k !== (e = c.length) || l)) for (r = 0; r < e; r++) {
            r !== q || l || (r += k), c[r] && (c[r].destroyElements(), c[r].plotX = void 0);
          }this.data = c;this.points = v;
        }, getExtremes: function getExtremes(a) {
          var b = this.yAxis,
              c = this.processedXData,
              d,
              h = [],
              p = 0;d = this.xAxis.getExtremes();var g = d.min,
              f = d.max,
              k,
              q,
              n,
              l;a = a || this.stackedYData || this.processedYData || [];d = a.length;for (l = 0; l < d; l++) {
            if (q = c[l], n = a[l], k = (v(n, !0) || e(n)) && (!b.positiveValuesOnly || n.length || 0 < n), q = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[l] || q) >= g && (c[l] || q) <= f, k && q) if (k = n.length) for (; k--;) {
              null !== n[k] && (h[p++] = n[k]);
            } else h[p++] = n;
          }this.dataMin = E(h);this.dataMax = F(h);
        }, translate: function translate() {
          this.processedXData || this.processData();this.generatePoints();var a = this.options,
              b = a.stacking,
              c = this.xAxis,
              e = c.categories,
              d = this.yAxis,
              g = this.points,
              f = g.length,
              k = !!this.modifyValue,
              q = a.pointPlacement,
              n = "between" === q || v(q),
              l = a.threshold,
              r = a.startFromThreshold ? l : 0,
              B,
              y,
              t,
              G,
              D = Number.MAX_VALUE;"between" === q && (q = .5);v(q) && (q *= J(a.pointRange || c.pointRange));for (a = 0; a < f; a++) {
            var K = g[a],
                A = K.x,
                C = K.y;y = K.low;var E = b && d.stacks[(this.negStacks && C < (r ? 0 : l) ? "-" : "") + this.stackKey],
                F;d.positiveValuesOnly && null !== C && 0 >= C && (K.isNull = !0);K.plotX = B = m(Math.min(Math.max(-1E5, c.translate(A, 0, 0, 0, 1, q, "flags" === this.type)), 1E5));b && this.visible && !K.isNull && E && E[A] && (G = this.getStackIndicator(G, A, this.index), F = E[A], C = F.points[G.key], y = C[0], C = C[1], y === r && G.key === E[A].base && (y = J(l, d.min)), d.positiveValuesOnly && 0 >= y && (y = null), K.total = K.stackTotal = F.total, K.percentage = F.total && K.y / F.total * 100, K.stackY = C, F.setOffset(this.pointXOffset || 0, this.barW || 0));K.yBottom = u(y) ? d.translate(y, 0, 1, 0, 1) : null;k && (C = this.modifyValue(C, K));K.plotY = y = "number" === typeof C && Infinity !== C ? Math.min(Math.max(-1E5, d.translate(C, 0, 1, 0, 1)), 1E5) : void 0;K.isInside = void 0 !== y && 0 <= y && y <= d.len && 0 <= B && B <= c.len;K.clientX = n ? m(c.translate(A, 0, 0, 0, 1, q)) : B;K.negative = K.y < (l || 0);K.category = e && void 0 !== e[K.x] ? e[K.x] : K.x;K.isNull || (void 0 !== t && (D = Math.min(D, Math.abs(B - t))), t = B);K.zone = this.zones.length && K.getZone();
          }this.closestPointRangePx = D;
        }, getValidPoints: function getValidPoints(a, c) {
          var e = this.chart;return b(a || this.points || [], function (a) {
            return c && !e.isInsidePlot(a.plotX, a.plotY, e.inverted) ? !1 : !a.isNull;
          });
        }, setClip: function setClip(a) {
          var b = this.chart,
              c = this.options,
              e = b.renderer,
              d = b.inverted,
              p = this.clipBox,
              g = p || b.clipBox,
              f = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, c.xAxis, c.yAxis].join(),
              k = b[f],
              q = b[f + "m"];k || (a && (g.width = 0, b[f + "m"] = q = e.clipRect(-99, d ? -b.plotLeft : -b.plotTop, 99, d ? b.chartWidth : b.chartHeight)), b[f] = k = e.clipRect(g), k.count = { length: 0 });a && !k.count[this.index] && (k.count[this.index] = !0, k.count.length += 1);!1 !== c.clip && (this.group.clip(a || p ? k : b.clipRect), this.markerGroup.clip(q), this.sharedClipKey = f);a || (k.count[this.index] && (delete k.count[this.index], --k.count.length), 0 === k.count.length && f && b[f] && (p || (b[f] = b[f].destroy()), b[f + "m"] && (b[f + "m"] = b[f + "m"].destroy())));
        }, animate: function animate(a) {
          var b = this.chart,
              c = A(this.options.animation),
              e;a ? this.setClip(c) : (e = this.sharedClipKey, (a = b[e]) && a.animate({ width: b.plotSizeX }, c), b[e + "m"] && b[e + "m"].animate({ width: b.plotSizeX + 99 }, c), this.animate = null);
        }, afterAnimate: function afterAnimate() {
          this.setClip();
          k(this, "afterAnimate");this.finishedAnimating = !0;
        }, drawPoints: function drawPoints() {
          var a = this.points,
              b = this.chart,
              c,
              e,
              d,
              f,
              g = this.options.marker,
              k,
              q,
              n,
              l,
              m = this[this.specialGroup] || this.markerGroup,
              r = J(g.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= 2 * g.radius);if (!1 !== g.enabled || this._hasPointMarkers) for (e = 0; e < a.length; e++) {
            d = a[e], c = d.plotY, f = d.graphic, k = d.marker || {}, q = !!d.marker, n = r && void 0 === k.enabled || k.enabled, l = d.isInside, n && v(c) && null !== d.y ? (c = J(k.symbol, this.symbol), d.hasImage = 0 === c.indexOf("url"), n = this.markerAttribs(d, d.selected && "select"), f ? f[l ? "show" : "hide"](!0).animate(n) : l && (0 < n.width || d.hasImage) && (d.graphic = f = b.renderer.symbol(c, n.x, n.y, n.width, n.height, q ? k : g).add(m)), f && f.attr(this.pointAttribs(d, d.selected && "select")), f && f.addClass(d.getClassName(), !0)) : f && (d.graphic = f.destroy());
          }
        }, markerAttribs: function markerAttribs(a, b) {
          var c = this.options.marker,
              e = a.marker || {},
              d = J(e.radius, c.radius);b && (c = c.states[b], b = e.states && e.states[b], d = J(b && b.radius, c && c.radius, d + (c && c.radiusPlus || 0)));a.hasImage && (d = 0);a = { x: Math.floor(a.plotX) - d, y: a.plotY - d };d && (a.width = a.height = 2 * d);return a;
        }, pointAttribs: function pointAttribs(a, b) {
          var c = this.options.marker,
              e = a && a.options,
              d = e && e.marker || {},
              f = this.color,
              g = e && e.color,
              p = a && a.color,
              e = J(d.lineWidth, c.lineWidth);a = a && a.zone && a.zone.color;f = g || a || p || f;a = d.fillColor || c.fillColor || f;f = d.lineColor || c.lineColor || f;b && (c = c.states[b], b = d.states && d.states[b] || {}, e = J(b.lineWidth, c.lineWidth, e + J(b.lineWidthPlus, c.lineWidthPlus, 0)), a = b.fillColor || c.fillColor || a, f = b.lineColor || c.lineColor || f);return { stroke: f, "stroke-width": e, fill: a };
        }, destroy: function destroy() {
          var a = this,
              b = a.chart,
              e = /AppleWebKit\/533/.test(K.navigator.userAgent),
              d,
              h,
              f = a.data || [],
              n,
              l;k(a, "destroy");c(a);t(a.axisTypes || [], function (b) {
            (l = a[b]) && l.series && (g(l.series, a), l.isDirty = l.forceRedraw = !0);
          });a.legendItem && a.chart.legend.destroyItem(a);for (h = f.length; h--;) {
            (n = f[h]) && n.destroy && n.destroy();
          }a.points = null;clearTimeout(a.animationTimeout);D(a, function (a, b) {
            a instanceof q && !a.survive && (d = e && "group" === b ? "hide" : "destroy", a[d]());
          });
          b.hoverSeries === a && (b.hoverSeries = null);g(b.series, a);b.orderSeries();D(a, function (b, c) {
            delete a[c];
          });
        }, getGraphPath: function getGraphPath(a, b, c) {
          var e = this,
              d = e.options,
              f = d.step,
              g,
              p = [],
              k = [],
              q;a = a || e.points;(g = a.reversed) && a.reverse();(f = { right: 1, center: 2 }[f] || f && 3) && g && (f = 4 - f);!d.connectNulls || b || c || (a = this.getValidPoints(a));t(a, function (h, g) {
            var n = h.plotX,
                l = h.plotY,
                m = a[g - 1];(h.leftCliff || m && m.rightCliff) && !c && (q = !0);h.isNull && !u(b) && 0 < g ? q = !d.connectNulls : h.isNull && !b ? q = !0 : (0 === g || q ? g = ["M", h.plotX, h.plotY] : e.getPointSpline ? g = e.getPointSpline(a, h, g) : f ? (g = 1 === f ? ["L", m.plotX, l] : 2 === f ? ["L", (m.plotX + n) / 2, m.plotY, "L", (m.plotX + n) / 2, l] : ["L", n, m.plotY], g.push("L", n, l)) : g = ["L", n, l], k.push(h.x), f && k.push(h.x), p.push.apply(p, g), q = !1);
          });p.xMap = k;return e.graphPath = p;
        }, drawGraph: function drawGraph() {
          var a = this,
              b = this.options,
              c = (this.gappedPath || this.getGraphPath).call(this),
              e = [["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]];t(this.zones, function (c, d) {
            e.push(["zone-graph-" + d, "highcharts-graph highcharts-zone-graph-" + d + " " + (c.className || ""), c.color || a.color, c.dashStyle || b.dashStyle]);
          });t(e, function (e, d) {
            var h = e[0],
                f = a[h];f ? (f.endX = c.xMap, f.animate({ d: c })) : c.length && (a[h] = a.chart.renderer.path(c).addClass(e[1]).attr({ zIndex: 1 }).add(a.group), f = { stroke: e[2], "stroke-width": b.lineWidth, fill: a.fillGraph && a.color || "none" }, e[3] ? f.dashstyle = e[3] : "square" !== b.linecap && (f["stroke-linecap"] = f["stroke-linejoin"] = "round"), f = a[h].attr(f).shadow(2 > d && b.shadow));f && (f.startX = c.xMap, f.isArea = c.isArea);
          });
        }, applyZones: function applyZones() {
          var a = this,
              b = this.chart,
              c = b.renderer,
              e = this.zones,
              d,
              f,
              g = this.clips || [],
              k,
              q = this.graph,
              n = this.area,
              l = Math.max(b.chartWidth, b.chartHeight),
              m = this[(this.zoneAxis || "y") + "Axis"],
              r,
              v,
              B = b.inverted,
              y,
              u,
              G,
              D,
              K = !1;e.length && (q || n) && m && void 0 !== m.min && (v = m.reversed, y = m.horiz, q && q.hide(), n && n.hide(), r = m.getExtremes(), t(e, function (e, h) {
            d = v ? y ? b.plotWidth : 0 : y ? 0 : m.toPixels(r.min);d = Math.min(Math.max(J(f, d), 0), l);f = Math.min(Math.max(Math.round(m.toPixels(J(e.value, r.max), !0)), 0), l);K && (d = f = m.toPixels(r.max));u = Math.abs(d - f);G = Math.min(d, f);D = Math.max(d, f);m.isXAxis ? (k = { x: B ? D : G, y: 0, width: u, height: l }, y || (k.x = b.plotHeight - k.x)) : (k = { x: 0, y: B ? D : G, width: l, height: u }, y && (k.y = b.plotWidth - k.y));B && c.isVML && (k = m.isXAxis ? { x: 0, y: v ? G : D, height: k.width, width: b.chartWidth } : { x: k.y - b.plotLeft - b.spacingBox.x, y: 0, width: k.height, height: b.chartHeight });g[h] ? g[h].animate(k) : (g[h] = c.clipRect(k), q && a["zone-graph-" + h].clip(g[h]), n && a["zone-area-" + h].clip(g[h]));K = e.value > r.max;
          }), this.clips = g);
        }, invertGroups: function invertGroups(a) {
          function b() {
            t(["group", "markerGroup"], function (b) {
              c[b] && (e.renderer.isVML && c[b].attr({ width: c.yAxis.len, height: c.xAxis.len }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a));
            });
          }var c = this,
              e = c.chart,
              d;c.xAxis && (d = C(e, "resize", b), C(c, "destroy", d), b(a), c.invertGroups = b);
        }, plotGroup: function plotGroup(a, b, c, e, d) {
          var h = this[a],
              f = !h;f && (this[a] = h = this.chart.renderer.g().attr({ zIndex: e || .1 }).add(d));h.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || ""), !0);h.attr({ visibility: c })[f ? "attr" : "animate"](this.getPlotBox());return h;
        }, getPlotBox: function getPlotBox() {
          var a = this.chart,
              b = this.xAxis,
              c = this.yAxis;a.inverted && (b = c, c = this.xAxis);return { translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1 };
        }, render: function render() {
          var a = this,
              b = a.chart,
              c,
              e = a.options,
              d = !!a.animate && b.renderer.isSVG && A(e.animation).duration,
              f = a.visible ? "inherit" : "hidden",
              g = e.zIndex,
              k = a.hasRendered,
              q = b.seriesGroup,
              n = b.inverted;c = a.plotGroup("group", "series", f, g, q);a.markerGroup = a.plotGroup("markerGroup", "markers", f, g, q);d && a.animate(!0);c.inverted = a.isCartesian ? n : !1;a.drawGraph && (a.drawGraph(), a.applyZones());a.drawDataLabels && a.drawDataLabels();a.visible && a.drawPoints();a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();a.invertGroups(n);!1 === e.clip || a.sharedClipKey || k || c.clip(b.clipRect);d && a.animate();k || (a.animationTimeout = B(function () {
            a.afterAnimate();
          }, d));a.isDirty = !1;a.hasRendered = !0;
        }, redraw: function redraw() {
          var a = this.chart,
              b = this.isDirty || this.isDirtyData,
              c = this.group,
              e = this.xAxis,
              d = this.yAxis;c && (a.inverted && c.attr({ width: a.plotWidth, height: a.plotHeight }), c.animate({ translateX: J(e && e.left, a.plotLeft), translateY: J(d && d.top, a.plotTop) }));this.translate();this.render();b && delete this.kdTree;
        }, kdAxisArray: ["clientX", "plotY"], searchPoint: function searchPoint(a, b) {
          var c = this.xAxis,
              e = this.yAxis,
              d = this.chart.inverted;return this.searchKDTree({ clientX: d ? c.len - a.chartY + c.pos : a.chartX - c.pos, plotY: d ? e.len - a.chartX + e.pos : a.chartY - e.pos }, b);
        },
        buildKDTree: function buildKDTree() {
          function a(c, e, d) {
            var h, f;if (f = c && c.length) return h = b.kdAxisArray[e % d], c.sort(function (a, b) {
              return a[h] - b[h];
            }), f = Math.floor(f / 2), { point: c[f], left: a(c.slice(0, f), e + 1, d), right: a(c.slice(f + 1), e + 1, d) };
          }this.buildingKdTree = !0;var b = this,
              c = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;delete b.kdTree;B(function () {
            b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);b.buildingKdTree = !1;
          }, b.options.kdNow ? 0 : 1);
        }, searchKDTree: function searchKDTree(a, b) {
          function c(a, b, h, k) {
            var p = b.point,
                q = e.kdAxisArray[h % k],
                n,
                l,
                m = p;l = u(a[d]) && u(p[d]) ? Math.pow(a[d] - p[d], 2) : null;n = u(a[f]) && u(p[f]) ? Math.pow(a[f] - p[f], 2) : null;n = (l || 0) + (n || 0);p.dist = u(n) ? Math.sqrt(n) : Number.MAX_VALUE;p.distX = u(l) ? Math.sqrt(l) : Number.MAX_VALUE;q = a[q] - p[q];n = 0 > q ? "left" : "right";l = 0 > q ? "right" : "left";b[n] && (n = c(a, b[n], h + 1, k), m = n[g] < m[g] ? n : p);b[l] && Math.sqrt(q * q) < m[g] && (a = c(a, b[l], h + 1, k), m = a[g] < m[g] ? a : m);return m;
          }var e = this,
              d = this.kdAxisArray[0],
              f = this.kdAxisArray[1],
              g = b ? "distX" : "dist";b = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1;this.kdTree || this.buildingKdTree || this.buildKDTree();if (this.kdTree) return c(a, this.kdTree, b, b);
        } });
    })(M);(function (a) {
      var C = a.Axis,
          A = a.Chart,
          F = a.correctFloat,
          E = a.defined,
          m = a.destroyObjectProperties,
          f = a.each,
          l = a.format,
          r = a.objectEach,
          u = a.pick,
          t = a.Series;a.StackItem = function (a, d, f, b, e) {
        var g = a.chart.inverted;this.axis = a;this.isNegative = f;this.options = d;this.x = b;this.total = null;this.points = {};this.stack = e;this.rightCliff = this.leftCliff = 0;this.alignOptions = { align: d.align || (g ? f ? "left" : "right" : "center"), verticalAlign: d.verticalAlign || (g ? "middle" : f ? "bottom" : "top"), y: u(d.y, g ? 4 : f ? 14 : -6), x: u(d.x, g ? f ? -6 : 6 : 0) };this.textAlign = d.textAlign || (g ? f ? "right" : "left" : "center");
      };a.StackItem.prototype = { destroy: function destroy() {
          m(this, this.axis);
        }, render: function render(a) {
          var d = this.options,
              f = d.format,
              f = f ? l(f, this) : d.formatter.call(this);this.label ? this.label.attr({ text: f, visibility: "hidden" }) : this.label = this.axis.chart.renderer.text(f, null, null, d.useHTML).css(d.style).attr({ align: this.textAlign, rotation: d.rotation, visibility: "hidden" }).add(a);
        }, setOffset: function setOffset(a, d) {
          var f = this.axis,
              b = f.chart,
              e = f.translate(f.usePercentage ? 100 : this.total, 0, 0, 0, 1),
              f = f.translate(0),
              f = Math.abs(e - f);a = b.xAxis[0].translate(this.x) + a;e = this.getStackBox(b, this, a, e, d, f);if (d = this.label) d.align(this.alignOptions, null, e), e = d.alignAttr, d[!1 === this.options.crop || b.isInsidePlot(e.x, e.y) ? "show" : "hide"](!0);
        }, getStackBox: function getStackBox(a, d, f, b, e, l) {
          var g = d.axis.reversed,
              k = a.inverted;a = a.plotHeight;d = d.isNegative && !g || !d.isNegative && g;return { x: k ? d ? b : b - l : f, y: k ? a - f - e : d ? a - b - l : a - b, width: k ? l : e, height: k ? e : l };
        } };A.prototype.getStacks = function () {
        var a = this;f(a.yAxis, function (a) {
          a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks);
        });f(a.series, function (d) {
          !d.options.stacking || !0 !== d.visible && !1 !== a.options.chart.ignoreHiddenSeries || (d.stackKey = d.type + u(d.options.stack, ""));
        });
      };C.prototype.buildStacks = function () {
        var a = this.series,
            d = u(this.options.reversedStacks, !0),
            f = a.length,
            b;if (!this.isXAxis) {
          this.usePercentage = !1;for (b = f; b--;) {
            a[d ? b : f - b - 1].setStackedPoints();
          }if (this.usePercentage) for (b = 0; b < f; b++) {
            a[b].setPercentStacks();
          }
        }
      };
      C.prototype.renderStackTotals = function () {
        var a = this.chart,
            d = a.renderer,
            f = this.stacks,
            b = this.stackTotalGroup;b || (this.stackTotalGroup = b = d.g("stack-labels").attr({ visibility: "visible", zIndex: 6 }).add());b.translate(a.plotLeft, a.plotTop);r(f, function (a) {
          r(a, function (a) {
            a.render(b);
          });
        });
      };C.prototype.resetStacks = function () {
        var a = this,
            d = a.stacks;a.isXAxis || r(d, function (d) {
          r(d, function (b, e) {
            b.touched < a.stacksTouched ? (b.destroy(), delete d[e]) : (b.total = null, b.cum = null);
          });
        });
      };C.prototype.cleanStacks = function () {
        var a;
        this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks), r(a, function (a) {
          r(a, function (a) {
            a.cum = a.total;
          });
        }));
      };t.prototype.setStackedPoints = function () {
        if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
          var f = this.processedXData,
              d = this.processedYData,
              k = [],
              b = d.length,
              e = this.options,
              l = e.threshold,
              m = e.startFromThreshold ? l : 0,
              n = e.stack,
              e = e.stacking,
              r = this.stackKey,
              t = "-" + r,
              c = this.negStacks,
              G = this.yAxis,
              q = G.stacks,
              B = G.oldStacks,
              K,
              p,
              z,
              I,
              A,
              h,
              w;G.stacksTouched += 1;for (A = 0; A < b; A++) {
            h = f[A], w = d[A], K = this.getStackIndicator(K, h, this.index), I = K.key, z = (p = c && w < (m ? 0 : l)) ? t : r, q[z] || (q[z] = {}), q[z][h] || (B[z] && B[z][h] ? (q[z][h] = B[z][h], q[z][h].total = null) : q[z][h] = new a.StackItem(G, G.options.stackLabels, p, h, n)), z = q[z][h], null !== w && (z.points[I] = z.points[this.index] = [u(z.cum, m)], E(z.cum) || (z.base = I), z.touched = G.stacksTouched, 0 < K.index && !1 === this.singleStacks && (z.points[I][0] = z.points[this.index + "," + h + ",0"][0])), "percent" === e ? (p = p ? r : t, c && q[p] && q[p][h] ? (p = q[p][h], z.total = p.total = Math.max(p.total, z.total) + Math.abs(w) || 0) : z.total = F(z.total + (Math.abs(w) || 0))) : z.total = F(z.total + (w || 0)), z.cum = u(z.cum, m) + (w || 0), null !== w && (z.points[I].push(z.cum), k[A] = z.cum);
          }"percent" === e && (G.usePercentage = !0);this.stackedYData = k;G.oldStacks = {};
        }
      };t.prototype.setPercentStacks = function () {
        var a = this,
            d = a.stackKey,
            k = a.yAxis.stacks,
            b = a.processedXData,
            e;f([d, "-" + d], function (d) {
          for (var f = b.length, g, l; f--;) {
            if (g = b[f], e = a.getStackIndicator(e, g, a.index, d), g = (l = k[d] && k[d][g]) && l.points[e.key]) l = l.total ? 100 / l.total : 0, g[0] = F(g[0] * l), g[1] = F(g[1] * l), a.stackedYData[f] = g[1];
          }
        });
      };t.prototype.getStackIndicator = function (a, d, f, b) {
        !E(a) || a.x !== d || b && a.key !== b ? a = { x: d, index: 0, key: b } : a.index++;a.key = [f, d, a.index].join();return a;
      };
    })(M);(function (a) {
      var C = a.addEvent,
          A = a.animate,
          F = a.Axis,
          E = a.createElement,
          m = a.css,
          f = a.defined,
          l = a.each,
          r = a.erase,
          u = a.extend,
          t = a.fireEvent,
          g = a.inArray,
          d = a.isNumber,
          k = a.isObject,
          b = a.isArray,
          e = a.merge,
          v = a.objectEach,
          y = a.pick,
          n = a.Point,
          D = a.Series,
          J = a.seriesTypes,
          c = a.setAnimation,
          G = a.splat;u(a.Chart.prototype, { addSeries: function addSeries(a, b, c) {
          var e,
              d = this;a && (b = y(b, !0), t(d, "addSeries", { options: a }, function () {
            e = d.initSeries(a);d.isDirtyLegend = !0;d.linkSeries();b && d.redraw(c);
          }));return e;
        }, addAxis: function addAxis(a, b, c, d) {
          var f = b ? "xAxis" : "yAxis",
              g = this.options;a = e(a, { index: this[f].length, isX: b });b = new F(this, a);g[f] = G(g[f] || {});g[f].push(a);y(c, !0) && this.redraw(d);return b;
        }, showLoading: function showLoading(a) {
          var b = this,
              c = b.options,
              e = b.loadingDiv,
              d = c.loading,
              f = function f() {
            e && m(e, { left: b.plotLeft + "px", top: b.plotTop + "px", width: b.plotWidth + "px", height: b.plotHeight + "px" });
          };e || (b.loadingDiv = e = E("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, b.container), b.loadingSpan = E("span", { className: "highcharts-loading-inner" }, null, e), C(b, "redraw", f));e.className = "highcharts-loading";b.loadingSpan.innerHTML = a || c.lang.loading;m(e, u(d.style, { zIndex: 10 }));m(b.loadingSpan, d.labelStyle);b.loadingShown || (m(e, { opacity: 0, display: "" }), A(e, { opacity: d.style.opacity || .5 }, { duration: d.showDuration || 0 }));b.loadingShown = !0;f();
        }, hideLoading: function hideLoading() {
          var a = this.options,
              b = this.loadingDiv;b && (b.className = "highcharts-loading highcharts-loading-hidden", A(b, { opacity: 0 }, { duration: a.loading.hideDuration || 100, complete: function complete() {
              m(b, { display: "none" });
            } }));this.loadingShown = !1;
        }, propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
        propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "), update: function update(a, b, c) {
          var k = this,
              n = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle" },
              q = a.chart,
              m,
              h,
              r = [];if (q) {
            e(!0, k.options.chart, q);"className" in q && k.setClassName(q.className);if ("inverted" in q || "polar" in q) k.propFromSeries(), m = !0;"alignTicks" in q && (m = !0);v(q, function (a, b) {
              -1 !== g("chart." + b, k.propsRequireUpdateSeries) && (h = !0);-1 !== g(b, k.propsRequireDirtyBox) && (k.isDirtyBox = !0);
            });"style" in q && k.renderer.setStyle(q.style);
          }a.colors && (this.options.colors = a.colors);a.plotOptions && e(!0, this.options.plotOptions, a.plotOptions);v(a, function (a, b) {
            if (k[b] && "function" === typeof k[b].update) k[b].update(a, !1);else if ("function" === typeof k[n[b]]) k[n[b]](a);"chart" !== b && -1 !== g(b, k.propsRequireUpdateSeries) && (h = !0);
          });l("xAxis yAxis zAxis series colorAxis pane".split(" "), function (b) {
            a[b] && (l(G(a[b]), function (a, e) {
              (e = f(a.id) && k.get(a.id) || k[b][e]) && e.coll === b && (e.update(a, !1), c && (e.touched = !0));if (!e && c) if ("series" === b) k.addSeries(a, !1).touched = !0;else if ("xAxis" === b || "yAxis" === b) k.addAxis(a, "xAxis" === b, !1).touched = !0;
            }), c && l(k[b], function (a) {
              a.touched ? delete a.touched : r.push(a);
            }));
          });l(r, function (a) {
            a.remove(!1);
          });m && l(k.axes, function (a) {
            a.update({}, !1);
          });h && l(k.series, function (a) {
            a.update({}, !1);
          });a.loading && e(!0, k.options.loading, a.loading);m = q && q.width;q = q && q.height;d(m) && m !== k.chartWidth || d(q) && q !== k.chartHeight ? k.setSize(m, q) : y(b, !0) && k.redraw();
        }, setSubtitle: function setSubtitle(a) {
          this.setTitle(void 0, a);
        } });u(n.prototype, { update: function update(a, b, c, e) {
          function d() {
            f.applyOptions(a);null === f.y && h && (f.graphic = h.destroy());k(a, !0) && (h && h.element && a && a.marker && void 0 !== a.marker.symbol && (f.graphic = h.destroy()), a && a.dataLabels && f.dataLabel && (f.dataLabel = f.dataLabel.destroy()));p = f.index;g.updateParallelArrays(f, p);q.data[p] = k(q.data[p], !0) || k(a, !0) ? f.options : a;g.isDirty = g.isDirtyData = !0;!g.fixedBox && g.hasCartesianSeries && (l.isDirtyBox = !0);"point" === q.legendType && (l.isDirtyLegend = !0);b && l.redraw(c);
          }var f = this,
              g = f.series,
              h = f.graphic,
              p,
              l = g.chart,
              q = g.options;b = y(b, !0);!1 === e ? d() : f.firePointEvent("update", { options: a }, d);
        }, remove: function remove(a, b) {
          this.series.removePoint(g(this, this.series.data), a, b);
        } });u(D.prototype, { addPoint: function addPoint(a, b, c, e) {
          var d = this.options,
              f = this.data,
              g = this.chart,
              h = this.xAxis,
              h = h && h.hasNames && h.names,
              k = d.data,
              p,
              l,
              q = this.xData,
              n,
              m;b = y(b, !0);p = { series: this };this.pointClass.prototype.applyOptions.apply(p, [a]);m = p.x;n = q.length;if (this.requireSorting && m < q[n - 1]) for (l = !0; n && q[n - 1] > m;) {
            n--;
          }this.updateParallelArrays(p, "splice", n, 0, 0);this.updateParallelArrays(p, n);h && p.name && (h[m] = p.name);k.splice(n, 0, a);l && (this.data.splice(n, 0, null), this.processData());"point" === d.legendType && this.generatePoints();c && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(p, "shift"), k.shift()));this.isDirtyData = this.isDirty = !0;b && g.redraw(e);
        }, removePoint: function removePoint(a, b, e) {
          var d = this,
              f = d.data,
              g = f[a],
              k = d.points,
              h = d.chart,
              l = function l() {
            k && k.length === f.length && k.splice(a, 1);f.splice(a, 1);
            d.options.data.splice(a, 1);d.updateParallelArrays(g || { series: d }, "splice", a, 1);g && g.destroy();d.isDirty = !0;d.isDirtyData = !0;b && h.redraw();
          };c(e, h);b = y(b, !0);g ? g.firePointEvent("remove", null, l) : l();
        }, remove: function remove(a, b, c) {
          function e() {
            d.destroy();f.isDirtyLegend = f.isDirtyBox = !0;f.linkSeries();y(a, !0) && f.redraw(b);
          }var d = this,
              f = d.chart;!1 !== c ? t(d, "remove", null, e) : e();
        }, update: function update(a, b) {
          var c = this,
              d = c.chart,
              f = c.userOptions,
              g = c.oldType || c.type,
              k = a.type || f.type || d.options.chart.type,
              h = J[g].prototype,
              n,
              q = ["group", "markerGroup", "dataLabelsGroup", "navigatorSeries", "baseSeries"],
              m = c.finishedAnimating && { animation: !1 };if (Object.keys && "data" === Object.keys(a).toString()) return this.setData(a.data, b);if (k && k !== g || void 0 !== a.zIndex) q.length = 0;l(q, function (a) {
            q[a] = c[a];delete c[a];
          });a = e(f, m, { index: c.index, pointStart: c.xData[0] }, { data: c.options.data }, a);c.remove(!1, null, !1);for (n in h) {
            c[n] = void 0;
          }u(c, J[k || g].prototype);l(q, function (a) {
            c[a] = q[a];
          });c.init(d, a);c.oldType = g;d.linkSeries();y(b, !0) && d.redraw(!1);
        } });
      u(F.prototype, { update: function update(a, b) {
          var c = this.chart;a = c.options[this.coll][this.options.index] = e(this.userOptions, a);this.destroy(!0);this.init(c, u(a, { events: void 0 }));c.isDirtyBox = !0;y(b, !0) && c.redraw();
        }, remove: function remove(a) {
          for (var c = this.chart, e = this.coll, d = this.series, f = d.length; f--;) {
            d[f] && d[f].remove(!1);
          }r(c.axes, this);r(c[e], this);b(c.options[e]) ? c.options[e].splice(this.options.index, 1) : delete c.options[e];l(c[e], function (a, b) {
            a.options.index = b;
          });this.destroy();c.isDirtyBox = !0;y(a, !0) && c.redraw();
        },
        setTitle: function setTitle(a, b) {
          this.update({ title: a }, b);
        }, setCategories: function setCategories(a, b) {
          this.update({ categories: a }, b);
        } });
    })(M);(function (a) {
      var C = a.color,
          A = a.each,
          F = a.map,
          E = a.pick,
          m = a.Series,
          f = a.seriesType;f("area", "line", { softThreshold: !1, threshold: 0 }, { singleStacks: !1, getStackPoints: function getStackPoints(f) {
          var l = [],
              m = [],
              t = this.xAxis,
              g = this.yAxis,
              d = g.stacks[this.stackKey],
              k = {},
              b = this.index,
              e = g.series,
              v = e.length,
              y,
              n = E(g.options.reversedStacks, !0) ? 1 : -1,
              D;f = f || this.points;if (this.options.stacking) {
            for (D = 0; D < f.length; D++) {
              k[f[D].x] = f[D];
            }a.objectEach(d, function (a, b) {
              null !== a.total && m.push(b);
            });m.sort(function (a, b) {
              return a - b;
            });y = F(e, function () {
              return this.visible;
            });A(m, function (a, c) {
              var e = 0,
                  f,
                  r;if (k[a] && !k[a].isNull) l.push(k[a]), A([-1, 1], function (e) {
                var g = 1 === e ? "rightNull" : "leftNull",
                    l = 0,
                    q = d[m[c + e]];if (q) for (D = b; 0 <= D && D < v;) {
                  f = q.points[D], f || (D === b ? k[a][g] = !0 : y[D] && (r = d[a].points[D]) && (l -= r[1] - r[0])), D += n;
                }k[a][1 === e ? "rightCliff" : "leftCliff"] = l;
              });else {
                for (D = b; 0 <= D && D < v;) {
                  if (f = d[a].points[D]) {
                    e = f[1];break;
                  }D += n;
                }e = g.translate(e, 0, 1, 0, 1);l.push({ isNull: !0, plotX: t.translate(a, 0, 0, 0, 1), x: a, plotY: e, yBottom: e });
              }
            });
          }return l;
        }, getGraphPath: function getGraphPath(a) {
          var f = m.prototype.getGraphPath,
              l = this.options,
              t = l.stacking,
              g = this.yAxis,
              d,
              k,
              b = [],
              e = [],
              v = this.index,
              y,
              n = g.stacks[this.stackKey],
              D = l.threshold,
              A = g.getThreshold(l.threshold),
              c,
              l = l.connectNulls || "percent" === t,
              G = function G(c, d, f) {
            var k = a[c];c = t && n[k.x].points[v];var l = k[f + "Null"] || 0;f = k[f + "Cliff"] || 0;var q,
                m,
                k = !0;f || l ? (q = (l ? c[0] : c[1]) + f, m = c[0] + f, k = !!l) : !t && a[d] && a[d].isNull && (q = m = D);void 0 !== q && (e.push({ plotX: y, plotY: null === q ? A : g.getThreshold(q), isNull: k, isCliff: !0 }), b.push({ plotX: y, plotY: null === m ? A : g.getThreshold(m), doCurve: !1 }));
          };a = a || this.points;t && (a = this.getStackPoints(a));for (d = 0; d < a.length; d++) {
            if (k = a[d].isNull, y = E(a[d].rectPlotX, a[d].plotX), c = E(a[d].yBottom, A), !k || l) l || G(d, d - 1, "left"), k && !t && l || (e.push(a[d]), b.push({ x: d, plotX: y, plotY: c })), l || G(d, d + 1, "right");
          }d = f.call(this, e, !0, !0);b.reversed = !0;k = f.call(this, b, !0, !0);k.length && (k[0] = "L");k = d.concat(k);f = f.call(this, e, !1, l);k.xMap = d.xMap;this.areaPath = k;return f;
        }, drawGraph: function drawGraph() {
          this.areaPath = [];m.prototype.drawGraph.apply(this);var a = this,
              f = this.areaPath,
              u = this.options,
              t = [["area", "highcharts-area", this.color, u.fillColor]];A(this.zones, function (f, d) {
            t.push(["zone-area-" + d, "highcharts-area highcharts-zone-area-" + d + " " + f.className, f.color || a.color, f.fillColor || u.fillColor]);
          });A(t, function (g) {
            var d = g[0],
                k = a[d];k ? (k.endX = f.xMap, k.animate({ d: f })) : (k = a[d] = a.chart.renderer.path(f).addClass(g[1]).attr({ fill: E(g[3], C(g[2]).setOpacity(E(u.fillOpacity, .75)).get()), zIndex: 0 }).add(a.group), k.isArea = !0);k.startX = f.xMap;k.shiftUnit = u.step ? 2 : 1;
          });
        }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle });
    })(M);(function (a) {
      var C = a.pick;a = a.seriesType;a("spline", "line", {}, { getPointSpline: function getPointSpline(a, F, E) {
          var m = F.plotX,
              f = F.plotY,
              l = a[E - 1];E = a[E + 1];var r, u, t, g;if (l && !l.isNull && !1 !== l.doCurve && !F.isCliff && E && !E.isNull && !1 !== E.doCurve && !F.isCliff) {
            a = l.plotY;t = E.plotX;E = E.plotY;var d = 0;r = (1.5 * m + l.plotX) / 2.5;u = (1.5 * f + a) / 2.5;t = (1.5 * m + t) / 2.5;g = (1.5 * f + E) / 2.5;t !== r && (d = (g - u) * (t - m) / (t - r) + f - g);u += d;g += d;u > a && u > f ? (u = Math.max(a, f), g = 2 * f - u) : u < a && u < f && (u = Math.min(a, f), g = 2 * f - u);g > E && g > f ? (g = Math.max(E, f), u = 2 * f - g) : g < E && g < f && (g = Math.min(E, f), u = 2 * f - g);F.rightContX = t;F.rightContY = g;
          }F = ["C", C(l.rightContX, l.plotX), C(l.rightContY, l.plotY), C(r, m), C(u, f), m, f];l.rightContX = l.rightContY = null;return F;
        } });
    })(M);(function (a) {
      var C = a.seriesTypes.area.prototype,
          A = a.seriesType;A("areaspline", "spline", a.defaultPlotOptions.area, { getStackPoints: C.getStackPoints, getGraphPath: C.getGraphPath,
        drawGraph: C.drawGraph, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle });
    })(M);(function (a) {
      var C = a.animObject,
          A = a.color,
          F = a.each,
          E = a.extend,
          m = a.isNumber,
          f = a.merge,
          l = a.pick,
          r = a.Series,
          u = a.seriesType,
          t = a.svg;u("column", "line", { borderRadius: 0, crisp: !0, groupPadding: .2, marker: null, pointPadding: .1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: { hover: { halo: !1, brightness: .1, shadow: !1 }, select: { color: "#cccccc", borderColor: "#000000", shadow: !1 } }, dataLabels: { align: null, verticalAlign: null, y: null },
        softThreshold: !1, startFromThreshold: !0, stickyTracking: !1, tooltip: { distance: 6 }, threshold: 0, borderColor: "#ffffff" }, { cropShoulder: 0, directTouch: !0, trackerGroups: ["group", "dataLabelsGroup"], negStacks: !0, init: function init() {
          r.prototype.init.apply(this, arguments);var a = this,
              d = a.chart;d.hasRendered && F(d.series, function (d) {
            d.type === a.type && (d.isDirty = !0);
          });
        }, getColumnMetrics: function getColumnMetrics() {
          var a = this,
              d = a.options,
              f = a.xAxis,
              b = a.yAxis,
              e = f.reversed,
              m,
              r = {},
              n = 0;!1 === d.grouping ? n = 1 : F(a.chart.series, function (c) {
            var e = c.options,
                d = c.yAxis,
                f;c.type !== a.type || !c.visible && a.chart.options.chart.ignoreHiddenSeries || b.len !== d.len || b.pos !== d.pos || (e.stacking ? (m = c.stackKey, void 0 === r[m] && (r[m] = n++), f = r[m]) : !1 !== e.grouping && (f = n++), c.columnIndex = f);
          });var t = Math.min(Math.abs(f.transA) * (f.ordinalSlope || d.pointRange || f.closestPointRange || f.tickInterval || 1), f.len),
              u = t * d.groupPadding,
              c = (t - 2 * u) / (n || 1),
              d = Math.min(d.maxPointWidth || f.len, l(d.pointWidth, c * (1 - 2 * d.pointPadding)));a.columnMetrics = { width: d, offset: (c - d) / 2 + (u + ((a.columnIndex || 0) + (e ? 1 : 0)) * c - t / 2) * (e ? -1 : 1) };return a.columnMetrics;
        }, crispCol: function crispCol(a, d, f, b) {
          var e = this.chart,
              g = this.borderWidth,
              k = -(g % 2 ? .5 : 0),
              g = g % 2 ? .5 : 1;e.inverted && e.renderer.isVML && (g += 1);this.options.crisp && (f = Math.round(a + f) + k, a = Math.round(a) + k, f -= a);b = Math.round(d + b) + g;k = .5 >= Math.abs(d) && .5 < b;d = Math.round(d) + g;b -= d;k && b && (--d, b += 1);return { x: a, y: d, width: f, height: b };
        }, translate: function translate() {
          var a = this,
              d = a.chart,
              f = a.options,
              b = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
              b = a.borderWidth = l(f.borderWidth, b ? 0 : 1),
              e = a.yAxis,
              m = a.translatedThreshold = e.getThreshold(f.threshold),
              t = l(f.minPointLength, 5),
              n = a.getColumnMetrics(),
              u = n.width,
              A = a.barW = Math.max(u, 1 + 2 * b),
              c = a.pointXOffset = n.offset;d.inverted && (m -= .5);f.pointPadding && (A = Math.ceil(A));r.prototype.translate.apply(a);F(a.points, function (b) {
            var f = l(b.yBottom, m),
                g = 999 + Math.abs(f),
                g = Math.min(Math.max(-g, b.plotY), e.len + g),
                k = b.plotX + c,
                n = A,
                r = Math.min(g, f),
                v,
                y = Math.max(g, f) - r;Math.abs(y) < t && t && (y = t, v = !e.reversed && !b.negative || e.reversed && b.negative, r = Math.abs(r - m) > t ? f - t : m - (v ? t : 0));b.barX = k;b.pointWidth = u;b.tooltipPos = d.inverted ? [e.len + e.pos - d.plotLeft - g, a.xAxis.len - k - n / 2, y] : [k + n / 2, g + e.pos - d.plotTop, y];b.shapeType = "rect";b.shapeArgs = a.crispCol.apply(a, b.isNull ? [k, m, n, 0] : [k, r, n, y]);
          });
        }, getSymbol: a.noop, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, drawGraph: function drawGraph() {
          this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data");
        }, pointAttribs: function pointAttribs(a, d) {
          var g = this.options,
              b,
              e = this.pointAttrToOptions || {};b = e.stroke || "borderColor";var l = e["stroke-width"] || "borderWidth",
              m = a && a.color || this.color,
              n = a[b] || g[b] || this.color || m,
              r = a[l] || g[l] || this[l] || 0,
              e = g.dashStyle;a && this.zones.length && (m = a.getZone(), m = a.options.color || m && m.color || this.color);d && (a = f(g.states[d], a.options.states && a.options.states[d] || {}), d = a.brightness, m = a.color || void 0 !== d && A(m).brighten(a.brightness).get() || m, n = a[b] || n, r = a[l] || r, e = a.dashStyle || e);b = { fill: m, stroke: n, "stroke-width": r };e && (b.dashstyle = e);return b;
        }, drawPoints: function drawPoints() {
          var a = this,
              d = this.chart,
              k = a.options,
              b = d.renderer,
              e = k.animationLimit || 250,
              l;F(a.points, function (g) {
            var n = g.graphic;if (m(g.plotY) && null !== g.y) {
              l = g.shapeArgs;if (n) n[d.pointCount < e ? "animate" : "attr"](f(l));else g.graphic = n = b[g.shapeType](l).add(g.group || a.group);k.borderRadius && n.attr({ r: k.borderRadius });n.attr(a.pointAttribs(g, g.selected && "select")).shadow(k.shadow, null, k.stacking && !k.borderRadius);n.addClass(g.getClassName(), !0);
            } else n && (g.graphic = n.destroy());
          });
        }, animate: function animate(a) {
          var d = this,
              f = this.yAxis,
              b = d.options,
              e = this.chart.inverted,
              g = {};t && (a ? (g.scaleY = .001, a = Math.min(f.pos + f.len, Math.max(f.pos, f.toPixels(b.threshold))), e ? g.translateX = a - f.len : g.translateY = a, d.group.attr(g)) : (g[e ? "translateX" : "translateY"] = f.pos, d.group.animate(g, E(C(d.options.animation), { step: function step(a, b) {
              d.group.attr({ scaleY: Math.max(.001, b.pos) });
            } })), d.animate = null));
        }, remove: function remove() {
          var a = this,
              d = a.chart;d.hasRendered && F(d.series, function (d) {
            d.type === a.type && (d.isDirty = !0);
          });r.prototype.remove.apply(a, arguments);
        } });
    })(M);(function (a) {
      a = a.seriesType;a("bar", "column", null, { inverted: !0 });
    })(M);(function (a) {
      var C = a.Series;a = a.seriesType;a("scatter", "line", { lineWidth: 0, findNearestPointBy: "xy", marker: { enabled: !0 }, tooltip: { headerFormat: "<span style=\"color:{point.color}\">\u25CF</span> <span style=\"font-size: 0.85em\"> {series.name}</span><br/>", pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e" } }, { sorted: !1, requireSorting: !1, noSharedTooltip: !0, trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
        takeOrdinalPosition: !1, drawGraph: function drawGraph() {
          this.options.lineWidth && C.prototype.drawGraph.call(this);
        } });
    })(M);(function (a) {
      var C = a.pick,
          A = a.relativeLength;a.CenteredSeriesMixin = { getCenter: function getCenter() {
          var a = this.options,
              E = this.chart,
              m = 2 * (a.slicedOffset || 0),
              f = E.plotWidth - 2 * m,
              E = E.plotHeight - 2 * m,
              l = a.center,
              l = [C(l[0], "50%"), C(l[1], "50%"), a.size || "100%", a.innerSize || 0],
              r = Math.min(f, E),
              u,
              t;for (u = 0; 4 > u; ++u) {
            t = l[u], a = 2 > u || 2 === u && /%$/.test(t), l[u] = A(t, [f, E, r, l[2]][u]) + (a ? m : 0);
          }l[3] > l[2] && (l[3] = l[2]);return l;
        } };
    })(M);
    (function (a) {
      var C = a.addEvent,
          A = a.defined,
          F = a.each,
          E = a.extend,
          m = a.inArray,
          f = a.noop,
          l = a.pick,
          r = a.Point,
          u = a.Series,
          t = a.seriesType,
          g = a.setAnimation;t("pie", "line", { center: [null, null], clip: !1, colorByPoint: !0, dataLabels: { distance: 30, enabled: !0, formatter: function formatter() {
            return this.point.isNull ? void 0 : this.point.name;
          }, x: 0 }, ignoreHiddenPoint: !0, legendType: "point", marker: null, size: null, showInLegend: !1, slicedOffset: 10, stickyTracking: !1, tooltip: { followPointer: !0 }, borderColor: "#ffffff", borderWidth: 1, states: { hover: { brightness: .1,
            shadow: !1 } } }, { isCartesian: !1, requireSorting: !1, directTouch: !0, noSharedTooltip: !0, trackerGroups: ["group", "dataLabelsGroup"], axisTypes: [], pointAttribs: a.seriesTypes.column.prototype.pointAttribs, animate: function animate(a) {
          var d = this,
              b = d.points,
              e = d.startAngleRad;a || (F(b, function (a) {
            var b = a.graphic,
                f = a.shapeArgs;b && (b.attr({ r: a.startR || d.center[3] / 2, start: e, end: e }), b.animate({ r: f.r, start: f.start, end: f.end }, d.options.animation));
          }), d.animate = null);
        }, updateTotals: function updateTotals() {
          var a,
              f = 0,
              b = this.points,
              e = b.length,
              g,
              l = this.options.ignoreHiddenPoint;for (a = 0; a < e; a++) {
            g = b[a], f += l && !g.visible ? 0 : g.isNull ? 0 : g.y;
          }this.total = f;for (a = 0; a < e; a++) {
            g = b[a], g.percentage = 0 < f && (g.visible || !l) ? g.y / f * 100 : 0, g.total = f;
          }
        }, generatePoints: function generatePoints() {
          u.prototype.generatePoints.call(this);this.updateTotals();
        }, translate: function translate(a) {
          this.generatePoints();var d = 0,
              b = this.options,
              e = b.slicedOffset,
              f = e + (b.borderWidth || 0),
              g,
              n,
              m,
              r = b.startAngle || 0,
              c = this.startAngleRad = Math.PI / 180 * (r - 90),
              r = (this.endAngleRad = Math.PI / 180 * (l(b.endAngle, r + 360) - 90)) - c,
              t = this.points,
              q,
              B = b.dataLabels.distance,
              b = b.ignoreHiddenPoint,
              u,
              p = t.length,
              z;a || (this.center = a = this.getCenter());this.getX = function (b, c, e) {
            m = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + e.labelDistance), 1));return a[0] + (c ? -1 : 1) * Math.cos(m) * (a[2] / 2 + e.labelDistance);
          };for (u = 0; u < p; u++) {
            z = t[u];z.labelDistance = l(z.options.dataLabels && z.options.dataLabels.distance, B);this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, z.labelDistance);g = c + d * r;if (!b || z.visible) d += z.percentage / 100;n = c + d * r;z.shapeType = "arc";z.shapeArgs = { x: a[0], y: a[1], r: a[2] / 2, innerR: a[3] / 2, start: Math.round(1E3 * g) / 1E3, end: Math.round(1E3 * n) / 1E3 };m = (n + g) / 2;m > 1.5 * Math.PI ? m -= 2 * Math.PI : m < -Math.PI / 2 && (m += 2 * Math.PI);z.slicedTranslation = { translateX: Math.round(Math.cos(m) * e), translateY: Math.round(Math.sin(m) * e) };n = Math.cos(m) * a[2] / 2;q = Math.sin(m) * a[2] / 2;z.tooltipPos = [a[0] + .7 * n, a[1] + .7 * q];z.half = m < -Math.PI / 2 || m > Math.PI / 2 ? 1 : 0;z.angle = m;g = Math.min(f, z.labelDistance / 5);z.labelPos = [a[0] + n + Math.cos(m) * z.labelDistance, a[1] + q + Math.sin(m) * z.labelDistance, a[0] + n + Math.cos(m) * g, a[1] + q + Math.sin(m) * g, a[0] + n, a[1] + q, 0 > z.labelDistance ? "center" : z.half ? "right" : "left", m];
          }
        }, drawGraph: null, drawPoints: function drawPoints() {
          var a = this,
              f = a.chart.renderer,
              b,
              e,
              g,
              l,
              n = a.options.shadow;n && !a.shadowGroup && (a.shadowGroup = f.g("shadow").add(a.group));F(a.points, function (d) {
            if (!d.isNull) {
              e = d.graphic;l = d.shapeArgs;b = d.getTranslate();var k = d.shadowGroup;n && !k && (k = d.shadowGroup = f.g("shadow").add(a.shadowGroup));k && k.attr(b);g = a.pointAttribs(d, d.selected && "select");e ? e.setRadialReference(a.center).attr(g).animate(E(l, b)) : (d.graphic = e = f[d.shapeType](l).setRadialReference(a.center).attr(b).add(a.group), d.visible || e.attr({ visibility: "hidden" }), e.attr(g).attr({ "stroke-linejoin": "round" }).shadow(n, k));e.addClass(d.getClassName());
            }
          });
        }, searchPoint: f, sortByAngle: function sortByAngle(a, f) {
          a.sort(function (a, e) {
            return void 0 !== a.angle && (e.angle - a.angle) * f;
          });
        }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, getCenter: a.CenteredSeriesMixin.getCenter, getSymbol: f }, { init: function init() {
          r.prototype.init.apply(this, arguments);var a = this,
              f;a.name = l(a.name, "Slice");f = function f(b) {
            a.slice("select" === b.type);
          };C(a, "select", f);C(a, "unselect", f);return a;
        }, isValid: function isValid() {
          return a.isNumber(this.y, !0) && 0 <= this.y;
        }, setVisible: function setVisible(a, f) {
          var b = this,
              e = b.series,
              d = e.chart,
              g = e.options.ignoreHiddenPoint;f = l(f, g);a !== b.visible && (b.visible = b.options.visible = a = void 0 === a ? !b.visible : a, e.options.data[m(b, e.data)] = b.options, F(["graphic", "dataLabel", "connector", "shadowGroup"], function (e) {
            if (b[e]) b[e][a ? "show" : "hide"](!0);
          }), b.legendItem && d.legend.colorizeItem(b, a), a || "hover" !== b.state || b.setState(""), g && (e.isDirty = !0), f && d.redraw());
        }, slice: function slice(a, f, b) {
          var e = this.series;g(b, e.chart);l(f, !0);this.sliced = this.options.sliced = A(a) ? a : !this.sliced;e.options.data[m(this, e.data)] = this.options;this.graphic.animate(this.getTranslate());this.shadowGroup && this.shadowGroup.animate(this.getTranslate());
        }, getTranslate: function getTranslate() {
          return this.sliced ? this.slicedTranslation : { translateX: 0, translateY: 0 };
        }, haloPath: function haloPath(a) {
          var d = this.shapeArgs;return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(d.x, d.y, d.r + a, d.r + a, { innerR: this.shapeArgs.r, start: d.start, end: d.end });
        } });
    })(M);(function (a) {
      var C = a.addEvent,
          A = a.arrayMax,
          F = a.defined,
          E = a.each,
          m = a.extend,
          f = a.format,
          l = a.map,
          r = a.merge,
          u = a.noop,
          t = a.pick,
          g = a.relativeLength,
          d = a.Series,
          k = a.seriesTypes,
          b = a.stableSort;a.distribute = function (a, d) {
        function e(a, b) {
          return a.target - b.target;
        }var f,
            g = !0,
            k = a,
            c = [],
            m;m = 0;for (f = a.length; f--;) {
          m += a[f].size;
        }if (m > d) {
          b(a, function (a, b) {
            return (b.rank || 0) - (a.rank || 0);
          });for (m = f = 0; m <= d;) {
            m += a[f].size, f++;
          }c = a.splice(f - 1, a.length);
        }b(a, e);for (a = l(a, function (a) {
          return { size: a.size, targets: [a.target] };
        }); g;) {
          for (f = a.length; f--;) {
            g = a[f], m = (Math.min.apply(0, g.targets) + Math.max.apply(0, g.targets)) / 2, g.pos = Math.min(Math.max(0, m - g.size / 2), d - g.size);
          }f = a.length;for (g = !1; f--;) {
            0 < f && a[f - 1].pos + a[f - 1].size > a[f].pos && (a[f - 1].size += a[f].size, a[f - 1].targets = a[f - 1].targets.concat(a[f].targets), a[f - 1].pos + a[f - 1].size > d && (a[f - 1].pos = d - a[f - 1].size), a.splice(f, 1), g = !0);
          }
        }f = 0;E(a, function (a) {
          var b = 0;E(a.targets, function () {
            k[f].pos = a.pos + b;b += k[f].size;f++;
          });
        });k.push.apply(k, c);b(k, e);
      };d.prototype.drawDataLabels = function () {
        var b = this,
            d = b.options,
            g = d.dataLabels,
            k = b.points,
            l,
            m,
            c = b.hasRendered || 0,
            u,
            q,
            B = t(g.defer, !!d.animation),
            A = b.chart.renderer;if (g.enabled || b._hasPointLabels) b.dlProcessOptions && b.dlProcessOptions(g), q = b.plotGroup("dataLabelsGroup", "data-labels", B && !c ? "hidden" : "visible", g.zIndex || 6), B && (q.attr({ opacity: +c }), c || C(b, "afterAnimate", function () {
          b.visible && q.show(!0);q[d.animation ? "animate" : "attr"]({ opacity: 1 }, { duration: 200 });
        })), m = g, E(k, function (c) {
          var e,
              k = c.dataLabel,
              n,
              h,
              p = c.connector,
              v = !k,
              B;l = c.dlOptions || c.options && c.options.dataLabels;if (e = t(l && l.enabled, m.enabled) && null !== c.y) g = r(m, l), n = c.getLabelConfig(), u = g.format ? f(g.format, n) : g.formatter.call(n, g), B = g.style, n = g.rotation, B.color = t(g.color, B.color, b.color, "#000000"), "contrast" === B.color && (c.contrastColor = A.getContrast(c.color || b.color), B.color = g.inside || 0 > t(c.labelDistance, g.distance) || d.stacking ? c.contrastColor : "#000000"), d.cursor && (B.cursor = d.cursor), h = { fill: g.backgroundColor, stroke: g.borderColor, "stroke-width": g.borderWidth, r: g.borderRadius || 0, rotation: n, padding: g.padding, zIndex: 1 }, a.objectEach(h, function (a, b) {
            void 0 === a && delete h[b];
          });!k || e && F(u) ? e && F(u) && (k ? h.text = u : (k = c.dataLabel = A[n ? "text" : "label"](u, 0, -9999, g.shape, null, null, g.useHTML, null, "data-label"), k.addClass("highcharts-data-label-color-" + c.colorIndex + " " + (g.className || "") + (g.useHTML ? "highcharts-tracker" : ""))), k.attr(h), k.css(B).shadow(g.shadow), k.added || k.add(q), b.alignDataLabel(c, k, g, null, v)) : (c.dataLabel = k = k.destroy(), p && (c.connector = p.destroy()));
        });
      };d.prototype.alignDataLabel = function (a, b, d, f, g) {
        var e = this.chart,
            c = e.inverted,
            k = t(a.plotX, -9999),
            l = t(a.plotY, -9999),
            n = b.getBBox(),
            r,
            p = d.rotation,
            v = d.align,
            u = this.visible && (a.series.forceDL || e.isInsidePlot(k, Math.round(l), c) || f && e.isInsidePlot(k, c ? f.x + 1 : f.y + f.height - 1, c)),
            y = "justify" === t(d.overflow, "justify");if (u && (r = d.style.fontSize, r = e.renderer.fontMetrics(r, b).b, f = m({ x: c ? this.yAxis.len - l : k, y: Math.round(c ? this.xAxis.len - k : l),
          width: 0, height: 0 }, f), m(d, { width: n.width, height: n.height }), p ? (y = !1, k = e.renderer.rotCorr(r, p), k = { x: f.x + d.x + f.width / 2 + k.x, y: f.y + d.y + { top: 0, middle: .5, bottom: 1 }[d.verticalAlign] * f.height }, b[g ? "attr" : "animate"](k).attr({ align: v }), l = (p + 720) % 360, l = 180 < l && 360 > l, "left" === v ? k.y -= l ? n.height : 0 : "center" === v ? (k.x -= n.width / 2, k.y -= n.height / 2) : "right" === v && (k.x -= n.width, k.y -= l ? 0 : n.height)) : (b.align(d, null, f), k = b.alignAttr), y ? a.isLabelJustified = this.justifyDataLabel(b, d, k, n, f, g) : t(d.crop, !0) && (u = e.isInsidePlot(k.x, k.y) && e.isInsidePlot(k.x + n.width, k.y + n.height)), d.shape && !p)) b[g ? "attr" : "animate"]({ anchorX: c ? e.plotWidth - a.plotY : a.plotX, anchorY: c ? e.plotHeight - a.plotX : a.plotY });u || (b.attr({ y: -9999 }), b.placed = !1);
      };d.prototype.justifyDataLabel = function (a, b, d, f, g, k) {
        var c = this.chart,
            e = b.align,
            l = b.verticalAlign,
            m,
            n,
            p = a.box ? 0 : a.padding || 0;m = d.x + p;0 > m && ("right" === e ? b.align = "left" : b.x = -m, n = !0);m = d.x + f.width - p;m > c.plotWidth && ("left" === e ? b.align = "right" : b.x = c.plotWidth - m, n = !0);m = d.y + p;0 > m && ("bottom" === l ? b.verticalAlign = "top" : b.y = -m, n = !0);m = d.y + f.height - p;m > c.plotHeight && ("top" === l ? b.verticalAlign = "bottom" : b.y = c.plotHeight - m, n = !0);n && (a.placed = !k, a.align(b, null, g));return n;
      };k.pie && (k.pie.prototype.drawDataLabels = function () {
        var b = this,
            f = b.data,
            g,
            k = b.chart,
            l = b.options.dataLabels,
            m = t(l.connectorPadding, 10),
            c = t(l.connectorWidth, 1),
            r = k.plotWidth,
            q = k.plotHeight,
            u,
            C = b.center,
            p = C[2] / 2,
            z = C[1],
            I,
            L,
            h,
            w,
            M = [[], []],
            H,
            O,
            Q,
            R,
            x = [0, 0, 0, 0];b.visible && (l.enabled || b._hasPointLabels) && (E(f, function (a) {
          a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }), a.dataLabel.shortened = !1);
        }), d.prototype.drawDataLabels.apply(b), E(f, function (a) {
          a.dataLabel && a.visible && (M[a.half].push(a), a.dataLabel._pos = null);
        }), E(M, function (c, d) {
          var e,
              f,
              n = c.length,
              v = [],
              u;if (n) for (b.sortByAngle(c, d - .5), 0 < b.maxLabelDistance && (e = Math.max(0, z - p - b.maxLabelDistance), f = Math.min(z + p + b.maxLabelDistance, k.plotHeight), E(c, function (a) {
            0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, z - p - a.labelDistance), a.bottom = Math.min(z + p + a.labelDistance, k.plotHeight), u = a.dataLabel.getBBox().height || 21, a.positionsIndex = v.push({ target: a.labelPos[1] - a.top + u / 2, size: u, rank: a.y }) - 1);
          }), a.distribute(v, f + u - e)), R = 0; R < n; R++) {
            g = c[R], f = g.positionsIndex, h = g.labelPos, I = g.dataLabel, Q = !1 === g.visible ? "hidden" : "inherit", e = h[1], v && F(v[f]) ? void 0 === v[f].pos ? Q = "hidden" : (w = v[f].size, O = g.top + v[f].pos) : O = e, delete g.positionIndex, H = l.justify ? C[0] + (d ? -1 : 1) * (p + g.labelDistance) : b.getX(O < g.top + 2 || O > g.bottom - 2 ? e : O, d, g), I._attr = { visibility: Q, align: h[6] }, I._pos = { x: H + l.x + ({ left: m, right: -m }[h[6]] || 0), y: O + l.y - 10 }, h.x = H, h.y = O, t(l.crop, !0) && (L = I.getBBox().width, e = null, H - L < m ? (e = Math.round(L - H + m), x[3] = Math.max(e, x[3])) : H + L > r - m && (e = Math.round(H + L - r + m), x[1] = Math.max(e, x[1])), 0 > O - w / 2 ? x[0] = Math.max(Math.round(-O + w / 2), x[0]) : O + w / 2 > q && (x[2] = Math.max(Math.round(O + w / 2 - q), x[2])), I.sideOverflow = e);
          }
        }), 0 === A(x) || this.verifyDataLabelOverflow(x)) && (this.placeDataLabels(), c && E(this.points, function (a) {
          var e;u = a.connector;if ((I = a.dataLabel) && I._pos && a.visible && 0 < a.labelDistance) {
            Q = I._attr.visibility;if (e = !u) a.connector = u = k.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + a.colorIndex).add(b.dataLabelsGroup), u.attr({ "stroke-width": c, stroke: l.connectorColor || a.color || "#666666" });u[e ? "attr" : "animate"]({ d: b.connectorPath(a.labelPos) });u.attr("visibility", Q);
          } else u && (a.connector = u.destroy());
        }));
      }, k.pie.prototype.connectorPath = function (a) {
        var b = a.x,
            d = a.y;return t(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), d, "C", b, d, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), d, "L", a[2], a[3], "L", a[4], a[5]];
      }, k.pie.prototype.placeDataLabels = function () {
        E(this.points, function (a) {
          var b = a.dataLabel;b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({ width: b._attr.width + "px", textOverflow: "ellipsis" }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({ y: -9999 }));
        }, this);
      }, k.pie.prototype.alignDataLabel = u, k.pie.prototype.verifyDataLabelOverflow = function (a) {
        var b = this.center,
            d = this.options,
            e = d.center,
            f = d.minSize || 80,
            k,
            c = null !== d.size;c || (null !== e[0] ? k = Math.max(b[2] - Math.max(a[1], a[3]), f) : (k = Math.max(b[2] - a[1] - a[3], f), b[0] += (a[3] - a[1]) / 2), null !== e[1] ? k = Math.max(Math.min(k, b[2] - Math.max(a[0], a[2])), f) : (k = Math.max(Math.min(k, b[2] - a[0] - a[2]), f), b[1] += (a[0] - a[2]) / 2), k < b[2] ? (b[2] = k, b[3] = Math.min(g(d.innerSize || 0, k), k), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : c = !0);return c;
      });k.column && (k.column.prototype.alignDataLabel = function (a, b, f, g, k) {
        var e = this.chart.inverted,
            c = a.series,
            l = a.dlBox || a.shapeArgs,
            m = t(a.below, a.plotY > t(this.translatedThreshold, c.yAxis.len)),
            n = t(f.inside, !!this.options.stacking);l && (g = r(l), 0 > g.y && (g.height += g.y, g.y = 0), l = g.y + g.height - c.yAxis.len, 0 < l && (g.height -= l), e && (g = { x: c.yAxis.len - g.y - g.height, y: c.xAxis.len - g.x - g.width, width: g.height, height: g.width }), n || (e ? (g.x += m ? 0 : g.width, g.width = 0) : (g.y += m ? g.height : 0, g.height = 0)));f.align = t(f.align, !e || n ? "center" : m ? "right" : "left");f.verticalAlign = t(f.verticalAlign, e || n ? "middle" : m ? "top" : "bottom");d.prototype.alignDataLabel.call(this, a, b, f, g, k);a.isLabelJustified && a.contrastColor && a.dataLabel.css({ color: a.contrastColor });
      });
    })(M);(function (a) {
      var C = a.Chart,
          A = a.each,
          F = a.objectEach,
          E = a.pick,
          m = a.addEvent;C.prototype.callbacks.push(function (a) {
        function f() {
          var f = [];A(a.yAxis || [], function (a) {
            a.options.stackLabels && !a.options.stackLabels.allowOverlap && F(a.stacks, function (a) {
              F(a, function (a) {
                f.push(a.label);
              });
            });
          });A(a.series || [], function (a) {
            var l = a.options.dataLabels,
                g = a.dataLabelCollections || ["dataLabel"];(l.enabled || a._hasPointLabels) && !l.allowOverlap && a.visible && A(g, function (d) {
              A(a.points, function (a) {
                a[d] && (a[d].labelrank = E(a.labelrank, a.shapeArgs && a.shapeArgs.height), f.push(a[d]));
              });
            });
          });a.hideOverlappingLabels(f);
        }f();m(a, "redraw", f);
      });C.prototype.hideOverlappingLabels = function (a) {
        var f = a.length,
            m,
            u,
            t,
            g,
            d,
            k,
            b,
            e,
            v,
            y = function y(a, b, d, c, e, f, g, k) {
          return !(e > a + d || e + g < a || f > b + c || f + k < b);
        };for (u = 0; u < f; u++) {
          if (m = a[u]) m.oldOpacity = m.opacity, m.newOpacity = 1, m.width || (t = m.getBBox(), m.width = t.width, m.height = t.height);
        }a.sort(function (a, b) {
          return (b.labelrank || 0) - (a.labelrank || 0);
        });for (u = 0; u < f; u++) {
          for (t = a[u], m = u + 1; m < f; ++m) {
            if (g = a[m], t && g && t !== g && t.placed && g.placed && 0 !== t.newOpacity && 0 !== g.newOpacity && (d = t.alignAttr, k = g.alignAttr, b = t.parentGroup, e = g.parentGroup, v = 2 * (t.box ? 0 : t.padding || 0), d = y(d.x + b.translateX, d.y + b.translateY, t.width - v, t.height - v, k.x + e.translateX, k.y + e.translateY, g.width - v, g.height - v))) (t.labelrank < g.labelrank ? t : g).newOpacity = 0;
          }
        }A(a, function (a) {
          var b, d;a && (d = a.newOpacity, a.oldOpacity !== d && a.placed && (d ? a.show(!0) : b = function b() {
            a.hide();
          }, a.alignAttr.opacity = d, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0);
        });
      };
    })(M);(function (a) {
      var C = a.addEvent,
          A = a.Chart,
          F = a.createElement,
          E = a.css,
          m = a.defaultOptions,
          f = a.defaultPlotOptions,
          l = a.each,
          r = a.extend,
          u = a.fireEvent,
          t = a.hasTouch,
          g = a.inArray,
          d = a.isObject,
          k = a.Legend,
          b = a.merge,
          e = a.pick,
          v = a.Point,
          y = a.Series,
          n = a.seriesTypes,
          D = a.svg,
          J;J = a.TrackerMixin = { drawTrackerPoint: function drawTrackerPoint() {
          var a = this,
              b = a.chart.pointer,
              d = function d(a) {
            var c = b.getPointFromEvent(a);
            void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a));
          };l(a.points, function (a) {
            a.graphic && (a.graphic.element.point = a);a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a);
          });a._hasTracking || (l(a.trackerGroups, function (c) {
            if (a[c]) {
              a[c].addClass("highcharts-tracker").on("mouseover", d).on("mouseout", function (a) {
                b.onTrackerMouseOut(a);
              });if (t) a[c].on("touchstart", d);a.options.cursor && a[c].css(E).css({ cursor: a.options.cursor });
            }
          }), a._hasTracking = !0);
        }, drawTrackerGraph: function drawTrackerGraph() {
          var a = this,
              b = a.options,
              d = b.trackByArea,
              e = [].concat(d ? a.areaPath : a.graphPath),
              f = e.length,
              g = a.chart,
              k = g.pointer,
              m = g.renderer,
              n = g.options.tooltip.snap,
              h = a.tracker,
              r,
              u = function u() {
            if (g.hoverSeries !== a) a.onMouseOver();
          },
              v = "rgba(192,192,192," + (D ? .0001 : .002) + ")";if (f && !d) for (r = f + 1; r--;) {
            "M" === e[r] && e.splice(r + 1, 0, e[r + 1] - n, e[r + 2], "L"), (r && "M" === e[r] || r === f) && e.splice(r, 0, "L", e[r - 2] + n, e[r - 1]);
          }h ? h.attr({ d: e }) : a.graph && (a.tracker = m.path(e).attr({ "stroke-linejoin": "round", visibility: a.visible ? "visible" : "hidden", stroke: v,
            fill: d ? v : "none", "stroke-width": a.graph.strokeWidth() + (d ? 0 : 2 * n), zIndex: 2 }).add(a.group), l([a.tracker, a.markerGroup], function (a) {
            a.addClass("highcharts-tracker").on("mouseover", u).on("mouseout", function (a) {
              k.onTrackerMouseOut(a);
            });b.cursor && a.css({ cursor: b.cursor });if (t) a.on("touchstart", u);
          }));
        } };n.column && (n.column.prototype.drawTracker = J.drawTrackerPoint);n.pie && (n.pie.prototype.drawTracker = J.drawTrackerPoint);n.scatter && (n.scatter.prototype.drawTracker = J.drawTrackerPoint);r(k.prototype, { setItemEvents: function setItemEvents(a, d, e) {
          var c = this,
              f = c.chart.renderer.boxWrapper,
              g = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";(e ? d : a.legendGroup).on("mouseover", function () {
            a.setState("hover");f.addClass(g);d.css(c.options.itemHoverStyle);
          }).on("mouseout", function () {
            d.css(b(a.visible ? c.itemStyle : c.itemHiddenStyle));f.removeClass(g);a.setState();
          }).on("click", function (b) {
            var c = function c() {
              a.setVisible && a.setVisible();
            };b = { browserEvent: b };a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : u(a, "legendItemClick", b, c);
          });
        },
        createCheckboxForItem: function createCheckboxForItem(a) {
          a.checkbox = F("input", { type: "checkbox", checked: a.selected, defaultChecked: a.selected }, this.options.itemCheckboxStyle, this.chart.container);C(a.checkbox, "click", function (b) {
            u(a.series || a, "checkboxClick", { checked: b.target.checked, item: a }, function () {
              a.select();
            });
          });
        } });m.legend.itemStyle.cursor = "pointer";r(A.prototype, { showResetZoom: function showResetZoom() {
          var a = this,
              b = m.lang,
              d = a.options.chart.resetZoomButton,
              e = d.theme,
              f = e.states,
              g = "chart" === d.relativeTo ? null : "plotBox";this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () {
            a.zoomOut();
          }, e, f && f.hover).attr({ align: d.position.align, title: b.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(d.position, !1, g);
        }, zoomOut: function zoomOut() {
          var a = this;u(a, "selection", { resetSelection: !0 }, function () {
            a.zoom();
          });
        }, zoom: function zoom(a) {
          var b,
              c = this.pointer,
              f = !1,
              g;!a || a.resetSelection ? (l(this.axes, function (a) {
            b = a.zoom();
          }), c.initiated = !1) : l(a.xAxis.concat(a.yAxis), function (a) {
            var d = a.axis;c[d.isXAxis ? "zoomX" : "zoomY"] && (b = d.zoom(a.min, a.max), d.displayBtn && (f = !0));
          });g = this.resetZoomButton;f && !g ? this.showResetZoom() : !f && d(g) && (this.resetZoomButton = g.destroy());b && this.redraw(e(this.options.chart.animation, a && a.animation, 100 > this.pointCount));
        }, pan: function pan(a, b) {
          var c = this,
              d = c.hoverPoints,
              e;d && l(d, function (a) {
            a.setState();
          });l("xy" === b ? [1, 0] : [1], function (b) {
            b = c[b ? "xAxis" : "yAxis"][0];var d = b.horiz,
                f = a[d ? "chartX" : "chartY"],
                d = d ? "mouseDownX" : "mouseDownY",
                g = c[d],
                h = (b.pointRange || 0) / 2,
                k = b.getExtremes(),
                l = b.toValue(g - f, !0) + h,
                h = b.toValue(g + b.len - f, !0) - h,
                m = h < l,
                g = m ? h : l,
                l = m ? l : h,
                h = Math.min(k.dataMin, b.toValue(b.toPixels(k.min) - b.minPixelPadding)),
                m = Math.max(k.dataMax, b.toValue(b.toPixels(k.max) + b.minPixelPadding)),
                n;n = h - g;0 < n && (l += n, g = h);n = l - m;0 < n && (l = m, g -= n);b.series.length && g !== k.min && l !== k.max && (b.setExtremes(g, l, !1, !1, { trigger: "pan" }), e = !0);c[d] = f;
          });e && c.redraw(!1);E(c.container, { cursor: "move" });
        } });r(v.prototype, { select: function select(a, b) {
          var c = this,
              d = c.series,
              f = d.chart;a = e(a, !c.selected);c.firePointEvent(a ? "select" : "unselect", { accumulate: b }, function () {
            c.selected = c.options.selected = a;d.options.data[g(c, d.data)] = c.options;c.setState(a && "select");b || l(f.getSelectedPoints(), function (a) {
              a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[g(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect"));
            });
          });
        }, onMouseOver: function onMouseOver(a) {
          var b = this.series.chart,
              c = b.pointer;a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);c.runPointActions(a, this);
        }, onMouseOut: function onMouseOut() {
          var a = this.series.chart;this.firePointEvent("mouseOut");
          l(a.hoverPoints || [], function (a) {
            a.setState();
          });a.hoverPoints = a.hoverPoint = null;
        }, importEvents: function importEvents() {
          if (!this.hasImportedEvents) {
            var c = this,
                d = b(c.series.options.point, c.options).events;c.events = d;a.objectEach(d, function (a, b) {
              C(c, b, a);
            });this.hasImportedEvents = !0;
          }
        }, setState: function setState(a, b) {
          var c = Math.floor(this.plotX),
              d = this.plotY,
              g = this.series,
              k = g.options.states[a] || {},
              l = f[g.type].marker && g.options.marker,
              m = l && !1 === l.enabled,
              n = l && l.states && l.states[a] || {},
              h = !1 === n.enabled,
              t = g.stateMarkerGraphic,
              u = this.marker || {},
              v = g.chart,
              y = g.halo,
              A,
              C = l && g.markerAttribs;a = a || "";if (!(a === this.state && !b || this.selected && "select" !== a || !1 === k.enabled || a && (h || m && !1 === n.enabled) || a && u.states && u.states[a] && !1 === u.states[a].enabled)) {
            C && (A = g.markerAttribs(this, a));if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), this.graphic.animate(g.pointAttribs(this, a), e(v.options.chart.animation, k.animation)), A && this.graphic.animate(A, e(v.options.chart.animation, n.animation, l.animation)), t && t.hide();else {
              if (a && n) {
                l = u.symbol || g.symbol;t && t.currentSymbol !== l && (t = t.destroy());if (t) t[b ? "animate" : "attr"]({ x: A.x, y: A.y });else l && (g.stateMarkerGraphic = t = v.renderer.symbol(l, A.x, A.y, A.width, A.height).add(g.markerGroup), t.currentSymbol = l);t && t.attr(g.pointAttribs(this, a));
              }t && (t[a && v.isInsidePlot(c, d, v.inverted) ? "show" : "hide"](), t.element.point = this);
            }(c = k.halo) && c.size ? (y || (g.halo = y = v.renderer.path().add((this.graphic || t).parentGroup)), y[b ? "animate" : "attr"]({ d: this.haloPath(c.size) }), y.attr({ "class": "highcharts-halo highcharts-color-" + e(this.colorIndex, g.colorIndex) }), y.point = this, y.attr(r({ fill: this.color || g.color, "fill-opacity": c.opacity, zIndex: -1 }, c.attributes))) : y && y.point && y.point.haloPath && y.animate({ d: y.point.haloPath(0) });this.state = a;
          }
        }, haloPath: function haloPath(a) {
          return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a);
        } });r(y.prototype, { onMouseOver: function onMouseOver() {
          var a = this.chart,
              b = a.hoverSeries;if (b && b !== this) b.onMouseOut();this.options.events.mouseOver && u(this, "mouseOver");this.setState("hover");a.hoverSeries = this;
        }, onMouseOut: function onMouseOut() {
          var a = this.options,
              b = this.chart,
              d = b.tooltip,
              e = b.hoverPoint;b.hoverSeries = null;if (e) e.onMouseOut();this && a.events.mouseOut && u(this, "mouseOut");!d || this.stickyTracking || d.shared && !this.noSharedTooltip || d.hide();this.setState();
        }, setState: function setState(a) {
          var b = this,
              c = b.options,
              d = b.graph,
              f = c.states,
              g = c.lineWidth,
              c = 0;a = a || "";if (b.state !== a && (l([b.group, b.markerGroup, b.dataLabelsGroup], function (c) {
            c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a));
          }), b.state = a, !f[a] || !1 !== f[a].enabled) && (a && (g = f[a].lineWidth || g + (f[a].lineWidthPlus || 0)), d && !d.dashstyle)) for (g = { "stroke-width": g }, d.animate(g, e(b.chart.options.chart.animation, f[a] && f[a].animation)); b["zone-graph-" + c];) {
            b["zone-graph-" + c].attr(g), c += 1;
          }
        }, setVisible: function setVisible(a, b) {
          var c = this,
              d = c.chart,
              e = c.legendItem,
              f,
              g = d.options.chart.ignoreHiddenSeries,
              k = c.visible;f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !k : a) ? "show" : "hide";l(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
            if (c[a]) c[a][f]();
          });if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();e && d.legend.colorizeItem(c, a);c.isDirty = !0;c.options.stacking && l(d.series, function (a) {
            a.options.stacking && a.visible && (a.isDirty = !0);
          });l(c.linkedSeries, function (b) {
            b.setVisible(a, !1);
          });g && (d.isDirtyBox = !0);!1 !== b && d.redraw();u(c, f);
        }, show: function show() {
          this.setVisible(!0);
        }, hide: function hide() {
          this.setVisible(!1);
        }, select: function select(a) {
          this.selected = a = void 0 === a ? !this.selected : a;this.checkbox && (this.checkbox.checked = a);u(this, a ? "select" : "unselect");
        }, drawTracker: J.drawTrackerGraph });
    })(M);(function (a) {
      var C = a.Chart,
          A = a.each,
          F = a.inArray,
          E = a.isArray,
          m = a.isObject,
          f = a.pick,
          l = a.splat;C.prototype.setResponsive = function (f) {
        var l = this.options.responsive,
            m = [],
            g = this.currentResponsive;l && l.rules && A(l.rules, function (d) {
          void 0 === d._id && (d._id = a.uniqueKey());this.matchResponsiveRule(d, m, f);
        }, this);var d = a.merge.apply(0, a.map(m, function (d) {
          return a.find(l.rules, function (a) {
            return a._id === d;
          }).chartOptions;
        })),
            m = m.toString() || void 0;m !== (g && g.ruleIds) && (g && this.update(g.undoOptions, f), m ? (this.currentResponsive = { ruleIds: m, mergedOptions: d, undoOptions: this.currentOptions(d) }, this.update(d, f)) : this.currentResponsive = void 0);
      };C.prototype.matchResponsiveRule = function (a, l) {
        var m = a.condition;(m.callback || function () {
          return this.chartWidth <= f(m.maxWidth, Number.MAX_VALUE) && this.chartHeight <= f(m.maxHeight, Number.MAX_VALUE) && this.chartWidth >= f(m.minWidth, 0) && this.chartHeight >= f(m.minHeight, 0);
        }).call(this) && l.push(a._id);
      };C.prototype.currentOptions = function (f) {
        function r(f, d, k, b) {
          var e;a.objectEach(f, function (a, g) {
            if (!b && -1 < F(g, ["series", "xAxis", "yAxis"])) for (f[g] = l(f[g]), k[g] = [], e = 0; e < f[g].length; e++) {
              d[g][e] && (k[g][e] = {}, r(a[e], d[g][e], k[g][e], b + 1));
            } else m(a) ? (k[g] = E(a) ? [] : {}, r(a, d[g] || {}, k[g], b + 1)) : k[g] = d[g] || null;
          });
        }var t = {};r(f, this.options, t, 0);return t;
      };
    })(M);return M;
  });
});

/***/ })

/******/ });
});