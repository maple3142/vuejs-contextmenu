import ctxmenu from './contextmenu.vue'
export default ctxmenu

document.addEventListener('contextmenu', e => {
	[].forEach.call(document.querySelectorAll('.ctxmenu'), elem => {
		elem.classList.remove('show')
	})
})
document.addEventListener('click', e => {
	[].forEach.call(document.querySelectorAll('.ctxmenu'), elem => {
		elem.classList.remove('show')
	})
})