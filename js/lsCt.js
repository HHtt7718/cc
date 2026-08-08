// ls-module.js  历史数据页面模块

/** 创建ls页面专属style标签 id="ls-page-style"，切换页面会被index.js自动移除 */
function injectLsStyle() {
    if(document.getElementById('ls-page-style')) return;
    const style = document.createElement('style');
    style.id = 'ls-page-style';
    style.textContent = `
        .ls-glass-wrap {
            max-width: 500px;
            margin: 1px auto;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            background: linear-gradient(135deg, #354050 0%, #0a1c46 100%);
            border: 1px solid rgba(255, 255, 255, 0.25);
            border-radius: 16px;
            padding: 5px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        }
        .ls-header-bar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 5px;
            justify-content: center;
        }
        .ls-header-bar button {
            border: none;
            padding: 8px 14px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.22);
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.24s;
        }
        .ls-header-bar button.active {
            background: rgba(255, 255, 255, 0.45);
            color: #222;
        }
        .ls-header-bar button:hover:not(.active) {
            background: rgba(255, 255, 255, 0.32);
        }
        .ls-table-container {
            overflow-x: auto;
        }
        .ls-table-container table {
            margin: 0 auto;
            border-collapse: collapse;
            width: auto;
        }
        .ls-table-container th,
        .ls-table-container td {
            padding: 2px 1px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }
        .ls-table-container th {
            background: rgba(0, 0, 0, 0.18);
        }
        .ls-ball-wrap {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            margin: 1px 1px;
        }
        .ls-hollow-ball {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
        }
        .ls-hollow-ball.red {
            border: 3px solid #e53935;
            color: #ffffff;
        }
        .ls-hollow-ball.blue {
            border: 3px solid #1976d2;
            color: #ffffff;
        }
        .ls-hollow-ball.green {
            border: 3px solid #388e3c;
            color: #ffffff;
        }
        .ls-zodiac-five {
            font-size: 13px;
            opacity: 0.85;
            margin-top: 2px;
        }
        .ls-date-period-text {
            line-height: 1.5;
        }
        .ls-split-plus {
            display: inline-block;
            margin: 0 8px;
            font-weight: bold;
            font-size: 18px;
            color: #ffdd57;
        }
        /* 顶部信息头部布局 */
        .ls-info-header {
            color: #ffffcc;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px 15px;
            font-size: 13px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .ls-info-header .ls-info-label {
            opacity: 0.7;
        }
        .ls-info-header .ls-info-value {
            font-weight: bold;
            margin-left: 4px;
        }

        /* 号码展示区布局 */
        .ls-current-balls-wrap {
            color: wheat;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 5px 5px;
            flex-wrap: wrap;
        }

        /* 确保新增区域内的球和文字样式与表格内一致 */
        .ls-current-balls-wrap .ls-ball-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
        }
        .ls-current-balls-wrap .ls-hollow-ball {
            /* 这里会自动继承你原有的 .ls-hollow-ball 样式，包括红蓝绿背景 */
        }
        .ls-current-balls-wrap .ls-zodiac-five {
            font-size: 11px;
            opacity: 0.8;

        }
        .ls-current-balls-wrap .ls-split-plus {
            /* 继承原有的加号样式 */
            margin: 0 5px;
        }
        .ls-load-error {
            padding: 5px;
            text-align: center;
            font-size: 15px;
            color: rgb(255, 255, 255);
            letter-spacing: 2px;
        }

        /* 触发按钮样式 */
        .ls-info-toggle-btn {
            color: wheat;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 5px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            user-select: none;
        }
        .ls-arrow {
            font-size: 12px;
            transition: transform 0.3s ease;
        }
        /* 内容区过渡（可选） */
        .ls-info-content {
            border-top: 1px solid rgba(255,255,255,0.05);
        }
        @media (max-width:600px) {
            .ls-header-bar{ margin-bottom: 5px;}
            .ls-glass-wrap {
                padding: 2px;
            }
            .ls-hollow-ball {
                width: 28px;
                height: 28px;
                border-width: 2px;
            }
            .ls-zodiac-five {
                font-size: 13px;
            }
            .ls-table-container th,
            .ls-table-container td {
                padding: 5px 1px;
                font-size: 11px;
            }
            .ls-split-plus {
                margin: 0 4px;
                font-size: 14px;
            }
            .ls-info-header{ padding:1px 1px; }
        }
    `;
    document.head.appendChild(style);
}

