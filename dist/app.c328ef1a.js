// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"mock.json":[function(require,module,exports) {
module.exports = {
  "coord": {
    "lon": 30.3451,
    "lat": 50.4588
  },
  "weather": [{
    "id": 701,
    "main": "Mist",
    "description": "mist",
    "icon": "50n"
  }],
  "base": "stations",
  "main": {
    "temp": 280.11,
    "feels_like": 278.01,
    "temp_min": 278.92,
    "temp_max": 281.18,
    "pressure": 1008,
    "humidity": 98
  },
  "visibility": 2200,
  "wind": {
    "speed": 3,
    "deg": 80
  },
  "clouds": {
    "all": 90
  },
  "dt": 1635864197,
  "sys": {
    "type": 2,
    "id": 2012856,
    "country": "UA",
    "sunrise": 1635828661,
    "sunset": 1635863594
  },
  "timezone": 7200,
  "id": 712631,
  "name": "Kyiv",
  "cod": 200
};
},{}],"app.js":[function(require,module,exports) {
"use strict";

var _mock = _interopRequireDefault(require("./mock.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const API_KEY = '933492b29ee5a60be1e5534d8e5327f1';

const getWeatherFromAPI = _ref => {
  let {
    latitude,
    longitude
  } = _ref;
  return fetch("https://api.openweathermap.org/data/2.5/weather?lat=".concat(latitude, "&lon=").concat(longitude, "&appid=").concat(API_KEY)).then(response => response.json());
};

const getWeatherFromTestAPI = () => fetch("https://my-json-server.typicode.com/meelistenso/test/weather").then(response => response.json());

const getWeatherFromLocalFile = () => _mock.default;

const getCurrentPosition = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(pos => {
    const crd = pos.coords;
    resolve({
      latitude: crd.latitude,
      longitude: crd.longitude
    });
  }, err => {
    reject(err);
  }, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  });
});

const loadData = async source => {
  const position = await getCurrentPosition();
  let weather;

  switch (source) {
    case 'api':
      weather = await getWeatherFromAPI(position);
      break;

    case 'testApi':
      weather = await getWeatherFromTestAPI(position);
      break;

    case 'file':
      weather = await getWeatherFromLocalFile(position);
      break;
  }

  console.log(weather);
  return weather;
};

const KtoC = Ktemp => {
  const Ctemp = Ktemp - 273.15;
  return Math.round(Ctemp);
};

const render = async function render() {
  var _data$wind, _data$wind2, _data$sys, _data$sys2, _data$clouds, _data$main, _data$main2, _data$main3, _data$main4, _data$main5, _data$main6;

  let source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'api';
  const data = await loadData(source);
  const windContainer = document.getElementById('wind');
  const windDirectionContainer = document.getElementById('wind-direction'); // const rain = document.getElementById('rain');

  const sunrise = document.getElementById('sunrise');
  const sunset = document.getElementById('sunset');
  const clouds = document.getElementById('clouds');
  const location = document.getElementById('location');
  const feelsLike = document.getElementById('feels-like');
  const temp = document.getElementById('temp');
  const pressure = document.getElementById('pressure');
  const humidity = document.getElementById('humidity');
  const tempRange = document.getElementById('temp-range');
  windContainer.innerText = data === null || data === void 0 ? void 0 : (_data$wind = data.wind) === null || _data$wind === void 0 ? void 0 : _data$wind.speed;
  windDirectionContainer.style.transform = "rotate(".concat(data === null || data === void 0 ? void 0 : (_data$wind2 = data.wind) === null || _data$wind2 === void 0 ? void 0 : _data$wind2.deg, "deg)"); // rain.innerText = data?.rain["1h"];

  sunrise.innerText = new Date((data === null || data === void 0 ? void 0 : (_data$sys = data.sys) === null || _data$sys === void 0 ? void 0 : _data$sys.sunrise) * 1000).toLocaleTimeString();
  sunset.innerText = new Date((data === null || data === void 0 ? void 0 : (_data$sys2 = data.sys) === null || _data$sys2 === void 0 ? void 0 : _data$sys2.sunset) * 1000).toLocaleTimeString();
  clouds.innerText = data === null || data === void 0 ? void 0 : (_data$clouds = data.clouds) === null || _data$clouds === void 0 ? void 0 : _data$clouds.all;
  location.innerText = data === null || data === void 0 ? void 0 : data.name;
  feelsLike.innerText = KtoC(data === null || data === void 0 ? void 0 : (_data$main = data.main) === null || _data$main === void 0 ? void 0 : _data$main.feels_like);
  temp.innerText = KtoC(data === null || data === void 0 ? void 0 : (_data$main2 = data.main) === null || _data$main2 === void 0 ? void 0 : _data$main2.temp);
  pressure.innerText = data === null || data === void 0 ? void 0 : (_data$main3 = data.main) === null || _data$main3 === void 0 ? void 0 : _data$main3.pressure;
  humidity.innerText = data === null || data === void 0 ? void 0 : (_data$main4 = data.main) === null || _data$main4 === void 0 ? void 0 : _data$main4.humidity;
  tempRange.innerText = "".concat(KtoC(data === null || data === void 0 ? void 0 : (_data$main5 = data.main) === null || _data$main5 === void 0 ? void 0 : _data$main5.temp_min), " - ").concat(KtoC(data === null || data === void 0 ? void 0 : (_data$main6 = data.main) === null || _data$main6 === void 0 ? void 0 : _data$main6.temp_max));
};

const sourceSelect = document.getElementById('source-select');
console.log(sourceSelect);
sourceSelect.addEventListener('change', e => {
  const value = e.target.value;
  render(value);
});
render();
},{"./mock.json":"mock.json"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55323" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map