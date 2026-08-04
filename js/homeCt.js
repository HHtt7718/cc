// 配置
const homeConfig = {
    zodiacOrder: ["马","蛇","龙","兔","虎","牛","鼠","猪","狗","鸡","猴","羊"],
    zodiacMap: {
        "马":[1,13,25,37,49],"蛇":[2,14,26,38],"龙":[3,15,27,39],
        "兔":[4,16,28,40],"虎":[5,17,29,41],"牛":[6,18,30,42],
        "鼠":[7,19,31,43],"猪":[8,20,32,44],"狗":[9,21,33,45],
        "鸡":[10,22,34,46],"猴":[11,23,35,47],"羊":[12,24,36,48]
    },
    colorMap: {
        '红波':[1,2,7,8,12,13,18,19,23,24,29,30,34,35,40,45,46],
        '蓝波':[3,4,9,10,14,15,20,25,26,31,36,37,41,42,47,48],
        '绿波':[5,6,11,16,17,21,22,27,28,32,33,38,39,43,44,49]
    },
    colorClass: { '红波':'tag-red', '蓝波':'tag-blue', '绿波':'tag-green' },

    fiveElementsMap: {
        '金': [4,5,12,13,26,27,34,35,42,43],
        '木': [8,9,16,17,24,25,38,39,46,47],
        '水': [1,14,15,22,23,30,31,44,45],
        '火': [2,3,10,11,18,19,32,33,40,41,48,49],
        '土': [6,7,20,21,28,29,36,37]
    },
    fiveClass: {
        '金': 'tag-jin',
        '木': 'tag-mu',
        '水': 'tag-shui',
        '火': 'tag-huo',
        '土': 'tag-tu'
    },

    fieldThreeMap: {
        "菜":["鼠","猴","鸡","猪"],"草":["牛","兔","马","羊"],"肉":["虎","龙","蛇","狗"],
        "天":["鼠","兔","马","鸡"],"地":["牛","龙","羊","狗"],"人":["虎","蛇","猴","猪"],
        "福":["鼠","虎","龙","马"],"禄":["牛","兔","猴","猪"],"寿":["蛇","羊","鸡","狗"],
        "日":["牛","龙","马","猪"],"月":["鼠","蛇","羊","狗"],"星":["虎","兔","猴","鸡"],
        "魏":["鼠","牛","狗","猪"],"蜀":["马","羊","猴","鸡"],"吴":["虎","兔","龙","蛇"]
    },
    fieldFourMap: {
        "男":["鼠","牛","虎","龙","马","猴","狗",],"女":["兔","蛇","羊","鸡","猪"],
        "家":["牛","马","羊","鸡","狗","猪"],"野":["鼠","虎","兔","龙","蛇","猴"],
        "琴":["兔","蛇","鸡"],"棋":["鼠","牛","狗"],"书":["虎","龙","马"],"画":["猴","羊","猪"],
        "春":["虎","兔","龙"],"夏":["蛇","马","羊"],"秋":["猴","鸡","狗"],"冬":["猪","牛","鼠"],
        "东":["兔","龙","蛇"],"西":["马","羊","猴"],"南":["鸡","狗","猪"],"北":["鼠","牛","虎"],
        "梅":["鼠","龙","猴"],"兰":["兔","羊","猪"],"菊":["虎","马","狗"],"竹":["牛","蛇","鸡"]
    }
};

// 工具方法
const formatNum = num => num.toString().padStart(2, '0');

const getColorClass = num => {
    for(const [color, nums] of Object.entries(homeConfig.colorMap)){
        if(nums.includes(num)) return homeConfig.colorClass[color];
    }
    return '';
};

// 列表视图
function renderZodiacListView(){
    let html = `<div class="data-card zodiac-list-view">`;
    homeConfig.zodiacOrder.forEach(name => {
        html += `<div class="zodiac-item">
            <div class="zodiac-label">${name}</div>
            <div class="number-tags">`;
        homeConfig.zodiacMap[name].forEach(num => {
            html += `<div class="number-tag ${getColorClass(num)}">${formatNum(num)}</div>`;
        });
        html += `</div></div>`;
    });
    html += `</div>`;
    return html;
}

