import { html, useState } from '../deps.js';

export function Content(){
    let data=[{name:"A"},{name:"B"}]
    return html`
        <ul>
            ${data.map((item)=>html`
                <li>${item.name}</li>    
            `)}
        </ul>
    `
}