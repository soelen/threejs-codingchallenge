import { ThreeComponent, } from '../../src/three-component.js';
import { Color } from 'three';
import { Drop } from './Drop.js';

const  background = new Color( 'rgb( 230, 230, 250)' );

customElements.define( 'purplerain-component', class extends ThreeComponent {

    drops = []; 
    constructor( title, hash, width = 640, height = 360 ) {
        super( 'Purple Rain', 'KkyIDI6rQJI', width, height );
        this.renderer.setClearColor( background );
        for( let index = 0; index < 500; index++ ) {
            const drop = new Drop();
            this.drops.push( drop );
            this.scene.add( drop );
        }
        this.camera.position.z = 5;

        this.draw();
    }

    draw() {
        this.drops.forEach( drop => drop.fall() );
        super.draw();
    }

} );