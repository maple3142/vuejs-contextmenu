<template>
	<div>
		<div ref="ctxmenu" class="ctxmenu">
			<slot name="ctxmenu" />
		</div>
		<slot ref="target" />
	</div>
</template>
<script>
export default {
	mounted() {
		const ctxmenu = this.$refs.ctxmenu
		this.$slots.default.map(vnode=>vnode.elm).filter(elm=>!!elm).forEach(el=>el.addEventListener('contextmenu', e => {
			e.preventDefault()
			e.stopPropagation()

			ctxmenu.style.top = e.y + 'px'
			ctxmenu.style.left = e.x + 'px'

			ctxmenu.classList.add('show')
		}))
	}
}
</script>
<style lang="less">
.ctxmenu {
  display: none;
  position: absolute;
  z-index: 99999;

  &.show {
    display: block !important;
  }
}
</style>
