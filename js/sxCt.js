// ====================
// 筛号助手 - sxContent.js
// 仿照 homeContent.js 结构
// ====================

function getSxHtml() {
  return `
  <style>
  .shaohao-scope-wrapper * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Microsoft YaHei", sans-serif;
}
.shaohao-scope-wrapper {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 10px;
}
.shaohao-scope-wrapper .shaohao-container {
  background: rgb(185 185 185 / 35%);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255,255,255,0.6);
}
.shaohao-scope-wrapper .shaohao-title {
  text-align: center;
  font-size: 26px;
  margin-bottom: 25px;
}
.shaohao-scope-wrapper .shaohao-result-box {
  padding: 16px;
  border-radius: 12px;
  background: rgba(255,255,255,0.8);
  min-height: 92px;
  margin-bottom: 10px;
  white-space: pre-wrap;
}
.shaohao-scope-wrapper .shaohao-count-box {
  text-align: right;
  color: #3182ce;
  font-weight: bold;
  margin-bottom: 15px;
}
.shaohao-scope-wrapper .shaohao-btn-row {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}
.shaohao-scope-wrapper .shaohao-glass-btn {
  flex: 1;
  padding: 12px 8px;
  border-radius: 10px;
  background: rgba(255,255,255,0.6);
  border: 1px solid rgba(255,255,255,0.7);
  cursor: pointer;
  transition: 0.25s;
}
.shaohao-scope-wrapper .shaohao-glass-btn:hover {
  background: #fff;
}
.shaohao-scope-wrapper .shaohao-glass-btn.active {
  background: rgba(66, 153, 225, 0.4);
  border-color: #3182ce;
  color: #fff;
  font-weight: bold;
}
.shaohao-scope-wrapper .shaohao-red { color: #e53e3e; font-weight: bold; }
.shaohao-scope-wrapper .shaohao-blue { color: #3182ce; font-weight: bold; }
.shaohao-scope-wrapper .shaohao-green { color: #38a169; font-weight: bold; }
.shaohao-scope-wrapper .shaohao-section {
  margin-bottom: 24px;
}
.shaohao-scope-wrapper .shaohao-section-label {
  height: 1px;
  background: rgba(45,55,72,0.3);
  margin: 15px 0;
}
.shaohao-scope-wrapper .shaohao-btn-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 8px;
}
#shaohao_btnClear {
  background: linear-gradient(to top, rgb(231, 139, 93), rgb(159 0 5));
  color: white;
}
#shaohao_btnCopy {
  color: blue;
}
  @media (max-width: 768px) {
  .shaohao-scope-wrapper .shaohao-container{ padding: 2%; }
  .shaohao-scope-wrapper .shaohao-glass-btn{ padding: 2% 2%;}
  .shaohao-scope-wrapper .shaohao-result-box { min-height: 140px;}
  .shaohao-scope-wrapper { padding:0px; }

}

  </style>
<div class="shaohao-scope-wrapper">
  <div class="shaohao-container">
    <!-- <div class="shaohao-title"></div> -->
    <div class="shaohao-result-box" id="shaohao_resultBox">请选择筛选条件</div>
    <div class="shaohao-count-box" id="shaohao_countBox">0 个</div>

    <div class="shaohao-btn-row">
      <button class="shaohao-glass-btn" id="shaohao_btnClear">清空</button>
      <button class="shaohao-glass-btn" id="shaohao_btnCopy">复制结果</button>
    </div>

    <div class="shaohao-section">
      <div class="shaohao-section-label"></div>
      <div class="shaohao-btn-grid">
        <button class="shaohao-glass-btn" data-group="group1" data-rule="single">单</button>
        <button class="shaohao-glass-btn" data-group="group1" data-rule="double">双</button>
        <button class="shaohao-glass-btn" data-group="group1" data-rule="big">大</button>
        <button class="shaohao-glass-btn" data-group="group1" data-rule="small">小</button>
        <button class="shaohao-glass-btn" data-group="group1" data-rule="heSingle">合单</button>
        <button class="shaohao-glass-btn" data-group="group1" data-rule="heDouble">合双</button>
      </div>
    </div>

    <div class="shaohao-section">
      <div class="shaohao-section-label"></div>
      <div class="shaohao-btn-grid">
        <button class="shaohao-glass-btn" data-group="group2" data-rule="jin">金</button>
        <button class="shaohao-glass-btn" data-group="group2" data-rule="mu">木</button>
        <button class="shaohao-glass-btn" data-group="group2" data-rule="shui">水</button>
        <button class="shaohao-glass-btn" data-group="group2" data-rule="huo">火</button>
        <button class="shaohao-glass-btn" data-group="group2" data-rule="tuxing">土</button>
      </div>
    </div>

    <div class="shaohao-section">
      <div class="shaohao-section-label"></div>
      <div class="shaohao-btn-grid">
        <button class="shaohao-glass-btn" data-group="group3" data-rule="red" style=" background-color: #e53e3e; color: white;">红</button>
        <button class="shaohao-glass-btn" data-group="group3" data-rule="blue" style=" background-color: #3182ce; color: white;">蓝</button>
        <button class="shaohao-glass-btn" data-group="group3" data-rule="green" style=" background-color: #38a169; color: white;">绿</button>
      </div>
    </div>

    <div class="shaohao-section">
      <div class="shaohao-section-label"></div>
      <div class="shaohao-btn-grid">
        <button class="shaohao-glass-btn" data-group="group4" data-rule="jia">家</button>
        <button class="shaohao-glass-btn" data-group="group4" data-rule="ye">野</button>
        <button class="shaohao-glass-btn" data-group="group4" data-rule="nanXiao">男肖</button>
        <button class="shaohao-glass-btn" data-group="group4" data-rule="nvXiao">女肖</button>
      </div>
    </div>

    <div class="shaohao-section">
      <div class="shaohao-section-label"></div>
      <div class="shaohao-btn-grid">
        <button class="shaohao-glass-btn" data-group="group5" data-rule="shu">鼠</button>
        <button class="shaohao-glass-btn" data-group="group5" data-rule="niu">牛</button>
        <button class="shaohao-glass-btn" data-group="group5" data-rule="hu">虎</button>
        <button class="shaohao-glass-btn" data-group="group5" data-rule="tu">兔</button>
        <button class="shaohao-glass-btn" data-group="group5" data-rule="long">龙</button>
        <button class="shaohao-glass-btn" data-group="group5" data-rule="she">蛇</button>
        <button class="shaohao-glass-btn" data-group="group5" data-rule="ma">马</button>
        <button class="shaohao-glass-btn" data-group="group5" data-rule="yang">羊</button>
        <button class="shaohao-glass-btn" data-group="group5" data-rule="hou">猴</button>
        <button class="shaohao-glass-btn" data-group="group5" data-rule="ji">鸡</button>
        <button class="shaohao-glass-btn" data-group="group5" data-rule="gou">狗</button>
        <button class="shaohao-glass-btn" data-group="group5" data-rule="zhu">猪</button>
      </div>
    </div>

    <div class="shaohao-section">
      <div class="shaohao-section-label"></div>
      <div class="shaohao-btn-grid">
        <button class="shaohao-glass-btn" data-group="group6" data-rule="wei0">0尾</button>
        <button class="shaohao-glass-btn" data-group="group6" data-rule="wei1">1尾</button>
        <button class="shaohao-glass-btn" data-group="group6" data-rule="wei2">2尾</button>
        <button class="shaohao-glass-btn" data-group="group6" data-rule="wei3">3尾</button>
        <button class="shaohao-glass-btn" data-group="group6" data-rule="wei4">4尾</button>
        <button class="shaohao-glass-btn" data-group="group6" data-rule="wei5">5尾</button>
        <button class="shaohao-glass-btn" data-group="group6" data-rule="wei6">6尾</button>
        <button class="shaohao-glass-btn" data-group="group6" data-rule="wei7">7尾</button>
        <button class="shaohao-glass-btn" data-group="group6" data-rule="wei8">8尾</button>
        <button class="shaohao-glass-btn" data-group="group6" data-rule="wei9">9尾</button>
        <button class="shaohao-glass-btn" data-group="group6" data-rule="weiSmall">小尾</button>
        <button class="shaohao-glass-btn" data-group="group6" data-rule="weiBig">大尾</button>
      </div>
    </div>

    <div class="shaohao-section">
      <div class="shaohao-section-label"></div>
      <div class="shaohao-btn-grid">
        <button class="shaohao-glass-btn" data-group="group7" data-rule="tou0">0头</button>
        <button class="shaohao-glass-btn" data-group="group7" data-rule="tou1">1头</button>
        <button class="shaohao-glass-btn" data-group="group7" data-rule="tou2">2头</button>
        <button class="shaohao-glass-btn" data-group="group7" data-rule="tou3">3头</button>
        <button class="shaohao-glass-btn" data-group="group7" data-rule="tou4">4头</button>
      </div>
    </div>

    <div class="shaohao-section">
      <div class="shaohao-section-label"></div>
      <div class="shaohao-btn-grid">
        <button class="shaohao-glass-btn" data-group="group8" data-rule="he1">1合</button>
        <button class="shaohao-glass-btn" data-group="group8" data-rule="he2">2合</button>
        <button class="shaohao-glass-btn" data-group="group8" data-rule="he3">3合</button>
        <button class="shaohao-glass-btn" data-group="group8" data-rule="he4">4合</button>
        <button class="shaohao-glass-btn" data-group="group8" data-rule="he5">5合</button>
        <button class="shaohao-glass-btn" data-group="group8" data-rule="he6">6合</button>
        <button class="shaohao-glass-btn" data-group="group8" data-rule="he7">7合</button>
        <button class="shaohao-glass-btn" data-group="group8" data-rule="he8">8合</button>
        <button class="shaohao-glass-btn" data-group="group8" data-rule="he9">9合</button>
        <button class="shaohao-glass-btn" data-group="group8" data-rule="he10">10合</button>
        <button class="shaohao-glass-btn" data-group="group8" data-rule="he11">11合</button>
        <button class="shaohao-glass-btn" data-group="group8" data-rule="he12">12合</button>
        <button class="shaohao-glass-btn" data-group="group8" data-rule="he13">13合</button>
      </div>
    </div>
  </div>
</div>
  `;
}

