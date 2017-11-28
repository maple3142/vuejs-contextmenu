import * as events from './events'
import { uuidAttr, ctxClassname, showClassname } from './constants'

function handler(e) {
	const ctxmenus = document.getElementsByClassName(ctxClassname)
	for (let i = 0; i < ctxmenus.length; i++) {
		const elem = ctxmenus[i]
		if (elem.classList.contains(showClassname)) {
			elem.classList.remove(showClassname)
			const evtname = elem.getAttribute(uuidAttr)
			events.trigger(evtname, e)
		}
	}
}
document.addEventListener('contextmenu', handler)
document.addEventListener('click', handler)