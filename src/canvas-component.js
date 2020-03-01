import { css, html, LitElement } from 'lit-element';
import { BaseComponent } from './base-component.js';

class CanvasComponent extends BaseComponent {

    constructor( title = '', hash = '', width = 400, height = 300 ) {
        super( title, hash, width, height );

        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');
    }

    render() { return html`${ this.getDefaultTemplate( this.canvas )}`; }

}

export {
    CanvasComponent,
}