//navTpl.js

// ===================== 导航栏全部CSS样式，统一存放 =====================
const navStyle = `
.header {
    background: rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.8);
}

.header-title {
    font-size: 24px;
    font-weight: 600;
    color: var(--color-text);
    text-align: center;
    margin-bottom: 8px;
}

.header-subtitle {
    font-size: 14px;
    color: var(--color-text-secondary);
    text-align: center;
}

.button-group {
    display: flex;
    gap: 10px;
    padding: 10px 10px;
    flex-wrap: wrap;
    justify-content: center;
}

.glass-button {
    flex: 1;
    height: 50px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: var(--radius-md);
    border: 1px solid rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 500;
    color: var(--color-text);
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.glass-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.glass-button:active {
    transform: translateY(0);
}

/* 导航选中高亮 */
.glass-button.active,
.sidebar-button.active {
    background: rgb(184 212 255 / 86%);
    font-weight: bold;
    border-width: 2px;
}

.btn-td { color: #fe2c55; border-color: rgba(254, 44, 85, 0.4); }
.btn-rt { color: #e84a27; border-color: rgba(232, 74, 39, 0.4); }
.btn-pt { color: var(--color-blue); border-color: rgba(45, 125, 210, 0.4); }
.btn-sx { color: #7d31ce;border-color: rgb(210 45 172 / 40%); }
.btn-zc { color: #3c31ce;border-color: rgba(45, 84, 210, 0.4); }
.btn-home { color: #2d3748; border-color: rgba(45, 55, 72, 0.4); }
/* =========新增ls历史记录按钮样式========= */
.btn-ls { color:#00897b; border-color:rgba(0,137,123,0.4); }

/* ========== 手机端样式 ========== */
@media (max-width: 768px) {
    .button-group {
        display: none !important;
    }
    .mobile-sidebar-nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 40px;
        height: 100vh;
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        -webkit-backdrop-filter: var(--glass-blur);
        border-right: 1px solid rgba(255,255,255,0.6);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
        gap: 12px;
        z-index: 99;
    }
    .sidebar-icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(255,255,255,0.7);
        background-image: url("icon.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0;
        cursor: pointer;
    }
    .sidebar-button {
        width: 40px;
        height: 40px;
        border-radius: var(--radius-sm);
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 11px;
        text-align: center;
        padding: 4px;
        line-height: 1.2;
    }
    .sidebar-button:hover { transform: translateY(-2px); }

    .header { padding:10px 10px;}
    body {
        padding: 5px 2px 0px 40px;
        width: 100vw;
        overflow-x: hidden !important;
    }
    .glass-container { max-width: 100vw; margin-bottom:0%; }

    /* 移动端侧边数据源 */
    .source-toggle-wrap {
        position: relative;
        margin-top: 15px;
    }
    .source-main-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(184, 212, 255, 0.86);
        backdrop-filter: blur(12px);
        border: 2px solid #fff;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:13px;
        font-weight:bold;
        cursor:pointer;
        box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        transition: transform 0.2s;
    }
    .source-main-btn:active {
        transform: scale(0.92);
    }
    .source-sub-group {
        position:absolute;
        left: 46px;
        top:0;
        display:flex;
        gap: 5px;
        pointer-events: none;
        opacity:0;
        transform: translateX(-10px);
        transition: all 0.26s ease;
    }
    .source-toggle-wrap.open .source-sub-group {
        opacity:1;
        pointer-events:auto;
        transform: translateX(0);
    }
    .source-sub-btn {
        width:40px;
        height:40px;
        border-radius:50%;
        background:rgb(179 156 156 / 65%);
        backdrop-filter: blur(10px);
        border:1px solid rgb(100 100 100 / 90%);
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:13px;
        cursor:pointer;
        box-shadow:0 3px 8px rgba(0,0,0,0.08);
        transition:all 0.2s;
    }
    .source-sub-btn.active {
        background: rgb(184 212 255 / 86%);
        font-weight:bold;
        border-width:2px;
    }
    .source-sub-btn:active {
        transform: scale(0.92);
    }

    /* 移动端隐藏桌面悬浮按钮 */
    .desktop-source-float{
        display:none !important;
    }
}

/* ========== 桌面端大屏样式 ========== */
@media (min-width: 769px) {
    .mobile-sidebar-nav { display: none !important; }
    /* 移动端侧边数据源隐藏 */
    .mobile-sidebar-nav .source-toggle-wrap{
        display:none !important;
    }

    /* 桌面端右上角悬浮数据源容器 */
    .desktop-source-float {
        position: fixed;
        top: 5%;
        right: 15%;
        z-index: 999;
    }
    /* 桌面端主按钮 */
    .desktop-source-float .source-main-btn{
        width:50px;
        height:50px;
        border-radius:50%;
        background: rgba(184, 212, 255, 0.86);
        backdrop-filter: blur(12px);
        border: 2px solid #fff;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:15px;
        font-weight:bold;
        cursor:pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: transform 0.2s;
    }
    .desktop-source-float .source-main-btn:active{
        transform:scale(0.92);
    }
    /* 桌面端向下展开面板 */
    .desktop-source-float .source-sub-group{
        position:absolute;
        top:60px;
        right:0;
        display:flex;
        flex-direction:column;
        gap:10px;
        pointer-events:none;
        opacity:0;
        transform: translateY(-10px);
        transition: all 0.26s ease;
    }
    .desktop-source-float.open .source-sub-group{
        opacity:1;
        pointer-events:auto;
        transform: translateY(0);
    }
    .desktop-source-float .source-sub-btn{
        width:50px;
        height:50px;
        border-radius:50%;
        background:rgb(179 156 156 / 65%);
        backdrop-filter: blur(10px);
        border:1px solid rgb(100 100 100 / 90%);
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:14px;
        cursor:pointer;
        box-shadow:0 3px 8px rgba(0,0,0,0.08);
        transition:all 0.2s;
    }
    .desktop-source-float .source-sub-btn.active{
        background: rgb(184 212 255 / 86%);
        font-weight:bold;
        border-width:2px;
    }
    .desktop-source-float .source-sub-btn:active{
        transform:scale(0.92);
    }
}
`;

