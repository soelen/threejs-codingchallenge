import { ThreeComponent, } from '../../src/three-component.js';
import {
    OrthographicCamera,
    GridHelper,
    MathUtils,
} from 'three';

import { Snake } from './Snake.js';
import { Food } from './Food.js';


customElements.define( 'snake-component', class extends ThreeComponent {

    frames = 0;
    constructor( title, hash, size = 600, grid = 30 ) {
        super( 'Snake', 'AaGK-fj-BAM', size, size );

        this.snake = new Snake( 600, grid );
        this.camera = new OrthographicCamera( - size / 2, size / 2, size / 2, - size / 2, .1, 1000 );
        this.food = new Food( 600, grid );
        this.scene.add( this.food );
        
        this.camera.position.z = 1;
        this.draw();
        this.scene.add( this.snake );

        const gridHelper = new GridHelper( size, grid ); 
        gridHelper.rotation.set( MathUtils.degToRad( 90 ), 0, 0 );
        this.scene.add( gridHelper );

        document.body.addEventListener('keydown', this.onKeydown.bind( this ) );

    }

    onKeydown( event ) {
        if( event.key === 'ArrowUp') {
            this.snake.dir( 0, 1 );
        } else if ( event.key === 'ArrowDown' ) {
            this.snake.dir( 0, -1 );
        } else if ( event.key === 'ArrowRight' ) {
            this.snake.dir( 1, 0 );
        } else if ( event.key === 'ArrowLeft' ) {
            this.snake.dir( -1, 0 );
        }
    }

    draw() {
        if( this.frames % 5 === 0 ) {
            this.frames = 0;
            this.snake.draw();
            this.snake.death();
            this.snake.eat( this.food );
        }
        this.frames++;

        super.draw();
    }

} );