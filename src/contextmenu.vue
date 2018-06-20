<template>
	<div>
		<div ref="ctxmenu"
		     class="ctxmenu">
			<slot name="ctxmenu" />
		</div>
		<slot ref="target" />
	</div>
</template>
<script>
import v4 from 'uuid/v4'
import * as events from './events'
import { uuidAttr, showClassname } from './constants'
import { handler as closeHandler } from './close'

export default {
	mounted() {
		const ctxmenu = this.$refs.ctxmenu
		const uuid = v4() //use uuid to identify which ctxmenu is closed
		ctxmenu.setAttribute(uuidAttr, uuid)
		events.register(uuid, e => {
			//uuid as event name
			this.$emit('close', e)
		})

		for (let i = 0; i < this.$slots.default.length; i++) {
			const vnode = this.$slots.default[i]
			if (!vnode.elm) continue

			vnode.elm.addEventListener('contextmenu', e => {
				e.preventDefault()
				e.stopPropagation()

				//handle close others
				closeHandler(e)
				//move element and show it
				ctxmenu.style.top = e.y + 'px'
				ctxmenu.style.left = e.x + 'px'
				ctxmenu.classList.add(showClassname)

				this.$emit('open', e)
			})
		}
	}
}
</script>
<style lang="less" scoped>
.ctxmenu {
	display: none;
	position: absolute;
	z-index: 99999;

	&.show {
		display: block !important;
	}
}
</style>
