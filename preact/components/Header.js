// 注意：我們是從本地的 deps.js 引入，而不是 CDN
import { html } from '../deps.js';

export function Header(props) {
    return html`
        <header style="border-bottom: 2px solid #eee; padding: 10px;">
            <h1 style="color: #673ab8;">${props.title}</h1>
        </header>
    `;
}