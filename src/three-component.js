import { css, html, LitElement } from 'lit-element';
import { BaseComponent } from './base-component.js';

import {
    Scene,
    WebGLRenderer,
    PerspectiveCamera,
} from 'three';

class ThreeComponent extends BaseComponent {

    constructor( title = '', hash = '', width = 400, height = 300 ) {
        super( title, hash, width, height );

        this.scene = new Scene();
        this.camera = new PerspectiveCamera( 75, width / height, 0.1, 1000 );
        this.renderer = new WebGLRenderer();
        this.renderer.setSize( width, height );
    }

    render() { return html`${ this.getDefaultTemplate( this.renderer.domElement )}`; }

}

export {
    ThreeComponent,
}