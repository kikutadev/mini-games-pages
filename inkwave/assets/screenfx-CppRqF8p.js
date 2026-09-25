import{A as e,E as t,F as n,J as r,_t as i,f as a,gt as o,ht as s,it as c,k as l,o as u,rt as d,x as f,yt as p,z as m}from"./three.module-CZjhBpWN.js";import{c as h,d as g,f as _,i as v,l as y,p as b,u as x}from"./index-CC0SsfyV.js";var S=Math.PI*2,C=new o,w=new o,T=new a,E=new a,D=new a(.06,.34,.62),O=new a(1,.16,.05),k=new a(1,1,1),A=e=>1-(1-x(e,0,1))**3,j=e=>(e=x(e,0,1),e<.5?4*e*e*e:1-(-2*e+2)**3/2),M=(e,t)=>e+Math.random()*(t-e),N=typeof matchMedia==`function`?matchMedia(`(prefers-reduced-motion: reduce)`):null,P=()=>!!(N&&N.matches),F=`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,I=`
  uniform sampler2D tDiffuse;
  uniform sampler2D tLens;
  uniform vec2 uRes;
  uniform float uAspect;
  uniform float uTime;
  uniform float uSpeed;
  uniform vec3 uSpeedTint;
  uniform float uStretch;
  uniform float uPunch;
  uniform vec2 uPunchPos;
  uniform float uBlast;
  uniform vec2 uBlastPos;
  uniform float uBlastRing;
  uniform vec3 uBlastColor;
  uniform float uChroma;
  uniform float uLensOn;
  uniform vec2 uLensTexel;
  uniform vec3 uLensColA;
  uniform vec3 uLensColB;
  uniform vec4 uEdgeInk;
  uniform vec4 uAura;
  uniform vec4 uHeart;
  uniform float uHurt;
  uniform vec4 uUrgency;
  uniform vec4 uSwim;
  uniform float uFocus;
  uniform vec4 uShimmer;
  uniform vec4 uFlood;
  uniform float uFloodDrip;
  uniform float uFloodClear;
  uniform float uHole;
  uniform vec3 uHoleRim;
  uniform vec4 uFlash;
  uniform float uDesat;
  uniform float uSat;
  uniform vec4 uKill;
  uniform vec4 uCharge;
  varying vec2 vUv;

  float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
  float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
  float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash12(i), hash12(i + vec2(1.0, 0.0)), u.x), mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) { float a = 0.5, s = 0.0; for (int i = 0; i < 3; i++) { s += a * vnoise(p); p = p * 2.03 + 17.1; a *= 0.5; } return s; }

  // distance (in screen-height units) to the nearest screen edge, with rounded inner corners
  float edgeD(vec2 uv) {
    vec2 p = uv * vec2(uAspect, 1.0);
    float dx = min(p.x, uAspect - p.x), dy = min(p.y, 1.0 - p.y);
    const float k = 16.0;
    return -log(exp(-k * dx) + exp(-k * dy)) / k;
  }
  // gooey ink band hugging the screen edges: > 0 inside the ink
  float gooBand(vec2 uv, float width, float wob, float seed) {
    vec2 p = uv * vec2(uAspect, 1.0);
    float n = fbm(p * 3.2 + vec2(seed, uTime * 0.12)) - 0.44;
    float n2 = vnoise(p * 10.0 + vec2(uTime * 0.25, seed * 1.7)) - 0.5;
    return width * (1.0 + n * wob * 2.2 + n2 * wob * 0.7) - edgeD(uv);
  }
  // ink drips hanging from the top edge: > 0 inside
  float drips(vec2 uv, float len, float seed, float top) {
    const float N = 19.0;
    float x = uv.x * N;
    float id = floor(x);
    float h = hash12(vec2(id, seed));
    float h2 = hash12(vec2(id, seed + 7.3));
    float fx = (fract(x) - 0.5 - (h2 - 0.5) * 0.5) / N * uAspect;   // horizontal distance, height units
    float L = len * (0.12 + 0.88 * h * h) * (0.9 + 0.1 * sin(uTime * (0.7 + h) + h * 6.28));
    float y = 1.0 - uv.y - top;
    if (y < -0.02) return -1.0;
    float w = (0.005 + 0.011 * h2) * (0.55 + 0.45 * step(0.35, h));
    float bulb = w * 1.55;
    float inTail = clamp(y / max(L, 1e-4), 0.0, 1.0);
    float rad = mix(w * 1.2, w, smoothstep(0.0, 0.3, inTail));
    rad = mix(rad, bulb, smoothstep(0.8, 1.0, inTail));
    float d = length(vec2(fx, max(y - L, 0.0))) - rad;
    return -d;
  }
  // glossy wet-ink shading for a surface with normal n
  vec3 inkShade(vec3 inkCol, vec3 behind, vec3 n, float thick) {
    vec3 L = normalize(vec3(-0.42, 0.62, 0.66));
    float ndl = clamp(dot(n, L), 0.0, 1.0);
    vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
    float spec = pow(clamp(dot(n, H), 0.0, 1.0), 64.0);
    float spec2 = pow(clamp(dot(n, normalize(vec3(0.5, -0.3, 0.8))), 0.0, 1.0), 18.0);
    float fres = pow(1.0 - clamp(n.z, 0.0, 1.0), 2.0);
    vec3 base = inkCol * (0.42 + 0.62 * ndl);
    base = mix(base, behind * (0.35 + inkCol * 1.1), (1.0 - thick) * 0.28);
    return base * (1.0 - fres * 0.45) + spec * 2.4 + spec2 * inkCol * 0.25;
  }

  vec3 sceneTap(vec2 uv, vec2 ca) {
    if (uChroma > 0.0005) return vec3(texture2D(tDiffuse, uv + ca).r, texture2D(tDiffuse, uv).g, texture2D(tDiffuse, uv - ca).b);
    return texture2D(tDiffuse, uv).rgb;
  }

  void main() {
    vec2 uv = vUv;
    vec2 c0 = vUv - 0.5;
    vec2 q = c0 * vec2(uAspect, 1.0);
    float r = length(q);

    // ---------------------------------------------------------------- geometric distortion
    uv = uPunchPos + (uv - uPunchPos) * (1.0 - uPunch);
    if (uStretch > 0.0001) { vec2 d = uv - 0.5; vec2 da = d * vec2(uAspect, 1.0); uv = 0.5 + d * (1.0 - uStretch * dot(da, da)); }
    if (uSwim.a > 0.001) uv += vec2(sin(uv.y * 37.0 + uTime * 2.6) + 0.5 * sin(uv.y * 71.0 - uTime * 3.3), cos(uv.x * 29.0 + uTime * 2.1)) * 0.0011 * uSwim.a;
    if (uBlast > 0.001) {
      vec2 bd = (uv - uBlastPos) * vec2(uAspect, 1.0);
      float bl = length(bd);
      float ring = exp(-pow((bl - uBlastRing) * 18.0, 2.0));
      uv -= (bd / max(bl, 1e-4)) / vec2(uAspect, 1.0) * ring * 0.028 * uBlast;
    }

    // ---------------------------------------------------------------- sampling: radial blurs + chromatic split
    float edgeW = smoothstep(0.22, 0.95, r);
    vec2 blurDir = (vec2(0.5) - uv) * (uSpeed * 0.055 * edgeW) + (uBlastPos - uv) * (uBlast * 0.05);
    vec2 ca = c0 * uChroma * 0.011 * (0.35 + r);
    vec3 col;
    if (dot(blurDir, blurDir) > 1e-7) {
      col = vec3(0.0);
      for (int i = 0; i < TAPS; i++) {
        float t = float(i) / float(TAPS - 1);
        col += sceneTap(uv + blurDir * t, ca);
      }
      col /= float(TAPS);
    } else {
      col = sceneTap(uv, ca);
    }

    // ---------------------------------------------------------------- grading-type adjustments
    float l0 = luma(col);
    col = max(mix(vec3(l0), col, uSat * (1.0 - uDesat)), 0.0);
    if (uFocus > 0.001) {
      float v = smoothstep(0.3, 0.92, r);
      col *= 1.0 - v * uFocus * 0.5;
      col += uCharge.rgb * exp(-abs(r - mix(0.95, 0.3, uCharge.a)) * 40.0) * uCharge.a * 0.35 * step(0.01, uCharge.a);
    }

    // ---------------------------------------------------------------- speed streaks
    if (uSpeed > 0.001) {
      float ang = atan(q.y, q.x);
      float a = ang / 6.28318 * 96.0;
      float id = floor(a);
      float h = hash12(vec2(id, 7.0));
      float lane = abs(fract(a) - 0.5);
      float lw = 0.05 + 0.1 * h;
      float streak = smoothstep(lw, lw * 0.25, lane);
      float mv = fract(r * (1.2 + h) - uTime * (2.2 + 2.4 * h) + h * 10.0);
      float dash = smoothstep(0.0, 0.08, mv) * smoothstep(0.55, 0.25, mv);
      float s = streak * dash * smoothstep(0.42, 1.0, r) * step(0.5, h) * uSpeed;
      col += uSpeedTint * s * 1.3;
    }

    // ---------------------------------------------------------------- swim: submerged tint + caustic glints
    if (uSwim.a > 0.001) {
      float v = smoothstep(0.35, 1.05, r);
      col = mix(col, col * (0.55 + uSwim.rgb * 0.9), v * 0.45 * uSwim.a);
      float cst = vnoise(q * 16.0 + vec2(uTime * 0.7, -uTime * 0.4)) * vnoise(q * 21.0 - vec2(uTime * 0.5, uTime * 0.6));
      col += uSwim.rgb * pow(cst, 3.0) * 1.6 * uSwim.a * v;
    }

    // ---------------------------------------------------------------- low HP heartbeat vignette
    if (uHeart.a > 0.001 || uHurt > 0.001) {
      float v = smoothstep(0.42, 1.08, r + (fbm(q * 2.6 + uTime * 0.08) - 0.44) * 0.18);
      float k = clamp(v * (uHurt * 0.5 + uHeart.a * 0.65), 0.0, 0.9);
      col = mix(col, col * 0.3 + uHeart.rgb * (0.12 + 0.22 * uHeart.a), k);
    }

    // ---------------------------------------------------------------- final-seconds urgency
    if (uUrgency.a > 0.001) {
      float v = smoothstep(0.5, 1.12, r);
      col = mix(col, col * vec3(1.1, 0.78, 0.72) + uUrgency.rgb * 0.2, v * uUrgency.a);
    }

    // ---------------------------------------------------------------- special aura / super-jump charge / kill flash / spawn shimmer
    if (uAura.a > 0.001) {
      float e = edgeD(vUv);
      float ang = atan(q.y, q.x);
      float flow = vnoise(vec2(ang * 4.0 - uTime * 1.2, e * 10.0 - uTime * 2.6));
      float rim = exp(-e * 55.0) * (0.55 + 0.6 * flow);
      float lane = 0.5 + 0.5 * sin(ang * 26.0 - uTime * 7.0 + flow * 3.0);
      float dashes = smoothstep(0.82, 0.97, lane) * exp(-e * 22.0) * 0.9;
      float tint = smoothstep(0.16, 0.0, e) * 0.22;
      col = mix(col, col * (0.7 + uAura.rgb * 0.45), tint * uAura.a);
      col += uAura.rgb * (rim + dashes) * uAura.a;
    }
    if (uKill.a > 0.001) col += uKill.rgb * smoothstep(0.5, 1.15, r) * uKill.a;
    if (uShimmer.a > 0.001) {
      float s = 0.5 + 0.5 * sin(uTime * 9.0 + r * 24.0 - atan(q.y, q.x) * 3.0);
      col += uShimmer.rgb * smoothstep(0.62, 1.12, r) * s * uShimmer.a * 0.35;
    }

    // ---------------------------------------------------------------- blast glow
    if (uBlast > 0.001) {
      float bd = length((vUv - uBlastPos) * vec2(uAspect, 1.0));
      col += uBlastColor * exp(-bd * 6.0) * uBlast * 0.2;
    }

    // ---------------------------------------------------------------- enemy ink underfoot: gooey edge band
    if (uEdgeInk.a > 0.001) {
      float bottom = smoothstep(0.6, 0.0, vUv.y);
      float w = uEdgeInk.a * (0.002 + 0.08 * bottom * bottom + 0.012 * bottom);
      float f = gooBand(vUv, w, 0.85, 11.0);
      float aa = fwidth(f) + 0.0015;
      float m = smoothstep(-aa, aa, f);
      if (m > 0.0) {
        float hgt = smoothstep(0.0, 0.028, f);
        vec3 n = normalize(vec3(-vec2(dFdx(hgt), dFdy(hgt)) * 0.028 * uRes.y * 0.9, 1.0));
        col = mix(col, inkShade(uEdgeInk.rgb, col, n, hgt), m * 0.94);
      }
    }

    // ---------------------------------------------------------------- lens ink (metaball field rendered by LensInk)
    if (uLensOn > 0.5) {
      vec4 Lc = texture2D(tLens, vUv);
      float fs = Lc.r + Lc.g;
      if (fs > 0.03) {
        vec2 tx = uLensTexel * 1.5;
        vec4 Lx1 = texture2D(tLens, vUv + vec2(tx.x, 0.0)), Lx0 = texture2D(tLens, vUv - vec2(tx.x, 0.0));
        vec4 Ly1 = texture2D(tLens, vUv + vec2(0.0, tx.y)), Ly0 = texture2D(tLens, vUv - vec2(0.0, tx.y));
        vec2 gi = vec2((Lx1.r + Lx1.g) - (Lx0.r + Lx0.g), (Ly1.r + Ly1.g) - (Ly0.r + Ly0.g));
        vec3 n = normalize(vec3(-gi * 1.35, 1.0));
        float aa = fwidth(fs) * 1.1 + 0.012;
        float cov = smoothstep(0.5 - aa, 0.5 + aa, fs);
        float film = smoothstep(0.08, 0.5, fs) * (1.0 - cov);
        float thick = clamp((fs - 0.5) * 1.3, 0.0, 1.0);
        vec3 inkCol = (Lc.r * uLensColA + Lc.g * uLensColB) / max(fs, 1e-4);
        vec3 behind = texture2D(tDiffuse, vUv + n.xy * 0.03).rgb;
        vec3 body = inkShade(inkCol, behind, n, thick);
        float rim = smoothstep(0.5, 0.56, fs) * (1.0 - smoothstep(0.56, 0.75, fs));
        body *= 1.0 - rim * 0.3;
        col = mix(col, behind * mix(vec3(1.0), inkCol * 1.5 + 0.1, 0.55), film * 0.42);
        col = mix(col, body, cov);
      }
      float fw = Lc.b;
      if (fw > 0.03) {
        vec2 tx = uLensTexel * 1.5;
        float wx = texture2D(tLens, vUv + vec2(tx.x, 0.0)).b - texture2D(tLens, vUv - vec2(tx.x, 0.0)).b;
        float wy = texture2D(tLens, vUv + vec2(0.0, tx.y)).b - texture2D(tLens, vUv - vec2(0.0, tx.y)).b;
        vec3 n = normalize(vec3(-vec2(wx, wy) * 1.6, 1.0));
        float aa = fwidth(fw) * 1.1 + 0.012;
        float cov = smoothstep(0.5 - aa, 0.5 + aa, fw);
        vec3 refr = texture2D(tDiffuse, vUv - n.xy * 0.07).rgb;
        vec3 L = normalize(vec3(-0.42, 0.62, 0.66));
        float spec = pow(clamp(dot(n, normalize(L + vec3(0.0, 0.0, 1.0))), 0.0, 1.0), 80.0);
        float fres = pow(1.0 - n.z, 1.6);
        vec3 wcol = refr * (1.02 - fres * 0.55) * vec3(0.93, 0.98, 1.04) + spec * 2.6;
        col = mix(col, wcol, cov);
        col = mix(col, col * 0.92, smoothstep(0.1, 0.5, fw) * (1.0 - cov) * 0.4);
      }
    }

    // ---------------------------------------------------------------- splatted ink flood + respawn iris reveal
    if (uFlood.a > 0.001) {
      float width = uFlood.a * 1.05;
      float f = gooBand(vUv, width, 0.3 * (1.0 - 0.5 * smoothstep(0.7, 1.0, uFlood.a)), 3.7);
      f = max(f, drips(vUv, uFloodDrip, 1.3, width * 0.8));
      if (uHole > 0.0) {
        float hn = (fbm(q * 4.5 + vec2(uTime * 0.4, 0.0)) - 0.44) * 0.16;
        f = min(f, r + hn - uHole);
      }
      float aa = fwidth(f) + 0.0015;
      float m = smoothstep(-aa, aa, f);
      if (m > 0.0) {
        // thickness: bevelled rim + slow glossy undulations inside the sheet
        float und = fbm(q * 2.2 + vec2(uTime * 0.05, -uTime * 0.03)) - 0.44;
        float hgt = smoothstep(0.0, 0.05, f) + und * 1.6 * smoothstep(0.01, 0.16, f);
        vec3 n = normalize(vec3(-vec2(dFdx(hgt), dFdy(hgt)) * 0.05 * uRes.y * 0.8, 1.0));
        if (uFloodClear > 0.5) {
          // sea water sheet: refract + tint instead of opaque ink
          vec3 refr = texture2D(tDiffuse, vUv - n.xy * 0.09).rgb;
          vec3 L = normalize(vec3(-0.42, 0.62, 0.66));
          float spec = pow(clamp(dot(n, normalize(L + vec3(0.0, 0.0, 1.0))), 0.0, 1.0), 70.0);
          vec3 w = mix(refr, refr * uFlood.rgb * 2.2 + uFlood.rgb * 0.12, 0.55 + 0.3 * clamp(hgt, 0.0, 1.0)) + spec * 2.2;
          col = mix(col, w, m);
        } else {
          float grain = vnoise(q * 60.0) * 0.05;
          col = mix(col, inkShade(uFlood.rgb * (0.94 + grain), col, n, clamp(hgt, 0.0, 1.0)), m);
        }
      }
      if (uHole > 0.0) {
        float rd = abs(r + (fbm(q * 4.5 + vec2(uTime * 0.4, 0.0)) - 0.44) * 0.16 - uHole);
        col += uHoleRim * exp(-rd * 26.0) * 0.9 * (1.0 - smoothstep(0.9, 1.25, uHole));
      }
    }

    // ---------------------------------------------------------------- whiteout flash
    if (uFlash.a > 0.001) {
      col = mix(col, vec3(luma(col)), clamp(uFlash.a * 0.35, 0.0, 0.5));
      col += uFlash.rgb * uFlash.a * (0.2 + 0.8 * smoothstep(0.12, 0.95, r));   // edge-weighted: the centre (the action) stays readable
    }
    gl_FragColor = vec4(col, 1.0);
  }
