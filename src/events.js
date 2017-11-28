//simple event system implements
const events = {}
export function register(name, callback) {
	if (!(name in events)) events[name] = []
	events[name].push(callback)
}
export function trigger(name, ...args) {
	if (name in events) {
		events[name].forEach(callback => callback(...args))
	}
}