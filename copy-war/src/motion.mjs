/**
 * Animation-only pose curves, synchronized with real combat state.
 * 0 -> anticipate -> impact -> recover (no global wiggle during idle).
 */
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
export const RELEASE_DURATION=.56;
export function actionPose(u,t=0) {
  const charging=(u.windup??0)>0;
  const windupTotal=Math.max(.08,u.attackWindupTotal??.42);
  const charge=charging?clamp(1-u.windup/windupTotal):0;
  const progress=(u.attackPulse??0)>0
    ?clamp(1-u.attackPulse/RELEASE_DURATION):1;
  // Strong keyframe accent at actual release, smaller rebound after.
  const release=(u.attackPulse??0)>0 ? Math.pow(1-progress,3):0;
  const follow=(u.attackPulse??0)>0 ?Math.sin(Math.PI*progress)*(.95-progress*.3):0;
  const settle=(u.attackPulse??0)>0?Math.sin(progress*Math.PI*2.6)*Math.pow(1-progress,2):0;
  const preparation=ease(charge);
  const walk=clamp(u.walkBlend??0);
  const gait=u.step??0;
  const stride=Math.sin(gait*2.25);
  const bounce=Math.abs(Math.sin(gait*2.25))*.65*walk;
  const breath=Math.sin(t*2.4+(u.id??0)*.62);
  const damage=clamp((u.hurtPulse??0)/.26);
  const dash=clamp((u.dashPulse??0)/.16);
  const landing=clamp((u.spawnGlow??0)/.9);
  const weight=['guardian','titan','cannon','earthlord','fortress','frostqueen','hivequeen','cometlord','eclipseking'].includes(u.type)?1:0;
  return {
    charge:preparation,release,follow,settle,progress,
    windup:charging,attacking:(u.attackPulse??0)>0,
    walk,stride,bounce,breath,damage,dash,landing,weight,
    lean:-.17*preparation + .19*release - .14*follow + .08*settle +
      .055*stride*walk - .16*damage,
    compress:.10*release*(1+weight*.35)-.045*preparation+
      .045*damage,
    yOffset:-1.3*walk*bounce-.06*weight*walk+
      .45*breath + (charging?-3.6*preparation:0) +
      2.9*release*(1+weight*.7),
    stepLeft: Math.sin(gait*2.25)*walk,
    stepRight: -Math.sin(gait*2.25)*walk,
    handRaise:preparation,
    strike:release,
    recoil:follow,
    aimX:Math.cos(u.aimAngle??-Math.PI/2),
    aimY:Math.sin(u.aimAngle??-Math.PI/2),
  };
}