// ========== 颜色映射 ==========
const colorMapLs = {
    '红': [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46],
    '蓝': [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48],
    '绿': [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49]
};
let redSetLs = new Set(colorMapLs['红']);
let blueSetLs = new Set(colorMapLs['蓝']);
let greenSetLs = new Set(colorMapLs['绿']);

let allListLs = [];
let currentLimitLs = 10;

// ========== 【新增】状态控制变量 ==========
let isCurrentInfoLoaded = false; // 标记数据是否已经加载过
let isCurrentInfoOpen = false;   // 标记当前面板是否处于展开状态

/** 获取号码对应的css类名 */
function getBallClassLs(numStr) {
    const n = Number(numStr);
    if (redSetLs.has(n)) return 'red';
    if (blueSetLs.has(n)) return 'blue';
    if (greenSetLs.has(n)) return 'green';
    return '';
}

/** 解析原始文本数据 */
function parseDataLs(rawData) {
    const lines = rawData.split('\n').map(i => i.trim()).filter(Boolean);
    const result = [];
    let index = 0;
    while (index < lines.length) {
        const date = lines[index++];
        const period = lines[index++];
        const flats = [];
        for (let i = 0; i < 6; i++) {
            const num = lines[index++];
            const zodiac = lines[index++];
            flats.push({ num, zodiac });
        }
        index++; //跳过 "+"
        const specialNum = lines[index++];
        const specialZodiac = lines[index++];
        result.push({
            date,
            period,
            flats,
            special: { num: specialNum, zodiac: specialZodiac }
        });
    }
    return result.reverse();
}

/** 渲染顶部最新开奖信息区域 */
function renderCurrentInfo(jsonData) {
    const container = document.getElementById('ls-current-info-content');
    if (!container) return;

    // ========== 1. 如果请求失败或无数据，显示“加载失败” ==========
    if (!jsonData || !jsonData.currentResult) {
        container.innerHTML = `<div class="ls-load-error">加载最新期失败</div>`;
        return;
    }

    // ========== 2. 正常渲染逻辑 ==========
    const fiveElementsMap = { j: '金', m: '木', s: '水', h: '火', t: '土' };

    // 格式化日期为 MM/DD
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const parts = dateStr.split(' ')[0].split('-'); 
        return parts.length >= 3 ? `${parts[1]}/${parts[2]}` : '';
    };
    const currentDate = formatDate(jsonData.currentOpenTime);
    const nextDate = formatDate(jsonData.nextOpenTime);

    // 生成号码球 HTML
    let ballsHtml = '';
    jsonData.currentResult.forEach((item, index) => {
        if (index === 6) ballsHtml += `<span class="ls-split-plus">+</span>`;
        const colorClass = getBallClassLs(item.num);
        const zodiacText = `${item.shengxiao}(${fiveElementsMap[item.fiveElements] || item.fiveElements})`;
        ballsHtml += `
            <div class="ls-ball-wrap">
                <span class="ls-hollow-ball ${colorClass}">${item.num}</span>
                <span class="ls-zodiac-five">${zodiacText}</span>
            </div>`;
    });

    // 渲染完整内容
    container.innerHTML = `
        <div class="ls-info-header">
            <span class="ls-info-label">当前期数</span>
            <span class="ls-info-value">${jsonData.currentPeriod}期</span>
            <span class="ls-info-label" style="margin-left:15px;">开奖日期</span>
            <span class="ls-info-value">${currentDate}</span>
            <span class="ls-info-label" style="margin-left:15px;">下期公布</span>
            <span class="ls-info-value">${nextDate}</span>
        </div>
        <div class="ls-current-balls-wrap">${ballsHtml}</div>
    `;
}

