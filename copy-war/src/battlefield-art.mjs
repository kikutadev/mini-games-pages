/**
 * Decorative battleground renderer. Each chapter keeps the same readable combat
 * surface, while scenery, architecture and camera-parallax establish place.
 */
const TAU = Math.PI*2;
const palettes=[
  {sky:['#393a50','#344956','#24474e'],edge:'#779b81',stone:'#65999d',accent:'#d8bf8f',dust:'#b5c8a1'},
  {sky:['#283e65','#317087','#214b71'],edge:'#6e9dc9',stone:'#a6c8d9',accent:'#dbcbf6',dust:'#bfedff'},
  {sky:['#4c3947','#4a474c','#35414c'],edge:'#a99082',stone:'#a5a8a2',accent:'#ffbd7e',dust:'#ffd2a5'},
  {sky:['#352949','#37345d','#223d60'],edge:'#987dbd',stone:'#b8a0c6',accent:'#e9aef1',dust:'#d8baff'},
];
const mod=(x,n)=>((x%n)+n)%n;
function disc(ctx,x,y,rx,ry,color){
  ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,TAU);
  ctx.fillStyle=color;ctx.fill();
}
function contour(ctx,pts,color,w=1){
  ctx.beginPath();ctx.moveTo(...pts[0]);
  for(const p of pts.slice(1))ctx.lineTo(...p);
  ctx.strokeStyle=color;ctx.lineWidth=w;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();
}
function terrainDecor(ctx,chapter,x,y,i,t,p) {
  ctx.save();ctx.translate(x,y);
  const f= Math.sin(i*6.1)*3;
  if(chapter===0){
    // Mossy broken flagstones, polished crystal clusters and leaves.
    ctx.strokeStyle='#6f9e9140';ctx.lineWidth=1.6;
    ctx.strokeRect(-16,-9,31,18);
    contour(ctx,[[-9,3],[0,-4],[7,-4],[14,-8]],'#111f3038',1.3);
    for(let k=0;k<3;k++) {
      ctx.save();ctx.translate((k-1)*13,5+(k%2)*5);ctx.rotate(k*.46+Math.sin(t*1.5+i)*.05);
      disc(ctx,0,0,4,2.2,'#b2c69b65');ctx.restore();
    }
  }else if(chapter===1){
    // The shadows and swirls read as floating sky islands beneath the battle.
    disc(ctx,3,0,17,6,'#89d4ed19');
    for(let j=0;j<3;j++)disc(ctx,(j-1)*11,Math.sin(t*.7+i)*2+(j%2)*-3,12,5,'#d2eaff22');
    ctx.strokeStyle='#c6eafa2e';ctx.lineWidth=1.3;
    ctx.beginPath();ctx.arc(1,2,12,-Math.PI*.65,Math.PI*.16);ctx.stroke();
  }else if(chapter===2){
    // Machinery plate seams and rivets, never mistaken for collidable obstacles.
    ctx.fillStyle='#162d3845';ctx.fillRect(-18,-10,36,23);
    ctx.strokeStyle='#e0b28b36';ctx.lineWidth=1.7;ctx.strokeRect(-16,-8,32,19);
    for(const xx of [-12,12])for(const yy of [-5,7])disc(ctx,xx,yy,1.7,1.7,'#ffd19e61');
    contour(ctx,[[-7,-9],[-7,13]],'#eac7ab45',1.1);
    ctx.save();ctx.rotate(t*.12+(i%3));
    ctx.strokeStyle='#dcc8b252';ctx.beginPath();ctx.arc(0,0,4,0,TAU);ctx.stroke();ctx.restore();
  }else{
    // Ruined magic wards: gently rotating inlay, not an actionable pickup.
    ctx.save();ctx.rotate(t*.06 + i*.5);
    ctx.strokeStyle='#eabcf150';ctx.lineWidth=1.4;
    ctx.beginPath();ctx.arc(0,0,12,0,TAU);ctx.stroke();
    ctx.beginPath();ctx.arc(0,0,7,0,TAU);ctx.stroke();
    contour(ctx,[[0,-15],[8,0],[0,15],[-8,0],[0,-15]],'#e9b3f946',1.0);
    ctx.restore();
    disc(ctx,0,0,2.2,2.2,'#f9dfff4a');
  }
  ctx.restore();
}
export function drawBattlefield(ctx,b,t){
  const p=palettes[b.chapter];
  const bg=ctx.createLinearGradient(0,0,0,600);
  bg.addColorStop(0,p.sky[0]);bg.addColorStop(.44,p.sky[1]);bg.addColorStop(1,p.sky[2]);
  ctx.fillStyle=bg;ctx.fillRect(0,0,360,600);

  // Long side walls form a continuous march corridor.
  ctx.fillStyle='#0d1c3040';ctx.fillRect(0,0,49,600);ctx.fillRect(311,0,49,600);
  ctx.strokeStyle=p.edge+'6b';ctx.lineWidth=2.5;
  for(const x of [43,317]){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,600);ctx.stroke();}
  ctx.fillStyle='#0b203028';ctx.fillRect(47,0,266,600);
  // Central pathway stays light enough to distinguish red/blue armies.
  const field=ctx.createLinearGradient(0,0,0,600);
  field.addColorStop(0,'#dfeefe0a');field.addColorStop(.51,'#90c6bc0b');field.addColorStop(1,'#c5f1e90b');
  ctx.fillStyle=field;ctx.fillRect(48,0,264,600);

  const tile=44,scroll=mod(b.cameraY,tile);
  ctx.lineWidth=.8;
  for(let row=-2;row<=15;row++){
    const y=row*tile-scroll;
    ctx.strokeStyle=row%2===0?'#ecf6ed12':'#08192330';
    ctx.beginPath();ctx.moveTo(47,y);ctx.lineTo(313,y);ctx.stroke();
    const offset=(Math.floor((b.cameraY+y)/tile)%2)*22;
    for(let x=48-offset;x<320;x+=44){
      ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+44);ctx.stroke();
    }
  }
  ctx.strokeStyle=p.accent+'24';
  for(const x of [74,286]){
    ctx.lineWidth=1.1;ctx.setLineDash([8,13]);ctx.lineDashOffset=-(b.cameraY%21);
    ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,600);ctx.stroke();
  }
  ctx.setLineDash([]);

  // A chapter landmark passes through the viewport every ~140 world pixels.
  for(let i=0;i<27;i++) {
    const y=mod(i*137-b.cameraY*.82,830)-112;
    if(y < -60 || y > 640)continue;
    const x=i%2===0 ? 21+(i%3)*6 : 327+(i%3)*5;
    terrainDecor(ctx,b.chapter,x,y,i,t,p);
    if(i%3===0){
      const cx=117+(i*73)%129,cy=mod(i*151-b.cameraY,820)-80;
      if(cy>0&&cy<600){
        // Small field inlays visible under units but low contrast.
        ctx.save();ctx.globalAlpha=.45;
        terrainDecor(ctx,b.chapter,cx,cy,i+40,t,p);ctx.restore();
      }
    }
  }
  // Environmental motion is independent of the combat rules: air, sparks and arcane dust.
  for(let i=0;i<19;i++){
    const phase=t*(b.chapter===1?9:b.chapter===2?-13:6)+i*65.31;
    const x=mod(i*67.3+Math.sin(t*.47+i)*16,350)+5;
    const y=mod(i*127.7 + b.cameraY*.24 + phase,640)-20;
    const radius=i%4===0?1.7:.85;
    ctx.globalAlpha=.12+Math.sin(t*1.9+i)*.08;
    ctx.fillStyle=p.dust;
    disc(ctx,x,y,radius,radius*(b.chapter===1?.68:1),p.dust);
  }
  ctx.globalAlpha=1;
  // Actual progress marker line approaches as the defensive gate enters view.
  const stageLine=b.gateRed.y-b.cameraY+92;
  if(stageLine>-15&&stageLine<610){
    const lg=ctx.createLinearGradient(50,stageLine,310,stageLine);
    lg.addColorStop(0,'#ffffff00');lg.addColorStop(.5,p.accent+'60');lg.addColorStop(1,'#ffffff00');
    ctx.fillStyle=lg;ctx.fillRect(49,stageLine,262,2);
  }
  // Forward battlefront wash: warm enemy territory / cool safe rear, not heavy colored bars.
  const tint=ctx.createLinearGradient(0,0,0,600);
  tint.addColorStop(0,'#ef887211');tint.addColorStop(.40,'#00000000');
  tint.addColorStop(.74,'#00000000');tint.addColorStop(1,'#81dcf20c');
  ctx.fillStyle=tint;ctx.fillRect(48,0,264,600);
}

