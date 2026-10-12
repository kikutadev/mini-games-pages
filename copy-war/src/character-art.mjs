/**
 * COPY WAR character painter. Rendered at natural mobile size without bitmap assets.
 * Every class has its own silhouette, moving equipment and a consistent friendly face.
 * Coordinates are normalized to the unit radius for legibility at 1x scale.
 */
const TAU=Math.PI*2;
const BODY={
  blue:{base:'#379fc4',light:'#b0f2ff',dark:'#206580',edge:'#c3f8ff',gear:'#ffdc87'},
  red:{base:'#cb657b',light:'#ffd8ae',dark:'#793e65',edge:'#ffd3b5',gear:'#ffe4a0'},
};
const bossGold='#ffe5a5';
const BOSS=new Set(['earthlord','thunderbird','fortress','mirrorlord']);
const heavy=new Set(['guardian','titan','earthlord','fortress','mirrorlord']);
const flyers=new Set(['flier','thunderbird']);

function shape(ctx, points, fill, stroke, width=.07) {
  ctx.beginPath();ctx.moveTo(...points[0]);
  for(let i=1;i<points.length;i++)ctx.lineTo(...points[i]);
  ctx.closePath();ctx.fillStyle=fill;ctx.fill();
  if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.stroke();}
}
function line(ctx,pts,color,width=.08){
  ctx.beginPath();ctx.moveTo(...pts[0]);
  for(let i=1;i<pts.length;i++)ctx.lineTo(...pts[i]);
  ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();
}
function ellipse(ctx,x,y,rx,ry,color,edge=null,lw=.06){
  ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,TAU);
  ctx.fillStyle=color;ctx.fill();
  if(edge){ctx.lineWidth=lw;ctx.strokeStyle=edge;ctx.stroke();}
}
function dot(ctx,x,y,r,color) {
  ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fillStyle=color;ctx.fill();
}
function curve(ctx,p1,cp,p2,color,width=.08){
  ctx.beginPath();ctx.moveTo(...p1);ctx.quadraticCurveTo(...cp,...p2);
  ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.stroke();
}
function eye(ctx,x,y,scale,close=false){
  if(close) {
    line(ctx,[[x-.13*scale,y],[x+.12*scale,y]],'#1c3e55',.075*scale);return;
  }
  ellipse(ctx,x,y,.145*scale,.19*scale,'#fcfff5');
  ellipse(ctx,x+.035*scale,y+.015*scale,.078*scale,.13*scale,'#16334f');
  dot(ctx,x+.012*scale,y-.065*scale,.039*scale,'#ffffff');
}
function face(ctx,u,c,isBoss){
  const size=isBoss?1.05:1;
  const em=u.flash>0?.14:0;
  eye(ctx,-.34,-.04, size,u.windup>.18&&u.type==='raider');
  eye(ctx,.34,-.04, size,u.windup>.18&&u.type==='raider');
  curve(ctx,[-.105,.34],[0,.41+em],[.105,.34],u.side==='blue'?'#19425d':'#77364c',.055);
  ellipse(ctx,-.58,.20,.16,.095,u.side==='blue'?'#9cdbed':'#ec8790');
  ellipse(ctx,.58,.20,.16,.095,u.side==='blue'?'#9cdbed':'#ec8790');
}
function sword(ctx,c,t,charge,attack){
  ctx.save();ctx.translate(.96,.2);ctx.rotate(-.25-charge*.9+attack*1.7);
  line(ctx,[[0,.36],[0,-1.15]],'#effaff',.17);
  shape(ctx,[[-.12,-1.0],[0,-1.48],[.12,-1.0]],'#ecfbff','#8fb6cd',.035);
  line(ctx,[[-.3,-.05],[.28,-.05]],c.gear,.18);
  ellipse(ctx,0,.42,.12,.14,'#7c6272');
  ctx.restore();
}
function shield(ctx,c,t,charge,attack=0){
  ctx.save();ctx.translate(-.97,.18-attack*.23);
  ctx.rotate(Math.sin(t*3)*.08+charge*.21+attack*.15);
  shape(ctx,[[-.52,-.69],[.51,-.69],[.58,.37],[0,.97],[-.58,.37]],c.dark,c.edge,.1);
  shape(ctx,[[-.34,-.51],[.30,-.51],[.38,.29],[0,.64],[-.37,.29]],c.base,null);
  line(ctx,[[0,-.42],[0,.48]],c.light,.13);
  line(ctx,[[-.24,.08],[.26,.08]],c.gear,.09);
  ctx.restore();
}
function bow(ctx,c,charge,t){
  ctx.save();ctx.translate(.95,-.07);
  const flex=.20*charge;
  curve(ctx,[-.08,-1.12],[.72+flex,0],[-.08,1.0],c.gear,.16);
  line(ctx,[[-.09,-1.12],[-.09-.32*charge,-.08],[-.09,1.0]],'#f1faff',.035);
  if(charge>.12) {
    line(ctx,[[-.6,-.05],[.9,-.08]],'#e9faff',.07);
    shape(ctx,[[.9,-.08],[.65,-.22],[.65,.06]],'#ffffff',null);
  }
  ctx.restore();
}
function staff(ctx,c,t,charge,top='#e1adff') {
  line(ctx,[[.96,.88],[.98,-1.02]],c.gear,.16);
  ellipse(ctx,.98,-1.2,.34,.38,top,'#fff2e0',.08);
  dot(ctx,.85,-1.29,.08,'#ffffff');
  if(charge>.1){
    ctx.strokeStyle='#f6d3ff';ctx.lineWidth=.07;ctx.beginPath();
    ctx.arc(.97,-1.2,.47+charge*.26,t*4,t*4+Math.PI*1.55);ctx.stroke();
  }
}
function gear(ctx,u,c,t,charge,attack){
  const type=u.type;
  const p=Math.sin(t*5+u.id*.41);
  switch(type){
    case 'sword':
      shape(ctx,[[-.78,-.4],[-1.14,-.26],[-.98,.29],[-.62,.5]],c.gear,c.dark);
      sword(ctx,c,t,charge,attack);
      break;
    case 'archer':
      ctx.save();ctx.translate(attack*.14,0);
      shape(ctx,[[-.83,-.54],[-1.2,-.18],[-.96,.42],[-.74,.25]],'#8e9e6e',c.edge,.04);
      bow(ctx,c,charge,t);ctx.restore();
      break;
    case 'guardian':
      shield(ctx,c,t,charge,attack);
      line(ctx,[[1.05,-.55],[1.05,.95]],'#8dc4d3',.33);
      shape(ctx,[[.69,-.72],[1.42,-.72],[1.56,-.22],[.7,-.2]],c.gear,c.dark);
      break;
    case 'titan':
      shield(ctx,c,t,charge,attack);
      shape(ctx,[[.68,-.54],[1.3,-.55],[1.55,.31],[1.17,.89],[.62,.31]],c.gear,c.edge);
      line(ctx,[[1.1,-.35],[1.1,.49]],'#fff9dd',.08);
      break;
    case 'raider':
      // A flowing scarf makes its fast motion visibly different from foot soldiers.
      shape(ctx,[[-.55,-.6],[-1.9-p*.27,-.92],[-1.45,-.18],[-.6,-.11]],'#ffd088',c.dark,.04);
      line(ctx,[[1.05,.89],[1.20,-1.2]],'#d9e3e9',.12);
      shape(ctx,[[1.20,-1.2],[.95,-.83],[1.45,-.86]],'#fff4b0',c.dark);
      break;
    case 'flier':{
      const wing=Math.sin(t*13+u.id)*.27;
      shape(ctx,[[-.53,-.35],[-1.66,-1.0-wing],[-1.46,.18],[-.65,.63]],c.light,c.dark,.045);
      shape(ctx,[[.53,-.35],[1.66,-1.0-wing],[1.46,.18],[.65,.63]],c.light,c.dark,.045);
      line(ctx,[[0,-.68],[0,-1.25]],c.gear,.095);
      dot(ctx,0,-1.28,.13,c.gear);
      break;
    }
    case 'mage':
      staff(ctx,c,t,charge,'#d7a7ff');
      shape(ctx,[[-.81,-.56],[0,-1.78],[.87,-.54]],'#a577c8','#fae0ff',.065);
      shape(ctx,[[-.25,-1.27],[.25,-1.27],[.13,-.97],[-.13,-.97]],c.gear);
      break;
    case 'healer':
      staff(ctx,c,t,charge,'#b9ffdb');
      shape(ctx,[[-.56,-.93],[.56,-.93],[.66,-.49],[-.66,-.49]],'#fff3d5','#d6d9c7',.07);
      line(ctx,[[0,-.86],[0,-.56]],'#67c5a8',.2);
      line(ctx,[[-.16,-.72],[.16,-.72]],'#67c5a8',.18);
      break;
    case 'cannon':
      ctx.save();ctx.translate(0,attack*.25);
      shape(ctx,[[.22,-.83],[.90,-.92],[1.09,-1.72],[.47,-1.73]],'#5c7482','#eff6ed',.08);
      ellipse(ctx,.78,-1.72,.30,.15,'#1c415c','#d0f4ee',.1);ctx.restore();
      shape(ctx,[[-1.16,-.16],[-1.45,.15],[-1.21,.72],[-.64,.65]],c.dark,c.edge,.09);
      break;
    case 'summoner':
      shape(ctx,[[-.9,-.6],[0,-1.66],[.9,-.6]],'#876fc4','#e9d5fc',.06);
      ellipse(ctx,1.02,-.94,.33,.39,'#b8a0eb','#ffffff',.08);
      dot(ctx,1.02,-.94,.13,c.gear);
      break;
    case 'earthlord':
      for(const dir of [-1,1]){
        shape(ctx,[[dir*.53,-.52],[dir*.95,-1.61],[dir*1.45,-.6],[dir*1.19,-.15]],
          c.gear,'#fff1c8',.045);
      }
      shape(ctx,[[-1.2,.5],[-1.5,-.06],[-1.06,-.77],[-.83,-.25]],c.gear,c.dark);
      shape(ctx,[[1.2,.5],[1.5,-.06],[1.06,-.77],[.83,-.25]],c.gear,c.dark);
      break;
    case 'thunderbird':{
      const flap=Math.sin(t*9+u.id)*.22;
      for(const dir of [-1,1]){
        shape(ctx,[[dir*.55,-.28],[dir*2.05,-1.35-flap],[dir*1.80,-.24],
          [dir*1.31,.36],[dir*.66,.48]],'#c6a3ff','#fff0db',.055);
        line(ctx,[[dir*.80,-.15],[dir*1.6,-.73-flap]],'#6f62b8',.1);
      }
      shape(ctx,[[-.35,-.81],[0,-1.5],[.39,-.81]],c.gear,c.edge,.07);
      break;
    }
    case 'fortress':
      for(const dx of [-1,0,1]){
        shape(ctx,[[dx*.52-.23,-.83],[dx*.52+.23,-.83],[dx*.52+.30,-1.83],
          [dx*.52-.25,-1.83]],'#506b7d','#ffe3b3',.055);
        ellipse(ctx,dx*.52,-1.82,.24,.13,'#1b324a','#f8cd8a',.055);
      }
      shape(ctx,[[-1.17,-.52],[-1.63,-.43],[-1.61,.65],[-.84,.77]],c.gear,c.edge);
      shape(ctx,[[1.17,-.52],[1.63,-.43],[1.61,.65],[.84,.77]],c.gear,c.edge);
      break;
    case 'mirrorlord':
      shape(ctx,[[-.88,-.76],[0,-1.9],[.9,-.74]],'#8266c5','#ffe2ff',.07);
      ellipse(ctx,0,-1.5,.31,.4,'#e3b5ff','#ffffff',.065);
      dot(ctx,0,-1.55,.17,'#6e438c');
      for(const dir of [-1,1]){
        ellipse(ctx,dir*1.33,-.37,.27,.33,'#b18be9','#ffffff',.05);
        ellipse(ctx,dir*1.33,-.37,.12,.19,c.gear);
      }
      break;
  }
}
function body(ctx,u,c,t,charge,attack){
  const boss=BOSS.has(u.type);
  const isHeavy=heavy.has(u.type);
  if(isHeavy){
    // Armored shoulders and a tapered chassis, distinct from circular scouts.
    shape(ctx,[[-1.16,-.50],[-.83,-.94],[.84,-.94],[1.16,-.50],
      [1.05,.66],[.6,.99],[-.6,.99],[-1.05,.66]],c.dark,c.edge,.09);
    shape(ctx,[[-.88,-.60],[-.53,-.8],[.53,-.8],[.88,-.60],[.81,.53],
      [0,.8],[-.81,.53]],c.base,null);
    shape(ctx,[[-.78,-.62],[-.47,-.79],[.5,-.79],[.7,-.61],[.19,-.42],[-.56,-.42]],
      c.light,null);
    shape(ctx,[[-.18,.57],[.18,.57],[.28,.81],[0,.9],[-.28,.81]],
      boss?c.gear:c.edge,null);
    ellipse(ctx,-1.1,.22,.28,.36,c.base,c.edge,.08);
    ellipse(ctx,1.1,.22,.28,.36,c.base,c.edge,.08);
  } else {
    ctx.beginPath();
    ctx.moveTo(-.92,-.34);
    ctx.bezierCurveTo(-1.04,-1.15,1.02,-1.18,.98,-.3);
    ctx.bezierCurveTo(1.05,.53,.67,.93,0,.96);
    ctx.bezierCurveTo(-.69,.93,-1.13,.48,-.92,-.34);
    ctx.fillStyle=c.dark;ctx.fill();ctx.strokeStyle=c.edge;ctx.lineWidth=.09;ctx.stroke();
    ctx.beginPath();ctx.moveTo(-.73,-.49);
    ctx.bezierCurveTo(-.73,-.99,.55,-1.06,.76,-.40);
    ctx.bezierCurveTo(.94,.32,.58,.78,0,.82);
    ctx.bezierCurveTo(-.67,.8,-.84,.35,-.73,-.49);
    ctx.fillStyle=c.base;ctx.fill();
    ellipse(ctx,-.22,-.60,.53,.17,c.light);
  }
  if(u.type==='healer')ellipse(ctx,0,.52,.48,.10,'#fff3d4');
  if(boss){
    ellipse(ctx,0,.73,.36,.14,c.gear);
    line(ctx,[[-.2,.73],[.2,.73]],c.edge,.08);
  }
}