// 表格视图
function renderZodiacTableView(){
    const rowsRange = [
        [1,12],
        [13,24],
        [25,36],
        [37,48],
        [49,49]
    ];
    let html = `<div class="data-card zodiac-table-view">
        <table>
            <thead>
                <tr>`;
    homeConfig.zodiacOrder.forEach(z => {
        html += `<th>${z}</th>`;
    });
    html += `</tr></thead><tbody>`;

    rowsRange.forEach(([start, end])=>{
        html += `<tr>`;
        homeConfig.zodiacOrder.forEach(zodiacName=>{
            const numList = homeConfig.zodiacMap[zodiacName];
            const findNum = numList.find(n=> n >= start && n <= end);
            if(findNum){
                html += `<td><div class="number-tag ${getColorClass(findNum)}">${formatNum(findNum)}</div></td>`;
            }else{
                html += `<td></td>`;
            }
        });
        html += `</tr>`;
    });
    html += `</tbody></table></div>`;
    return html;
}

// 生肖主体
function renderZodiac(){
    let html = `<div class="data-column">`;
    html += renderZodiacListView();
    html += renderZodiacTableView();

    html += `<div class="wave-color-section">`;
    for(const [color, nums] of Object.entries(homeConfig.colorMap)){
        html += `<div class="wave-color-card"><div class="wave-title">
            <span class="wave-color-dot ${homeConfig.colorClass[color]}"></span>${color}
        </div><div class="number-tags">`;
        nums.forEach(num => {
            html += `<div class="number-tag ${homeConfig.colorClass[color]}">${formatNum(num)}</div>`;
        });
        html += `</div></div>`;
    }
    html += `</div>`;

    html += `<h2 class="section-title"></h2><div class="wave-color-section">`;

    for(const [xing, nums] of Object.entries(homeConfig.fiveElementsMap)){
        html += `<div class="wave-color-card"><div class="wave-title">
            <span class="wave-color-dot ${homeConfig.fiveClass[xing]}"></span>${xing}
        </div><div class="number-tags">`;
        nums.forEach(num => {
            html += `<div class="number-tag ${getColorClass(num)}">${formatNum(num)}</div>`;
        });
        html += `</div></div>`;
    }
    html += `</div></div>`;
    return html;
}

// 分类渲染
function renderCategory(){
    let html = `<div class="data-column"><div class="data-card">`;
    html += `<div class="category-group-container">`;
    let i=1;
    for(const [key, val] of Object.entries(homeConfig.fieldThreeMap)){
        let cls = (i-1) % 5 + 1;
        if(i%3===1) html += `<div class="category-group category-group-${cls}">`;
        html += `<div class="category-item"><div class="category-label">${key}</div><div class="category-value">${val.join(', ')}</div></div>`;
        if(i%3===0) html += `</div>`;
        i++;
    }
    html += `</div></div>`;

    html += `<div class="data-card"><div class="category-group-container">`;
    i=1;
    for(const [key, val] of Object.entries(homeConfig.fieldFourMap)){
        let cls = (i-1) % 5 + 1;
        if(i%4===1) html += `<div class="category-group category-group-${cls}">`;
        html += `<div class="category-item"><div class="category-label">${key}</div><div class="category-value">${val.join(', ')}</div></div>`;
        if(i%4===0) html += `</div>`;
        i++;
    }
    return html + `</div></div></div>`;
}

