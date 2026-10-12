/**
 * Eight expeditions of three fronts each. One run stays short, while clearing an
 * expedition unlocks the next region and gives access to its stronger templates.
 */
export const WORLD_HEIGHT = 2150;
const positions = [
  { y:1380, entry:1570 },
  { y:790, entry:1010 },
  { y:120, entry:360 },
];
const fillerByTheme={
  frontier:['sword','sword','archer','sword','guardian'],
  sky:['flier','archer','sword','flier','mage'],
  factory:['raider','sword','cannon','guardian','sword'],
  abyss:['flier','raider','archer','summoner','sword'],
  glacier:['guardian','mage','archer','sword','flier'],
  hive:['raider','sword','summoner','flier','sword'],
  comet:['cannon','mage','flier','raider','archer'],
  eclipse:['guardian','cannon','mage','flier','summoner'],
};
function stage(name, subtitle, hp, defenders, waves, index, theme) {
  // Full defenses are assembled when the sector is created, not slowly dripped
  // as distant invisible spawns. Keep several independently copyable classes.
  const chapter=Math.floor(index/3), sector=index%3;
  const density=12+sector*3+Math.floor(chapter/2);
  const fillers=fillerByTheme[theme];
  const defense=defenders.slice();
  while(defense.length<density)defense.push(fillers[(defense.length*3+sector)%fillers.length]);
  const groups=waves.map((mix,n)=>{
    const wave=mix.slice();
    const target=7+sector+Math.floor(chapter/3);
    while(wave.length<target)wave.push(fillers[(wave.length*2+n+sector)%fillers.length]);
    return wave;
  });
  return Object.freeze({
    name, subtitle, hp, defenders:defense, waves:groups, theme,
    waveInterval:Math.max(5.5,7.2-chapter*.13-sector*.35),
    ...positions[index % 3], chapter:Math.floor(index/3), number:index+1,
  });
}
export const CHAPTERS = Object.freeze([
  Object.freeze({name:'辺境戦線', subtitle:'コピーの力を覚える', theme:'frontier'}),
  Object.freeze({name:'天空回廊', subtitle:'飛行軍団と空中砲撃', theme:'sky'}),
  Object.freeze({name:'機械工廠', subtitle:'突進・回復・巨大砲', theme:'factory'}),
  Object.freeze({name:'深淵中枢', subtitle:'複製を阻む敵をコピーする', theme:'abyss'}),
  Object.freeze({name:'氷牢戦域', subtitle:'凍結を奪って群れを突破', theme:'glacier'}),
  Object.freeze({name:'蟲群巣窟', subtitle:'無数の兵士を生み出す敵軍', theme:'hive'}),
  Object.freeze({name:'星落遺跡', subtitle:'隕石砲撃が降り注ぐ戦場', theme:'comet'}),
  Object.freeze({name:'終焉皇城', subtitle:'最後の大軍団を奪い返す', theme:'eclipse'}),
]);

