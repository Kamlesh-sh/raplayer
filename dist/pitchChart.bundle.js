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
/******/ 	return __webpack_require__(__webpack_require__.s = 147);
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

/***/ 100:
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
   Highcharts JS v5.0.12 (2017-05-24)
  
   (c) 2009-2016 Torstein Honsi
  
   License: www.highcharts.com/license
  */
  (function (K, S) {
    "object" === (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = K.document ? S(K) : S : K.Highcharts = S(K);
  })("undefined" !== typeof window ? window : undefined, function (K) {
    K = function () {
      var a = window,
          C = a.document,
          A = a.navigator && a.navigator.userAgent || "",
          G = C && C.createElementNS && !!C.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
          F = /(edge|msie|trident)/i.test(A) && !window.opera,
          m = !G,
          g = /Firefox/.test(A),
          k = g && 4 > parseInt(A.split("Firefox/")[1], 10);return a.Highcharts ? a.Highcharts.error(16, !0) : { product: "Highcharts",
        version: "5.0.12", deg2rad: 2 * Math.PI / 360, doc: C, hasBidiBug: k, hasTouch: C && void 0 !== C.documentElement.ontouchstart, isMS: F, isWebKit: /AppleWebKit/.test(A), isFirefox: g, isTouchDevice: /(Mobile|Android|Windows Phone)/.test(A), SVG_NS: "http://www.w3.org/2000/svg", chartCount: 0, seriesTypes: {}, symbolSizes: {}, svg: G, vml: m, win: a, marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"], noop: function noop() {}, charts: [] };
    }();(function (a) {
      var C = [],
          A = a.charts,
          G = a.doc,
          F = a.win;a.error = function (m, g) {
        m = a.isNumber(m) ? "Highcharts error #" + m + ": www.highcharts.com/errors/" + m : m;if (g) throw Error(m);F.console && console.log(m);
      };a.Fx = function (a, g, k) {
        this.options = g;this.elem = a;this.prop = k;
      };a.Fx.prototype = { dSetter: function dSetter() {
          var a = this.paths[0],
              g = this.paths[1],
              k = [],
              q = this.now,
              v = a.length,
              u;if (1 === q) k = this.toD;else if (v === g.length && 1 > q) for (; v--;) {
            u = parseFloat(a[v]), k[v] = isNaN(u) ? a[v] : q * parseFloat(g[v] - u) + u;
          } else k = g;this.elem.attr("d", k, null, !0);
        }, update: function update() {
          var a = this.elem,
              g = this.prop,
              k = this.now,
              q = this.options.step;if (this[g + "Setter"]) this[g + "Setter"]();else a.attr ? a.element && a.attr(g, k, null, !0) : a.style[g] = k + this.unit;q && q.call(a, k, this);
        }, run: function run(a, g, k) {
          var m = this,
              v = function v(a) {
            return v.stopped ? !1 : m.step(a);
          },
              u;this.startTime = +new Date();this.start = a;this.end = g;this.unit = k;this.now = this.start;this.pos = 0;v.elem = this.elem;v.prop = this.prop;v() && 1 === C.push(v) && (v.timerId = setInterval(function () {
            for (u = 0; u < C.length; u++) {
              C[u]() || C.splice(u--, 1);
            }C.length || clearInterval(v.timerId);
          }, 13));
        }, step: function step(m) {
          var g = +new Date(),
              k,
              q = this.options,
              v = this.elem,
              u = q.complete,
              h = q.duration,
              e = q.curAnim;v.attr && !v.element ? m = !1 : m || g >= h + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), k = e[this.prop] = !0, a.objectEach(e, function (a) {
            !0 !== a && (k = !1);
          }), k && u && u.call(v), m = !1) : (this.pos = q.easing((g - this.startTime) / h), this.now = this.start + (this.end - this.start) * this.pos, this.update(), m = !0);return m;
        }, initPath: function initPath(m, g, k) {
          function q(a) {
            var b, l;for (y = a.length; y--;) {
              b = "M" === a[y] || "L" === a[y], l = /[a-zA-Z]/.test(a[y + 3]), b && l && a.splice(y + 1, 0, a[y + 1], a[y + 2], a[y + 1], a[y + 2]);
            }
          }
          function v(a, b) {
            for (; a.length < w;) {
              a[0] = b[w - a.length];var l = a.slice(0, c);[].splice.apply(a, [0, 0].concat(l));D && (l = a.slice(a.length - c), [].splice.apply(a, [a.length, 0].concat(l)), y--);
            }a[0] = "M";
          }function u(a, l) {
            for (var r = (w - a.length) / c; 0 < r && r--;) {
              b = a.slice().splice(a.length / H - c, c * H), b[0] = l[w - c - r * c], d && (b[c - 6] = b[c - 2], b[c - 5] = b[c - 1]), [].splice.apply(a, [a.length / H, 0].concat(b)), D && r--;
            }
          }g = g || "";var h,
              e = m.startX,
              n = m.endX,
              d = -1 < g.indexOf("C"),
              c = d ? 7 : 3,
              w,
              b,
              y;g = g.split(" ");k = k.slice();var D = m.isArea,
              H = D ? 2 : 1,
              l;d && (q(g), q(k));if (e && n) {
            for (y = 0; y < e.length; y++) {
              if (e[y] === n[0]) {
                h = y;break;
              } else if (e[0] === n[n.length - e.length + y]) {
                h = y;l = !0;break;
              }
            }void 0 === h && (g = []);
          }g.length && a.isNumber(h) && (w = k.length + h * H * c, l ? (v(g, k), u(k, g)) : (v(k, g), u(g, k)));return [g, k];
        } };a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter = function () {
        this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0);
      };a.extend = function (a, g) {
        var m;a || (a = {});for (m in g) {
          a[m] = g[m];
        }return a;
      };a.merge = function () {
        var m,
            g = arguments,
            k,
            q = {},
            v = function v(g, h) {
          "object" !== (typeof g === "undefined" ? "undefined" : _typeof(g)) && (g = {});a.objectEach(h, function (e, n) {
            !a.isObject(e, !0) || a.isClass(e) || a.isDOMElement(e) ? g[n] = h[n] : g[n] = v(g[n] || {}, e);
          });return g;
        };!0 === g[0] && (q = g[1], g = Array.prototype.slice.call(g, 2));k = g.length;for (m = 0; m < k; m++) {
          q = v(q, g[m]);
        }return q;
      };a.pInt = function (a, g) {
        return parseInt(a, g || 10);
      };a.isString = function (a) {
        return "string" === typeof a;
      };a.isArray = function (a) {
        a = Object.prototype.toString.call(a);return "[object Array]" === a || "[object Array Iterator]" === a;
      };a.isObject = function (m, g) {
        return !!m && "object" === (typeof m === "undefined" ? "undefined" : _typeof(m)) && (!g || !a.isArray(m));
      };a.isDOMElement = function (m) {
        return a.isObject(m) && "number" === typeof m.nodeType;
      };a.isClass = function (m) {
        var g = m && m.constructor;return !(!a.isObject(m, !0) || a.isDOMElement(m) || !g || !g.name || "Object" === g.name);
      };a.isNumber = function (a) {
        return "number" === typeof a && !isNaN(a);
      };a.erase = function (a, g) {
        for (var m = a.length; m--;) {
          if (a[m] === g) {
            a.splice(m, 1);break;
          }
        }
      };a.defined = function (a) {
        return void 0 !== a && null !== a;
      };a.attr = function (m, g, k) {
        var q;a.isString(g) ? a.defined(k) ? m.setAttribute(g, k) : m && m.getAttribute && (q = m.getAttribute(g)) : a.defined(g) && a.isObject(g) && a.objectEach(g, function (a, g) {
          m.setAttribute(g, a);
        });return q;
      };a.splat = function (m) {
        return a.isArray(m) ? m : [m];
      };a.syncTimeout = function (a, g, k) {
        if (g) return setTimeout(a, g, k);a.call(0, k);
      };a.pick = function () {
        var a = arguments,
            g,
            k,
            q = a.length;for (g = 0; g < q; g++) {
          if (k = a[g], void 0 !== k && null !== k) return k;
        }
      };a.css = function (m, g) {
        a.isMS && !a.svg && g && void 0 !== g.opacity && (g.filter = "alpha(opacity\x3d" + 100 * g.opacity + ")");a.extend(m.style, g);
      };a.createElement = function (m, g, k, q, v) {
        m = G.createElement(m);var u = a.css;g && a.extend(m, g);v && u(m, { padding: 0, border: "none", margin: 0 });k && u(m, k);q && q.appendChild(m);return m;
      };a.extendClass = function (m, g) {
        var k = function k() {};k.prototype = new m();a.extend(k.prototype, g);return k;
      };a.pad = function (a, g, k) {
        return Array((g || 2) + 1 - String(a).length).join(k || 0) + a;
      };a.relativeLength = function (a, g) {
        return (/%$/.test(a) ? g * parseFloat(a) / 100 : parseFloat(a)
        );
      };a.wrap = function (a, g, k) {
        var q = a[g];a[g] = function () {
          var a = Array.prototype.slice.call(arguments),
              g = arguments,
              h = this;h.proceed = function () {
            q.apply(h, arguments.length ? arguments : g);
          };a.unshift(q);a = k.apply(this, a);h.proceed = null;return a;
        };
      };a.getTZOffset = function (m) {
        var g = a.Date;return 6E4 * (g.hcGetTimezoneOffset && g.hcGetTimezoneOffset(m) || g.hcTimezoneOffset || 0);
      };a.dateFormat = function (m, g, k) {
        if (!a.defined(g) || isNaN(g)) return a.defaultOptions.lang.invalidDate || "";m = a.pick(m, "%Y-%m-%d %H:%M:%S");var q = a.Date,
            v = new q(g - a.getTZOffset(g)),
            u = v[q.hcGetHours](),
            h = v[q.hcGetDay](),
            e = v[q.hcGetDate](),
            n = v[q.hcGetMonth](),
            d = v[q.hcGetFullYear](),
            c = a.defaultOptions.lang,
            w = c.weekdays,
            b = c.shortWeekdays,
            y = a.pad,
            q = a.extend({ a: b ? b[h] : w[h].substr(0, 3), A: w[h], d: y(e), e: y(e, 2, " "), w: h, b: c.shortMonths[n], B: c.months[n], m: y(n + 1), y: d.toString().substr(2, 2), Y: d, H: y(u), k: u, I: y(u % 12 || 12), l: u % 12 || 12, M: y(v[q.hcGetMinutes]()), p: 12 > u ? "AM" : "PM", P: 12 > u ? "am" : "pm", S: y(v.getSeconds()), L: y(Math.round(g % 1E3), 3) }, a.dateFormats);a.objectEach(q, function (a, b) {
          for (; -1 !== m.indexOf("%" + b);) {
            m = m.replace("%" + b, "function" === typeof a ? a(g) : a);
          }
        });return k ? m.substr(0, 1).toUpperCase() + m.substr(1) : m;
      };a.formatSingle = function (m, g) {
        var k = /\.([0-9])/,
            q = a.defaultOptions.lang;/f$/.test(m) ? (k = (k = m.match(k)) ? k[1] : -1, null !== g && (g = a.numberFormat(g, k, q.decimalPoint, -1 < m.indexOf(",") ? q.thousandsSep : ""))) : g = a.dateFormat(m, g);return g;
      };a.format = function (m, g) {
        for (var k = "{", q = !1, v, u, h, e, n = [], d; m;) {
          k = m.indexOf(k);if (-1 === k) break;v = m.slice(0, k);if (q) {
            v = v.split(":");u = v.shift().split(".");e = u.length;d = g;for (h = 0; h < e; h++) {
              d = d[u[h]];
            }v.length && (d = a.formatSingle(v.join(":"), d));n.push(d);
          } else n.push(v);
          m = m.slice(k + 1);k = (q = !q) ? "}" : "{";
        }n.push(m);return n.join("");
      };a.getMagnitude = function (a) {
        return Math.pow(10, Math.floor(Math.log(a) / Math.LN10));
      };a.normalizeTickInterval = function (m, g, k, q, v) {
        var u,
            h = m;k = a.pick(k, 1);u = m / k;g || (g = v ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === q && (1 === k ? g = a.grep(g, function (a) {
          return 0 === a % 1;
        }) : .1 >= k && (g = [1 / k])));for (q = 0; q < g.length && !(h = g[q], v && h * k >= m || !v && u <= (g[q] + (g[q + 1] || g[q])) / 2); q++) {}return h = a.correctFloat(h * k, -Math.round(Math.log(.001) / Math.LN10));
      };a.stableSort = function (a, g) {
        var k = a.length,
            q,
            m;for (m = 0; m < k; m++) {
          a[m].safeI = m;
        }a.sort(function (a, h) {
          q = g(a, h);return 0 === q ? a.safeI - h.safeI : q;
        });for (m = 0; m < k; m++) {
          delete a[m].safeI;
        }
      };a.arrayMin = function (a) {
        for (var g = a.length, k = a[0]; g--;) {
          a[g] < k && (k = a[g]);
        }return k;
      };a.arrayMax = function (a) {
        for (var g = a.length, k = a[0]; g--;) {
          a[g] > k && (k = a[g]);
        }return k;
      };a.destroyObjectProperties = function (m, g) {
        a.objectEach(m, function (a, q) {
          a && a !== g && a.destroy && a.destroy();delete m[q];
        });
      };a.discardElement = function (m) {
        var g = a.garbageBin;g || (g = a.createElement("div"));
        m && g.appendChild(m);g.innerHTML = "";
      };a.correctFloat = function (a, g) {
        return parseFloat(a.toPrecision(g || 14));
      };a.setAnimation = function (m, g) {
        g.renderer.globalAnimation = a.pick(m, g.options.chart.animation, !0);
      };a.animObject = function (m) {
        return a.isObject(m) ? a.merge(m) : { duration: m ? 500 : 0 };
      };a.timeUnits = { millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5, month: 24192E5, year: 314496E5 };a.numberFormat = function (m, g, k, q) {
        m = +m || 0;g = +g;var v = a.defaultOptions.lang,
            u = (m.toString().split(".")[1] || "").length,
            h,
            e;-1 === g ? g = Math.min(u, 20) : a.isNumber(g) || (g = 2);e = (Math.abs(m) + Math.pow(10, -Math.max(g, u) - 1)).toFixed(g);u = String(a.pInt(e));h = 3 < u.length ? u.length % 3 : 0;k = a.pick(k, v.decimalPoint);q = a.pick(q, v.thousandsSep);m = (0 > m ? "-" : "") + (h ? u.substr(0, h) + q : "");m += u.substr(h).replace(/(\d{3})(?=\d)/g, "$1" + q);g && (m += k + e.slice(-g));return m;
      };Math.easeInOutSine = function (a) {
        return -.5 * (Math.cos(Math.PI * a) - 1);
      };a.getStyle = function (m, g, k) {
        if ("width" === g) return Math.min(m.offsetWidth, m.scrollWidth) - a.getStyle(m, "padding-left") - a.getStyle(m, "padding-right");if ("height" === g) return Math.min(m.offsetHeight, m.scrollHeight) - a.getStyle(m, "padding-top") - a.getStyle(m, "padding-bottom");if (m = F.getComputedStyle(m, void 0)) m = m.getPropertyValue(g), a.pick(k, !0) && (m = a.pInt(m));return m;
      };a.inArray = function (a, g) {
        return g.indexOf ? g.indexOf(a) : [].indexOf.call(g, a);
      };a.grep = function (a, g) {
        return [].filter.call(a, g);
      };a.find = function (a, g) {
        return [].find.call(a, g);
      };a.map = function (a, g) {
        for (var k = [], q = 0, m = a.length; q < m; q++) {
          k[q] = g.call(a[q], a[q], q, a);
        }return k;
      };a.offset = function (a) {
        var g = G.documentElement;a = a.getBoundingClientRect();return { top: a.top + (F.pageYOffset || g.scrollTop) - (g.clientTop || 0), left: a.left + (F.pageXOffset || g.scrollLeft) - (g.clientLeft || 0) };
      };a.stop = function (a, g) {
        for (var k = C.length; k--;) {
          C[k].elem !== a || g && g !== C[k].prop || (C[k].stopped = !0);
        }
      };a.each = function (a, g, k) {
        return Array.prototype.forEach.call(a, g, k);
      };a.objectEach = function (a, g, k) {
        for (var q in a) {
          a.hasOwnProperty(q) && g.call(k, a[q], q, a);
        }
      };a.addEvent = function (m, g, k) {
        function q(a) {
          a.target = a.srcElement || F;k.call(m, a);
        }var v = m.hcEvents = m.hcEvents || {};m.addEventListener ? m.addEventListener(g, k, !1) : m.attachEvent && (m.hcEventsIE || (m.hcEventsIE = {}), m.hcEventsIE[k.toString()] = q, m.attachEvent("on" + g, q));v[g] || (v[g] = []);v[g].push(k);return function () {
          a.removeEvent(m, g, k);
        };
      };a.removeEvent = function (m, g, k) {
        function q(a, d) {
          m.removeEventListener ? m.removeEventListener(a, d, !1) : m.attachEvent && (d = m.hcEventsIE[d.toString()], m.detachEvent("on" + a, d));
        }function v() {
          var e, d;m.nodeName && (g ? (e = {}, e[g] = !0) : e = h, a.objectEach(e, function (a, e) {
            if (h[e]) for (d = h[e].length; d--;) {
              q(e, h[e][d]);
            }
          }));
        }var u,
            h = m.hcEvents,
            e;h && (g ? (u = h[g] || [], k ? (e = a.inArray(k, u), -1 < e && (u.splice(e, 1), h[g] = u), q(g, k)) : (v(), h[g] = [])) : (v(), m.hcEvents = {}));
      };a.fireEvent = function (m, g, k, q) {
        var v;v = m.hcEvents;var u, h;k = k || {};if (G.createEvent && (m.dispatchEvent || m.fireEvent)) v = G.createEvent("Events"), v.initEvent(g, !0, !0), a.extend(v, k), m.dispatchEvent ? m.dispatchEvent(v) : m.fireEvent(g, v);else if (v) for (v = v[g] || [], u = v.length, k.target || a.extend(k, { preventDefault: function preventDefault() {
            k.defaultPrevented = !0;
          }, target: m, type: g }), g = 0; g < u; g++) {
          (h = v[g]) && !1 === h.call(m, k) && k.preventDefault();
        }q && !k.defaultPrevented && q(k);
      };a.animate = function (m, g, k) {
        var q,
            v = "",
            u,
            h,
            e;a.isObject(k) || (e = arguments, k = { duration: e[2], easing: e[3], complete: e[4] });a.isNumber(k.duration) || (k.duration = 400);k.easing = "function" === typeof k.easing ? k.easing : Math[k.easing] || Math.easeInOutSine;k.curAnim = a.merge(g);a.objectEach(g, function (e, d) {
          a.stop(m, d);h = new a.Fx(m, k, d);u = null;"d" === d ? (h.paths = h.initPath(m, m.d, g.d), h.toD = g.d, q = 0, u = 1) : m.attr ? q = m.attr(d) : (q = parseFloat(a.getStyle(m, d)) || 0, "opacity" !== d && (v = "px"));u || (u = e);u && u.match && u.match("px") && (u = u.replace(/px/g, ""));h.run(q, u, v);
        });
      };a.seriesType = function (m, g, k, q, v) {
        var u = a.getOptions(),
            h = a.seriesTypes;if (h[m]) return a.error(27);u.plotOptions[m] = a.merge(u.plotOptions[g], k);h[m] = a.extendClass(h[g] || function () {}, q);h[m].prototype.type = m;v && (h[m].prototype.pointClass = a.extendClass(a.Point, v));return h[m];
      };a.uniqueKey = function () {
        var a = Math.random().toString(36).substring(2, 9),
            g = 0;return function () {
          return "highcharts-" + a + "-" + g++;
        };
      }();F.jQuery && (F.jQuery.fn.highcharts = function () {
        var m = [].slice.call(arguments);if (this[0]) return m[0] ? (new a[a.isString(m[0]) ? m.shift() : "Chart"](this[0], m[0], m[1]), this) : A[a.attr(this[0], "data-highcharts-chart")];
      });G && !G.defaultView && (a.getStyle = function (m, g) {
        var k = { width: "clientWidth", height: "clientHeight" }[g];if (m.style[g]) return a.pInt(m.style[g]);"opacity" === g && (g = "filter");if (k) return m.style.zoom = 1, Math.max(m[k] - 2 * a.getStyle(m, "padding"), 0);m = m.currentStyle[g.replace(/\-(\w)/g, function (a, g) {
          return g.toUpperCase();
        })];"filter" === g && (m = m.replace(/alpha\(opacity=([0-9]+)\)/, function (a, g) {
          return g / 100;
        }));return "" === m ? 1 : a.pInt(m);
      });Array.prototype.forEach || (a.each = function (a, g, k) {
        for (var q = 0, m = a.length; q < m; q++) {
          if (!1 === g.call(k, a[q], q, a)) return q;
        }
      });Array.prototype.indexOf || (a.inArray = function (a, g) {
        var k,
            q = 0;if (g) for (k = g.length; q < k; q++) {
          if (g[q] === a) return q;
        }return -1;
      });Array.prototype.filter || (a.grep = function (a, g) {
        for (var k = [], q = 0, m = a.length; q < m; q++) {
          g(a[q], q) && k.push(a[q]);
        }return k;
      });
      Array.prototype.find || (a.find = function (a, g) {
        var k,
            q = a.length;for (k = 0; k < q; k++) {
          if (g(a[k], k)) return a[k];
        }
      });
    })(K);(function (a) {
      var C = a.each,
          A = a.isNumber,
          G = a.map,
          F = a.merge,
          m = a.pInt;a.Color = function (g) {
        if (!(this instanceof a.Color)) return new a.Color(g);this.init(g);
      };a.Color.prototype = { parsers: [{ regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/, parse: function parse(a) {
            return [m(a[1]), m(a[2]), m(a[3]), parseFloat(a[4], 10)];
          } }, { regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
          parse: function parse(a) {
            return [m(a[1]), m(a[2]), m(a[3]), 1];
          } }], names: { none: "rgba(255,255,255,0)", white: "#ffffff", black: "#000000" }, init: function init(g) {
          var k, q, m, u;if ((this.input = g = this.names[g && g.toLowerCase ? g.toLowerCase() : ""] || g) && g.stops) this.stops = G(g.stops, function (h) {
            return new a.Color(h[1]);
          });else if (g && "#" === g[0] && (k = g.length, g = parseInt(g.substr(1), 16), 7 === k ? q = [(g & 16711680) >> 16, (g & 65280) >> 8, g & 255, 1] : 4 === k && (q = [(g & 3840) >> 4 | (g & 3840) >> 8, (g & 240) >> 4 | g & 240, (g & 15) << 4 | g & 15, 1])), !q) for (m = this.parsers.length; m-- && !q;) {
            u = this.parsers[m], (k = u.regex.exec(g)) && (q = u.parse(k));
          }this.rgba = q || [];
        }, get: function get(a) {
          var g = this.input,
              q = this.rgba,
              m;this.stops ? (m = F(g), m.stops = [].concat(m.stops), C(this.stops, function (g, h) {
            m.stops[h] = [m.stops[h][0], g.get(a)];
          })) : m = q && A(q[0]) ? "rgb" === a || !a && 1 === q[3] ? "rgb(" + q[0] + "," + q[1] + "," + q[2] + ")" : "a" === a ? q[3] : "rgba(" + q.join(",") + ")" : g;return m;
        }, brighten: function brighten(a) {
          var g,
              q = this.rgba;if (this.stops) C(this.stops, function (g) {
            g.brighten(a);
          });else if (A(a) && 0 !== a) for (g = 0; 3 > g; g++) {
            q[g] += m(255 * a), 0 > q[g] && (q[g] = 0), 255 < q[g] && (q[g] = 255);
          }return this;
        }, setOpacity: function setOpacity(a) {
          this.rgba[3] = a;return this;
        }, tweenTo: function tweenTo(a, k) {
          var g, m;a.rgba.length ? (g = this.rgba, a = a.rgba, m = 1 !== a[3] || 1 !== g[3], a = (m ? "rgba(" : "rgb(") + Math.round(a[0] + (g[0] - a[0]) * (1 - k)) + "," + Math.round(a[1] + (g[1] - a[1]) * (1 - k)) + "," + Math.round(a[2] + (g[2] - a[2]) * (1 - k)) + (m ? "," + (a[3] + (g[3] - a[3]) * (1 - k)) : "") + ")") : a = a.input || "none";return a;
        } };a.color = function (g) {
        return new a.Color(g);
      };
    })(K);(function (a) {
      var C,
          A,
          G = a.addEvent,
          F = a.animate,
          m = a.attr,
          g = a.charts,
          k = a.color,
          q = a.css,
          v = a.createElement,
          u = a.defined,
          h = a.deg2rad,
          e = a.destroyObjectProperties,
          n = a.doc,
          d = a.each,
          c = a.extend,
          w = a.erase,
          b = a.grep,
          y = a.hasTouch,
          D = a.inArray,
          H = a.isArray,
          l = a.isFirefox,
          B = a.isMS,
          r = a.isObject,
          z = a.isString,
          M = a.isWebKit,
          p = a.merge,
          E = a.noop,
          I = a.objectEach,
          L = a.pick,
          f = a.pInt,
          t = a.removeEvent,
          R = a.stop,
          J = a.svg,
          N = a.SVG_NS,
          O = a.symbolSizes,
          P = a.win;C = a.SVGElement = function () {
        return this;
      };c(C.prototype, { opacity: 1, SVG_NS: N, textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
        init: function init(a, f) {
          this.element = "span" === f ? v(f) : n.createElementNS(this.SVG_NS, f);this.renderer = a;
        }, animate: function animate(x, f, t) {
          f = a.animObject(L(f, this.renderer.globalAnimation, !0));0 !== f.duration ? (t && (f.complete = t), F(this, x, f)) : (this.attr(x, null, t), f.step && f.step.call(this));return this;
        }, colorGradient: function colorGradient(x, f, t) {
          var b = this.renderer,
              l,
              c,
              r,
              Q,
              e,
              h,
              n,
              y,
              E,
              w,
              J = [],
              B;x.radialGradient ? c = "radialGradient" : x.linearGradient && (c = "linearGradient");c && (r = x[c], e = b.gradients, n = x.stops, w = t.radialReference, H(r) && (x[c] = r = { x1: r[0], y1: r[1], x2: r[2], y2: r[3], gradientUnits: "userSpaceOnUse" }), "radialGradient" === c && w && !u(r.gradientUnits) && (Q = r, r = p(r, b.getRadialAttr(w, Q), { gradientUnits: "userSpaceOnUse" })), I(r, function (a, x) {
            "id" !== x && J.push(x, a);
          }), I(n, function (a) {
            J.push(a);
          }), J = J.join(","), e[J] ? w = e[J].attr("id") : (r.id = w = a.uniqueKey(), e[J] = h = b.createElement(c).attr(r).add(b.defs), h.radAttr = Q, h.stops = [], d(n, function (x) {
            0 === x[1].indexOf("rgba") ? (l = a.color(x[1]), y = l.get("rgb"), E = l.get("a")) : (y = x[1], E = 1);x = b.createElement("stop").attr({ offset: x[0],
              "stop-color": y, "stop-opacity": E }).add(h);h.stops.push(x);
          })), B = "url(" + b.url + "#" + w + ")", t.setAttribute(f, B), t.gradient = J, x.toString = function () {
            return B;
          });
        }, applyTextOutline: function applyTextOutline(x) {
          var f = this.element,
              t,
              b,
              l,
              c,
              r;-1 !== x.indexOf("contrast") && (x = x.replace(/contrast/g, this.renderer.getContrast(f.style.fill)));x = x.split(" ");b = x[x.length - 1];if ((l = x[0]) && "none" !== l && a.svg) {
            this.fakeTS = !0;x = [].slice.call(f.getElementsByTagName("tspan"));this.ySetter = this.xSetter;l = l.replace(/(^[\d\.]+)(.*?)$/g, function (a, x, f) {
              return 2 * x + f;
            });for (r = x.length; r--;) {
              t = x[r], "highcharts-text-outline" === t.getAttribute("class") && w(x, f.removeChild(t));
            }c = f.firstChild;d(x, function (a, x) {
              0 === x && (a.setAttribute("x", f.getAttribute("x")), x = f.getAttribute("y"), a.setAttribute("y", x || 0), null === x && f.setAttribute("y", 0));a = a.cloneNode(1);m(a, { "class": "highcharts-text-outline", fill: b, stroke: b, "stroke-width": l, "stroke-linejoin": "round" });f.insertBefore(a, c);
            });
          }
        }, attr: function attr(a, f, t, b) {
          var x,
              l = this.element,
              c,
              r = this,
              d,
              p;"string" === typeof a && void 0 !== f && (x = a, a = {}, a[x] = f);"string" === typeof a ? r = (this[a + "Getter"] || this._defaultGetter).call(this, a, l) : (I(a, function (x, f) {
            d = !1;b || R(this, f);this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(f) && (c || (this.symbolAttr(a), c = !0), d = !0);!this.rotation || "x" !== f && "y" !== f || (this.doTransform = !0);d || (p = this[f + "Setter"] || this._defaultSetter, p.call(this, x, f, l), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(f) && this.updateShadows(f, x, p));
          }, this), this.afterSetters());
          t && t();return r;
        }, afterSetters: function afterSetters() {
          this.doTransform && (this.updateTransform(), this.doTransform = !1);
        }, updateShadows: function updateShadows(a, f, t) {
          for (var x = this.shadows, b = x.length; b--;) {
            t.call(x[b], "height" === a ? Math.max(f - (x[b].cutHeight || 0), 0) : "d" === a ? this.d : f, a, x[b]);
          }
        }, addClass: function addClass(a, f) {
          var x = this.attr("class") || "";-1 === x.indexOf(a) && (f || (a = (x + (x ? " " : "") + a).replace("  ", " ")), this.attr("class", a));return this;
        }, hasClass: function hasClass(a) {
          return -1 !== m(this.element, "class").indexOf(a);
        }, removeClass: function removeClass(a) {
          m(this.element, "class", (m(this.element, "class") || "").replace(a, ""));return this;
        }, symbolAttr: function symbolAttr(a) {
          var x = this;d("x y r start end width height innerR anchorX anchorY".split(" "), function (f) {
            x[f] = L(a[f], x[f]);
          });x.attr({ d: x.renderer.symbols[x.symbolName](x.x, x.y, x.width, x.height, x) });
        }, clip: function clip(a) {
          return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none");
        }, crisp: function crisp(a, f) {
          var x = this,
              t = {},
              b;f = f || a.strokeWidth || 0;b = Math.round(f) % 2 / 2;a.x = Math.floor(a.x || x.x || 0) + b;a.y = Math.floor(a.y || x.y || 0) + b;a.width = Math.floor((a.width || x.width || 0) - 2 * b);a.height = Math.floor((a.height || x.height || 0) - 2 * b);u(a.strokeWidth) && (a.strokeWidth = f);I(a, function (a, f) {
            x[f] !== a && (x[f] = t[f] = a);
          });return t;
        }, css: function css(a) {
          var x = this.styles,
              t = {},
              b = this.element,
              l,
              r = "",
              d,
              p = !x,
              e = ["textOutline", "textOverflow", "width"];a && a.color && (a.fill = a.color);x && I(a, function (a, f) {
            a !== x[f] && (t[f] = a, p = !0);
          });p && (x && (a = c(x, t)), l = this.textWidth = a && a.width && "auto" !== a.width && "text" === b.nodeName.toLowerCase() && f(a.width), this.styles = a, l && !J && this.renderer.forExport && delete a.width, B && !J ? q(this.element, a) : (d = function d(a, x) {
            return "-" + x.toLowerCase();
          }, I(a, function (a, x) {
            -1 === D(x, e) && (r += x.replace(/([A-Z])/g, d) + ":" + a + ";");
          }), r && m(b, "style", r)), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));return this;
        }, strokeWidth: function strokeWidth() {
          return this["stroke-width"] || 0;
        }, on: function on(a, f) {
          var x = this,
              t = x.element;y && "click" === a ? (t.ontouchstart = function (a) {
            x.touchEventFired = Date.now();a.preventDefault();f.call(t, a);
          }, t.onclick = function (a) {
            (-1 === P.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (x.touchEventFired || 0)) && f.call(t, a);
          }) : t["on" + a] = f;return this;
        }, setRadialReference: function setRadialReference(a) {
          var x = this.renderer.gradients[this.element.gradient];this.element.radialReference = a;x && x.radAttr && x.animate(this.renderer.getRadialAttr(a, x.radAttr));return this;
        }, translate: function translate(a, f) {
          return this.attr({ translateX: a, translateY: f });
        }, invert: function invert(a) {
          this.inverted = a;this.updateTransform();
          return this;
        }, updateTransform: function updateTransform() {
          var a = this.translateX || 0,
              f = this.translateY || 0,
              t = this.scaleX,
              b = this.scaleY,
              l = this.inverted,
              c = this.rotation,
              r = this.element;l && (a += this.width, f += this.height);a = ["translate(" + a + "," + f + ")"];l ? a.push("rotate(90) scale(-1,1)") : c && a.push("rotate(" + c + " " + (r.getAttribute("x") || 0) + " " + (r.getAttribute("y") || 0) + ")");(u(t) || u(b)) && a.push("scale(" + L(t, 1) + " " + L(b, 1) + ")");a.length && r.setAttribute("transform", a.join(" "));
        }, toFront: function toFront() {
          var a = this.element;a.parentNode.appendChild(a);
          return this;
        }, align: function align(a, f, t) {
          var x,
              b,
              l,
              c,
              r = {};b = this.renderer;l = b.alignedObjects;var d, p;if (a) {
            if (this.alignOptions = a, this.alignByTranslate = f, !t || z(t)) this.alignTo = x = t || "renderer", w(l, this), l.push(this), t = null;
          } else a = this.alignOptions, f = this.alignByTranslate, x = this.alignTo;t = L(t, b[x], b);x = a.align;b = a.verticalAlign;l = (t.x || 0) + (a.x || 0);c = (t.y || 0) + (a.y || 0);"right" === x ? d = 1 : "center" === x && (d = 2);d && (l += (t.width - (a.width || 0)) / d);r[f ? "translateX" : "x"] = Math.round(l);"bottom" === b ? p = 1 : "middle" === b && (p = 2);p && (c += (t.height - (a.height || 0)) / p);r[f ? "translateY" : "y"] = Math.round(c);this[this.placed ? "animate" : "attr"](r);this.placed = !0;this.alignAttr = r;return this;
        }, getBBox: function getBBox(a, f) {
          var x,
              t = this.renderer,
              b,
              l = this.element,
              r = this.styles,
              p,
              e = this.textStr,
              n,
              Q = t.cache,
              y = t.cacheKeys,
              E;f = L(f, this.rotation);b = f * h;p = r && r.fontSize;void 0 !== e && (E = e.toString(), -1 === E.indexOf("\x3c") && (E = E.replace(/[0-9]/g, "0")), E += ["", f || 0, p, r && r.width, r && r.textOverflow].join());E && !a && (x = Q[E]);if (!x) {
            if (l.namespaceURI === this.SVG_NS || t.forExport) {
              try {
                (n = this.fakeTS && function (a) {
                  d(l.querySelectorAll(".highcharts-text-outline"), function (x) {
                    x.style.display = a;
                  });
                }) && n("none"), x = l.getBBox ? c({}, l.getBBox()) : { width: l.offsetWidth, height: l.offsetHeight }, n && n("");
              } catch (X) {}if (!x || 0 > x.width) x = { width: 0, height: 0 };
            } else x = this.htmlGetBBox();t.isSVG && (a = x.width, t = x.height, r && "11px" === r.fontSize && 17 === Math.round(t) && (x.height = t = 14), f && (x.width = Math.abs(t * Math.sin(b)) + Math.abs(a * Math.cos(b)), x.height = Math.abs(t * Math.cos(b)) + Math.abs(a * Math.sin(b))));
            if (E && 0 < x.height) {
              for (; 250 < y.length;) {
                delete Q[y.shift()];
              }Q[E] || y.push(E);Q[E] = x;
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
              f = this.element,
              t;a && (this.parentGroup = a);this.parentInverted = a && a.inverted;void 0 !== this.textStr && x.buildText(this);this.added = !0;if (!a || a.handleZ || this.zIndex) t = this.zIndexSetter();t || (a ? a.element : x.box).appendChild(f);if (this.onAdd) this.onAdd();return this;
        }, safeRemoveChild: function safeRemoveChild(a) {
          var x = a.parentNode;x && x.removeChild(a);
        }, destroy: function destroy() {
          var a = this,
              f = a.element || {},
              t = a.renderer.isSVG && "SPAN" === f.nodeName && a.parentGroup,
              b = f.ownerSVGElement;f.onclick = f.onmouseout = f.onmouseover = f.onmousemove = f.point = null;R(a);a.clipPath && b && (d(b.querySelectorAll("[clip-path]"), function (x) {
            -1 < x.getAttribute("clip-path").indexOf(a.clipPath.element.id + ")") && x.removeAttribute("clip-path");
          }), a.clipPath = a.clipPath.destroy());if (a.stops) {
            for (b = 0; b < a.stops.length; b++) {
              a.stops[b] = a.stops[b].destroy();
            }a.stops = null;
          }a.safeRemoveChild(f);for (a.destroyShadows(); t && t.div && 0 === t.div.childNodes.length;) {
            f = t.parentGroup, a.safeRemoveChild(t.div), delete t.div, t = f;
          }a.alignTo && w(a.renderer.alignedObjects, a);I(a, function (x, f) {
            delete a[f];
          });return null;
        }, shadow: function shadow(a, f, t) {
          var x = [],
              b,
              l,
              c = this.element,
              r,
              d,
              p,
              e;if (!a) this.destroyShadows();else if (!this.shadows) {
            d = L(a.width, 3);p = (a.opacity || .15) / d;e = this.parentInverted ? "(-1,-1)" : "(" + L(a.offsetX, 1) + ", " + L(a.offsetY, 1) + ")";for (b = 1; b <= d; b++) {
              l = c.cloneNode(0), r = 2 * d + 1 - 2 * b, m(l, { isShadow: "true", stroke: a.color || "#000000", "stroke-opacity": p * b, "stroke-width": r, transform: "translate" + e, fill: "none" }), t && (m(l, "height", Math.max(m(l, "height") - r, 0)), l.cutHeight = r), f ? f.element.appendChild(l) : c.parentNode.insertBefore(l, c), x.push(l);
            }this.shadows = x;
          }return this;
        }, destroyShadows: function destroyShadows() {
          d(this.shadows || [], function (a) {
            this.safeRemoveChild(a);
          }, this);this.shadows = void 0;
        }, xGetter: function xGetter(a) {
          "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));return this._defaultGetter(a);
        }, _defaultGetter: function _defaultGetter(a) {
          a = L(this[a], this.element ? this.element.getAttribute(a) : null, 0);/^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));return a;
        }, dSetter: function dSetter(a, f, t) {
          a && a.join && (a = a.join(" "));/(NaN| {2}|^$)/.test(a) && (a = "M 0 0");t.setAttribute(f, a);this[f] = a;
        }, dashstyleSetter: function dashstyleSetter(a) {
          var x,
              t = this["stroke-width"];"inherit" === t && (t = 1);if (a = a && a.toLowerCase()) {
            a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");for (x = a.length; x--;) {
              a[x] = f(a[x]) * t;
            }a = a.join(",").replace(/NaN/g, "none");this.element.setAttribute("stroke-dasharray", a);
          }
        }, alignSetter: function alignSetter(a) {
          this.element.setAttribute("text-anchor", { left: "start", center: "middle", right: "end" }[a]);
        }, opacitySetter: function opacitySetter(a, f, t) {
          this[f] = a;t.setAttribute(f, a);
        }, titleSetter: function titleSetter(a) {
          var f = this.element.getElementsByTagName("title")[0];f || (f = n.createElementNS(this.SVG_NS, "title"), this.element.appendChild(f));f.firstChild && f.removeChild(f.firstChild);f.appendChild(n.createTextNode(String(L(a), "").replace(/<[^>]*>/g, "")));
        }, textSetter: function textSetter(a) {
          a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this));
        }, fillSetter: function fillSetter(a, f, t) {
          "string" === typeof a ? t.setAttribute(f, a) : a && this.colorGradient(a, f, t);
        },
        visibilitySetter: function visibilitySetter(a, f, t) {
          "inherit" === a ? t.removeAttribute(f) : t.setAttribute(f, a);
        }, zIndexSetter: function zIndexSetter(a, t) {
          var x = this.renderer,
              b = this.parentGroup,
              l = (b || x).element || x.box,
              c,
              r = this.element,
              d;c = this.added;var p;u(a) && (r.zIndex = a, a = +a, this[t] === a && (c = !1), this[t] = a);if (c) {
            (a = this.zIndex) && b && (b.handleZ = !0);t = l.childNodes;for (p = 0; p < t.length && !d; p++) {
              b = t[p], c = b.zIndex, b !== r && (f(c) > a || !u(a) && u(c) || 0 > a && !u(c) && l !== x.box) && (l.insertBefore(r, b), d = !0);
            }d || l.appendChild(r);
          }return d;
        }, _defaultSetter: function _defaultSetter(a, f, t) {
          t.setAttribute(f, a);
        } });C.prototype.yGetter = C.prototype.xGetter;C.prototype.translateXSetter = C.prototype.translateYSetter = C.prototype.rotationSetter = C.prototype.verticalAlignSetter = C.prototype.scaleXSetter = C.prototype.scaleYSetter = function (a, f) {
        this[f] = a;this.doTransform = !0;
      };C.prototype["stroke-widthSetter"] = C.prototype.strokeSetter = function (a, f, t) {
        this[f] = a;this.stroke && this["stroke-width"] ? (C.prototype.fillSetter.call(this, this.stroke, "stroke", t), t.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === f && 0 === a && this.hasStroke && (t.removeAttribute("stroke"), this.hasStroke = !1);
      };A = a.SVGRenderer = function () {
        this.init.apply(this, arguments);
      };c(A.prototype, { Element: C, SVG_NS: N, init: function init(a, f, t, b, c, r) {
          var x;b = this.createElement("svg").attr({ version: "1.1", "class": "highcharts-root" }).css(this.getStyle(b));x = b.element;a.appendChild(x);-1 === a.innerHTML.indexOf("xmlns") && m(x, "xmlns", this.SVG_NS);this.isSVG = !0;this.box = x;this.boxWrapper = b;this.alignedObjects = [];this.url = (l || M) && n.getElementsByTagName("base").length ? P.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";this.createElement("desc").add().element.appendChild(n.createTextNode("Created with Highcharts 5.0.12"));this.defs = this.createElement("defs").add();this.allowHTML = r;this.forExport = c;this.gradients = {};this.cache = {};this.cacheKeys = [];this.imgCount = 0;this.setSize(f, t, !1);var d;l && a.getBoundingClientRect && (f = function f() {
            q(a, { left: 0, top: 0 });d = a.getBoundingClientRect();
            q(a, { left: Math.ceil(d.left) - d.left + "px", top: Math.ceil(d.top) - d.top + "px" });
          }, f(), this.unSubPixelFix = G(P, "resize", f));
        }, getStyle: function getStyle(a) {
          return this.style = c({ fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: "12px" }, a);
        }, setStyle: function setStyle(a) {
          this.boxWrapper.css(this.getStyle(a));
        }, isHidden: function isHidden() {
          return !this.boxWrapper.getBBox().width;
        }, destroy: function destroy() {
          var a = this.defs;this.box = null;this.boxWrapper = this.boxWrapper.destroy();e(this.gradients || {});this.gradients = null;a && (this.defs = a.destroy());this.unSubPixelFix && this.unSubPixelFix();return this.alignedObjects = null;
        }, createElement: function createElement(a) {
          var f = new this.Element();f.init(this, a);return f;
        }, draw: E, getRadialAttr: function getRadialAttr(a, f) {
          return { cx: a[0] - a[2] / 2 + f.cx * a[2], cy: a[1] - a[2] / 2 + f.cy * a[2], r: f.r * a[2] };
        }, getSpanWidth: function getSpanWidth(a, f) {
          var t = a.getBBox(!0).width;!J && this.forExport && (t = this.measureSpanWidth(f.firstChild.data, a.styles));return t;
        }, applyEllipsis: function applyEllipsis(a, f, t, b) {
          var x = this.getSpanWidth(a, f),
              l = x > b,
              x = t,
              c,
              r = 0,
              d = t.length,
              p = function p(a) {
            f.removeChild(f.firstChild);a && f.appendChild(n.createTextNode(a));
          };if (l) {
            for (; r <= d;) {
              c = Math.ceil((r + d) / 2), x = t.substring(0, c) + "\u2026", p(x), x = this.getSpanWidth(a, f), r === d ? r = d + 1 : x > b ? d = c - 1 : r = c;
            }0 === d && p("");
          }return l;
        }, buildText: function buildText(a) {
          var t = a.element,
              x = this,
              l = x.forExport,
              c = L(a.textStr, "").toString(),
              r = -1 !== c.indexOf("\x3c"),
              p = t.childNodes,
              e,
              h,
              E,
              y,
              w = m(t, "x"),
              B = a.styles,
              g = a.textWidth,
              I = B && B.lineHeight,
              z = B && B.textOutline,
              D = B && "ellipsis" === B.textOverflow,
              k = B && "nowrap" === B.whiteSpace,
              u = B && B.fontSize,
              R,
              H,
              v = p.length,
              B = g && !a.added && this.box,
              M = function M(a) {
            var b;b = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : u || x.style.fontSize || 12;return I ? f(I) : x.fontMetrics(b, a.getAttribute("style") ? a : t).h;
          };R = [c, D, k, I, z, u, g].join();if (R !== a.textCache) {
            for (a.textCache = R; v--;) {
              t.removeChild(p[v]);
            }r || z || D || g || -1 !== c.indexOf(" ") ? (e = /<.*class="([^"]+)".*>/, h = /<.*style="([^"]+)".*>/, E = /<.*href="([^"]+)".*>/, B && B.appendChild(t), c = r ? c.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [c], c = b(c, function (a) {
              return "" !== a;
            }), d(c, function (f, b) {
              var c,
                  r = 0;f = f.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");c = f.split("|||");d(c, function (f) {
                if ("" !== f || 1 === c.length) {
                  var d = {},
                      p = n.createElementNS(x.SVG_NS, "tspan"),
                      B,
                      I;e.test(f) && (B = f.match(e)[1], m(p, "class", B));h.test(f) && (I = f.match(h)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), m(p, "style", I));E.test(f) && !l && (m(p, "onclick", 'location.href\x3d"' + f.match(E)[1] + '"'), q(p, { cursor: "pointer" }));f = (f.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e");if (" " !== f) {
                    p.appendChild(n.createTextNode(f));r ? d.dx = 0 : b && null !== w && (d.x = w);m(p, d);t.appendChild(p);!r && H && (!J && l && q(p, { display: "block" }), m(p, "dy", M(p)));if (g) {
                      d = f.replace(/([^\^])-/g, "$1- ").split(" ");B = 1 < c.length || b || 1 < d.length && !k;var z = [],
                          Q,
                          u = M(p),
                          R = a.rotation;for (D && (y = x.applyEllipsis(a, p, f, g)); !D && B && (d.length || z.length);) {
                        a.rotation = 0, Q = x.getSpanWidth(a, p), f = Q > g, void 0 === y && (y = f), f && 1 !== d.length ? (p.removeChild(p.firstChild), z.unshift(d.pop())) : (d = z, z = [], d.length && !k && (p = n.createElementNS(N, "tspan"), m(p, { dy: u, x: w }), I && m(p, "style", I), t.appendChild(p)), Q > g && (g = Q)), d.length && p.appendChild(n.createTextNode(d.join(" ").replace(/- /g, "-")));
                      }a.rotation = R;
                    }r++;
                  }
                }
              });H = H || t.childNodes.length;
            }), y && a.attr("title", a.textStr), B && B.removeChild(t), z && a.applyTextOutline && a.applyTextOutline(z)) : t.appendChild(n.createTextNode(c.replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")));
          }
        }, getContrast: function getContrast(a) {
          a = k(a).rgba;return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF";
        }, button: function button(a, f, t, b, l, r, d, e, h) {
          var x = this.label(a, f, t, h, null, null, null, null, "button"),
              n = 0;x.attr(p({ padding: 8, r: 2 }, l));var E, y, w, J;l = p({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1, style: { color: "#333333", cursor: "pointer", fontWeight: "normal" } }, l);E = l.style;delete l.style;r = p(l, { fill: "#e6e6e6" }, r);y = r.style;delete r.style;d = p(l, { fill: "#e6ebf5", style: { color: "#000000", fontWeight: "bold" } }, d);w = d.style;delete d.style;e = p(l, { style: { color: "#cccccc" } }, e);J = e.style;delete e.style;G(x.element, B ? "mouseover" : "mouseenter", function () {
            3 !== n && x.setState(1);
          });G(x.element, B ? "mouseout" : "mouseleave", function () {
            3 !== n && x.setState(n);
          });x.setState = function (a) {
            1 !== a && (x.state = n = a);x.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);x.attr([l, r, d, e][a || 0]).css([E, y, w, J][a || 0]);
          };x.attr(l).css(c({ cursor: "default" }, E));return x.on("click", function (a) {
            3 !== n && b.call(x, a);
          });
        }, crispLine: function crispLine(a, f) {
          a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - f % 2 / 2);a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + f % 2 / 2);return a;
        }, path: function path(a) {
          var f = { fill: "none" };H(a) ? f.d = a : r(a) && c(f, a);return this.createElement("path").attr(f);
        }, circle: function circle(a, f, t) {
          a = r(a) ? a : { x: a, y: f, r: t };f = this.createElement("circle");f.xSetter = f.ySetter = function (a, f, t) {
            t.setAttribute("c" + f, a);
          };return f.attr(a);
        }, arc: function arc(a, f, t, b, l, c) {
          r(a) ? (b = a, f = b.y, t = b.r, a = b.x) : b = { innerR: b, start: l, end: c };a = this.symbol("arc", a, f, t, t, b);a.r = t;return a;
        }, rect: function rect(a, f, t, b, l, c) {
          l = r(a) ? a.r : l;var x = this.createElement("rect");a = r(a) ? a : void 0 === a ? {} : { x: a, y: f, width: Math.max(t, 0), height: Math.max(b, 0) };void 0 !== c && (a.strokeWidth = c, a = x.crisp(a));a.fill = "none";l && (a.r = l);x.rSetter = function (a, f, t) {
            m(t, { rx: a, ry: a });
          };return x.attr(a);
        }, setSize: function setSize(a, f, t) {
          var b = this.alignedObjects,
              l = b.length;this.width = a;this.height = f;for (this.boxWrapper.animate({ width: a, height: f }, { step: function step() {
              this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") });
            }, duration: L(t, !0) ? void 0 : 0 }); l--;) {
            b[l].align();
          }
        }, g: function g(a) {
          var f = this.createElement("g");return a ? f.attr({ "class": "highcharts-" + a }) : f;
        }, image: function image(a, f, t, b, l) {
          var x = { preserveAspectRatio: "none" };1 < arguments.length && c(x, { x: f, y: t, width: b, height: l });x = this.createElement("image").attr(x);x.element.setAttributeNS ? x.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : x.element.setAttribute("hc-svg-href", a);return x;
        }, symbol: function symbol(a, f, t, b, l, r) {
          var x = this,
              p,
              e = /^url\((.*?)\)$/,
              h = e.test(a),
              E = !h && (this.symbols[a] ? a : "circle"),
              y = E && this.symbols[E],
              B = u(f) && y && y.call(this.symbols, Math.round(f), Math.round(t), b, l, r),
              w,
              J;y ? (p = this.path(B), p.attr("fill", "none"), c(p, { symbolName: E, x: f, y: t, width: b, height: l }), r && c(p, r)) : h && (w = a.match(e)[1], p = this.image(w), p.imgwidth = L(O[w] && O[w].width, r && r.width), p.imgheight = L(O[w] && O[w].height, r && r.height), J = function J() {
            p.attr({ width: p.width, height: p.height });
          }, d(["width", "height"], function (a) {
            p[a + "Setter"] = function (a, f) {
              var t = {},
                  b = this["img" + f],
                  l = "width" === f ? "translateX" : "translateY";this[f] = a;u(b) && (this.element && this.element.setAttribute(f, b), this.alignByTranslate || (t[l] = ((this[f] || 0) - b) / 2, this.attr(t)));
            };
          }), u(f) && p.attr({ x: f, y: t }), p.isImg = !0, u(p.imgwidth) && u(p.imgheight) ? J() : (p.attr({ width: 0, height: 0 }), v("img", { onload: function onload() {
              var a = g[x.chartIndex];0 === this.width && (q(this, { position: "absolute", top: "-999em" }), n.body.appendChild(this));O[w] = { width: this.width, height: this.height };p.imgwidth = this.width;p.imgheight = this.height;p.element && J();this.parentNode && this.parentNode.removeChild(this);x.imgCount--;if (!x.imgCount && a && a.onload) a.onload();
            }, src: w }), this.imgCount++));return p;
        }, symbols: { circle: function circle(a, f, t, b) {
            return this.arc(a + t / 2, f + b / 2, t / 2, b / 2, { start: 0, end: 2 * Math.PI, open: !1 });
          }, square: function square(a, f, t, b) {
            return ["M", a, f, "L", a + t, f, a + t, f + b, a, f + b, "Z"];
          }, triangle: function triangle(a, f, t, b) {
            return ["M", a + t / 2, f, "L", a + t, f + b, a, f + b, "Z"];
          }, "triangle-down": function triangleDown(a, f, t, b) {
            return ["M", a, f, "L", a + t, f, a + t / 2, f + b, "Z"];
          }, diamond: function diamond(a, f, t, b) {
            return ["M", a + t / 2, f, "L", a + t, f + b / 2, a + t / 2, f + b, a, f + b / 2, "Z"];
          }, arc: function arc(a, f, t, b, l) {
            var c = l.start,
                x = l.r || t,
                r = l.r || b || t,
                p = l.end - .001;t = l.innerR;b = l.open;var d = Math.cos(c),
                e = Math.sin(c),
                h = Math.cos(p),
                p = Math.sin(p);l = l.end - c < Math.PI ? 0 : 1;x = ["M", a + x * d, f + r * e, "A", x, r, 0, l, 1, a + x * h, f + r * p];u(t) && x.push(b ? "M" : "L", a + t * h, f + t * p, "A", t, t, 0, l, 0, a + t * d, f + t * e);x.push(b ? "" : "Z");return x;
          }, callout: function callout(a, f, t, b, l) {
            var c = Math.min(l && l.r || 0, t, b),
                r = c + 6,
                p = l && l.anchorX;l = l && l.anchorY;var d;d = ["M", a + c, f, "L", a + t - c, f, "C", a + t, f, a + t, f, a + t, f + c, "L", a + t, f + b - c, "C", a + t, f + b, a + t, f + b, a + t - c, f + b, "L", a + c, f + b, "C", a, f + b, a, f + b, a, f + b - c, "L", a, f + c, "C", a, f, a, f, a + c, f];p && p > t ? l > f + r && l < f + b - r ? d.splice(13, 3, "L", a + t, l - 6, a + t + 6, l, a + t, l + 6, a + t, f + b - c) : d.splice(13, 3, "L", a + t, b / 2, p, l, a + t, b / 2, a + t, f + b - c) : p && 0 > p ? l > f + r && l < f + b - r ? d.splice(33, 3, "L", a, l + 6, a - 6, l, a, l - 6, a, f + c) : d.splice(33, 3, "L", a, b / 2, p, l, a, b / 2, a, f + c) : l && l > b && p > a + r && p < a + t - r ? d.splice(23, 3, "L", p + 6, f + b, p, f + b + 6, p - 6, f + b, a + c, f + b) : l && 0 > l && p > a + r && p < a + t - r && d.splice(3, 3, "L", p - 6, f, p, f - 6, p + 6, f, t - c, f);return d;
          } },
        clipRect: function clipRect(f, t, b, l) {
          var c = a.uniqueKey(),
              r = this.createElement("clipPath").attr({ id: c }).add(this.defs);f = this.rect(f, t, b, l, 0).add(r);f.id = c;f.clipPath = r;f.count = 0;return f;
        }, text: function text(a, f, t, b) {
          var l = !J && this.forExport,
              c = {};if (b && (this.allowHTML || !this.forExport)) return this.html(a, f, t);c.x = Math.round(f || 0);t && (c.y = Math.round(t));if (a || 0 === a) c.text = a;a = this.createElement("text").attr(c);l && a.css({ position: "absolute" });b || (a.xSetter = function (a, f, t) {
            var b = t.getElementsByTagName("tspan"),
                l,
                c = t.getAttribute(f),
                r;for (r = 0; r < b.length; r++) {
              l = b[r], l.getAttribute(f) === c && l.setAttribute(f, a);
            }t.setAttribute(f, a);
          });return a;
        }, fontMetrics: function fontMetrics(a, t) {
          a = a || t && t.style && t.style.fontSize || this.style && this.style.fontSize;a = /px/.test(a) ? f(a) : /em/.test(a) ? parseFloat(a) * (t ? this.fontMetrics(null, t.parentNode).f : 16) : 12;t = 24 > a ? a + 3 : Math.round(1.2 * a);return { h: t, b: Math.round(.8 * t), f: a };
        }, rotCorr: function rotCorr(a, f, t) {
          var b = a;f && t && (b = Math.max(b * Math.cos(f * h), 4));return { x: -a / 3 * Math.sin(f * h), y: b };
        }, label: function label(f, b, l, r, e, h, n, E, y) {
          var x = this,
              B = x.g("button" !== y && "label"),
              w = B.text = x.text("", 0, 0, n).attr({ zIndex: 1 }),
              J,
              g,
              I = 0,
              z = 3,
              D = 0,
              q,
              k,
              m,
              R,
              H,
              v = {},
              N,
              M,
              L = /^url\((.*?)\)$/.test(r),
              Q = L,
              V,
              U,
              O,
              P;y && B.addClass("highcharts-" + y);Q = L;V = function V() {
            return (N || 0) % 2 / 2;
          };U = function U() {
            var a = w.element.style,
                f = {};g = (void 0 === q || void 0 === k || H) && u(w.textStr) && w.getBBox();B.width = (q || g.width || 0) + 2 * z + D;B.height = (k || g.height || 0) + 2 * z;M = z + x.fontMetrics(a && a.fontSize, w).b;Q && (J || (B.box = J = x.symbols[r] || L ? x.symbol(r) : x.rect(), J.addClass(("button" === y ? "" : "highcharts-label-box") + (y ? " highcharts-" + y + "-box" : "")), J.add(B), a = V(), f.x = a, f.y = (E ? -M : 0) + a), f.width = Math.round(B.width), f.height = Math.round(B.height), J.attr(c(f, v)), v = {});
          };O = function O() {
            var a = D + z,
                f;f = E ? 0 : M;u(q) && g && ("center" === H || "right" === H) && (a += { center: .5, right: 1 }[H] * (q - g.width));if (a !== w.x || f !== w.y) w.attr("x", a), void 0 !== f && w.attr("y", f);w.x = a;w.y = f;
          };P = function P(a, f) {
            J ? J.attr(a, f) : v[a] = f;
          };B.onAdd = function () {
            w.add(B);B.attr({ text: f || 0 === f ? f : "", x: b, y: l });J && u(e) && B.attr({ anchorX: e, anchorY: h });
          };
          B.widthSetter = function (f) {
            q = a.isNumber(f) ? f : null;
          };B.heightSetter = function (a) {
            k = a;
          };B["text-alignSetter"] = function (a) {
            H = a;
          };B.paddingSetter = function (a) {
            u(a) && a !== z && (z = B.padding = a, O());
          };B.paddingLeftSetter = function (a) {
            u(a) && a !== D && (D = a, O());
          };B.alignSetter = function (a) {
            a = { left: 0, center: .5, right: 1 }[a];a !== I && (I = a, g && B.attr({ x: m }));
          };B.textSetter = function (a) {
            void 0 !== a && w.textSetter(a);U();O();
          };B["stroke-widthSetter"] = function (a, f) {
            a && (Q = !0);N = this["stroke-width"] = a;P(f, a);
          };B.strokeSetter = B.fillSetter = B.rSetter = function (a, f) {
            "fill" === f && a && (Q = !0);P(f, a);
          };B.anchorXSetter = function (a, f) {
            e = B.anchorX = a;P(f, Math.round(a) - V() - m);
          };B.anchorYSetter = function (a, f) {
            h = B.anchorY = a;P(f, a - R);
          };B.xSetter = function (a) {
            B.x = a;I && (a -= I * ((q || g.width) + 2 * z));m = Math.round(a);B.attr("translateX", m);
          };B.ySetter = function (a) {
            R = B.y = Math.round(a);B.attr("translateY", R);
          };var W = B.css;return c(B, { css: function css(a) {
              if (a) {
                var f = {};a = p(a);d(B.textProps, function (t) {
                  void 0 !== a[t] && (f[t] = a[t], delete a[t]);
                });w.css(f);
              }return W.call(B, a);
            }, getBBox: function getBBox() {
              return { width: g.width + 2 * z, height: g.height + 2 * z, x: g.x - z, y: g.y - z };
            }, shadow: function shadow(a) {
              a && (U(), J && J.shadow(a));return B;
            }, destroy: function destroy() {
              t(B.element, "mouseenter");t(B.element, "mouseleave");w && (w = w.destroy());J && (J = J.destroy());C.prototype.destroy.call(B);B = x = U = O = P = null;
            } });
        } });a.Renderer = A;
    })(K);(function (a) {
      var C = a.attr,
          A = a.createElement,
          G = a.css,
          F = a.defined,
          m = a.each,
          g = a.extend,
          k = a.isFirefox,
          q = a.isMS,
          v = a.isWebKit,
          u = a.pInt,
          h = a.SVGRenderer,
          e = a.win,
          n = a.wrap;g(a.SVGElement.prototype, { htmlCss: function htmlCss(a) {
          var c = this.element;if (c = a && "SPAN" === c.tagName && a.width) delete a.width, this.textWidth = c, this.updateTransform();a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");this.styles = g(this.styles, a);G(this.element, a);return this;
        }, htmlGetBBox: function htmlGetBBox() {
          var a = this.element;"text" === a.nodeName && (a.style.position = "absolute");return { x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight };
        }, htmlUpdateTransform: function htmlUpdateTransform() {
          if (this.added) {
            var a = this.renderer,
                c = this.element,
                e = this.translateX || 0,
                b = this.translateY || 0,
                h = this.x || 0,
                n = this.y || 0,
                g = this.textAlign || "left",
                l = { left: 0, center: .5, right: 1 }[g],
                B = this.styles;G(c, { marginLeft: e, marginTop: b });this.shadows && m(this.shadows, function (a) {
              G(a, { marginLeft: e + 1, marginTop: b + 1 });
            });this.inverted && m(c.childNodes, function (b) {
              a.invertChild(b, c);
            });if ("SPAN" === c.tagName) {
              var r = this.rotation,
                  z = u(this.textWidth),
                  q = B && B.whiteSpace,
                  p = [r, g, c.innerHTML, this.textWidth, this.textAlign].join();p !== this.cTT && (B = a.fontMetrics(c.style.fontSize).b, F(r) && this.setSpanRotation(r, l, B), G(c, { width: "",
                whiteSpace: q || "nowrap" }), c.offsetWidth > z && /[ \-]/.test(c.textContent || c.innerText) && G(c, { width: z + "px", display: "block", whiteSpace: q || "normal" }), this.getSpanCorrection(c.offsetWidth, B, l, r, g));G(c, { left: h + (this.xCorr || 0) + "px", top: n + (this.yCorr || 0) + "px" });v && (B = c.offsetHeight);this.cTT = p;
            }
          } else this.alignOnAdd = !0;
        }, setSpanRotation: function setSpanRotation(a, c, h) {
          var b = {},
              d = q ? "-ms-transform" : v ? "-webkit-transform" : k ? "MozTransform" : e.opera ? "-o-transform" : "";b[d] = b.transform = "rotate(" + a + "deg)";b[d + (k ? "Origin" : "-origin")] = b.transformOrigin = 100 * c + "% " + h + "px";G(this.element, b);
        }, getSpanCorrection: function getSpanCorrection(a, c, e) {
          this.xCorr = -a * e;this.yCorr = -c;
        } });g(h.prototype, { html: function html(a, c, e) {
          var b = this.createElement("span"),
              d = b.element,
              h = b.renderer,
              w = h.isSVG,
              l = function l(a, b) {
            m(["opacity", "visibility"], function (l) {
              n(a, l + "Setter", function (a, l, c, r) {
                a.call(this, l, c, r);b[c] = l;
              });
            });
          };b.textSetter = function (a) {
            a !== d.innerHTML && delete this.bBox;d.innerHTML = this.textStr = a;b.htmlUpdateTransform();
          };w && l(b, b.element.style);b.xSetter = b.ySetter = b.alignSetter = b.rotationSetter = function (a, l) {
            "align" === l && (l = "textAlign");b[l] = a;b.htmlUpdateTransform();
          };b.attr({ text: a, x: Math.round(c), y: Math.round(e) }).css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize, position: "absolute" });d.style.whiteSpace = "nowrap";b.css = b.htmlCss;w && (b.add = function (a) {
            var c,
                e = h.box.parentNode,
                B = [];if (this.parentGroup = a) {
              if (c = a.div, !c) {
                for (; a;) {
                  B.push(a), a = a.parentGroup;
                }m(B.reverse(), function (a) {
                  var r,
                      p = C(a.element, "class");p && (p = { className: p });c = a.div = a.div || A("div", p, { position: "absolute",
                    left: (a.translateX || 0) + "px", top: (a.translateY || 0) + "px", display: a.display, opacity: a.opacity, pointerEvents: a.styles && a.styles.pointerEvents }, c || e);r = c.style;g(a, { on: function on() {
                      b.on.apply({ element: B[0].div }, arguments);return a;
                    }, translateXSetter: function translateXSetter(b, f) {
                      r.left = b + "px";a[f] = b;a.doTransform = !0;
                    }, translateYSetter: function translateYSetter(b, f) {
                      r.top = b + "px";a[f] = b;a.doTransform = !0;
                    } });l(a, r);
                });
              }
            } else c = e;c.appendChild(d);b.added = !0;b.alignOnAdd && b.htmlUpdateTransform();return b;
          });return b;
        } });
    })(K);(function (a) {
      var C,
          A,
          G = a.createElement,
          F = a.css,
          m = a.defined,
          g = a.deg2rad,
          k = a.discardElement,
          q = a.doc,
          v = a.each,
          u = a.erase,
          h = a.extend;C = a.extendClass;var e = a.isArray,
          n = a.isNumber,
          d = a.isObject,
          c = a.merge;A = a.noop;var w = a.pick,
          b = a.pInt,
          y = a.SVGElement,
          D = a.SVGRenderer,
          H = a.win;a.svg || (A = { docMode8: q && 8 === q.documentMode, init: function init(a, b) {
          var l = ["\x3c", b, ' filled\x3d"f" stroked\x3d"f"'],
              c = ["position: ", "absolute", ";"],
              d = "div" === b;("shape" === b || d) && c.push("left:0;top:0;width:1px;height:1px;");c.push("visibility: ", d ? "hidden" : "visible");
          l.push(' style\x3d"', c.join(""), '"/\x3e');b && (l = d || "span" === b || "img" === b ? l.join("") : a.prepVML(l), this.element = G(l));this.renderer = a;
        }, add: function add(a) {
          var b = this.renderer,
              l = this.element,
              c = b.box,
              d = a && a.inverted,
              c = a ? a.element || a : c;a && (this.parentGroup = a);d && b.invertChild(l, c);c.appendChild(l);this.added = !0;this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();if (this.onAdd) this.onAdd();this.className && this.attr("class", this.className);return this;
        }, updateTransform: y.prototype.htmlUpdateTransform,
        setSpanRotation: function setSpanRotation() {
          var a = this.rotation,
              b = Math.cos(a * g),
              c = Math.sin(a * g);F(this.element, { filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11\x3d", b, ", M12\x3d", -c, ", M21\x3d", c, ", M22\x3d", b, ", sizingMethod\x3d'auto expand')"].join("") : "none" });
        }, getSpanCorrection: function getSpanCorrection(a, b, c, d, e) {
          var l = d ? Math.cos(d * g) : 1,
              r = d ? Math.sin(d * g) : 0,
              h = w(this.elemHeight, this.element.offsetHeight),
              n;this.xCorr = 0 > l && -a;this.yCorr = 0 > r && -h;n = 0 > l * r;this.xCorr += r * b * (n ? 1 - c : c);this.yCorr -= l * b * (d ? n ? c : 1 - c : 1);e && "left" !== e && (this.xCorr -= a * c * (0 > l ? -1 : 1), d && (this.yCorr -= h * c * (0 > r ? -1 : 1)), F(this.element, { textAlign: e }));
        }, pathToVML: function pathToVML(a) {
          for (var b = a.length, l = []; b--;) {
            n(a[b]) ? l[b] = Math.round(10 * a[b]) - 5 : "Z" === a[b] ? l[b] = "x" : (l[b] = a[b], !a.isArc || "wa" !== a[b] && "at" !== a[b] || (l[b + 5] === l[b + 7] && (l[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1), l[b + 6] === l[b + 8] && (l[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1)));
          }return l.join(" ") || "x";
        }, clip: function clip(a) {
          var b = this,
              l;a ? (l = a.members, u(l, b), l.push(b), b.destroyClip = function () {
            u(l, b);
          }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = { clip: b.docMode8 ? "inherit" : "rect(auto)" });return b.css(a);
        }, css: y.prototype.htmlCss, safeRemoveChild: function safeRemoveChild(a) {
          a.parentNode && k(a);
        }, destroy: function destroy() {
          this.destroyClip && this.destroyClip();return y.prototype.destroy.apply(this);
        }, on: function on(a, b) {
          this.element["on" + a] = function () {
            var a = H.event;a.target = a.srcElement;b(a);
          };return this;
        }, cutOffPath: function cutOffPath(a, c) {
          var l;a = a.split(/[ ,]/);l = a.length;if (9 === l || 11 === l) a[l - 4] = a[l - 2] = b(a[l - 2]) - 10 * c;return a.join(" ");
        }, shadow: function shadow(a, c, d) {
          var l = [],
              r,
              p = this.element,
              e = this.renderer,
              h,
              n = p.style,
              f,
              t = p.path,
              y,
              J,
              g,
              B;t && "string" !== typeof t.value && (t = "x");J = t;if (a) {
            g = w(a.width, 3);B = (a.opacity || .15) / g;for (r = 1; 3 >= r; r++) {
              y = 2 * g + 1 - 2 * r, d && (J = this.cutOffPath(t.value, y + .5)), f = ['\x3cshape isShadow\x3d"true" strokeweight\x3d"', y, '" filled\x3d"false" path\x3d"', J, '" coordsize\x3d"10 10" style\x3d"', p.style.cssText, '" /\x3e'], h = G(e.prepVML(f), null, { left: b(n.left) + w(a.offsetX, 1), top: b(n.top) + w(a.offsetY, 1) }), d && (h.cutOff = y + 1), f = ['\x3cstroke color\x3d"', a.color || "#000000", '" opacity\x3d"', B * r, '"/\x3e'], G(e.prepVML(f), null, null, h), c ? c.element.appendChild(h) : p.parentNode.insertBefore(h, p), l.push(h);
            }this.shadows = l;
          }return this;
        }, updateShadows: A, setAttr: function setAttr(a, b) {
          this.docMode8 ? this.element[a] = b : this.element.setAttribute(a, b);
        }, classSetter: function classSetter(a) {
          (this.added ? this.element : this).className = a;
        }, dashstyleSetter: function dashstyleSetter(a, b, c) {
          (c.getElementsByTagName("stroke")[0] || G(this.renderer.prepVML(["\x3cstroke/\x3e"]), null, null, c))[b] = a || "solid";this[b] = a;
        }, dSetter: function dSetter(a, b, c) {
          var l = this.shadows;
          a = a || [];this.d = a.join && a.join(" ");c.path = a = this.pathToVML(a);if (l) for (c = l.length; c--;) {
            l[c].path = l[c].cutOff ? this.cutOffPath(a, l[c].cutOff) : a;
          }this.setAttr(b, a);
        }, fillSetter: function fillSetter(a, b, c) {
          var l = c.nodeName;"SPAN" === l ? c.style.color = a : "IMG" !== l && (c.filled = "none" !== a, this.setAttr("fillcolor", this.renderer.color(a, c, b, this)));
        }, "fill-opacitySetter": function fillOpacitySetter(a, b, c) {
          G(this.renderer.prepVML(["\x3c", b.split("-")[0], ' opacity\x3d"', a, '"/\x3e']), null, null, c);
        }, opacitySetter: A, rotationSetter: function rotationSetter(a, b, c) {
          c = c.style;this[b] = c[b] = a;c.left = -Math.round(Math.sin(a * g) + 1) + "px";c.top = Math.round(Math.cos(a * g)) + "px";
        }, strokeSetter: function strokeSetter(a, b, c) {
          this.setAttr("strokecolor", this.renderer.color(a, c, b, this));
        }, "stroke-widthSetter": function strokeWidthSetter(a, b, c) {
          c.stroked = !!a;this[b] = a;n(a) && (a += "px");this.setAttr("strokeweight", a);
        }, titleSetter: function titleSetter(a, b) {
          this.setAttr(b, a);
        }, visibilitySetter: function visibilitySetter(a, b, c) {
          "inherit" === a && (a = "visible");this.shadows && v(this.shadows, function (c) {
            c.style[b] = a;
          });"DIV" === c.nodeName && (a = "hidden" === a ? "-999em" : 0, this.docMode8 || (c.style[b] = a ? "visible" : "hidden"), b = "top");c.style[b] = a;
        }, xSetter: function xSetter(a, b, c) {
          this[b] = a;"x" === b ? b = "left" : "y" === b && (b = "top");this.updateClipping ? (this[b] = a, this.updateClipping()) : c.style[b] = a;
        }, zIndexSetter: function zIndexSetter(a, b, c) {
          c.style[b] = a;
        } }, A["stroke-opacitySetter"] = A["fill-opacitySetter"], a.VMLElement = A = C(y, A), A.prototype.ySetter = A.prototype.widthSetter = A.prototype.heightSetter = A.prototype.xSetter, A = { Element: A, isIE8: -1 < H.navigator.userAgent.indexOf("MSIE 8.0"), init: function init(a, b, c) {
          var l, d;this.alignedObjects = [];l = this.createElement("div").css({ position: "relative" });d = l.element;a.appendChild(l.element);this.isVML = !0;this.box = d;this.boxWrapper = l;this.gradients = {};this.cache = {};this.cacheKeys = [];this.imgCount = 0;this.setSize(b, c, !1);if (!q.namespaces.hcv) {
            q.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");try {
              q.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
            } catch (p) {
              q.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
            }
          }
        },
        isHidden: function isHidden() {
          return !this.box.offsetWidth;
        }, clipRect: function clipRect(a, b, c, e) {
          var l = this.createElement(),
              p = d(a);return h(l, { members: [], count: 0, left: (p ? a.x : a) + 1, top: (p ? a.y : b) + 1, width: (p ? a.width : c) - 1, height: (p ? a.height : e) - 1, getCSS: function getCSS(a) {
              var b = a.element,
                  c = b.nodeName,
                  f = a.inverted,
                  t = this.top - ("shape" === c ? b.offsetTop : 0),
                  l = this.left,
                  b = l + this.width,
                  p = t + this.height,
                  t = { clip: "rect(" + Math.round(f ? l : t) + "px," + Math.round(f ? p : b) + "px," + Math.round(f ? b : p) + "px," + Math.round(f ? t : l) + "px)" };!f && a.docMode8 && "DIV" === c && h(t, { width: b + "px", height: p + "px" });return t;
            }, updateClipping: function updateClipping() {
              v(l.members, function (a) {
                a.element && a.css(l.getCSS(a));
              });
            } });
        }, color: function color(b, c, d, e) {
          var l = this,
              p,
              r = /^rgba/,
              h,
              n,
              f = "none";b && b.linearGradient ? n = "gradient" : b && b.radialGradient && (n = "pattern");if (n) {
            var t,
                y,
                w = b.linearGradient || b.radialGradient,
                g,
                q,
                B,
                x,
                D,
                z = "";b = b.stops;var k,
                m = [],
                u = function u() {
              h = ['\x3cfill colors\x3d"' + m.join(",") + '" opacity\x3d"', B, '" o:opacity2\x3d"', q, '" type\x3d"', n, '" ', z, 'focus\x3d"100%" method\x3d"any" /\x3e'];
              G(l.prepVML(h), null, null, c);
            };g = b[0];k = b[b.length - 1];0 < g[0] && b.unshift([0, g[1]]);1 > k[0] && b.push([1, k[1]]);v(b, function (f, b) {
              r.test(f[1]) ? (p = a.color(f[1]), t = p.get("rgb"), y = p.get("a")) : (t = f[1], y = 1);m.push(100 * f[0] + "% " + t);b ? (B = y, x = t) : (q = y, D = t);
            });if ("fill" === d) {
              if ("gradient" === n) d = w.x1 || w[0] || 0, b = w.y1 || w[1] || 0, g = w.x2 || w[2] || 0, w = w.y2 || w[3] || 0, z = 'angle\x3d"' + (90 - 180 * Math.atan((w - b) / (g - d)) / Math.PI) + '"', u();else {
                var f = w.r,
                    H = 2 * f,
                    A = 2 * f,
                    C = w.cx,
                    F = w.cy,
                    T = c.radialReference,
                    K,
                    f = function f() {
                  T && (K = e.getBBox(), C += (T[0] - K.x) / K.width - .5, F += (T[1] - K.y) / K.height - .5, H *= T[2] / K.width, A *= T[2] / K.height);z = 'src\x3d"' + a.getOptions().global.VMLRadialGradientURL + '" size\x3d"' + H + "," + A + '" origin\x3d"0.5,0.5" position\x3d"' + C + "," + F + '" color2\x3d"' + D + '" ';u();
                };e.added ? f() : e.onAdd = f;f = x;
              }
            } else f = t;
          } else r.test(b) && "IMG" !== c.tagName ? (p = a.color(b), e[d + "-opacitySetter"](p.get("a"), d, c), f = p.get("rgb")) : (f = c.getElementsByTagName(d), f.length && (f[0].opacity = 1, f[0].type = "solid"), f = b);return f;
        }, prepVML: function prepVML(a) {
          var b = this.isIE8;a = a.join("");
          b ? (a = a.replace("/\x3e", ' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'), a = -1 === a.indexOf('style\x3d"') ? a.replace("/\x3e", ' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e') : a.replace('style\x3d"', 'style\x3d"display:inline-block;behavior:url(#default#VML);')) : a = a.replace("\x3c", "\x3chcv:");return a;
        }, text: D.prototype.html, path: function path(a) {
          var b = { coordsize: "10 10" };e(a) ? b.d = a : d(a) && h(b, a);return this.createElement("shape").attr(b);
        }, circle: function circle(a, b, c) {
          var l = this.symbol("circle");
          d(a) && (c = a.r, b = a.y, a = a.x);l.isCircle = !0;l.r = c;return l.attr({ x: a, y: b });
        }, g: function g(a) {
          var b;a && (b = { className: "highcharts-" + a, "class": "highcharts-" + a });return this.createElement("div").attr(b);
        }, image: function image(a, b, c, d, e) {
          var l = this.createElement("img").attr({ src: a });1 < arguments.length && l.attr({ x: b, y: c, width: d, height: e });return l;
        }, createElement: function createElement(a) {
          return "rect" === a ? this.symbol(a) : D.prototype.createElement.call(this, a);
        }, invertChild: function invertChild(a, c) {
          var d = this;c = c.style;var l = "IMG" === a.tagName && a.style;
          F(a, { flip: "x", left: b(c.width) - (l ? b(l.top) : 1), top: b(c.height) - (l ? b(l.left) : 1), rotation: -90 });v(a.childNodes, function (b) {
            d.invertChild(b, a);
          });
        }, symbols: { arc: function arc(a, b, c, d, e) {
            var p = e.start,
                l = e.end,
                r = e.r || c || d;c = e.innerR;d = Math.cos(p);var h = Math.sin(p),
                f = Math.cos(l),
                t = Math.sin(l);if (0 === l - p) return ["x"];p = ["wa", a - r, b - r, a + r, b + r, a + r * d, b + r * h, a + r * f, b + r * t];e.open && !c && p.push("e", "M", a, b);p.push("at", a - c, b - c, a + c, b + c, a + c * f, b + c * t, a + c * d, b + c * h, "x", "e");p.isArc = !0;return p;
          }, circle: function circle(a, b, c, d, e) {
            e && m(e.r) && (c = d = 2 * e.r);e && e.isCircle && (a -= c / 2, b -= d / 2);return ["wa", a, b, a + c, b + d, a + c, b + d / 2, a + c, b + d / 2, "e"];
          }, rect: function rect(a, b, c, d, e) {
            return D.prototype.symbols[m(e) && e.r ? "callout" : "square"].call(0, a, b, c, d, e);
          } } }, a.VMLRenderer = C = function C() {
        this.init.apply(this, arguments);
      }, C.prototype = c(D.prototype, A), a.Renderer = C);D.prototype.measureSpanWidth = function (a, b) {
        var c = q.createElement("span");a = q.createTextNode(a);c.appendChild(a);F(c, b);this.box.appendChild(c);b = c.offsetWidth;k(c);return b;
      };
    })(K);(function (a) {
      function C() {
        var g = a.defaultOptions.global,
            k = q.moment;if (g.timezone) {
          if (k) return function (a) {
            return -k.tz(a, g.timezone).utcOffset();
          };a.error(25);
        }return g.useUTC && g.getTimezoneOffset;
      }function A() {
        var g = a.defaultOptions.global,
            u,
            h = g.useUTC,
            e = h ? "getUTC" : "get",
            n = h ? "setUTC" : "set";a.Date = u = g.Date || q.Date;u.hcTimezoneOffset = h && g.timezoneOffset;u.hcGetTimezoneOffset = C();u.hcMakeTime = function (a, c, e, b, n, g) {
          var d;h ? (d = u.UTC.apply(0, arguments), d += m(d)) : d = new u(a, c, k(e, 1), k(b, 0), k(n, 0), k(g, 0)).getTime();return d;
        };F("Minutes Hours Day Date Month FullYear".split(" "), function (a) {
          u["hcGet" + a] = e + a;
        });F("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function (a) {
          u["hcSet" + a] = n + a;
        });
      }var G = a.color,
          F = a.each,
          m = a.getTZOffset,
          g = a.merge,
          k = a.pick,
          q = a.win;a.defaultOptions = { colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "), symbols: ["circle", "diamond", "square", "triangle", "triangle-down"], lang: { loading: "Loading...", months: "January February March April May June July August September October November December".split(" "),
          shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), decimalPoint: ".", numericSymbols: "kMGTPE".split(""), resetZoom: "Reset zoom", resetZoomTitle: "Reset zoom level 1:1", thousandsSep: " " }, global: { useUTC: !0, VMLRadialGradientURL: "http://code.highcharts.com/5.0.12/gfx/vml-radial-gradient.png" }, chart: { borderRadius: 0, defaultSeriesType: "line", ignoreHiddenSeries: !0, spacing: [10, 10, 15, 10], resetZoomButton: { theme: { zIndex: 20 },
            position: { align: "right", x: -10, y: 10 } }, width: null, height: null, borderColor: "#335cad", backgroundColor: "#ffffff", plotBorderColor: "#cccccc" }, title: { text: "Chart title", align: "center", margin: 15, widthAdjust: -44 }, subtitle: { text: "", align: "center", widthAdjust: -44 }, plotOptions: {}, labels: { style: { position: "absolute", color: "#333333" } }, legend: { enabled: !0, align: "center", layout: "horizontal", labelFormatter: function labelFormatter() {
            return this.name;
          }, borderColor: "#999999", borderRadius: 0, navigation: { activeColor: "#003399", inactiveColor: "#cccccc" },
          itemStyle: { color: "#333333", fontSize: "12px", fontWeight: "bold", textOverflow: "ellipsis" }, itemHoverStyle: { color: "#000000" }, itemHiddenStyle: { color: "#cccccc" }, shadow: !1, itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" }, squareSymbol: !0, symbolPadding: 5, verticalAlign: "bottom", x: 0, y: 0, title: { style: { fontWeight: "bold" } } }, loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center" } }, tooltip: { enabled: !0,
          animation: a.svg, borderRadius: 3, dateTimeLabelFormats: { millisecond: "%A, %b %e, %H:%M:%S.%L", second: "%A, %b %e, %H:%M:%S", minute: "%A, %b %e, %H:%M", hour: "%A, %b %e, %H:%M", day: "%A, %b %e, %Y", week: "Week from %A, %b %e, %Y", month: "%B %Y", year: "%Y" }, footerFormat: "", padding: 8, snap: a.isTouchDevice ? 25 : 10, backgroundColor: G("#f7f7f7").setOpacity(.85).get(), borderWidth: 1, headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e', pointFormat: "<span style=\"color:{point.color}\">\u25CF</span> {series.name}: <b>{point.y}</b><br/>",
          shadow: !0, style: { color: "#333333", cursor: "default", fontSize: "12px", pointerEvents: "none", whiteSpace: "nowrap" } }, credits: { enabled: !0, href: "http://www.highcharts.com", position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "9px" }, text: "Highcharts.com" } };a.setOptions = function (q) {
        a.defaultOptions = g(!0, a.defaultOptions, q);A();return a.defaultOptions;
      };a.getOptions = function () {
        return a.defaultOptions;
      };a.defaultPlotOptions = a.defaultOptions.plotOptions;A();
    })(K);
    (function (a) {
      var C = a.correctFloat,
          A = a.defined,
          G = a.destroyObjectProperties,
          F = a.isNumber,
          m = a.merge,
          g = a.pick,
          k = a.deg2rad;a.Tick = function (a, g, k, h) {
        this.axis = a;this.pos = g;this.type = k || "";this.isNewLabel = this.isNew = !0;k || h || this.addLabel();
      };a.Tick.prototype = { addLabel: function addLabel() {
          var a = this.axis,
              k = a.options,
              u = a.chart,
              h = a.categories,
              e = a.names,
              n = this.pos,
              d = k.labels,
              c = a.tickPositions,
              w = n === c[0],
              b = n === c[c.length - 1],
              e = h ? g(h[n], e[n], n) : n,
              h = this.label,
              c = c.info,
              y;a.isDatetimeAxis && c && (y = k.dateTimeLabelFormats[c.higherRanks[n] || c.unitName]);this.isFirst = w;this.isLast = b;k = a.labelFormatter.call({ axis: a, chart: u, isFirst: w, isLast: b, dateTimeLabelFormat: y, value: a.isLog ? C(a.lin2log(e)) : e });A(h) ? h && h.attr({ text: k }) : (this.labelLength = (this.label = h = A(k) && d.enabled ? u.renderer.text(k, 0, 0, d.useHTML).css(m(d.style)).add(a.labelGroup) : null) && h.getBBox().width, this.rotation = 0);
        }, getLabelSize: function getLabelSize() {
          return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0;
        }, handleOverflow: function handleOverflow(a) {
          var q = this.axis,
              m = a.x,
              h = q.chart.chartWidth,
              e = q.chart.spacing,
              n = g(q.labelLeft, Math.min(q.pos, e[3])),
              e = g(q.labelRight, Math.max(q.pos + q.len, h - e[1])),
              d = this.label,
              c = this.rotation,
              w = { left: 0, center: .5, right: 1 }[q.labelAlign],
              b = d.getBBox().width,
              y = q.getSlotWidth(),
              D = y,
              H = 1,
              l,
              B = {};if (c) 0 > c && m - w * b < n ? l = Math.round(m / Math.cos(c * k) - n) : 0 < c && m + w * b > e && (l = Math.round((h - m) / Math.cos(c * k)));else if (h = m + (1 - w) * b, m - w * b < n ? D = a.x + D * (1 - w) - n : h > e && (D = e - a.x + D * w, H = -1), D = Math.min(y, D), D < y && "center" === q.labelAlign && (a.x += H * (y - D - w * (y - Math.min(b, D)))), b > D || q.autoRotation && (d.styles || {}).width) l = D;l && (B.width = l, (q.options.labels.style || {}).textOverflow || (B.textOverflow = "ellipsis"), d.css(B));
        }, getPosition: function getPosition(a, g, k, h) {
          var e = this.axis,
              n = e.chart,
              d = h && n.oldChartHeight || n.chartHeight;return { x: a ? e.translate(g + k, null, null, h) + e.transB : e.left + e.offset + (e.opposite ? (h && n.oldChartWidth || n.chartWidth) - e.right - e.left : 0), y: a ? d - e.bottom + e.offset - (e.opposite ? e.height : 0) : d - e.translate(g + k, null, null, h) - e.transB };
        }, getLabelPosition: function getLabelPosition(a, g, m, h, e, n, d, c) {
          var w = this.axis,
              b = w.transA,
              y = w.reversed,
              D = w.staggerLines,
              q = w.tickRotCorr || { x: 0, y: 0 },
              l = e.y;A(l) || (l = 0 === w.side ? m.rotation ? -8 : -m.getBBox().height : 2 === w.side ? q.y + 8 : Math.cos(m.rotation * k) * (q.y - m.getBBox(!1, 0).height / 2));a = a + e.x + q.x - (n && h ? n * b * (y ? -1 : 1) : 0);g = g + l - (n && !h ? n * b * (y ? 1 : -1) : 0);D && (m = d / (c || 1) % D, w.opposite && (m = D - m - 1), g += w.labelOffset / D * m);return { x: a, y: Math.round(g) };
        }, getMarkPath: function getMarkPath(a, g, k, h, e, n) {
          return n.crispLine(["M", a, g, "L", a + (e ? 0 : -k), g + (e ? k : 0)], h);
        }, renderGridLine: function renderGridLine(a, g, k) {
          var h = this.axis,
              e = h.options,
              n = this.gridLine,
              d = {},
              c = this.pos,
              w = this.type,
              b = h.tickmarkOffset,
              y = h.chart.renderer,
              D = w ? w + "Grid" : "grid",
              q = e[D + "LineWidth"],
              l = e[D + "LineColor"],
              e = e[D + "LineDashStyle"];n || (d.stroke = l, d["stroke-width"] = q, e && (d.dashstyle = e), w || (d.zIndex = 1), a && (d.opacity = 0), this.gridLine = n = y.path().attr(d).addClass("highcharts-" + (w ? w + "-" : "") + "grid-line").add(h.gridGroup));if (!a && n && (a = h.getPlotLinePath(c + b, n.strokeWidth() * k, a, !0))) n[this.isNew ? "attr" : "animate"]({ d: a, opacity: g });
        }, renderMark: function renderMark(a, k, m) {
          var h = this.axis,
              e = h.options,
              n = h.chart.renderer,
              d = this.type,
              c = d ? d + "Tick" : "tick",
              w = h.tickSize(c),
              b = this.mark,
              y = !b,
              D = a.x;a = a.y;var q = g(e[c + "Width"], !d && h.isXAxis ? 1 : 0),
              e = e[c + "Color"];w && (h.opposite && (w[0] = -w[0]), y && (this.mark = b = n.path().addClass("highcharts-" + (d ? d + "-" : "") + "tick").add(h.axisGroup), b.attr({ stroke: e, "stroke-width": q })), b[y ? "attr" : "animate"]({ d: this.getMarkPath(D, a, w[0], b.strokeWidth() * m, h.horiz, n), opacity: k }));
        }, renderLabel: function renderLabel(a, k, m, h) {
          var e = this.axis,
              n = e.horiz,
              d = e.options,
              c = this.label,
              w = d.labels,
              b = w.step,
              y = e.tickmarkOffset,
              D = !0,
              q = a.x;a = a.y;c && F(q) && (c.xy = a = this.getLabelPosition(q, a, c, n, w, y, h, b), this.isFirst && !this.isLast && !g(d.showFirstLabel, 1) || this.isLast && !this.isFirst && !g(d.showLastLabel, 1) ? D = !1 : !n || e.isRadial || w.step || w.rotation || k || 0 === m || this.handleOverflow(a), b && h % b && (D = !1), D && F(a.y) ? (a.opacity = m, c[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (c.attr("y", -9999), this.isNewLabel = !0), this.isNew = !1);
        }, render: function render(a, k, m) {
          var h = this.axis,
              e = h.horiz,
              n = this.getPosition(e, this.pos, h.tickmarkOffset, k),
              d = n.x,
              c = n.y,
              h = e && d === h.pos + h.len || !e && c === h.pos ? -1 : 1;m = g(m, 1);this.isActive = !0;this.renderGridLine(k, m, h);this.renderMark(n, m, h);this.renderLabel(n, k, m, a);
        }, destroy: function destroy() {
          G(this, this.axis);
        } };
    })(K);var S = function (a) {
      var C = a.addEvent,
          A = a.animObject,
          G = a.arrayMax,
          F = a.arrayMin,
          m = a.color,
          g = a.correctFloat,
          k = a.defaultOptions,
          q = a.defined,
          v = a.deg2rad,
          u = a.destroyObjectProperties,
          h = a.each,
          e = a.extend,
          n = a.fireEvent,
          d = a.format,
          c = a.getMagnitude,
          w = a.grep,
          b = a.inArray,
          y = a.isArray,
          D = a.isNumber,
          H = a.isString,
          l = a.merge,
          B = a.normalizeTickInterval,
          r = a.objectEach,
          z = a.pick,
          M = a.removeEvent,
          p = a.splat,
          E = a.syncTimeout,
          I = a.Tick,
          L = function L() {
        this.init.apply(this, arguments);
      };a.extend(L.prototype, { defaultOptions: { dateTimeLabelFormats: { millisecond: "%H:%M:%S.%L", second: "%H:%M:%S", minute: "%H:%M", hour: "%H:%M", day: "%e. %b", week: "%e. %b", month: "%b '%y", year: "%Y" }, endOnTick: !1, labels: { enabled: !0, style: { color: "#666666", cursor: "default", fontSize: "11px" }, x: 0 }, minPadding: .01, maxPadding: .01, minorTickLength: 2, minorTickPosition: "outside", startOfWeek: 1,
          startOnTick: !1, tickLength: 10, tickmarkPlacement: "between", tickPixelInterval: 100, tickPosition: "outside", title: { align: "middle", style: { color: "#666666" } }, type: "linear", minorGridLineColor: "#f2f2f2", minorGridLineWidth: 1, minorTickColor: "#999999", lineColor: "#ccd6eb", lineWidth: 1, gridLineColor: "#e6e6e6", tickColor: "#ccd6eb" }, defaultYAxisOptions: { endOnTick: !0, tickPixelInterval: 72, showLastLabel: !0, labels: { x: -8 }, maxPadding: .05, minPadding: .05, startOnTick: !0, title: { rotation: 270, text: "Values" }, stackLabels: { enabled: !1,
            formatter: function formatter() {
              return a.numberFormat(this.total, -1);
            }, style: { fontSize: "11px", fontWeight: "bold", color: "#000000", textOutline: "1px contrast" } }, gridLineWidth: 1, lineWidth: 0 }, defaultLeftAxisOptions: { labels: { x: -15 }, title: { rotation: 270 } }, defaultRightAxisOptions: { labels: { x: 15 }, title: { rotation: 90 } }, defaultBottomAxisOptions: { labels: { autoRotation: [-45], x: 0 }, title: { rotation: 0 } }, defaultTopAxisOptions: { labels: { autoRotation: [-45], x: 0 }, title: { rotation: 0 } }, init: function init(a, t) {
          var f = t.isX,
              c = this;c.chart = a;c.horiz = a.inverted && !c.isZAxis ? !f : f;c.isXAxis = f;c.coll = c.coll || (f ? "xAxis" : "yAxis");c.opposite = t.opposite;c.side = t.side || (c.horiz ? c.opposite ? 0 : 2 : c.opposite ? 1 : 3);c.setOptions(t);var d = this.options,
              e = d.type;c.labelFormatter = d.labels.formatter || c.defaultLabelFormatter;c.userOptions = t;c.minPixelPadding = 0;c.reversed = d.reversed;c.visible = !1 !== d.visible;c.zoomEnabled = !1 !== d.zoomEnabled;c.hasNames = "category" === e || !0 === d.categories;c.categories = d.categories || c.hasNames;c.names = c.names || [];c.plotLinesAndBandsGroups = {};c.isLog = "logarithmic" === e;c.isDatetimeAxis = "datetime" === e;c.positiveValuesOnly = c.isLog && !c.allowNegativeLog;c.isLinked = q(d.linkedTo);c.ticks = {};c.labelEdge = [];c.minorTicks = {};c.plotLinesAndBands = [];c.alternateBands = {};c.len = 0;c.minRange = c.userMinRange = d.minRange || d.maxZoom;c.range = d.range;c.offset = d.offset || 0;c.stacks = {};c.oldStacks = {};c.stacksTouched = 0;c.max = null;c.min = null;c.crosshair = z(d.crosshair, p(a.options.tooltip.crosshairs)[f ? 0 : 1], !1);t = c.options.events;-1 === b(c, a.axes) && (f ? a.axes.splice(a.xAxis.length, 0, c) : a.axes.push(c), a[c.coll].push(c));c.series = c.series || [];a.inverted && !c.isZAxis && f && void 0 === c.reversed && (c.reversed = !0);r(t, function (a, f) {
            C(c, f, a);
          });c.lin2log = d.linearToLogConverter || c.lin2log;c.isLog && (c.val2lin = c.log2lin, c.lin2val = c.lin2log);
        }, setOptions: function setOptions(a) {
          this.options = l(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], l(k[this.coll], a));
        },
        defaultLabelFormatter: function defaultLabelFormatter() {
          var f = this.axis,
              b = this.value,
              c = f.categories,
              p = this.dateTimeLabelFormat,
              e = k.lang,
              l = e.numericSymbols,
              e = e.numericSymbolMagnitude || 1E3,
              r = l && l.length,
              x,
              h = f.options.labels.format,
              f = f.isLog ? Math.abs(b) : f.tickInterval;if (h) x = d(h, this);else if (c) x = b;else if (p) x = a.dateFormat(p, b);else if (r && 1E3 <= f) for (; r-- && void 0 === x;) {
            c = Math.pow(e, r + 1), f >= c && 0 === 10 * b % c && null !== l[r] && 0 !== b && (x = a.numberFormat(b / c, -1) + l[r]);
          }void 0 === x && (x = 1E4 <= Math.abs(b) ? a.numberFormat(b, -1) : a.numberFormat(b, -1, void 0, ""));return x;
        }, getSeriesExtremes: function getSeriesExtremes() {
          var a = this,
              b = a.chart;a.hasVisibleSeries = !1;a.dataMin = a.dataMax = a.threshold = null;a.softThreshold = !a.isXAxis;a.buildStacks && a.buildStacks();h(a.series, function (f) {
            if (f.visible || !b.options.chart.ignoreHiddenSeries) {
              var c = f.options,
                  t = c.threshold,
                  d;a.hasVisibleSeries = !0;a.positiveValuesOnly && 0 >= t && (t = null);if (a.isXAxis) c = f.xData, c.length && (f = F(c), D(f) || f instanceof Date || (c = w(c, function (a) {
                return D(a);
              }), f = F(c)), a.dataMin = Math.min(z(a.dataMin, c[0]), f), a.dataMax = Math.max(z(a.dataMax, c[0]), G(c)));else if (f.getExtremes(), d = f.dataMax, f = f.dataMin, q(f) && q(d) && (a.dataMin = Math.min(z(a.dataMin, f), f), a.dataMax = Math.max(z(a.dataMax, d), d)), q(t) && (a.threshold = t), !c.softThreshold || a.positiveValuesOnly) a.softThreshold = !1;
            }
          });
        }, translate: function translate(a, b, c, d, p, e) {
          var f = this.linkedParent || this,
              t = 1,
              l = 0,
              r = d ? f.oldTransA : f.transA;d = d ? f.oldMin : f.min;var h = f.minPixelPadding;p = (f.isOrdinal || f.isBroken || f.isLog && p) && f.lin2val;r || (r = f.transA);c && (t *= -1, l = f.len);f.reversed && (t *= -1, l -= t * (f.sector || f.len));b ? (a = (a * t + l - h) / r + d, p && (a = f.lin2val(a))) : (p && (a = f.val2lin(a)), a = t * (a - d) * r + l + t * h + (D(e) ? r * e : 0));return a;
        }, toPixels: function toPixels(a, b) {
          return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos);
        }, toValue: function toValue(a, b) {
          return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0);
        }, getPlotLinePath: function getPlotLinePath(a, b, c, d, p) {
          var f = this.chart,
              t = this.left,
              e = this.top,
              l,
              r,
              h = c && f.oldChartHeight || f.chartHeight,
              n = c && f.oldChartWidth || f.chartWidth,
              w;l = this.transB;var g = function g(a, f, b) {
            if (a < f || a > b) d ? a = Math.min(Math.max(f, a), b) : w = !0;return a;
          };p = z(p, this.translate(a, null, null, c));a = c = Math.round(p + l);l = r = Math.round(h - p - l);D(p) ? this.horiz ? (l = e, r = h - this.bottom, a = c = g(a, t, t + this.width)) : (a = t, c = n - this.right, l = r = g(l, e, e + this.height)) : w = !0;return w && !d ? null : f.renderer.crispLine(["M", a, l, "L", c, r], b || 1);
        }, getLinearTickPositions: function getLinearTickPositions(a, b, c) {
          var f,
              t = g(Math.floor(b / a) * a);c = g(Math.ceil(c / a) * a);var d = [];if (this.single) return [b];for (b = t; b <= c;) {
            d.push(b);b = g(b + a);if (b === f) break;f = b;
          }return d;
        }, getMinorTickPositions: function getMinorTickPositions() {
          var a = this,
              b = a.options,
              c = a.tickPositions,
              d = a.minorTickInterval,
              p = [],
              e = a.pointRangePadding || 0,
              l = a.min - e,
              e = a.max + e,
              x = e - l;if (x && x / d < a.len / 3) if (a.isLog) h(this.paddedTicks, function (b, f, c) {
            f && p.push.apply(p, a.getLogTickPositions(d, c[f - 1], c[f], !0));
          });else if (a.isDatetimeAxis && "auto" === b.minorTickInterval) p = p.concat(a.getTimeTicks(a.normalizeTimeTickInterval(d), l, e, b.startOfWeek));else for (b = l + (c[0] - l) % d; b <= e && b !== p[0]; b += d) {
            p.push(b);
          }0 !== p.length && a.trimTicks(p);return p;
        }, adjustForMinRange: function adjustForMinRange() {
          var a = this.options,
              b = this.min,
              c = this.max,
              d,
              p,
              e,
              l,
              x,
              r,
              n,
              w;this.isXAxis && void 0 === this.minRange && !this.isLog && (q(a.min) || q(a.max) ? this.minRange = null : (h(this.series, function (a) {
            r = a.xData;for (l = n = a.xIncrement ? 1 : r.length - 1; 0 < l; l--) {
              if (x = r[l] - r[l - 1], void 0 === e || x < e) e = x;
            }
          }), this.minRange = Math.min(5 * e, this.dataMax - this.dataMin)));c - b < this.minRange && (p = this.dataMax - this.dataMin >= this.minRange, w = this.minRange, d = (w - c + b) / 2, d = [b - d, z(a.min, b - d)], p && (d[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = G(d), c = [b + w, z(a.max, b + w)], p && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), c = F(c), c - b < w && (d[0] = c - w, d[1] = z(a.min, c - w), b = G(d)));this.min = b;this.max = c;
        }, getClosest: function getClosest() {
          var a;this.categories ? a = 1 : h(this.series, function (b) {
            var f = b.closestPointRange,
                c = b.visible || !b.chart.options.chart.ignoreHiddenSeries;!b.noSharedTooltip && q(f) && c && (a = q(a) ? Math.min(a, f) : f);
          });return a;
        }, nameToX: function nameToX(a) {
          var f = y(this.categories),
              c = f ? this.categories : this.names,
              d = a.options.x,
              p;a.series.requireSorting = !1;q(d) || (d = !1 === this.options.uniqueNames ? a.series.autoIncrement() : b(a.name, c));-1 === d ? f || (p = c.length) : p = d;void 0 !== p && (this.names[p] = a.name);return p;
        }, updateNames: function updateNames() {
          var a = this;0 < this.names.length && (this.names.length = 0, this.minRange = this.userMinRange, h(this.series || [], function (b) {
            b.xIncrement = null;if (!b.points || b.isDirtyData) b.processData(), b.generatePoints();h(b.points, function (f, c) {
              var t;f.options && (t = a.nameToX(f), void 0 !== t && t !== f.x && (f.x = t, b.xData[c] = t));
            });
          }));
        }, setAxisTranslation: function setAxisTranslation(a) {
          var b = this,
              f = b.max - b.min,
              c = b.axisPointRange || 0,
              d,
              p = 0,
              e = 0,
              l = b.linkedParent,
              r = !!b.categories,
              n = b.transA,
              w = b.isXAxis;if (w || r || c) d = b.getClosest(), l ? (p = l.minPointOffset, e = l.pointRangePadding) : h(b.series, function (a) {
            var f = r ? 1 : w ? z(a.options.pointRange, d, 0) : b.axisPointRange || 0;a = a.options.pointPlacement;c = Math.max(c, f);b.single || (p = Math.max(p, H(a) ? 0 : f / 2), e = Math.max(e, "on" === a ? 0 : f));
          }), l = b.ordinalSlope && d ? b.ordinalSlope / d : 1, b.minPointOffset = p *= l, b.pointRangePadding = e *= l, b.pointRange = Math.min(c, f), w && (b.closestPointRange = d);a && (b.oldTransA = n);b.translationSlope = b.transA = n = b.options.staticScale || b.len / (f + e || 1);b.transB = b.horiz ? b.left : b.bottom;b.minPixelPadding = n * p;
        }, minFromRange: function minFromRange() {
          return this.max - this.range;
        }, setTickInterval: function setTickInterval(b) {
          var f = this,
              d = f.chart,
              p = f.options,
              e = f.isLog,
              l = f.log2lin,
              r = f.isDatetimeAxis,
              x = f.isXAxis,
              w = f.isLinked,
              y = p.maxPadding,
              E = p.minPadding,
              k = p.tickInterval,
              I = p.tickPixelInterval,
              m = f.categories,
              H = f.threshold,
              u = f.softThreshold,
              L,
              v,
              M,
              A;r || m || w || this.getTickAmount();M = z(f.userMin, p.min);A = z(f.userMax, p.max);w ? (f.linkedParent = d[f.coll][p.linkedTo], d = f.linkedParent.getExtremes(), f.min = z(d.min, d.dataMin), f.max = z(d.max, d.dataMax), p.type !== f.linkedParent.options.type && a.error(11, 1)) : (!u && q(H) && (f.dataMin >= H ? (L = H, E = 0) : f.dataMax <= H && (v = H, y = 0)), f.min = z(M, L, f.dataMin), f.max = z(A, v, f.dataMax));e && (f.positiveValuesOnly && !b && 0 >= Math.min(f.min, z(f.dataMin, f.min)) && a.error(10, 1), f.min = g(l(f.min), 15), f.max = g(l(f.max), 15));f.range && q(f.max) && (f.userMin = f.min = M = Math.max(f.min, f.minFromRange()), f.userMax = A = f.max, f.range = null);n(f, "foundExtremes");f.beforePadding && f.beforePadding();f.adjustForMinRange();!(m || f.axisPointRange || f.usePercentage || w) && q(f.min) && q(f.max) && (l = f.max - f.min) && (!q(M) && E && (f.min -= l * E), !q(A) && y && (f.max += l * y));D(p.softMin) && (f.min = Math.min(f.min, p.softMin));D(p.softMax) && (f.max = Math.max(f.max, p.softMax));D(p.floor) && (f.min = Math.max(f.min, p.floor));D(p.ceiling) && (f.max = Math.min(f.max, p.ceiling));u && q(f.dataMin) && (H = H || 0, !q(M) && f.min < H && f.dataMin >= H ? f.min = H : !q(A) && f.max > H && f.dataMax <= H && (f.max = H));f.tickInterval = f.min === f.max || void 0 === f.min || void 0 === f.max ? 1 : w && !k && I === f.linkedParent.options.tickPixelInterval ? k = f.linkedParent.tickInterval : z(k, this.tickAmount ? (f.max - f.min) / Math.max(this.tickAmount - 1, 1) : void 0, m ? 1 : (f.max - f.min) * I / Math.max(f.len, I));x && !b && h(f.series, function (a) {
            a.processData(f.min !== f.oldMin || f.max !== f.oldMax);
          });f.setAxisTranslation(!0);f.beforeSetTickPositions && f.beforeSetTickPositions();f.postProcessTickInterval && (f.tickInterval = f.postProcessTickInterval(f.tickInterval));f.pointRange && !k && (f.tickInterval = Math.max(f.pointRange, f.tickInterval));b = z(p.minTickInterval, f.isDatetimeAxis && f.closestPointRange);!k && f.tickInterval < b && (f.tickInterval = b);r || e || k || (f.tickInterval = B(f.tickInterval, null, c(f.tickInterval), z(p.allowDecimals, !(.5 < f.tickInterval && 5 > f.tickInterval && 1E3 < f.max && 9999 > f.max)), !!this.tickAmount));this.tickAmount || (f.tickInterval = f.unsquish());this.setTickPositions();
        }, setTickPositions: function setTickPositions() {
          var a = this.options,
              b,
              c = a.tickPositions,
              d = a.tickPositioner,
              p = a.startOnTick,
              l = a.endOnTick;this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;this.minorTickInterval = "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;this.single = this.min === this.max && q(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);this.tickPositions = b = c && c.slice();!b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()]), this.tickPositions = b, d && (d = d.apply(this, [this.min, this.max]))) && (this.tickPositions = b = d);this.paddedTicks = b.slice(0);this.trimTicks(b, p, l);this.isLinked || (this.single && (this.min -= .5, this.max += .5), c || d || this.adjustTickAmount());
        }, trimTicks: function trimTicks(a, b, c) {
          var f = a[0],
              d = a[a.length - 1],
              p = this.minPointOffset || 0;if (!this.isLinked) {
            if (b && -Infinity !== f) this.min = f;else for (; this.min - p > a[0];) {
              a.shift();
            }if (c) this.max = d;else for (; this.max + p < a[a.length - 1];) {
              a.pop();
            }0 === a.length && q(f) && a.push((d + f) / 2);
          }
        }, alignToOthers: function alignToOthers() {
          var a = {},
              b,
              c = this.options;!1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || this.isLog || h(this.chart[this.coll], function (f) {
            var c = f.options,
                c = [f.horiz ? c.left : c.top, c.width, c.height, c.pane].join();f.series.length && (a[c] ? b = !0 : a[c] = 1);
          });return b;
        }, getTickAmount: function getTickAmount() {
          var a = this.options,
              b = a.tickAmount,
              c = a.tickPixelInterval;!q(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);!b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1);4 > b && (this.finalTickAmt = b, b = 5);this.tickAmount = b;
        }, adjustTickAmount: function adjustTickAmount() {
          var a = this.tickInterval,
              b = this.tickPositions,
              c = this.tickAmount,
              d = this.finalTickAmt,
              p = b && b.length;if (p < c) {
            for (; b.length < c;) {
              b.push(g(b[b.length - 1] + a));
            }this.transA *= (p - 1) / (c - 1);this.max = b[b.length - 1];
          } else p > c && (this.tickInterval *= 2, this.setTickPositions());
          if (q(d)) {
            for (a = c = b.length; a--;) {
              (3 === d && 1 === a % 2 || 2 >= d && 0 < a && a < c - 1) && b.splice(a, 1);
            }this.finalTickAmt = void 0;
          }
        }, setScale: function setScale() {
          var a, b;this.oldMin = this.min;this.oldMax = this.max;this.oldAxisLength = this.len;this.setAxisSize();b = this.len !== this.oldAxisLength;h(this.series, function (b) {
            if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0;
          });b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
        }, setExtremes: function setExtremes(a, b, c, d, p) {
          var f = this,
              l = f.chart;c = z(c, !0);h(f.series, function (a) {
            delete a.kdTree;
          });p = e(p, { min: a, max: b });n(f, "setExtremes", p, function () {
            f.userMin = a;f.userMax = b;f.eventArgs = p;c && l.redraw(d);
          });
        }, zoom: function zoom(a, b) {
          var f = this.dataMin,
              c = this.dataMax,
              d = this.options,
              p = Math.min(f, z(d.min, f)),
              d = Math.max(c, z(d.max, c));if (a !== this.min || b !== this.max) this.allowZoomOutside || (q(f) && (a < p && (a = p), a > d && (a = d)), q(c) && (b < p && (b = p), b > d && (b = d))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, { trigger: "zoom" });return !0;
        }, setAxisSize: function setAxisSize() {
          var a = this.chart,
              b = this.options,
              c = b.offsets || [0, 0, 0, 0],
              d = this.horiz,
              p = z(b.width, a.plotWidth - c[3] + c[1]),
              l = z(b.height, a.plotHeight - c[0] + c[2]),
              e = z(b.top, a.plotTop + c[0]),
              b = z(b.left, a.plotLeft + c[3]),
              c = /%$/;c.test(l) && (l = Math.round(parseFloat(l) / 100 * a.plotHeight));c.test(e) && (e = Math.round(parseFloat(e) / 100 * a.plotHeight + a.plotTop));this.left = b;this.top = e;this.width = p;this.height = l;this.bottom = a.chartHeight - l - e;this.right = a.chartWidth - p - b;this.len = Math.max(d ? p : l, 0);this.pos = d ? b : e;
        }, getExtremes: function getExtremes() {
          var a = this.isLog,
              b = this.lin2log;return { min: a ? g(b(this.min)) : this.min, max: a ? g(b(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax };
        }, getThreshold: function getThreshold(a) {
          var b = this.isLog,
              f = this.lin2log,
              c = b ? f(this.min) : this.min,
              b = b ? f(this.max) : this.max;null === a ? a = c : c > a ? a = c : b < a && (a = b);return this.translate(a, 0, 1, 0, 1);
        }, autoLabelAlign: function autoLabelAlign(a) {
          a = (z(a, 0) - 90 * this.side + 720) % 360;return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center";
        }, tickSize: function tickSize(a) {
          var b = this.options,
              f = b[a + "Length"],
              c = z(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);if (c && f) return "inside" === b[a + "Position"] && (f = -f), [f, c];
        }, labelMetrics: function labelMetrics() {
          var a = this.tickPositions && this.tickPositions[0] || 0;return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label);
        }, unsquish: function unsquish() {
          var a = this.options.labels,
              b = this.horiz,
              c = this.tickInterval,
              d = c,
              p = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c),
              l,
              e = a.rotation,
              r = this.labelMetrics(),
              n,
              w = Number.MAX_VALUE,
              g,
              y = function y(a) {
            a /= p || 1;a = 1 < a ? Math.ceil(a) : 1;return a * c;
          };b ? (g = !a.staggerLines && !a.step && (q(e) ? [e] : p < z(a.autoRotationLimit, 80) && a.autoRotation)) && h(g, function (a) {
            var b;if (a === e || a && -90 <= a && 90 >= a) n = y(Math.abs(r.h / Math.sin(v * a))), b = n + Math.abs(a / 360), b < w && (w = b, l = a, d = n);
          }) : a.step || (d = y(r.h));this.autoRotation = g;this.labelRotation = z(l, e);return d;
        }, getSlotWidth: function getSlotWidth() {
          var a = this.chart,
              b = this.horiz,
              c = this.options.labels,
              d = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
              p = a.margin[3];return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * this.len / d || !b && (p && p - a.spacing[3] || .33 * a.chartWidth);
        }, renderUnsquish: function renderUnsquish() {
          var a = this.chart,
              b = a.renderer,
              c = this.tickPositions,
              d = this.ticks,
              p = this.options.labels,
              e = this.horiz,
              r = this.getSlotWidth(),
              x = Math.max(1, Math.round(r - 2 * (p.padding || 5))),
              n = {},
              w = this.labelMetrics(),
              g = p.style && p.style.textOverflow,
              y,
              E = 0,
              k,
              I;H(p.rotation) || (n.rotation = p.rotation || 0);h(c, function (a) {
            (a = d[a]) && a.labelLength > E && (E = a.labelLength);
          });this.maxLabelLength = E;if (this.autoRotation) E > x && E > w.h ? n.rotation = this.labelRotation : this.labelRotation = 0;else if (r && (y = { width: x + "px" }, !g)) for (y.textOverflow = "clip", k = c.length; !e && k--;) {
            if (I = c[k], x = d[I].label) x.styles && "ellipsis" === x.styles.textOverflow ? x.css({ textOverflow: "clip" }) : d[I].labelLength > r && x.css({ width: r + "px" }), x.getBBox().height > this.len / c.length - (w.h - w.f) && (x.specCss = { textOverflow: "ellipsis" });
          }n.rotation && (y = { width: (E > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px" }, g || (y.textOverflow = "ellipsis"));if (this.labelAlign = p.align || this.autoLabelAlign(this.labelRotation)) n.align = this.labelAlign;h(c, function (a) {
            var b = (a = d[a]) && a.label;b && (b.attr(n), y && b.css(l(y, b.specCss)), delete b.specCss, a.rotation = n.rotation);
          });this.tickRotCorr = b.rotCorr(w.b, this.labelRotation || 0, 0 !== this.side);
        }, hasData: function hasData() {
          return this.hasVisibleSeries || q(this.min) && q(this.max) && !!this.tickPositions;
        }, addTitle: function addTitle(a) {
          var b = this.chart.renderer,
              f = this.horiz,
              c = this.opposite,
              d = this.options.title,
              p;this.axisTitle || ((p = d.textAlign) || (p = (f ? { low: "left", middle: "center", high: "right" } : { low: c ? "right" : "left", middle: "center", high: c ? "left" : "right" })[d.align]), this.axisTitle = b.text(d.text, 0, 0, d.useHTML).attr({ zIndex: 7, rotation: d.rotation || 0, align: p }).addClass("highcharts-axis-title").css(d.style).add(this.axisGroup), this.axisTitle.isNew = !0);this.axisTitle[a ? "show" : "hide"](!0);
        }, generateTick: function generateTick(a) {
          var b = this.ticks;b[a] ? b[a].addLabel() : b[a] = new I(this, a);
        }, getOffset: function getOffset() {
          var a = this,
              b = a.chart,
              c = b.renderer,
              d = a.options,
              p = a.tickPositions,
              l = a.ticks,
              e = a.horiz,
              x = a.side,
              n = b.inverted && !a.isZAxis ? [1, 0, 3, 2][x] : x,
              w,
              g,
              y = 0,
              E,
              k = 0,
              I = d.title,
              D = d.labels,
              m = 0,
              B = b.axisOffset,
              b = b.clipOffset,
              H = [-1, 1, 1, -1][x],
              u = d.className,
              L = a.axisParent,
              v = this.tickSize("tick");w = a.hasData();a.showAxis = g = w || z(d.showEmpty, !0);a.staggerLines = a.horiz && D.staggerLines;a.axisGroup || (a.gridGroup = c.g("grid").attr({ zIndex: d.gridZIndex || 1 }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (u || "")).add(L), a.axisGroup = c.g("axis").attr({ zIndex: d.zIndex || 2 }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (u || "")).add(L), a.labelGroup = c.g("axis-labels").attr({ zIndex: D.zIndex || 7 }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (u || "")).add(L));w || a.isLinked ? (h(p, function (b, c) {
            a.generateTick(b, c);
          }), a.renderUnsquish(), !1 === D.reserveSpace || 0 !== x && 2 !== x && { 1: "left", 3: "right" }[x] !== a.labelAlign && "center" !== a.labelAlign || h(p, function (a) {
            m = Math.max(l[a].getLabelSize(), m);
          }), a.staggerLines && (m *= a.staggerLines, a.labelOffset = m * (a.opposite ? -1 : 1))) : r(l, function (a, b) {
            a.destroy();delete l[b];
          });I && I.text && !1 !== I.enabled && (a.addTitle(g), g && !1 !== I.reserveSpace && (a.titleOffset = y = a.axisTitle.getBBox()[e ? "height" : "width"], E = I.offset, k = q(E) ? 0 : z(I.margin, e ? 5 : 10)));a.renderLine();a.offset = H * z(d.offset, B[x]);a.tickRotCorr = a.tickRotCorr || { x: 0, y: 0 };c = 0 === x ? -a.labelMetrics().h : 2 === x ? a.tickRotCorr.y : 0;k = Math.abs(m) + k;m && (k = k - c + H * (e ? z(D.y, a.tickRotCorr.y + 8 * H) : D.x));a.axisTitleMargin = z(E, k);B[x] = Math.max(B[x], a.axisTitleMargin + y + H * a.offset, k, w && p.length && v ? v[0] + H * a.offset : 0);p = 2 * Math.floor(a.axisLine.strokeWidth() / 2);0 < d.offset && (p -= 2 * d.offset);b[n] = Math.max(b[n] || p, p);
        }, getLinePath: function getLinePath(a) {
          var b = this.chart,
              c = this.opposite,
              f = this.offset,
              d = this.horiz,
              p = this.left + (c ? this.width : 0) + f,
              f = b.chartHeight - this.bottom - (c ? this.height : 0) + f;c && (a *= -1);return b.renderer.crispLine(["M", d ? this.left : p, d ? f : this.top, "L", d ? b.chartWidth - this.right : p, d ? f : b.chartHeight - this.bottom], a);
        }, renderLine: function renderLine() {
          this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }));
        }, getTitlePosition: function getTitlePosition() {
          var a = this.horiz,
              b = this.left,
              c = this.top,
              d = this.len,
              p = this.options.title,
              l = a ? b : c,
              e = this.opposite,
              r = this.offset,
              h = p.x || 0,
              n = p.y || 0,
              w = this.chart.renderer.fontMetrics(p.style && p.style.fontSize, this.axisTitle).f,
              d = { low: l + (a ? 0 : d), middle: l + d / 2, high: l + (a ? d : 0) }[p.align],
              b = (a ? c + this.height : b) + (a ? 1 : -1) * (e ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? w : 0);return { x: a ? d + h : b + (e ? this.width : 0) + r + h, y: a ? b + n - (e ? this.height : 0) + r : d + n };
        }, renderMinorTick: function renderMinorTick(a) {
          var b = this.chart.hasRendered && D(this.oldMin),
              c = this.minorTicks;c[a] || (c[a] = new I(this, a, "minor"));b && c[a].isNew && c[a].render(null, !0);c[a].render(null, !1, 1);
        }, renderTick: function renderTick(a, b) {
          var c = this.isLinked,
              f = this.ticks,
              d = this.chart.hasRendered && D(this.oldMin);if (!c || a >= this.min && a <= this.max) f[a] || (f[a] = new I(this, a)), d && f[a].isNew && f[a].render(b, !0, .1), f[a].render(b);
        }, render: function render() {
          var b = this,
              c = b.chart,
              d = b.options,
              p = b.isLog,
              l = b.lin2log,
              e = b.isLinked,
              n = b.tickPositions,
              x = b.axisTitle,
              w = b.ticks,
              g = b.minorTicks,
              y = b.alternateBands,
              k = d.stackLabels,
              m = d.alternateGridColor,
              q = b.tickmarkOffset,
              z = b.axisLine,
              B = b.showAxis,
              H = A(c.renderer.globalAnimation),
              u,
              L;b.labelEdge.length = 0;b.overlap = !1;h([w, g, y], function (a) {
            r(a, function (a) {
              a.isActive = !1;
            });
          });if (b.hasData() || e) b.minorTickInterval && !b.categories && h(b.getMinorTickPositions(), function (a) {
            b.renderMinorTick(a);
          }), n.length && (h(n, function (a, c) {
            b.renderTick(a, c);
          }), q && (0 === b.min || b.single) && (w[-1] || (w[-1] = new I(b, -1, null, !0)), w[-1].render(-1))), m && h(n, function (f, d) {
            L = void 0 !== n[d + 1] ? n[d + 1] + q : b.max - q;0 === d % 2 && f < b.max && L <= b.max + (c.polar ? -q : q) && (y[f] || (y[f] = new a.PlotLineOrBand(b)), u = f + q, y[f].options = { from: p ? l(u) : u, to: p ? l(L) : L, color: m }, y[f].render(), y[f].isActive = !0);
          }), b._addedPlotLB || (h((d.plotLines || []).concat(d.plotBands || []), function (a) {
            b.addPlotBandOrLine(a);
          }), b._addedPlotLB = !0);h([w, g, y], function (a) {
            var b,
                f = [],
                d = H.duration;r(a, function (a, b) {
              a.isActive || (a.render(b, !1, 0), a.isActive = !1, f.push(b));
            });E(function () {
              for (b = f.length; b--;) {
                a[f[b]] && !a[f[b]].isActive && (a[f[b]].destroy(), delete a[f[b]]);
              }
            }, a !== y && c.hasRendered && d ? d : 0);
          });z && (z[z.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(z.strokeWidth()) }), z.isPlaced = !0, z[B ? "show" : "hide"](!0));x && B && (d = b.getTitlePosition(), D(d.y) ? (x[x.isNew ? "attr" : "animate"](d), x.isNew = !1) : (x.attr("y", -9999), x.isNew = !0));k && k.enabled && b.renderStackTotals();b.isDirty = !1;
        }, redraw: function redraw() {
          this.visible && (this.render(), h(this.plotLinesAndBands, function (a) {
            a.render();
          }));h(this.series, function (a) {
            a.isDirty = !0;
          });
        }, keepProps: "extKey hcEvents names series userMax userMin".split(" "), destroy: function destroy(a) {
          var c = this,
              f = c.stacks,
              d = c.plotLinesAndBands,
              p;a || M(c);r(f, function (a, b) {
            u(a);f[b] = null;
          });h([c.ticks, c.minorTicks, c.alternateBands], function (a) {
            u(a);
          });if (d) for (a = d.length; a--;) {
            d[a].destroy();
          }h("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function (a) {
            c[a] && (c[a] = c[a].destroy());
          });for (p in c.plotLinesAndBandsGroups) {
            c.plotLinesAndBandsGroups[p] = c.plotLinesAndBandsGroups[p].destroy();
          }r(c, function (a, f) {
            -1 === b(f, c.keepProps) && delete c[f];
          });
        }, drawCrosshair: function drawCrosshair(a, b) {
          var c,
              f = this.crosshair,
              d = z(f.snap, !0),
              p,
              l = this.cross;a || (a = this.cross && this.cross.e);this.crosshair && !1 !== (q(b) || !d) ? (d ? q(b) && (p = this.isXAxis ? b.plotX : this.len - b.plotY) : p = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), q(p) && (c = this.getPlotLinePath(b && (this.isXAxis ? b.x : z(b.stackY, b.y)), null, null, null, p) || null), q(c) ? (b = this.categories && !this.isRadial, l || (this.cross = l = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (b ? "category " : "thin ") + f.className).attr({ zIndex: z(f.zIndex, 2) }).add(), l.attr({ stroke: f.color || (b ? m("#ccd6eb").setOpacity(.25).get() : "#cccccc"), "stroke-width": z(f.width, 1) }), f.dashStyle && l.attr({ dashstyle: f.dashStyle })), l.show().attr({ d: c }), b && !f.width && l.attr({ "stroke-width": this.transA }), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair();
        }, hideCrosshair: function hideCrosshair() {
          this.cross && this.cross.hide();
        } });return a.Axis = L;
    }(K);(function (a) {
      var C = a.Axis,
          A = a.Date,
          G = a.dateFormat,
          F = a.defaultOptions,
          m = a.defined,
          g = a.each,
          k = a.extend,
          q = a.getMagnitude,
          v = a.getTZOffset,
          u = a.normalizeTickInterval,
          h = a.pick,
          e = a.timeUnits;C.prototype.getTimeTicks = function (a, d, c, w) {
        var b = [],
            n = {},
            D = F.global.useUTC,
            q,
            l = new A(d - Math.max(v(d), v(c))),
            B = A.hcMakeTime,
            r = a.unitRange,
            z = a.count,
            u;if (m(d)) {
          l[A.hcSetMilliseconds](r >= e.second ? 0 : z * Math.floor(l.getMilliseconds() / z));if (r >= e.second) l[A.hcSetSeconds](r >= e.minute ? 0 : z * Math.floor(l.getSeconds() / z));if (r >= e.minute) l[A.hcSetMinutes](r >= e.hour ? 0 : z * Math.floor(l[A.hcGetMinutes]() / z));if (r >= e.hour) l[A.hcSetHours](r >= e.day ? 0 : z * Math.floor(l[A.hcGetHours]() / z));if (r >= e.day) l[A.hcSetDate](r >= e.month ? 1 : z * Math.floor(l[A.hcGetDate]() / z));r >= e.month && (l[A.hcSetMonth](r >= e.year ? 0 : z * Math.floor(l[A.hcGetMonth]() / z)), q = l[A.hcGetFullYear]());if (r >= e.year) l[A.hcSetFullYear](q - q % z);if (r === e.week) l[A.hcSetDate](l[A.hcGetDate]() - l[A.hcGetDay]() + h(w, 1));q = l[A.hcGetFullYear]();w = l[A.hcGetMonth]();var p = l[A.hcGetDate](),
              E = l[A.hcGetHours]();if (A.hcTimezoneOffset || A.hcGetTimezoneOffset) u = (!D || !!A.hcGetTimezoneOffset) && (c - d > 4 * e.month || v(d) !== v(c)), l = l.getTime(), l = new A(l + v(l));D = l.getTime();for (d = 1; D < c;) {
            b.push(D), D = r === e.year ? B(q + d * z, 0) : r === e.month ? B(q, w + d * z) : !u || r !== e.day && r !== e.week ? u && r === e.hour ? B(q, w, p, E + d * z) : D + r * z : B(q, w, p + d * z * (r === e.day ? 1 : 7)), d++;
          }b.push(D);r <= e.hour && 1E4 > b.length && g(b, function (a) {
            0 === a % 18E5 && "000000000" === G("%H%M%S%L", a) && (n[a] = "day");
          });
        }b.info = k(a, { higherRanks: n, totalRange: r * z });return b;
      };C.prototype.normalizeTimeTickInterval = function (a, d) {
        var c = d || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];d = c[c.length - 1];var h = e[d[0]],
            b = d[1],
            n;for (n = 0; n < c.length && !(d = c[n], h = e[d[0]], b = d[1], c[n + 1] && a <= (h * b[b.length - 1] + e[c[n + 1][0]]) / 2); n++) {}h === e.year && a < 5 * h && (b = [1, 2, 5]);a = u(a / h, b, "year" === d[0] ? Math.max(q(a / h), 1) : 1);return { unitRange: h, count: a, unitName: d[0] };
      };
    })(K);(function (a) {
      var C = a.Axis,
          A = a.getMagnitude,
          G = a.map,
          F = a.normalizeTickInterval,
          m = a.pick;C.prototype.getLogTickPositions = function (a, k, q, v) {
        var g = this.options,
            h = this.len,
            e = this.lin2log,
            n = this.log2lin,
            d = [];v || (this._minorAutoInterval = null);if (.5 <= a) a = Math.round(a), d = this.getLinearTickPositions(a, k, q);else if (.08 <= a) for (var h = Math.floor(k), c, w, b, y, D, g = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; h < q + 1 && !D; h++) {
          for (w = g.length, c = 0; c < w && !D; c++) {
            b = n(e(h) * g[c]), b > k && (!v || y <= q) && void 0 !== y && d.push(y), y > q && (D = !0), y = b;
          }
        } else k = e(k), q = e(q), a = g[v ? "minorTickInterval" : "tickInterval"], a = m("auto" === a ? null : a, this._minorAutoInterval, g.tickPixelInterval / (v ? 5 : 1) * (q - k) / ((v ? h / this.tickPositions.length : h) || 1)), a = F(a, null, A(a)), d = G(this.getLinearTickPositions(a, k, q), n), v || (this._minorAutoInterval = a / 5);v || (this.tickInterval = a);return d;
      };C.prototype.log2lin = function (a) {
        return Math.log(a) / Math.LN10;
      };C.prototype.lin2log = function (a) {
        return Math.pow(10, a);
      };
    })(K);(function (a, C) {
      var A = a.arrayMax,
          G = a.arrayMin,
          F = a.defined,
          m = a.destroyObjectProperties,
          g = a.each,
          k = a.erase,
          q = a.merge,
          v = a.pick;a.PlotLineOrBand = function (a, h) {
        this.axis = a;h && (this.options = h, this.id = h.id);
      };a.PlotLineOrBand.prototype = { render: function render() {
          var g = this,
              h = g.axis,
              e = h.horiz,
              n = g.options,
              d = n.label,
              c = g.label,
              w = n.to,
              b = n.from,
              y = n.value,
              k = F(b) && F(w),
              m = F(y),
              l = g.svgElem,
              B = !l,
              r = [],
              z = n.color,
              M = v(n.zIndex, 0),
              p = n.events,
              r = { "class": "highcharts-plot-" + (k ? "band " : "line ") + (n.className || "") },
              E = {},
              I = h.chart.renderer,
              L = k ? "bands" : "lines",
              f = h.log2lin;h.isLog && (b = f(b), w = f(w), y = f(y));m ? (r = { stroke: z, "stroke-width": n.width }, n.dashStyle && (r.dashstyle = n.dashStyle)) : k && (z && (r.fill = z), n.borderWidth && (r.stroke = n.borderColor, r["stroke-width"] = n.borderWidth));E.zIndex = M;L += "-" + M;(z = h.plotLinesAndBandsGroups[L]) || (h.plotLinesAndBandsGroups[L] = z = I.g("plot-" + L).attr(E).add());B && (g.svgElem = l = I.path().attr(r).add(z));if (m) r = h.getPlotLinePath(y, l.strokeWidth());else if (k) r = h.getPlotBandPath(b, w, n);else return;B && r && r.length ? (l.attr({ d: r }), p && a.objectEach(p, function (a, b) {
            l.on(b, function (a) {
              p[b].apply(g, [a]);
            });
          })) : l && (r ? (l.show(), l.animate({ d: r })) : (l.hide(), c && (g.label = c = c.destroy())));d && F(d.text) && r && r.length && 0 < h.width && 0 < h.height && !r.flat ? (d = q({ align: e && k && "center", x: e ? !k && 4 : 10, verticalAlign: !e && k && "middle", y: e ? k ? 16 : 10 : k ? 6 : -4, rotation: e && !k && 90 }, d), this.renderLabel(d, r, k, M)) : c && c.hide();return g;
        }, renderLabel: function renderLabel(a, h, e, n) {
          var d = this.label,
              c = this.axis.chart.renderer;d || (d = { align: a.textAlign || a.align, rotation: a.rotation, "class": "highcharts-plot-" + (e ? "band" : "line") + "-label " + (a.className || "") }, d.zIndex = n, this.label = d = c.text(a.text, 0, 0, a.useHTML).attr(d).add(), d.css(a.style));n = [h[1], h[4], e ? h[6] : h[1]];h = [h[2], h[5], e ? h[7] : h[2]];e = G(n);c = G(h);d.align(a, !1, { x: e, y: c, width: A(n) - e, height: A(h) - c });d.show();
        }, destroy: function destroy() {
          k(this.axis.plotLinesAndBands, this);delete this.axis;m(this);
        } };a.extend(C.prototype, { getPlotBandPath: function getPlotBandPath(a, h) {
          var e = this.getPlotLinePath(h, null, null, !0),
              n = this.getPlotLinePath(a, null, null, !0),
              d = this.horiz,
              c = 1;a = a < this.min && h < this.min || a > this.max && h > this.max;n && e ? (a && (n.flat = n.toString() === e.toString(), c = 0), n.push(d && e[4] === n[4] ? e[4] + c : e[4], d || e[5] !== n[5] ? e[5] : e[5] + c, d && e[1] === n[1] ? e[1] + c : e[1], d || e[2] !== n[2] ? e[2] : e[2] + c)) : n = null;return n;
        }, addPlotBand: function addPlotBand(a) {
          return this.addPlotBandOrLine(a, "plotBands");
        }, addPlotLine: function addPlotLine(a) {
          return this.addPlotBandOrLine(a, "plotLines");
        }, addPlotBandOrLine: function addPlotBandOrLine(g, h) {
          var e = new a.PlotLineOrBand(this, g).render(),
              n = this.userOptions;e && (h && (n[h] = n[h] || [], n[h].push(g)), this.plotLinesAndBands.push(e));
          return e;
        }, removePlotBandOrLine: function removePlotBandOrLine(a) {
          for (var h = this.plotLinesAndBands, e = this.options, n = this.userOptions, d = h.length; d--;) {
            h[d].id === a && h[d].destroy();
          }g([e.plotLines || [], n.plotLines || [], e.plotBands || [], n.plotBands || []], function (c) {
            for (d = c.length; d--;) {
              c[d].id === a && k(c, c[d]);
            }
          });
        }, removePlotBand: function removePlotBand(a) {
          this.removePlotBandOrLine(a);
        }, removePlotLine: function removePlotLine(a) {
          this.removePlotBandOrLine(a);
        } });
    })(K, S);(function (a) {
      var C = a.dateFormat,
          A = a.each,
          G = a.extend,
          F = a.format,
          m = a.isNumber,
          g = a.map,
          k = a.merge,
          q = a.pick,
          v = a.splat,
          u = a.syncTimeout,
          h = a.timeUnits;a.Tooltip = function () {
        this.init.apply(this, arguments);
      };a.Tooltip.prototype = { init: function init(a, h) {
          this.chart = a;this.options = h;this.crosshairs = [];this.now = { x: 0, y: 0 };this.isHidden = !0;this.split = h.split && !a.inverted;this.shared = h.shared || this.split;
        }, cleanSplit: function cleanSplit(a) {
          A(this.chart.series, function (e) {
            var d = e && e.tt;d && (!d.isActive || a ? e.tt = d.destroy() : d.isActive = !1);
          });
        }, getLabel: function getLabel() {
          var a = this.chart.renderer,
              h = this.options;this.label || (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, h.shape || "callout", null, null, h.useHTML, null, "tooltip").attr({ padding: h.padding, r: h.borderRadius }), this.label.attr({ fill: h.backgroundColor, "stroke-width": h.borderWidth }).css(h.style).shadow(h.shadow)), this.label.attr({ zIndex: 8 }).add());return this.label;
        }, update: function update(a) {
          this.destroy();k(!0, this.chart.options.tooltip.userOptions, a);this.init(this.chart, k(!0, this.options, a));
        }, destroy: function destroy() {
          this.label && (this.label = this.label.destroy());this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout);
        }, move: function move(a, h, d, c) {
          var e = this,
              b = e.now,
              n = !1 !== e.options.animation && !e.isHidden && (1 < Math.abs(a - b.x) || 1 < Math.abs(h - b.y)),
              g = e.followPointer || 1 < e.len;G(b, { x: n ? (2 * b.x + a) / 3 : a, y: n ? (b.y + h) / 2 : h, anchorX: g ? void 0 : n ? (2 * b.anchorX + d) / 3 : d, anchorY: g ? void 0 : n ? (b.anchorY + c) / 2 : c });e.getLabel().attr(b);n && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
            e && e.move(a, h, d, c);
          }, 32));
        }, hide: function hide(a) {
          var e = this;clearTimeout(this.hideTimer);a = q(a, this.options.hideDelay, 500);this.isHidden || (this.hideTimer = u(function () {
            e.getLabel()[a ? "fadeOut" : "hide"]();e.isHidden = !0;
          }, a));
        }, getAnchor: function getAnchor(a, h) {
          var d,
              c = this.chart,
              e = c.inverted,
              b = c.plotTop,
              n = c.plotLeft,
              k = 0,
              m = 0,
              l,
              q;a = v(a);d = a[0].tooltipPos;this.followPointer && h && (void 0 === h.chartX && (h = c.pointer.normalize(h)), d = [h.chartX - c.plotLeft, h.chartY - b]);d || (A(a, function (a) {
            l = a.series.yAxis;q = a.series.xAxis;k += a.plotX + (!e && q ? q.left - n : 0);m += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && l ? l.top - b : 0);
          }), k /= a.length, m /= a.length, d = [e ? c.plotWidth - m : k, this.shared && !e && 1 < a.length && h ? h.chartY - b : e ? c.plotHeight - k : m]);return g(d, Math.round);
        }, getPosition: function getPosition(a, h, d) {
          var c = this.chart,
              e = this.distance,
              b = {},
              n = d.h || 0,
              g,
              k = ["y", c.chartHeight, h, d.plotY + c.plotTop, c.plotTop, c.plotTop + c.plotHeight],
              l = ["x", c.chartWidth, a, d.plotX + c.plotLeft, c.plotLeft, c.plotLeft + c.plotWidth],
              m = !this.followPointer && q(d.ttBelow, !c.inverted === !!d.negative),
              r = function r(a, c, d, f, p, l) {
            var h = d < f - e,
                r = f + e + d < c,
                g = f - e - d;f += e;if (m && r) b[a] = f;else if (!m && h) b[a] = g;else if (h) b[a] = Math.min(l - d, 0 > g - n ? g : g - n);else if (r) b[a] = Math.max(p, f + n + d > c ? f : f + n);else return !1;
          },
              z = function z(a, c, d, f) {
            var p;f < e || f > c - e ? p = !1 : b[a] = f < d / 2 ? 1 : f > c - d / 2 ? c - d - 2 : f - d / 2;return p;
          },
              v = function v(a) {
            var b = k;k = l;l = b;g = a;
          },
              p = function p() {
            !1 !== r.apply(0, k) ? !1 !== z.apply(0, l) || g || (v(!0), p()) : g ? b.x = b.y = 0 : (v(!0), p());
          };(c.inverted || 1 < this.len) && v();p();return b;
        }, defaultFormatter: function defaultFormatter(a) {
          var e = this.points || v(this),
              d;d = [a.tooltipFooterHeaderFormatter(e[0])];
          d = d.concat(a.bodyFormatter(e));d.push(a.tooltipFooterHeaderFormatter(e[0], !0));return d;
        }, refresh: function refresh(a, h) {
          var d,
              c = this.options,
              e,
              b = a,
              g,
              n = {},
              k = [];d = c.formatter || this.defaultFormatter;var n = this.shared,
              l;clearTimeout(this.hideTimer);this.followPointer = v(b)[0].series.tooltipOptions.followPointer;g = this.getAnchor(b, h);h = g[0];e = g[1];!n || b.series && b.series.noSharedTooltip ? n = b.getLabelConfig() : (A(b, function (a) {
            a.setState("hover");k.push(a.getLabelConfig());
          }), n = { x: b[0].category, y: b[0].y }, n.points = k, b = b[0]);this.len = k.length;n = d.call(n, this);l = b.series;this.distance = q(l.tooltipOptions.distance, 16);!1 === n ? this.hide() : (d = this.getLabel(), this.isHidden && d.attr({ opacity: 1 }).show(), this.split ? this.renderSplit(n, a) : (c.style.width || d.css({ width: this.chart.spacingBox.width }), d.attr({ text: n && n.join ? n.join("") : n }), d.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + q(b.colorIndex, l.colorIndex)), d.attr({ stroke: c.borderColor || b.color || l.color || "#666666" }), this.updatePosition({ plotX: h, plotY: e,
            negative: b.negative, ttBelow: b.ttBelow, h: g[2] || 0 })), this.isHidden = !1);
        }, renderSplit: function renderSplit(e, h) {
          var d = this,
              c = [],
              g = this.chart,
              b = g.renderer,
              n = !0,
              k = this.options,
              m,
              l = this.getLabel();A(e.slice(0, h.length + 1), function (a, e) {
            e = h[e - 1] || { isHeader: !0, plotX: h[0].plotX };var r = e.series || d,
                w = r.tt,
                p = e.series || {},
                y = "highcharts-color-" + q(e.colorIndex, p.colorIndex, "none");w || (r.tt = w = b.label(null, null, null, "callout").addClass("highcharts-tooltip-box " + y).attr({ padding: k.padding, r: k.borderRadius, fill: k.backgroundColor,
              stroke: e.color || p.color || "#333333", "stroke-width": k.borderWidth }).add(l));w.isActive = !0;w.attr({ text: a });w.css(k.style);a = w.getBBox();p = a.width + w.strokeWidth();e.isHeader ? (m = a.height, p = Math.max(0, Math.min(e.plotX + g.plotLeft - p / 2, g.chartWidth - p))) : p = e.plotX + g.plotLeft - q(k.distance, 16) - p;0 > p && (n = !1);a = (e.series && e.series.yAxis && e.series.yAxis.pos) + (e.plotY || 0);a -= g.plotTop;c.push({ target: e.isHeader ? g.plotHeight + m : a, rank: e.isHeader ? 1 : 0, size: r.tt.getBBox().height + 1, point: e, x: p, tt: w });
          });this.cleanSplit();
          a.distribute(c, g.plotHeight + m);A(c, function (a) {
            var b = a.point,
                c = b.series;a.tt.attr({ visibility: void 0 === a.pos ? "hidden" : "inherit", x: n || b.isHeader ? a.x : b.plotX + g.plotLeft + q(k.distance, 16), y: a.pos + g.plotTop, anchorX: b.isHeader ? b.plotX + g.plotLeft : b.plotX + c.xAxis.pos, anchorY: b.isHeader ? a.pos + g.plotTop - 15 : b.plotY + c.yAxis.pos });
          });
        }, updatePosition: function updatePosition(a) {
          var e = this.chart,
              d = this.getLabel(),
              d = (this.options.positioner || this.getPosition).call(this, d.width, d.height, a);this.move(Math.round(d.x), Math.round(d.y || 0), a.plotX + e.plotLeft, a.plotY + e.plotTop);
        }, getDateFormat: function getDateFormat(a, g, d, c) {
          var e = C("%m-%d %H:%M:%S.%L", g),
              b,
              n,
              k = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 },
              m = "millisecond";for (n in h) {
            if (a === h.week && +C("%w", g) === d && "00:00:00.000" === e.substr(6)) {
              n = "week";break;
            }if (h[n] > a) {
              n = m;break;
            }if (k[n] && e.substr(k[n]) !== "01-01 00:00:00.000".substr(k[n])) break;"week" !== n && (m = n);
          }n && (b = c[n]);return b;
        }, getXDateFormat: function getXDateFormat(a, h, d) {
          h = h.dateTimeLabelFormats;var c = d && d.closestPointRange;return (c ? this.getDateFormat(c, a.x, d.options.startOfWeek, h) : h.day) || h.year;
        }, tooltipFooterHeaderFormatter: function tooltipFooterHeaderFormatter(a, h) {
          var d = h ? "footer" : "header";h = a.series;var c = h.tooltipOptions,
              e = c.xDateFormat,
              b = h.xAxis,
              g = b && "datetime" === b.options.type && m(a.key),
              d = c[d + "Format"];g && !e && (e = this.getXDateFormat(a, c, b));g && e && (d = d.replace("{point.key}", "{point.key:" + e + "}"));return F(d, { point: a, series: h });
        }, bodyFormatter: function bodyFormatter(a) {
          return g(a, function (a) {
            var d = a.series.tooltipOptions;return (d.pointFormatter || a.point.tooltipFormatter).call(a.point, d.pointFormat);
          });
        } };
    })(K);(function (a) {
      var C = a.addEvent,
          A = a.attr,
          G = a.charts,
          F = a.color,
          m = a.css,
          g = a.defined,
          k = a.doc,
          q = a.each,
          v = a.extend,
          u = a.fireEvent,
          h = a.offset,
          e = a.pick,
          n = a.removeEvent,
          d = a.splat,
          c = a.Tooltip,
          w = a.win;a.Pointer = function (a, c) {
        this.init(a, c);
      };a.Pointer.prototype = { init: function init(a, d) {
          this.options = d;this.chart = a;this.runChartClick = d.chart.events && !!d.chart.events.click;this.pinchDown = [];this.lastValidTouch = {};c && d.tooltip.enabled && (a.tooltip = new c(a, d.tooltip), this.followTouchMove = e(d.tooltip.followTouchMove, !0));this.setDOMEvents();
        }, zoomOption: function zoomOption(a) {
          var b = this.chart,
              c = b.options.chart,
              d = c.zoomType || "",
              b = b.inverted;/touch/.test(a.type) && (d = e(c.pinchType, d));this.zoomX = a = /x/.test(d);this.zoomY = d = /y/.test(d);this.zoomHor = a && !b || d && b;this.zoomVert = d && !b || a && b;this.hasZoom = a || d;
        }, normalize: function normalize(a, c) {
          var b, d;a = a || w.event;a.target || (a.target = a.srcElement);d = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;c || (this.chartPosition = c = h(this.chart.container));void 0 === d.pageX ? (b = Math.max(a.x, a.clientX - c.left), c = a.y) : (b = d.pageX - c.left, c = d.pageY - c.top);return v(a, { chartX: Math.round(b), chartY: Math.round(c) });
        }, getCoordinates: function getCoordinates(a) {
          var b = { xAxis: [], yAxis: [] };q(this.chart.axes, function (c) {
            b[c.isXAxis ? "xAxis" : "yAxis"].push({ axis: c, value: c.toValue(a[c.horiz ? "chartX" : "chartY"]) });
          });return b;
        }, getKDPoints: function getKDPoints(a, c, d) {
          var b = [],
              l,
              h,
              r;q(a, function (a) {
            l = a.noSharedTooltip && c;h = !c && a.directTouch;a.visible && !h && e(a.options.enableMouseTracking, !0) && (r = a.searchPoint(d, !l && 0 > a.options.findNearestPointBy.indexOf("y"))) && r.series && b.push(r);
          });b.sort(function (a, b) {
            var d = a.distX - b.distX,
                l = a.dist - b.dist,
                e = (b.series.group && b.series.group.zIndex) - (a.series.group && a.series.group.zIndex);return 0 !== d && c ? d : 0 !== l ? l : 0 !== e ? e : a.series.index > b.series.index ? -1 : 1;
          });if (c && b[0] && !b[0].series.noSharedTooltip) for (a = b.length; a--;) {
            (b[a].x !== b[0].x || b[a].series.noSharedTooltip) && b.splice(a, 1);
          }return b;
        }, getPointFromEvent: function getPointFromEvent(a) {
          a = a.target;for (var b; a && !b;) {
            b = a.point, a = a.parentNode;
          }return b;
        }, getChartCoordinatesFromPoint: function getChartCoordinatesFromPoint(a, c) {
          var b = a.series,
              d = b.xAxis,
              b = b.yAxis;if (d && b) return c ? { chartX: d.len + d.pos - a.clientX, chartY: b.len + b.pos - a.plotY } : { chartX: a.clientX + d.pos, chartY: a.plotY + b.pos };
        }, getHoverData: function getHoverData(b, c, d, e, l, h) {
          var r = b,
              g = c,
              r = l ? d : [g];e = !(!e || !b);c = g && !g.stickyTracking;var n = function n(a, b) {
            return 0 === b;
          },
              p;e ? n = function n(a) {
            return a === b;
          } : c ? n = function n(a) {
            return a.series === g;
          } : r = a.grep(d, function (a) {
            return a.stickyTracking;
          });p = e && !l ? [b] : this.getKDPoints(r, l, h);g = (r = a.find(p, n)) && r.series;e || c || !l || (p = this.getKDPoints(d, l, h));p.sort(function (a, b) {
            return a.series.index - b.series.index;
          });return { hoverPoint: r, hoverSeries: g, hoverPoints: p };
        }, runPointActions: function runPointActions(b, c) {
          var d = this.chart,
              h = d.tooltip,
              l = h ? h.shared : !1,
              g = c || d.hoverPoint,
              r = g && g.series || d.hoverSeries;c = this.getHoverData(g, r, d.series, !!c || r && r.directTouch && this.isDirectTouch, l, b);var n,
              w,
              g = c.hoverPoint;n = (r = c.hoverSeries) && r.tooltipOptions.followPointer;w = (l = l && g && !g.series.noSharedTooltip) ? c.hoverPoints : g ? [g] : [];if (g && (g !== d.hoverPoint || h && h.isHidden)) {
            q(d.hoverPoints || [], function (b) {
              -1 === a.inArray(b, w) && b.setState();
            });q(w || [], function (a) {
              a.setState("hover");
            });if (d.hoverSeries !== r) r.onMouseOver();d.hoverPoint && d.hoverPoint.firePointEvent("mouseOut");g.firePointEvent("mouseOver");d.hoverPoints = w;d.hoverPoint = g;h && h.refresh(l ? w : g, b);
          } else n && h && !h.isHidden && (r = h.getAnchor([{}], b), h.updatePosition({ plotX: r[0], plotY: r[1] }));this.unDocMouseMove || (this.unDocMouseMove = C(k, "mousemove", function (b) {
            var c = G[a.hoverChartIndex];if (c) c.pointer.onDocumentMouseMove(b);
          }));q(d.axes, function (c) {
            e(c.crosshair.snap, !0) ? a.find(w, function (a) {
              return a.series[c.coll] === c;
            }) ? c.drawCrosshair(b, g) : c.hideCrosshair() : c.drawCrosshair(b);
          });
        }, reset: function reset(a, c) {
          var b = this.chart,
              e = b.hoverSeries,
              l = b.hoverPoint,
              h = b.hoverPoints,
              g = b.tooltip,
              n = g && g.shared ? h : l;a && n && q(d(n), function (b) {
            b.series.isCartesian && void 0 === b.plotX && (a = !1);
          });if (a) g && n && (g.refresh(n), l && (l.setState(l.state, !0), q(b.axes, function (a) {
            a.crosshair && a.drawCrosshair(null, l);
          })));else {
            if (l) l.onMouseOut();h && q(h, function (a) {
              a.setState();
            });if (e) e.onMouseOut();g && g.hide(c);
            this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());q(b.axes, function (a) {
              a.hideCrosshair();
            });this.hoverX = b.hoverPoints = b.hoverPoint = null;
          }
        }, scaleGroups: function scaleGroups(a, c) {
          var b = this.chart,
              d;q(b.series, function (e) {
            d = a || e.getPlotBox();e.xAxis && e.xAxis.zoomEnabled && e.group && (e.group.attr(d), e.markerGroup && (e.markerGroup.attr(d), e.markerGroup.clip(c ? b.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(d));
          });b.clipRect.attr(c || b.clipBox);
        }, dragStart: function dragStart(a) {
          var b = this.chart;b.mouseIsDown = a.type;b.cancelClick = !1;b.mouseDownX = this.mouseDownX = a.chartX;b.mouseDownY = this.mouseDownY = a.chartY;
        }, drag: function drag(a) {
          var b = this.chart,
              c = b.options.chart,
              d = a.chartX,
              e = a.chartY,
              h = this.zoomHor,
              g = this.zoomVert,
              n = b.plotLeft,
              w = b.plotTop,
              p = b.plotWidth,
              k = b.plotHeight,
              m,
              q = this.selectionMarker,
              f = this.mouseDownX,
              t = this.mouseDownY,
              v = c.panKey && a[c.panKey + "Key"];q && q.touch || (d < n ? d = n : d > n + p && (d = n + p), e < w ? e = w : e > w + k && (e = w + k), this.hasDragged = Math.sqrt(Math.pow(f - d, 2) + Math.pow(t - e, 2)), 10 < this.hasDragged && (m = b.isInsidePlot(f - n, t - w), b.hasCartesianSeries && (this.zoomX || this.zoomY) && m && !v && !q && (this.selectionMarker = q = b.renderer.rect(n, w, h ? 1 : p, g ? 1 : k, 0).attr({ fill: c.selectionMarkerFill || F("#335cad").setOpacity(.25).get(), "class": "highcharts-selection-marker", zIndex: 7 }).add()), q && h && (d -= f, q.attr({ width: Math.abs(d), x: (0 < d ? 0 : d) + f })), q && g && (d = e - t, q.attr({ height: Math.abs(d), y: (0 < d ? 0 : d) + t })), m && !q && c.panning && b.pan(a, c.panning)));
        }, drop: function drop(a) {
          var b = this,
              c = this.chart,
              d = this.hasPinched;if (this.selectionMarker) {
            var e = { originalEvent: a,
              xAxis: [], yAxis: [] },
                h = this.selectionMarker,
                r = h.attr ? h.attr("x") : h.x,
                n = h.attr ? h.attr("y") : h.y,
                w = h.attr ? h.attr("width") : h.width,
                p = h.attr ? h.attr("height") : h.height,
                k;if (this.hasDragged || d) q(c.axes, function (c) {
              if (c.zoomEnabled && g(c.min) && (d || b[{ xAxis: "zoomX", yAxis: "zoomY" }[c.coll]])) {
                var l = c.horiz,
                    f = "touchend" === a.type ? c.minPixelPadding : 0,
                    h = c.toValue((l ? r : n) + f),
                    l = c.toValue((l ? r + w : n + p) - f);e[c.coll].push({ axis: c, min: Math.min(h, l), max: Math.max(h, l) });k = !0;
              }
            }), k && u(c, "selection", e, function (a) {
              c.zoom(v(a, d ? { animation: !1 } : null));
            });this.selectionMarker = this.selectionMarker.destroy();d && this.scaleGroups();
          }c && (m(c.container, { cursor: c._cursor }), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = []);
        }, onContainerMouseDown: function onContainerMouseDown(a) {
          a = this.normalize(a);this.zoomOption(a);a.preventDefault && a.preventDefault();this.dragStart(a);
        }, onDocumentMouseUp: function onDocumentMouseUp(b) {
          G[a.hoverChartIndex] && G[a.hoverChartIndex].pointer.drop(b);
        }, onDocumentMouseMove: function onDocumentMouseMove(a) {
          var b = this.chart,
              c = this.chartPosition;a = this.normalize(a, c);!c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset();
        }, onContainerMouseLeave: function onContainerMouseLeave(b) {
          var c = G[a.hoverChartIndex];c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null);
        }, onContainerMouseMove: function onContainerMouseMove(b) {
          var c = this.chart;g(a.hoverChartIndex) && G[a.hoverChartIndex] && G[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);b = this.normalize(b);b.returnValue = !1;
          "mousedown" === c.mouseIsDown && this.drag(b);!this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b);
        }, inClass: function inClass(a, c) {
          for (var b; a;) {
            if (b = A(a, "class")) {
              if (-1 !== b.indexOf(c)) return !0;if (-1 !== b.indexOf("highcharts-container")) return !1;
            }a = a.parentNode;
          }
        }, onTrackerMouseOut: function onTrackerMouseOut(a) {
          var b = this.chart.hoverSeries;a = a.relatedTarget || a.toElement;this.isDirectTouch = !1;if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut();
        }, onContainerClick: function onContainerClick(a) {
          var b = this.chart,
              c = b.hoverPoint,
              d = b.plotLeft,
              e = b.plotTop;a = this.normalize(a);b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (u(c.series, "click", v(a, { point: c })), b.hoverPoint && c.firePointEvent("click", a)) : (v(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - e) && u(b, "click", a)));
        }, setDOMEvents: function setDOMEvents() {
          var b = this,
              c = b.chart.container;c.onmousedown = function (a) {
            b.onContainerMouseDown(a);
          };c.onmousemove = function (a) {
            b.onContainerMouseMove(a);
          };c.onclick = function (a) {
            b.onContainerClick(a);
          };C(c, "mouseleave", b.onContainerMouseLeave);1 === a.chartCount && C(k, "mouseup", b.onDocumentMouseUp);a.hasTouch && (c.ontouchstart = function (a) {
            b.onContainerTouchStart(a);
          }, c.ontouchmove = function (a) {
            b.onContainerTouchMove(a);
          }, 1 === a.chartCount && C(k, "touchend", b.onDocumentTouchEnd));
        }, destroy: function destroy() {
          var b = this;b.unDocMouseMove && b.unDocMouseMove();n(b.chart.container, "mouseleave", b.onContainerMouseLeave);a.chartCount || (n(k, "mouseup", b.onDocumentMouseUp), n(k, "touchend", b.onDocumentTouchEnd));clearInterval(b.tooltipTimeout);a.objectEach(b, function (a, c) {
            b[c] = null;
          });
        } };
    })(K);(function (a) {
      var C = a.charts,
          A = a.each,
          G = a.extend,
          F = a.map,
          m = a.noop,
          g = a.pick;G(a.Pointer.prototype, { pinchTranslate: function pinchTranslate(a, g, m, u, h, e) {
          this.zoomHor && this.pinchTranslateDirection(!0, a, g, m, u, h, e);this.zoomVert && this.pinchTranslateDirection(!1, a, g, m, u, h, e);
        }, pinchTranslateDirection: function pinchTranslateDirection(a, g, m, u, h, e, n, d) {
          var c = this.chart,
              w = a ? "x" : "y",
              b = a ? "X" : "Y",
              k = "chart" + b,
              q = a ? "width" : "height",
              v = c["plot" + (a ? "Left" : "Top")],
              l,
              B,
              r = d || 1,
              z = c.inverted,
              M = c.bounds[a ? "h" : "v"],
              p = 1 === g.length,
              E = g[0][k],
              I = m[0][k],
              L = !p && g[1][k],
              f = !p && m[1][k],
              t;m = function m() {
            !p && 20 < Math.abs(E - L) && (r = d || Math.abs(I - f) / Math.abs(E - L));B = (v - I) / r + E;l = c["plot" + (a ? "Width" : "Height")] / r;
          };m();g = B;g < M.min ? (g = M.min, t = !0) : g + l > M.max && (g = M.max - l, t = !0);t ? (I -= .8 * (I - n[w][0]), p || (f -= .8 * (f - n[w][1])), m()) : n[w] = [I, f];z || (e[w] = B - v, e[q] = l);e = z ? 1 / r : r;h[q] = l;h[w] = g;u[z ? a ? "scaleY" : "scaleX" : "scale" + b] = r;u["translate" + b] = e * v + (I - e * E);
        }, pinch: function pinch(a) {
          var k = this,
              v = k.chart,
              u = k.pinchDown,
              h = a.touches,
              e = h.length,
              n = k.lastValidTouch,
              d = k.hasZoom,
              c = k.selectionMarker,
              w = {},
              b = 1 === e && (k.inClass(a.target, "highcharts-tracker") && v.runTrackerClick || k.runChartClick),
              y = {};1 < e && (k.initiated = !0);d && k.initiated && !b && a.preventDefault();F(h, function (a) {
            return k.normalize(a);
          });"touchstart" === a.type ? (A(h, function (a, b) {
            u[b] = { chartX: a.chartX, chartY: a.chartY };
          }), n.x = [u[0].chartX, u[1] && u[1].chartX], n.y = [u[0].chartY, u[1] && u[1].chartY], A(v.axes, function (a) {
            if (a.zoomEnabled) {
              var b = v.bounds[a.horiz ? "h" : "v"],
                  c = a.minPixelPadding,
                  d = a.toPixels(g(a.options.min, a.dataMin)),
                  e = a.toPixels(g(a.options.max, a.dataMax)),
                  h = Math.max(d, e);b.min = Math.min(a.pos, Math.min(d, e) - c);b.max = Math.max(a.pos + a.len, h + c);
            }
          }), k.res = !0) : k.followTouchMove && 1 === e ? this.runPointActions(k.normalize(a)) : u.length && (c || (k.selectionMarker = c = G({ destroy: m, touch: !0 }, v.plotBox)), k.pinchTranslate(u, h, w, c, y, n), k.hasPinched = d, k.scaleGroups(w, y), k.res && (k.res = !1, this.reset(!1, 0)));
        }, touch: function touch(k, m) {
          var q = this.chart,
              u,
              h;if (q.index !== a.hoverChartIndex) this.onContainerMouseLeave({ relatedTarget: !0 });a.hoverChartIndex = q.index;1 === k.touches.length ? (k = this.normalize(k), (h = q.isInsidePlot(k.chartX - q.plotLeft, k.chartY - q.plotTop)) && !q.openMenu ? (m && this.runPointActions(k), "touchmove" === k.type && (m = this.pinchDown, u = m[0] ? 4 <= Math.sqrt(Math.pow(m[0].chartX - k.chartX, 2) + Math.pow(m[0].chartY - k.chartY, 2)) : !1), g(u, !0) && this.pinch(k)) : m && this.reset()) : 2 === k.touches.length && this.pinch(k);
        }, onContainerTouchStart: function onContainerTouchStart(a) {
          this.zoomOption(a);this.touch(a, !0);
        }, onContainerTouchMove: function onContainerTouchMove(a) {
          this.touch(a);
        }, onDocumentTouchEnd: function onDocumentTouchEnd(g) {
          C[a.hoverChartIndex] && C[a.hoverChartIndex].pointer.drop(g);
        } });
    })(K);(function (a) {
      var C = a.addEvent,
          A = a.charts,
          G = a.css,
          F = a.doc,
          m = a.extend,
          g = a.noop,
          k = a.Pointer,
          q = a.removeEvent,
          v = a.win,
          u = a.wrap;if (!a.hasTouch && (v.PointerEvent || v.MSPointerEvent)) {
        var h = {},
            e = !!v.PointerEvent,
            n = function n() {
          var c = [];c.item = function (a) {
            return this[a];
          };a.objectEach(h, function (a) {
            c.push({ pageX: a.pageX, pageY: a.pageY, target: a.target });
          });return c;
        },
            d = function d(c, _d, b, e) {
          "touch" !== c.pointerType && c.pointerType !== c.MSPOINTER_TYPE_TOUCH || !A[a.hoverChartIndex] || (e(c), e = A[a.hoverChartIndex].pointer, e[_d]({ type: b, target: c.currentTarget, preventDefault: g, touches: n() }));
        };m(k.prototype, { onContainerPointerDown: function onContainerPointerDown(a) {
            d(a, "onContainerTouchStart", "touchstart", function (a) {
              h[a.pointerId] = { pageX: a.pageX, pageY: a.pageY, target: a.currentTarget };
            });
          }, onContainerPointerMove: function onContainerPointerMove(a) {
            d(a, "onContainerTouchMove", "touchmove", function (a) {
              h[a.pointerId] = { pageX: a.pageX, pageY: a.pageY };h[a.pointerId].target || (h[a.pointerId].target = a.currentTarget);
            });
          }, onDocumentPointerUp: function onDocumentPointerUp(a) {
            d(a, "onDocumentTouchEnd", "touchend", function (a) {
              delete h[a.pointerId];
            });
          }, batchMSEvents: function batchMSEvents(a) {
            a(this.chart.container, e ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);a(this.chart.container, e ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);a(F, e ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp);
          } });
        u(k.prototype, "init", function (a, d, b) {
          a.call(this, d, b);this.hasZoom && G(d.container, { "-ms-touch-action": "none", "touch-action": "none" });
        });u(k.prototype, "setDOMEvents", function (a) {
          a.apply(this);(this.hasZoom || this.followTouchMove) && this.batchMSEvents(C);
        });u(k.prototype, "destroy", function (a) {
          this.batchMSEvents(q);a.call(this);
        });
      }
    })(K);(function (a) {
      var C = a.addEvent,
          A = a.css,
          G = a.discardElement,
          F = a.defined,
          m = a.each,
          g = a.isFirefox,
          k = a.marginNames,
          q = a.merge,
          v = a.pick,
          u = a.setAnimation,
          h = a.stableSort,
          e = a.win,
          n = a.wrap;
      a.Legend = function (a, c) {
        this.init(a, c);
      };a.Legend.prototype = { init: function init(a, c) {
          this.chart = a;this.setOptions(c);c.enabled && (this.render(), C(this.chart, "endResize", function () {
            this.legend.positionCheckboxes();
          }));
        }, setOptions: function setOptions(a) {
          var c = v(a.padding, 8);this.options = a;this.itemStyle = a.itemStyle;this.itemHiddenStyle = q(this.itemStyle, a.itemHiddenStyle);this.itemMarginTop = a.itemMarginTop || 0;this.padding = c;this.initialItemY = c - 5;this.itemHeight = this.maxItemWidth = 0;this.symbolWidth = v(a.symbolWidth, 16);this.pages = [];
        }, update: function update(a, c) {
          var d = this.chart;this.setOptions(q(!0, this.options, a));this.destroy();d.isDirtyLegend = d.isDirtyBox = !0;v(c, !0) && d.redraw();
        }, colorizeItem: function colorizeItem(d, c) {
          d.legendGroup[c ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");var e = this.options,
              b = d.legendItem,
              h = d.legendLine,
              g = d.legendSymbol,
              n = this.itemHiddenStyle.color,
              e = c ? e.itemStyle.color : n,
              l = c ? d.color || n : n,
              k = d.options && d.options.marker,
              r = { fill: l };b && b.css({ fill: e, color: e });h && h.attr({ stroke: l });g && (k && g.isMarker && (r = d.pointAttribs(), c || a.objectEach(r, function (a, b) {
            r[b] = n;
          })), g.attr(r));
        }, positionItem: function positionItem(a) {
          var c = this.options,
              d = c.symbolPadding,
              c = !c.rtl,
              b = a._legendItemPos,
              e = b[0],
              b = b[1],
              h = a.checkbox;(a = a.legendGroup) && a.element && a.translate(c ? e : this.legendWidth - e - 2 * d - 4, b);h && (h.x = e, h.y = b);
        }, destroyItem: function destroyItem(a) {
          var c = a.checkbox;m(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (c) {
            a[c] && (a[c] = a[c].destroy());
          });c && G(a.checkbox);
        }, destroy: function destroy() {
          function a(a) {
            this[a] && (this[a] = this[a].destroy());
          }m(this.getAllItems(), function (c) {
            m(["legendItem", "legendGroup"], a, c);
          });m("clipRect up down pager nav box title group".split(" "), a, this);this.display = null;
        }, positionCheckboxes: function positionCheckboxes(a) {
          var c = this.group && this.group.alignAttr,
              d,
              b = this.clipHeight || this.legendHeight,
              e = this.titleHeight;c && (d = c.translateY, m(this.allItems, function (h) {
            var g = h.checkbox,
                l;g && (l = d + e + g.y + (a || 0) + 3, A(g, { left: c.translateX + h.checkboxOffset + g.x - 20 + "px", top: l + "px", display: l > d - 6 && l < d + b - 6 ? "" : "none" }));
          }));
        }, renderTitle: function renderTitle() {
          var a = this.options,
              c = this.padding,
              e = a.title,
              b = 0;e.text && (this.title || (this.title = this.chart.renderer.label(e.text, c - 3, c - 4, null, null, null, a.useHTML, null, "legend-title").attr({ zIndex: 1 }).css(e.style).add(this.group)), a = this.title.getBBox(), b = a.height, this.offsetWidth = a.width, this.contentGroup.attr({ translateY: b }));this.titleHeight = b;
        }, setText: function setText(d) {
          var c = this.options;d.legendItem.attr({ text: c.labelFormat ? a.format(c.labelFormat, d) : c.labelFormatter.call(d) });
        }, renderItem: function renderItem(a) {
          var c = this.chart,
              d = c.renderer,
              b = this.options,
              e = "horizontal" === b.layout,
              h = this.symbolWidth,
              g = b.symbolPadding,
              l = this.itemStyle,
              n = this.itemHiddenStyle,
              r = this.padding,
              k = e ? v(b.itemDistance, 20) : 0,
              m = !b.rtl,
              p = b.width,
              E = b.itemMarginBottom || 0,
              I = this.itemMarginTop,
              u = a.legendItem,
              f = !a.series,
              t = !f && a.series.drawLegendSymbol ? a.series : a,
              A = t.options,
              J = this.createCheckboxForItem && A && A.showCheckbox,
              A = h + g + k + (J ? 20 : 0),
              N = b.useHTML,
              C = a.options.className;u || (a.legendGroup = d.g("legend-item").addClass("highcharts-" + t.type + "-series highcharts-color-" + a.colorIndex + (C ? " " + C : "") + (f ? " highcharts-series-" + a.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup), a.legendItem = u = d.text("", m ? h + g : -g, this.baseline || 0, N).css(q(a.visible ? l : n)).attr({ align: m ? "left" : "right", zIndex: 2 }).add(a.legendGroup), this.baseline || (h = l.fontSize, this.fontMetrics = d.fontMetrics(h, u), this.baseline = this.fontMetrics.f + 3 + I, u.attr("y", this.baseline)), this.symbolHeight = b.symbolHeight || this.fontMetrics.f, t.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, u, N), J && this.createCheckboxForItem(a));
          this.colorizeItem(a, a.visible);l.width || u.css({ width: (b.itemWidth || c.spacingBox.width) - A });this.setText(a);d = u.getBBox();l = a.checkboxOffset = b.itemWidth || a.legendItemWidth || d.width + A;this.itemHeight = d = Math.round(a.legendItemHeight || d.height || this.symbolHeight);e && this.itemX - r + l > (p || c.spacingBox.width - 2 * r - b.x) && (this.itemX = r, this.itemY += I + this.lastLineHeight + E, this.lastLineHeight = 0);this.maxItemWidth = Math.max(this.maxItemWidth, l);this.lastItemY = I + this.itemY + E;this.lastLineHeight = Math.max(d, this.lastLineHeight);
          a._legendItemPos = [this.itemX, this.itemY];e ? this.itemX += l : (this.itemY += I + d + E, this.lastLineHeight = d);this.offsetWidth = p || Math.max((e ? this.itemX - r - k : l) + r, this.offsetWidth);
        }, getAllItems: function getAllItems() {
          var a = [];m(this.chart.series, function (c) {
            var d = c && c.options;c && v(d.showInLegend, F(d.linkedTo) ? !1 : void 0, !0) && (a = a.concat(c.legendItems || ("point" === d.legendType ? c.data : c)));
          });return a;
        }, adjustMargins: function adjustMargins(a, c) {
          var d = this.chart,
              b = this.options,
              e = b.align.charAt(0) + b.verticalAlign.charAt(0) + b.layout.charAt(0);
          b.floating || m([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (h, g) {
            h.test(e) && !F(a[g]) && (d[k[g]] = Math.max(d[k[g]], d.legend[(g + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][g] * b[g % 2 ? "x" : "y"] + v(b.margin, 12) + c[g]));
          });
        }, render: function render() {
          var a = this,
              c = a.chart,
              e = c.renderer,
              b = a.group,
              g,
              n,
              k,
              l,
              B = a.box,
              r = a.options,
              z = a.padding;a.itemX = z;a.itemY = a.initialItemY;a.offsetWidth = 0;a.lastItemY = 0;b || (a.group = b = e.g("legend").attr({ zIndex: 7 }).add(), a.contentGroup = e.g().attr({ zIndex: 1 }).add(b), a.scrollGroup = e.g().add(a.contentGroup));a.renderTitle();g = a.getAllItems();h(g, function (a, b) {
            return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0);
          });r.reversed && g.reverse();a.allItems = g;a.display = n = !!g.length;a.lastLineHeight = 0;m(g, function (b) {
            a.renderItem(b);
          });k = (r.width || a.offsetWidth) + z;l = a.lastItemY + a.lastLineHeight + a.titleHeight;l = a.handleOverflow(l);l += z;B || (a.box = B = e.rect().addClass("highcharts-legend-box").attr({ r: r.borderRadius }).add(b), B.isNew = !0);B.attr({ stroke: r.borderColor,
            "stroke-width": r.borderWidth || 0, fill: r.backgroundColor || "none" }).shadow(r.shadow);0 < k && 0 < l && (B[B.isNew ? "attr" : "animate"](B.crisp({ x: 0, y: 0, width: k, height: l }, B.strokeWidth())), B.isNew = !1);B[n ? "show" : "hide"]();a.legendWidth = k;a.legendHeight = l;m(g, function (b) {
            a.positionItem(b);
          });n && b.align(q(r, { width: k, height: l }), !0, "spacingBox");c.isResizing || this.positionCheckboxes();
        }, handleOverflow: function handleOverflow(a) {
          var c = this,
              d = this.chart,
              b = d.renderer,
              e = this.options,
              h = e.y,
              g = this.padding,
              d = d.spacingBox.height + ("top" === e.verticalAlign ? -h : h) - g,
              h = e.maxHeight,
              l,
              n = this.clipRect,
              r = e.navigation,
              k = v(r.animation, !0),
              q = r.arrowSize || 12,
              p = this.nav,
              E = this.pages,
              I,
              u = this.allItems,
              f = function f(a) {
            "number" === typeof a ? n.attr({ height: a }) : n && (c.clipRect = n.destroy(), c.contentGroup.clip());c.contentGroup.div && (c.contentGroup.div.style.clip = a ? "rect(" + g + "px,9999px," + (g + a) + "px,0)" : "auto");
          };"horizontal" !== e.layout || "middle" === e.verticalAlign || e.floating || (d /= 2);h && (d = Math.min(d, h));E.length = 0;a > d && !1 !== r.enabled ? (this.clipHeight = l = Math.max(d - 20 - this.titleHeight - g, 0), this.currentPage = v(this.currentPage, 1), this.fullHeight = a, m(u, function (a, b) {
            var c = a._legendItemPos[1];a = Math.round(a.legendItem.getBBox().height);var f = E.length;if (!f || c - E[f - 1] > l && (I || c) !== E[f - 1]) E.push(I || c), f++;b === u.length - 1 && c + a - E[f - 1] > l && E.push(c);c !== I && (I = c);
          }), n || (n = c.clipRect = b.clipRect(0, g, 9999, 0), c.contentGroup.clip(n)), f(l), p || (this.nav = p = b.g().attr({ zIndex: 1 }).add(this.group), this.up = b.symbol("triangle", 0, 0, q, q).on("click", function () {
            c.scroll(-1, k);
          }).add(p), this.pager = b.text("", 15, 10).addClass("highcharts-legend-navigation").css(r.style).add(p), this.down = b.symbol("triangle-down", 0, 0, q, q).on("click", function () {
            c.scroll(1, k);
          }).add(p)), c.scroll(0), a = d) : p && (f(), this.nav = p.destroy(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0);return a;
        }, scroll: function scroll(a, c) {
          var d = this.pages,
              b = d.length;a = this.currentPage + a;var e = this.clipHeight,
              h = this.options.navigation,
              g = this.pager,
              l = this.padding;a > b && (a = b);0 < a && (void 0 !== c && u(c, this.chart), this.nav.attr({ translateX: l, translateY: e + this.padding + 7 + this.titleHeight, visibility: "visible" }), this.up.attr({ "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }), g.attr({ text: a + "/" + b }), this.down.attr({ x: 18 + this.pager.getBBox().width, "class": a === b ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }), this.up.attr({ fill: 1 === a ? h.inactiveColor : h.activeColor }).css({ cursor: 1 === a ? "default" : "pointer" }), this.down.attr({ fill: a === b ? h.inactiveColor : h.activeColor }).css({ cursor: a === b ? "default" : "pointer" }), c = -d[a - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: c }), this.currentPage = a, this.positionCheckboxes(c));
        } };a.LegendSymbolMixin = { drawRectangle: function drawRectangle(a, c) {
          var d = a.symbolHeight,
              b = a.options.squareSymbol;c.legendSymbol = this.chart.renderer.rect(b ? (a.symbolWidth - d) / 2 : 0, a.baseline - d + 1, b ? d : a.symbolWidth, d, v(a.options.symbolRadius, d / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(c.legendGroup);
        }, drawLineMarker: function drawLineMarker(a) {
          var c = this.options,
              d = c.marker,
              b = a.symbolWidth,
              e = a.symbolHeight,
              h = e / 2,
              g = this.chart.renderer,
              l = this.legendGroup;a = a.baseline - Math.round(.3 * a.fontMetrics.b);var n;n = { "stroke-width": c.lineWidth || 0 };c.dashStyle && (n.dashstyle = c.dashStyle);this.legendLine = g.path(["M", 0, a, "L", b, a]).addClass("highcharts-graph").attr(n).add(l);d && !1 !== d.enabled && (c = Math.min(v(d.radius, h), h), 0 === this.symbol.indexOf("url") && (d = q(d, { width: e, height: e }), c = 0), this.legendSymbol = d = g.symbol(this.symbol, b / 2 - c, a - c, 2 * c, 2 * c, d).addClass("highcharts-point").add(l), d.isMarker = !0);
        } };(/Trident\/7\.0/.test(e.navigator.userAgent) || g) && n(a.Legend.prototype, "positionItem", function (a, c) {
        var d = this,
            b = function b() {
          c._legendItemPos && a.call(d, c);
        };b();setTimeout(b);
      });
    })(K);(function (a) {
      var C = a.addEvent,
          A = a.animate,
          G = a.animObject,
          F = a.attr,
          m = a.doc,
          g = a.Axis,
          k = a.createElement,
          q = a.defaultOptions,
          v = a.discardElement,
          u = a.charts,
          h = a.css,
          e = a.defined,
          n = a.each,
          d = a.extend,
          c = a.find,
          w = a.fireEvent,
          b = a.getStyle,
          y = a.grep,
          D = a.isNumber,
          H = a.isObject,
          l = a.isString,
          B = a.Legend,
          r = a.marginNames,
          z = a.merge,
          M = a.objectEach,
          p = a.Pointer,
          E = a.pick,
          I = a.pInt,
          L = a.removeEvent,
          f = a.seriesTypes,
          t = a.splat,
          R = a.svg,
          J = a.syncTimeout,
          N = a.win,
          O = a.Renderer,
          P = a.Chart = function () {
        this.getArgs.apply(this, arguments);
      };a.chart = function (a, b, c) {
        return new P(a, b, c);
      };d(P.prototype, { callbacks: [], getArgs: function getArgs() {
          var a = [].slice.call(arguments);if (l(a[0]) || a[0].nodeName) this.renderTo = a.shift();this.init(a[0], a[1]);
        }, init: function init(b, c) {
          var f,
              d,
              e = b.series,
              p = b.plotOptions || {};b.series = null;f = z(q, b);for (d in f.plotOptions) {
            f.plotOptions[d].tooltip = p[d] && z(p[d].tooltip) || void 0;
          }f.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;f.series = b.series = e;this.userOptions = b;b = f.chart;d = b.events;this.margin = [];this.spacing = [];this.bounds = { h: {}, v: {} };this.callback = c;this.isResizing = 0;this.options = f;this.axes = [];this.series = [];this.hasCartesianSeries = b.showAxes;var h = this;h.index = u.length;u.push(h);a.chartCount++;d && M(d, function (a, b) {
            C(h, b, a);
          });h.xAxis = [];h.yAxis = [];h.pointCount = h.colorCounter = h.symbolCounter = 0;h.firstRender();
        }, initSeries: function initSeries(b) {
          var c = this.options.chart;
          (c = f[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0);c = new c();c.init(this, b);return c;
        }, orderSeries: function orderSeries(a) {
          var b = this.series;for (a = a || 0; a < b.length; a++) {
            b[a] && (b[a].index = a, b[a].name = b[a].name || "Series " + (b[a].index + 1));
          }
        }, isInsidePlot: function isInsidePlot(a, b, c) {
          var f = c ? b : a;a = c ? a : b;return 0 <= f && f <= this.plotWidth && 0 <= a && a <= this.plotHeight;
        }, redraw: function redraw(b) {
          var c = this.axes,
              f = this.series,
              e = this.pointer,
              p = this.legend,
              h = this.isDirtyLegend,
              l,
              g,
              r = this.hasCartesianSeries,
              t = this.isDirtyBox,
              x,
              k = this.renderer,
              m = k.isHidden(),
              E = [];this.setResponsive && this.setResponsive(!1);a.setAnimation(b, this);m && this.temporaryDisplay();this.layOutTitles();for (b = f.length; b--;) {
            if (x = f[b], x.options.stacking && (l = !0, x.isDirty)) {
              g = !0;break;
            }
          }if (g) for (b = f.length; b--;) {
            x = f[b], x.options.stacking && (x.isDirty = !0);
          }n(f, function (a) {
            a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), h = !0);a.isDirtyData && w(a, "updatedData");
          });h && p.options.enabled && (p.render(), this.isDirtyLegend = !1);l && this.getStacks();r && n(c, function (a) {
            a.updateNames();
            a.setScale();
          });this.getMargins();r && (n(c, function (a) {
            a.isDirty && (t = !0);
          }), n(c, function (a) {
            var b = a.min + "," + a.max;a.extKey !== b && (a.extKey = b, E.push(function () {
              w(a, "afterSetExtremes", d(a.eventArgs, a.getExtremes()));delete a.eventArgs;
            }));(t || l) && a.redraw();
          }));t && this.drawChartBox();w(this, "predraw");n(f, function (a) {
            (t || a.isDirty) && a.visible && a.redraw();a.isDirtyData = !1;
          });e && e.reset(!0);k.draw();w(this, "redraw");w(this, "render");m && this.temporaryDisplay(!0);n(E, function (a) {
            a.call();
          });
        }, get: function get(a) {
          function b(b) {
            return b.id === a || b.options && b.options.id === a;
          }var f,
              d = this.series,
              e;f = c(this.axes, b) || c(this.series, b);for (e = 0; !f && e < d.length; e++) {
            f = c(d[e].points || [], b);
          }return f;
        }, getAxes: function getAxes() {
          var a = this,
              b = this.options,
              c = b.xAxis = t(b.xAxis || {}),
              b = b.yAxis = t(b.yAxis || {});n(c, function (a, b) {
            a.index = b;a.isX = !0;
          });n(b, function (a, b) {
            a.index = b;
          });c = c.concat(b);n(c, function (b) {
            new g(a, b);
          });
        }, getSelectedPoints: function getSelectedPoints() {
          var a = [];n(this.series, function (b) {
            a = a.concat(y(b.data || [], function (a) {
              return a.selected;
            }));
          });return a;
        }, getSelectedSeries: function getSelectedSeries() {
          return y(this.series, function (a) {
            return a.selected;
          });
        }, setTitle: function setTitle(a, b, c) {
          var f = this,
              d = f.options,
              e;e = d.title = z({ style: { color: "#333333", fontSize: d.isStock ? "16px" : "18px" } }, d.title, a);d = d.subtitle = z({ style: { color: "#666666" } }, d.subtitle, b);n([["title", a, e], ["subtitle", b, d]], function (a, b) {
            var c = a[0],
                d = f[c],
                e = a[1];a = a[2];d && e && (f[c] = d = d.destroy());a && a.text && !d && (f[c] = f.renderer.text(a.text, 0, 0, a.useHTML).attr({ align: a.align, "class": "highcharts-" + c, zIndex: a.zIndex || 4 }).add(), f[c].update = function (a) {
              f.setTitle(!b && a, b && a);
            }, f[c].css(a.style));
          });f.layOutTitles(c);
        }, layOutTitles: function layOutTitles(a) {
          var b = 0,
              c,
              f = this.renderer,
              e = this.spacingBox;n(["title", "subtitle"], function (a) {
            var c = this[a],
                p = this.options[a];a = "title" === a ? -3 : p.verticalAlign ? 0 : b + 2;var h;c && (h = p.style.fontSize, h = f.fontMetrics(h, c).b, c.css({ width: (p.width || e.width + p.widthAdjust) + "px" }).align(d({ y: a + h }, p), !1, "spacingBox"), p.floating || p.verticalAlign || (b = Math.ceil(b + c.getBBox(p.useHTML).height)));
          }, this);c = this.titleOffset !== b;this.titleOffset = b;!this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered && E(a, !0) && this.isDirtyBox && this.redraw());
        }, getChartSize: function getChartSize() {
          var c = this.options.chart,
              f = c.width,
              c = c.height,
              d = this.renderTo;e(f) || (this.containerWidth = b(d, "width"));e(c) || (this.containerHeight = b(d, "height"));this.chartWidth = Math.max(0, f || this.containerWidth || 600);this.chartHeight = Math.max(0, a.relativeLength(c, this.chartWidth) || this.containerHeight || 400);
        }, temporaryDisplay: function temporaryDisplay(c) {
          var f = this.renderTo;if (c) for (; f && f.style;) {
            f.hcOrigStyle && (a.css(f, f.hcOrigStyle), delete f.hcOrigStyle), f = f.parentNode;
          } else for (; f && f.style;) {
            "none" === b(f, "display", !1) && (f.hcOrigStyle = { display: f.style.display, height: f.style.height, overflow: f.style.overflow }, c = { display: "block", overflow: "hidden" }, f !== this.renderTo && (c.height = 0), a.css(f, c), f.style.setProperty && f.style.setProperty("display", "block", "important")), f = f.parentNode;
          }
        }, setClassName: function setClassName(a) {
          this.container.className = "highcharts-container " + (a || "");
        }, getContainer: function getContainer() {
          var b,
              c = this.options,
              f = c.chart,
              e,
              p;b = this.renderTo;
          var h = a.uniqueKey(),
              g;b || (this.renderTo = b = f.renderTo);l(b) && (this.renderTo = b = m.getElementById(b));b || a.error(13, !0);e = I(F(b, "data-highcharts-chart"));D(e) && u[e] && u[e].hasRendered && u[e].destroy();F(b, "data-highcharts-chart", this.index);b.innerHTML = "";f.skipClone || b.offsetWidth || this.temporaryDisplay();this.getChartSize();e = this.chartWidth;p = this.chartHeight;g = d({ position: "relative", overflow: "hidden", width: e + "px", height: p + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)" }, f.style);this.container = b = k("div", { id: h }, g, b);this._cursor = b.style.cursor;this.renderer = new (a[f.renderer] || O)(b, e, p, null, f.forExport, c.exporting && c.exporting.allowHTML);this.setClassName(f.className);this.renderer.setStyle(f.style);this.renderer.chartIndex = this.index;
        }, getMargins: function getMargins(a) {
          var b = this.spacing,
              c = this.margin,
              f = this.titleOffset;this.resetMargins();f && !e(c[0]) && (this.plotTop = Math.max(this.plotTop, f + this.options.title.margin + b[0]));this.legend.display && this.legend.adjustMargins(c, b);
          this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value);this.extraTopMargin && (this.plotTop += this.extraTopMargin);a || this.getAxisMargins();
        }, getAxisMargins: function getAxisMargins() {
          var a = this,
              b = a.axisOffset = [0, 0, 0, 0],
              c = a.margin;a.hasCartesianSeries && n(a.axes, function (a) {
            a.visible && a.getOffset();
          });n(r, function (f, d) {
            e(c[d]) || (a[f] += b[d]);
          });a.setChartSize();
        }, reflow: function reflow(a) {
          var c = this,
              f = c.options.chart,
              d = c.renderTo,
              p = e(f.width),
              h = f.width || b(d, "width"),
              f = f.height || b(d, "height"),
              d = a ? a.target : N;if (!p && !c.isPrinting && h && f && (d === N || d === m)) {
            if (h !== c.containerWidth || f !== c.containerHeight) clearTimeout(c.reflowTimeout), c.reflowTimeout = J(function () {
              c.container && c.setSize(void 0, void 0, !1);
            }, a ? 100 : 0);c.containerWidth = h;c.containerHeight = f;
          }
        }, initReflow: function initReflow() {
          var a = this,
              b;b = C(N, "resize", function (b) {
            a.reflow(b);
          });C(a, "destroy", b);
        }, setSize: function setSize(b, c, f) {
          var d = this,
              e = d.renderer;d.isResizing += 1;a.setAnimation(f, d);d.oldChartHeight = d.chartHeight;d.oldChartWidth = d.chartWidth;
          void 0 !== b && (d.options.chart.width = b);void 0 !== c && (d.options.chart.height = c);d.getChartSize();b = e.globalAnimation;(b ? A : h)(d.container, { width: d.chartWidth + "px", height: d.chartHeight + "px" }, b);d.setChartSize(!0);e.setSize(d.chartWidth, d.chartHeight, f);n(d.axes, function (a) {
            a.isDirty = !0;a.setScale();
          });d.isDirtyLegend = !0;d.isDirtyBox = !0;d.layOutTitles();d.getMargins();d.redraw(f);d.oldChartHeight = null;w(d, "resize");J(function () {
            d && w(d, "endResize", null, function () {
              --d.isResizing;
            });
          }, G(b).duration);
        }, setChartSize: function setChartSize(a) {
          function b(a) {
            a = l[a] || 0;return Math.max(m || a, a) / 2;
          }var c = this.inverted,
              f = this.renderer,
              d = this.chartWidth,
              e = this.chartHeight,
              p = this.options.chart,
              h = this.spacing,
              l = this.clipOffset,
              g,
              r,
              t,
              k,
              m;this.plotLeft = g = Math.round(this.plotLeft);this.plotTop = r = Math.round(this.plotTop);this.plotWidth = t = Math.max(0, Math.round(d - g - this.marginRight));this.plotHeight = k = Math.max(0, Math.round(e - r - this.marginBottom));this.plotSizeX = c ? k : t;this.plotSizeY = c ? t : k;this.plotBorderWidth = p.plotBorderWidth || 0;this.spacingBox = f.spacingBox = { x: h[3], y: h[0],
            width: d - h[3] - h[1], height: e - h[0] - h[2] };this.plotBox = f.plotBox = { x: g, y: r, width: t, height: k };m = 2 * Math.floor(this.plotBorderWidth / 2);c = Math.ceil(b(3));f = Math.ceil(b(0));this.clipBox = { x: c, y: f, width: Math.floor(this.plotSizeX - b(1) - c), height: Math.max(0, Math.floor(this.plotSizeY - b(2) - f)) };a || n(this.axes, function (a) {
            a.setAxisSize();a.setAxisTranslation();
          });
        }, resetMargins: function resetMargins() {
          var a = this,
              b = a.options.chart;n(["margin", "spacing"], function (c) {
            var f = b[c],
                d = H(f) ? f : [f, f, f, f];n(["Top", "Right", "Bottom", "Left"], function (f, e) {
              a[c][e] = E(b[c + f], d[e]);
            });
          });n(r, function (b, c) {
            a[b] = E(a.margin[c], a.spacing[c]);
          });a.axisOffset = [0, 0, 0, 0];a.clipOffset = [];
        }, drawChartBox: function drawChartBox() {
          var a = this.options.chart,
              b = this.renderer,
              c = this.chartWidth,
              f = this.chartHeight,
              d = this.chartBackground,
              e = this.plotBackground,
              p = this.plotBorder,
              h,
              l = this.plotBGImage,
              g = a.backgroundColor,
              n = a.plotBackgroundColor,
              r = a.plotBackgroundImage,
              t,
              k = this.plotLeft,
              m = this.plotTop,
              E = this.plotWidth,
              w = this.plotHeight,
              q = this.plotBox,
              I = this.clipRect,
              z = this.clipBox,
              y = "animate";
          d || (this.chartBackground = d = b.rect().addClass("highcharts-background").add(), y = "attr");h = a.borderWidth || 0;t = h + (a.shadow ? 8 : 0);g = { fill: g || "none" };if (h || d["stroke-width"]) g.stroke = a.borderColor, g["stroke-width"] = h;d.attr(g).shadow(a.shadow);d[y]({ x: t / 2, y: t / 2, width: c - t - h % 2, height: f - t - h % 2, r: a.borderRadius });y = "animate";e || (y = "attr", this.plotBackground = e = b.rect().addClass("highcharts-plot-background").add());e[y](q);e.attr({ fill: n || "none" }).shadow(a.plotShadow);r && (l ? l.animate(q) : this.plotBGImage = b.image(r, k, m, E, w).add());I ? I.animate({ width: z.width, height: z.height }) : this.clipRect = b.clipRect(z);y = "animate";p || (y = "attr", this.plotBorder = p = b.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add());p.attr({ stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none" });p[y](p.crisp({ x: k, y: m, width: E, height: w }, -p.strokeWidth()));this.isDirtyBox = !1;
        }, propFromSeries: function propFromSeries() {
          var a = this,
              b = a.options.chart,
              c,
              d = a.options.series,
              e,
              p;n(["inverted", "angular", "polar"], function (h) {
            c = f[b.type || b.defaultSeriesType];
            p = b[h] || c && c.prototype[h];for (e = d && d.length; !p && e--;) {
              (c = f[d[e].type]) && c.prototype[h] && (p = !0);
            }a[h] = p;
          });
        }, linkSeries: function linkSeries() {
          var a = this,
              b = a.series;n(b, function (a) {
            a.linkedSeries.length = 0;
          });n(b, function (b) {
            var c = b.options.linkedTo;l(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = E(b.options.visible, c.options.visible, b.visible));
          });
        }, renderSeries: function renderSeries() {
          n(this.series, function (a) {
            a.translate();a.render();
          });
        }, renderLabels: function renderLabels() {
          var a = this,
              b = a.options.labels;b.items && n(b.items, function (c) {
            var f = d(b.style, c.style),
                e = I(f.left) + a.plotLeft,
                p = I(f.top) + a.plotTop + 12;delete f.left;delete f.top;a.renderer.text(c.html, e, p).attr({ zIndex: 2 }).css(f).add();
          });
        }, render: function render() {
          var a = this.axes,
              b = this.renderer,
              c = this.options,
              f,
              d,
              e;this.setTitle();this.legend = new B(this, c.legend);this.getStacks && this.getStacks();this.getMargins(!0);this.setChartSize();c = this.plotWidth;f = this.plotHeight -= 21;n(a, function (a) {
            a.setScale();
          });this.getAxisMargins();d = 1.1 < c / this.plotWidth;e = 1.05 < f / this.plotHeight;if (d || e) n(a, function (a) {
            (a.horiz && d || !a.horiz && e) && a.setTickInterval(!0);
          }), this.getMargins();this.drawChartBox();this.hasCartesianSeries && n(a, function (a) {
            a.visible && a.render();
          });this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({ zIndex: 3 }).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive && this.setResponsive();this.hasRendered = !0;
        }, addCredits: function addCredits(a) {
          var b = this;a = z(!0, this.options.credits, a);a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
            a.href && (N.location.href = a.href);
          }).attr({ align: a.position.align, zIndex: 8 }).css(a.style).add().align(a.position), this.credits.update = function (a) {
            b.credits = b.credits.destroy();b.addCredits(a);
          });
        }, destroy: function destroy() {
          var b = this,
              c = b.axes,
              f = b.series,
              d = b.container,
              e,
              p = d && d.parentNode;w(b, "destroy");b.renderer.forExport ? a.erase(u, b) : u[b.index] = void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");
          L(b);for (e = c.length; e--;) {
            c[e] = c[e].destroy();
          }this.scroller && this.scroller.destroy && this.scroller.destroy();for (e = f.length; e--;) {
            f[e] = f[e].destroy();
          }n("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (a) {
            var c = b[a];c && c.destroy && (b[a] = c.destroy());
          });d && (d.innerHTML = "", L(d), p && v(d));M(b, function (a, c) {
            delete b[c];
          });
        }, isReadyToRender: function isReadyToRender() {
          var a = this;return R || N != N.top || "complete" === m.readyState ? !0 : (m.attachEvent("onreadystatechange", function () {
            m.detachEvent("onreadystatechange", a.firstRender);"complete" === m.readyState && a.firstRender();
          }), !1);
        }, firstRender: function firstRender() {
          var a = this,
              b = a.options;if (a.isReadyToRender()) {
            a.getContainer();w(a, "init");a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();n(b.series || [], function (b) {
              a.initSeries(b);
            });a.linkSeries();w(a, "beforeRender");p && (a.pointer = new p(a, b));a.render();if (!a.renderer.imgCount && a.onload) a.onload();
            a.temporaryDisplay(!0);
          }
        }, onload: function onload() {
          n([this.callback].concat(this.callbacks), function (a) {
            a && void 0 !== this.index && a.apply(this, [this]);
          }, this);w(this, "load");w(this, "render");e(this.index) && !1 !== this.options.chart.reflow && this.initReflow();this.onload = null;
        } });
    })(K);(function (a) {
      var C,
          A = a.each,
          G = a.extend,
          F = a.erase,
          m = a.fireEvent,
          g = a.format,
          k = a.isArray,
          q = a.isNumber,
          v = a.pick,
          u = a.removeEvent;a.Point = C = function C() {};a.Point.prototype = { init: function init(a, e, g) {
          this.series = a;this.color = a.color;this.applyOptions(e, g);a.options.colorByPoint ? (e = a.options.colors || a.chart.options.colors, this.color = this.color || e[a.colorCounter], e = e.length, g = a.colorCounter, a.colorCounter++, a.colorCounter === e && (a.colorCounter = 0)) : g = a.colorIndex;this.colorIndex = v(this.colorIndex, g);a.chart.pointCount++;return this;
        }, applyOptions: function applyOptions(a, e) {
          var h = this.series,
              d = h.options.pointValKey || h.pointValKey;a = C.prototype.optionsToObject.call(this, a);G(this, a);this.options = this.options ? G(this.options, a) : a;a.group && delete this.group;d && (this.y = this[d]);this.isNull = v(this.isValid && !this.isValid(), null === this.x || !q(this.y, !0));this.selected && (this.state = "select");"name" in this && void 0 === e && h.xAxis && h.xAxis.hasNames && (this.x = h.xAxis.nameToX(this));void 0 === this.x && h && (this.x = void 0 === e ? h.autoIncrement(this) : e);return this;
        }, optionsToObject: function optionsToObject(a) {
          var e = {},
              h = this.series,
              d = h.options.keys,
              c = d || h.pointArrayMap || ["y"],
              g = c.length,
              b = 0,
              m = 0;if (q(a) || null === a) e[c[0]] = a;else if (k(a)) for (!d && a.length > g && (h = _typeof(a[0]), "string" === h ? e.name = a[0] : "number" === h && (e.x = a[0]), b++); m < g;) {
            d && void 0 === a[b] || (e[c[m]] = a[b]), b++, m++;
          } else "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && (e = a, a.dataLabels && (h._hasPointLabels = !0), a.marker && (h._hasPointMarkers = !0));return e;
        }, getClassName: function getClassName() {
          return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "");
        }, getZone: function getZone() {
          var a = this.series,
              e = a.zones,
              a = a.zoneAxis || "y",
              g = 0,
              d;for (d = e[g]; this[a] >= d.value;) {
            d = e[++g];
          }d && d.color && !this.options.color && (this.color = d.color);return d;
        }, destroy: function destroy() {
          var a = this.series.chart,
              e = a.hoverPoints,
              g;a.pointCount--;e && (this.setState(), F(e, this), e.length || (a.hoverPoints = null));if (this === a.hoverPoint) this.onMouseOut();if (this.graphic || this.dataLabel) u(this), this.destroyElements();this.legendItem && a.legend.destroyItem(this);
          for (g in this) {
            this[g] = null;
          }
        }, destroyElements: function destroyElements() {
          for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], e, g = 6; g--;) {
            e = a[g], this[e] && (this[e] = this[e].destroy());
          }
        }, getLabelConfig: function getLabelConfig() {
          return { x: this.category, y: this.y, color: this.color, colorIndex: this.colorIndex, key: this.name || this.category, series: this.series, point: this, percentage: this.percentage, total: this.total || this.stackTotal };
        }, tooltipFormatter: function tooltipFormatter(a) {
          var e = this.series,
              h = e.tooltipOptions,
              d = v(h.valueDecimals, ""),
              c = h.valuePrefix || "",
              k = h.valueSuffix || "";A(e.pointArrayMap || ["y"], function (b) {
            b = "{point." + b;if (c || k) a = a.replace(b + "}", c + b + "}" + k);a = a.replace(b + "}", b + ":,." + d + "f}");
          });return g(a, { point: this, series: this.series });
        }, firePointEvent: function firePointEvent(a, e, g) {
          var d = this,
              c = this.series.options;(c.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents();"click" === a && c.allowPointSelect && (g = function g(a) {
            d.select && d.select(null, a.ctrlKey || a.metaKey || a.shiftKey);
          });m(this, a, e, g);
        }, visible: !0 };
    })(K);
    (function (a) {
      var C = a.addEvent,
          A = a.animObject,
          G = a.arrayMax,
          F = a.arrayMin,
          m = a.correctFloat,
          g = a.Date,
          k = a.defaultOptions,
          q = a.defaultPlotOptions,
          v = a.defined,
          u = a.each,
          h = a.erase,
          e = a.extend,
          n = a.fireEvent,
          d = a.grep,
          c = a.isArray,
          w = a.isNumber,
          b = a.isString,
          y = a.merge,
          D = a.objectEach,
          H = a.pick,
          l = a.removeEvent,
          B = a.splat,
          r = a.SVGElement,
          z = a.syncTimeout,
          M = a.win;a.Series = a.seriesType("line", null, { lineWidth: 2, allowPointSelect: !1, showCheckbox: !1, animation: { duration: 1E3 }, events: {}, marker: { lineWidth: 0, lineColor: "#ffffff", radius: 4,
          states: { hover: { animation: { duration: 50 }, enabled: !0, radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 } } }, point: { events: {} }, dataLabels: { align: "center", formatter: function formatter() {
            return null === this.y ? "" : a.numberFormat(this.y, -1);
          }, style: { fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom", x: 0, y: 0, padding: 5 }, cropThreshold: 300, pointRange: 0, softThreshold: !0, states: { hover: { animation: { duration: 50 }, lineWidthPlus: 1, marker: {},
            halo: { size: 10, opacity: .25 } }, select: { marker: {} } }, stickyTracking: !0, turboThreshold: 1E3, findNearestPointBy: "x" }, { isCartesian: !0, pointClass: a.Point, sorted: !0, requireSorting: !0, directTouch: !1, axisTypes: ["xAxis", "yAxis"], colorCounter: 0, parallelArrays: ["x", "y"], coll: "series", init: function init(a, b) {
          var c = this,
              d,
              f = a.series,
              p;c.chart = a;c.options = b = c.setOptions(b);c.linkedSeries = [];c.bindAxes();e(c, { name: b.name, state: "", visible: !1 !== b.visible, selected: !0 === b.selected });d = b.events;D(d, function (a, b) {
            C(c, b, a);
          });if (d && d.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;c.getColor();c.getSymbol();u(c.parallelArrays, function (a) {
            c[a + "Data"] = [];
          });c.setData(b.data, !1);c.isCartesian && (a.hasCartesianSeries = !0);f.length && (p = f[f.length - 1]);c._i = H(p && p._i, -1) + 1;a.orderSeries(this.insert(f));
        }, insert: function insert(a) {
          var b = this.options.index,
              c;if (w(b)) {
            for (c = a.length; c--;) {
              if (b >= H(a[c].options.index, a[c]._i)) {
                a.splice(c + 1, 0, this);break;
              }
            }-1 === c && a.unshift(this);c += 1;
          } else a.push(this);return H(c, a.length - 1);
        }, bindAxes: function bindAxes() {
          var b = this,
              c = b.options,
              d = b.chart,
              e;u(b.axisTypes || [], function (f) {
            u(d[f], function (a) {
              e = a.options;if (c[f] === e.index || void 0 !== c[f] && c[f] === e.id || void 0 === c[f] && 0 === e.index) b.insert(a.series), b[f] = a, a.isDirty = !0;
            });b[f] || b.optionalAxis === f || a.error(18, !0);
          });
        }, updateParallelArrays: function updateParallelArrays(a, b) {
          var c = a.series,
              d = arguments,
              f = w(b) ? function (f) {
            var d = "y" === f && c.toYData ? c.toYData(a) : a[f];c[f + "Data"][b] = d;
          } : function (a) {
            Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2));
          };u(c.parallelArrays, f);
        }, autoIncrement: function autoIncrement() {
          var a = this.options,
              b = this.xIncrement,
              c,
              d = a.pointIntervalUnit,
              b = H(b, a.pointStart, 0);this.pointInterval = c = H(this.pointInterval, a.pointInterval, 1);d && (a = new g(b), "day" === d ? a = +a[g.hcSetDate](a[g.hcGetDate]() + c) : "month" === d ? a = +a[g.hcSetMonth](a[g.hcGetMonth]() + c) : "year" === d && (a = +a[g.hcSetFullYear](a[g.hcGetFullYear]() + c)), c = a - b);this.xIncrement = b + c;return b;
        }, setOptions: function setOptions(a) {
          var b = this.chart,
              c = b.options,
              d = c.plotOptions,
              f = (b.userOptions || {}).plotOptions || {},
              e = d[this.type];this.userOptions = a;b = y(e, d.series, a);this.tooltipOptions = y(k.tooltip, k.plotOptions.series && k.plotOptions.series.tooltip, k.plotOptions[this.type].tooltip, c.tooltip.userOptions, d.series && d.series.tooltip, d[this.type].tooltip, a.tooltip);this.stickyTracking = H(a.stickyTracking, f[this.type] && f[this.type].stickyTracking, f.series && f.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : b.stickyTracking);null === e.marker && delete b.marker;this.zoneAxis = b.zoneAxis;a = this.zones = (b.zones || []).slice();!b.negativeColor && !b.negativeFillColor || b.zones || a.push({ value: b[this.zoneAxis + "Threshold"] || b.threshold || 0, className: "highcharts-negative", color: b.negativeColor, fillColor: b.negativeFillColor });a.length && v(a[a.length - 1].value) && a.push({ color: this.color, fillColor: this.fillColor });return b;
        }, getCyclic: function getCyclic(a, b, c) {
          var d,
              f = this.chart,
              e = this.userOptions,
              p = a + "Index",
              h = a + "Counter",
              l = c ? c.length : H(f.options.chart[a + "Count"], f[a + "Count"]);b || (d = H(e[p], e["_" + p]), v(d) || (f.series.length || (f[h] = 0), e["_" + p] = d = f[h] % l, f[h] += 1), c && (b = c[d]));void 0 !== d && (this[p] = d);this[a] = b;
        }, getColor: function getColor() {
          this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || q[this.type].color, this.chart.options.colors);
        }, getSymbol: function getSymbol() {
          this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols);
        }, drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker, setData: function setData(d, e, h, l) {
          var f = this,
              p = f.points,
              g = p && p.length || 0,
              r,
              n = f.options,
              k = f.chart,
              m = null,
              q = f.xAxis,
              E = n.turboThreshold,
              z = this.xData,
              y = this.yData,
              I = (r = f.pointArrayMap) && r.length;d = d || [];r = d.length;e = H(e, !0);if (!1 !== l && r && g === r && !f.cropped && !f.hasGroupedData && f.visible) u(d, function (a, b) {
            p[b].update && a !== n.data[b] && p[b].update(a, !1, null, !1);
          });else {
            f.xIncrement = null;f.colorCounter = 0;u(this.parallelArrays, function (a) {
              f[a + "Data"].length = 0;
            });if (E && r > E) {
              for (h = 0; null === m && h < r;) {
                m = d[h], h++;
              }if (w(m)) for (h = 0; h < r; h++) {
                z[h] = this.autoIncrement(), y[h] = d[h];
              } else if (c(m)) {
                if (I) for (h = 0; h < r; h++) {
                  m = d[h], z[h] = m[0], y[h] = m.slice(1, I + 1);
                } else for (h = 0; h < r; h++) {
                  m = d[h], z[h] = m[0], y[h] = m[1];
                }
              } else a.error(12);
            } else for (h = 0; h < r; h++) {
              void 0 !== d[h] && (m = { series: f }, f.pointClass.prototype.applyOptions.apply(m, [d[h]]), f.updateParallelArrays(m, h));
            }b(y[0]) && a.error(14, !0);f.data = [];f.options.data = f.userOptions.data = d;for (h = g; h--;) {
              p[h] && p[h].destroy && p[h].destroy();
            }q && (q.minRange = q.userMinRange);f.isDirty = k.isDirtyBox = !0;f.isDirtyData = !!p;h = !1;
          }"point" === n.legendType && (this.processData(), this.generatePoints());e && k.redraw(h);
        }, processData: function processData(b) {
          var c = this.xData,
              d = this.yData,
              e = c.length,
              f;f = 0;var h,
              p,
              l = this.xAxis,
              g,
              r = this.options;g = r.cropThreshold;var n = this.getExtremesFromAll || r.getExtremesFromAll,
              k = this.isCartesian,
              r = l && l.val2lin,
              m = l && l.isLog,
              q,
              w;if (k && !this.isDirty && !l.isDirty && !this.yAxis.isDirty && !b) return !1;l && (b = l.getExtremes(), q = b.min, w = b.max);if (k && this.sorted && !n && (!g || e > g || this.forceCrop)) if (c[e - 1] < q || c[0] > w) c = [], d = [];else if (c[0] < q || c[e - 1] > w) f = this.cropData(this.xData, this.yData, q, w), c = f.xData, d = f.yData, f = f.start, h = !0;for (g = c.length || 1; --g;) {
            e = m ? r(c[g]) - r(c[g - 1]) : c[g] - c[g - 1], 0 < e && (void 0 === p || e < p) ? p = e : 0 > e && this.requireSorting && a.error(15);
          }this.cropped = h;this.cropStart = f;this.processedXData = c;this.processedYData = d;this.closestPointRange = p;
        }, cropData: function cropData(a, b, c, d) {
          var f = a.length,
              e = 0,
              h = f,
              p = H(this.cropShoulder, 1),
              l;for (l = 0; l < f; l++) {
            if (a[l] >= c) {
              e = Math.max(0, l - p);break;
            }
          }for (c = l; c < f; c++) {
            if (a[c] > d) {
              h = c + p;break;
            }
          }return { xData: a.slice(e, h), yData: b.slice(e, h), start: e, end: h };
        }, generatePoints: function generatePoints() {
          var a = this.options,
              b = a.data,
              c = this.data,
              d,
              f = this.processedXData,
              e = this.processedYData,
              h = this.pointClass,
              l = f.length,
              g = this.cropStart || 0,
              r,
              n = this.hasGroupedData,
              a = a.keys,
              k,
              m = [],
              q;c || n || (c = [], c.length = b.length, c = this.data = c);a && n && (this.options.keys = !1);for (q = 0; q < l; q++) {
            r = g + q, n ? (k = new h().init(this, [f[q]].concat(B(e[q]))), k.dataGroup = this.groupMap[q]) : (k = c[r]) || void 0 === b[r] || (c[r] = k = new h().init(this, b[r], f[q])), k && (k.index = r, m[q] = k);
          }this.options.keys = a;if (c && (l !== (d = c.length) || n)) for (q = 0; q < d; q++) {
            q !== g || n || (q += l), c[q] && (c[q].destroyElements(), c[q].plotX = void 0);
          }this.data = c;this.points = m;
        }, getExtremes: function getExtremes(a) {
          var b = this.yAxis,
              d = this.processedXData,
              e,
              f = [],
              h = 0;e = this.xAxis.getExtremes();var p = e.min,
              l = e.max,
              g,
              r,
              n,
              k;a = a || this.stackedYData || this.processedYData || [];e = a.length;for (k = 0; k < e; k++) {
            if (r = d[k], n = a[k], g = (w(n, !0) || c(n)) && (!b.positiveValuesOnly || n.length || 0 < n), r = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (d[k] || r) >= p && (d[k] || r) <= l, g && r) if (g = n.length) for (; g--;) {
              null !== n[g] && (f[h++] = n[g]);
            } else f[h++] = n;
          }this.dataMin = F(f);this.dataMax = G(f);
        }, translate: function translate() {
          this.processedXData || this.processData();this.generatePoints();var a = this.options,
              b = a.stacking,
              c = this.xAxis,
              d = c.categories,
              f = this.yAxis,
              e = this.points,
              h = e.length,
              l = !!this.modifyValue,
              g = a.pointPlacement,
              r = "between" === g || w(g),
              n = a.threshold,
              k = a.startFromThreshold ? n : 0,
              q,
              z,
              y,
              B,
              u = Number.MAX_VALUE;"between" === g && (g = .5);w(g) && (g *= H(a.pointRange || c.pointRange));for (a = 0; a < h; a++) {
            var D = e[a],
                M = D.x,
                A = D.y;z = D.low;var C = b && f.stacks[(this.negStacks && A < (k ? 0 : n) ? "-" : "") + this.stackKey],
                F;f.positiveValuesOnly && null !== A && 0 >= A && (D.isNull = !0);D.plotX = q = m(Math.min(Math.max(-1E5, c.translate(M, 0, 0, 0, 1, g, "flags" === this.type)), 1E5));b && this.visible && !D.isNull && C && C[M] && (B = this.getStackIndicator(B, M, this.index), F = C[M], A = F.points[B.key], z = A[0], A = A[1], z === k && B.key === C[M].base && (z = H(n, f.min)), f.positiveValuesOnly && 0 >= z && (z = null), D.total = D.stackTotal = F.total, D.percentage = F.total && D.y / F.total * 100, D.stackY = A, F.setOffset(this.pointXOffset || 0, this.barW || 0));D.yBottom = v(z) ? f.translate(z, 0, 1, 0, 1) : null;l && (A = this.modifyValue(A, D));D.plotY = z = "number" === typeof A && Infinity !== A ? Math.min(Math.max(-1E5, f.translate(A, 0, 1, 0, 1)), 1E5) : void 0;D.isInside = void 0 !== z && 0 <= z && z <= f.len && 0 <= q && q <= c.len;D.clientX = r ? m(c.translate(M, 0, 0, 0, 1, g)) : q;D.negative = D.y < (n || 0);D.category = d && void 0 !== d[D.x] ? d[D.x] : D.x;D.isNull || (void 0 !== y && (u = Math.min(u, Math.abs(q - y))), y = q);D.zone = this.zones.length && D.getZone();
          }this.closestPointRangePx = u;
        }, getValidPoints: function getValidPoints(a, b) {
          var c = this.chart;return d(a || this.points || [], function (a) {
            return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull;
          });
        }, setClip: function setClip(a) {
          var b = this.chart,
              c = this.options,
              d = b.renderer,
              f = b.inverted,
              e = this.clipBox,
              h = e || b.clipBox,
              l = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, h.height, c.xAxis, c.yAxis].join(),
              g = b[l],
              p = b[l + "m"];g || (a && (h.width = 0, b[l + "m"] = p = d.clipRect(-99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), b[l] = g = d.clipRect(h), g.count = { length: 0 });a && !g.count[this.index] && (g.count[this.index] = !0, g.count.length += 1);!1 !== c.clip && (this.group.clip(a || e ? g : b.clipRect), this.markerGroup.clip(p), this.sharedClipKey = l);a || (g.count[this.index] && (delete g.count[this.index], --g.count.length), 0 === g.count.length && l && b[l] && (e || (b[l] = b[l].destroy()), b[l + "m"] && (b[l + "m"] = b[l + "m"].destroy())));
        }, animate: function animate(a) {
          var b = this.chart,
              c = A(this.options.animation),
              d;a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({ width: b.plotSizeX }, c), b[d + "m"] && b[d + "m"].animate({ width: b.plotSizeX + 99 }, c), this.animate = null);
        }, afterAnimate: function afterAnimate() {
          this.setClip();
          n(this, "afterAnimate");
        }, drawPoints: function drawPoints() {
          var a = this.points,
              b = this.chart,
              c,
              d,
              f,
              e,
              h = this.options.marker,
              l,
              g,
              r,
              n,
              k = this[this.specialGroup] || this.markerGroup,
              m = H(h.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= 2 * h.radius);if (!1 !== h.enabled || this._hasPointMarkers) for (d = 0; d < a.length; d++) {
            f = a[d], c = f.plotY, e = f.graphic, l = f.marker || {}, g = !!f.marker, r = m && void 0 === l.enabled || l.enabled, n = f.isInside, r && w(c) && null !== f.y ? (c = H(l.symbol, this.symbol), f.hasImage = 0 === c.indexOf("url"), r = this.markerAttribs(f, f.selected && "select"), e ? e[n ? "show" : "hide"](!0).animate(r) : n && (0 < r.width || f.hasImage) && (f.graphic = e = b.renderer.symbol(c, r.x, r.y, r.width, r.height, g ? l : h).add(k)), e && e.attr(this.pointAttribs(f, f.selected && "select")), e && e.addClass(f.getClassName(), !0)) : e && (f.graphic = e.destroy());
          }
        }, markerAttribs: function markerAttribs(a, b) {
          var c = this.options.marker,
              d = a.marker || {},
              f = H(d.radius, c.radius);b && (c = c.states[b], b = d.states && d.states[b], f = H(b && b.radius, c && c.radius, f + (c && c.radiusPlus || 0)));a.hasImage && (f = 0);a = { x: Math.floor(a.plotX) - f, y: a.plotY - f };f && (a.width = a.height = 2 * f);return a;
        }, pointAttribs: function pointAttribs(a, b) {
          var c = this.options.marker,
              d = a && a.options,
              f = d && d.marker || {},
              e = this.color,
              h = d && d.color,
              l = a && a.color,
              d = H(f.lineWidth, c.lineWidth);a = a && a.zone && a.zone.color;e = h || a || l || e;a = f.fillColor || c.fillColor || e;e = f.lineColor || c.lineColor || e;b && (c = c.states[b], b = f.states && f.states[b] || {}, d = H(b.lineWidth, c.lineWidth, d + H(b.lineWidthPlus, c.lineWidthPlus, 0)), a = b.fillColor || c.fillColor || a, e = b.lineColor || c.lineColor || e);return { stroke: e, "stroke-width": d,
            fill: a };
        }, destroy: function destroy() {
          var a = this,
              b = a.chart,
              c = /AppleWebKit\/533/.test(M.navigator.userAgent),
              d,
              f,
              e = a.data || [],
              g,
              k;n(a, "destroy");l(a);u(a.axisTypes || [], function (b) {
            (k = a[b]) && k.series && (h(k.series, a), k.isDirty = k.forceRedraw = !0);
          });a.legendItem && a.chart.legend.destroyItem(a);for (f = e.length; f--;) {
            (g = e[f]) && g.destroy && g.destroy();
          }a.points = null;clearTimeout(a.animationTimeout);D(a, function (a, b) {
            a instanceof r && !a.survive && (d = c && "group" === b ? "hide" : "destroy", a[d]());
          });b.hoverSeries === a && (b.hoverSeries = null);h(b.series, a);b.orderSeries();D(a, function (b, c) {
            delete a[c];
          });
        }, getGraphPath: function getGraphPath(a, b, c) {
          var d = this,
              f = d.options,
              e = f.step,
              h,
              l = [],
              g = [],
              p;a = a || d.points;(h = a.reversed) && a.reverse();(e = { right: 1, center: 2 }[e] || e && 3) && h && (e = 4 - e);!f.connectNulls || b || c || (a = this.getValidPoints(a));u(a, function (h, r) {
            var n = h.plotX,
                k = h.plotY,
                m = a[r - 1];(h.leftCliff || m && m.rightCliff) && !c && (p = !0);h.isNull && !v(b) && 0 < r ? p = !f.connectNulls : h.isNull && !b ? p = !0 : (0 === r || p ? r = ["M", h.plotX, h.plotY] : d.getPointSpline ? r = d.getPointSpline(a, h, r) : e ? (r = 1 === e ? ["L", m.plotX, k] : 2 === e ? ["L", (m.plotX + n) / 2, m.plotY, "L", (m.plotX + n) / 2, k] : ["L", n, m.plotY], r.push("L", n, k)) : r = ["L", n, k], g.push(h.x), e && g.push(h.x), l.push.apply(l, r), p = !1);
          });l.xMap = g;return d.graphPath = l;
        }, drawGraph: function drawGraph() {
          var a = this,
              b = this.options,
              c = (this.gappedPath || this.getGraphPath).call(this),
              d = [["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]];u(this.zones, function (c, e) {
            d.push(["zone-graph-" + e, "highcharts-graph highcharts-zone-graph-" + e + " " + (c.className || ""), c.color || a.color, c.dashStyle || b.dashStyle]);
          });u(d, function (f, d) {
            var e = f[0],
                h = a[e];h ? (h.endX = c.xMap, h.animate({ d: c })) : c.length && (a[e] = a.chart.renderer.path(c).addClass(f[1]).attr({ zIndex: 1 }).add(a.group), h = { stroke: f[2], "stroke-width": b.lineWidth, fill: a.fillGraph && a.color || "none" }, f[3] ? h.dashstyle = f[3] : "square" !== b.linecap && (h["stroke-linecap"] = h["stroke-linejoin"] = "round"), h = a[e].attr(h).shadow(2 > d && b.shadow));h && (h.startX = c.xMap, h.isArea = c.isArea);
          });
        }, applyZones: function applyZones() {
          var a = this,
              b = this.chart,
              c = b.renderer,
              d = this.zones,
              f,
              e,
              h = this.clips || [],
              l,
              g = this.graph,
              r = this.area,
              n = Math.max(b.chartWidth, b.chartHeight),
              k = this[(this.zoneAxis || "y") + "Axis"],
              m,
              q,
              w = b.inverted,
              z,
              y,
              B,
              v,
              D = !1;d.length && (g || r) && k && void 0 !== k.min && (q = k.reversed, z = k.horiz, g && g.hide(), r && r.hide(), m = k.getExtremes(), u(d, function (d, p) {
            f = q ? z ? b.plotWidth : 0 : z ? 0 : k.toPixels(m.min);f = Math.min(Math.max(H(e, f), 0), n);e = Math.min(Math.max(Math.round(k.toPixels(H(d.value, m.max), !0)), 0), n);D && (f = e = k.toPixels(m.max));y = Math.abs(f - e);B = Math.min(f, e);v = Math.max(f, e);k.isXAxis ? (l = { x: w ? v : B, y: 0, width: y, height: n }, z || (l.x = b.plotHeight - l.x)) : (l = { x: 0, y: w ? v : B, width: n, height: y }, z && (l.y = b.plotWidth - l.y));w && c.isVML && (l = k.isXAxis ? { x: 0, y: q ? B : v, height: l.width, width: b.chartWidth } : { x: l.y - b.plotLeft - b.spacingBox.x, y: 0, width: l.height, height: b.chartHeight });h[p] ? h[p].animate(l) : (h[p] = c.clipRect(l), g && a["zone-graph-" + p].clip(h[p]), r && a["zone-area-" + p].clip(h[p]));D = d.value > m.max;
          }), this.clips = h);
        }, invertGroups: function invertGroups(a) {
          function b() {
            u(["group", "markerGroup"], function (b) {
              c[b] && (d.renderer.isVML && c[b].attr({ width: c.yAxis.len, height: c.xAxis.len }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a));
            });
          }var c = this,
              d = c.chart,
              f;c.xAxis && (f = C(d, "resize", b), C(c, "destroy", f), b(a), c.invertGroups = b);
        }, plotGroup: function plotGroup(a, b, c, d, f) {
          var e = this[a],
              h = !e;h && (this[a] = e = this.chart.renderer.g().attr({ zIndex: d || .1 }).add(f));e.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || ""), !0);e.attr({ visibility: c })[h ? "attr" : "animate"](this.getPlotBox());return e;
        }, getPlotBox: function getPlotBox() {
          var a = this.chart,
              b = this.xAxis,
              c = this.yAxis;a.inverted && (b = c, c = this.xAxis);return { translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1 };
        }, render: function render() {
          var a = this,
              b = a.chart,
              c,
              d = a.options,
              f = !!a.animate && b.renderer.isSVG && A(d.animation).duration,
              e = a.visible ? "inherit" : "hidden",
              h = d.zIndex,
              l = a.hasRendered,
              g = b.seriesGroup,
              r = b.inverted;c = a.plotGroup("group", "series", e, h, g);a.markerGroup = a.plotGroup("markerGroup", "markers", e, h, g);f && a.animate(!0);c.inverted = a.isCartesian ? r : !1;a.drawGraph && (a.drawGraph(), a.applyZones());a.drawDataLabels && a.drawDataLabels();a.visible && a.drawPoints();a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();a.invertGroups(r);!1 === d.clip || a.sharedClipKey || l || c.clip(b.clipRect);f && a.animate();l || (a.animationTimeout = z(function () {
            a.afterAnimate();
          }, f));a.isDirty = !1;a.hasRendered = !0;
        }, redraw: function redraw() {
          var a = this.chart,
              b = this.isDirty || this.isDirtyData,
              c = this.group,
              d = this.xAxis,
              f = this.yAxis;c && (a.inverted && c.attr({ width: a.plotWidth, height: a.plotHeight }), c.animate({ translateX: H(d && d.left, a.plotLeft), translateY: H(f && f.top, a.plotTop) }));this.translate();this.render();b && delete this.kdTree;
        }, kdAxisArray: ["clientX", "plotY"], searchPoint: function searchPoint(a, b) {
          var c = this.xAxis,
              d = this.yAxis,
              f = this.chart.inverted;return this.searchKDTree({ clientX: f ? c.len - a.chartY + c.pos : a.chartX - c.pos, plotY: f ? d.len - a.chartX + d.pos : a.chartY - d.pos }, b);
        }, buildKDTree: function buildKDTree() {
          function a(c, f, d) {
            var e, h;if (h = c && c.length) return e = b.kdAxisArray[f % d], c.sort(function (a, b) {
              return a[e] - b[e];
            }), h = Math.floor(h / 2), { point: c[h], left: a(c.slice(0, h), f + 1, d), right: a(c.slice(h + 1), f + 1, d) };
          }this.buildingKdTree = !0;var b = this,
              c = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;delete b.kdTree;z(function () {
            b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);b.buildingKdTree = !1;
          }, b.options.kdNow ? 0 : 1);
        }, searchKDTree: function searchKDTree(a, b) {
          function c(a, b, l, g) {
            var r = b.point,
                p = d.kdAxisArray[l % g],
                n,
                k,
                m = r;k = v(a[f]) && v(r[f]) ? Math.pow(a[f] - r[f], 2) : null;n = v(a[e]) && v(r[e]) ? Math.pow(a[e] - r[e], 2) : null;n = (k || 0) + (n || 0);r.dist = v(n) ? Math.sqrt(n) : Number.MAX_VALUE;r.distX = v(k) ? Math.sqrt(k) : Number.MAX_VALUE;p = a[p] - r[p];n = 0 > p ? "left" : "right";k = 0 > p ? "right" : "left";b[n] && (n = c(a, b[n], l + 1, g), m = n[h] < m[h] ? n : r);b[k] && Math.sqrt(p * p) < m[h] && (a = c(a, b[k], l + 1, g), m = a[h] < m[h] ? a : m);return m;
          }var d = this,
              f = this.kdAxisArray[0],
              e = this.kdAxisArray[1],
              h = b ? "distX" : "dist";b = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;this.kdTree || this.buildingKdTree || this.buildKDTree();if (this.kdTree) return c(a, this.kdTree, b, b);
        } });
    })(K);(function (a) {
      function C(a, e, g, d, c) {
        var h = a.chart.inverted;this.axis = a;this.isNegative = g;this.options = e;this.x = d;this.total = null;this.points = {};this.stack = c;this.rightCliff = this.leftCliff = 0;this.alignOptions = { align: e.align || (h ? g ? "left" : "right" : "center"), verticalAlign: e.verticalAlign || (h ? "middle" : g ? "bottom" : "top"), y: u(e.y, h ? 4 : g ? 14 : -6), x: u(e.x, h ? g ? -6 : 6 : 0) };this.textAlign = e.textAlign || (h ? g ? "right" : "left" : "center");
      }var A = a.Axis,
          G = a.Chart,
          F = a.correctFloat,
          m = a.defined,
          g = a.destroyObjectProperties,
          k = a.each,
          q = a.format,
          v = a.objectEach,
          u = a.pick;a = a.Series;C.prototype = { destroy: function destroy() {
          g(this, this.axis);
        }, render: function render(a) {
          var e = this.options,
              h = e.format,
              h = h ? q(h, this) : e.formatter.call(this);this.label ? this.label.attr({ text: h, visibility: "hidden" }) : this.label = this.axis.chart.renderer.text(h, null, null, e.useHTML).css(e.style).attr({ align: this.textAlign, rotation: e.rotation, visibility: "hidden" }).add(a);
        }, setOffset: function setOffset(a, e) {
          var h = this.axis,
              d = h.chart,
              c = d.inverted,
              g = h.reversed,
              g = this.isNegative && !g || !this.isNegative && g,
              b = h.translate(h.usePercentage ? 100 : this.total, 0, 0, 0, 1),
              h = h.translate(0),
              h = Math.abs(b - h);a = d.xAxis[0].translate(this.x) + a;var k = d.plotHeight,
              c = { x: c ? g ? b : b - h : a, y: c ? k - a - e : g ? k - b - h : k - b, width: c ? h : e, height: c ? e : h };if (e = this.label) e.align(this.alignOptions, null, c), c = e.alignAttr, e[!1 === this.options.crop || d.isInsidePlot(c.x, c.y) ? "show" : "hide"](!0);
        } };G.prototype.getStacks = function () {
        var a = this;k(a.yAxis, function (a) {
          a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks);
        });k(a.series, function (e) {
          !e.options.stacking || !0 !== e.visible && !1 !== a.options.chart.ignoreHiddenSeries || (e.stackKey = e.type + u(e.options.stack, ""));
        });
      };A.prototype.buildStacks = function () {
        var a = this.series,
            e,
            g = u(this.options.reversedStacks, !0),
            d = a.length,
            c;if (!this.isXAxis) {
          this.usePercentage = !1;for (c = d; c--;) {
            a[g ? c : d - c - 1].setStackedPoints();
          }for (c = d; c--;) {
            e = a[g ? c : d - c - 1], e.setStackCliffs && e.setStackCliffs();
          }if (this.usePercentage) for (c = 0; c < d; c++) {
            a[c].setPercentStacks();
          }
        }
      };A.prototype.renderStackTotals = function () {
        var a = this.chart,
            e = a.renderer,
            g = this.stacks,
            d = this.stackTotalGroup;d || (this.stackTotalGroup = d = e.g("stack-labels").attr({ visibility: "visible", zIndex: 6 }).add());d.translate(a.plotLeft, a.plotTop);v(g, function (a) {
          v(a, function (a) {
            a.render(d);
          });
        });
      };A.prototype.resetStacks = function () {
        var a = this,
            e = a.stacks;a.isXAxis || v(e, function (e) {
          v(e, function (d, c) {
            d.touched < a.stacksTouched ? (d.destroy(), delete e[c]) : (d.total = null, d.cum = null);
          });
        });
      };A.prototype.cleanStacks = function () {
        var a;this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks), v(a, function (a) {
          v(a, function (a) {
            a.cum = a.total;
          });
        }));
      };a.prototype.setStackedPoints = function () {
        if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
          var a = this.processedXData,
              e = this.processedYData,
              g = [],
              d = e.length,
              c = this.options,
              k = c.threshold,
              b = c.startFromThreshold ? k : 0,
              q = c.stack,
              c = c.stacking,
              v = this.stackKey,
              H = "-" + v,
              l = this.negStacks,
              B = this.yAxis,
              r = B.stacks,
              z = B.oldStacks,
              M,
              p,
              E,
              I,
              A,
              f,
              t;B.stacksTouched += 1;for (A = 0; A < d; A++) {
            f = a[A], t = e[A], M = this.getStackIndicator(M, f, this.index), I = M.key, E = (p = l && t < (b ? 0 : k)) ? H : v, r[E] || (r[E] = {}), r[E][f] || (z[E] && z[E][f] ? (r[E][f] = z[E][f], r[E][f].total = null) : r[E][f] = new C(B, B.options.stackLabels, p, f, q)), E = r[E][f], null !== t && (E.points[I] = E.points[this.index] = [u(E.cum, b)], m(E.cum) || (E.base = I), E.touched = B.stacksTouched, 0 < M.index && !1 === this.singleStacks && (E.points[I][0] = E.points[this.index + "," + f + ",0"][0])), "percent" === c ? (p = p ? v : H, l && r[p] && r[p][f] ? (p = r[p][f], E.total = p.total = Math.max(p.total, E.total) + Math.abs(t) || 0) : E.total = F(E.total + (Math.abs(t) || 0))) : E.total = F(E.total + (t || 0)), E.cum = u(E.cum, b) + (t || 0), null !== t && (E.points[I].push(E.cum), g[A] = E.cum);
          }"percent" === c && (B.usePercentage = !0);this.stackedYData = g;B.oldStacks = {};
        }
      };a.prototype.setPercentStacks = function () {
        var a = this,
            e = a.stackKey,
            g = a.yAxis.stacks,
            d = a.processedXData,
            c;k([e, "-" + e], function (e) {
          for (var b = d.length, h, k; b--;) {
            if (h = d[b], c = a.getStackIndicator(c, h, a.index, e), h = (k = g[e] && g[e][h]) && k.points[c.key]) k = k.total ? 100 / k.total : 0, h[0] = F(h[0] * k), h[1] = F(h[1] * k), a.stackedYData[b] = h[1];
          }
        });
      };a.prototype.getStackIndicator = function (a, e, g, d) {
        !m(a) || a.x !== e || d && a.key !== d ? a = { x: e, index: 0, key: d } : a.index++;a.key = [g, e, a.index].join();return a;
      };
    })(K);(function (a) {
      var C = a.addEvent,
          A = a.animate,
          G = a.Axis,
          F = a.createElement,
          m = a.css,
          g = a.defined,
          k = a.each,
          q = a.erase,
          v = a.extend,
          u = a.fireEvent,
          h = a.inArray,
          e = a.isNumber,
          n = a.isObject,
          d = a.isArray,
          c = a.merge,
          w = a.objectEach,
          b = a.pick,
          y = a.Point,
          D = a.Series,
          H = a.seriesTypes,
          l = a.setAnimation,
          B = a.splat;v(a.Chart.prototype, { addSeries: function addSeries(a, c, d) {
          var e,
              h = this;a && (c = b(c, !0), u(h, "addSeries", { options: a }, function () {
            e = h.initSeries(a);h.isDirtyLegend = !0;h.linkSeries();c && h.redraw(d);
          }));return e;
        }, addAxis: function addAxis(a, d, e, h) {
          var g = d ? "xAxis" : "yAxis",
              l = this.options;a = c(a, { index: this[g].length, isX: d });new G(this, a);l[g] = B(l[g] || {});l[g].push(a);b(e, !0) && this.redraw(h);
        }, showLoading: function showLoading(a) {
          var b = this,
              c = b.options,
              d = b.loadingDiv,
              e = c.loading,
              h = function h() {
            d && m(d, { left: b.plotLeft + "px", top: b.plotTop + "px", width: b.plotWidth + "px", height: b.plotHeight + "px" });
          };
          d || (b.loadingDiv = d = F("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, b.container), b.loadingSpan = F("span", { className: "highcharts-loading-inner" }, null, d), C(b, "redraw", h));d.className = "highcharts-loading";b.loadingSpan.innerHTML = a || c.lang.loading;m(d, v(e.style, { zIndex: 10 }));m(b.loadingSpan, e.labelStyle);b.loadingShown || (m(d, { opacity: 0, display: "" }), A(d, { opacity: e.style.opacity || .5 }, { duration: e.showDuration || 0 }));b.loadingShown = !0;h();
        }, hideLoading: function hideLoading() {
          var a = this.options,
              b = this.loadingDiv;b && (b.className = "highcharts-loading highcharts-loading-hidden", A(b, { opacity: 0 }, { duration: a.loading.hideDuration || 100, complete: function complete() {
              m(b, { display: "none" });
            } }));this.loadingShown = !1;
        }, propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "), propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),
        update: function update(a, d) {
          var l = this,
              r = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle" },
              n = a.chart,
              m,
              q;if (n) {
            c(!0, l.options.chart, n);"className" in n && l.setClassName(n.className);if ("inverted" in n || "polar" in n) l.propFromSeries(), m = !0;"alignTicks" in n && (m = !0);w(n, function (a, b) {
              -1 !== h("chart." + b, l.propsRequireUpdateSeries) && (q = !0);-1 !== h(b, l.propsRequireDirtyBox) && (l.isDirtyBox = !0);
            });"style" in n && l.renderer.setStyle(n.style);
          }a.colors && (this.options.colors = a.colors);a.plotOptions && c(!0, this.options.plotOptions, a.plotOptions);w(a, function (a, b) {
            if (l[b] && "function" === typeof l[b].update) l[b].update(a, !1);else if ("function" === typeof l[r[b]]) l[r[b]](a);"chart" !== b && -1 !== h(b, l.propsRequireUpdateSeries) && (q = !0);
          });k("xAxis yAxis zAxis series colorAxis pane".split(" "), function (b) {
            a[b] && k(B(a[b]), function (a, c) {
              (c = g(a.id) && l.get(a.id) || l[b][c]) && c.coll === b && c.update(a, !1);
            });
          });m && k(l.axes, function (a) {
            a.update({}, !1);
          });q && k(l.series, function (a) {
            a.update({}, !1);
          });a.loading && c(!0, l.options.loading, a.loading);m = n && n.width;
          n = n && n.height;e(m) && m !== l.chartWidth || e(n) && n !== l.chartHeight ? l.setSize(m, n) : b(d, !0) && l.redraw();
        }, setSubtitle: function setSubtitle(a) {
          this.setTitle(void 0, a);
        } });v(y.prototype, { update: function update(a, c, d, e) {
          function h() {
            l.applyOptions(a);null === l.y && f && (l.graphic = f.destroy());n(a, !0) && (f && f.element && a && a.marker && a.marker.symbol && (l.graphic = f.destroy()), a && a.dataLabels && l.dataLabel && (l.dataLabel = l.dataLabel.destroy()));r = l.index;g.updateParallelArrays(l, r);p.data[r] = n(p.data[r], !0) || n(a, !0) ? l.options : a;g.isDirty = g.isDirtyData = !0;!g.fixedBox && g.hasCartesianSeries && (k.isDirtyBox = !0);"point" === p.legendType && (k.isDirtyLegend = !0);c && k.redraw(d);
          }var l = this,
              g = l.series,
              f = l.graphic,
              r,
              k = g.chart,
              p = g.options;c = b(c, !0);!1 === e ? h() : l.firePointEvent("update", { options: a }, h);
        }, remove: function remove(a, b) {
          this.series.removePoint(h(this, this.series.data), a, b);
        } });v(D.prototype, { addPoint: function addPoint(a, c, d, e) {
          var h = this.options,
              l = this.data,
              g = this.chart,
              f = this.xAxis,
              f = f && f.hasNames && f.names,
              r = h.data,
              k,
              p,
              n = this.xData,
              m,
              q;c = b(c, !0);k = { series: this };this.pointClass.prototype.applyOptions.apply(k, [a]);q = k.x;m = n.length;if (this.requireSorting && q < n[m - 1]) for (p = !0; m && n[m - 1] > q;) {
            m--;
          }this.updateParallelArrays(k, "splice", m, 0, 0);this.updateParallelArrays(k, m);f && k.name && (f[q] = k.name);r.splice(m, 0, a);p && (this.data.splice(m, 0, null), this.processData());"point" === h.legendType && this.generatePoints();d && (l[0] && l[0].remove ? l[0].remove(!1) : (l.shift(), this.updateParallelArrays(k, "shift"), r.shift()));this.isDirtyData = this.isDirty = !0;c && g.redraw(e);
        }, removePoint: function removePoint(a, c, d) {
          var e = this,
              h = e.data,
              g = h[a],
              k = e.points,
              f = e.chart,
              r = function r() {
            k && k.length === h.length && k.splice(a, 1);h.splice(a, 1);e.options.data.splice(a, 1);e.updateParallelArrays(g || { series: e }, "splice", a, 1);g && g.destroy();e.isDirty = !0;e.isDirtyData = !0;c && f.redraw();
          };l(d, f);c = b(c, !0);g ? g.firePointEvent("remove", null, r) : r();
        }, remove: function remove(a, c, d) {
          function e() {
            h.destroy();l.isDirtyLegend = l.isDirtyBox = !0;l.linkSeries();b(a, !0) && l.redraw(c);
          }var h = this,
              l = h.chart;!1 !== d ? u(h, "remove", null, e) : e();
        }, update: function update(a, d) {
          var e = this,
              h = e.chart,
              l = e.userOptions,
              g = e.oldType || e.type,
              r = a.type || l.type || h.options.chart.type,
              f = H[g].prototype,
              n = ["group", "markerGroup", "dataLabelsGroup"],
              m;if (Object.keys && "data" === Object.keys(a).toString()) return this.setData(a.data, d);if (r && r !== g || void 0 !== a.zIndex) n.length = 0;k(n, function (a) {
            n[a] = e[a];delete e[a];
          });a = c(l, { animation: !1, index: e.index, pointStart: e.xData[0] }, { data: e.options.data }, a);e.remove(!1, null, !1);for (m in f) {
            e[m] = void 0;
          }v(e, H[r || g].prototype);k(n, function (a) {
            e[a] = n[a];
          });e.init(h, a);e.oldType = g;h.linkSeries();b(d, !0) && h.redraw(!1);
        } });v(G.prototype, { update: function update(a, d) {
          var e = this.chart;a = e.options[this.coll][this.options.index] = c(this.userOptions, a);this.destroy(!0);this.init(e, v(a, { events: void 0 }));e.isDirtyBox = !0;b(d, !0) && e.redraw();
        }, remove: function remove(a) {
          for (var c = this.chart, e = this.coll, h = this.series, l = h.length; l--;) {
            h[l] && h[l].remove(!1);
          }q(c.axes, this);q(c[e], this);d(c.options[e]) ? c.options[e].splice(this.options.index, 1) : delete c.options[e];k(c[e], function (a, b) {
            a.options.index = b;
          });this.destroy();c.isDirtyBox = !0;b(a, !0) && c.redraw();
        }, setTitle: function setTitle(a, b) {
          this.update({ title: a }, b);
        }, setCategories: function setCategories(a, b) {
          this.update({ categories: a }, b);
        } });
    })(K);(function (a) {
      var C = a.color,
          A = a.each,
          G = a.map,
          F = a.pick,
          m = a.Series,
          g = a.seriesType;g("area", "line", { softThreshold: !1, threshold: 0 }, { singleStacks: !1, getStackPoints: function getStackPoints() {
          var g = [],
              m = [],
              v = this.xAxis,
              u = this.yAxis,
              h = u.stacks[this.stackKey],
              e = {},
              n = this.points,
              d = this.index,
              c = u.series,
              w = c.length,
              b,
              y = F(u.options.reversedStacks, !0) ? 1 : -1,
              D;if (this.options.stacking) {
            for (D = 0; D < n.length; D++) {
              e[n[D].x] = n[D];
            }a.objectEach(h, function (a, b) {
              null !== a.total && m.push(b);
            });m.sort(function (a, b) {
              return a - b;
            });b = G(c, function () {
              return this.visible;
            });A(m, function (a, c) {
              var l = 0,
                  k,
                  n;if (e[a] && !e[a].isNull) g.push(e[a]), A([-1, 1], function (l) {
                var g = 1 === l ? "rightNull" : "leftNull",
                    r = 0,
                    q = h[m[c + l]];if (q) for (D = d; 0 <= D && D < w;) {
                  k = q.points[D], k || (D === d ? e[a][g] = !0 : b[D] && (n = h[a].points[D]) && (r -= n[1] - n[0])), D += y;
                }e[a][1 === l ? "rightCliff" : "leftCliff"] = r;
              });else {
                for (D = d; 0 <= D && D < w;) {
                  if (k = h[a].points[D]) {
                    l = k[1];break;
                  }D += y;
                }l = u.translate(l, 0, 1, 0, 1);g.push({ isNull: !0, plotX: v.translate(a, 0, 0, 0, 1), x: a, plotY: l, yBottom: l });
              }
            });
          }return g;
        }, getGraphPath: function getGraphPath(a) {
          var g = m.prototype.getGraphPath,
              k = this.options,
              u = k.stacking,
              h = this.yAxis,
              e,
              n,
              d = [],
              c = [],
              w = this.index,
              b,
              y = h.stacks[this.stackKey],
              D = k.threshold,
              A = h.getThreshold(k.threshold),
              l,
              k = k.connectNulls || "percent" === u,
              B = function B(e, l, g) {
            var k = a[e];e = u && y[k.x].points[w];var n = k[g + "Null"] || 0;g = k[g + "Cliff"] || 0;var r,
                m,
                k = !0;g || n ? (r = (n ? e[0] : e[1]) + g, m = e[0] + g, k = !!n) : !u && a[l] && a[l].isNull && (r = m = D);void 0 !== r && (c.push({ plotX: b, plotY: null === r ? A : h.getThreshold(r), isNull: k, isCliff: !0 }), d.push({ plotX: b, plotY: null === m ? A : h.getThreshold(m), doCurve: !1 }));
          };a = a || this.points;u && (a = this.getStackPoints());for (e = 0; e < a.length; e++) {
            if (n = a[e].isNull, b = F(a[e].rectPlotX, a[e].plotX), l = F(a[e].yBottom, A), !n || k) k || B(e, e - 1, "left"), n && !u && k || (c.push(a[e]), d.push({ x: e, plotX: b, plotY: l })), k || B(e, e + 1, "right");
          }e = g.call(this, c, !0, !0);d.reversed = !0;n = g.call(this, d, !0, !0);n.length && (n[0] = "L");n = e.concat(n);g = g.call(this, c, !1, k);n.xMap = e.xMap;this.areaPath = n;return g;
        }, drawGraph: function drawGraph() {
          this.areaPath = [];m.prototype.drawGraph.apply(this);var a = this,
              g = this.areaPath,
              v = this.options,
              u = [["area", "highcharts-area", this.color, v.fillColor]];A(this.zones, function (h, e) {
            u.push(["zone-area-" + e, "highcharts-area highcharts-zone-area-" + e + " " + h.className, h.color || a.color, h.fillColor || v.fillColor]);
          });A(u, function (h) {
            var e = h[0],
                k = a[e];k ? (k.endX = g.xMap, k.animate({ d: g })) : (k = a[e] = a.chart.renderer.path(g).addClass(h[1]).attr({ fill: F(h[3], C(h[2]).setOpacity(F(v.fillOpacity, .75)).get()), zIndex: 0 }).add(a.group), k.isArea = !0);k.startX = g.xMap;k.shiftUnit = v.step ? 2 : 1;
          });
        }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle });
    })(K);(function (a) {
      var C = a.pick;a = a.seriesType;a("spline", "line", {}, { getPointSpline: function getPointSpline(a, G, F) {
          var m = G.plotX,
              g = G.plotY,
              k = a[F - 1];F = a[F + 1];var q, v, u, h;if (k && !k.isNull && !1 !== k.doCurve && !G.isCliff && F && !F.isNull && !1 !== F.doCurve && !G.isCliff) {
            a = k.plotY;u = F.plotX;F = F.plotY;var e = 0;q = (1.5 * m + k.plotX) / 2.5;v = (1.5 * g + a) / 2.5;u = (1.5 * m + u) / 2.5;h = (1.5 * g + F) / 2.5;u !== q && (e = (h - v) * (u - m) / (u - q) + g - h);v += e;h += e;v > a && v > g ? (v = Math.max(a, g), h = 2 * g - v) : v < a && v < g && (v = Math.min(a, g), h = 2 * g - v);h > F && h > g ? (h = Math.max(F, g), v = 2 * g - h) : h < F && h < g && (h = Math.min(F, g), v = 2 * g - h);G.rightContX = u;G.rightContY = h;
          }G = ["C", C(k.rightContX, k.plotX), C(k.rightContY, k.plotY), C(q, m), C(v, g), m, g];k.rightContX = k.rightContY = null;return G;
        } });
    })(K);(function (a) {
      var C = a.seriesTypes.area.prototype,
          A = a.seriesType;A("areaspline", "spline", a.defaultPlotOptions.area, { getStackPoints: C.getStackPoints,
        getGraphPath: C.getGraphPath, setStackCliffs: C.setStackCliffs, drawGraph: C.drawGraph, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle });
    })(K);(function (a) {
      var C = a.animObject,
          A = a.color,
          G = a.each,
          F = a.extend,
          m = a.isNumber,
          g = a.merge,
          k = a.pick,
          q = a.Series,
          v = a.seriesType,
          u = a.svg;v("column", "line", { borderRadius: 0, crisp: !0, groupPadding: .2, marker: null, pointPadding: .1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: { hover: { halo: !1, brightness: .1, shadow: !1 }, select: { color: "#cccccc", borderColor: "#000000", shadow: !1 } },
        dataLabels: { align: null, verticalAlign: null, y: null }, softThreshold: !1, startFromThreshold: !0, stickyTracking: !1, tooltip: { distance: 6 }, threshold: 0, borderColor: "#ffffff" }, { cropShoulder: 0, directTouch: !0, trackerGroups: ["group", "dataLabelsGroup"], negStacks: !0, init: function init() {
          q.prototype.init.apply(this, arguments);var a = this,
              e = a.chart;e.hasRendered && G(e.series, function (e) {
            e.type === a.type && (e.isDirty = !0);
          });
        }, getColumnMetrics: function getColumnMetrics() {
          var a = this,
              e = a.options,
              g = a.xAxis,
              d = a.yAxis,
              c = g.reversed,
              m,
              b = {},
              q = 0;!1 === e.grouping ? q = 1 : G(a.chart.series, function (c) {
            var e = c.options,
                g = c.yAxis,
                h;c.type !== a.type || !c.visible && a.chart.options.chart.ignoreHiddenSeries || d.len !== g.len || d.pos !== g.pos || (e.stacking ? (m = c.stackKey, void 0 === b[m] && (b[m] = q++), h = b[m]) : !1 !== e.grouping && (h = q++), c.columnIndex = h);
          });var u = Math.min(Math.abs(g.transA) * (g.ordinalSlope || e.pointRange || g.closestPointRange || g.tickInterval || 1), g.len),
              v = u * e.groupPadding,
              l = (u - 2 * v) / (q || 1),
              e = Math.min(e.maxPointWidth || g.len, k(e.pointWidth, l * (1 - 2 * e.pointPadding)));a.columnMetrics = { width: e, offset: (l - e) / 2 + (v + ((a.columnIndex || 0) + (c ? 1 : 0)) * l - u / 2) * (c ? -1 : 1) };return a.columnMetrics;
        }, crispCol: function crispCol(a, e, g, d) {
          var c = this.chart,
              h = this.borderWidth,
              b = -(h % 2 ? .5 : 0),
              h = h % 2 ? .5 : 1;c.inverted && c.renderer.isVML && (h += 1);this.options.crisp && (g = Math.round(a + g) + b, a = Math.round(a) + b, g -= a);d = Math.round(e + d) + h;b = .5 >= Math.abs(e) && .5 < d;e = Math.round(e) + h;d -= e;b && d && (--e, d += 1);return { x: a, y: e, width: g, height: d };
        }, translate: function translate() {
          var a = this,
              e = a.chart,
              g = a.options,
              d = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
              d = a.borderWidth = k(g.borderWidth, d ? 0 : 1),
              c = a.yAxis,
              m = a.translatedThreshold = c.getThreshold(g.threshold),
              b = k(g.minPointLength, 5),
              y = a.getColumnMetrics(),
              u = y.width,
              v = a.barW = Math.max(u, 1 + 2 * d),
              l = a.pointXOffset = y.offset;e.inverted && (m -= .5);g.pointPadding && (v = Math.ceil(v));q.prototype.translate.apply(a);G(a.points, function (d) {
            var g = k(d.yBottom, m),
                h = 999 + Math.abs(g),
                h = Math.min(Math.max(-h, d.plotY), c.len + h),
                n = d.plotX + l,
                p = v,
                q = Math.min(h, g),
                w,
                y = Math.max(h, g) - q;Math.abs(y) < b && b && (y = b, w = !c.reversed && !d.negative || c.reversed && d.negative, q = Math.abs(q - m) > b ? g - b : m - (w ? b : 0));d.barX = n;d.pointWidth = u;d.tooltipPos = e.inverted ? [c.len + c.pos - e.plotLeft - h, a.xAxis.len - n - p / 2, y] : [n + p / 2, h + c.pos - e.plotTop, y];d.shapeType = "rect";d.shapeArgs = a.crispCol.apply(a, d.isNull ? [n, m, p, 0] : [n, q, p, y]);
          });
        }, getSymbol: a.noop, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, drawGraph: function drawGraph() {
          this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data");
        }, pointAttribs: function pointAttribs(a, e) {
          var h = this.options,
              d,
              c = this.pointAttrToOptions || {};
          d = c.stroke || "borderColor";var k = c["stroke-width"] || "borderWidth",
              b = a && a.color || this.color,
              m = a[d] || h[d] || this.color || b,
              q = a[k] || h[k] || this[k] || 0,
              c = h.dashStyle;a && this.zones.length && (b = a.getZone(), b = a.options.color || b && b.color || this.color);e && (a = g(h.states[e], a.options.states && a.options.states[e] || {}), e = a.brightness, b = a.color || void 0 !== e && A(b).brighten(a.brightness).get() || b, m = a[d] || m, q = a[k] || q, c = a.dashStyle || c);d = { fill: b, stroke: m, "stroke-width": q };h.borderRadius && (d.r = h.borderRadius);c && (d.dashstyle = c);return d;
        }, drawPoints: function drawPoints() {
          var a = this,
              e = this.chart,
              k = a.options,
              d = e.renderer,
              c = k.animationLimit || 250,
              q;G(a.points, function (b) {
            var h = b.graphic;if (m(b.plotY) && null !== b.y) {
              q = b.shapeArgs;if (h) h[e.pointCount < c ? "animate" : "attr"](g(q));else b.graphic = h = d[b.shapeType](q).add(b.group || a.group);h.attr(a.pointAttribs(b, b.selected && "select")).shadow(k.shadow, null, k.stacking && !k.borderRadius);h.addClass(b.getClassName(), !0);
            } else h && (b.graphic = h.destroy());
          });
        }, animate: function animate(a) {
          var e = this,
              g = this.yAxis,
              d = e.options,
              c = this.chart.inverted,
              h = {};u && (a ? (h.scaleY = .001, a = Math.min(g.pos + g.len, Math.max(g.pos, g.toPixels(d.threshold))), c ? h.translateX = a - g.len : h.translateY = a, e.group.attr(h)) : (h[c ? "translateX" : "translateY"] = g.pos, e.group.animate(h, F(C(e.options.animation), { step: function step(a, c) {
              e.group.attr({ scaleY: Math.max(.001, c.pos) });
            } })), e.animate = null));
        }, remove: function remove() {
          var a = this,
              e = a.chart;e.hasRendered && G(e.series, function (e) {
            e.type === a.type && (e.isDirty = !0);
          });q.prototype.remove.apply(a, arguments);
        } });
    })(K);
    (function (a) {
      a = a.seriesType;a("bar", "column", null, { inverted: !0 });
    })(K);(function (a) {
      var C = a.Series;a = a.seriesType;a("scatter", "line", { lineWidth: 0, findNearestPointBy: "xy", marker: { enabled: !0 }, tooltip: { headerFormat: "<span style=\"color:{point.color}\">\u25CF</span> <span style=\"font-size: 0.85em\"> {series.name}</span><br/>", pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e" } }, { sorted: !1, requireSorting: !1, noSharedTooltip: !0,
        trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], takeOrdinalPosition: !1, drawGraph: function drawGraph() {
          this.options.lineWidth && C.prototype.drawGraph.call(this);
        } });
    })(K);(function (a) {
      var C = a.pick,
          A = a.relativeLength;a.CenteredSeriesMixin = { getCenter: function getCenter() {
          var a = this.options,
              F = this.chart,
              m = 2 * (a.slicedOffset || 0),
              g = F.plotWidth - 2 * m,
              F = F.plotHeight - 2 * m,
              k = a.center,
              k = [C(k[0], "50%"), C(k[1], "50%"), a.size || "100%", a.innerSize || 0],
              q = Math.min(g, F),
              v,
              u;for (v = 0; 4 > v; ++v) {
            u = k[v], a = 2 > v || 2 === v && /%$/.test(u), k[v] = A(u, [g, F, q, k[2]][v]) + (a ? m : 0);
          }k[3] > k[2] && (k[3] = k[2]);return k;
        } };
    })(K);(function (a) {
      var C = a.addEvent,
          A = a.defined,
          G = a.each,
          F = a.extend,
          m = a.inArray,
          g = a.noop,
          k = a.pick,
          q = a.Point,
          v = a.Series,
          u = a.seriesType,
          h = a.setAnimation;u("pie", "line", { center: [null, null], clip: !1, colorByPoint: !0, dataLabels: { distance: 30, enabled: !0, formatter: function formatter() {
            return this.point.isNull ? void 0 : this.point.name;
          }, x: 0 }, ignoreHiddenPoint: !0, legendType: "point", marker: null, size: null, showInLegend: !1, slicedOffset: 10, stickyTracking: !1, tooltip: { followPointer: !0 },
        borderColor: "#ffffff", borderWidth: 1, states: { hover: { brightness: .1, shadow: !1 } } }, { isCartesian: !1, requireSorting: !1, directTouch: !0, noSharedTooltip: !0, trackerGroups: ["group", "dataLabelsGroup"], axisTypes: [], pointAttribs: a.seriesTypes.column.prototype.pointAttribs, animate: function animate(a) {
          var e = this,
              d = e.points,
              c = e.startAngleRad;a || (G(d, function (a) {
            var b = a.graphic,
                d = a.shapeArgs;b && (b.attr({ r: a.startR || e.center[3] / 2, start: c, end: c }), b.animate({ r: d.r, start: d.start, end: d.end }, e.options.animation));
          }), e.animate = null);
        },
        updateTotals: function updateTotals() {
          var a,
              g = 0,
              d = this.points,
              c = d.length,
              h,
              b = this.options.ignoreHiddenPoint;for (a = 0; a < c; a++) {
            h = d[a], g += b && !h.visible ? 0 : h.isNull ? 0 : h.y;
          }this.total = g;for (a = 0; a < c; a++) {
            h = d[a], h.percentage = 0 < g && (h.visible || !b) ? h.y / g * 100 : 0, h.total = g;
          }
        }, generatePoints: function generatePoints() {
          v.prototype.generatePoints.call(this);this.updateTotals();
        }, translate: function translate(a) {
          this.generatePoints();var e = 0,
              d = this.options,
              c = d.slicedOffset,
              g = c + (d.borderWidth || 0),
              b,
              h,
              m,
              q = d.startAngle || 0,
              l = this.startAngleRad = Math.PI / 180 * (q - 90),
              q = (this.endAngleRad = Math.PI / 180 * (k(d.endAngle, q + 360) - 90)) - l,
              u = this.points,
              r,
              z = d.dataLabels.distance,
              d = d.ignoreHiddenPoint,
              v,
              p = u.length,
              E;a || (this.center = a = this.getCenter());this.getX = function (b, c, d) {
            m = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + d.labelDistance), 1));return a[0] + (c ? -1 : 1) * Math.cos(m) * (a[2] / 2 + d.labelDistance);
          };for (v = 0; v < p; v++) {
            E = u[v];E.labelDistance = k(E.options.dataLabels && E.options.dataLabels.distance, z);this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, E.labelDistance);b = l + e * q;if (!d || E.visible) e += E.percentage / 100;h = l + e * q;E.shapeType = "arc";E.shapeArgs = { x: a[0], y: a[1], r: a[2] / 2, innerR: a[3] / 2, start: Math.round(1E3 * b) / 1E3, end: Math.round(1E3 * h) / 1E3 };m = (h + b) / 2;m > 1.5 * Math.PI ? m -= 2 * Math.PI : m < -Math.PI / 2 && (m += 2 * Math.PI);E.slicedTranslation = { translateX: Math.round(Math.cos(m) * c), translateY: Math.round(Math.sin(m) * c) };h = Math.cos(m) * a[2] / 2;r = Math.sin(m) * a[2] / 2;E.tooltipPos = [a[0] + .7 * h, a[1] + .7 * r];E.half = m < -Math.PI / 2 || m > Math.PI / 2 ? 1 : 0;E.angle = m;b = Math.min(g, E.labelDistance / 5);E.labelPos = [a[0] + h + Math.cos(m) * E.labelDistance, a[1] + r + Math.sin(m) * E.labelDistance, a[0] + h + Math.cos(m) * b, a[1] + r + Math.sin(m) * b, a[0] + h, a[1] + r, 0 > E.labelDistance ? "center" : E.half ? "right" : "left", m];
          }
        }, drawGraph: null, drawPoints: function drawPoints() {
          var a = this,
              g = a.chart.renderer,
              d,
              c,
              h,
              b,
              k = a.options.shadow;k && !a.shadowGroup && (a.shadowGroup = g.g("shadow").add(a.group));G(a.points, function (e) {
            if (!e.isNull) {
              c = e.graphic;b = e.shapeArgs;d = e.getTranslate();var m = e.shadowGroup;k && !m && (m = e.shadowGroup = g.g("shadow").add(a.shadowGroup));m && m.attr(d);h = a.pointAttribs(e, e.selected && "select");c ? c.setRadialReference(a.center).attr(h).animate(F(b, d)) : (e.graphic = c = g[e.shapeType](b).setRadialReference(a.center).attr(d).add(a.group), e.visible || c.attr({ visibility: "hidden" }), c.attr(h).attr({ "stroke-linejoin": "round" }).shadow(k, m));c.addClass(e.getClassName());
            }
          });
        }, searchPoint: g, sortByAngle: function sortByAngle(a, g) {
          a.sort(function (a, c) {
            return void 0 !== a.angle && (c.angle - a.angle) * g;
          });
        }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, getCenter: a.CenteredSeriesMixin.getCenter, getSymbol: g }, { init: function init() {
          q.prototype.init.apply(this, arguments);var a = this,
              g;a.name = k(a.name, "Slice");g = function g(d) {
            a.slice("select" === d.type);
          };C(a, "select", g);C(a, "unselect", g);return a;
        }, isValid: function isValid() {
          return a.isNumber(this.y, !0) && 0 <= this.y;
        }, setVisible: function setVisible(a, g) {
          var d = this,
              c = d.series,
              e = c.chart,
              b = c.options.ignoreHiddenPoint;g = k(g, b);a !== d.visible && (d.visible = d.options.visible = a = void 0 === a ? !d.visible : a, c.options.data[m(d, c.data)] = d.options, G(["graphic", "dataLabel", "connector", "shadowGroup"], function (b) {
            if (d[b]) d[b][a ? "show" : "hide"](!0);
          }), d.legendItem && e.legend.colorizeItem(d, a), a || "hover" !== d.state || d.setState(""), b && (c.isDirty = !0), g && e.redraw());
        }, slice: function slice(a, g, d) {
          var c = this.series;h(d, c.chart);k(g, !0);this.sliced = this.options.sliced = A(a) ? a : !this.sliced;c.options.data[m(this, c.data)] = this.options;this.graphic.animate(this.getTranslate());this.shadowGroup && this.shadowGroup.animate(this.getTranslate());
        }, getTranslate: function getTranslate() {
          return this.sliced ? this.slicedTranslation : { translateX: 0, translateY: 0 };
        }, haloPath: function haloPath(a) {
          var e = this.shapeArgs;return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(e.x, e.y, e.r + a, e.r + a, { innerR: this.shapeArgs.r, start: e.start, end: e.end });
        } });
    })(K);(function (a) {
      var C = a.addEvent,
          A = a.arrayMax,
          G = a.defined,
          F = a.each,
          m = a.extend,
          g = a.format,
          k = a.map,
          q = a.merge,
          v = a.noop,
          u = a.pick,
          h = a.relativeLength,
          e = a.Series,
          n = a.seriesTypes,
          d = a.stableSort;a.distribute = function (a, e) {
        function b(a, b) {
          return a.target - b.target;
        }var c,
            g = !0,
            h = a,
            l = [],
            m;m = 0;for (c = a.length; c--;) {
          m += a[c].size;
        }if (m > e) {
          d(a, function (a, b) {
            return (b.rank || 0) - (a.rank || 0);
          });
          for (m = c = 0; m <= e;) {
            m += a[c].size, c++;
          }l = a.splice(c - 1, a.length);
        }d(a, b);for (a = k(a, function (a) {
          return { size: a.size, targets: [a.target] };
        }); g;) {
          for (c = a.length; c--;) {
            g = a[c], m = (Math.min.apply(0, g.targets) + Math.max.apply(0, g.targets)) / 2, g.pos = Math.min(Math.max(0, m - g.size / 2), e - g.size);
          }c = a.length;for (g = !1; c--;) {
            0 < c && a[c - 1].pos + a[c - 1].size > a[c].pos && (a[c - 1].size += a[c].size, a[c - 1].targets = a[c - 1].targets.concat(a[c].targets), a[c - 1].pos + a[c - 1].size > e && (a[c - 1].pos = e - a[c - 1].size), a.splice(c, 1), g = !0);
          }
        }c = 0;F(a, function (a) {
          var b = 0;F(a.targets, function () {
            h[c].pos = a.pos + b;b += h[c].size;c++;
          });
        });h.push.apply(h, l);d(h, b);
      };e.prototype.drawDataLabels = function () {
        var c = this,
            d = c.options,
            b = d.dataLabels,
            e = c.points,
            h,
            k,
            l = c.hasRendered || 0,
            m,
            r,
            n = u(b.defer, !!d.animation),
            v = c.chart.renderer;if (b.enabled || c._hasPointLabels) c.dlProcessOptions && c.dlProcessOptions(b), r = c.plotGroup("dataLabelsGroup", "data-labels", n && !l ? "hidden" : "visible", b.zIndex || 6), n && (r.attr({ opacity: +l }), l || C(c, "afterAnimate", function () {
          c.visible && r.show(!0);r[d.animation ? "animate" : "attr"]({ opacity: 1 }, { duration: 200 });
        })), k = b, F(e, function (e) {
          var l,
              p = e.dataLabel,
              n,
              f,
              t = e.connector,
              w = !p,
              z;h = e.dlOptions || e.options && e.options.dataLabels;if (l = u(h && h.enabled, k.enabled) && null !== e.y) b = q(k, h), n = e.getLabelConfig(), m = b.format ? g(b.format, n) : b.formatter.call(n, b), z = b.style, n = b.rotation, z.color = u(b.color, z.color, c.color, "#000000"), "contrast" === z.color && (e.contrastColor = v.getContrast(e.color || c.color), z.color = b.inside || 0 > u(e.labelDistance, b.distance) || d.stacking ? e.contrastColor : "#000000"), d.cursor && (z.cursor = d.cursor), f = { fill: b.backgroundColor, stroke: b.borderColor, "stroke-width": b.borderWidth, r: b.borderRadius || 0, rotation: n, padding: b.padding, zIndex: 1 }, a.objectEach(f, function (a, b) {
            void 0 === a && delete f[b];
          });!p || l && G(m) ? l && G(m) && (p ? f.text = m : (p = e.dataLabel = v[n ? "text" : "label"](m, 0, -9999, b.shape, null, null, b.useHTML, null, "data-label"), p.addClass("highcharts-data-label-color-" + e.colorIndex + " " + (b.className || "") + (b.useHTML ? "highcharts-tracker" : ""))), p.attr(f), p.css(z).shadow(b.shadow), p.added || p.add(r), c.alignDataLabel(e, p, b, null, w)) : (e.dataLabel = p = p.destroy(), t && (e.connector = t.destroy()));
        });
      };e.prototype.alignDataLabel = function (a, d, b, e, g) {
        var c = this.chart,
            h = c.inverted,
            k = u(a.plotX, -9999),
            r = u(a.plotY, -9999),
            n = d.getBBox(),
            q,
            p = b.rotation,
            w = b.align,
            v = this.visible && (a.series.forceDL || c.isInsidePlot(k, Math.round(r), h) || e && c.isInsidePlot(k, h ? e.x + 1 : e.y + e.height - 1, h)),
            y = "justify" === u(b.overflow, "justify");if (v && (q = b.style.fontSize, q = c.renderer.fontMetrics(q, d).b, e = m({ x: h ? c.plotWidth - r : k, y: Math.round(h ? c.plotHeight - k : r), width: 0, height: 0 }, e), m(b, { width: n.width, height: n.height }), p ? (y = !1, k = c.renderer.rotCorr(q, p), k = { x: e.x + b.x + e.width / 2 + k.x, y: e.y + b.y + { top: 0, middle: .5, bottom: 1 }[b.verticalAlign] * e.height }, d[g ? "attr" : "animate"](k).attr({ align: w }), r = (p + 720) % 360, r = 180 < r && 360 > r, "left" === w ? k.y -= r ? n.height : 0 : "center" === w ? (k.x -= n.width / 2, k.y -= n.height / 2) : "right" === w && (k.x -= n.width, k.y -= r ? 0 : n.height)) : (d.align(b, null, e), k = d.alignAttr), y ? a.isLabelJustified = this.justifyDataLabel(d, b, k, n, e, g) : u(b.crop, !0) && (v = c.isInsidePlot(k.x, k.y) && c.isInsidePlot(k.x + n.width, k.y + n.height)), b.shape && !p)) d[g ? "attr" : "animate"]({ anchorX: h ? c.plotWidth - a.plotY : a.plotX, anchorY: h ? c.plotHeight - a.plotX : a.plotY });v || (d.attr({ y: -9999 }), d.placed = !1);
      };e.prototype.justifyDataLabel = function (a, d, b, e, g, h) {
        var c = this.chart,
            k = d.align,
            m = d.verticalAlign,
            n,
            q,
            p = a.box ? 0 : a.padding || 0;n = b.x + p;0 > n && ("right" === k ? d.align = "left" : d.x = -n, q = !0);n = b.x + e.width - p;n > c.plotWidth && ("left" === k ? d.align = "right" : d.x = c.plotWidth - n, q = !0);n = b.y + p;0 > n && ("bottom" === m ? d.verticalAlign = "top" : d.y = -n, q = !0);n = b.y + e.height - p;n > c.plotHeight && ("top" === m ? d.verticalAlign = "bottom" : d.y = c.plotHeight - n, q = !0);q && (a.placed = !h, a.align(d, null, g));return q;
      };n.pie && (n.pie.prototype.drawDataLabels = function () {
        var c = this,
            d = c.data,
            b,
            g = c.chart,
            h = c.options.dataLabels,
            k = u(h.connectorPadding, 10),
            l = u(h.connectorWidth, 1),
            m = g.plotWidth,
            r = g.plotHeight,
            n,
            q = c.center,
            p = q[2] / 2,
            v = q[1],
            C,
            L,
            f,
            t,
            K = [[], []],
            J,
            N,
            O,
            P,
            x = [0, 0, 0, 0];c.visible && (h.enabled || c._hasPointLabels) && (F(d, function (a) {
          a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }), a.dataLabel.shortened = !1);
        }), e.prototype.drawDataLabels.apply(c), F(d, function (a) {
          a.dataLabel && a.visible && (K[a.half].push(a), a.dataLabel._pos = null);
        }), F(K, function (d, e) {
          var l,
              n,
              u = d.length,
              w = [],
              z;if (u) for (c.sortByAngle(d, e - .5), 0 < c.maxLabelDistance && (l = Math.max(0, v - p - c.maxLabelDistance), n = Math.min(v + p + c.maxLabelDistance, g.plotHeight), F(d, function (a) {
            0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, v - p - a.labelDistance), a.bottom = Math.min(v + p + a.labelDistance, g.plotHeight), z = a.dataLabel.getBBox().height || 21, a.positionsIndex = w.push({ target: a.labelPos[1] - a.top + z / 2, size: z, rank: a.y }) - 1);
          }), a.distribute(w, n + z - l)), P = 0; P < u; P++) {
            b = d[P], n = b.positionsIndex, f = b.labelPos, C = b.dataLabel, O = !1 === b.visible ? "hidden" : "inherit", l = f[1], w && G(w[n]) ? void 0 === w[n].pos ? O = "hidden" : (t = w[n].size, N = b.top + w[n].pos) : N = l, delete b.positionIndex, J = h.justify ? q[0] + (e ? -1 : 1) * (p + b.labelDistance) : c.getX(N < b.top + 2 || N > b.bottom - 2 ? l : N, e, b), C._attr = { visibility: O, align: f[6] }, C._pos = { x: J + h.x + ({ left: k, right: -k }[f[6]] || 0), y: N + h.y - 10 }, f.x = J, f.y = N, L = C.getBBox().width, l = null, J - L < k ? (l = Math.round(L - J + k), x[3] = Math.max(l, x[3])) : J + L > m - k && (l = Math.round(J + L - m + k), x[1] = Math.max(l, x[1])), 0 > N - t / 2 ? x[0] = Math.max(Math.round(-N + t / 2), x[0]) : N + t / 2 > r && (x[2] = Math.max(Math.round(N + t / 2 - r), x[2])), C.sideOverflow = l;
          }
        }), 0 === A(x) || this.verifyDataLabelOverflow(x)) && (this.placeDataLabels(), l && F(this.points, function (a) {
          var b;n = a.connector;if ((C = a.dataLabel) && C._pos && a.visible && 0 < a.labelDistance) {
            O = C._attr.visibility;
            if (b = !n) a.connector = n = g.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + a.colorIndex).add(c.dataLabelsGroup), n.attr({ "stroke-width": l, stroke: h.connectorColor || a.color || "#666666" });n[b ? "attr" : "animate"]({ d: c.connectorPath(a.labelPos) });n.attr("visibility", O);
          } else n && (a.connector = n.destroy());
        }));
      }, n.pie.prototype.connectorPath = function (a) {
        var c = a.x,
            b = a.y;return u(this.options.dataLabels.softConnector, !0) ? ["M", c + ("left" === a[6] ? 5 : -5), b, "C", c, b, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", c + ("left" === a[6] ? 5 : -5), b, "L", a[2], a[3], "L", a[4], a[5]];
      }, n.pie.prototype.placeDataLabels = function () {
        F(this.points, function (a) {
          var c = a.dataLabel;c && a.visible && ((a = c._pos) ? (c.sideOverflow && (c._attr.width = c.getBBox().width - c.sideOverflow, c.css({ width: c._attr.width + "px", textOverflow: "ellipsis" }), c.shortened = !0), c.attr(c._attr), c[c.moved ? "animate" : "attr"](a), c.moved = !0) : c && c.attr({ y: -9999 }));
        }, this);
      }, n.pie.prototype.alignDataLabel = v, n.pie.prototype.verifyDataLabelOverflow = function (a) {
        var c = this.center,
            b = this.options,
            d = b.center,
            e = b.minSize || 80,
            g,
            l = null !== b.size;l || (null !== d[0] ? g = Math.max(c[2] - Math.max(a[1], a[3]), e) : (g = Math.max(c[2] - a[1] - a[3], e), c[0] += (a[3] - a[1]) / 2), null !== d[1] ? g = Math.max(Math.min(g, c[2] - Math.max(a[0], a[2])), e) : (g = Math.max(Math.min(g, c[2] - a[0] - a[2]), e), c[1] += (a[0] - a[2]) / 2), g < c[2] ? (c[2] = g, c[3] = Math.min(h(b.innerSize || 0, g), g), this.translate(c), this.drawDataLabels && this.drawDataLabels()) : l = !0);return l;
      });n.column && (n.column.prototype.alignDataLabel = function (a, d, b, g, h) {
        var c = this.chart.inverted,
            l = a.series,
            k = a.dlBox || a.shapeArgs,
            m = u(a.below, a.plotY > u(this.translatedThreshold, l.yAxis.len)),
            n = u(b.inside, !!this.options.stacking);k && (g = q(k), 0 > g.y && (g.height += g.y, g.y = 0), k = g.y + g.height - l.yAxis.len, 0 < k && (g.height -= k), c && (g = { x: l.yAxis.len - g.y - g.height, y: l.xAxis.len - g.x - g.width, width: g.height, height: g.width }), n || (c ? (g.x += m ? 0 : g.width, g.width = 0) : (g.y += m ? g.height : 0, g.height = 0)));b.align = u(b.align, !c || n ? "center" : m ? "right" : "left");b.verticalAlign = u(b.verticalAlign, c || n ? "middle" : m ? "top" : "bottom");e.prototype.alignDataLabel.call(this, a, d, b, g, h);a.isLabelJustified && a.contrastColor && a.dataLabel.css({ color: a.contrastColor });
      });
    })(K);(function (a) {
      var C = a.Chart,
          A = a.each,
          G = a.pick,
          F = a.addEvent;C.prototype.callbacks.push(function (a) {
        function g() {
          var g = [];A(a.series || [], function (a) {
            var k = a.options.dataLabels,
                m = a.dataLabelCollections || ["dataLabel"];(k.enabled || a._hasPointLabels) && !k.allowOverlap && a.visible && A(m, function (h) {
              A(a.points, function (a) {
                a[h] && (a[h].labelrank = G(a.labelrank, a.shapeArgs && a.shapeArgs.height), g.push(a[h]));
              });
            });
          });a.hideOverlappingLabels(g);
        }g();F(a, "redraw", g);
      });C.prototype.hideOverlappingLabels = function (a) {
        var g = a.length,
            k,
            m,
            v,
            u,
            h,
            e,
            n,
            d,
            c,
            w = function w(a, c, d, e, g, h, k, m) {
          return !(g > a + d || g + k < a || h > c + e || h + m < c);
        };for (m = 0; m < g; m++) {
          if (k = a[m]) k.oldOpacity = k.opacity, k.newOpacity = 1;
        }a.sort(function (a, c) {
          return (c.labelrank || 0) - (a.labelrank || 0);
        });for (m = 0; m < g; m++) {
          for (v = a[m], k = m + 1; k < g; ++k) {
            if (u = a[k], v && u && v !== u && v.placed && u.placed && 0 !== v.newOpacity && 0 !== u.newOpacity && (h = v.alignAttr, e = u.alignAttr, n = v.parentGroup, d = u.parentGroup, c = 2 * (v.box ? 0 : v.padding), h = w(h.x + n.translateX, h.y + n.translateY, v.width - c, v.height - c, e.x + d.translateX, e.y + d.translateY, u.width - c, u.height - c))) (v.labelrank < u.labelrank ? v : u).newOpacity = 0;
          }
        }A(a, function (a) {
          var b, c;a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function b() {
            a.hide();
          }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0);
        });
      };
    })(K);(function (a) {
      var C = a.addEvent,
          A = a.Chart,
          G = a.createElement,
          F = a.css,
          m = a.defaultOptions,
          g = a.defaultPlotOptions,
          k = a.each,
          q = a.extend,
          v = a.fireEvent,
          u = a.hasTouch,
          h = a.inArray,
          e = a.isObject,
          n = a.Legend,
          d = a.merge,
          c = a.pick,
          w = a.Point,
          b = a.Series,
          y = a.seriesTypes,
          D = a.svg,
          H;H = a.TrackerMixin = { drawTrackerPoint: function drawTrackerPoint() {
          var a = this,
              b = a.chart.pointer,
              c = function c(a) {
            var c = b.getPointFromEvent(a);void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a));
          };k(a.points, function (a) {
            a.graphic && (a.graphic.element.point = a);a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a);
          });a._hasTracking || (k(a.trackerGroups, function (d) {
            if (a[d]) {
              a[d].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function (a) {
                b.onTrackerMouseOut(a);
              });if (u) a[d].on("touchstart", c);a.options.cursor && a[d].css(F).css({ cursor: a.options.cursor });
            }
          }), a._hasTracking = !0);
        }, drawTrackerGraph: function drawTrackerGraph() {
          var a = this,
              b = a.options,
              c = b.trackByArea,
              d = [].concat(c ? a.areaPath : a.graphPath),
              e = d.length,
              g = a.chart,
              h = g.pointer,
              m = g.renderer,
              n = g.options.tooltip.snap,
              f = a.tracker,
              q,
              v = function v() {
            if (g.hoverSeries !== a) a.onMouseOver();
          },
              w = "rgba(192,192,192," + (D ? .0001 : .002) + ")";if (e && !c) for (q = e + 1; q--;) {
            "M" === d[q] && d.splice(q + 1, 0, d[q + 1] - n, d[q + 2], "L"), (q && "M" === d[q] || q === e) && d.splice(q, 0, "L", d[q - 2] + n, d[q - 1]);
          }f ? f.attr({ d: d }) : a.graph && (a.tracker = m.path(d).attr({ "stroke-linejoin": "round", visibility: a.visible ? "visible" : "hidden", stroke: w, fill: c ? w : "none", "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * n), zIndex: 2 }).add(a.group), k([a.tracker, a.markerGroup], function (a) {
            a.addClass("highcharts-tracker").on("mouseover", v).on("mouseout", function (a) {
              h.onTrackerMouseOut(a);
            });
            b.cursor && a.css({ cursor: b.cursor });if (u) a.on("touchstart", v);
          }));
        } };y.column && (y.column.prototype.drawTracker = H.drawTrackerPoint);y.pie && (y.pie.prototype.drawTracker = H.drawTrackerPoint);y.scatter && (y.scatter.prototype.drawTracker = H.drawTrackerPoint);q(n.prototype, { setItemEvents: function setItemEvents(a, b, c) {
          var e = this,
              g = e.chart.renderer.boxWrapper,
              h = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";(c ? b : a.legendGroup).on("mouseover", function () {
            a.setState("hover");g.addClass(h);b.css(e.options.itemHoverStyle);
          }).on("mouseout", function () {
            b.css(d(a.visible ? e.itemStyle : e.itemHiddenStyle));g.removeClass(h);a.setState();
          }).on("click", function (b) {
            var c = function c() {
              a.setVisible && a.setVisible();
            };b = { browserEvent: b };a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : v(a, "legendItemClick", b, c);
          });
        }, createCheckboxForItem: function createCheckboxForItem(a) {
          a.checkbox = G("input", { type: "checkbox", checked: a.selected, defaultChecked: a.selected }, this.options.itemCheckboxStyle, this.chart.container);C(a.checkbox, "click", function (b) {
            v(a.series || a, "checkboxClick", { checked: b.target.checked, item: a }, function () {
              a.select();
            });
          });
        } });m.legend.itemStyle.cursor = "pointer";q(A.prototype, { showResetZoom: function showResetZoom() {
          var a = this,
              b = m.lang,
              c = a.options.chart.resetZoomButton,
              d = c.theme,
              e = d.states,
              g = "chart" === c.relativeTo ? null : "plotBox";this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () {
            a.zoomOut();
          }, d, e && e.hover).attr({ align: c.position.align, title: b.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(c.position, !1, g);
        }, zoomOut: function zoomOut() {
          var a = this;
          v(a, "selection", { resetSelection: !0 }, function () {
            a.zoom();
          });
        }, zoom: function zoom(a) {
          var b,
              d = this.pointer,
              g = !1,
              h;!a || a.resetSelection ? k(this.axes, function (a) {
            b = a.zoom();
          }) : k(a.xAxis.concat(a.yAxis), function (a) {
            var c = a.axis;d[c.isXAxis ? "zoomX" : "zoomY"] && (b = c.zoom(a.min, a.max), c.displayBtn && (g = !0));
          });h = this.resetZoomButton;g && !h ? this.showResetZoom() : !g && e(h) && (this.resetZoomButton = h.destroy());b && this.redraw(c(this.options.chart.animation, a && a.animation, 100 > this.pointCount));
        }, pan: function pan(a, b) {
          var c = this,
              d = c.hoverPoints,
              e;d && k(d, function (a) {
            a.setState();
          });k("xy" === b ? [1, 0] : [1], function (b) {
            b = c[b ? "xAxis" : "yAxis"][0];var d = b.horiz,
                g = a[d ? "chartX" : "chartY"],
                d = d ? "mouseDownX" : "mouseDownY",
                h = c[d],
                f = (b.pointRange || 0) / 2,
                l = b.getExtremes(),
                k = b.toValue(h - g, !0) + f,
                f = b.toValue(h + b.len - g, !0) - f,
                m = f < k,
                h = m ? f : k,
                k = m ? k : f,
                f = Math.min(l.dataMin, b.toValue(b.toPixels(l.min) - b.minPixelPadding)),
                m = Math.max(l.dataMax, b.toValue(b.toPixels(l.max) + b.minPixelPadding)),
                n;n = f - h;0 < n && (k += n, h = f);n = k - m;0 < n && (k = m, h -= n);b.series.length && h !== l.min && k !== l.max && (b.setExtremes(h, k, !1, !1, { trigger: "pan" }), e = !0);c[d] = g;
          });e && c.redraw(!1);F(c.container, { cursor: "move" });
        } });q(w.prototype, { select: function select(a, b) {
          var d = this,
              e = d.series,
              g = e.chart;a = c(a, !d.selected);d.firePointEvent(a ? "select" : "unselect", { accumulate: b }, function () {
            d.selected = d.options.selected = a;e.options.data[h(d, e.data)] = d.options;d.setState(a && "select");b || k(g.getSelectedPoints(), function (a) {
              a.selected && a !== d && (a.selected = a.options.selected = !1, e.options.data[h(a, e.data)] = a.options, a.setState(""), a.firePointEvent("unselect"));
            });
          });
        },
        onMouseOver: function onMouseOver(a) {
          var b = this.series.chart,
              c = b.pointer;a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);c.runPointActions(a, this);
        }, onMouseOut: function onMouseOut() {
          var a = this.series.chart;this.firePointEvent("mouseOut");k(a.hoverPoints || [], function (a) {
            a.setState();
          });a.hoverPoints = a.hoverPoint = null;
        }, importEvents: function importEvents() {
          if (!this.hasImportedEvents) {
            var b = this,
                c = d(b.series.options.point, b.options).events;b.events = c;a.objectEach(c, function (a, c) {
              C(b, c, a);
            });this.hasImportedEvents = !0;
          }
        }, setState: function setState(a, b) {
          var d = Math.floor(this.plotX),
              e = this.plotY,
              h = this.series,
              l = h.options.states[a] || {},
              k = g[h.type].marker && h.options.marker,
              m = k && !1 === k.enabled,
              n = k && k.states && k.states[a] || {},
              f = !1 === n.enabled,
              t = h.stateMarkerGraphic,
              u = this.marker || {},
              v = h.chart,
              w = h.halo,
              y,
              B = k && h.markerAttribs;a = a || "";if (!(a === this.state && !b || this.selected && "select" !== a || !1 === l.enabled || a && (f || m && !1 === n.enabled) || a && u.states && u.states[a] && !1 === u.states[a].enabled)) {
            B && (y = h.markerAttribs(this, a));if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), this.graphic.attr(h.pointAttribs(this, a)), y && this.graphic.animate(y, c(v.options.chart.animation, n.animation, k.animation)), t && t.hide();else {
              if (a && n) {
                k = u.symbol || h.symbol;t && t.currentSymbol !== k && (t = t.destroy());if (t) t[b ? "animate" : "attr"]({ x: y.x, y: y.y });else k && (h.stateMarkerGraphic = t = v.renderer.symbol(k, y.x, y.y, y.width, y.height).add(h.markerGroup), t.currentSymbol = k);t && t.attr(h.pointAttribs(this, a));
              }t && (t[a && v.isInsidePlot(d, e, v.inverted) ? "show" : "hide"](), t.element.point = this);
            }(d = l.halo) && d.size ? (w || (h.halo = w = v.renderer.path().add((this.graphic || t).parentGroup)), w[b ? "animate" : "attr"]({ d: this.haloPath(d.size) }), w.attr({ "class": "highcharts-halo highcharts-color-" + c(this.colorIndex, h.colorIndex) }), w.point = this, w.attr(q({ fill: this.color || h.color, "fill-opacity": d.opacity, zIndex: -1 }, d.attributes))) : w && w.point && w.point.haloPath && w.animate({ d: w.point.haloPath(0) });this.state = a;
          }
        }, haloPath: function haloPath(a) {
          return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a);
        } });q(b.prototype, { onMouseOver: function onMouseOver() {
          var a = this.chart,
              b = a.hoverSeries;if (b && b !== this) b.onMouseOut();this.options.events.mouseOver && v(this, "mouseOver");this.setState("hover");a.hoverSeries = this;
        }, onMouseOut: function onMouseOut() {
          var a = this.options,
              b = this.chart,
              c = b.tooltip,
              d = b.hoverPoint;b.hoverSeries = null;if (d) d.onMouseOut();this && a.events.mouseOut && v(this, "mouseOut");!c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();this.setState();
        }, setState: function setState(a) {
          var b = this,
              d = b.options,
              e = b.graph,
              g = d.states,
              h = d.lineWidth,
              d = 0;a = a || "";if (b.state !== a && (k([b.group, b.markerGroup, b.dataLabelsGroup], function (c) {
            c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a));
          }), b.state = a, !g[a] || !1 !== g[a].enabled) && (a && (h = g[a].lineWidth || h + (g[a].lineWidthPlus || 0)), e && !e.dashstyle)) for (h = { "stroke-width": h }, e.animate(h, c(b.chart.options.chart.animation, g[a] && g[a].animation)); b["zone-graph-" + d];) {
            b["zone-graph-" + d].attr(h), d += 1;
          }
        }, setVisible: function setVisible(a, b) {
          var c = this,
              d = c.chart,
              e = c.legendItem,
              g,
              h = d.options.chart.ignoreHiddenSeries,
              l = c.visible;g = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !l : a) ? "show" : "hide";k(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
            if (c[a]) c[a][g]();
          });if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();e && d.legend.colorizeItem(c, a);c.isDirty = !0;c.options.stacking && k(d.series, function (a) {
            a.options.stacking && a.visible && (a.isDirty = !0);
          });k(c.linkedSeries, function (b) {
            b.setVisible(a, !1);
          });h && (d.isDirtyBox = !0);!1 !== b && d.redraw();v(c, g);
        }, show: function show() {
          this.setVisible(!0);
        }, hide: function hide() {
          this.setVisible(!1);
        }, select: function select(a) {
          this.selected = a = void 0 === a ? !this.selected : a;this.checkbox && (this.checkbox.checked = a);v(this, a ? "select" : "unselect");
        }, drawTracker: H.drawTrackerGraph });
    })(K);(function (a) {
      var C = a.Chart,
          A = a.each,
          G = a.inArray,
          F = a.isArray,
          m = a.isObject,
          g = a.pick,
          k = a.splat;C.prototype.setResponsive = function (g) {
        var k = this.options.responsive,
            m = [],
            h = this.currentResponsive;k && k.rules && A(k.rules, function (e) {
          void 0 === e._id && (e._id = a.uniqueKey());this.matchResponsiveRule(e, m, g);
        }, this);var e = a.merge.apply(0, a.map(m, function (e) {
          return a.find(k.rules, function (a) {
            return a._id === e;
          }).chartOptions;
        })),
            m = m.toString() || void 0;m !== (h && h.ruleIds) && (h && this.update(h.undoOptions, g), m ? (this.currentResponsive = { ruleIds: m, mergedOptions: e, undoOptions: this.currentOptions(e) }, this.update(e, g)) : this.currentResponsive = void 0);
      };C.prototype.matchResponsiveRule = function (a, k) {
        var m = a.condition;(m.callback || function () {
          return this.chartWidth <= g(m.maxWidth, Number.MAX_VALUE) && this.chartHeight <= g(m.maxHeight, Number.MAX_VALUE) && this.chartWidth >= g(m.minWidth, 0) && this.chartHeight >= g(m.minHeight, 0);
        }).call(this) && k.push(a._id);
      };C.prototype.currentOptions = function (g) {
        function q(g, e, n, d) {
          var c;a.objectEach(g, function (a, b) {
            if (!d && -1 < G(b, ["series", "xAxis", "yAxis"])) for (g[b] = k(g[b]), n[b] = [], c = 0; c < g[b].length; c++) {
              e[b][c] && (n[b][c] = {}, q(a[c], e[b][c], n[b][c], d + 1));
            } else m(a) ? (n[b] = F(a) ? [] : {}, q(a, e[b] || {}, n[b], d + 1)) : n[b] = e[b] || null;
          });
        }var u = {};q(g, this.options, u, 0);return u;
      };
    })(K);return K;
  });
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

