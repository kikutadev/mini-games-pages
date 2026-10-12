import { actionPose } from './motion.mjs';
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
const BOSS=new Set(['earthlord','thunderbird','fortress','mirrorlord','frostqueen','hivequeen','cometlord','eclipseking']);
const heavy=new Set(['guardian','titan','earthlord','fortress','mirrorlord','frostqueen','hivequeen','cometlord','eclipseking']);
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
function eye(ctx,x,y,scale,close=false,look=0){
  if(close) {
    line(ctx,[[x-.13*scale,y],[x+.12*scale,y]],'#1c3e55',.075*scale);return;
  }
  ellipse(ctx,x,y,.145*scale,.19*scale,'#fcfff5');
  const glance=Math.max(-.04,Math.min(.04,look*.045));
  ellipse(ctx,x+(.035+glance)*scale,y+.015*scale,.078*scale,.13*scale,'#16334f');
  dot(ctx,x+(.012+glance)*scale,y-.065*scale,.039*scale,'#ffffff');
}
function face(ctx,u,c,isBoss,pose,t){
  const size=isBoss?1.05:1;
  const em=u.flash>0?.14:0;
  const blink=(t+(u.id??0)*.77)%4.25;
  const blinking=blink<.08 || pose.damage>.62 || (u.windup>.18&&u.type==='raider');
  const glance=pose.aimX*(pose.windup||pose.attacking?.85:.32);
  eye(ctx,-.34,-.04,size,blinking,glance);
  eye(ctx,.34,-.04,size,blinking,glance);
  const expression=pose.damage>.45 ? -.09
    :pose.windup? -.01:pose.release>.25?.20:.36;
  curve(ctx,[-.105,.34],[0,expression+em],[.105,.34],u.side==='blue'?'#19425d':'#77364c',.065);
  ellipse(ctx,-.58,.20,.16,.095,u.side==='blue'?'#9cdbed':'#ec8790');
  ellipse(ctx,.58,.20,.16,.095,u.side==='blue'?'#9cdbed':'#ec8790');
}
function sword(ctx,c,t,pose){
  ctx.save();
  ctx.translate(.76,-.16-pose.charge*.30);
  const swing=-.18-pose.charge*1.42+pose.release*1.77+
    pose.follow*.85+pose.settle*.13;
  ctx.rotate(swing);
  // Segmented arm pivots from shoulder, sword hand stays connected to blade.
  ellipse(ctx,.17,.19,.26,.20,c.dark,c.edge,.065);
  ellipse(ctx,.34,.28,.19,.16,c.base,c.edge,.055);
  line(ctx,[[.37,.35],[.37,-1.18]],'#c7e6f0',.16);
  shape(ctx,[[.23,-1.12],[.37,-1.64],[.53,-1.12]],'#efffff','#8dc5dc',.055);
  line(ctx,[[.07,-.12],[.67,-.12]],c.gear,.16);
  ellipse(ctx,.37,.41,.135,.13,'#9d6a70');
  line(ctx,[[.37,-1.43],[.37,-.38]],'#ffffffbf',.045);
  ctx.restore();
}
function shield(ctx,c,t,pose){
  ctx.save();
  ctx.translate(-.97+pose.release*.28,-.02-pose.charge*.45-pose.release*.30);
  ctx.rotate(-pose.charge*.28+pose.release*.35+pose.follow*.18);
  shape(ctx,[[-.52,-.69],[.51,-.69],[.58,.37],[0,.97],[-.58,.37]],c.dark,c.edge,.1);
  shape(ctx,[[-.34,-.51],[.30,-.51],[.38,.29],[0,.64],[-.37,.29]],c.base,null);
  line(ctx,[[0,-.42],[0,.48]],c.light,.13);
  line(ctx,[[-.24,.08],[.26,.08]],c.gear,.09);
  ctx.restore();
}
function bow(ctx,c,pose,t){
  ctx.save();ctx.translate(.91+pose.release*.30,-.07);
  ctx.rotate(-pose.charge*.13+pose.release*.17);
  const flex=.39*pose.charge;
  curve(ctx,[-.08,-1.12],[.72-flex,0],[-.08,1.0],c.gear,.16);
  line(ctx,[[-.09,-1.12],[-.08-.51*pose.charge,-.08],[-.09,1.0]],'#f1faff',.046);
  if(pose.charge>.12) {
    line(ctx,[[-.6-.4*pose.charge,-.05],[.9,-.08]],'#e9faff',.075);
    shape(ctx,[[.9,-.08],[.65,-.22],[.65,.06]],'#ffffff',null);
  }
  ctx.restore();
}
function staff(ctx,c,t,pose,top='#e1adff') {
  ctx.save();
  ctx.translate(.83,-.1-pose.charge*.38);
  ctx.rotate(-pose.charge*.27+pose.release*.55-pose.follow*.11);
  ellipse(ctx,.03,.19,.25,.19,c.dark,c.edge,.055);
  line(ctx,[[.18,.9],[.20,-1.03]],c.gear,.16);
  ellipse(ctx,.20,-1.2,.32+pose.charge*.13,.37+pose.charge*.13,
    top,'#fff2e0',.08);
  dot(ctx,.09,-1.27,.08,'#ffffff');
  if(pose.charge>.08||pose.release>.08){
    ctx.strokeStyle='#f6d3ff';ctx.lineWidth=.075;ctx.beginPath();
    ctx.arc(.20,-1.2,.43+pose.charge*.25,t*4,t*4+Math.PI*1.65);ctx.stroke();
  }
  ctx.restore();
}
function gear(ctx,u,c,t,pose){
  const type=u.type;
  const p=Math.sin(t*5+u.id*.41)*(.35+pose.walk*.65);
  switch(type){
    case 'sword':
      shape(ctx,[[-.78,-.4],[-1.14,-.26],[-.98,.29],[-.62,.5]],c.gear,c.dark);
      sword(ctx,c,t,pose);
      break;
    case 'archer':
      ctx.save();ctx.translate(pose.release*.19,0);
      shape(ctx,[[-.83,-.54],[-1.2,-.18],[-.96,.42],[-.74,.25]],'#8e9e6e',c.edge,.04);
      bow(ctx,c,pose,t);ctx.restore();
      break;
    case 'guardian':
      shield(ctx,c,t,pose);
      ctx.save();ctx.translate(0,-.30*pose.charge+.28*pose.release);
      ctx.rotate(.24*pose.charge-.48*pose.release);
      line(ctx,[[1.05,-.55],[1.05,.95]],'#8dc4d3',.33);
      shape(ctx,[[.69,-.72],[1.42,-.72],[1.56,-.22],[.7,-.2]],c.gear,c.dark);
      ctx.restore();
      break;
    case 'titan':
      shield(ctx,c,t,pose);
      ctx.save();ctx.translate(0,-.42*pose.charge+.26*pose.release);
      ctx.rotate(.45*pose.charge-.60*pose.release);
      shape(ctx,[[.68,-.54],[1.3,-.55],[1.55,.31],[1.17,.89],[.62,.31]],c.gear,c.edge);
      line(ctx,[[1.1,-.35],[1.1,.49]],'#fff9dd',.08);ctx.restore();
      break;
    case 'raider':
      // A flowing scarf makes its fast motion visibly different from foot soldiers.
      shape(ctx,[[-.55,-.6],[-1.9-p*.27-pose.dash*.65,-.92],
        [-1.45-pose.dash*.38,-.18],[-.6,-.11]],'#ffd088',c.dark,.04);
      line(ctx,[[1.05,.89],[1.20,-1.2]],'#d9e3e9',.12);
      shape(ctx,[[1.20,-1.2],[.95,-.83],[1.45,-.86]],'#fff4b0',c.dark);
      break;
    case 'flier':{
      const wing=Math.sin(t*13+u.id)*(.17+pose.walk*.13)+
        pose.charge*.48-pose.release*.55;
      shape(ctx,[[-.53,-.35],[-1.66,-1.0-wing],[-1.46,.18],[-.65,.63]],c.light,c.dark,.045);
      shape(ctx,[[.53,-.35],[1.66,-1.0-wing],[1.46,.18],[.65,.63]],c.light,c.dark,.045);
      line(ctx,[[0,-.68],[0,-1.25]],c.gear,.095);
      dot(ctx,0,-1.28,.13,c.gear);
      break;
    }
    case 'mage':
      staff(ctx,c,t,pose,'#d7a7ff');
      shape(ctx,[[-.81,-.56],[0,-1.78],[.87,-.54]],'#a577c8','#fae0ff',.065);
      shape(ctx,[[-.25,-1.27],[.25,-1.27],[.13,-.97],[-.13,-.97]],c.gear);
      break;
    case 'healer':
      staff(ctx,c,t,pose,'#b9ffdb');
      shape(ctx,[[-.56,-.93],[.56,-.93],[.66,-.49],[-.66,-.49]],'#fff3d5','#d6d9c7',.07);
      line(ctx,[[0,-.86],[0,-.56]],'#67c5a8',.2);
      line(ctx,[[-.16,-.72],[.16,-.72]],'#67c5a8',.18);
      break;
    case 'cannon':
      ctx.save();ctx.translate(0,pose.release*.49-pose.charge*.20);
      shape(ctx,[[.22,-.83],[.90,-.92],[1.09,-1.72],[.47,-1.73]],'#5c7482','#eff6ed',.08);
      ellipse(ctx,.78,-1.72,.30,.15,'#1c415c','#d0f4ee',.1);ctx.restore();
      shape(ctx,[[-1.16,-.16],[-1.45,.15],[-1.21,.72],[-.64,.65]],c.dark,c.edge,.09);
      break;
    case 'summoner':
      shape(ctx,[[-.9,-.6],[0,-1.66],[.9,-.6]],'#876fc4','#e9d5fc',.06);
      ellipse(ctx,1.02,-.94-pose.charge*.4,.33+pose.charge*.12,
        .39+pose.charge*.12,'#b8a0eb','#ffffff',.08);
      dot(ctx,1.02,-.94-pose.charge*.4,.13,c.gear);
      if(pose.charge>0||pose.release>.15){
        for(let i=0;i<3;i++){
          const a=t*3+i*TAU/3;
          dot(ctx,1.02+Math.cos(a)*(.42+pose.charge*.22),
            -.94+Math.sin(a)*(.46+pose.charge*.22),.10,'#f5e8ff');
        }
      }
      break;
    case 'earthlord':
      for(const dir of [-1,1]){
        shape(ctx,[[dir*.53,-.52],[dir*.95,-1.61],[dir*1.45,-.6],[dir*1.19,-.15]],
          c.gear,'#fff1c8',.045);
      }
      for(const dir of [-1,1]){
        ctx.save();ctx.translate(dir*.75,-.19);
        ctx.rotate(dir*(pose.charge*.72-pose.release*.87));
        shape(ctx,[[dir*-.08,.69],[dir*.54,.28],[dir*.48,-.67],
          [dir*.16,-.48]],c.gear,c.dark,.08);
        ctx.restore();
      }
      break;
    case 'thunderbird':{
      const flap=Math.sin(t*9+u.id)*.22+pose.charge*.5-pose.release*.6;
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
        const recoil=pose.release*(dx===0?.72:.42);
        ctx.save();ctx.translate(0,recoil+pose.charge*-.25);
        shape(ctx,[[dx*.52-.23,-.83],[dx*.52+.23,-.83],[dx*.52+.30,-1.83],
          [dx*.52-.25,-1.83]],'#506b7d','#ffe3b3',.055);
        ellipse(ctx,dx*.52,-1.82,.24,.13,'#1b324a','#f8cd8a',.055);
        ctx.restore();
      }
      shape(ctx,[[-1.17,-.52],[-1.63,-.43],[-1.61,.65],[-.84,.77]],c.gear,c.edge);
      shape(ctx,[[1.17,-.52],[1.63,-.43],[1.61,.65],[.84,.77]],c.gear,c.edge);
      break;
    case 'mirrorlord': {
      const spread=pose.charge*.50+pose.release*.68;
      const floating=Math.sin(t*2.3)*.15;
      shape(ctx,[[-.88,-.76],[0,-1.9-pose.charge*.25],[.9,-.74]],
        '#8266c5','#ffe2ff',.07);
      ellipse(ctx,0,-1.5-pose.charge*.25,.31+.12*pose.charge,
        .4+.12*pose.charge,'#e3b5ff','#ffffff',.065);
      dot(ctx,0,-1.55-pose.charge*.25,.17,'#6e438c');
      for(const dir of [-1,1]){
        const dx=dir*(1.31+spread);
        ctx.save();ctx.translate(dx,-.37+floating-pose.charge*.22);
        ctx.rotate(dir*(pose.charge*.6+pose.release*1.15));
        ellipse(ctx,0,0,.25+.08*pose.release,.35+.16*pose.release,
          '#b18be9','#ffffff',.075);
        ellipse(ctx,0,0,.12,.19,c.gear);
        ctx.strokeStyle='#ffffff90';ctx.lineWidth=.04;
        ctx.beginPath();ctx.arc(0,0,.42,0,TAU*pose.charge);ctx.stroke();
        ctx.restore();
      }
      break;
    }
    case 'frostqueen': {
      const rise=pose.charge*.56-pose.release*.38;
      for(const dir of [-1,1]){
        ctx.save();ctx.translate(dir*.40,-.24-rise);
        ctx.rotate(dir*(pose.charge*.25+pose.release*.47));
        shape(ctx,[[0,-.60],[dir*.34,-1.65],[dir*.63,-.62],
          [dir*1.11,-.92],[dir*.65,.14]],'#b8efff','#f3ffff',.075);
        ctx.restore();
      }
      shape(ctx,[[-.40,-1.04-rise],[0,-2.07-rise*.8],[.4,-1.04-rise]],
        '#edfbff','#9fdbf5',.07);
      ellipse(ctx,0,-1.38-rise,.17+.08*pose.charge,.28+.09*pose.charge,
        '#82b8e5','#ffffff',.08);
      if(pose.release>.14){
        for(let i=0;i<6;i++){
          const ang=i*TAU/6;
          const d=1.15+pose.release*.8;
          shape(ctx,[[Math.cos(ang)*d,Math.sin(ang)*d],
            [Math.cos(ang+.14)*(d+.46),Math.sin(ang+.14)*(d+.46)],
            [Math.cos(ang-.14)*(d+.31),Math.sin(ang-.14)*(d+.31)]],
            '#c9f5ffb8',null);
        }
      }
      break;
    }
    case 'hivequeen': {
      const flap=Math.sin(t*13+u.id*.3)*(.13+.21*pose.charge);
      for(const dir of [-1,1]) {
        ctx.save();ctx.translate(dir*.48,-.34);
        ctx.rotate(dir*(flap+pose.charge*.26-pose.release*.86));
        shape(ctx,[[0,0],[dir*.82,-1.10],[dir*1.40,-.54],
          [dir*.87,.77],[dir*.37,.65]],'#b9dfa0','#fff2bf',.055);
        ctx.restore();
        line(ctx,[[dir*.58,-.83],[dir*(.89+pose.charge*.20),-1.96-pose.charge*.34]],
          '#fff0a1',.13);
        ellipse(ctx,dir*(.92+pose.charge*.20),-1.98-pose.charge*.34,
          .16,.18,'#ffe6a3');
      }
      ctx.save();ctx.translate(0,pose.charge*.17-pose.release*.36);
      shape(ctx,[[-.55,.42],[-.88,1.18],[0,.91],[.86,1.18],[.54,.42]],
        '#7b9e70','#d1f0b3',.07);
      ctx.restore();
      for(let i=0;i<4;i++){
        const a=t*2+i*TAU/4;
        const orbit=(1.26+pose.charge*.2+pose.release*.75);
        dot(ctx,Math.cos(a)*orbit,Math.sin(a)*orbit*.75,
          .09+.08*pose.release,'#f9f1c4');
      }
      break;
    }
    case 'cometlord': {
      for(const dir of [-1,1]){
        ctx.save();ctx.translate(0,-pose.charge*.26);
        ctx.rotate(dir*(pose.charge*.21-pose.release*.43));
        shape(ctx,[[dir*.45,-.81],[dir*1.00,-1.75],[dir*1.36,-1.35],
          [dir*.95,-.30]],'#ffc58b','#fff4ca',.08);
        ctx.restore();
      }
      ellipse(ctx,0,-1.56-pose.charge*.46,
        .42+pose.charge*.35,.45+pose.charge*.35,'#f8b876','#fff0bd',.07);
      ellipse(ctx,0,-1.61-pose.charge*.46,.18+.10*pose.charge,
        .22+.10*pose.charge,'#fff8d8');
      ctx.save();ctx.rotate(t*(.9+pose.charge*3.0));
      for(let i=0;i<4;i++){
        const ang=i*TAU/4;
        const rad=1.64+pose.release*.55-pose.charge*.35;
        ellipse(ctx,Math.cos(ang)*rad,Math.sin(ang)*(rad*.7),
          .22+pose.release*.12,.16+pose.release*.1,'#ffd5a1');
      }
      ctx.restore();
      break;
    }
    case 'eclipseking': {
      const open=pose.charge*.65+pose.release*.88;
      for(const dir of [-1,1]){
        ctx.save();ctx.translate(dir*.69,-.23);
        ctx.rotate(-dir*(open*.74+Math.sin(t*1.5)*.05));
        shape(ctx,[[dir*.05,-.32],[dir*.88,-.97],[dir*1.17,.12],
          [dir*.28,.79]],'#9165b8','#f7d1fc',.075);
        ctx.restore();
      }
      shape(ctx,[[-1.10,-.69],[ -.66,-1.74-open*.25],[0,-1.42],
        [.68,-1.74-open*.25],[1.10,-.69]],'#674885','#f5b8ff',.075);
      const core=.38+pose.charge*.18+pose.release*.33;
      ellipse(ctx,0,-1.39,core,core*1.1,'#201832','#e5b8fa',.09);
      ellipse(ctx,0,-1.39,core*.56,core*.66,'#efcffb','#f9eaff',.07);
      ctx.strokeStyle='#db9fe3c5';ctx.lineWidth=.075;
      ctx.beginPath();ctx.arc(0,-1.39,1.3+open*.65,t*.7,t*.7+Math.PI*1.6);ctx.stroke();
      break;
    }
  }
}
function body(ctx,u,c,t,charge,attack){
  const boss=BOSS.has(u.type);
  const isHeavy=heavy.has(u.type);
  // Rounded material gradients give the tiny bodies real volume instead of
  // looking like flat sticker silhouettes.
  const paint=ctx.createLinearGradient(-.83,-1.04,.73,1.13);
  paint.addColorStop(0,c.light);
  paint.addColorStop(.16,c.base);
  paint.addColorStop(.59,c.base);
  paint.addColorStop(1,c.dark);
  if(isHeavy){
    // Armored shoulders and a tapered chassis, distinct from circular scouts.
    shape(ctx,[[-1.16,-.50],[-.83,-.94],[.84,-.94],[1.16,-.50],
      [1.05,.66],[.6,.99],[-.6,.99],[-1.05,.66]],c.dark,c.edge,.09);
    shape(ctx,[[-.88,-.60],[-.53,-.8],[.53,-.8],[.88,-.60],[.81,.53],
      [0,.8],[-.81,.53]],paint,null);
    shape(ctx,[[-.78,-.62],[-.47,-.79],[.5,-.79],[.7,-.61],[.19,-.42],[-.56,-.42]],
      c.light,null);
    shape(ctx,[[-.18,.57],[.18,.57],[.28,.81],[0,.9],[-.28,.81]],
      boss?c.gear:c.edge,null);
    ellipse(ctx,-1.1,.22,.28,.36,paint,c.edge,.08);
    ellipse(ctx,1.1,.22,.28,.36,paint,c.edge,.08);
    line(ctx,[[-.79,-.44],[-.66,.36]],'#ffffff41',.06);
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
    ctx.fillStyle=paint;ctx.fill();
    const baseAlpha=ctx.globalAlpha;
    ctx.globalAlpha=baseAlpha*.40;
    ellipse(ctx,-.26,-.68,.51,.14,c.light);
    ctx.globalAlpha=baseAlpha;
    // Soft cheek specular accent, confined to the body's curved surface.
    ellipse(ctx,-.57,-.28,.11,.21,'#ffffff20');
  }
  if(u.type==='healer')ellipse(ctx,0,.52,.48,.10,'#fff3d4');
  if(boss){
    ellipse(ctx,0,.73,.36,.14,c.gear);
    line(ctx,[[-.2,.73],[.2,.73]],c.edge,.08);
  }
}