/** 渲染表格 */
function renderTableLs(limit) {
    let list;
    if (limit <= 0) {
        list = [...allListLs];
    } else {
        const startIndex = allListLs.length - limit;
        list = allListLs.slice(startIndex > 0 ? startIndex : 0);
    }
    const tbody = document.getElementById('ls-tableBody');
    if(!tbody) return;
    tbody.innerHTML = '';

    list.forEach(item => {
        const tr = document.createElement('tr');

        const tdDatePeriod = document.createElement('td');
        tdDatePeriod.className = 'ls-date-period-text';
        tdDatePeriod.innerHTML = `${item.date}<br>${item.period}`;
        tr.appendChild(tdDatePeriod);

        const tdContent = document.createElement('td');
        item.flats.forEach(f => {
            const wrapDiv = document.createElement('div');
            wrapDiv.className = 'ls-ball-wrap';

            const ballSpan = document.createElement('span');
            ballSpan.className = `ls-hollow-ball ${getBallClassLs(f.num)}`;
            ballSpan.innerText = f.num;

            const infoSpan = document.createElement('span');
            infoSpan.className = 'ls-zodiac-five';
            infoSpan.innerText = f.zodiac;

            wrapDiv.appendChild(ballSpan);
            wrapDiv.appendChild(infoSpan);
            tdContent.appendChild(wrapDiv);
        });

        const plusSpan = document.createElement('span');
        plusSpan.className = 'ls-split-plus';
        plusSpan.innerText = '+';
        tdContent.appendChild(plusSpan);

        const spWrap = document.createElement('div');
        spWrap.className = 'ls-ball-wrap';

        const spBall = document.createElement('span');
        spBall.className = `ls-hollow-ball ${getBallClassLs(item.special.num)}`;
        spBall.innerText = item.special.num;

        const spInfo = document.createElement('span');
        spInfo.className = 'ls-zodiac-five';
        spInfo.innerText = item.special.zodiac;

        spWrap.appendChild(spBall);
        spInfo && spWrap.appendChild(spInfo);
        tdContent.appendChild(spWrap);

        tr.appendChild(tdContent);
        tbody.appendChild(tr);
    });
}

/** 获取ls页面HTML字符串，供PAGE_CONFIG.getHtml调用 */
function getLsHtml() {
    return `
    <!-- 【新增】带触发按钮的外层容器 -->
    <div id="ls-current-info" class="ls-current-info-wrap ls-glass-wrap">
        <div class="ls-info-toggle-btn">
            <span>查看最新开奖</span>
            <span class="ls-arrow">▼</span>
        </div>
        <!-- 内容区默认隐藏 -->
        <div id="ls-current-info-content" class="ls-info-content" style="display:none;"></div>
    </div>

    <div class="ls-glass-wrap">
        <div class="ls-header-bar">
            <button data-limit="10">近10期</button>
            <button data-limit="20">近20期</button>
            <button data-limit="50">近50期</button>
            <button data-limit="0">全部</button>
        </div>
        <div class="ls-table-container">
            <table>
                <tbody id="ls-tableBody"></tbody>
            </table>
        </div>
    </div>
    `;
}

/**
 * 重置 ls 页面的最新开奖面板状态
 * 独立管理自己的 DOM 和状态变量
 */
function resetLsCurrentInfoPanel() {
    // 1. 重置 JS 状态变量
    isCurrentInfoLoaded = false;
    isCurrentInfoOpen = false;

    // 2. 重置 DOM 状态（收起面板，重置箭头）
    const contentBox = document.getElementById('ls-current-info-content');
    const arrow = document.querySelector('.ls-arrow');
    if (contentBox) contentBox.style.display = 'none';
    if (arrow) arrow.style.transform = 'rotate(0deg)';
}