/***/ 147:
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

		// const App = ()=><div>dasdasdas</div>

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
					var containerEl = document.getElementById(targetChartContainer);
					if (!containerEl) return;
					try {
						this.root = (0, _preact.render)((0, _preact.h)(_preact2.Provider, { store: store }, (0, _preact.h)(_PitchChartWrapper2.default, _extends({}, this.props, { namespace: namespace }))), containerEl);
					} catch (ex) {
						console.log(ex); //eslint-disable-line
					}
					window.store = store;
				}
			}, {
				key: "destroy",
				value: function destroy() {
					var targetChartContainer = this.props.targetChartContainer;

					var containerEl = document.getElementById(targetChartContainer);
					if (!containerEl) return;
					(0, _preact.render)("", containerEl, this.root);
					containerEl.innerHTML = "";
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

/***/ 148:
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(149).setImmediate))

/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(150)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
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

/***/ 150:
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

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(25)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
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

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports !== "undefined") {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.apiUtils = mod.exports;
	}
})(this, function (exports) {
	"use strict";

	(function (global, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports !== "undefined") {
			factory(exports);
		} else {
			var mod = {
				exports: {}
			};
			factory(mod.exports);
			global.apiUtils = mod.exports;
		}
	})(undefined, function (exports) {
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

		var getHeaders = function getHeaders() {
			var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var additionalHeaders = {
				"Content-Type": "application/json"
			};
			return _extends({}, additionalHeaders, headers);
		};

		var makeCall = function makeCall(urlObj) {
			var reqObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			return fetch(urlObj.url, _extends({}, reqObj, { credentials: "same-origin" })).then(function (resp) {
				var json = void 0;
				if (resp.ok) {
					json = resp.json();
				}
				if (resp.status >= 200 && resp.status < 300) {
					return json;
				} else {
					return Promise.reject(Error("error"));
				}
			}).catch(function (error) {
				return Promise.reject(Error(error.message));
			});
		};

		var get = function get(urlObj) {
			var reqObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			reqObj.method = "GET";
			reqObj.headers = getHeaders(reqObj.headers);
			return makeCall(urlObj, _extends({}, reqObj));
		};

		var post = function post(urlObj) {
			var reqObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			reqObj.method = "POST";
			reqObj.headers = getHeaders(reqObj.headers);
			if (reqObj.body && reqObj.headers["Content-Type"] === "application/json") {
				reqObj.body = JSON.stringify(reqObj.body);
			}
			return makeCall(urlObj, _extends({}, reqObj));
		};

		var put = function put(urlObj) {
			var reqObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			reqObj.method = "PUT";
			reqObj.headers = getHeaders(reqObj.headers);
			if (reqObj.body && reqObj.headers["Content-Type"] === "application/json") {
				reqObj.body = JSON.stringify(reqObj.body);
			}
			return makeCall(urlObj, _extends({}, reqObj));
		};
		var del = function del(urlObj) {
			var reqObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			reqObj.method = "DELETE";
			return makeCall(urlObj, _extends({}, reqObj));
		};

		exports.get = get;
		exports.post = post;
		exports.put = put;
		exports.del = del;
	});
});

