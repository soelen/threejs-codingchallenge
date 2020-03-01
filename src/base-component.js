import { css, html, LitElement } from 'lit-element';

class BaseComponent extends LitElement {

    constructor( title = '', hash = '', width = 400, height = 300 ) {
        super();

        this.width = width;
        this.height = height;
        this.title = title;
        this.hash = hash;

    }

    getDefaultTemplate( canvas ) {
        return html`
            <a target="_blank" href="https://www.youtube.com/watch?v=${ this.hash }">${ this.title }</a>
            ${ canvas }
        `;
    }

    static get styles() { return css`
        :host {
            display: inline-block;
            font-family: sans-serif;
        }
        a {
            display: block;
            text-decoration: none;
            text-align: center;
        }
    `}

    render() { return html`${ this.getDefaultTemplate( html`` ) }`; }

}

export {
    BaseComponent,
}