/**
 * 发起 GET 请求获取当前期 JSON 数据
 * @param {string} baseUrl - 带有 {source} 占位符的 URL
 * @param {AbortSignal} signal - 用于取消请求的信号
 */
async function fetchCurrentJson(baseUrl, signal) {
    const sourceMap = { "new": "xa6", "old": "a6", "fag": "hk6" };
    const sourceValue = sourceMap[currentSourceKey] || currentSourceKey;
    const finalUrl = baseUrl.replace('{source}', sourceValue);

    try {
        // 【关键】将 signal 传入 fetch 的 options 中
        const response = await fetch(finalUrl, { signal }); 
        if (!response.ok) throw new Error(`请求失败: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("获取当前期JSON数据出错:", error);
        return null;
    }
}

/** ls页面初始化函数 init，PAGE_CONFIG.init 调用 */
function initLsTouch() {
    // 注入本页面隔离样式
    injectLsStyle();

    // ========== 监听全局数据源切换事件，自动清理自身状态 ==========
    window.addEventListener('sourceChanged', resetLsCurrentInfoPanel);

    // ========== 【修改】绑定点击展开/收起事件 ==========
    const toggleBtn = document.querySelector('.ls-info-toggle-btn');
    const contentBox = document.getElementById('ls-current-info-content');
    const arrow = document.querySelector('.ls-arrow');

    if (toggleBtn && contentBox) {
        toggleBtn.addEventListener('click', () => {
            isCurrentInfoOpen = !isCurrentInfoOpen;

            if (isCurrentInfoOpen) {
                // 展开面板
                contentBox.style.display = 'block';
                arrow.style.transform = 'rotate(180deg)';
                
                // 如果还没加载过数据，才发起请求
                if (!isCurrentInfoLoaded) {
                    // 请求期间禁用按钮，防止重复点击
                    toggleBtn.style.pointerEvents = 'none'; 
                    toggleBtn.style.opacity = '0.6';
                    contentBox.innerHTML = `<div class="ls-load-error">加载中...</div>`;
                    
                    // 创建 AbortController 用于超时控制
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => {
                        controller.abort(); // 超时后强制中断请求
                    }, 500); // 设置最大等待时间

                    fetchCurrentJson("https://dokv.buyacard.cc/kv/gr/{source}/issue/currentInfo")
                        .then(jsonData => {
                            clearTimeout(timeoutId); // 成功则清除超时计时器
                            renderCurrentInfo(jsonData);
                        })
                        .catch(error => {
                            clearTimeout(timeoutId); // 失败也清除超时计时器
                            // 如果是超时导致的报错，可以给出更明确的提示
                            if (error.name === 'AbortError') {
                                console.warn("请求超时，已中断");
                                renderCurrentInfo(null); // 渲染加载失败
                            } else {
                                renderCurrentInfo(null);
                            }
                        })
                        .finally(() => {
                            // 【优化3】无论成功、失败还是超时，都恢复按钮状态
                            isCurrentInfoLoaded = true;
                            toggleBtn.style.pointerEvents = 'auto';
                            toggleBtn.style.opacity = '1';
                        });
                }
            } else {
                // 收起面板
                contentBox.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    }

    // ========== 历史列表的解析与渲染 ==========
    allListLs = parseDataLs(rawData);
    currentLimitLs = 10;

    const btns = document.querySelectorAll('.ls-header-bar button');
    btns.forEach((btn, idx)=>{
        btn.addEventListener('click', function(){
            btns.forEach(b=>b.classList.remove('active'));
            this.classList.add('active');
            const lim = Number(this.dataset.limit);
            currentLimitLs = lim;
            renderTableLs(lim);
        });
        if(idx===0) btn.classList.add('active');
    });
    renderTableLs(10);
}

window.getLsHtml = getLsHtml;
window.initLsTouch = initLsTouch;
