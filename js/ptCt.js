// ========== PT页面 HTML模板 ==========
function getPtHtml() {
    return `
<div class="glass-container glass">
    <div class="pt-wrap">
        <div class="copy-toast" id="copyToast"></div>

        <div class="container">
            <div class="btn-group">
                <button class="period-btn active" data-count="10">近10期</button>
                <button class="period-btn" data-count="20">近20期</button>
                <button class="period-btn" data-count="50">近50期</button>
                <button class="period-btn" data-count="all">全部</button>
                <div class="prob-box-toggle-bar" id="probToggleBar">统计</div>

            </div>

            <div class="prob-box" id="probBox">
                <div>
                    往期概率：<span id="pastRate">0%</span>
                    <div class="streak-desc" id="pastMaxStreak">往期最多连✅：0 次</div>
                </div>
                <div>
                    1平10特概率: <span id="tenRate">0%</span>
                    <div class="streak-desc" id="tenMaxStreak">1平10特最多连✅：0 次</div>
                </div>
                <div>
                    平尾概率：<span id="weiRate">0%</span>
                    <div class="streak-desc" id="weiMaxStreak">平尾加特尾最多连✅：0 次</div>
                </div>
            </div>

            <div class="table-wrapper">
                <table id="dataTable">
                    <thead>
                        <tr>
                            <th>期数｜特号</th>
                            <th>往期命中</th>
                            <th>1平10特命中</th>
                            <th>2平特尾</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
</div>
`;
}