//navTpl.js
// ===================== 1、页面载入自动注入导航样式 =====================
(function injectNavStyle() {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = navStyle;
    document.head.appendChild(styleTag);
})();

// ===================== 2、全局数据源变量与切换逻辑 =====================
let rawData = ''; 
let currentSourceKey = "new";

const getSafeData = (key) => {
    const map = { new: window.xa6Data, old: window.a6Data, fag: window.hk6Data };
    return map[key] ?? '';
};

// 初始化默认数据
rawData = getSafeData(currentSourceKey);

// 【核心修复】：去掉 async，改为同步执行，防止时序错乱
function switchSource(key) {
    // 1. 防止重复点击
    if (key === currentSourceKey) return; 

    // 2. 更新全局状态
    currentSourceKey = key;
    rawData = getSafeData(key);

    // 3. 更新 UI 样式
    const textMap = { new: "新", old: "老", fag: "香" };
    document.querySelectorAll('.source-main-btn').forEach(btn => btn.innerText = textMap[key]);
    document.querySelectorAll('.source-sub-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.key === key) btn.classList.add('active');
    });
    document.querySelectorAll('.source-toggle-wrap,.desktop-source-float').forEach(item => item.classList.remove('open'));

    // 4. 广播事件
    window.dispatchEvent(new CustomEvent('sourceChanged', { detail: { key } }));

    // 5. 【核心修复】：现在可以正确读取到 window.currentPageKey 并强制重载了！
    if (typeof window.currentPageKey !== 'undefined') {
        changePage(window.currentPageKey);
    }
}

function toggleSourcePanel(el) { el.classList.toggle('open'); }