export const STAGES = Object.freeze([
  stage('外郭防衛線','巨兵を味方に',450,['guardian','sword','sword','archer','mage'],
    [['sword','archer','sword'],['guardian','archer','sword']],0,'frontier'),
  stage('魔導砲陣地','飛行兵と突撃兵',670,['raider','flier','archer','mage','guardian','healer'],
    [['raider','flier','archer','sword'],['raider','mage','flier','guardian']],1,'frontier'),
  stage('地裂の門','裂地の巨王を奪い突破',1100,['earthlord','guardian','flier','raider','mage','healer','archer'],
    [['guardian','flier','mage','raider','sword'],['titan','raider','flier','healer']],2,'frontier'),

  stage('射手の砦','三連射で翼を射抜け',560,['archer','archer','flier','flier','guardian','healer'],
    [['flier','flier','archer'],['guardian','flier','mage']],3,'sky'),
  stage('翼の回廊','空を奪い制空権を取る',730,['flier','flier','flier','mage','raider','archer','healer'],
    [['flier','flier','mage','archer'],['flier','raider','flier','healer']],4,'sky'),
  stage('雷雲要塞','雷翼獣と飛行軍団',1160,['thunderbird','flier','flier','flier','mage','healer','guardian'],
    [['titan','flier','archer'],['flier','flier','guardian','healer']],5,'sky'),

  stage('突進製造区','突撃兵で敵陣を崩せ',620,['raider','raider','guardian','healer','mage','archer'],
    [['raider','raider','sword'],['guardian','raider','healer']],6,'factory'),
  stage('修復プラント','回復と砲撃を利用',780,['healer','healer','cannon','guardian','sword','flier','mage'],
    [['healer','guardian','cannon'],['raider','flier','healer']],7,'factory'),
  stage('超重装工廠','大砲と巨神の火力',1280,['fortress','cannon','titan','guardian','raider','healer','flier'],
    [['cannon','guardian','raider'],['titan','cannon','healer']],8,'factory'),

  stage('影の回廊','飛行・突進の挟み撃ち',700,['raider','raider','flier','flier','mage','healer','archer'],
    [['raider','flier','mage','archer'],['raider','flier','guardian','healer']],9,'abyss'),
  stage('複製阻止陣','召喚士の無限増援',970,['summoner','summoner','cannon','flier','guardian','healer','mage'],
    [['summoner','flier','guardian'],['cannon','raider','mage','healer']],10,'abyss'),
  stage('原初の王座','すべてをコピーして制圧',1640,['mirrorlord','titan','summoner','cannon','flier','raider','guardian','healer','mage'],
    [['titan','cannon','summoner','flier'],['guardian','raider','healer','flier']],11,'abyss'),

  stage('凍てつく外門','盾と魔術の氷壁',900,['guardian','guardian','mage','flier','archer','healer'],
    [['guardian','archer','mage'],['flier','guardian','healer']],12,'glacier'),
  stage('結晶回廊','魔術師と射手の包囲',1170,['mage','mage','guardian','archer','flier','healer','cannon'],
    [['mage','archer','flier'],['guardian','mage','cannon']],13,'glacier'),
  stage('白銀女王宮','氷霜女王の凍結波',1760,['frostqueen','guardian','guardian','mage','cannon','archer','flier','healer'],
    [['guardian','mage','flier'],['mage','cannon','guardian']],14,'glacier'),

  stage('羽音の巣道','無数の雑兵が群れる',960,['sword','sword','raider','raider','flier','summoner','archer'],
    [['sword','raider','sword'],['flier','raider','summoner']],15,'hive'),
  stage('育成培養槽','召喚士と回復役を奪え',1250,['summoner','summoner','healer','healer','guardian','raider','cannon'],
    [['summoner','sword','flier'],['raider','healer','summoner']],16,'hive'),
  stage('群体女王の巣','女王の生む増援をコピー',1880,['hivequeen','summoner','summoner','guardian','flier','raider','healer','cannon'],
    [['summoner','flier','raider'],['guardian','summoner','archer']],17,'hive'),

  stage('赤い空の門','遠距離砲撃の要塞',1100,['cannon','cannon','archer','mage','guardian','flier','healer'],
    [['cannon','mage','archer'],['flier','raider','guardian']],18,'comet'),
  stage('墜星の祭壇','砲兵と空挺部隊の混成',1470,['cannon','cannon','flier','flier','mage','guardian','raider','healer'],
    [['cannon','flier','mage'],['raider','cannon','flier']],19,'comet'),
  stage('隕王の玉座','流星の雨を奪い返せ',2110,['cometlord','cannon','cannon','mage','flier','raider','guardian','healer'],
    [['cannon','mage','flier'],['raider','cannon','guardian']],20,'comet'),

  stage('黄昏軍の尖兵','精鋭全兵科が押し寄せる',1200,['guardian','raider','raider','flier','cannon','mage','healer','summoner'],
    [['guardian','raider','mage'],['flier','cannon','summoner']],21,'eclipse'),
  stage('王国の残響','コピーの嵐に耐え抜け',1670,['summoner','summoner','cannon','cannon','healer','mage','guardian','flier'],
    [['summoner','cannon','flier'],['guardian','mage','healer']],22,'eclipse'),
  stage('終焉の王庭','最後の王を味方に',2400,['eclipseking','titan','cannon','summoner','flier','mage','raider','guardian','healer'],
    [['summoner','cannon','guardian'],['flier','mage','titan']],23,'eclipse'),
]);

export function stagesForChapter(chapter) {
  const i = Math.max(0,Math.min(CHAPTERS.length-1,Math.trunc(chapter))) * 3;
  return STAGES.slice(i,i+3);
}
export function gateForStage(index) {
  const data=STAGES[index];
  return {
    x:180,y:data.y,hp:data.hp,maxHp:data.hp,
    radius:index%3===2?39:31,label:data.name,index,
  };
}