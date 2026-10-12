/**
 * Four expeditions of three fronts each. One run stays short, while clearing an
 * expedition unlocks the next region and gives access to its stronger templates.
 */
export const WORLD_HEIGHT = 2150;
const positions = [
  { y:1380, entry:1570 },
  { y:790, entry:1010 },
  { y:120, entry:360 },
];
function stage(name, subtitle, hp, defenders, waves, index, theme) {
  return Object.freeze({
    name, subtitle, hp, defenders, waves, theme,
    ...positions[index % 3], chapter:Math.floor(index/3), number:index+1,
  });
}
export const CHAPTERS = Object.freeze([
  Object.freeze({name:'辺境戦線', subtitle:'コピーの力を覚える', theme:'frontier'}),
  Object.freeze({name:'天空回廊', subtitle:'飛行軍団と空中砲撃', theme:'sky'}),
  Object.freeze({name:'機械工廠', subtitle:'突進・回復・巨大砲', theme:'factory'}),
  Object.freeze({name:'深淵中枢', subtitle:'あらゆる強敵を奪い返せ', theme:'abyss'}),
]);

export const STAGES = Object.freeze([
  stage('外郭防衛線','巨兵を味方に',450,['guardian','sword','sword','archer','mage'],
    [['sword','archer','sword'],['guardian','archer','sword']],0,'frontier'),
  stage('魔導砲陣地','飛行兵と突撃兵',670,['raider','flier','archer','mage','guardian','healer'],
    [['raider','flier','archer','sword'],['raider','mage','flier','guardian']],1,'frontier'),
  stage('巨神の門','巨神を奪い突破',1100,['titan','guardian','flier','raider','mage','healer','archer'],
    [['guardian','flier','mage','raider','sword'],['titan','raider','flier','healer']],2,'frontier'),

  stage('射手の砦','三連射で翼を射抜け',560,['archer','archer','flier','flier','guardian','healer'],
    [['flier','flier','archer'],['guardian','flier','mage']],3,'sky'),
  stage('翼の回廊','空を奪い制空権を取る',730,['flier','flier','flier','mage','raider','archer','healer'],
    [['flier','flier','mage','archer'],['flier','raider','flier','healer']],4,'sky'),
  stage('雷雲要塞','巨神と飛行大軍',1160,['titan','flier','flier','flier','mage','healer','guardian'],
    [['titan','flier','archer'],['flier','flier','guardian','healer']],5,'sky'),

  stage('突進製造区','突撃兵で敵陣を崩せ',620,['raider','raider','guardian','healer','mage','archer'],
    [['raider','raider','sword'],['guardian','raider','healer']],6,'factory'),
  stage('修復プラント','回復と砲撃を利用',780,['healer','healer','cannon','guardian','sword','flier','mage'],
    [['healer','guardian','cannon'],['raider','flier','healer']],7,'factory'),
  stage('超重装工廠','大砲と巨神の火力',1280,['cannon','cannon','titan','guardian','raider','healer','flier'],
    [['cannon','guardian','raider'],['titan','cannon','healer']],8,'factory'),

  stage('影の回廊','飛行・突進の挟み撃ち',700,['raider','raider','flier','flier','mage','healer','archer'],
    [['raider','flier','mage','archer'],['raider','flier','guardian','healer']],9,'abyss'),
  stage('複製阻止陣','召喚士の無限増援',970,['summoner','summoner','cannon','flier','guardian','healer','mage'],
    [['summoner','flier','guardian'],['cannon','raider','mage','healer']],10,'abyss'),
  stage('原初の王座','すべてをコピーして制圧',1640,['titan','titan','summoner','cannon','flier','raider','guardian','healer','mage'],
    [['titan','cannon','summoner','flier'],['guardian','raider','healer','flier']],11,'abyss'),
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
