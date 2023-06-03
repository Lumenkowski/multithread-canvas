import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	BoxGeometry,
	MeshNormalMaterial,
	Mesh,
} from "three"

import { EventEmitter } from "./EventEmitter"

// Application

const app = {
	scene: null,
	camera: null,
	renderer: null,
}

// Runtime

const runtime = new EventEmitter()

runtime.on( "init", data => {

	// Scene

	app.scene = new Scene()

	// Camera

	app.camera = new PerspectiveCamera( 45, data.width / data.height, 1, 100 )

	app.camera.position.set( 2, 2, 2 )
	app.camera.lookAt( 0, 0, 0 )

	// Renderer

	if ( !data.canvas.style ) {

		data.canvas.style = { width: 0, height: 0 } // Important!
	}

	app.renderer = new WebGLRenderer( { alpha: true, antialias: true, canvas: data.canvas } )

	app.renderer.setSize( data.width, data.height )

	// Game World

	{
		const geometry = new BoxGeometry()
		const material = new MeshNormalMaterial()
		const mesh = new Mesh( geometry, material )
		app.scene.add( mesh )
	}

	// XRFrame

	app.renderer.setAnimationLoop( () => app.renderer.render( app.scene, app.camera ) )
} )

// Listen events

self.onmessage = e => runtime.emit( e.data.type, e.data )
