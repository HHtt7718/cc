// 新列判断数组

    // 男女
    const nanList = ["鼠", "牛", "虎", "龙", "马", "猴", "狗"];
    const nvList = ["兔", "蛇", "羊", "鸡", "猪"];

    // 家野
    const family = ["牛", "马", "羊", "鸡", "狗", "猪"];
    const wild = ["鼠", "虎", "兔", "龙", "蛇", "猴"];

    //菜草肉
    const caiList = ["鼠", "猴", "鸡", "猪"];
    const caoList = ["牛", "兔", "马", "羊"];
    const rouList = ["虎", "龙", "蛇", "狗"];

    // 天地人
    const tianList = ["鼠", "兔", "马", "鸡"];
    const diList = ["牛", "龙", "羊", "狗"];
    const renList = ["虎", "蛇", "猴", "猪"];

    // 福禄寿
    const fuList = ["鼠", "虎", "龙", "马"];
    const luList = ["牛", "兔", "猴", "猪"];
    const shouList = ["蛇", "羊", "鸡", "狗"];

    // 日月星
    const riList = ["牛", "龙", "马", "猪"];
    const yueList = ["鼠", "蛇", "羊", "狗"];
    const xingList = ["虎", "兔", "猴", "鸡"];

    // 魏蜀吴
    const weiList = ["鼠", "牛", "狗", "猪"];
    const shuList = ["马", "羊", "猴", "鸡"];
    const wuList = ["虎", "兔", "龙", "蛇"];

    // 琴棋书画
    const qin = ["兔", "蛇", "鸡"];
    const qi = ["鼠", "牛", "狗"];
    const shu = ["虎", "龙", "马"];
    const hua = ["猴", "羊", "猪"];


    // 春夏秋冬
    const springList = ["虎", "兔", "龙"];
    const summerList = ["蛇", "马", "羊"];
    const autumnList = ["猴", "鸡", "狗"];
    const winterList = ["猪", "牛", "鼠"]; 

    // 东西南北
    const eastList = ["兔", "龙", "蛇"];
    const westList = ["马", "羊", "猴"];
    const southList = ["鸡", "狗", "猪"];
    const northList = ["鼠", "牛", "虎"];

    // 梅兰菊竹
    const plumList = ["鼠", "龙", "猴"];
    const orchidList = ["兔", "羊", "猪"];
    const juList = ["虎", "马", "狗"];
    const bambooList = ["牛", "蛇", "鸡"];

    
    //红蓝绿
    const redList = ["01", "02", "07", "08", "12", "13", "18", "19", "23", "24", "29", "30", "34", "35", "40", "45", "46"];
    const blueList = ["03", "04", "09", "10", "14", "15", "20", "25", "26", "31", "36", "37", "41", "42", "47", "48"];
    const greenList = ["05", "06", "11", "16", "17", "21", "22", "27", "28", "32", "33", "38", "39", "43", "44", "49"];

    // 判断特号颜色
    function getAttributeColor(attribute) {
        if (redList.includes(attribute)) {
            return "red";
        } else if (blueList.includes(attribute)) {
            return "blue";
        } else if (greenList.includes(attribute)) {
            return "green";
        }
        return "";
    }

    // 判断是否在数组中
    function checkInArray(value, arr) {
        return arr.includes(value) ? arr[0] : "";
    }

    // 解析原始数据为结构化对象（按日期+期数组块分组）
    function parseData(raw) {
        const groups = [];
        if (!raw) return groups;
        // 以每组的日期和期数作为分组依据，避免被内部空行干扰
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

    // 生成期数
    function generatePeriods(data) {
        return data.map((item, i) => item.period || `${i + 1}期`);
    }

    
    // function generatePeriods(data) {
    //     const periods = [];
    //     for (let i = data.length; i > 0; i--) {
    //         periods.push(`${i}期`);
    //     }
    //     return periods;
    // }

    // 处理数据
    function processData() {

        const headers = ["期数", "特号", "生肖", 
                            "单", "双",
                            "男", "女", 
                            "家", "野", 
                            "菜", "草", "肉", 
                            "天", "地", "人", 
                            "福", "禄", "寿", 
                            "日", "月", "星", 
                            "魏", "蜀", "吴", 
                            "琴", "棋", "书", "画",
                            "春", "夏", "秋", "冬", 
                            "东", "西", "南", "北", 
                            "梅", "兰", "菊", "竹"];
            
        const processedData = [];
        const countMap = {};
        headers.slice(4).forEach(header => countMap[header] = 1);

        const periods = generatePeriods(dataArray);

        // console.log(periods);
        let singleNotContainCount = 1; 

        dataArray.forEach((item, index) => {

            const newItem = {};
            newItem["期数"] = periods[index];
            newItem["日期"] = item.date || "";
            newItem["特号"] = item.attribute;
            newItem["生肖"] = item.Zodiac;

            const singleArray = ["1", "3", "5", "7", "9"];
            // 判断单双
            const isSingle = checkInArray(item.attribute.slice(-1), singleArray);
            if (isSingle) {
                newItem["单"] = "单";
                singleNotContainCount = 1; // 包含“单”时，重置连续不包含计数
            } else {
                newItem["单"] = singleNotContainCount;
                singleNotContainCount++; // 不包含时，连续不包含计数递增
            }

            newItem["双"] = checkInArray(item.attribute.slice(-1), ["0", "2", "4", "6", "8"]) ? "双" : `${newItem["期数"]}不包含`;

            newItem["男"] = checkInArray(item.Zodiac, nanList) ? "男" : `${newItem["期数"]}不包含`;
            newItem["女"] = checkInArray(item.Zodiac, nvList ) ? "女" : `${newItem["期数"]}不包含`;

            newItem["家"] = checkInArray(item.Zodiac, family) ? "家" : `${newItem["期数"]}不包含`;
            newItem["野"] = checkInArray(item.Zodiac, wild  ) ? "野" : `${newItem["期数"]}不包含`;

            newItem["菜"] = checkInArray(item.Zodiac, caiList) ? "菜" : `${newItem["期数"]}不包含`;
            newItem["草"] = checkInArray(item.Zodiac, caoList) ? "草" : `${newItem["期数"]}不包含`;
            newItem["肉"] = checkInArray(item.Zodiac, rouList) ? "肉" : `${newItem["期数"]}不包含`;

            newItem["天"] = checkInArray(item.Zodiac, tianList) ? "天" : `${newItem["期数"]}不包含`;
            newItem["地"] = checkInArray(item.Zodiac, diList  ) ? "地" : `${newItem["期数"]}不包含`;
            newItem["人"] = checkInArray(item.Zodiac, renList ) ? "人" : `${newItem["期数"]}不包含`;

            newItem["福"] = checkInArray(item.Zodiac, fuList  ) ? "福" : `${newItem["期数"]}不包含`;
            newItem["禄"] = checkInArray(item.Zodiac, luList  ) ? "禄" : `${newItem["期数"]}不包含`;
            newItem["寿"] = checkInArray(item.Zodiac, shouList) ? "寿" : `${newItem["期数"]}不包含`;

            newItem["日"] = checkInArray(item.Zodiac, riList  ) ? "日" : `${newItem["期数"]}不包含`;
            newItem["月"] = checkInArray(item.Zodiac, yueList ) ? "月" : `${newItem["期数"]}不包含`;
            newItem["星"] = checkInArray(item.Zodiac, xingList) ? "星" : `${newItem["期数"]}不包含`;

            newItem["魏"] = checkInArray(item.Zodiac, weiList) ? "魏" : `${newItem["期数"]}不包含`;
            newItem["蜀"] = checkInArray(item.Zodiac, shuList) ? "蜀" : `${newItem["期数"]}不包含`;
            newItem["吴"] = checkInArray(item.Zodiac, wuList ) ? "吴" : `${newItem["期数"]}不包含`;

            newItem["琴"] = checkInArray(item.Zodiac, qin) ? "琴" : `${newItem["期数"]}不包含`;
            newItem["棋"] = checkInArray(item.Zodiac, qi ) ? "棋" : `${newItem["期数"]}不包含`;
            newItem["书"] = checkInArray(item.Zodiac, shu) ? "书" : `${newItem["期数"]}不包含`;
            newItem["画"] = checkInArray(item.Zodiac, hua) ? "画" : `${newItem["期数"]}不包含`;

            newItem["春"] = checkInArray(item.Zodiac, springList) ? "春" : `${newItem["期数"]}不包含`;
            newItem["夏"] = checkInArray(item.Zodiac, summerList) ? "夏" : `${newItem["期数"]}不包含`;
            newItem["秋"] = checkInArray(item.Zodiac, autumnList) ? "秋" : `${newItem["期数"]}不包含`;
            newItem["冬"] = checkInArray(item.Zodiac, winterList) ? "冬" : `${newItem["期数"]}不包含`;

            newItem["东"] = checkInArray(item.Zodiac, eastList ) ? "东" : `${newItem["期数"]}不包含`;
            newItem["西"] = checkInArray(item.Zodiac, westList ) ? "西" : `${newItem["期数"]}不包含`;
            newItem["南"] = checkInArray(item.Zodiac, southList) ? "南" : `${newItem["期数"]}不包含`;
            newItem["北"] = checkInArray(item.Zodiac, northList) ? "北" : `${newItem["期数"]}不包含`;

            newItem["梅"] = checkInArray(item.Zodiac, plumList  ) ? "梅" : `${newItem["期数"]}不包含`;
            newItem["兰"] = checkInArray(item.Zodiac, orchidList) ? "兰" : `${newItem["期数"]}不包含`;
            newItem["菊"] = checkInArray(item.Zodiac, juList    ) ? "菊" : `${newItem["期数"]}不包含`;
            newItem["竹"] = checkInArray(item.Zodiac, bambooList) ? "竹" : `${newItem["期数"]}不包含`;

            headers.slice(4).forEach(header => {
                if (!newItem[header].includes(header)) {
                    newItem[header] = countMap[header];
                    countMap[header]++;
                } else {
                    countMap[header] = 1;
                }
            });

            processedData.push(newItem);
        });

        return processedData;
    }
    

    // 如果存在 rawData， 则解析并生成 dataArray；否则保持原有 dataArray （或为空数组）

    if (typeof rawData !== 'undefined') {

        // 在不更改代码逻辑前提下， 反转初始数据
        const groups = parseData(rawData).reverse();
        var dataArray = groups.map(g => {
            const tm = g.tm || {};
            const num = (tm.num || "").toString().padStart(2, '0');
            const sx_wx = tm.sx_wx || "";
            const zodiac = sx_wx.split('/')[0] || "";
            const date = (g.date || "").replace(/-/g, "");
            return { Zodiac: zodiac, attribute: num, period: g.period, date };
        });
    } else if (typeof dataArray === 'undefined') {
        var dataArray = [];
    }

    const processed = processData();



    // 判断最后一组数据中，哪些字段为数字，并列出对应的“包含生肖”
    const last = processed[processed.length - 1];
    const fieldMap = {
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
    };

    const fields = Object.keys(fieldMap);
    const zodiacCount = {};

    // 保留原有打印
    fields.forEach(field => {
        if (!isNaN(last[field])) {
            // console.log(`${field} ——包含的生肖：`, fieldMap[field].join(","));
            // 统计生肖次数
            fieldMap[field].forEach(zodiac => {
                zodiacCount[zodiac] = (zodiacCount[zodiac] || 0) + 1;
            });
        }
    });

    // [四分段]统计优化
    function printZodiacStats(title, targetFields) {
        const zodiacOrder = ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"];
        const countMap = {};
        targetFields.forEach(field => {
            if (!isNaN(last[field])) {
                fieldMap[field].forEach(zodiac => {
                    countMap[zodiac] = (countMap[zodiac] || 0) + 1;
                });
            }
        });
        // 补全所有生肖
        zodiacOrder.forEach(zodiac => {
            if (!(zodiac in countMap)) countMap[zodiac] = 0;
        });
        // 排序
        const sorted = Object.entries(countMap).sort((a, b) => {
            if (b[1] !== a[1]) return b[1] - a[1];
            return zodiacOrder.indexOf(a[0]) - zodiacOrder.indexOf(b[0]);
        });

    }

    // [四分段]
    printZodiacStats("[四分段]", [
        "琴", "棋", "书", "画",
        "春", "夏", "秋", "冬",
        "东", "西", "南", "北",
        "梅", "兰", "菊", "竹"
    ]);

    // [三分段]
    printZodiacStats("[三分段]", [
        "菜", "草", "肉",
        "天", "地", "人",
        "福", "禄", "寿",
        "日", "月", "星",
        "魏", "蜀", "吴"
    ]); 
