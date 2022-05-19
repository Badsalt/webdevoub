
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
    function is_promise(value) {
        return value && typeof value === 'object' && typeof value.then === 'function';
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
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn);
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }
    const has_prop = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

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
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
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
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
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

    let promise$1;
    function wait() {
        if (!promise$1) {
            promise$1 = Promise.resolve();
            promise$1.then(() => {
                promise$1 = null;
            });
        }
        return promise$1;
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
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = (program.b - t);
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    function handle_promise(promise, info) {
        const token = info.token = {};
        function update(type, index, key, value) {
            if (info.token !== token)
                return;
            info.resolved = value;
            let child_ctx = info.ctx;
            if (key !== undefined) {
                child_ctx = child_ctx.slice();
                child_ctx[key] = value;
            }
            const block = type && (info.current = type)(child_ctx);
            let needs_flush = false;
            if (info.block) {
                if (info.blocks) {
                    info.blocks.forEach((block, i) => {
                        if (i !== index && block) {
                            group_outros();
                            transition_out(block, 1, 1, () => {
                                if (info.blocks[i] === block) {
                                    info.blocks[i] = null;
                                }
                            });
                            check_outros();
                        }
                    });
                }
                else {
                    info.block.d(1);
                }
                block.c();
                transition_in(block, 1);
                block.m(info.mount(), info.anchor);
                needs_flush = true;
            }
            info.block = block;
            if (info.blocks)
                info.blocks[index] = block;
            if (needs_flush) {
                flush();
            }
        }
        if (is_promise(promise)) {
            const current_component = get_current_component();
            promise.then(value => {
                set_current_component(current_component);
                update(info.then, 1, info.value, value);
                set_current_component(null);
            }, error => {
                set_current_component(current_component);
                update(info.catch, 2, info.error, error);
                set_current_component(null);
                if (!info.hasCatch) {
                    throw error;
                }
            });
            // if we previously had a then/catch block, destroy it
            if (info.current !== info.pending) {
                update(info.pending, 0);
                return true;
            }
        }
        else {
            if (info.current !== info.then) {
                update(info.then, 1, info.value, promise);
                return true;
            }
            info.resolved = promise;
        }
    }
    function update_await_block_branch(info, ctx, dirty) {
        const child_ctx = ctx.slice();
        const { resolved } = info;
        if (info.current === info.then) {
            child_ctx[info.value] = resolved;
        }
        if (info.current === info.catch) {
            child_ctx[info.error] = resolved;
        }
        info.block.p(child_ctx, dirty);
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
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

    /* src\Spinner.svelte generated by Svelte v3.44.1 */

    const file$4 = "src\\Spinner.svelte";

    function create_fragment$4(ctx) {
    	let div8;
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div2;
    	let t2;
    	let div3;
    	let t3;
    	let div4;
    	let t4;
    	let div5;
    	let t5;
    	let div6;
    	let t6;
    	let div7;

    	const block = {
    		c: function create() {
    			div8 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			t1 = space();
    			div2 = element("div");
    			t2 = space();
    			div3 = element("div");
    			t3 = space();
    			div4 = element("div");
    			t4 = space();
    			div5 = element("div");
    			t5 = space();
    			div6 = element("div");
    			t6 = space();
    			div7 = element("div");
    			attr_dev(div0, "class", "svelte-iwqve4");
    			add_location(div0, file$4, 3, 4, 67);
    			attr_dev(div1, "class", "svelte-iwqve4");
    			add_location(div1, file$4, 4, 4, 80);
    			attr_dev(div2, "class", "svelte-iwqve4");
    			add_location(div2, file$4, 5, 4, 93);
    			attr_dev(div3, "class", "svelte-iwqve4");
    			add_location(div3, file$4, 6, 4, 106);
    			attr_dev(div4, "class", "svelte-iwqve4");
    			add_location(div4, file$4, 7, 4, 119);
    			attr_dev(div5, "class", "svelte-iwqve4");
    			add_location(div5, file$4, 8, 4, 132);
    			attr_dev(div6, "class", "svelte-iwqve4");
    			add_location(div6, file$4, 9, 4, 145);
    			attr_dev(div7, "class", "svelte-iwqve4");
    			add_location(div7, file$4, 10, 4, 158);
    			attr_dev(div8, "class", "lds-roller svelte-iwqve4");
    			add_location(div8, file$4, 2, 0, 37);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div8, anchor);
    			append_dev(div8, div0);
    			append_dev(div8, t0);
    			append_dev(div8, div1);
    			append_dev(div8, t1);
    			append_dev(div8, div2);
    			append_dev(div8, t2);
    			append_dev(div8, div3);
    			append_dev(div8, t3);
    			append_dev(div8, div4);
    			append_dev(div8, t4);
    			append_dev(div8, div5);
    			append_dev(div8, t5);
    			append_dev(div8, div6);
    			append_dev(div8, t6);
    			append_dev(div8, div7);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div8);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Spinner', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Spinner> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Spinner extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Spinner",
    			options,
    			id: create_fragment$4.name
    		});
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

    const promise = writable();
    const IsHomePage = writable();
    const maxItemsPerPage = writable();

    function cubicInOut(t) {
        return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
    }
    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }
    function slide(node, { delay = 0, duration = 400, easing = cubicOut } = {}) {
        const style = getComputedStyle(node);
        const opacity = +style.opacity;
        const height = parseFloat(style.height);
        const padding_top = parseFloat(style.paddingTop);
        const padding_bottom = parseFloat(style.paddingBottom);
        const margin_top = parseFloat(style.marginTop);
        const margin_bottom = parseFloat(style.marginBottom);
        const border_top_width = parseFloat(style.borderTopWidth);
        const border_bottom_width = parseFloat(style.borderBottomWidth);
        return {
            delay,
            duration,
            easing,
            css: t => 'overflow: hidden;' +
                `opacity: ${Math.min(t * 20, 1) * opacity};` +
                `height: ${t * height}px;` +
                `padding-top: ${t * padding_top}px;` +
                `padding-bottom: ${t * padding_bottom}px;` +
                `margin-top: ${t * margin_top}px;` +
                `margin-bottom: ${t * margin_bottom}px;` +
                `border-top-width: ${t * border_top_width}px;` +
                `border-bottom-width: ${t * border_bottom_width}px;`
        };
    }
    function draw(node, { delay = 0, speed, duration, easing = cubicInOut } = {}) {
        let len = node.getTotalLength();
        const style = getComputedStyle(node);
        if (style.strokeLinecap !== 'butt') {
            len += parseInt(style.strokeWidth);
        }
        if (duration === undefined) {
            if (speed === undefined) {
                duration = 800;
            }
            else {
                duration = len / speed;
            }
        }
        else if (typeof duration === 'function') {
            duration = duration(len);
        }
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `stroke-dasharray: ${t * len} ${u * len}`
        };
    }

    /* src\Results.svelte generated by Svelte v3.44.1 */

    const { console: console_1 } = globals;
    const file$3 = "src\\Results.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	child_ctx[10] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[11] = list[i];
    	child_ctx[13] = i;
    	return child_ctx;
    }

    // (137:35) 
    function create_if_block_7(ctx) {
    	let show_if;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_8, create_if_block_9];
    	const if_blocks = [];

    	function select_block_type_3(ctx, dirty) {
    		if (show_if == null || dirty & /*json*/ 1) show_if = !!/*json*/ ctx[0].hasOwnProperty("error");
    		if (show_if) return 0;
    		if (!/*$IsHomePage*/ ctx[4]) return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type_3(ctx, -1))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_3(ctx, dirty);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				} else {
    					if_block = null;
    				}
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
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(137:35) ",
    		ctx
    	});

    	return block;
    }

    // (73:4) {#if json && "data" in json && "items" in json.data && json.data.items.length > 0 && !$IsHomePage}
    function create_if_block$2(ctx) {
    	let div0;
    	let t0;
    	let t1_value = /*json*/ ctx[0].data.items.length + "";
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let div2;
    	let t5;
    	let div1;
    	let ul;
    	let each_value_1 = /*json*/ ctx[0].data.items;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let if_block = /*pages*/ ctx[1] >= 1 && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text("Results Found: ");
    			t1 = text(t1_value);
    			t2 = text(" Page: ");
    			t3 = text(/*currentPage*/ ctx[2]);
    			t4 = space();
    			div2 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t5 = space();
    			div1 = element("div");
    			ul = element("ul");
    			if (if_block) if_block.c();
    			set_style(div0, "color", "white");
    			set_style(div0, "font-size", "1.5em");
    			attr_dev(div0, "class", "svelte-1aepu0r");
    			add_location(div0, file$3, 73, 8, 2206);
    			attr_dev(ul, "class", "pageNavigation svelte-1aepu0r");
    			add_location(ul, file$3, 119, 16, 4608);
    			attr_dev(div1, "class", "pageNavigationContainer svelte-1aepu0r");
    			add_location(div1, file$3, 118, 12, 4553);
    			attr_dev(div2, "id", "scroll");
    			attr_dev(div2, "class", "column svelte-1aepu0r");
    			add_location(div2, file$3, 76, 8, 2350);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			append_dev(div0, t1);
    			append_dev(div0, t2);
    			append_dev(div0, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div2, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}

    			append_dev(div2, t5);
    			append_dev(div2, div1);
    			append_dev(div1, ul);
    			if (if_block) if_block.m(ul, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*json*/ 1 && t1_value !== (t1_value = /*json*/ ctx[0].data.items.length + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*currentPage*/ 4) set_data_dev(t3, /*currentPage*/ ctx[2]);

    			if (dirty & /*processDate, json, processUrl, item_per_page, currentPage*/ 37) {
    				each_value_1 = /*json*/ ctx[0].data.items;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div2, t5);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			if (/*pages*/ ctx[1] >= 1) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					if_block.m(ul, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(73:4) {#if json && \\\"data\\\" in json && \\\"items\\\" in json.data && json.data.items.length > 0 && !$IsHomePage}",
    		ctx
    	});

    	return block;
    }

    // (144:31) 
    function create_if_block_9(ctx) {
    	let div;
    	let p;
    	let t0;
    	let a;
    	let t2;
    	let p_transition;
    	let current;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			t0 = text("No Results Found. You might like ");
    			a = element("a");
    			a.textContent = "this";
    			t2 = text(" instead");
    			set_style(a, "color", "blue");
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "href", "https://youtu.be/dQw4w9WgXcQ");
    			attr_dev(a, "class", "svelte-1aepu0r");
    			add_location(a, file$3, 146, 53, 5744);
    			set_style(p, "color", "red");
    			set_style(p, "font-size", "3em");
    			attr_dev(p, "class", "svelte-1aepu0r");
    			add_location(p, file$3, 145, 16, 5635);
    			attr_dev(div, "class", "searchResultsContainer svelte-1aepu0r");
    			add_location(div, file$3, 144, 12, 5581);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(p, t0);
    			append_dev(p, a);
    			append_dev(p, t2);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!p_transition) p_transition = create_bidirectional_transition(p, fade, {}, true);
    				p_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!p_transition) p_transition = create_bidirectional_transition(p, fade, {}, false);
    			p_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching && p_transition) p_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(144:31) ",
    		ctx
    	});

    	return block;
    }

    // (138:8) {#if json.hasOwnProperty("error")}
    function create_if_block_8(ctx) {
    	let div;
    	let p;
    	let t_value = /*json*/ ctx[0].error + "";
    	let t;
    	let p_transition;
    	let current;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			t = text(t_value);
    			set_style(p, "color", "red");
    			set_style(p, "font-size", "2.5em");
    			attr_dev(p, "class", "svelte-1aepu0r");
    			add_location(p, file$3, 139, 16, 5402);
    			attr_dev(div, "class", "searchResultsContainer svelte-1aepu0r");
    			add_location(div, file$3, 138, 12, 5348);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(p, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*json*/ 1) && t_value !== (t_value = /*json*/ ctx[0].error + "")) set_data_dev(t, t_value);
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!p_transition) p_transition = create_bidirectional_transition(p, fade, {}, true);
    				p_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!p_transition) p_transition = create_bidirectional_transition(p, fade, {}, false);
    			p_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching && p_transition) p_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(138:8) {#if json.hasOwnProperty(\\\"error\\\")}",
    		ctx
    	});

    	return block;
    }

    // (79:16) {#if index < item_per_page * currentPage && index >= item_per_page * (currentPage - 1)}
    function create_if_block_2(ctx) {
    	let div2;
    	let div1;
    	let h2;
    	let t0_value = processUrl(/*item*/ ctx[11].url) + "";
    	let t0;
    	let t1;
    	let div0;
    	let a;
    	let t2_value = /*item*/ ctx[11].name + "";
    	let t2;
    	let a_href_value;
    	let t3;
    	let t4;
    	let t5;
    	let h6;
    	let t6;
    	let t7_value = processDate(/*item*/ ctx[11].published_at) + "";
    	let t7;
    	let div2_intro;

    	function select_block_type_1(ctx, dirty) {
    		if (/*item*/ ctx[11].type == "file") return create_if_block_4;
    		if (/*item*/ ctx[11].type == "dataset") return create_if_block_5;
    		if (/*item*/ ctx[11].type = "dataverse") return create_if_block_6;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block0 = current_block_type && current_block_type(ctx);

    	function select_block_type_2(ctx, dirty) {
    		if (/*item*/ ctx[11].description) return create_if_block_3;
    		return create_else_block$1;
    	}

    	let current_block_type_1 = select_block_type_2(ctx);
    	let if_block1 = current_block_type_1(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			h2 = element("h2");
    			t0 = text(t0_value);
    			t1 = space();
    			div0 = element("div");
    			a = element("a");
    			t2 = text(t2_value);
    			t3 = space();
    			if (if_block0) if_block0.c();
    			t4 = space();
    			if_block1.c();
    			t5 = space();
    			h6 = element("h6");
    			t6 = text("Published: ");
    			t7 = text(t7_value);
    			attr_dev(h2, "class", "title svelte-1aepu0r");
    			add_location(h2, file$3, 84, 28, 2787);
    			attr_dev(a, "class", "link svelte-1aepu0r");
    			attr_dev(a, "href", a_href_value = /*item*/ ctx[11].url);
    			add_location(a, file$3, 86, 32, 2901);
    			attr_dev(div0, "class", "svelte-1aepu0r");
    			add_location(div0, file$3, 85, 28, 2862);
    			attr_dev(h6, "class", "date svelte-1aepu0r");
    			add_location(h6, file$3, 109, 28, 4215);
    			attr_dev(div1, "class", "searchResults svelte-1aepu0r");
    			add_location(div1, file$3, 83, 24, 2730);
    			attr_dev(div2, "class", "searchResultsContainer svelte-1aepu0r");
    			add_location(div2, file$3, 79, 20, 2561);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, h2);
    			append_dev(h2, t0);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, a);
    			append_dev(a, t2);
    			append_dev(div0, t3);
    			if (if_block0) if_block0.m(div0, null);
    			append_dev(div1, t4);
    			if_block1.m(div1, null);
    			append_dev(div1, t5);
    			append_dev(div1, h6);
    			append_dev(h6, t6);
    			append_dev(h6, t7);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*json*/ 1 && t0_value !== (t0_value = processUrl(/*item*/ ctx[11].url) + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*json*/ 1 && t2_value !== (t2_value = /*item*/ ctx[11].name + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*json*/ 1 && a_href_value !== (a_href_value = /*item*/ ctx[11].url)) {
    				attr_dev(a, "href", a_href_value);
    			}

    			if (current_block_type !== (current_block_type = select_block_type_1(ctx))) {
    				if (if_block0) if_block0.d(1);
    				if_block0 = current_block_type && current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(div0, null);
    				}
    			}

    			if (current_block_type_1 === (current_block_type_1 = select_block_type_2(ctx)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type_1(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(div1, t5);
    				}
    			}

    			if (dirty & /*json*/ 1 && t7_value !== (t7_value = processDate(/*item*/ ctx[11].published_at) + "")) set_data_dev(t7, t7_value);
    		},
    		i: function intro(local) {
    			if (!div2_intro) {
    				add_render_callback(() => {
    					div2_intro = create_in_transition(div2, fly, { y: 100, duration: 500 });
    					div2_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);

    			if (if_block0) {
    				if_block0.d();
    			}

    			if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(79:16) {#if index < item_per_page * currentPage && index >= item_per_page * (currentPage - 1)}",
    		ctx
    	});

    	return block;
    }

    // (92:68) 
    function create_if_block_6(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", "fa fa-server svelte-1aepu0r");
    			add_location(span, file$3, 92, 36, 3321);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(92:68) ",
    		ctx
    	});

    	return block;
    }

    // (90:65) 
    function create_if_block_5(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", "fa fa-database svelte-1aepu0r");
    			add_location(span, file$3, 90, 36, 3182);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(90:65) ",
    		ctx
    	});

    	return block;
    }

    // (88:32) {#if item.type == "file"}
    function create_if_block_4(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text("§");
    			attr_dev(span, "class", "fa fa-download svelte-1aepu0r");
    			add_location(span, file$3, 88, 36, 3045);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(88:32) {#if item.type == \\\"file\\\"}",
    		ctx
    	});

    	return block;
    }

    // (105:28) {:else}
    function create_else_block$1(ctx) {
    	let h5;

    	const block = {
    		c: function create() {
    			h5 = element("h5");
    			h5.textContent = "No description is available.";
    			attr_dev(h5, "class", "description svelte-1aepu0r");
    			add_location(h5, file$3, 105, 32, 4021);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h5, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(105:28) {:else}",
    		ctx
    	});

    	return block;
    }

    // (96:28) {#if item.description}
    function create_if_block_3(ctx) {
    	let h5;

    	let t_value = (/*item*/ ctx[11].description.length > 250
    	? /*item*/ ctx[11].description.substring(0, 250 - 3) + "..."
    	: /*item*/ ctx[11].description.substring(0, 250)) + "";

    	let t;

    	const block = {
    		c: function create() {
    			h5 = element("h5");
    			t = text(t_value);
    			attr_dev(h5, "class", "description svelte-1aepu0r");
    			add_location(h5, file$3, 96, 32, 3511);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h5, anchor);
    			append_dev(h5, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*json*/ 1 && t_value !== (t_value = (/*item*/ ctx[11].description.length > 250
    			? /*item*/ ctx[11].description.substring(0, 250 - 3) + "..."
    			: /*item*/ ctx[11].description.substring(0, 250)) + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(96:28) {#if item.description}",
    		ctx
    	});

    	return block;
    }

    // (78:12) {#each json.data.items as item, index}
    function create_each_block_1(ctx) {
    	let if_block_anchor;
    	let if_block = /*index*/ ctx[13] < /*item_per_page*/ ctx[5] * /*currentPage*/ ctx[2] && /*index*/ ctx[13] >= /*item_per_page*/ ctx[5] * (/*currentPage*/ ctx[2] - 1) && create_if_block_2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*index*/ ctx[13] < /*item_per_page*/ ctx[5] * /*currentPage*/ ctx[2] && /*index*/ ctx[13] >= /*item_per_page*/ ctx[5] * (/*currentPage*/ ctx[2] - 1)) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*currentPage*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			transition_in(if_block);
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(78:12) {#each json.data.items as item, index}",
    		ctx
    	});

    	return block;
    }

    // (121:20) {#if pages >= 1}
    function create_if_block_1(ctx) {
    	let each_1_anchor;
    	let each_value = Array(/*pages*/ ctx[1]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*currentPage, scrollToTop, pages*/ 6) {
    				each_value = Array(/*pages*/ ctx[1]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(121:20) {#if pages >= 1}",
    		ctx
    	});

    	return block;
    }

    // (122:24) {#each Array(pages) as _, i}
    function create_each_block(ctx) {
    	let li;
    	let t0_value = /*i*/ ctx[10] + 1 + "";
    	let t0;
    	let t1;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[7](/*i*/ ctx[10]);
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(li, "class", "svelte-1aepu0r");
    			toggle_class(li, "clicked", /*currentPage*/ ctx[2] == /*i*/ ctx[10] + 1);
    			add_location(li, file$3, 122, 28, 4757);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t0);
    			append_dev(li, t1);

    			if (!mounted) {
    				dispose = listen_dev(li, "click", click_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*currentPage*/ 4) {
    				toggle_class(li, "clicked", /*currentPage*/ ctx[2] == /*i*/ ctx[10] + 1);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(122:24) {#each Array(pages) as _, i}",
    		ctx
    	});

    	return block;
    }

    // (71:0) {#key $maxItemsPerPage}
    function create_key_block(ctx) {
    	let t0_value = /*calculatePages*/ ctx[6](/*$maxItemsPerPage*/ ctx[3]) + "";
    	let t0;
    	let t1;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$2, create_if_block_7];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*json*/ ctx[0] && "data" in /*json*/ ctx[0] && "items" in /*json*/ ctx[0].data && /*json*/ ctx[0].data.items.length > 0 && !/*$IsHomePage*/ ctx[4]) return 0;
    		if (/*json*/ ctx[0] && !/*$IsHomePage*/ ctx[4]) return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			t0 = text(t0_value);
    			t1 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*$maxItemsPerPage*/ 8) && t0_value !== (t0_value = /*calculatePages*/ ctx[6](/*$maxItemsPerPage*/ ctx[3]) + "")) set_data_dev(t0, t0_value);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				} else {
    					if_block = null;
    				}
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
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_key_block.name,
    		type: "key",
    		source: "(71:0) {#key $maxItemsPerPage}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let previous_key = /*$maxItemsPerPage*/ ctx[3];
    	let key_block_anchor;
    	let current;
    	let key_block = create_key_block(ctx);

    	const block = {
    		c: function create() {
    			key_block.c();
    			key_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			key_block.m(target, anchor);
    			insert_dev(target, key_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$maxItemsPerPage*/ 8 && safe_not_equal(previous_key, previous_key = /*$maxItemsPerPage*/ ctx[3])) {
    				group_outros();
    				transition_out(key_block, 1, 1, noop);
    				check_outros();
    				key_block = create_key_block(ctx);
    				key_block.c();
    				transition_in(key_block);
    				key_block.m(key_block_anchor.parentNode, key_block_anchor);
    			} else {
    				key_block.p(ctx, dirty);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(key_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(key_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(key_block_anchor);
    			key_block.d(detaching);
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

    function processUrl(url) {
    	let parts = url.split("/");
    	let output = "";

    	parts.forEach((element, index) => {
    		if (index == 0) {
    			output += element + "//";
    		} else if (index == 1) {
    			output += "";
    		} else if (index + 1 == parts.length) {
    			output += element;
    		} else {
    			output += element + " " + ">" + " ";
    		}
    	});

    	return output;
    }

    function processDate(date) {
    	let split = date.split("T");
    	let output = "";

    	split.forEach((element, index) => {
    		if (index == 0) {
    			output = element;
    		}
    	});

    	return output;
    }

    function scrollToTop(i) {
    	let element = document.getElementById("scroll");
    	element.scroll({ top: 0, behavior: "smooth" });
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $maxItemsPerPage;
    	let $IsHomePage;
    	validate_store(maxItemsPerPage, 'maxItemsPerPage');
    	component_subscribe($$self, maxItemsPerPage, $$value => $$invalidate(3, $maxItemsPerPage = $$value));
    	validate_store(IsHomePage, 'IsHomePage');
    	component_subscribe($$self, IsHomePage, $$value => $$invalidate(4, $IsHomePage = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Results', slots, []);
    	let { json } = $$props;
    	let pages;
    	let currentPage = 1;

    	$maxItemsPerPage
    	? $maxItemsPerPage
    	: set_store_value(maxItemsPerPage, $maxItemsPerPage = 15, $maxItemsPerPage);

    	$maxItemsPerPage < 5
    	? set_store_value(maxItemsPerPage, $maxItemsPerPage = 5, $maxItemsPerPage)
    	: $maxItemsPerPage;

    	let item_per_page = $maxItemsPerPage;

    	function calculatePages(item_per_page) {
    		if (json && "data" in json && "items" in json.data && json.data.items.length > 0) {
    			let jsonLength = json.data.items.length;
    			item_per_page ? item_per_page : item_per_page = 15;
    			item_per_page < 5 ? item_per_page = 5 : item_per_page;
    			console.log(item_per_page);
    			$$invalidate(1, pages = Math.ceil(jsonLength / item_per_page));
    		}

    		return "";
    	}

    	const writable_props = ['json'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Results> was created with unknown prop '${key}'`);
    	});

    	const click_handler = i => {
    		scrollToTop();
    		$$invalidate(2, currentPage = i + 1);
    	};

    	$$self.$$set = $$props => {
    		if ('json' in $$props) $$invalidate(0, json = $$props.json);
    	};

    	$$self.$capture_state = () => ({
    		json,
    		has_prop,
    		null_to_empty,
    		update_slot,
    		IsHomePage,
    		maxItemsPerPage,
    		fly,
    		fade,
    		slide,
    		draw,
    		App,
    		pages,
    		currentPage,
    		item_per_page,
    		calculatePages,
    		processUrl,
    		processDate,
    		scrollToTop,
    		$maxItemsPerPage,
    		$IsHomePage
    	});

    	$$self.$inject_state = $$props => {
    		if ('json' in $$props) $$invalidate(0, json = $$props.json);
    		if ('pages' in $$props) $$invalidate(1, pages = $$props.pages);
    		if ('currentPage' in $$props) $$invalidate(2, currentPage = $$props.currentPage);
    		if ('item_per_page' in $$props) $$invalidate(5, item_per_page = $$props.item_per_page);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		json,
    		pages,
    		currentPage,
    		$maxItemsPerPage,
    		$IsHomePage,
    		item_per_page,
    		calculatePages,
    		click_handler
    	];
    }

    class Results extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { json: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Results",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*json*/ ctx[0] === undefined && !('json' in props)) {
    			console_1.warn("<Results> was created without expected prop 'json'");
    		}
    	}

    	get json() {
    		throw new Error("<Results>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set json(value) {
    		throw new Error("<Results>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Search.svelte generated by Svelte v3.44.1 */

    const { Error: Error_1 } = globals;
    const file$2 = "src\\Search.svelte";

    // (66:0) {:else}
    function create_else_block(ctx) {
    	let div2;
    	let h1;
    	let t1;
    	let div1;
    	let div0;
    	let img;
    	let img_src_value;
    	let t2;
    	let form;
    	let input;
    	let t3;
    	let span0;
    	let t4;
    	let span1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			h1 = element("h1");
    			h1.textContent = "CLOUD SEARCH";
    			t1 = space();
    			div1 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t2 = space();
    			form = element("form");
    			input = element("input");
    			t3 = space();
    			span0 = element("span");
    			t4 = space();
    			span1 = element("span");
    			attr_dev(h1, "class", "svelte-wxstor");
    			add_location(h1, file$2, 67, 8, 2117);
    			set_style(img, "height", "100%");
    			if (!src_url_equal(img.src, img_src_value = "./pic/cloud-black.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Go to Home Page");
    			attr_dev(img, "title", "Go to Home Page");
    			attr_dev(img, "class", "svelte-wxstor");
    			add_location(img, file$2, 70, 16, 2263);
    			attr_dev(div0, "class", "icon svelte-wxstor");
    			add_location(div0, file$2, 69, 12, 2189);
    			attr_dev(input, "class", "svelte-wxstor");
    			add_location(input, file$2, 82, 16, 2651);
    			attr_dev(span0, "class", "fa fa-search fa-2x searchIcon svelte-wxstor");
    			add_location(span0, file$2, 83, 16, 2700);
    			attr_dev(span1, "class", "fa fa-gear fa-3x settingsIcon svelte-wxstor");
    			add_location(span1, file$2, 84, 16, 2764);
    			attr_dev(form, "class", "svelte-wxstor");
    			add_location(form, file$2, 77, 12, 2500);
    			attr_dev(div1, "class", "flexContainer svelte-wxstor");
    			add_location(div1, file$2, 68, 8, 2148);
    			attr_dev(div2, "class", "header-search svelte-wxstor");
    			add_location(div2, file$2, 66, 4, 2080);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, h1);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, img);
    			append_dev(div1, t2);
    			append_dev(div1, form);
    			append_dev(form, input);
    			set_input_value(input, /*question*/ ctx[0]);
    			append_dev(form, t3);
    			append_dev(form, span0);
    			append_dev(form, t4);
    			append_dev(form, span1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "click", /*click_handler_2*/ ctx[11], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_2*/ ctx[12]),
    					listen_dev(span1, "click", /*click_handler_3*/ ctx[13], false, false, false),
    					listen_dev(form, "submit", prevent_default(/*submit_handler_1*/ ctx[14]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*question*/ 1 && input.value !== /*question*/ ctx[0]) {
    				set_input_value(input, /*question*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(66:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (49:0) {#if $IsHomePage}
    function create_if_block$1(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let form;
    	let input;
    	let t2;
    	let span0;
    	let t3;
    	let span1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "CLOUD SEARCH";
    			t1 = space();
    			form = element("form");
    			input = element("input");
    			t2 = space();
    			span0 = element("span");
    			t3 = space();
    			span1 = element("span");
    			attr_dev(h1, "class", "svelte-wxstor");
    			add_location(h1, file$2, 50, 8, 1597);
    			attr_dev(input, "class", "svelte-wxstor");
    			add_location(input, file$2, 57, 12, 1797);
    			attr_dev(span0, "class", "fa fa-search fa-2x searchIcon svelte-wxstor");
    			add_location(span0, file$2, 58, 12, 1842);
    			attr_dev(span1, "class", "fa fa-gear fa-3x settingsIcon svelte-wxstor");
    			add_location(span1, file$2, 59, 12, 1902);
    			attr_dev(form, "class", "svelte-wxstor");
    			add_location(form, file$2, 51, 8, 1628);
    			attr_dev(div, "class", "container svelte-wxstor");
    			add_location(div, file$2, 49, 4, 1564);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, form);
    			append_dev(form, input);
    			set_input_value(input, /*question*/ ctx[0]);
    			append_dev(form, t2);
    			append_dev(form, span0);
    			append_dev(form, t3);
    			append_dev(form, span1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler_1*/ ctx[8]),
    					listen_dev(span1, "click", /*click_handler_1*/ ctx[9], false, false, false),
    					listen_dev(form, "submit", prevent_default(/*submit_handler*/ ctx[10]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*question*/ 1 && input.value !== /*question*/ ctx[0]) {
    				set_input_value(input, /*question*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(49:0) {#if $IsHomePage}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let link;
    	let t0;
    	let div1;
    	let span;
    	let t1;
    	let div0;
    	let t2;
    	let hr;
    	let t3;
    	let input;
    	let t4;
    	let if_block_anchor;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*$IsHomePage*/ ctx[3]) return create_if_block$1;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			link = element("link");
    			t0 = space();
    			div1 = element("div");
    			span = element("span");
    			t1 = space();
    			div0 = element("div");
    			t2 = text("Set number of items per page\r\n        ");
    			hr = element("hr");
    			t3 = space();
    			input = element("input");
    			t4 = space();
    			if_block.c();
    			if_block_anchor = empty();
    			attr_dev(link, "rel", "stylesheet");
    			attr_dev(link, "href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
    			attr_dev(link, "class", "svelte-wxstor");
    			add_location(link, file$2, 31, 0, 965);
    			attr_dev(span, "class", "fa fa-times fa-4x svelte-wxstor");
    			set_style(span, "color", "red");
    			set_style(span, "position", "absolute");
    			set_style(span, "top", "1em");
    			set_style(span, "right", "1em");
    			add_location(span, file$2, 36, 4, 1164);
    			attr_dev(hr, "class", "svelte-wxstor");
    			add_location(hr, file$2, 43, 8, 1431);
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "5");
    			attr_dev(input, "max", "40");
    			attr_dev(input, "class", "svelte-wxstor");
    			add_location(input, file$2, 44, 8, 1447);
    			set_style(div0, "color", "white");
    			set_style(div0, "font-size", "3em");
    			attr_dev(div0, "class", "svelte-wxstor");
    			add_location(div0, file$2, 41, 4, 1340);
    			attr_dev(div1, "class", "settingsContainer svelte-wxstor");
    			toggle_class(div1, "invisible", !/*settingsActive*/ ctx[1]);
    			add_location(div1, file$2, 35, 0, 1093);
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, link, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, span);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, t2);
    			append_dev(div0, hr);
    			append_dev(div0, t3);
    			append_dev(div0, input);
    			set_input_value(input, /*$maxItemsPerPage*/ ctx[2]);
    			insert_dev(target, t4, anchor);
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(span, "click", /*click_handler*/ ctx[6], false, false, false),
    					listen_dev(input, "input", /*input_input_handler*/ ctx[7])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$maxItemsPerPage*/ 4 && to_number(input.value) !== /*$maxItemsPerPage*/ ctx[2]) {
    				set_input_value(input, /*$maxItemsPerPage*/ ctx[2]);
    			}

    			if (dirty & /*settingsActive*/ 2) {
    				toggle_class(div1, "invisible", !/*settingsActive*/ ctx[1]);
    			}

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(link);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t4);
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
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

    function instance$2($$self, $$props, $$invalidate) {
    	let $maxItemsPerPage;
    	let $IsHomePage;
    	let $promise;
    	validate_store(maxItemsPerPage, 'maxItemsPerPage');
    	component_subscribe($$self, maxItemsPerPage, $$value => $$invalidate(2, $maxItemsPerPage = $$value));
    	validate_store(IsHomePage, 'IsHomePage');
    	component_subscribe($$self, IsHomePage, $$value => $$invalidate(3, $IsHomePage = $$value));
    	validate_store(promise, 'promise');
    	component_subscribe($$self, promise, $$value => $$invalidate(4, $promise = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Search', slots, []);
    	let question;
    	let settingsActive;
    	set_store_value(IsHomePage, $IsHomePage = true, $IsHomePage);
    	set_store_value(maxItemsPerPage, $maxItemsPerPage = 15, $maxItemsPerPage);

    	async function search() {
    		try {
    			const res = await fetch(`https://demo.dataverse.org/api/search?q=` + question + "&per_page=100");
    			const json = await res.json();

    			// delay to show spinner. is this a good idea lol ?
    			await new Promise(resolve => setTimeout(resolve, 1000));

    			if (res.ok) {
    				return json;
    			} else {
    				throw new Error(json);
    			}
    		} catch {
    			return {
    				error: "Search failed, please check your internet connection."
    			};
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Search> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(1, settingsActive = false);

    	function input_input_handler() {
    		$maxItemsPerPage = to_number(this.value);
    		maxItemsPerPage.set($maxItemsPerPage);
    	}

    	function input_input_handler_1() {
    		question = this.value;
    		$$invalidate(0, question);
    	}

    	const click_handler_1 = () => $$invalidate(1, settingsActive = true);

    	const submit_handler = () => {
    		set_store_value(promise, $promise = search(), $promise);
    		set_store_value(IsHomePage, $IsHomePage = false, $IsHomePage);
    	};

    	const click_handler_2 = () => set_store_value(IsHomePage, $IsHomePage = true, $IsHomePage);

    	function input_input_handler_2() {
    		question = this.value;
    		$$invalidate(0, question);
    	}

    	const click_handler_3 = () => $$invalidate(1, settingsActive = true);

    	const submit_handler_1 = () => {
    		set_store_value(promise, $promise = search(), $promise);
    	};

    	$$self.$capture_state = () => ({
    		promise,
    		IsHomePage,
    		maxItemsPerPage,
    		question,
    		settingsActive,
    		search,
    		$maxItemsPerPage,
    		$IsHomePage,
    		$promise
    	});

    	$$self.$inject_state = $$props => {
    		if ('question' in $$props) $$invalidate(0, question = $$props.question);
    		if ('settingsActive' in $$props) $$invalidate(1, settingsActive = $$props.settingsActive);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		question,
    		settingsActive,
    		$maxItemsPerPage,
    		$IsHomePage,
    		$promise,
    		search,
    		click_handler,
    		input_input_handler,
    		input_input_handler_1,
    		click_handler_1,
    		submit_handler,
    		click_handler_2,
    		input_input_handler_2,
    		click_handler_3,
    		submit_handler_1
    	];
    }

    class Search extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Search",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\Spinner_new.svelte generated by Svelte v3.44.1 */
    const file$1 = "src\\Spinner_new.svelte";

    // (29:8) {#if isActive}
    function create_if_block(ctx) {
    	let div;
    	let span0;
    	let span0_outro;
    	let t1;
    	let span1;
    	let span1_outro;
    	let t3;
    	let span2;
    	let span2_outro;
    	let t5;
    	let span3;
    	let span3_outro;
    	let t7;
    	let span4;
    	let span4_outro;
    	let current;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span0 = element("span");
    			span0.textContent = "?";
    			t1 = space();
    			span1 = element("span");
    			span1.textContent = "?";
    			t3 = space();
    			span2 = element("span");
    			span2.textContent = "?";
    			t5 = space();
    			span3 = element("span");
    			span3.textContent = "?";
    			t7 = space();
    			span4 = element("span");
    			span4.textContent = "?";
    			attr_dev(span0, "class", "questionMark svelte-1ip9us2");
    			set_style(span0, "transform", "rotate(40deg)");
    			add_location(span0, file$1, 30, 16, 708);
    			attr_dev(span1, "class", "questionMark svelte-1ip9us2");
    			set_style(span1, "transform", "rotate(30deg)");
    			add_location(span1, file$1, 35, 16, 902);
    			attr_dev(span2, "class", "questionMark svelte-1ip9us2");
    			add_location(span2, file$1, 40, 16, 1096);
    			attr_dev(span3, "class", "questionMark svelte-1ip9us2");
    			set_style(span3, "transform", "rotate(-30deg)");
    			add_location(span3, file$1, 41, 16, 1175);
    			attr_dev(span4, "class", "questionMark svelte-1ip9us2");
    			set_style(span4, "transform", "rotate(-40deg)");
    			add_location(span4, file$1, 46, 16, 1370);
    			attr_dev(div, "class", "flexcontainer svelte-1ip9us2");
    			add_location(div, file$1, 29, 12, 663);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span0);
    			append_dev(div, t1);
    			append_dev(div, span1);
    			append_dev(div, t3);
    			append_dev(div, span2);
    			append_dev(div, t5);
    			append_dev(div, span3);
    			append_dev(div, t7);
    			append_dev(div, span4);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (span0_outro) span0_outro.end(1);
    			if (span1_outro) span1_outro.end(1);
    			if (span2_outro) span2_outro.end(1);
    			if (span3_outro) span3_outro.end(1);
    			if (span4_outro) span4_outro.end(1);
    			current = true;
    		},
    		o: function outro(local) {
    			span0_outro = create_out_transition(span0, fly, {
    				y: /*y*/ ctx[2],
    				duration: /*duration*/ ctx[1]
    			});

    			span1_outro = create_out_transition(span1, fly, {
    				y: /*y*/ ctx[2],
    				duration: /*duration*/ ctx[1]
    			});

    			span2_outro = create_out_transition(span2, fly, {
    				y: /*y*/ ctx[2],
    				duration: /*duration*/ ctx[1]
    			});

    			span3_outro = create_out_transition(span3, fly, {
    				y: /*y*/ ctx[2],
    				duration: /*duration*/ ctx[1]
    			});

    			span4_outro = create_out_transition(span4, fly, {
    				y: /*y*/ ctx[2],
    				duration: /*duration*/ ctx[1]
    			});

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching && span0_outro) span0_outro.end();
    			if (detaching && span1_outro) span1_outro.end();
    			if (detaching && span2_outro) span2_outro.end();
    			if (detaching && span3_outro) span3_outro.end();
    			if (detaching && span4_outro) span4_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(29:8) {#if isActive}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let main;
    	let div;
    	let img;
    	let img_src_value;
    	let t;
    	let div_outro;
    	let current;
    	let if_block = /*isActive*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			div = element("div");
    			img = element("img");
    			t = space();
    			if (if_block) if_block.c();
    			attr_dev(img, "id", "image");
    			attr_dev(img, "width", "100%");
    			if (!src_url_equal(img.src, img_src_value = "./pic/cloud-black.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Cloud");
    			add_location(img, file$1, 27, 8, 554);
    			attr_dev(div, "class", "container svelte-1ip9us2");
    			add_location(div, file$1, 26, 4, 512);
    			attr_dev(main, "class", "svelte-1ip9us2");
    			add_location(main, file$1, 25, 0, 500);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			append_dev(div, img);
    			append_dev(div, t);
    			if (if_block) if_block.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*isActive*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*isActive*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, null);
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
    			if (div_outro) div_outro.end(1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			div_outro = create_out_transition(div, fade, {});
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if (if_block) if_block.d();
    			if (detaching && div_outro) div_outro.end();
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

    const amountOfQuestionMarks = 5;

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Spinner_new', slots, []);
    	let isActive = true;
    	let duration = 500;
    	let y = -125;

    	async function myLoop() {
    		setTimeout(
    			function () {
    				toggle();
    				myLoop();
    			},
    			500
    		);
    	}

    	function toggle() {
    		if (isActive) {
    			$$invalidate(0, isActive = false);
    		} else {
    			$$invalidate(0, isActive = true);
    		}
    	}

    	myLoop();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Spinner_new> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		fly,
    		fade,
    		slide,
    		draw,
    		amountOfQuestionMarks,
    		isActive,
    		duration,
    		y,
    		myLoop,
    		toggle
    	});

    	$$self.$inject_state = $$props => {
    		if ('isActive' in $$props) $$invalidate(0, isActive = $$props.isActive);
    		if ('duration' in $$props) $$invalidate(1, duration = $$props.duration);
    		if ('y' in $$props) $$invalidate(2, y = $$props.y);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [isActive, duration, y];
    }

    class Spinner_new extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Spinner_new",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.44.1 */
    const file = "src\\App.svelte";

    // (16:4) {:catch error}
    function create_catch_block(ctx) {
    	let p;
    	let t_value = /*error*/ ctx[2].message + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			set_style(p, "color", "red");
    			add_location(p, file, 16, 8, 407);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$promise*/ 1 && t_value !== (t_value = /*error*/ ctx[2].message + "")) set_data_dev(t, t_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block.name,
    		type: "catch",
    		source: "(16:4) {:catch error}",
    		ctx
    	});

    	return block;
    }

    // (14:4) {:then result}
    function create_then_block(ctx) {
    	let results;
    	let current;

    	results = new Results({
    			props: { json: /*result*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(results.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(results, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const results_changes = {};
    			if (dirty & /*$promise*/ 1) results_changes.json = /*result*/ ctx[1];
    			results.$set(results_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(results.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(results.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(results, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block.name,
    		type: "then",
    		source: "(14:4) {:then result}",
    		ctx
    	});

    	return block;
    }

    // (12:21)           <SpinnerNew />      {:then result}
    function create_pending_block(ctx) {
    	let spinnernew;
    	let current;
    	spinnernew = new Spinner_new({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(spinnernew.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(spinnernew, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(spinnernew.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(spinnernew.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(spinnernew, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block.name,
    		type: "pending",
    		source: "(12:21)           <SpinnerNew />      {:then result}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let search;
    	let t;
    	let promise_1;
    	let current;
    	search = new Search({ $$inline: true });

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: true,
    		pending: create_pending_block,
    		then: create_then_block,
    		catch: create_catch_block,
    		value: 1,
    		error: 2,
    		blocks: [,,,]
    	};

    	handle_promise(promise_1 = /*$promise*/ ctx[0], info);

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(search.$$.fragment);
    			t = space();
    			info.block.c();
    			attr_dev(main, "class", "svelte-r6ft2p");
    			add_location(main, file, 8, 0, 251);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(search, main, null);
    			append_dev(main, t);
    			info.block.m(main, info.anchor = null);
    			info.mount = () => main;
    			info.anchor = null;
    			current = true;
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			info.ctx = ctx;

    			if (dirty & /*$promise*/ 1 && promise_1 !== (promise_1 = /*$promise*/ ctx[0]) && handle_promise(promise_1, info)) ; else {
    				update_await_block_branch(info, ctx, dirty);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(search.$$.fragment, local);
    			transition_in(info.block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(search.$$.fragment, local);

    			for (let i = 0; i < 3; i += 1) {
    				const block = info.blocks[i];
    				transition_out(block);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(search);
    			info.block.d();
    			info.token = null;
    			info = null;
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

    function instance($$self, $$props, $$invalidate) {
    	let $promise;
    	validate_store(promise, 'promise');
    	component_subscribe($$self, promise, $$value => $$invalidate(0, $promise = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Spinner,
    		Results,
    		Search,
    		promise,
    		SpinnerNew: Spinner_new,
    		$promise
    	});

    	return [$promise];
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
