/** Three continuous frontline objectives in one tall, scrolling battlefield. */
export const WORLD_HEIGHT = 2150;
export const STAGES = Object.freeze([
  Object.freeze({
    name: '外郭防衛線', subtitle: '巨兵を奪って突破',
    y: 1380, hp: 450, entry: 1570,
    defenders: ['guardian','sword','sword','archer','mage'],
    waves: [['sword','archer','sword'],['guardian','archer','sword']],
  }),
  Object.freeze({
    name: '魔導砲陣地', subtitle: '飛行兵・突撃兵を奪え',
    y: 790, hp: 670, entry: 1010,
    defenders: ['raider','flier','archer','mage','guardian','healer'],
    waves: [['raider','flier','archer','sword'],['raider','mage','flier','guardian']],
  }),
  Object.freeze({
    name: '最終要塞', subtitle: '巨神の力で最終突破',
    y: 120, hp: 1100, entry: 360,
    defenders: ['titan','guardian','flier','raider','mage','healer','archer'],
    waves: [['guardian','flier','mage','raider','sword'],['titan','raider','flier','healer']],
  }),
]);

export function gateForStage(index) {
  const stage = STAGES[index];
  return {
    x: 180, y: stage.y, hp: stage.hp, maxHp: stage.hp,
    radius: index === STAGES.length-1 ? 39 : 31,
    label: stage.name, index,
  };
}