//sxCt.js
function initSxTouch() {
  // 合单合双计算
  function getHeSingleDouble() {
    const heSingle = [], heDouble = [];
    for (let num = 1; num <= 49; num++) {
      const str = num.toString().padStart(2, '0');
      const tou = parseInt(str[0]);
      const wei = parseInt(str[1]);
      const sum = tou + wei;
      const ge = sum % 10;
      ge % 2 === 1 ? heSingle.push(num) : heDouble.push(num);
    }
    return { heSingle, heDouble };
  }
  const { heSingle, heDouble } = getHeSingleDouble();

  const ruleData = {
    single: [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49],
    double: [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48],
    big: [25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],
    small: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
    jin: [4,5,12,13,26,27,34,35,42,43],
    mu: [8,9,16,17,24,25,38,39,46,47],
    shui: [1,14,15,22,23,30,31,44,45],
    huo: [2,3,10,11,18,19,32,33,40,41,48,49],
    tuxing: [6,7,20,21,28,29,36,37],
    red: [1,2,7,8,12,13,18,19,23,24,29,30,34,35,40,45,46],
    blue: [3,4,9,10,14,15,20,25,26,31,36,37,41,42,47,48],
    green: [5,6,11,16,17,21,22,27,28,32,33,38,39,43,44,49],
    jia: [1,6,8,9,10,12,13,18,20,21,22,24,25,30,32,33,34,36,37,42,44,45,46,48,49],
    ye: [2,3,4,5,7,11,14,15,16,17,19,23,26,27,28,29,31,35,38,39,40,41,43,47],
    nanXiao: [1,3,5,6,7,9,11,13,15,17,18,19,21,23,25,27,29,30,31,33,35,37,39,41,42,43,45,47,49],
    nvXiao: [2,4,8,10,12,14,16,20,22,24,26,28,32,34,36,38,40,44,46,48],
    shu:[7,19,31,43],niu:[6,18,30,42],hu:[5,17,29,41],
    tu:[4,16,28,40],long:[3,15,27,39],she:[2,14,26,38],
    ma:[1,13,25,37,49],yang:[12,24,36,48],hou:[11,23,35,47],
    ji:[10,22,34,46],gou:[9,21,33,45],zhu:[8,20,32,44],
    wei0:[10,20,30,40],wei1:[1,11,21,31,41],wei2:[2,12,22,32,42],
    wei3:[3,13,23,33,43],wei4:[4,14,24,34,44],wei5:[5,15,25,35,45],
    wei6:[6,16,26,36,46],wei7:[7,17,27,37,47],wei8:[8,18,28,38,48],
    wei9:[9,19,29,39,49],
    weiSmall:[1,2,3,4,10,11,12,13,14,20,21,22,23,24,30,31,32,33,34,40,41,42,43,44],
    weiBig:  [5,6,7,8,9,15,16,17,18,19,25,26,27,28,29,35,36,37,38,39,45,46,47,48,49],
    tou0:[1,2,3,4,5,6,7,8,9],
    tou1:[10,11,12,13,14,15,16,17,18,19],
    tou2:[20,21,22,23,24,25,26,27,28,29],
    tou3:[30,31,32,33,34,35,36,37,38,39],
    tou4:[40,41,42,43,44,45,46,47,48,49],
    he1:[1,10],he2:[2,11,20],he3:[3,12,21,30],
    he4:[4,13,22,31,40],he5:[5,14,23,32,41],he6:[6,15,24,33,42],
    he7:[7,16,25,34,43],he8:[8,17,26,35,44],he9:[9,18,27,36,45],
    he10:[19,28,37,46],he11:[29,38,47],he12:[39,48],he13:[49],
    heSingle, heDouble
  };

  const selected = {};
  const resultBox = document.getElementById('shaohao_resultBox');
  const countBox = document.getElementById('shaohao_countBox');
  const btnClear = document.getElementById('shaohao_btnClear');
  const btnCopy = document.getElementById('shaohao_btnCopy');

  // 按钮点击
  document.querySelectorAll('.shaohao-scope-wrapper [data-rule]').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.group;
      const rule = btn.dataset.rule;
      btn.classList.toggle('active');

      if (!selected[group]) selected[group] = new Set();
      if (selected[group].has(rule)) {
        selected[group].delete(rule);
        if (selected[group].size === 0) delete selected[group];
      } else {
        selected[group].add(rule);
      }
      updateResult();
    });
  });

  // 清空
  btnClear.addEventListener('click', () => {
    Object.keys(selected).forEach(k => selected[k].clear());
    Object.keys(selected).forEach(k => delete selected[k]);
    document.querySelectorAll('.shaohao-scope-wrapper [data-rule]').forEach(b => b.classList.remove('active'));
    resultBox.innerHTML = '请选择筛选条件';
    countBox.innerText = '0 个';
  });

