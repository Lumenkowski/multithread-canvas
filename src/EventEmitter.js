class EventEmitter {

	#eventTarget = new EventTarget()
	#eventDispatchArgs = {}

	constructor() {}

	on( type, cb ) {

		const dispatchArgs = this.#eventDispatchArgs

		this.#eventTarget.addEventListener( type, () => cb.call( null, ...dispatchArgs[ type ] ) )

		return this
	}

	emit( type, ...args ) {

		this.#eventDispatchArgs[ type ] = args
		this.#eventTarget.dispatchEvent( new Event( type ) )
	}
}

export {
	EventEmitter,
}
