import { bossTypes } from './bosses.mjs';
import { CHAPTERS } from './progression.mjs';

export const SAVE_KEY='copy-war-meta-v1';
export const UPGRADES=Object.freeze([
  Object.freeze({id:'amplifier',name:'コピー増幅',detail:'味方コピーのHP＋12%・攻撃力＋10%／Lv',max:5,base:8,growth:7}),
  Object.freeze({id:'vanguard',name:'開戦援軍',detail:'初期部隊に新たな仲間を追加／Lv',max:4,base:12,growth:10}),
  Object.freeze({id:'resonance',name:'共鳴衝撃',detail:'数体コピーするたび、追加の衝撃波／Lv',max:3,base:16,growth:15}),
  Object.freeze({id:'dominion',name:'ボス因子',detail:'コピーしたボスのHP・攻撃力+20%／Lv。捕獲DNAで解放',max:4,base:28,growth:22}),
]);
export function newProgress() {
  return {crystals:0,unlockedChapter:0,selectedChapter:0,completed:[],
    levels:{amplifier:0,vanguard:0,resonance:0,dominion:0},bossDNA:[],totalRuns:0};
}
export function sanitizeProgress(input) {
  const def=newProgress();
  if(!input||typeof input!=='object')return def;
  const safeInt=(v,min,max)=>Number.isFinite(v)?Math.min(max,Math.max(min,Math.floor(v))):min;
  const done=Array.isArray(input.completed)?
    [...new Set(input.completed.filter(i=>Number.isInteger(i)&&i>=0&&i<CHAPTERS.length))]:[];
  const unlocked=done.length?Math.min(CHAPTERS.length-1,Math.max(...done)+1):0;
  const levels={};
  for(const upgrade of UPGRADES) levels[upgrade.id]=safeInt(input.levels?.[upgrade.id],0,upgrade.max);
  const bossDNA=Array.isArray(input.bossDNA)? [...new Set(input.bossDNA.filter(t=>bossTypes.includes(t)))]:[];
  return {
    bossDNA,
    crystals:safeInt(input.crystals,0,999999),
    unlockedChapter:unlocked,
    selectedChapter:safeInt(input.selectedChapter,0,unlocked),
    completed:done,
    levels:{...levels,dominion:Math.min(levels.dominion,bossDNA.length)},
    totalRuns:safeInt(input.totalRuns,0,999999),
  };
}
export function upgradeCost(def, level) {
  return level<def.max ? def.base+def.growth*level : null;
}
export function buyUpgrade(progress, upgradeId) {
  const def=UPGRADES.find(u=>u.id===upgradeId);
  if(!def)return {ok:false,reason:'unknown',progress};
  const level=progress.levels[upgradeId]??0;
  const cost=upgradeCost(def,level);
  if(cost===null)return {ok:false,reason:'max',progress};
  if(upgradeId==='dominion'&&level>=progress.bossDNA.length)
    return {ok:false,reason:'dna',progress};
  if(progress.crystals<cost)return {ok:false,reason:'funds',progress};
  return {ok:true,progress:{
    ...progress,crystals:progress.crystals-cost,
    levels:{...progress.levels,[upgradeId]:level+1}
  }};
}
export function scoreExpedition(battle) {
  const cleared=battle.secured.length;
  // Partially failed expeditions still reward trying another strategy.
  return Math.max(3,
    cleared*(6+battle.chapter*3)+
    Math.min(8,Math.floor(battle.kills.blue/8))+
    (battle.result==='won' ? 12+battle.chapter*4 : 0));
}
export function settleExpedition(progress,battle){
  const captured=battle.capturedBosses??[];
  const newBosses=captured.filter(type=>bossTypes.includes(type)&&!progress.bossDNA.includes(type));
  const reward=scoreExpedition(battle)+newBosses.length*18;
  const completion=battle.result==='won';
  const newlyCleared=completion&&!progress.completed.includes(battle.chapter);
  const completed=completion ? [...new Set([...progress.completed,battle.chapter])] : progress.completed;
  const unlockedChapter=Math.min(CHAPTERS.length-1,completed.length?Math.max(...completed)+1:0);
  return {
    reward, newBosses,
    progress:{
      ...progress,crystals:progress.crystals+reward,completed,unlockedChapter,
      bossDNA:[...progress.bossDNA,...newBosses],
      selectedChapter:newlyCleared ? Math.min(CHAPTERS.length-1,battle.chapter+1):progress.selectedChapter,
      totalRuns:progress.totalRuns+1,
    },
  };
}