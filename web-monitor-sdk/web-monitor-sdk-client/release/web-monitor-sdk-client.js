(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}((function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var webMonitorSdkCore_min = createCommonjsModule(function (module, exports) {
	  !function (e, r) {
	     module.exports = r() ;
	  }(commonjsGlobal, function () {

	    function e(r) {
	      return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
	        return typeof e;
	      } : function (e) {
	        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	      })(r);
	    }

	    function r(e, r) {
	      if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
	    }

	    function t(e, r) {
	      for (var t = 0; t < r.length; t++) {
	        var o = r[t];
	        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
	      }
	    }

	    function o(e, r, o) {
	      return r && t(e.prototype, r), o && t(e, o), e;
	    }

	    function n(e, r, t) {
	      return r in e ? Object.defineProperty(e, r, {
	        value: t,
	        enumerable: !0,
	        configurable: !0,
	        writable: !0
	      }) : e[r] = t, e;
	    }

	    function i(e, r) {
	      var t = Object.keys(e);

	      if (Object.getOwnPropertySymbols) {
	        var o = Object.getOwnPropertySymbols(e);
	        r && (o = o.filter(function (r) {
	          return Object.getOwnPropertyDescriptor(e, r).enumerable;
	        })), t.push.apply(t, o);
	      }

	      return t;
	    }

	    function s(e) {
	      for (var r = 1; r < arguments.length; r++) {
	        var t = null != arguments[r] ? arguments[r] : {};
	        r % 2 ? i(Object(t), !0).forEach(function (r) {
	          n(e, r, t[r]);
	        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : i(Object(t)).forEach(function (r) {
	          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
	        });
	      }

	      return e;
	    }

	    function a(e) {
	      return (a = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
	        return e.__proto__ || Object.getPrototypeOf(e);
	      })(e);
	    }

	    function c(e, r) {
	      return (c = Object.setPrototypeOf || function (e, r) {
	        return e.__proto__ = r, e;
	      })(e, r);
	    }

	    function u(e, r) {
	      return !r || "object" != typeof r && "function" != typeof r ? function (e) {
	        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	        return e;
	      }(e) : r;
	    }

	    function f(e) {
	      var r = function () {
	        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
	        if (Reflect.construct.sham) return !1;
	        if ("function" == typeof Proxy) return !0;

	        try {
	          return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
	        } catch (e) {
	          return !1;
	        }
	      }();

	      return function () {
	        var t,
	            o = a(e);

	        if (r) {
	          var n = a(this).constructor;
	          t = Reflect.construct(o, arguments, n);
	        } else t = o.apply(this, arguments);

	        return u(this, t);
	      };
	    }

	    var l = "error",
	        p = "JS_ERROR",
	        d = "RESOURCE_LOAD_ERROR",
	        h = "HTTP_ERROR",
	        y = "CUSTOM_ERROR",
	        v = "none",
	        g = "cellular",
	        b = "slow-2g",
	        w = function () {
	      var e = navigator.connection,
	          r = "";

	      if (e && e.type) {
	        var t = e.type;
	        r = t === v ? "disconnected" : t === g ? e.effectiveType === b ? "2g" : e.effectiveType : t;
	      }

	      return r;
	    },
	        m = {
	      projectIdentifier: "",
	      captureJsError: !0,
	      captureResourceError: !0,
	      captureAjaxError: !0,
	      captureConsoleError: !1,
	      isAutoUpload: !0
	    },
	        E = function (e) {
	      !function (e, r) {
	        if ("function" != typeof r && null !== r) throw new TypeError("Super expression must either be null or a function");
	        e.prototype = Object.create(r && r.prototype, {
	          constructor: {
	            value: e,
	            writable: !0,
	            configurable: !0
	          }
	        }), r && c(e, r);
	      }(n, e);
	      var t = f(n);

	      function n(e, o) {
	        var i;
	        return r(this, n), (i = t.call(this, e)).handleMehod = o, i;
	      }

	      return o(n, [{
	        key: "push",
	        value: function (e) {
	          if (this.pool.length < this.capacity) {
	            var r = {
	              JS_ERROR: "errorMessage",
	              RESOURCE_LOAD_ERROR: "resourceUrl",
	              HTTP_ERROR: "httpUrlComplete",
	              CUSTOM_ERROR: "errorMessage"
	            }[e.logType],
	                t = this.pool.find(function (t) {
	              return t[r] === e[r];
	            });
	            t ? t.concurrency++ : (e.concurrency = 1, this.pool.push(e));
	          } else this.flush();
	        }
	      }, {
	        key: "pop",
	        value: function (e) {
	          "function" == typeof this.handleMehod && this.handleMehod(e);
	        }
	      }]), n;
	    }(function () {
	      function e(t) {
	        if (r(this, e), "number" != typeof t) throw new Error("[error]WebMonitorSdkCore->BufferPool: capacity is not legal!");
	        if (t < 1) throw new Error("[error]WebMonitorSdkCore->BufferPool: capacity should not less than 0!");
	        this.pool = [], this.capacity = t;
	      }

	      return o(e, [{
	        key: "push",
	        value: function (e) {}
	      }, {
	        key: "pop",
	        value: function (e) {}
	      }, {
	        key: "flush",
	        value: function () {
	          var e = this;
	          this.pool.forEach(function (r) {
	            e.pop(r);
	          }), this.clear();
	        }
	      }, {
	        key: "clear",
	        value: function () {
	          this.pool = [];
	        }
	      }]), e;
	    }()),
	        O = function () {
	      var e = {},
	          r = navigator.userAgent,
	          t = r.match(/(Android);?[\s\/]+([\d.]+)?/),
	          o = r.match(/(iPad).*OS\s([\d_]+)/),
	          n = r.match(/(iPod)(.*OS\s([\d_]+))?/),
	          i = !o && r.match(/(iPhone\sOS)\s([\d_]+)/),
	          s = r.match(/Android\s[\S\s]+Build\//);

	      if (e.ios = e.android = e.iphone = e.iPad = e.androidChrome = !1, e.isWeixin = /MicroMessenger/i.test(r), e.os = "web", e.deviceName = "PC", t && (e.os = "android", e.osVersion = t[2], e.android = !0, e.androidChrome = r.toLowerCase().indexOf("chrome") >= 0), (o || i || n) && (e.os = "ios", e.ios = !0), i && !n && (e.osVersion = i[2].replace(/_/g, "."), e.iphone = !0), o && (e.osVersion = o[2].replace(/_/g, "."), e.iPad = !0), n && (e.osVersion = n[3] ? n[3].replace(/_/g, ".") : null, e.iphone = !0), e.ios && e.osVersion && r.indexOf("Version/") >= 0 && "10" === e.osVersion.split(".")[0] && (e.osVersion = r.toLowerCase().split("version/")[1].split(" ")[0]), e.iphone) {
	        e.deviceName = "iphone";
	        var a = window.screen.width,
	            c = window.screen.height;
	        320 === a && 480 === c ? e.deviceName = "iphone 4" : 320 === a && 568 === c ? e.deviceName = "iphone 5/SE" : 375 === a && 667 === c ? e.deviceName = "iphone 6/7/8" : 414 === a && 736 === c ? e.deviceName = "iphone 6/7/8 Plus" : 375 === a && 812 === c && (e.deviceName = "iphone X/S/Max");
	      } else if (e.iPad) e.deviceName = "iPad";else if (s) {
	        var u = s[0].split(";")[1].replace(/Build\//g, "");
	        e.deviceName = u.replace(/(^\s*)|(\s*$)/g, "");
	      }

	      if (-1 === r.indexOf("Mobile")) {
	        var f = navigator.userAgent.toLowerCase();

	        if (e.browserName = "Unknown", f.indexOf("msie") > 0) {
	          var l = f.match(/msie [\d.]+;/gi)[0];
	          e.browserName = l.split("/")[0], e.browserVersion = l.split("/")[1];
	        }

	        if (f.indexOf("firefox") > 0) {
	          var p = f.match(/firefox\/[\d.]+/gi)[0];
	          e.browserName = p.split("/")[0], e.browserVersion = p.split("/")[1];
	        }

	        if (f.indexOf("safari") > 0 && f.indexOf("chrome") < 0) {
	          var d = f.match(/safari\/[\d.]+/gi)[0];
	          e.browserName = d.split("/")[0], e.browserVersion = d.split("/")[1];
	        }

	        if (f.indexOf("chrome") > 0) {
	          var h = f.match(/chrome\/[\d.]+/gi)[0];
	          e.browserName = h.split("/")[0], e.browserVersion = h.split("/")[1];
	        }
	      }

	      return e.webView = (i || o || n) && r.match(/.*AppleWebKit(?!.*Safari)/i), e;
	    }(),
	        j = function () {
	      var e,
	          r,
	          t,
	          o,
	          n,
	          i,
	          a,
	          c,
	          u = window.returnCitySN || {},
	          f = {
	        happenTime: (e = function (e) {
	          return ("00" + e).substr(-2);
	        }, r = new Date(), t = r.getFullYear(), o = e(r.getMonth() + 1), n = e(r.getDate()), i = e(r.getHours()), a = e(r.getMinutes()), c = e(r.getSeconds()), "".concat(t, "-").concat(o, "-").concat(n, " ").concat(i, ":").concat(a, ":").concat(c)),
	        deviceName: O.deviceName,
	        os: O.os,
	        osVersion: O.osVersion,
	        browserName: O.browserName,
	        browserVersion: O.browserVersion,
	        netType: w(),
	        ipAddress: u.cip,
	        address: u.cname
	      },
	          l = function () {
	        var e = "",
	            r = "";

	        if (window && window.location) {
	          var t = window.location,
	              o = t.href,
	              n = t.hash,
	              i = t.pathname;
	          e = o, r = n || i;
	        }

	        return {
	          pageUrl: e,
	          pageKey: r
	        };
	      }();

	      return s(s({}, f), l);
	    },
	        R = function (e, r, t, o) {
	      return s(s({}, j()), {}, {
	        projectIdentifier: e,
	        logType: p,
	        errorType: r,
	        errorMessage: t,
	        errorStack: o,
	        level: l
	      });
	    };

	    return function () {
	      function t() {
	        var e;
	        r(this, t), (e = document.createElement("script")).type = "text/javascript", e.src = "http://pv.sohu.com/cityjson?ie=utf-8", e.onload = function () {
	          e.parentNode.removeChild(e), e = null;
	        }, document.body.append(e);
	      }

	      return o(t, [{
	        key: "init",
	        value: function (e) {
	          if (this.config = s(s({}, m), e), this.config.isEnableBuffer) {
	            var r = this.config.bufferCapacity || 10;
	            this.bufferPool = new E(r, this.config.errorHandler);
	          }

	          this.config.captureJsError && (this.handleJsError(this.config), this.handlePromiseRejectError(this.config)), this.config.captureResourceError && this.handleResourceError(this.config), this.config.captureAjaxError && this.handleAjaxError(this.config), this.config.captureConsoleError && this.handleConsoleError(this.config);
	        }
	      }, {
	        key: "handleJsError",
	        value: function (e) {
	          var r = this;

	          window.onerror = function (t, o, n, i, s) {
	            var a = "",
	                c = "",
	                u = "";
	            s && s instanceof Error ? (a = s.name || "", c = s.message || t || "", u = s.stack || "") : (a = "Others", c = t || "", u = "");
	            var f = R(e.projectIdentifier, a, c, u);
	            e.isEnableBuffer ? r.bufferPool.push(f) : e.isAutoUpload && e.errorHandler(f);
	          };
	        }
	      }, {
	        key: "handlePromiseRejectError",
	        value: function (r) {
	          var t = this;

	          window.onunhandledrejection = function (o) {
	            var n = "",
	                i = "";
	            "object" === e(o.reason) ? (n = o.reason.message, i = o.reason.stack) : (n = o.reason, i = "");
	            var s = R(r.projectIdentifier, "UncaughtInPromiseError", n, i);
	            r.isEnableBuffer ? t.bufferPool.push(s) : r.isAutoUpload && r.errorHandler(s);
	          };
	        }
	      }, {
	        key: "handleResourceError",
	        value: function (e) {
	          var r = this;
	          window.addEventListener("error", function (t) {
	            var o = t.target || t.srcElement;

	            if (o instanceof HTMLScriptElement || o instanceof HTMLLinkElement || o instanceof HTMLImageElement) {
	              var n = t.target.localName,
	                  i = "";
	              "link" === n ? i = t.target.href : ("script" === n || "img" === n) && (i = t.target.src);
	              var a = s(s({}, j()), {}, {
	                projectIdentifier: e.projectIdentifier,
	                logType: d,
	                resourceUrl: i,
	                resourceType: n,
	                status: "0",
	                level: l
	              });
	              e.isEnableBuffer ? r.bufferPool.push(a) : e.isAutoUpload && e.errorHandler(a);
	            }
	          }, !0);
	        }
	      }, {
	        key: "handleAjaxError",
	        value: function (e) {
	          var r = this;

	          if (window.fetch) {
	            var t = window.fetch;

	            window.fetch = function () {
	              var o = arguments;
	              return t.apply(this, arguments).then(function (t) {
	                if (!t.ok) {
	                  var n = s(s({}, j()), {}, {
	                    projectIdentifier: e.projectIdentifier,
	                    logType: h,
	                    httpUrlComplete: o[0],
	                    httpUrlShort: o[0],
	                    status: t,
	                    statusText: t,
	                    level: l
	                  });
	                  e.isEnableBuffer ? r.bufferPool.push(n) : e.isAutoUpload && e.errorHandler(n);
	                }

	                return t;
	              }).catch(function (t) {
	                var n = s(s({}, j()), {}, {
	                  projectIdentifier: e.projectIdentifier,
	                  logType: h,
	                  httpUrlComplete: o[0],
	                  httpUrlShort: o[0],
	                  status: t.message,
	                  statusText: t.stack,
	                  level: l
	                });
	                e.isEnableBuffer ? r.bufferPool.push(n) : e.isAutoUpload && e.errorHandler(n);
	              });
	            };
	          }

	          if (window.XMLHttpRequest) {
	            var o = window.XMLHttpRequest,
	                n = o.prototype.open,
	                i = o.prototype.send,
	                a = function (t) {
	              if (t && t.currentTarget && 200 !== t.currentTarget.status) {
	                var o = s(s({}, j()), {}, {
	                  projectIdentifier: e.projectIdentifier,
	                  logType: h,
	                  httpUrlComplete: t.target.responseURL || this._url,
	                  httpUrlShort: t.target.response || this._url,
	                  status: t.target.status,
	                  statusText: t.target.statusText,
	                  level: l
	                });
	                e.isEnableBuffer ? r.bufferPool.push(o) : e.isAutoUpload && e.errorHandler(o);
	              }
	            };

	            o.prototype.open = function (e, r) {
	              this._url = r;

	              for (var t = arguments.length, o = new Array(t > 2 ? t - 2 : 0), i = 2; i < t; i++) o[i - 2] = arguments[i];

	              return n.apply(this, [e, r].concat(o));
	            }, o.prototype.send = function () {
	              if (this.addEventListener) this.addEventListener("error", a), this.addEventListener("load", a), this.addEventListener("abort", a);else {
	                var e = this.onreadystatechange;

	                this.onreadystatechange = function (r) {
	                  4 === this.readyState && a(r), e && e.apply(this, arguments);
	                };
	              }
	              return i.apply(this, arguments);
	            };
	          }
	        }
	      }, {
	        key: "handleConsoleError",
	        value: function (e) {
	          if (window.console && window.console.error) {
	            var r = window.console.error,
	                t = this;

	            window.console.error = function (o) {
	              var n = arguments[0] && arguments[0].message || o,
	                  i = arguments[0] && arguments[0].stack,
	                  a = s(s({}, j()), {}, {
	                projectIdentifier: e.projectIdentifier,
	                logType: y,
	                errorType: y,
	                errorMessage: n,
	                errorStack: i
	              });
	              return e.isEnableBuffer ? t.bufferPool.push(a) : e.isAutoUpload && e.errorHandler(a), r.apply(window.console, arguments);
	            };
	          }
	        }
	      }, {
	        key: "setIsAutoUpload",
	        value: function (e) {
	          this.config.isAutoUpload = !!e;
	        }
	      }]), t;
	    }();
	  });
	});

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

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

	/**
	 * 从script标签中获取项目信息
	 * @param {Function} success 
	 */
	var getParamsFromScript = function getParamsFromScript(success) {
	  var scriptDom = document.getElementById('web-monitor-sdk');

	  if (!scriptDom) {
	    return console.error('[error]web-monitor-sdk: 无法找到script标签！');
	  }

	  var url = scriptDom.getAttribute('src');
	  var paramsArr = url.split('?');

	  if (paramsArr.length < 2) {
	    return console.error('[error]web-monitor-sdk: script标签缺少参数！');
	  } // 获取参数


	  var pidItem = paramsArr[1].split('&').map(function (item) {
	    var temp = item.split('=');

	    if (temp.length > 1) {
	      return _defineProperty({}, temp[0], temp[1]);
	    }
	  }).find(function (item) {
	    return item['key'];
	  });

	  if (!pidItem) {
	    return console.error('[error]web-monitor-sdk: script标签参数错误！');
	  }

	  success && typeof success === 'function' && success(pidItem['key']);
	};

	var HttpClient = /*#__PURE__*/function () {
	  function HttpClient(config) {
	    _classCallCheck(this, HttpClient);

	    this.config = config;
	    this.setXmlHttp();
	  }

	  _createClass(HttpClient, [{
	    key: "setXmlHttp",
	    value: function setXmlHttp() {
	      var xmlHttp = null;

	      if (window.XMLHttpRequest) {
	        xmlHttp = new XMLHttpRequest();
	      } else if (window.ActiveXObject) {
	        // IE5 and IE6
	        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
	      }

	      if (xmlHttp === null) {
	        console.error('[error]web-monitor-client: 客户端不支持xmlHttp');
	        return;
	      }

	      this.xmlHttp = xmlHttp;
	    }
	  }, {
	    key: "fetch",
	    value: function fetch(option) {
	      var _this = this;

	      return new Promise(function (resolve, reject) {
	        var xmlHttp = _this.xmlHttp;
	        var _this$config$baseUrl = _this.config.baseUrl,
	            baseUrl = _this$config$baseUrl === void 0 ? '' : _this$config$baseUrl;
	        var _option$method = option.method,
	            method = _option$method === void 0 ? 'GET' : _option$method,
	            url = option.url,
	            _option$params = option.params,
	            params = _option$params === void 0 ? {} : _option$params,
	            _option$async = option.async,
	            async = _option$async === void 0 ? true : _option$async;
	        method = method.toUpperCase();

	        if (method == 'GET') {
	          // 处理GET请求URL
	          var getUrl = url;
	          getUrl += '?';

	          for (var key in params) {
	            getUrl += key + '=' + params[key] + '&';
	          }

	          getUrl = getUrl.substring(0, getUrl.length - 1);
	          xmlHttp.open('GET', baseUrl + getUrl, async);
	          xmlHttp.send(null);
	        }

	        if (method == 'POST') {
	          xmlHttp.open('POST', baseUrl + url, async);
	          xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	          xmlHttp.send(params);
	        }

	        xmlHttp.onreadystatechange = function () {
	          if (xmlHttp.readyState === 4) {
	            var res = JSON.parse(xmlHttp.responseText);

	            if (xmlHttp.status === 200) {
	              if (res) {
	                resolve(res);
	              } else {
	                reject(res);
	              }
	            } else {
	              reject(res);
	            }
	          }
	        };
	      });
	    }
	  }]);

	  return HttpClient;
	}();

	// 后台地址【上线前需修改此处】
	var baseUrl = 'http://localhost:6001';

	var httpClient = new HttpClient({
	  baseUrl: baseUrl
	});

	/**
	 * 根据projectIdentifier获取项目信息
	 * @param {Function} success 
	 */

	var getByProjectIdentifier = /*#__PURE__*/function () {
	  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(projectIdentifier, successCallback) {
	    var result, success, data;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.prev = 0;
	            _context.next = 3;
	            return httpClient.fetch({
	              method: 'GET',
	              url: '/project/getByProjectIdentifier',
	              params: {
	                projectIdentifier: projectIdentifier
	              }
	            });

	          case 3:
	            result = _context.sent;
	            // console.log('result', result);
	            success = result.success, data = result.data;

	            if (success) {
	              typeof successCallback === 'function' && successCallback(data);
	            } else {
	              console.error('[error]web-monitor-sdk: getByProjectIdentifier', result);
	            }

	            _context.next = 11;
	            break;

	          case 8:
	            _context.prev = 8;
	            _context.t0 = _context["catch"](0);
	            console.error('[error]web-monitor-sdk: getByProjectIdentifier', _context.t0);

	          case 11:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee, null, [[0, 8]]);
	  }));

	  return function getByProjectIdentifier(_x, _x2) {
	    return _ref.apply(this, arguments);
	  };
	}();

	getParamsFromScript(function (projectIdentifier) {
	  getByProjectIdentifier(projectIdentifier, function (res) {
	    var projectIdentifier = res.projectIdentifier,
	        activeFuncs = res.activeFuncs,
	        isAutoUpload = res.isAutoUpload;
	    var funcs = activeFuncs.length ? activeFuncs.split(',') : [];

	    var checkEnabled = function checkEnabled(funcName) {
	      return funcs.indexOf(funcName) > -1;
	    };

	    var monitor = new webMonitorSdkCore_min();
	    var config = {
	      projectIdentifier: projectIdentifier,
	      captureJsError: checkEnabled('jsError'),
	      captureResourceError: checkEnabled('ResourceLoadError'),
	      captureAjaxError: checkEnabled('httpError'),
	      captureConsoleError: checkEnabled('customError'),
	      isAutoUpload: isAutoUpload,
	      // if true, monitor will call errorHandler automatically
	      isEnableBuffer: false,
	      // if true, monitor will create a buffer pool and save the concurrency info
	      bufferCapacity: 10,
	      // the capacity of buffer pool
	      errorHandler: function errorHandler(data) {
	        // something to do with data
	        console.log('[log]web-monitor-sdk', data);
	      }
	    };
	    monitor.init(config);
	    console.log('[log]web-monitor-sdk', '开启成功');
	  });
	});

})));