/***/ }),

/***/ 25:
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
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(148)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
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
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(4), __webpack_require__(1), __webpack_require__(98), __webpack_require__(96)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
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
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(4), __webpack_require__(1), __webpack_require__(98), __webpack_require__(96)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
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
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(20), __webpack_require__(1), __webpack_require__(97)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports !== "undefined") {
		factory(module, exports, require("@utils/apiUtils"), require("@utils/core"), require("./api.config"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod, mod.exports, global.apiUtils, global.core, global.api);
		global.actions = mod.exports;
	}
})(this, function (module, exports) {
	"use strict";

	(function (global, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(20), __webpack_require__(1), __webpack_require__(97)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports !== "undefined") {
			factory(module, exports);
		} else {
			var mod = {
				exports: {}
			};
			factory(mod, mod.exports, global.apiUtils, global.core, global.api);
			global.actions = mod.exports;
		}
	})(undefined, function (module, exports, _apiUtils, _core, _api) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _api2 = _interopRequireDefault(_api);

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
					// return Promise.resolve({
					// 	length: {
					// 		averageLength: 30,
					// 		contentLength: 15,
					// 		targetLength: 90
					// 	},
					// 	pace: {
					// 		averagePace: 4.761904761904763,
					// 		contentPace: 4.761904761904763,
					// 		industryPace: 2.5
					// 	}
					// }).then(({ length, pace } = {}) => {
					// 	setState({
					// 		...state,
					// 		pitch: { isLoading: false, data: pitchParser(length, pace) }
					// 	});
					// });
					return (0, _apiUtils.get)(_api2.default.getPitchData(state.app)).then(function (response) {
						var _response$length = response.length,
						    length = _response$length === undefined ? {} : _response$length,
						    _response$pace = response.pace,
						    pace = _response$pace === undefined ? {} : _response$pace;

						setState(_extends({}, state, {
							pitch: { isLoading: false, data: pitchParser(length, pace) }
						}));
					}, function (error) {
						setState(_extends({}, state, {
							pitch: { isLoading: false, error: error }
						}));
					});
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
		global.apiConfig = mod.exports;
	}
})(this, function (module, exports) {
	"use strict";

	(function (global, factory) {
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
			global.apiConfig = mod.exports;
		}
	})(undefined, function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		var apiUrls = {
			getPitchData: function getPitchData(_ref) {
				var cname = _ref.cname,
				    subjectId = _ref.subjectId,
				    entityId = _ref.entityId;

				return {
					url: "/" + cname + "/entity/" + entityId + "/" + subjectId + "/pace_and_length"
				};
			}
		};

		exports.default = apiUrls;
		module.exports = exports["default"];
	});
});

/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(100), __webpack_require__(99)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
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
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(100), __webpack_require__(99)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
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

		window.Highcharts = _highcharts2.default;

		exports.default = PitchChart;
		module.exports = exports["default"];
	});
});

/***/ }),

/***/ 99:
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
			return (0, _core.deepmerge)(COMMON_HIGHCHART_CONFIG, config);
		};
	});
});

/***/ })

/******/ });
});