function drawCharacterVector(ctx,u,t,ghost=false) {
  const c=BODY[u.side==='blue'?'blue':'red'];
  const r=u.radius;
  const boss=BOSS.has(u.type);
  const large=heavy.has(u.type) || boss;
  const airborne=flyers.has(u.type);
  const pose=actionPose(u,t);
  const charge=pose.charge,hurt=pose.damage;
  const hover=airborne?6+Math.sin(t*(u.type==='thunderbird'?5:11)+u.id)*3.4:0;
  const bob=pose.yOffset-hover;
  // A raider crosses the actual lunge distance over ~160ms instead of
  // teleporting between frames; combat coordinates and collision remain exact.
  const dashT=Math.pow(pose.dash,3);
  const renderX=u.type==='raider'
    ?u.x-((u.x-(u.dashFromX??u.x))*dashT):u.x;
  const renderY=u.type==='raider'
    ?u.y-((u.y-(u.dashFromY??u.y))*dashT):u.y;
  ctx.save();ctx.translate(renderX,renderY);
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
    ctx.globalAlpha=.14+charge*.53;
    ctx.strokeStyle=c.gear;ctx.lineWidth=1.1+charge*2;
    ctx.setLineDash([4,9]);
    ctx.beginPath();ctx.ellipse(0,-hover*.4,r*(1.25+charge*.5),r*(.63+charge*.30),t*.36,0,TAU);ctx.stroke();
    ctx.setLineDash([]);ctx.globalAlpha=1;
  }
  // Copied troops fall into place, strike the ground and recover instead of
  // materializing as a full-sized static circle on the very first frame.
  const entry=Math.max(0,((u.spawnGlow??0)-.65)/.25);
  const settle=Math.max(0,1-Math.abs((u.spawnGlow??0)-.57)/.24);
  ctx.translate(0,bob-16*entry+settle*3.8);
  ctx.scale(r,r);
  ctx.scale(1-entry*.22+settle*.08,1+entry*.16-settle*.13);
  // Tiny alternating foot paddles establish forward movement, even when the body is small.
  if (!airborne && !ghost) {
    // Animated rear limbs: every stride plants a distinct foot and pushes the torso.
    for(const d of [-1,1]){
      const stride=(d<0?pose.stepLeft:pose.stepRight)*.29;
      const lift=Math.max(0,-stride)*.36;
      ellipse(ctx,d*.48+stride*.45,.88-lift,.31,.16,
        c.dark,c.edge,.055);
      ellipse(ctx,d*.48+stride*.45-.06,.87-lift,.15,.065,c.base);
    }
  }
  const squash=pose.compress+pose.walk*Math.abs(pose.stride)*.032+
    (u.spawnGlow>0?Math.sin(Math.min(1,u.spawnGlow)*Math.PI)*.07:0);
  ctx.scale(1+squash*.5,1-squash);
  ctx.rotate(pose.lean);
  if(hurt>0)ctx.translate(-pose.aimX*hurt*.12,Math.sin(t*31+u.id)*hurt*.035);
  if(ghost)ctx.globalAlpha=.74;
  if(u.flash>0){
    ctx.shadowColor='#fff0d6';ctx.shadowBlur=9;
  } else if(boss) {
    ctx.shadowColor=c.gear;ctx.shadowBlur=6;
  }
  body(ctx,u,c,t,charge,pose.release);
  ctx.shadowBlur=0;
  gear(ctx,u,c,t,pose);
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
    } else if(u.type==='frostqueen'){
      for(let k=0;k<6;k++){
        const angle=k*TAU/6+t*.12;
        ellipse(ctx,Math.cos(angle)*1.72,Math.sin(angle)*.95,.13,.23,'#d8f9ff');
      }
    } else if(u.type==='hivequeen'){
      for(let k=0;k<5;k++){
        const angle=k*TAU/5+t*.8;
        ellipse(ctx,Math.cos(angle)*1.72,Math.sin(angle)*1.12,.12,.18,'#e5f6b2');
      }
    } else if(u.type==='cometlord'){
      for(let k=0;k<4;k++){
        const angle=k*TAU/4+t*.4;
        ellipse(ctx,Math.cos(angle)*1.6,Math.sin(angle)*1.2,.13,.16,'#ffeac3');
      }
    } else if(u.type==='eclipseking'){
      ellipse(ctx,0,0,1.75,.83,'#2614353a','#efc9ff',.06);
    } else if(u.type==='mirrorlord'){
      for(let k=0;k<4;k++){
        const angle=k*TAU/4-t*.8;
        ellipse(ctx,Math.cos(angle)*1.63,Math.sin(angle)*1.2,
          .17,.23,'#e9cbff');
      }
    }
    ctx.globalAlpha=1;
  }
  face(ctx,u,c,boss,pose,t);
  if(hurt>0){
    ctx.fillStyle=u.side==='blue'?'#f8fcff':'#fff1d7';
    ctx.globalAlpha=hurt*.32;ellipse(ctx,0,0,1.01,1.01,ctx.fillStyle);ctx.globalAlpha=1;
  }
  if((u.freezeTimer??0)>0){
    ctx.strokeStyle='#adf3ff';ctx.globalAlpha=.65;
    ctx.lineWidth=.075;ctx.beginPath();
    ctx.arc(0,0,1.06,t*1.3,t*1.3+Math.PI*1.6);ctx.stroke();
    ctx.globalAlpha=1;
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
  // Large units carry their health bar above the headdress, never across eyes
  // or weapon parts. Boss identity is shown by the HUD and unique silhouette.
  if(u.hp<u.maxHp||boss){
    const width=r*2.0, y=u.y-bob-r*(boss?2.72:1.57);
    ctx.fillStyle='#101f31d9';ctx.fillRect(u.x-width/2,y,width,3.5);
    ctx.fillStyle=u.side==='blue'?'#9aeafc':'#ffab91';
    ctx.fillRect(u.x-width/2,y,Math.max(0,width*u.hp/u.maxHp),3.5);
  }

}

