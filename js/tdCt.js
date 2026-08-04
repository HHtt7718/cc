// ========== 生肖赋值 td页面：模板+样式+初始化逻辑 统一封装 ==========
(function () {
    // ====================== 常量定义区 ======================
    const ZODIAC_GROUP = {
        male: ["鼠", "牛", "虎", "龙", "马", "猴", "狗"],
        female: ["兔", "蛇", "羊", "鸡", "猪"],
        family: ["牛", "马", "羊", "鸡", "狗", "猪"],
        wild: ["鼠", "虎", "兔", "龙", "蛇", "猴"],
        cai: ["鼠", "猴", "鸡", "猪"],
        cao: ["牛", "兔", "马", "羊"],
        rou: ["虎", "龙", "蛇", "狗"],
        tian: ["鼠", "兔", "马", "鸡"],
        di: ["牛", "龙", "羊", "狗"],
        ren: ["虎", "蛇", "猴", "猪"],
        fu: ["鼠", "虎", "龙", "马"],
        lu: ["牛", "兔", "猴", "猪"],
        shou: ["蛇", "羊", "鸡", "狗"],
        ri: ["牛", "龙", "马", "猪"],
        yue: ["鼠", "蛇", "羊", "狗"],
        xing: ["虎", "兔", "猴", "鸡"],
        wei: ["鼠", "牛", "狗", "猪"],
        shu: ["马", "羊", "猴", "鸡"],
        wu: ["虎", "兔", "龙", "蛇"],
        qin: ["兔", "蛇", "鸡"],
        qi: ["鼠", "牛", "狗"],
        shuS: ["虎", "龙", "马"],
        hua: ["猴", "羊", "猪"],
        spring: ["虎", "兔", "龙"],
        summer: ["蛇", "马", "羊"],
        autumn: ["猴", "鸡", "狗"],
        winter: ["猪", "牛", "鼠"],
        east: ["兔", "龙", "蛇"],
        west: ["马", "羊", "猴"],
        south: ["鸡", "狗", "猪"],
        north: ["鼠", "牛", "虎"],
        plum: ["鼠", "龙", "猴"],
        orchid: ["兔", "羊", "猪"],
        ju: ["虎", "马", "狗"],
        bamboo: ["牛", "蛇", "鸡"]
    };

    const COLOR_LIST = {
        red: ["01", "02", "07", "08", "12", "13", "18", "19", "23", "24", "29", "30", "34", "35", "40", "45", "46"],
        blue: ["03", "04", "09", "10", "14", "15", "20", "25", "26", "31", "36", "37", "41", "42", "47", "48"],
        green: ["05", "06", "11", "16", "17", "21", "22", "27", "28", "32", "33", "38", "39", "43", "44", "49"]
    };

    const TABLE_HEADERS = [
        "期数", "特号",
        "男", "女", "家", "野",
        "菜", "草", "肉", "天", "地", "人",
        "福", "禄", "寿", "日", "月", "星",
        "魏", "蜀", "吴", "琴", "棋", "书", "画",
        "春", "夏", "秋", "冬", "东", "西", "南", "北",
        "梅", "兰", "菊", "竹"
    ];

    const FIELD_ZODIAC_MAP = {
        "男": ZODIAC_GROUP.male,
        "女": ZODIAC_GROUP.female,
        "家": ZODIAC_GROUP.family,
        "野": ZODIAC_GROUP.wild,
        "菜": ZODIAC_GROUP.cai,
        "草": ZODIAC_GROUP.cao,
        "肉": ZODIAC_GROUP.rou,
        "天": ZODIAC_GROUP.tian,
        "地": ZODIAC_GROUP.di,
        "人": ZODIAC_GROUP.ren,
        "福": ZODIAC_GROUP.fu,
        "禄": ZODIAC_GROUP.lu,
        "寿": ZODIAC_GROUP.shou,
        "日": ZODIAC_GROUP.ri,
        "月": ZODIAC_GROUP.yue,
        "星": ZODIAC_GROUP.xing,
        "魏": ZODIAC_GROUP.wei,
        "蜀": ZODIAC_GROUP.shu,
        "吴": ZODIAC_GROUP.wu,
        "琴": ZODIAC_GROUP.qin,
        "棋": ZODIAC_GROUP.qi,
        "书": ZODIAC_GROUP.shuS,
        "画": ZODIAC_GROUP.hua,
        "春": ZODIAC_GROUP.spring,
        "夏": ZODIAC_GROUP.summer,
        "秋": ZODIAC_GROUP.autumn,
        "冬": ZODIAC_GROUP.winter,
        "东": ZODIAC_GROUP.east,
        "西": ZODIAC_GROUP.west,
        "南": ZODIAC_GROUP.south,
        "北": ZODIAC_GROUP.north,
        "梅": ZODIAC_GROUP.plum,
        "兰": ZODIAC_GROUP.orchid,
        "菊": ZODIAC_GROUP.ju,
        "竹": ZODIAC_GROUP.bamboo
    };

    const CELL_BG_MAP = {
        "男": "#e0f7ff", "女": "#e0f7ff",
        "家": "#e8f5e9", "野": "#e8f5e9",
        "菜": "#fff8e1", "草": "#fff8e1", "肉": "#fff8e1",
        "天": "#fce4ec", "地": "#fce4ec", "人": "#fce4ec",
        "福": "#ffe0e0", "禄": "#ffe0e0", "寿": "#ffe0e0",
        "日": "#e0e0e0", "月": "#e0e0e0", "星": "#e0e0e0",
        "魏": "#e8f5e9", "蜀": "#e8f5e9", "吴": "#e8f5e9",
        "琴": "#fff8e1", "棋": "#fff8e1", "书": "#fff8e1", "画": "#fff8e1",
        "春": "#e0f7fa", "夏": "#e0f7fa", "秋": "#e0f7fa", "冬": "#e0f7fa",
        "东": "#b3cde0", "西": "#b3cde0", "南": "#b3cde0", "北": "#b3cde0",
        "梅": "#f8c8dc", "兰": "#f8c8dc", "菊": "#f8c8dc", "竹": "#f8c8dc"
    };

    const HEAD_GRADIENT = {
        "男女": "linear-gradient(to top, #b3cde0, #9ab3d0)",
        "家野": "linear-gradient(to top, #c8e6c9, #a5d6a7)",
        "菜草肉": "linear-gradient(to top, #fff9c4, #f0e6b0)",
        "天地人": "linear-gradient(to top, #f8c8dc, #e8b8d0)",
        "福禄寿": "linear-gradient(to top, #ffccbc, #f5b0a0)",
        "日月星": "linear-gradient(to top, #b0bec5, #90a4ae)",
        "魏蜀吴": "linear-gradient(to top, #c8e6c9, #a5d6a7)",
        "琴棋书画": "linear-gradient(to top, #fff9c4, #f0e6b0)",
        "春夏秋冬": "linear-gradient(to top, #b2ebf2, #80deea)",
        "东西南北": "linear-gradient(to top, #b3cde0, #9ab3d0)",
        "梅兰菊竹": "linear-gradient(to top, #f8c8dc, #e8b8d0)"
    };

    const GROUP_FIELDS = {
        "男女": ["男", "女"],
        "家野": ["家", "野"],
        "菜草肉": ["菜", "草", "肉"],
        "天地人": ["天", "地", "人"],
        "福禄寿": ["福", "禄", "寿"],
        "日月星": ["日", "月", "星"],
        "魏蜀吴": ["魏", "蜀", "吴"],
        "琴棋书画": ["琴", "棋", "书", "画"],
        "春夏秋冬": ["春", "夏", "秋", "冬"],
        "东西南北": ["东", "西", "南", "北"],
        "梅兰菊竹": ["梅", "兰", "菊", "竹"]
    };

    // 页面私有变量
    let originalData = [];

    // 1. 页面CSS动态注入（全部选择器加 .td-glass 隔离，杜绝污染首页）
    function injectTdStyle() {
        if (document.getElementById('td-page-style')) return;
        const style = document.createElement('style');
        style.id = 'td-page-style';
        style.innerHTML = `
        .td-glass {
            width: 100%;
            max-width: 1400px;
            margin: 0 auto;
            background: rgb(165 125 125 / 60%);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            border: 1px solid rgba(0, 0, 0, 0.08);
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        .td-glass .btn-group {
            position: sticky;
            top: 0;
            background-color: rgba(255, 255, 255, 0.2);
            padding: 10px;
            border-bottom: 1px solid #ddd;
            z-index: 1000;
            display: flex;
            margin-bottom: 15px;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
        }
        .td-glass .data-btn {
            padding: 8px 16px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            border-radius: 6px;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .td-glass .data-btn:hover {
            background: rgba(180, 190, 220, 0.3);
        }
        .td-glass .data-btn.active {
            background: linear-gradient(45deg, #ab6ab3, #b99333);
            color: #fff;
            border-color: rgba(100, 120, 180, 0.5);
        }
        .td-glass .table-wrapper {
            width: 100%;
            overflow-x: auto;
            border-radius: 8px;
            scrollbar-width: none;
        }
        .td-glass .table-wrapper::-webkit-scrollbar {
            display: none;
        }
        .td-glass table {
            width: 100%;
            min-width: 800px;
            font-weight: bold;
            border-spacing: 0;
            border-radius: 8px;
            overflow: hidden;
        }
        .td-glass th,
        .td-glass td {
            border-right: 1px solid rgba(0, 0, 0, 0.08);
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
            padding: 10px 8px;
            text-align: center;
            font-size: 15px;
            color: #222;
            white-space: nowrap;
        }
        .td-glass th {
            text-transform: uppercase;
            position: sticky;
            top: 0;
            z-index: 10;
            font-size: 14px;
        }
        .td-glass td:last-child {
            border-right: none;
        }
        .td-glass tr:last-child td {
            border-bottom: none;
        }
        .td-glass tr:nth-child(even) {
            background-color: rgba(0, 0, 0, 0.02);
        }
        .td-glass tr:hover {
            background-color: rgba(180, 190, 220, 0.1);
        }
        #contentWrapper{ max-width:1400px; }
        @media (max-width: 768px) {
            .td-glass {
                padding: 10px;
            }
            .td-glass th,
            .td-glass td {
                padding: 6px 4px;
                font-size: 12px;
            }
            .td-glass .data-btn {
                padding: 5px 5px;
                font-size: 13px;
            }
        }
        `;
        document.head.appendChild(style);
    }

    // 工具函数
    function getAttributeColor(num) {
        if (COLOR_LIST.red.includes(num)) return "red";
        if (COLOR_LIST.blue.includes(num)) return "blue";
        if (COLOR_LIST.green.includes(num)) return "green";
        return "";
    }

    function checkInArray(value, arr) {
        return arr.includes(value) ? arr[0] : "";
    }

    function parseData(raw) {
        const groups = [];
        if (!raw) return groups;
        const blocks = raw.trim().split(/\n\s*\n(?=\d{4}-\d{2}-\d{2}\s*\n\d+期)/);
        for (const block of blocks) {
            const lines = block.trim().split('\n').map(l => l.trim()).filter(Boolean);
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

    function generatePeriods(data) {
        return data.map((item, i) => item.period || `${i + 1}期`);
    }

    function printZodiacStats(title, targetFields, lastRow) {
        const zodiacOrder = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
        const countMap = {};
        targetFields.forEach(field => {
            if (!isNaN(lastRow[field])) {
                FIELD_ZODIAC_MAP[field].forEach(zodiac => {
                    countMap[zodiac] = (countMap[zodiac] || 0) + 1;
                });
            }
        });
        zodiacOrder.forEach(zodiac => {
            if (!(zodiac in countMap)) countMap[zodiac] = 0;
        });
        Object.entries(countMap).sort((a, b) => {
            if (b[1] !== a[1]) return b[1] - a[1];
            return zodiacOrder.indexOf(a[0]) - zodiacOrder.indexOf(b[0]);
        });
    }

    function processData(rawStr) {
        let dataArray = [];
        if (rawStr) {
            const groups = parseData(rawStr).reverse();
            dataArray = groups.map(g => {
                const tm = g.tm || {};
                const num = (tm.num || "").toString().padStart(2, '0');
                const sx_wx = tm.sx_wx || "";
                const zodiac = sx_wx.split('/')[0] || "";
                const date = (g.date || "").replace(/-/g, "");
                return { Zodiac: zodiac, attribute: num, period: g.period, date };
            });
        }

        const processedData = [];
        const countMap = {};
        const propHeaders = TABLE_HEADERS.slice(2);
        propHeaders.forEach(header => countMap[header] = 1);

        const periods = generatePeriods(dataArray);
        const singleArray = ["1", "3", "5", "7", "9"];

        dataArray.forEach((item, index) => {
            const row = {};
            row["期数"] = periods[index];
            row["日期"] = item.date || "";
            row["特号"] = item.attribute;
            row["生肖"] = item.Zodiac;

            const tailNum = item.attribute.slice(-1);
            const isSingle = checkInArray(tailNum, singleArray);
            let singleNotContainCount = 1;
            if (isSingle) {
                row["单"] = "单";
                singleNotContainCount = 1;
            } else {
                row["单"] = singleNotContainCount;
                singleNotContainCount++;
            }
            row["双"] = checkInArray(tailNum, ["0", "2", "4", "6", "8"]) ? "双" : `${row["期数"]}不包含`;

            const propRule = [
                ["男", item.Zodiac, ZODIAC_GROUP.male],
                ["女", item.Zodiac, ZODIAC_GROUP.female],
                ["家", item.Zodiac, ZODIAC_GROUP.family],
                ["野", item.Zodiac, ZODIAC_GROUP.wild],
                ["菜", item.Zodiac, ZODIAC_GROUP.cai],
                ["草", item.Zodiac, ZODIAC_GROUP.cao],
                ["肉", item.Zodiac, ZODIAC_GROUP.rou],
                ["天", item.Zodiac, ZODIAC_GROUP.tian],
                ["地", item.Zodiac, ZODIAC_GROUP.di],
                ["人", item.Zodiac, ZODIAC_GROUP.ren],
                ["福", item.Zodiac, ZODIAC_GROUP.fu],
                ["禄", item.Zodiac, ZODIAC_GROUP.lu],
                ["寿", item.Zodiac, ZODIAC_GROUP.shou],
                ["日", item.Zodiac, ZODIAC_GROUP.ri],
                ["月", item.Zodiac, ZODIAC_GROUP.yue],
                ["星", item.Zodiac, ZODIAC_GROUP.xing],
                ["魏", item.Zodiac, ZODIAC_GROUP.wei],
                ["蜀", item.Zodiac, ZODIAC_GROUP.shu],
                ["吴", item.Zodiac, ZODIAC_GROUP.wu],
                ["琴", item.Zodiac, ZODIAC_GROUP.qin],
                ["棋", item.Zodiac, ZODIAC_GROUP.qi],
                ["书", item.Zodiac, ZODIAC_GROUP.shuS],
                ["画", item.Zodiac, ZODIAC_GROUP.hua],
                ["春", item.Zodiac, ZODIAC_GROUP.spring],
                ["夏", item.Zodiac, ZODIAC_GROUP.summer],
                ["秋", item.Zodiac, ZODIAC_GROUP.autumn],
                ["冬", item.Zodiac, ZODIAC_GROUP.winter],
                ["东", item.Zodiac, ZODIAC_GROUP.east],
                ["西", item.Zodiac, ZODIAC_GROUP.west],
                ["南", item.Zodiac, ZODIAC_GROUP.south],
                ["北", item.Zodiac, ZODIAC_GROUP.north],
                ["梅", item.Zodiac, ZODIAC_GROUP.plum],
                ["兰", item.Zodiac, ZODIAC_GROUP.orchid],
                ["菊", item.Zodiac, ZODIAC_GROUP.ju],
                ["竹", item.Zodiac, ZODIAC_GROUP.bamboo]
            ];
            propRule.forEach(([key, val, arr]) => {
                row[key] = checkInArray(val, arr) ? key : `${row["期数"]}不包含`;
            });

            propHeaders.forEach(header => {
                if (!row[header].includes(header)) {
                    row[header] = countMap[header];
                    countMap[header]++;
                } else {
                    countMap[header] = 1;
                }
            });
            processedData.push(row);
        });
        return processedData;
    }

    function getLastNData(count) {
        if (count === 'all') return [...originalData];
        return originalData.slice(-count);
    }

    // 全局渲染函数，页面内按钮调用
    window.renderTdTable = function (data) {
        const table = document.getElementById('td-dataTable');
        if (!table) return;
        table.innerHTML = '';
        const headerRow = document.createElement('tr');
        TABLE_HEADERS.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            for (const groupName in GROUP_FIELDS) {
                if (GROUP_FIELDS[groupName].includes(header)) {
                    th.style.background = HEAD_GRADIENT[groupName];
                    break;
                }
            }
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        data.forEach(item => {
            const row = document.createElement('tr');
            TABLE_HEADERS.forEach(header => {
                const td = document.createElement('td');
                const val = item[header];
                if (header === "特号") {
                    const color = getAttributeColor(item["特号"]);
                    td.innerHTML = color
                        ? `<span style="color:${color}">${item["特号"]}</span> ${item["生肖"]}`
                        : `${item["特号"]} ${item["生肖"]}`;
                } else if (CELL_BG_MAP[val]) {
                    td.textContent = val;
                    td.style.backgroundColor = CELL_BG_MAP[val];
                } else {
                    td.textContent = val;
                }
                row.appendChild(td);
            });
            table.appendChild(row);
        });
    }

    // ========== 对外全局暴露函数（和其他页面统一） ==========
    window.getTdHtml = function () {
        return `
        <div class="td-glass">
            <div class="btn-group">
                <button class="data-btn active" data-num="20">近20期</button>
                <button class="data-btn" data-num="50">近50期</button>
                <button class="data-btn" data-num="100">近100期</button>
                <button class="data-btn" data-num="all">全部数据</button>
            </div>
            <div class="table-wrapper">
                <table id="td-dataTable"></table>
            </div>
        </div>
        `;
    }

    window.initTdTouch = function () {
        injectTdStyle();
        // 使用全局rawData（数据源切换自动更新）
        const processed = processData(rawData);
        originalData = [...processed];

        // 控制台原有打印逻辑保留
        if (processed.length > 0) {
            const last = processed[processed.length - 1];
            const fields = Object.keys(FIELD_ZODIAC_MAP);
            const zodiacCount = {};
            fields.forEach(field => {
                if (!isNaN(last[field])) {
                    // console.log(`${field} ——包含的生肖：`, FIELD_ZODIAC_MAP[field].join(","));
                    FIELD_ZODIAC_MAP[field].forEach(zodiac => {
                        zodiacCount[zodiac] = (zodiacCount[zodiac] || 0) + 1;
                    });
                }
            });
            printZodiacStats("[四分段]", ["琴", "棋", "书", "画", "春", "夏", "秋", "冬", "东", "西", "南", "北", "梅", "兰", "菊", "竹"], last);
            printZodiacStats("[三分段]", ["菜", "草", "肉", "天", "地", "人", "福", "禄", "寿", "日", "月", "星", "魏", "蜀", "吴"], last);
        }

        // 绑定筛选按钮
        const buttons = document.querySelectorAll('.td-glass .data-btn');
        buttons.forEach(btn => {
            btn.onclick = function () {
                buttons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const num = this.dataset.num;
                const showData = num === 'all' ? getLastNData('all') : getLastNData(Number(num));
                renderTdTable(showData);
            }
        });
        // 默认渲染20期
        renderTdTable(getLastNData(20));
    }
})();