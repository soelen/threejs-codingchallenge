import {
    Object3D,
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry,
    MathUtils,
    Vector3,
} from 'three';

import { red } from '../../src/monokai.js';

class Food extends Object3D {

    scl;
    constructor( size, grid ) {
        super();

        this.size = size;
        this.grid = grid;
        this.scl = size / grid;

        const plane = new Mesh(
            new PlaneGeometry( this.scl, this.scl ),
            new MeshBasicMaterial({ color: red })
        );
        // this.position.set( this.scl / 2, this.scl / 2, 0);
        plane.rotation.set( 0,0, MathUtils.degToRad( 180 ), 0, 0 );

        this.add( plane );
        this.pickLocation();

    }

    pickLocation() {
        this.position.set (
            Math.floor( Math.random() * ( this.grid / 2 - this.grid / - 2 ) - this.grid / 2) * this.scl + this.scl / 2,
            Math.floor( Math.random() * ( this.grid / 2 - this.grid / - 2 ) - this.grid / 2) * this.scl + this.scl / 2,
            0,
        );
    }

    draw() {
    }
}

export default Food;

export {
    Food,
}