// Distant troops still animate at 12 unique poses instead of re-tracing every
// expensive vector curve. A separate planted idle is important: the old version
// always cycled through walking poses even when no actual movement occurred.
const troopSprites=new Map();
const POSES=12;
function cachedSprite(u,phase,idle=false) {
  const key=u.type+':'+u.side+':'+u.radius+':'+(idle?'idle':'walk')+':'+phase;
  let sprite=troopSprites.get(key);
  if(sprite)return sprite;
  const size=Math.ceil(u.radius*6+28);
  const canvas=document.createElement('canvas');
  canvas.width=size;canvas.height=size;
  const c=canvas.getContext('2d');
  const t=idle?phase*.6:phase/POSES*TAU/2;
  drawCharacterVector(c,{...u,x:size/2,y:size/2,id:1,
    step:idle?0:phase/POSES*TAU/2.25,
    walkBlend:idle?0:1,spawnGlow:0,flash:0,hurtPulse:0,
    dashPulse:0,attackPulse:0,windup:0,hp:u.maxHp},t,false);
  sprite={canvas,half:size/2};
  troopSprites.set(key,sprite);
  return sprite;
}
export function drawCharacter(ctx,u,t,ghost=false) {
  if(!ghost&&!BOSS.has(u.type)&&u.spawnGlow<=0&&u.flash<=0&&
      (u.hurtPulse??0)<=0&&(u.dashPulse??0)<=0&&
      (u.attackPulse??0)<=0&&u.windup<=0&&
      u.hp>=u.maxHp && u.side) {
    const idle=(u.walkBlend??0)<.12;
    const phase=idle
      ?Math.floor(t*1.6+(u.id??0)*.31)%3
      :((Math.floor((u.step??0)*2.25/TAU*POSES)%POSES)+POSES)%POSES;
    const sprite=cachedSprite(u,phase,idle);
    ctx.drawImage(sprite.canvas,u.x-sprite.half,u.y-sprite.half);
    return;
  }
  drawCharacterVector(ctx,u,t,ghost);
}