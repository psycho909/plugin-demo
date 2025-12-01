import { html, useState,useEffect } from '../deps.js';

export function Counter() {
    const [count, setCount] = useState(0);
    useEffect(()=>{
        console.log(count)
    },[count])
    function add(){
        setCount(count+1);
    }
    function decrement(){
        setCount(count-1)
    }
    return html`
        <div style="margin: 20px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
            <h3>計數器組件</h3>
            <p>目前數字: <strong>${count}</strong></p>
            <button type="button" onClick=${add}>Add</button>
            <button type="button" onClick=${decrement}>decrement</button>
            <button onClick=${() => setCount(count - 1)}>-</button>
            <span style="margin: 0 10px"></span>
            <button onClick=${() => setCount(count + 1)}>+</button>
        </div>
    `;
}