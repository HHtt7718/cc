const HistoryDataModule = (function () {
  'use strict';

  const CATEGORIES = ['xa6', 'a6', 'hk6'];
  const YEARS = ['2026', '2025'];
  const REQUEST_DELAY = 200; 
  const FIVE_ELEMENTS_MAP = { 'j': '金', 'm': '木', 's': '水', 'h': '火', 't': '土' };
  
  // 【新增】：定义默认优先加载的分类，用于首屏极速渲染
  const DEFAULT_CATEGORY = 'xa6'; 

  let isLoaded = false;
  let isLoading = false;

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // ... (formatDate 和 formatItem 保持不变) ...
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const ts = Math.floor(timestamp / 1000) * 1000; 
    const date = new Date(ts);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const formatItem = (item) => {
    if (!item) return ''; 
    const dateStr = formatDate(item.openTime);
    const issueStr = `${item.shortIssue || ''}期`;
    let numStr = '';
    if (Array.isArray(item.numInfo)) {
      numStr = item.numInfo.map(info => {
        const isSpecial = info.index === 7;
        const prefix = isSpecial ? '+' : '';
        const element = FIVE_ELEMENTS_MAP[info.fiveElements] || '';
        const num = String(info.num || '').padStart(2, '0');
        return `${prefix}\n${num}\n${info.shengxiao || ''}/${element}`;
      }).join('\n\n');
    }
    return `${dateStr}\n${issueStr}\n${numStr}`;
  };

  const fetchWithRetry = async (url, retries = 1) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (retries > 0) {
        await delay(REQUEST_DELAY);
        return fetchWithRetry(url, retries - 1);
      }
      console.error(`请求最终失败: ${url}`, error);
      return null;
    }
  };

  const processCategory = async (category) => {
    let allData = [];
    for (const year of YEARS) {
      const url = `https://ocs.ai4funs.com/pwtkprd/gr/${category}/history/${year}`;
      await delay(REQUEST_DELAY);
      const res = await fetchWithRetry(url);
      if (res && Array.isArray(res.data)) allData = allData.concat(res.data);
    }
    return allData.map(formatItem).join('\n\n');
  };

  const init = async () => {
    if (isLoaded || isLoading) return; 
    isLoading = true; 

    console.log('🚀 [预加载] 开始拉取历史数据...');
    try {
      for (const category of CATEGORIES) {
        const resultStr = await processCategory(category);
        window[`${category}Data`] = resultStr || ''; 
        
        // 当默认分类（xa6）加载完成时，立刻广播事件刷新首屏
        if (category === DEFAULT_CATEGORY) {
          console.log('⚡ [预加载] 默认数据(xa6)已就绪，立即触发首屏渲染！');
          window.dispatchEvent(new CustomEvent('historyDataReady'));
        }
      }
      
      // 全部加载完成后，标记为已加载
      isLoaded = true;
      console.log('🎉 [预加载] 所有历史数据后台静默加载完毕！');
      
    } catch (error) {
      console.error('历史数据加载过程中发生严重错误:', error);
    } finally {
      isLoading = false; 
    }
  };

  return { init };
})();
