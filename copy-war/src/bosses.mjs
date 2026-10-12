/** Four capturable commanders, each with a mechanic unique to its chapter. */
export const BOSSES=Object.freeze({
  earthlord:Object.freeze({label:'裂地の巨王',chapter:0,subtitle:'地面を割る広範囲衝撃',color:'#d6a26f'}),
  thunderbird:Object.freeze({label:'雷翼獣',chapter:1,subtitle:'複数の敵へ連鎖する雷撃',color:'#af92ff'}),
  fortress:Object.freeze({label:'鉄砲巨城',chapter:2,subtitle:'三連の大砲で敵陣を爆撃',color:'#e1aa7d'}),
  mirrorlord:Object.freeze({label:'原初の複製王',chapter:3,subtitle:'敵を模した援軍を次々複製',color:'#d69cf5'}),
});
export const isBoss=type=>Object.hasOwn(BOSSES,type);
export const bossTypes=Object.freeze(Object.keys(BOSSES));
