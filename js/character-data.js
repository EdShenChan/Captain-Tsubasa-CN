/* 《队长小翼》角色数据 · 汉化整理
 * 角色图片已预置到本地 assets/img/character/chara/
 * code 对应本地图片 chara_{code}.webp
 */
window.CHARA_DATA = {

  // 系列列表（对应角色页顶部切换）
  // name: 页签短名；full: 页面内展示的正式中文标题；logo: 官网对应页签 LOGO；desc: 官网简介中译
  series: [
    { id: 1, name: '队长小翼', full: '《队长小翼》',
      logo: 'assets/img/character/logo/series_logo_1.png',
      en: 'Captain Tsubasa',
      stages: ['小学生篇', '中学生篇', '青少年篇'],
      desc: '从少年大空翼搬到静冈县南葛市之后的小学、中学，直到 Jr. 国际青少年大赛的成长记。与无数宿敌的激战与感人剧情……是日后飞向世界的大空翼的「原点」，也是描绘他在日本奋战的传说系列！！' },
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
    img: 'tsubasa_ozora_ele.webp', series: 1, stage: 0, name: '大空 翼', en: 'Tsubasa Ozora', nick: '足球之子', pos: '中场 / 前锋', number: '10', team: '南葛小学', skills: '抽球射门、倒挂金钩', desc: '系列主人公。信奉「足球是朋友」的足球天才，小学生时代从南葛市出发，与若林源三、日向小次郎等对手交锋，一路问鼎全国少年足球大赛。' , profile: '从出生起就一直与足球为伴的天才足球少年。转入南葛小学足球队，司职前锋。信条是「足球是朋友」。' },
    { code: '1_1_2',
    img: 'kojiro_hyuga_ele.webp', series: 1, stage: 0, name: '日向 小次郎', en: 'Kojiro Hyuga', nick: '猛虎', pos: '前锋', number: '9', team: '明和小学', skills: '猛虎射门、直线盘带', desc: '小学时代被称为「猛虎」，踢法硬朗、斗志顽强，是翼在全国大赛中最大的宿敌。' , profile: '强队明和FC的王牌前锋。攻势凌厉、斗志旺盛，对自己与队友都极为严格；比赛时把球衣袖子卷到肩膀是他的标志。' },
    { code: '1_1_3',
    img: 'genzo_wakabayashi_ele.webp', series: 1, stage: 0, name: '若林 源三', en: 'Genzo Wakabayashi', nick: '天才门将', pos: '守门员', number: '1', team: '修哲小学', skills: '神之扑救', desc: '被誉为「天才门将」。小学生时代便展现出超群的门将天赋，是翼最初的强劲对手，也是翼「足球是朋友」信念的起点。' , profile: '强队修哲小学足球队的天才门将，信条是「禁区外的射门全部扑出」。收到翼的挑战书后，成为他的劲敌。' },
    { code: '1_1_4',
    img: 'taro_misaki_ele.webp', series: 1, stage: 0, name: '岬 太郎', en: 'Taro Misaki', nick: '球场艺术家', pos: '中场', number: '11', team: '南葛小学', skills: '回力刀射门、双人射门', desc: '被称为「球场艺术家」，脚法秀丽。小学时代成为翼的黄金搭档，两人联手打出经典的「双人射门」。' , profile: '武藏FC队长。技术与统率力兼备、不逊于翼的名将，却藏着某个秘密。深受女性球迷喜爱，被称为「球场上的贵公子」。' },
    { code: '1_1_5',
    img: 'jun_misugi_ele.webp', series: 1, stage: 0, name: '三杉 淳', en: 'Jun Misugi', nick: '玻璃贵公子', pos: '中场 / 后卫', number: '10', team: '武藏小学', skills: '华丽的组织与射门', desc: '才华横溢却患有心脏病的「玻璃贵公子」。小学生时代球商与技术便远超同龄，是翼最忌惮的天才对手。' , profile: '随画家父亲辗转各地后转入南葛小学。实力可与翼比肩，与翼默契无间，被合称为「黄金搭档」。' },
    { code: '1_1_6',
    img: 'hikaru_matsuyama_ele.webp', series: 1, stage: 0, name: '松山 光', en: 'Hikaru Matsuyama', nick: '北国荒鹫', pos: '中场 / 后卫', number: '6', team: '富良野小学', skills: '鹰射门、长距离射门', desc: '来自北海道的坚韧队长，被称为「北国荒鹫」。以顽强的精神与无私的团队意识著称。' , profile: '富良野小学足球队队长。以在严寒中锤炼出的坚韧意志与顽强球风带领全队，是勤奋型的球员。' },
    { code: '1_1_7',
    img: 'ryo_ishizaki_ele.webp', series: 1, stage: 0, name: '石崎 了', en: 'Ryo Ishizaki', nick: '热血后卫', pos: '后卫', number: '4', team: '南葛小学', skills: '颜面挡球', desc: '翼的青梅竹马好友，天赋平平却以热血与拼劲立足赛场。招牌的「颜面挡球」屡次在关键时刻守护球队。' , profile: '南葛小学足球队中翼的队友。以天生的冲劲与韧劲，为球队注入活力。' },
    { code: '1_1_8',
    img: 'roberto_hongo_ele.webp', series: 1, stage: 0, name: '罗伯特·本乡', en: 'Roberto Hongo', nick: '恩师', pos: '前锋 / 教练', number: '-', team: '圣保罗 / 巴西', skills: '巴西式技术', desc: '曾是巴西天才球员，因伤退役后成为翼的恩师，引导翼走上职业足球之路。' , profile: '翼的恩师，南葛小学足球队教练。为翼的才华所倾倒，决心将他培养成一流的职业球员。曾是巴西国家队球员。' },

    // === 系列8 队长小翼（无印）· 中学篇 ===
    { code: '1_2_1',
    img: 'tsubasa_ozora_mid.webp', series: 1, stage: 1, name: '大空 翼', en: 'Tsubasa Ozora', nick: '足球之子', pos: '中场', number: '10', team: '南葛国中', skills: '抽球射门、双人射门、滑翔抽球射门', desc: '中学时代的翼，带领南葛国中冲击全国初中大赛，与东邦学园的日向小次郎展开巅峰对决，最终成就三连霸伟业。' , profile: '升入南葛市立南葛中学。以毕业后前往巴西为目标，听从罗伯特的建言，从中学起由前锋改打中场。' },
    { code: '1_2_2',
    img: 'masao_tachibana_kazuo_tachibana_mid.webp', series: 1, stage: 1, name: '立花 政夫·和夫', en: 'Tachibana Twins', nick: '空中双星', pos: '中场 / 前锋', number: '13 / 14', team: '花轮国中', skills: '空中合体技、双子射门', desc: '立花兄弟，擅长默契绝伦的空中合体技，是花轮国中的王牌组合。' , profile: '花轮足球少年团所属。以默契十足的杂技式配合见长的双胞胎球员，通称「立花兄弟」。政夫是哥哥，和夫是弟弟。' },
    { code: '1_2_3',
    img: 'hiroshi_jito_mid.webp', series: 1, stage: 1, name: '次藤 洋', en: 'Hiroshi Jito', nick: '怪童', pos: '后卫', number: '5', team: '比良户国中', skills: '怪力防守、长传', desc: '体格魁梧的「怪童」，以强大的身体对抗与防守能力著称。' , profile: '比良户中的球员，人称「力量型后卫」。擅长以魁梧体格发动强力打法，以及与学弟佐野满的连携配合。说话带独特口音是其特点。' },
    { code: '1_2_4',
    img: 'makoto_soda_mid.webp', series: 1, stage: 1, name: '早田 诚', en: 'Makoto Soda', nick: '剃刀后卫', pos: '后卫', number: '2', team: '大友国中', skills: '剃刀铲球、剃刀射门', desc: '以凌厉的「剃刀」系铲球闻名的后卫，防守凶悍精准。' , profile: '东一中所属。死死盯防对方王牌，甚至不惜犯规地粗野防守，被称为「王牌杀手早田」。在全国大赛中彻底盯防翼。' },
    { code: '1_2_5',
    img: 'shun_nitta_mid.webp', series: 1, stage: 1, name: '新田 瞬', en: 'Shun Nitta', nick: '高速之星', pos: '前锋', number: '9', team: '南葛国中', skills: '隼射门、高速盘带', desc: '以惊人速度见长的前锋，是南葛中学后期的重要战力。' , profile: '比翼低一年级的大友中学王牌前锋。达成全日本少年足球大赛两连霸，被称为「拥有与翼同等的资质」。50 米跑 6 秒整的爆发速度是其武器。' },
    { code: '1_2_6',
    img: 'ken_wakashimazu_mid.webp', series: 1, stage: 1, name: '若岛津 健', en: 'Ken Wakashimazu', nick: '格斗门将', pos: '守门员', number: '1', team: '东邦学园', skills: '格斗式扑救、锋线出击', desc: '以格斗技融入守门的强力门将，是若林之外日本队的又一道铁闸。' , profile: '东邦学园中学门将。若林远赴德国后，被称为国内中学生第一门将。空手道有段位，擅长融入空手道招式的扑救动作。' },
    { code: '1_2_7',
    img: 'sanae_nakazawa_mid.webp', series: 1, stage: 1, name: '中泽 早苗', en: 'Sanae Nakazawa', nick: '应援团长', pos: '应援', number: '-', team: '南葛应援团', skills: '-', desc: '翼的青梅竹马与应援团团长，一直默默支持着翼的足球梦想。' , profile: '通称「大姐头」。小学时代的假小子性格大变，成长为端庄的女性经理，担任南葛中学足球队经理支撑球队。' },

    // === 系列9 队长小翼（无印）· 青少年篇 ===
    { code: '1_3_1',
    img: 'tsubasa_ozora_jr.webp', series: 1, stage: 2, name: '大空 翼', en: 'Tsubasa Ozora', nick: '足球之子', pos: '中场', number: '10', team: '全日本少年队', skills: '抽球射门、滑翔抽球射门', desc: 'Jr. 国际青年大赛时期的翼，率领全日本少年队远征欧洲，先后击败法国、德国等强敌，问鼎国际少年足球大赛。' , profile: '因专心治疗大赛中所受的伤，起初未能入选代表队；但他只身闯入与意大利青少年队的较量并攻入一球，从而成为正式成员，其他国家选手也对他刮目相看。作为全日本青少年队队长，与世界强豪交锋。' },
    { code: '1_3_2',
    img: 'karl_heinz_schneider_jr.webp', series: 1, stage: 2, name: '卡尔·海因茨·施奈德', en: 'Karl Heinz Schneider', nick: '足球皇帝', pos: '前锋', number: '9', team: '德国 / 汉堡', skills: '皇帝射门、海市蜃楼射门', desc: '德国的「足球皇帝」，实力超群，是翼在欧洲赛场的宿命强敌。' , profile: '德国青少年队的王牌前锋，有「德国的年轻皇帝」之称。以压倒性的力量与技术挡在全日本青少年队面前。与若林源三是汉堡青少年队的队友。' },
    { code: '1_3_3',
    img: 'hermann_kaltz_jr.webp', series: 1, stage: 2, name: '赫尔曼·卡尔茨', en: 'Hermann Kaltz', nick: '司令塔', pos: '中场', number: '8', team: '德国 / 汉堡', skills: '精准长传', desc: '德国队的中场司令塔，以精准的调度与长传掌控比赛节奏。' , profile: '德国青少年队球员，司职中场，人称「实干家」。以巧妙的脚下技术抢断并为得分做出贡献，总是叼着一根牙签。' },
    { code: '1_3_4',
    img: 'deuter_muller_jr.webp', series: 1, stage: 2, name: '迪特·穆勒', en: 'Deuter Muller', nick: '铁壁门神', pos: '守门员', number: '1', team: '德国', skills: '铁壁扑救', desc: '德国队的铁壁门将，以稳定强悍的守门能力著称。' , profile: '人称「钢铁巨人」的德国青少年队门将。擅长单手接球，握力之强足以把足球捏至破裂。' },
    { code: '1_3_5',
    img: 'franz_schester_jr.webp', series: 1, stage: 2, name: '弗兰茨·谢斯特', en: 'Franz Schester', nick: '德国之翼', pos: '中场', number: '7', team: '德国', skills: '高速突破', desc: '德国队的边路好手，以速度与突破能力见长。' , profile: '德国青少年队的指挥官，展现出令全日本青少年队束手无策的华丽技术。相貌英俊，女性球迷众多。' },
    { code: '1_3_6',
    img: 'elle_sid_pierre_jr.webp', series: 1, stage: 2, name: '艾尔·西多·皮埃尔', en: 'Elle Sid Pierre', nick: '优雅指挥家', pos: '中场', number: '10', team: '法国', skills: '艺术盘带、精准传球', desc: '法国队的天才中场，球风优雅华丽，被誉为「球场指挥家」。' , profile: '法国青少年队队长，作为中场获得高度评价的全能型球员。与岬展开势均力敌的较量，并将岬视为终生的对手。' },
    { code: '1_3_7',
    img: 'juan_diaz_jr.webp', series: 1, stage: 2, name: '胡安·迪亚斯', en: 'Juan Diaz', nick: '天才前锋', pos: '前锋', number: '10', team: '阿根廷', skills: '个人技术、突破射门', desc: '阿根廷的天才前锋，以出色的个人技术挑战日本队。' , profile: '被称为「阿根廷的至宝」的阿根廷青少年队天才球员。各方面都拥有最高水准的技术，也能使出与翼同样的必杀「抽球射门」。' },
    { code: '1_3_8',
    img: 'zino_hernandez_jr.webp', series: 1, stage: 2, name: '吉诺·赫尔南德斯', en: 'Zino Hernandez', nick: '意大利守护神', pos: '守门员', number: '1', team: '意大利', skills: '神级扑救', desc: '意大利的「守护神」门将，防守能力世界顶级。' , profile: '一整年未曾被攻破球门的意大利青少年队门将，有「完美门将」之称，让对手领教意大利的「链式防守」。' },

    // === 系列2 世青篇 ===
    { code: '2_1',
    img: 'world_youth_tsubasa_ozora.webp', series: 2, name: '大空 翼', en: 'Tsubasa Ozora', nick: '足球之子', pos: '中场', number: '10', team: '圣保罗 / 日本青年队', skills: '抽球射门、双人射门', desc: '世青篇的翼，代表青年日本队出战世青赛，直面恩师罗伯特率领的巴西。' , profile: '作为巴西圣保罗FC的核心球员活跃，为与全日本青年队汇合而回国，率领球队挑战第一阶段预选赛。' },
    { code: '2_2',
    img: 'world_youth_shingo_aoi.webp', series: 2, name: '葵 新伍', en: 'Shingo Aoi', nick: '中场发动机', pos: '中场', number: '8', team: '国际米兰', skills: '直角假身、绝妙盘带', desc: '在意大利闯荡的热血中场，被称为「中场发动机」，以永不放弃的精神著称。' , profile: '司职中场，比翼小一岁的球员，中学毕业后远赴意大利。自第一阶段预选赛起参赛，以速度与充沛的体能驰骋球场。' },
    { code: '2_3',
    img: 'world_youth_carlos_santana.webp', series: 2, name: '卡洛斯·辛坦拿', en: 'Carlos Santana', nick: '神之子', pos: '前锋', number: '9', team: '巴西', skills: '神之射门', desc: '巴西的「神之子」前锋，天赋异禀，是翼在世青赛中的头号劲敌。' , profile: '巴西青年队前锋。因身世而失去情感、只顾追求胜利，被称为「足球机器人」；但在巴西职业联赛与翼交手后，重新找回踢球的乐趣。' },
    { code: '2_4',
    img: 'world_youth_natureza.webp', series: 2, name: '拿度尼', en: 'Natureza', nick: '足球之神', pos: '前锋', number: '9', team: '皇家马德里', skills: '自然系射门', desc: '被称为「足球之神」的超级天才，是翼走向世界后的最强对手之一。' , profile: '巴西青年队球员。被罗伯特本乡认定为比大空翼更具才华、而在亚马逊深处发掘出的野性少年。决赛下半场登场，与翼率领的全日本青年队一决高下。' },
    { code: '2_5',
    img: 'world_youth_stefan_levin.webp', series: 2, name: '斯特凡·莱文', en: 'Stefan Levin', nick: '冷血射手', pos: '前锋', number: '10', team: '瑞典', skills: '冷血射门', desc: '瑞典的冷血射手，以精准致命的射门著称。' , profile: '瑞典青年队队长，司职中场。「白夜四骑士」的首领，有「球场破坏神」之称。兼具科学训练锻造的身体素质与顶级技术。' },
    { code: '2_6',
    img: 'world_youth_ryoma_hino.webp', series: 2, name: '火野 龙马', en: 'Ryoma Hino', nick: '雷电', pos: '前锋', number: '9', team: '乌拉圭 / 河床', skills: '雷兽射门', desc: '日向小次郎在乌拉圭的强力搭档，与日向共同开发出「雷兽射门」。' , profile: '蒙得维的亚青年队的日裔球员，司职前锋。以「日本轰炸机」自傲，但在乌拉圭队中并不张扬；受贺茂之邀，作为 Real Japan 7 的一员来日。' },

    // === 系列3 ROAD TO 2002 ===
    { code: '3_1',
    img: 'road_to_2002_tsubasa_ozora.webp', series: 3, name: '大空 翼', en: 'Tsubasa Ozora', nick: '足球之子', pos: '中场', number: '28', team: '巴塞罗那', skills: '抽球射门、滑翔抽球射门', desc: '加盟巴塞罗那的翼，历经激烈的首发之争飞速成长。' , profile: '远赴欧洲、转会「FC巴塞罗那」。在与身披 10 号的利鲍尔的位置竞争中落败，转而在 B 队踢球。' },
    { code: '3_2',
    img: 'road_to_2002_rivaul.webp', series: 3, name: '利华尔', en: 'Rivaul', nick: '球王', pos: '前锋', number: '10', team: '巴塞罗那', skills: '球王级技术', desc: '巴塞罗那的王牌球星，翼在俱乐部的偶像与前辈。' , profile: '「FC巴塞罗那」不动的 10 号，通称「巴萨之鹰」。是翼也难以企及的世界最高水准的超级球员，为了带领球队取胜，踢法也毫不留情。' },
    { code: '3_3',
    img: 'road_to_2002_gordoba_gonzalez.webp', series: 3, name: '戈尔多巴·冈萨雷斯', en: 'Gordoba Gonzalez', nick: '斗士', pos: '后卫', number: '-', team: '巴塞罗那', skills: '强硬防守', desc: '巴塞罗那的斗士型后卫，以顽强的防守著称。' , profile: '「FC巴塞罗那」的后卫、翼的队友。常邀翼一同吃饭、聊足球，交流颇多。已宣布本赛季结束后退役。' },
    { code: '3_4',
    img: 'road_to_2002_radunga.webp', series: 3, name: '拉顿加', en: 'Radunga', nick: '防守核心', pos: '后卫', number: '-', team: '巴塞罗那', skills: '铁血防守', desc: '巴塞罗那的防守核心，经验丰富的老将。' , profile: '效力于巴西「圣保罗FC」的中场，通称「斗将拉顿加」。是翼在圣保罗时期的好前辈，也是巴西国家队球员。' },

    // === 系列4 GOLDEN-23 ===
    { code: '4_1',
    img: 'golden_23_tsubasa_ozora.webp', series: 4, name: '大空 翼', en: 'Tsubasa Ozora', nick: '足球之子', pos: '中场', number: '10', team: '日本奥运队', skills: '抽球射门', desc: 'GOLDEN-23 时期的翼，作为海外组核心回归日本队。' , profile: '在利鲍尔因伤长期缺阵期间，取而代之，作为「FC巴塞罗那」前腰的核心球员活跃。' },
    { code: '4_2',
    img: 'golden_23_gakuto_igawa.webp', series: 4, name: '井川 岳人', en: 'Gakuto Igawa', nick: '新星', pos: '后卫', number: '-', team: '日本奥运队', skills: '稳健防守', desc: '国内组的新星后卫，在亚洲预选赛中崭露头角。' , profile: '日本队队长井川隼人的弟弟，力量与技术兼备的全能型球员。因某种原因退出 Real Japan 11。在国奥队司职后卫·中后卫。' },
    { code: '4_3',
    img: 'golden_23_takeshi_sawada.webp', series: 4, name: '泽田 武志', en: 'Takeshi Sawada', nick: '日向的搭档', pos: '中场', number: '11', team: '日本奥运队', skills: '精准传球', desc: '日向小次郎的搭档，以精妙的传球支援前锋。' , profile: '在明和FC、东邦学园与日向、若岛津并肩作战的年轻球员。就任 U-19 全日本青年队队长，身披 10 号。' },
    { code: '4_4',
    img: 'golden_23_kozo_kira.webp', series: 4, name: '吉良 耕三', en: 'Kozo Kira', nick: '铁腕教练', pos: '教练', number: '-', team: '日本奥运队', skills: '战术指挥', desc: '日向小次郎的恩师，GOLDEN-23 的日本奥运队教练。' , profile: '曾率领明和FC的教练，是比赛中也要把一升装酒瓶带上替补席的酒豪。突然就任 U-23 代表队主帅，为带领球队取胜而宣布戒酒；以「进攻是最好的防守」为信条的培养方针与大胆的用人统率国奥队。' },
    { code: '4_5',
    img: 'golden_23_j_j_ochado.webp', series: 4, name: 'J·J·奥查德', en: 'J.J Ochado', nick: '黑豹', pos: '前锋', number: '-', team: '非洲球队', skills: '爆发力、速度', desc: '以惊人爆发力著称的非洲前锋，是亚洲预选赛的强劲对手。' , profile: '尼日利亚 U-22 代表队队长、尼日利亚的指挥官。曾因岬在世界青年大赛中脚伤而顶替他加盟巴黎SG，因此将岬视为对手。' },

    // === 系列5 IN CALCIO ===
    { code: '5_1',
    img: 'in_calcio_kojiro_hyuga.webp', series: 5, name: '日向 小次郎', en: 'Kojiro Hyuga', nick: '猛虎', pos: '前锋', number: '9', team: '雷吉亚纳', skills: '猛虎射门、雷兽射门', desc: '在意大利雷吉亚纳队奋战的日向，为升级而拼搏。' , profile: '原属意甲「尤文图斯」，为强化得分能力而租借转会至意丙一「AC雷吉亚纳」。以千锤百炼的强悍脚力射出的射门为武器，目标是意丙一射手王与球队升入意乙。' },
    { code: '5_2',
    img: 'in_calcio_shingo_aoi.webp', series: 5, name: '葵 新伍', en: 'Shingo Aoi', nick: '中场发动机', pos: '中场', number: '8', team: '阿尔卑斯', skills: '直角假身', desc: '在意大利阿尔卑斯队奋战的葵新伍，与日向在最终战正面对决。' , profile: '在国际米兰因外援名额问题无法进入一线队，又未定下去处，便以「修行」之名加盟意丙一「FC阿尔贝塞」。以天生的跑动量在攻防两端活跃。' },
    { code: '5_3',
    img: 'in_calcio_tomeya_akai.webp', series: 5, name: '赤井 止也', en: 'Tomeya Akai', nick: '热血防守', pos: '后卫', number: '-', team: '意大利球队', skills: '贴身防守', desc: '在意大利打拼的日本后卫，以热血防守著称。' , profile: '世界青年大赛后回到「FC桑普多利亚」，虽多为替补出场，但对球队贡献巨大，是有「恐怖的红色拦截者」之称的名后卫。' },
    { code: '5_4',
    img: 'in_calcio_bobang.webp', series: 5, name: '博邦', en: 'Bobang', nick: '强力前锋', pos: '前锋', number: '-', team: '意大利球队', skills: '力量射门', desc: '意大利联赛中的强力前锋。' , profile: '尼日利亚青年队球员，是葵加盟「FC阿尔贝塞」时最先遇到的人。以非洲系特有的惊人身体能力为武器，能胜任所有位置。' },
    { code: '5_5',
    img: 'in_calcio_maki_akamine.webp', series: 5, name: '赤岭 真纪', en: 'Maki Akamine', nick: '应援', pos: '-', number: '-', team: '-', skills: '-', desc: '日向小次郎在意大利的伙伴，给予日向支持与鼓励。' , profile: '女子垒球选手。在冲绳与日向相遇时的传球游戏，成为「雷兽射门」的灵感来源。从世界青年大赛正赛起一直为日向加油，日向转会意丙一后还会去都灵看他的比赛。' },

    // === 系列6 EN LA LIGA ===
    { code: '6_1',
    img: 'en_la_liga_tsubasa_ozora.webp', series: 6, name: '大空 翼', en: 'Tsubasa Ozora', nick: '足球之子', pos: '中场', number: '28', team: '巴塞罗那', skills: '抽球射门', desc: '在西班牙联赛与拿度尼再次交锋的翼。' , profile: '也担任 U-23 国奥日本队队长。参加集训的翼回顾西甲联赛的激战，回想与「皇家马德里」一战以及新对手的出现，再度燃起斗志。' },
    { code: '6_2',
    img: 'en_la_liga_rivaul.webp', series: 6, name: '利华尔', en: 'Rivaul', nick: '球王', pos: '前锋', number: '10', team: '巴塞罗那', skills: '球王级技术', desc: '巴塞罗那的王牌球星。' , profile: '回归「FC巴塞罗那」，与翼一同迎战「皇家马德里」。马德里奥运会巴西代表。' },
    { code: '6_3',
    img: 'en_la_liga_natureza.webp', series: 6, name: '拿度尼', en: 'Natureza', nick: '足球之神', pos: '前锋', number: '9', team: '皇家马德里', skills: '自然系射门', desc: '皇家马德里的「足球之神」，与翼争夺联赛冠军。' , profile: '效力于西甲顶级豪门「皇家马德里」。在世界青年大赛决赛中作为巴西代表与翼交手落败，为了讨回这笔账而成为职业球员。' },
    { code: '6_4',
    img: 'en_la_liga_michael.webp', series: 6, name: '米迦勒', en: 'Michael', nick: '天使', pos: '中场', number: '10', team: '努曼西亚', skills: '天使之翼', desc: '被称为「天使」的西班牙天才中场，实力深不可测。' , profile: '翼在自主训练时遇到的青年。平时是住在教堂的神父，却拥有随心操控足球的神乎其技，是个谜团重重的人物。' },

    // === 系列7 RISING SUN ===
    { code: '7_1',
    img: 'rising_sun_tsubasa_ozora.webp', series: 7, name: '大空 翼', en: 'Tsubasa Ozora', nick: '足球之子', pos: '中场', number: '10', team: '日本奥运队', skills: '抽球射门、新·滑翔抽球射门', desc: '以队长身份率领日本奥运队冲击金牌的翼。' , profile: '拿下与墨西哥的热身赛、为奥运会正赛建立起可靠手感的翼，率领 U-23 国奥日本队志在必得地奔赴西班牙，终于迎来马德里奥运会开幕。' },
    { code: '7_2',
    img: 'rising_sun_michael.webp', series: 7, name: '米迦勒', en: 'Michael', nick: '天使', pos: '中场', number: '10', team: '西班牙', skills: '天使之翼', desc: '西班牙的天才中场，奥运赛场上日本队的劲敌。' , profile: '马德里奥运会西班牙代表。受翼与拿度尼的表现触动，决定重新开始踢球；加盟西甲「CD努曼西亚」后入选国家队。拥有无摆动作射门与「赛格威盘带」等超绝技巧。' },
    { code: '7_3',
    img: 'rising_sun_raphael.webp', series: 7, name: '拉斐尔', en: 'Raphael', nick: '天使搭档', pos: '中场', number: '-', team: '西班牙', skills: '精妙配合', desc: '米迦勒的搭档，与米迦勒组成西班牙的「天使」双核。' , profile: '将米迦勒招入「CD努曼西亚」、肩负西班牙未来的中场。与旧友米迦勒展现出可与翼·岬比肩的连携配合。' },
    { code: '7_4',
    img: 'rising_sun_ricardo_espadas.webp', series: 7, name: '里卡多·埃斯帕达斯', en: 'Ricardo Espadas', nick: '门神', pos: '守门员', number: '1', team: '西班牙', skills: '神级扑救', desc: '西班牙的门神，扑救能力极强。' , profile: '马德里奥运会墨西哥代表门将。身为门将却积极插上进攻射门，因此被称为「奇迹门将」。突破力与射门力俱佳，堪称墨西哥队的核心人物。' },
    { code: '7_5',
    img: 'rising_sun_brian_kluivoort.webp', series: 7, name: '布莱恩·克鲁伊福特', en: 'Brian Kluivoort', nick: '荷兰核心', pos: '中场', number: '10', team: '荷兰', skills: '全能中场', desc: '荷兰队的核心球员，是奥运赛场的强劲对手。' , profile: '马德里奥运会荷兰代表，被称为「全攻全守的指挥官」。不但技术出众，除组织进攻外，还能射出足以摧毁若林右腕的射门，是全能型球员。' }
  ]
};
