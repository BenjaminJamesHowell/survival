// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"2x4Ow":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "2e6adf49b0774684";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"mRajy":[function(require,module,exports) {
var _clientJs = require("./client.js");
var _worldJs = require("./world.js");
const elements = getElements([
    "#game",
    "#minimap",
    "#fps",
    "#tps",
    "#connect-button",
    "#connect",
    "#game-ui",
    "#ui",
    "#fullscreen-minimap-toggle",
    "#zoom-in-minimap",
    "#zoom-out-minimap",
    "#minimap-ui",
    "#pause-toggle",
    "#server-address",
    "#pause-ui",
    "#pause-resume",
    "#pause-exit",
    "#hours",
    "#minutes",
    "#alert-outer",
    "#alert-message",
    "#alert-type",
    "#alert-progress-inner",
    "#alert-progress-outer",
    "#team-colour",
    "#loading",
    "#cancel-loading"
]);
const canvas = getElement("#game");
const ctx = canvas.getContext("2d");
let tileSize = 16;
const cameraOffset = {
    x: innerWidth / 2,
    y: innerHeight / 2
};
let keys = new Map();
let isConnected = false;
let fps = 0;
let delta = 0;
let lastFrameStart = 0;
canvas.width = innerWidth;
canvas.height = innerHeight;
addEventListener("keydown", ({ code })=>{
    keys.set(code, true);
});
addEventListener("keyup", ({ code })=>{
    keys.set(code, false);
});
mainMenu();
getElement("#connect-button").addEventListener("click", connect);
function getElements(selectors) {
    const result = new Map();
    for (const selector of selectors){
        const element = document.querySelector(selector);
        if (element === null) throw new Error(`Could not find element: ${selector}`);
        result.set(selector, element);
    }
    return result;
}
function getElement(selector) {
    const element = elements.get(selector);
    if (element === undefined) throw new Error(`Could not find element: ${selector}`);
    return element;
}
function showElement(element) {
    element.classList.add("show");
    element.classList.remove("hide");
}
function hideElement(element) {
    element.classList.add("hide");
    element.classList.remove("show");
}
function mainMenu() {
    hideElement(getElement("#game-ui"));
    hideElement(getElement("#pause-ui"));
    hideElement(getElement("#loading"));
    showElement(getElement("#ui"));
    showElement(getElement("#connect"));
}
function loadingMenu() {
    hideElement(getElement("#game-ui"));
    hideElement(getElement("#pause-ui"));
    showElement(getElement("#ui"));
    showElement(getElement("#loading"));
    hideElement(getElement("#connect"));
}
function inGame() {
    hideElement(getElement("#ui"));
    hideElement(getElement("#connect"));
    hideElement(getElement("#loading"));
    showElement(getElement("#game-ui"));
    hideElement(getElement("#pause-ui"));
}
function connect() {
    if (isConnected) return;
    isConnected = true;
    loadingMenu();
    const colourBox = getElement("#team-colour");
    const colour = colourBox.value;
    const serverAddress = getElement("#server-address");
    const server = `ws://${serverAddress.value}`;
    const socket = new WebSocket(server);
    const config = {
        sendMessage: (msg)=>socket.send(msg),
        colour
    };
    const client = (0, _clientJs.createClient)(config);
    socket.addEventListener("error", ()=>{
        isConnected = false;
        displayAlert("error", "Connection Error");
        mainMenu();
        return;
    });
    socket.addEventListener("message", ({ data })=>{
        // TODO: JSON error handling
        const update = JSON.parse(data);
        (0, _clientJs.receiveUpdate)(client, update);
    });
    socket.addEventListener("open", ()=>{
        inGame();
        renderWorld(client);
        setInterval(()=>{
            (0, _clientJs.sendUpdate)(client, keys);
            if (keys.get("Equal")) tileSize++;
            if (keys.get("Minus")) tileSize--;
            if (tileSize > 70) tileSize = 70;
            if (tileSize < 10) tileSize = 10;
        }, 1000 / 60);
    });
}
function renderWorld(client) {
    const time = Date.now();
    delta = time - lastFrameStart;
    lastFrameStart = time;
    fps = 1000 / delta;
    const { camera, players } = client;
    const { tiles, bottomLeft } = client.world;
    ctx.globalAlpha = 1;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(let x = 0; x < tiles.length; x++){
        const col = tiles[x];
        for(let y = 0; y < col.length; y++){
            const type = col[y];
            const colour = (0, _worldJs.tileColours).get(type);
            if (colour === undefined) throw new Error("This tile does not exist");
            const light = (0, _clientJs.getTileLight)(client, {
                x: x + bottomLeft.x,
                y: y + bottomLeft.y
            });
            ctx.globalAlpha = light;
            const [r, g, b] = colour.map((channel)=>channel);
            const colourStr = `rgb(${r}, ${g}, ${b})`;
            drawRect((x + bottomLeft.x - camera.x) * tileSize + cameraOffset.x, (y + bottomLeft.y - camera.y) * tileSize + cameraOffset.y, tileSize, tileSize, colourStr);
        }
    }
    for (const player of players){
        const light = (0, _clientJs.getTileLight)(client, player.position);
        ctx.globalAlpha = 1;
        drawRect((player.position.x - camera.x) * tileSize + cameraOffset.x, (player.position.y - camera.y) * tileSize + cameraOffset.y, tileSize, tileSize, "black");
        ctx.globalAlpha = light;
        drawRect((player.position.x - camera.x) * tileSize + cameraOffset.x, (player.position.y - camera.y) * tileSize + cameraOffset.y, tileSize, tileSize, player.colour);
    }
    getElement("#fps").innerText = `${Math.round(fps)}`.padStart(3, " ");
    getElement("#tps").innerText = `${Math.round(client.tps)}`.padStart(3, " ");
    getElement("#hours").innerText = `${client.time.hours}`.padStart(2, "0");
    getElement("#minutes").innerText = `${client.time.minutes}`.padStart(2, "0");
    requestAnimationFrame(()=>renderWorld(client));
}
function drawRect(x, y, w, h, c) {
    if (x + w < 0 || x > innerWidth || y + h < 0 || y > innerHeight) return;
    ctx.fillStyle = c;
    ctx.fillRect(Math.round(x), canvas.height - Math.round(y), Math.round(w), Math.round(-h));
}
function displayAlert(type, message) {
    getElement("#alert-type").innerText = type;
    getElement("#alert-message").innerText = message;
    showElement(getElement("#alert-outer"));
    getElement("#alert-progress-inner").animate([
        {
            width: "0%"
        },
        {
            width: "100%"
        }
    ], {
        easing: "linear",
        duration: 3000
    }).play();
    setTimeout(()=>{
        hideElement(getElement("#alert-outer"));
    }, 3000);
}

},{"./client.js":"4cgRK","./world.js":"1L67l"}],"4cgRK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createClient", ()=>createClient);
parcelHelpers.export(exports, "receiveUpdate", ()=>receiveUpdate);
parcelHelpers.export(exports, "sendUpdate", ()=>sendUpdate);
parcelHelpers.export(exports, "getTileLight", ()=>getTileLight);
var _worldJs = require("./world.js");
function createClient(config) {
    return {
        config,
        world: {
            tiles: [],
            bottomLeft: {
                x: 0,
                y: 0
            },
            fov: {
                width: 0,
                height: 0
            }
        },
        camera: {
            x: 0,
            y: 0
        },
        players: [],
        lightSources: {
            natural: {
                intensity: 0
            },
            sources: []
        },
        tps: 0,
        time: {
            hours: 0,
            minutes: 0
        }
    };
}
function receiveUpdate(client, message) {
    if (message.status === "error") {
        // TODO: Nicer error handling
        alert("Error" + message.message);
        return;
    }
    client.world = (0, _worldJs.decodeWorldUpdate)(message.world);
    client.camera = message.camera;
    client.players = message.players;
    client.lightSources = message.lightSources;
    client.tps = message.tps;
    client.time = message.time;
}
function sendUpdate(client, keys) {
    const data = {
        keys: Object.fromEntries(keys),
        colour: client.config.colour
    };
    client.config.sendMessage(JSON.stringify(data));
}
function getTileLight(client, position) {
    const { natural, sources } = client.lightSources;
    let light = natural.intensity;
    for (const source of sources){
        const xDistance = Math.abs(source.position.x - position.x);
        const yDistance = Math.abs(source.position.y - position.y);
        const distance = Math.sqrt(xDistance ** 2 + yDistance ** 2);
        // TODO: Directional lights
        light += source.intensity / distance;
    }
    return light;
}

},{"./world.js":"1L67l","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1L67l":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tiles", ()=>tiles);
parcelHelpers.export(exports, "tileColours", ()=>tileColours);
parcelHelpers.export(exports, "getTileId", ()=>getTileId);
parcelHelpers.export(exports, "getWorldUpdate", ()=>getWorldUpdate);
parcelHelpers.export(exports, "encodeWorldUpdate", ()=>encodeWorldUpdate);
parcelHelpers.export(exports, "decodeWorldUpdate", ()=>decodeWorldUpdate);
const tiles = new Map();
tiles.set("void", 0); // VOID.
tiles.set("water", 1); // ocean
tiles.set("grass", 2); // hot plains, forest, dense forst
tiles.set("cold_grass", 3); // cold plains, ice plains, ice forst, dense ice forest
tiles.set("snow", 4); // ice plains, ice forst, dense ice forst
tiles.set("ice", 5); // replaces some water in ice biomes
tiles.set("hot_grass", 6); // savanna, swamp, jungle
tiles.set("swamp_water", 7); // swamp
tiles.set("sand", 8); // desert
const tileColours = new Map();
tileColours.set(0, [
    0,
    0,
    0
]);
tileColours.set(1, [
    52,
    152,
    219
]);
tileColours.set(2, [
    39,
    174,
    96
]);
tileColours.set(3, [
    69,
    179,
    157
]);
tileColours.set(4, [
    236,
    240,
    241
]);
tileColours.set(5, [
    174,
    214,
    241
]);
tileColours.set(6, [
    24,
    106,
    59
]);
tileColours.set(7, [
    11,
    83,
    69
]);
tileColours.set(8, [
    244,
    208,
    63
]);
function getTileId(name) {
    const id = tiles.get(name);
    if (id === undefined) throw new Error("Tile does not exist");
    return id;
}
function getWorldUpdate(server, perspective) {
    const { config } = server;
    const { fov } = config;
    // TODO: Make it so the fov is not doubled
    const bottomLeft = {
        x: Math.ceil(perspective.x) - fov.width,
        y: Math.ceil(perspective.y) - fov.height
    };
    const bounds = {
        x: {
            min: Math.ceil(perspective.x) - fov.width,
            max: Math.ceil(perspective.x) + fov.width
        },
        y: {
            min: Math.ceil(perspective.y) - fov.height,
            max: Math.ceil(perspective.y) + fov.height
        }
    };
    const emptyTile = {
        type: 0,
        humidity: 0,
        temperature: 0,
        alternate: 0
    };
    const emptyCol = new Array(config.world.height).fill(emptyTile);
    // Remove out of fov cols
    const sorroundingCols = sliceWithDefault(server.world.tiles, bounds.x.min, bounds.x.max, emptyCol);
    // Remove out of fov rows
    const sorroundingTiles = sorroundingCols.map((col)=>sliceWithDefault(col, bounds.y.min, bounds.y.max, emptyTile));
    // Only give the TileType not other data in WorldTile
    const sorroundingTileTypes = sorroundingTiles.map((col)=>col.map(({ type })=>type));
    return {
        tiles: sorroundingTileTypes,
        bottomLeft,
        fov: config.fov
    };
}
function encodeWorldUpdate({ tiles, bottomLeft, fov }) {
    let encodedTiles = "";
    for (const col of tiles)for (const tile of col)encodedTiles += tile.toString().padStart(3, "0");
    return {
        tiles: encodedTiles,
        bottomLeft,
        fov
    };
}
function decodeWorldUpdate({ tiles, bottomLeft, fov }) {
    let decodedTiles = [];
    let currentTile = "";
    let x = 0;
    let y = 0;
    for(let i = 0; i < tiles.length; i++){
        const char = tiles[i];
        if (currentTile.length < 2) {
            currentTile += char;
            continue;
        }
        if (currentTile.length === 2) {
            currentTile += char;
            if (decodedTiles[x] === undefined) decodedTiles[x] = [];
            decodedTiles[x][y] = parseInt(currentTile);
            currentTile = "";
            y++;
            if (y === fov.height * 2) {
                y = 0;
                x++;
            }
        }
    }
    return {
        bottomLeft,
        fov,
        tiles: decodedTiles
    };
}
function sliceWithDefault(arr, min, max, def) {
    let result = arr.slice(Math.max(min, 0), Math.min(max, arr.length));
    if (min < 0) for(; min < 0; min++)result.unshift(def);
    if (max > arr.length) for(; max > arr.length; max--)result.push(def);
    return result;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["2x4Ow","mRajy"], "mRajy", "parcelRequire86ed")

//# sourceMappingURL=index.b0774684.js.map
