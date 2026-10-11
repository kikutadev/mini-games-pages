"use strict";
// Scene state and deterministic map generation.
const canvas=document.getElementById("game"),ctx=canvas.getContext("2d"),lightCanvas=document.getElementById("glow"),lx=lightCanvas.getContext("2d"),vp=document.getElementById("viewport");
const W=21,H=21,TW=66,TH=32,TAU=Math.PI*2;
let sw=720,sh=405,clock=0,last=0,shake=0,flash=0,toastUntil=0,won=false,muted=false,audio=null;
let camera={x:0,y:0},keys=new Set(),pointerVector={x:0,y:0},pointerActive=false,attackDown=false,particles=[];
const hero={x:4.5,y:14.5,hp:5,maxHp:5,face:1,attack:0,attackCooldown:0,invulnerable:0,step:0};
const lamps=[{x:7.4,y:12.0,on:false},{x:10.4,y:9.4,on:false},{x:14.0,y:6.0,on:false}];
const portal={x:16,y:3.7},enemies=[{x:8.3,y:12,hp:3},{x:10.3,y:11.1,hp:3},{x:13.1,y:8,hp:3},{x:15,y:5.3,hp:3}];
let props=[],seeds=[];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const rand=(x,y,s=0)=>{const v=Math.sin(x*127.1+y*311.7+s*74.7)*43758.5453;return v-Math.floor(v);};
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const $=(id)=>document.getElementById(id);
// Resize visual buffers, using a low-resolution framebuffer for authentic crisp pixels.
function resize(){const r=vp.getBoundingClientRect();sw=r.width/r.height>1.25?720:300;sh=Math.round(sw*r.height/r.width);for(const c of [canvas,lightCanvas]){c.width=sw;c.height=sh;}ctx.imageSmoothingEnabled=false;lx.imageSmoothingEnabled=true;}
function projection(x,y,z=0){return {x:(x-y)*TW/2+camera.x,y:(x+y)*TH/2-z+camera.y};}
function polygon(points,color,stroke){ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);for(let i=1;i<points.length;i++)ctx.lineTo(points[i].x,points[i].y);ctx.closePath();ctx.fillStyle=color;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=.7;ctx.stroke();}}
function rect(x,y,w,h,color){ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));}
function oval(x,y,rx,ry,color){ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,TAU);ctx.fill();}
function diamond(x,y,color,stroke){const p=[projection(x,y),projection(x+1,y),projection(x+1,y+1),projection(x,y+1)];polygon(p,color,stroke);}
function glow(x,y,r,color,alpha=1){const g=lx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,"transparent");lx.globalAlpha=alpha;lx.fillStyle=g;lx.beginPath();lx.arc(x,y,r,0,TAU);lx.fill();lx.globalAlpha=1;}
function onPath(x,y){const d=Math.abs(x+y-19);return d<1.65 && x>3 && x<18;}
function makeProps(){props=[];for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++){let r=rand(x,y);const near=onPath(x+.5,y+.5),gate=distance({x,y},portal)<3;if(near||gate||distance({x,y},hero)<3)continue;if(r<.24)props.push({x:x+.3,y:y+.4,type:"pine",size:.75+rand(y,x)*.6});else if(r<.42)props.push({x:x+.3,y:y+.3,type:"shrub",size:.8});else if(r<.46)props.push({x:x+.4,y:y+.4,type:"stone",size:.7});}for(const p of [{x:6,y:13.5},{x:9,y:10.5},{x:12,y:7.5},{x:16,y:4.8}])props.push({...p,type:"column",size:1});}
function updateHUD(){const lit=lamps.filter(l=>l.on).length;$("progress").innerHTML="灯火 <b>"+lit+" / 3</b>";$("hearts").textContent=Array.from({length:5},(_,i)=>i<hero.hp?"♥":"♡").join(" ");}
function message(title,detail,duration=3.4){$("toastTitle").textContent=title;$("toastSub").textContent=detail;$("toast").style.opacity=1;toastUntil=clock+duration;}
function reset(){hero.x=4.5;hero.y=14.5;hero.hp=5;hero.attack=0;hero.invulnerable=0;hero.attackCooldown=0;hero.step=0;lamps.forEach(l=>l.on=false);enemies.forEach(e=>{e.hp=3;e.dead=false;e.lastHit=0;e.time=0;});particles=[];won=false;$("overlay").hidden=true;updateHUD();message("消えた灯火を探す","光を集め、森の奥の門へ",5);}

