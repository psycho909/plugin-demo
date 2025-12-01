import { signal, computed, effect } from '@preact/signals';
function createCounterStore() {
    // 1. State (資料)
    const count = signal(0);
    const name = signal("Preact");

    // 2. Getters (計算屬性)
    const doubleCount = computed(() => count.value * 2);
    const title = computed(() => `${name.value} 的計數是: ${count.value}`);

    // 3. Actions (方法)
    // 在 Preact 中，Actions 就是普通的函式
    const increment = () => {
        count.value++;
    };

    const decrement = () => {
        count.value--;
    };
    
    // 模擬非同步 Action (Async Action)
    const asyncReset = async () => {
        await new Promise(r => setTimeout(r, 5000)); // 模擬等待
        count.value = 0;
    };

    // 回傳組裝好的 Store 物件
    return {
        count,
        name,
        doubleCount,
        title,
        increment,
        decrement,
        asyncReset
    };
}

// 匯出單例 (Singleton) 就像 Pinia 的 useStore()
export const useCounterStore = createCounterStore();