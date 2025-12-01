
import { html, render } from './deps.js';
import { Header } from './components/Header.js';
import { Counter } from './components/Counter.js';
import { Content } from './components/Content.js';
import { useCounterStore } from './store.js'; // 引入上面的 store

function App() {
    const { count, doubleCount, increment, asyncReset } = useCounterStore;
    return html`
        <div class="app-container">
            <${Header} title="Preact App" />
            <div>
                <h1>${useCounterStore.title}</h1>
                
                <p>原始數值 (State): ${count}</p>
                <p>兩倍數值 (Getter): ${doubleCount}</p>
                
                <button onClick=${increment}>+1 (Action)</button>
                <button onClick=${asyncReset}>一秒後重置 (Async Action)</button>
            </div>
            <br />
            <main>
                <${Counter} />
                <${Content} />
            </main>
        </div>
    `;
}

render(html`<${App} />`, document.getElementById('app'));