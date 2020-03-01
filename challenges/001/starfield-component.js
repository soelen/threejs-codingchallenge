import { ThreeComponent, } from '../../src/three-component.js';
import { Star, } from './Star.js';

customElements.define( 'starfield-component', class extends ThreeComponent {
    stars = [];

    constructor( title, hash, width, height ) {
        super( 'Starfield', '17WoOqgXsRM', 600, 600 );

        this.camera.position.z = 10;
        for( let index = 0; index < 600; index++ ) {
            this.stars[ index ] = new Star();
            this.scene.add( this.stars[ index ] );
        }

        this.animate();

        this.addEventListener('mousemove', this.onMouseover.bind( this ) );
        this.speed = .1;

    }

    onMouseover( event ) {
        this.speed = event.clientX / 1000;
    }

    animate() {
        requestAnimationFrame( this.animate.bind( this ) );
        this.stars.forEach( star =>  {
            star.update( this.speed );
            star.show();
        })
        this.renderer.render( this.scene, this.camera );
    }

} );