export function drawCharacter(ctx,u,t,ghost=false) {
  const c=BODY[u.side==='blue'?'blue':'red'];
  const r=u.radius;
  const boss=BOSS.has(u.type);
  const large=heavy.has(u.type) || boss;
  const airborne=flyers.has(u.type);
  const rawCharge=u.windup>0?1-Math.min(1,u.windup / ({earthlord:1.05,thunderbird:.7,fortress:.95,mirrorlord:1.05}[u.type]??(.5+(boss?.5:0)))):0;
  const charge=Math.max(0,rawCharge);
  const attack=(u.attackPulse??0)/.36;
  const hurt=Math.min(1,(u.hurtPulse??0)/.25);
  const breathing=Math.sin(t*3.8+u.id*.79);
  const stepping=Math.sin(u.step*2.25);
  const hover=airborne?7+Math.sin(t*8+u.id)*4:0;
  const bob=(u.windup>0?-2.5-charge*2:stepping*(large?1:1.65))-hover;
  ctx.save();ctx.translate(u.x,u.y);
  // Ground contact and moving feet show size, altitude and body weight.
  const shadowScale=airborne?.86:1;
  ellipse(ctx,0,r*.72,r*1.02*shadowScale,r*.39*shadowScale,'#04122083');
  if(airborne) {
    ellipse(ctx,0,r*.68,r*.39,r*.11,'#b7d8fa22');
  }
  if (u.spawnGlow>0||ghost) {
    const a=ghost?.5:Math.min(.8,u.spawnGlow*.74);
    ctx.globalAlpha=a;
    ctx.strokeStyle= c.edge;ctx.lineWidth=2.4;
    ctx.beginPath();ctx.ellipse(0,-hover*.4,r+9+Math.sin(t*12)*3,(r+10)*.56,0,0,TAU);ctx.stroke();
    ctx.globalAlpha=1;
  }
  // Readable cast ring when charging a special attack.
  if(u.windup>0){
    ctx.globalAlpha=.25+charge*.56;
    ctx.strokeStyle=c.gear;ctx.lineWidth=1.8+charge*2;
    ctx.setLineDash([5,6]);
    ctx.beginPath();ctx.ellipse(0,-hover*.4,r*(1.25+charge*.5),r*(.63+charge*.30),t*.36,0,TAU);ctx.stroke();
    ctx.setLineDash([]);ctx.globalAlpha=1;
  }
  ctx.translate(0,bob);
  ctx.scale(r,r);
  // Tiny alternating foot paddles establish forward movement, even when the body is small.
  if (!airborne && u.windup<=0 && !ghost) {
    for(const d of [-1,1]){
      const stride=Math.sin(u.step*2.25+d*Math.PI*.5)*.16;
      ellipse(ctx,d*.51,.84+stride,.30,.17,c.dark,c.edge,.055);
    }
  }
  const squash=stepping*.055+(u.spawnGlow>0 ? u.spawnGlow*.10:0);
  ctx.scale(1-squash*.43,1+squash*.68);
  if(attack>0)ctx.rotate(Math.sin((1-attack)*Math.PI)*.12*(u.side==='blue'?1:-1));
  if(hurt>0)ctx.translate(Math.sin(t*29+u.id)*hurt*.12,0);
  if(ghost)ctx.globalAlpha=.74;
  if(u.flash>0){
    ctx.shadowColor='#fff0d6';ctx.shadowBlur=9;
  } else if(boss) {
    ctx.shadowColor=c.gear;ctx.shadowBlur=6;
  }
  body(ctx,u,c,t,charge,attack);
  ctx.shadowBlur=0;
  gear(ctx,u,c,t,charge,attack);
  if(boss && u.windup>0) {
    // Telegraph each boss's signature move with a different readable shape.
    ctx.strokeStyle=u.side==='blue'?'#cbffff':'#ffe3a9';
    ctx.lineWidth=.07+.09*charge;ctx.globalAlpha=.54+charge*.4;
    if(u.type==='earthlord') {
      for(let k=0;k<5;k++) {
        const angle=k*TAU/5+t*.3;
        line(ctx,[[Math.cos(angle)*1.18,Math.sin(angle)*1.18],
          [Math.cos(angle)*1.65,Math.sin(angle)*1.65]],c.gear,.1+.08*charge);
      }
    } else if(u.type==='thunderbird') {
      for(const dir of [-1,1]){
        line(ctx,[[dir*.8,-.5],[dir*1.3,-.93],[dir*1.1,-.31],
          [dir*1.62,-.67]],'#f2f8ff',.11);
      }
    } else if(u.type==='fortress'){
      for(const x of [-.53,0,.53]) {
        ellipse(ctx,x,-1.9,.12,.12,'#fff4b7');
      }
    } else if(u.type==='mirrorlord'){
      for(let k=0;k<4;k++){
        const angle=k*TAU/4-t*.8;
        ellipse(ctx,Math.cos(angle)*1.63,Math.sin(angle)*1.2,
          .17,.23,'#e9cbff');
      }
    }
    ctx.globalAlpha=1;
  }
  face(ctx,u,c,boss);
  if(hurt>0){
    ctx.fillStyle=u.side==='blue'?'#f8fcff':'#fff1d7';
    ctx.globalAlpha=hurt*.43;ellipse(ctx,0,0,1.0,1.0,ctx.fillStyle);ctx.globalAlpha=1;
  }
  if(boss){
    ctx.strokeStyle=c.gear;ctx.lineWidth=.065;
    ctx.beginPath();ctx.arc(0,0,1.26,t*.55,t*.55+Math.PI*1.62);ctx.stroke();
    for(let i=0;i<3;i++){
      const a=t*1.5+i*TAU/3;
      dot(ctx,Math.cos(a)*1.28,Math.sin(a)*1.28,.08,c.gear);
    }
  }
  ctx.restore();
  // Avoid a solid forest of bars over a 30-unit copied army.
  if(u.hp<u.maxHp||boss){
    const width=r*2.0, y=u.y-bob-r*(boss?2.08:1.57);
    ctx.fillStyle='#101f31d9';ctx.fillRect(u.x-width/2,y,width,3.5);
    ctx.fillStyle=u.side==='blue'?'#9aeafc':'#ffab91';
    ctx.fillRect(u.x-width/2,y,Math.max(0,width*u.hp/u.maxHp),3.5);
  }
  if(boss){
    ctx.fillStyle=u.side==='blue'?'#c3faff':bossGold;
    ctx.font='900 9px -apple-system, sans-serif';
    ctx.textAlign='center';ctx.fillText(u.side==='blue'?'★':'BOSS',u.x,u.y-bob-r*2.42);
  }
}