const { readFile, writeFile, mkdir }= require('fs');
const prompt = require('prompt');
const { JSDOM } = require('jsdom');
const pretty = require('pretty');

prompt.message = '';
prompt.delimiter = ':';
prompt.start();
 
prompt.get(['title', 'component', 'hash'], (err, { title, component, hash } ) => {
    if( error ) console.log( error );
    generateFiles( title, component, hash );
});

generateFiles = ( title, component, hash ) => {
    const indexPath = './challenges/index.html';

    readFile( indexPath, ( error, data ) => {
        const dom = new JSDOM( data.toString() );
        const document = dom.window.document;

        
        const query = [ ...document.querySelectorAll('a') ];
        const titles = query.map( ({ textContent }) => textContent.split(' - ')[ 1 ] );
        document.querySelectorAll('li').forEach( li => li.remove() );

        titles.push( title );
        titles.forEach( ( title, index ) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            const number = String( index + 1 ).padStart( 3, 0 );
            li.appendChild( a );
            a.href = `challenges/${ number }/`
            a.textContent = `${ number } - ${ title }`;
            document.querySelector('ul').appendChild( li ); 
        });

        const newNumber = String( titles.length ).padStart( 3, 0 );

        writeFile( indexPath, pretty(dom.serialize()), error => console.log( error ) );
        mkdir(`./challenges/${ newNumber }`, error => console.log( error ) );
        writeFile( `./challenges/${ newNumber }/index.html`, getIndexTemplate( component ), error => console.log( error ) );

        writeFile(`./challenges/${ newNumber }/${ component }.js`, getComponentTemplate( title, component, hash ), error => console.log( error ));
    }, error => console.log( error ) );
}

const getIndexTemplate  = component => `<!DOCTYPE html>
<html>
<head>
    <script type="module" src="./${ component }.js"></script>
</head>
<body>
    <${ component }></${ component }>
</body>
</html>`;

const getComponentTemplate = ( title, component, hash ) => `import { ThreeComponent, } from '../../src/three-component.js';

customElements.define( '${ component }', class extends ThreeComponent {

    constructor( title, hash, width, height ) {
        super( '${ title }', '${ hash }', width, height );

        this.draw();
    }

    draw() {
        super.draw();
    }
} );`;