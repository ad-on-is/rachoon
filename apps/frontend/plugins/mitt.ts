import mitt from 'mitt'

export default defineNuxtPlugin(() => {
	const emitter = mitt()
	return {
		provide: { emit: emitter.emit, on: emitter.on },
	}
})
