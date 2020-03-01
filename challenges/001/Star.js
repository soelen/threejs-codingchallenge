import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    Object3D,
} from 'three';

class Star extends Object3D {
    constructor() {

        super();

        const size = .1;
        this.randomPosition();


        this.cube = new Mesh(
            new BoxGeometry( size, size, size ),
            new MeshBasicMaterial( { color: 0xffffff } ),
        );
        this.add( this.cube );
    }
    
    randomPosition() {

        const multiplier = 10;

        this.position.set(
            Math.random() * (multiplier - ( - multiplier ) + 1) + ( - multiplier),
            Math.random() * (multiplier - ( - multiplier ) + 1) + ( - multiplier),
            Math.random() * (multiplier - ( - multiplier ) + 1) + ( - multiplier),
        )

    }

    update( speed = .1 ) {
        this.scale.set(
            this.position.z / 10,
            this.position.z / 10,
            this.position.z / 10,
        )
        this.position.z = this.position.z + speed;
        if( this.position.z > 10 ) {
            this.randomPosition();
        }
    }
    show() {

    }
}

export {
    Star,
}