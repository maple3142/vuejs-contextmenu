//simple event system implements
const events = {}
export function register(name, callback) {
	if (!(name in events)) events[name] = []
	events[name].push(callback)
}
export function trigger(name, ...args) {
	if (name in events) {
		for (let i = 0; i < events[name].length; i++) {
			events[name][i](...args) //callback
		}
	}
}
