import {
    BoxGeometry,
    MeshDepthMaterial,
    MeshStandardMaterial,
    MeshBasicMaterial,
    Mesh,
    Object3D,
} from 'three';

class Box extends Mesh {

    constructor(x = 0, y = 0, z = 0, size = 5 ) {


        super(
            new BoxGeometry( size, size, size ),
            new MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 1 })
        );
        this.size = size;
        this.position.set( x, y, z );
    }

    generate() {
        const boxes = [];

        for( let x = -1; x < 2; x++ ) {
            for( let y = -1; y < 2; y++ ) {
                for( let z = -1; z < 2; z++ ) {

                    const sum = Math.abs( x ) + Math.abs( y ) + Math.abs( z );
                    const size = this.size / 3;
                    if( sum > 1 ) {

                        const box = new Box(
                            this.position.x + x * size,
                            this.position.y + y * size,
                            this.position.z + z * size,
                            size,
                        );
                        boxes.push( box );
                    }
                }
            }
        }

        return boxes;
    }

    draw() {
    }
}

export {
    Box,
}