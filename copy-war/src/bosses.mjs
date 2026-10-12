/** Eight capturable commanders, each with a mechanic unique to its chapter. */
export const BOSSES=Object.freeze({
  earthlord:Object.freeze({label:'裂地の巨王',chapter:0,subtitle:'地面を割る広範囲衝撃',color:'#d6a26f'}),
  thunderbird:Object.freeze({label:'雷翼獣',chapter:1,subtitle:'複数の敵へ連鎖する雷撃',color:'#af92ff'}),
  fortress:Object.freeze({label:'鉄砲巨城',chapter:2,subtitle:'三連の大砲で敵陣を爆撃',color:'#e1aa7d'}),
  mirrorlord:Object.freeze({label:'原初の複製王',chapter:3,subtitle:'敵を模した援軍を次々複製',color:'#d69cf5'}),
  frostqueen:Object.freeze({label:'氷霜女王',chapter:4,subtitle:'範囲凍結の氷波',color:'#a5dcf6'}),
  hivequeen:Object.freeze({label:'蟲群女王',chapter:5,subtitle:'一度に大量の兵士を孵す',color:'#c5e68f'}),
  cometlord:Object.freeze({label:'隕星王',chapter:6,subtitle:'広域に流星を落とす',color:'#ffbc87'}),
  eclipseking:Object.freeze({label:'終焉皇帝',chapter:7,subtitle:'敵を吸い込み爆裂する',color:'#ef9ef1'}),
});
export const isBoss=type=>Object.hasOwn(BOSSES,type);
export const bossTypes=Object.freeze(Object.keys(BOSSES));
