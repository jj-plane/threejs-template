import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import dat from 'dat.gui'
import './style.css'

//Debug
const gui = new dat.GUI()

//Canvas
const canvas = document.querySelector('canvas.webgl')

//Scene
const scene = new THREE.Scene()

//Texture Loader
const textureLoader = new THREE.TextureLoader()

/*
    ROTATING BLOCK PLACEHOLDER
*/
const block = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        color: 'red'
    })
)
scene.add(block)

//Ambient Light
const ambientLight = new THREE.AmbientLight('#FFFFFF', 0.5)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('Ambient Light')
scene.add(ambientLight)

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 75)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//Renderer
const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))




//Animate
const clock = new THREE.Clock()

const tick = () => {

    //Get time
    const elapsedTime = clock.getElapsedTime()

    block.rotation.y = elapsedTime

    //Update controls
    controls.update()

    //Run renderer
    renderer.render(scene, camera)

    //Call tick again on next frame
    window.requestAnimationFrame(tick)
}

tick()