// 首页完整 HTML
function getHomeHtml() {
    return `
    <style>
        /* 首页独立样式，避免污染全局 */
        .data-section { padding: 10px 30px 30px; width: 100%; max-width: 1200px;}
        .data-main-container { width: 100%; display: flex; flex-direction: column; gap: 30px; }
        .section-title {
            font-size: 20px;
            font-weight: 600;
            color: var(--color-text);
            margin: 24px 0 16px;
            padding-bottom: 8px;
            border-bottom: 2px solid rgba(72, 187, 120, 0.3);
        }
        .data-card {
            width: 100%;
            background: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-radius: var(--radius-sm);
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        }
        .zodiac-item {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            padding-bottom: 12px;
            border-bottom: 1px solid rgba(226, 232, 240, 0.6);
        }
        .zodiac-item:last-child { margin: 0; padding: 0; border: 0; }
        .zodiac-label { width: 60px; font-weight: 600; color: var(--color-text); font-size: 16px; }
        .number-tags { display: flex; flex-wrap: wrap; gap: 8px; flex: 1; }
        .number-tag {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 14px;
            text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        .tag-red { background-color: var(--color-red); }
        .tag-blue { background-color: var(--color-blue); }
        .tag-green { background-color: var(--color-green); }
        .tag-jin { background-color: var(--color-jin); }
        .tag-mu { background-color: var(--color-mu); }
        .tag-shui { background-color: var(--color-shui); }
        .tag-huo { background-color: var(--color-huo); }
        .tag-tu { background-color: var(--color-tu); }
        .wave-color-section { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 20px; }
        .wave-color-card {
            flex: 1;
            min-width: 280px;
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(8px);
            border-radius: 10px;
            padding: 16px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .wave-title {
            font-weight: 600;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .wave-color-dot {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            display: inline-block;
        }
        .category-group-container { display: flex; flex-direction: column; gap: 12px; }
        .category-group {
            background: rgba(255, 255, 255, 0.7);
            border-radius: 8px;
            padding: 16px;
        }
        .category-group-1 {
            background: rgba(255, 240, 245, 0.7);
            border-left: 4px solid var(--color-jin);
        }
        .category-group-2 {
            background: rgba(240, 248, 255, 0.7);
            border-left: 4px solid var(--color-mu);
        }
        .category-group-3 {
            background: rgba(240, 253, 244, 0.7);
            border-left: 4px solid var(--color-shui);
        }
        .category-group-4 {
            background: rgba(255, 249, 242, 0.7);
            border-left: 4px solid var(--color-huo);
        }
        .category-group-5 {
            background: rgba(245, 240, 230, 0.7);
            border-left: 4px solid var(--color-tu);
        }
        .category-item {
            display: flex;
            margin-bottom: 8px;
            padding-bottom: 8px;
            border-bottom: 1px solid rgba(226, 232, 240, 0.4);
        }
        .category-item:last-child { margin: 0; padding: 0; border: 0; }
        .category-label { width: 50px; font-weight: 600; color: var(--color-text); }
        .category-value { flex: 1; color: #4a5568; }

        /* 响应式 */
        @media (max-width: 768px) {
            .zodiac-list-view { display: none !important; }
            .zodiac-table-view { display: block !important; }
            .zodiac-table-view table {
                width: 100%;
                border-collapse: collapse;
            }
            .zodiac-table-view td,
            .zodiac-table-view th {
                text-align: center;
                padding: 4px 2px;
            }
            .zodiac-table-view th {
                font-size: 13px;
                font-weight: 600;
                border-bottom: 2px solid rgba(72, 187, 120, 0.3);
            }
            .zodiac-table-view .number-tag {
                height: 20px;
                font-size: 15px;
                border-radius: 5px;
            }
            .number-tag{ width: 20px; height: 20px; font-size: 15px; }
            .number-tags{ gap: 2px;}
            .wave-color-section { flex-direction: column; }
            .data-main-container{ gap:0px; }
            .data-section { padding: 0; }
        }
        @media (min-width: 769px) {
            .zodiac-list-view { display: block; }
            .zodiac-table-view { display: none !important; }
        }
        @media (min-width: 1024px) {
            .data-main-container { flex-direction: row; }
            .data-column { flex: 1; }
            .data-column .section-title { margin-top: 0; }
        }
    </style>

    <div class="data-section glass-container glass">
        <div class="data-main-container">
            ${renderZodiac()}
            ${renderCategory()}
        </div>
    </div>
    `;
}

// 首页触摸事件
function initHomeTouch() {
    let touchStartX = 0;
    let touchStartY = 0;
    const MOVE_THRESHOLD = 8;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);
        if (absX > absY && absX > MOVE_THRESHOLD) {
            if (e.cancelable) e.preventDefault();
        }
    }, { passive: true });
}