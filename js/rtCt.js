
/**
 *  rt页面HTML模板
 */
function getRtHtml() {
    return `
<div id="rt-page-wrap">
    <div class="top-bar">
        <button class="btn-filter active" data-limit="10">近10期</button>
        <button class="btn-filter" data-limit="20">近20期</button>
        <button class="btn-filter" data-limit="50">近50期</button>
        <button class="btn-filter" data-limit="0">全部</button>
        <button class="stat-toggle-btn">统计</button>
    </div>
        
    <div class="stat-toggle-wrap">
        <div class="stat-panel"></div>
    </div>

    <div class="table-wrap">
        <div class="table-container">
            <table id="zodiacCountTable">
                <thead>
                    <tr>
                        <th>期数</th>
                        <th>范围生肖</th>
                        <th>前三</th>
                        <th>上三</th>
                        <th>中三</th>
                        <th>后三</th>
                        <th>百列</th>
                        <th>两百</th>
                        <th>五百</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</div>
    `;
}

/**
 * rt页面初始化函数
 */
function initRtTouch() {
    // 动态创建隔离CSS，id=rt-page-style
    const style = document.createElement('style');
    style.id = 'rt-page-style';
    style.textContent = `
/* ========= RT页面局部样式，全部限定 #rt-page-wrap 前缀，隔离全局 ========= */
#rt-page-wrap {
    --glass-bg: rgba(255, 255, 255, 0.45);
    --glass-border: rgba(255, 255, 255, 0.6);
    --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
    --blur-amount: 12px;
    --primary-color: #4a90e2;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
    color: #2c3e50;
}

#rt-page-wrap .top-bar {
    max-width: 1400px;
    margin: 0 auto 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 0;
    z-index: 100; 
    background-color: rgb(255 255 255 / 28%); 
    backdrop-filter: blur(10px); 
    -webkit-backdrop-filter: blur(10px); 
    border-radius: 16px;
}

#rt-page-wrap .btn-filter {
    padding: 8px 18px;
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    background: var(--glass-bg);
    backdrop-filter: blur(var(--blur-amount));
    -webkit-backdrop-filter: blur(var(--blur-amount));
    box-shadow: var(--glass-shadow);
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: #34495e;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

#rt-page-wrap .btn-filter:hover {
    background: rgba(255, 255, 255, 0.65);
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(31, 38, 135, 0.2);
}

#rt-page-wrap .btn-filter.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

#rt-page-wrap .stat-toggle-wrap {
    max-width: 1400px;
    margin: 0 auto 5px;
}

#rt-page-wrap .stat-toggle-btn {
    padding: 5px;
    border-radius: 12px;
    border: 1px solid var(--glass-border);
    cursor: pointer;
    background: var(--glass-bg);
    backdrop-filter: blur(var(--blur-amount));
    -webkit-backdrop-filter: blur(var(--blur-amount));
    box-shadow: var(--glass-shadow);
    font-size: 15px;
    font-weight: 500;
    transition: background 0.3s;
}

#rt-page-wrap .stat-toggle-btn:hover {
    background: rgba(255, 255, 255, 0.6);
}

#rt-page-wrap .stat-panel {
    margin-top: 12px;
    padding: 20px;
    border-radius: 16px;
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
    display: none;
    animation: rt-fadeIn 0.3s ease-out;
}

@keyframes rt-fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

#rt-page-wrap .stat-panel.open {
    display: block;
}

#rt-page-wrap .stat-row {
    display: flex;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
}

#rt-page-wrap .stat-item {
    padding: 5px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    transition: transform 0.2s;
}

#rt-page-wrap .stat-item:hover {
    transform: scale(1.02);
    background: rgba(255, 255, 255, 0.5);
}

#rt-page-wrap .table-wrap {
    max-width: 1400px;
    margin: 0 auto;
    border-radius: 16px;
    overflow: hidden;
    background: rgb(177 177 177 / 28%);
    backdrop-filter: blur(var(--blur-amount));
    -webkit-backdrop-filter: blur(var(--blur-amount));
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
}

#rt-page-wrap .table-container {
    width: 100%;
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.5) transparent;
}

#rt-page-wrap .table-container::-webkit-scrollbar {
    height: 8px;
}
#rt-page-wrap .table-container::-webkit-scrollbar-track {
    background: transparent;
}
#rt-page-wrap .table-container::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
}

#rt-page-wrap table {
    border-collapse: collapse;
    width: 100%;
}

#rt-page-wrap th, #rt-page-wrap td {
    padding: 5px 5px;
    text-align: center;
    font-size: 14px;
    box-shadow: inset -1px 0 0 rgba(255, 255, 255, 0.3);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

#rt-page-wrap th:last-child, #rt-page-wrap td:last-child {
    box-shadow: none;
}

#rt-page-wrap td:nth-child(even) {
    background: rgba(255, 255, 255, 0.15);
}

#rt-page-wrap th {
    background: rgba(255, 255, 255, 0.65); 
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 10;
    color: #2c3e50;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 0.5px;
}

#rt-page-wrap tbody tr {
    transition: background 0.2s ease;
}

#rt-page-wrap tbody tr:hover {
    background: rgba(255, 255, 255, 0.4);
}

#rt-page-wrap .last-expand-row {
    display: none;
}

#rt-page-wrap .last-expand-row.open {
    display: table-row;
}

#rt-page-wrap .last-expand-cell {
    padding: 20px !important;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: none;
}

#rt-page-wrap .last-expand-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

#rt-page-wrap .block {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    display: flex; padding: 5px; flex-direction: column; justify-content: center; align-items: center;
}

#rt-page-wrap .block-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #34495e;
    font-size: 15px;
}

#rt-page-wrap .num-wrap {
    word-break: break-all;
    font-family: 'Courier New', Courier, monospace;
}

#rt-page-wrap .copy-btn-group {
    margin-top: 12px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

#rt-page-wrap .copy-btn {
    padding: 6px 14px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    cursor: pointer;
    font-size: 13px;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(6px);
    transition: all 0.2s;
}

#rt-page-wrap .copy-btn:hover {
    background: rgba(255, 255, 255, 0.7);
    transform: translateY(-1px);
}

#rt-page-wrap .tip-success {
    color: #27ae60;
    font-weight: bold;
    display: none;
    margin-left: 8px;
}

#rt-page-wrap .tip-fail {
    color: #e74c3c;
    font-weight: bold;
    display: none;
    margin-left: 8px;
}

#rt-page-wrap .highlight {
    background: rgba(255, 235, 59, 0.4);
    color: #8d6e00;
    font-weight: bold;
    padding: 2px 4px;
    border-radius: 4px;
}

#rt-page-wrap .correct {
    color: #27ae60;
    font-weight: bold;
}

#rt-page-wrap .wrong {
    color: #e74c3c;
    font-weight: bold;
}

#rt-page-wrap .mob-view {
    display: none;
}

@media (max-width: 900px) {
    #rt-page-wrap .last-expand-inner {
        grid-template-columns: 1fr;
        gap: 5px;
    }
}

@media (max-width: 768px) {
    #rt-page-wrap .stat-row {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 5px;
    }
    #rt-page-wrap .last-expand-cell{ padding: 5px !important;}
    #rt-page-wrap .stat-panel { 
        padding: 5px; 
        margin-top: 5px; 
    }
    #rt-page-wrap .block-title{ margin-bottom: 0px;}
    #rt-page-wrap th, #rt-page-wrap td {
        font-size: 13px;
        padding: 3px 1px;
    }
    #rt-page-wrap .btn-filter {
        padding: 6px 12px;
        font-size: 13px;
    }
    #rt-page-wrap .pc-view {
        display: none !important;
    }
    #rt-page-wrap .mob-view {
        display: block !important;
    }
    #rt-page-wrap .top-bar {
        gap: 5px;
    }
}
    `;
    document.head.appendChild(style);

    // ====================== 常量配置区（统一管理所有硬编码，便于修改） ======================
    const CONST_CONFIG = Object.freeze({
        DEFAULT_SHOW_LIMIT: 10,
        BAI_NUM_COUNT: 35,
        CLIPBOARD_TIP_DELAY: 2000,
        DOM_SELECTORS: {
            tableBody: "#rt-page-wrap #zodiacCountTable tbody",
            statPanel: "#rt-page-wrap .stat-panel",
            statToggleBtn: "#rt-page-wrap .stat-toggle-btn",
            filterBtns: "#rt-page-wrap .btn-filter",
            expandRow: "#rt-page-wrap .last-expand-row",
            copyBtn: "#rt-page-wrap .copy-btn"
        }
    });

    // 生肖分类规则配置
    const ALL_FIELD_RULE = Object.freeze({
        "男": ["鼠", "牛", "虎", "龙", "马", "猴", "狗"],
        "女": ["兔", "蛇", "羊", "鸡", "猪"],
        "家": ["牛", "马", "羊", "鸡", "狗", "猪"],
        "野": ["鼠", "虎", "兔", "龙", "蛇", "猴"],
        "菜": ["鼠", "猴", "鸡", "猪"],
        "草": ["牛", "兔", "马", "羊"],
        "肉": ["虎", "龙", "蛇", "狗"],
        "天": ["鼠", "兔", "马", "鸡"],
        "地": ["牛", "龙", "羊", "狗"],
        "人": ["虎", "蛇", "猴", "猪"],
        "福": ["鼠", "虎", "龙", "马"],
        "禄": ["牛", "兔", "猴", "猪"],
        "寿": ["蛇", "羊", "鸡", "狗"],
        "日": ["牛", "龙", "马", "猪"],
        "月": ["鼠", "蛇", "羊", "狗"],
        "星": ["虎", "兔", "猴", "鸡"],
        "魏": ["鼠", "牛", "狗", "猪"],
        "蜀": ["马", "羊", "猴", "鸡"],
        "吴": ["虎", "兔", "龙", "蛇"],
        "琴": ["兔", "蛇", "鸡"],
        "棋": ["鼠", "牛", "狗"],
        "书": ["虎", "龙", "马"],
        "画": ["猴", "羊", "猪"],
        "春": ["虎", "兔", "龙"],
        "夏": ["蛇", "马", "羊"],
        "秋": ["猴", "鸡", "狗"],
        "冬": ["猪", "牛", "鼠"],
        "东": ["兔", "龙", "蛇"],
        "西": ["马", "羊", "猴"],
        "南": ["鸡", "狗", "猪"],
        "北": ["鼠", "牛", "虎"],
        "梅": ["鼠", "龙", "猴"],
        "兰": ["兔", "羊", "猪"],
        "菊": ["虎", "马", "狗"],
        "竹": ["牛", "蛇", "鸡"]
    });
    const FIELD_F_MAP = Object.freeze({
        "男": ["鼠", "虎", "龙", "马", "猴", "狗"],
        "女": ["牛", "兔", "蛇", "羊", "鸡", "猪"],
        "家": ["鼠", "牛", "兔", "龙", "蛇", "马"],
        "野": ["虎", "猴", "羊", "鸡", "狗", "猪"],
    });
    // 预拆分规则Map，避免运行时重复过滤
    const FIELD_THREE_MAP = Object.fromEntries(
        Object.entries(ALL_FIELD_RULE).filter(([k]) =>
            ["菜", "草", "肉", "天", "地", "人", "福", "禄", "寿", "日", "月", "星", "魏", "蜀", "吴"].includes(k)
        )
    );
    const FIELD_FOUR_MAP = Object.fromEntries(
        Object.entries(ALL_FIELD_RULE).filter(([k]) =>
            ["琴", "棋", "书", "画", "春", "夏", "秋", "冬", "东", "西", "南", "北", "梅", "兰", "菊", "竹"].includes(k)
        )
    );

    // 生肖号码对照表
    const zodiacData = Object.freeze({
        "鼠": "06,18,30,42",
        "牛": "05,17,29,41",
        "虎": "04,16,28,40",
        "兔": "03,15,27,39",
        "龙": "02,14,26,38",
        "蛇": "01,13,25,37,49",
        "马": "12,24,36,48",
        "羊": "11,23,35,47",
        "猴": "10,22,34,46",
        "鸡": "09,21,33,45",
        "狗": "08,20,32,44",
        "猪": "07,19,31,43"
    });
    const zodiacSixData = Object.freeze({
        "鼠": "07,19,31,43",
        "牛": "06,18,30,42",
        "虎": "05,17,29,41",
        "兔": "04,16,28,40",
        "龙": "03,15,27,39",
        "蛇": "02,14,26,38",
        "马": "01,13,25,37,49",
        "羊": "12,24,36,48",
        "猴": "11,23,35,47",
        "鸡": "10,22,34,46",
        "狗": "09,21,33,45",
        "猪": "08,20,32,44"
    });
    // 五百范围预转Set，查询O(1)代替数组includes O(n)
    const fiveHundredRangeSet = new Set([
        "01", "02", "05", "06", "07", "08", "09", "10", "12", "13", "14", "15", "17", "18", "19", "20", "21", "22", "25", "26", "28", "29", "31", "32", "34", "35", "36", "37", "38", "40", "42", "47", "48"
    ]);
    // 单双尾数Set
    const singleNumSet = new Set(["1", "3", "5", "7", "9"]);
    const doubleNumSet = new Set(["0", "2", "4", "6", "8"]);
    // 统计模板，复用对象，避免重复创建
    const STAT_ITEM_TPL = Object.freeze({ hit: 0, total: 0, maxConHit: 0, maxMiss: 0, curConHit: 0, curMiss: 0 });
    // 表格目标列配置（统一管理列）
    const TARGET_COLUMNS = ["前三", "上三", "中三", "后三", "百列", "两百", "五百"];

    // ====================== 全局状态（收拢分散全局变量） ======================
    const AppState = {
        // rawData: typeof newD !== 'undefined' ? newD : [],
        showLimit: CONST_CONFIG.DEFAULT_SHOW_LIMIT,
        lastExpandTr: null,
        dataArray: [],
        processed: [],
        rangeData: [],
        // TARGET_COLUMNS遗漏计数器
        colMissCounter: Object.fromEntries(TARGET_COLUMNS.map(col => [col, 0]))
    };

    // ====================== 通用工具函数 ======================
    /**
     * 复制文本到剪贴板，自动显示成功/失败提示
     * @param {string} text 复制内容
     * @param {HTMLElement} elSuccess 成功提示dom
     * @param {HTMLElement} elFail 失败提示dom
     */
    async function copyText(text, elSuccess, elFail) {
        if (!text || !elSuccess || !elFail) return;
        try {
            await navigator.clipboard.writeText(text);
            elSuccess.style.display = "inline";
            setTimeout(() => elSuccess.style.display = "none", CONST_CONFIG.CLIPBOARD_TIP_DELAY);
        } catch (err) {
            elFail.style.display = "inline";
            setTimeout(() => elFail.style.display = "none", CONST_CONFIG.CLIPBOARD_TIP_DELAY);
        }
    }

    /**
     * 数字列表分页格式化（pc每行10个，移动端每行5个）
     * @param {string[]} numArr 数字数组
     * @returns {string} 拼接好的html
     */
    function formatNumberList(numArr) {
        if (!Array.isArray(numArr) || !numArr.length) return "";
        const pcChunk = [];
        const mobChunk = [];
        const chunkPc = 10;
        const chunkMob = 5;
        for (let i = 0; i < numArr.length; i += chunkPc) pcChunk.push(numArr.slice(i, i + chunkPc).join(","));
        for (let i = 0; i < numArr.length; i += chunkMob) mobChunk.push(numArr.slice(i, i + chunkMob).join(","));
        return `<span class="pc-view">${pcChunk.join(",<br>")}</span><span class="mob-view">${mobChunk.join(",<br>")}</span>`;
    }

    /**
     * 生肖列表分页+命中标红
     * @param {string[]} zodiacArr 生肖数组
     * @param {string} hitZodiac 命中生肖
     * @returns {string} html字符串
     */
    function formatZodiacList(zodiacArr, hitZodiac) {
        if (!Array.isArray(zodiacArr) || !zodiacArr.length) return "";
        const chunks = [];
        const chunkSize = 6;
        for (let i = 0; i < zodiacArr.length; i += chunkSize) chunks.push(zodiacArr.slice(i, i + chunkSize));
        return chunks
            .map(list => list.map(z => z === hitZodiac ? `<span style="color:red">${z}</span>` : z).join(","))
            .join("<br>");
    }

    /**
     * 命中统计更新通用逻辑
     * @param {Object} statObj 统计对象
     * @param {boolean} isHit 是否命中
     */
    function hitTest(statObj, isHit) {
        statObj.total++;
        if (isHit) {
            statObj.hit++;
            statObj.curConHit++;
            statObj.curMiss = 0;
            statObj.maxConHit = Math.max(statObj.maxConHit, statObj.curConHit);
        } else {
            statObj.curMiss++;
            statObj.curConHit = 0;
            statObj.maxMiss = Math.max(statObj.maxMiss, statObj.curMiss);
        }
    }

    /**
     * 根据日期切换生肖号码映射表
     * @param {string} dateStr 日期字符串 yyyymmdd
     * @returns {Object} zodiac号码映射
     */
    function getZodiacMapByDate(dateStr) {
        if (!dateStr) return zodiacData;
        const num = Number(dateStr);
        return num >= 20260217 ? zodiacSixData : zodiacData;
    }

    /**
     * 统计列渲染通用逻辑：命中✅，未命中返回遗漏值
     * @param {boolean} isHit 是否命中
     * @param {Object} counterObj 列计数器对象（引用）
     * @param {string} key 字段key
     * @returns {string|number} 单元格展示值
     */
    function getColumnCellValue(isHit, counterObj, key) {
        if (isHit) {
            counterObj[key] = 0;
            return "✅";
        } else {
            counterObj[key]++;
            return counterObj[key];
        }
    }

    /**
     * 生成遗漏计数初始化对象
     * @param {string[]} fields 需要计数的字段数组
     * @returns {Record<string, number>} 字段初始计数器
     */
    function createMissCounter(fields) {
        return Object.fromEntries(fields.map(f => [f, 0]));
    }

    /**
     * 获取高频topN号码
     * @param {string[]} arr 号码数组
     * @param {number} count 取前N个
     * @returns {string[]} 排序后号码数组
     */
    function getTopNumbers(arr, count = CONST_CONFIG.BAI_NUM_COUNT) {
        const freq = {};
        for (const num of arr) freq[num] = (freq[num] || 0) + 1;
        return Object.entries(freq)
            .sort((a, b) => b[1] - a[1] || Number(a[0]) - Number(b[0]))
            .slice(0, count)
            .map(([num]) => num);
    }

    /**
     * 完整遍历全量数据，预计算【前三/上三/中三/后三/百列/两百/五百】每一行单元格值
     * 每列独立判断有效性，互不干扰；某列无效仅该列空，本列计数器+1，其它列照常计算
     * @param {Array} dataTable processed完整表格数据
     * @param {Array} rangeData preCalcRangeData预计算的百列两百数据
     * @returns {{resultArr:Object[], group4Data:Object[]}}
     */
    function preCalcTargetColumnCells(dataTable, rangeData) {
        const missCounter = Object.fromEntries(TARGET_COLUMNS.map(col => [col, 0]));
        const resultArr = [];

        const group4Data = dataTable.map(data => {
            const zodiacMap = getZodiacMapByDate(data["日期"]);
            const { group4 } = getZodiacCount(data, zodiacMap);
            const sortedZodiacs = Object.entries(group4)
                .sort((a, b) => b[1] - a[1])
                .map(([z]) => z);
            return { data, sortedZodiacs };
        });

        for (let originIndex = 0; originIndex < group4Data.length; originIndex++) {
            const rowItem = group4Data[originIndex];
            const { data, sortedZodiacs } = rowItem;
            const isLastRow = originIndex === group4Data.length - 1;
            const cellVals = {};
            TARGET_COLUMNS.forEach(c => cellVals[c] = "");

            if (!isLastRow) {
                const nextData = dataTable[originIndex + 1];
                const nextZodiac = nextData["生肖"];
                const nextTehao = nextData["特号"]?.padStart(2, "0") || "";
                const zIdx = sortedZodiacs.indexOf(nextZodiac);
                const isZodiacEmpty = !sortedZodiacs.length;

                // ========== 每一列独立条件，不再统一isRowNoValid ==========
                // 前三、上三、中三、后三 依赖：sortedZodiacs、nextZodiac
                if (!isZodiacEmpty && nextZodiac) {
                    cellVals["前三"] = getColumnCellValue(zIdx >= 0 && zIdx < 3, missCounter, "前三");
                    cellVals["上三"] = getColumnCellValue(zIdx >= 3 && zIdx < 6, missCounter, "上三");
                    cellVals["中三"] = getColumnCellValue(zIdx >= 6 && zIdx < 9, missCounter, "中三");
                    cellVals["后三"] = getColumnCellValue(zIdx >= 9 && zIdx < 12, missCounter, "后三");
                } else {
                    // 生肖相关条件无效：仅这4个生肖列空，各自计数器+1；其它列不受影响
                    missCounter["前三"] += 1;
                    cellVals["前三"] = "";

                    missCounter["上三"] += 1;
                    cellVals["上三"] = "";

                    missCounter["中三"] += 1;
                    cellVals["中三"] = "";

                    missCounter["后三"] += 1;
                    cellVals["后三"] = "";
                }

                // 百列：依赖 bai数组、nextTehao
                const baiArr = rangeData[originIndex].bai;
                if (baiArr.length > 0 && nextTehao) {
                    cellVals["百列"] = getColumnCellValue(baiArr.includes(nextTehao), missCounter, "百列");
                } else {
                    missCounter["百列"] += 1;
                    cellVals["百列"] = "";
                }

                // 两百：依赖 liangbai数组、nextTehao
                const liangbaiArr = rangeData[originIndex].liangbai;
                if (liangbaiArr.length > 0 && nextTehao) {
                    cellVals["两百"] = getColumnCellValue(liangbaiArr.includes(nextTehao), missCounter, "两百");
                } else {
                    missCounter["两百"] += 1;
                    cellVals["两百"] = "";
                }

                // 五百：只依赖 nextTehao，不需要数组
                if (nextTehao) {
                    cellVals["五百"] = getColumnCellValue(fiveHundredRangeSet.has(nextTehao), missCounter, "五百");
                } else {
                    missCounter["五百"] += 1;
                    cellVals["五百"] = "";
                }
            }
            resultArr.push(cellVals);
        }

        AppState.colMissCounter = { ...missCounter };
        return { resultArr, group4Data };
    }

    // ====================== 数据解析 & 预处理业务函数 ======================
    /**
     * 原始文本数据分块解析
     * @param {string} raw 原始文本
     * @returns {Array<{date:string, period:string, pm:Array, tm:Object}>} 解析分组数据
     */
    function parseData(rawData) {
        const groups = [];
        if (!rawData) return groups;
        // 正则预编译，提升循环性能
        const blockReg = /\n\s*\n(?=\d{4}-\d{2}-\d{2}\s*\n\d+期)/;
        const blocks = rawData.trim().split(blockReg);

        for (const block of blocks) {
            const lines = block
                .trim()
                .split('\n')
                .map(l => l.trim())
                .filter(Boolean);
            if (lines.length < 4) continue;

            const date = lines[0];
            const period = lines[1];
            const plusIdx = lines.findIndex(l => l === "+");
            if (plusIdx < 0 || plusIdx + 2 >= lines.length) continue;

            const pm = [];
            for (let i = 2; i < plusIdx; i += 2) {
                if (i + 1 < plusIdx) pm.push({ num: lines[i], sx_wx: lines[i + 1] });
            }
            const tm = { num: lines[plusIdx + 1], sx_wx: lines[plusIdx + 2] };
            groups.push({ date, period, pm, tm });
        }
        return groups;
    }

    /**
     * 生成期号数组
     * @param {Array} data 分组数据
     * @returns {string[]} 期号列表
     */
    function generatePeriods(data) {
        return data.map((item, i) => item.period || `${i + 1}期`);
    }

    /**
     * 原始分组数据转换为表格行数据 + 单列遗漏计数
     * @param {Array} dataArray 解析后的分组数组
     * @returns {Array<Object>} 处理完成表格数据
     */
    function processData(dataArray) {
        const countFields = ["单", "双", ...Object.keys(ALL_FIELD_RULE)];
        const missCounter = createMissCounter(countFields);
        const processedData = [];
        const periods = generatePeriods(dataArray);

        for (const [index, item] of dataArray.entries()) {
            const newItem = {
                "期数": periods[index],
                "日期": item.date || "",
                "特号": item.attribute,
                "生肖": item.Zodiac
            };
            const lastNum = item.attribute?.slice(-1) || "";

            // 单双判断
            if (lastNum) {
                newItem["单"] = singleNumSet.has(lastNum) ? "✅" : ++missCounter["单"];
                newItem["双"] = doubleNumSet.has(lastNum) ? "✅" : ++missCounter["双"];
                if (newItem["单"] === "✅") missCounter["单"] = 0;
                if (newItem["双"] === "✅") missCounter["双"] = 0;
            } else {
                newItem["单"] = "";
                newItem["双"] = "";
            }

            // 所有生肖分类遗漏计数
            const zodiac = item.Zodiac;
            if (zodiac) {
                for (const [name, zodiacList] of Object.entries(ALL_FIELD_RULE)) {
                    newItem[name] = zodiacList.includes(zodiac) ? "✅" : ++missCounter[name];
                    if (newItem[name] === "✅") missCounter[name] = 0;
                }
            } else {
                for (const name of Object.keys(ALL_FIELD_RULE)) newItem[name] = "";
            }
            processedData.push(newItem);
        }
        return processedData;
    }

    /**
     * 获取指定区间内特号，计算topN高频号码
     * @param {Array} dataArr 处理后表格数据
     * @param {number} endIdx 当前行索引
     * @param {number} range 向前取多少期
     * @returns {string[]} 高频号码数组
     */
    function getRangeNums(dataArr, endIdx, range) {
        const start = Math.max(0, endIdx - range + 1);
        if (endIdx + 1 < range) return [];
        const nums = [];
        for (let i = start; i <= endIdx; i++) {
            const n = dataArr[i]["特号"];
            if (n) nums.push(n.padStart(2, "0"));
        }
        return getTopNumbers(nums);
    }

    /**
     * 预计算每行百列、两百高频号码，避免渲染时重复计算
     * @param {Array} dataTable 处理后表格数据
     * @returns {Array<{bai:string[], liangbai:string[]}>} 每行预计算范围数据
     */
    function preCalcRangeData(dataTable) {
        return dataTable.map((_, idx) => ({
            bai: getRangeNums(dataTable, idx, 101),
            liangbai: getRangeNums(dataTable, idx, 201)
        }));
    }

    /**
     * 按四类分组统计生肖累计数值
     * @param {Object} data 单行表格数据
     * @param {Object} zodiacMap 生肖号码映射
     * @returns {Object} group1~group4统计
     */
    function getZodiacCount(data, zodiacMap = zodiacData) {
        const allZodiacs = Object.keys(zodiacMap);
        const groups = {
            group1: Object.fromEntries(allZodiacs.map(z => [z, 0])),
            group2: Object.fromEntries(allZodiacs.map(z => [z, 0])),
            group3: Object.fromEntries(allZodiacs.map(z => [z, 0]))
        };

        const updateGroup = (group, key, fMap) => {
            const val = Number(data[key]);
            if (isNaN(val) || !fMap[key]) return;
            for (const z of fMap[key]) group[z] += val;
        };

        // 四类分组更新
        Object.keys(FIELD_F_MAP).forEach(k => updateGroup(groups.group1, k, FIELD_F_MAP));
        Object.keys(FIELD_THREE_MAP).forEach(k => updateGroup(groups.group2, k, FIELD_THREE_MAP));
        Object.keys(FIELD_FOUR_MAP).forEach(k => updateGroup(groups.group3, k, FIELD_FOUR_MAP));

        // 汇总四组
        const group4 = Object.fromEntries(
            allZodiacs.map(z => [z, groups.group1[z] + groups.group2[z] + groups.group3[z]])
        );
        return { ...groups, group4 };
    }

    /**
     * 区间命中全局统计
     * @param {Array} allGroupData 每行排序生肖数据
     * @param {Array} rangeData 预计算百/两百号码
     * @param {Array} processed 表格原始数据
     * @param {number} start 起始索引
     * @param {number|null} end 结束索引
     * @returns {Record<string, Object>} 各项统计结果
     */
    function calcAllStat(allGroupData, rangeData, processed, start = 0, end = null) {
        const statKeys = ["前六", "后六", "百列", "两百", "前三", "上三", "中三", "后三"];
        const stat = Object.fromEntries(statKeys.map(k => [k, { ...STAT_ITEM_TPL }]));
        const maxEnd = end !== null ? end : allGroupData.length - 1;

        for (let i = start; i < maxEnd; i++) {
            const { sortedZodiacs } = allGroupData[i];
            const nextData = processed[i + 1];
            if (!nextData) continue;
            const nextZodiac = nextData["生肖"];
            const nextTe = nextData["特号"]?.padStart(2, "0") || "";
            if (!nextTe) continue;

            const zIdx = sortedZodiacs.indexOf(nextZodiac);
            const { bai: baiArr, liangbai: liangArr } = rangeData[i];
            const isZodiacEmpty = !sortedZodiacs.length;

            if (!isZodiacEmpty) {
                hitTest(stat["前六"], zIdx >= 0 && zIdx < 6);
                hitTest(stat["后六"], zIdx >= 6 && zIdx < 12);
                hitTest(stat["前三"], zIdx >= 0 && zIdx < 3);
                hitTest(stat["上三"], zIdx >= 3 && zIdx < 6);
                hitTest(stat["中三"], zIdx >= 6 && zIdx < 9);
                hitTest(stat["后三"], zIdx >= 9 && zIdx < 12);
            }
            if (baiArr.length) hitTest(stat["百列"], baiArr.includes(nextTe));
            if (liangArr.length) hitTest(stat["两百"], liangArr.includes(nextTe));
        }
        return stat;
    }

    // ====================== DOM 渲染函数 ======================
    /**
     * 渲染底部统计面板
     * @param {Object} globalStat 全量统计
     * @param {Object} curStat 当前显示区间统计
     * @param {number} displayCount 当前展示行数
     */
    function renderStatPanel(globalStat, curStat, displayCount) {
        const panel = document.querySelector(CONST_CONFIG.DOM_SELECTORS.statPanel);
        if (!panel) return;
        let html = `<div class="stat-row">`;
        for (const [name, data] of Object.entries(globalStat)) {
            const rateTotal = data.total > 0 ? (data.hit / data.total * 100).toFixed(2) : 0;
            const curData = curStat[name];
            const curRate = curData.total > 0 ? (curData.hit / curData.total * 100).toFixed(2) : 0;
            html += `
            <div class="stat-item">
                <strong>${name}</strong><br>
                概率:${curRate}%(${rateTotal}%)<br>
                最多连✅${data.maxConHit}期<br>
                最多连❌${data.maxMiss}期
            </div>`;
        }
        html += `</div>`;
        panel.innerHTML = html;
    }

    /**
     * 主表格渲染入口
     * @param {Array} dataArray 处理后表格数据
     * @param {Array} rangeData 预计算百/两百号码
     */
    function renderHitTable(dataArray, rangeData) {
        const tableBody = document.querySelector(CONST_CONFIG.DOM_SELECTORS.tableBody);
        if (!tableBody || !dataArray || dataArray.length < 2) return;
        tableBody.innerHTML = "";

        // 全量预计算目标列单元格
        const { resultArr: preCalcCells, group4Data } = preCalcTargetColumnCells(dataArray, rangeData);

        // 截取展示区间
        const showEndIdx = group4Data.length - 1;
        const showStartIdx = Math.max(0, showEndIdx - AppState.showLimit + 1);
        const showData = AppState.showLimit > 0 ? group4Data.slice(showStartIdx) : [...group4Data];

        // 全局统计 + 当前区间统计
        const globalStat = calcAllStat(group4Data, rangeData, dataArray);
        const currentRangeStat = calcAllStat(group4Data, rangeData, dataArray, showStartIdx, showEndIdx);

        // 批量生成行DOM，最后一次性插入（减少页面重绘）
        const fragment = document.createDocumentFragment();

        for (const rowItem of showData) {
            const { data, sortedZodiacs } = rowItem;
            const originIndex = group4Data.indexOf(rowItem);
            const isLastRow = originIndex === group4Data.length - 1;
            let hitZodiac = "";

            if (!isLastRow) {
                const nextData = dataArray[originIndex + 1];
                hitZodiac = nextData["生肖"];
            }

            // 使用预计算好的单元格值
            const columnVals = preCalcCells[originIndex];

            // 格式化展示文本
            const zodiacHtml = formatZodiacList(sortedZodiacs, hitZodiac);
            const baiRaw = [...rangeData[originIndex].bai].sort((a, b) => Number(a) - Number(b));
            const liangRaw = [...rangeData[originIndex].liangbai].sort((a, b) => Number(a) - Number(b));
            const baiHtml = formatNumberList(baiRaw);
            const liangHtml = formatNumberList(liangRaw);

            // 创建主行tr
            const tr = document.createElement("tr");
            tr.dataset.expandData = JSON.stringify({
                zodiacHtml, baiHtml, liangHtml,
                baiRaw: baiRaw.join(","), liangRaw: liangRaw.join(",")
            });
            tr.innerHTML = `
                <td>${data["期数"]}<br/>${data["特号"]}${data["生肖"]}</td>
                <td>${zodiacHtml}</td>
                <td>${columnVals["前三"]}</td>
                <td>${columnVals["上三"]}</td>
                <td>${columnVals["中三"]}</td>
                <td>${columnVals["后三"]}</td>
                <td>${columnVals["百列"]}</td>
                <td>${columnVals["两百"]}</td>
                <td>${columnVals["五百"]}</td>
            `;
            fragment.appendChild(tr);

            // 最后一行添加展开详情行
            if (isLastRow) {
                const expandTr = document.createElement("tr");
                expandTr.className = "last-expand-row";
                expandTr.innerHTML = `
                    <td colspan="9" class="last-expand-cell">
                    <div class="last-expand-inner">
                        <div class="block">
                        <div class="block-title">百列号码</div>
                        <div class="num-wrap bai-list">${baiHtml}</div>
                        <div class="copy-btn-group">
                            <button class="copy-btn copy-bai">复制百列</button>
                            <span class="tip-success">复制成功</span>
                            <span class="tip-fail">复制失败</span>
                        </div>
                        </div>
                        <div class="block">
                        <div class="block-title">两百号码</div>
                        <div class="num-wrap liang-list">${liangHtml}</div>
                        <div class="copy-btn-group">
                            <button class="copy-btn copy-liang">复制两百</button>
                            <span class="tip-success">复制成功</span>
                            <span class="tip-fail">复制失败</span>
                        </div>
                        </div>
                    </div>
                    </td>
                `;
                fragment.appendChild(expandTr);

                // 点击展开切换
                tr.addEventListener("click", (e) => {
                    e.stopPropagation();
                    if (AppState.lastExpandTr && AppState.lastExpandTr !== expandTr) {
                        AppState.lastExpandTr.classList.remove("open");
                    }
                    expandTr.classList.toggle("open");
                    AppState.lastExpandTr = expandTr.classList.contains("open") ? expandTr : null;
                });

                // 复制按钮绑定
                const dataJson = JSON.parse(tr.dataset.expandData);
                const copyBaiBtn = expandTr.querySelector(".copy-bai");
                const copyLiangBtn = expandTr.querySelector(".copy-liang");

                copyBaiBtn.onclick = (e) => {
                    e.stopPropagation();
                    const wrap = copyBaiBtn.closest(".copy-btn-group");
                    copyText(dataJson.baiRaw, wrap.querySelector(".tip-success"), wrap.querySelector(".tip-fail"));
                };
                copyLiangBtn.onclick = (e) => {
                    e.stopPropagation();
                    const wrap = copyLiangBtn.closest(".copy-btn-group");
                    copyText(dataJson.liangRaw, wrap.querySelector(".tip-success"), wrap.querySelector(".tip-fail"));
                };
            }
        }

        // 一次性渲染所有行，大幅减少回流
        tableBody.appendChild(fragment);
        // 渲染统计面板
        renderStatPanel(globalStat, currentRangeStat, showData.length);
    }

    // ====================== 页面初始化 & 事件绑定 ======================
    function initApp() {
        // 1. 解析原始数据
        // const raw = AppState.rawData;
        if (rawData) {
            const groups = parseData(rawData).reverse();
            AppState.dataArray = groups.map(g => {
                const tm = g.tm || {};
                const num = (tm.num || "").toString().padStart(2, '0');
                const sx_wx = tm.sx_wx || "";
                const zodiac = sx_wx.split('/')[0] || "";
                const date = (g.date || "").replace(/-/g, "");
                return { Zodiac: zodiac, attribute: num, period: g.period, date };
            });
        }

        // 加载新数据重置TARGET_COLUMNS遗漏计数器
        AppState.colMissCounter = Object.fromEntries(TARGET_COLUMNS.map(col => [col, 0]));

        // 2. 数据预处理 & 预计算范围号码
        AppState.processed = processData(AppState.dataArray);
        AppState.rangeData = preCalcRangeData(AppState.processed);

        // 3. 筛选按钮事件委托（代替循环绑定，性能更好）
        document.addEventListener("click", (e) => {
            const filterBtn = e.target.closest(CONST_CONFIG.DOM_SELECTORS.filterBtns);
            if (!filterBtn) return;
            document.querySelectorAll(CONST_CONFIG.DOM_SELECTORS.filterBtns).forEach(b => b.classList.remove("active"));
            filterBtn.classList.add("active");
            AppState.showLimit = Number(filterBtn.dataset.limit);
            AppState.lastExpandTr = null;
            renderHitTable(AppState.processed, AppState.rangeData);
        });

        // 统计面板切换按钮
        const statToggleBtn = document.querySelector(CONST_CONFIG.DOM_SELECTORS.statToggleBtn);
        if (statToggleBtn) {
            statToggleBtn.addEventListener("click", () => {
                const panel = document.querySelector(CONST_CONFIG.DOM_SELECTORS.statPanel);
                panel?.classList.toggle("open");
            });
        }

        // 4. 首次渲染表格
        renderHitTable(AppState.processed, AppState.rangeData);
    }

    // 启动程序
    initApp();
}
