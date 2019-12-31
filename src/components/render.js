import React from 'react';
import {Component} from 'react';
import * as THREE from 'three';
import {OrbitControls} from './OrbitControls';

export default class Render extends Component {
    constructor(props){
        super(props)
        this.props = {

        }
        this.UpdateHandler = this.UpdateHandler.bind(this);
        this.animate = this.animate.bind(this);
        this.renderScene = this.renderScene.bind(this);
        this.add_cube = this.add_cube.bind(this);
    }

    UpdateHandler () {
        this.add_cube()
      };
    add_cube () {

        const cube_vertices = {
            A1: { l: 0, w: 0, h: 0 },
            A2: { l: this.props.l, w: 0, h: 0 },
            A3: { l: 0, w: 0, h: this.props.h },
            A4: { l: this.props.l, w: 0, h: this.props.h },
            B1: { l: 0, w: this.props.w, h: 0 },
            B2: { l: this.props.l, w: this.props.w, h: 0 },
            B3: { l: 0, w: this.props.w, h: this.props.h },
            B4: { l: this.props.l, w: this.props.w, h: this.props.h }
            }  
        const triangle_vertices = [];
        //front
        triangle_vertices[0] = cube_vertices.A2; 
        triangle_vertices[1] = cube_vertices.B2;
        triangle_vertices[2] = cube_vertices.A4;
        triangle_vertices[3] = cube_vertices.B4;
        //right
        triangle_vertices[4] = cube_vertices.B3; 
        triangle_vertices[5] = cube_vertices.B4;
        triangle_vertices[6] = cube_vertices.B1;
        triangle_vertices[7] = cube_vertices.B2;
        //back
        triangle_vertices[8]  = cube_vertices.B1;
        triangle_vertices[9]  = cube_vertices.A1;
        triangle_vertices[10] = cube_vertices.B3;
        triangle_vertices[11] = cube_vertices.A3;
        //left
        triangle_vertices[12] = cube_vertices.A1;
        triangle_vertices[13] = cube_vertices.A2;
        triangle_vertices[14] = cube_vertices.A3;
        triangle_vertices[15] = cube_vertices.A4;
        //top
        triangle_vertices[16] = cube_vertices.B3;
        triangle_vertices[17] = cube_vertices.A3;
        triangle_vertices[18] = cube_vertices.B4;
        triangle_vertices[19] = cube_vertices.A4;
        //bottom
        triangle_vertices[20] = cube_vertices.B2;
        triangle_vertices[21] = cube_vertices.A2;
        triangle_vertices[22] = cube_vertices.B1;
        triangle_vertices[23] = cube_vertices.A1;

        let geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(triangle_vertices.length * 3);

        for (let i = 0; i < triangle_vertices.length; i++){
            positions[i * 3 ] = triangle_vertices[i].w; //x
            positions[i * 3 + 1] = triangle_vertices[i].h; //y
            positions[i * 3 + 2] = triangle_vertices[i].l; //z
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        geometry.setIndex([
            0,  1,  2,   2,  1,  3,  // front
            4,  5,  6,   6,  5,  7,  // right
            8,  9, 10,  10,  9, 11,  // back
            12, 13, 14,  14, 13, 15,  // left
            16, 17, 18,  18, 17, 19,  // top
            20, 21, 22,  22, 21, 23,  // bottom
        ]);

        geometry.computeVertexNormals();
        const geo = new THREE.EdgesGeometry(geometry);
        const material = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2})
        const cube = new THREE.LineSegments(geo, material);
        this.scene.add(cube);
        this.renderScene()
    }
    renderScene () {
        this.renderer.render( this.scene, this.camera );
    }
    animate () {
        window.requestAnimationFrame( this.animate );
        this.controls.update()
        this.renderScene()
    }
     componentDidMount () {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        //SCENE
        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xffffff );
        scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );

        {
            const color = 0xFFFFFF;
            const intensity = 1;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(1, 1, 1);
            scene.add(light);
        }

        //CAMERA
        const camera = new THREE.PerspectiveCamera( 27, width / height, 5, 3500 );
        camera.position.z = 50;
        camera.position.x = 10;

        //OBJECTS
        const axes = new THREE.AxesHelper(25);
        scene.add(axes);

        //RENDER
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( width, height );
        renderer.setPixelRatio( window.devicePixelRatio );

        //ASSIGN
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.mount.appendChild( this.renderer.domElement );

        //ORBIT CONTROLS
        const controls = new OrbitControls (this.camera, this.renderer.domElement)
        controls.enabled = true;
        controls.maxDistance = 1500;
        controls.minDistance = 1;

        this.controls = controls;
        
        window.addEventListener( 'resize', onWindowResize, false );
        //RESIZE
        function onWindowResize() {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize( width, height  );
        };
        
        this.renderScene();
        this.animate();
    }
    render () {
        return(
            <div className='render'>
                <div style={{ width: '350px', height: '350px' }} ref={ (mount) => {
        this.mount = mount;
      } }
           >
            </div>
                <button onClick= {this.UpdateHandler}>Render </button>
            </div>
        )
    }
}