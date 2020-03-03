import {
    Object3D,
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry,
    MathUtils,
} from 'three';

import { foreground } from '../../src/monokai.js';

class Snake extends Object3D {
    xspeed = 1;
    yspeed = 0;
    total = 0;
    tail = [];

    constructor( size, grid ) {
        super();
        this.size = size;
        this.grid = grid;
        this.scl = size / grid;

        this.head = new Mesh(
            new PlaneGeometry( this.scl, this.scl ),
            new MeshBasicMaterial({ color: foreground })
        );
        this.head.position.set( this.scl / 2, this.scl / 2, 0);

        this.add( this.head );

    }

    death() {
        for ( let bodypart of this.tail ) {

            if( bodypart.position.x === this.head.position.x && bodypart.position.y === this.head.position.y ) {
                this.tail.forEach( bodypart => this.remove( bodypart ) );
                this.tail = [];
                return true;
            }
        }
    }

    dir( xspeed, yspeed ) {
        this.xspeed = xspeed;
        this.yspeed = yspeed;
    }

    eat( food ) {
        if( food.position.x === this.head.position.x && food.position.y === this.head.position.y ) {
            food.pickLocation();
            const bodypart = new Mesh(
                new PlaneGeometry( this.scl, this.scl ),
                new MeshBasicMaterial( { color: foreground } ),
            );

            bodypart.position.set( this.head.position.x, this.head.position.y, this.head.position.z );
            this.add( bodypart );
            this.tail.unshift( bodypart );
        }

    }

    draw() {
        for( let index = 0; index < this.tail.length ; index++ ) {
            const before = this.tail[ index + 1 ]; 
            if( !before ) {
                this.tail[ index ].position.set( this.head.position.x, this.head.position.y, this.head.position.z );
            } else {
                this.tail[ index ].position.set( before.position.x, before.position.y, before.position.z );
            }
        }

        const nextX = this.head.position.x + this.xspeed * this.scl;
        const nextY = this.head.position.y + this.yspeed * this.scl;
        const x = nextX < this.size / 2 && nextX > - this.size / 2 ? nextX : this.head.position.x;
        const y = nextY < this.size / 2 && nextY > - this.size / 2 ? nextY : this.head.position.y;
        
        this.head.position.set( x, y, 0 );
    }
}

export default Snake;

export {
    Snake,
}