export function drawFortress(ctx,gate,side,t,b){
  const ally=side==='blue',hp=Math.max(0,gate.hp/gate.maxHp);
  const x=gate.x,y=gate.y;
  const edge=ally?'#98eaff':'#ffd2a7';
  const armor=ally?'#2f7895':'#925873';
  const core=ally?'#b8ffff':'#ffe39e';
  ctx.save();ctx.translate(x,y);
  disc(ctx,0,22,61,25,'#07162373');
  ctx.shadowBlur=8;ctx.shadowColor=edge;
  ctx.fillStyle=armor;ctx.strokeStyle=edge;ctx.lineWidth=3;
  ctx.beginPath();
  ctx.moveTo(-47,-17);ctx.lineTo(-33,-43);ctx.lineTo(34,-43);ctx.lineTo(48,-17);
  ctx.lineTo(45,26);ctx.lineTo(26,44);ctx.lineTo(-28,44);ctx.lineTo(-45,25);ctx.closePath();
  ctx.fill();ctx.stroke();
  ctx.shadowBlur=0;
  // Battlements, stone corners and the gate itself.
  ctx.fillStyle=ally?'#235271':'#73394f';
  ctx.fillRect(-32,-35,64,15);
  ctx.strokeStyle='#ffffff55';ctx.lineWidth=1;
  ctx.strokeRect(-31,-34,62,14);
  ctx.fillStyle='#152d42';ctx.fillRect(-25,-17,50,36);
  for(const sx of [-1,1]) {
    ctx.fillStyle=edge;
    ctx.fillRect(sx*37-5,-19,10,29);
    disc(ctx,sx*35,-27,5,4,core);
  }
  // A raised rhombus core creates depth and a readable target.
  ctx.save();ctx.rotate(Math.sin(t*.8)*.14);
  ctx.fillStyle=core;ctx.shadowColor=core;ctx.shadowBlur=13;
  ctx.beginPath();ctx.moveTo(0,-16);ctx.lineTo(17,0);ctx.lineTo(0,17);ctx.lineTo(-17,0);ctx.closePath();ctx.fill();
  ctx.shadowBlur=0;ctx.fillStyle=ally?'#389ab7':'#c46f77';
  ctx.beginPath();ctx.moveTo(0,-8);ctx.lineTo(9,0);ctx.lineTo(0,8);ctx.lineTo(-9,0);ctx.closePath();ctx.fill();
  ctx.restore();
  if(hp<.7) {
    contour(ctx,[[-18,19],[-12,28],[-20,39]],'#301a30c7',2.5);
    contour(ctx,[[21,-18],[15,-8],[25,2]],'#301a30c7',2.5);
  }
  if(!ally&&b&&b.stage===2&&b.units.some(u=>u.side==='red'&&
     ['earthlord','thunderbird','fortress','mirrorlord'].includes(u.type))){
    ctx.strokeStyle='#f6cc8bbb';ctx.lineWidth=2;
    ctx.setLineDash([6,5]);ctx.lineDashOffset=-t*15;
    ctx.beginPath();ctx.ellipse(0,0,59,53,0,0,TAU);ctx.stroke();
    ctx.setLineDash([]);
  }
  ctx.restore();
}
