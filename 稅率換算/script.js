// 常數設定 (適用2026年規定)
const CONSTANTS = {
    EXEMPTION: 13330000,              // 免稅額: 1333萬
    DEDUCTION_FUNERAL: 1380000,       // 喪葬費用扣除額: 138萬
    DEDUCTION_SPOUSE: 5530000,        // 配偶扣除額: 553萬
    DEDUCTION_CHILD: 560000,          // 直系血親卑親屬扣除額(每人): 56萬
    DEDUCTION_PARENT: 1380000,        // 父母扣除額(每人): 138萬
    DEDUCTION_DISABLED: 6930000,      // 身心障礙扣除額(每人): 693萬
    DEDUCTION_SIBLING_GPARENT: 560000 // 受扶養兄弟姊妹/祖父母扣除額(每人): 56萬
};

// 課稅級距 (2025/2026)
const TAX_BRACKETS = [
    { limit: 56210000,  rate: 0.10, baseTax: 0,        sub: 0 },
    { limit: 112420000, rate: 0.15, baseTax: 5621000,   sub: 56210000 },
    { limit: Infinity,  rate: 0.20, baseTax: 14052500,  sub: 112420000 }
];

// DOM 元素
const inputs = {
    realEstate:     document.getElementById('realEstate'),
    financialAssets:document.getElementById('financialAssets'),
    otherAssets:    document.getElementById('otherAssets'),
    hasSpouse:      document.getElementById('hasSpouse'),
    childrenCount:  document.getElementById('childrenCount'),
    parentsCount:   document.getElementById('parentsCount'),
    siblingCount:   document.getElementById('siblingCount'),
    disabledCount:  document.getElementById('disabledCount'),
    funeralExpense: document.getElementById('funeralExpense'),
    heirsCount:     document.getElementById('heirsCount'),
    ratioSlider:    document.getElementById('ratioSlider')
};

const results = {
    totalEstate:           document.getElementById('resTotalEstate'),
    totalDeductions:       document.getElementById('resTotalDeductions'),
    netEstate:             document.getElementById('resNetEstate'),
    taxPayable:            document.getElementById('resTaxPayable'),
    taxRateBadge:          document.getElementById('taxRateBadge'),
    taxFormula:            document.getElementById('taxFormula'),
    taxSplitSection:       document.getElementById('taxSplitSection'),
    ratioValueDisplay:     document.getElementById('ratioValueDisplay'),
    equalSplitRatio:       document.getElementById('equalSplitRatio'),
    equalSplitAmount:      document.getElementById('equalSplitAmount'),
    customSplitRatioDisplay: document.getElementById('customSplitRatioDisplay'),
    customSplitAmount:     document.getElementById('customSplitAmount')
};

// 格式化貨幣
function formatCurrency(num) {
    return 'NT$ ' + Math.max(0, num).toLocaleString('en-US');
}

// 格式化均分比例（修正 10.0 → 1 的 bug）
function formatEqualRatio(heirsCount) {
    const ratio = 100 / heirsCount;
    return Number.isInteger(ratio) ? String(ratio) : ratio.toFixed(1);
}

// 增減按鈕邏輯
window.adjustValue = function(inputId, amount) {
    const input = document.getElementById(inputId);
    let val = parseInt(input.value) || 0;
    const min = parseInt(input.min) || 0;
    const max = parseInt(input.max) || Infinity;

    val += amount;
    if (val < min) val = min;
    if (val > max) val = max;

    input.value = val;

    // 當調整繼承人數時，自動重設滑桿為均分比例
    if (inputId === 'heirsCount' && inputs.ratioSlider) {
        inputs.ratioSlider.value = Math.round(100 / val);
    }

    calculateTax();
};

