var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = commonjsGlobal.crypto || commonjsGlobal.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

var rngBrowser = rng;

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

var bytesToUuid_1 = bytesToUuid;

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rngBrowser)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid_1(rnds);
}

var v4_1 = v4;

//simple event system implements
var events = {};
function register(name, callback) {
	if (!(name in events)) events[name] = [];
	events[name].push(callback);
}
function trigger(name) {
	for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		args[_key - 1] = arguments[_key];
	}

	if (name in events) {
		events[name].forEach(function (callback) {
			return callback.apply(undefined, args);
		});
	}
}

var uuidAttr = 'data-uuid';
var ctxClassname = 'ctxmenu';
var showClassname = 'show';

(function () {
	if (typeof document !== 'undefined') {
		var head = document.head || document.getElementsByTagName('head')[0],
		    style = document.createElement('style'),
		    css = ".ctxmenu { display: none; position: absolute; z-index: 99999; } .ctxmenu.show { display: block !important; } ";style.type = 'text/css';if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}head.appendChild(style);
	}
})();

var ctxmenu$1 = { render: function render() {
		var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_c('div', { ref: "ctxmenu", staticClass: "ctxmenu" }, [_vm._t("ctxmenu")], 2), _vm._v(" "), _vm._t("default")], 2);
	}, staticRenderFns: [],
	mounted: function mounted() {
		var _this = this;

		var ctxmenu = this.$refs.ctxmenu;
		var uuid = v4_1(); //use uuid to identify which ctxmenu is closed
		ctxmenu.setAttribute(uuidAttr, uuid);
		register(uuid, function (e) {
			//uuid as event name
			_this.$emit('close', e);
		});

		this.$slots.default.forEach(function (vnode) {
			if (!vnode.elm) return;

			vnode.elm.addEventListener('contextmenu', function (e) {

				e.preventDefault();
				e.stopPropagation();

				//move element and show it
				ctxmenu.style.top = e.y + 'px';
				ctxmenu.style.left = e.x + 'px';
				ctxmenu.classList.add(showClassname);

				_this.$emit('open', e);
			});
		});
	}
};

var handler = function handler(e) {
	[].forEach.call(document.getElementsByClassName(ctxClassname), function (elem) {
		if (elem.classList.contains(showClassname)) {
			elem.classList.remove(showClassname);
			var evtname = elem.getAttribute(uuidAttr);
			trigger(evtname, e);
		}
	});
};
document.addEventListener('contextmenu', handler);
document.addEventListener('click', handler);

export default ctxmenu$1;