document.addEventListener('click', function (e) {
    const allWrap = document.querySelectorAll('.source-toggle-wrap,.desktop-source-float');
    allWrap.forEach(wrap => { if (!wrap.contains(e.target)) wrap.classList.remove('open'); });
});

// ===================== 3、监听预加载完成事件,记录是否已经触发过首屏刷新，防止全部加载完时再次触发 ===================== 

let hasTriggeredFirstRender = false;

window.addEventListener('historyDataReady', () => {
    console.log('📡 [导航模块] 收到数据就绪信号，正在同步当前数据源...');
    
    // 重新获取一次最新数据
    const freshData = getSafeData(currentSourceKey);
    if (freshData) {
        rawData = freshData;
    }

    // 如果当前已经有页面在显示，则用新数据刷新它
    if (typeof window.currentPageKey !== 'undefined') {
        // 【优化】：如果还没触发过首屏渲染，或者当前用户切换到了非默认数据源，才允许刷新
        // 这样既保证了首屏秒开，又保证了用户在等待期间切换数据源时能正确显示
        if (!hasTriggeredFirstRender || currentSourceKey !== 'new') {
            changePage(window.currentPageKey);
            hasTriggeredFirstRender = true;
        }
    }
});

// ===================== 4、导航HTML模板（保持不变）=====================
const navTpl = `
<!-- 手机侧边导航 -->
<div class="mobile-sidebar-nav">
    <div class="sidebar-icon" onclick="changePage('home')"></div>
    <div class="sidebar-button btn-sx" onclick="changePage('sx')">筛号助手</div>
    <div class="sidebar-button btn-td" onclick="changePage('td')">生肖赋值</div>
    <div class="sidebar-button btn-rt" onclick="changePage('rt')">范围排序</div>
    <div class="sidebar-button btn-pt" onclick="changePage('pt')">平码回顾</div>
    <div class="sidebar-button btn-zc" onclick="changePage('zc')">生肖表格</div>
    <div class="sidebar-button btn-ls" onclick="changePage('ls')">历史记录</div>
    <div class="source-toggle-wrap">
        <div class="source-main-btn" onclick="event.stopPropagation();toggleSourcePanel(this.parentElement);">新</div>
        <div class="source-sub-group">
            <div class="source-sub-btn active" data-key="new" onclick="switchSource('new')">新</div>
            <div class="source-sub-btn" data-key="old" onclick="switchSource('old')">老</div>
            <div class="source-sub-btn" data-key="fag" onclick="switchSource('fag')">香</div>
        </div>
    </div>
</div>
<!-- 顶部导航栏 -->
<div class="glass-container">
    <div class="button-group">
        <div class="glass-button btn-home active" onclick="changePage('home')">首页</div>
        <div class="glass-button btn-sx" onclick="changePage('sx')">筛号助手</div>
        <div class="glass-button btn-td" onclick="changePage('td')">生肖赋值</div>
        <div class="glass-button btn-rt" onclick="changePage('rt')">范围排序</div>
        <div class="glass-button btn-pt" onclick="changePage('pt')">平码回顾</div>
        <div class="glass-button btn-zc" onclick="changePage('zc')">生肖表格</div>
        <div class="glass-button btn-ls" onclick="changePage('ls')">历史记录</div>
    </div>
</div>
<!-- 桌面端右上角悬浮数据源切换按钮 -->
<div class="desktop-source-float">
    <div class="source-main-btn" onclick="event.stopPropagation();toggleSourcePanel(this.parentElement);">新</div>
    <div class="source-sub-group">
        <div class="source-sub-btn active" data-key="new" onclick="switchSource('new')">新</div>
        <div class="source-sub-btn" data-key="old" onclick="switchSource('old')">老</div>
        <div class="source-sub-btn" data-key="fag" onclick="switchSource('fag')">香</div>
    </div>
</div>
`;

document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('afterbegin', navTpl);
});
