import * as events from './events'
import { uuidAttr, ctxClassname, showClassname } from './constants'

const handler = e => {
	[].forEach.call(document.getElementsByClassName(ctxClassname), elem => {
		if (elem.classList.contains(showClassname)) {
			elem.classList.remove(showClassname)
			const evtname = elem.getAttribute(uuidAttr)
			events.trigger(evtname, e)
		}
	})
}
document.addEventListener('contextmenu', handler)
document.addEventListener('click', handler)