// ========== PT页面初始化函数 initPtTouch ==========
function initPtTouch() {
    // 创建页面样式标签（框架会自动id="pt-page-style"移除）
    if (!document.getElementById('pt-page-style')) {
        const styleText = `
            .pt-wrap * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            .pt-wrap .container {
                max-width: 1200px;
                margin: 0 auto;
                background: linear-gradient(135deg, #384581 0%, #764ba2 100%);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border-radius: 16px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                padding: 20px;
                box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
            }
            .pt-wrap .btn-group {
                position: sticky;
                top: 0;
                background-color: rgb(139 139 139 / 20%);
                padding: 10px;
                border-bottom: 1px solid #ddd;
                z-index: 1000;
                display: flex;
                margin-bottom: 15px;
                flex-wrap: wrap;
                justify-content: center;
                gap: 10px;
            }
            .pt-wrap .period-btn {
                padding: 10px 20px;
                border: none;
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.3);
                backdrop-filter: blur(8px);
                color: #fff;
                font-size: 16px;
                cursor: pointer;
                transition: 0.3s;
            }
            .pt-wrap .period-btn.active {
                background: rgba(255, 255, 255, 0.8);
                color: #764ba2;
                font-weight: bold;
            }
            .pt-wrap .period-btn:hover {
                background: rgba(255, 255, 255, 0.5);
            }
            .pt-wrap .prob-box {
                display: none;
                flex-wrap: wrap;
                justify-content: space-around;
                gap: 15px;
                margin-bottom: 20px;
                padding: 15px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                color: #fff;
                font-size: 18px;
                text-align: center;
            }
            .pt-wrap .prob-box-toggle-bar{
                color:#fff;
                text-align:center;
                padding: 10px 20px;
                background:rgba(255,255,255,0.15);
                border-radius:12px;
                cursor:pointer;
            }
            .pt-wrap .streak-desc {
                font-size: 14px;
                color: #ffd700;
                margin-top: 5px;
                font-weight: normal;
            }
            .pt-wrap .copy-btn {
                padding: 6px 12px;
                border: none;
                border-radius: 6px;
                background: #4facfe;
                color: white;
                font-size: 14px;
                cursor: pointer;
                transition: 0.3s;
                margin:2px;
            }
            .pt-wrap .copy-btn:hover {
                background: #00a8ff;
            }
            .pt-wrap .table-wrapper {
                width: 100%;
                overflow-x: auto;
                border-radius: 12px;
            }
            .pt-wrap table {
                border-collapse: collapse;
                width: 100%;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(8px);
                color: #fff;
            }
            .pt-wrap th,td {
                border: 1px solid rgb(16 16 16 / 20%);
                padding: 12px;
                text-align: center;
                vertical-align: middle;
            }
            .pt-wrap tr.detail-row{
                background:rgba(255,255,255,0.08);
            }
            .pt-wrap .detail-content{
                padding:12px;
                width:100%;
            }
            .pt-wrap .detail-wrap{
                display:flex;
                gap:24px;
                align-items:flex-start;
                flex-wrap: nowrap !important;
                overflow-x: auto;
                padding-bottom:8px;
                justify-content: center;
            }
            .pt-wrap .detail-block{
                flex:0 0 auto;
                min-width:220px;
            }
            .pt-wrap .detail-title{
                font-weight:bold;
                margin-bottom:4px;
                color:#ffd700;
            }
            .pt-wrap th {
                background: rgb(104 99 99 / 20%);
                position: sticky;
                top: 0;
                font-weight: bold;
            }
            .pt-wrap tr:nth-child(even) {
                background: rgb(90 90 90 / 5%);
            }
            .pt-wrap .highlight {
                background: rgba(255, 224, 130, 0.3);
                font-weight: bold;
                color: #ffd700;
            }
            .pt-wrap .correct {
                color: #00ff00;
                font-weight: bold;
                margin-left: 5px;
            }
            .pt-wrap .wrong {
                color: #ff4444;
                font-weight: bold;
                margin-left: 5px;
            }
            .pt-wrap .sx-red {
                color: #ff0000;
                font-weight: bold;
            }
            .pt-wrap .copy-toast {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #fff;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 16px;
                display: none;
                z-index: 9999;
            }
            .pt-wrap .toast-success{
                background: rgba(0, 200, 0, 0.8);
            }
            .pt-wrap .toast-fail{
                background: rgba(200,0,0,0.8);
            }
            @media (max-width: 768px) {
                .pt-wrap .period-btn { padding: 5px 5px; }
                .pt-wrap .container { padding: 5px; }
                .pt-wrap .prob-box { font-size: 16px; gap: 5px;}
                .pt-wrap th,td { padding: 5px; font-size: 12px; }
                .pt-wrap .detail-wrap{ gap:5px; }
                .pt-wrap .detail-block{ min-width: 40%;}
                .pt-wrap .prob-box-toggle-bar { margin-bottom: 0px; padding: 5px 5px;}
                .pt-wrap .btn-group { padding: 2px;}
            }
        `;
        const style = document.createElement('style');
        style.id = 'pt-page-style';
        style.textContent = styleText;
        document.head.appendChild(style);
    }
    // ====================== PT业务逻辑 ======================
    const PERIOD_COUNT = 9;
    const PINGWEI_LOOK_BACK = 1;

    let originalGroups = [];
    let reversedGroups = [];
    let processedData = [];
    let showData = [];
    let lastActiveIndex = -1;

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

    function parseData(raw) {
        const groups = [];
        const blocks = raw.trim().split(/\n\s*\n(?=\d{4}-\d{2}-\d{2}\s*\n\d+期)/);
        for (const block of blocks) {
            const lines = block.trim().split('\n').map(l => l.trim()).filter(Boolean);
            if (lines.length < 6) continue;
            const date = lines[0];
            const period = lines[1];
            const plusIdx = lines.findIndex(l => l === "+");
            if (plusIdx < 0 || plusIdx + 2 >= lines.length) continue;
            const pm = [];
            for (let i = 2; i < plusIdx; i += 2) {
                pm.push({ num: lines[i], sx_wx: lines[i + 1] });
            }
            const tm = { num: lines[plusIdx + 1], sx_wx: lines[plusIdx + 2] };
            groups.push({ date, period, pm, tm });
        }
        return groups;
    }

    function formatNumberList(numArr, perLinePc, perLineMobile) {
        const isMobile = window.innerWidth <= 768;
        const perLine = isMobile ? perLineMobile : perLinePc;
        const chunks = [];
        for (let i = 0; i < numArr.length; i += perLine) {
            chunks.push(numArr.slice(i, i + perLine).join(',') + ',');
        }
        return chunks.join('<br>');
    }

    function getPingWei(index) {
        const current = reversedGroups[index];
        if (index - PINGWEI_LOOK_BACK < 0 || !current) {
            return { str: '', hit: '', missingStr: '', includeList: [] };
        }
        const targetGroups = [];
        for (let i = index - PINGWEI_LOOK_BACK; i <= index; i++) {
            targetGroups.push(reversedGroups[i]);
        }
        const allNums = [];
        targetGroups.forEach(g => {
            allNums.push(...g.pm.map(x => x.num), g.tm.num);
        });
        const weiSet = new Set();
        allNums.forEach(num => weiSet.add(num.toString().slice(-1)));
        const sorted = Array.from(weiSet).sort((a, b) => a - b);
        const allWei = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const missing = allWei.filter(w => !weiSet.has(w));
        const missingStr = missing.length > 0 ? `缺失：${missing.join(',')}` : '';
        let hit = '';
        const next = reversedGroups[index + 1];
        if (next) {
            hit = sorted.includes(next.tm.num.toString().slice(-1))
                ? '<span class="correct">✅</span>'
                : '<span class="wrong">❌</span>';
        }
        return { str: sorted.join(','), hit, missingStr, includeList: sorted };
    }

    function getTenPeriodNumbers(currentIndex) {
        if (currentIndex - PERIOD_COUNT < 0) return { numbers: "", rawList: [] };
        const current = reversedGroups[currentIndex];
        const pingCodes = current.pm.map(x => x.num.padStart(2, '0'));
        const teCodes = [];
        for (let i = currentIndex - PERIOD_COUNT; i <= currentIndex; i++) {
            teCodes.push(reversedGroups[i].tm.num.padStart(2, '0'));
        }
        const unique = [...new Set([...pingCodes, ...teCodes])].map(Number).sort((a, b) => a - b).map(x => x.toString().padStart(2, '0'));
        return { rawList: unique };
    }

    function getPastNumbers(currentIndex) {
        if (currentIndex - PERIOD_COUNT < 0) return { numbers: '', raw: [] };
        const past = [];
        for (let i = currentIndex - PERIOD_COUNT; i <= currentIndex; i++) {
            reversedGroups[i].pm.forEach(x => past.push(x.num.padStart(2, '0')));
        }
        const unique = [...new Set(past)].map(Number).sort((a, b) => a - b).map(x => x.toString().padStart(2, '0'));
        return { raw: unique };
    }

    function calcMaxStreakByField(field) {
        let max = 0;
        let current = 0;
        processedData.forEach(item => {
            const hitStr = item[field];
            if (hitStr && hitStr.includes('✅')) {
                current++;
                if (current > max) max = current;
            } else if (hitStr && hitStr.includes('❌')) {
                current = 0;
            }
        });
        return max;
    }

    function calcMaxWrongStreakByField(field) {
        let max = 0;
        let current = 0;
        processedData.forEach(item => {
            const hitStr = item[field];
            if (hitStr && hitStr.includes('❌')) {
                current++;
                if (current > max) max = current;
            } else if (hitStr && hitStr.includes('✅')) {
                current = 0;
            }
        });
        return max;
    }

    function calcAllMaxStreaks() {
        return {
            past: calcMaxStreakByField('pastHit'),
            ten: calcMaxStreakByField('tenHit'),
            wei: calcMaxStreakByField('weiHit'),
            pastWrong: calcMaxWrongStreakByField('pastHit'),
            tenWrong: calcMaxWrongStreakByField('tenHit'),
            weiWrong: calcMaxWrongStreakByField('weiHit'),
        };
    }

    function preprocessAllData() {
        processedData = [];
        reversedGroups.forEach((item, idx) => {
            const past = getPastNumbers(idx);
            const ten = getTenPeriodNumbers(idx);
            const wei = getPingWei(idx);
            let pastHit = '';
            let tenHit = '';

            // 存在下一期：正常带✅/❌
            if (past.raw.length > 0 && reversedGroups[idx + 1]) {
                const isHit = past.raw.includes(reversedGroups[idx + 1].tm.num.padStart(2, '0'));
                pastHit = isHit ? `${past.raw.length}个<span class="correct">✅</span>` : `${past.raw.length}个<span class="wrong">❌</span>`;
            } else if (past.raw.length > 0) {
                // 最新一期（无下一期）：只输出号码个数，无对错标记
                pastHit = `${past.raw.length}个`;
            }

            if (ten.rawList.length > 0 && reversedGroups[idx + 1]) {
                const isHit = ten.rawList.includes(reversedGroups[idx + 1].tm.num.padStart(2, '0'));
                tenHit = isHit ? `${ten.rawList.length}个<span class="correct">✅</span>` : `${ten.rawList.length}个<span class="wrong">❌</span>`;
            } else if (ten.rawList.length > 0) {
                // 最新一期（无下一期）：只输出号码个数
                tenHit = `${ten.rawList.length}个`;
            }

            processedData.push({
                index: idx,
                ...item,
                past,
                ten,
                wei,
                pastHit,
                tenHit,
                weiHit: wei.hit,
            });
        });
    }

    function calcAllRate() {
        let pHit = 0, pTotal = 0;
        let tHit = 0, tTotal = 0;
        let wHit = 0, wTotal = 0;
        processedData.forEach(item => {
            if (item.pastHit.includes('✅') || item.pastHit.includes('❌')) {
                pTotal++; if (item.pastHit.includes('✅')) pHit++;
            }
            if (item.tenHit.includes('✅') || item.tenHit.includes('❌')) {
                tTotal++; if (item.tenHit.includes('✅')) tHit++;
            }
            if (item.wei.hit.includes('✅') || item.wei.hit.includes('❌')) {
                wTotal++; if (item.wei.hit.includes('✅')) wHit++;
            }
        });
        return {
            past: pTotal ? (pHit / pTotal * 100).toFixed(2) + '%' : '0%',
            ten: tTotal ? (tHit / tTotal * 100).toFixed(2) + '%' : '0%',
            wei: wTotal ? (wHit / wTotal * 100).toFixed(2) + '%' : '0%',
        };
    }

    function calcRate() {
        let pHit = 0, pTotal = 0;
        let tHit = 0, tTotal = 0;
        let wHit = 0, wTotal = 0;
        showData.forEach(item => {
            if (item.pastHit.includes('✅') || item.pastHit.includes('❌')) {
                pTotal++; if (item.pastHit.includes('✅')) pHit++;
            }
            if (item.tenHit.includes('✅') || item.tenHit.includes('❌')) {
                tTotal++; if (item.tenHit.includes('✅')) tHit++;
            }
            if (item.wei.hit.includes('✅') || item.wei.hit.includes('❌')) {
                wTotal++; if (item.wei.hit.includes('✅')) wHit++;
            }
        });
        const allRate = calcAllRate();
        const streaks = calcAllMaxStreaks();
        document.getElementById('pastRate').innerText = `${pTotal ? (pHit / pTotal * 100).toFixed(2) + '%' : '0%'}（${allRate.past}）`;
        document.getElementById('tenRate').innerText = `${tTotal ? (tHit / tTotal * 100).toFixed(2) + '%' : '0%'}（${allRate.ten}）`;
        document.getElementById('weiRate').innerText = `${wTotal ? (wHit / wTotal * 100).toFixed(2) + '%' : '0%'}（${allRate.wei}）`;
        document.getElementById('pastMaxStreak').innerText = `最多连✅：${streaks.past} 次 | 最多连❌：${streaks.pastWrong} 次`;
        document.getElementById('tenMaxStreak').innerText = `最多连✅：${streaks.ten} 次 | 最多连❌：${streaks.tenWrong} 次`;
        document.getElementById('weiMaxStreak').innerText = `最多连✅：${streaks.wei} 次 | 最多连❌：${streaks.weiWrong} 次`;
    }

    const toast = document.getElementById('copyToast');
    function showToast(text, success = true) {
        toast.innerText = text;
        toast.className = 'copy-toast ' + (success ? 'toast-success' : 'toast-fail');
        toast.style.display = 'block';
        setTimeout(() => toast.style.display = 'none', 1800);
    }

    async function copyText(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            const el = document.createElement('textarea');
            el.value = text;
            el.style.opacity = '0';
            document.body.appendChild(el);
            el.select();
            const ok = document.execCommand('copy');
            document.body.removeChild(el);
            return ok;
        }
    }

    function render() {
        const tbody = document.querySelector('#dataTable tbody');
        tbody.innerHTML = '';
        const frag = document.createDocumentFragment();
        showData.forEach((item, loopIdx) => {
            const tr = document.createElement('tr');
            tr.style.cursor = 'pointer';
            tr.onclick = () => toggleDetail(loopIdx);
            const periodTmText = `${item.period}<br><span class="highlight">${item.tm.num.padStart(2, '0')} ${item.tm.sx_wx}</span>`;
            tr.innerHTML = `
            <td>${periodTmText}</td>
            <td>${item.pastHit}</td>
            <td>${item.tenHit}</td>
            <td>${item.wei.hit} ${item.wei.missingStr}</td>
        `;
            frag.appendChild(tr);
            const detailTr = document.createElement('tr');
            detailTr.className = 'detail-row';
            detailTr.id = `detail_${loopIdx}`;
            detailTr.style.display = 'none';
            const pastFormatted = formatNumberList(item.past.raw, 10, 10);
            const tenFormatted = formatNumberList(item.ten.rawList, 5, 5);
            detailTr.innerHTML = `
        <td colspan="4" class="detail-content">
            <div class="detail-wrap">
                <div class="detail-block">
                    <div class="detail-title">往期号码</div>
                    <div>${pastFormatted}</div>
                    <div style="margin-top:8px;">
                        <button class="copy-btn" onclick="event.stopPropagation();copyCurrent(${loopIdx})">复制</button>
                        <button class="copy-btn" onclick="event.stopPropagation();copyShuffleCurrent(${loopIdx})">乱序</button>
                    </div>
                </div>
                <div class="detail-block">
                    <div class="detail-title">1平10特</div>
                    <div>${tenFormatted}</div>
                    <div style="margin-top:8px;">
                        <button class="copy-btn" onclick="event.stopPropagation();copyTenCurrent(${loopIdx})">复制</button>
                        <button class="copy-btn" onclick="event.stopPropagation();copyTenShuffleCurrent(${loopIdx})">乱序</button>
                    </div>
                </div>
            </div>
        </td>
        `;
            frag.appendChild(detailTr);
        });
        tbody.appendChild(frag);
        calcRate();
    }

    // 往期号码复制
    window.copyCurrent = async function (idx) {
        const row = showData[idx];
        if (!row || !row.past.raw.length) {
            showToast('复制失败', false);
            return;
        }
        const formatted = formatNumberList(row.past.raw, 10, 5).replaceAll('<br>', '\n');
        const res = await copyText(formatted);
        if (res) showToast('复制成功');
        else showToast('复制失败', false);
    }
    window.copyShuffleCurrent = async function (idx) {
        const row = showData[idx];
        if (!row || !row.past.raw.length) {
            showToast('复制失败', false);
            return;
        }
        const shuffleArr = [...row.past.raw].sort(() => Math.random() - 0.5);
        const formatted = formatNumberList(shuffleArr, 10, 5).replaceAll('<br>', '\n');
        const res = await copyText(formatted);
        if (res) showToast('复制成功');
        else showToast('复制失败', false);
    }

    // ========== 新增：1平10特复制、乱序 ==========
    window.copyTenCurrent = async function (idx) {
        const row = showData[idx];
        if (!row || !row.ten.rawList.length) {
            showToast('复制失败', false);
            return;
        }
        const formatted = formatNumberList(row.ten.rawList, 5, 5).replaceAll('<br>', '\n');
        const res = await copyText(formatted);
        if (res) showToast('复制成功');
        else showToast('复制失败', false);
    }
    window.copyTenShuffleCurrent = async function (idx) {
        const row = showData[idx];
        if (!row || !row.ten.rawList.length) {
            showToast('复制失败', false);
            return;
        }
        const shuffleArr = [...row.ten.rawList].sort(() => Math.random() - 0.5);
        const formatted = formatNumberList(shuffleArr, 5, 5).replaceAll('<br>', '\n');
        const res = await copyText(formatted);
        if (res) showToast('复制成功');
        else showToast('复制失败', false);
    }

    function switchPeriod(num) {
        document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`[data-count="${num}"]`).classList.add('active');
        lastActiveIndex = -1;
        if (num === 'all') {
            showData = [...processedData];
        } else {
            const count = Number(num);
            showData = processedData.slice(-count);
        }
        render();
    }

    const probBox = document.getElementById('probBox');
    const probToggleBar = document.getElementById('probToggleBar');
    probToggleBar.onclick = function () {
        probBox.style.display = probBox.style.display === 'flex' ? 'none' : 'flex';
    }

    // 启动初始化
    originalGroups = parseData(rawData);
    reversedGroups = [...originalGroups].reverse();
    preprocessAllData();
    switchPeriod(10);
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.addEventListener('click', () => switchPeriod(btn.dataset.count));
    });
}
