import {
    Object3D,
    Line,
    BufferGeometry,
    LineBasicMaterial,
    Color,
    Vector3,
} from 'three';

const  purple = new Color( 'rgb( 138, 43, 226)' );

class Drop extends Object3D {
    x =  Math.random() * 12 - 6;
    y =  Math.random() * 20 - 10;
    z =  Math.random() * 6 - 3;
    yspeed  = Math.random() * .3;
    len = Math.random() * -1 + .3;

    constructor() {
        super();
        this.position.set( this.x, this.y, this.z );
        this.add( new Line (
            new BufferGeometry().setFromPoints( [ new Vector3( 0, 0, 0 ), new Vector3( 0, this.len, 0 ) ] ),
            new LineBasicMaterial( { color: purple } ),
        ) );

    }

    fall() {
        this.position.y = this.position.y - this.yspeed;
        this.yspeed = this.yspeed + .01;

        if( this.position.y < - 10 ) {
            this.yspeed = Math.random() * .3;
            this.position.y = 10;
        }
    }

}

export default Drop;

export {
    Drop,
}