
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function stop_propagation(fn) {
        return function (event) {
            event.stopPropagation();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = append_empty_stylesheet(node).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_out_transition(node, fn, params) {
        let config = fn(node, params);
        let running = true;
        let animation_name;
        const group = outros;
        group.r += 1;
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            add_render_callback(() => dispatch(node, false, 'start'));
            loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(0, 1);
                        dispatch(node, false, 'end');
                        if (!--group.r) {
                            // this will result in `end()` being called,
                            // so we don't need to clean up here
                            run_all(group.c);
                        }
                        return false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(1 - t, t);
                    }
                }
                return running;
            });
        }
        if (is_function(config)) {
            wait().then(() => {
                // @ts-ignore
                config = config();
                go();
            });
        }
        else {
            go();
        }
        return {
            end(reset) {
                if (reset && config.tick) {
                    config.tick(1, 0);
                }
                if (running) {
                    if (animation_name)
                        delete_rule(node, animation_name);
                    running = false;
                }
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.1' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* eslint-disable no-param-reassign */

    /**
     * Options for customizing ripples
     */
    const defaults = {
      color: 'currentColor',
      class: '',
      opacity: 0.1,
      centered: false,
      spreadingDuration: '.4s',
      spreadingDelay: '0s',
      spreadingTimingFunction: 'linear',
      clearingDuration: '1s',
      clearingDelay: '0s',
      clearingTimingFunction: 'ease-in-out',
    };

    /**
     * Creates a ripple element but does not destroy it (use RippleStop for that)
     *
     * @param {Event} e
     * @param {*} options
     * @returns Ripple element
     */
    function RippleStart(e, options = {}) {
      e.stopImmediatePropagation();
      const opts = { ...defaults, ...options };

      const isTouchEvent = e.touches ? !!e.touches[0] : false;
      // Parent element
      const target = isTouchEvent ? e.touches[0].currentTarget : e.currentTarget;

      // Create ripple
      const ripple = document.createElement('div');
      const rippleStyle = ripple.style;

      // Adding default stuff
      ripple.className = `material-ripple ${opts.class}`;
      rippleStyle.position = 'absolute';
      rippleStyle.color = 'inherit';
      rippleStyle.borderRadius = '50%';
      rippleStyle.pointerEvents = 'none';
      rippleStyle.width = '100px';
      rippleStyle.height = '100px';
      rippleStyle.marginTop = '-50px';
      rippleStyle.marginLeft = '-50px';
      target.appendChild(ripple);
      rippleStyle.opacity = opts.opacity;
      rippleStyle.transition = `transform ${opts.spreadingDuration} ${opts.spreadingTimingFunction} ${opts.spreadingDelay},opacity ${opts.clearingDuration} ${opts.clearingTimingFunction} ${opts.clearingDelay}`;
      rippleStyle.transform = 'scale(0) translate(0,0)';
      rippleStyle.background = opts.color;

      // Positioning ripple
      const targetRect = target.getBoundingClientRect();
      if (opts.centered) {
        rippleStyle.top = `${targetRect.height / 2}px`;
        rippleStyle.left = `${targetRect.width / 2}px`;
      } else {
        const distY = isTouchEvent ? e.touches[0].clientY : e.clientY;
        const distX = isTouchEvent ? e.touches[0].clientX : e.clientX;
        rippleStyle.top = `${distY - targetRect.top}px`;
        rippleStyle.left = `${distX - targetRect.left}px`;
      }

      // Enlarge ripple
      rippleStyle.transform = `scale(${
    Math.max(targetRect.width, targetRect.height) * 0.02
  }) translate(0,0)`;
      return ripple;
    }

    /**
     * Destroys the ripple, slowly fading it out.
     *
     * @param {Element} ripple
     */
    function RippleStop(ripple) {
      if (ripple) {
        ripple.addEventListener('transitionend', (e) => {
          if (e.propertyName === 'opacity') ripple.remove();
        });
        ripple.style.opacity = 0;
      }
    }

    /**
     * @param node {Element}
     */
    var Ripple = (node, _options = {}) => {
      let options = _options;
      let destroyed = false;
      let ripple;
      let keyboardActive = false;
      const handleStart = (e) => {
        ripple = RippleStart(e, options);
      };
      const handleStop = () => RippleStop(ripple);
      const handleKeyboardStart = (e) => {
        if (!keyboardActive && (e.keyCode === 13 || e.keyCode === 32)) {
          ripple = RippleStart(e, { ...options, centered: true });
          keyboardActive = true;
        }
      };
      const handleKeyboardStop = () => {
        keyboardActive = false;
        handleStop();
      };

      function setup() {
        node.classList.add('s-ripple-container');
        node.addEventListener('pointerdown', handleStart);
        node.addEventListener('pointerup', handleStop);
        node.addEventListener('pointerleave', handleStop);
        node.addEventListener('keydown', handleKeyboardStart);
        node.addEventListener('keyup', handleKeyboardStop);
        destroyed = false;
      }

      function destroy() {
        node.classList.remove('s-ripple-container');
        node.removeEventListener('pointerdown', handleStart);
        node.removeEventListener('pointerup', handleStop);
        node.removeEventListener('pointerleave', handleStop);
        node.removeEventListener('keydown', handleKeyboardStart);
        node.removeEventListener('keyup', handleKeyboardStop);
        destroyed = true;
      }

      if (options) setup();

      return {
        update(newOptions) {
          options = newOptions;
          if (options && destroyed) setup();
          else if (!(options || destroyed)) destroy();
        },
        destroy,
      };
    };

    const filter = (classes) => classes.filter((x) => !!x);
    const format$1 = (classes) => classes.split(' ').filter((x) => !!x);

    /**
     * @param node {Element}
     * @param classes {Array<string>}
     */
    var Class = (node, _classes) => {
      let classes = _classes;
      node.classList.add(...format$1(filter(classes).join(' ')));
      return {
        update(_newClasses) {
          const newClasses = _newClasses;
          newClasses.forEach((klass, i) => {
            if (klass) node.classList.add(...format$1(klass));
            else if (classes[i]) node.classList.remove(...format$1(classes[i]));
          });
          classes = newClasses;
        },
      };
    };

    /* node_modules\svelte-materialify\dist\components\Button\Button.svelte generated by Svelte v3.44.1 */
    const file$4 = "node_modules\\svelte-materialify\\dist\\components\\Button\\Button.svelte";

    function create_fragment$4(ctx) {
    	let button_1;
    	let span;
    	let button_1_class_value;
    	let Class_action;
    	let Ripple_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[19].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);

    	let button_1_levels = [
    		{
    			class: button_1_class_value = "s-btn size-" + /*size*/ ctx[5] + " " + /*klass*/ ctx[1]
    		},
    		{ type: /*type*/ ctx[14] },
    		{ style: /*style*/ ctx[16] },
    		{ disabled: /*disabled*/ ctx[11] },
    		{ "aria-disabled": /*disabled*/ ctx[11] },
    		/*$$restProps*/ ctx[17]
    	];

    	let button_1_data = {};

    	for (let i = 0; i < button_1_levels.length; i += 1) {
    		button_1_data = assign(button_1_data, button_1_levels[i]);
    	}

    	const block_1 = {
    		c: function create() {
    			button_1 = element("button");
    			span = element("span");
    			if (default_slot) default_slot.c();
    			attr_dev(span, "class", "s-btn__content");
    			add_location(span, file$4, 46, 2, 5233);
    			set_attributes(button_1, button_1_data);
    			toggle_class(button_1, "s-btn--fab", /*fab*/ ctx[2]);
    			toggle_class(button_1, "icon", /*icon*/ ctx[3]);
    			toggle_class(button_1, "block", /*block*/ ctx[4]);
    			toggle_class(button_1, "tile", /*tile*/ ctx[6]);
    			toggle_class(button_1, "text", /*text*/ ctx[7] || /*icon*/ ctx[3]);
    			toggle_class(button_1, "depressed", /*depressed*/ ctx[8] || /*text*/ ctx[7] || /*disabled*/ ctx[11] || /*outlined*/ ctx[9] || /*icon*/ ctx[3]);
    			toggle_class(button_1, "outlined", /*outlined*/ ctx[9]);
    			toggle_class(button_1, "rounded", /*rounded*/ ctx[10]);
    			toggle_class(button_1, "disabled", /*disabled*/ ctx[11]);
    			add_location(button_1, file$4, 26, 0, 4783);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button_1, anchor);
    			append_dev(button_1, span);

    			if (default_slot) {
    				default_slot.m(span, null);
    			}

    			if (button_1.autofocus) button_1.focus();
    			/*button_1_binding*/ ctx[21](button_1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(Class_action = Class.call(null, button_1, [/*active*/ ctx[12] && /*activeClass*/ ctx[13]])),
    					action_destroyer(Ripple_action = Ripple.call(null, button_1, /*ripple*/ ctx[15])),
    					listen_dev(button_1, "click", /*click_handler*/ ctx[20], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 262144)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[18],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(button_1, button_1_data = get_spread_update(button_1_levels, [
    				(!current || dirty & /*size, klass*/ 34 && button_1_class_value !== (button_1_class_value = "s-btn size-" + /*size*/ ctx[5] + " " + /*klass*/ ctx[1])) && { class: button_1_class_value },
    				(!current || dirty & /*type*/ 16384) && { type: /*type*/ ctx[14] },
    				(!current || dirty & /*style*/ 65536) && { style: /*style*/ ctx[16] },
    				(!current || dirty & /*disabled*/ 2048) && { disabled: /*disabled*/ ctx[11] },
    				(!current || dirty & /*disabled*/ 2048) && { "aria-disabled": /*disabled*/ ctx[11] },
    				dirty & /*$$restProps*/ 131072 && /*$$restProps*/ ctx[17]
    			]));

    			if (Class_action && is_function(Class_action.update) && dirty & /*active, activeClass*/ 12288) Class_action.update.call(null, [/*active*/ ctx[12] && /*activeClass*/ ctx[13]]);
    			if (Ripple_action && is_function(Ripple_action.update) && dirty & /*ripple*/ 32768) Ripple_action.update.call(null, /*ripple*/ ctx[15]);
    			toggle_class(button_1, "s-btn--fab", /*fab*/ ctx[2]);
    			toggle_class(button_1, "icon", /*icon*/ ctx[3]);
    			toggle_class(button_1, "block", /*block*/ ctx[4]);
    			toggle_class(button_1, "tile", /*tile*/ ctx[6]);
    			toggle_class(button_1, "text", /*text*/ ctx[7] || /*icon*/ ctx[3]);
    			toggle_class(button_1, "depressed", /*depressed*/ ctx[8] || /*text*/ ctx[7] || /*disabled*/ ctx[11] || /*outlined*/ ctx[9] || /*icon*/ ctx[3]);
    			toggle_class(button_1, "outlined", /*outlined*/ ctx[9]);
    			toggle_class(button_1, "rounded", /*rounded*/ ctx[10]);
    			toggle_class(button_1, "disabled", /*disabled*/ ctx[11]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button_1);
    			if (default_slot) default_slot.d(detaching);
    			/*button_1_binding*/ ctx[21](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block_1;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"class","fab","icon","block","size","tile","text","depressed","outlined","rounded","disabled","active","activeClass","type","ripple","style","button"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Button', slots, ['default']);
    	let { class: klass = '' } = $$props;
    	let { fab = false } = $$props;
    	let { icon = false } = $$props;
    	let { block = false } = $$props;
    	let { size = 'default' } = $$props;
    	let { tile = false } = $$props;
    	let { text = false } = $$props;
    	let { depressed = false } = $$props;
    	let { outlined = false } = $$props;
    	let { rounded = false } = $$props;
    	let { disabled = null } = $$props;
    	let { active = false } = $$props;
    	let { activeClass = 'active' } = $$props;
    	let { type = 'button' } = $$props;
    	let { ripple = {} } = $$props;
    	let { style = null } = $$props;
    	let { button = null } = $$props;

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function button_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			button = $$value;
    			$$invalidate(0, button);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(17, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(1, klass = $$new_props.class);
    		if ('fab' in $$new_props) $$invalidate(2, fab = $$new_props.fab);
    		if ('icon' in $$new_props) $$invalidate(3, icon = $$new_props.icon);
    		if ('block' in $$new_props) $$invalidate(4, block = $$new_props.block);
    		if ('size' in $$new_props) $$invalidate(5, size = $$new_props.size);
    		if ('tile' in $$new_props) $$invalidate(6, tile = $$new_props.tile);
    		if ('text' in $$new_props) $$invalidate(7, text = $$new_props.text);
    		if ('depressed' in $$new_props) $$invalidate(8, depressed = $$new_props.depressed);
    		if ('outlined' in $$new_props) $$invalidate(9, outlined = $$new_props.outlined);
    		if ('rounded' in $$new_props) $$invalidate(10, rounded = $$new_props.rounded);
    		if ('disabled' in $$new_props) $$invalidate(11, disabled = $$new_props.disabled);
    		if ('active' in $$new_props) $$invalidate(12, active = $$new_props.active);
    		if ('activeClass' in $$new_props) $$invalidate(13, activeClass = $$new_props.activeClass);
    		if ('type' in $$new_props) $$invalidate(14, type = $$new_props.type);
    		if ('ripple' in $$new_props) $$invalidate(15, ripple = $$new_props.ripple);
    		if ('style' in $$new_props) $$invalidate(16, style = $$new_props.style);
    		if ('button' in $$new_props) $$invalidate(0, button = $$new_props.button);
    		if ('$$scope' in $$new_props) $$invalidate(18, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		Ripple,
    		Class,
    		klass,
    		fab,
    		icon,
    		block,
    		size,
    		tile,
    		text,
    		depressed,
    		outlined,
    		rounded,
    		disabled,
    		active,
    		activeClass,
    		type,
    		ripple,
    		style,
    		button
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('klass' in $$props) $$invalidate(1, klass = $$new_props.klass);
    		if ('fab' in $$props) $$invalidate(2, fab = $$new_props.fab);
    		if ('icon' in $$props) $$invalidate(3, icon = $$new_props.icon);
    		if ('block' in $$props) $$invalidate(4, block = $$new_props.block);
    		if ('size' in $$props) $$invalidate(5, size = $$new_props.size);
    		if ('tile' in $$props) $$invalidate(6, tile = $$new_props.tile);
    		if ('text' in $$props) $$invalidate(7, text = $$new_props.text);
    		if ('depressed' in $$props) $$invalidate(8, depressed = $$new_props.depressed);
    		if ('outlined' in $$props) $$invalidate(9, outlined = $$new_props.outlined);
    		if ('rounded' in $$props) $$invalidate(10, rounded = $$new_props.rounded);
    		if ('disabled' in $$props) $$invalidate(11, disabled = $$new_props.disabled);
    		if ('active' in $$props) $$invalidate(12, active = $$new_props.active);
    		if ('activeClass' in $$props) $$invalidate(13, activeClass = $$new_props.activeClass);
    		if ('type' in $$props) $$invalidate(14, type = $$new_props.type);
    		if ('ripple' in $$props) $$invalidate(15, ripple = $$new_props.ripple);
    		if ('style' in $$props) $$invalidate(16, style = $$new_props.style);
    		if ('button' in $$props) $$invalidate(0, button = $$new_props.button);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		button,
    		klass,
    		fab,
    		icon,
    		block,
    		size,
    		tile,
    		text,
    		depressed,
    		outlined,
    		rounded,
    		disabled,
    		active,
    		activeClass,
    		type,
    		ripple,
    		style,
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		button_1_binding
    	];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			class: 1,
    			fab: 2,
    			icon: 3,
    			block: 4,
    			size: 5,
    			tile: 6,
    			text: 7,
    			depressed: 8,
    			outlined: 9,
    			rounded: 10,
    			disabled: 11,
    			active: 12,
    			activeClass: 13,
    			type: 14,
    			ripple: 15,
    			style: 16,
    			button: 0
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get class() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fab() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fab(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icon() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get block() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set block(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tile() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tile(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get depressed() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set depressed(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get outlined() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set outlined(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rounded() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rounded(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get active() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activeClass() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activeClass(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ripple() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ripple(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get button() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set button(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    /* eslint-disable */
    // Shamefully ripped from https://github.com/lukeed/uid
    let IDX = 36;
    let HEX = '';
    while (IDX--) HEX += IDX.toString(36);

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }

    /* eslint-disable no-param-reassign */

    const themeColors = ['primary', 'secondary', 'success', 'info', 'warning', 'error'];

    /**
     * @param {string} klass
     */
    function formatClass(klass) {
      return klass.split(' ').map((i) => {
        if (themeColors.includes(i)) return `${i}-color`;
        return i;
      });
    }

    function setBackgroundColor(node, text) {
      if (/^(#|rgb|hsl|currentColor)/.test(text)) {
        // This is a CSS hex.
        node.style.backgroundColor = text;
        return false;
      }

      if (text.startsWith('--')) {
        // This is a CSS variable.
        node.style.backgroundColor = `var(${text})`;
        return false;
      }

      const klass = formatClass(text);
      node.classList.add(...klass);
      return klass;
    }

    /**
     * @param node {Element}
     * @param text {string|boolean}
     */
    var BackgroundColor = (node, text) => {
      let klass;
      if (typeof text === 'string') {
        klass = setBackgroundColor(node, text);
      }

      return {
        update(newText) {
          if (klass) {
            node.classList.remove(...klass);
          } else {
            node.style.backgroundColor = null;
          }

          if (typeof newText === 'string') {
            klass = setBackgroundColor(node, newText);
          }
        },
      };
    };

    /* node_modules\svelte-materialify\dist\components\Overlay\Overlay.svelte generated by Svelte v3.44.1 */
    const file$3 = "node_modules\\svelte-materialify\\dist\\components\\Overlay\\Overlay.svelte";

    // (20:0) {#if active}
    function create_if_block$1(ctx) {
    	let div2;
    	let div0;
    	let BackgroundColor_action;
    	let t;
    	let div1;
    	let div2_class_value;
    	let div2_style_value;
    	let div2_intro;
    	let div2_outro;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[11].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], null);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t = space();
    			div1 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", "s-overlay__scrim svelte-zop6hb");
    			set_style(div0, "opacity", /*opacity*/ ctx[5]);
    			add_location(div0, file$3, 27, 4, 1076);
    			attr_dev(div1, "class", "s-overlay__content svelte-zop6hb");
    			add_location(div1, file$3, 28, 4, 1167);
    			attr_dev(div2, "class", div2_class_value = "s-overlay " + /*klass*/ ctx[0] + " svelte-zop6hb");
    			attr_dev(div2, "style", div2_style_value = "z-index:" + /*index*/ ctx[7] + ";" + /*style*/ ctx[9]);
    			toggle_class(div2, "absolute", /*absolute*/ ctx[8]);
    			add_location(div2, file$3, 20, 2, 912);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t);
    			append_dev(div2, div1);

    			if (default_slot) {
    				default_slot.m(div1, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(BackgroundColor_action = BackgroundColor.call(null, div0, /*color*/ ctx[6])),
    					listen_dev(div2, "click", /*click_handler*/ ctx[12], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (!current || dirty & /*opacity*/ 32) {
    				set_style(div0, "opacity", /*opacity*/ ctx[5]);
    			}

    			if (BackgroundColor_action && is_function(BackgroundColor_action.update) && dirty & /*color*/ 64) BackgroundColor_action.update.call(null, /*color*/ ctx[6]);

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1024)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[10],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[10])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[10], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*klass*/ 1 && div2_class_value !== (div2_class_value = "s-overlay " + /*klass*/ ctx[0] + " svelte-zop6hb")) {
    				attr_dev(div2, "class", div2_class_value);
    			}

    			if (!current || dirty & /*index, style*/ 640 && div2_style_value !== (div2_style_value = "z-index:" + /*index*/ ctx[7] + ";" + /*style*/ ctx[9])) {
    				attr_dev(div2, "style", div2_style_value);
    			}

    			if (dirty & /*klass, absolute*/ 257) {
    				toggle_class(div2, "absolute", /*absolute*/ ctx[8]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);

    			add_render_callback(() => {
    				if (div2_outro) div2_outro.end(1);
    				div2_intro = create_in_transition(div2, /*transition*/ ctx[1], /*inOpts*/ ctx[2]);
    				div2_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			if (div2_intro) div2_intro.invalidate();
    			div2_outro = create_out_transition(div2, /*transition*/ ctx[1], /*outOpts*/ ctx[3]);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching && div2_outro) div2_outro.end();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(20:0) {#if active}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*active*/ ctx[4] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*active*/ ctx[4]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*active*/ 16) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Overlay', slots, ['default']);
    	let { class: klass = '' } = $$props;
    	let { transition = fade } = $$props;
    	let { inOpts = { duration: 250 } } = $$props;
    	let { outOpts = { duration: 250 } } = $$props;
    	let { active = true } = $$props;
    	let { opacity = 0.46 } = $$props;
    	let { color = 'rgb(33, 33, 33)' } = $$props;
    	let { index = 5 } = $$props;
    	let { absolute = false } = $$props;
    	let { style = '' } = $$props;

    	const writable_props = [
    		'class',
    		'transition',
    		'inOpts',
    		'outOpts',
    		'active',
    		'opacity',
    		'color',
    		'index',
    		'absolute',
    		'style'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Overlay> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, klass = $$props.class);
    		if ('transition' in $$props) $$invalidate(1, transition = $$props.transition);
    		if ('inOpts' in $$props) $$invalidate(2, inOpts = $$props.inOpts);
    		if ('outOpts' in $$props) $$invalidate(3, outOpts = $$props.outOpts);
    		if ('active' in $$props) $$invalidate(4, active = $$props.active);
    		if ('opacity' in $$props) $$invalidate(5, opacity = $$props.opacity);
    		if ('color' in $$props) $$invalidate(6, color = $$props.color);
    		if ('index' in $$props) $$invalidate(7, index = $$props.index);
    		if ('absolute' in $$props) $$invalidate(8, absolute = $$props.absolute);
    		if ('style' in $$props) $$invalidate(9, style = $$props.style);
    		if ('$$scope' in $$props) $$invalidate(10, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		BackgroundColor,
    		klass,
    		transition,
    		inOpts,
    		outOpts,
    		active,
    		opacity,
    		color,
    		index,
    		absolute,
    		style
    	});

    	$$self.$inject_state = $$props => {
    		if ('klass' in $$props) $$invalidate(0, klass = $$props.klass);
    		if ('transition' in $$props) $$invalidate(1, transition = $$props.transition);
    		if ('inOpts' in $$props) $$invalidate(2, inOpts = $$props.inOpts);
    		if ('outOpts' in $$props) $$invalidate(3, outOpts = $$props.outOpts);
    		if ('active' in $$props) $$invalidate(4, active = $$props.active);
    		if ('opacity' in $$props) $$invalidate(5, opacity = $$props.opacity);
    		if ('color' in $$props) $$invalidate(6, color = $$props.color);
    		if ('index' in $$props) $$invalidate(7, index = $$props.index);
    		if ('absolute' in $$props) $$invalidate(8, absolute = $$props.absolute);
    		if ('style' in $$props) $$invalidate(9, style = $$props.style);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		klass,
    		transition,
    		inOpts,
    		outOpts,
    		active,
    		opacity,
    		color,
    		index,
    		absolute,
    		style,
    		$$scope,
    		slots,
    		click_handler
    	];
    }

    class Overlay extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			class: 0,
    			transition: 1,
    			inOpts: 2,
    			outOpts: 3,
    			active: 4,
    			opacity: 5,
    			color: 6,
    			index: 7,
    			absolute: 8,
    			style: 9
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Overlay",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get class() {
    		throw new Error("<Overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get transition() {
    		throw new Error("<Overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set transition(value) {
    		throw new Error("<Overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inOpts() {
    		throw new Error("<Overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inOpts(value) {
    		throw new Error("<Overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get outOpts() {
    		throw new Error("<Overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set outOpts(value) {
    		throw new Error("<Overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get active() {
    		throw new Error("<Overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<Overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get opacity() {
    		throw new Error("<Overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set opacity(value) {
    		throw new Error("<Overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get index() {
    		throw new Error("<Overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set index(value) {
    		throw new Error("<Overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get absolute() {
    		throw new Error("<Overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set absolute(value) {
    		throw new Error("<Overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Player.svelte generated by Svelte v3.44.1 */

    const { isNaN: isNaN_1 } = globals;
    const file$2 = "src\\Player.svelte";

    function create_fragment$2(ctx) {
    	let div2;
    	let video;
    	let track;
    	let video_src_value;
    	let video_updating = false;
    	let video_animationframe;
    	let video_is_paused = true;
    	let t0;
    	let div1;
    	let div0;
    	let span0;
    	let t1_value = format(/*time*/ ctx[0]) + "";
    	let t1;
    	let t2;
    	let span2;
    	let span1;
    	let t3_value = format(/*duration*/ ctx[1]) + "";
    	let t3;
    	let t4;
    	let progress;
    	let progress_value_value;
    	let mounted;
    	let dispose;

    	function video_timeupdate_handler() {
    		cancelAnimationFrame(video_animationframe);

    		if (!video.paused) {
    			video_animationframe = raf(video_timeupdate_handler);
    			video_updating = true;
    		}

    		/*video_timeupdate_handler*/ ctx[8].call(video);
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			video = element("video");
    			track = element("track");
    			t0 = space();
    			div1 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			t1 = text(t1_value);
    			t2 = space();
    			span2 = element("span");
    			span1 = element("span");
    			t3 = text(t3_value);
    			t4 = space();
    			progress = element("progress");
    			attr_dev(track, "kind", "captions");
    			add_location(track, file$2, 78, 2, 2126);
    			attr_dev(video, "id", "vid");
    			attr_dev(video, "poster", "https://sveltejs.github.io/assets/caminandes-llamigos.jpg");
    			if (!src_url_equal(video.src, video_src_value = "https://sveltejs.github.io/assets/caminandes-llamigos.mp4")) attr_dev(video, "src", video_src_value);
    			attr_dev(video, "class", "svelte-l3mufg");
    			if (/*duration*/ ctx[1] === void 0) add_render_callback(() => /*video_durationchange_handler*/ ctx[9].call(video));
    			add_location(video, file$2, 68, 1, 1778);
    			attr_dev(span0, "class", "time svelte-l3mufg");
    			add_location(span0, file$2, 90, 3, 2515);
    			attr_dev(span1, "class", "time svelte-l3mufg");
    			add_location(span1, file$2, 92, 4, 2572);
    			attr_dev(span2, "class", "svelte-l3mufg");
    			add_location(span2, file$2, 91, 3, 2560);
    			attr_dev(div0, "class", "info svelte-l3mufg");
    			add_location(div0, file$2, 89, 2, 2492);
    			progress.value = progress_value_value = /*time*/ ctx[0] / /*duration*/ ctx[1] || 0;
    			attr_dev(progress, "class", "svelte-l3mufg");
    			add_location(progress, file$2, 95, 2, 2642);
    			attr_dev(div1, "class", "controls svelte-l3mufg");
    			set_style(div1, "opacity", /*duration*/ ctx[1] && /*showControls*/ ctx[3] ? 1 : 0);
    			add_location(div1, file$2, 81, 1, 2167);
    			attr_dev(div2, "id", "container");
    			attr_dev(div2, "class", "svelte-l3mufg");
    			add_location(div2, file$2, 67, 0, 1755);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, video);
    			append_dev(video, track);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, span0);
    			append_dev(span0, t1);
    			append_dev(div0, t2);
    			append_dev(div0, span2);
    			append_dev(span2, span1);
    			append_dev(span1, t3);
    			append_dev(div1, t4);
    			append_dev(div1, progress);

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "keydown", prevent_default(/*handleKeyDown*/ ctx[7]), false, true, false),
    					listen_dev(video, "mousedown", stop_propagation(prevent_default(/*handleMousedown*/ ctx[5])), false, true, true),
    					listen_dev(video, "mouseup", stop_propagation(prevent_default(/*handleMouseup*/ ctx[6])), false, true, true),
    					listen_dev(video, "timeupdate", video_timeupdate_handler),
    					listen_dev(video, "durationchange", /*video_durationchange_handler*/ ctx[9]),
    					listen_dev(video, "play", /*video_play_pause_handler*/ ctx[10]),
    					listen_dev(video, "pause", /*video_play_pause_handler*/ ctx[10]),
    					listen_dev(div1, "mousemove", stop_propagation(prevent_default(/*handleMove*/ ctx[4])), false, true, true),
    					listen_dev(div1, "touchmove", stop_propagation(prevent_default(/*handleMove*/ ctx[4])), false, true, true),
    					listen_dev(div1, "mousedown", stop_propagation(prevent_default(/*handleMove*/ ctx[4])), false, true, true),
    					listen_dev(div1, "mouseup", stop_propagation(prevent_default(/*handleMove*/ ctx[4])), false, true, true)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!video_updating && dirty & /*time*/ 1 && !isNaN_1(/*time*/ ctx[0])) {
    				video.currentTime = /*time*/ ctx[0];
    			}

    			video_updating = false;

    			if (dirty & /*paused*/ 4 && video_is_paused !== (video_is_paused = /*paused*/ ctx[2])) {
    				video[video_is_paused ? "pause" : "play"]();
    			}

    			if (dirty & /*time*/ 1 && t1_value !== (t1_value = format(/*time*/ ctx[0]) + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*duration*/ 2 && t3_value !== (t3_value = format(/*duration*/ ctx[1]) + "")) set_data_dev(t3, t3_value);

    			if (dirty & /*time, duration*/ 3 && progress_value_value !== (progress_value_value = /*time*/ ctx[0] / /*duration*/ ctx[1] || 0)) {
    				prop_dev(progress, "value", progress_value_value);
    			}

    			if (dirty & /*duration, showControls*/ 10) {
    				set_style(div1, "opacity", /*duration*/ ctx[1] && /*showControls*/ ctx[3] ? 1 : 0);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function format(seconds) {
    	if (isNaN(seconds)) return "...";
    	const minutes = Math.floor(seconds / 60);
    	seconds = Math.floor(seconds % 60);
    	if (seconds < 10) seconds = "0" + seconds;
    	return `${minutes}:${seconds}`;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Player', slots, []);
    	let time = 0;
    	let duration;
    	let paused = true;
    	let showControls = true;
    	let showControlsTimeout;

    	// Used to track time of last mouse down event
    	let lastMouseDown;

    	function handleMove(e) {
    		// Make the controls visible, but fade out after
    		// 2.5 seconds of inactivity
    		clearTimeout(showControlsTimeout);

    		showControlsTimeout = setTimeout(() => $$invalidate(3, showControls = false), 2500);
    		$$invalidate(3, showControls = true);
    		if (!duration) return; // video not loaded yet
    		if (e.type !== "touchmove" && !(e.buttons & 1)) return; // mouse not down

    		const clientX = e.type === "touchmove"
    		? e.touches[0].clientX
    		: e.clientX;

    		const { left, right } = this.getBoundingClientRect();
    		$$invalidate(0, time = duration * (clientX - left) / (right - left));
    	}

    	// we can't rely on the built-in click event, because it fires
    	// after a drag — we have to listen for clicks ourselves
    	function handleMousedown(e) {
    		lastMouseDown = new Date();
    	}

    	function handleMouseup(e) {
    		if (new Date() - lastMouseDown < 300) {
    			if (paused) e.target.play(); else e.target.pause();
    		}
    	}

    	function handleKeyDown(e) {
    		let video = document.getElementById("vid");

    		if (e && e.key == " ") {
    			if (paused) video.play(); else video.pause();
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Player> was created with unknown prop '${key}'`);
    	});

    	function video_timeupdate_handler() {
    		time = this.currentTime;
    		$$invalidate(0, time);
    	}

    	function video_durationchange_handler() {
    		duration = this.duration;
    		$$invalidate(1, duration);
    	}

    	function video_play_pause_handler() {
    		paused = this.paused;
    		$$invalidate(2, paused);
    	}

    	$$self.$capture_state = () => ({
    		time,
    		duration,
    		paused,
    		showControls,
    		showControlsTimeout,
    		lastMouseDown,
    		handleMove,
    		handleMousedown,
    		handleMouseup,
    		handleKeyDown,
    		format
    	});

    	$$self.$inject_state = $$props => {
    		if ('time' in $$props) $$invalidate(0, time = $$props.time);
    		if ('duration' in $$props) $$invalidate(1, duration = $$props.duration);
    		if ('paused' in $$props) $$invalidate(2, paused = $$props.paused);
    		if ('showControls' in $$props) $$invalidate(3, showControls = $$props.showControls);
    		if ('showControlsTimeout' in $$props) showControlsTimeout = $$props.showControlsTimeout;
    		if ('lastMouseDown' in $$props) lastMouseDown = $$props.lastMouseDown;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		time,
    		duration,
    		paused,
    		showControls,
    		handleMove,
    		handleMousedown,
    		handleMouseup,
    		handleKeyDown,
    		video_timeupdate_handler,
    		video_durationchange_handler,
    		video_play_pause_handler
    	];
    }

    class Player extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Player",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    // Source: https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/util/colors.ts

    const red = Object.freeze({
      base: '#f44336',
      'lighten-5': '#ffebee',
      'lighten-4': '#ffcdd2',
      'lighten-3': '#ef9a9a',
      'lighten-2': '#e57373',
      'lighten-1': '#ef5350',
      'darken-1': '#e53935',
      'darken-2': '#d32f2f',
      'darken-3': '#c62828',
      'darken-4': '#b71c1c',
      'accent-1': '#ff8a80',
      'accent-2': '#ff5252',
      'accent-3': '#ff1744',
      'accent-4': '#d50000',
    });

    const pink = Object.freeze({
      base: '#e91e63',
      'lighten-5': '#fce4ec',
      'lighten-4': '#f8bbd0',
      'lighten-3': '#f48fb1',
      'lighten-2': '#f06292',
      'lighten-1': '#ec407a',
      'darken-1': '#d81b60',
      'darken-2': '#c2185b',
      'darken-3': '#ad1457',
      'darken-4': '#880e4f',
      'accent-1': '#ff80ab',
      'accent-2': '#ff4081',
      'accent-3': '#f50057',
      'accent-4': '#c51162',
    });

    const purple = Object.freeze({
      base: '#9c27b0',
      'lighten-5': '#f3e5f5',
      'lighten-4': '#e1bee7',
      'lighten-3': '#ce93d8',
      'lighten-2': '#ba68c8',
      'lighten-1': '#ab47bc',
      'darken-1': '#8e24aa',
      'darken-2': '#7b1fa2',
      'darken-3': '#6a1b9a',
      'darken-4': '#4a148c',
      'accent-1': '#ea80fc',
      'accent-2': '#e040fb',
      'accent-3': '#d500f9',
      'accent-4': '#aa00ff',
    });

    const deepPurple = Object.freeze({
      base: '#673ab7',
      'lighten-5': '#ede7f6',
      'lighten-4': '#d1c4e9',
      'lighten-3': '#b39ddb',
      'lighten-2': '#9575cd',
      'lighten-1': '#7e57c2',
      'darken-1': '#5e35b1',
      'darken-2': '#512da8',
      'darken-3': '#4527a0',
      'darken-4': '#311b92',
      'accent-1': '#b388ff',
      'accent-2': '#7c4dff',
      'accent-3': '#651fff',
      'accent-4': '#6200ea',
    });

    const indigo = Object.freeze({
      base: '#3f51b5',
      'lighten-5': '#e8eaf6',
      'lighten-4': '#c5cae9',
      'lighten-3': '#9fa8da',
      'lighten-2': '#7986cb',
      'lighten-1': '#5c6bc0',
      'darken-1': '#3949ab',
      'darken-2': '#303f9f',
      'darken-3': '#283593',
      'darken-4': '#1a237e',
      'accent-1': '#8c9eff',
      'accent-2': '#536dfe',
      'accent-3': '#3d5afe',
      'accent-4': '#304ffe',
    });

    const blue = Object.freeze({
      base: '#2196f3',
      'lighten-5': '#e3f2fd',
      'lighten-4': '#bbdefb',
      'lighten-3': '#90caf9',
      'lighten-2': '#64b5f6',
      'lighten-1': '#42a5f5',
      'darken-1': '#1e88e5',
      'darken-2': '#1976d2',
      'darken-3': '#1565c0',
      'darken-4': '#0d47a1',
      'accent-1': '#82b1ff',
      'accent-2': '#448aff',
      'accent-3': '#2979ff',
      'accent-4': '#2962ff',
    });

    const lightBlue = Object.freeze({
      base: '#03a9f4',
      'lighten-5': '#e1f5fe',
      'lighten-4': '#b3e5fc',
      'lighten-3': '#81d4fa',
      'lighten-2': '#4fc3f7',
      'lighten-1': '#29b6f6',
      'darken-1': '#039be5',
      'darken-2': '#0288d1',
      'darken-3': '#0277bd',
      'darken-4': '#01579b',
      'accent-1': '#80d8ff',
      'accent-2': '#40c4ff',
      'accent-3': '#00b0ff',
      'accent-4': '#0091ea',
    });

    const cyan = Object.freeze({
      base: '#00bcd4',
      'lighten-5': '#e0f7fa',
      'lighten-4': '#b2ebf2',
      'lighten-3': '#80deea',
      'lighten-2': '#4dd0e1',
      'lighten-1': '#26c6da',
      'darken-1': '#00acc1',
      'darken-2': '#0097a7',
      'darken-3': '#00838f',
      'darken-4': '#006064',
      'accent-1': '#84ffff',
      'accent-2': '#18ffff',
      'accent-3': '#00e5ff',
      'accent-4': '#00b8d4',
    });

    const teal = Object.freeze({
      base: '#009688',
      'lighten-5': '#e0f2f1',
      'lighten-4': '#b2dfdb',
      'lighten-3': '#80cbc4',
      'lighten-2': '#4db6ac',
      'lighten-1': '#26a69a',
      'darken-1': '#00897b',
      'darken-2': '#00796b',
      'darken-3': '#00695c',
      'darken-4': '#004d40',
      'accent-1': '#a7ffeb',
      'accent-2': '#64ffda',
      'accent-3': '#1de9b6',
      'accent-4': '#00bfa5',
    });

    const green = Object.freeze({
      base: '#4caf50',
      'lighten-5': '#e8f5e9',
      'lighten-4': '#c8e6c9',
      'lighten-3': '#a5d6a7',
      'lighten-2': '#81c784',
      'lighten-1': '#66bb6a',
      'darken-1': '#43a047',
      'darken-2': '#388e3c',
      'darken-3': '#2e7d32',
      'darken-4': '#1b5e20',
      'accent-1': '#b9f6ca',
      'accent-2': '#69f0ae',
      'accent-3': '#00e676',
      'accent-4': '#00c853',
    });

    const lightGreen = Object.freeze({
      base: '#8bc34a',
      'lighten-5': '#f1f8e9',
      'lighten-4': '#dcedc8',
      'lighten-3': '#c5e1a5',
      'lighten-2': '#aed581',
      'lighten-1': '#9ccc65',
      'darken-1': '#7cb342',
      'darken-2': '#689f38',
      'darken-3': '#558b2f',
      'darken-4': '#33691e',
      'accent-1': '#ccff90',
      'accent-2': '#b2ff59',
      'accent-3': '#76ff03',
      'accent-4': '#64dd17',
    });

    const lime = Object.freeze({
      base: '#cddc39',
      'lighten-5': '#f9fbe7',
      'lighten-4': '#f0f4c3',
      'lighten-3': '#e6ee9c',
      'lighten-2': '#dce775',
      'lighten-1': '#d4e157',
      'darken-1': '#c0ca33',
      'darken-2': '#afb42b',
      'darken-3': '#9e9d24',
      'darken-4': '#827717',
      'accent-1': '#f4ff81',
      'accent-2': '#eeff41',
      'accent-3': '#c6ff00',
      'accent-4': '#aeea00',
    });

    const yellow = Object.freeze({
      base: '#ffeb3b',
      'lighten-5': '#fffde7',
      'lighten-4': '#fff9c4',
      'lighten-3': '#fff59d',
      'lighten-2': '#fff176',
      'lighten-1': '#ffee58',
      'darken-1': '#fdd835',
      'darken-2': '#fbc02d',
      'darken-3': '#f9a825',
      'darken-4': '#f57f17',
      'accent-1': '#ffff8d',
      'accent-2': '#ffff00',
      'accent-3': '#ffea00',
      'accent-4': '#ffd600',
    });

    const amber = Object.freeze({
      base: '#ffc107',
      'lighten-5': '#fff8e1',
      'lighten-4': '#ffecb3',
      'lighten-3': '#ffe082',
      'lighten-2': '#ffd54f',
      'lighten-1': '#ffca28',
      'darken-1': '#ffb300',
      'darken-2': '#ffa000',
      'darken-3': '#ff8f00',
      'darken-4': '#ff6f00',
      'accent-1': '#ffe57f',
      'accent-2': '#ffd740',
      'accent-3': '#ffc400',
      'accent-4': '#ffab00',
    });

    const orange = Object.freeze({
      base: '#ff9800',
      'lighten-5': '#fff3e0',
      'lighten-4': '#ffe0b2',
      'lighten-3': '#ffcc80',
      'lighten-2': '#ffb74d',
      'lighten-1': '#ffa726',
      'darken-1': '#fb8c00',
      'darken-2': '#f57c00',
      'darken-3': '#ef6c00',
      'darken-4': '#e65100',
      'accent-1': '#ffd180',
      'accent-2': '#ffab40',
      'accent-3': '#ff9100',
      'accent-4': '#ff6d00',
    });

    const deepOrange = Object.freeze({
      base: '#ff5722',
      'lighten-5': '#fbe9e7',
      'lighten-4': '#ffccbc',
      'lighten-3': '#ffab91',
      'lighten-2': '#ff8a65',
      'lighten-1': '#ff7043',
      'darken-1': '#f4511e',
      'darken-2': '#e64a19',
      'darken-3': '#d84315',
      'darken-4': '#bf360c',
      'accent-1': '#ff9e80',
      'accent-2': '#ff6e40',
      'accent-3': '#ff3d00',
      'accent-4': '#dd2c00',
    });

    const brown = Object.freeze({
      base: '#795548',
      'lighten-5': '#efebe9',
      'lighten-4': '#d7ccc8',
      'lighten-3': '#bcaaa4',
      'lighten-2': '#a1887f',
      'lighten-1': '#8d6e63',
      'darken-1': '#6d4c41',
      'darken-2': '#5d4037',
      'darken-3': '#4e342e',
      'darken-4': '#3e2723',
    });

    const blueGrey = Object.freeze({
      base: '#607d8b',
      'lighten-5': '#eceff1',
      'lighten-4': '#cfd8dc',
      'lighten-3': '#b0bec5',
      'lighten-2': '#90a4ae',
      'lighten-1': '#78909c',
      'darken-1': '#546e7a',
      'darken-2': '#455a64',
      'darken-3': '#37474f',
      'darken-4': '#263238',
    });

    const grey = Object.freeze({
      base: '#9e9e9e',
      'lighten-5': '#fafafa',
      'lighten-4': '#f5f5f5',
      'lighten-3': '#eeeeee',
      'lighten-2': '#e0e0e0',
      'lighten-1': '#bdbdbd',
      'darken-1': '#757575',
      'darken-2': '#616161',
      'darken-3': '#424242',
      'darken-4': '#212121',
    });

    const shades = Object.freeze({
      black: '#000000',
      white: '#ffffff',
      transparent: 'transparent',
    });

    var colors = {
      red,
      pink,
      purple,
      deepPurple,
      indigo,
      blue,
      lightBlue,
      cyan,
      teal,
      green,
      lightGreen,
      lime,
      yellow,
      amber,
      orange,
      deepOrange,
      brown,
      blueGrey,
      grey,
      shades,
    };

    const isFullDescription = writable();

    /* src\videoDescription.svelte generated by Svelte v3.44.1 */
    const file$1 = "src\\videoDescription.svelte";

    // (10:4) <Overlay            opacity = {0.5}      on:click= {() => {          $isFullDescription = false;      }}      >
    function create_default_slot$1(ctx) {
    	let div2;
    	let iframe;
    	let iframe_src_value;
    	let t0;
    	let i;
    	let t1;
    	let div0;
    	let t3;
    	let div1;
    	let p;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			iframe = element("iframe");
    			t0 = space();
    			i = element("i");
    			t1 = space();
    			div0 = element("div");
    			div0.textContent = "hahahha";
    			t3 = space();
    			div1 = element("div");
    			p = element("p");
    			p.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel risus faucibus, bibendum velit ut, congue ex. Sed pulvinar rutrum odio quis scelerisque. Aenean posuere efficitur nulla, et sagittis nisl gravida gravida. Fusce risus quam, faucibus a porta nec, ultrices ornare quam. Praesent auctor gravida aliquet. Donec finibus nec mauris id cursus. Aliquam vel dolor metus. Etiam convallis fermentum euismod. Integer nunc mi, viverra nec diam eget, rutrum consectetur felis. Pellentesque in justo ac velit consectetur mattis. In id ultricies tellus, vel consectetur nisi. Proin in hendrerit magna, sit amet interdum est. Nam at commodo velit. Vestibulum malesuada pharetra tempor. Nunc egestas sagittis nibh, eu pretium odio molestie quis.";
    			attr_dev(iframe, "width", "443");
    			attr_dev(iframe, "height", "253");
    			if (!src_url_equal(iframe.src, iframe_src_value = "https://www.youtube.com/embed/nMaGGmE-rI8")) attr_dev(iframe, "src", iframe_src_value);
    			attr_dev(iframe, "title", "YouTube video player");
    			attr_dev(iframe, "frameborder", "0");
    			attr_dev(iframe, "allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
    			iframe.allowFullscreen = true;
    			add_location(iframe, file$1, 19, 12, 351);
    			attr_dev(i, "class", "fa fa-times");
    			set_style(i, "color", "white");
    			add_location(i, file$1, 21, 12, 615);
    			attr_dev(div0, "class", "img");
    			add_location(div0, file$1, 24, 12, 758);
    			set_style(p, "color", "white");
    			add_location(p, file$1, 29, 12, 880);
    			attr_dev(div1, "class", "");
    			add_location(div1, file$1, 27, 12, 834);
    			attr_dev(div2, "class", "container svelte-zifvhi");
    			add_location(div2, file$1, 16, 8, 300);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, iframe);
    			append_dev(div2, t0);
    			append_dev(div2, i);
    			append_dev(div2, t1);
    			append_dev(div2, div0);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			append_dev(div1, p);

    			if (!mounted) {
    				dispose = listen_dev(i, "click", /*click_handler*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(10:4) <Overlay            opacity = {0.5}      on:click= {() => {          $isFullDescription = false;      }}      >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let main;
    	let overlay;
    	let current;

    	overlay = new Overlay({
    			props: {
    				opacity: 0.5,
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	overlay.$on("click", /*click_handler_1*/ ctx[3]);

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(overlay.$$.fragment);
    			add_location(main, file$1, 7, 0, 165);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(overlay, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const overlay_changes = {};

    			if (dirty & /*$$scope, $isFullDescription*/ 17) {
    				overlay_changes.$$scope = { dirty, ctx };
    			}

    			overlay.$set(overlay_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(overlay.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(overlay.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(overlay);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $isFullDescription;
    	validate_store(isFullDescription, 'isFullDescription');
    	component_subscribe($$self, isFullDescription, $$value => $$invalidate(0, $isFullDescription = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('VideoDescription', slots, []);
    	let { video_src } = $$props;
    	const writable_props = ['video_src'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<VideoDescription> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		set_store_value(isFullDescription, $isFullDescription = false, $isFullDescription);
    	};

    	const click_handler_1 = () => {
    		set_store_value(isFullDescription, $isFullDescription = false, $isFullDescription);
    	};

    	$$self.$$set = $$props => {
    		if ('video_src' in $$props) $$invalidate(1, video_src = $$props.video_src);
    	};

    	$$self.$capture_state = () => ({
    		Button,
    		Overlay,
    		isFullDescription,
    		video_src,
    		$isFullDescription
    	});

    	$$self.$inject_state = $$props => {
    		if ('video_src' in $$props) $$invalidate(1, video_src = $$props.video_src);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$isFullDescription, video_src, click_handler, click_handler_1];
    }

    class VideoDescription extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { video_src: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "VideoDescription",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*video_src*/ ctx[1] === undefined && !('video_src' in props)) {
    			console.warn("<VideoDescription> was created without expected prop 'video_src'");
    		}
    	}

    	get video_src() {
    		throw new Error("<VideoDescription>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set video_src(value) {
    		throw new Error("<VideoDescription>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.44.1 */

    const { Object: Object_1 } = globals;
    const file = "src\\App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	child_ctx[14] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	child_ctx[14] = i;
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	child_ctx[14] = i;
    	return child_ctx;
    }

    // (32:4) {#if $isFullDescription}
    function create_if_block_1(ctx) {
    	let videodescription;
    	let current;

    	videodescription = new VideoDescription({
    			props: {
    				video_src: "https://www.imdb.com/video/imdb/vi3226468377/imdb/embed"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(videodescription.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(videodescription, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(videodescription.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(videodescription.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(videodescription, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(32:4) {#if $isFullDescription}",
    		ctx
    	});

    	return block;
    }

    // (69:12) {#each Array(10) as _, i}
    function create_each_block_2(ctx) {
    	let div5;
    	let div4;
    	let div0;
    	let t0;
    	let div3;
    	let div1;
    	let i0;
    	let t1;
    	let i1;
    	let t2;
    	let i2;
    	let t3;
    	let i3;
    	let t4;
    	let div2;
    	let span0;
    	let t6;
    	let span1;
    	let t8;
    	let span2;
    	let t10;
    	let span3;
    	let t12;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div4 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div3 = element("div");
    			div1 = element("div");
    			i0 = element("i");
    			t1 = space();
    			i1 = element("i");
    			t2 = space();
    			i2 = element("i");
    			t3 = space();
    			i3 = element("i");
    			t4 = space();
    			div2 = element("div");
    			span0 = element("span");
    			span0.textContent = "NEW";
    			t6 = space();
    			span1 = element("span");
    			span1.textContent = "16+";
    			t8 = space();
    			span2 = element("span");
    			span2.textContent = "1 h 30 min";
    			t10 = space();
    			span3 = element("span");
    			span3.textContent = "HD";
    			t12 = space();
    			attr_dev(div0, "class", "item svelte-1uq8z4i");
    			set_style(div0, "background-image", "url(' " + Object.keys(/*imagesSrc*/ ctx[3]).map(/*func*/ ctx[4])[Math.floor(/*i*/ ctx[14] / 2)] + "')");
    			add_location(div0, file, 79, 20, 3128);
    			attr_dev(i0, "class", "fa fa-play-circle svelte-1uq8z4i");
    			add_location(i0, file, 90, 28, 3627);
    			attr_dev(i1, "class", "fa fa-plus svelte-1uq8z4i");
    			add_location(i1, file, 91, 28, 3690);
    			attr_dev(i2, "class", "fa fa-thumbs-up svelte-1uq8z4i");
    			add_location(i2, file, 92, 28, 3746);
    			attr_dev(i3, "class", "fa fa-chevron-circle-down svelte-1uq8z4i");
    			set_style(i3, "margin-left", "auto");
    			set_style(i3, "margin-right", "10px ");
    			add_location(i3, file, 93, 28, 3807);
    			set_style(div1, "display", "flex");
    			set_style(div1, "flex-direction", "row");
    			set_style(div1, "gap", "10px");
    			attr_dev(div1, "class", "svelte-1uq8z4i");
    			add_location(div1, file, 89, 24, 3538);
    			set_style(span0, "color", "green");
    			attr_dev(span0, "class", "svelte-1uq8z4i");
    			add_location(span0, file, 96, 28, 4061);
    			attr_dev(span1, "class", "age-restriction svelte-1uq8z4i");
    			add_location(span1, file, 97, 28, 4128);
    			attr_dev(span2, "class", "svelte-1uq8z4i");
    			add_location(span2, file, 98, 28, 4198);
    			attr_dev(span3, "class", "resolution svelte-1uq8z4i");
    			add_location(span3, file, 99, 28, 4251);
    			set_style(div2, "display", "flex");
    			set_style(div2, "flex-direction", "row");
    			set_style(div2, "gap", "10px");
    			set_style(div2, "margin-top", "10px");
    			attr_dev(div2, "class", "svelte-1uq8z4i");
    			add_location(div2, file, 95, 24, 3953);
    			attr_dev(div3, "class", "short_description svelte-1uq8z4i");
    			add_location(div3, file, 88, 20, 3481);
    			attr_dev(div4, "class", "item-container svelte-1uq8z4i");
    			add_location(div4, file, 72, 16, 2865);
    			set_style(div5, "display", "flex");
    			set_style(div5, "flex-direction", "row");
    			set_style(div5, "align-items", "center");
    			attr_dev(div5, "class", "svelte-1uq8z4i");
    			add_location(div5, file, 69, 16, 2744);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div4, div0);
    			append_dev(div4, t0);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, i0);
    			append_dev(div1, t1);
    			append_dev(div1, i1);
    			append_dev(div1, t2);
    			append_dev(div1, i2);
    			append_dev(div1, t3);
    			append_dev(div1, i3);
    			append_dev(div3, t4);
    			append_dev(div3, div2);
    			append_dev(div2, span0);
    			append_dev(div2, t6);
    			append_dev(div2, span1);
    			append_dev(div2, t8);
    			append_dev(div2, span2);
    			append_dev(div2, t10);
    			append_dev(div2, span3);
    			append_dev(div5, t12);

    			if (!mounted) {
    				dispose = listen_dev(div4, "click", /*click_handler*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(69:12) {#each Array(10) as _, i}",
    		ctx
    	});

    	return block;
    }

    // (116:12) {#each Array(10) as _, i}
    function create_each_block_1(ctx) {
    	let div5;
    	let span0;
    	let t0_value = /*i*/ ctx[14] + 1 + "";
    	let t0;
    	let t1;
    	let div4;
    	let div0;
    	let t2;
    	let div3;
    	let div1;
    	let i0;
    	let t3;
    	let i1;
    	let t4;
    	let i2;
    	let t5;
    	let i3;
    	let t6;
    	let div2;
    	let span1;
    	let t8;
    	let span2;
    	let t10;
    	let span3;
    	let t12;
    	let span4;
    	let t14;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			div4 = element("div");
    			div0 = element("div");
    			t2 = space();
    			div3 = element("div");
    			div1 = element("div");
    			i0 = element("i");
    			t3 = space();
    			i1 = element("i");
    			t4 = space();
    			i2 = element("i");
    			t5 = space();
    			i3 = element("i");
    			t6 = space();
    			div2 = element("div");
    			span1 = element("span");
    			span1.textContent = "NEW";
    			t8 = space();
    			span2 = element("span");
    			span2.textContent = "16+";
    			t10 = space();
    			span3 = element("span");
    			span3.textContent = "1 h 30 min";
    			t12 = space();
    			span4 = element("span");
    			span4.textContent = "HD";
    			t14 = space();
    			set_style(span0, "font-size", "5em");
    			attr_dev(span0, "class", "svelte-1uq8z4i");
    			add_location(span0, file, 120, 20, 4730);
    			attr_dev(div0, "class", "item svelte-1uq8z4i");
    			add_location(div0, file, 127, 24, 5029);
    			attr_dev(i0, "class", "fa fa-play-circle svelte-1uq8z4i");
    			add_location(i0, file, 130, 32, 5229);
    			attr_dev(i1, "class", "fa fa-plus svelte-1uq8z4i");
    			add_location(i1, file, 131, 32, 5296);
    			attr_dev(i2, "class", "fa fa-thumbs-up svelte-1uq8z4i");
    			add_location(i2, file, 132, 32, 5356);
    			attr_dev(i3, "class", "fa fa-chevron-circle-down svelte-1uq8z4i");
    			set_style(i3, "margin-left", "auto");
    			set_style(i3, "margin-right", "10px ");
    			add_location(i3, file, 133, 32, 5421);
    			set_style(div1, "display", "flex");
    			set_style(div1, "flex-direction", "row");
    			set_style(div1, "gap", "10px");
    			attr_dev(div1, "class", "svelte-1uq8z4i");
    			add_location(div1, file, 129, 28, 5136);
    			set_style(span1, "color", "green");
    			attr_dev(span1, "class", "svelte-1uq8z4i");
    			add_location(span1, file, 136, 32, 5687);
    			attr_dev(span2, "class", "age-restriction svelte-1uq8z4i");
    			add_location(span2, file, 137, 32, 5758);
    			attr_dev(span3, "class", "svelte-1uq8z4i");
    			add_location(span3, file, 138, 32, 5832);
    			attr_dev(span4, "class", "resolution svelte-1uq8z4i");
    			add_location(span4, file, 139, 32, 5889);
    			set_style(div2, "display", "flex");
    			set_style(div2, "flex-direction", "row");
    			set_style(div2, "gap", "10px");
    			set_style(div2, "margin-top", "10px");
    			attr_dev(div2, "class", "svelte-1uq8z4i");
    			add_location(div2, file, 135, 28, 5575);
    			attr_dev(div3, "class", "short_description svelte-1uq8z4i");
    			add_location(div3, file, 128, 24, 5075);
    			attr_dev(div4, "class", "item-container svelte-1uq8z4i");
    			add_location(div4, file, 121, 20, 4797);
    			set_style(div5, "display", "flex");
    			set_style(div5, "flex-direction", "row");
    			set_style(div5, "align-items", "center");
    			attr_dev(div5, "class", "svelte-1uq8z4i");
    			add_location(div5, file, 116, 16, 4599);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, span0);
    			append_dev(span0, t0);
    			append_dev(div5, t1);
    			append_dev(div5, div4);
    			append_dev(div4, div0);
    			append_dev(div4, t2);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, i0);
    			append_dev(div1, t3);
    			append_dev(div1, i1);
    			append_dev(div1, t4);
    			append_dev(div1, i2);
    			append_dev(div1, t5);
    			append_dev(div1, i3);
    			append_dev(div3, t6);
    			append_dev(div3, div2);
    			append_dev(div2, span1);
    			append_dev(div2, t8);
    			append_dev(div2, span2);
    			append_dev(div2, t10);
    			append_dev(div2, span3);
    			append_dev(div2, t12);
    			append_dev(div2, span4);
    			append_dev(div5, t14);

    			if (!mounted) {
    				dispose = listen_dev(div4, "click", /*click_handler_1*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(116:12) {#each Array(10) as _, i}",
    		ctx
    	});

    	return block;
    }

    // (160:8) {#each Array(100) as _, i}
    function create_each_block(ctx) {
    	let div;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "grid-item svelte-1uq8z4i");
    			add_location(div, file, 160, 12, 6340);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*click_handler_2*/ ctx[7], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(160:8) {#each Array(100) as _, i}",
    		ctx
    	});

    	return block;
    }

    // (185:16) <Button                      class="error-color"                      size="small"                      on:click={() => {                          video_player_is_active = false;                      }}                  >
    function create_default_slot_3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Close");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(185:16) <Button                      class=\\\"error-color\\\"                      size=\\\"small\\\"                      on:click={() => {                          video_player_is_active = false;                      }}                  >",
    		ctx
    	});

    	return block;
    }

    // (196:16) <Button                      size="small"                      class="primary-color"                      on:click={() => {                          is_fullscreen = !is_fullscreen;                          // do not focus the fullscreenbutton if clicked                          // this is because otherwise clicking space will cause                          // the video player to maximize/minimize instead of pause/play                          // when space is clicked                          if (document.activeElement != document.body)                              document.activeElement.blur();                      }}                  >
    function create_default_slot_2(ctx) {
    	let t_value = (/*is_fullscreen*/ ctx[1] ? "Minimize" : "Theatre Mode") + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*is_fullscreen*/ 2 && t_value !== (t_value = (/*is_fullscreen*/ ctx[1] ? "Minimize" : "Theatre Mode") + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(196:16) <Button                      size=\\\"small\\\"                      class=\\\"primary-color\\\"                      on:click={() => {                          is_fullscreen = !is_fullscreen;                          // do not focus the fullscreenbutton if clicked                          // this is because otherwise clicking space will cause                          // the video player to maximize/minimize instead of pause/play                          // when space is clicked                          if (document.activeElement != document.body)                              document.activeElement.blur();                      }}                  >",
    		ctx
    	});

    	return block;
    }

    // (213:12) {#if is_fullscreen}
    function create_if_block(ctx) {
    	let div;
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				size: "small",
    				class: "secondary-color",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*click_handler_5*/ ctx[10]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(button.$$.fragment);
    			attr_dev(div, "id", "gigascreen");
    			attr_dev(div, "class", "svelte-1uq8z4i");
    			add_location(div, file, 213, 16, 8139);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(button, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 131072) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(213:12) {#if is_fullscreen}",
    		ctx
    	});

    	return block;
    }

    // (215:20) <Button                          size="small"                          class="secondary-color"                          on:click={() => {                              // do not focus the fullscreenbutton if clicked                              // this is because otherwise clicking space will cause                              // the video player to maximize/minimize instead of pause/play                              // when space is clicked                              if (document.activeElement != document.body)                                  document.activeElement.blur();                                let div = document.getElementById("vid");                              if (div.requestFullscreen) div.requestFullscreen();                              else if (div.webkitRequestFullscreen)                                  div.webkitRequestFullscreen();                              else if (div.msRequestFullScreen)                                  div.msRequestFullScreen();                          }}                      >
    function create_default_slot_1(ctx) {
    	let t_value = "Gigascreen" + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(215:20) <Button                          size=\\\"small\\\"                          class=\\\"secondary-color\\\"                          on:click={() => {                              // do not focus the fullscreenbutton if clicked                              // this is because otherwise clicking space will cause                              // the video player to maximize/minimize instead of pause/play                              // when space is clicked                              if (document.activeElement != document.body)                                  document.activeElement.blur();                                let div = document.getElementById(\\\"vid\\\");                              if (div.requestFullscreen) div.requestFullscreen();                              else if (div.webkitRequestFullscreen)                                  div.webkitRequestFullscreen();                              else if (div.msRequestFullScreen)                                  div.msRequestFullScreen();                          }}                      >",
    		ctx
    	});

    	return block;
    }

    // (169:4) <Overlay          opacity={is_fullscreen ? 1 : 0.7}          color="black"          active={video_player_is_active}          on:click={() => {              video_player_is_active = false;          }}      >
    function create_default_slot(ctx) {
    	let div2;
    	let div0;
    	let button0;
    	let t0;
    	let div1;
    	let button1;
    	let t1;
    	let t2;
    	let player;
    	let t3;
    	let current;
    	let mounted;
    	let dispose;

    	button0 = new Button({
    			props: {
    				class: "error-color",
    				size: "small",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", /*click_handler_3*/ ctx[8]);

    	button1 = new Button({
    			props: {
    				size: "small",
    				class: "primary-color",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", /*click_handler_4*/ ctx[9]);
    	let if_block = /*is_fullscreen*/ ctx[1] && create_if_block(ctx);
    	player = new Player({ $$inline: true });

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			create_component(button0.$$.fragment);
    			t0 = space();
    			div1 = element("div");
    			create_component(button1.$$.fragment);
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			create_component(player.$$.fragment);
    			t3 = space();
    			attr_dev(div0, "id", "close");
    			attr_dev(div0, "class", "svelte-1uq8z4i");
    			add_location(div0, file, 183, 12, 6946);
    			attr_dev(div1, "id", "fullscreen");
    			attr_dev(div1, "class", "svelte-1uq8z4i");
    			add_location(div1, file, 194, 12, 7289);
    			attr_dev(div2, "id", "video");
    			attr_dev(div2, "class", "svelte-1uq8z4i");
    			toggle_class(div2, "fullscreen", /*is_fullscreen*/ ctx[1] == true);
    			add_location(div2, file, 176, 8, 6753);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			mount_component(button0, div0, null);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			mount_component(button1, div1, null);
    			append_dev(div2, t1);
    			if (if_block) if_block.m(div2, null);
    			append_dev(div2, t2);
    			mount_component(player, div2, null);
    			insert_dev(target, t3, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div2, "click", click_handler_6, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 131072) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope, is_fullscreen*/ 131074) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);

    			if (/*is_fullscreen*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*is_fullscreen*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div2, t2);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (dirty & /*is_fullscreen*/ 2) {
    				toggle_class(div2, "fullscreen", /*is_fullscreen*/ ctx[1] == true);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(if_block);
    			transition_in(player.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(if_block);
    			transition_out(player.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(button0);
    			destroy_component(button1);
    			if (if_block) if_block.d();
    			destroy_component(player);
    			if (detaching) detach_dev(t3);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(169:4) <Overlay          opacity={is_fullscreen ? 1 : 0.7}          color=\\\"black\\\"          active={video_player_is_active}          on:click={() => {              video_player_is_active = false;          }}      >",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let link;
    	let t0;
    	let main;
    	let t1;
    	let div3;
    	let div0;
    	let span0;
    	let t3;
    	let div1;
    	let ul;
    	let li0;
    	let t5;
    	let li1;
    	let t7;
    	let li2;
    	let t9;
    	let li3;
    	let t11;
    	let li4;
    	let t13;
    	let div2;
    	let span1;
    	let t14;
    	let div7;
    	let h10;
    	let t16;
    	let div4;
    	let t17;
    	let h11;
    	let t19;
    	let div5;
    	let t20;
    	let h12;
    	let t22;
    	let div6;
    	let t23;
    	let h13;
    	let t25;
    	let div8;
    	let t26;
    	let div9;
    	let t27;
    	let overlay;
    	let t28;
    	let current;
    	let if_block = /*$isFullDescription*/ ctx[2] && create_if_block_1(ctx);
    	let each_value_2 = Array(10);
    	validate_each_argument(each_value_2);
    	let each_blocks_2 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let each_value_1 = Array(10);
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_value = Array(100);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	overlay = new Overlay({
    			props: {
    				opacity: /*is_fullscreen*/ ctx[1] ? 1 : 0.7,
    				color: "black",
    				active: /*video_player_is_active*/ ctx[0],
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	overlay.$on("click", /*click_handler_7*/ ctx[11]);

    	const block = {
    		c: function create() {
    			link = element("link");
    			t0 = space();
    			main = element("main");
    			if (if_block) if_block.c();
    			t1 = space();
    			div3 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			span0.textContent = "neflix";
    			t3 = space();
    			div1 = element("div");
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "Home";
    			t5 = space();
    			li1 = element("li");
    			li1.textContent = "Series";
    			t7 = space();
    			li2 = element("li");
    			li2.textContent = "Movies";
    			t9 = space();
    			li3 = element("li");
    			li3.textContent = "New and popular";
    			t11 = space();
    			li4 = element("li");
    			li4.textContent = "My list";
    			t13 = space();
    			div2 = element("div");
    			span1 = element("span");
    			t14 = space();
    			div7 = element("div");
    			h10 = element("h1");
    			h10.textContent = "Recomended";
    			t16 = space();
    			div4 = element("div");

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].c();
    			}

    			t17 = space();
    			h11 = element("h1");
    			h11.textContent = "Top 10";
    			t19 = space();
    			div5 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t20 = space();
    			h12 = element("h1");
    			h12.textContent = "Action";
    			t22 = space();
    			div6 = element("div");
    			t23 = space();
    			h13 = element("h1");
    			h13.textContent = "News";
    			t25 = space();
    			div8 = element("div");
    			t26 = space();
    			div9 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t27 = space();
    			create_component(overlay.$$.fragment);
    			t28 = text(">");
    			attr_dev(link, "rel", "stylesheet");
    			attr_dev(link, "href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
    			attr_dev(link, "class", "svelte-1uq8z4i");
    			add_location(link, file, 24, 0, 1154);
    			set_style(span0, "margin-left", "20px");
    			set_style(span0, "font-size", "4em, ");
    			attr_dev(span0, "class", "svelte-1uq8z4i");
    			add_location(span0, file, 37, 12, 1485);
    			attr_dev(div0, "class", "svelte-1uq8z4i");
    			add_location(div0, file, 36, 8, 1466);
    			attr_dev(li0, "class", "svelte-1uq8z4i");
    			add_location(li0, file, 41, 16, 1631);
    			attr_dev(li1, "class", "svelte-1uq8z4i");
    			add_location(li1, file, 42, 16, 1662);
    			attr_dev(li2, "class", "svelte-1uq8z4i");
    			add_location(li2, file, 43, 16, 1695);
    			attr_dev(li3, "class", "svelte-1uq8z4i");
    			add_location(li3, file, 44, 16, 1728);
    			attr_dev(li4, "class", "svelte-1uq8z4i");
    			add_location(li4, file, 45, 16, 1770);
    			attr_dev(ul, "class", "navMenu svelte-1uq8z4i");
    			add_location(ul, file, 40, 12, 1593);
    			attr_dev(div1, "class", "svelte-1uq8z4i");
    			add_location(div1, file, 39, 8, 1574);
    			attr_dev(span1, "class", "fa fa-search fa-2x svelte-1uq8z4i");
    			add_location(span1, file, 50, 12, 1870);
    			attr_dev(div2, "class", "navSearch svelte-1uq8z4i");
    			add_location(div2, file, 49, 8, 1833);
    			attr_dev(div3, "class", "header svelte-1uq8z4i");
    			add_location(div3, file, 35, 4, 1436);
    			attr_dev(h10, "class", "svelte-1uq8z4i");
    			add_location(h10, file, 63, 8, 2281);
    			attr_dev(div4, "class", "flex-container svelte-1uq8z4i");
    			add_location(div4, file, 67, 8, 2659);
    			attr_dev(h11, "class", "svelte-1uq8z4i");
    			add_location(h11, file, 112, 8, 4487);
    			attr_dev(div5, "class", "flex-container svelte-1uq8z4i");
    			add_location(div5, file, 114, 8, 4514);
    			attr_dev(h12, "class", "svelte-1uq8z4i");
    			add_location(h12, file, 150, 8, 6157);
    			attr_dev(div6, "class", "flex-container svelte-1uq8z4i");
    			add_location(div6, file, 152, 8, 6184);
    			attr_dev(h13, "class", "svelte-1uq8z4i");
    			add_location(h13, file, 153, 8, 6224);
    			attr_dev(div7, "class", "container svelte-1uq8z4i");
    			add_location(div7, file, 54, 4, 1941);
    			attr_dev(div8, "class", "svelte-1uq8z4i");
    			add_location(div8, file, 156, 4, 6257);
    			attr_dev(div9, "class", "grid svelte-1uq8z4i");
    			add_location(div9, file, 158, 4, 6272);
    			attr_dev(main, "class", "svelte-1uq8z4i");
    			add_location(main, file, 29, 0, 1284);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, link, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			if (if_block) if_block.m(main, null);
    			append_dev(main, t1);
    			append_dev(main, div3);
    			append_dev(div3, div0);
    			append_dev(div0, span0);
    			append_dev(div3, t3);
    			append_dev(div3, div1);
    			append_dev(div1, ul);
    			append_dev(ul, li0);
    			append_dev(ul, t5);
    			append_dev(ul, li1);
    			append_dev(ul, t7);
    			append_dev(ul, li2);
    			append_dev(ul, t9);
    			append_dev(ul, li3);
    			append_dev(ul, t11);
    			append_dev(ul, li4);
    			append_dev(div3, t13);
    			append_dev(div3, div2);
    			append_dev(div2, span1);
    			append_dev(main, t14);
    			append_dev(main, div7);
    			append_dev(div7, h10);
    			append_dev(div7, t16);
    			append_dev(div7, div4);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].m(div4, null);
    			}

    			append_dev(div7, t17);
    			append_dev(div7, h11);
    			append_dev(div7, t19);
    			append_dev(div7, div5);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div5, null);
    			}

    			append_dev(div7, t20);
    			append_dev(div7, h12);
    			append_dev(div7, t22);
    			append_dev(div7, div6);
    			append_dev(div7, t23);
    			append_dev(div7, h13);
    			append_dev(main, t25);
    			append_dev(main, div8);
    			append_dev(main, t26);
    			append_dev(main, div9);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div9, null);
    			}

    			append_dev(main, t27);
    			mount_component(overlay, main, null);
    			append_dev(main, t28);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$isFullDescription*/ ctx[2]) {
    				if (if_block) {
    					if (dirty & /*$isFullDescription*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(main, t1);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (dirty & /*$isFullDescription, Object, imagesSrc, Math*/ 12) {
    				each_value_2 = Array(10);
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_2[i]) {
    						each_blocks_2[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_2[i] = create_each_block_2(child_ctx);
    						each_blocks_2[i].c();
    						each_blocks_2[i].m(div4, null);
    					}
    				}

    				for (; i < each_blocks_2.length; i += 1) {
    					each_blocks_2[i].d(1);
    				}

    				each_blocks_2.length = each_value_2.length;
    			}

    			if (dirty & /*video_player_is_active*/ 1) {
    				each_value_1 = Array(10);
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div5, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*video_player_is_active*/ 1) {
    				each_value = Array(100);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div9, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			const overlay_changes = {};
    			if (dirty & /*is_fullscreen*/ 2) overlay_changes.opacity = /*is_fullscreen*/ ctx[1] ? 1 : 0.7;
    			if (dirty & /*video_player_is_active*/ 1) overlay_changes.active = /*video_player_is_active*/ ctx[0];

    			if (dirty & /*$$scope, is_fullscreen, video_player_is_active*/ 131075) {
    				overlay_changes.$$scope = { dirty, ctx };
    			}

    			overlay.$set(overlay_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(overlay.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(overlay.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(link);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			if (if_block) if_block.d();
    			destroy_each(each_blocks_2, detaching);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			destroy_component(overlay);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const click_handler_6 = e => {
    	e.stopPropagation();
    };

    function instance($$self, $$props, $$invalidate) {
    	let $isFullDescription;
    	validate_store(isFullDescription, 'isFullDescription');
    	component_subscribe($$self, isFullDescription, $$value => $$invalidate(2, $isFullDescription = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let video_player_is_active = false;
    	let is_fullscreen = false;
    	set_store_value(isFullDescription, $isFullDescription = false, $isFullDescription);

    	//"https://www.imdb.com/video/imdb/vi3226468377/imdb/embed"
    	const imagesSrc = {
    		missionImposible: "https://m.media-amazon.com/images/M/MV5BMTc3NjI2MjU0Nl5BMl5BanBnXkFtZTgwNDk3ODYxMTE@._V1_.jpg",
    		batman: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJApnr9b8RCQjrOr0YpzqMTY1xXWNrfWHgq0VvNxVNUaG9XyrV",
    		shrek: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSVxk3SR0pJC9qW6r_kysDnnbHgqqGvNfIGQU_yVp10PBzA_vxO",
    		theHangover: "https://m.media-amazon.com/images/M/MV5BMTU1MDA1MTYwMF5BMl5BanBnXkFtZTcwMDcxMzA1Mg@@._V1_.jpg",
    		matrix: "https://www.idg.se/editorial/0/path/1.759585!imageManager/3229336147.jpg"
    	};

    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const func = key => {
    		return imagesSrc[key];
    	};

    	const click_handler = () => {
    		// video_player_is_active = true;
    		set_store_value(isFullDescription, $isFullDescription = true, $isFullDescription);
    	};

    	const click_handler_1 = () => {
    		$$invalidate(0, video_player_is_active = true);
    	};

    	const click_handler_2 = () => {
    		$$invalidate(0, video_player_is_active = true);
    	};

    	const click_handler_3 = () => {
    		$$invalidate(0, video_player_is_active = false);
    	};

    	const click_handler_4 = () => {
    		$$invalidate(1, is_fullscreen = !is_fullscreen);

    		// do not focus the fullscreenbutton if clicked
    		// this is because otherwise clicking space will cause
    		// the video player to maximize/minimize instead of pause/play
    		// when space is clicked
    		if (document.activeElement != document.body) document.activeElement.blur();
    	};

    	const click_handler_5 = () => {
    		// do not focus the fullscreenbutton if clicked
    		// this is because otherwise clicking space will cause
    		// the video player to maximize/minimize instead of pause/play
    		// when space is clicked
    		if (document.activeElement != document.body) document.activeElement.blur();

    		let div = document.getElementById("vid");
    		if (div.requestFullscreen) div.requestFullscreen(); else if (div.webkitRequestFullscreen) div.webkitRequestFullscreen(); else if (div.msRequestFullScreen) div.msRequestFullScreen();
    	};

    	const click_handler_7 = () => {
    		$$invalidate(0, video_player_is_active = false);
    	};

    	$$self.$capture_state = () => ({
    		Button,
    		Overlay,
    		Player,
    		colors,
    		VideoDescription,
    		isFullDescription,
    		video_player_is_active,
    		is_fullscreen,
    		imagesSrc,
    		$isFullDescription
    	});

    	$$self.$inject_state = $$props => {
    		if ('video_player_is_active' in $$props) $$invalidate(0, video_player_is_active = $$props.video_player_is_active);
    		if ('is_fullscreen' in $$props) $$invalidate(1, is_fullscreen = $$props.is_fullscreen);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		video_player_is_active,
    		is_fullscreen,
    		$isFullDescription,
    		imagesSrc,
    		func,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4,
    		click_handler_5,
    		click_handler_7
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
