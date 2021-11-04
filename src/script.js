import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const axisHelper = new THREE.AxesHelper()
scene.add(axisHelper)
/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({color: '#ff0000'})
)
object1.position.x = -2

const object2 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({color: '#ff0000'})
)

const object3 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({color: '#ff0000'})
)
object3.position.x = 2

scene.add(object1, object2, object3)
//raycaster

const rayCaster = new THREE.Raycaster()
// const rayOrigin = new THREE.Vector3(-3, 0, 0);
// const rayDirection = new THREE.Vector3(10, 0, 0);
//
// rayDirection.normalize()
// rayCaster.set(rayOrigin,rayDirection)
//
// const intersect = rayCaster.intersectObject(object1)
// const intersects = rayCaster.intersectObjects([object1,object2,object3])


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / sizes.width - .5) * 2;
    mouse.y = -((e.clientY / sizes.height - .5) * 2);
})
window.addEventListener('click', (e) => {
    if (currentIntersect) {

        console.log('click on ')
        const currentObj = scene.children.find(el=> el.uuid === currentIntersect.object.uuid);
        console.log( currentObj.material.color)
        currentObj.material.color.set('green')

    }
})
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let currentIntersect = null;

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    object1.position.y = Math.sin(elapsedTime) * 1.5
    object2.position.y = Math.cos(elapsedTime) * 2
    object3.position.y = Math.sin(elapsedTime) * .3


    // const rayOrigin = new THREE.Vector3(-3, 0, 0)
    // const rayDirection = new THREE.Vector3(1, 0, 0)
    //
    // rayDirection.normalize()
    //
    // rayCaster.set(rayOrigin, rayDirection)
    //

    rayCaster.setFromCamera(mouse, camera)
    const objToTest = [object1, object2, object3];
    const intersects = rayCaster.intersectObjects(objToTest)


    // for (const object of objToTest) {
    //     object.material.color.set('red')
    // }

    for (const intersect of intersects) {
        // intersect.object.material.color.set('blue')
    }
    if (intersects.length) {
        if (currentIntersect === null) {
            console.log('mouseon')
            currentIntersect = intersects[0]
            console.log(currentIntersect.object.uuid)
        }
    } else {

        if (currentIntersect) {
            console.log('leave')
            currentIntersect = null;
        }
    }
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()