(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.vuejsContextmenu = factory());
}(this, (function () { 'use strict';

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
		var ctxmenu = this.$refs.ctxmenu;
		this.$slots.default.map(function (vnode) {
			return vnode.elm;
		}).filter(function (elm) {
			return !!elm;
		}).forEach(function (el) {
			return el.addEventListener('contextmenu', function (e) {
				e.preventDefault();
				e.stopPropagation();

				ctxmenu.style.top = e.y + 'px';
				ctxmenu.style.left = e.x + 'px';

				ctxmenu.classList.add('show');
			});
		});
	}
};

document.addEventListener('contextmenu', function (e) {
	[].forEach.call(document.querySelectorAll('.ctxmenu'), function (elem) {
		elem.classList.remove('show');
	});
});
document.addEventListener('click', function (e) {
	[].forEach.call(document.querySelectorAll('.ctxmenu'), function (elem) {
		elem.classList.remove('show');
	});
});

return ctxmenu$1;

})));