`,L=`
  attribute vec4 iA;   // x, y (uv), rx, ry (screen-height units)
  attribute vec4 iB;   // rotation, intensity, channel, unused
  uniform float uAspect;
  varying vec2 vP; varying float vI; varying vec3 vCh;
  void main() {
    vec2 corner = position.xy;
    float c = cos(iB.x), s = sin(iB.x);
    vec2 lp = vec2(corner.x * iA.z, corner.y * iA.w);
    vec2 rp = vec2(c * lp.x - s * lp.y, s * lp.x + c * lp.y);
    vec2 p = iA.xy + vec2(rp.x / uAspect, rp.y);
    vP = corner; vI = iB.y;
    vCh = iB.z < 0.5 ? vec3(1.0, 0.0, 0.0) : iB.z < 1.5 ? vec3(0.0, 1.0, 0.0) : vec3(0.0, 0.0, 1.0);
    gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
  }`,R=`
  varying vec2 vP; varying float vI; varying vec3 vCh;
  void main() {
    float d2 = dot(vP, vP);
    if (d2 >= 1.0) discard;
    float k = 1.0 - d2; k = k * k;
    gl_FragColor = vec4(vCh * k * vI, 0.0);
  }`,z=220,B=0,V=1,H=2,U=class{constructor(i){this.r=i,this.parts=[],this.pool=[];let a=new r(2,2),o=new e;o.index=a.index,o.setAttribute(`position`,a.getAttribute(`position`)),this.aA=new l(new Float32Array(z*4),4).setUsage(f),this.aB=new l(new Float32Array(z*4),4).setUsage(f),o.setAttribute(`iA`,this.aA),o.setAttribute(`iB`,this.aB),o.instanceCount=0,this.geo=o,this.mat=new c({uniforms:{uAspect:{value:16/9}},vertexShader:L,fragmentShader:R,depthTest:!1,depthWrite:!1,transparent:!0,blending:5,blendEquation:100,blendSrc:201,blendDst:201,blendEquationAlpha:100,blendSrcAlpha:201,blendDstAlpha:201});let h=new m(o,this.mat);h.frustumCulled=!1,this.scene=new d,this.scene.add(h),this.cam=new u,this.rt=new p(4,4,{type:t,depthBuffer:!1,stencilBuffer:!1,minFilter:n,magFilter:n}),this.texel=new s(.25,.25),this.scale=1/3,this.dirty=!1}resize(e,t,n){let r=Math.max(64,Math.round(e*n)),i=Math.max(36,Math.round(t*n));(this.rt.width!==r||this.rt.height!==i)&&(this.rt.setSize(r,i),this.texel.set(1/r,1/i),this.dirty=!0)}_new(){if(this.parts.length>=z){let e=-1,t=1/0;for(let n=0;n<this.parts.length;n++){let r=this.parts[n],i=r.kind===`trail`?r.I:r.I+10;i<t&&(t=i,e=n)}let n=this.parts[e];this.parts.splice(e,1),this.pool.push(n)}let e=this.pool.pop()||{};return e.vx=0,e.vy=0,e.rot=0,e.age=0,e.slide=!1,e.trailT=0,e.hold=0,e.pop=1,e.grow=0,e.seed=Math.random()*100,this.parts.push(e),e}add(e,t,n,r,i,{rx:a=i,ry:o=i,rot:s=0,I:c=1,life:l=1.5,stick:u=99,pop:d=.09}={}){let f=this._new();return f.kind=e,f.ch=t,f.x=n,f.y=r,f.r=i,f.rx=a,f.ry=o,f.rot=s,f.I0=f.I=c,f.life=l,f.stick=u,f.pop=d,f.grow=d>0?0:1,f}splat(e,t,n,r,i,{arms:a=6,sats:o=6,life:s=2.1}={}){let c=Math.random()*S,l=(e,t,n,r)=>[e+Math.cos(n)*r/i,t+Math.sin(n)*r],u=this.add(`drop`,e,t,n,r*.92,{I:1.4,life:s*M(.95,1.15),stick:M(.25,.55)});u.mass=1;let d=3+(Math.random()*2|0);for(let i=0;i<d;i++){let[a,o]=l(t,n,c+i/d*S+M(-.5,.5),r*M(.3,.55)),u=this.add(`drop`,e,a,o,r*M(.5,.72),{I:1.25,life:s*M(.75,1),stick:M(.5,1.2)});u.mass=.6}for(let i=0;i<a;i++){let o=c+(i+M(-.3,.3))/a*S,u=Math.random()<.3,d=r*(u?M(1.35,1.8):M(.85,1.2)),[f,p]=l(t,n,o,d*.5);this.add(`arm`,e,f,p,r*.3,{rx:r*M(.2,.3)*(u?.8:1),ry:d*.5,rot:o-Math.PI/2,I:1.3,life:s*M(.6,.85)});let[m,h]=l(t,n,o,d),g=this.add(`drop`,e,m,h,r*(u?M(.26,.34):M(.3,.42)),{I:1.35,life:s*M(.7,1),stick:M(.4,1.1)});g.mass=.4}for(let i=0;i<o;i++){let i=Math.random()*S,a=r*M(1.45,2.5),o=r*M(.07,.16),[s,c]=l(t,n,i,a),u=Math.random()<.4;this.add(`sat`,e,s,c,o,{rx:o*(u?.7:1),ry:o*(u?1.9:1),rot:i-Math.PI/2,I:1.3,life:M(.5,1.3),pop:.05})}this.dirty=!0}droplet(e,t,n,r,{slide:i=.25,life:a=1.1}={}){let o=this.add(`drop`,e,t,n,r,{I:1.3,life:a,stick:i,pop:.05});return o.mass=.3,this.dirty=!0,o}clear(){for(;this.parts.length;)this.pool.push(this.parts.pop());this.dirty=!0}update(e,t){let n=this.parts;for(let r=n.length-1;r>=0;r--){let i=n[r];i.age+=e,i.grow<1&&(i.grow=Math.min(1,i.grow+e/Math.max(.01,i.pop)));let a=i.age>i.life?1-(i.age-i.life)/(i.kind===`trail`?.9:.55):1;if(i.kind===`trail`?i.I=i.I0*x(1-i.age/i.life,0,1):i.I=i.I0*x(a,0,1),i.I<=.01){n.splice(r,1),this.pool.push(i);continue}if(i.kind===`drop`){if(!i.slide&&i.age>i.stick&&i.r>.012&&(i.slide=!0),i.slide){i.hold-=e,i.hold<=0&&Math.random()<e*.45&&(i.hold=M(.06,.22));let n=i.hold>0?0:1.05*(i.r/.05)*(.55+.45*(i.mass||1));i.vy-=n*e,i.vy*=Math.exp(-e*(i.hold>0?12:2.1)),i.vx=Math.sin(i.age*2.3+i.seed)*.006+Math.sin(i.age*6.1+i.seed*2)*.003;let r=i.vx*e,a=i.vy*e;i.x+=r,i.y+=a;let o=-i.vy;i.trailT+=Math.hypot(r*t,a),i.trailT>i.r*.55&&(i.trailT=0,this.add(`trail`,i.ch,i.x,i.y+i.r*.45,i.r*.55,{rx:i.r*.42,ry:i.r*.72,I:.5,life:1.2,pop:0}),i.r*=.965),i.ry=i.r*(1+Math.min(.9,o*9)),i.rx=i.r*(1-Math.min(.25,o*2.5)),i.r<.01&&(i.slide=!1,i.life=Math.min(i.life,i.age+.2))}else i.rx=i.ry=i.r;if(i.y<-.1){n.splice(r,1),this.pool.push(i);continue}}}this.dirty=!0}render(e){let t=this.parts,n=Math.min(t.length,z),r=this.aA.array,i=this.aB.array;for(let e=0;e<n;e++){let n=t[e],a=n.grow<1?.35+.65*A(n.grow)*(1+.12*Math.sin(n.grow*Math.PI)):1;r[e*4]=n.x,r[e*4+1]=n.y,r[e*4+2]=n.rx*a,r[e*4+3]=n.ry*a,i[e*4]=n.rot,i[e*4+1]=n.I,i[e*4+2]=n.ch,i[e*4+3]=0}this.aA.needsUpdate=!0,this.aB.needsUpdate=!0,this.geo.instanceCount=n,this.mat.uniforms.uAspect.value=e;let a=this.r,o=a.getRenderTarget();a.getClearColor(E);let s=a.getClearAlpha();a.setRenderTarget(this.rt),a.setClearColor(0,0),a.clear(!0,!1,!1),n&&a.render(this.scene,this.cam),a.setRenderTarget(o),a.setClearColor(E,s),this.dirty=!1}dispose(){this.rt.dispose(),this.geo.dispose(),this.mat.dispose()}},W=class{constructor(e,t){this.R=e,this.G=t||y,this.renderer=e.renderer,this.time=0,this.lens=new U(this.renderer),this.taps=0,this.mat=new c({name:`InkwaveScreenFX`,defines:{TAPS:8},uniforms:{tDiffuse:{value:null},tLens:{value:this.lens.rt.texture},uRes:{value:new s(1600,900)},uAspect:{value:16/9},uTime:{value:0},uSpeed:{value:0},uSpeedTint:{value:new a(1,1,1)},uStretch:{value:0},uPunch:{value:0},uPunchPos:{value:new s(.5,.5)},uBlast:{value:0},uBlastPos:{value:new s(.5,.5)},uBlastRing:{value:0},uBlastColor:{value:new a(1,.9,.8)},uChroma:{value:0},uLensOn:{value:0},uLensTexel:{value:this.lens.texel},uLensColA:{value:new a(.1,.2,1)},uLensColB:{value:new a(1,.4,.05)},uEdgeInk:{value:new i(0,0,0,0)},uAura:{value:new i(0,0,0,0)},uHeart:{value:new i(.6,.02,.06,0)},uHurt:{value:0},uUrgency:{value:new i(O.r,O.g,O.b,0)},uSwim:{value:new i(0,0,0,0)},uFocus:{value:0},uCharge:{value:new i(1,1,1,0)},uShimmer:{value:new i(0,0,0,0)},uFlood:{value:new i(0,0,0,0)},uFloodDrip:{value:0},uFloodClear:{value:0},uHole:{value:0},uHoleRim:{value:new a(1,1,1)},uFlash:{value:new i(1,1,1,0)},uDesat:{value:0},uSat:{value:1},uKill:{value:new i(1,1,1,0)}},vertexShader:F,fragmentShader:I,depthTest:!1,depthWrite:!1}),this.U=this.mat.uniforms,this.pass=new h(this.mat),this.pass.enabled=!1,e.setExtraPass(this.pass),this.s={speed:0,stretch:0,punch:0,punchV:0,blast:0,blastT:9,chroma:0,edgeInk:0,aura:0,auraPulse:0,heart:0,heartPh:0,hurt:0,urg:0,urgBase:0,swim:0,focus:0,chargePulse:0,shimmer:0,kill:0,flash:0,desat:0,sat:1,satPop:0,flood:0,floodDrip:0,hole:0,floodMode:null,floodT:0,holeT:0,jump:null,jumpCharge:0,wasJump:!1,stepT:0,rainT:0,emergeT:0,lastForm:`kid`,dmgAcc:0,dmgT:0,dmgAng:null,dmgAtk:null,lastBlast:{t:-9,x:0,y:0,z:0}},this._aspect=16/9,this._w=0,this._h=0,this._inMatch=!1,this._local=null,this.debugHold=0,this.stats={lensParts:0,enabled:!1},this._size=new s,this._bind(),this.G.hud?.attachScreenFX?.(this),this.G.screenfx=this}_bind(){let e=this.G,t=()=>{let t=e.match;return!!(t&&!t.attract&&e.mode===`match`&&(t.state===`playing`||t.state===`intro`||t.state===`finish`))},n=e=>!!(e&&e.isLocal&&t());b(`damage`,({victim:e,attacker:t,amount:r,source:i})=>{if(!n(e)||r<=0)return;let a=this.s;a.dmgAcc+=r,a.dmgAtk=t||a.dmgAtk,a.dmgT<=0&&(a.dmgT=.06);let o=x(r/60,.1,1);a.chroma=Math.min(.9,a.chroma+.12+o*.4),r>=40&&this._kickPunch(-.005-.008*o)}),b(`hit`,({attacker:e,killed:t})=>{n(e)&&t&&(this.s.kill=1,this.s.chroma=Math.min(1,this.s.chroma+.3),this._kickPunch(.012))}),b(`splatted`,({victim:e,attacker:n,cause:r})=>{t()&&e?.isLocal&&this._startFlood(n,r)}),b(`respawn`,({actor:e})=>{n(e)&&this._startReveal(e)}),b(`superjump`,({actor:e,phase:t})=>{if(!n(e))return;let r=this.s;t===`charge`?r.jump={phase:`charge`,t:0}:t===`flight`&&(r.jump={phase:`flight`,t:0},r.flash=.5,r.chroma=Math.min(1.2,r.chroma+.6),this._kickPunch(-.04))}),b(`superjump:land`,({actor:e})=>{n(e)&&this._land(e)}),b(`special:use`,({actor:e,id:t})=>{n(e)&&(this.s.auraPulse=1,this.s.chroma=Math.min(1,this.s.chroma+.25),t===`storm`&&(this.s.aura=Math.max(this.s.aura,.9)))});let r=(e,n,r)=>{if(!e||!t())return;let i=this.s.lastBlast;if(this.time-i.t<.05&&Math.abs(i.x-e.x)+Math.abs(i.y-e.y)+Math.abs(i.z-e.z)<.8){r&&this.U.uBlastColor.value.copy(r).lerp(k,.35);return}i.t=this.time,i.x=e.x,i.y=e.y,i.z=e.z,this._blast(e,n,r)};b(`shake`,({amount:e,pos:t})=>{t&&r(t,e,null)}),b(`bomb:explode`,({pos:t,team:n})=>r(t,.6,e.teamColors?.[n])),b(`special:slam`,({pos:t,actor:n})=>{r(t,1,n?e.teamColors?.[n.team]:null),n&&n.isLocal&&(this.s.blast*=.55,this.s.chroma*=.7)}),b(`match:state`,({state:e,match:t})=>{if(!t||t.attract)return;let n=this.s;e===`intro`&&this.reset(),e===`playing`&&(n.satPop=1,n.chroma=Math.min(1,n.chroma+.35),this._kickPunch(.015)),(e===`judge`||e===`results`)&&(n.floodMode=n.flood>0?`fadeout`:null,n.floodT=0,this.lens.clear())}),b(`weapon:impact`,({pos:n,team:r,kind:i})=>{if(!t()||!n||i===`roll`)return;let a=e.match&&e.match.local,o=e.camera;if(!a||!a.alive||r===a.team||!o)return;let s=o.position.distanceToSquared(n);if(s>2.4*2.4||(w.copy(n).project(o),w.z>1))return;let c=Math.min(.97,Math.max(.03,w.x*.5+.5)),l=Math.min(.97,Math.max(.05,w.y*.5+.5)),u=s<1.2?3:1+(Math.random()*2|0);for(let e=0;e<u;e++)this.lens.droplet(B,Math.min(.98,Math.max(.02,c+M(-.06,.06))),Math.min(.97,Math.max(.04,l+M(-.06,.06))),M(.008,.02),{slide:M(.1,.35),life:M(.5,1)})}),b(`match:count`,({n:e})=>{t()&&(this.s.urg=1,this.s.urgBase=x((11-e)/10,0,1)*.35)})}_kickPunch(e){this.s.punchV+=e*22}_blast(e,t,n){let r=this.G.camera;if(!r)return;let i=t*x(1-(r.position.distanceTo(e)-3)/24,0,1);if(i<.04)return;C.copy(e).project(r);let a=C.z<1&&Math.abs(C.x)<1.25&&Math.abs(C.y)<1.25,o=this.s;a&&(this.U.uBlastPos.value.set(C.x*.5+.5,C.y*.5+.5),o.blast=Math.min(1.2,Math.max(o.blast,i*1.1)),o.blastT=0,this.U.uBlastColor.value.copy(n||k).lerp(k,.35),this.U.uPunchPos.value.copy(this.U.uBlastPos.value)),o.chroma=Math.min(1.3,o.chroma+i*.9),this._kickPunch(.02*i)}_teamColor(e){return this.G.teamColors?.[e]||k}_startFlood(e,t){let n=this.s,r=this.U,i=t===`water`?D:e?this._teamColor(e.team):this._teamColor(this._local?this._local.enemyTeam:1);if(r.uFlood.value.set(i.r,i.g,i.b,n.flood),r.uFloodClear.value=t===`water`?1:0,n.floodMode=`in`,n.floodT=0,n.hole=0,n.jump=null,n.chroma=Math.min(1.4,n.chroma+.9),this._kickPunch(-.03),t===`water`){this._aspect;for(let e=0;e<34;e++)this.lens.droplet(H,Math.random(),M(.05,1),M(.01,.034),{slide:M(.3,1.2),life:M(1.8,3.6)})}}_startReveal(e){let t=this.s,n=this.U,r=this._teamColor(e.team);n.uFlood.value.set(r.r,r.g,r.b,1),n.uFloodClear.value=0,n.uHoleRim.value.copy(r).lerp(k,.55).multiplyScalar(1.6),t.flood=1,t.floodMode=`reveal`,t.floodT=0,t.hole=1e-4,t.floodDrip=.05,this.lens.clear(),t.desat=Math.min(t.desat,.3),t.shimmer=1}_land(e){let t=this.s;this.time-(this._landT??-9)<.3||(this._landT=this.time,t.jump=null,this.U.uPunchPos.value.set(.5,.3),this.U.uBlastPos.value.set(.5,.18),this.U.uBlastColor.value.copy(this._teamColor(e.team)).lerp(k,.3),t.blast=Math.max(t.blast,.75),t.blastT=0,t.chroma=Math.min(1.3,t.chroma+.7),this._kickPunch(.045),t.flash=Math.max(t.flash,.35))}_damageSplat(e,t){let n=this.G.camera,r=this._aspect,i=x(e/70,.18,1.2),a=null;if(t&&n&&t.pos){C.copy(t.pos),C.y+=1,C.project(n);let e=C.x,i=C.y,o=C.z>1;o&&(e=-e,i=-i),!o&&Math.abs(e)<1&&Math.abs(i)<1?(a=e>=0?0:Math.PI,a+=M(-.35,.35)):a=Math.atan2(i,e*r)}a===null&&(a=Math.random()*S);let o=i>.7?2:1;for(let e=0;e<o;e++){let t=a+(e?M(-.7,.7):M(-.18,.18)),n=(.045+.05*i)*(e?.6:1)*M(.85,1.15),o=this._edgePoint(t,n*M(.2,.9));this.lens.splat(B,o.x,o.y,n,r,{arms:6+(Math.random()*4|0),sats:5+(Math.random()*5|0),life:1.5+i*.9})}}_edgePoint(e,t){let n=this._aspect,r=Math.cos(e),i=Math.sin(e),a=Math.min(n/2/Math.max(.001,Math.abs(r)),.5/Math.max(.001,Math.abs(i))),o=n/2+r*a,s=.5+i*a;o-=Math.sign(r)*t*(Math.abs(r)>.25?1:.3),s-=Math.sign(i)*t*(Math.abs(i)>.25?1:.3);let c=o/n,l=s;return l<.5&&Math.abs(c-.5)<.2&&(c=.5+Math.sign(c-.5||Math.random()-.5)*M(.22,.3)),{x:x(c,.02,.98),y:x(l,.03,.97)}}reset(){let e=this.s;this.lens.clear(),Object.assign(e,{speed:0,stretch:0,punch:0,punchV:0,blast:0,chroma:0,edgeInk:0,aura:0,auraPulse:0,heart:0,hurt:0,urg:0,urgBase:0,swim:0,focus:0,shimmer:0,kill:0,flash:0,desat:0,sat:1,satPop:0,flood:0,floodDrip:0,hole:0,floodMode:null,jump:null,dmgAcc:0,dmgT:0})}update(e,t){let n=this.G,r=this.s,i=this.U,a=t?.match||n.match,o=!!(a&&!a.attract&&n.mode===`match`),s=!!(a&&a.paused);!o&&this._inMatch&&this.reset(),this._inMatch=o;let c=o?a.local:null;this._local=c,this.debugHold=Math.max(0,this.debugHold-e);let l=o||this.debugHold>0,u=s?0:e;this.time+=u,this.renderer.getDrawingBufferSize(this._size);let d=this._size.x,f=this._size.y;(d!==this._w||f!==this._h)&&(this._w=d,this._h=f,i.uRes.value.set(d,f)),this._aspect=d/Math.max(1,f),i.uAspect.value=this._aspect;let p=v[n.settings?.quality]||v.high,m=p.particles>=1?8:p.particles>=.7?6:5;m!==this.taps&&(this.taps=m,this.mat.defines.TAPS=m,this.mat.needsUpdate=!0),this.lens.resize(d,f,p.particles>=1?1/3:1/4);let h=x(n.settings?.cameraShake??1,0,1)*(P()?.35:1);if(l&&!s?this._sim(u,a,c):l||this._decayAll(e),this.force&&this.debugHold>0?Object.assign(r,this.force):this.force&&this.debugHold<=0&&(this.force=null),c&&c.alive,i.uTime.value=this.time,i.uSpeed.value=r.speed*h,i.uStretch.value=r.stretch*h,i.uPunch.value=x(r.punch,-.08,.08)*h,i.uBlast.value=r.blast*h,i.uBlastRing.value=A(r.blastT/.55)*.9,i.uChroma.value=Math.min(1.5,r.chroma)*h,i.uEdgeInk.value.w=r.edgeInk,i.uAura.value.w=r.aura*(.55+.45*h),i.uHeart.value.w=r.heart,i.uHurt.value=r.hurt,i.uUrgency.value.w=r.urg,i.uSwim.value.w=r.swim,i.uFocus.value=r.focus,i.uCharge.value.w=r.chargePulse*h,i.uShimmer.value.w=r.shimmer,i.uKill.value.w=r.kill*(.5+.5*h),i.uFlash.value.w=r.flash*(.3+.7*h),i.uDesat.value=r.desat,i.uSat.value=r.sat+r.satPop*.28,i.uFlood.value.w=r.flood,i.uFloodDrip.value=r.floodDrip,i.uHole.value=r.hole,c){let e=this._teamColor(c.team),t=this._teamColor(c.enemyTeam);i.uLensColA.value.copy(t),i.uLensColB.value.copy(e),i.uEdgeInk.value.set(t.r,t.g,t.b,r.edgeInk),T.copy(t).lerp(E.setRGB(.55,0,.04),.55),i.uHeart.value.set(T.r,T.g,T.b,r.heart),i.uAura.value.set(e.r*1.6,e.g*1.6,e.b*1.6,i.uAura.value.w),i.uSwim.value.set(e.r,e.g,e.b,r.swim),i.uSpeedTint.value.copy(e).lerp(k,.6),i.uKill.value.set(e.r*1.3,e.g*1.3,e.b*1.3,i.uKill.value.w),i.uShimmer.value.set(e.r+.3,e.g+.3,e.b+.3,r.shimmer),i.uCharge.value.set(e.r+.5,e.g+.5,e.b+.5,i.uCharge.value.w)}let g=this.lens.parts.length>0;i.uLensOn.value=g?1:0,g&&!t?._skipRender&&this.lens.render(this._aspect),this.stats.lensParts=this.lens.parts.length;let _=g||r.speed>.002||r.stretch>5e-4||Math.abs(r.punch)>4e-4||r.blast>.002||r.chroma>.004||r.edgeInk>.002||r.aura>.002||r.heart>.002||r.hurt>.002||r.urg>.002||r.swim>.002||r.focus>.002||r.chargePulse>.002||r.shimmer>.002||r.kill>.002||r.flash>.002||r.desat>.002||Math.abs(r.sat-1)>.002||r.satPop>.002||r.flood>.001;this.pass.enabled=_,this.stats.enabled=_}_decayAll(e){let t=this.s,n=Math.exp(-e*6);for(let e of[`speed`,`stretch`,`blast`,`chroma`,`edgeInk`,`aura`,`auraPulse`,`heart`,`hurt`,`urg`,`swim`,`focus`,`chargePulse`,`shimmer`,`kill`,`flash`,`desat`,`satPop`,`flood`])t[e]*=n,t[e]<.001&&(t[e]=0);t.punch*=n,t.punchV=0,t.sat=g(t.sat,1,6,e),t.hole=0,t.floodMode=null,this.lens.update(e,this._aspect),this.lens.parts.length}_sim(e,t,n){let r=this.G,i=this.s,a=!!(n&&n.alive),o=t?t.state:`playing`;i.dmgT>0&&(i.dmgT-=e,i.dmgT<=0&&(i.dmgAcc>0&&a&&this._damageSplat(i.dmgAcc,i.dmgAtk),i.dmgAcc=0,i.dmgAtk=null));let s=a?Math.hypot(n.vel.x,n.vel.z):0,c=a?n.anim.form:`kid`,l=c===`swim`||c===`climb`,u=l?x((s-6.5)/5.3,0,1)*.55:0,d=l?x((s-7)/4.8,0,1)*.045:0,f=a?n.superJumpState:null;if(f&&f.phase===`flight`){let e=x(f.t/(f.dur||1.2),0,1);u=.55+.45*Math.abs(Math.cos(e*Math.PI)),d=.06*(.4+.6*Math.abs(Math.cos(e*Math.PI)))}i.speed=g(i.speed,u,u>i.speed?5:3,e),i.stretch=g(i.stretch,d,4,e);let p=i.wasJump;if(i.wasJump=!!(f&&f.phase===`flight`),p&&!i.wasJump&&a&&this._land(n),f&&f.phase===`charge`?i.jumpCharge=Math.min(1,i.jumpCharge+e/.75):i.jumpCharge=Math.max(0,i.jumpCharge-e*3),i.swim=g(i.swim,a&&c===`swim`?1:0,7,e),a&&i.lastForm===`swim`&&c!==`swim`&&c!==`climb`&&(s>7||n.vel.y>4)&&i.emergeT<=0){i.emergeT=.6;let e=2+(Math.random()*3|0);for(let t=0;t<e;t++){let e=Math.random()<.5?M(.04,.3):M(.7,.96);this.lens.droplet(V,e,M(.03,.22),M(.008,.016),{slide:M(.05,.2),life:M(.45,.8)})}}i.emergeT-=e,i.lastForm=c;let m=a&&(n.onEnemy===void 0?n.grounded&&n.groundTeam===2&&!n.submerged:!!n.onEnemy);if(i.edgeInk=g(i.edgeInk,m?1:0,m?9:3,e),m&&s>.8&&(i.stepT-=e*(.6+s/3),i.stepT<=0)){i.stepT=M(.22,.4);let e=Math.random()<.5?M(.03,.34):M(.66,.97);this.lens.droplet(B,e,M(.02,.14),M(.012,.024),{slide:M(.1,.4),life:M(.6,1.1)})}let h=r.projectiles?.clouds;if(a&&h&&h.length)for(let t of h){let r=t.group?.position;if(!r)continue;let a=r.x-n.pos.x,o=r.z-n.pos.z;if(a*a+o*o<3.6*3.6&&t.t<t.dur){if(i.rainT-=e,i.rainT<=0){i.rainT=M(.05,.12);let e=t.team===n.team?V:B,r=Math.random(),a=M(.15,1);Math.abs(r-.5)<.16&&Math.abs(a-.5)<.2&&(r+=.3*Math.sign(r-.5||1)),this.lens.droplet(e,x(r,.02,.98),a,M(.008,.02),{slide:M(.02,.2),life:M(.5,1.1)})}break}}let v=a?x(n.hp/100,0,1):1,y=a?x((.5-v)/.38,0,1):0;if(i.hurt=g(i.hurt,y,4,e),y>0){let t=80+70*y;i.heartPh=(i.heartPh+e*t/60)%1;let n=i.heartPh;i.heart=y*(Math.exp(-(((n-.04)/.05)**2))+.7*Math.exp(-(((n-.24)/.055)**2)))}else i.heart=g(i.heart,0,6,e);let b=a&&!!n.specialActive;i.auraPulse=Math.max(0,i.auraPulse-e*1.4);let S=Math.max(b?.75:0,i.jumpCharge*.9,i.auraPulse*.9);i.aura=g(i.aura,S,S>i.aura?10:2.5,e);let C=a?n.weaponRunner:null,w=C&&C.charging?C.charge:0;i.focus=g(i.focus,w>0?.25+.75*w:0,8,e),w>=.999&&!i._fullCharge&&(i._fullCharge=!0,i.chargePulse=1),w<.999&&(i._fullCharge=!1),i.chargePulse=Math.max(0,i.chargePulse-e*2.4),i.shimmer=g(i.shimmer,a&&n.invuln>0&&o===`playing`?.7:0,5,e),i.urg=Math.max(o===`playing`&&t&&t.time<=10.2?i.urgBase:0,i.urg-e*1.6),o!==`playing`&&(i.urgBase=0);let T=o===`finish`?.45:i.floodMode&&i.floodMode!==`reveal`&&i.floodMode!==`fadeout`?.62:0;i.desat=g(i.desat,T,5,e),i.sat=g(i.sat,o===`finish`?.92:1,4,e),i.satPop=Math.max(0,i.satPop-e*2.2),i.kill=Math.max(0,i.kill-e*2.4),i.flash=Math.max(0,i.flash-e*(i.flash>.6?4.5:2.6)),i.chroma=Math.max(0,i.chroma-e*3.2),i.blast=Math.max(0,i.blast-e*2.4),i.blastT+=e;let E=Math.max(1,Math.ceil(16*e/.12)),D=e/E;for(let e=0;e<E;e++)i.punchV+=(-256*i.punch-32*i.punchV)*D,i.punch+=i.punchV*D;i.jumpCharge>0&&(i.punch=_(i.punch,-.012*i.jumpCharge,.2)),this._simFlood(e),this.lens.update(e,this._aspect)}_simFlood(e){let t=this.s;if(!t.floodMode){t.flood=Math.max(0,t.flood-e*2),t.hole=0;return}t.floodT+=e;let n=t.floodT;if(t.floodMode===`in`)n<.24?t.flood=j(n/.24):n<.5?t.flood=1:t.flood=_(1,.17,A((n-.5)/.8)),t.floodDrip=Math.min(.4,n<.5?.05:.05+(n-.5)*.08);else if(t.floodMode===`reveal`){t.flood=1,t.floodDrip=.05;let e=x((n-.1)/.72,0,1);t.hole=n<.1?1e-4:(e**1.7*.75+A(e)*.25)*1.32,n>.86&&(t.floodMode=null,t.flood=0,t.hole=0)}else t.floodMode===`fadeout`&&(t.flood=Math.max(0,t.flood-e*2.5),t.flood<=0&&(t.floodMode=null))}test(e,t={}){let n=this.s,r=this._local||this.G.match?.local||null;this.debugHold=t.hold??8;let i=r?r.team:0,a=this._teamColor(i),o=this._teamColor(1-i);switch(r||(this.U.uLensColA.value.copy(o),this.U.uLensColB.value.copy(a),this.U.uEdgeInk.value.set(o.r,o.g,o.b,0)),e){case`splat`:{let e=t.angle??Math.random()*S,n=this._edgePoint(e,t.inset??.05);this.lens.splat(B,t.x??n.x,t.y??n.y,t.size??.08,this._aspect,{life:t.life??2.2});break}case`damage`:this._damageSplat(t.amount??50,t.attacker||null),n.chroma=Math.min(1.2,n.chroma+.7),this._kickPunch(-.025);break;case`water`:this._startFlood(null,`water`);break;case`flood`:this.U.uFlood.value.set(o.r,o.g,o.b,0),this.U.uFloodClear.value=0,n.floodMode=`in`,n.floodT=t.t??0;break;case`reveal`:this.U.uFloodClear.value=0,this.U.uFlood.value.set(a.r,a.g,a.b,1),this.U.uHoleRim.value.copy(a).lerp(k,.55).multiplyScalar(1.6),n.floodMode=`reveal`,n.floodT=t.t??0,n.flood=1;break;case`blast`:this.U.uBlastPos.value.set(t.x??.5,t.y??.45),this.U.uPunchPos.value.copy(this.U.uBlastPos.value),this.U.uBlastColor.value.copy(a).lerp(k,.35),n.blast=t.amount??1,n.blastT=0,n.chroma=1,this._kickPunch(.02);break;case`jump`:n.flash=.5,n.chroma=1,n.speed=1,n.stretch=.06,this._kickPunch(-.04);break;case`land`:r?this._land(r):(this.U.uBlastPos.value.set(.5,.18),n.blast=.75,n.blastT=0,n.chroma=1,this._kickPunch(.045),n.flash=.35);break;case`speed`:n.speed=t.amount??.6,n.stretch=.045;break;case`heart`:n.hurt=t.amount??.8,n.heart=1,this.force={...this.force||{},hurt:t.amount??.8,heart:t.beat??.9};break;case`urgency`:n.urg=1,n.urgBase=.3;break;case`aura`:n.aura=.8,n.auraPulse=1,this.force={...this.force||{},aura:.8};break;case`kill`:n.kill=1,n.chroma=.3;break;case`edge`:n.edgeInk=1,this.force={...this.force||{},edgeInk:1};break;case`swim`:n.swim=1,this.force={...this.force||{},swim:1,speed:.55,stretch:.045};break;case`focus`:n.focus=1,n.chargePulse=1,this.force={...this.force||{},focus:1};break;case`urgencyHold`:this.force={...this.force||{},urg:t.amount??.8};break;case`rain`:for(let e=0;e<30;e++)this.lens.droplet(B,Math.random(),M(.1,1),M(.008,.02),{slide:M(.02,.2),life:M(.8,1.6)});break;case`clear`:this.reset(),this.force=null;break;default:console.warn(`[screenfx] unknown test`,e)}return e}dispose(){this.lens.dispose(),this.mat.dispose()}};export{W as ScreenFX};