import { ThreeComponent, } from '../../src/three-component.js';
import {
   PointLight, 
   Object3D,
} from 'three';

import { Box } from './Box.js';

customElements.define( 'mengersponge-component', class extends ThreeComponent {

    sponge = new Object3D();

    constructor( title, hash, width, height ) {
        super( 'Menger Sponge Fractal', 'LG8ZK-rRkXo', 400, 400 );

        this.camera.position.z = 10;

        this.scene.add( this.sponge );
        this.sponge.add( new Box() );

        this.light = new PointLight( 0xffffff, 2, 100 );
        this.light.position.set( 10, 0, 20 );
        this.scene.add( this.light );

        this.draw();

        this.addEventListener('click', this.onClick.bind( this ) );

    }

    onClick( event ) {
        let next = [];
        for( let box of this.sponge.children ) {
            const newBoxes = box.generate();
            next = next.concat( newBoxes )
        }

        this.sponge.children.forEach( box => this.sponge.remove( box ) );
        next.forEach( box => this.sponge.add( box ) );
        this.sponge.children = next;

    }

    draw() {
        this.sponge.children.forEach( box => box.draw() );
        this.sponge.rotation.x -= .01;

        super.draw();
    }

} );