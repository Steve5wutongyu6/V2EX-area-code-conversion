// ==UserScript==
// @name         V2EX 区号转换器
// @namespace    https://github.com/Steve5wutongyu6/v2ex-area-code-conversion
// @version      0.1.3
// @description  将V2EX帖子中的电话区号转换成对应的地点名称
// @author       Steve5wutongyu6
// @match        https://v2ex.com/*
// @match        https://*.v2ex.com/*
// @match        https://*.machbbs.com/v2ex/*
// @grant        none
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/487693/V2EX%20%E5%8C%BA%E5%8F%B7%E8%BD%AC%E6%8D%A2%E5%99%A8.user.js
// @updateURL https://update.greasyfork.org/scripts/487693/V2EX%20%E5%8C%BA%E5%8F%B7%E8%BD%AC%E6%8D%A2%E5%99%A8.meta.js
// ==/UserScript==

(function() {
    'use strict';

    var areaCodes = {
        "010": "北京市",
        "022": "天津市",
        "0311": "石家庄市",
        "0313": "张家口市",
        "0314": "承德市",
        "0335": "秦皇岛市",
        "0315": "唐山市",
        "0316": "廊坊市",
        "0312": "保定市",
        "0317": "沧州市",
        "0318": "衡水市",
        "0319": "邢台市",
        "0310": "邯郸市",
        "0351": "太原市",
        "0352": "大同市",
        "0349": "朔州市",
        "0353": "阳泉市",
        "0355": "长治市",
        "0356": "晋城市",
        "0350": "忻州市",
        "0354": "晋中市",
        "0357": "临汾市",
        "0359": "运城市",
        "0358": "吕梁市",
        "0471": "呼和浩特市",
        "0472": "包头市",
        "0473": "乌海市",
        "0476": "赤峰市",
        "0475": "通辽市",
        "0470": "呼伦贝尔市",
        "0477": "鄂尔多斯市",
        "0474": "乌兰察布市",
        "0478": "巴彦淖尔市",
        "0482": "兴安盟",
        "0479": "锡林郭勒盟",
        "0483": "阿拉善盟",
        "024": "沈阳市",
        "024": "铁岭市",
        "024": "抚顺市",
        "024": "本溪市",
        "0421": "朝阳市",
        "0418": "阜新市",
        "0419": "辽阳市",
        "0412": "鞍山市",
        "0415": "丹东市",
        "0411": "大连市",
        "0417": "营口市",
        "0427": "盘锦市",
        "0416": "锦州市",
        "0429": "葫芦岛市",
        "0431": "长春市",
        "0436": "白城市",
        "0438": "松原市",
        "0432": "吉林市",
        "0434": "四平市",
        "0437": "辽源市",
        "0435": "通化市",
        "0439": "白山市",
        "0433": "延边朝鲜族自治州",
        "0451": "哈尔滨市",
        "0452": "齐齐哈尔市",
        "0456": "黑河市",
        "0459": "大庆市",
        "0458": "伊春市",
        "0468": "鹤岗市",
        "0454": "佳木斯市",
        "0469": "双鸭山市",
        "0464": "七台河市",
        "0467": "鸡西市",
        "0453": "牡丹江市",
        "0455": "绥化市",
        "0457": "大兴安岭地区",
        "0457": "加格达奇",
        "021": "上海市",
        "025": "南京市",
        "0516": "徐州市",
        "0518": "连云港市",
        "0527": "宿迁市",
        "0517": "淮安市",
        "0515": "盐城市",
        "0514": "扬州市",
        "0523": "泰州市",
        "0513": "南通市",
        "0511": "镇江市",
        "0519": "常州市",
        "0510": "无锡市",
        "0512": "苏州市",
        "0571": "杭州市",
        "0572": "湖州市",
        "0573": "嘉兴市",
        "0580": "舟山市",
        "0574": "宁波市",
        "0575": "绍兴市",
        "0570": "衢州市",
        "0579": "金华市",
        "0576": "台州市",
        "0577": "温州市",
        "0578": "丽水市",
        "0551": "合肥市",
        "0557": "宿州市",
        "0561": "淮北市",
        "0558": "阜阳市",
        "0558": "亳州市",
        "0552": "蚌埠市",
        "0554": "淮南市",
        "0550": "滁州市",
        "0555": "马鞍山市",
        "0553": "芜湖市",
        "0562": "铜陵市",
        "0556": "安庆市",
        "0559": "黄山市",
        "0564": "六安市",
        "0566": "池州市",
        "0563": "宣城市",
        "0591": "福州市",
        "0599": "南平市",
        "0598": "三明市",
        "0594": "莆田市",
        "0595": "泉州市",
        "0592": "厦门市",
        "0596": "漳州市",
        "0597": "龙岩市",
        "0593": "宁德市",
        "0791": "南昌市",
        "0792": "九江市",
        "0798": "景德镇市",
        "0701": "鹰潭市",
        "0790": "新余市",
        "0799": "萍乡市",
        "0797": "赣州市",
        "0793": "上饶市",
        "0794": "抚州市",
        "0795": "宜春市",
        "0796": "吉安市",
        "0531": "济南市",
        "0635": "聊城市",
        "0534": "德州市",
        "0546": "东营市",
        "0533": "淄博市",
        "0536": "潍坊市",
        "0535": "烟台市",
        "0631": "威海市",
        "0532": "青岛市",
        "0633": "日照市",
        "0539": "临沂市",
        "0632": "枣庄市",
        "0537": "济宁市",
        "0538": "泰安市",
        "0634": "莱芜市",
        "0543": "滨州市",
        "0530": "菏泽市",
        "0371": "郑州市",
        "0371": "开封市",
        "0398": "三门峡市",
        "0379": "洛阳市",
        "0391": "焦作市",
        "0391": "济源市",
        "0373": "新乡市",
        "0392": "鹤壁市",
        "0372": "安阳市",
        "0393": "濮阳市",
        "0370": "商丘市",
        "0374": "许昌市",
        "0395": "漯河市",
        "0375": "平顶山市",
        "0377": "南阳市",
        "0376": "信阳市",
        "0394": "周口市",
        "0396": "驻马店市",
        "027": "武汉市",
        "0719": "十堰市",
        "0719": "神农架林区",
        "0710": "襄阳市",
        "0724": "荆门市",
        "0712": "孝感市",
        "0713": "黄冈市",
        "0711": "鄂州市",
        "0714": "黄石市",
        "0715": "咸宁市",
        "0716": "荆州市",
        "0717": "宜昌市",
        "0722": "随州市",
        "0728": "仙桃市",
        "0728": "天门市",
        "0728": "潜江市",
        "0718": "恩施土家族苗族自治州",
        "0731": "长沙市",
        "0731": "株洲市",
        "0731": "湘潭市",
        "0744": "张家界市",
        "0736": "常德市",
        "0737": "益阳市",
        "0730": "岳阳市",
        "0734": "衡阳市",
        "0735": "郴州市",
        "0746": "永州市",
        "0739": "邵阳市",
        "0745": "怀化市",
        "0738": "娄底市",
        "0743": "湘西土家族苗族自治州",
        "020": "广州市",
        "0763": "清远市",
        "0751": "韶关市",
        "0762": "河源市",
        "0753": "梅州市",
        "0768": "潮州市",
        "0754": "汕头市",
        "0663": "揭阳市",
        "0660": "汕尾市",
        "0752": "惠州市",
        "0769": "东莞市",
        "0755": "深圳市",
        "0756": "珠海市",
        "0760": "中山市",
        "0750": "江门市",
        "0757": "佛山市",
        "0758": "肇庆市",
        "0766": "云浮市",
        "0662": "阳江市",
        "0668": "茂名市",
        "0759": "湛江市",
        "0771": "南宁市",
        "0771": "崇左市",
        "0773": "桂林市",
        "0772": "柳州市",
        "0772": "来宾市",
        "0774": "梧州市",
        "0774": "贺州市",
        "0775": "贵港市",
        "0775": "玉林市",
        "0777": "钦州市",
        "0779": "北海市",
        "0770": "防城港市",
        "0776": "百色市",
        "0778": "河池市",
        "0898": "海南省",
        "023": "重庆市",
        "028": "成都市",
        "028": "资阳市",
        "028": "眉山市",
        "0839": "广元市",
        "0816": "绵阳市",
        "0838": "德阳市",
        "0817": "南充市",
        "0826": "广安市",
        "0825": "遂宁市",
        "0832": "内江市",
        "0833": "乐山市",
        "0813": "自贡市",
        "0830": "泸州市",
        "0831": "宜宾市",
        "0812": "攀枝花市",
        "0827": "巴中市",
        "0818": "达州市",
        "0835": "雅安市",
        "0837": "阿坝藏族羌族自治州",
        "0836": "甘孜藏族自治州",
        "0834": "凉山彝族自治州",
        "0851": "贵阳市",
        "0851": "遵义市",
        "0851": "安顺市",
        "0858": "六盘水市",
        "0857": "毕节市",
        "0856": "铜仁市",
        "0855": "黔东南苗族侗族自治州",
        "0854": "黔南布依族苗族自治州",
        "0859": "黔西南布依族苗族自治州",
        "0871": "昆明市",
        "0874": "曲靖市",
        "0877": "玉溪市",
        "0875": "保山市",
        "0870": "昭通市",
        "0888": "丽江市",
        "0879": "普洱市",
        "0883": "临沧市",
        "0692": "德宏傣族景颇族自治州",
        "0886": "怒江傈僳族自治州",
        "0887": "迪庆藏族自治州",
        "0872": "大理白族自治州",
        "0878": "楚雄彝族自治州",
        "0873": "红河哈尼族彝族自治州",
        "0876": "文山壮族苗族自治州",
        "0691": "西双版纳傣族自治州",
        "0891": "拉萨市",
        "0896": "那曲地区",
        "0895": "昌都地区",
        "0894": "林芝地区",
        "0893": "山南地区",
        "0892": "日喀则地区",
        "0897": "阿里地区",
        "029": "西安市",
        "029": "咸阳市",
        "0911": "延安市",
        "0919": "铜川市",
        "0913": "渭南市",
        "0917": "宝鸡市",
        "0916": "汉中市",
        "0912": "榆林市",
        "0915": "安康市",
        "0914": "商洛市",
        "0931": "兰州市",
        "0935": "金昌市",
        "0935": "武威市",
        "0943": "白银市",
        "0938": "天水市",
        "0937": "嘉峪关市",
        "0937": "酒泉市",
        "0936": "张掖市",
        "0934": "庆阳市",
        "0933": "平凉市",
        "0932": "定西市",
        "0939": "陇南市",
        "0930": "临夏回族自治州",
        "0941": "甘南藏族自治州",
        "0971": "西宁市",
        "0972": "海东地区",
        "0970": "海北藏族自治州",
        "0974": "海南藏族自治州",
        "0973": "黄南藏族自治州",
        "0975": "果洛藏族自治州",
        "0976": "玉树藏族自治州",
        "0977": "海西蒙古族藏族自治州",
        "0979": "格尔木市",
        "0951": "银川市",
        "0952": "石嘴山市",
        "0953": "吴忠市",
        "0954": "固原市",
        "0955": "中卫市",
        "0991": "乌鲁木齐市",
        "0990": "克拉玛依市",
        "0990": "和布克赛尔蒙古自治县",
        "0992": "奎屯市",
        "0992": "独山子区",
        "0992": "乌苏市",
        "0993": "石河子市",
        "0993": "沙湾县",
        "0997": "阿拉尔市",
        "0997": "阿克苏地区",
        "0997": "阿合奇县",
        "0998": "喀什地区",
        "0998": "图木舒克市",
        "0906": "阿勒泰地区",
        "0906": "北屯市",
        "0903": "和田地区",
        "0995": "吐鲁番地区",
        "0902": "哈密地区",
        "0908": "克孜勒苏柯尔克孜自治州",
        "0909": "博尔塔拉蒙古自治州",
        "0994": "昌吉回族自治州",
        "0994": "五家渠市",
        "0996": "巴音郭楞蒙古自治州",
        "0999": "伊犁哈萨克自治州",
        "0901": "塔城地区",
    };

    var replaceContent = function(el) {
        el.innerHTML = el.innerHTML.replace(/(\d{3,4})(?=\D|$)/g, function(match, areaCode) {
            if (areaCodes.hasOwnProperty(areaCode)) {
                return '<span>' + match + '</span>' + '(' + '<span  style="color:#EE6F2D">' + areaCodes[areaCode] + '</span>' + ')';
            }
            return match;
        });
    }

    var topicContent = document.getElementsByClassName("topic_content")[0];
    if (topicContent) {
        replaceContent(topicContent);
    }

    var titleContent = document.querySelector(".header h1");
    if (titleContent) {
        replaceContent(titleContent);
    }


    // 处理帖子列表
    var postCells = document.querySelectorAll("#TopicsNode>div.cell");
    for (var i = 0; i < postCells.length; i++) {
        var postContent = postCells[i].querySelector(".item_title a");
        if (postContent) {
            replaceContent(postContent);
        }
    }

    var replyContent = document.getElementsByClassName("reply_content");
    if (replyContent) {
        for (var i = 0; i < replyContent.length; i++) {
            replaceContent(replyContent[i]);
        }
    }
})();
