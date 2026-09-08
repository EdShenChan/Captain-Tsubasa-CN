/* 《队长小翼》角色数据 · 汉化整理
 * 角色图片已预置到本地 assets/img/character/chara/
 * code 对应本地图片 chara_{code}.webp
 */
window.CHARA_DATA = {

  // 系列列表（对应角色页顶部切换）
  // name: 页签短名；full: 页面内展示的正式中文标题；logo: 官网对应页签 LOGO；desc: 官网简介中译
  series: [
    { id: 1, name: '小学篇', full: '《队长小翼》小学篇', logo: 'assets/img/character/logo/series_logo_1.png', en: 'Captain Tsubasa', desc: '描绘少年大空翼搬到静冈县南葛市之后的小学时代。与黄金搭档岬太郎联手，与若林源三、日向小次郎、三杉淳等全国强敌交锋，一路问鼎全国少年足球大赛——是日后飞向世界的大空翼的「原点」与传说起点！' },
    { id: 8, name: '中学篇', full: '《队长小翼》中学篇', logo: 'assets/img/character/logo/series_logo_1.png', en: 'Captain Tsubasa', desc: '升入中学的翼率领南葛国中挑战全国初中足球大赛，与东邦学园的日向小次郎展开巅峰对决，目标全国三连霸。立花兄弟、次藤洋、早田诚、若岛津健等新对手接连登场！' },
    { id: 9, name: '青少年篇', full: '《队长小翼》青少年篇', logo: 'assets/img/character/logo/series_logo_1.png', en: 'Captain Tsubasa', desc: 'Jr. 国际青年大赛时期。全日本青少年队远征欧洲，先后迎战意大利、德国、法国、阿根廷等世界强队。翼与岬太郎的「双人射门」再度闪耀国际舞台，与施奈德、迪亚斯等天才的对决令人热血沸腾！' },
    { id: 2, name: '世青篇', full: '《队长小翼 世青篇》', logo: 'assets/img/character/logo/series_logo_2.png', en: 'World Youth', desc: '中学毕业、奔赴梦想之地的巴西的翼，又作为青年日本代表出战世青赛。新世界的对手们接连登场，翼一行在激烈交锋中一路制胜。与恩师罗伯特所率最强巴西队的决战，结局究竟如何！？' },
    { id: 3, name: 'ROAD TO 2002', full: '《队长小翼 ROAD TO 2002》', logo: 'assets/img/character/logo/series_logo_3.png', en: 'Road to 2002', desc: '翼转会西班牙名门俱乐部巴塞罗那。在世界强者云集之处，历经激烈的正选之争，作为大人、作为职业选手急速成长。与新对手拿度尼的一战，成为日后被传颂的名胜负！' },
    { id: 4, name: 'GOLDEN-23', full: '《队长小翼 GOLDEN-23》', logo: 'assets/img/character/logo/series_logo_4.png', en: 'Golden-23', desc: '以「黄金世代」组成奥运代表队。由日向小次郎的恩师吉良教练执教的队伍，在缺少翼等海外成员的纯国内阵容下参加亚洲预选赛。在新战力崛起的同时，选手们历经亚洲激战获得了巨大成长！' },
    { id: 5, name: '海外激斗篇 IN CALCIO', full: '《队长小翼 海外激斗篇 IN CALCIO 日出处之国的乔卡多雷》', logo: 'assets/img/character/logo/series_logo_5.png', en: 'In Calcio', desc: '追踪「猛虎」日向小次郎与「中场发电机」葵新伍在意大利成长的番外篇。两人都为从三级联赛俱乐部升上更高级别联赛而奋斗！而迎来的最终战正是两人的对决。海外组的苦闷尽在其中！' },
    { id: 6, name: '海外激斗篇 EN LA LIGA', full: '《队长小翼 海外激斗篇 EN LA LIGA》', logo: 'assets/img/character/logo/series_logo_6.png', en: 'En La Liga', desc: '巴塞罗那的翼与皇家马德里的拿度尼。这两位在《ROAD TO 2002》中已交过手的英雄，为争夺西班牙联赛冠军而激烈碰撞！从巴西远渡欧洲、大幅成长的大空翼，转会第一年也迈向高潮——！' },
    { id: 7, name: 'RISING SUN', full: '《队长小翼 RISING SUN》', logo: 'assets/img/character/logo/series_logo_7.png', en: 'Rising Sun', desc: '突破亚洲预选的奥运代表队，加上翼等海外成员，以最佳阵容出征马德里奥运！迪亚斯、施奈德之外，新对手米迦勒也集结于此。在新必杀技接连不断使出的激战中，目标直指日本夙愿的金牌！' }
  ],

  // 角色列表：code 对应 chara_{code}
  characters: [
    // === 系列1 队长小翼（无印）· 小学篇 ===
    { code: '1_1_1',
    img: 'tsubasa_ozora_ele.webp', series: 1, name: '大空 翼', en: 'Tsubasa Ozora', nick: '足球之子', pos: '中场 / 前锋', number: '10', team: '南葛小学', skills: '抽球射门、倒挂金钩', desc: '系列主人公。信奉「足球是朋友」的足球天才，小学生时代从南葛市出发，与若林源三、日向小次郎等对手交锋，一路问鼎全国少年足球大赛。' },
    { code: '1_1_2',
    img: 'kojiro_hyuga_ele.webp', series: 1, name: '日向 小次郎', en: 'Kojiro Hyuga', nick: '猛虎', pos: '前锋', number: '9', team: '明和小学', skills: '猛虎射门、直线盘带', desc: '小学时代被称为「猛虎」，踢法硬朗、斗志顽强，是翼在全国大赛中最大的宿敌。' },
    { code: '1_1_3',
    img: 'genzo_wakabayashi_ele.webp', series: 1, name: '若林 源三', en: 'Genzo Wakabayashi', nick: '天才门将', pos: '守门员', number: '1', team: '修哲小学', skills: '神之扑救', desc: '被誉为「天才门将」。小学生时代便展现出超群的门将天赋，是翼最初的强劲对手，也是翼「足球是朋友」信念的起点。' },
    { code: '1_1_4',
    img: 'taro_misaki_ele.webp', series: 1, name: '岬 太郎', en: 'Taro Misaki', nick: '球场艺术家', pos: '中场', number: '11', team: '南葛小学', skills: '回力刀射门、双人射门', desc: '被称为「球场艺术家」，脚法秀丽。小学时代成为翼的黄金搭档，两人联手打出经典的「双人射门」。' },
    { code: '1_1_5',
    img: 'jun_misugi_ele.webp', series: 1, name: '三杉 淳', en: 'Jun Misugi', nick: '玻璃贵公子', pos: '中场 / 后卫', number: '10', team: '武藏小学', skills: '华丽的组织与射门', desc: '才华横溢却患有心脏病的「玻璃贵公子」。小学生时代球商与技术便远超同龄，是翼最忌惮的天才对手。' },
    { code: '1_1_6',
    img: 'hikaru_matsuyama_ele.webp', series: 1, name: '松山 光', en: 'Hikaru Matsuyama', nick: '北国荒鹫', pos: '中场 / 后卫', number: '6', team: '富良野小学', skills: '鹰射门、长距离射门', desc: '来自北海道的坚韧队长，被称为「北国荒鹫」。以顽强的精神与无私的团队意识著称。' },
    { code: '1_1_7',
    img: 'ryo_ishizaki_ele.webp', series: 1, name: '石崎 了', en: 'Ryo Ishizaki', nick: '热血后卫', pos: '后卫', number: '4', team: '南葛小学', skills: '颜面挡球', desc: '翼的青梅竹马好友，天赋平平却以热血与拼劲立足赛场。招牌的「颜面挡球」屡次在关键时刻守护球队。' },
    { code: '1_1_8',
    img: 'roberto_hongo_ele.webp', series: 1, name: '罗伯特·本乡', en: 'Roberto Hongo', nick: '恩师', pos: '前锋 / 教练', number: '-', team: '圣保罗 / 巴西', skills: '巴西式技术', desc: '曾是巴西天才球员，因伤退役后成为翼的恩师，引导翼走上职业足球之路。' },

    // === 系列8 队长小翼（无印）· 中学篇 ===
    { code: '1_2_1',
    img: 'tsubasa_ozora_mid.webp', series: 8, name: '大空 翼', en: 'Tsubasa Ozora', nick: '足球之子', pos: '中场', number: '10', team: '南葛国中', skills: '抽球射门、双人射门、滑翔抽球射门', desc: '中学时代的翼，带领南葛国中冲击全国初中大赛，与东邦学园的日向小次郎展开巅峰对决，最终成就三连霸伟业。' },
    { code: '1_2_2',
    img: 'masao_tachibana_kazuo_tachibana_mid.webp', series: 8, name: '立花 政夫·和夫', en: 'Tachibana Twins', nick: '空中双星', pos: '中场 / 前锋', number: '13 / 14', team: '花轮国中', skills: '空中合体技、双子射门', desc: '立花兄弟，擅长默契绝伦的空中合体技，是花轮国中的王牌组合。' },
    { code: '1_2_3',
    img: 'hiroshi_jito_mid.webp', series: 8, name: '次藤 洋', en: 'Hiroshi Jito', nick: '怪童', pos: '后卫', number: '5', team: '比良户国中', skills: '怪力防守、长传', desc: '体格魁梧的「怪童」，以强大的身体对抗与防守能力著称。' },
    { code: '1_2_4',
    img: 'makoto_soda_mid.webp', series: 8, name: '早田 诚', en: 'Makoto Soda', nick: '剃刀后卫', pos: '后卫', number: '2', team: '大友国中', skills: '剃刀铲球、剃刀射门', desc: '以凌厉的「剃刀」系铲球闻名的后卫，防守凶悍精准。' },
    { code: '1_2_5',
    img: 'shun_nitta_mid.webp', series: 8, name: '新田 瞬', en: 'Shun Nitta', nick: '高速之星', pos: '前锋', number: '9', team: '南葛国中', skills: '隼射门、高速盘带', desc: '以惊人速度见长的前锋，是南葛中学后期的重要战力。' },
    { code: '1_2_6',
    img: 'ken_wakashimazu_mid.webp', series: 8, name: '若岛津 健', en: 'Ken Wakashimazu', nick: '格斗门将', pos: '守门员', number: '1', team: '东邦学园', skills: '格斗式扑救、锋线出击', desc: '以格斗技融入守门的强力门将，是若林之外日本队的又一道铁闸。' },
    { code: '1_2_7',
    img: 'sanae_nakazawa_mid.webp', series: 8, name: '中泽 早苗', en: 'Sanae Nakazawa', nick: '应援团长', pos: '应援', number: '-', team: '南葛应援团', skills: '-', desc: '翼的青梅竹马与应援团团长，一直默默支持着翼的足球梦想。' },

    // === 系列9 队长小翼（无印）· 青少年篇 ===
    { code: '1_3_1',
    img: 'tsubasa_ozora_jr.webp', series: 9, name: '大空 翼', en: 'Tsubasa Ozora', nick: '足球之子', pos: '中场', number: '10', team: '全日本少年队', skills: '抽球射门、滑翔抽球射门', desc: 'Jr. 国际青年大赛时期的翼，率领全日本少年队远征欧洲，先后击败法国、德国等强敌，问鼎国际少年足球大赛。' },
    { code: '1_3_2',
    img: 'karl_heinz_schneider_jr.webp', series: 9, name: '卡尔·海因茨·施奈德', en: 'Karl Heinz Schneider', nick: '足球皇帝', pos: '前锋', number: '9', team: '德国 / 汉堡', skills: '皇帝射门、海市蜃楼射门', desc: '德国的「足球皇帝」，实力超群，是翼在欧洲赛场的宿命强敌。' },
    { code: '1_3_3',
    img: 'hermann_kaltz_jr.webp', series: 9, name: '赫尔曼·卡尔茨', en: 'Hermann Kaltz', nick: '司令塔', pos: '中场', number: '8', team: '德国 / 汉堡', skills: '精准长传', desc: '德国队的中场司令塔，以精准的调度与长传掌控比赛节奏。' },
    { code: '1_3_4',
    img: 'deuter_muller_jr.webp', series: 9, name: '迪特·穆勒', en: 'Deuter Muller', nick: '铁壁门神', pos: '守门员', number: '1', team: '德国', skills: '铁壁扑救', desc: '德国队的铁壁门将，以稳定强悍的守门能力著称。' },
    { code: '1_3_5',
    img: 'franz_schester_jr.webp', series: 9, name: '弗兰茨·谢斯特', en: 'Franz Schester', nick: '德国之翼', pos: '中场', number: '7', team: '德国', skills: '高速突破', desc: '德国队的边路好手，以速度与突破能力见长。' },
    { code: '1_3_6',
    img: 'elle_sid_pierre_jr.webp', series: 9, name: '艾尔·西多·皮埃尔', en: 'Elle Sid Pierre', nick: '优雅指挥家', pos: '中场', number: '10', team: '法国', skills: '艺术盘带、精准传球', desc: '法国队的天才中场，球风优雅华丽，被誉为「球场指挥家」。' },
    { code: '1_3_7',
    img: 'juan_diaz_jr.webp', series: 9, name: '胡安·迪亚斯', en: 'Juan Diaz', nick: '天才前锋', pos: '前锋', number: '10', team: '阿根廷', skills: '个人技术、突破射门', desc: '阿根廷的天才前锋，以出色的个人技术挑战日本队。' },
    { code: '1_3_8',
    img: 'zino_hernandez_jr.webp', series: 9, name: '吉诺·赫尔南德斯', en: 'Zino Hernandez', nick: '意大利守护神', pos: '守门员', number: '1', team: '意大利', skills: '神级扑救', desc: '意大利的「守护神」门将，防守能力世界顶级。' },

    // === 系列2 世青篇 ===
    { code: '2_1',
    img: 'world_youth_tsubasa_ozora.webp', series: 2, name: '大空 翼', en: 'Tsubasa Ozora', nick: '足球之子', pos: '中场', number: '10', team: '圣保罗 / 日本青年队', skills: '抽球射门、双人射门', desc: '世青篇的翼，代表青年日本队出战世青赛，直面恩师罗伯特率领的巴西。' },
    { code: '2_2',
    img: 'world_youth_shingo_aoi.webp', series: 2, name: '葵 新伍', en: 'Shingo Aoi', nick: '中场发动机', pos: '中场', number: '8', team: '国际米兰', skills: '直角假身、绝妙盘带', desc: '在意大利闯荡的热血中场，被称为「中场发动机」，以永不放弃的精神著称。' },
    { code: '2_3',
    img: 'world_youth_carlos_santana.webp', series: 2, name: '卡洛斯·辛坦拿', en: 'Carlos Santana', nick: '神之子', pos: '前锋', number: '9', team: '巴西', skills: '神之射门', desc: '巴西的「神之子」前锋，天赋异禀，是翼在世青赛中的头号劲敌。' },
    { code: '2_4',
    img: 'world_youth_natureza.webp', series: 2, name: '拿度尼', en: 'Natureza', nick: '足球之神', pos: '前锋', number: '9', team: '皇家马德里', skills: '自然系射门', desc: '被称为「足球之神」的超级天才，是翼走向世界后的最强对手之一。' },
    { code: '2_5',
    img: 'world_youth_stefan_levin.webp', series: 2, name: '斯特凡·莱文', en: 'Stefan Levin', nick: '冷血射手', pos: '前锋', number: '10', team: '瑞典', skills: '冷血射门', desc: '瑞典的冷血射手，以精准致命的射门著称。' },
    { code: '2_6',
    img: 'world_youth_ryoma_hino.webp', series: 2, name: '火野 龙马', en: 'Ryoma Hino', nick: '雷电', pos: '前锋', number: '9', team: '乌拉圭 / 河床', skills: '雷兽射门', desc: '日向小次郎在乌拉圭的强力搭档，与日向共同开发出「雷兽射门」。' },

    // === 系列3 ROAD TO 2002 ===
    { code: '3_1',
    img: 'road_to_2002_tsubasa_ozora.webp', series: 3, name: '大空 翼', en: 'Tsubasa Ozora', nick: '足球之子', pos: '中场', number: '28', team: '巴塞罗那', skills: '抽球射门、滑翔抽球射门', desc: '加盟巴塞罗那的翼，历经激烈的首发之争飞速成长。' },
    { code: '3_2',
    img: 'road_to_2002_rivaul.webp', series: 3, name: '利华尔', en: 'Rivaul', nick: '球王', pos: '前锋', number: '10', team: '巴塞罗那', skills: '球王级技术', desc: '巴塞罗那的王牌球星，翼在俱乐部的偶像与前辈。' },
    { code: '3_3',
    img: 'road_to_2002_gordoba_gonzalez.webp', series: 3, name: '戈尔多巴·冈萨雷斯', en: 'Gordoba Gonzalez', nick: '斗士', pos: '后卫', number: '-', team: '巴塞罗那', skills: '强硬防守', desc: '巴塞罗那的斗士型后卫，以顽强的防守著称。' },
    { code: '3_4',
    img: 'road_to_2002_radunga.webp', series: 3, name: '拉顿加', en: 'Radunga', nick: '防守核心', pos: '后卫', number: '-', team: '巴塞罗那', skills: '铁血防守', desc: '巴塞罗那的防守核心，经验丰富的老将。' },

    // === 系列4 GOLDEN-23 ===
    { code: '4_1',
    img: 'golden_23_tsubasa_ozora.webp', series: 4, name: '大空 翼', en: 'Tsubasa Ozora', nick: '足球之子', pos: '中场', number: '10', team: '日本奥运队', skills: '抽球射门', desc: 'GOLDEN-23 时期的翼，作为海外组核心回归日本队。' },
    { code: '4_2',
    img: 'golden_23_gakuto_igawa.webp', series: 4, name: '井川 岳人', en: 'Gakuto Igawa', nick: '新星', pos: '后卫', number: '-', team: '日本奥运队', skills: '稳健防守', desc: '国内组的新星后卫，在亚洲预选赛中崭露头角。' },
    { code: '4_3',
    img: 'golden_23_takeshi_sawada.webp', series: 4, name: '泽田 武志', en: 'Takeshi Sawada', nick: '日向的搭档', pos: '中场', number: '11', team: '日本奥运队', skills: '精准传球', desc: '日向小次郎的搭档，以精妙的传球支援前锋。' },
    { code: '4_4',
    img: 'golden_23_kozo_kira.webp', series: 4, name: '吉良 耕三', en: 'Kozo Kira', nick: '铁腕教练', pos: '教练', number: '-', team: '日本奥运队', skills: '战术指挥', desc: '日向小次郎的恩师，GOLDEN-23 的日本奥运队教练。' },
    { code: '4_5',
    img: 'golden_23_j_j_ochado.webp', series: 4, name: 'J·J·奥查德', en: 'J.J Ochado', nick: '黑豹', pos: '前锋', number: '-', team: '非洲球队', skills: '爆发力、速度', desc: '以惊人爆发力著称的非洲前锋，是亚洲预选赛的强劲对手。' },

    // === 系列5 IN CALCIO ===
    { code: '5_1',
    img: 'in_calcio_kojiro_hyuga.webp', series: 5, name: '日向 小次郎', en: 'Kojiro Hyuga', nick: '猛虎', pos: '前锋', number: '9', team: '雷吉亚纳', skills: '猛虎射门、雷兽射门', desc: '在意大利雷吉亚纳队奋战的日向，为升级而拼搏。' },
    { code: '5_2',
    img: 'in_calcio_shingo_aoi.webp', series: 5, name: '葵 新伍', en: 'Shingo Aoi', nick: '中场发动机', pos: '中场', number: '8', team: '阿尔卑斯', skills: '直角假身', desc: '在意大利阿尔卑斯队奋战的葵新伍，与日向在最终战正面对决。' },
    { code: '5_3',
    img: 'in_calcio_tomeya_akai.webp', series: 5, name: '赤井 止也', en: 'Tomeya Akai', nick: '热血防守', pos: '后卫', number: '-', team: '意大利球队', skills: '贴身防守', desc: '在意大利打拼的日本后卫，以热血防守著称。' },
    { code: '5_4',
    img: 'in_calcio_bobang.webp', series: 5, name: '博邦', en: 'Bobang', nick: '强力前锋', pos: '前锋', number: '-', team: '意大利球队', skills: '力量射门', desc: '意大利联赛中的强力前锋。' },
    { code: '5_5',
    img: 'in_calcio_maki_akamine.webp', series: 5, name: '赤岭 真纪', en: 'Maki Akamine', nick: '应援', pos: '-', number: '-', team: '-', skills: '-', desc: '日向小次郎在意大利的伙伴，给予日向支持与鼓励。' },

    // === 系列6 EN LA LIGA ===
    { code: '6_1',
    img: 'en_la_liga_tsubasa_ozora.webp', series: 6, name: '大空 翼', en: 'Tsubasa Ozora', nick: '足球之子', pos: '中场', number: '28', team: '巴塞罗那', skills: '抽球射门', desc: '在西班牙联赛与拿度尼再次交锋的翼。' },
    { code: '6_2',
    img: 'en_la_liga_rivaul.webp', series: 6, name: '利华尔', en: 'Rivaul', nick: '球王', pos: '前锋', number: '10', team: '巴塞罗那', skills: '球王级技术', desc: '巴塞罗那的王牌球星。' },
    { code: '6_3',
    img: 'en_la_liga_natureza.webp', series: 6, name: '拿度尼', en: 'Natureza', nick: '足球之神', pos: '前锋', number: '9', team: '皇家马德里', skills: '自然系射门', desc: '皇家马德里的「足球之神」，与翼争夺联赛冠军。' },
    { code: '6_4',
    img: 'en_la_liga_michael.webp', series: 6, name: '米迦勒', en: 'Michael', nick: '天使', pos: '中场', number: '10', team: '努曼西亚', skills: '天使之翼', desc: '被称为「天使」的西班牙天才中场，实力深不可测。' },

    // === 系列7 RISING SUN ===
    { code: '7_1',
    img: 'rising_sun_tsubasa_ozora.webp', series: 7, name: '大空 翼', en: 'Tsubasa Ozora', nick: '足球之子', pos: '中场', number: '10', team: '日本奥运队', skills: '抽球射门、新·滑翔抽球射门', desc: '以队长身份率领日本奥运队冲击金牌的翼。' },
    { code: '7_2',
    img: 'rising_sun_michael.webp', series: 7, name: '米迦勒', en: 'Michael', nick: '天使', pos: '中场', number: '10', team: '西班牙', skills: '天使之翼', desc: '西班牙的天才中场，奥运赛场上日本队的劲敌。' },
    { code: '7_3',
    img: 'rising_sun_raphael.webp', series: 7, name: '拉斐尔', en: 'Raphael', nick: '天使搭档', pos: '中场', number: '-', team: '西班牙', skills: '精妙配合', desc: '米迦勒的搭档，与米迦勒组成西班牙的「天使」双核。' },
    { code: '7_4',
    img: 'rising_sun_ricardo_espadas.webp', series: 7, name: '里卡多·埃斯帕达斯', en: 'Ricardo Espadas', nick: '门神', pos: '守门员', number: '1', team: '西班牙', skills: '神级扑救', desc: '西班牙的门神，扑救能力极强。' },
    { code: '7_5',
    img: 'rising_sun_brian_kluivoort.webp', series: 7, name: '布莱恩·克鲁伊福特', en: 'Brian Kluivoort', nick: '荷兰核心', pos: '中场', number: '10', team: '荷兰', skills: '全能中场', desc: '荷兰队的核心球员，是奥运赛场的强劲对手。' }
  ]
};
