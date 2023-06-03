import "./main.css"

const init = () => {

	// Parameters

	const { innerWidth: width, innerHeight: height, devicePixelRatio: pixelRatio } = window

	// Offscreen

	const offscreen = document.querySelector( "canvas#scene" ).transferControlToOffscreen()

	// Worker

	const worker = new Worker( new URL( "./worker.js", import.meta.url ), { type: "module" } )

	// Message

	const message = { type: "init", canvas: offscreen, width, height, pixelRatio }

	// Post

	worker.postMessage( message, [ offscreen ] )
}

window.OffscreenCanvas && init()
