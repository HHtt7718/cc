// ========== 生肖表格页面：模板+样式+初始化逻辑 统一封装 ==========
// 全局变量隔离在页面作用域，不污染全局
(function () {
    // 全局页面私有变量
    const ZODIAC = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
    const colorMap = {
        '红': [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46],
        '蓝': [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48],
        '绿': [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49]
    };
    const colorClass = { 红: 'tag-red', 蓝: 'tag-blue', 绿: 'tag-green' };

    let countMap = {};
    let fullData = [];
    let dataList = [];
    let lastActiveIndex = -1;

    // 1. 页面CSS样式，动态注入
    function injectZcStyle() {
        if (document.getElementById('zc-page-style')) return;
        const style = document.createElement('style');
        style.id = 'zc-page-style';
        style.innerHTML = `
        .zc-glass {
            background: linear-gradient(135deg, #4e3636e3 0%, #0e3291 100%);
            -webkit-backdrop-filter: blur(12px);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            padding: 15px;
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
        }
        .zc-glass .zc-btn-group {
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
        .zc-glass .zc-filter-btn {
            padding: 8px 16px;
            border-radius: 8px;
            border: none;
            background: rgba(255, 255, 255, 0.2);
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s ease;
            backdrop-filter: blur(8px);
        }
        .zc-glass .zc-filter-btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        .zc-glass .zc-filter-btn.active {
            background: linear-gradient(45deg, #ab6ab3, #b99333);
        }
        .zc-glass .zc-table-container {
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }
        .zc-glass .zc-table {
            width: 100%;
            border-collapse: collapse;
            color: #fff;
            text-align: center;
        }
        .zc-glass .zc-table th {
            background: rgba(255, 255, 255, 0.2);
            padding: 12px 6px;
            font-size: clamp(13px, 2vw, 16px);
            border-bottom: 2px solid rgba(255, 255, 255, 0.3);
            white-space: nowrap;
        }
        .zc-glass .zc-table td {
            padding: 12px 6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            font-size: clamp(12px, 1.5vw, 14px);
        }
        .zc-glass .zc-table tbody tr {
            cursor: pointer;
            transition: background 0.2s ease;
            -webkit-tap-highlight-color: transparent;
        }
        .zc-glass .zc-table tbody tr:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        .zc-glass .zodiac-box {
            display: flex;
            flex-wrap: wrap;
            gap: 2px;
            justify-content: center;
            align-items: center;
        }
        .zc-glass .zodiac-item {
            width: clamp(28px, 4vw, 38px);
            height: clamp(28px, 4vw, 38px);
            line-height: clamp(28px, 4vw, 38px);
            border-radius: 6px;
            font-weight: bold;
            font-size: clamp(15px, 1.5vw, 12px);
            background: rgba(255, 255, 255, 0.1);
        }
        .zc-glass .z-flat { background: #4CAF50; color: #000; }
        .zc-glass .z-special { background: #bf2a2a; color: white; }
        .zc-glass .z-both { background: linear-gradient(45deg, #4c9daf, #f32121); color: white; }
        .zc-glass .tag-red { background: #f44336; padding: 4px 8px; border-radius: 4px; display: inline-block; }
        .zc-glass .tag-blue { background: #2196F3; padding: 4px 8px; border-radius: 4px; display: inline-block; }
        .zc-glass .tag-green { background: #4CAF50; padding: 4px 8px; border-radius: 4px; display: inline-block; }
        .zc-glass .detail-row { background: rgba(255, 255, 255, 0.08); display: none; }
        .zc-glass .detail-content {
            padding: 12px 15px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 15px;
            color: #fff;
            font-size: clamp(12px, 1.5vw, 14px);
            justify-content: center;
        }
        .zc-glass .copy-btn {
            background: #2196F3;
            border: none;
            color: #fff;
            padding: 6px 12px;
            border-radius: 6px;
            cursor: pointer;
            appearance: none;
            font-size: clamp(12px, 1.5vw, 14px);
            transition: background 0.2s;
        }
        .zc-glass .copy-btn:hover { background: #1976D2; }
        .zc-glass .copy-tip { color: #4CAF50; font-size: clamp(11px, 1.2vw, 12px); display: none; }
        @media (max-width: 768px) {
            .zc-glass .zc-filter-btn{ padding: 10px 10px; }
            .zc-glass .detail-content{ padding: 10px 10px; gap: 5px; flex-wrap: nowrap;}
            .zc-glass .zc-table td{ padding: 5px 5px; }
            .zc-glass .zodiac-item { 
                display: flex;  justify-content: center; align-items: center;
                width: clamp(22px, 4vw, 38px); height: clamp(22px, 4vw, 38px);
            }
            .zc-glass .zc-table th{ padding: 5px 5px; background: unset;}
        }
        @media (max-width: 768px) {
            .zc-glass{ padding: 0px;}
        }
    `;
        document.head.appendChild(style);
    }

    // 2. 数据解析
    function parseData() {
        const lines = rawData.split('\n').map(i => i.trim()).filter(Boolean);
        const result = [];
        let index = 0;
        while (index < lines.length) {
            index++;
            const period = lines[index++];
            const flats = [];
            for (let i = 0; i < 6; i++) {
                const num = lines[index++];
                const zodiac = lines[index++].split('/')[0];
                flats.push({ num, zodiac });
            }
            index++;
            const specialNum = lines[index++];
            const specialZodiac = lines[index++].split('/')[0];
            result.push({ period, flats, special: { num: specialNum, zodiac: specialZodiac } });
        }
        return result.reverse();
    }

    // 3. 号码颜色匹配
    function getNumberColor(num) {
        const n = parseInt(num);
        for (const [color, arr] of Object.entries(colorMap)) {
            if (arr.includes(n)) return color;
        }
        return '红';
    }

    // 4. 复制文本
    window.copyCompatible = function (text, tipId) {
        try {
            const input = document.createElement('input');
            input.value = text;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            const tip = document.getElementById(tipId);
            tip.style.display = 'inline';
            setTimeout(() => tip.style.display = 'none', 1500);
        } catch (e) {
            alert('复制失败：' + text);
        }
    }

    // 5. 生肖整理
    function getSortedZodiac(item) {
        const current = [...new Set([...item.flats.map(i => i.zodiac), item.special.zodiac])];
        return ZODIAC.filter(z => current.includes(z)).join(',');
    }

    // 6. 展开/收起详情行
    window.toggleDetail = function (index) {
        if (lastActiveIndex !== -1 && lastActiveIndex !== index) {
            const prev = document.getElementById(`detail_${lastActiveIndex}`);
            if (prev) prev.style.display = 'none';
        }
        const currentDetail = document.getElementById(`detail_${index}`);
        if (!currentDetail) return;
        if (currentDetail.style.display === 'table-row') {
            currentDetail.style.display = 'none';
            lastActiveIndex = -1;
        } else {
            currentDetail.style.display = 'table-row';
            lastActiveIndex = index;
        }
    }

    // 7. 表格渲染
    function renderTable() {
        const tbody = document.getElementById('zc-tbody');
        countMap = {};
        ZODIAC.forEach(z => countMap[z] = 0);
        lastActiveIndex = -1;
        let html = '';
        dataList.forEach((item, index) => {
            const flatZodiacs = item.flats.map(i => i.zodiac);
            const specialZodiac = item.special.zodiac;
            const zodiacText = getSortedZodiac(item);
            let zodiacHtml = '<div class="zodiac-box">';
            ZODIAC.forEach(z => {
                let cls = 'zodiac-item';
                let text = '';
                const isFlat = flatZodiacs.includes(z);
                const isSpecial = specialZodiac === z;
                if (isFlat || isSpecial) {
                    countMap[z] = 0;
                    text = z;
                    cls += isFlat && isSpecial ? ' z-both' : isSpecial ? ' z-special' : ' z-flat';
                } else {
                    countMap[z]++;
                    text = countMap[z];
                }
                zodiacHtml += `<div class="${cls}">${text}</div>`;
            });
            zodiacHtml += '</div>';
            const color = getNumberColor(item.special.num);
            const specialHtml = `<span class="${colorClass[color]}">${item.special.num} ${item.special.zodiac}</span>`;
            html += `
            <tr onclick="toggleDetail(${index})">
                <td>${zodiacHtml}</td>
            </tr>
            <tr id="detail_${index}" class="detail-row">
                <td colspan="1">
                    <div class="detail-content">
                        <span>${item.period} ${item.flats.map(i => `${i.num}(${i.zodiac})`).join(',')} </span>
                        <span>+ ${item.special.num}(${item.special.zodiac})</span>
                        <button class="copy-btn" onclick="copyCompatible('${zodiacText}','tip_${index}')">复制</button>
                        <span id="tip_${index}" class="copy-tip">复制成功！</span>
                    </div>
                </td>
            </tr>
            `;
        });
        tbody.innerHTML = html;
    }

    // 8. 筛选数据
    window.filterData = function (count) {
        if (event?.target) {
            document.querySelectorAll('.zc-filter-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
        }
        if (count === 'all') {
            dataList = [...fullData];
        } else {
            dataList = fullData.slice(-count);
        }
        renderTable();
    }

    // ========== 对外全局暴露 2个核心函数（和home、sx格式统一） ==========
    /**
     * 获取生肖表格页面HTML模板
     * @returns {string} html字符串
     */
    window.getZcHtml = function () {
        return `
        <div class="zc-glass">
            <div class="zc-btn-group">
                <button class="zc-filter-btn active" onclick="filterData(10)">近10期</button>
                <button class="zc-filter-btn" onclick="filterData(20)">近20期</button>
                <button class="zc-filter-btn" onclick="filterData(50)">近50期</button>
                <button class="zc-filter-btn" onclick="filterData('all')">全部数据</button>
            </div>
            <div class="zc-table-container">
                <table class="zc-table">
                    <tbody id="zc-tbody"></tbody>
                </table>
            </div>
        </div>
        `;
    }


    window.initZcTouch = function () {
        injectZcStyle();
        fullData = parseData();
        filterData(10);
    }
})();