// 核心計算邏輯
function calculateTax() {
    // 1. 計算遺產總額
    const realEstate      = parseFloat(inputs.realEstate.value)      || 0;
    const financialAssets = parseFloat(inputs.financialAssets.value) || 0;
    const otherAssets     = parseFloat(inputs.otherAssets.value)     || 0;
    const totalEstate     = realEstate + financialAssets + otherAssets;

    // 2. 計算扣除額總計
    let totalDeductions = 0;

    if (inputs.funeralExpense.checked) {
        totalDeductions += CONSTANTS.DEDUCTION_FUNERAL;
    }
    if (inputs.hasSpouse.checked) {
        totalDeductions += CONSTANTS.DEDUCTION_SPOUSE;
    }

    const childrenCount = parseInt(inputs.childrenCount.value)  || 0;
    totalDeductions += childrenCount * CONSTANTS.DEDUCTION_CHILD;

    const parentsCount  = parseInt(inputs.parentsCount.value)   || 0;
    totalDeductions += parentsCount  * CONSTANTS.DEDUCTION_PARENT;

    const siblingCount  = parseInt(inputs.siblingCount.value)   || 0;
    totalDeductions += siblingCount  * CONSTANTS.DEDUCTION_SIBLING_GPARENT;

    const disabledCount = parseInt(inputs.disabledCount.value)  || 0;
    totalDeductions += disabledCount * CONSTANTS.DEDUCTION_DISABLED;

    // 3. 計算課稅遺產淨額 = 總額 - 免稅額 - 扣除額
    let netEstate = totalEstate - CONSTANTS.EXEMPTION - totalDeductions;
    if (netEstate < 0) netEstate = 0;

    // 4. 計算應納稅額（根據級距）
    let taxPayable    = 0;
    let taxFormulaStr = '資產在免稅標準內，無需繳稅！';
    let taxRateStr    = '稅率 0%';

    if (netEstate > 0) {
        for (let i = 0; i < TAX_BRACKETS.length; i++) {
            const bracket = TAX_BRACKETS[i];
            if (netEstate <= bracket.limit) {
                taxPayable = bracket.baseTax + (netEstate - bracket.sub) * bracket.rate;
                taxRateStr = `稅率 ${bracket.rate * 100}%`;

                if (i === 0) {
                    taxFormulaStr = `淨額 × 10%`;
                } else if (i === 1) {
                    taxFormulaStr = `562.1萬 + (淨額 - 5,621萬) × 15%`;
                } else {
                    taxFormulaStr = `1,405.25萬 + (淨額 - 1億1,242萬) × 20%`;
                }
                break;
            }
        }
    }

    // 動畫效果更新 UI
    updateResultWithAnimation(results.totalEstate,    formatCurrency(totalEstate));
    updateResultWithAnimation(results.totalDeductions, '- ' + formatCurrency(totalDeductions));
    updateResultWithAnimation(results.netEstate,      formatCurrency(netEstate));

    // 更新最終稅額
    results.taxPayable.textContent = formatCurrency(Math.floor(taxPayable));
    results.taxPayable.classList.remove('changed');
    void results.taxPayable.offsetWidth; // trigger reflow
    results.taxPayable.classList.add('changed');

    results.taxRateBadge.textContent = taxRateStr;
    results.taxFormula.textContent   = taxFormulaStr;

    // 稅金分攤計算
    if (taxPayable > 0 && results.taxSplitSection) {
        results.taxSplitSection.style.display = 'block';

        const heirsCount  = parseInt(inputs.heirsCount.value)    || 1;
        const customRatio = parseFloat(inputs.ratioSlider.value)  || 0;

        // 均分（已修正比例顯示 bug）
        const eqRatio  = formatEqualRatio(heirsCount);
        const eqAmount = Math.floor(taxPayable / heirsCount);

        // 指定比例
        const customAmount = Math.floor(taxPayable * (customRatio / 100));

        results.ratioValueDisplay.textContent      = customRatio + '%';
        results.equalSplitRatio.textContent        = eqRatio;
        results.customSplitRatioDisplay.textContent = customRatio;

        updateResultWithAnimation(results.equalSplitAmount,  formatCurrency(eqAmount));
        updateResultWithAnimation(results.customSplitAmount, formatCurrency(customAmount));
    } else if (results.taxSplitSection) {
        results.taxSplitSection.style.display = 'none';
    }
}

function updateResultWithAnimation(element, newValue) {
    if (element.textContent !== newValue) {
        element.textContent = newValue;
        element.classList.remove('changed');
        void element.offsetWidth; // trigger reflow
        element.classList.add('changed');
    }
}

// 綁定事件監聽器（含 ratioSlider）
Object.values(inputs).forEach(input => {
    if (!input) return;
    if (input.type === 'checkbox') {
        input.addEventListener('change', calculateTax);
    } else {
        input.addEventListener('input', calculateTax);
    }
});

// 初始化計算
calculateTax();