// Rendering and input follow.
// Brief sound confirms an action.
function sound(f=480,len=.09){if(muted)return;try{audio??=new(window.AudioContext||window.webkitAudioContext)();const o=audio.createOscillator(),g=audio.createGain();o.type="triangle";o.frequency.value=f;g.gain.value=.06;o.connect(g).connect(audio.destination);o.start();o.stop(audio.currentTime+len);}catch{}}
function burst(x,y,color){for(let i=0;i<12;i++)particles.push({x,y,dx:(Math.random()-.5)*80,dy:-30-Math.random()*60,life:.6,color});}
// A short arc strikes the nearest shadow within range.
function attack(){if(won||hero.attackCooldown>0)return;hero.attack=.25;hero.attackCooldown=.42;shake=2;sound(590,.12);let target=null,best=1.9;for(const e of enemies){if(e.dead)continue;const d=distance(e,hero);if(d<best){target=e;best=d;}}if(!target)return;target.hp--;target.lastHit=clock;shake=5;const p=projection(target.x,target.y,18);burst(p.x,p.y,"#ffd7a0");sound(170,.16);if(target.hp<=0){target.dead=true;burst(p.x,p.y,"#9bdfff");}}
// Move toward an input direction each frame.
function update(dt){if(won||!$("helpPanel").hidden)return;clock+=dt;let dx=Number(keys.has("d"))-Number(keys.has("a"));let dy=Number(keys.has("s"))-Number(keys.has("w"));dx+=pointerVector.x+Number(keys.has("arrowright"))-Number(keys.has("arrowleft"));dy+=pointerVector.y+Number(keys.has("arrowdown"))-Number(keys.has("arrowup"));
const m=Math.hypot(dx,dy);if(m>.05){dx/=m;dy/=m;hero.x=clamp(hero.x+(dx+dy)*2.3*dt,1,19);hero.y=clamp(hero.y+(dy-dx)*2.3*dt,1,19);hero.face=dx>=0?1:-1;hero.step+=dt*10;}
hero.attack=Math.max(0,hero.attack-dt);hero.attackCooldown=Math.max(0,hero.attackCooldown-dt);hero.invulnerable=Math.max(0,hero.invulnerable-dt);shake*=Math.pow(.06,dt);if(attackDown)attack();
for(const l of lamps)if(!l.on&&distance(l,hero)<.82){l.on=true;let p=projection(l.x,l.y,25);burst(p.x,p.y,"#ffe2a1");sound(880,.25);updateHUD();message("灯火が目覚めた",lamps.filter(v=>v.on).length+" / 3 の光が戻った",2.4);}
for(const e of enemies){if(e.dead)continue;const d=distance(e,hero);if(d<4&&d>.6){e.x+=(hero.x-e.x)/d*.6*dt;e.y+=(hero.y-e.y)/d*.6*dt;}if(d<.65&&hero.invulnerable<=0){hero.hp--;hero.invulnerable=1.2;shake=8;sound(145,.2);updateHUD();if(hero.hp<=0){message("光が途絶えた","もう一度、灯火を探そう",2);setTimeout(reset,850);}}}if(lamps.every(l=>l.on)&&distance(hero,portal)<1.15){won=true;$("overlay").hidden=false;sound(1080,.4);}if(clock>toastUntil)$("toast").style.opacity=0;for(const p of particles){p.x+=(p.dx||0)*dt;p.y+=(p.dy||0)*dt;p.life-=dt;}particles=particles.filter(p=>p.life>0);}
// Paint the distant matte background behind the isometric map.
function background(){let g=ctx.createLinearGradient(0,0,0,sh);g.addColorStop(0,"#142a3e");g.addColorStop(.55,"#223843");g.addColorStop(1,"#0a222c");ctx.fillStyle=g;ctx.fillRect(0,0,sw,sh);for(let i=0;i<90;i++){const x=rand(i,4)*sw,y=rand(i,9)*sh*.68;rect(x,y,rand(i,1)> .6?2:1,1,i%5===0?"#ead9a5":"#6e8c8a");}for(let layer=0;layer<3;layer++){ctx.beginPath();ctx.moveTo(0,sh);for(let x=0;x<sw+20;x+=18){let y=sh*(.64+layer*.11)+Math.sin(x*.012+layer)*13+Math.sin(x*.039+layer)*9;ctx.lineTo(x,y);}ctx.lineTo(sw,sh);ctx.closePath();ctx.fillStyle=["#1c3640","#152f36","#102b32"][layer];ctx.fill();}}
// Diamond floor tiles create actual traversable depth.
function ground(){for(let y=0;y<H;y++)for(let x=0;x<W;x++){const road=onPath(x+.5,y+.5),r=rand(x,y);const c=road?(r>.5?"#716e68":"#64675f"):(r>.7?"#244b46":r>.35?"#224340":"#1d3b3d");diamond(x,y,c,"#203b40");for(let j=0;j<3;j++){let q=projection(x+.18+rand(x,j)*.6,y+.18+rand(y,j)*.6);rect(q.x,q.y,road?6:1,road?1:2,road?"#a8a18a55":"#48715e");}}}
// Three-dimensional props have ground shadows and elevated surfaces.
function drawProp(p){const q=projection(p.x,p.y),s=p.size||1;oval(q.x,q.y+3,15*s,5*s,"#091e27aa");if(p.type==="pine"){rect(q.x-3*s,q.y-22*s,6*s,23*s,"#3f3835");for(let k=0;k<3;k++){let w=(18-k*3)*s,y=q.y-(18+k*13)*s;polygon([{x:q.x-w,y:y+10*s},{x:q.x-3*s,y:y-12*s},{x:q.x+w,y:y+10*s}],"#1a4947");polygon([{x:q.x-3*s,y:y-12*s},{x:q.x+w,y:y+10*s},{x:q.x+1*s,y:y+7*s}],"#296660");rect(q.x-5*s,y-4*s,2*s,4*s,"#6b947d");}}else if(p.type==="shrub"){for(let i=0;i<5;i++){let ox=(i-2)*6;oval(q.x+ox,q.y-4-Math.abs(i-2)*2,9,7,i%2?"#386956":"#28554d");}rect(q.x-6,q.y-10,4,2,"#6b9a70");}else {rect(q.x-6,q.y-30,12,30,"#65736b");rect(q.x-9,q.y-35,18,5,"#ada993");}}
// A crystal on a stone plinth emits warm volumetric light.
function drawLamp(l){const p=projection(l.x,l.y);oval(p.x,p.y+3,17,6,"#0b1d24b8");rect(p.x-7,p.y-11,14,12,"#626861");rect(p.x-9,p.y-12,18,4,"#9e9a82");rect(p.x-4,p.y-24,8,12,l.on?"#ffeab6":"#78b4b0");rect(p.x-2,p.y-27,4,4,l.on?"#fff6dc":"#b2dee2");glow(p.x,p.y-23,l.on?82:35,l.on?"#ffcb7d":"#5fa7b7",l.on?.9:.45);}
// Arched stone gate becomes a bright destination after three pickups.
function drawPortal(){const p=projection(portal.x,portal.y);oval(p.x,p.y+2,37,12,"#0a1d23ac");for(const dx of [-27,21]){rect(p.x+dx,p.y-72,9,74,"#707b77");rect(p.x+dx+5,p.y-69,3,67,"#a5ab93");}rect(p.x-30,p.y-76,63,12,"#8e978a");rect(p.x-35,p.y-79,71,5,"#c5b89b");const ready=lamps.every(l=>l.on);oval(p.x,p.y-36,22,33,ready?"#b6efcd66":"#315e6766");glow(p.x,p.y-32,ready?125:55,ready?"#a4ffe2":"#61a8bd",ready?.95:.35);}
// Pixel character silhouette, with feet grounded in the 3D world.
function drawHero(){const p=projection(hero.x,hero.y),b=Math.sin(hero.step)*1.5;if(hero.invulnerable>0&&Math.floor(clock*12)%2)return;oval(p.x,p.y+2,10,4,"#092029c9");rect(p.x-7,p.y-16+b,14,15,"#396b8c");rect(p.x-9,p.y-16+b,4,12,"#28495d");rect(p.x+5,p.y-16+b,4,12,"#28495d");rect(p.x-6,p.y-29+b,12,13,"#edc4a1");rect(p.x-8,p.y-32+b,16,6,"#514a44");rect(p.x-5,p.y-26+b,2,2,"#2c3541");rect(p.x+4,p.y-26+b,2,2,"#2c3541");rect(p.x-4,p.y-5+b,4,7,"#32394b");rect(p.x+2,p.y-5-b,4,7,"#32394b");rect(p.x-3,p.y-17+b,7,4,"#d5bd86");if(hero.attack>0){ctx.strokeStyle="#fff1c7";ctx.lineWidth=4;ctx.beginPath();ctx.arc(p.x+hero.face*8,p.y-17,27,-1.4,1.2);ctx.stroke();glow(p.x+hero.face*16,p.y-16,30,"#f6d4a0",.7);}else{rect(p.x+hero.face*9,p.y-18+b,2,21,"#b8cdd2");rect(p.x+hero.face*7,p.y-11+b,6,2,"#ead498");}}
// Shadow enemies occupy the same projected floor as the hero.
function drawEnemy(e){if(e.dead)return;const p=projection(e.x,e.y);const b=Math.sin(clock*3+e.x)*3;oval(p.x,p.y,12,4,"#060e1caa");oval(p.x,p.y-13+b,12,13,e.lastHit>clock-.18?"#d8adbf":"#3b3a57");rect(p.x-8,p.y-16+b,16,10,"#302f4a");rect(p.x-6,p.y-16+b,3,3,"#e7a5c2");rect(p.x+4,p.y-16+b,3,3,"#e7a5c2");rect(p.x-4,p.y-3,3,6,"#37354d");rect(p.x+4,p.y-3,3,6,"#37354d");glow(p.x,p.y-15,27,"#a676af",.23);}
// Sort every foreground object by its floor depth.
function render(){camera.x+=(sw*.45-(hero.x-hero.y)*TW/2-camera.x)*.12;camera.y+=(sh*.59-(hero.x+hero.y)*TH/2-camera.y)*.12;ctx.save();background();ground();lx.clearRect(0,0,sw,sh);const objs=[...props.map(p=>({...p,kind:0})),...lamps.map(p=>({...p,kind:1})),...enemies.filter(e=>!e.dead).map(p=>({...p,kind:2})),{...portal,kind:3},{...hero,kind:4}];objs.sort((a,b)=>a.x+a.y-b.x-b.y);for(const o of objs){if(o.kind===0)drawProp(o);if(o.kind===1)drawLamp(o);if(o.kind===2)drawEnemy(o);if(o.kind===3)drawPortal();if(o.kind===4)drawHero();}for(const p of particles){ctx.globalAlpha=clamp(p.life*2,0,1);rect(p.x,p.y,3,3,p.color);}ctx.globalAlpha=1;for(let i=0;i<22;i++){let x=(rand(i,2)*sw+clock*(7+i%5))%sw,y=rand(i,8)*sh+Math.sin(clock+i)*14;rect(x,y,1,1,"#ffebbe");if(i%4===0)glow(x,y,12,"#f9e09e",.23);}ctx.restore();}
function frame(now){let dt=Math.min(.04,(now-last)/1000||.016);last=now;update(dt);render();requestAnimationFrame(frame);}
// Capture arrow keys for character controls.
window.addEventListener("keydown",(event)=>{keys.add(event.key.toLowerCase());if(event.code==="Space")attack();});
window.addEventListener("keyup",(event)=>keys.delete(event.key.toLowerCase()));
// The left thumb area supplies an analog vector on touch devices.
const joy=$("joystick"),stick=$("stick");let joyId=null;
function moveStick(e){const r=joy.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2,m=Math.max(1,Math.hypot(x,y));pointerVector={x:clamp(x/(r.width*.32),-1,1),y:clamp(y/(r.width*.32),-1,1)};stick.style.transform="translate("+x*Math.min(1,r.width*.32/m)+"px,"+y*Math.min(1,r.width*.32/m)+"px)";}
joy.addEventListener("pointerdown",e=>{joyId=e.pointerId;joy.setPointerCapture(joyId);moveStick(e);});joy.addEventListener("pointermove",e=>{if(e.pointerId===joyId)moveStick(e);});
function endStick(){joyId=null;pointerVector={x:0,y:0};stick.style.transform="translate(0,0)";}
joy.addEventListener("pointerup",endStick);joy.addEventListener("pointercancel",endStick);
const blade=$("attack");blade.addEventListener("pointerdown",e=>{e.preventDefault();attackDown=true;attack();});for(const ev of ["pointerup","pointercancel","pointerleave"])blade.addEventListener(ev,()=>attackDown=false);
canvas.addEventListener("pointerdown",e=>{if(e.pointerType==="mouse")attack();});
$("sound").addEventListener("click",()=>{muted=!muted;$("sound").textContent=muted?"×":"♪";});$("help").onclick=()=>$("helpPanel").hidden=false;$("closeHelp").onclick=()=>$("helpPanel").hidden=true;$("restart").onclick=reset;
addEventListener("resize",resize);resize();makeProps();reset();requestAnimationFrame(frame);