// 复制（兼容版 + 左侧提示）
btnCopy.addEventListener('click', () => {
  let text = resultBox.innerText.trim();
  if (text === '请选择筛选条件' || text === '空') {
    showCopyTip('复制失败', false);
    return;
  }
  const numArr = text.match(/\d{2}/g) || [];
  text = numArr.join(',');

  try {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showCopyTip('复制成功', true);
  } catch (e) {
    showCopyTip('复制失败', false);
  }
});

// 复制提示：在 shaohao-count-box 左侧显示
function showCopyTip(text, isSuccess) {
  const tipId = 'shaohao_copy_tip';
  let tip = document.getElementById(tipId);
  if (!tip) {
    tip = document.createElement('span');
    tip.id = tipId;
    tip.style.position = 'absolute';
    tip.style.left = '5%';
    tip.style.fontWeight = 'bold';
    tip.style.fontSize = '14px';
    
    const countBox = document.getElementById('shaohao_countBox');
    const parent = countBox.parentElement;
    parent.style.position = 'relative';
    parent.insertBefore(tip, countBox);
  }

  tip.textContent = text;
  tip.style.color = isSuccess ? '#00b42a' : '#ff4d4f';

  // 2秒后消失
  setTimeout(() => {
    tip.textContent = '';
  }, 2000);
}

  // 更新结果
  function updateResult() {
    const groups = Object.keys(selected);
    if (groups.length === 0) {
      resultBox.innerHTML = '请选择筛选条件';
      countBox.innerText = '0 个';
      return;
    }

    let result = Array.from({ length: 49 }, (_, i) => i + 1);

    groups.forEach(group => {
      const groupRules = Array.from(selected[group]);
      let groupNums = new Set();
      groupRules.forEach(rule => {
        ruleData[rule].forEach(num => groupNums.add(num));
      });
      result = result.filter(num => groupNums.has(num));
    });

    if (result.length === 0) {
      resultBox.innerHTML = '空';
      countBox.innerText = '0 个';
      return;
    }

    const sorted = result.sort((a, b) => a - b);
    let html = '';
    sorted.forEach(num => {
      const str = num.toString().padStart(2, '0');
      let cls = ruleData.red.includes(num) ? 'shaohao-red' :
                ruleData.blue.includes(num) ? 'shaohao-blue' : 'shaohao-green';
      html += `<span class="${cls}">${str}</span> `;
    });

    resultBox.innerHTML = html;
    countBox.innerText = `${sorted.length} 个`;
  }
}