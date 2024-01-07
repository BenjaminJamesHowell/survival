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
})({"9Ug0Z":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "fda20e010ed00685";
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
var _serverJs = require("./server.js");
var _worldJs = require("./world.js");
var _playerJs = require("./player.js");
const elements = getElements([
    "#game",
    "#minimap",
    "#fps",
    "#tps",
    "#menu-tabs",
    "#multiplayer-start-button",
    "#singleplayer-start-button",
    "#singleplayer-menu",
    "#multiplayer-menu",
    "#singleplayer-menu-open-button",
    "#multiplayer-menu-open-button",
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
let isInGame = false;
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
singleplayerMenu();
getElement("#multiplayer-start-button").addEventListener("click", multiplayer);
getElement("#singleplayer-start-button").addEventListener("click", singleplayer);
getElement("#singleplayer-menu-open-button").addEventListener("click", singleplayerMenu);
getElement("#multiplayer-menu-open-button").addEventListener("click", multiplayerMenu);
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
function singleplayerMenu() {
    hideElement(getElement("#game-ui"));
    hideElement(getElement("#pause-ui"));
    hideElement(getElement("#loading"));
    showElement(getElement("#ui"));
    showElement(getElement("#singleplayer-menu"));
    showElement(getElement("#menu-tabs"));
    hideElement(getElement("#multiplayer-menu"));
}
function multiplayerMenu() {
    hideElement(getElement("#game-ui"));
    hideElement(getElement("#pause-ui"));
    hideElement(getElement("#loading"));
    showElement(getElement("#ui"));
    hideElement(getElement("#singleplayer-menu"));
    showElement(getElement("#menu-tabs"));
    showElement(getElement("#multiplayer-menu"));
}
function loadingMenu() {
    hideElement(getElement("#game-ui"));
    hideElement(getElement("#pause-ui"));
    showElement(getElement("#ui"));
    showElement(getElement("#loading"));
    hideElement(getElement("#multiplayer-menu"));
    hideElement(getElement("#menu-tabs"));
    hideElement(getElement("#singleplayer-menu"));
}
function inGame() {
    hideElement(getElement("#ui"));
    hideElement(getElement("#multiplayer-menu"));
    hideElement(getElement("#singleplayer-menu"));
    hideElement(getElement("#loading"));
    showElement(getElement("#game-ui"));
    hideElement(getElement("#pause-ui"));
}
function singleplayer() {
    if (isInGame) return;
    isInGame = true;
    loadingMenu();
    const serverConfig = {
        port: 0,
        world: {
            height: 1000,
            width: 1000,
            seed: Math.floor(Math.random() * 1000000000),
            oceaness: 0.7,
            beachness: 0.1,
            extremeness: 0.001,
            humidity: 0,
            temperature: 0,
            wierdness: 0.34
        },
        fov: {
            width: 41,
            height: 21
        },
        maxPlayers: 1,
        playerAcceleration: 0.05
    };
    const server = (0, _serverJs.setupServer)(serverConfig);
    const player = (0, _playerJs.addPlayer)(server, (message)=>{
        // Send alert to client
        (0, _clientJs.receiveUpdate)(client, message);
    }, ()=>{
    // Called when the player disconnects
    });
    const colour = "red";
    const clientConfig = {
        sendMessage: (msg)=>{
            // Send a message to the server
            (0, _serverJs.receiveUpdate)(server, player.id, msg);
        },
        colour
    };
    const client = (0, _clientJs.createClient)(clientConfig);
    setTimeout(inGame, 1000);
    renderWorld(client);
    setInterval(()=>{
        // Client sends update to server
        (0, _clientJs.sendUpdate)(client, keys);
        // Server tick
        (0, _serverJs.serverTick)(server);
        // Server sends update to client
        const update = (0, _serverJs.getUpdate)(server, player.id);
        (0, _clientJs.receiveUpdate)(client, update);
        if (keys.get("Equal")) tileSize++;
        if (keys.get("Minus")) tileSize--;
        if (tileSize > 70) tileSize = 70;
        if (tileSize < 10) tileSize = 10;
    }, 1000 / 60);
}
function multiplayer() {
    if (isInGame) return;
    isInGame = true;
    loadingMenu();
    const colourBox = getElement("#team-colour");
    const colour = colourBox.value;
    const serverAddress = getElement("#server-address");
    const server = `ws://${serverAddress.value}`;
    const socket = new WebSocket(server);
    const config = {
        sendMessage: (update)=>{
            // The map needs to be converted to be encoded properly
            socket.send(JSON.stringify({
                ...update,
                keys: Object.fromEntries(update.keys)
            }));
        },
        colour
    };
    const client = (0, _clientJs.createClient)(config);
    socket.addEventListener("error", ()=>{
        isInGame = false;
        displayAlert("error", "Connection Error");
        singleplayerMenu();
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

},{"./client.js":"4cgRK","./server.js":"74tFX","./world.js":"1L67l","./player.js":"6OTSH"}],"4cgRK":[function(require,module,exports) {
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
    const update = {
        keys: keys,
        colour: client.config.colour
    };
    client.config.sendMessage(update);
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
parcelHelpers.export(exports, "grassTypes", ()=>grassTypes);
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
tiles.set("ice", 5); // replaces some water in ice biomes, ice_beach
tiles.set("hot_grass", 6); // savanna, swamp, jungle
tiles.set("swamp_water", 7); // swamp
tiles.set("sand", 8); // desert, sand_beach
tiles.set("pebbles", 9); // pebble_beach
tiles.set("tree", 10);
const grassTypes = new Map();
grassTypes.set("forest", 2);
grassTypes.set("dense_forest", 2);
grassTypes.set("hot_plains", 2);
grassTypes.set("cold_plains", 3);
grassTypes.set("ice_plains", 3);
grassTypes.set("ice_forest", 3);
grassTypes.set("dense_ice_forest", 3);
grassTypes.set("ice_beach", 5);
grassTypes.set("savanna", 6);
grassTypes.set("swamp", 6);
grassTypes.set("jungle", 6);
grassTypes.set("desert", 8);
grassTypes.set("sand_beach", 8);
grassTypes.set("pebble_beach", 9);
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
tileColours.set(9, [
    100,
    100,
    100
]);
tileColours.set(10, [
    46,
    16,
    4
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

},{}],"74tFX":[function(require,module,exports) {
// Everything in this file should be able to run in a browser or in node. For
// the part of the server that deals with web sockets, see webserver.ts
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setupServer", ()=>setupServer);
parcelHelpers.export(exports, "serverTick", ()=>serverTick);
parcelHelpers.export(exports, "getUpdate", ()=>getUpdate);
parcelHelpers.export(exports, "receiveUpdate", ()=>receiveUpdate);
var _playerJs = require("./player.js");
var _worldJs = require("./world.js");
var _lightJs = require("./light.js");
var _worldgenJs = require("./worldgen.js");
function setupServer(config) {
    return {
        players: new Array(config.maxPlayers).fill(undefined),
        world: (0, _worldgenJs.generateWorld)(config.world),
        config,
        time: {
            seconds: 0,
            minutes: 0,
            hours: 12
        },
        tick: {
            lastTickStart: Date.now(),
            delta: 0,
            tps: 0
        },
        lightSources: {
            players: [],
            permanent: [],
            natural: {
                intensity: 0.5
            }
        }
    };
}
function serverTick(server) {
    server.time.seconds += 1;
    if (server.time.seconds === 60) {
        server.time.minutes++;
        server.time.seconds = 0;
    }
    if (server.time.minutes === 60) {
        server.time.hours++;
        server.time.minutes = 0;
    }
    if (server.time.hours === 24) {
        server.time.hours = 0;
        server.time.minutes = 0;
        server.time.seconds = 0;
    }
    const realTime = Date.now();
    server.tick.delta = realTime - server.tick.lastTickStart;
    server.tick.lastTickStart = realTime;
    server.tick.tps = 1000 / server.tick.delta;
    (0, _lightJs.lightTick)(server);
    for(let id = 0; id < server.players.length; id++)playerTick(server, id);
}
function playerTick(server, id) {
    const player = server.players[id];
    if (player === undefined) return;
    const acceleration = {
        x: 0,
        y: 0
    };
    if (player.keys.get("KeyW")) acceleration.y += server.config.playerAcceleration;
    if (player.keys.get("KeyS")) acceleration.y -= server.config.playerAcceleration;
    if (player.keys.get("KeyD")) acceleration.x += server.config.playerAcceleration;
    if (player.keys.get("KeyA")) acceleration.x -= server.config.playerAcceleration;
    player.velocity.x += acceleration.x;
    player.velocity.y += acceleration.y;
    player.velocity.x *= 0.9;
    player.velocity.y *= 0.9;
    player.position.x += player.velocity.x;
    player.position.y += player.velocity.y;
}
function getUpdate(server, id) {
    const player = server.players[id];
    if (player === undefined) throw new Error("Player does not exist");
    const worldUpdate = (0, _worldJs.getWorldUpdate)(server, player.position);
    const encodedWorldUpdate = (0, _worldJs.encodeWorldUpdate)(worldUpdate);
    const playerUpdates = (0, _playerJs.getPlayerUpdates)(server);
    const lightUpdates = (0, _lightJs.getLightUpdates)(server, player.position);
    return {
        status: "ok",
        players: playerUpdates,
        world: encodedWorldUpdate,
        camera: player.position,
        lightSources: lightUpdates,
        tps: server.tick.tps,
        time: {
            hours: server.time.hours,
            minutes: server.time.minutes
        }
    };
}
function receiveUpdate(server, id, update) {
    const player = server.players[id];
    if (player === undefined) return;
    player.keys = update.keys;
    player.colour = update.colour;
}

},{"./player.js":"6OTSH","./world.js":"1L67l","./light.js":"jNGh5","./worldgen.js":"3NpdK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6OTSH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addPlayer", ()=>addPlayer);
parcelHelpers.export(exports, "removePlayer", ()=>removePlayer);
parcelHelpers.export(exports, "getPlayerUpdates", ()=>getPlayerUpdates);
parcelHelpers.export(exports, "kickPlayer", ()=>kickPlayer);
function addPlayer(server, pushMessage, closeConnection) {
    let id = 0;
    for(id = 0; id < server.players.length; id++){
        if (server.players[id] === undefined) break;
        if (id === server.players.length - 1) throw new Error("Server is full");
    }
    const player = {
        colour: "red",
        position: {
            x: 0,
            y: 0
        },
        velocity: {
            x: 0,
            y: 0
        },
        id,
        isFlashlightEnabled: true,
        keys: new Map(),
        aimDirection: 0,
        closeConnection,
        pushMessage
    };
    server.players[id] = player;
    return player;
}
function removePlayer(server, player) {
    server.players[player.id] = undefined;
}
function getPlayerUpdates(server) {
    const updates = [];
    for (const player of server.players){
        if (player === undefined) continue;
        updates.push({
            colour: player.colour,
            position: player.position
        });
    }
    return updates;
}
function kickPlayer(server, player) {
    const message = {
        status: "error",
        type: "kicked",
        message: "You were kicked from the server!"
    };
    player.pushMessage(message);
    player.closeConnection();
    removePlayer(server, player);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jNGh5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "lightTick", ()=>lightTick);
parcelHelpers.export(exports, "getLightUpdates", ()=>getLightUpdates);
function lightTick(server) {
    const { minutes, hours } = server.time;
    const dayProgress = (hours * 60 + minutes) / 1440;
    server.lightSources.natural.intensity = getNaturalLight(dayProgress);
    server.lightSources.players = [];
    server.lightSources.permanent = [];
}
function getNaturalLight(dayProgress) {
    if (dayProgress < 0.2672 || dayProgress > 0.7328) return 0.1;
    if (dayProgress < 0.3) return 2 ** (-2 + 8 * dayProgress) - 1;
    if (dayProgress > 0.7) return 2 ** (6 - 8 * dayProgress) - 1;
    return -((-2 + 4 * dayProgress) ** 2) + 1;
}
function getLightUpdates(server, position) {
    // TODO: Make this only return close light sources
    const { natural, players, permanent } = server.lightSources;
    return {
        natural,
        sources: [
            ...players,
            ...permanent
        ]
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3NpdK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "generateWorld", ()=>generateWorld);
parcelHelpers.export(exports, "getBiome", ()=>getBiome);
var _alea = require("alea");
var _aleaDefault = parcelHelpers.interopDefault(_alea);
var _worldJs = require("./world.js");
var _simplexNoise = require("simplex-noise");
function generateWorld(config) {
    const tiles = [];
    const terrainSeed = (0, _aleaDefault.default)(config.seed);
    const terrainNoise = (0, _simplexNoise.createNoise2D)(terrainSeed);
    const humiditySeed = (0, _aleaDefault.default)(config.seed + 1);
    const humidityNoise = (0, _simplexNoise.createNoise2D)(humiditySeed);
    const temperatureSeed = (0, _aleaDefault.default)(config.seed + 2);
    const temperatureNoise = (0, _simplexNoise.createNoise2D)(temperatureSeed);
    const alternateSeed = (0, _aleaDefault.default)(config.seed + 3);
    const alternateNoise = (0, _simplexNoise.createNoise2D)(alternateSeed);
    for(let x = 0; x < config.width; x++){
        const col = [];
        for(let y = 0; y < config.height; y++)col.push(getTile(x, y, terrainNoise, humidityNoise, temperatureNoise, alternateNoise, config));
        tiles.push(col);
    }
    return {
        tiles,
        config
    };
}
function getTile(x, y, terrainNoise, humidityNoise, temperatureNoise, alternateNoise, config) {
    const { extremeness, oceaness } = config;
    const elevation = terrainNoise(x * extremeness, y * extremeness) + temperatureNoise(x * extremeness * 2, y * extremeness * 2) / 2 + humidityNoise(x * extremeness * 4, y * extremeness * 4) / 4;
    const isLand = !(elevation >= -(oceaness / 2) && elevation < oceaness / 2);
    const humidity = humidityNoise(x * extremeness, y * extremeness) + terrainNoise(x * extremeness * 2, y * extremeness * 2) / 2 + temperatureNoise(x * extremeness * 4, y * extremeness * 4) / 4;
    const temperature = temperatureNoise(x * extremeness, y * extremeness) + humidityNoise(x * extremeness * 2, y * extremeness * 2) / 2 + terrainNoise(x * extremeness * 4, y * extremeness * 4) / 4;
    const alternate = alternateNoise(x ^ 2, y ^ 2);
    const wierdness = config.wierdness;
    const type = getTileType(config, isLand, elevation, temperature, humidity, wierdness, alternate);
    return {
        type,
        humidity,
        temperature,
        alternate
    };
}
function getTileType(config, isLand, elevation, temperature, humidity, wierdness, alternate) {
    const biome = getBiome(config, elevation, temperature, humidity, wierdness);
    if (!isLand) return getWater(biome, alternate);
    const decoration = getDecoration(biome, humidity, alternate);
    if (decoration !== "none") return (0, _worldJs.getTileId)(decoration);
    const grassType = (0, _worldJs.grassTypes).get(biome);
    if (grassType === undefined) throw new Error("There is no grass type for this biome");
    return grassType;
}
function getDecoration(biome, humidity, alternate) {
    let chance = 0;
    if (biome === "jungle" || biome === "dense_forest" || biome === "dense_ice_forest") chance += 0.15;
    if (biome === "forest" || biome === "ice_forest" || biome === "swamp") chance += 0.05;
    if (biome === "savanna" || biome === "hot_plains" || biome === "cold_plains" || biome === "ice_plains") chance += 0.02;
    if (biome === "desert") chance = 0;
    if (chance > (alternate + 1) / 2) return "tree";
    return "none";
}
function getBiome(config, elevation, temperature, humidity, wierdness) {
    const isHot = temperature >= wierdness;
    const isWarm = temperature < wierdness && temperature >= 0;
    const isCold = temperature < 0 && temperature >= -wierdness;
    const isIcy = temperature < -wierdness;
    const isVeryHighHumid = humidity >= wierdness;
    const isHighHumid = humidity >= 0 && humidity < wierdness;
    const isLowHumid = humidity >= -wierdness && humidity < 0;
    const isVeryLowHumid = humidity < -wierdness;
    const { oceaness, beachness } = config;
    const isBeach = elevation >= oceaness / 2 && elevation < oceaness / 2 + beachness || elevation < -oceaness / 2 && elevation >= -oceaness / 2 - beachness;
    if (isBeach) {
        if (isHot || isWarm) return "sand_beach";
        if (isCold) return "pebble_beach";
        if (isIcy) return "ice_beach";
    }
    if (isVeryLowHumid) {
        if (isHot) return "desert";
        if (isWarm) return "hot_plains";
        if (isCold) return "cold_plains";
        if (isIcy) return "ice_plains";
    }
    if (isLowHumid) {
        if (isHot) return "savanna";
        if (isWarm) return "hot_plains";
        if (isCold) return "cold_plains";
        if (isIcy) return "ice_plains";
    }
    if (isHighHumid) {
        if (isHot) return "swamp";
        if (isWarm) return "forest";
        if (isCold) return "forest";
        if (isIcy) return "ice_forest";
    }
    if (isVeryHighHumid) {
        if (isHot) return "jungle";
        if (isWarm) return "dense_forest";
        if (isCold) return "dense_forest";
        if (isIcy) return "dense_ice_forest";
    }
    throw new Error("Could not determine biome type");
}
function getWater(biome, alternate) {
    if (biome === "swamp" && alternate > -0.7) return (0, _worldJs.getTileId)("swamp_water");
    if ((biome === "ice_plains" || biome === "ice_forest" || biome === "dense_ice_forest") && alternate > -0.8) return (0, _worldJs.getTileId)("ice");
    return (0, _worldJs.getTileId)("water");
}

},{"alea":"bhTzy","./world.js":"1L67l","simplex-noise":"FTQ4k","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bhTzy":[function(require,module,exports) {
(function(root, factory) {
    module.exports = factory();
})(this, function() {
    "use strict";
    // From http://baagoe.com/en/RandomMusings/javascript/
    // importState to sync generator states
    Alea.importState = function(i) {
        var random = new Alea();
        random.importState(i);
        return random;
    };
    return Alea;
    function Alea() {
        return function(args) {
            // Johannes Baagøe <baagoe@baagoe.com>, 2010
            var s0 = 0;
            var s1 = 0;
            var s2 = 0;
            var c = 1;
            if (args.length == 0) args = [
                +new Date
            ];
            var mash = Mash();
            s0 = mash(" ");
            s1 = mash(" ");
            s2 = mash(" ");
            for(var i = 0; i < args.length; i++){
                s0 -= mash(args[i]);
                if (s0 < 0) s0 += 1;
                s1 -= mash(args[i]);
                if (s1 < 0) s1 += 1;
                s2 -= mash(args[i]);
                if (s2 < 0) s2 += 1;
            }
            mash = null;
            var random = function() {
                var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
                s0 = s1;
                s1 = s2;
                return s2 = t - (c = t | 0);
            };
            random.next = random;
            random.uint32 = function() {
                return random() * 0x100000000; // 2^32
            };
            random.fract53 = function() {
                return random() + (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
            };
            random.version = "Alea 0.9";
            random.args = args;
            // my own additions to sync state between two generators
            random.exportState = function() {
                return [
                    s0,
                    s1,
                    s2,
                    c
                ];
            };
            random.importState = function(i) {
                s0 = +i[0] || 0;
                s1 = +i[1] || 0;
                s2 = +i[2] || 0;
                c = +i[3] || 0;
            };
            return random;
        }(Array.prototype.slice.call(arguments));
    }
    function Mash() {
        var n = 0xefc8249d;
        var mash = function(data) {
            data = data.toString();
            for(var i = 0; i < data.length; i++){
                n += data.charCodeAt(i);
                var h = 0.02519603282416938 * n;
                n = h >>> 0;
                h -= n;
                h *= n;
                n = h >>> 0;
                h -= n;
                n += h * 0x100000000; // 2^32
            }
            return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
        };
        mash.version = "Mash 0.9";
        return mash;
    }
});

},{}],"FTQ4k":[function(require,module,exports) {
/*
 * A fast javascript implementation of simplex noise by Jonas Wagner

Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
Better rank ordering method by Stefan Gustavson in 2012.

 Copyright (c) 2022 Jonas Wagner

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */ // these #__PURE__ comments help uglifyjs with dead code removal
// 
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Creates a 2D noise function
 * @param random the random function that will be used to build the permutation table
 * @returns {NoiseFunction2D}
 */ parcelHelpers.export(exports, "createNoise2D", ()=>createNoise2D);
/**
 * Creates a 3D noise function
 * @param random the random function that will be used to build the permutation table
 * @returns {NoiseFunction3D}
 */ parcelHelpers.export(exports, "createNoise3D", ()=>createNoise3D);
/**
 * Creates a 4D noise function
 * @param random the random function that will be used to build the permutation table
 * @returns {NoiseFunction4D}
 */ parcelHelpers.export(exports, "createNoise4D", ()=>createNoise4D);
/**
 * Builds a random permutation table.
 * This is exported only for (internal) testing purposes.
 * Do not rely on this export.
 * @private
 */ parcelHelpers.export(exports, "buildPermutationTable", ()=>buildPermutationTable);
const F2 = /*#__PURE__*/ 0.5 * (Math.sqrt(3.0) - 1.0);
const G2 = /*#__PURE__*/ (3.0 - Math.sqrt(3.0)) / 6.0;
const F3 = 1.0 / 3.0;
const G3 = 1.0 / 6.0;
const F4 = /*#__PURE__*/ (Math.sqrt(5.0) - 1.0) / 4.0;
const G4 = /*#__PURE__*/ (5.0 - Math.sqrt(5.0)) / 20.0;
// I'm really not sure why this | 0 (basically a coercion to int)
// is making this faster but I get ~5 million ops/sec more on the
// benchmarks across the board or a ~10% speedup.
const fastFloor = (x)=>Math.floor(x) | 0;
const grad2 = /*#__PURE__*/ new Float64Array([
    1,
    1,
    -1,
    1,
    1,
    -1,
    -1,
    -1,
    1,
    0,
    -1,
    0,
    1,
    0,
    -1,
    0,
    0,
    1,
    0,
    -1,
    0,
    1,
    0,
    -1
]);
// double seems to be faster than single or int's
// probably because most operations are in double precision
const grad3 = /*#__PURE__*/ new Float64Array([
    1,
    1,
    0,
    -1,
    1,
    0,
    1,
    -1,
    0,
    -1,
    -1,
    0,
    1,
    0,
    1,
    -1,
    0,
    1,
    1,
    0,
    -1,
    -1,
    0,
    -1,
    0,
    1,
    1,
    0,
    -1,
    1,
    0,
    1,
    -1,
    0,
    -1,
    -1
]);
// double is a bit quicker here as well
const grad4 = /*#__PURE__*/ new Float64Array([
    0,
    1,
    1,
    1,
    0,
    1,
    1,
    -1,
    0,
    1,
    -1,
    1,
    0,
    1,
    -1,
    -1,
    0,
    -1,
    1,
    1,
    0,
    -1,
    1,
    -1,
    0,
    -1,
    -1,
    1,
    0,
    -1,
    -1,
    -1,
    1,
    0,
    1,
    1,
    1,
    0,
    1,
    -1,
    1,
    0,
    -1,
    1,
    1,
    0,
    -1,
    -1,
    -1,
    0,
    1,
    1,
    -1,
    0,
    1,
    -1,
    -1,
    0,
    -1,
    1,
    -1,
    0,
    -1,
    -1,
    1,
    1,
    0,
    1,
    1,
    1,
    0,
    -1,
    1,
    -1,
    0,
    1,
    1,
    -1,
    0,
    -1,
    -1,
    1,
    0,
    1,
    -1,
    1,
    0,
    -1,
    -1,
    -1,
    0,
    1,
    -1,
    -1,
    0,
    -1,
    1,
    1,
    1,
    0,
    1,
    1,
    -1,
    0,
    1,
    -1,
    1,
    0,
    1,
    -1,
    -1,
    0,
    -1,
    1,
    1,
    0,
    -1,
    1,
    -1,
    0,
    -1,
    -1,
    1,
    0,
    -1,
    -1,
    -1,
    0
]);
function createNoise2D(random = Math.random) {
    const perm = buildPermutationTable(random);
    // precalculating this yields a little ~3% performance improvement.
    const permGrad2x = new Float64Array(perm).map((v)=>grad2[v % 12 * 2]);
    const permGrad2y = new Float64Array(perm).map((v)=>grad2[v % 12 * 2 + 1]);
    return function noise2D(x, y) {
        // if(!isFinite(x) || !isFinite(y)) return 0;
        let n0 = 0; // Noise contributions from the three corners
        let n1 = 0;
        let n2 = 0;
        // Skew the input space to determine which simplex cell we're in
        const s = (x + y) * F2; // Hairy factor for 2D
        const i = fastFloor(x + s);
        const j = fastFloor(y + s);
        const t = (i + j) * G2;
        const X0 = i - t; // Unskew the cell origin back to (x,y) space
        const Y0 = j - t;
        const x0 = x - X0; // The x,y distances from the cell origin
        const y0 = y - Y0;
        // For the 2D case, the simplex shape is an equilateral triangle.
        // Determine which simplex we are in.
        let i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
        if (x0 > y0) {
            i1 = 1;
            j1 = 0;
        } else {
            i1 = 0;
            j1 = 1;
        } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
        // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
        // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
        // c = (3-sqrt(3))/6
        const x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
        const y1 = y0 - j1 + G2;
        const x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
        const y2 = y0 - 1.0 + 2.0 * G2;
        // Work out the hashed gradient indices of the three simplex corners
        const ii = i & 255;
        const jj = j & 255;
        // Calculate the contribution from the three corners
        let t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 >= 0) {
            const gi0 = ii + perm[jj];
            const g0x = permGrad2x[gi0];
            const g0y = permGrad2y[gi0];
            t0 *= t0;
            // n0 = t0 * t0 * (grad2[gi0] * x0 + grad2[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient
            n0 = t0 * t0 * (g0x * x0 + g0y * y0);
        }
        let t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 >= 0) {
            const gi1 = ii + i1 + perm[jj + j1];
            const g1x = permGrad2x[gi1];
            const g1y = permGrad2y[gi1];
            t1 *= t1;
            // n1 = t1 * t1 * (grad2[gi1] * x1 + grad2[gi1 + 1] * y1);
            n1 = t1 * t1 * (g1x * x1 + g1y * y1);
        }
        let t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 >= 0) {
            const gi2 = ii + 1 + perm[jj + 1];
            const g2x = permGrad2x[gi2];
            const g2y = permGrad2y[gi2];
            t2 *= t2;
            // n2 = t2 * t2 * (grad2[gi2] * x2 + grad2[gi2 + 1] * y2);
            n2 = t2 * t2 * (g2x * x2 + g2y * y2);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].
        return 70.0 * (n0 + n1 + n2);
    };
}
function createNoise3D(random = Math.random) {
    const perm = buildPermutationTable(random);
    // precalculating these seems to yield a speedup of over 15%
    const permGrad3x = new Float64Array(perm).map((v)=>grad3[v % 12 * 3]);
    const permGrad3y = new Float64Array(perm).map((v)=>grad3[v % 12 * 3 + 1]);
    const permGrad3z = new Float64Array(perm).map((v)=>grad3[v % 12 * 3 + 2]);
    return function noise3D(x, y, z) {
        let n0, n1, n2, n3; // Noise contributions from the four corners
        // Skew the input space to determine which simplex cell we're in
        const s = (x + y + z) * F3; // Very nice and simple skew factor for 3D
        const i = fastFloor(x + s);
        const j = fastFloor(y + s);
        const k = fastFloor(z + s);
        const t = (i + j + k) * G3;
        const X0 = i - t; // Unskew the cell origin back to (x,y,z) space
        const Y0 = j - t;
        const Z0 = k - t;
        const x0 = x - X0; // The x,y,z distances from the cell origin
        const y0 = y - Y0;
        const z0 = z - Z0;
        // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
        // Determine which simplex we are in.
        let i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
        let i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
        if (x0 >= y0) {
            if (y0 >= z0) {
                i1 = 1;
                j1 = 0;
                k1 = 0;
                i2 = 1;
                j2 = 1;
                k2 = 0;
            } else if (x0 >= z0) {
                i1 = 1;
                j1 = 0;
                k1 = 0;
                i2 = 1;
                j2 = 0;
                k2 = 1;
            } else {
                i1 = 0;
                j1 = 0;
                k1 = 1;
                i2 = 1;
                j2 = 0;
                k2 = 1;
            } // Z X Y order
        } else {
            if (y0 < z0) {
                i1 = 0;
                j1 = 0;
                k1 = 1;
                i2 = 0;
                j2 = 1;
                k2 = 1;
            } else if (x0 < z0) {
                i1 = 0;
                j1 = 1;
                k1 = 0;
                i2 = 0;
                j2 = 1;
                k2 = 1;
            } else {
                i1 = 0;
                j1 = 1;
                k1 = 0;
                i2 = 1;
                j2 = 1;
                k2 = 0;
            } // Y X Z order
        }
        // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
        // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
        // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
        // c = 1/6.
        const x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords
        const y1 = y0 - j1 + G3;
        const z1 = z0 - k1 + G3;
        const x2 = x0 - i2 + 2.0 * G3; // Offsets for third corner in (x,y,z) coords
        const y2 = y0 - j2 + 2.0 * G3;
        const z2 = z0 - k2 + 2.0 * G3;
        const x3 = x0 - 1.0 + 3.0 * G3; // Offsets for last corner in (x,y,z) coords
        const y3 = y0 - 1.0 + 3.0 * G3;
        const z3 = z0 - 1.0 + 3.0 * G3;
        // Work out the hashed gradient indices of the four simplex corners
        const ii = i & 255;
        const jj = j & 255;
        const kk = k & 255;
        // Calculate the contribution from the four corners
        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
        if (t0 < 0) n0 = 0.0;
        else {
            const gi0 = ii + perm[jj + perm[kk]];
            t0 *= t0;
            n0 = t0 * t0 * (permGrad3x[gi0] * x0 + permGrad3y[gi0] * y0 + permGrad3z[gi0] * z0);
        }
        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
        if (t1 < 0) n1 = 0.0;
        else {
            const gi1 = ii + i1 + perm[jj + j1 + perm[kk + k1]];
            t1 *= t1;
            n1 = t1 * t1 * (permGrad3x[gi1] * x1 + permGrad3y[gi1] * y1 + permGrad3z[gi1] * z1);
        }
        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
        if (t2 < 0) n2 = 0.0;
        else {
            const gi2 = ii + i2 + perm[jj + j2 + perm[kk + k2]];
            t2 *= t2;
            n2 = t2 * t2 * (permGrad3x[gi2] * x2 + permGrad3y[gi2] * y2 + permGrad3z[gi2] * z2);
        }
        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
        if (t3 < 0) n3 = 0.0;
        else {
            const gi3 = ii + 1 + perm[jj + 1 + perm[kk + 1]];
            t3 *= t3;
            n3 = t3 * t3 * (permGrad3x[gi3] * x3 + permGrad3y[gi3] * y3 + permGrad3z[gi3] * z3);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to stay just inside [-1,1]
        return 32.0 * (n0 + n1 + n2 + n3);
    };
}
function createNoise4D(random = Math.random) {
    const perm = buildPermutationTable(random);
    // precalculating these leads to a ~10% speedup
    const permGrad4x = new Float64Array(perm).map((v)=>grad4[v % 32 * 4]);
    const permGrad4y = new Float64Array(perm).map((v)=>grad4[v % 32 * 4 + 1]);
    const permGrad4z = new Float64Array(perm).map((v)=>grad4[v % 32 * 4 + 2]);
    const permGrad4w = new Float64Array(perm).map((v)=>grad4[v % 32 * 4 + 3]);
    return function noise4D(x, y, z, w) {
        let n0, n1, n2, n3, n4; // Noise contributions from the five corners
        // Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in
        const s = (x + y + z + w) * F4; // Factor for 4D skewing
        const i = fastFloor(x + s);
        const j = fastFloor(y + s);
        const k = fastFloor(z + s);
        const l = fastFloor(w + s);
        const t = (i + j + k + l) * G4; // Factor for 4D unskewing
        const X0 = i - t; // Unskew the cell origin back to (x,y,z,w) space
        const Y0 = j - t;
        const Z0 = k - t;
        const W0 = l - t;
        const x0 = x - X0; // The x,y,z,w distances from the cell origin
        const y0 = y - Y0;
        const z0 = z - Z0;
        const w0 = w - W0;
        // For the 4D case, the simplex is a 4D shape I won't even try to describe.
        // To find out which of the 24 possible simplices we're in, we need to
        // determine the magnitude ordering of x0, y0, z0 and w0.
        // Six pair-wise comparisons are performed between each possible pair
        // of the four coordinates, and the results are used to rank the numbers.
        let rankx = 0;
        let ranky = 0;
        let rankz = 0;
        let rankw = 0;
        if (x0 > y0) rankx++;
        else ranky++;
        if (x0 > z0) rankx++;
        else rankz++;
        if (x0 > w0) rankx++;
        else rankw++;
        if (y0 > z0) ranky++;
        else rankz++;
        if (y0 > w0) ranky++;
        else rankw++;
        if (z0 > w0) rankz++;
        else rankw++;
        // simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.
        // Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w
        // impossible. Only the 24 indices which have non-zero entries make any sense.
        // We use a thresholding to set the coordinates in turn from the largest magnitude.
        // Rank 3 denotes the largest coordinate.
        // Rank 2 denotes the second largest coordinate.
        // Rank 1 denotes the second smallest coordinate.
        // The integer offsets for the second simplex corner
        const i1 = rankx >= 3 ? 1 : 0;
        const j1 = ranky >= 3 ? 1 : 0;
        const k1 = rankz >= 3 ? 1 : 0;
        const l1 = rankw >= 3 ? 1 : 0;
        // The integer offsets for the third simplex corner
        const i2 = rankx >= 2 ? 1 : 0;
        const j2 = ranky >= 2 ? 1 : 0;
        const k2 = rankz >= 2 ? 1 : 0;
        const l2 = rankw >= 2 ? 1 : 0;
        // The integer offsets for the fourth simplex corner
        const i3 = rankx >= 1 ? 1 : 0;
        const j3 = ranky >= 1 ? 1 : 0;
        const k3 = rankz >= 1 ? 1 : 0;
        const l3 = rankw >= 1 ? 1 : 0;
        // The fifth corner has all coordinate offsets = 1, so no need to compute that.
        const x1 = x0 - i1 + G4; // Offsets for second corner in (x,y,z,w) coords
        const y1 = y0 - j1 + G4;
        const z1 = z0 - k1 + G4;
        const w1 = w0 - l1 + G4;
        const x2 = x0 - i2 + 2.0 * G4; // Offsets for third corner in (x,y,z,w) coords
        const y2 = y0 - j2 + 2.0 * G4;
        const z2 = z0 - k2 + 2.0 * G4;
        const w2 = w0 - l2 + 2.0 * G4;
        const x3 = x0 - i3 + 3.0 * G4; // Offsets for fourth corner in (x,y,z,w) coords
        const y3 = y0 - j3 + 3.0 * G4;
        const z3 = z0 - k3 + 3.0 * G4;
        const w3 = w0 - l3 + 3.0 * G4;
        const x4 = x0 - 1.0 + 4.0 * G4; // Offsets for last corner in (x,y,z,w) coords
        const y4 = y0 - 1.0 + 4.0 * G4;
        const z4 = z0 - 1.0 + 4.0 * G4;
        const w4 = w0 - 1.0 + 4.0 * G4;
        // Work out the hashed gradient indices of the five simplex corners
        const ii = i & 255;
        const jj = j & 255;
        const kk = k & 255;
        const ll = l & 255;
        // Calculate the contribution from the five corners
        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
        if (t0 < 0) n0 = 0.0;
        else {
            const gi0 = ii + perm[jj + perm[kk + perm[ll]]];
            t0 *= t0;
            n0 = t0 * t0 * (permGrad4x[gi0] * x0 + permGrad4y[gi0] * y0 + permGrad4z[gi0] * z0 + permGrad4w[gi0] * w0);
        }
        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
        if (t1 < 0) n1 = 0.0;
        else {
            const gi1 = ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]];
            t1 *= t1;
            n1 = t1 * t1 * (permGrad4x[gi1] * x1 + permGrad4y[gi1] * y1 + permGrad4z[gi1] * z1 + permGrad4w[gi1] * w1);
        }
        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
        if (t2 < 0) n2 = 0.0;
        else {
            const gi2 = ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]];
            t2 *= t2;
            n2 = t2 * t2 * (permGrad4x[gi2] * x2 + permGrad4y[gi2] * y2 + permGrad4z[gi2] * z2 + permGrad4w[gi2] * w2);
        }
        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
        if (t3 < 0) n3 = 0.0;
        else {
            const gi3 = ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]];
            t3 *= t3;
            n3 = t3 * t3 * (permGrad4x[gi3] * x3 + permGrad4y[gi3] * y3 + permGrad4z[gi3] * z3 + permGrad4w[gi3] * w3);
        }
        let t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
        if (t4 < 0) n4 = 0.0;
        else {
            const gi4 = ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]];
            t4 *= t4;
            n4 = t4 * t4 * (permGrad4x[gi4] * x4 + permGrad4y[gi4] * y4 + permGrad4z[gi4] * z4 + permGrad4w[gi4] * w4);
        }
        // Sum up and scale the result to cover the range [-1,1]
        return 27.0 * (n0 + n1 + n2 + n3 + n4);
    };
}
function buildPermutationTable(random) {
    const tableSize = 512;
    const p = new Uint8Array(tableSize);
    for(let i = 0; i < tableSize / 2; i++)p[i] = i;
    for(let i = 0; i < tableSize / 2 - 1; i++){
        const r = i + ~~(random() * (256 - i));
        const aux = p[i];
        p[i] = p[r];
        p[r] = aux;
    }
    for(let i = 256; i < tableSize; i++)p[i] = p[i - 256];
    return p;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["9Ug0Z","mRajy"], "mRajy", "parcelRequire86ed")

//# sourceMappingURL=index.0ed00685.js.map
