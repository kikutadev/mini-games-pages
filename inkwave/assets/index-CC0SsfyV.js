const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./stubs-UQxurf4W.js","./three.module-CZjhBpWN.js","./props-BMyS5khO.js","./fxHooks-C6vgeqTv.js","./screenfx-CppRqF8p.js"])))=>i.map(i=>d[i]);
import{$ as e,B as t,C as n,D as r,E as i,F as a,G as o,H as s,I as c,J as l,K as u,M as d,N as f,O as p,P as m,Q as h,R as g,S as _,T as v,U as y,V as b,W as x,X as S,Y as C,Z as w,_ as T,_t as E,a as D,b as O,ct as ee,d as te,dt as ne,et as re,f as k,ft as A,g as ie,gt as j,h as ae,ht as M,i as oe,it as N,j as se,l as ce,lt as le,m as ue,mt as de,n as fe,ot as pe,p as me,pt as he,q as ge,r as _e,rt as ve,s as ye,st as be,t as xe,tt as Se,u as Ce,ut as we,v as Te,vt as Ee,w as De,x as Oe,y as ke,yt as Ae,z as P}from"./three.module-CZjhBpWN.js";var je=Object.defineProperty,Me=(e,t)=>{let n={};for(var r in e)je(n,r,{get:e[r],enumerable:!0});return t||je(n,Symbol.toStringTag,{value:`Module`}),n};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var F={renderer:null,scene:null,camera:null,settings:null,quality:null,level:null,paint:null,physics:null,fx:null,env:null,audio:null,music:null,hud:null,menus:null,input:null,match:null,actors:[],local:null,projectiles:null,teamColors:[null,null],teamHex:[`#ff8a14`,`#2f5bff`],time:0,mode:`boot`},Ne=new Map;function I(e,t){return Ne.has(e)||Ne.set(e,new Set),Ne.get(e).add(t),()=>Ne.get(e)?.delete(t)}function L(e,t){let n=Ne.get(e);if(n)for(let e of n)e(t)}var R=(e,t,n)=>e<t?t:e>n?n:e,z=(e,t,n)=>e+(t-e)*n,B=(e,t,n,r)=>z(e,t,1-Math.exp(-n*r)),Pe=(e,t,n)=>{let r=R((n-e)/(t-e),0,1);return r*r*(3-2*r)};function Fe(e,t){let n=t-e;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return n}function Ie(e,t,n,r){return e+Fe(e,t)*(1-Math.exp(-n*r))}function Le(e){let t=e>>>0;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var Re={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},ze=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Be=new u(-1,1,1,-1,0,1),Ve=new class extends D{constructor(){super(),this.setAttribute(`position`,new n([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new n([0,2,0,0,2,0],2))}},He=class{constructor(e){this._mesh=new P(Ve,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Be)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},Ue=class extends ze{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof N?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=A.clone(e.uniforms),this.material=new N({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new He(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},We=class extends ze{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},Ge=class extends ze{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Ke=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new M);this._width=n.width,this._height=n.height,t=new Ae(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:i}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ue(Re),this.copyPass.material.blending=0,this.clock=new te}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}We!==void 0&&(r instanceof We?n=!0:r instanceof Ge&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new M);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},qe=class extends ze{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new k}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},Je={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new k(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},Ye=class e extends ze{constructor(e,n=1,r,a){super(),this.strength=n,this.radius=r,this.threshold=a,this.resolution=e===void 0?new M(256,256):new M(e.x,e.y),this.clearColor=new k(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let o=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new Ae(o,s,{type:i}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new Ae(o,s,{type:i});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new Ae(o,s,{type:i});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),o=Math.round(o/2),s=Math.round(s/2)}let c=Je;this.highPassUniforms=A.clone(c.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new N({uniforms:this.highPassUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];o=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new M(1/o,1/s),o=Math.round(o/2),s=Math.round(s/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;let u=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=u,this.bloomTintColors=[new j(1,1,1),new j(1,1,1),new j(1,1,1),new j(1,1,1),new j(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=A.clone(Re.uniforms),this.blendMaterial=new N({uniforms:this.copyUniforms,vertexShader:Re.vertexShader,fragmentShader:Re.fragmentShader,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new k,this._oldClearAlpha=1,this._basic=new t,this._fsQuad=new He(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new M(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new N({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new M(.5,.5)},direction:{value:new M(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new N({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};Ye.BlurDirectionX=new M(1,0),Ye.BlurDirectionY=new M(0,1);var Xe={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},Ze=class extends ze{constructor(){super(),this.uniforms=A.clone(Xe.uniforms),this.material=new h({name:Xe.name,uniforms:this.uniforms,vertexShader:Xe.vertexShader,fragmentShader:Xe.fragmentShader}),this._fsQuad=new He(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},me.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Qe={name:`GTAOShader`,defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:`x`,SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new M},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new g},cameraProjectionMatrixInverse:{value:new g},cameraWorldMatrix:{value:new g},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new j(-1,-1,-1)},sceneBoxMax:{value:new j(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);
			if (depth >= 1.0) {
				discard;
				return;
			}
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},$e={name:`GTAODepthShader`,defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},et={name:`GTAOBlendShader`,uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function tt(t=5){let n=Math.floor(t)%2==0?Math.floor(t)+1:Math.floor(t),r=nt(n),i=r.length,a=new Uint8Array(i*4);for(let e=0;e<i;++e){let t=r[e],n=2*Math.PI*t/i,o=new j(Math.cos(n),Math.sin(n),0).normalize();a[e*4]=(o.x*.5+.5)*255,a[e*4+1]=(o.y*.5+.5)*255,a[e*4+2]=127,a[e*4+3]=255}let o=new T(a,n,n);return o.wrapS=e,o.wrapT=e,o.needsUpdate=!0,o}function nt(e){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),n=t*t,r=Array(n).fill(0),i=Math.floor(t/2),a=t-1;for(let e=1;e<=n;){if(i===-1&&a===t?(a=t-2,i=0):(a===t&&(a=0),i<0&&(i=t-1)),r[i*t+a]!==0){a-=2,i++;continue}else r[i*t+a]=e++;a++,i--}return r}var rt={name:`PoissonDenoiseShader`,defines:{SAMPLES:16,SAMPLE_VECTORS:it(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new M},cameraProjectionMatrixInverse:{value:new g},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function it(e,t,n){let r=at(e,t,n),i=`vec3[SAMPLES](`;for(let t=0;t<e;t++){let n=r[t];i+=`vec3(${n.x}, ${n.y}, ${n.z})${t<e-1?`,`:`)`}`}return i}function at(e,t,n){let r=[];for(let i=0;i<e;i++){let a=2*Math.PI*t*i/e,o=(i/(e-1))**n;r.push(new j(Math.cos(a),Math.sin(a),o))}return r}var ot=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,r,i,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,s=Math.floor(e+o),c=Math.floor(t+o),l=(3-Math.sqrt(3))/6,u=(s+c)*l,d=s-u,f=c-u,p=e-d,m=t-f,h,g;p>m?(h=1,g=0):(h=0,g=1);let _=p-h+l,v=m-g+l,y=p-1+2*l,b=m-1+2*l,x=s&255,S=c&255,C=this.perm[x+this.perm[S]]%12,w=this.perm[x+h+this.perm[S+g]]%12,T=this.perm[x+1+this.perm[S+1]]%12,E=.5-p*p-m*m;E<0?n=0:(E*=E,n=E*E*this._dot(this.grad3[C],p,m));let D=.5-_*_-v*v;D<0?r=0:(D*=D,r=D*D*this._dot(this.grad3[w],_,v));let O=.5-y*y-b*b;return O<0?i=0:(O*=O,i=O*O*this._dot(this.grad3[T],y,b)),70*(n+r+i)}noise3d(e,t,n){let r,i,a,o,s=(e+t+n)*(1/3),c=Math.floor(e+s),l=Math.floor(t+s),u=Math.floor(n+s),d=1/6,f=(c+l+u)*d,p=c-f,m=l-f,h=u-f,g=e-p,_=t-m,v=n-h,y,b,x,S,C,w;g>=_?_>=v?(y=1,b=0,x=0,S=1,C=1,w=0):g>=v?(y=1,b=0,x=0,S=1,C=0,w=1):(y=0,b=0,x=1,S=1,C=0,w=1):_<v?(y=0,b=0,x=1,S=0,C=1,w=1):g<v?(y=0,b=1,x=0,S=0,C=1,w=1):(y=0,b=1,x=0,S=1,C=1,w=0);let T=g-y+d,E=_-b+d,D=v-x+d,O=g-S+2*d,ee=_-C+2*d,te=v-w+2*d,ne=g-1+3*d,re=_-1+3*d,k=v-1+3*d,A=c&255,ie=l&255,j=u&255,ae=this.perm[A+this.perm[ie+this.perm[j]]]%12,M=this.perm[A+y+this.perm[ie+b+this.perm[j+x]]]%12,oe=this.perm[A+S+this.perm[ie+C+this.perm[j+w]]]%12,N=this.perm[A+1+this.perm[ie+1+this.perm[j+1]]]%12,se=.6-g*g-_*_-v*v;se<0?r=0:(se*=se,r=se*se*this._dot3(this.grad3[ae],g,_,v));let ce=.6-T*T-E*E-D*D;ce<0?i=0:(ce*=ce,i=ce*ce*this._dot3(this.grad3[M],T,E,D));let le=.6-O*O-ee*ee-te*te;le<0?a=0:(le*=le,a=le*le*this._dot3(this.grad3[oe],O,ee,te));let ue=.6-ne*ne-re*re-k*k;return ue<0?o=0:(ue*=ue,o=ue*ue*this._dot3(this.grad3[N],ne,re,k)),32*(r+i+a+o)}noise4d(e,t,n,r){let i=this.grad4,a=this.simplex,o=this.perm,s=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,l,u,d,f,p,m=(e+t+n+r)*s,h=Math.floor(e+m),g=Math.floor(t+m),_=Math.floor(n+m),v=Math.floor(r+m),y=(h+g+_+v)*c,b=h-y,x=g-y,S=_-y,C=v-y,w=e-b,T=t-x,E=n-S,D=r-C,O=w>T?32:0,ee=w>E?16:0,te=T>E?8:0,ne=w>D?4:0,re=T>D?2:0,k=E>D?1:0,A=O+ee+te+ne+re+k,ie=a[A][0]>=3?1:0,j=a[A][1]>=3?1:0,ae=a[A][2]>=3?1:0,M=a[A][3]>=3?1:0,oe=a[A][0]>=2?1:0,N=a[A][1]>=2?1:0,se=a[A][2]>=2?1:0,ce=a[A][3]>=2?1:0,le=a[A][0]>=1?1:0,ue=a[A][1]>=1?1:0,de=a[A][2]>=1?1:0,fe=a[A][3]>=1?1:0,pe=w-ie+c,me=T-j+c,he=E-ae+c,ge=D-M+c,_e=w-oe+2*c,ve=T-N+2*c,ye=E-se+2*c,be=D-ce+2*c,xe=w-le+3*c,Se=T-ue+3*c,Ce=E-de+3*c,we=D-fe+3*c,Te=w-1+4*c,Ee=T-1+4*c,De=E-1+4*c,Oe=D-1+4*c,ke=h&255,Ae=g&255,P=_&255,je=v&255,Me=o[ke+o[Ae+o[P+o[je]]]]%32,F=o[ke+ie+o[Ae+j+o[P+ae+o[je+M]]]]%32,Ne=o[ke+oe+o[Ae+N+o[P+se+o[je+ce]]]]%32,I=o[ke+le+o[Ae+ue+o[P+de+o[je+fe]]]]%32,L=o[ke+1+o[Ae+1+o[P+1+o[je+1]]]]%32,R=.6-w*w-T*T-E*E-D*D;R<0?l=0:(R*=R,l=R*R*this._dot4(i[Me],w,T,E,D));let z=.6-pe*pe-me*me-he*he-ge*ge;z<0?u=0:(z*=z,u=z*z*this._dot4(i[F],pe,me,he,ge));let B=.6-_e*_e-ve*ve-ye*ye-be*be;B<0?d=0:(B*=B,d=B*B*this._dot4(i[Ne],_e,ve,ye,be));let Pe=.6-xe*xe-Se*Se-Ce*Ce-we*we;Pe<0?f=0:(Pe*=Pe,f=Pe*Pe*this._dot4(i[I],xe,Se,Ce,we));let Fe=.6-Te*Te-Ee*Ee-De*De-Oe*Oe;return Fe<0?p=0:(Fe*=Fe,p=Fe*Fe*this._dot4(i[L],Te,Ee,De,Oe)),27*(l+u+d+f+p)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,r){return e[0]*t+e[1]*n+e[2]*r}_dot4(e,t,n,r,i){return e[0]*t+e[1]*n+e[2]*r+e[3]*i}},st=class t extends ze{constructor(e,t,n=512,r=512,a,o,c){super(),this.width=n,this.height=r,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=tt(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new Ae(this.width,this.height,{type:i}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new N({defines:Object.assign({},Qe.defines),uniforms:A.clone(Qe.uniforms),vertexShader:Qe.vertexShader,fragmentShader:Qe.fragmentShader,blending:0,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new s,this.normalMaterial.blending=0,this.pdMaterial=new N({defines:Object.assign({},rt.defines),uniforms:A.clone(rt.uniforms),vertexShader:rt.vertexShader,fragmentShader:rt.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new N({defines:Object.assign({},$e.defines),uniforms:A.clone($e.uniforms),vertexShader:$e.vertexShader,fragmentShader:$e.fragmentShader,blending:0}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new N({uniforms:A.clone(Re.uniforms),vertexShader:Re.vertexShader,fragmentShader:Re.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this.blendMaterial=new N({uniforms:A.clone(et.uniforms),vertexShader:et.vertexShader,fragmentShader:et.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this._fsQuad=new He(null),this._originalClearColor=new k,this.setGBuffer(a?a.depthTexture:void 0,a?a.normalTexture:void 0),o!==void 0&&this.updateGtaoMaterial(o),c!==void 0&&this.updatePdMaterial(c)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e===void 0?(this.depthTexture=new ke,this.depthTexture.format=Te,this.depthTexture.type=de,this.normalRenderTarget=new Ae(this.width,this.height,{minFilter:o,magFilter:o,type:i,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0):(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1);let n=this.normalTexture?1:0,r=this.depthTexture===this.normalTexture?`w`:`x`;this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=r,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=r,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=it(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,n,r){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case t.OUTPUT.Off:break;case t.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case t.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case t.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case t.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:n);break;case t.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case t.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:n);break;default:console.warn(`THREE.GTAOPass: Unknown output type.`)}}_renderPass(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r=t.clearColor||r,i=t.clearAlpha||i,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(e){(e.isPoints||e.isLine||e.isLine2)&&e.visible&&(e.visible=!1,t.push(e))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(t=64){let n=new ot,r=t*t*4,i=new Uint8Array(r);for(let e=0;e<t;e++)for(let r=0;r<t;r++){let a=e,o=r;i[(e*t+r)*4]=(n.noise(a,o)*.5+.5)*255,i[(e*t+r)*4+1]=(n.noise(a+t,o)*.5+.5)*255,i[(e*t+r)*4+2]=(n.noise(a,o+t)*.5+.5)*255,i[(e*t+r)*4+3]=(n.noise(a+t,o+t)*.5+.5)*255}let a=new T(i,t,t,w,he);return a.wrapS=e,a.wrapT=e,a.needsUpdate=!0,a}};st.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var ct=`1.0.0`,lt=[{id:`tangerine-cobalt`,a:`#ff8a14`,b:`#2f5bff`,names:[`Tangerine`,`Cobalt`]},{id:`bubblegum-mint`,a:`#ff3f9e`,b:`#18d48c`,names:[`Bubblegum`,`Mint`]},{id:`lemon-grape`,a:`#f2e312`,b:`#8a3cff`,names:[`Lemon`,`Grape`]},{id:`aqua-cherry`,a:`#10d2e6`,b:`#ff4150`,names:[`Aqua`,`Cherry`]},{id:`lime-magenta`,a:`#a6f01a`,b:`#e02cd8`,names:[`Lime`,`Magenta`]}],ut={id:`cb-yellow-blue`,a:`#ffd21a`,b:`#2a52ff`,names:[`Sun`,`Sea`]},dt=[`Alpha`,`Bravo`],V={hp:100,radius:.38,height:1.45,squidHeight:.55,runSpeed:6,squidDrySpeed:2.9,swimSpeed:11.8,enemyInkSpeed:1.9,climbSpeed:7.5,accelGround:42,accelAir:14,accelSwim:60,jumpVel:8.4,swimJumpVel:9.4,gravity:25,maxFall:40,inkMax:100,inkRefillSwim:42,inkRefillKid:9,inkRefillDelay:.9,enemyInkDps:20,enemyInkDamageCap:40,regenDelay:1.3,regenRate:22,regenRateSwim:60,respawnTime:5.5,spawnInvuln:1.6,fallDeathY:-1.45,waterY:-1.6,runAccel:70,runAccelIn:.5,runInKnee:1.6,runOutKnee:.28,runOutMin:.22,runDecel:58,runDecelMin:.4,runDecelKnee:2.2,reverseDecel:78,reverseAngle:2.2,turnRate:15,turnRateSlow:1.5,airAccel:20,airDecel:4,airMinSpeed:4.6,squidAccel:34,squidDecel:26,squidTurn:13,swimAccel:60,swimAccelIn:.55,swimDecel:30,swimTurn:9.5,swimOutKnee:.22,squidAirAccel:14,squidAirDecel:3,enemyInkDecel:30,enemyInkAccel:30,jumpBuffer:.13,coyoteTime:.12,fallGravityMul:1.2,apexGravityMul:.82,apexBand:1.6,hardLandSpeed:11.5,hardLandSlow:.72,hardLandTime:.16,footRadius:.24,stepUp:.35,stepDown:.45,squidStepUp:.24,squidBodyLift:.16,ledgeAssist:.35,faceOmega:20,faceMaxRate:12.5,faceMaxAcc:170,squidFaceOmega:26,squidFaceMaxRate:17,swimFaceMaxRate:14,squidFaceMaxAcc:260,aimFaceOmega:36,aimFaceMaxRate:24,aimFaceMaxAcc:380,climbAccel:46,climbSideSpeed:5.2,climbAttachDot:.5,climbDetachDot:-.45,ledgePopClear:.42,ledgePopCarry:2.5,emergeDelay:.07,fireBuffer:.16},ft={shooter:{id:`shooter`,name:`Spritzer`,kind:`shooter`,blurb:`Rapid-fire all-rounder. Sprays a steady stream of ink blobs.`,stats:{range:.5,damage:.45,rate:.85,mobility:.7,paint:.6},fireInterval:.1,damage:36,inkPerShot:.95,projSpeed:34,straightTime:.13,range:12.5,spreadGround:5.5,spreadAir:11,impactRadius:.85,trailRadius:.44,trailEvery:1.05,moveSpeedFiring:4.6,special:`slam`,specialCost:190},roller:{id:`roller`,name:`Swell Roller`,kind:`roller`,blurb:`Roll out wide stripes of turf. Flick for a crushing splash.`,stats:{range:.35,damage:.95,rate:.3,mobility:.55,paint:.95},rollSpeed:4.4,rollWidth:1.9,rollInkPerMeter:1.1,rollDamage:140,flickInterval:.62,flickWindup:.22,flickInk:9,flickDrops:9,flickDamageNear:125,flickDamageFar:30,flickSpeed:17,flickSpreadDeg:34,impactRadius:1,moveSpeedFiring:4.4,special:`slam`,specialCost:170},charger:{id:`charger`,name:`Glint Charger`,kind:`charger`,blurb:`Hold to charge, release for a long piercing line. Full charge splats.`,stats:{range:1,damage:1,rate:.25,mobility:.35,paint:.45},chargeTime:1,rangeMin:11,rangeMax:27,damageMin:40,damageMax:160,inkFull:18,lineSplatEvery:1.2,lineRadius:.55,impactRadius:1.2,moveSpeedFiring:1.8,special:`storm`,specialCost:180},blaster:{id:`blaster`,name:`Popper Blaster`,kind:`blaster`,blurb:`Slow shots that burst mid-air. Direct hits splat instantly.`,stats:{range:.55,damage:.9,rate:.3,mobility:.6,paint:.5},fireInterval:.78,directDamage:125,splashDamageMax:70,splashDamageMin:30,splashRadius:2.6,inkPerShot:9,projSpeed:23,range:10.5,impactRadius:1.5,burstRadius:1.9,moveSpeedFiring:4,special:`storm`,specialCost:180}},pt=[`shooter`,`roller`,`charger`,`blaster`],mt={bomb:{id:`bomb`,name:`Splat Bomb`,inkCost:70,throwSpeed:13.5,fuse:.95,radius:3.1,damageMax:180,damageMin:35,paintRadius:2.7}},ht={slam:{id:`slam`,name:`Tidal Slam`,blurb:`Leap up and slam down in a huge ink shockwave.`,rise:.55,hang:.25,radius:5.2,killRadius:3.2,damageMax:180,damageMin:55},storm:{id:`storm`,name:`Ink Tempest`,blurb:`Hurl a rain cloud that soaks the turf below.`,duration:6.5,radius:3.4,dps:34,throwSpeed:16,driftSpeed:1.1}},gt={durations:[90,180],defaultDuration:180,finalCountdown:10,teamSize:4,pointsPerM2:1},_t={easy:{id:`easy`,name:`Chill`,reaction:.55,aimError:.11,fireDiscipline:.55,awareness:16,aimOmega:9,aimTurn:7},normal:{id:`normal`,name:`Fresh`,reaction:.32,aimError:.06,fireDiscipline:.8,awareness:21,aimOmega:13,aimTurn:10},hard:{id:`hard`,name:`Fierce`,reaction:.17,aimError:.03,fireDiscipline:.95,awareness:26,aimOmega:18,aimTurn:14}},vt=[{id:`tidewater`,name:`Tidewater Plaza`,blurb:`A sun-bleached harbor plaza on the edge of the sea.`,theme:`day`},{id:`kelpline`,name:`Kelpline Terminal`,blurb:`Container yard with grate catwalks, a sunken trench and a steel gantry deck.`,theme:`day`},{id:`sunset`,name:`Tidewater at Dusk`,blurb:`Same plaza, golden hour. Lights coming on across the bay.`,theme:`sunset`,layout:`tidewater`}],yt=[`Squiddo`,`Blotch`,`Marlo`,`Inky Vee`,`Pip`,`Coral`,`Riptide`,`Nori`,`Suki`,`Zest`,`Kelp`,`Drip`,`Tako`,`Sprinkle`,`Bubbles`,`Moxie`,`Juno`,`Wasabi`,`Fizz`,`Loop`],bt={xpForLevel:e=>800+e*350,xpWin:1200,xpLose:500,xpPerTurfPoint:1,xpPerSplat:40},xt={sensitivity:1,padSensitivity:1,invertY:!1,fov:82,quality:`high`,shadows:!0,bloom:!0,cameraShake:1,showFps:!1,master:.8,music:.6,sfx:.85,colorblind:!1,minimap:!0,matchLength:180,difficulty:`normal`,rumble:1,aimAssist:1,aimAssistMouse:!1},St={low:{pixelRatio:.75,shadowSize:1024,msaa:0,bloom:!1,ao:!1,paintAtlas:2048,particles:.4},medium:{pixelRatio:1,shadowSize:2048,msaa:2,bloom:!0,ao:!1,paintAtlas:2048,particles:.7},high:{pixelRatio:1.5,shadowSize:4096,msaa:4,bloom:!0,ao:!0,paintAtlas:4096,particles:1},ultra:{pixelRatio:2,shadowSize:4096,msaa:4,bloom:!0,ao:!0,paintAtlas:4096,particles:1}},Ct={uniforms:{tDiffuse:{value:null},uSat:{value:1.08},uVib:{value:.12},uContrast:{value:1.07},uShadowTint:{value:new j(.975,.99,1.035)},uHighTint:{value:new j(1.025,1,.972)},uLift:{value:0},uVignette:{value:.22},uHurt:{value:0},uHurtColor:{value:new k(1,.2,.3)},uFlash:{value:0},uAspect:{value:1.7}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`
    uniform sampler2D tDiffuse; uniform float uSat; uniform float uVignette; uniform float uHurt; uniform vec3 uHurtColor; uniform float uFlash; uniform float uAspect;
    uniform float uVib; uniform float uContrast; uniform vec3 uShadowTint; uniform vec3 uHighTint; uniform float uLift;
    varying vec2 vUv;
    void main(){
      vec4 c = texture2D(tDiffuse, vUv);
      float l = dot(c.rgb, vec3(0.2126, 0.7152, 0.0722));
      // vibrance: muted colours gain saturation, already-saturated ones (team ink) barely move
      float mx = max(c.r, max(c.g, c.b)), mn = min(c.r, min(c.g, c.b));
      float chroma = (mx - mn) / max(mx, 1e-4);
      c.rgb = max(mix(vec3(l), c.rgb, uSat + uVib * (1.0 - smoothstep(0.1, 0.7, chroma))), 0.0);
      // contrast in log space around mid grey (keeps HDR highlights ordered), then a cool-shadow / warm-light split tone
      c.rgb = 0.18 * pow(max(c.rgb, vec3(1e-6)) / 0.18, vec3(uContrast)) + uLift;
      // split tone is for the world's neutrals: strongly saturated colours (team ink) keep their exact hue
      float lt = smoothstep(0.015, 0.55, l);
      c.rgb *= mix(vec3(1.0), mix(uShadowTint, uHighTint, lt), 1.0 - 0.85 * smoothstep(0.35, 0.8, chroma));
      vec2 q = (vUv - 0.5) * vec2(uAspect, 1.0);
      float r = length(q);
      float v = smoothstep(0.55, 1.25, r);
      c.rgb *= 1.0 - uVignette * v;
      // low health: the HUD draws the coloured edge; here we only drain saturation + darken the rim slightly
      float lum = dot(c.rgb, vec3(0.2126, 0.7152, 0.0722));
      c.rgb = mix(c.rgb, vec3(lum), uHurt * 0.45);
      c.rgb *= 1.0 - uHurt * 0.25 * smoothstep(0.4, 1.2, r);
      c.rgb += uFlash;
      gl_FragColor = c;
    }`};(function(){let e=xe.shadowmap_pars_fragment,t=/shadow = \(\s*texture\( shadowMap, vec3\( shadowCoord\.xy \+ vogelDiskSample\( 0, 5, phi \) \* radius, shadowCoord\.z \) \)[\s\S]*?\) \* 0\.2;/;if(!t.test(e)){console.warn(`[inkwave] shadow chunk layout changed; keeping stock PCF`);return}xe.shadowmap_pars_fragment=e.replace(t,`vec2 ts = texelSize * max( shadowRadius * 0.55, 0.6 );
				float s9 = 0.0;
				for ( int sx = -1; sx <= 1; sx ++ ) for ( int sy = -1; sy <= 1; sy ++ ) s9 += texture( shadowMap, vec3( shadowCoord.xy + vec2( float( sx ), float( sy ) ) * ts, shadowCoord.z ) );
				shadow = s9 * ( 1.0 / 9.0 );`)})();var wt=class{constructor(e,t){let n=this.renderer=new fe({antialias:!1,powerPreference:`high-performance`,stencil:!1});n.outputColorSpace=Se,n.toneMapping=7,n.toneMappingExposure=1,n.info.autoReset=!1,n.shadowMap.enabled=!0,n.shadowMap.type=1,n.setClearColor(10475760,1),e.appendChild(n.domElement),n.domElement.id=`game-canvas`,this.container=e,this.scene=null,this.camera=null,this.settings=t,this.q=St[t.quality]||St.high,this._w=0,this._h=0}setScene(e,t){this.scene=e,this.camera=t,this._buildComposer()}_buildComposer(){let e=this.renderer,t=this.q;this.composer&&(this.composer.renderTarget1.dispose(),this.composer.renderTarget2.dispose()),this.dynScale=this.dynScale||1;let n=Math.min(window.devicePixelRatio||1,t.pixelRatio)*this.dynScale;e.setPixelRatio(n);let r=window.innerWidth,a=window.innerHeight;e.setSize(r,a);let o=this.composer=new Ke(e,new Ae(r*n,a*n,{type:i,samples:t.msaa||0}));if(o.setPixelRatio(n),o.setSize(r,a),this.renderPass=new qe(this.scene,this.camera),o.addPass(this.renderPass),this.gtao=null,t.ao){let e=this.gtao=new st(this.scene,this.camera,r,a);e.output=st.OUTPUT.Default,e.blendIntensity=1,e.updateGtaoMaterial({radius:.75,distanceExponent:1.6,thickness:1,scale:1.15,samples:12,distanceFallOff:1}),e.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:6,rings:2,samples:16}),o.addPass(e)}this.bloom=new Ye(new M(r,a),.28,.45,2.4),this.bloom.enabled=!!(t.bloom&&this.settings.bloom),o.addPass(this.bloom),this.grade=new Ue(Ct),this._gradeSrc=null,o.addPass(this.grade),this.extraPass&&o.addPass(this.extraPass),o.addPass(new Ze),e.shadowMap.enabled=this.settings.shadows!==!1,this._w=r,this._h=a,this.grade.uniforms.uAspect.value=r/a}setExtraPass(e){this.extraPass=e,this.scene&&this._buildComposer()}applySettings(e){let t=this.q;this.settings=e,this.q=St[e.quality]||St.high;let n=this.renderer.shadowMap.enabled!==(e.shadows!==!1);(t!==this.q||n)&&(t!==this.q&&(this.dynScale=1),this._buildComposer(),this.scene?.traverse(e=>{e.material&&(Array.isArray(e.material)?e.material:[e.material]).forEach(e=>e.needsUpdate=!0)})),this.bloom&&(this.bloom.enabled=!!(this.q.bloom&&e.bloom))}setDynamicScale(e){if(e=Math.max(.75,Math.min(1,e)),Math.abs(e-this.dynScale)<.01)return;this.dynScale=e;let t=Math.min(window.devicePixelRatio||1,this.q.pixelRatio)*e;this.renderer.setPixelRatio(t),this.composer.setPixelRatio(t),this.composer.setSize(this._w,this._h)}resize(){let e=window.innerWidth,t=window.innerHeight;e===this._w&&t===this._h||(this._w=e,this._h=t,this.renderer.setSize(e,t),this.composer.setSize(e,t),this.gtao?.setSize(e,t),this.grade.uniforms.uAspect.value=e/t,this.camera&&(this.camera.aspect=e/t,this.camera.updateProjectionMatrix()))}render(){this.resize();let e=F.env&&F.env.grade;if(e&&e!==this._gradeSrc&&this.grade){this._gradeSrc=e;let t=this.grade.uniforms;for(let n of[`uSat`,`uVib`,`uContrast`,`uLift`,`uVignette`])e[n]!==void 0&&(t[n].value=e[n]);e.uShadowTint&&t.uShadowTint.value.set(...e.uShadowTint),e.uHighTint&&t.uHighTint.value.set(...e.uHighTint)}this.composer.render()}},Tt=class{constructor(e){this.canvas=e,this.keys=new Set,this.pressed=new Set,this.mouse={dx:0,dy:0,left:!1,right:!1,leftPressed:!1,rightPressed:!1},this.locked=!1,this.enabled=!0,this.pad=null,this.padPrev=[],this.padPressed=new Set,this.lastDevice=`kbm`,this.onKey=null,window.addEventListener(`keydown`,e=>{if(e.repeat){this.onKey&&this.onKey(e,!0);return}this.lastDevice=`kbm`,!(this.onKey&&this.onKey(e,!1))&&(this.keys.add(e.code),this.pressed.add(e.code),[`Tab`,`Space`,`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`].includes(e.code)&&this.locked&&e.preventDefault(),e.code===`Tab`&&e.preventDefault())}),window.addEventListener(`keyup`,e=>{this.keys.delete(e.code)}),window.addEventListener(`blur`,()=>{this.keys.clear(),this.mouse.left=this.mouse.right=!1}),window.addEventListener(`mousemove`,e=>{this.locked&&(this.mouse.dx+=e.movementX,this.mouse.dy+=e.movementY,this.lastDevice=`kbm`)}),window.addEventListener(`mousedown`,e=>{this.locked&&(e.button===0&&(this.mouse.left=!0,this.mouse.leftPressed=!0),e.button===2&&(this.mouse.right=!0,this.mouse.rightPressed=!0))}),window.addEventListener(`mouseup`,e=>{e.button===0&&(this.mouse.left=!1),e.button===2&&(this.mouse.right=!1)}),window.addEventListener(`contextmenu`,e=>e.preventDefault()),document.addEventListener(`pointerlockchange`,()=>{this.locked=document.pointerLockElement===this.canvas,this.locked||(this.mouse.left=this.mouse.right=!1,this.onUnlock?.())})}requestLock(){if(!this.locked)try{let e=this.canvas.requestPointerLock({unadjustedMovement:!0});e&&e.catch&&e.catch(()=>{try{let e=this.canvas.requestPointerLock();e&&e.catch&&e.catch(()=>{})}catch{}})}catch{}}exitLock(){document.pointerLockElement&&document.exitPointerLock()}down(e){return this.keys.has(e)}wasPressed(e){return this.pressed.has(e)}pollPad(){let e=navigator.getGamepads?navigator.getGamepads():[],t=null;for(let n of e)if(n&&n.connected&&n.mapping===`standard`){t=n;break}if(!t){for(let n of e)if(n&&n.connected){t=n;break}}if(this.pad=t,this.padPressed.clear(),!t)return;t.buttons.forEach((e,t)=>{let n=this.padPrev[t]||!1;e.pressed&&!n&&(this.padPressed.add(t),this.lastDevice=`pad`),this.padPrev[t]=e.pressed});let n=t.axes;(Math.abs(n[0])>.3||Math.abs(n[1])>.3||Math.abs(n[2])>.3||Math.abs(n[3])>.3)&&(this.lastDevice=`pad`)}padButton(e){return!!(this.pad&&this.pad.buttons[e]&&this.pad.buttons[e].pressed)}padValue(e){return this.pad&&this.pad.buttons[e]?this.pad.buttons[e].value:0}padAxis(e){if(!this.pad)return 0;let t=this.pad.axes[e]||0,n=.14;return Math.abs(t)<n?0:Math.sign(t)*(Math.abs(t)-n)/(1-n)}padStick(e,t,n,r=.12,i=.96,a=1){if(n.x=0,n.y=0,n.mag=0,!this.pad)return n;let o=this.pad.axes[e]||0,s=this.pad.axes[t]||0,c=Math.hypot(o,s);if(c<=r)return n;let l=Math.min(1,(c-r)/(i-r)),u=a===1?l:l**+a;return n.x=o/c*u,n.y=s/c*u,n.mag=u,n}rumble(e,t,n=60){let r=this.pad;if(!r||this.lastDevice!==`pad`)return;let i=F.settings?.rumble??1;if(!(i>0))return;let a=r.vibrationActuator;if(!a||!a.playEffect)return;let o=performance.now(),s=Math.max(e,t)*i;if(!(o<(this._rumbleUntil||0)&&s<(this._rumbleMag||0)*.95)){this._rumbleUntil=o+n,this._rumbleMag=s;try{let r=a.playEffect(`dual-rumble`,{startDelay:0,duration:Math.round(n),strongMagnitude:Math.min(1,e*i),weakMagnitude:Math.min(1,t*i)});r&&r.catch&&r.catch(()=>{})}catch{}}}endFrame(){this.pressed.clear(),this.mouse.dx=0,this.mouse.dy=0,this.mouse.leftPressed=!1,this.mouse.rightPressed=!1}},H={plain:0,deck:1,tiles:2,concrete:3,hazard:4,container:5,wood:6,metal:7,spawn:8,planter:9,asphalt:10,metalpanel:11,grate:12,brick:13,rubber:14,glasstile:15,pavers:16},U={deck:`#d8d2c4`,deckEdge:`#c9c1b0`,tile:`#d9dfe0`,cream:`#ece4d4`,sand:`#e6d3b3`,slate:`#a9b4bc`,stone:`#c7c2b8`,trim:`#8e98a0`,teal:`#8fb3b1`,rust:`#cf9c88`,mustard:`#dcc48e`,lav:`#b3abd0`,spawn:`#eae6de`,wood:`#c9a27c`,planter:`#b9ad9a`,white:`#f3f1ec`};function W(e,t,n,r,i,a,o={}){return{kind:`box`,min:[e,n,i],max:[t,r,a],...o}}function Et(e,t,n,r={}){return{kind:`ramp`,low:e,high:t,width:n,thickness:r.thickness??.6,...r}}var Dt={id:`tidewater`,bounds:{minX:-25,maxX:25,minZ:-44,maxZ:44},spawnPads:[[0,2.2,-39.2],[0,2.2,39.2]],spawnBarrier:4.2,single:[W(-21,21,-1.2,0,-44,44,{color:U.deck,pattern:H.deck}),W(-5,5,0,2.8,-5,5,{color:U.tile,pattern:H.tiles}),W(-1.6,1.6,2.8,3.8,-.45,.45,{color:U.cream,pattern:H.plain})],half:[W(-25,-21,-1.2,0,-44,6,{color:U.deckEdge,pattern:H.wood}),W(-25,-21,-1.2,0,14,44,{color:U.deckEdge,pattern:H.wood}),W(-25,-24.4,0,1.05,-43.4,6,{color:U.slate,pattern:H.metal}),W(-25,-24.4,0,1.05,14,43.4,{color:U.slate,pattern:H.metal}),W(-25,25,0,3.6,-44,-43.4,{color:U.cream,pattern:H.concrete,mural:[{n:[0,0,1],id:0}]}),W(-9,9,0,2.2,-43.4,-35,{color:U.spawn,pattern:H.spawn}),Et([-16,0,-39.2],[-9,2.2,-39.2],4.2,{color:U.stone,pattern:H.hazard}),Et([16,0,-39.2],[9,2.2,-39.2],4.2,{color:U.stone,pattern:H.hazard}),W(-9,-6.2,2.2,3,-35.6,-35,{color:U.cream,pattern:H.plain}),W(6.2,9,2.2,3,-35.6,-35,{color:U.cream,pattern:H.plain}),W(-22.2,-19.8,0,2.5,-33,-27,{color:U.teal,pattern:H.container,mural:[{n:[1,0,0],id:3},{n:[-1,0,0],id:3}]}),W(-22.2,-16.2,2.5,5,-30.6,-28.2,{color:U.rust,pattern:H.container,mural:[{n:[0,0,1],id:3},{n:[0,0,-1],id:3}]}),W(17.5,22,0,3.2,-40,-35,{color:U.sand,pattern:H.concrete,mural:[{n:[-1,0,0],id:2},{n:[0,0,1],id:2}]}),W(14,21,0,1.3,-30,-22,{color:U.stone,pattern:H.tiles}),Et([17.5,0,-16.5],[17.5,1.3,-22],3.6,{color:U.stone,pattern:H.hazard}),W(-7.2,-5.8,0,1.4,-27.8,-26.4,{color:U.wood,pattern:H.wood}),W(4.4,5.8,0,1.4,-25.2,-23.8,{color:U.wood,pattern:H.wood}),W(5.8,7.2,0,1.4,-25.2,-23.8,{color:U.wood,pattern:H.wood}),W(5.1,6.5,1.4,2.8,-25.2,-23.8,{color:U.wood,pattern:H.wood}),W(-10.2,-9.2,0,3,-23,-13,{color:U.cream,pattern:H.concrete,mural:[{n:[1,0,0],id:1},{n:[-1,0,0],id:1}]}),W(8,12.5,0,.9,-18.5,-15,{color:U.planter,pattern:H.planter,tag:`planter`}),W(-17,-12.5,0,.85,-20.2,-19.4,{color:U.stone,pattern:H.plain}),W(-21,-14,0,1.6,-8,8,{color:U.lav,pattern:H.tiles}),Et([-17.5,0,-13.5],[-17.5,1.6,-8],4,{color:U.stone,pattern:H.hazard}),W(-18.4,-17,1.6,2.8,1,2.4,{color:U.wood,pattern:H.wood}),Et([2.2,0,-12],[2.2,2.8,-5],3.6,{color:U.stone,pattern:H.hazard}),W(-10.4,-9,0,1.4,3,4.4,{color:U.wood,pattern:H.wood}),W(-10.4,-9,1.4,2.8,3,4.4,{color:U.wood,pattern:H.wood}),W(-10.4,-9,0,1.4,4.4,5.8,{color:U.wood,pattern:H.wood}),W(9.5,13,0,2.4,-2.2,-1.2,{color:U.cream,pattern:H.concrete})],decor:{lamps:[[-23.5,-42],[-23.5,-20],[-23.5,22],[23.5,2],[-12,-42],[12,-42]],palms:[[10.25,-16.75]],flags:[[-8.2,2.2,-42.6],[8.2,2.2,-42.6]]}},G={asphalt:`#9da3a9`,concrete:`#ddd6c8`,deck:`#b9c5d0`,steel:`#5f7592`,teal:`#5f9ea0`,rust:`#c47a5e`,navy:`#58668e`,mustard:`#d6ae52`,cream:`#e8dfcf`,spawn:`#e9e6df`,wood:`#c29a72`,trench:`#8f969c`,planter:`#b9ad9a`,pavers:`#d6c7ad`},Ot={tidewater:Dt,kelpline:{id:`kelpline`,bounds:{minX:-24,maxX:24,minZ:-48,maxZ:48},spawnPads:[[0,3.2,-44],[0,3.2,44]],spawnBarrier:4.2,single:[W(-24,24,-3,-2,-3,3,{color:G.trench,pattern:H.concrete}),W(-7,7,2,2.8,-7,7,{color:G.deck,pattern:H.metalpanel,noPaint:[[1,0,0],[-1,0,0]]}),W(-1.6,1.6,2.8,4.4,-1.6,1.6,{color:G.steel,pattern:H.metalpanel})],half:[W(-24,24,-1.2,0,-48,-3,{color:G.asphalt,pattern:H.asphalt}),W(-24,24,-3,-1.2,-3.8,-3,{color:G.asphalt,pattern:H.asphalt}),W(5.4,6.6,0,2,5.4,6.6,{color:G.steel,pattern:H.metalpanel}),W(-6.6,-5.4,0,2,5.4,6.6,{color:G.steel,pattern:H.metalpanel}),W(12,16,-.15,0,-3,3,{color:G.steel,pattern:H.grate,grate:!0}),Et([-9,-2,2.2],[-9,0,-3],3,{color:G.concrete,pattern:H.hazard}),W(-24,-23.4,0,1.05,-47.4,-3,{color:G.steel,pattern:H.metal}),W(-24,-23.4,0,1.05,3,47.4,{color:G.steel,pattern:H.metal}),W(-24,-23.4,-2,.2,-3,3,{color:G.steel,pattern:H.metal}),W(-24,24,0,4.2,-48,-47.4,{color:G.cream,pattern:H.concrete,mural:[{n:[0,0,1],id:0}]}),W(-10,10,0,3.2,-47.4,-40,{color:G.spawn,pattern:H.spawn}),Et([-18,0,-43.4],[-10,3.2,-43.4],4,{color:G.concrete,pattern:H.hazard}),Et([18,0,-43.4],[10,3.2,-43.4],4,{color:G.concrete,pattern:H.hazard}),W(-10,-7,3.2,4,-40.6,-40,{color:G.cream,pattern:H.concrete}),W(7,10,3.2,4,-40.6,-40,{color:G.cream,pattern:H.concrete}),W(-20,-17.6,0,2.6,-36,-30,{color:G.teal,pattern:H.container,mural:[{n:[1,0,0],id:3},{n:[-1,0,0],id:3}]}),W(12,18.1,0,2.6,-33,-30.56,{color:G.rust,pattern:H.container,mural:[{n:[0,0,1],id:3}]}),W(12.6,18.7,2.6,5.2,-33,-30.56,{color:G.navy,pattern:H.container,mural:[{n:[0,0,1],id:3}]}),W(-4,-2.6,0,1.4,-32,-30.6,{color:G.wood,pattern:H.wood}),W(2.6,4,0,1.4,-29,-27.6,{color:G.wood,pattern:H.wood}),W(2.6,4,1.4,2.8,-29,-27.6,{color:G.wood,pattern:H.wood}),W(-24,-15,0,2,-22,-8.6,{color:G.pavers,pattern:H.pavers}),Et([-19.5,0,-29],[-19.5,2,-22],4,{color:G.concrete,pattern:H.hazard}),W(-24,-23.6,2,2.95,-22,-8.6,{color:G.steel,pattern:H.metal}),W(-15,-6,1.85,2,-10.6,-8.6,{color:G.steel,pattern:H.grate,grate:!0}),W(-18.6,-17.2,2,3.2,-16,-14.6,{color:G.wood,pattern:H.wood}),W(-11,-6,0,1,-20,-19.4,{color:G.concrete,pattern:H.concrete}),W(4,9,0,1,-13.6,-13,{color:G.concrete,pattern:H.concrete}),W(-3,1,0,.8,-23,-20.5,{color:G.planter,pattern:H.planter,tag:`planter`}),W(15,21.1,0,2.6,-20,-17.56,{color:G.mustard,pattern:H.container,mural:[{n:[0,0,1],id:3},{n:[0,0,-1],id:3}]}),W(9,11.44,0,2.6,-26,-19.9,{color:G.teal,pattern:H.container,mural:[{n:[-1,0,0],id:3}]}),W(16,19,0,2.2,-9,-8,{color:G.cream,pattern:H.concrete,mural:[{n:[0,0,1],id:1},{n:[0,0,-1],id:1}]}),W(-14,-12.8,0,1.4,-8,-6.8,{color:G.wood,pattern:H.wood}),Et([-4,0,-16],[-4,2.8,-7],4,{color:G.concrete,pattern:H.hazard})],decor:{lamps:[[-23,-40],[-23,-25],[23,-12],[-8.5,-46.5],[8.5,-46.5]],palms:[[-1,-21.75]],flags:[[-9.2,3.2,-46.6],[9.2,3.2,-46.6]]}}},kt=new j,At=new j,jt=new j(0,1,0),Mt=class{constructor(e,t=[]){this.extra=t,this.layout=e,this.bounds=e.bounds,this.spawnPads=e.spawnPads.map(e=>new j(...e)),this.spawnBarrier=e.spawnBarrier,this.blocks=[],this.faces=[],this._stamp=1,this._build()}_build(){let e=this.layout,t=[...e.single,...e.half,...e.half.map(Nt),...this.extra.map(e=>({kind:`box`,min:e.min,max:e.max,paint:!1,hidden:!0,color:`#888888`}))];for(let e of t)this._addBlock(e);this._buildHash();for(let e of this.blocks)this._buildFaces(e)}_addBlock(e){let t={id:this.blocks.length,center:new j,half:new j,axes:[new j(1,0,0),new j(0,1,0),new j(0,0,1)],aabbMin:new j,aabbMax:new j,paint:e.paint!==!1&&!e.grate,solid:e.solid!==!1,color:new k(e.color||`#dddddd`),pattern:e.pattern??H.plain,tag:e.tag||null,mural:e.mural||null,noPaint:e.noPaint||null,grate:!!e.grate,hidden:!!e.hidden,bevel:e.bevel,faces:[-1,-1,-1,-1,-1,-1],aligned:!0};if(e.kind===`box`)t.center.set((e.min[0]+e.max[0])/2,(e.min[1]+e.max[1])/2,(e.min[2]+e.max[2])/2),t.half.set((e.max[0]-e.min[0])/2,(e.max[1]-e.min[1])/2,(e.max[2]-e.min[2])/2);else{let n=new j(...e.low),r=new j(...e.high),i=r.clone().sub(n),a=i.length();i.normalize();let o=new j(i.x,0,i.z).normalize(),s=new j().crossVectors(jt,o).normalize(),c=new j().crossVectors(i,s).normalize();c.y<0&&(c.negate(),s.negate());let l=c.y,u=r.y-n.y,d=Math.max(e.thickness,u*l+.35),f=.6,p=n.clone().addScaledVector(i,-f).clone().add(r).multiplyScalar(.5);t.center.copy(p).addScaledVector(c,-d/2),t.half.set(e.width/2,d/2,(a+f)/2),t.axes=[s,c,i],t.aligned=!1,new j().crossVectors(s,c).dot(i)<0&&t.axes[0].negate()}t.aabbMin.set(1/0,1/0,1/0),t.aabbMax.set(-1/0,-1/0,-1/0);for(let e=0;e<8;e++)kt.copy(t.center).addScaledVector(t.axes[0],(e&1?1:-1)*t.half.x).addScaledVector(t.axes[1],(e&2?1:-1)*t.half.y).addScaledVector(t.axes[2],(e&4?1:-1)*t.half.z),t.aabbMin.min(kt),t.aabbMax.max(kt);this.blocks.push(t)}_buildHash(){let e=this.hashCell=4,t=this.bounds;this.hx0=t.minX-8,this.hz0=t.minZ-8,this.hw=Math.ceil((t.maxX-t.minX+16)/e),this.hd=Math.ceil((t.maxZ-t.minZ+16)/e),this.hash=Array.from({length:this.hw*this.hd},()=>[]),this.blockStamp=new Uint32Array(this.blocks.length);for(let e of this.blocks){let t=this._hxi(e.aabbMin.x),n=this._hxi(e.aabbMax.x),r=this._hzi(e.aabbMin.z),i=this._hzi(e.aabbMax.z);for(let a=r;a<=i;a++)for(let r=t;r<=n;r++)this.hash[a*this.hw+r].push(e.id)}}_hxi(e){return Math.max(0,Math.min(this.hw-1,Math.floor((e-this.hx0)/this.hashCell)))}_hzi(e){return Math.max(0,Math.min(this.hd-1,Math.floor((e-this.hz0)/this.hashCell)))}queryBlocks(e,t,n,r,i){i.length=0;let a=++this._stamp,o=this._hxi(e),s=this._hxi(n),c=this._hzi(t),l=this._hzi(r);for(let e=c;e<=l;e++)for(let t=o;t<=s;t++){let n=this.hash[e*this.hw+t];for(let e=0;e<n.length;e++){let t=n[e];this.blockStamp[t]!==a&&(this.blockStamp[t]=a,i.push(t))}}return i}pointInBlock(e,t,n=0){return At.copy(t).sub(e.center),Math.abs(At.dot(e.axes[0]))<e.half.x+n&&Math.abs(At.dot(e.axes[1]))<e.half.y+n&&Math.abs(At.dot(e.axes[2]))<e.half.z+n}pointInside(e,t=0,n=-1){let r=this.queryBlocks(e.x-.01,e.z-.01,e.x+.01,e.z+.01,this._qtmp||=[]);for(let i of r){if(i===n)continue;let r=this.blocks[i];if(r.solid&&this.pointInBlock(r,e,t))return!0}return!1}_buildFaces(e){if(e.hidden)return;let t=e.axes,n=[e.half.x,e.half.y,e.half.z];for(let r=0;r<3;r++)for(let i of[1,-1]){let a=t[r].clone().multiplyScalar(i);if(a.y<-.5&&e.center.y-n[1]<.5)continue;let o=[0,1,2].filter(e=>e!==r),s,c;Math.abs(a.y)<.5?(c=Math.abs(t[o[0]].y)>Math.abs(t[o[1]].y)?o[0]:o[1],s=o[0]===c?o[1]:o[0]):(s=Math.abs(t[o[0]].x)>=Math.abs(t[o[1]].x)?o[0]:o[1],c=o[0]===s?o[1]:o[0]);let l=t[c].clone();Math.abs(a.y)<.5?l.y<0&&l.negate():l.z<0&&Math.abs(l.z)>.3&&l.negate();let u=new j().crossVectors(l,a),d=2*n[s],f=2*n[c],p=e.center.clone().addScaledVector(a,n[r]).addScaledVector(u,-d/2).addScaledVector(l,-f/2),m={id:this.faces.length,block:e.id,n:a,u,v:l,origin:p,su:d,sv:f,wall:Math.abs(a.y)<.3,turf:a.y>.7,ceiling:a.y<-.5,paintable:e.paint&&a.y>-.5,pattern:e.pattern,color:e.color,groundedBottom:!1,atlas:null,grid:-1,nu:0,nv:0};if(!this._faceHidden(m)){if(m.mural=-1,e.mural)for(let t of e.mural)a.x*t.n[0]+a.y*t.n[1]+a.z*t.n[2]>.9&&(m.mural=t.id);if(e.noPaint)for(let t of e.noPaint)a.x*t[0]+a.y*t[1]+a.z*t[2]>.9&&(m.paintable=!1);m.wall&&(kt.copy(p).addScaledVector(u,d/2).addScaledVector(l,-.06).addScaledVector(a,.06),m.groundedBottom=this.pointInside(kt,0,e.id)||kt.y<.02),e.faces[r*2+(i>0?0:1)]=m.id,this.faces.push(m)}}}_faceHidden(e){let t=Math.max(2,Math.ceil(e.su/1.25)),n=Math.max(2,Math.ceil(e.sv/1.25));for(let r=0;r<=n;r++)for(let i=0;i<=t;i++){let a=Math.min(e.su-.05,Math.max(.05,i/t*e.su)),o=Math.min(e.sv-.05,Math.max(.05,r/n*e.sv));if(kt.copy(e.origin).addScaledVector(e.u,a).addScaledVector(e.v,o).addScaledVector(e.n,.03),!this.pointInside(kt,0,e.block))return!1}return!0}layoutLightmap(e=5,t=1024,n=2){let r=this.faces.filter(e=>!this.blocks[e.block].grate).map(t=>({f:t,w:Math.ceil(t.su*e)+n*2,h:Math.ceil(t.sv*e)+n*2}));r.sort((e,t)=>t.h-e.h||t.w-e.w||e.f.id-t.f.id);let i=0,a=0,o=0;for(let s of r)i+s.w>t&&(i=0,a+=o,o=0),s.f.light={x:i,y:a,ppm:e,pad:n},i+=s.w,o=Math.max(o,s.h);this.lightSize=t,this.lightUsed=a+o;let s=2166136261;for(let e of this.faces)for(let t of[e.origin.x,e.origin.y,e.origin.z,e.su,e.sv])s^=Math.round(t*100),s=Math.imul(s,16777619)>>>0;return this.layoutHash=(s>>>0).toString(16),this.lightUsed<=t}buildGeometry(e,t=e=>!e.grate){let r={pos:[],nor:[],col:[],puv:[],luv:[],fuv:[],fdat:[],fflag:[],ftan:[],idx:[]},i=this.lightSize||1,a=new k,o=new j,s=new j,c=new j,l=new j,u=(e,t,n)=>e.faces[t*2+(n>0?0:1)],d=this;function f(t,n,o){let s=r.pos.length/3;r.pos.push(n.x,n.y,n.z),r.nor.push(o.x,o.y,o.z),a.copy(t.color),r.col.push(a.r,a.g,a.b),l.copy(n).sub(t.origin);let c=l.dot(t.u),u=l.dot(t.v);return t.atlas?r.puv.push((t.atlas.x+t.atlas.pad+c*t.atlas.ppm)/e,(t.atlas.y+t.atlas.pad+u*t.atlas.ppm)/e):r.puv.push(0,0),t.light?r.luv.push((t.light.x+t.light.pad+c*t.light.ppm)/i,(t.light.y+t.light.pad+u*t.light.ppm)/i):r.luv.push(-1,-1),r.fuv.push(c,u),r.fdat.push(t.pattern,t.atlas?1:0,t.su,t.sv),r.fflag.push(t.wall?1:0,t.groundedBottom?1:0,t.mural),r.ftan.push(t.u.x,t.u.y,t.u.z),s}let p=new j,m=new j,h=new j;function g(e,t,n,i){let a=r.pos;p.set(a[t*3]-a[e*3],a[t*3+1]-a[e*3+1],a[t*3+2]-a[e*3+2]),m.set(a[n*3]-a[e*3],a[n*3+1]-a[e*3+1],a[n*3+2]-a[e*3+2]),h.crossVectors(p,m),h.dot(i)>=0?r.idx.push(e,t,n):r.idx.push(e,n,t)}for(let e of this.blocks){if(!e.solid&&!e.render||!t(e))continue;let n=e.axes,r=[e.half.x,e.half.y,e.half.z],i=Math.min(r[0],r[1],r[2]),a=Math.min(e.bevel??Math.max(.04,Math.min(.13,i*.14)),i*.45),p=new Map,m=(t,i,o,s)=>{if(a<.01)return!1;let f=t<o?`${t}${i}${o}${s}`:`${o}${s}${t}${i}`;if(p.has(f))return p.get(f);let m=u(e,t,i)>=0&&u(e,o,s)>=0;if(m){let a=3-t-o;for(let u=-1;u<=1;u+=.25)if(c.copy(e.center).addScaledVector(n[t],i*r[t]).addScaledVector(n[o],s*r[o]).addScaledVector(n[a],u*r[a]*.98),l.copy(c).addScaledVector(n[t],i*.04).addScaledVector(n[o],s*.04),d.pointInside(l,0,e.id)){m=!1;break}}return p.set(f,m),m};for(let t=0;t<3;t++)for(let i of[1,-1]){let s=u(e,t,i);if(s<0)continue;let l=this.faces[s],[d,p]=[0,1,2].filter(e=>e!==t),h=m(t,i,d,1)?a:0,_=m(t,i,d,-1)?a:0,v=m(t,i,p,1)?a:0,y=m(t,i,p,-1)?a:0,b=c.copy(e.center).addScaledVector(n[t],i*r[t]).clone(),x=(e,t)=>{let i=e>0?r[d]-h:-(r[d]-_),a=t>0?r[p]-v:-(r[p]-y);return f(l,o.copy(b).addScaledVector(n[d],i).addScaledVector(n[p],a),l.n)},S=x(-1,-1),C=x(1,-1),w=x(1,1),T=x(-1,1);g(S,C,w,l.n),g(S,w,T,l.n)}if(!(a<.01)){for(let t=0;t<3;t++)for(let i=t+1;i<3;i++)for(let l of[1,-1])for(let d of[1,-1]){if(!m(t,l,i,d))continue;let p=3-t-i,h=this.faces[u(e,t,l)],_=this.faces[u(e,i,d)],v=n[t].clone().multiplyScalar(l),y=n[i].clone().multiplyScalar(d),b=n=>u(e,p,n)>=0&&m(p,n,t,l)&&m(p,n,i,d)?a:0,x=-r[p]+b(-1),S=r[p]-b(1),C=c.copy(e.center).addScaledVector(v,r[t]-a).addScaledVector(y,r[i]-a).clone();for(let e of[0,1]){let t=e?_:h,r=[];for(let i=0;i<=2;i++){let c=Math.PI/4*(e+i/2);s.copy(v).multiplyScalar(Math.cos(c)).addScaledVector(y,Math.sin(c));let l=f(t,o.copy(C).addScaledVector(n[p],x).addScaledVector(s,a),s),u=f(t,o.copy(C).addScaledVector(n[p],S).addScaledVector(s,a),s);r.push([l,u,s.clone()])}for(let e=0;e<2;e++){let[t,n,i]=r[e],[a,o]=r[e+1];g(t,n,o,i),g(t,o,a,i)}}}for(let t of[1,-1])for(let i of[1,-1])for(let l of[1,-1]){let d=[t,i,l];if(!(m(0,t,1,i)&&m(0,t,2,l)&&m(1,i,2,l)))continue;let p=n[0].clone().multiplyScalar(t),h=n[1].clone().multiplyScalar(i),_=n[2].clone().multiplyScalar(l),v=c.copy(e.center).addScaledVector(p,r[0]-a).addScaledVector(h,r[1]-a).addScaledVector(_,r[2]-a).clone(),y=0,b=-2;[p,h,_].forEach((e,t)=>{e.y>b&&(b=e.y,y=t)});let x=this.faces[u(e,y,d[y])],S=[];for(let e=0;e<=3;e++){S.push([]);for(let t=0;t<=3-e;t++){let n=3-e-t;s.set(0,0,0).addScaledVector(p,e).addScaledVector(h,t).addScaledVector(_,n).normalize(),S[e].push(f(x,o.copy(v).addScaledVector(s,a),s))}}let C=p.clone().add(h).add(_).normalize();for(let e=0;e<3;e++)for(let t=0;t<3-e;t++)g(S[e][t],S[e+1][t],S[e][t+1],C),t<3-e-1&&g(S[e+1][t],S[e+1][t+1],S[e][t+1],C)}}}let _=new D;return _.setAttribute(`position`,new n(r.pos,3)),_.setAttribute(`normal`,new n(r.nor,3)),_.setAttribute(`color`,new n(r.col,3)),_.setAttribute(`paintUv`,new n(r.puv,2)),_.setAttribute(`lightUv`,new n(r.luv,2)),_.setAttribute(`faceUv`,new n(r.fuv,2)),_.setAttribute(`faceData`,new n(r.fdat,4)),_.setAttribute(`faceFlags`,new n(r.fflag,3)),_.setAttribute(`faceTan`,new n(r.ftan,3)),_.setIndex(r.idx),_.computeBoundingSphere(),this.renderTris=r.idx.length/3,_}groundHeight(e,t,n=50){let r=-1/0,i=this.queryBlocks(e-.01,t-.01,e+.01,t+.01,this._qtmp2||=[]);for(let a of i){let i=this.blocks[a];if(!i.solid)continue;let o=i.axes[1];if(o.y<.5)continue;let s=kt.copy(i.center).addScaledVector(o,i.half.y),c=s.y-(o.x*(e-s.x)+o.z*(t-s.z))/o.y;At.set(e,c-.01,t),c<=n&&c>r&&this.pointInBlock(i,At,.001)&&(r=c)}return r}};function Nt(e){let t=e.mural?e.mural.map(e=>({...e,n:[-e.n[0],e.n[1],-e.n[2]]})):void 0,n=e.noPaint?e.noPaint.map(e=>[-e[0],e[1],-e[2]]):void 0;return e.kind===`box`?{...e,mural:t,noPaint:n,min:[-e.max[0],e.min[1],-e.max[2]],max:[-e.min[0],e.max[1],-e.min[2]]}:{...e,mural:t,noPaint:n,low:[-e.low[0],e.low[1],-e.low[2]],high:[-e.high[0],e.high[1],-e.high[2]]}}Math.PI*2;var Pt=6e3,Ft=16,It=new j;function Lt(e,t){return 1+.12*Math.sin(3*e+t*6.2831)+.08*Math.sin(5*e+t*17)+.05*Math.sin(7*e+t*41)+.03*Math.sin(11*e+t*73)+.018*Math.sin(17*e+t*29)+.17*Math.max(Math.cos(e-t*37.7),0)**28+.12*Math.max(Math.cos(e-t*53.3-2.1),0)**36}var Rt=1.5,zt=`
attribute vec2 aPos;
attribute vec3 aLocal;
attribute vec4 aSplat;
attribute vec3 aStretch;
attribute vec2 aGrow;
varying vec3 vLocal;
varying vec4 vSplat;
varying vec3 vStretch;
varying vec2 vGrow;
void main() {
  vLocal = aLocal; vSplat = aSplat; vStretch = aStretch; vGrow = aGrow;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`,Bt=`
precision highp float;
varying vec3 vLocal;
varying vec4 vSplat;
varying vec3 vStretch;
varying vec2 vGrow;
float hsh(float n) { return fract(sin(n) * 43758.5453123); }
float wob(float a, float s) {
  return 1.0 + 0.12 * sin(3.0 * a + s * 6.2831) + 0.08 * sin(5.0 * a + s * 17.0) + 0.05 * sin(7.0 * a + s * 41.0)
    + 0.03 * sin(11.0 * a + s * 73.0) + 0.018 * sin(17.0 * a + s * 29.0)
    + 0.17 * pow(max(cos(a - s * 37.7), 0.0), 28.0) + 0.12 * pow(max(cos(a - s * 53.3 - 2.1), 0.0), 36.0);
}
float smin(float a, float b, float k) { float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0); return mix(b, a, h) - k * h * (1.0 - h); }
void main() {
  float R = vSplat.x, team = vSplat.y, seed = vSplat.z, isWall = vSplat.w;
  float dn = vLocal.z;
  float r2 = R * R - dn * dn;
  if (r2 <= 0.0) discard;
  float r = sqrt(r2);
  float fall = clamp(r / max(R, 1e-3), 0.0, 1.0);        // 1 on the face the blob hit, smaller on faces it grazes
  vec2 p0 = vLocal.xy;                                   // metres from the splat centre in face space
  vec2 dir = vStretch.xy; float sa = vStretch.z;
  vec2 p = p0;
  if (sa > 0.0) {                                        // shots: smeared forward along the travel direction
    float a = dot(p, dir); vec2 perp = p - a * dir;
    float s = a > 0.0 ? 1.0 + sa : 1.0 + 0.25 * sa;
    p = perp + dir * (a / s);
  }
  float sd = length(p) - r * wob(atan(p.y, p.x), seed);   // main blob — same edge as the CPU gameplay grid
  // satellite droplets (thrown forward for shots, all round for blasts), streaked along their flight line
  float dirAng = sa > 0.0 ? atan(dir.y, dir.x) : 0.0;
  float spread = mix(6.2831, 2.4, clamp(sa * 1.2, 0.0, 1.0));
  for (int k = 0; k < 8; k++) {
    float fk = float(k);
    float h1 = hsh(seed * 13.1 + fk * 7.7), h2 = hsh(seed * 5.3 + fk * 3.1), h3 = hsh(seed * 9.9 + fk * 1.7);
    float a2 = sa > 0.0 ? dirAng + (h1 - 0.5) * spread : h1 * 6.2831;
    vec2 u = vec2(cos(a2), sin(a2));
    float dist = r * (1.08 + 0.8 * h2 * h2);
    float rad = r * (0.028 + 0.085 * h3) * fall * (1.0 - 0.4 * h2);
    vec2 q = p - u * dist;
    float el = 1.0 + (0.5 + 1.6 * sa) * h2;             // further = faster = longer streak
    q -= u * dot(q, u) * (1.0 - 1.0 / el);
    sd = smin(sd, length(q) - rad, rad * 0.8);
  }
  // drips running down walls: meandering stream + bulbous teardrop tip, still running while vGrow.x < 1
  if (isWall > 0.5 && fall > 0.3) {
    float dT = vGrow.x;
    for (int k = 0; k < 5; k++) {
      float fk = float(k);
      float h1 = hsh(seed * 3.7 + fk * 11.3), h2 = hsh(seed * 8.1 + fk * 2.9), h3 = hsh(seed * 4.3 + fk * 5.9);
      if (k > 1 && h3 < 0.3) continue;
      float x = (h1 * 2.0 - 1.0) * r * 0.7;
      float c = sqrt(max(1.0 - (x / r) * (x / r), 0.0));
      float yTop = -c * r * 0.75;
      float len = c * r * 0.25 + r * (0.2 + 1.45 * h2 * h2) * fall * dT;
      float w = r * (0.05 + 0.045 * h3);
      vec2 q = p0 - vec2(x, yTop);
      float ty = clamp(-q.y / max(len, 1e-4), 0.0, 1.0);
      q.x += sin(q.y / r * 11.0 + seed * 20.0 + fk * 2.3) * w * 0.3 * ty;
      float stream = max(abs(q.x) - w * (1.0 - 0.35 * ty), max(q.y, -len - q.y));
      vec2 tq = (q - vec2(0.0, -len + w * 0.35)) * vec2(1.0, 0.82);
      float bulb = length(tq) - w * (1.3 + 0.35 * h2) * (0.55 + 0.45 * dT);
      sd = smin(sd, smin(stream, bulb, w * 0.9), w * 1.3);
    }
  }
  float fw = max(fwidth(sd), 1e-5);
  float a = 1.0 - smoothstep(-1.5 * fw, 1.5 * fw, sd);
  if (a <= 0.002) discard;
  gl_FragColor = vec4(team < 0.5 ? 1.0 : 0.0, team < 0.5 ? 0.0 : 1.0, hsh(seed * 1.73), a);
}`,Vt=class{constructor(e,t,{atlasSize:n=4096,maxDensity:r=30,cell:i=.25}={}){this.renderer=e,this.level=t,this.size=n,this.cell=i,this.pad=8,this._layout(r),this._initGrid(),this._initGPU(),this._q=[],this.growing=[],this.version=0,this.clock=0,this.fresh=Array.from({length:Ft},()=>new E(0,-999,0,0)),this.freshT=new Float32Array(Ft).fill(-99),this._freshI=0}_layout(e){let t=this.level.faces.filter(e=>e.paintable);this.paintFaces=t;let n=this.size,r=e;for(let e=0;e<30&&!this._tryPack(t,r,n);e++)r*=.92;this.ppm=r}_tryPack(e,t,n){let r=this.pad,i=e.map(e=>({f:e,w:Math.ceil(e.su*t)+r*2,h:Math.ceil(e.sv*t)+r*2}));i.sort((e,t)=>t.h-e.h);let a=0,o=0,s=0;for(let e of i){if(e.w>n||(a+e.w>n&&(a=0,o+=s,s=0),o+e.h>n))return!1;e.x=a,e.y=o,a+=e.w,s=Math.max(s,e.h)}for(let e of i)e.f.atlas={x:e.x,y:e.y,w:e.w,h:e.h,ppm:t,pad:r};return this.usedHeight=o+s,!0}_initGrid(){let e=0,t=this.level,n=new j;for(let t of this.paintFaces)t.nu=Math.max(1,Math.round(t.su/this.cell)),t.nv=Math.max(1,Math.round(t.sv/this.cell)),t.cu=t.su/t.nu,t.cv=t.sv/t.nv,t.grid=e,e+=t.nu*t.nv;this.grid=new Uint8Array(e),this.dead=new Uint8Array(e),this.turfTotal=0,this.turfArea=0,this.counts=[0,0];for(let e of this.paintFaces)for(let r=0;r<e.nv;r++)for(let i=0;i<e.nu;i++){n.copy(e.origin).addScaledVector(e.u,(i+.5)*e.cu).addScaledVector(e.v,(r+.5)*e.cv).addScaledVector(e.n,.06);let a=e.grid+r*e.nu+i;t.pointInside(n,0,e.block)?this.dead[a]=1:e.turf&&(this.turfTotal++,this.turfArea+=e.cu*e.cv)}}_initGPU(){let e=this.size;this.rt=new Ae(e,e,{type:he,format:w,minFilter:c,magFilter:a,generateMipmaps:!0,depthBuffer:!1,stencilBuffer:!1}),this.texture=this.rt.texture,this.texture.anisotropy=Math.min(8,this.renderer.capabilities.getMaxAnisotropy());let t=new D;this.aPos=new Float32Array(Pt*4*2),this.aLocal=new Float32Array(Pt*4*3),this.aSplat=new Float32Array(Pt*4*4),this.aStretch=new Float32Array(Pt*4*3),this.aGrow=new Float32Array(Pt*4*2);let n=new Uint32Array(Pt*6);for(let e=0;e<Pt;e++)n.set([e*4,e*4+1,e*4+2,e*4,e*4+2,e*4+3],e*6);let r=(e,t)=>{let n=new oe(e,t);return n.setUsage(Oe),n};t.setAttribute(`aPos`,r(this.aPos,2)),t.setAttribute(`aLocal`,r(this.aLocal,3)),t.setAttribute(`aSplat`,r(this.aSplat,4)),t.setAttribute(`aStretch`,r(this.aStretch,3)),t.setAttribute(`aGrow`,r(this.aGrow,2)),t.setAttribute(`position`,new oe(new Float32Array(Pt*4*3),3)),t.setIndex(new oe(n,1)),t.boundingSphere=new pe(new j,1e9),this.geo=t,this.mat=new N({vertexShader:zt,fragmentShader:Bt,transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendEquation:100,blendEquationAlpha:104,blendSrc:204,blendDst:205,blendSrcAlpha:201,blendDstAlpha:201,toneMapped:!1}),this.mesh=new P(t,this.mat),this.mesh.frustumCulled=!1,this.scene=new ve,this.scene.add(this.mesh),this.cam=new u(-1,1,1,-1,0,1),this.quads=0,this.clear()}clear(){let e=this.renderer,t=e.getRenderTarget(),n=e.getClearColor(new k),r=e.getClearAlpha();e.setRenderTarget(this.rt),e.setClearColor(0,0),e.clear(!0,!1,!1),e.setRenderTarget(t),e.setClearColor(n,r),this.grid.fill(0),this.counts[0]=this.counts[1]=0,this.quads=0,this.growing&&(this.growing.length=0),this.freshT&&this.freshT.fill(-99),this.version++}splat(e,t,n,r={}){let i=r.seed??Math.random(),a=t*3.2,o=this.level.queryBlocks(e.x-a,e.z-a,e.x+a,e.z+a,this._qb||=[]),s=0,c=r.stretch,l=c?r.stretchAmt??1:0,u=[],d=!1;for(let r of o){let o=this.level.blocks[r];if(!(e.x<o.aabbMin.x-a||e.x>o.aabbMax.x+a||e.y<o.aabbMin.y-a||e.y>o.aabbMax.y+a||e.z<o.aabbMin.z-a||e.z>o.aabbMax.z+a))for(let r=0;r<6;r++){let a=o.faces[r];if(a<0)continue;let f=this.level.faces[a];if(!f.atlas)continue;It.copy(e).sub(f.origin);let p=It.dot(f.n);if(p>t||p<-.12)continue;let m=It.dot(f.u),h=It.dot(f.v),g=Math.sqrt(Math.max(0,t*t-p*p)),_=g*(2.05+1.4*l);if(m<-_||m>f.su+_||h<-_-(f.wall?g*1.9:0)||h>f.sv+_)continue;let v=0,y=0,b=0;if(c){v=c.dot(f.u),y=c.dot(f.v);let e=Math.hypot(v,y);e>.2?(v/=e,y/=e,b=l*e):v=y=0}s+=this._cpuSplat(f,m,h,g,n,i,v,y,b),u.push(f,m,h,p,v,y,b),f.wall&&g>t*.3&&(d=!0)}}if(u.length){for(let r=this.growing.length-1;r>=0;r--){let i=this.growing[r];if(i.team===n)continue;let a=i.cx-e.x,o=i.cy-e.y,s=i.cz-e.z,c=i.R*(i.dripDur?3:2.1)+t*2.1;a*a+o*o+s*s<c*c&&(this._emitGrowth(i,1,1),this.growing.splice(r,1))}if(r.instant)this._emitGrowth({entries:u,R:t,team:n,seed:i},1,1);else{let r=.07+Math.min(.2,t*.075);this.growing.push({entries:u,R:t,team:n,seed:i,age:0,dur:r,dripDur:d?.45+Math.min(.55,t*.5):0,cx:e.x,cy:e.y,cz:e.z})}if(t>=.25){let n=this._freshI;this._freshI=(n+1)%Ft,this.fresh[n].set(e.x,e.y,e.z,t*1.35),this.freshT[n]=this.clock}}return s}_emitGrowth(e,t,n=1){let r=1-(1-t)**3,i=e.R*(.3+.7*r),a=n>=1?1:1-(1-n)**2,o=e.entries;for(let t=0;t<o.length;t+=7){let n=o[t],r=o[t+1],s=o[t+2],c=o[t+3],l=o[t+4],u=o[t+5],d=o[t+6];if(c>=i)continue;let f=Math.sqrt(i*i-c*c);this._pushQuad(n,r,s,c,i,f,f*(2.05+1.4*d),e.team,e.seed,l,u,d,a)}}_cpuSplat(e,t,n,r,i,a,o,s,c){if(r<=.02)return 0;let l=i+1,u=r*(1+c)*Rt,d=Math.max(0,Math.floor((t-u)/e.cu)),f=Math.min(e.nu-1,Math.floor((t+u)/e.cu)),p=Math.max(0,Math.floor((n-u)/e.cv)),m=Math.min(e.nv-1,Math.floor((n+u)/e.cv));if(f<d||m<p)return 0;let h=0,g=e.cu*e.cv;for(let u=p;u<=m;u++)for(let p=d;p<=f;p++){let d=(p+.5)*e.cu-t,f=(u+.5)*e.cv-n;if(c>0){let e=d*o+f*s,t=d-e*o,n=f-e*s,r=e>0?1+c:1+.25*c;d=t+e/r*o,f=n+e/r*s}let m=Math.hypot(d,f);if(m>r*Rt||m/(r*Lt(Math.atan2(f,d),a))>.97)continue;let _=e.grid+u*e.nu+p,v=this.grid[_];v!==l&&(this.grid[_]=l,h+=g,e.turf&&!this.dead[_]&&(v&&this.counts[v-1]--,this.counts[i]++))}return h>0&&this.version++,h}_pushQuad(e,t,n,r,i,a,o,s,c,l,u,d,f=1){this.quads>=Pt&&this._drawQuads();let p=e.atlas,m=this.size,h=(p.pad-.5)/p.ppm,g=Math.max(-h,t-o),_=Math.min(e.su+h,t+o),v=Math.max(-h,n-o-(e.wall?a*1.9:0)),y=Math.min(e.sv+h,n+o);if(_<=g||y<=v)return;let b=this.quads++,x=[[g,v],[_,v],[_,y],[g,y]];for(let a=0;a<4;a++){let o=x[a][0],h=x[a][1],g=b*4+a,_=p.x+p.pad+o*p.ppm,v=p.y+p.pad+h*p.ppm;this.aPos[g*2]=_/m*2-1,this.aPos[g*2+1]=v/m*2-1,this.aLocal[g*3]=o-t,this.aLocal[g*3+1]=h-n,this.aLocal[g*3+2]=r,this.aSplat[g*4]=i,this.aSplat[g*4+1]=s,this.aSplat[g*4+2]=c,this.aSplat[g*4+3]=e.wall?1:0,this.aStretch[g*3]=l,this.aStretch[g*3+1]=u,this.aStretch[g*3+2]=d,this.aGrow[g*2]=f,this.aGrow[g*2+1]=0}}flush(e=1/60){this.clock+=e;for(let t=0;t<this.growing.length;t++){let n=this.growing[t];n.age+=e;let r=Math.min(1,n.age/n.dur),i=n.dripDur?Math.min(1,n.age/n.dripDur):1;this._emitGrowth(n,r,i),r>=1&&i>=1&&(this.growing[t]=this.growing[this.growing.length-1],this.growing.pop(),t--)}this._drawQuads()}_drawQuads(){if(!this.quads)return;let e=this.geo,t=this.quads*4;for(let n of[`aPos`,`aLocal`,`aSplat`,`aStretch`,`aGrow`]){let r=e.attributes[n];r.clearUpdateRanges(),r.addUpdateRange(0,t*r.itemSize),r.needsUpdate=!0}e.setDrawRange(0,this.quads*6);let n=this.renderer,r=n.getRenderTarget(),i=n.autoClear;n.autoClear=!1,n.setRenderTarget(this.rt),n.render(this.scene,this.cam),n.setRenderTarget(r),n.autoClear=i,this.quads=0}sample(e,t,n){if(e<0)return 0;let r=this.level.faces[e];if(!r.atlas)return 0;let i=Math.min(r.nu-1,Math.max(0,Math.floor(t/r.cu))),a=Math.min(r.nv-1,Math.max(0,Math.floor(n/r.cv)));return this.grid[r.grid+a*r.nu+i]}sampleWorld(e,t){if(e<0)return 0;let n=this.level.faces[e];return It.copy(t).sub(n.origin),this.sample(e,It.dot(n.u),It.dot(n.v))}coverage(){return[this.counts[0]/this.turfTotal,this.counts[1]/this.turfTotal]}regionStats(e,t,n,r,i,a={own:0,enemy:0,empty:0,n:0}){a.own=a.enemy=a.empty=a.n=0;let o=this.level.queryBlocks(e-r,n-r,e+r,n+r,this._qr||=[]),s=i+1;for(let i of o){let o=this.level.blocks[i];for(let i=0;i<6;i++){let c=o.faces[i];if(c<0)continue;let l=this.level.faces[c];if(!l.turf||!l.atlas||Math.abs(l.origin.y-t)>2.5)continue;It.set(e,t,n).sub(l.origin);let u=It.dot(l.u),d=It.dot(l.v),f=Math.max(0,Math.floor((u-r)/l.cu)),p=Math.min(l.nu-1,Math.floor((u+r)/l.cu)),m=Math.max(0,Math.floor((d-r)/l.cv)),h=Math.min(l.nv-1,Math.floor((d+r)/l.cv));for(let e=m;e<=h;e+=2)for(let t=f;t<=p;t+=2){let n=(t+.5)*l.cu-u,i=(e+.5)*l.cv-d;if(n*n+i*i>r*r)continue;let o=l.grid+e*l.nu+t;if(this.dead[o])continue;let c=this.grid[o];a.n++,c===s?a.own++:c?a.enemy++:a.empty++}}}return a.n&&(a.own/=a.n,a.enemy/=a.n,a.empty/=a.n),a}dispose(){this.rt.dispose(),this.geo.dispose(),this.mat.dispose()}},Ht=Me({TEXLIB_GLSL:()=>$t,TEXLIB_MODE:()=>Ut,createTextureLibrary:()=>en}),Ut={plain:0,grid:1,hex:2},{plain:Wt,grid:Gt,hex:Kt}=Ut,qt=`
in vec3 position;
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
`,Jt=`
precision highp float;
precision highp int;
uniform vec2 uRes;
uniform float uScale;
uniform int uMat;
uniform int uOne;   // = 1: non-constant trip counts, so drivers keep loops rolled (short cold compile)
uniform vec2 uHRange;  // height range (m) mapped to orm.a 0..1
uniform float uAO;     // depth-occlusion strength
layout(location = 0) out vec4 oAlb;   // -> albedo (sRGB attachment, hardware-encoded)
layout(location = 1) out vec4 oNrm;
layout(location = 2) out vec4 oOrm;
#define PI 3.14159265
#define TAU 6.28318531
struct S { vec3 alb; float a; float h; float cav; float rough; float metal; };
struct Req { vec2 x; ivec2 per; int oct; float gain; uint seed; };   // fbm request
struct WReq { vec2 uv; ivec2 n; float jit; uint seed; };            // worley request
float PX; // metres per sub-sample step (half a texel): the AA width unit

uint pcg(uint v) { uint s = v * 747796405u + 2891336453u; uint w = ((s >> ((s >> 28u) + 4u)) ^ s) * 277803737u; return (w >> 22u) ^ w; }
uint hu(ivec2 p, uint s) { return pcg((uint(p.x) * 0x8da6b343u) ^ (uint(p.y) * 0xd8163841u) ^ (s * 0xcb1ab31fu)); }
float hf(ivec2 p, uint s) { return float(hu(p, s) >> 8u) * (1.0 / 16777216.0); }
vec2 hf2(ivec2 p, uint s) { uint a = hu(p, s); return vec2(float(a >> 8u), float(pcg(a) >> 8u)) * (1.0 / 16777216.0); }
// float wrap: integer % by a non-constant divisor is emulated in software and bloats driver compile time
ivec2 wrp(ivec2 i, ivec2 n) { vec2 fi = vec2(i), fn = vec2(n); return ivec2(fi - fn * floor((fi + 0.5) / fn)); }
vec3 lin(vec3 c) { return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c)); }
vec2 gr(uint h) { return vec2(float(h & 0xffffu), float(h >> 16u)) * (1.0 / 32767.5) - 1.0; }

// periodic gradient noise ~[-1,1]; x in lattice units, n = period in lattice cells
float gn(vec2 x, ivec2 n, uint s) {
  ivec2 i = ivec2(floor(x)); vec2 f = x - vec2(i);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float v0 = dot(gr(hu(wrp(i, n), s)), f);
  float v1 = dot(gr(hu(wrp(i + ivec2(1, 0), n), s)), f - vec2(1.0, 0.0));
  float v2 = dot(gr(hu(wrp(i + ivec2(0, 1), n), s)), f - vec2(0.0, 1.0));
  float v3 = dot(gr(hu(wrp(i + ivec2(1, 1), n), s)), f - vec2(1.0, 1.0));
  return 1.6 * mix(mix(v0, v1, u.x), mix(v2, v3, u.x), u.y);
}
float fbmR(Req r) {
  float sum = 0.0, amp = 1.0, nrm = 0.0; vec2 x = r.x; ivec2 per = r.per;
  for (int o = 0; o < r.oct * uOne; o++) { sum += amp * gn(x, per, r.seed + uint(o) * 1013u); nrm += amp; amp *= r.gain; x *= 2.0; per *= 2; }
  return nrm > 0.0 ? sum / nrm : 0.0;
}
// periodic worley on the tile: n cells per repeat; returns (F1, F2, id of nearest, id of 2nd) in cell units
vec4 worR(WReq q) {
  if (q.n.x == 0) return vec4(0.0);
  vec2 x = q.uv * vec2(q.n); ivec2 i = ivec2(floor(x)); vec2 f = x - vec2(i);
  float F1 = 9.0, F2 = 9.0, id = 0.0, id2 = 0.0;
  for (int y = -uOne; y <= uOne; y++) for (int xx = -uOne; xx <= uOne; xx++) {
    ivec2 c = ivec2(xx, y); ivec2 w = wrp(i + c, q.n);
    vec2 o = vec2(c) + 0.5 + (hf2(w, q.seed) - 0.5) * q.jit;
    float d = length(o - f);
    if (d < F1) { F2 = F1; F1 = d; id2 = id; id = hf(w, q.seed + 7u); } else if (d < F2) { F2 = d; }
  }
  return vec4(F1, F2, id, id2);
}
// request builders: FB = periodic fbm over the repeat (f0 cells), FNP = aperiodic fbm on explicit coords
Req FB(vec2 uv, ivec2 f0, int oct, float gain, uint s) { return Req(uv * vec2(f0), f0, oct, gain, s); }
Req FNP(vec2 x, int oct, uint s) { return Req(x, ivec2(4096), oct, 0.5, s); }
WReq WO(vec2 uv, ivec2 n, float jit, uint s) { return WReq(uv, n, jit, s); }

float aa(float edge, float x) { return smoothstep(edge - PX * 0.75, edge + PX * 0.75, x); }
float jd(float x, float p) { return abs(x - p * floor(x / p + 0.5)); }
float sdRB(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
// joint + rounded arris profile. e = distance from the joint centre line (m), jw = half joint width,
// r = rounding width, de = drop at the arris, dj = joint depth. returns (height, jointMask)
vec2 edgeProf(float e, float jw, float r, float de, float dj) {
  float t = clamp(1.0 - (e - jw) / r, 0.0, 1.0);
  float hE = -de * (1.0 - sqrt(max(1.0 - t * t, 0.0)));
  float inJ = 1.0 - aa(jw, e);
  return vec2(mix(hE, -dj, inJ), inJ);
}
`,Yt=`
// Surface evaluation at 2x2 sub-samples per texel (rotated into one rolled loop, so the whole material pipeline
// exists once in the binary): box-filtered albedo/ORM, normal from the sub-sample height gradient.
void main() {
  PX = uScale / (2.0 * uRes.x);   // AA width unit: half a texel
  vec3 alb = vec3(0.0); float alpha = 0.0, cav = 0.0, rough = 0.0, metal = 0.0; float hs[4];
  for (int k = 0; k < 4 * uOne; k++) {
    vec2 uv = (gl_FragCoord.xy + (vec2(k & 1, k >> 1) - 0.5) * 0.5) / uRes;
    vec2 P = uv * uScale;
    Req f[4]; WReq w[2];
    for (int q = 0; q < 4; q++) f[q] = Req(vec2(0.0), ivec2(1), 0, 0.5, 0u);
    w[0] = WReq(vec2(0.0), ivec2(0), 0.0, 0u); w[1] = w[0];
    PREP_SWITCH
    float n[4]; vec4 c[2];
    for (int q = 0; q < 4 * uOne; q++) n[q] = fbmR(f[q]);
    for (int q = 0; q < 2 * uOne; q++) c[q] = worR(w[q]);
    S s; s.alb = vec3(0.8); s.a = 1.0; s.h = 0.0; s.cav = 1.0; s.rough = 0.8; s.metal = 0.0;
    SURF_SWITCH
    alb += max(s.alb, vec3(0.0)); alpha += clamp(s.a, 0.0, 1.0);
    cav += clamp(s.cav, 0.0, 1.0) * (1.0 - uAO * clamp(-s.h / -uHRange.x, 0.0, 1.0));
    rough += clamp(s.rough, 0.02, 1.0); metal += clamp(s.metal, 0.0, 1.0);
    hs[k] = s.h;
  }
  float dx = (hs[1] - hs[0] + hs[3] - hs[2]) / (2.0 * PX);
  float dy = (hs[2] - hs[0] + hs[3] - hs[1]) / (2.0 * PX);
  float h = (hs[0] + hs[1] + hs[2] + hs[3]) * 0.25;
  oAlb = vec4(alb * 0.25, alpha * 0.25);
  oNrm = vec4(normalize(vec3(-dx, -dy, 1.0)) * 0.5 + 0.5, 1.0);
  oOrm = vec4(cav * 0.25, rough * 0.25, metal * 0.25, clamp((h - uHRange.x) / (uHRange.y - uHRange.x), 0.0, 1.0));
}
`,Xt=`vec2 uv, vec2 P, inout Req f[4], inout WReq w[2]`,Zt=`vec2 uv, vec2 P, float n[4], vec4 c[2], inout S s`,Qt=[{name:`concrete`,detail:1,scale:4,tint:!0,alpha:!1,mode:Gt,sym:7,hr:[-.004,8e-4],ao:.5,prep:`f[0] = FB(uv, ivec2(3), 5, 0.55, 11u); f[1] = FB(uv, ivec2(8), 3, 0.5, 19u); f[2] = FB(uv, ivec2(24), 3, 0.5, 23u);
  w[0] = WO(uv, ivec2(64), 0.8, 37u);`,surf:`
  // 2 x 2 m cast panels: hairline seams, per-pour tone, one form-tie hole per panel, sparse bug-hole pores
  ivec2 pan = wrp(ivec2(floor(P / 2.0)), ivec2(2));
  float dSeam = min(jd(P.x, 2.0), jd(P.y, 2.0));
  float seam = 1.0 - aa(0.003, dSeam);
  float seamSoft = 1.0 - smoothstep(0.0, 0.045, dSeam);
  float mott = n[0], cloud = n[1], fine = n[2];
  float tone = 1.0 + 0.07 * (hf(pan, 5u) - 0.5);
  vec3 col = vec3(0.805) * tone * (1.0 + 0.09 * mott + 0.05 * cloud + 0.025 * fine);
  float rh = length(mod(P, 2.0) - 1.0);
  float hole = 1.0 - aa(0.011, rh);
  float ring = (1.0 - aa(0.02, rh)) * (1.0 - hole);
  vec4 wc = c[0];
  float pr = wc.x * (4.0 / 64.0);
  float pore = step(0.975, wc.z) * (1.0 - smoothstep(0.003 + 0.004 * fract(wc.z * 13.7), 0.0045 + 0.004 * fract(wc.z * 13.7) + PX, pr));
  col *= (1.0 - 0.07 * pore) * (1.0 - 0.10 * hole) * (1.0 - 0.12 * seam) * (1.0 - 0.035 * seamSoft) * (1.0 + 0.02 * ring);
  s.alb = col;
  s.h = 0.00035 * mott + 0.0001 * fine - 0.0015 * pore - 0.0032 * hole - 0.0008 * seam + 0.0001 * ring;
  s.rough = 0.78 + 0.07 * mott - 0.04 * cloud + 0.04 * (hf(pan, 9u) - 0.5);
  s.cav = 1.0 - 0.3 * hole - 0.2 * pore - 0.25 * seam;`},{name:`pavers`,detail:.9,scale:4,tint:!0,alpha:!1,mode:Gt,sym:7,hr:[-.008,.001],ao:.55,prep:`f[0] = FB(uv, ivec2(6), 4, 0.5, 17u); f[1] = FB(uv, ivec2(3), 3, 0.5, 29u); w[0] = WO(uv, ivec2(240), 1.0, 31u);`,surf:`
  // 2 x 2 m plaza slabs, 15 mm joints, rounded arrises, per-slab tone + micro tilt, fine aggregate speckle
  ivec2 cell = ivec2(floor(P / 2.0));
  ivec2 cw = wrp(cell, ivec2(2));
  vec2 lp = P - (vec2(cell) * 2.0 + 1.0);
  float e = -sdRB(lp, vec2(1.0), 0.016);
  vec2 pr = edgeProf(e, 0.0075, 0.016, 0.0045, 0.0075);
  float inJ = pr.y;
  float hid = hf(cw, 3u), hid2 = hf(cw, 11u);
  vec2 tilt = hf2(cw, 9u) - 0.5;
  float mott = n[0], cloud = n[1];
  float grain = smoothstep(0.05, 0.2, c[0].y - c[0].x) * (c[0].z - 0.5);
  vec3 col = vec3(0.84) * (1.0 + 0.2 * (hid - 0.5)) * (1.0 + 0.07 * mott + 0.05 * cloud + 0.1 * grain);
  float arris = clamp(1.0 - (e - 0.0075) / 0.016, 0.0, 1.0) * (1.0 - inJ);
  float grime = (1.0 - smoothstep(0.0, 0.06, e - 0.0075)) * (1.0 - inJ);   // soft dirt band hugging the joints
  col *= (1.0 - 0.06 * arris) * (1.0 - 0.09 * grime * (0.7 + 0.3 * cloud));
  col = mix(col, vec3(0.42) * (1.0 + 0.1 * mott), inJ);
  s.alb = col;
  s.h = pr.x + dot(tilt, lp) * 0.0012 * (1.0 - inJ) + 0.00015 * mott + 0.00005 * grain;
  s.rough = mix(0.7 + 0.12 * hid2 + 0.06 * mott + 0.05 * grime, 0.95, inJ);
  s.cav = mix(1.0, 0.5, inJ) * (1.0 - 0.1 * grime);`},{name:`tiles`,detail:.15,scale:2,tint:!0,alpha:!1,mode:Gt,sym:7,hr:[-.003,6e-4],ao:.5,prep:`ivec2 cw = wrp(ivec2(floor(P / 0.5)), ivec2(4));
  f[0] = FB(uv, ivec2(12), 1, 0.5, 41u + uint(cw.x * 4 + cw.y) * 131u); f[1] = FB(uv, ivec2(8), 3, 0.5, 13u); f[2] = FB(uv, ivec2(96), 2, 0.5, 7u);`,surf:`
  // 0.5 m glazed ceramic tiles, 9 mm grout, cushion edges, per-tile tone / gloss / glaze wave
  ivec2 cell = ivec2(floor(P / 0.5));
  ivec2 cw = wrp(cell, ivec2(4));
  vec2 lp = P - (vec2(cell) * 0.5 + 0.25);
  float e = -sdRB(lp, vec2(0.25), 0.007);
  vec2 pr = edgeProf(e, 0.0045, 0.006, 0.0014, 0.0026);
  float inG = pr.y;
  float hid = hf(cw, 3u), hid2 = hf(cw, 5u);
  float wave = n[0], mott = n[1];
  float edgeTone = 1.0 - smoothstep(0.0, 0.035, e - 0.0045);
  vec3 col = vec3(0.84) * (1.0 + 0.07 * (hid - 0.5) + 0.015 * mott) * (1.0 - 0.05 * edgeTone);
  vec3 grout = vec3(0.6) * (1.0 + 0.06 * n[2]);
  s.alb = mix(col, grout, inG);
  s.h = pr.x + (0.00022 * wave + 0.00004 * mott) * (1.0 - inG);
  s.rough = mix(0.18 + 0.08 * hid2 + 0.03 * mott, 0.9, inG);
  s.cav = mix(1.0, 0.6, inG);`},{name:`asphalt`,detail:.4,scale:2,tint:!0,alpha:!1,mode:Kt,sym:7,hr:[-.0014,8e-4],ao:.45,prep:`f[0] = FB(uv, ivec2(4), 4, 0.5, 13u); f[1] = FB(uv, ivec2(64), 2, 0.5, 7u);
  w[0] = WO(uv, ivec2(150), 1.0, 41u); w[1] = WO(uv, ivec2(360), 1.0, 53u);`,surf:`
  // fine aggregate in binder, sparse light stones, very low contrast
  vec4 wc = c[0], w2 = c[1];
  float stone = smoothstep(0.06, 0.24, wc.y - wc.x);
  float light = step(0.9, wc.z);
  float st = mix(0.76 + 0.16 * fract(wc.z * 7.13), 1.05, light);
  float big = n[0];
  float binder = 0.63 + 0.05 * n[1];
  float grit = smoothstep(0.05, 0.25, w2.y - w2.x) * (fract(w2.z * 5.31) - 0.5);
  float worn = smoothstep(-0.2, 0.5, big);                 // traffic-polished patches: lighter, a bit smoother
  s.alb = vec3(mix(binder, st, stone)) * (1.0 + 0.06 * big + 0.06 * grit) * (1.0 + 0.04 * worn);
  s.h = -0.0011 * (1.0 - stone) + 0.0005 * stone * (1.0 - wc.x * wc.x) + 0.00012 * grit + 0.0001 * big;
  s.rough = mix(0.94, 0.8, stone * (1.0 - light * 0.5)) - 0.1 * worn;`},{name:`planks`,detail:.3,scale:2,tint:!1,alpha:!1,mode:Gt,sym:1,hr:[-.015,.0012],ao:.4,prep:`int row = int(floor(P.y / 0.25)); int rw = (row + 8) % 8;
  int kk[8] = int[8](0, 2, 1, 3, 2, 0, 3, 1);
  float xp = mod(P.x - 0.25 - 0.5 * float(kk[rw]), 2.0), ly = P.y - float(row) * 0.25;
  float rh = hf(ivec2(rw, 0), 3u), rh2 = hf(ivec2(rw, 1), 3u);
  uint sd = uint(rw) * 7919u + 101u;
  f[0] = FNP(vec2(xp * 1.3, ly * 17.0) + rh * 40.0, 4, sd); f[1] = FNP(vec2(xp * 0.5, ly * 4.0) + rh2 * 30.0, 3, sd + 17u);`,surf:`
  // 0.25 m boardwalk planks along u, 8 mm gaps, butt joints on joists (every 0.5 m), grain, nail heads
  const float PW = 0.25;
  int row = int(floor(P.y / PW));
  int rw = (row + 8) % 8;
  float ly = P.y - float(row) * PW;
  int kk[8] = int[8](0, 2, 1, 3, 2, 0, 3, 1);
  float jx = 0.25 + 0.5 * float(kk[rw]);
  float xp = mod(P.x - jx, 2.0);
  float eSide = min(ly, PW - ly);
  float eEnd = min(xp, 2.0 - xp);
  vec2 ps = edgeProf(eSide, 0.004, 0.006, 0.0022, 0.015);
  vec2 pe = edgeProf(eEnd, 0.0015, 0.004, 0.0014, 0.012);
  float gap = max(ps.y, pe.y);
  float h = min(ps.x, pe.x);
  float rh = hf(ivec2(rw, 0), 3u), rh2 = hf(ivec2(rw, 1), 3u), rh3 = hf(ivec2(rw, 2), 3u);
  float streak = n[0], warp = n[1];
  float ring = 0.5 + 0.5 * cos((ly * 64.0 + warp * 3.5 + rh2 * 9.0) * PI);
  float lines = smoothstep(0.72, 1.0, ring);
  vec3 wa = lin(vec3(0.79, 0.64, 0.47)), wb = lin(vec3(0.74, 0.57, 0.42)), wc = lin(vec3(0.82, 0.69, 0.51));
  vec3 base = mix(wa, rh3 > 0.5 ? wb : wc, abs(rh3 - 0.5) * 1.4) * (0.94 + 0.12 * rh);
  vec3 col = base * (1.0 + 0.07 * streak) * (1.0 - 0.07 * lines);
  col *= 1.0 - 0.1 * (1.0 - smoothstep(0.0, 0.035, eEnd - 0.0015));
  col *= 1.0 - 0.05 * (1.0 - smoothstep(0.0, 0.02, eSide - 0.004));
  float nx = eEnd < 0.1 ? abs(eEnd - 0.03) : jd(P.x - 0.25, 0.5);
  float ny = min(abs(ly - 0.045), abs(ly - (PW - 0.045)));
  float nd = length(vec2(nx, ny));
  float nail = 1.0 - aa(0.0042, nd);
  col *= 1.0 - 0.1 * (1.0 - smoothstep(0.004, 0.018, nd));
  col = mix(col, lin(vec3(0.46, 0.45, 0.44)) * (0.85 + 0.3 * smoothstep(0.0042, 0.0, nd)), nail);
  col = mix(col, lin(vec3(0.20, 0.15, 0.11)), gap);
  h += (0.0007 * (1.0 - pow((ly - PW * 0.5) / (PW * 0.5), 2.0)) + 0.00011 * streak - 0.00006 * lines) * (1.0 - gap);
  s.alb = col;
  s.h = h - nail * 0.0003;
  s.rough = mix(mix(0.64 + 0.05 * streak + 0.05 * lines, 0.42, nail), 0.92, gap);
  s.metal = nail * 0.75;
  s.cav = mix(1.0, 0.4, gap);`},{name:`metalpanel`,detail:.2,scale:2,tint:!0,alpha:!1,mode:Gt,sym:3,hr:[-.006,.003],ao:.45,prep:`f[0] = FB(uv, ivec2(20, 2), 4, 0.55, 3u); f[1] = FB(uv, ivec2(4), 4, 0.5, 5u); f[2] = FB(uv, ivec2(40), 4, 0.55, 7u);`,surf:`
  // painted steel wall panels 1 x 2 m: V-seams, folded edges, two pressed ribs, rivet rows, light edge wear
  ivec2 cell = ivec2(floor(P / vec2(1.0, 2.0)));
  vec2 lp = P - (vec2(cell) * vec2(1.0, 2.0) + vec2(0.5, 1.0));
  float e = -sdRB(lp, vec2(0.5, 1.0), 0.015);
  vec2 pr = edgeProf(e, 0.0035, 0.01, 0.0032, 0.006);
  float inS = pr.y;
  float rib = exp(-pow((abs(lp.y) - 0.333) / 0.022, 2.0)) * smoothstep(0.03, 0.09, e);
  float ry = -0.9 + 0.2 * clamp(floor((lp.y + 1.0) / 0.2), 0.0, 9.0);
  float d1 = length(vec2(abs(lp.x) - 0.465, lp.y - ry));
  float rx = -0.4 + 0.2 * clamp(floor((lp.x + 0.5) / 0.2), 0.0, 4.0);
  float d2 = length(vec2(lp.x - rx, abs(lp.y) - 0.965));
  float rd = min(d1, d2);
  float rv = 1.0 - aa(0.0065, rd);
  float dome = sqrt(max(1.0 - pow(rd / 0.0065, 2.0), 0.0));
  float streak = n[0], mott = n[1], wn = n[2] * 0.5 + 0.5;
  float edgeP = 1.0 - smoothstep(0.004, 0.03, e);
  float wear = smoothstep(0.7, 0.78, wn + 0.3 * edgeP * (1.0 - inS)) * (1.0 - inS);
  wear = max(wear, rv * smoothstep(0.55, 0.9, dome) * smoothstep(0.35, 0.6, wn));
  vec3 col = vec3(0.81) * (1.0 + 0.035 * streak + 0.025 * mott) * (1.0 - 0.08 * edgeP);
  col = mix(col, vec3(0.93), wear * 0.7);
  s.alb = mix(col, vec3(0.36), inS);
  s.h = pr.x + 0.0022 * rib + rv * 0.0025 * dome + 0.00008 * mott - wear * 0.00005;
  s.rough = mix(mix(0.36 + 0.04 * streak, 0.42, wear), 0.7, inS);
  s.metal = mix(mix(0.3, 0.45, wear), 0.2, inS);
  s.cav = mix(1.0, 0.55, inS) * (1.0 - 0.25 * rv * (1.0 - dome));`},{name:`corrugated`,detail:.2,scale:2.4,tint:!0,alpha:!1,mode:Wt,sym:0,hr:[-.03,.001],ao:.3,prep:`f[0] = FB(uv, ivec2(3, 4), 3, 0.5, 5u); f[1] = FB(uv, ivec2(16, 2), 4, 0.55, 9u); f[2] = FB(uv, ivec2(5), 4, 0.5, 11u);
  f[3] = FB(uv, ivec2(8, 40), 4, 0.55, 13u);`,surf:`
  // container corrugation: vertical ribs (along v), 0.3 m period, trapezoid 30 mm deep, crest-edge paint wear
  float x = mod(P.x + 0.15, 0.3) - 0.15;
  float a = abs(x);
  float t = clamp((a - 0.042) / 0.066, 0.0, 1.0);
  float prof = mix(t, t * t * (3.0 - 2.0 * t), 0.65);
  float dent = n[0], streak = n[1], mott = n[2], wn = n[3] * 0.5 + 0.5;
  float crestEdge = exp(-pow((a - 0.045) / 0.007, 2.0));
  float troughEdge = exp(-pow((a - 0.105) / 0.009, 2.0));
  float wear = crestEdge * smoothstep(0.52, 0.62, wn);
  vec3 col = vec3(0.81) * (1.0 + 0.03 * streak + 0.025 * mott) * (1.0 - 0.07 * smoothstep(0.1, 0.15, a));
  s.alb = mix(col, vec3(0.95), wear * 0.55);
  s.h = -0.03 * prof + 0.0006 * dent - wear * 0.00005;
  s.rough = mix(0.5 + 0.05 * streak, 0.45, wear);
  s.metal = mix(0.25, 0.4, wear);
  s.cav = 1.0 - 0.18 * troughEdge;`},{name:`hazard`,detail:.5,scale:2,tint:!1,alpha:!1,mode:Wt,sym:0,hr:[-4e-4,4e-4],ao:.3,prep:`f[0] = FB(uv, ivec2(5), 5, 0.55, 5u); f[1] = FB(uv, ivec2(40), 3, 0.5, 9u); f[2] = FB(uv, ivec2(4, 80), 3, 0.5, 15u);`,surf:`
  // 45° yellow / black safety stripes (~12 cm each), paint worn through to concrete in soft patches
  const float PER = 1.0 / 3.0;
  float q = fract((P.x + P.y) / PER);
  float dY = q < 0.5 ? min(q, 0.5 - q) : -min(q - 0.5, 1.0 - q);
  float dm = dY * PER * 0.70710678;
  float yel = smoothstep(-PX * 0.75, PX * 0.75, dm);
  vec3 Y = lin(vec3(0.96, 0.77, 0.16)), K = lin(vec3(0.14, 0.14, 0.15));
  float n1 = n[0] * 0.5 + 0.5, n2 = n[1] * 0.5 + 0.5, scuff = n[2] * 0.5 + 0.5;
  float edgeW = 1.0 - smoothstep(0.0, 0.012, abs(dm));
  float thin = smoothstep(0.5, 0.75, n1 + 0.15 * (n2 - 0.5));                    // paint worn thin, broad and soft
  float wear = smoothstep(0.72, 0.8, n1 + 0.35 * (n2 - 0.5) + 0.05 * edgeW);  // worn through, rare
  vec3 paint = mix(K, Y, yel) * (1.0 - 0.05 * (n1 - 0.5)) * (1.0 - 0.06 * smoothstep(0.55, 0.8, scuff));
  vec3 under = lin(vec3(0.63, 0.62, 0.6)) * (1.0 + 0.06 * (n2 - 0.5));
  paint = mix(paint, mix(paint, under, 0.3), thin * (0.2 + 0.25 * yel));
  s.alb = mix(paint, under, wear * 0.85);
  s.h = 0.0003 * (1.0 - wear) + 0.00005 * n2;
  s.rough = mix(0.52 + 0.08 * scuff, 0.86, wear);`},{name:`grate`,detail:.3,scale:1.2,tint:!1,alpha:!0,mode:Gt,sym:3,hr:[-.009,6e-4],ao:.35,prep:`f[0] = FB(uv, ivec2(6), 4, 0.5, 3u); f[1] = FB(uv, ivec2(12), 3, 0.5, 9u); w[0] = WO(uv, ivec2(30), 1.0, 21u);`,surf:`
  // galvanised bar grating: bearing bars along u (20 mm, serrated), cross bars along v (14 mm, 3 mm lower),
  // 75 mm pitch -> ~5.5-6 cm openings (alpha 0)
  float db = jd(P.y, 0.075);
  float dc = jd(P.x, 0.075);
  float bb = 1.0 - aa(0.01, db);
  float cb = 1.0 - aa(0.007, dc);
  float hb = -0.0026 * pow(clamp(db / 0.01, 0.0, 1.0), 2.0) - 0.0005 * (0.5 + 0.5 * cos(TAU * P.x / 0.0125)) * smoothstep(0.0075, 0.0, db);
  float hc = -0.003 - 0.002 * pow(clamp(dc / 0.007, 0.0, 1.0), 2.0);
  float h = max(mix(-0.009, hb, bb), mix(-0.009, hc, cb));
  float spang = (c[0].z - 0.5) * smoothstep(0.0, 0.08, c[0].y - c[0].x);
  float mott = n[0];
  vec3 steel = vec3(0.53, 0.55, 0.57) * (1.0 + 0.07 * spang + 0.04 * mott);
  float top = bb * (1.0 - smoothstep(0.0, 0.01, db));
  float polish = top * smoothstep(0.45, 0.7, n[1] * 0.5 + 0.75);
  steel = mix(steel, vec3(0.64, 0.65, 0.66), polish * 0.7);
  float junction = cb * (1.0 - bb) * (1.0 - smoothstep(0.01, 0.02, db));
  s.alb = steel * (1.0 - 0.18 * junction);
  s.a = max(bb, cb);
  s.h = h;
  s.rough = mix(0.46 + 0.05 * mott, 0.3, polish);
  s.metal = 0.85;
  s.cav = 1.0 - 0.35 * junction;`},{name:`brick`,detail:.7,scale:2,tint:!0,alpha:!1,mode:Gt,sym:1,hr:[-.007,8e-4],ao:.5,prep:`f[0] = FB(uv, ivec2(80), 3, 0.5, 11u); f[1] = FB(uv, ivec2(6), 4, 0.5, 13u); f[2] = FB(uv, ivec2(128), 2, 0.5, 19u);
  w[0] = WO(uv, ivec2(120), 1.0, 17u);`,surf:`
  // stylised running-bond brick 250 x 100 mm (incl. 10 mm mortar), recessed joints, soft arrises
  int row = int(floor(P.y / 0.1));
  float ly = P.y - float(row) * 0.1;
  float bx = P.x - ((row % 2 == 1) ? 0.125 : 0.0);
  int col = int(floor(bx / 0.25));
  float lx = bx - float(col) * 0.25;
  ivec2 bid = wrp(ivec2(col, row), ivec2(8, 20));
  vec2 lp = vec2(lx - 0.125, ly - 0.05);
  float e = -sdRB(lp, vec2(0.125, 0.05), 0.007);
  vec2 pr = edgeProf(e, 0.005, 0.007, 0.0035, 0.0065);
  float inM = pr.y;
  float hid = hf(bid, 3u), hid2 = hf(bid, 5u);
  float sand = n[0], mott = n[1];
  float pit = step(0.9, c[0].z) * (1.0 - aa(0.0022, c[0].x * (2.0 / 120.0)));
  float bulge = (1.0 - pow(lp.x / 0.125, 2.0)) * (1.0 - pow(lp.y / 0.05, 2.0));
  vec3 cb = vec3(0.79) * (1.0 + 0.1 * (hid - 0.5)) * (1.0 + 0.025 * sand + 0.02 * mott) * (1.0 - 0.1 * pit);
  cb *= 1.0 - 0.04 * clamp(1.0 - (e - 0.005) / 0.01, 0.0, 1.0) * (1.0 - inM);
  vec3 mort = vec3(0.9) * (1.0 + 0.05 * n[2]);
  s.alb = mix(cb, mort, inM);
  s.h = pr.x + (0.0005 * bulge * hid2 + 0.00012 * sand - 0.0008 * pit) * (1.0 - inM) + inM * 0.0008 * (pow(clamp(e / 0.005, 0.0, 1.0), 2.0) - 1.0);
  s.rough = mix(0.82 + 0.05 * sand, 0.95, inM);
  s.cav = mix(1.0, 0.72, inM);`},{name:`rubber`,detail:.35,scale:2,tint:!0,alpha:!1,mode:Kt,sym:7,hr:[-7e-4,7e-4],ao:.35,prep:`f[0] = FB(uv, ivec2(5), 4, 0.5, 71u); w[0] = WO(uv, ivec2(240), 1.0, 61u);`,surf:`
  // poured EPDM rubber: ~8 mm bonded granules, sparse light flecks, soft large-scale blotches
  vec4 wc = c[0];
  float gr = smoothstep(0.04, 0.18, wc.y - wc.x);
  float tone = mix(0.78 + 0.08 * fract(wc.z * 3.71), 0.97, step(0.95, wc.z));
  float big = n[0];
  s.alb = vec3(mix(0.7, tone, gr)) * (1.0 + 0.03 * big);
  s.h = 0.00055 * gr * (1.0 - 0.8 * wc.x * wc.x) - 0.0004 * (1.0 - gr) + 0.00008 * big;
  s.rough = 0.9 - 0.04 * gr;`},{name:`glasstile`,detail:0,scale:1.2,tint:!0,alpha:!1,mode:Gt,sym:7,hr:[-.004,.0018],ao:.45,prep:`f[0] = FB(uv, ivec2(96), 2, 0.5, 7u);`,surf:`
  // 100 mm glossy glass-mosaic tiles: pillowed edges, slight dome + per-tile tilt, 4 mm grout
  ivec2 cell = ivec2(floor(P / 0.1));
  ivec2 cw = wrp(cell, ivec2(12));
  vec2 lp = P - (vec2(cell) * 0.1 + 0.05);
  float e = -sdRB(lp, vec2(0.05), 0.01);
  vec2 pr = edgeProf(e, 0.002, 0.008, 0.002, 0.0036);
  float inG = pr.y;
  float hid = hf(cw, 3u), hid2 = hf(cw, 5u);
  vec2 tilt = hf2(cw, 9u) - 0.5;
  float dome = 1.0 - dot(lp, lp) / 0.005;
  float inner = exp(-pow((e - 0.016) / 0.004, 2.0));
  vec3 col = vec3(0.8) * (1.0 + 0.09 * (hid - 0.5)) * (1.0 + 0.04 * inner);
  vec3 grout = vec3(0.7) * (1.0 + 0.05 * n[0]);
  s.alb = mix(col, grout, inG);
  s.h = pr.x + (0.0007 * dome + dot(tilt, lp) * 0.012 + 0.0001 * inner) * (1.0 - inG);
  s.rough = mix(0.1 + 0.08 * hid2, 0.85, inG);
  s.cav = mix(1.0, 0.65, inG);`},{name:`detail`,detail:0,scale:.5,tint:!0,alpha:!1,mode:Wt,sym:0,hr:[-3e-4,2e-4],ao:0,prep:`f[0] = FB(uv, ivec2(24), 3, 0.5, 3u); f[1] = FB(uv, ivec2(96), 2, 0.5, 5u);
  w[0] = WO(uv, ivec2(150), 1.0, 7u); w[1] = WO(uv, ivec2(40), 0.9, 9u);`,surf:`
  vec4 g = c[0];                                   // ~3 mm grains
  float grain = smoothstep(0.05, 0.3, g.y - g.x);
  float tone = fract(g.z * 7.31) - 0.5;
  float pit = step(0.93, c[1].z) * (1.0 - smoothstep(0.0007, 0.0007 + 2.0 * PX, c[1].x * (0.5 / 40.0)));
  float m = 1.0 + 0.14 * tone * grain + 0.06 * n[0] + 0.035 * n[1] - 0.16 * pit;
  s.alb = vec3(0.5 * m);
  s.h = 0.0002 * grain * (1.0 - g.x * g.x) + 0.00006 * n[1] - 0.00025 * pit;
  s.rough = 0.5 + 0.05 * n[0] + 0.04 * tone * grain;`},{name:`gel`,detail:0,scale:1,tint:!0,alpha:!1,mode:Wt,sym:0,hr:[-.006,.006],ao:0,prep:`f[0] = FB(uv, ivec2(4), 3, 0.45, 91u); f[1] = FB(uv, ivec2(12), 2, 0.5, 97u); w[0] = WO(uv, ivec2(7), 1.0, 101u);`,surf:`
  vec4 wc = c[0];
  float dimple = (1.0 - smoothstep(0.0, 0.22, wc.x)) * step(0.6, wc.z);
  s.h = 0.0034 * n[0] + 0.0009 * n[1] - 0.0012 * dimple * dimple;
  s.alb = vec3(0.5);
  s.rough = 0.5;`}],$t=`
// ---- INKWAVE texlib (see src/world/texlib.js header for the API) ----
#ifndef TEXLIB_INCLUDED
#define TEXLIB_INCLUDED
#define TEXLIB_PLAIN 0
#define TEXLIB_GRID 1
#define TEXLIB_HEX 2
#ifndef TEXLIB_HEX_SCALE
#define TEXLIB_HEX_SCALE 0.5
#endif
struct TexlibSample { vec4 albedo; vec3 normal; vec4 orm; };

uint texlib_pcg(uint v) { uint s = v * 747796405u + 2891336453u; uint w = ((s >> ((s >> 28u) + 4u)) ^ s) * 277803737u; return (w >> 22u) ^ w; }
uint texlib_hash(ivec2 p) { return texlib_pcg(uint(p.x) + texlib_pcg(uint(p.y) + 0x9e3779b9u)); }
float texlib_h01(uint h) { return float(h >> 8u) * (1.0 / 16777216.0); }

void texlib_triGrid(vec2 st, out vec3 w, out ivec2 v1, out ivec2 v2, out ivec2 v3) {
  st *= 3.46410162;
  vec2 sk = mat2(1.0, 0.0, -0.57735027, 1.15470054) * st;
  ivec2 b = ivec2(floor(sk));
  vec3 t = vec3(fract(sk), 0.0); t.z = 1.0 - t.x - t.y;
  float s = step(0.0, -t.z), s2 = 2.0 * s - 1.0;
  w = vec3(-t.z * s2, s - t.y * s2, s - t.x * s2);
  int si = int(s);
  v1 = b + ivec2(si, si); v2 = b + ivec2(si, 1 - si); v3 = b + ivec2(1 - si, si);
}
vec2 texlib_hexCentre(ivec2 v) { return mat2(1.0, 0.0, 0.5, 0.8660254) * vec2(v) / (3.46410162 * TEXLIB_HEX_SCALE); }
mat2 texlib_rot(uint h) { float a = texlib_h01(h) * 6.28318531; float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }

void texlib_tap(sampler2DArray tA, sampler2DArray tN, sampler2DArray tO, vec2 st, float layer, vec2 gx, vec2 gy, mat2 M,
                out vec4 a, out vec3 n, out float nl, out vec4 o) {
  vec3 p = vec3(st, layer);
  a = textureGrad(tA, p, M * gx, M * gy);
  vec3 nr = textureGrad(tN, p, M * gx, M * gy).xyz * 2.0 - 1.0;
  o = textureGrad(tO, p, M * gx, M * gy);
  nl = length(nr);
  n = vec3(transpose(M) * nr.xy, nr.z);
}

TexlibSample texlibSample(sampler2DArray tA, sampler2DArray tN, sampler2DArray tO, vec2 uv, float layer, int mode, int sym) {
  vec2 gx = dFdx(uv), gy = dFdy(uv);
  // keep the footprint anisotropy within what 16x hardware AF resolves (≤ 12:1): past that, blur instead of alias
  float lx = dot(gx, gx), ly = dot(gy, gy);
  if (lx > ly * 144.0) gy = ly > 1e-20 ? gy * sqrt(lx / (ly * 144.0)) : vec2(-gx.y, gx.x) / 12.0;
  else if (ly > lx * 144.0) gx = lx > 1e-20 ? gx * sqrt(ly / (lx * 144.0)) : vec2(gy.y, -gy.x) / 12.0;
  TexlibSample r;
  vec3 n; float nl;
  if (mode == TEXLIB_HEX) {
    vec3 w; ivec2 v1, v2, v3;
    texlib_triGrid(uv * TEXLIB_HEX_SCALE, w, v1, v2, v3);
    uint h1 = texlib_hash(v1), h2 = texlib_hash(v2), h3 = texlib_hash(v3);
    mat2 R1 = texlib_rot(h1), R2 = texlib_rot(h2), R3 = texlib_rot(h3);
    vec2 c1 = texlib_hexCentre(v1), c2 = texlib_hexCentre(v2), c3 = texlib_hexCentre(v3);
    vec2 o1 = vec2(texlib_h01(texlib_pcg(h1)), texlib_h01(texlib_pcg(h1 + 1u)));
    vec2 o2 = vec2(texlib_h01(texlib_pcg(h2)), texlib_h01(texlib_pcg(h2 + 1u)));
    vec2 o3 = vec2(texlib_h01(texlib_pcg(h3)), texlib_h01(texlib_pcg(h3 + 1u)));
    vec4 a1, a2, a3, q1, q2, q3; vec3 n1, n2, n3; float l1, l2, l3;
    texlib_tap(tA, tN, tO, R1 * (uv - c1) + c1 + o1, layer, gx, gy, R1, a1, n1, l1, q1);
    texlib_tap(tA, tN, tO, R2 * (uv - c2) + c2 + o2, layer, gx, gy, R2, a2, n2, l2, q2);
    texlib_tap(tA, tN, tO, R3 * (uv - c3) + c3 + o3, layer, gx, gy, R3, a3, n3, l3, q3);
    vec3 W = w * w; W *= W; W *= w * w * w;                   // w^7
    W *= mix(vec3(1.0), vec3(q1.a, q2.a, q3.a) + 0.05, 0.6);  // height-aware contrast blend
    W /= max(W.x + W.y + W.z, 1e-6);
    r.albedo = W.x * a1 + W.y * a2 + W.z * a3;
    r.orm = W.x * q1 + W.y * q2 + W.z * q3;
    n = W.x * n1 + W.y * n2 + W.z * n3;
    nl = W.x * l1 + W.y * l2 + W.z * l3;
  } else if (mode == TEXLIB_GRID) {
    uint h = texlib_hash(ivec2(floor(uv))) & uint(sym);
    mat2 M = mat2(1.0);
    if ((h & 4u) != 0u) M = mat2(0.0, 1.0, 1.0, 0.0);
    if ((h & 1u) != 0u) M = mat2(-1.0, 0.0, 0.0, 1.0) * M;
    if ((h & 2u) != 0u) M = mat2(1.0, 0.0, 0.0, -1.0) * M;
    texlib_tap(tA, tN, tO, M * (fract(uv) - 0.5) + 0.5, layer, gx, gy, M, r.albedo, n, nl, r.orm);
  } else {
    texlib_tap(tA, tN, tO, uv, layer, gx, gy, mat2(1.0), r.albedo, n, nl, r.orm);
  }
  // Toksvig: mips average bumps into shorter normals -> widen the lobe instead of sparkling
  float v = max((1.0 - nl) / max(nl, 1e-3) - 0.006, 0.0);
  float a = r.orm.g * r.orm.g;
  r.orm.g = sqrt(sqrt(min(a * a + 2.0 * v, 1.0)));
  r.normal = normalize(vec3(n.xy, max(n.z, 1e-3)));
  return r;
}

mat3 texlibTangentFrame(vec3 eyePos, vec3 surfNormal, vec2 uv) {
  vec3 q0 = dFdx(eyePos), q1 = dFdy(eyePos);
  vec2 st0 = dFdx(uv), st1 = dFdy(uv);
  vec3 N = surfNormal;
  vec3 q1perp = cross(q1, N), q0perp = cross(N, q0);
  vec3 T = q1perp * st0.x + q0perp * st1.x;
  vec3 B = q1perp * st0.y + q0perp * st1.y;
  float det = max(dot(T, T), dot(B, B));
  float sc = det == 0.0 ? 0.0 : inversesqrt(det);
  return mat3(T * sc, B * sc, N);
}
vec3 texlibPerturbNormal(vec3 nTS, vec3 T, vec3 B, vec3 N, float strength) {
  return normalize(T * (nTS.x * strength) + B * (nTS.y * strength) + N * nTS.z);
}
vec3 texlibPerturbNormal(vec3 nTS, mat3 tbn, float strength) {
  return texlibPerturbNormal(nTS, tbn[0], tbn[1], tbn[2], strength);
}

#ifndef TEXLIB_DETAIL_SCALE
#define TEXLIB_DETAIL_SCALE 0.5
#endif
// blends the 'detail' layer into a sample at two rotated scales (no visible period). pMetres = surface coords in
// metres; amount = meta.detail (0 = skip). Albedo x (2 * detail), normal UDN-blended, roughness += delta.
void texlibDetail(inout TexlibSample s, sampler2DArray tA, sampler2DArray tN, sampler2DArray tO, vec2 pMetres, float layer, float amount) {
  vec2 u1 = pMetres / TEXLIB_DETAIL_SCALE;
  vec2 gx = dFdx(u1), gy = dFdy(u1);
  if (amount <= 0.0) return;
  const mat2 R = mat2(0.8660254, 0.5, -0.5, 0.8660254);
  vec2 u2 = R * u1 * 0.61 + vec2(0.37, 0.71);
  vec2 hx = R * gx * 0.61, hy = R * gy * 0.61;
  vec4 a1 = textureGrad(tA, vec3(u1, layer), gx, gy), a2 = textureGrad(tA, vec3(u2, layer), hx, hy);
  vec3 n1 = textureGrad(tN, vec3(u1, layer), gx, gy).xyz * 2.0 - 1.0, n2 = textureGrad(tN, vec3(u2, layer), hx, hy).xyz * 2.0 - 1.0;
  vec4 o1 = textureGrad(tO, vec3(u1, layer), gx, gy), o2 = textureGrad(tO, vec3(u2, layer), hx, hy);
  s.albedo.rgb *= mix(1.0, a1.r + a2.r, amount);
  vec2 dn = (n1.xy + transpose(R) * n2.xy) * 0.7071;
  s.normal = normalize(vec3(s.normal.xy + dn * amount, s.normal.z));
  s.orm.g = clamp(s.orm.g + (o1.g + o2.g - 1.0) * amount, 0.02, 1.0);
}

// screen-space specular AA on the final (perturbed) normal (Tokuyoshi-Kaplanyan / Filament): widens the lobe where
// the normal changes faster than the pixel grid can resolve — kills glints on bevels/rivets at distance.
float texlibSpecularAA(vec3 n, float roughness) {
  vec3 du = dFdx(n), dv = dFdy(n);
  float kernel = min(2.0 * 0.15 * (dot(du, du) + dot(dv, dv)), 0.2);
  float a = roughness * roughness;
  return sqrt(sqrt(clamp(a * a + kernel, 0.0, 1.0)));
}
float texlib_vn(vec2 p) {
  vec2 i = floor(p), f = p - i; vec2 u = f * f * (3.0 - 2.0 * f);
  ivec2 c = ivec2(i);
  float a = texlib_h01(texlib_hash(c)), b = texlib_h01(texlib_hash(c + ivec2(1, 0)));
  float d = texlib_h01(texlib_hash(c + ivec2(0, 1))), e = texlib_h01(texlib_hash(c + ivec2(1, 1)));
  return mix(mix(a, b, u.x), mix(d, e, u.x), u.y);
}
float texlibMacro(vec2 p) {
  float n = 0.62 * texlib_vn(p * 0.085 + 3.7) + 0.38 * texlib_vn(p * 0.29 + 11.3);
  return 0.94 + 0.12 * n;
}
float texlibCoverage(float a, vec2 uv, float texSize) {
  vec2 dx = dFdx(uv) * texSize, dy = dFdy(uv) * texSize;
  float lod = 0.5 * log2(max(max(dot(dx, dx), dot(dy, dy)), 1e-8));
  float sharp = clamp((a - 0.5) / max(fwidth(a), 1e-4) + 0.5, 0.0, 1.0);
  // coverage-preserving: as openings fall below the pixel grid the bars thicken until the grate reads solid
  // (as real grating does at a distance / grazing angle) instead of breaking into dotted, shimmering holes
  float far = clamp(a * (1.0 + 1.6 * max(lod, 0.0)), 0.0, 1.0);
  return mix(sharp, far, smoothstep(-0.5, 0.8, lod));
}
#endif
`;async function en(t,{size:r=512}={}){let i=performance.now(),o=Qt.length,s=new Ee(r,r,o,{count:3,type:he,format:w,colorSpace:Se,wrapS:e,wrapT:e,magFilter:a,minFilter:c,generateMipmaps:!0,anisotropy:Math.min(16,t.capabilities.getMaxAnisotropy()),depthBuffer:!1,stencilBuffer:!1});for(let e=1;e<3;e++){let t=new ie(null,r,r,o),n=s.texture;for(let e of[`format`,`type`,`wrapS`,`wrapT`,`magFilter`,`minFilter`,`anisotropy`,`generateMipmaps`,`flipY`,`internalFormat`])t[e]=n[e];t.colorSpace=``,t.isRenderTargetTexture=!0,t.renderTarget=s,s.textures[e]=t}s.textures[0].name=`texlib.albedo`,s.textures[1].name=`texlib.normal`,s.textures[2].name=`texlib.orm`;let l=new D;l.setAttribute(`position`,new n([-1,-1,0,3,-1,0,-1,3,0],3));let d=new u(-1,1,1,-1,0,1),f=(e,t)=>new h({glslVersion:De,vertexShader:qt,fragmentShader:e,uniforms:t,depthTest:!1,depthWrite:!1}),p=Qt.map((e,t)=>`void prep${t}(${Xt}) {\n  ${e.prep}\n}\nvoid surf${t}(${Zt}) {${e.surf}\n}`).join(`
`),m=(e,t)=>Qt.map((n,r)=>`${r?`else `:``}if (uMat == ${r}) ${e}${r}(${t});`).join(`
  `),g=f(Jt+p+Yt.replace(`PREP_SWITCH`,m(`prep`,`uv, P, f, w`)).replace(`SURF_SWITCH`,m(`surf`,`uv, P, n, c, s`)),{uRes:{value:new M(r,r)},uScale:{value:1},uMat:{value:0},uOne:{value:1},uHRange:{value:new M},uAO:{value:.5}}),_=new ve,v=new P(l,g);v.frustumCulled=!1,_.add(v),await t.compileAsync(_,d);let y=performance.now(),b=t.getRenderTarget(),x=t.autoClear,S=t.xr.enabled;t.autoClear=!1,t.xr.enabled=!1,t.initRenderTarget(s);for(let e of s.textures)e.generateMipmaps=!1;for(let e=0;e<o;e++){let n=Qt[e];if(g.uniforms.uMat.value=e,g.uniforms.uScale.value=n.scale,g.uniforms.uHRange.value.set(n.hr[0],n.hr[1]),g.uniforms.uAO.value=n.ao,e===o-1)for(let e of s.textures)e.generateMipmaps=!0;t.setRenderTarget(s,e),t.render(_,d)}t.readRenderTargetPixels(s,0,0,1,1,new Uint8Array(4),void 0,2),t.setRenderTarget(b),t.autoClear=x,t.xr.enabled=S,g.dispose(),l.dispose();let C={},T={};Qt.forEach((e,t)=>{C[e.name]=t,T[e.name]={scale:e.scale,tint:e.tint,alpha:e.alpha,mode:e.mode,sym:e.sym,detail:e.detail,depth:+(e.hr[1]-e.hr[0]).toFixed(4)}});let E=performance.now();return{albedo:s.textures[0],normal:s.textures[1],orm:s.textures[2],layers:C,meta:T,names:Qt.map(e=>e.name),size:r,stats:{ms:+(E-i).toFixed(1),compileMs:+(y-i).toFixed(1),size:r},dispose(){s.dispose()}}}function tn(e,t,n=null,r={}){let i=new y({color:16777215,vertexColors:!0,roughness:.82,metalness:0,clearcoat:1,clearcoatRoughness:.08,envMapIntensity:.9}),a={uPaint:{value:e},uTexel:{value:1/t},uTeamA:{value:new k(`#ff8a14`)},uTeamB:{value:new k(`#2f5bff`)},uTime:{value:0},uInkGlow:{value:.06},uMural:{value:n},uLight:{value:r.lightmap||null},uSeeA:{value:new j},uSeeB:{value:new j},uSeeOn:{value:0},uSeeFeet:{value:0},uSeeA2C:{value:0},uAO:{value:r.lightmap?1:0},uAtlasSize:{value:t},uPpm:{value:r.ppm||20},uFresh:{value:Array.from({length:16},()=>new E(0,-999,0,0))},uFreshAge:{value:new Float32Array(16).fill(99)},uGel:{value:13}},o=r.texlib||null;if(o){let e=o.layers,t=o.meta,n=[`concrete`,`pavers`,`tiles`,`concrete`,`rubber`,`corrugated`,`planks`,`metalpanel`,`tiles`,`concrete`,`asphalt`,`metalpanel`,`grate`,`brick`,`rubber`,`glasstile`,`pavers`,`concrete`];a.tAlbedo={value:o.albedo},a.tNormal={value:o.normal},a.tOrm={value:o.orm},a.uTexSize={value:o.stats?.size||512},a.uTL={value:n.map(n=>new E(e[n]??0,1/(t[n]&&t[n].scale||4),(t[n]&&t[n].mode)??1,(t[n]&&t[n].sym)??7))},a.uTLt={value:n.map(e=>new M(t[e]&&t[e].tint===!1?0:1,e===`grate`?.6:1))},a.uGel.value=e.gel??-1,i.defines={...i.defines||{},USE_TEXLIB:1}}return i.userData.uniforms=a,i.alphaToCoverage=!0,i.onBeforeRender=e=>{let t=F.match&&!F.match.attract?F.match.local:null;a.uSeeFeet.value=t?t.pos.y:a.uSeeB.value.y-1;let n=e.getRenderTarget();a.uSeeA2C.value=n&&n.samples>0?1:0;let i=r.paint||F.paint;if(i&&i.texture===a.uPaint.value&&(a.uPpm.value=i.ppm,i.fresh))for(let e=0;e<16;e++)a.uFresh.value[e].copy(i.fresh[e]),a.uFreshAge.value[e]=i.clock-i.freshT[e]},i.onBeforeCompile=e=>{Object.assign(e.uniforms,a),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
attribute vec2 paintUv;
attribute vec2 faceUv;
attribute vec4 faceData;
attribute vec3 faceFlags;
attribute vec3 faceTan;
attribute vec2 lightUv;
varying vec2 vLightUv;
varying vec3 vFaceTan;
varying vec2 vPaintUv;
varying vec2 vFaceUv;
varying vec4 vFaceData;
varying vec3 vFaceFlags;
varying vec3 vWPos;
varying vec3 vWNorm;`).replace(`#include <project_vertex>`,`#include <project_vertex>
vPaintUv = paintUv; vFaceUv = faceUv; vFaceData = faceData; vFaceFlags = faceFlags;
vFaceTan = normalize(mat3(modelMatrix) * faceTan);
vLightUv = lightUv;
vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
vWNorm = normalize(mat3(modelMatrix) * objectNormal);`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform sampler2D uPaint;
uniform float uTexel;
uniform vec3 uTeamA;
uniform vec3 uTeamB;
uniform float uTime;
uniform float uInkGlow;
uniform sampler2D uMural;
uniform sampler2D uLight;
uniform float uAO;
uniform vec3 uSeeA;
uniform vec3 uSeeB;
uniform float uSeeOn;
uniform float uSeeFeet;
uniform float uSeeA2C;
uniform float uAtlasSize;
uniform float uPpm;
uniform vec4 uFresh[16];
uniform float uFreshAge[16];
uniform float uGel;
varying vec2 vLightUv;
varying vec3 vFaceTan;
varying vec2 vPaintUv;
varying vec2 vFaceUv;
varying vec4 vFaceData;
varying vec3 vFaceFlags;
varying vec3 vWPos;
varying vec3 vWNorm;

float h21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1, 0)), u.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) { float a = 0.5, s = 0.0; for (int i = 0; i < 4; i++) { s += a * vnoise(p); p = p * 2.03 + 17.1; a *= 0.5; } return s; }
// anti-aliased grid line: returns 1 on the line
float gridLine(float x, float period, float width) {
  float fx = abs(fract(x / period + 0.5) - 0.5) * period;
  float w = fwidth(x) * 0.75;
  return 1.0 - smoothstep(width - w, width + w, fx);
}
// Paint lookups use textureGrad with gradients clamped to ≤ 8 texels: trilinear + anisotropic filtering (no shimmer at
// distance) while never reaching mip levels coarse enough to bleed across the 8-texel face padding.
vec2 gPdx = vec2(0.0), gPdy = vec2(0.0);
vec4 paintAt(vec2 uv) { return textureGrad(uPaint, uv, gPdx, gPdy); }
// Close-up reconstruction of the paint atlas with a cubic B-spline (C2: smooth, round ink outlines and a smooth height
// field at any magnification) plus its analytic gradient — 12 bilinear taps inside one 4×4 texel footprint.
void inkBspl(float t, out vec4 w, out vec4 dw) {
  float t2 = t * t, t3 = t2 * t, it = 1.0 - t;
  w = vec4(it * it * it, 3.0 * t3 - 6.0 * t2 + 4.0, -3.0 * t3 + 3.0 * t2 + 3.0 * t + 1.0, t3) * (1.0 / 6.0);
  dw = vec4(-it * it, 3.0 * t2 - 4.0 * t, -3.0 * t2 + 2.0 * t + 1.0, t2) * 0.5;
}
vec4 inkTap(vec2 st) { return textureLod(uPaint, (st + 0.5) / uAtlasSize, 0.0); }
vec4 paintCubic(vec2 uv, out vec2 gradA) {
  vec2 st = uv * uAtlasSize - 0.5;
  vec2 i = floor(st), f = st - i;
  vec4 wx, dwx, wy, dwy;
  inkBspl(f.x, wx, dwx); inkBspl(f.y, wy, dwy);
  vec2 gx = vec2(wx.x + wx.y, wx.z + wx.w), gy = vec2(wy.x + wy.y, wy.z + wy.w);
  vec2 ox = vec2(-1.0 + wx.y / gx.x, 1.0 + wx.w / gx.y), oy = vec2(-1.0 + wy.y / gy.x, 1.0 + wy.w / gy.y);
  vec2 dgx = vec2(dwx.x + dwx.y, dwx.z + dwx.w), dgy = vec2(dwy.x + dwy.y, dwy.z + dwy.w);
  vec2 dox = vec2(-1.0 + dwx.y / dgx.x, 1.0 + dwx.w / dgx.y), doy = vec2(-1.0 + dwy.y / dgy.x, 1.0 + dwy.w / dgy.y);
  vec4 v = gx.x * (gy.x * inkTap(i + vec2(ox.x, oy.x)) + gy.y * inkTap(i + vec2(ox.x, oy.y)))
         + gx.y * (gy.x * inkTap(i + vec2(ox.y, oy.x)) + gy.y * inkTap(i + vec2(ox.y, oy.y)));
  float ax = dgx.x * (gy.x * inkTap(i + vec2(dox.x, oy.x)).a + gy.y * inkTap(i + vec2(dox.x, oy.y)).a)
           + dgx.y * (gy.x * inkTap(i + vec2(dox.y, oy.x)).a + gy.y * inkTap(i + vec2(dox.y, oy.y)).a);
  float ay = dgy.x * (gx.x * inkTap(i + vec2(ox.x, doy.x)).a + gx.y * inkTap(i + vec2(ox.y, doy.x)).a)
           + dgy.y * (gx.x * inkTap(i + vec2(ox.x, doy.y)).a + gx.y * inkTap(i + vec2(ox.y, doy.y)).a);
  gradA = vec2(ax, ay);
  return v;
}
// Unnormalised Mikkelsen bump: dHdxy is the per-pixel change of a height in metres, so the tilt equals the true
// slope of the ink surface regardless of distance/viewing angle.
vec3 perturbInk(vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection) {
  vec3 vSigmaX = dFdx(surf_pos.xyz);
  vec3 vSigmaY = dFdy(surf_pos.xyz);
  vec3 R1 = cross(vSigmaY, surf_norm);
  vec3 R2 = cross(surf_norm, vSigmaX);
  float fDet = dot(vSigmaX, R1) * faceDirection;
  vec3 vGrad = sign(fDet) * (dHdxy.x * R1 + dHdxy.y * R2);
  return normalize(abs(fDet) * surf_norm - vGrad);
}
vec2 fsz0(vec4 fd) { return fd.zw; }
#ifdef USE_TEXLIB
precision highp sampler2DArray;
uniform sampler2DArray tAlbedo;
uniform sampler2DArray tNormal;
uniform sampler2DArray tOrm;
uniform float uTexSize;
uniform vec4 uTL[18];
uniform vec2 uTLt[18];
${$t}
#endif
vec3 gTexN = vec3(0.0, 0.0, 1.0);
vec4 gTexORM = vec4(1.0, 0.8, 0.0, 0.5);
float gTexStr = 0.0;
float gTexAlpha = 1.0;
float gInk = 0.0;
vec3 gInkCol = vec3(0.0);
float gBaseRough = 0.8;
float gInkH = 0.0;
vec2 gInkD = vec2(0.0);
float gRib = 0.0;
float gFresh = 0.0;
float gInkNear = 0.0;
float gInkS = 0.0;`).replace(`#include <color_fragment>`,`#include <color_fragment>
{
  // see-through: geometry in front of the local player that overlaps their on-screen silhouette dissolves, so low
  // cover never hides your character. The window is a capsule in screen space around the body (feet → head) with a
  // soft edge; only fragments clearly in front of the player dissolve (never anything behind them), and floors /
  // platform sides at or below the player's feet are never cut (no holes under you).
  // With MSAA the fade uses alpha-to-coverage (sub-pixel, smooth); without it an 8×8 ordered dither + discard.
  diffuseColor.a = 1.0;
  if (uSeeOn > 0.001) {
    vec3 Bv = (viewMatrix * vec4(uSeeB, 1.0)).xyz;
    float dB = -Bv.z, dP = vViewPosition.z;
    if (dB > 0.6 && dP < dB - 0.2) {
      float bodyH = uSeeB.y - uSeeFeet;                        // kid ≈ 1.0, squid ≈ 0.4
      vec3 Fv = (viewMatrix * vec4(uSeeB.x, uSeeFeet + 0.05, uSeeB.z, 1.0)).xyz;
      vec3 Hv = (viewMatrix * vec4(uSeeB.x, uSeeFeet + bodyH * 1.42 + 0.06, uSeeB.z, 1.0)).xyz;
      vec2 p = -vViewPosition.xy / dP, f = Fv.xy / max(-Fv.z, 0.05), h = Hv.xy / max(-Hv.z, 0.05);
      vec2 fh = h - f;
      float t = clamp(dot(p - f, fh) / max(dot(fh, fh), 1e-8), 0.0, 1.0);
      float sd = length(p - (f + fh * t)) * dB;                  // metres, measured at the player's distance
      float R = mix(0.3, 0.46, clamp(bodyH, 0.0, 1.0));          // body half-width + margin
      float k = 1.0 - smoothstep(R, R + 0.42, sd);
      k *= smoothstep(dB - 0.2, dB - 0.75, dP);                  // only well in front of the player
      // never cut floors at the player's feet, nor the sides of the platform they stand on
      float feetTop = uSeeFeet + 0.3;
      if (vWNorm.y > 0.6 && vWPos.y < feetTop) k = 0.0;
      if (abs(vWNorm.y) < 0.6 && vWPos.y + max(vFaceData.w - vFaceUv.y, 0.0) * 0.9 < feetTop) k = 0.0;
      k *= uSeeOn;
      if (k > 0.002) {
        ivec2 q = ivec2(gl_FragCoord.xy) & 7;
        int xy = q.x ^ q.y;
        float bay = (float(((xy & 1) << 5) | ((q.x & 1) << 4) | ((xy & 2) << 2) | ((q.x & 2) << 1) | ((xy & 4) >> 1) | ((q.x & 4) >> 2)) + 0.5) / 64.0;
        // alpha-to-coverage gives 4 levels per pixel; a small ordered offset fills the steps in between, tapered so
        // the open centre and the untouched rim stay perfectly clean (no screen-door grain over the character)
        float a = 1.0 - k;
        if (uSeeA2C > 0.5) diffuseColor.a = clamp(a + (bay - 0.5) * 0.25 * smoothstep(0.0, 0.2, a) * smoothstep(1.0, 0.8, a), 0.0, 1.0);
        else if (k > bay * 0.98 + 0.01) discard;
      }
    }
  }
  vec2 fu = vFaceUv;
  float pattern = vFaceData.x;
#ifdef GRATE
  // bar grating: 4 cm bars on a 7 cm pitch one way, 2 cm cross-bars every 20 cm; holes are cut out
  {
    float gw = fwidth(fu.x) + 1e-4;
    float bx = 1.0 - smoothstep(0.02 - gw, 0.02 + gw, abs(fract(fu.x / 0.07 + 0.5) - 0.5) * 0.07);
    float by = 1.0 - smoothstep(0.01 - gw, 0.01 + gw, abs(fract(fu.y / 0.2 + 0.5) - 0.5) * 0.2);
    float edge = 1.0 - smoothstep(0.05, 0.06, min(min(fu.x, fsz0(vFaceData).x - fu.x), min(fu.y, fsz0(vFaceData).y - fu.y)));
    float solid = max(max(bx, by), edge);
    if (abs(vWNorm.y) < 0.5) solid = 1.0;
    if (solid < 0.5) discard;
  }
#endif
  vec2 fsz = vFaceData.zw;
  vec3 base = diffuseColor.rgb;
  float rough = 0.82;
  float big = fbm(vWPos.xz * 0.18 + vWPos.y * 0.1);
  float fine = vnoise(fu * 9.0);
#ifdef USE_TEXLIB
  {
    int pid = int(pattern + 0.5);
    bool vertical = abs(vWNorm.y) < 0.5;
    if ((pid == 4 || pid == 10) && vertical) pid = 17;          // ramp / slab sides read as concrete
    vec4 tl = uTL[pid]; vec2 tt = uTLt[pid];
    TexlibSample ts = texlibSample(tAlbedo, tNormal, tOrm, fu * tl.y, tl.x, int(tl.z), int(tl.w));
    base = tt.x > 0.5 ? diffuseColor.rgb * ts.albedo.rgb * 1.25 : ts.albedo.rgb;
    base *= texlibMacro(vWPos.xz + vWPos.y * 0.7);
    base *= mix(1.0, ts.orm.r, 0.85);                            // cavity occlusion in grout / seams / grooves
    rough = ts.orm.g;
    gTexN = ts.normal; gTexORM = ts.orm; gTexStr = tt.y; gTexAlpha = ts.albedo.a;
    #ifdef GRATE
      if (texlibCoverage(ts.albedo.a, fu * tl.y, uTexSize) < 0.5 && !vertical) discard;
    #endif
  }
  if (pattern < 0.5) {
  } else if (pattern < 1.5) {
    // court markings over the pavers
    float rr = length(vWPos.xz);
    float wr = fwidth(rr);
    float mark = 1.0 - smoothstep(0.09 - wr, 0.09 + wr, abs(rr - 9.5));
    float wz = fwidth(vWPos.z);
    mark = max(mark, (1.0 - smoothstep(0.07 - wz, 0.07 + wz, abs(vWPos.z))) * step(9.5, abs(vWPos.x)));
    mark *= 0.75 + 0.25 * step(0.35, vnoise(vWPos.xz * 6.0));
    if (vWNorm.y > 0.5) base = mix(base, vec3(0.97, 0.96, 0.92), mark * 0.9);
  } else if (pattern > 3.5 && pattern < 4.5) {
    float edge = 1.0 - smoothstep(0.16, 0.2, min(fu.x, fsz.x - fu.x));
    if (vWNorm.y > 0.5) { base = mix(base, vec3(0.93, 0.72, 0.12), edge * 0.95); rough = mix(rough, 0.6, edge); }
  } else if (pattern > 7.5 && pattern < 8.5) {
    float e = min(min(fu.x, fsz.x - fu.x), min(fu.y, fsz.y - fu.y));
    float band = 1.0 - smoothstep(0.34, 0.36, e);
    float chev = step(0.5, fract((fu.x + fu.y) * 1.6));
    if (vWNorm.y > 0.5) base = mix(base, mix(vec3(0.95, 0.76, 0.1), vec3(0.12), chev), band * step(0.05, e));
  } else if (pattern > 8.5 && pattern < 9.5) {
    float e = min(min(fu.x, fsz.x - fu.x), min(fu.y, fsz.y - fu.y));
    float bed = smoothstep(0.24, 0.27, e) * step(0.5, vWNorm.y);
    vec3 grass = vec3(0.32, 0.55, 0.22) * (0.8 + 0.35 * fbm(fu * 6.0));
    base = mix(base, grass, bed);
    rough = mix(rough, 0.95, bed);
    gTexStr *= 1.0 - bed;
  } else if (pattern > 9.5 && pattern < 10.5 && abs(vWNorm.y) >= 0.5) {
      vec2 wp = vWPos.xz;
      float ax = abs(wp.x), az = abs(wp.y);
      float mw = fwidth(ax) + 1e-4;
      float dash = step(0.45, fract(az / 3.0));
      float lane = (1.0 - smoothstep(0.07 - mw, 0.07 + mw, abs(ax - 11.5))) * dash * step(4.0, az);
      float bay = (1.0 - smoothstep(0.05 - mw, 0.05 + mw, abs(fract((ax - 2.0) / 2.6) - 0.5) * 2.6)) * step(24.5, az) * step(az, 27.0) * step(ax, 8.0);
      float sx = wp.x * sign(wp.y);
      vec2 hz = vec2(sx - 4.0, az - 17.0);
      float inZone = step(abs(hz.x), 2.0) * step(abs(hz.y), 1.0);
      float hatch = step(0.5, fract((wp.x + wp.y) * 1.25)) * inZone;
      float border = inZone * (1.0 - step(abs(hz.x), 1.9) * step(abs(hz.y), 0.9));
      float wear = 0.9 + 0.1 * smoothstep(0.2, 0.5, vnoise(wp * 3.0));
      float paintM = clamp(lane + hatch * 0.9 + border, 0.0, 1.0) * wear;
      base = mix(base, vec3(0.95, 0.74, 0.18), paintM);
      base = mix(base, vec3(0.93, 0.93, 0.9), bay * wear);
      rough = mix(rough, 0.7, max(paintM, bay));
  }
  // ---- modelled detail (shader-only, no layout change) ----
  {
    int pid = int(pattern + 0.5);
    vec2 wp = vWPos.xz;
    float ef = min(min(fu.x, fsz.x - fu.x), min(fu.y, fsz.y - fu.y));
    bool isTop = vWNorm.y > 0.6;
    bool isWall = abs(vWNorm.y) < 0.5;
    // floors: soft grime patches, sun-bleached warm areas and smoother traffic-polished patches (sheen at grazing sun)
    if (isTop && (pid == 1 || pid == 16 || pid == 10 || pid == 2 || pid == 8)) {
      float m1 = vnoise(wp * 0.09 + 5.3), m2 = vnoise(wp * 0.31 + 1.7), m3 = vnoise(wp * 1.3);
      float grime = smoothstep(0.52, 0.86, m1 * 0.65 + m2 * 0.35);
      base *= 1.0 - 0.075 * grime * (0.7 + 0.3 * m3);
      base *= mix(vec3(1.0), vec3(1.025, 1.005, 0.965), smoothstep(0.42, 0.12, m1));
      rough = mix(rough, rough * 0.72, smoothstep(0.62, 0.9, m2) * 0.7);
    }
    // stone coping on exposed tops of walls / platforms / parapets, with a drip-groove shadow under the cap
    if (pid == 0 || pid == 2 || pid == 3 || pid == 13 || pid == 15 || pid == 16) {
      float cop = 0.0, groove = 0.0;
      float cw = mix(0.2, 0.26, step(3.0, min(fsz.x, fsz.y)));
      if (isTop) {
        cop = min(fsz.x, fsz.y) < 1.15 ? 1.0 : 1.0 - smoothstep(cw - 0.008, cw + 0.008, ef);
        groove = (1.0 - smoothstep(0.004, 0.012, abs(ef - cw))) * step(1.15, min(fsz.x, fsz.y));
      } else if (isWall && vFaceFlags.x > 0.5) {
        float dt = fsz.y - fu.y;
        cop = 1.0 - smoothstep(0.1, 0.108, dt);
        groove = 1.0 - smoothstep(0.005, 0.016, abs(dt - 0.118));
      }
      vec3 stone = vec3(0.9, 0.885, 0.845) * (0.95 + 0.07 * vnoise(fu * 9.0) + 0.03 * vnoise(fu * 41.0));
      base = mix(base, stone * texlibMacro(wp + vWPos.y * 0.7), cop);
      rough = mix(rough, 0.72, cop);
      gTexStr *= 1.0 - 0.8 * cop;
      base *= 1.0 - 0.28 * groove;
    }
    // ramps: anti-slip grooves across the slope
    if (pid == 4 && isTop) {
      vec3 Tt = normalize(vFaceTan - vWNorm * dot(vFaceTan, vWNorm)), Bb = cross(vWNorm, Tt);
      vec2 up2 = vec2(Tt.y, Bb.y);
      float along = dot(fu, up2 / max(length(up2), 1e-4));
      float g = gridLine(along, 0.32, 0.016);
      base *= 1.0 - 0.2 * g;
      rough = mix(rough, 0.95, g);
    }
    // containers: rust streaks bleeding from the top rail and corners, dirt toward the bottom
    if (pid == 5 && isWall) {
      float st = vnoise(vec2(dot(wp, vec2(0.707)) * 5.5 + vWPos.x * 0.8, vWPos.y * 0.35));
      float fromTop = smoothstep(fsz.y * 0.25, fsz.y, fu.y);
      float rust = smoothstep(0.6, 0.92, st) * (0.35 + 0.65 * fromTop);
      rust = max(rust, (1.0 - smoothstep(0.05, 0.3, ef)) * smoothstep(0.45, 0.8, vnoise(fu * 3.0)) * 0.8);
      base = mix(base, vec3(0.42, 0.2, 0.1) * (0.8 + 0.4 * vnoise(fu * 11.0)), rust * 0.42);
      rough = mix(rough, 0.85, rust);
      base *= mix(0.84, 1.0, smoothstep(0.0, 0.7, fu.y));
    }
  }
  if (false) { if (pattern < 0.5) {   // legacy procedural chain below is compiled out of use
#else
  base *= 0.93 + 0.1 * big;
  if (pattern < 0.5) {
#endif
    // plain painted concrete
    base *= 0.97 + 0.05 * fine;
  } else if (pattern < 1.5) {
    // deck: 2 m concrete slabs with dark joints, tone per slab, speckle
    vec2 cell = floor(fu / 2.0);
    base *= 0.95 + 0.08 * h21(cell);
    float j = max(gridLine(fu.x, 2.0, 0.018), gridLine(fu.y, 2.0, 0.018));
    base *= 1.0 - 0.28 * j;
    base *= 0.96 + 0.06 * step(0.93, h21(floor(fu * 22.0)));
    // painted court markings: centre ring + halfway line (slightly worn)
    float rr = length(vWPos.xz);
    float wr = fwidth(rr);
    float mark = 1.0 - smoothstep(0.09 - wr, 0.09 + wr, abs(rr - 9.5));
    float wz = fwidth(vWPos.z);
    mark = max(mark, (1.0 - smoothstep(0.07 - wz, 0.07 + wz, abs(vWPos.z))) * step(9.5, abs(vWPos.x)));
    mark *= 0.75 + 0.25 * step(0.35, vnoise(vWPos.xz * 6.0));
    if (vWNorm.y > 0.5) base = mix(base, vec3(0.97, 0.96, 0.92), mark * 0.9);
    rough = 0.86;
  } else if (pattern < 2.5) {
    // tiles: 0.5 m tiles with lighter grout
    vec2 cell = floor(fu / 0.5);
    base *= 0.94 + 0.09 * h21(cell + 3.1);
    float j = max(gridLine(fu.x, 0.5, 0.012), gridLine(fu.y, 0.5, 0.012));
    base = mix(base, base * 0.78 + 0.08, j);
    rough = 0.6;
  } else if (pattern < 3.5) {
    // concrete wall: formwork bands + tie holes + low grime
    float band = gridLine(fu.y, 1.2, 0.01);
    base *= 1.0 - 0.14 * band;
    vec2 tp = vec2(fract(fu.x / 1.2) - 0.5, fract(fu.y / 1.2 - 0.25) - 0.5) * 1.2;
    base *= 1.0 - 0.35 * (1.0 - smoothstep(0.02, 0.035, length(tp)));
    base *= 0.94 + 0.06 * smoothstep(0.0, 0.9, fu.y);
    rough = 0.9;
  } else if (pattern < 4.5) {
    // ramps: grip grooves + yellow safety edges
    float g = gridLine(fu.y, 0.35, 0.02);
    base *= 1.0 - 0.18 * g;
    float edge = 1.0 - smoothstep(0.16, 0.2, min(fu.x, fsz.x - fu.x));
    if (vWNorm.y > 0.5) base = mix(base, vec3(0.93, 0.72, 0.12), edge * 0.95);
    rough = 0.75;
  } else if (pattern < 5.5) {
    // shipping container: vertical corrugation ribs
    float rib = sin(fu.x / 0.28 * 6.2831);
    gRib = rib;
    base *= 0.92 + 0.1 * rib;
    float frame = 1.0 - smoothstep(0.08, 0.1, min(min(fu.y, fsz.y - fu.y), min(fu.x, fsz.x - fu.x)));
    base = mix(base, base * 0.7, frame);
    base *= 0.95 + 0.07 * fbm(fu * vec2(3.0, 0.7));
    rough = 0.55;
  } else if (pattern < 6.5) {
    // wood planks
    float pl = gridLine(fu.y, 0.26, 0.008);
    float plank = floor(fu.y / 0.26);
    float grain = fbm(vec2(fu.x * 0.7 + h21(vec2(plank)) * 30.0, fu.y * 18.0));
    base *= 0.84 + 0.22 * grain;
    base *= 1.0 - 0.35 * pl;
    float frame = 1.0 - smoothstep(0.1, 0.12, min(min(fu.y, fsz.y - fu.y), min(fu.x, fsz.x - fu.x)));
    base = mix(base, base * 0.82, frame * step(fsz.x, 3.0) * step(fsz.y, 3.0));
    rough = 0.78;
  } else if (pattern < 7.5) {
    // metal railing: brushed + rivets
    base *= 0.92 + 0.08 * vnoise(vec2(fu.x * 40.0, fu.y * 1.5));
    vec2 rp = vec2(fract(fu.x / 0.8) - 0.5, fu.y - fsz.y + 0.12) * vec2(0.8, 1.0);
    base *= 1.0 - 0.3 * (1.0 - smoothstep(0.02, 0.03, length(rp)));
    rough = 0.45;
  } else if (pattern < 8.5) {
    // spawn deck: tiles + chevron hazard band around the edges
    vec2 cell = floor(fu / 0.6);
    base *= 0.95 + 0.06 * h21(cell + 7.7);
    float j = max(gridLine(fu.x, 0.6, 0.01), gridLine(fu.y, 0.6, 0.01));
    base *= 1.0 - 0.15 * j;
    float e = min(min(fu.x, fsz.x - fu.x), min(fu.y, fsz.y - fu.y));
    float band = 1.0 - smoothstep(0.34, 0.36, e);
    float chev = step(0.5, fract((fu.x + fu.y) * 1.6));
    if (vWNorm.y > 0.5) base = mix(base, mix(vec3(0.95, 0.76, 0.1), vec3(0.12), chev), band * step(0.05, e));
    rough = 0.65;
  } else if (pattern > 9.5 && pattern < 10.5) {
    if (abs(vWNorm.y) < 0.5) {
      // slab edges / trench walls read as poured concrete
      base = base * 1.18 * (0.95 + 0.05 * fine);
      base *= 1.0 - 0.12 * gridLine(fu.y, 1.2, 0.01);
      rough = 0.9;
    } else {
      base *= 0.92 + 0.08 * vnoise(fu * 3.0) + 0.04 * (vnoise(fu * 37.0) - 0.5) * (1.0 - smoothstep(0.02, 0.06, length(fwidth(fu))));
      rough = 0.92;
      // container-yard markings (world space, symmetric under the map's 180° rotation)
      vec2 wp = vWPos.xz;
      float ax = abs(wp.x), az = abs(wp.y);
      float mw = fwidth(ax) + 1e-4;
      // dashed yellow lane dividers at x = ±11.5
      float dash = step(0.45, fract(az / 3.0));
      float lane = (1.0 - smoothstep(0.07 - mw, 0.07 + mw, abs(ax - 11.5))) * dash * step(4.0, az);
      // white bay lines beside the base containers
      float bay = (1.0 - smoothstep(0.05 - mw, 0.05 + mw, abs(fract((ax - 2.0) / 2.6) - 0.5) * 2.6)) * step(24.5, az) * step(az, 27.0) * step(ax, 8.0);
      // hatched safety zone at the foot of each central ramp
      float sx = wp.x * sign(wp.y);           // 180°-rotation-symmetric x (ramps sit at x=-4,z<0 and x=+4,z>0)
      vec2 hz = vec2(sx - 4.0, az - 17.0);
      float inZone = step(abs(hz.x), 2.0) * step(abs(hz.y), 1.0);
      float hatch = step(0.5, fract((wp.x + wp.y) * 1.25)) * inZone;
      float border = inZone * (1.0 - step(abs(hz.x), 1.9) * step(abs(hz.y), 0.9));
      float wear = 0.9 + 0.1 * smoothstep(0.2, 0.5, vnoise(wp * 3.0));
      base = mix(base, vec3(0.95, 0.74, 0.18), clamp(lane + hatch * 0.9 + border, 0.0, 1.0) * wear);
      base = mix(base, vec3(0.93, 0.93, 0.9), bay * wear);
    }
  } else if (pattern > 10.5 && pattern < 11.5) {
    // painted steel panels: 1.2 m panels with seams + bolt rows
    float seam = max(gridLine(fu.x, 1.2, 0.008), gridLine(fu.y, 1.2, 0.008));
    base *= 1.0 - 0.22 * seam;
    base *= 0.95 + 0.06 * fbm(fu * 1.3);
    rough = 0.5;
  } else if (pattern > 11.5 && pattern < 12.5) {
    base *= 0.9;
    rough = 0.45;
  } else if (pattern > 15.5 && pattern < 16.5) {
    // pavers: 2 m slabs
    vec2 cell = floor(fu / 2.0);
    base *= 0.95 + 0.07 * h21(cell + 1.3);
    float j = max(gridLine(fu.x, 2.0, 0.02), gridLine(fu.y, 2.0, 0.02));
    base *= 1.0 - 0.25 * j;
    rough = 0.84;
  } else if (pattern > 12.5) {
    base *= 0.95 + 0.05 * fine;
    rough = 0.7;
  } else {
    // planter: stone rim with grass bed on top
    float e = min(min(fu.x, fsz.x - fu.x), min(fu.y, fsz.y - fu.y));
    float bed = smoothstep(0.24, 0.27, e) * step(0.5, vWNorm.y);
    vec3 grass = vec3(0.32, 0.55, 0.22) * (0.8 + 0.35 * fbm(fu * 6.0));
    base = mix(base * (0.95 + 0.05 * fine), grass, bed);
    rough = mix(0.8, 0.95, bed);
  }
#ifdef USE_TEXLIB
  }
#endif
  // murals / signage
  if (vFaceFlags.z > -0.5) {
    float rep = fsz.y * 8.0;
    vec2 muv = vec2(fu.x / rep, (3.0 - vFaceFlags.z + clamp(fu.y / fsz.y, 0.004, 0.996)) / 4.0);
    vec4 mc = texture2D(uMural, muv);
    base = mix(base, mc.rgb * (0.92 + 0.1 * big), mc.a * 0.96);
  }
  // crisp modelled edges: thin bright chamfer + soft inner shadow
  float e = min(min(fu.x, fsz.x - fu.x), min(fu.y, fsz.y - fu.y));
  float ew = fwidth(e);
  // (edges are real bevel geometry now; the old painted chamfer lines drew seams where faces stack)
  // contact darkening at the foot of walls that stand on something
  if (vFaceFlags.x > 0.5 && vFaceFlags.y > 0.5) {
    base *= mix(0.55, 1.0, smoothstep(0.0, 0.85, fu.y));
  }
  gBaseRough = rough;

  // ---- wet ink ----
  // Atlas: A = coverage profile (0.5 at the edge), R/G = team weights, B = per-splat tone. Close up the atlas is
  // rebuilt with a cubic B-spline (round outlines + a smooth height field with an analytic gradient), far away the
  // mip-filtered lookup keeps edges calm. The height profile is a meniscus: steep rounded lip, flat glossy top.
  if (vFaceData.y > 0.5) {
    vec2 pdx = dFdx(vPaintUv), pdy = dFdy(vPaintUv);
    float texFoot = max(length(pdx), length(pdy)) / uTexel;
    float gk = min(1.0, 8.0 / max(texFoot, 1e-4));
    gPdx = pdx * gk; gPdy = pdy * gk;
    vec4 pnt = paintAt(vPaintUv);
    float near = 1.0 - smoothstep(0.9, 2.4, texFoot);
    vec2 gradA = vec2(0.0);
    float lod2 = textureLod(uPaint, vPaintUv, 2.0).a;
    if (near > 0.0 && lod2 > 0.002 && (lod2 < 0.998 || pnt.a < 0.998)) {
      vec4 cub = paintCubic(vPaintUv, gradA);
      pnt = mix(pnt, cub, near);
      gradA *= near;
    }
    gInkNear = near;
    float amt = pnt.a;
    float fw = fwidth(amt);
    float w = clamp(fw * 0.8, 0.008, 0.25);
    gInk = smoothstep(0.5 - w, 0.5 + w, amt);
    float tw = pnt.r + pnt.g;
    float tm = smoothstep(0.4, 0.6, pnt.g / max(tw, 1e-4));
    // thickness profile: 0 at the edge → 1 on the flat top (≈2–3 texels in)
    float s = clamp((amt - 0.5) * 1.7, 0.0, 1.0);
    float hs = 1.0 - (1.0 - s) * (1.0 - s);
    gInkS = hs;
    // meniscus tilt (per texel of the atlas → angle independent of atlas density); fades once a texel is < ~1 px
    gInkD = gradA * 2.0 * (1.0 - s) * 1.7 * 1.9 * gInk;
    // fresh ink (landed in the last ~1.4 s): wetter, glossier, slightly brighter, still settling
    for (int i = 0; i < 16; i++) {
      vec4 fr = uFresh[i];
      float age = uFreshAge[i];
      if (age < 1.4) {
        float d = length(vWPos - fr.xyz);
        gFresh = max(gFresh, (1.0 - age / 1.4) * (1.0 - age / 1.4) * (1.0 - smoothstep(fr.w * 0.6, fr.w, d)));
      }
    }
    gFresh *= gInk;
    vec3 team = mix(uTeamA, uTeamB, tm);
    vec3 inkCol = team * (0.93 + 0.13 * pnt.b);
    // translucent thin lip reads lighter and a touch more saturated; the thick body a little deeper
    float lip = (1.0 - hs) * near;
    inkCol = mix(inkCol, inkCol * 1.16 + team * 0.05, lip * 0.35);
    inkCol *= 1.0 - 0.05 * hs;
    // seam between the two teams' ink: a thin darker crease so the colours never smear into each other
    float crease = (1.0 - abs(tm * 2.0 - 1.0)) * step(0.01, tm) * step(tm, 0.99);
    inkCol *= 1.0 - 0.22 * crease * gInk;
    inkCol *= 1.0 + 0.1 * gFresh;
    gInkCol = inkCol;
    // ink sits ON the ground: soft contact shadow + a faint coloured bounce hugging the outside of every edge
    float halo = smoothstep(0.06, 0.5, amt) * (1.0 - gInk) * near * smoothstep(0.4, 0.85, vWNorm.y);
    base *= mix(vec3(1.0), team * 0.45 + 0.3, halo * 0.5);
    base = mix(base, gInkCol, gInk);
  }
  diffuseColor.rgb = base;
}`).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
roughnessFactor = mix(gBaseRough, mix(0.24, 0.14, gFresh), gInk);`).replace(`#include <metalnessmap_fragment>`,`#include <metalnessmap_fragment>
#ifdef USE_TEXLIB
metalnessFactor = gTexORM.b * (1.0 - gInk);
#endif`).replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
{
  // slopes along the face's u / v axes (height per unit length), applied in the face's world tangent frame
  vec2 slope = gInkD;
  if (gInk > 0.01) {
    // gel micro-surface: soft swells + settling ripples so reflections break into wet highlights. Mip-filtered
    // (fades to flat by itself at distance). Walls stretch it vertically, fresh ink sloshes a little.
    vec2 gp = vFaceUv * (abs(vWNorm.y) < 0.5 ? vec2(0.9, 0.42) : vec2(0.75));
    gp += vec2(uTime * 0.011, -uTime * 0.007) + gFresh * 0.05 * vec2(sin(uTime * 7.0), cos(uTime * 5.3));
#ifdef USE_TEXLIB
    if (uGel >= 0.0) {
      vec2 gx = dFdx(gp), gy = dFdy(gp);
      vec3 gn = textureGrad(tNormal, vec3(gp, uGel), gx, gy).xyz * 2.0 - 1.0;
      slope += -gn.xy / max(gn.z, 0.3) * (0.55 + 1.1 * gFresh) * gInk * gInkS;
    }
#else
    {
      const float e = 0.06;
      vec2 q = gp * 2.2;
      float hx = vnoise(q + vec2(e, 0.0)) - vnoise(q - vec2(e, 0.0));
      float hy = vnoise(q + vec2(0.0, e)) - vnoise(q - vec2(0.0, e));
      float gf = 1.0 - smoothstep(0.03, 0.12, length(fwidth(vWPos)));
      slope += vec2(hx, hy) / (2.0 * e) * 0.035 * gf * gInk;
    }
#endif
  }
#ifndef USE_TEXLIB
  if (vFaceData.x > 4.5 && vFaceData.x < 5.5) {
    // corrugation on containers (only where not inked), analytic derivative
    slope.x += (1.0 - gInk) * -sin(vFaceUv.x / 0.28 * 6.2831) * 0.35;
  }
#endif
  vec3 T = normalize(vFaceTan - vWNorm * dot(vFaceTan, vWNorm));
  vec3 Bt = cross(vWNorm, T);
  vec3 nBase = vWNorm;
#ifdef USE_TEXLIB
  // surface relief from the texture library; ink fills the grooves so the relief fades out under it
  // (on corrugated metal the ink still follows the ribs)
  float keep = (vFaceData.x > 4.5 && vFaceData.x < 5.5) ? 0.55 : 0.0;
  nBase = texlibPerturbNormal(gTexN, T, Bt, vWNorm, gTexStr * (1.0 - gInk * (1.0 - keep)));
#endif
  vec3 wn = normalize(nBase - slope.x * T - slope.y * Bt);
  normal = normalize((viewMatrix * vec4(wn, 0.0)).xyz);
}`).replace(`#include <aomap_fragment>`,`#include <aomap_fragment>
if (uAO > 0.0 && vLightUv.x >= 0.0) {
  // baked ambient occlusion: full on sky/indirect light, a touch on the sun so contact shadows read in daylight
  float bao = mix(1.0, texture2D(uLight, vLightUv).r, uAO);
  reflectedLight.indirectDiffuse *= bao;
  reflectedLight.indirectSpecular *= mix(1.0, bao, 0.85);
  reflectedLight.directDiffuse *= mix(1.0, bao, 0.4);
}`).replace(`#include <clearcoat_normal_fragment_begin>`,`#include <clearcoat_normal_fragment_begin>
clearcoatNormal = normal;`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
// a little self-light keeps ink loud in shadow and at dusk (subsurface-ish glow, stronger in the thick body)
totalEmissiveRadiance += gInkCol * gInk * uInkGlow * (0.75 + 0.35 * gInkS);`).replace(`#include <lights_physical_fragment>`,`#include <lights_physical_fragment>
{
  // glossy wet coat on ink; roughness widened where the ink normal varies faster than the pixel grid (no sparkle)
  vec3 cdu = dFdx(normal), cdv = dFdy(normal);
  float kern = min(0.3 * (dot(cdu, cdu) + dot(cdv, cdv)), 0.18);
  float cr = mix(0.05, 0.035, gFresh);
  material.clearcoat = gInk;
  material.clearcoatRoughness = min(sqrt(sqrt(cr * cr * cr * cr + kern)), 1.0);
  material.roughness = mix(material.roughness, min(sqrt(sqrt(pow(material.roughness, 4.0) + kern)), 1.0), gInk);
  // the coat carries the gloss; the pigment layer underneath only adds a soft sheen (keeps the hue pure)
  material.specularColor *= 1.0 - 0.7 * gInk;
  material.specularColorBlended *= 1.0 - 0.7 * gInk;
  material.specularF90 = mix(material.specularF90, 0.35, gInk);
}`).replace(`#include <lights_fragment_maps>`,`#include <lights_fragment_maps>
// ink keeps its hue in shade: the blue sky's ambient is applied hue-neutral to the pigment
if (gInk > 0.0) {
  const vec3 LW = vec3(0.2126, 0.7152, 0.0722);
  irradiance = mix(irradiance, vec3(dot(irradiance, LW)), 0.7 * gInk);
  #if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
  iblIrradiance = mix(iblIrradiance, vec3(dot(iblIrradiance, LW)), 0.7 * gInk);
  #endif
}
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular ) && defined( USE_CLEARCOAT )
  // stylised wet reflections: bright, but pushed toward a neutral sheen so a blue sky never turns yellow ink olive
  clearcoatRadiance = mix(clearcoatRadiance, vec3(dot(clearcoatRadiance, vec3(0.2126, 0.7152, 0.0722))), 0.55 * gInk);
  clearcoatRadiance *= 1.0 + gInk * (0.5 + 0.6 * gFresh);
#endif`).replace(`#include <opaque_fragment>`,`outgoingLight = min(outgoingLight, vec3(5.0));
#include <opaque_fragment>`)},r.grate&&(i.side=2,i.defines={...i.defines||{},GRATE:1}),i.customProgramCacheKey=()=>`inkwave-level-v3`+(r.grate?`-grate`:``),i}function nn(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new D,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=rn(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=rn(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}return c}function rn(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new oe(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function an(e,t=1e-4){t=Math.max(t,2**-52);let n={},r=e.getIndex(),i=e.getAttribute(`position`),a=r?r.count:i.count,o=0,s=Object.keys(e.attributes),c={},l={},u=[],d=[`getX`,`getY`,`getZ`,`getW`],f=[`setX`,`setY`,`setZ`,`setW`];for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.attributes[n];c[n]=new r.constructor(new r.array.constructor(r.count*r.itemSize),r.itemSize,r.normalized);let i=e.morphAttributes[n];i&&(l[n]||(l[n]=[]),i.forEach((e,t)=>{let r=new e.array.constructor(e.count*e.itemSize);l[n][t]=new e.constructor(r,e.itemSize,e.normalized)}))}let p=t*.5,m=10**Math.log10(1/t),h=p*m;for(let t=0;t<a;t++){let i=r?r.getX(t):t,a=``;for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),o=r.itemSize;for(let e=0;e<o;e++)a+=`${~~(r[d[e]](i)*m+h)},`}if(a in n)u.push(n[a]);else{for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),a=e.morphAttributes[n],u=r.itemSize,p=c[n],m=l[n];for(let e=0;e<u;e++){let t=d[e],n=f[e];if(p[n](o,r[t](i)),a)for(let e=0,r=a.length;e<r;e++)m[e][n](o,a[e][t](i))}}n[a]=o,u.push(o),o++}}let g=e.clone();for(let t in e.attributes){let e=c[t];if(g.setAttribute(t,new e.constructor(e.array.slice(0,o*e.itemSize),e.itemSize,e.normalized)),t in l)for(let e=0;e<l[t].length;e++){let n=l[t][e];g.morphAttributes[t][e]=new n.constructor(n.array.slice(0,o*n.itemSize),n.itemSize,n.normalized)}}return g.setIndex(u),g}var on=Math.PI*2,sn=`
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
`,cn=`
float dHash(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float dNoise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(dHash(i), dHash(i+vec2(1.0,0.0)), u.x), mix(dHash(i+vec2(0.0,1.0)), dHash(i+vec2(1.0,1.0)), u.x), u.y); }
`;function ln(e,t,n=1){let r=new k(t).multiplyScalar(n),i=e.attributes.position.count,a=new Float32Array(i*3);for(let e=0;e<i;e++)a[e*3]=r.r,a[e*3+1]=r.g,a[e*3+2]=r.b;return e.setAttribute(`color`,new oe(a,3)),e.attributes.uv||e.setAttribute(`uv`,new oe(new Float32Array(i*2),2)),e}var un=(e,t,n,r,i=0,a=0,o=0,s=1)=>e.applyMatrix4(new g().compose(new j(t,n,r),new C().setFromEuler(new _(i,a,o,`YXZ`)),new j(s,s,s))),dn=(e,t=16)=>new d(e.map(([e,t])=>new M(e,t)),t);function fn(e,t,n=6){return new ne(new ce(e.map(e=>new j(...e))),Math.max(4,e.length*4),t,n,!1)}function pn(e){return nn(e.map(e=>{let t=e.index?e.toNonIndexed():e;for(let e of Object.keys(t.attributes))[`position`,`normal`,`color`,`uv`].includes(e)||t.deleteAttribute(e);return t}),!1)}function mn(e=256,t=!0){let n=document.createElement(`canvas`);n.width=n.height=e;let r=n.getContext(`2d`),i=e/2,a=e/256;r.clearRect(0,0,e,e),t&&(r.fillStyle=`#fff`,r.beginPath(),r.arc(i,i,118*a,0,on),r.fill(),r.globalCompositeOperation=`destination-out`,r.beginPath(),r.arc(i,i,104*a,0,on),r.fill(),r.globalCompositeOperation=`source-over`),r.fillStyle=`#fff`,r.beginPath();let o=78*a,s=i+6*a;r.moveTo(i,s-o*1),r.bezierCurveTo(i+.35*o,s-.7*o,i+.45*o,s-.45*o,i+.75*o,s-.25*o),r.bezierCurveTo(i+.55*o,s-.1*o,i+.5*o,s,i+.48*o,s+.2*o),r.bezierCurveTo(i+.46*o,s+.45*o,i+.3*o,s+.5*o,i+.32*o,s+.8*o),r.lineTo(i+.16*o,s+.62*o),r.lineTo(i+.08*o,s+.85*o),r.lineTo(i,s+.62*o),r.lineTo(i-.08*o,s+.85*o),r.lineTo(i-.16*o,s+.62*o),r.lineTo(i-.32*o,s+.8*o),r.bezierCurveTo(i-.3*o,s+.5*o,i-.46*o,s+.45*o,i-.48*o,s+.2*o),r.bezierCurveTo(i-.5*o,s,i-.55*o,s-.1*o,i-.75*o,s-.25*o),r.bezierCurveTo(i-.45*o,s-.45*o,i-.35*o,s-.7*o,i,s-o),r.fill(),r.globalCompositeOperation=`destination-out`;for(let e of[-1,1])r.beginPath(),r.ellipse(i+e*.2*o,s+.05*o,.13*o,.17*o,0,0,on),r.fill();r.globalCompositeOperation=`source-over`;for(let e of[-1,1])r.beginPath(),r.arc(i+e*.2*o+.03*o,s+.09*o,.07*o,0,on),r.fill();return n}var hn=`
${cn}
uniform vec3 uColor;
uniform float uTime;
uniform float uPulse;
uniform float uPulseT;
uniform sampler2D uEmblem;
varying vec2 vUv;
varying vec3 vW;
void main(){
  vec2 q = vUv * 2.0 - 1.0; float r = length(q); float a = atan(q.y, q.x + 1e-5);
  if (r > 1.0) discard;
  vec3 V = normalize(cameraPosition - vW);
  // glossy dark base with a soft sky reflection band and a moving sun glint
  vec3 base = mix(vec3(0.035, 0.04, 0.055), vec3(0.075, 0.085, 0.11), smoothstep(1.0, 0.0, r));
  float fres = pow(max(1.0 - clamp(V.y, 0.0, 1.0), 0.0), 3.0);
  base += vec3(0.16, 0.2, 0.26) * fres;
  // pooled ink in the centre: slow liquid swirl, wet highlight
  float n = dNoise(q * 3.2 + vec2(uTime * 0.25, -uTime * 0.18)) * 0.6 + dNoise(q * 7.0 - uTime * 0.3) * 0.4;
  float pool = smoothstep(0.58, 0.5, r + (n - 0.5) * 0.06);
  vec3 ink = uColor * (0.42 + 0.3 * n) + vec3(0.9) * pow(n, 7.0) * 1.4;
  base = mix(base, ink, pool);
  // emblem (white squid) in the pool
  vec2 eu = q / 0.46 * 0.5 + 0.5;
  float em = (eu.x > 0.0 && eu.x < 1.0 && eu.y > 0.0 && eu.y < 1.0) ? texture2D(uEmblem, eu).a : 0.0;
  base = mix(base, vec3(1.0) * (0.9 + 0.2 * uPulse), em * pool);
  // rings: bright outer rim, inner rim, dashed rotating track, radial ticks, chevrons pointing out
  float glow = 0.0;
  glow += smoothstep(0.022, 0.0, abs(r - 0.955)) * 1.3;
  glow += smoothstep(0.014, 0.0, abs(r - 0.6)) * 0.95;
  float dash = step(0.5, fract(a / 6.2831853 * 36.0 + uTime * 0.25));
  glow += smoothstep(0.018, 0.0, abs(r - 0.79)) * dash * 0.8;
  float tick = step(0.8, fract(a / 6.2831853 * 72.0)) * smoothstep(0.035, 0.0, abs(r - 0.88));
  glow += tick * 0.45;
  float sa = mod(a - uTime * 0.35, 6.2831853 / 6.0) - 3.14159265 / 6.0;
  vec2 pc = vec2(r - 0.7, sa * 0.7);
  float chev = smoothstep(0.02, 0.0, abs(pc.x - abs(pc.y) * 0.9)) * step(abs(pc.y), 0.07) * step(-0.06, pc.x);
  glow += chev * 0.9;
  // breathing idle + spawn pulse wave
  glow *= 0.85 + 0.15 * sin(uTime * 2.2);
  float wave = uPulse * smoothstep(0.09, 0.0, abs(r - uPulseT * 1.35)) * (1.0 - smoothstep(0.7, 1.35, uPulseT * 1.35));
  vec3 col = base + uColor * glow * 2.6 + (uColor * 2.2 + vec3(1.2)) * wave * 2.2;
  col += uColor * pool * uPulse * 0.8;
  // metal lip just inside the rim
  col = mix(col, vec3(0.5, 0.52, 0.56) * (0.6 + 0.6 * fres), smoothstep(0.975, 0.99, r));
  gl_FragColor = vec4(col, 1.0);
  ${sn}
}`,gn=`
uniform vec3 uColor; uniform float uTime; uniform float uAlpha; uniform float uPulse;
varying vec2 vUv; varying vec3 vW; varying vec3 vN;
void main(){
  float h = vUv.y;
  // hex lattice on the cylinder
  vec2 p = vec2(vUv.x * 64.0, h * 9.0);
  p.x += step(1.0, mod(floor(p.y), 2.0)) * 0.5;
  vec2 f = fract(p) - 0.5;
  float hexEdge = smoothstep(0.43, 0.49, max(abs(f.x) * 1.15 + abs(f.y) * 0.6, abs(f.y) * 1.2));
  float scan = smoothstep(0.08, 0.0, abs(fract(h * 1.4 - uTime * 0.45) - 0.5) - 0.44);
  float fade = pow(max(1.0 - h, 0.0), 1.6);
  float base = smoothstep(0.0, 0.06, h);
  vec3 V = normalize(cameraPosition - vW);
  float rim = pow(max(1.0 - abs(dot(normalize(vN), V)), 0.0), 2.0);
  float a = (uAlpha + uPulse * 0.5) * fade * base * (0.25 + 0.75 * hexEdge + scan * 0.6) * (0.55 + 0.45 * rim);
  a += smoothstep(0.035, 0.0, h) * (0.5 + uAlpha);
  gl_FragColor = vec4(uColor * (1.5 + uPulse), a);
  ${sn}
}`,_n=`
varying vec2 vUv; varying vec3 vW; varying vec3 vN;
void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vN = mat3(modelMatrix) * normal; gl_Position = projectionMatrix * viewMatrix * w; }`,vn=1.7,yn=1.06,bn=`uniform float uTime;
`,xn=`
  vec3 fip = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
  float fph = fip.x * 0.71 + fip.z * 0.43;
  float fk = clamp(position.x / ${vn.toFixed(2)}, 0.0, 1.0);
  float fa = position.x * 3.1 - uTime * 5.2 + fph;
  float fb = position.x * 5.7 + position.y * 3.9 - uTime * 7.9 + fph * 1.7;
  float fwav = (sin(fa) * 0.16 + sin(fb) * 0.045) * fk;
  float dwdx = (cos(fa) * 3.1 * 0.16 + cos(fb) * 5.7 * 0.045) * fk + (sin(fa) * 0.16 + sin(fb) * 0.045) / ${vn.toFixed(2)};
  float dwdy = cos(fb) * 3.9 * 0.045 * fk;
`;function Sn(e,t){let n=new x({map:e,roughness:.78,metalness:0,side:2});return n.onBeforeCompile=e=>{e.uniforms.uTime=t,e.vertexShader=bn+e.vertexShader.replace(`#include <beginnormal_vertex>`,`#include <beginnormal_vertex>
        ${xn}
        objectNormal = normalize(vec3(-dwdx, -dwdy, 1.0));`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
        transformed.z += fwav;
        transformed.y -= fk * fk * 0.06 + fk * 0.03 * (0.5 + 0.5 * sin(uTime * 2.3 + fph));
        transformed.x -= fk * abs(fwav) * 0.12;`),e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,``).replace(`#include <color_fragment>`,`
        vec4 fTx = texture2D(map, vMapUv);
        #if defined( USE_COLOR )
          diffuseColor.rgb *= vColor.rgb;
        #endif
        // hoist sleeve + fly-end hem stripes and the white emblem
        float sleeve = smoothstep(0.075, 0.065, vMapUv.x);
        float hem = smoothstep(0.955, 0.965, vMapUv.x);
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.93), max(fTx.a, sleeve));
        diffuseColor.rgb *= 1.0 - hem * 0.35;`)},n}function Cn(e){let t=new b({depthPacking:S,side:2});return t.onBeforeCompile=t=>{t.uniforms.uTime=e,t.vertexShader=bn+t.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
      ${xn}
      transformed.z += fwav;`)},t}function wn(e){let t=new x({vertexColors:!0,roughness:.62,metalness:0,side:2});return t.onBeforeCompile=t=>{t.uniforms.uTime=e,t.vertexShader=`uniform float uTime;
attribute float sway;
`+t.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
      float sph = position.x * 0.37 + position.z * 0.29;
      transformed.x += sin(uTime * 1.6 + sph) * 0.07 * sway;
      transformed.z += cos(uTime * 1.25 + sph * 1.3) * 0.06 * sway;
      transformed.y += sin(uTime * 2.1 + sph * 2.0) * 0.045 * sway * sway;`)},t}var Tn=class{constructor(e,t){this.scene=e,this.level=t,this.group=new v,this.group.name=`decor`,e.add(this.group),this.pads=[],this.flags=[],this.barriers=[],this.time=0,this.uTime={value:0},this.emblem=new ye(mn(256,!0)),this.emblem.colorSpace=Se,this.emblem.anisotropy=4,this._buildPads(),this._buildLamps(),this._buildPalms(),this._buildFlags()}_buildPads(){let e=this.level,t=[];t.push(ln(dn([[1.93,.072],[1.97,.074],[2.01,.1],[2.1,.104],[2.17,.078],[2.2,.04],[2.22,0]],72),2830138)),t.push(ln(un(new we(2.055,.016,6,96),0,.104,0,Math.PI/2),10134445));for(let e=0;e<24;e++){let n=e/24*on;t.push(ln(un(new ae(.022,.026,.02,8),Math.cos(n)*2.12,.1,Math.sin(n)*2.12),12107976))}for(let e=0;e<8;e++){let n=e/8*on+.2;t.push(ln(un(new _e(.26,.014,.03),Math.cos(n)*2.135,.093,Math.sin(n)*2.135,0,-n-Math.PI/2),1316379))}let n=pn(t),r=new x({vertexColors:!0,roughness:.32,metalness:.55});this._padBase={geo:n,mat:r};for(let t=0;t<2;t++){let i=e.spawnPads[t],a=new v;a.position.copy(i);let o=new P(n,r);o.receiveShadow=!0,o.name=`spawnPad:base`,a.add(o);let s=new N({uniforms:{uColor:{value:new k},uTime:{value:0},uPulse:{value:0},uPulseT:{value:1},uEmblem:{value:this.emblem}},vertexShader:_n,fragmentShader:hn}),c=new P(new Ce(1.95,96).rotateX(-Math.PI/2),s);c.position.y=.076,c.name=`spawnPad:face`,a.add(c);let l=new N({transparent:!0,depthWrite:!1,side:2,blending:2,uniforms:{uColor:{value:new k},uTime:{value:0},uAlpha:{value:.12},uPulse:{value:0}},vertexShader:_n,fragmentShader:gn}),u=new P(new ae(e.spawnBarrier,e.spawnBarrier,2.6,96,1,!0),l);u.position.y=1.3,u.name=`spawnPad:barrier`,a.add(u),this.group.add(a),this.pads.push({g:a,padMat:s,barMat:l,team:t,pulse:0,pulseT:1})}}pulse(e,t=1){let n=this.pads[e];n&&(n.pulse=Math.min(1.5,Math.max(n.pulse,t)),n.pulseT=0)}_buildLamps(){let e=this.level.layout,t=[...e.decor.lamps,...e.decor.lamps.map(([e,t])=>[-e,-t])],n=[],r=[],i=3094855,a=14267482;for(let[e,o]of t){let t=Math.max(0,this.level.groundHeight(e,o)),s=e>0?-1:1,c=(r,i,a)=>{r.translate(e,t,o),n.push(ln(r,i,a))};c(dn([[0,0],[.27,0],[.28,.04],[.24,.1],[.24,.16],[.2,.2],[.19,.42],[.21,.46],[.15,.52],[.12,.62],[.1,.7],[0,.7]],20),i),c(dn([[.1,.7],[.085,.9],[.075,3.6],[.068,5.05],[0,5.05]],14),i);for(let e of[.9,2.6,4.55])c(un(new we(.088,.018,6,20),0,e,0,Math.PI/2),a);c(fn([[0,4.9,0],[.18*s,5.18,0],[.55*s,5.22,0],[.9*s,5.08,0]],.032,7),i),c(fn([[.02*s,4.45,0],[.22*s,4.62,0],[.4*s,4.95,0],[.5*s,5.18,0]],.016,5),i),c(un(new be(.06,10,8),0,5.12,0),a);let l=.92*s;c(un(dn([[0,.3],[.08,.29],[.26,.12],[.3,.08],[.29,.06],[.1,.06],[0,.06]],20),l,4.92,0),i),c(un(new be(.05,10,8),l,5.26,0),a),c(un(dn([[0,-.26],[.07,-.25],[.13,-.2],[.15,-.16],[0,-.16]],16),l,4.92,0),i);for(let e=0;e<4;e++){let t=e/4*on+.4;c(un(new ae(.011,.011,.26,5),l+Math.cos(t)*.16,4.89,Math.sin(t)*.16),i)}let u=dn([[.001,-.18],[.1,-.16],[.17,-.05],[.18,.02],[.13,.07],[.001,.08]],18);u.translate(e+l,t+4.93,o),r.push(ln(u,15854816));let d=new be(.075,12,8);d.translate(e+l,t+4.9,o),r.push(ln(d,16773583,1))}if(!t.length)return;let o=new P(pn(n),new x({vertexColors:!0,roughness:.42,metalness:.55}));o.castShadow=!0,o.receiveShadow=!0,o.name=`lamps:body`,this.bulbMat=new x({vertexColors:!0,roughness:.18,metalness:0,emissive:16767392,emissiveIntensity:.9,transparent:!0,opacity:.92});let s=new P(pn(r),this.bulbMat);s.name=`lamps:glass`,this.group.add(o,s)}_buildPalms(){let e=this.level.layout,t=[...e.decor.palms,...e.decor.palms.map(([e,t])=>[-e,-t])];if(!t.length)return;let r=[],i=[],a=7,o=()=>(a=a*16807%2147483647,(a-1)/2147483646);for(let[e,a]of t){let t=Math.max(0,this.level.groundHeight(e,a)),s=o()*on,c=Math.cos(s),l=Math.sin(s),u=4.7+o()*.5,d=1+o()*.4,f=new ue(new j(0,0,0),new j(c*d*.1,u*.4,l*d*.1),new j(c*d*.55,u*.75,l*d*.55),new j(c*d,u,l*d)),p=new ne(f,44,1,12,!1),m=p.attributes.position,h=p.attributes.normal,g=new Float32Array(m.count*3),_=new k(10122832),v=new k(8215613),y=new k;for(let e=0;e<m.count;e++){let t=Math.floor(e/13),n=t/44,r=f.getPoint(n),i=t%3==0?1.12:1,a=(.2-.075*n+(n<.06?(.06-n)*2.2:0))*i;m.setXYZ(e,r.x+h.getX(e)*a,r.y+h.getY(e)*a,r.z+h.getZ(e)*a),y.copy(t%3==0?v:_).multiplyScalar(.85+.25*n),g[e*3]=y.r,g[e*3+1]=y.g,g[e*3+2]=y.b}p.setAttribute(`color`,new oe(g,3)),p.computeVertexNormals(),p.translate(e,t,a),r.push(p);let b=f.getPoint(1).add(new j(e,t,a));r.push(ln(un(new be(.2,12,8),b.x,b.y+.02,b.z),7295542));for(let e=0;e<4;e++){let t=e/4*on+o();r.push(ln(un(new be(.11,10,8),b.x+Math.cos(t)*.15,b.y-.14,b.z+Math.sin(t)*.15),5982764))}let x=[],S=[],C=[],w=[],T=(e,t,n,r,i)=>(x.push(e,t,n),S.push(r.r,r.g,r.b),C.push(i),x.length/3-1),E=new k(3501877),O=new k(8832350),ee=new k(10461258),te=new k,re=new k;for(let e=0;e<12;e++){let t=e%3==2,n=e/12*on+o()*.35,r=(t?2:2.3)+o()*.5,i=t?.05:e%2?.55:.35,a=Math.cos(n),s=Math.sin(n),c=-s,l=a,u=[];for(let e=0;e<=18;e++){let n=e/18;u.push([b.x+a*r*n,b.y+.05+i*n-(t?1.7:1.35)*n*n,b.z+s*r*n,n])}let d=-1,f=-1;for(let[e,t,n,r]of u){te.copy(E).lerp(O,r*.5);let i=.03*(1-r*.7),a=T(e+c*i,t+.01,n+l*i,te,r),o=T(e-c*i,t+.01,n-l*i,te,r);d>=0&&w.push(d,a,o,d,o,f),d=a,f=o}for(let e=2;e<18;e++){let[n,r,i,a]=u[e],[s,d,f]=u[e+1],p=s-n,m=d-r,h=f-i,g=Math.hypot(p,m,h)||1,_=(.28+.62*Math.sin(Math.PI*Math.min(1,a*1.08))**.7)*(.9+o()*.2);te.copy(t?ee:E).lerp(O,.25+a*.35),re.copy(O).lerp(t?ee:O,.3).multiplyScalar(.95+o()*.12);for(let e of[-1,1]){let t=c*e,o=l*e,s=(.45+a*.35)*_,u=n+t*_*.82+p/g*_*.35,d=r-s,f=i+o*_*.82+h/g*_*.35,m=T(n-p/g*.035,r,i-h/g*.035,te,a),v=T(n+p/g*.035,r,i+h/g*.035,te,a),y=T(n*.45+u*.55,r*.45+d*.55+.04,i*.45+f*.55,te,Math.min(1,a+.05)),b=T(u,d,f,re,Math.min(1,a+.15));w.push(m,v,y,m,y,b,v,b,y)}}}let A=new D;A.setAttribute(`position`,new n(x,3)),A.setAttribute(`color`,new n(S,3)),A.setAttribute(`sway`,new n(C,1)),A.setIndex(w),A.computeVertexNormals(),i.push(A)}let s=new P(pn(r),new x({vertexColors:!0,roughness:.88,metalness:0}));s.castShadow=!0,s.receiveShadow=!0,s.name=`palms:trunk`;let c=new P(nn(i,!1),wn(this.uTime));c.castShadow=!0,c.receiveShadow=!0,c.name=`palms:fronds`,this.group.add(s,c)}_buildFlags(){let e=this.level.layout,t=[...e.decor.flags.map(e=>({p:e,team:0})),...e.decor.flags.map(([e,t,n])=>({p:[-e,t,-n],team:1}))];if(!t.length)return;let n=[],r=14267482,i=3817288;for(let{p:e}of t){let[t,a,o]=e,s=(e,r)=>{e.translate(t,a,o),n.push(ln(e,r))};s(dn([[0,0],[.2,0],[.21,.03],[.17,.07],[.07,.1],[0,.1]],16),i),s(dn([[.065,.1],[.058,.4],[.045,4.35],[0,4.36]],12),14934232),s(un(new be(.085,14,10),0,4.43,0),r),s(un(new ae(.03,.05,.08,10),0,4.34,0),r),s(un(new _e(.04,.16,.05),-.07,1.2,0),i),s(un(new ae(.012,.012,.18,6),-.1,1.2,0,0,0,Math.PI/2),i),s(fn([[-.07,4.3,.01],[-.075,2.8,.03],[-.1,1.28,.02]],.007,4),15788760),s(fn([[.04,4.3,0],[-.03,4.3,.02],[-.07,4.26,.01]],.007,4),15788760)}let a=new P(pn(n),new x({vertexColors:!0,roughness:.38,metalness:.55}));a.castShadow=!0,a.receiveShadow=!0,a.name=`flags:poles`,this.group.add(a);let o=new l(vn,yn,26,14);o.translate(vn/2+.05,-yn/2,0);let s=o.attributes.uv,c=o.attributes.position;for(let e=0;e<s.count;e++){let t=(c.getX(e)-.05)/vn,n=(c.getY(e)+yn)/yn;s.setXY(e,t,n)}this.flagTex=new ye((()=>{let e=document.createElement(`canvas`);e.width=512,e.height=320;let t=e.getContext(`2d`);t.clearRect(0,0,512,320),t.drawImage(mn(256,!0),136,40,240,240),t.strokeStyle=`#fff`,t.lineWidth=7,t.lineCap=`round`;for(let e of[276,298]){t.beginPath();for(let n=0;n<=24;n++){let r=120+n/24*272;t.lineTo(r,e+Math.sin(n*.9)*6)}t.stroke()}return e})()),this.flagTex.colorSpace=Se,this.flagTex.anisotropy=4;let u=new se(o,Sn(this.flagTex,this.uTime),t.length),d=new g;t.forEach(({p:e},t)=>{d.makeTranslation(e[0],e[1]+4.28,e[2]),u.setMatrixAt(t,d),u.setColorAt(t,new k(1,1,1))}),u.customDepthMaterial=Cn(this.uTime),u.castShadow=!0,u.receiveShadow=!0,u.frustumCulled=!1,u.name=`flags:cloth`,this.group.add(u),this.flagMesh=u,this.flags=t.map(({team:e},t)=>({team:e,index:t}))}setTeamColors(e){for(let t of this.pads)t.padMat.uniforms.uColor.value.copy(e[t.team]),t.barMat.uniforms.uColor.value.copy(e[t.team]);if(this.flagMesh){for(let t of this.flags)this.flagMesh.setColorAt(t.index,e[t.team]);this.flagMesh.instanceColor.needsUpdate=!0}}update(e){this.time+=e,this.uTime.value=this.time;for(let t of this.pads){t.pulseT=Math.min(3,t.pulseT+e),t.pulse=Math.max(0,t.pulse-e*.9);let n=t.padMat.uniforms,r=t.barMat.uniforms;n.uTime.value=this.time,n.uPulse.value=t.pulse,n.uPulseT.value=t.pulseT,r.uTime.value=this.time,r.uPulse.value=t.pulse;let i=0;for(let e of F.actors){if(e.team===t.team||!e.alive)continue;let n=Math.hypot(e.pos.x-t.g.position.x,e.pos.z-t.g.position.z);i=Math.max(i,1-Math.min(1,Math.max(0,(n-this.level.spawnBarrier)/4)))}r.uAlpha.value=.12+i*.55}}},En=2048,Dn=256,On=4,kn=`#27304d`,An=`#ec7a6b`,jn=`#3fa8a2`,Mn=`#eec35c`,Nn=`#fbf5e8`;async function Pn(){try{await document.fonts.load(`120px "Titan One"`)}catch{}let t=document.createElement(`canvas`);t.width=En,t.height=Dn*On;let n=t.getContext(`2d`);n.clearRect(0,0,En,Dn*On);let r=e=>`${e}px "Titan One", "Arial Black", sans-serif`;Ln(n,0,r),Rn(n,Dn,r),zn(n,Dn*2,r),Bn(n,Dn*3,r);let i=new ye(t);return i.colorSpace=Se,i.anisotropy=8,i.wrapS=e,i.generateMipmaps=!0,i.minFilter=c,i}function Fn(e,t,n,r,i,a){e.fillStyle=a,e.beginPath();for(let a=0;a<=48;a++){let o=a/48*Math.PI*2,s=r*(1+.12*Math.sin(o*3+i)+.08*Math.sin(o*7+i*2)),c=t+Math.cos(o)*s,l=n+Math.sin(o)*s;a===0?e.moveTo(c,l):e.lineTo(c,l)}e.fill()}function In(e,t,n,r,i,a=Nn){e.save(),e.translate(t,n),e.scale(r,r),e.fillStyle=i,e.beginPath(),e.moveTo(0,-60),e.bezierCurveTo(34,-40,34,10,26,22),e.lineTo(-26,22),e.bezierCurveTo(-34,10,-34,-40,0,-60),e.fill(),e.beginPath(),e.moveTo(-18,-44),e.lineTo(-46,-30),e.lineTo(-22,-22),e.fill(),e.beginPath(),e.moveTo(18,-44),e.lineTo(46,-30),e.lineTo(22,-22),e.fill();for(let t=0;t<5;t++)e.beginPath(),e.ellipse(-20+t*10,34,5,14,(t-2)*.15,0,Math.PI*2),e.fill();e.fillStyle=a,e.beginPath(),e.ellipse(-10,2,7,9,0,0,Math.PI*2),e.ellipse(10,2,7,9,0,0,Math.PI*2),e.fill(),e.fillStyle=kn,e.beginPath(),e.arc(-9,4,3.5,0,Math.PI*2),e.arc(11,4,3.5,0,Math.PI*2),e.fill(),e.restore()}function Ln(e,t,n){e.save(),e.translate(0,t),e.fillStyle=kn,e.fillRect(0,150,En,70),e.fillStyle=Mn,e.fillRect(0,150,En,10),e.fillStyle=An,e.fillRect(0,214,En,8);for(let t=0;t<2;t++){let r=t*1024;Fn(e,r+170,120,88,1+t,jn),In(e,r+170,128,1.25,Nn,kn),e.font=n(150),e.textBaseline=`alphabetic`,e.lineJoin=`round`,e.lineWidth=22,e.strokeStyle=Nn,e.strokeText(`INKWAVE`,r+300,186),e.fillStyle=kn,e.fillText(`INKWAVE`,r+300,186),e.fillStyle=An,e.fillText(`INKWAVE`,r+294,180),e.font=n(34),e.fillStyle=Nn,e.fillText(`TURF RIOT  •  TIDEWATER PLAZA`,r+320,207),Fn(e,r+960,70,26,5+t,Mn),Fn(e,r+925,110,12,7+t,Mn)}e.restore()}function Rn(e,t,n){e.save(),e.translate(0,t),e.fillStyle=jn,e.fillRect(0,60,En,140),e.fillStyle=Nn;for(let t=0;t<En;t+=128)e.beginPath(),e.moveTo(t+20,80),e.lineTo(t+70,80),e.lineTo(t+110,130),e.lineTo(t+70,180),e.lineTo(t+20,180),e.lineTo(t+60,130),e.closePath(),e.fill();e.fillStyle=kn,e.fillRect(0,60,En,8),e.fillRect(0,192,En,8),e.restore()}function zn(e,t,n){e.save(),e.translate(0,t);for(let t=0;t<2;t++){let r=t*1024;e.fillStyle=An,Vn(e,r+40,30,944,150,40),e.fill(),e.fillStyle=Nn,Vn(e,r+54,44,916,122,30),e.fill(),e.font=n(92),e.fillStyle=kn,e.textBaseline=`middle`,e.fillText(`TIDE SNACKS`,r+250,108),e.fillStyle=Mn,e.beginPath(),e.moveTo(r+140,150),e.lineTo(r+110,90),e.lineTo(r+170,90),e.closePath(),e.fill(),In(e,r+140,86,.7,An,Nn);for(let t=0;t<1024;t+=64)e.fillStyle=t/64%2?Nn:An,e.beginPath(),e.arc(r+t+32,212,30,0,Math.PI),e.fill()}e.restore()}function Bn(e,t,n){e.save(),e.translate(0,t);for(let t=0;t<2;t++){let r=t*1024;e.font=n(110),e.textBaseline=`middle`,e.fillStyle=`rgba(251,245,232,0.92)`,e.fillText(`KRAKEN`,r+140,110),e.font=n(44),e.fillText(`LINES  ~  SEA FREIGHT`,r+150,190),e.strokeStyle=`rgba(251,245,232,0.92)`,e.lineWidth=16,e.lineCap=`round`,e.beginPath(),e.moveTo(r+40,140),e.bezierCurveTo(r+70,60,r+120,200,r+110,70),e.stroke(),e.beginPath(),e.arc(r+105,64,12,0,Math.PI*2),e.stroke()}e.restore()}function Vn(e,t,n,r,i,a){e.beginPath(),e.moveTo(t+a,n),e.arcTo(t+r,n,t+r,n+i,a),e.arcTo(t+r,n+i,t,n+i,a),e.arcTo(t,n+i,t,n,a),e.arcTo(t,n,t+r,n,a),e.closePath()}var Hn=344,Un=160;function Wn(e){let t=e=>e.kind===`box`?{...e,min:[-e.max[0],e.min[1],-e.max[2]],max:[-e.min[0],e.max[1],-e.min[2]]}:{...e,low:[-e.low[0],e.low[1],-e.low[2]],high:[-e.high[0],e.high[1],-e.high[2]]};return[...e.single,...e.half,...e.half.map(t)]}function Gn(e,t=`day`,n=[`#18c7e8`,`#ff4a5a`]){let r=e.bounds,i=Math.min((Hn-20)/(r.maxZ-r.minZ),(Un-20)/(r.maxX-r.minX)),a=(Hn-(r.maxZ-r.minZ)*i)/2,o=(Un-(r.maxX-r.minX)*i)/2,s=e=>a+(e-r.minZ)*i,c=e=>o+(r.maxX-e)*i,l=t===`sunset`,u=l?[`#ffb36b`,`#e0607e`,`#5b3b9a`]:[`#7fe3f5`,`#2fb1e6`,`#1e76cf`],d=`<defs><linearGradient id="tsea${e.id}${t}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${u[0]}"/><stop offset=".55" stop-color="${u[1]}"/><stop offset="1" stop-color="${u[2]}"/></linearGradient>
    <pattern id="tgr${e.id}" width="2.4" height="2.4" patternUnits="userSpaceOnUse"><rect width="2.4" height="2.4" fill="#8fa0b3"/><rect width="1.2" height="1.2" fill="#dfe6ee"/></pattern>
    <pattern id="tst${e.id}" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="4" height="4" fill="#f4ecdc"/><rect width="2" height="4" fill="#ffd66b"/></pattern></defs>`,f=[`<rect width="${Hn}" height="${Un}" fill="url(#tsea${e.id}${t})"/>`];for(let e=0;e<6;e++){let t=14+e*26,n=e*53%300;f.push(`<path d="M${n} ${t} q8 -5 16 0 t16 0" stroke="#fff" stroke-opacity=".35" stroke-width="2.4" fill="none" stroke-linecap="round"/>`)}let p=Wn(e).map(e=>{if(e.kind===`box`)return{x0:e.min[0],x1:e.max[0],z0:e.min[2],z1:e.max[2],top:e.max[1],d:e};let t=e.high[0]-e.low[0],n=e.high[2]-e.low[2],r=Math.abs(n)>Math.abs(t),i=e.width/2;return r?{x0:e.low[0]-i,x1:e.low[0]+i,z0:Math.min(e.low[2],e.high[2]),z1:Math.max(e.low[2],e.high[2]),top:e.high[1],ramp:!0,d:e}:{x0:Math.min(e.low[0],e.high[0]),x1:Math.max(e.low[0],e.high[0]),z0:e.low[2]-i,z1:e.low[2]+i,top:e.high[1],ramp:!0,d:e}}).sort((e,t)=>e.top-t.top);for(let t of p){let n=s(t.z0),r=c(t.x1),a=(t.z1-t.z0)*i,o=(t.x1-t.x0)*i,u=t.top;u>.2&&!t.ramp&&!t.d.grate&&f.push(`<rect x="${(n+1.2+u*.35).toFixed(1)}" y="${(r+1.2+u*.45).toFixed(1)}" width="${a.toFixed(1)}" height="${o.toFixed(1)}" rx="1.2" fill="#1b2a44" opacity=".28"/>`);let d;if(t.d.grate)d=`url(#tgr${e.id})`;else if(t.ramp)d=`url(#tst${e.id})`;else if(u<=.05)d=l?`#f1cfae`:`#f3ecdd`;else{let e=Math.min(1,u/5);d=qn(l?`#e8bf99`:`#e7dcc6`,l?`#fbe6d0`:`#ffffff`,e)}let p=t.d.pattern===5&&t.d.color?t.d.color:null;f.push(`<rect x="${n.toFixed(1)}" y="${r.toFixed(1)}" width="${a.toFixed(1)}" height="${o.toFixed(1)}" rx="${u>.05?1.4:2.5}" fill="${p||d}" stroke="#2a3552" stroke-opacity="${u>.05?.35:.15}" stroke-width="1"/>`)}return e.spawnPads.forEach(([e,,t],r)=>{let i=s(t),a=c(e),o=n[r];for(let e=0;e<5;e++){let t=e*1.7+r*2,n=9+e%3*6,s=i+Math.cos(t)*n*(r?-1.4:1.4)+(r?-14:14),c=a+Math.sin(t)*n;f.push(Kn(s,c,5+e%2*3.5,o,e+r*7))}f.push(`<circle cx="${i}" cy="${a}" r="7.5" fill="none" stroke="#fff" stroke-width="3"/><circle cx="${i}" cy="${a}" r="7.5" fill="none" stroke="${o}" stroke-width="1.6"/>`)}),`<svg viewBox="0 0 ${Hn} ${Un}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${d}${f.join(``)}</svg>`}function Kn(e,t,n,r,i){let a=``;for(let r=0;r<=14;r++){let o=r/14*Math.PI*2,s=n*(1+.18*Math.sin(o*3+i)+.1*Math.sin(o*5+i*2));a+=`${r?`L`:`M`}${(e+Math.cos(o)*s).toFixed(1)} ${(t+Math.sin(o)*s).toFixed(1)}`}return`<path d="${a}Z" fill="${r}" opacity=".92"/>`}function qn(e,t,n){let r=parseInt(e.slice(1),16),i=parseInt(t.slice(1),16),a=e=>Math.round((r>>e&255)*(1-n)+(i>>e&255)*n);return`#${(a(16)<<16|a(8)<<8|a(0)).toString(16).padStart(6,`0`)}`}var K=Math.PI,Jn={tidewater:[{type:`bench`,pos:[-23.2,0,-26],rotY:K/2},{type:`bench`,pos:[-23.2,0,26],rotY:K/2},{type:`trashbin`,pos:[-23.4,0,-23.6]},{type:`bollard`,pos:[-24.7,1.05,-12]},{type:`bollard`,pos:[-24.7,1.05,-2]},{type:`lifering`,pos:[-24.6,1.05,18]},{type:`awning`,pos:[17.35,2.7,-37.5],rotY:-K/2,width:4.2},{type:`vending`,pos:[16.6,0,-34.2],rotY:-K/2,variant:0},{type:`vending`,pos:[16.6,0,-35.4],rotY:-K/2,variant:1},{type:`sign`,pos:[19.8,3.2,-35.2],rotY:0,width:3.2,height:1.1,variant:1},{type:`acunit`,pos:[22.1,1.8,-38.5],rotY:K/2},{type:`banner`,pos:[-9.4,2.2,-36.5],team:0},{type:`banner`,pos:[9.4,2.2,-36.5],team:0},{type:`speaker`,pos:[-7.8,2.2,-42.6],rotY:.3},{type:`speaker`,pos:[7.8,2.2,-42.6],rotY:-.3},{type:`bunting`,pos:[-9,5.2,-43.2],rotY:0,length:18,team:0},{type:`pipes`,pos:[-19.75,.6,-32.5],rotY:K/2,length:4.5},{type:`barrel`,pos:[-23.2,0,-35.6]},{type:`barrel`,pos:[-22.6,0,-36.4],variant:1},{type:`pallet`,pos:[-23.3,0,-38.2],rotY:.2},{type:`tires`,pos:[-17.2,0,-37.8]},{type:`cone`,pos:[-8.2,0,-12.4]},{type:`cone`,pos:[-7.4,0,-12.1]},{type:`planter`,pos:[13.5,0,-8],variant:1},{type:`lightpole`,pos:[-24.1,1.05,-8],rotY:K/2},{type:`neon`,pos:[0,2.6,-43.35],rotY:0,width:4,variant:0,mirror:!0},{type:`cable`,pos:[-24.6,0,-43.4],variant:1,length:15.2,height:3.35},{type:`poster`,pos:[-21.4,1.45,-43.4],count:4,variant:0},{type:`poster`,pos:[-12.4,1.35,-43.4],count:2,variant:7},{type:`cabinet`,pos:[-24.25,1.75,-43.4],variant:1},{type:`hosereel`,pos:[-17.6,1.15,-43.4]},{type:`bikerack`,pos:[-22.9,0,-42.2],count:3,bikes:2},{type:`gascage`,pos:[-14.4,0,-42.72]},{type:`crates`,pos:[-11.9,0,-42.75],variant:2,rotY:.1},{type:`barrel`,pos:[-10.1,0,-42.8],color:`mustard`},{type:`streetsign`,pos:[-9.8,1.7,-43.4],variant:2,wall:!0},{type:`fingerpost`,pos:[-19.2,0,-34.3],variant:1,count:3},{type:`scooter`,pos:[-18.4,0,-42.7],rotY:.05,variant:1},{type:`stickers`,pos:[-19.8,1.2,-32.2],rotY:K/2,count:9,width:1.2,height:1.2},{type:`cooler`,pos:[-6.3,2.2,-42.85],rotY:.25},{type:`deckchair`,pos:[-5.5,2.2,-41.7],rotY:.5},{type:`stickers`,pos:[-7.6,2.6,-35.6],rotY:K,count:6,width:2,height:.45},{type:`stringlights`,pos:[-8.6,3,-35.3],length:17.2,height:2.7,sag:.75,posts:!0},{type:`poster`,pos:[19.6,1.55,-40],rotY:K,count:3,variant:5},{type:`ferryboard`,pos:[20.2,1.6,-35],wall:!0},{type:`stickers`,pos:[18.2,1,-35],count:7,width:.9,height:1.2},{type:`cooler`,pos:[21.4,0,-43],variant:1},{type:`stringlights`,pos:[-23.5,0,-42],rotY:-K/2,length:22,height:4.45,sag:.9},{type:`bike`,pos:[-24,0,-12.5],rotY:-K/2+.05},{type:`bike`,pos:[-23.95,0,-10.6],rotY:-K/2-.08,variant:1},{type:`newsbox`,pos:[-23.9,0,-24.4],rotY:K/2,variant:0},{type:`net`,pos:[-24.15,0,-1.2],rotY:-K/2,length:2.6},{type:`crabtrap`,pos:[-23.8,0,2.6],rotY:K/2,variant:1},{type:`ropecoil`,pos:[-23.75,0,4.75],variant:0},{type:`streetsign`,pos:[-24.7,1.05,5.4],variant:3,size:.5,height:1},{type:`poster`,pos:[-2.7,1.45,-5],rotY:K,count:3,variant:8},{type:`streetsign`,pos:[-5,1.85,-3.1],rotY:-K/2,variant:6,wall:!0},{type:`stickers`,pos:[-5,.9,-1.6],rotY:-K/2,count:8,width:1.6,height:.8},{type:`poster`,pos:[-9.2,1.45,-20.6],rotY:K/2,count:3,variant:1},{type:`poster`,pos:[-10.2,1.45,-15.4],rotY:-K/2,count:2,variant:6},{type:`poster`,pos:[11.3,1.3,-2.2],rotY:K,count:2,variant:2},{type:`stickers`,pos:[-14.8,.45,-19.4],count:7,width:3.6,height:.5},{type:`skateboard`,pos:[-13.3,0,-19.05],variant:1},{type:`stickers`,pos:[5.8,1.1,-23.8],count:5,width:2.4,height:1.8},{type:`poster`,pos:[-14,.84,3.4],rotY:K/2,count:2,variant:9},{type:`stickers`,pos:[-14,.8,.4],rotY:K/2,count:6,width:1.6,height:.9},{type:`stickers`,pos:[-21,1.25,-27],count:7,width:1.8,height:1.5},{type:`cabinet`,pos:[14,.72,-26.8],rotY:-K/2,variant:1},{type:`stickers`,pos:[14,.6,-24.2],rotY:-K/2,count:6,width:2.4,height:.7},{type:`stickers`,pos:[-6.5,.7,-27.8],rotY:K,count:5,width:1.2,height:1.1},{type:`streetsign`,pos:[9.5,1.72,-1.7],rotY:-K/2,variant:7,wall:!0},{type:`hydrant`,pos:[9.5,.75,-1.7],rotY:-K/2,variant:1}],kelpline:[{type:`railing`,pos:[-6.9,2.8,-6.6],rotY:-K/2,length:13.2,mirror:!1},{type:`railing`,pos:[6.9,2.8,6.6],rotY:K/2,length:13.2,mirror:!1},{type:`container_door`,pos:[-18.8,0,-36.02],rotY:K},{type:`container_door`,pos:[15.05,0,-33.02],rotY:K},{type:`pipes`,pos:[-17.55,.5,-34],rotY:K/2,length:3.2},{type:`bollard`,pos:[-23.7,1.05,-30]},{type:`bollard`,pos:[-23.7,1.05,-38]},{type:`lifering`,pos:[-23.6,1.05,-26]},{type:`lightpole`,pos:[-23.8,2.95,-15.2],rotY:K/2},{type:`bench`,pos:[-22.9,2,-19.5],rotY:K/2},{type:`acunit`,pos:[-15.1,1,-18.5],rotY:K/2},{type:`barrier`,pos:[-21.5,0,-4.2],rotY:0,color:`#e8a33a`},{type:`barrier`,pos:[-19.3,0,-4.2],rotY:0,color:`#f2f0ea`},{type:`banner`,pos:[-9.4,3.2,-40.5],team:0},{type:`banner`,pos:[9.4,3.2,-40.5],team:0},{type:`vending`,pos:[-6.5,3.2,-46.8],rotY:0},{type:`speaker`,pos:[6.8,3.2,-46.6],rotY:-.2},{type:`bunting`,pos:[-10,6.2,-47.2],rotY:0,length:20,team:0},{type:`barrel`,pos:[-22.8,0,-44.8]},{type:`barrel`,pos:[-22.1,0,-45.6],variant:1},{type:`pallet`,pos:[-20.6,0,-46.2],rotY:.3},{type:`tires`,pos:[22.3,0,-46]},{type:`crates`,pos:[21.8,0,-27.5],variant:1},{type:`cone`,pos:[6.8,0,-15.2]},{type:`cone`,pos:[7.6,0,-15.6]},{type:`sign`,pos:[-2,4.2,-47.3],rotY:0,width:4.2,height:1.2,variant:0},{type:`neon`,pos:[11,1.9,-47.35],rotY:0,width:3.2,variant:1},{type:`cable`,pos:[-23.6,0,-47.4],variant:1,length:13.2,height:3.9},{type:`poster`,pos:[-15.6,1.5,-47.4],count:4,variant:3},{type:`hosereel`,pos:[-21.7,1.15,-47.4]},{type:`cabinet`,pos:[-11.2,1.8,-47.4],variant:1},{type:`gascage`,pos:[-12.7,0,-46.75]},{type:`palletjack`,pos:[-15.4,0,-46.6],rotY:.1},{type:`sandbags`,pos:[-23.15,0,-42.4],rotY:K/2,length:3,height:2},{type:`stringlights`,pos:[-9.6,4,-40.3],length:19.2,height:2.45,sag:.8,posts:!0},{type:`stickers`,pos:[-8.5,3.6,-40.6],rotY:K,count:5,width:2.2,height:.5},{type:`cooler`,pos:[-9.3,3.2,-46.95],rotY:.2},{type:`stickers`,pos:[-17.6,1.2,-34.8],rotY:K/2,count:8,width:1.4,height:1.2},{type:`stickers`,pos:[12,1.3,-31.8],rotY:-K/2,count:7,width:1.6,height:1.2},{type:`fingerpost`,pos:[-20.6,0,-37.1],variant:4,count:3},{type:`bike`,pos:[-22.9,0,-39.4],rotY:-K/2+.06,variant:1},{type:`stringlights`,pos:[-23,0,-40],rotY:-K/2,length:15,height:4.45,sag:.7},{type:`stickers`,pos:[-8.5,.5,-20],rotY:K,count:7,width:4.4,height:.55},{type:`skateboard`,pos:[-7.1,0,-19.05],variant:1},{type:`stickers`,pos:[6.5,.5,-13.6],rotY:K,count:6,width:4.4,height:.5},{type:`poster`,pos:[17.5,1.3,-9],rotY:K,count:2,variant:10},{type:`stickers`,pos:[15,1.2,-18.8],rotY:-K/2,count:7,width:1.8,height:1.4},{type:`stickers`,pos:[11.44,1.2,-23],rotY:K/2,count:8,width:3,height:1.4},{type:`stickers`,pos:[-6,1,-6.6],rotY:K,count:6,width:1,height:1.4},{type:`poster`,pos:[6,1.3,-6.6],rotY:K,variant:11},{type:`picnic`,pos:[-22.2,2,-12.4],rotY:K/2,variant:0,color:`coral`},{type:`pot`,pos:[-23.1,2,-21.2],variant:1},{type:`stringlights`,pos:[-23.8,2.95,-21.6],rotY:-K/2,length:5.8,height:2.2,sag:.35,posts:!0},{type:`cable`,pos:[-23.2,-2,-3],variant:1,length:9.4,height:1.75},{type:`pipes`,pos:[-6.6,-2,-3],length:5.4,count:2,height:1.4},{type:`ladder`,pos:[-19.6,-2,-3],height:2},{type:`streetsign`,pos:[-17.4,-.8,-3],wall:!0,variant:3},{type:`streetsign`,pos:[1.4,-.95,-3],wall:!0,variant:0},{type:`hosereel`,pos:[-21.3,-1,-3]},{type:`crates`,pos:[-22.4,-2,-2.1],variant:0,rotY:.15},{type:`barrel`,pos:[-22.75,-2,.7],color:`coral`},{type:`stickers`,pos:[-20,1.2,-33.4],rotY:-K/2,count:6,width:1.8,height:1.2},{type:`poster`,pos:[-15,1,-12.2],rotY:K/2,count:2,variant:4},{type:`cabinet`,pos:[-15,.95,-20.6],rotY:K/2,variant:1},{type:`stickers`,pos:[16.3,.9,-8],rotY:0,count:5,width:.6,height:1.2},{type:`hosereel`,pos:[17.3,1.1,-30.56],rotY:0}]};function Yn(e){let t=Jn[e]||[],n=[];for(let e of t){if(n.push(e),e.mirror===!1)continue;let[t,r,i]=e.pos;n.push({...e,pos:[-t,r,-i],rotY:(e.rotY||0)+K,team:e.team===void 0?void 0:1-e.team})}return n}var Xn=new j,Zn=new j,Qn=new j,q=new j,J=new j,$n=new j,er=new j,Y=new j,X=new j,tr=new j,nr=new j(0,-1,0),rr=Array.from({length:8},(e,t)=>[Math.cos(t/8*Math.PI*2),Math.sin(t/8*Math.PI*2)]),ir=[[0,0,1]];for(let e=0;e<6;e++){let t=e/6*Math.PI*2;ir.push([Math.cos(t)*.5,Math.sin(t)*.5,.75])}for(let e=0;e<8;e++){let t=e/8*Math.PI*2+.39;ir.push([Math.cos(t),Math.sin(t),.4])}var ar=class{constructor(){this.hit=!1,this.dist=0,this.point=new j,this.normal=new j,this.block=-1,this.face=-1,this.u=0,this.v=0}},or=class{constructor(){this.hit=!1,this.y=0,this.normal=new j(0,1,0),this.block=-1,this.face=-1,this.u=0,this.v=0,this.center=!1,this.grate=!1}},sr=class e{constructor(e){this.level=e,this._ids=[]}raycast(e,t,n,r=new ar,i=!1){r.hit=!1,r.dist=n,r.block=-1,r.face=-1;let a=e.x+t.x*n,o=e.z+t.z*n,s=this.level.queryBlocks(Math.min(e.x,a),Math.min(e.z,o),Math.max(e.x,a),Math.max(e.z,o),this._ids),c=this.level.blocks,l=n,u=-1,d=0,f=-1;for(let n=0;n<s.length;n++){let r=c[s[n]];if(!r.solid||i&&r.grate)continue;Xn.copy(e).sub(r.center);let a=-1/0,o=1/0,p=-1,m=0,h=!1;for(let e=0;e<3;e++){let n=r.axes[e],i=Xn.dot(n),s=t.dot(n),c=e===0?r.half.x:e===1?r.half.y:r.half.z;if(Math.abs(s)<1e-9){if(i<-c||i>c){h=!0;break}continue}let l=(-c-i)/s,u=(c-i)/s,d=-1;if(l>u){let e=l;l=u,u=e,d=1}if(l>a&&(a=l,p=e,m=d),u<o&&(o=u),a>o){h=!0;break}}h||o<0||a<0||a>l||(l=a,u=p,d=m,f=r.id)}if(f<0)return r;let p=c[f];if(r.hit=!0,r.dist=l,r.block=f,r.point.copy(e).addScaledVector(t,l),r.normal.copy(p.axes[u]).multiplyScalar(d),r.face=p.faces[u*2+(d>0?0:1)],r.face>=0){let e=this.level.faces[r.face];Qn.copy(r.point).sub(e.origin),r.u=Qn.dot(e.u),r.v=Qn.dot(e.v)}return r}segment(e,t,n=new ar,r=!1){Zn.copy(t).sub(e);let i=Zn.length();if(i<1e-6)return n.hit=!1,n;let a=(this._segDir||=new j).copy(Zn).multiplyScalar(1/i);return this.raycast(e,a,i,n,r)}los(e,t){Y.copy(t).sub(e);let n=Y.length();if(n<1e-4)return!0;let r=X.copy(Y).multiplyScalar(1/n);return!this.raycast(e,r,n-.05,this._losHit||=new ar,!0).hit}closestOnBlock(e,t,n){Xn.copy(t).sub(e.center),n.copy(e.center);for(let t=0;t<3;t++){let r=e.axes[t],i=t===0?e.half.x:t===1?e.half.y:e.half.z,a=Xn.dot(r);a>i?a=i:a<-i&&(a=-i),n.addScaledVector(r,a)}return n}collideCapsule(e,t,n,r,i=3,a=!1){r.ground=!1,r.wall=!1,r.ceiling=!1,r.groundNormal.set(0,1,0),r.wallNormal.set(0,0,0),r.groundBlock=-1,r.wallBlock=-1;let o=this.level.blocks,s=Math.max(t,n-t);for(let c=0;c<i;c++){let i=this.level.queryBlocks(e.x-t-.2,e.z-t-.2,e.x+t+.2,e.z+t+.2,this._ids),c=!1;for(let l=0;l<i.length;l++){let u=o[i[l]];if(!u.solid||a&&u.grate||e.y+n<u.aabbMin.y-.05||e.y>u.aabbMax.y+.05)continue;J.set(e.x,e.y+t,e.z),$n.set(e.x,e.y+s,e.z),Y.copy($n).sub(J);let d=Math.max(1e-6,Y.lengthSq()),f=.5;for(let e=0;e<3;e++)er.copy(J).addScaledVector(Y,f),this.closestOnBlock(u,er,q),f=Math.min(1,Math.max(0,((q.x-J.x)*Y.x+(q.y-J.y)*Y.y+(q.z-J.z)*Y.z)/d));er.copy(J).addScaledVector(Y,f),this.closestOnBlock(u,er,q),X.copy(er).sub(q);let p=X.length(),m;if(p>1e-5){if(p>=t)continue;X.multiplyScalar(1/p),m=t-p}else{Xn.copy(er).sub(u.center);let e=1/0;for(let t=0;t<3;t++){let n=u.axes[t],r=t===0?u.half.x:t===1?u.half.y:u.half.z,i=Xn.dot(n),a=r-Math.abs(i);a<e&&(e=a,X.copy(n).multiplyScalar(i>=0?1:-1))}m=e+t}e.addScaledVector(X,m+1e-4),c=!0,X.y>.6?(r.ground=!0,r.groundNormal.copy(X),r.groundBlock=u.id):X.y<-.6?r.ceiling=!0:Math.abs(X.y)<.55&&(r.wall=!0,r.wallNormal.copy(X),r.wallBlock=u.id)}if(!c)break}return r}groundProbe(e,t,n,r,i,a,o,s=!1,c=.12){o.hit=!1,o.center=!1;let l=this._gh||=new ar,u=r+i,d=-1/0,f=!1;tr.set(e,t+r,n),this.raycast(tr,nr,u,l,s),l.hit&&l.normal.y>=.68&&(f=!0,d=l.point.y,this._fillGround(o,l,!0));let p=f?d+c:-1/0,m=-1,h=this._gh2||=new ar;for(let i=0;i<rr.length;i++)tr.set(e+rr[i][0]*a,t+r,n+rr[i][1]*a),this.raycast(tr,nr,u,h,s),!(!h.hit||h.normal.y<.68)&&h.point.y>p&&(p=h.point.y,m=i,this._fillGround(o,h,!1));return o.hit=f||m>=0,o}_fillGround(e,t,n){e.y=t.point.y,e.normal.copy(t.normal),e.block=t.block,e.face=t.face,e.u=t.u,e.v=t.v,e.center=n,e.grate=t.block>=0&&!!this.level.blocks[t.block].grate}collideBody(e,t,n,r,i,a=!1,o=!1,s=3){i.ground=!1,i.wall=!1,i.ceiling=!1,i.groundNormal.set(0,1,0),i.wallNormal.set(0,0,0),i.groundBlock=-1,i.wallBlock=-1;let c=this.level.blocks,l=n+t,u=Math.max(l,r-t);for(let d=0;d<s;d++){let s=this.level.queryBlocks(e.x-t-.2,e.z-t-.2,e.x+t+.2,e.z+t+.2,this._ids),d=!1;for(let f=0;f<s.length;f++){let p=c[s[f]];if(!p.solid||o&&p.grate||e.y+r<p.aabbMin.y-.05||e.y+n>p.aabbMax.y+.05)continue;J.set(e.x,e.y+l,e.z),$n.set(e.x,e.y+u,e.z),Y.copy($n).sub(J);let m=Math.max(1e-6,Y.lengthSq()),h=.5;for(let e=0;e<3;e++)er.copy(J).addScaledVector(Y,h),this.closestOnBlock(p,er,q),h=Math.min(1,Math.max(0,((q.x-J.x)*Y.x+(q.y-J.y)*Y.y+(q.z-J.z)*Y.z)/m));er.copy(J).addScaledVector(Y,h),this.closestOnBlock(p,er,q),X.copy(er).sub(q);let g=X.length(),_;if(g>1e-5){if(g>=t)continue;X.multiplyScalar(1/g),_=t-g}else{Xn.copy(er).sub(p.center);let e=1/0;for(let t=0;t<3;t++){let n=p.axes[t],r=t===0?p.half.x:t===1?p.half.y:p.half.z,i=Xn.dot(n),a=r-Math.abs(i);a<e&&(e=a,X.copy(n).multiplyScalar(i>=0?1:-1))}_=e+t}let v=Math.hypot(X.x,X.z);if(a&&v>.3&&X.y>-.6){let t=Math.min(.45,_/v)+1e-4;e.x+=X.x/v*t,e.z+=X.z/v*t,i.wall=!0,i.wallNormal.set(X.x/v,0,X.z/v),i.wallBlock=p.id}else e.addScaledVector(X,_+1e-4),X.y>.6?(i.ground=!0,i.groundNormal.copy(X),i.groundBlock=p.id):X.y<-.6?i.ceiling=!0:Math.abs(X.y)<.6&&(i.wall=!0,i.wallNormal.copy(X),i.wallBlock=p.id);d=!0}if(!d)break}return i}bodyFits(e,t,n,r,i=!1,a=.01){let o=this.level.blocks,s=n+t,c=Math.max(s,r-t),l=this.level.queryBlocks(e.x-t-.1,e.z-t-.1,e.x+t+.1,e.z+t+.1,this._ids);for(let u=0;u<l.length;u++){let d=o[l[u]];if(!d.solid||i&&d.grate||e.y+r<d.aabbMin.y||e.y+n>d.aabbMax.y)continue;J.set(e.x,e.y+s,e.z),$n.set(e.x,e.y+c,e.z),Y.copy($n).sub(J);let f=Math.max(1e-6,Y.lengthSq()),p=.5;for(let e=0;e<3;e++)er.copy(J).addScaledVector(Y,p),this.closestOnBlock(d,er,q),p=Math.min(1,Math.max(0,((q.x-J.x)*Y.x+(q.y-J.y)*Y.y+(q.z-J.z)*Y.z)/f));if(er.copy(J).addScaledVector(Y,p),this.closestOnBlock(d,er,q),er.distanceToSquared(q)<(t-a)*(t-a))return!1}return!0}cameraProbe(e,t,n,r,i,a=.3){let o=this._camHit||=new ar;J.set(0,1,0),Math.abs(t.y)>.95&&J.set(1,0,0),Qn.crossVectors(t,J).normalize(),q.crossVectors(Qn,t).normalize();let s=n,c=n;i.floor=!1;for(let l=0;l<ir.length;l++){let u=ir[l][0],d=ir[l][1],f=ir[l][2];if(er.copy(e).addScaledVector(Qn,u*r).addScaledVector(q,d*r),this.raycast(er,t,n+a,o,!0),!o.hit)continue;let p=Math.max(0,o.dist-a);f>=1&&p<s&&(s=p,i.floor=o.normal.y>.6);let m=p+(n-p)*(1-f);m<c&&(c=m)}return i.hard=s,i.soft=Math.min(c,s),i}static pointCapsuleDist(e,t,n,r){let i=Math.min(Math.max(e.y,t.y+n),t.y+Math.max(n,r-n)),a=e.x-t.x,o=e.y-i,s=e.z-t.z;return Math.sqrt(a*a+o*o+s*s)}static segmentCapsuleDist(t,n,r,i,a,o){let s=1/0,c=0;for(let o=0;o<=6;o++){let l=o/6;Qn.copy(t).lerp(n,l);let u=e.pointCapsuleDist(Qn,r,i,a);u<s&&(s=u,c=l)}let l=Math.max(0,c-1/6),u=Math.min(1,c+1/6);for(let o=0;o<8;o++){let o=l+(u-l)/3,s=u-(u-l)/3;Qn.copy(t).lerp(n,o);let c=e.pointCapsuleDist(Qn,r,i,a);Qn.copy(t).lerp(n,s),c<e.pointCapsuleDist(Qn,r,i,a)?u=s:l=o}return o.t=(l+u)/2,Qn.copy(t).lerp(n,o.t),o.dist=e.pointCapsuleDist(Qn,r,i,a),o}};function cr(){return{ground:!1,wall:!1,ceiling:!1,groundNormal:new j(0,1,0),wallNormal:new j,groundBlock:-1,wallBlock:-1}}var lr=new j,ur=new j,dr=class{constructor(e,t){this.level=e,this.physics=t,this.step=1,this.nodes=[],this._build()}_build(){let e=this.level,t=e.bounds,n=this.step;this.x0=t.minX+n/2,this.z0=t.minZ+n/2,this.nx=Math.floor((t.maxX-t.minX)/n),this.nz=Math.floor((t.maxZ-t.minZ)/n),this.cells=Array(this.nx*this.nz),e.blocks.filter(e=>e.solid&&e.axes[1].y>.6);let r=[];for(let t=0;t<this.nz;t++)for(let i=0;i<this.nx;i++){let a=this.x0+i*n,o=this.z0+t*n,s=[];e.queryBlocks(a-.01,o-.01,a+.01,o+.01,r);for(let t of r){let n=e.blocks[t];if(!n.solid||n.axes[1].y<.6)continue;let r=n.axes[1],i=lr.copy(n.center).addScaledVector(r,n.half.y),c=i.y-(r.x*(a-i.x)+r.z*(o-i.z))/r.y;ur.set(a,c-.02,o),e.pointInBlock(n,ur,.001)&&(s.some(e=>Math.abs(e-c)<.15)||s.push(c))}let c=[];for(let n of s){if(!this._clear(a,n,o))continue;let r={id:this.nodes.length,x:a,y:n,z:o,ix:i,iz:t,nb:[],zone:-1};for(let t=0;t<2;t++){let i=e.spawnPads[t];Math.hypot(a-i.x,o-i.z)<e.spawnBarrier+.6&&n>i.y-1&&(r.zone=t)}this.nodes.push(r),c.push(r.id)}this.cells[t*this.nx+i]=c}for(let e of this.nodes)for(let t=-1;t<=1;t++)for(let n=-1;n<=1;n++){if(!n&&!t)continue;let r=e.ix+n,i=e.iz+t;if(!(r<0||i<0||r>=this.nx||i>=this.nz))for(let a of this.cells[i*this.nx+r]){let r=this.nodes[a].y-e.y,i=Math.hypot(n,t)*this.step;if(Math.abs(r)<=.5){if(n&&t&&(!this._has(e.ix+n,e.iz,e.y)||!this._has(e.ix,e.iz+t,e.y)))continue;e.nb.push({to:a,cost:i,type:`walk`})}else r>.5&&r<=1.25&&!(n&&t)?e.nb.push({to:a,cost:i+2.5,type:`jump`}):r<-.5&&r>=-3.4&&!(n&&t)&&e.nb.push({to:a,cost:i+.8,type:`drop`})}}this._prune()}_has(e,t,n){return e<0||t<0||e>=this.nx||t>=this.nz?!1:this.cells[t*this.nx+e].some(e=>Math.abs(this.nodes[e].y-n)<=.5)}_clear(e,t,n){let r=this.level,i=V.radius+.08;for(let a of[.15,.8,1.4]){if(r.pointInside(lr.set(e,t+a,n),0))return!1;for(let o=0;o<8;o++){let s=o/8*Math.PI*2;if(r.pointInside(lr.set(e+Math.cos(s)*i,t+a,n+Math.sin(s)*i),0))return!1}}return!0}_prune(){let e=this.nodes.length,t=Array.from({length:e},()=>[]);for(let e of this.nodes)for(let n of e.nb)t[e.id].push(n.to),t[n.to].push(e.id);let n=new Int32Array(e).fill(-1),r=-1,i=0,a=0;for(let o=0;o<e;o++){if(n[o]>=0)continue;let e=0,s=[o];for(n[o]=a;s.length;){let r=s.pop();e++;for(let e of t[r])n[e]<0&&(n[e]=a,s.push(e))}e>i&&(i=e,r=a),a++}this.valid=new Uint8Array(e);for(let t=0;t<e;t++)this.valid[t]=n[t]===r?1:0;this.validIds=this.nodes.filter(e=>this.valid[e.id]).map(e=>e.id)}nearest(e,t=.8){let n=Math.round((e.x-this.x0)/this.step),r=Math.round((e.z-this.z0)/this.step),i=-1,a=1/0;for(let o=0;o<=3;o++){for(let s=-o;s<=o;s++)for(let c=-o;c<=o;c++){if(Math.max(Math.abs(c),Math.abs(s))!==o)continue;let l=n+c,u=r+s;if(!(l<0||u<0||l>=this.nx||u>=this.nz))for(let n of this.cells[u*this.nx+l]){if(!this.valid[n])continue;let r=this.nodes[n];if(r.y>e.y+t)continue;let o=(r.x-e.x)**2+(r.z-e.z)**2+((r.y-e.y)*2.5)**2;o<a&&(a=o,i=n)}}if(i>=0)return i}return i}path(e,t,n,r=6e3){if(e<0||t<0)return null;let i=this.nodes.length;(!this._g||this._g.length!==i)&&(this._g=new Float32Array(i),this._from=new Int32Array(i),this._seen=new Uint32Array(i),this._closed=new Uint32Array(i),this._stamp=0);let a=this._g,o=this._from,s=this._seen,c=this._closed,l=++this._stamp,u=this.nodes,d=u[t],f=e=>Math.hypot(e.x-d.x,e.z-d.z)+Math.abs(e.y-d.y)*.5,p=new fr;a[e]=0,o[e]=-1,s[e]=l,p.push(e,f(u[e]));let m=0;for(;p.size&&m++<r;){let e=p.pop();if(e===t)break;if(c[e]===l)continue;c[e]=l;let r=u[e];for(let t of r.nb){let r=u[t.to];if(r.zone>=0&&r.zone!==n)continue;let i=a[e]+t.cost;(s[t.to]!==l||i<a[t.to])&&(s[t.to]=l,a[t.to]=i,o[t.to]=e,p.push(t.to,i+f(r)))}}if(s[t]!==l)return null;let h=[];for(let e=t;e!==-1&&(h.push(e),!(h.length>4e3));e=o[e]);return h.reverse()}edgeType(e,t){for(let n of this.nodes[e].nb)if(n.to===t)return n.type;return`walk`}},fr=class{constructor(){this.ids=[],this.pr=[]}get size(){return this.ids.length}push(e,t){let n=this.ids,r=this.pr,i=n.length;for(n.push(e),r.push(t);i>0;){let e=i-1>>1;if(r[e]<=t)break;n[i]=n[e],r[i]=r[e],i=e}n[i]=e,r[i]=t}pop(){let e=this.ids,t=this.pr,n=e[0],r=e.pop(),i=t.pop();if(e.length){let n=0,a=e.length;for(;;){let r=n*2+1,o=r+1,s=n,c=i;if(r<a&&t[r]<c&&(s=r,c=t[r]),o<a&&t[o]<c&&(s=o,c=t[o]),s===n)break;e[n]=e[s],t[n]=t[s],n=s}e[n]=r,t[n]=i}return n}};function pr(e,t,n,r){e&&e.isLocal&&!e.isBot&&F.input?.rumble?.(t,n,r)}var mr=new j;function hr(e){return mr.set(e.pos.x,e.pos.y+(e.smoothY||0),e.pos.z)}var gr=1/60,Z=new j,_r=new j,vr=new j,yr=new j,br=new g,xr=new C,Sr=new j;new k;var Cr=new j(0,1,0),wr=new j(0,-1,0),Tr=new j(0,0,1),Er=new ar,Dr=new ar,Or={t:0,dist:0},kr=Math.PI/180,Ar=class{constructor(e){this.a=e,this.reset()}reset(){this.cooldown=0,this.charge=0,this.charging=!1,this.rolling=!1,this.flick=-1,this.firingT=0,this.emptyCd=0,this.aimingSub=!1,this.bloom=0,this.spread=0,this.rollT=0,this.chargeT=0,this.flickRecover=0,this.rumbleT=0,this.rollDist=0,this.rollHits=new Map,this.chargeLoop?.stop(.05),this.chargeLoop=null,this.chargeDinged=!1,this.rollLoop?.stop(.1),this.rollLoop=null,this.lastRollPos=null}onDeath(){this.reset()}busy(){return this.charging||this.flick>=0}firingPose(){return this.firingT>0||this.charging||this.flick>=0||this.rolling}moveSpeed(){let e=this.a.weapon;return this.rolling?z(e.rollSpeed*.5,e.rollSpeed,Pe(0,.45,this.rollT)):this.flick>=0?z(e.moveSpeedFiring,e.moveSpeedFiring*.45,R(this.flick/e.flickWindup,0,1)):this.flickRecover>0?z(V.runSpeed,e.moveSpeedFiring*.6,this.flickRecover/.18):this.charging?z(V.runSpeed*.7,e.moveSpeedFiring,Math.min(1,this.charge*3)):this.firingT>0?e.moveSpeedFiring:V.runSpeed}_spreadDeg(e){let t=this.a;return e.kind===`shooter`?(t.grounded?e.spreadGround:e.spreadAir)*z(e.spreadFirst??.45,1,this.bloom):e.kind===`blaster`?t.grounded?e.spread??1.2:e.spreadAir??4:0}update(e,t){let n=this.a,r=n.weapon;switch(this.cooldown-=e,this.emptyCd-=e,this.rumbleT-=e,this.firingT=Math.max(0,this.firingT-e),this.flickRecover=Math.max(0,this.flickRecover-e),t.fire||(this.bloom=Math.max(0,this.bloom-e/(r.bloomRecover??.28))),this.spread=this._spreadDeg(r),r.kind){case`shooter`:case`blaster`:this._auto(e,t,r);break;case`charger`:this._charger(e,t,r);break;case`roller`:this._roller(e,t,r);break}let i=mt.bomb;t.sub&&!this.aimingSub&&(this.aimingSub=!0,n.ink<i.inkCost&&n.isLocal&&(F.audio?.play(`low_ink`),L(`lowink`,{actor:n,need:i.inkCost}))),this.aimingSub&&(n.fireFacing=.3),t.subReleased&&this.aimingSub&&(this.aimingSub=!1,n.ink>=i.inkCost&&(n.ink-=i.inkCost,n.lastFire=0,n.character.trigger(`throw`),F.projectiles.throwBomb(n),pr(n,.08,.22,70))),!t.sub&&!t.subReleased&&(this.aimingSub=!1)}_empty(){let e=this.a;this.emptyCd>0||(this.emptyCd=.45,e.isLocal&&(F.audio?.play(`empty_click`),L(`lowink`,{actor:e})))}_auto(e,t,n){let r=this.a;if(!t.fire){this.cooldown<0&&(this.cooldown=0);return}this.firingT=.35,r.fireFacing=.5;let i=0;for(;this.cooldown<=0&&i++<3;){if(r.ink<n.inkPerShot){this._empty(),this.cooldown+=n.fireInterval;break}r.ink-=n.inkPerShot,r.lastFire=0,this.spread=this._spreadDeg(n),n.kind===`shooter`?F.projectiles.fireShooter(r,n,this.spread):F.projectiles.fireBlaster(r,n,this.spread),this.bloom=Math.min(1,this.bloom+(n.bloomPerShot??.3)),r.character.trigger(`shoot`),this.cooldown+=n.fireInterval}}_charger(e,t,n){let r=this.a;if(t.fire&&this.cooldown<=0){if(!this.charging){if(r.ink<n.inkFull*.2){this._empty();return}this.charging=!0,this.charge=0,this.chargeT=0,this.chargeDinged=!1,(r.isLocal||r._nearCamera())&&(this.chargeLoop=F.audio?.loop(`charger_charge`,{pos:r.isLocal?void 0:r.pos,volume:r.isLocal?.55:.35,pitch:1}))}let t=R(r.ink/n.inkFull,0,1);this.chargeT=Math.min(1,this.chargeT+e/n.chargeTime);let i=this.chargeT,a=i<.2?i*1.25:.25+(i-.2)*.9375;this.charge=Math.min(t,a),r.fireFacing=.4,this.chargeLoop?.set({pitch:1+this.charge*1.5,pos:r.isLocal?void 0:r.pos}),this.charge>=1&&!this.chargeDinged&&(this.chargeDinged=!0,r.isLocal&&F.audio?.play(`charger_full`,{volume:.7}),pr(r,.05,.3,60))}else if(this.charging){this.charging=!1,this.chargeLoop?.stop(.05),this.chargeLoop=null;let e=Math.max(.12,this.charge);r.ink=Math.max(0,r.ink-n.inkFull*e),r.lastFire=0,F.projectiles.fireCharger(r,n,e),r.character.trigger(`charge_release`),this.charge=0,this.chargeT=0,this.firingT=.35,this.cooldown=.28}}_roller(e,t,n){let r=this.a;if(this.flick>=0){this.flick+=e,r.fireFacing=.4,this.flick>=n.flickWindup&&(this.flick=-1,F.projectiles.fireFlick(r,n),this.cooldown=n.flickInterval-n.flickWindup,this.firingT=.25,this.flickRecover=.18);return}if(t.firePressed&&this.cooldown<=0)if(r.ink<n.flickInk)this._empty();else{r.ink-=n.flickInk,r.lastFire=0,this.flick=0,r.character.trigger(`flick`),(r.isLocal||r._nearCamera())&&F.audio?.play(`roller_flick`,{pos:r.isLocal?void 0:r.pos,volume:.8});return}let i=t.fire&&r.grounded&&r.ink>.5&&this.cooldown<=.25;if(this.rollT=i?this.rollT+e:0,i!==this.rolling&&(this.rolling=i,i&&(this.lastRollPos=r.pos.clone(),this.rollDist=0),i&&(r.isLocal||r._nearCamera())&&(this.rollLoop=F.audio?.loop(`roll`,{pos:r.isLocal?void 0:r.pos,volume:0})),i||(this.rollLoop?.stop(.12),this.rollLoop=null)),t.fire&&r.ink<=.5&&this._empty(),!this.rolling)return;r.lastFire=0;let a=Math.hypot(r.vel.x,r.vel.z);this.rollLoop?.set({volume:R(a/n.rollSpeed,0,1)*(r.isLocal?.7:.45),pitch:.6+R(a/n.rollSpeed,0,1),pos:r.isLocal?void 0:r.pos});let o=r.pos.distanceTo(this.lastRollPos),s=Math.sin(r.yaw),c=Math.cos(r.yaw);for(let e of F.actors){if(e.team===r.team||!e.alive)continue;let t=e.pos.x-r.pos.x,i=e.pos.z-r.pos.z,o=e.pos.y-r.pos.y,l=t*s+i*c,u=Math.abs(t*c-i*s);if(l>-.2&&l<1.35&&u<n.rollWidth/2+.35&&Math.abs(o)<1.2&&a>1){let t=this.rollHits.get(e)||-9;F.time-t>.5&&(this.rollHits.set(e,F.time),F.projectiles.applyHit(r,e,n.rollDamage,`roller`))}}if(o<.28)return;this.lastRollPos.copy(r.pos),r.ink=Math.max(0,r.ink-n.rollInkPerMeter*o);let l=0,u=c,d=-s;for(let e=-1;e<=1;e++){let t=e*n.rollWidth*.33;Z.set(r.pos.x+s*.75+u*t,r.pos.y+.35,r.pos.z+c*.75+d*t),l+=F.paint.splat(Z,.62,r.team,{seed:Math.random()})}r.addTurf(l),L(`weapon:impact`,{pos:Z.set(r.pos.x+s*.75,r.pos.y+.02,r.pos.z+c*.75).clone(),normal:r.groundN?r.groundN.clone():Cr.clone(),team:r.team,kind:`roll`,radius:n.rollWidth/2}),this.rumbleT<=0&&(this.rumbleT=.12,pr(r,.04,R(a/n.rollSpeed,0,1)*.14,110))}},jr=700,Mr=class{constructor(e){this.scene=e,this.list=[],this.pool=[],this.bombs=[],this.clouds=[],this.beams=[];let n=new be(1,14,10),r=new y({color:16777215,roughness:.18,clearcoat:1,clearcoatRoughness:.08,emissive:0});r.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
      totalEmissiveRadiance += vColor.rgb * 0.18;`)},this.blobs=new se(n,r,jr),this.blobs.instanceMatrix.setUsage(Oe),this.blobs.setColorAt(0,new k),this.blobs.frustumCulled=!1,this.blobs.castShadow=!0,this.blobs.count=0,e.add(this.blobs),this.bombGeo=new be(.2,20,14),this.bombCapGeo=new ae(.07,.09,.12,12),this.bombMatCache=new Map,this.beamGeo=new ae(1,1,1,8,1,!0).rotateX(Math.PI/2).translate(0,0,.5),this.sights=new Map,this.arcGeo=new D,this.arcGeo.setAttribute(`position`,new oe(new Float32Array(192),3)),this.arcN=64,this.arcLine=new f(this.arcGeo,new m({color:16777215,dashSize:.25,gapSize:.18,transparent:!0,opacity:.95,depthTest:!1})),this.arcLine.renderOrder=10,this.arcLine.frustumCulled=!1,this.arcLine.visible=!1,this.arcRing=new P(new re(.55,.75,40).rotateX(-Math.PI/2),new t({color:16777215,transparent:!0,opacity:.8,depthWrite:!1})),this.arcRing.visible=!1,e.add(this.arcLine,this.arcRing),this.cloudGeo=new p(1,3)}clear(){for(let e of this.list)this.pool.push(e);this.list.length=0;for(let e of this.bombs)this.scene.remove(e.mesh);this.bombs.length=0;for(let e of this.clouds)this.scene.remove(e.group);this.clouds.length=0;for(let e of this.beams)this.scene.remove(e.mesh);this.beams.length=0;for(let[,e]of this.sights)this.scene.remove(e);this.sights.clear(),this.blobs.count=0}_new(){return this.pool.pop()||{pos:new j,prev:new j,vel:new j,start:new j}}_muzzle(e,t){return e.character.getMuzzle(t),vr.copy(e.pos),vr.y+=e.form===`squid`?.4:1.05,(!isFinite(t.x)||t.distanceToSquared(vr)>2.5||!F.physics.los(vr,t))&&t.copy(vr).addScaledVector(e.aimDir,.3),t}_aimFrom(e,t,n){n.copy(e.aimPoint).sub(t);let r=n.length();return r<2||n.dot(e.aimDir)<0?n.copy(e.aimDir):n.multiplyScalar(1/r),n}_spread(e,t){if(t<=0)return e;let n=t*kr*Math.sqrt(Math.random()),r=Math.random()*Math.PI*2;return _r.set(-e.z,0,e.x),_r.lengthSq()<1e-4&&_r.set(1,0,0),_r.normalize(),vr.crossVectors(e,_r),e.addScaledVector(_r,Math.cos(r)*Math.tan(n)).addScaledVector(vr,Math.sin(r)*Math.tan(n)*.55).normalize(),e}_ballistic(e,t,n,r,i,a,o,s){let c=n.x-e.x,l=n.z-e.z,u=Math.hypot(c,l);if(u<1.5||u>s||!a)return t;let d=n.y-e.y,f=Math.hypot(t.x,t.z);if(f<1e-4)return t;let p=e=>{let t=Math.cos(e)*r,n=Math.sin(e)*r,s=0,c=0,l=0;for(let e=0;e<90;e++){l+=gr;let e=s,r=c;if(l>i){n-=a*gr;let e=1-o*gr;t*=e,n*=e}if(s+=t*gr,c+=n*gr,s>=u){let t=(u-e)/Math.max(1e-6,s-e);return r+(c-r)*t}if(t<.5)break}return-1e3},m=Math.atan2(t.y,f),h=p(m)-d;if(Math.abs(h)<.01)return t;let g=m-Math.atan2(h,u),_=p(g)-d;for(let e=0;e<4&&Math.abs(_)>.005;e++){let e=_-h;if(Math.abs(e)<1e-6)break;let t=g-_*(g-m)/e;m=g,h=_,g=R(t,-1.2,1.2),_=p(g)-d}if(Math.abs(_)>.25||Math.abs(g-Math.atan2(t.y,f))>.35)return t;let v=Math.cos(g);return t.set(t.x/f*v,Math.sin(g),t.z/f*v)}fireShooter(e,t,n){let r=this._muzzle(e,Z.set(0,0,0)),i=this._aimFrom(e,r,yr);this._ballistic(r,i,e.aimPoint,t.projSpeed,t.straightTime,28,.8,t.range),this._spread(i,n??(e.grounded?t.spreadGround:t.spreadAir));let a=this._new();Object.assign(a,{type:`shot`,owner:e,team:e.team,age:0,life:1.2,straight:t.straightTime,radius:t.impactRadius,damage:t.damage,size:.15,trail:-(2.5-t.trailEvery),trailEvery:t.trailEvery,trailRadius:t.trailRadius,grav:28,drag:.8,seed:Math.random()}),a.pos.copy(r),a.prev.copy(r),a.start.copy(r),a.vel.copy(i).multiplyScalar(t.projSpeed),this.list.push(a),(e.isLocal||e._nearCamera())&&(F.audio?.play(`shoot_shooter`,{pos:e.isLocal?void 0:r,volume:e.isLocal?.55:.4}),F.fx?.muzzle(r,i,e.color,`shooter`)),L(`weapon:fire`,{actor:e,weapon:t.id,muzzle:r.clone(),dir:i.clone()});let o=e.weaponRunner;o.rumbleT<=0&&(o.rumbleT=.09,pr(e,.02,.1,40))}fireBlaster(e,t,n){let r=this._muzzle(e,Z.set(0,0,0)),i=this._aimFrom(e,r,yr);this._spread(i,n??1.2);let a=this._new();Object.assign(a,{type:`blast`,owner:e,team:e.team,age:0,life:t.range/t.projSpeed,straight:99,radius:t.impactRadius,damage:t.directDamage,size:.26,trail:-1.5,trailEvery:2.2,trailRadius:.45,grav:0,drag:0,seed:Math.random()}),a.pos.copy(r),a.prev.copy(r),a.start.copy(r),a.vel.copy(i).multiplyScalar(t.projSpeed),this.list.push(a),(e.isLocal||e._nearCamera())&&F.audio?.play(`shoot_blaster`,{pos:e.isLocal?void 0:r,volume:e.isLocal?.7:.5}),e.isLocal&&L(`recoil`,{amount:.012}),L(`weapon:fire`,{actor:e,weapon:t.id,muzzle:r.clone(),dir:i.clone()}),pr(e,.28,.4,95)}fireFlick(e,t){let n=Z.copy(e.pos);n.y+=1;let r=Math.sin(e.yaw),i=Math.cos(e.yaw),a=R(e.aimPitch,-.2,.5)+.32;for(let o=0;o<t.flickDrops;o++){let s=o/(t.flickDrops-1)*2-1,c=e.yaw+s*t.flickSpreadDeg*kr*.5+(Math.random()-.5)*.05,l=t.flickSpeed*(.82+.28*(1-Math.abs(s))+Math.random()*.08),u=this._new();Object.assign(u,{type:`drop`,owner:e,team:e.team,age:0,life:1.4,straight:0,radius:.85+Math.random()*.3,damage:t.flickDamageNear,dmgFar:t.flickDamageFar,size:.15,trail:0,trailEvery:1.8,trailRadius:.45,grav:26,drag:.4,seed:Math.random()}),u.pos.set(n.x+r*.6,n.y+.3,n.z+i*.6),u.prev.copy(u.pos),u.start.copy(u.pos);let d=Math.cos(a+(Math.random()-.5)*.12);u.vel.set(Math.sin(c)*d*l,Math.sin(a)*l,Math.cos(c)*d*l),this.list.push(u)}e.isLocal&&L(`recoil`,{amount:.007}),L(`weapon:fire`,{actor:e,weapon:t.id,muzzle:new j(n.x+r*.6,n.y+.3,n.z+i*.6),dir:new j(r,Math.sin(a),i).normalize()}),pr(e,.3,.32,110)}fireCharger(e,n,r){let i=this._muzzle(e,Z.set(0,0,0)).clone(),a=this._aimFrom(e,i,yr).clone(),o=z(n.rangeMin,n.rangeMax,r),s=r>=.999?n.damageMax:z(n.damageMin,n.damageMax*.62,r),c=F.physics.raycast(i,a,o,Er,!0),l=c.hit?c.dist:o,u=null;for(let t of F.actors)if(!(t.team===e.team||!t.alive)&&(_r.copy(i).addScaledVector(a,l),sr.segmentCapsuleDist(i,_r,hr(t),V.radius+.12,t.form===`squid`?V.squidHeight:V.height,Or),Or.dist<V.radius+.14)){let e=Or.t*l;(!u||e<u.d)&&(u={e:t,d:e})}u&&(l=u.d,this.applyHit(e,u.e,s,`charger`));let d=0,f=n.lineSplatEvery;for(let t=1.2;t<l-.3;t+=f){_r.copy(i).addScaledVector(a,t);let o=F.physics.raycast(_r,wr,3.5,Dr,!0);o.hit&&(d+=F.paint.splat(vr.copy(o.point).addScaledVector(o.normal,.1),n.lineRadius*(.8+r*.4),e.team,{seed:Math.random(),stretch:a,stretchAmt:1.2}))}c.hit&&!u&&(_r.copy(c.point).addScaledVector(c.normal,.12),d+=F.paint.splat(_r,n.impactRadius*(.6+.4*r),e.team,{seed:Math.random(),stretch:a,stretchAmt:.6}),F.fx?.burst(c.point,c.normal,e.color,{count:10,speed:4,size:.09,paint:!1}),(e.isLocal||e._nearCamera())&&F.audio?.play(`ink_hit_wall`,{pos:c.point,volume:.6}));{let t=new j().copy(i).addScaledVector(a,l);L(`weapon:fire`,{actor:e,weapon:n.id,muzzle:i.clone(),dir:a.clone(),charge:r}),L(`weapon:impact`,{pos:t,normal:c.hit&&!u?c.normal.clone():a.clone().negate(),team:e.team,kind:`charger`,radius:n.impactRadius*(.6+.4*r)})}e.addTurf(d);let p=new t({color:e.color.clone().multiplyScalar(2.2),transparent:!0,opacity:.95,depthWrite:!1}),m=new P(this.beamGeo,p);m.position.copy(i),m.quaternion.setFromUnitVectors(Tr,a);let h=.035+r*.05;m.scale.set(h,h,l),this.scene.add(m),this.beams.push({mesh:m,t:0,life:.22,th:h}),(e.isLocal||e._nearCamera())&&F.audio?.play(`shoot_charger`,{pos:e.isLocal?void 0:i,volume:e.isLocal?.8:.6}),e.isLocal&&L(`recoil`,{amount:.005+r*.013}),pr(e,.12+r*.45,.2+r*.35,80+r*90)}_bombMat(e){let t=e;return this.bombMatCache.has(t)||this.bombMatCache.set(t,new y({color:F.teamColors[e],roughness:.25,clearcoat:1,clearcoatRoughness:.1,emissive:F.teamColors[e],emissiveIntensity:0})),this.bombMatCache.get(t)}refreshColors(){for(let[e,t]of this.bombMatCache)t.color.copy(F.teamColors[e]),t.emissive.copy(F.teamColors[e])}throwVelocity(e,t,n){let r=R(e.aimPitch+.28,-.3,1.1),i=Math.cos(r);return n.set(Math.sin(e.aimYaw)*i*t+e.vel.x*.4,Math.sin(r)*t+1.5,Math.cos(e.aimYaw)*i*t+e.vel.z*.4)}throwBomb(e){let t=mt.bomb,n=new v,r=new P(this.bombGeo,this._bombMat(e.team).clone());r.castShadow=!0;let i=new P(this.bombCapGeo,new x({color:2763312,roughness:.4,metalness:.6}));i.position.y=.2,n.add(r,i);let a=Z.copy(e.pos);a.y+=1.35,n.position.copy(a),this.scene.add(n);let o=this.throwVelocity(e,t.throwSpeed,new j);this.bombs.push({kind:`bomb`,owner:e,team:e.team,mesh:n,body:r,pos:a.clone(),vel:o,fuse:-1,age:0,spin:new j(Math.random()*8,Math.random()*8,0),beepT:0}),(e.isLocal||e._nearCamera())&&F.audio?.play(`bomb_throw`,{pos:e.isLocal?void 0:e.pos,volume:.7}),L(`bomb:throw`,{actor:e,pos:a.clone(),team:e.team,radius:mt.bomb.radius})}throwStorm(e){let t=ht.storm,n=new v,r=new P(this.bombGeo,this._bombMat(e.team).clone());r.scale.setScalar(1.25),n.add(r);let i=Z.copy(e.pos);i.y+=1.45,n.position.copy(i),this.scene.add(n);let a=this.throwVelocity(e,t.throwSpeed,new j);this.bombs.push({kind:`storm`,owner:e,team:e.team,mesh:n,body:r,pos:i.clone(),vel:a,fuse:-1,age:0,spin:new j(4,6,0),beepT:0,dir:new j(a.x,0,a.z).normalize()})}_explodeBomb(e){let t=mt.bomb,n=e.pos,r=F.paint.splat(Z.copy(n).setY(n.y+.2),t.paintRadius,e.team,{seed:Math.random()});for(let i=0;i<5;i++){let i=Math.random()*Math.PI*2,a=t.paintRadius*(.6+Math.random()*.4);r+=F.paint.splat(Z.set(n.x+Math.cos(i)*a,n.y+.5,n.z+Math.sin(i)*a),.7+Math.random()*.5,e.team,{seed:Math.random()})}e.owner.addTurf(r),F.fx?.explosion(n,F.teamColors[e.team],t.radius),F.audio?.play(`bomb_explode`,{pos:n}),L(`shake`,{pos:n.clone(),amount:.6}),L(`bomb:explode`,{actor:e.owner,pos:n.clone(),team:e.team,radius:t.radius});let i=F.local;if(i&&i.alive){let e=i.pos.distanceTo(n);e<14&&pr(i,R(1-e/14,0,1)*.6,R(1-e/14,0,1)*.5,160)}for(let r of F.actors){if(r.team===e.team||!r.alive)continue;Z.copy(r.pos),Z.y+=.7;let i=Z.distanceTo(n);if(i>t.radius||!F.physics.los(_r.copy(n).setY(n.y+.3),Z))continue;let a=1-R((i-.8)/(t.radius-.8),0,1);this.applyHit(e.owner,r,z(t.damageMin,t.damageMax,a*a),`bomb`)}}_spawnCloud(e){let t=ht.storm,n=F.physics.raycast(Z.copy(e.pos).setY(e.pos.y+.5),wr,12,Er),r=n.hit?n.point.y:e.pos.y,i=new v,a=F.teamColors[e.team],o=new x({color:a.clone().lerp(new k(1,1,1),.12),roughness:.95,emissive:a,emissiveIntensity:.16,transparent:!0,opacity:.97}),s=new x({color:a.clone().lerp(new k(1,1,1),.55),roughness:.95,emissive:a,emissiveIntensity:.08,transparent:!0,opacity:.97}),c=(e,t,n,r,a)=>{let o=new P(this.cloudGeo,a);o.position.set(e,t,n),o.scale.set(r,r*.68,r),o.castShadow=!0,o.userData.bob=Math.random()*6.28,i.add(o)};c(0,0,0,1.9,o);for(let e=0;e<8;e++){let t=e/8*Math.PI*2+Math.random()*.3,n=1.7+Math.random()*.6;c(Math.cos(t)*n,-.1+Math.random()*.2,Math.sin(t)*n,1.05+Math.random()*.45,o)}for(let e=0;e<5;e++){let t=e/5*Math.PI*2+.4,n=.6+Math.random()*.8;c(Math.cos(t)*n,.75+Math.random()*.3,Math.sin(t)*n,.9+Math.random()*.4,s)}c(0,1.15,0,1,s),i.position.set(e.pos.x,r+4.6,e.pos.z),i.scale.setScalar(.01),this.scene.add(i);let l=F.audio?.loop(`storm_rain`,{pos:i.position,volume:.6});this.clouds.push({owner:e.owner,team:e.team,group:i,t:0,dur:t.duration,dir:e.dir,rainT:0,loop:l,groundY:r}),F.audio?.play(`storm_thunder`,{pos:i.position}),L(`storm:start`,{pos:i.position.clone(),team:e.team,actor:e.owner,radius:t.radius})}applyHit(e,t,n,r){if(!t.alive||t.team===e.team)return;let i=t.damage(n,e,r);L(`hit`,{attacker:e,victim:t,damage:n,killed:i,weaponId:r}),e.isLocal&&pr(e,i?.35:.06,i?.4:.16,i?150:45)}update(e){let t=this.list;for(let n=t.length-1;n>=0;n--){let r=t[n];r.age+=e,r.prev.copy(r.pos),r.age>r.straight&&(r.vel.y-=r.grav*e),r.drag&&r.vel.multiplyScalar(1-r.drag*e*(r.age>r.straight?1:0)),r.pos.addScaledVector(r.vel,e);let i=!1;for(let e of F.actors){if(e.team===r.team||!e.alive)continue;let t=e.form===`squid`?V.squidHeight:V.height;if(!(Math.abs(e.pos.x-r.pos.x)>3||Math.abs(e.pos.z-r.pos.z)>3)&&(sr.segmentCapsuleDist(r.prev,r.pos,hr(e),V.radius,t,Or),Or.dist<V.radius*.95+r.size)){Z.copy(r.prev).lerp(r.pos,Or.t);let t=r.damage;r.type===`drop`&&(t=z(r.damage,r.dmgFar,R(r.start.distanceTo(Z)/7,0,1))),this.applyHit(r.owner,e,t,r.type),F.fx?.burst(Z,_r.copy(r.vel).normalize().negate(),r.owner.color,{count:6,speed:3,size:.07}),r.type!==`blast`&&L(`weapon:impact`,{pos:Z.clone(),normal:_r.clone(),team:r.team,kind:r.type===`drop`?`drop`:`shot`,radius:r.radius*.5,victim:e}),r.type===`blast`&&this._blastBurst(r,Z,e),i=!0;break}}if(!i){let e=F.physics.segment(r.prev,r.pos,Er,!0);e.hit&&(this._impact(r,e),i=!0)}if(!i&&r.trailEvery&&(r.trail+=r.vel.length()*e,r.trail>r.trailEvery)){r.trail=0;let e=F.physics.raycast(r.pos,wr,4,Dr,!0);e.hit&&r.owner.addTurf(F.paint.splat(Z.copy(e.point).addScaledVector(e.normal,.1),r.trailRadius*(.8+Math.random()*.4),r.team,{seed:Math.random()}))}!i&&r.age>r.life&&(r.type===`blast`&&this._blastBurst(r,r.pos,null),i=!0),!i&&r.pos.y<V.waterY-1.8&&(i=!0),i&&(t[n]=t[t.length-1],t.pop(),this.pool.push(r))}this._updateBombs(e),this._updateClouds(e),this._updateBeams(e),this._draw()}_impact(e,t){Z.copy(t.point).addScaledVector(t.normal,.14),yr.copy(e.vel).normalize();let n=e.radius*(.85+Math.random()*.3),r=F.paint.splat(Z,n,e.team,{seed:e.seed,stretch:yr,stretchAmt:.7});e.owner.addTurf(r),e.type!==`blast`&&L(`weapon:impact`,{pos:t.point.clone(),normal:t.normal.clone(),team:e.team,kind:e.type===`drop`?`drop`:`shot`,radius:n}),(e.owner.isLocal||F.camera.position.distanceToSquared(t.point)<484)&&(F.fx?.burst(t.point,t.normal,e.owner.color,{count:e.type===`blast`?14:5,speed:e.type===`blast`?5:3,size:.07,paint:!1}),Math.random()<(e.type===`shot`?.45:1)&&F.audio?.play(e.type===`blast`?`splat_big`:`splat_small`,{pos:t.point,volume:e.type===`shot`?.35:.6})),e.type===`blast`&&this._blastBurst(e,t.point,null)}_blastBurst(e,t,n){let r=ft.blaster,i=t.clone();F.fx?.explosion(i,e.owner.color,r.burstRadius),F.audio?.play(`blaster_boom`,{pos:i,volume:.7}),L(`weapon:impact`,{pos:i.clone(),normal:new j(0,1,0),team:e.team,kind:`blast`,radius:r.burstRadius});let a=F.physics.raycast(_r.copy(i).setY(i.y+.2),wr,3.5,Dr);a.hit&&e.owner.addTurf(F.paint.splat(vr.copy(a.point).addScaledVector(a.normal,.1),r.impactRadius,e.team,{seed:Math.random()}));for(let t of F.actors){if(t.team===e.team||!t.alive||t===n)continue;Z.copy(t.pos),Z.y+=.7;let a=Z.distanceTo(i);a>r.splashRadius||F.physics.los(i,Z)&&this.applyHit(e.owner,t,z(r.splashDamageMax,r.splashDamageMin,a/r.splashRadius),`blaster`)}}_updateBombs(e){for(let t=this.bombs.length-1;t>=0;t--){let n=this.bombs[t];n.age+=e,n.vel.y-=24*e,Z.copy(n.pos),n.pos.addScaledVector(n.vel,e);let r=F.physics.segment(Z,n.pos,Er);if(r.hit){if(n.kind===`storm`){this._spawnCloud(n),this.scene.remove(n.mesh),this.bombs.splice(t,1);continue}n.pos.copy(r.point).addScaledVector(r.normal,.21);let e=n.vel.dot(r.normal);n.vel.addScaledVector(r.normal,-e*1.35),n.vel.multiplyScalar(r.normal.y>.6?.45:.6),r.normal.y>.6&&n.fuse<0&&(n.fuse=mt.bomb.fuse,F.audio?.play(`bomb_beep`,{pos:n.pos,volume:.6}),L(`bomb:arm`,{actor:n.owner,pos:n.pos.clone(),team:n.team,radius:mt.bomb.radius}))}if(n.kind===`storm`&&n.age>1.1){this._spawnCloud(n),this.scene.remove(n.mesh),this.bombs.splice(t,1);continue}if(n.fuse>=0){n.fuse-=e,n.beepT-=e;let r=1-n.fuse/mt.bomb.fuse;if(n.body.material.emissiveIntensity=(Math.sin(n.age*(10+r*30))*.5+.5)*(.4+r*1.8),n.mesh.scale.setScalar(1+r*.35+Math.sin(n.age*40)*.03*r),n.beepT<=0&&(n.beepT=.3-r*.2,F.camera.position.distanceToSquared(n.pos)<900&&F.audio?.play(`bomb_beep`,{pos:n.pos,volume:.35+r*.4,pitch:1+r*.25})),n.fuse<=0){this._explodeBomb(n),this.scene.remove(n.mesh),this.bombs.splice(t,1);continue}}if(n.pos.y<V.waterY-1.8){this.scene.remove(n.mesh),this.bombs.splice(t,1);continue}n.mesh.position.copy(n.pos),n.mesh.rotation.x+=n.spin.x*e*(n.fuse<0?1:.2),n.mesh.rotation.z+=n.spin.y*e*(n.fuse<0?1:.2)}}_updateClouds(e){let t=ht.storm;for(let n=this.clouds.length-1;n>=0;n--){let r=this.clouds[n];r.t+=e;let i=R(r.t/.5,0,1),a=R((r.dur-r.t)/.6,0,1),o=(.3+.7*(1-(1-i)**3))*(.2+.8*a);if(r.group.scale.setScalar(o),r.group.position.addScaledVector(r.dir,t.driftSpeed*e),r.group.children.forEach(e=>{e.position.y+=Math.sin(F.time*1.6+e.userData.bob)*.0025}),r.loop?.set({pos:r.group.position,volume:.6*a}),r.t<r.dur-.3){for(F.fx?.rain(r.group.position,t.radius*o,F.teamColors[r.team],e,{cloud:!1}),r.rainT-=e;r.rainT<=0;){r.rainT+=.045;let e=Math.random()*Math.PI*2,n=Math.sqrt(Math.random())*t.radius;Z.set(r.group.position.x+Math.cos(e)*n,r.group.position.y-.8,r.group.position.z+Math.sin(e)*n);let i=F.physics.raycast(Z,wr,12,Er);i.hit&&r.owner.addTurf(F.paint.splat(_r.copy(i.point).addScaledVector(i.normal,.1),.45+Math.random()*.35,r.team,{seed:Math.random()}))}for(let n of F.actors){if(n.team===r.team||!n.alive)continue;let i=n.pos.x-r.group.position.x,a=n.pos.z-r.group.position.z;i*i+a*a>t.radius*t.radius||n.pos.y>r.group.position.y||(Z.copy(n.pos),Z.y+=1.2,_r.set(n.pos.x,r.group.position.y-.6,n.pos.z),F.physics.los(Z,_r)&&n.damage(t.dps*e,r.owner,`storm`)&&L(`hit`,{attacker:r.owner,victim:n,damage:0,killed:!0,weaponId:`storm`}))}}r.t>=r.dur&&(r.loop?.stop(.3),L(`storm:end`,{pos:r.group.position.clone(),team:r.team,actor:r.owner}),this.scene.remove(r.group),this.clouds.splice(n,1))}}_updateBeams(e){for(let t=this.beams.length-1;t>=0;t--){let n=this.beams[t];n.t+=e;let r=n.t/n.life;n.mesh.material.opacity=.95*(1-r);let i=n.th*(1+r*2.5);n.mesh.scale.x=n.mesh.scale.y=i,r>=1&&(this.scene.remove(n.mesh),n.mesh.material.dispose(),this.beams.splice(t,1))}for(let e of F.actors){let n=e.alive&&e.weaponRunner.charging,r=this.sights.get(e);if(n){r||(r=new P(this.beamGeo,new t({color:e.color.clone().multiplyScalar(1.6),transparent:!0,opacity:.5,depthWrite:!1})),this.sights.set(e,r),this.scene.add(r));let n=this._muzzle(e,Z.set(0,0,0)),i=this._aimFrom(e,n,yr),a=e.weapon,o=z(a.rangeMin,a.rangeMax,e.weaponRunner.charge),s=F.physics.raycast(n,i,o,Er);r.position.copy(n),r.quaternion.setFromUnitVectors(Tr,i);let c=.012+e.weaponRunner.charge*.012;r.scale.set(c,c,s.hit?s.dist:o),r.material.opacity=.25+e.weaponRunner.charge*.55,r.visible=!0}else r&&(r.visible=!1)}}updateArc(e,t){if(!t||!e||!e.alive){this.arcLine.visible=!1,this.arcRing.visible=!1;return}let n=this._arcVel||=new j;this.throwVelocity(e,mt.bomb.throwSpeed,n);let r=Z.copy(e.pos);r.y+=1.35;let i=this.arcGeo.attributes.position,a=0,o=!1,s=gr,c=this._arcPrev||=new j;i.setXYZ(0,r.x,r.y,r.z),a=1;for(let e=0;e<(this.arcN-1)*2;e++){c.copy(r),n.y-=24*s,r.addScaledVector(n,s);let t=F.physics.segment(c,r,Er);if(t.hit){i.setXYZ(a,t.point.x,t.point.y,t.point.z),a++,o=!0,this.arcRing.position.copy(t.point).addScaledVector(t.normal,.03),this.arcRing.quaternion.setFromUnitVectors(Cr,t.normal);break}if((e+1)%2==0&&(i.setXYZ(a,r.x,r.y,r.z),a++),a>=this.arcN)break}i.needsUpdate=!0,this.arcGeo.setDrawRange(0,a),this.arcLine.computeLineDistances();let l=e.ink>=mt.bomb.inkCost?e.color:new k(.6,.6,.6);this.arcLine.material.color.copy(l).multiplyScalar(1.4),this.arcRing.material.color.copy(l).multiplyScalar(1.4),this.arcLine.visible=!0,this.arcRing.visible=o,this.arcRing.scale.setScalar(1+Math.sin(F.time*8)*.06)}_draw(){let e=0;for(let t of this.list){if(e>=jr)break;let n=t.vel.length();yr.copy(t.vel).multiplyScalar(1/Math.max(n,.001)),xr.setFromUnitVectors(Tr,yr);let r=1+Math.min(2.2,n*.06),i=Math.min(1,t.age*18),a=t.size*i;Sr.set(a/Math.sqrt(r),a/Math.sqrt(r),a*r),br.compose(t.pos,xr,Sr),this.blobs.setMatrixAt(e,br),this.blobs.setColorAt(e,t.owner.color),e++,e<jr&&n>8&&(Z.copy(t.pos).addScaledVector(yr,-a*r*1.9),Sr.multiplyScalar(.5),br.compose(Z,xr,Sr),this.blobs.setMatrixAt(e,br),this.blobs.setColorAt(e,t.owner.color),e++)}this.blobs.count=e,this.blobs.instanceMatrix.needsUpdate=!0,this.blobs.instanceColor&&(this.blobs.instanceColor.needsUpdate=!0)}},Nr=new j,Pr=new j,Fr=new j,Ir=new j,Lr=new j,Rr=new j,zr=new C,Br={hard:0,soft:0,floor:!1},Vr=new ar,Hr=class{constructor(e=0){this.x=e,this.v=0}reset(e){this.x=e,this.v=0}step(e,t,n){let r=this.x-e,i=Math.exp(-t*n),a=(this.v+t*r)*n;return this.x=e+(r+a)*i,this.v=(this.v-t*a)*i,this.x}};function Ur(e,t,n,r,i){let a=Math.max(1,Math.ceil(n*i/.12)),o=i/a;for(let i=0;i<a;i++)e.v+=(-n*n*(e.x-t)-2*r*n*e.v)*o,e.x+=e.v*o;return e.x}var Wr=(e,t)=>Math.sin(e+t)*.62+Math.sin(e*1.87+t*1.7)*.38,Gr=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2,Kr=class{constructor(e){this.camera=e,this.mode=`orbit`,this.yaw=0,this.pitch=-.1,this.pivot=new j,this.pivotY=0,this.dist=4.5,this.curDist=4.5,this.fovKick=0,this.trauma=0,this.shakeScale=1,this.target=null,this.spectate=null,this.path=null,this.lookAt=new j,this.baseFov=70,this.zoom=0,this.time=0,this.kick=0,this.sx=new Hr,this.sy=new Hr,this.sz=new Hr,this.boom=new Hr(4.5),this.hgt=new Hr(1.85),this.dipS={x:0,v:0},this.side=new Hr(0),this.lensLift=new Hr(0),this.wantDist=4.5,this._lastTY=null,this._landSeen=99,this._sjWasFlight=!1,this._sjLandT=99,this.kickS=new Hr(0),this._traumaIn=0,this.shakeSeed=Math.random()*100,this.blend=null,this._prevMode=this.mode,this._prevTarget=null,this.spectateT=0}recoil(e){this.kickS.v=Math.min(this.kickS.v+e*55,3)}addShake(e,t){let n=e;if(t){let e=t.distanceTo(this.camera.position);n*=R(1-(e-4)/22,0,1)}n<=0||(this._traumaIn=Math.min(1-this.trauma,this._traumaIn+n*.75))}follow(e,t=!1){if(this.mode=`follow`,this.target=e,t){let t=e.visualPos?e.visualPos(Nr):Nr.copy(e.pos),n=e.form===`squid`?1.3:1.85;this.sx.reset(t.x),this.sy.reset(t.y+n),this.sz.reset(t.z),this.pivot.set(t.x,t.y+n,t.z),this.pivotY=t.y+n,this.hgt.reset(n),this.boom.reset(this.dist),this.curDist=this.dist,this.wantDist=this.dist,this.dipS.x=0,this.dipS.v=0,this.side.reset(0),this.lensLift.reset(0),this.kickS.reset(0),this._lastTY=null,this._takeoffY=t.y,this._landSeen=e.landT??99}}cinematic(e,t,n,r,i,a){this.mode=`path`,this.path={from:e.clone(),to:t.clone(),lookFrom:n.clone(),lookTo:r.clone(),t:0,dur:i,onDone:a}}orbit(e,t,n,r=.05,i=0){this.mode=`orbit`,this.orbitP={center:e.clone(),radius:t,height:n,speed:r,phase:i}}overview(){this.mode=`overview`}_startBlend(e){let t=this.camera;this.blend||={t:0,dur:e,pos:new j,quat:new C,fov:0},this.blend.t=0,this.blend.dur=e,this.blend.pos.copy(t.position),this.blend.quat.copy(t.quaternion),this.blend.fov=t.fov,this.blend.active=!0}_modeChanged(e,t){if(this.spectateT=0,t===`overview`&&(this._ovFresh=!0),F.match?.attract||!e)return;let n=0;t===`spectate`?n=.55:t===`follow`&&e===`spectate`?n=.7:t===`follow`&&e===`path`?n=.6:t===`overview`?n=1.2:t===`follow`&&e!==`follow`&&(n=.45),n>0&&this._startBlend(n)}update(e){this.time+=e,Number.isFinite(this.pivot.x+this.pivot.y+this.pivot.z+this.pivotY+this.curDist+this.sx.x+this.sy.x+this.sz.x+this.boom.x+this.dipS.x+this.kickS.x+this.trauma)||(this.pivot.set(0,2,0),this.pivotY=2,this.curDist=this.dist,this.sx.reset(0),this.sy.reset(2),this.sz.reset(0),this.boom.reset(this.dist),this.dipS.x=0,this.dipS.v=0,this.kickS.reset(0),this.trauma=0,this._traumaIn=0),(this.mode!==this._prevMode||this.mode===`follow`&&this.target!==this._prevTarget)&&(this.mode!==this._prevMode&&this._modeChanged(this._prevMode,this.mode),this._prevMode=this.mode,this._prevTarget=this.target);let t=this.camera,n=F.settings;this.baseFov=n?.fov??82,this.mode===`follow`&&this.target?this._follow(e):this.mode===`spectate`&&this.spectate?this._spectate(e):this.mode===`path`&&this.path?this._path(e):this.mode===`orbit`&&this.orbitP?this._orbit(e):this.mode===`overview`&&this._overview(e);let r=2*Math.atan(Math.tan(this.baseFov*Math.PI/360)/(16/9))*(180/Math.PI)+(this.fovKick-this.zoom)*.8,i=this.blend;if(i&&i.active){i.t+=e;let n=Gr(R(i.t/i.dur,0,1));t.position.lerpVectors(i.pos,t.position,n),zr.copy(t.quaternion),t.quaternion.slerpQuaternions(i.quat,zr,n),r=z(i.fov,r,n),n>=1&&(i.active=!1)}if(this._traumaIn>0){let t=Math.min(this._traumaIn,e*14);this.trauma=Math.min(1,this.trauma+t),this._traumaIn-=t}else this.trauma=Math.max(0,this.trauma-e*2.1);let a=this.trauma*this.trauma*(n?.cameraShake??1)*this.shakeScale;if(a>5e-4){let e=this.time*13,n=this.shakeSeed;t.rotateX(Wr(e,n)*.014*a),t.rotateY(Wr(e*1.13,n+3.1)*.01*a),t.rotateZ(Wr(e*.87,n+7.7)*.008*a),Rr.set(1,0,0).applyQuaternion(t.quaternion),t.position.addScaledVector(Rr,Wr(e*1.07,n+11)*.025*a),t.position.y+=Wr(e*.93,n+19)*.025*a}Math.abs(t.fov-r)>.01&&(t.fov=r,t.updateProjectionMatrix()),t.updateMatrixWorld()}forward(e){let t=Math.cos(this.pitch);return e.set(Math.sin(this.yaw)*t,Math.sin(this.pitch),Math.cos(this.yaw)*t)}_follow(e){let t=this.target,n=this.camera,r=t.form===`squid`,i=t.anim.form,a=i===`swim`||i===`climb`,o=t.superJumpState,s=!!(o&&o.phase===`flight`),c=!!t.specialActive,l=t.visualPos?t.visualPos(Fr):Fr.copy(t.pos),u=a?1.15:r?1.3:1.85,d=this.hgt.step(u,11,e),f=s?20:30,p=.72*2/f,m=this.forward(Ir);Rr.set(-Math.cos(this.yaw),0,Math.sin(this.yaw));let h=R((t.vel.x*Rr.x+t.vel.z*Rr.z)*.045,-.32,.32)*(s?0:1),g=this.side.step(h,3.2,e),_=l.x+t.vel.x*p+Rr.x*g,v=l.z+t.vel.z*p+Rr.z*g,y=l.y+d;(Math.abs(this.sx.x-l.x)+Math.abs(this.sz.x-l.z)>6||Math.abs(this.sy.x-y)>6)&&(this.sx.reset(l.x),this.sz.reset(l.z),this.sy.reset(y),this._lastTY=null,this._vyF=0),this.sx.step(_,f,e),this.sz.step(v,f,e);let b=this._lastTY===null||e<=0,x=b?0:R((y-this._lastTY)/e,-30,30);this._lastTY=y,this._vyF=b?0:B(this._vyF||0,x,30,e);let S=this._vyF,C=13,w=.5;(t.grounded||t.climbing)&&(this._takeoffY=l.y),!t.grounded&&!t.climbing&&(s||c?(C=16,w=.85):l.y<(this._takeoffY??l.y)-.25?(C=15,w=.8):(C=7.5,w=.25)),this.sy.step(y+S*w*2/C,C,e),t.landT!==void 0&&(t.landT<this._landSeen-1e-6&&t.landSpeed>4&&(this.dipS.v-=R((t.landSpeed-4)*.045,0,.45)),this._landSeen=t.landT);let T=R(Ur(this.dipS,0,13,.82,e),-.3,.12);this.pivot.set(this.sx.x,this.sy.x+T,this.sz.x),this.pivotY=this.pivot.y;let E=Math.hypot(t.vel.x,t.vel.z);if(s){let t=o.to.x-o.from.x,n=o.to.z-o.from.z;t*t+n*n>1&&(this.yaw=Ie(this.yaw,Math.atan2(t,n),3.5,e));let r=R(o.t/o.dur,0,1);this.pitch=B(this.pitch,z(-.3,-.75,R((r-.35)/.5,0,1)),4,e),this._sjWasFlight=!0}else this._sjWasFlight&&(this._sjWasFlight=!1,this._sjLandT=0);this._sjLandT<.45&&(this._sjLandT+=e,this.pitch<-.2&&(this.pitch=B(this.pitch,-.16,7,e)));let D=0;a?D=R((E-6)*1.1,0,7):s?D=6:!t.grounded&&t.vel.y>2&&(D=1.2),this.fovKick=B(this.fovKick,D,5,e);let O=t.weaponRunner?.charging?t.weaponRunner.charge:0;this.zoom=B(this.zoom,O>.99?14:O*6,8,e);let ee=(r?4.1:this.dist)-O*.6;a&&(ee+=R((E-6)/6,0,1)*.35),s&&(ee+=1.2),this.wantDist=B(this.wantDist,ee,6,e),Lr.copy(m).negate(),F.physics.cameraProbe(this.pivot,Lr,this.wantDist,.62,Br);let te=Br.soft,ne=R((this.boom.x-Br.hard)/1,0,1);this.boom.step(te,te<this.boom.x?22+26*ne:3.6,e),this.boom.x>Br.hard+1.6&&(this.boom.x=Br.hard+1.6,this.boom.v=Math.min(this.boom.v,0)),Br.floor&&this.boom.x>Br.hard&&(this.boom.x=Br.hard,this.boom.v=Math.min(this.boom.v,0)),this.boom.x<.45&&(this.boom.x=.45,this.boom.v=Math.max(0,this.boom.v)),this.curDist=this.boom.x,n.position.copy(this.pivot).addScaledVector(m,-this.curDist),n.position.y+=.15;let re=F.level?.groundHeight(n.position.x,n.position.z,n.position.y+.2)??-1/0,k=re>-1/0&&re<this.pivot.y-.6?Math.max(0,re+.24-n.position.y):0;this.lensLift.step(k,k>this.lensLift.x?34:7,e),n.position.y+=this.lensLift.x;let A=R((2.8-this.curDist)/1.8,0,1),ie=.55*A*A*(3-2*A);if(ie>.01&&F.physics){let e=F.physics.raycast(n.position,Rr,ie+.25,Vr,!0);e.hit&&(ie=Math.max(0,e.dist-.25))}this.shoulder=B(this.shoulder||0,ie,8,e),this.shoulder>.001&&n.position.addScaledVector(Rr,this.shoulder),this.kick=R(this.kickS.step(0,22,e),-.01,.035),Pr.copy(this.pivot).addScaledVector(m,10),Pr.y+=.15,this.shoulder>.001&&Pr.addScaledVector(Rr,this.shoulder),n.up.set(0,1,0),n.lookAt(Pr),Math.abs(this.kick)>1e-6&&n.rotateX(this.kick)}_spectate(e){let t=this.spectate,n=this.camera;this.spectateT+=e;let r=t.actor&&t.actor.alive?t.actor:null,i=this.spectateT<.8||!r?t.pos:r.pos;Nr.copy(i),Nr.y+=1.1,this.lookAt.lerp(Nr,1-Math.exp(-(this.spectateT<.8?7:4.5)*e));let a=Pr.copy(t.from).sub(this.lookAt);a.y=0,a.lengthSq()<.01&&a.set(0,0,1),a.normalize();let o=Math.atan2(a.x,a.z)+Math.min(this.spectateT,6)*.07,s=this.spectateT<.8?4.2:5.5;a.set(Math.sin(o)*s,2.4,Math.cos(o)*s),Nr.copy(this.lookAt).add(a);let c=F.physics?.segment(this.lookAt,Nr,Vr,!0);c&&c.hit&&Nr.copy(c.point).lerp(this.lookAt,.12),n.position.lerp(Nr,1-Math.exp(-3*e)),n.up.set(0,1,0),n.lookAt(this.lookAt),this.fovKick=B(this.fovKick,-6,3,e),this.zoom=B(this.zoom,0,6,e)}_path(e){let t=this.path,n=this.camera;t.t+=e;let r=R(t.t/t.dur,0,1),i=Gr(r);if(n.position.lerpVectors(t.from,t.to,i),n.position.y+=Math.sin(i*Math.PI)*1.5,Nr.lerpVectors(t.lookFrom,t.lookTo,i),n.up.set(0,1,0),n.lookAt(Nr),this.fovKick=0,this.zoom=0,r>=1&&t.onDone){let e=t.onDone;t.onDone=null,e()}}_orbit(e){let t=this.orbitP,n=this.camera,r=t.phase+this.time*t.speed;Nr.set(t.center.x+Math.sin(r)*t.radius,t.center.y+t.height+Math.sin(this.time*.13)*1.2,t.center.z+Math.cos(r)*t.radius),n.position.lerp(Nr,1-Math.exp(-2*e)),n.up.set(0,1,0),n.lookAt(t.center),this.fovKick=0,this.zoom=0}_overview(e){let t=this.camera;(!this._ov||this._ovFresh)&&(this._ov=[new Hr(t.position.x),new Hr(t.position.y),new Hr(t.position.z)],this._ovFresh=!1),Nr.set(0,62,-18),t.position.set(this._ov[0].step(Nr.x,1.9,e),this._ov[1].step(Nr.y,1.9,e),this._ov[2].step(Nr.z,1.9,e)),t.up.set(0,1,0),t.lookAt(0,0,3),this.fovKick=B(this.fovKick,-12,2,e),this.zoom=0}},Q=new j,qr=new j,Jr=new j,Yr=new j(0,-1,0),Xr=Math.PI*2;function Zr(e,t,n,r){!e||!e.isLocal||e.isBot||F.input?.rumble?.(t,n,r)}var Qr=class{constructor({team:e,name:t,weapon:n=`shooter`,isLocal:r=!1,isBot:i=!1,style:a={hair:0,skin:0},slot:o=0,CharacterClass:s}){this.team=e,this.name=t,this.isLocal=r,this.isBot=i,this.slot=o,this.weaponId=n,this.weapon=ft[n],this.pos=new j,this.vel=new j,this.yaw=0,this.aimYaw=0,this.aimPitch=0,this.aimDir=new j(0,0,1),this.aimPoint=new j,this.intent={move:new j,jump:!1,squid:!1,fire:!1,sub:!1,special:!1},this._prevIntent={fire:!1,sub:!1,jump:!1,special:!1,squid:!1},this._squidPressT=-1,this._firePressT=-1,this.contacts=cr(),this.groundHit=new ar,this.wallHit=new ar,this.ground=new or,this.groundN=new j(0,1,0),this.wallN=new j(0,0,1),this._ledgeHit=new ar,this.character=new s({color:F.teamColors[e],weapon:n,style:a,name:t,isLocal:r}),this.character.onEvent=(e,t)=>L(`actor:`+e,{actor:this,surface:this.groundTeam,...t||{}}),this.weaponRunner=new Ar(this),this.stats={turf:0,splats:0,deaths:0,specials:0},this.anim={time:0,speed:0,localMove:{x:0,z:0},grounded:!0,vy:0,aimPitch:0,firing:!1,charge:0,rolling:!1,form:`kid`,wallNormal:new j,ink:1,lowInk:!1,special:0,invuln:!1,turnRate:0,hp:1,inEnemyInk:!1,surface:0,subAim:!1},this.reset()}get color(){return F.teamColors[this.team]}get enemyTeam(){return 1-this.team}reset(){this.alive=!0,this.hp=V.hp,this.ink=V.inkMax,this.special=0,this.specialActive=null,this.form=`kid`,this.submerged=!1,this.climbing=!1,this.grounded=!1,this.groundTeam=0,this.respawnTimer=0,this.invuln=0,this.lastDamage=99,this.lastFire=99,this.inkIdle=0,this.damageFromInk=0,this.hurtFlash=0,this.lastAttacker=null,this.fireFacing=0,this.airTime=0,this.landSpeed=0,this.landT=99,this.hardLand=0,this.coyote=0,this.jumpBuffer=0,this.fireBuffer=0,this.kidT=99,this.climbExit=0,this.climbV=0,this.inkWarnCd=0,this.superJumpState=null,this.yawVel=0,this._faceTarget=null,this.smoothY=0,this.smoothYV=0,this.onEnemy=!1,this._evSub=!1,this._evEnemy=!1,this._evClimb=!1,this._evForm=`kid`,this.weaponRunner?.reset()}setWeapon(e){this.weaponId=e,this.weapon=ft[e],this.character.setWeapon(e),this.weaponRunner.reset()}specialCost(){return this.weapon.specialCost}specialFrac(){return R(this.special/this.specialCost(),0,1)}specialReady(){return this.special>=this.specialCost()&&!this.specialActive}addTurf(e){if(!(e<=0)&&(this.stats.turf+=e,L(`turf`,{actor:this,area:e}),!this.specialActive)){let t=this.specialReady();this.special=Math.min(this.specialCost(),this.special+e),!t&&this.specialReady()&&L(`special:ready`,{actor:this})}}spawnAt(e,t){this.reset(),this.pos.copy(e),this.vel.set(0,0,0),this.yaw=this.aimYaw=t,this.aimPitch=0,this.invuln=V.spawnInvuln,this.character.root.position.copy(e),this.character.root.rotation.y=t,this.character.setVisible(!0),this.character.setHurt(0,F.teamColors[this.enemyTeam]);let n=F.physics.groundProbe(e.x,e.y,e.z,.3,.3,V.footRadius,this.ground,!1);n.hit&&Math.abs(n.y-e.y)<.3&&(this.pos.y=n.y,this.grounded=!0,this.groundN.copy(n.normal))}respawn(){let e=F.level.spawnPads[this.team],t=this.slot/4*Math.PI*2+.6,n=Q.set(e.x+Math.cos(t)*1.1,e.y+4.5,e.z+Math.sin(t)*1.1),r=this.team===0?0:Math.PI;this.spawnAt(n,r),this.grounded=!1,this.vel.set(0,-4,0),this.character.trigger(`spawn`),F.fx?.spawnFlash(qr.set(n.x,e.y,n.z),this.color),this.isLocal&&F.audio?.play(`respawn`),L(`respawn`,{actor:this})}damage(e,t,n=`weapon`){if(!this.alive||e<=0||this.invuln>0)return!1;if(this.specialActive&&this.specialActive.armor&&(e*=.25),this.hp-=e,this.lastDamage=0,this.hurtFlash=Math.min(1,this.hurtFlash+e/60),t&&(this.lastAttacker=t),n!==`ink`){let n=0,r=1,i=t&&t!==this?t.pos:null;i&&(n=i.x-this.pos.x,r=i.z-this.pos.z);let a=Math.cos(this.yaw),o=Math.sin(this.yaw),s=n*a-r*o,c=n*o+r*a,l=Math.hypot(s,c)||1;s/=l,c/=l;let u=R(e/60,.4,1.2);this.character.trigger(`hit`,{x:s,z:c,amp:u,valueOf(){return u}}),this.isLocal&&Zr(this,R(e/110,.18,.7),R(e/80,.25,.8),90+Math.min(120,e))}return L(`damage`,{victim:this,attacker:t,amount:e,source:n}),this.hp<=0?(this.splat(t,n),!0):!1}splat(e,t=`weapon`){if(!this.alive)return;this.alive=!1,this.hp=0,this.respawnTimer=V.respawnTime,this.stats.deaths++,this.special*=.5,this.specialActive=null,this.climbing=!1,this.weaponRunner.onDeath();let n=e?e.color:F.teamColors[this.enemyTeam];Q.copy(this.pos),Q.y+=.6,F.fx?.splatted(Q,n),e&&(e.stats.splats++,Q.copy(this.pos),Q.y+=.35,e.addTurf(F.paint.splat(Q,1.7,e.team,{seed:Math.random()}))),this.character.setVisible(!1),this.isLocal&&Zr(this,.8,.6,260),L(`splatted`,{victim:this,attacker:e,cause:t})}update(e){if(this.anim.time=F.time,Number.isFinite(this.pos.x+this.pos.y+this.pos.z+this.vel.x+this.vel.y+this.vel.z+this.yaw+this.smoothY)||(console.warn(`[inkwave] non-finite actor state recovered`,this.name),this.superJumpState=null,this.specialActive=null,this.yaw=0,this.yawVel=0,this.smoothY=0,this.smoothYV=0,this.alive?this.respawn():(this.pos.copy(F.level.spawnPads[this.team]),this.vel.set(0,0,0))),!this.alive){this.respawnTimer-=e,this.respawnTimer<=0&&F.match?.canRespawn()&&this.respawn();return}let t=V,n=this.intent,r=this._prevIntent,i=n.fire&&!r.fire,a=n.jump&&!r.jump,o=!n.sub&&r.sub,s=n.special&&!r.special;n.squid&&!r.squid&&(this._squidPressT=F.time),i&&(this._firePressT=F.time),r.fire=n.fire,r.jump=n.jump,r.sub=n.sub,r.special=n.special,r.squid=n.squid,this.invuln=Math.max(0,this.invuln-e),this.lastDamage+=e,this.lastFire+=e,this.landT+=e,this.kidT+=e,this.hurtFlash=Math.max(0,this.hurtFlash-e*.6),this.inkWarnCd-=e,this.jumpBuffer=a?t.jumpBuffer:Math.max(0,this.jumpBuffer-e),this.fireBuffer=i?t.fireBuffer:Math.max(0,this.fireBuffer-e),this.hardLand=Math.max(0,this.hardLand-e/t.hardLandTime);let c=Math.cos(this.aimPitch);if(this.aimDir.set(Math.sin(this.aimYaw)*c,Math.sin(this.aimPitch),Math.cos(this.aimYaw)*c),this.superJumpState){this._updateSuperJump(e),this._finishFrame(e);return}if(this.specialActive){this._updateSpecial(e),this._finishFrame(e);return}if(s&&this.specialReady()){this._startSpecial(),this._finishFrame(e);return}let l=(n.fire||this.fireBuffer>0)&&this._firePressT>=this._squidPressT,u=n.squid&&!l&&!this.weaponRunner.busy();u!==(this.form===`squid`)&&(this.form=u?`squid`:`kid`,u||(this.kidT=0),(this.isLocal||this._nearCamera())&&F.audio?.play(u?`squid_in`:`squid_out`,{pos:this.pos,volume:this.isLocal?.8:.5}),u&&this.groundTeam===1&&F.fx?.burst(Q.copy(this.pos).setY(this.pos.y+.1),qr.set(0,1,0),this.color,{count:8,speed:2.5,size:.07}));let d=this.form===`squid`;this._surface(),this.submerged=d&&this.grounded&&this.groundTeam===1;let f=this.grounded&&this.groundTeam===2&&!this.submerged;this.onEnemy=f,this._updateClimb(e,d),this.climbing||this._horizontal(e,d,f),this.coyote=this.grounded?t.coyoteTime:this.coyote-e;let p=!1;if(this.jumpBuffer>0&&(this.grounded||this.coyote>0)&&!this.climbing){let e=this.submerged?t.swimJumpVel:t.jumpVel;f&&(e*=.72),this.vel.y=e,this.grounded=!1,this.coyote=0,this.jumpBuffer=0,p=!0,this.character.trigger(`jump`),this.submerged&&F.fx?.burst(Q.copy(this.pos),qr.set(0,1,0),this.color,{count:10,speed:3.5,size:.08}),(this.isLocal||this._nearCamera())&&F.audio?.play(this.submerged?`swim_splash`:`jump`,{pos:this.pos,volume:.6}),L(`actor:jump`,{actor:this,surface:this.groundTeam,swim:this.submerged})}if(this._integrate(e,d,p),this._spawnBarrier(),f){if(this.damageFromInk<t.enemyInkDamageCap&&this.invuln<=0){let n=Math.min(t.enemyInkDps*e,t.enemyInkDamageCap-this.damageFromInk);this.damageFromInk+=n,this.hp=Math.max(1,this.hp-n),this.hurtFlash=Math.min(1,this.hurtFlash+e*.5)}this.lastDamage=Math.min(this.lastDamage,.4)}else this.damageFromInk=Math.max(0,this.damageFromInk-e*30);this.lastDamage>t.regenDelay&&this.hp<t.hp&&(this.hp=Math.min(t.hp,this.hp+(this.submerged?t.regenRateSwim:t.regenRate)*e));let m=this.ink>=t.inkMax;this.submerged||this.climbing?this.ink=Math.min(t.inkMax,this.ink+t.inkRefillSwim*e):!d&&this.lastFire>t.inkRefillDelay&&!this.weaponRunner.busy()?this.ink=Math.min(t.inkMax,this.ink+t.inkRefillKid*e):d&&(this.ink=Math.min(t.inkMax,this.ink+t.inkRefillKid*.5*e)),!m&&this.ink>=t.inkMax&&this.isLocal&&F.audio?.play(`refill_full`,{volume:.5});let h=!1,g=!1;if(!d&&this.kidT>=t.emergeDelay){let e=this.fireBuffer>0;h=n.fire||e,g=i||e,this.fireBuffer=0}if(this.weaponRunner.update(e,{fire:h,firePressed:g,sub:n.sub&&!d,subReleased:o&&!d}),this.pos.y<t.fallDeathY&&F.level.groundHeight(this.pos.x,this.pos.z,this.pos.y+.6)===-1/0){F.fx?.burst(Q.copy(this.pos).setY(t.waterY+.05),qr.set(0,1,0),new k(`#bfe9ff`),{count:18,speed:5,size:.1}),F.audio?.play(`splat_big`,{pos:this.pos}),this.splat(this.lastDamage<4?this.lastAttacker:null,`water`);return}this._finishFrame(e)}_nearCamera(){let e=F.camera;return e?e.position.distanceToSquared(this.pos)<900:!1}_surface(){let e=this.ground;if(this.grounded&&e.hit&&e.face>=0){let t=F.paint.sample(e.face,e.u,e.v);this.groundTeam=t===0?0:t-1===this.team?1:2}else this.groundTeam=0}_probeGround(){let e=F.physics.groundProbe(this.pos.x,this.pos.y,this.pos.z,.4,.35,V.footRadius,this.ground,this.form===`squid`);if(e.hit){let t=F.paint.sample(e.face,e.u,e.v);this.groundTeam=e.face<0||t===0?0:t-1===this.team?1:2}else this.groundTeam=0}_horizontal(e,t,n){let r=V,i=this.intent.move,a=Math.hypot(i.x,i.z),o=Math.min(1,a),s=this.vel.x,c=this.vel.z,l=Math.hypot(s,c);if(!this.grounded){let n,u,d;t?(n=Math.max(r.squidDrySpeed,l),u=r.squidAirAccel,d=r.squidAirDecel):(n=Math.max(this.weaponRunner.moveSpeed(),r.airMinSpeed),u=r.airAccel,d=r.airDecel);let f=a>.01?i.x/a*n*o:0,p=a>.01?i.z/a*n*o:0,m=f-s,h=p-c,g=Math.hypot(m,h),_=(a>.01?u:d)*e;g<=_?(this.vel.x=f,this.vel.z=p):(this.vel.x+=m/g*_,this.vel.z+=h/g*_);return}let u,d,f,p,m,h,g,_,v;if(t&&this.submerged?(u=r.swimSpeed,d=r.swimAccel,f=r.swimAccelIn,p=3,m=r.swimOutKnee,h=r.swimDecel,g=.5,_=4,v=r.swimTurn):t?(u=r.squidDrySpeed,d=r.squidAccel,f=.6,p=1,m=.3,h=r.squidDecel,g=.5,_=2,v=r.squidTurn):(u=this.weaponRunner.moveSpeed(),d=r.runAccel,f=r.runAccelIn,p=r.runInKnee,m=r.runOutKnee,h=r.runDecel,g=r.runDecelMin,_=r.runDecelKnee,v=r.turnRate,this.hardLand>0&&(u*=1-(1-r.hardLandSlow)*this.hardLand)),n&&(u=Math.min(u,r.enemyInkSpeed),d=Math.min(d,r.enemyInkAccel),h=Math.max(r.enemyInkDecel,0)),a<.01){if(l<1e-4){this.vel.x=0,this.vel.z=0;return}let t=h*(g+(1-g)*Pe(0,_,l))*e,n=Math.max(0,l-t)/l;this.vel.x*=n,this.vel.z*=n;return}let y=i.x/a,b=i.z/a,x=u*o,S=y,C=b;l>.05&&(S=s/l,C=c/l);let w=R(S*y+C*b,-1,1),T=Math.acos(w);if(l>.5&&T>r.reverseAngle){let t=y*x,i=b*x,a=t-s,o=i-c,l=Math.hypot(a,o),u=Math.max(r.reverseDecel,h)*e*(n?.5:1);l<=u?(this.vel.x=t,this.vel.z=i):(this.vel.x+=a/l*u,this.vel.z+=o/l*u);return}let E=v*(1+r.turnRateSlow*(1-Pe(0,u,l))),D=Math.min(T,E*e);if(D>1e-6){let e=C*y-S*b>=0?1:-1,t=Math.cos(D*e),n=Math.sin(D*e),r=S*t+C*n,i=-S*n+C*t;S=r,C=i}let O;if(l<x){let t=d*(f+(1-f)*Pe(0,p,l))*R((x-l)/(m*u),r.runOutMin,1);O=Math.min(x,l+t*e)}else O=Math.max(x,l-h*(g+(1-g)*Pe(0,_,l-x))*e);this.vel.x=S*O,this.vel.z=C*O}_integrate(e,t,n){let r=V;if(this.climbing){this.pos.addScaledVector(this.vel,e),F.physics.collideBody(this.pos,r.radius,r.squidBodyLift,r.squidHeight,this.contacts,!1,!0),this.contacts.ceiling&&this.vel.y>0&&(this.vel.y=0),this.grounded=!1,this.airTime=0;return}let i=this.grounded&&!n;if(i){let e=this.groundN;this.vel.y=-(this.vel.x*e.x+this.vel.z*e.z)/Math.max(.35,e.y)}else{let t=r.gravity;this.vel.y<0&&(t*=r.fallGravityMul),Math.abs(this.vel.y)<r.apexBand&&(t*=r.apexGravityMul),this.vel.y=Math.max(-r.maxFall,this.vel.y-t*e)}let a=this.pos.y;this.pos.addScaledVector(this.vel,e),this._resolve(t,a,i)}_resolve(e,t,n){let r=V,i=e?r.squidBodyLift:r.stepUp,a=e?r.squidHeight:r.height,o=F.physics.collideBody(this.pos,r.radius,i,a,this.contacts,n,e);if(o.ceiling&&this.vel.y>0&&(this.vel.y=0),o.wall){let e=o.wallNormal,t=this.vel.x*e.x+this.vel.z*e.z;t<0&&(this.vel.x-=e.x*t,this.vel.z-=e.z*t)}let s=this.ground,c=e?r.squidStepUp:r.stepUp,l=this.grounded,u=!1;if(n){if(F.physics.groundProbe(this.pos.x,this.pos.y,this.pos.z,c,r.stepDown,r.footRadius,s,e),s.hit){let e=s.y-this.pos.y;this.pos.y=s.y,u=!0,Math.abs(e)>.06&&(this.smoothY-=e)}}else if(this.vel.y<=.5){let n=Math.max(t,this.pos.y),i=e?r.squidStepUp:r.ledgeAssist;if(F.physics.groundProbe(this.pos.x,this.pos.y,this.pos.z,n-this.pos.y+i,.02,r.footRadius,s,e),s.hit&&s.y>=this.pos.y-.02&&(this.vel.y<=0||s.y-this.pos.y<.02)){let e=s.y-t;this.pos.y=s.y,u=!0,e>.035&&(this.smoothY-=e)}}u&&(this.groundN.copy(s.normal),l||this._onLand(e),this.vel.y=0),this.grounded=u,this.airTime=u?0:this.airTime+1/60}_onLand(e){let t=V,n=Math.max(0,-this.vel.y);if(this.landSpeed=n,this.landT=0,n>t.hardLandSpeed&&(this.hardLand=R((n-t.hardLandSpeed)/6+.5,0,1)),n>3){this.character.trigger(`land`,n),this.grounded=!0,this._surface();let t=e&&this.groundTeam===1;!this.specialActive&&(this.isLocal||this._nearCamera())&&F.audio?.play(t?`swim_splash`:`land`,{pos:this.pos,volume:R(n/14,.25,.9)}),L(`actor:land`,{actor:this,speed:n,surface:this.groundTeam,pos:this.pos.clone()}),this.isLocal&&n>7&&Zr(this,R((n-7)/14,.05,.5),R(n/22,.1,.55),70+Math.min(90,n*4))}}_spawnBarrier(){let e=F.level.spawnPads[this.enemyTeam],t=F.level.spawnBarrier,n=this.pos.x-e.x,r=this.pos.z-e.z,i=Math.hypot(n,r);if(i<t&&this.pos.y>e.y-1){let e=(t-i)/Math.max(i,.01);this.pos.x+=n*e,this.pos.z+=r*e;let a=(this.vel.x*n+this.vel.z*r)/Math.max(i,.01);a<0&&(this.vel.x-=n/i*a*1.6,this.vel.z-=r/i*a*1.6)}}_updateClimb(e,t){let n=V;if(this.climbExit=Math.max(0,this.climbExit-e),!t||this.climbExit>0){this.climbing&&this._setClimb(!1);return}let r=this.intent.move,i=Math.hypot(r.x,r.z),a=Math.min(1,i),o=Jr;if(this.climbing)o.set(-this.wallN.x,0,-this.wallN.z);else{if(i<.2)return;o.set(r.x,0,r.z)}if(o.lengthSq()<1e-6)return;o.normalize(),Q.copy(this.pos),Q.y+=.3;let s=F.physics.raycast(Q,o,n.radius+.35,this.wallHit),c=s.hit&&Math.abs(s.normal.y)<.5,l=c&&s.face>=0&&F.paint.sample(s.face,s.u,s.v)-1===this.team,u=c&&i>.01?-(r.x*s.normal.x+r.z*s.normal.z)/i:0;if(!this.climbing){if(!(l&&u>n.climbAttachDot))return;this.wallN.copy(s.normal),this.climbV=Math.max(0,this.vel.y),this._setClimb(!0)}if(!s.hit){this._ledgePop(o);return}if(!l){this._setClimb(!1),this.vel.y=Math.min(this.vel.y,1.5),this.vel.x+=s.normal.x*1.2,this.vel.z+=s.normal.z*1.2,this.climbExit=.2;return}if(u<n.climbDetachDot){this._setClimb(!1),this.vel.set(s.normal.x*3.2,3.2,s.normal.z*3.2),this.climbExit=.3;return}this.wallN.copy(s.normal),Q.copy(this.pos),Q.y+=.85;let d=F.physics.raycast(Q,o,n.radius+.45,this._ledgeHit),f=d.hit&&Math.abs(d.normal.y)<.5&&!(d.face>=0&&F.paint.sample(d.face,d.u,d.v)-1===this.team)?0:n.climbSpeed*R(u,0,1)*a;!d.hit&&f>0&&(f=Math.min(f,Math.sqrt(2*n.gravity*n.apexGravityMul*(n.ledgePopClear+.3))));let p=n.climbAccel*e*(f>this.climbV?1:1.6);this.climbV=this.climbV<f?Math.min(f,this.climbV+p):Math.max(f,this.climbV-p),this.vel.y=this.climbV;let m=s.normal,h=qr.set(r.x,0,r.z);h.addScaledVector(m,-h.dot(m)),this.vel.x=h.x*n.climbSideSpeed-m.x*1.2,this.vel.z=h.z*n.climbSideSpeed-m.z*1.2,this.anim.wallNormal.copy(m)}_setClimb(e){this.climbing!==e&&(this.climbing=e,e||(this.climbV=0),L(`actor:climb`,{actor:this,on:e}))}_ledgePop(e){let t=V;Q.copy(this.pos).addScaledVector(e,t.radius+.32),Q.y=this.pos.y+1.4;let n=F.physics.raycast(Q,Yr,2,this._ledgeHit,!0),r=n.hit&&n.normal.y>.68?n.point.y:this.pos.y+.3,i=t.gravity*t.apexGravityMul,a=Math.max(.25,r+t.ledgePopClear-this.pos.y),o=this.climbV;this._setClimb(!1),this.vel.y=Math.max(Math.sqrt(2*i*a),Math.min(o,6.5)),this.vel.x=e.x*t.ledgePopCarry,this.vel.z=e.z*t.ledgePopCarry,this.climbExit=.3,this.grounded=!1,F.fx?.burst(qr.copy(this.pos).setY(this.pos.y+.3),Q.set(0,1,0),this.color,{count:7,speed:2.6,size:.07}),(this.isLocal||this._nearCamera())&&F.audio?.play(`swim_splash`,{pos:this.pos,volume:.45})}canSuperJump(){return this.alive&&!this.superJumpState&&!this.specialActive&&F.match?.playing()}superJump(e){return this.canSuperJump()?(this.superJumpState={phase:`charge`,t:0,target:e,from:new j,to:new j,marker:0},this.form=`squid`,this._setClimb(!1),this.weaponRunner.reset(),F.audio?.play(`super_jump`,{pos:this.isLocal?void 0:this.pos,volume:this.isLocal?.9:.6}),L(`superjump`,{actor:this,phase:`charge`}),!0):!1}_updateSuperJump(e){let t=this.superJumpState;if(t.t+=e,t.phase===`charge`){if(this.vel.set(0,0,0),this.form=`squid`,this._probeGround(),t.t>.75){let e=t.target,n=!!(e&&e.pos&&e.pos.isVector3);if(n&&!e.alive){this.superJumpState=null;return}if(t.from.copy(this.pos),n){t.to.copy(e.pos);let n=this.pos.x-e.pos.x,r=this.pos.z-e.pos.z,i=Math.hypot(n,r)||1;qr.set(e.pos.x+n/i*1.1,e.pos.y+.6,e.pos.z+r/i*1.1);let a=F.physics.raycast(qr,Yr,2.5,this.groundHit);a.hit&&a.normal.y>.6&&!F.level.pointInside(Q.copy(a.point).setY(a.point.y+.5),.3)&&t.to.copy(a.point)}else t.to.copy(e);t.phase=`flight`,t.t=0,t.dur=1.15+Math.min(.6,t.from.distanceTo(t.to)/80),this.invuln=Math.max(this.invuln,t.dur+.2),F.fx?.burst(Q.copy(this.pos),qr.set(0,1,0),this.color,{count:16,speed:6,size:.1}),Zr(this,.35,.5,140),L(`superjump`,{actor:this,phase:`flight`,to:t.to.clone()})}return}if(t.phase===`flight`){let n=Math.min(1,t.t/t.dur),r=n<.5?2*n*n:1-(-2*n+2)**2/2,i=11+t.from.distanceTo(t.to)*.08,a=n**.86;Q.lerpVectors(t.from,t.to,r),Q.y+=Math.sin(Math.PI*a)*i,this.vel.copy(Q).sub(this.pos).multiplyScalar(1/Math.max(e,.001)),this.pos.copy(Q),this.form=n>.82?`kid`:`squid`,t.marker+=e,t.marker>.12&&(t.marker=0,F.fx?.ring(qr.copy(t.to).setY(t.to.y+.05),Q.set(0,1,0),this.color,{radius:1.6,life:.5})),n>=1&&(this.superJumpState=null,this.vel.set(0,-12,0),this.form=`kid`,this.kidT=.05,this.grounded=!1,this._resolve(!1,this.pos.y+.4,!1),this.grounded||(this.grounded=!0,this._resolve(!1,this.pos.y,!0),this.grounded||(this.vel.y=-6)),this.addTurf(F.paint.splat(Q.copy(this.pos).setY(this.pos.y+.3),1.4,this.team,{seed:Math.random()})),F.fx?.burst(this.pos,qr.set(0,1,0),this.color,{count:14,speed:5,size:.09}),this.isLocal&&L(`shake`,{amount:.35}),Zr(this,.55,.45,170),L(`superjump:land`,{actor:this,pos:this.pos.clone()}))}}_startSpecial(){let e=this.weapon.special;this.special=0,this.stats.specials++,this.form=`kid`,this._setClimb(!1),L(`special:use`,{actor:this,id:e}),F.audio?.play(`special_activate`,{pos:this.isLocal?void 0:this.pos,volume:this.isLocal?1:.7}),Zr(this,.25,.45,120),e===`slam`?(this.specialActive={id:e,t:0,phase:`rise`,armor:!0,startY:this.pos.y},this.vel.set(this.vel.x*.3,11.5,this.vel.z*.3),this.grounded=!1,this.character.trigger(`special_leap`)):e===`storm`&&(this.specialActive={id:e,t:0,phase:`throw`,armor:!1},this.character.trigger(`throw`),F.projectiles.throwStorm(this))}_updateSpecial(e){let t=this.specialActive;t.t+=e;let n=ht[t.id];if(t.id===`storm`){t.t>.35&&(this.specialActive=null),this.vel.x*=Math.exp(-6*e),this.vel.z*=Math.exp(-6*e);let n=this.grounded;n?this.vel.y=0:this.vel.y-=V.gravity*e;let r=this.pos.y;this.pos.addScaledVector(this.vel,e),this._resolve(!1,r,n);return}let r=this.intent.move;t.phase===`rise`?(this.vel.y-=V.gravity*.9*e,this.vel.x=B(this.vel.x,r.x*2.5,6,e),this.vel.z=B(this.vel.z,r.z*2.5,6,e),t.t>n.rise&&(t.phase=`hang`,t.t=0,this.vel.set(0,.6,0))):t.phase===`hang`?(this.vel.y=.4,t.t>n.hang&&(t.phase=`fall`,t.t=0,this.vel.set(0,-34,0),this.character.trigger(`special_slam`))):t.phase===`fall`&&(this.vel.y=-34);let i=this.pos.y;this.pos.addScaledVector(this.vel,e),this.grounded=!1,this._resolve(!1,i,!1),t.phase===`fall`&&(this.grounded||t.t>1.2)&&(this._slamImpact(n),this.specialActive=null,this.invuln=.3)}_slamImpact(e){let t=this.pos,n=0;n+=F.paint.splat(Q.copy(t).setY(t.y+.3),e.radius*.72,this.team,{seed:Math.random()});for(let r=0;r<9;r++){let i=r/9*Math.PI*2+Math.random()*.3,a=e.radius*(.55+Math.random()*.3);Q.set(t.x+Math.cos(i)*a,t.y+.6,t.z+Math.sin(i)*a),n+=F.paint.splat(Q,1.1+Math.random()*.6,this.team,{seed:Math.random()})}this.addTurfNoSpecial(n),F.fx?.explosion(Q.copy(t).setY(t.y+.3),this.color,e.radius),F.audio?.play(`special_slam`,{pos:t}),L(`shake`,{pos:t.clone(),amount:1}),L(`special:slam`,{actor:this,pos:t.clone(),radius:e.radius}),Zr(this,.9,.7,320);for(let n of F.actors){if(n.team===this.team||!n.alive)continue;let r=n.pos.distanceTo(t);if(r>e.radius)continue;let i=r<e.killRadius?e.damageMax:e.damageMin+(e.damageMax-e.damageMin)*.3*(1-(r-e.killRadius)/(e.radius-e.killRadius));Q.copy(n.pos),Q.y+=.8,F.physics.los(qr.copy(t).setY(t.y+.8),Q)&&F.projectiles.applyHit(this,n,i,`slam`)}}addTurfNoSpecial(e){e>0&&(this.stats.turf+=e,L(`turf`,{actor:this,area:e}))}_face(e,t){let n=V,r=this.anim,i=this.intent.move,a=Math.hypot(i.x,i.z),o=Math.hypot(this.vel.x,this.vel.z);this.fireFacing=Math.max(0,this.fireFacing-e);let s=null,c=n.faceOmega,l=n.faceMaxRate,u=n.faceMaxAcc;this.specialActive||this.superJumpState?o>.6&&(s=Math.atan2(this.vel.x,this.vel.z)):this.weaponRunner.firingPose()||this.fireFacing>0||this.intent.sub?(s=this.aimYaw,c=n.aimFaceOmega,l=n.aimFaceMaxRate,u=n.aimFaceMaxAcc):this.climbing?(s=Math.atan2(-this.wallN.x,-this.wallN.z),c=26,l=18):(a>.2?s=Math.atan2(i.x,i.z):o>.6&&(s=Math.atan2(this.vel.x,this.vel.z)),t&&(c=n.squidFaceOmega,l=this.submerged?n.swimFaceMaxRate:n.squidFaceMaxRate,u=n.squidFaceMaxAcc));let d=0;if(s!==null&&this._faceTarget!==null){let t=Fe(this._faceTarget,s);Math.abs(t)<.12&&(d=R(t/Math.max(e,1e-4),-l,l))}this._faceTarget=s;let f;f=s===null?-2*c*this.yawVel:c*c*Fe(this.yaw,s)+2*c*(d-this.yawVel),this.yawVel=R(this.yawVel+R(f,-u,u)*e,-l,l),Math.abs(this.yawVel)<1e-5&&(this.yawVel=0),this.yaw+=this.yawVel*e,this.yaw>Math.PI?this.yaw-=Xr:this.yaw<-Math.PI&&(this.yaw+=Xr),r.turnRate=this.yawVel}_finishFrame(e){let t=this.anim,n=this.form===`squid`;this._face(e,n);let r=Math.hypot(this.vel.x,this.vel.z),i=Math.cos(this.yaw),a=Math.sin(this.yaw);t.speed=r;let o=1/Math.max(r,.001),s=r>.1?(this.vel.x*i-this.vel.z*a)*o:0,c=r>.1?(this.vel.x*a+this.vel.z*i)*o:0;t.localMove.x=-s,t.localMove.z=c,t.grounded=this.grounded,t.vy=this.vel.y,t.aimPitch=this.aimPitch,t.firing=this.weaponRunner.firingPose(),t.charge=this.weaponRunner.charge,t.rolling=this.weaponRunner.rolling,t.subAim=!!this.weaponRunner.aimingSub,t.form=n?this.climbing?`climb`:this.submerged?`swim`:`squid`:`kid`,this.specialActive&&(t.form=`kid`),t.ink=this.ink/V.inkMax,t.lowInk=this.ink<18,t.special=this.specialFrac(),t.invuln=this.invuln>0,t.hp=R(this.hp/V.hp,0,1),t.inEnemyInk=!!this.onEnemy,t.surface=this.grounded?this.groundTeam:0;let l=-576*this.smoothY-48*this.smoothYV;this.smoothYV+=l*e,this.smoothY+=this.smoothYV*e,Math.abs(this.smoothY)>.7&&(this.smoothY=Math.sign(this.smoothY)*.7),Math.abs(this.smoothY)<1e-4&&Math.abs(this.smoothYV)<.001&&(this.smoothY=0,this.smoothYV=0);let u=this.character;u.root.position.copy(this.pos),u.root.position.y+=this.smoothY,u.root.rotation.y=this.yaw,u.setHurt(Math.max(this.hurtFlash,1-this.hp/V.hp)*(this.hp<V.hp?1:0),F.teamColors[this.enemyTeam]),u.update(e,t),this._events(t),t.form===`swim`&&r>2&&F.fx&&(this._wakeT=(this._wakeT||0)+e,this._wakeT>.05&&(this._wakeT=0,F.fx.wake(this.pos,Q.set(this.vel.x,0,this.vel.z).normalize(),this.color,r)))}_events(e){let t=this.form===`squid`?`squid`:`kid`;t!==this._evForm&&(this._evForm=t,L(`actor:form`,{actor:this,form:t,surface:this.groundTeam}));let n=e.form===`swim`||e.form===`climb`;if(n!==this._evSub){this._evSub=n;let e=Math.hypot(this.vel.x,this.vel.z);L(n?`actor:dive`:`actor:emerge`,{actor:this,pos:this.pos.clone(),speed:e})}!!this.onEnemy!==this._evEnemy&&(this._evEnemy=!!this.onEnemy,L(`actor:enemyInk`,{actor:this,on:this._evEnemy}))}visualPos(e){return e.set(this.pos.x,this.pos.y+this.smoothY,this.pos.z)}},$r=new j,ei=new j,ti=new j,ni={own:0,enemy:0,empty:0,n:0},ri=class{constructor(e,t=`normal`){this.a=e,this.setDifficulty(t),this.reset()}setDifficulty(e){this.diff=_t[e]||_t.normal}reset(){this.path=null,this.pi=0,this.goal=-1,this.repath=0,this.goalTimer=0,this.target=null,this.seeTimer=0,this.react=0,this.lostTimer=0,this.stuck=0,this.lastPos=new j,this.jumpCd=0,this.bestD=1/0,this.noProg=0,this.mode=`paint`,this.sweep=Math.random()*10,this.aimYaw=this.a.yaw,this.aimPitch=0,this.errYaw=0,this.errPitch=0,this.errT=0,this.strafe=Math.random()<.5?1:-1,this.strafeT=0,this.bombCd=3+Math.random()*4,this.fireHold=0,this.think=Math.random()*.2,this.refillUntil=0,this.chargeRelease=.95+Math.random()*.05,this.paintPause=0,this.aimYawV=0,this.aimPitchV=0,this.acqT=9,this.acqSignY=0,this.acqSignP=0,this.ph1=Math.random()*20,this.ph2=Math.random()*20,this.t=Math.random()*10,this.strafeS=0,this.strafeAmp=1,this.mvYaw=this.a.yaw,this.mvMag=0,this.dodgeCd=1+Math.random()*2,this.retreatT=0,this._firing=!1}update(e){let t=this.a,n=t.intent;if(!t.alive){n.move.set(0,0,0),n.fire=n.squid=n.sub=n.jump=n.special=!1,this.path=null,this.target=null,this._wasDead=!0,this.mvMag=0;return}if(this._wasDead&&F.match&&F.match.playing()&&(this._wasDead=!1,this.aimYaw=t.yaw,this.aimPitch=0,this.aimYawV=0,this.aimPitchV=0,Math.random()<.5)){let e=F.level.spawnPads[1-t.team],n=null,r=1/0;for(let i of F.actors){if(i===t||i.team!==t.team||!i.alive||i.superJumpState)continue;let a=i.pos.distanceTo(e);a<r&&i.pos.distanceTo(t.pos)>18&&(r=a,n=i)}n&&t.superJump(n)&&(this.path=null,this.goalTimer=0)}if(t.superJumpState){n.move.set(0,0,0),n.fire=n.squid=n.sub=n.jump=n.special=!1,this.mvMag=0;return}if(!F.match||!F.match.playing()){n.move.set(0,0,0),n.fire=n.squid=n.sub=n.jump=n.special=!1,this.mvMag=0;return}this.think-=e,this.jumpCd-=e,this.bombCd-=e,this.strafeT-=e,this.paintPause-=e,this.dodgeCd-=e,this.acqT+=e,this.t+=e,this.think<=0&&(this.think=.15+Math.random()*.1,this._perceive());let r=this.target;r&&!r.alive&&(this.target=null);let i=t.ink/V.inkMax,a=t.hp/V.hp,o=t.weapon;this.mode===`retreat`?(this.retreatT-=e,(a>.85||this.retreatT<=0||!this.target&&a>.6)&&(this.mode=`paint`,this.path=null,this.goalTimer=0)):this.target&&this.seeTimer>0&&(a<.34&&o.kind!==`roller`&&t.lastDamage<.8||a<.2)&&Math.random()<.6*e*60*this.diff.fireDiscipline&&(this.mode=`retreat`,this.retreatT=2.2+Math.random()*1.4,this.repath=0,this._pickRetreat()),this.mode!==`refill`&&this.mode!==`retreat`&&i<.12&&!(this.target&&this.seeTimer>0&&o.kind!==`roller`&&i>.05)&&(this.mode=`refill`,this.refillUntil=.85+Math.random()*.1),this.mode===`refill`&&i>=this.refillUntil&&(this.mode=`paint`),this.mode!==`refill`&&this.mode!==`retreat`&&(this.mode=this.target?`fight`:`paint`),this.goalTimer-=e,this.repath-=e,this.mode===`fight`&&this.target?this.repath<=0&&this._pathTo(this.target.pos,.6):this.mode===`refill`?(this.repath<=0||!this.path)&&this._pickRefill():this.mode===`retreat`?(this.repath<=0||!this.path)&&this._pickRetreat():(this.goalTimer<=0||!this.path||this.pi>=this.path.length)&&this._pickPaintGoal();let s=this._steer(e),c=s.lengthSq()>.01;n.fire=!1,n.sub=!1,n.special=!1,n.squid=!1,n.jump=!1;let l=c?Math.atan2(s.x,s.z):t.yaw,u=-.1,d=this.target&&this.seeTimer>0,f=0,p=0,m=6;if((this.mode===`fight`||this.mode===`retreat`)&&this.target){let r=this.target,a=r.pos.x-t.pos.x,h=r.pos.z-t.pos.z,g=Math.hypot(a,h),_=this._range(),v=o.kind===`charger`?0:g/(o.projSpeed||30);$r.set(r.pos.x+r.vel.x*v,r.pos.y+(r.smoothY||0)+(r.form===`squid`?.3:.85),r.pos.z+r.vel.z*v),ei.copy($r),ei.x-=t.pos.x,ei.y-=t.pos.y+1.1,ei.z-=t.pos.z,f=Math.atan2(ei.x,ei.z),p=Math.atan2(ei.y,Math.hypot(ei.x,ei.z)),m=ei.length();let y=this.diff.aimError,b=Math.exp(-this.acqT/Math.max(.12,this.diff.reaction*.9)),x=e=>Math.sin(e)*.6+Math.sin(e*2.27+1.3)*.4;if(l=f+y*(.75*x(this.t*1.7+this.ph1)+2.4*b*this.acqSignY),u=p+y*.6*(.75*x(this.t*2.1+this.ph2)+1.6*b*this.acqSignP),this.mode===`fight`){let r=o.kind===`charger`?_*.8:o.kind===`roller`?.5:_*.7;this.strafeT<=0&&(this.strafeT=.6+Math.random()*1.2,this.strafe=Math.random()<.5?-1:1,this.strafeAmp=.5+Math.random()*.5),this.strafeS+=(this.strafe*this.strafeAmp-this.strafeS)*(1-Math.exp(-5*e));let l=a/Math.max(g,.01),u=h/Math.max(g,.01),m=0,v=0;g>r+1.2&&c?(m=s.x,v=s.z):g<r-1.5&&o.kind!==`roller`&&(m=-l,v=-u),(o.kind!==`charger`||!t.weaponRunner.charging)&&(m+=-u*this.strafeS*.9,v+=l*this.strafeS*.9),o.kind===`roller`&&g<7&&(m=l,v=u);let y=Math.hypot(m,v);y>.01?s.set(m/y,0,v/y):s.set(0,0,0);let b=Math.hypot(Fe(this.aimYaw,f),this.aimPitch-p)<Math.max(.05,Math.atan2(.55,g))*(this._firing?2.4:1.5);this._firing=!1,d&&this.react<=0&&b&&i>.02?(o.kind===`charger`?(n.fire=!(t.weaponRunner.charging&&t.weaponRunner.charge>=this.chargeRelease),t.weaponRunner.charging&&s.multiplyScalar(.3)):o.kind===`roller`?n.fire=g<5.5||t.weaponRunner.rolling&&g<8:n.fire=g<_*1.08,this._firing=n.fire,this.bombCd<=0&&t.ink>mt.bomb.inkCost+8&&g>5&&g<14&&Math.random()<.02*(1+this.diff.fireDiscipline)&&(n.sub=!0,this.bombCd=5+Math.random()*6,this._bombAim=!0)):o.kind===`charger`&&t.weaponRunner.charging&&!d&&(n.fire=!0),!n.fire&&!t.weaponRunner.charging&&g>_*1.15&&t.groundTeam===1&&(n.squid=!0),t.lastDamage<.25&&this.dodgeCd<=0&&t.grounded&&o.kind!==`charger`&&Math.random()<.3&&(n.jump=!0,this.dodgeCd=2+Math.random()*2.5),t.specialReady()&&(o.special===`slam`&&g<4.5&&(n.special=!0),o.special===`storm`&&g<16&&(n.special=!0))}else n.squid=!0}else if(this.mode===`paint`){this.sweep+=e*(o.kind===`charger`?.8:2.1);let r=o.kind===`roller`?0:.55;l+=Math.sin(this.sweep)*r,u=o.kind===`charger`?-.12:o.kind===`blaster`?-.28:-.42;let a=F.paint.regionStats(t.pos.x+Math.sin(l)*4,t.pos.y,t.pos.z+Math.cos(l)*4,3,t.team,ni),s=a.n===0||a.own<.75;o.kind===`roller`?n.fire=i>.08&&(s||Math.random()<.02)&&c:o.kind===`charger`?t.weaponRunner.charging?(n.fire=t.weaponRunner.charge<.7,n.fire||(this.paintPause=.3+Math.random()*.35)):n.fire=s&&i>.3&&this.paintPause<=0:n.fire=s&&i>.18,!n.fire&&this._pathRemaining()>5&&t.groundTeam===1&&(n.squid=!0),t.specialReady()&&Math.random()<.01&&F.paint.regionStats(t.pos.x,t.pos.y,t.pos.z,5,t.team,ni).own<.5&&(n.special=!0)}else this.mode===`refill`&&(n.squid=t.groundTeam===1||this._pathRemaining()>2,t.groundTeam!==1&&this._pathRemaining()<1.5&&i>.03&&(n.squid=!1,n.fire=!0,u=-1));this._bombAim?(n.sub=!0,this._bombAim=!1,this._releaseBomb=!0):this._releaseBomb&&=(n.sub=!1,!1);let h=this.mode===`fight`,g=h?this.diff.aimOmega??13:8,_=h?this.diff.aimTurn??10:6;u=R(u,-1.1,1),this.aimYawV+=(g*g*Fe(this.aimYaw,l)-2*g*this.aimYawV)*e,this.aimYawV=R(this.aimYawV,-_,_),this.aimYaw+=this.aimYawV*e,this.aimYaw>Math.PI?this.aimYaw-=Math.PI*2:this.aimYaw<-Math.PI&&(this.aimYaw+=Math.PI*2),this.aimPitchV+=(g*g*(u-this.aimPitch)-2*g*this.aimPitchV)*e,this.aimPitchV=R(this.aimPitchV,-_*.7,_*.7),this.aimPitch=R(this.aimPitch+this.aimPitchV*e,-1.1,1),t.aimYaw=this.aimYaw,t.aimPitch=this.aimPitch;{let e=Math.cos(this.aimPitch),n=h&&this.target?m:this.mode===`refill`?1.6:6;if(t.aimPoint.set(t.pos.x+Math.sin(this.aimYaw)*e*n,t.pos.y+1.1+Math.sin(this.aimPitch)*n,t.pos.z+Math.cos(this.aimYaw)*e*n),!h){let e=t.pos.y;t.aimPoint.y<e&&(t.aimPoint.y=e)}}let v=Math.min(1,s.length());if(v>.01){let t=Math.atan2(s.x,s.z),n=Fe(this.mvYaw,t);this.mvMag<.05?this.mvYaw=t:Math.abs(n)>2.1?(this.mvYaw=t,this.mvMag*=.35):this.mvYaw+=R(n,-11*e,11*e)}this.mvMag+=(v-this.mvMag)*(1-Math.exp(-14*e)),n.move.set(Math.sin(this.mvYaw)*this.mvMag,0,Math.cos(this.mvYaw)*this.mvMag),this.path&&c&&!(o.kind===`charger`&&t.weaponRunner.charging)||(this.noProg=0),this.noProg>.7&&this.jumpCd<=0&&t.grounded&&(n.jump=!0,this.jumpCd=1),this.noProg>1.5&&this.path&&this.pi<this.path.length-1&&!this._skipped&&(this.pi++,this._skipped=!0,this.bestD=1/0),this.noProg>2.4&&(this.noProg=0,this._skipped=!1,this.path=null,this.goalTimer=0,this.repath=0),this.noProg===0&&(this._skipped=!1),this.stuck=this.noProg,this._needJump&&this.jumpCd<=0&&t.grounded&&(n.jump=!0,this.jumpCd=.6,this._needJump=!1)}_pickRetreat(){let e=this.a,t=this.target,n=null,r=-1/0;for(let i=0;i<16;i++){let i=Math.random()*Math.PI*2,a=3+Math.random()*8;$r.set(e.pos.x+Math.cos(i)*a,e.pos.y,e.pos.z+Math.sin(i)*a);let o=F.paint.regionStats($r.x,$r.y,$r.z,1.4,e.team,ni);if(!o.n)continue;let s=t?Math.hypot($r.x-t.pos.x,$r.z-t.pos.z)-Math.hypot(e.pos.x-t.pos.x,e.pos.z-t.pos.z):0,c=o.own*6+s*.8-a*.15+(t&&!F.physics.los(ei.set($r.x,$r.y+1,$r.z),ti.set(t.pos.x,t.pos.y+1,t.pos.z))?4:0);c>r&&(r=c,n=$r.clone())}n?this._pathTo(n,.5):this.path=null,this.repath=1}_range(){let e=this.a.weapon;return e.kind===`charger`?e.rangeMax*.9:e.kind===`roller`?6:e.range}_perceive(){let e=this.a,t=$r.copy(e.pos);t.y+=1.3;let n=null,r=1/0,i=this.diff.awareness;for(let a of F.actors){if(a.team===e.team||!a.alive)continue;let o=a.pos.distanceTo(e.pos);if(o>i)continue;let s=a.anim.form===`swim`,c=Math.hypot(a.vel.x,a.vel.z);if(s&&o>3&&!(c>7&&o<9)||(ei.copy(a.pos),ei.y+=a.form===`squid`?.3:1,!F.physics.los(t,ei)))continue;let l=o-(a===this.target?4:0);l<r&&(r=l,n=a)}n?(n!==this.target&&(this.target=n,this.react=this.diff.reaction*(.7+Math.random()*.6),this.repath=0,this.acqT=0,this.acqSignY=(Math.random()<.5?-1:1)*(.5+Math.random()*.5),this.acqSignP=(Math.random()-.5)*1.2),this.seeTimer=1.2,this.lostTimer=0):(this.seeTimer-=.2,this.target&&(this.lostTimer+=.2,(this.lostTimer>2.5||this.target.pos.distanceTo(e.pos)>i+6)&&(this.target=null))),this.react-=.2}_pathTo(e,t=.8){let n=F.nav,r=n.nearest(this.a.pos,1.2),i=n.nearest(e,t);if(this.repath=.8+Math.random()*.4,r<0||i<0)return this.path=null,!1;let a=n.path(r,i,this.a.team);return a?(this.path=a,this.pi=Math.min(1,a.length-1),this.goal=i,this.bestD=1/0,this.noProg=0,!0):(this.path=null,!1)}_pickPaintGoal(){let e=this.a,t=F.nav,n=-1,r=-1/0,i=F.level.spawnPads[1-e.team],a=F.level.spawnPads[e.team].distanceTo(i),o=F.actors.filter(t=>t!==e&&t.team===e.team&&t.bot);for(let s=0;s<16;s++){let s=t.validIds[Math.random()*t.validIds.length|0],c=t.nodes[s];if(c.zone>=0)continue;let l=Math.hypot(c.x-e.pos.x,c.z-e.pos.z);if(l>34)continue;let u=F.paint.regionStats(c.x,c.y,c.z,3.5,e.team,ni);if(!u.n)continue;let d=1-Math.hypot(c.x-i.x,c.z-i.z)/a,f=(u.empty+u.enemy*1.25)*12-l*.18+R(d,0,.8)*4+Math.random()*2.5;for(let e of o)if(e.bot.goal>=0){let n=t.nodes[e.bot.goal];Math.hypot(n.x-c.x,n.z-c.z)<7&&(f-=4)}f>r&&(r=f,n=s)}if(this.goalTimer=4+Math.random()*3,n<0)return;let s=t.nodes[n];this._pathTo(ti.set(s.x,s.y,s.z),.3)}_pickRefill(){let e=this.a,t=null,n=1/0;for(let r=0;r<14;r++){let r=Math.random()*Math.PI*2,i=1+Math.random()*7;$r.set(e.pos.x+Math.cos(r)*i,e.pos.y,e.pos.z+Math.sin(r)*i);let a=F.paint.regionStats($r.x,$r.y,$r.z,1.2,e.team,ni);a.n&&a.own>.6&&i<n&&(n=i,t=$r.clone())}t?this._pathTo(t,.4):this.path=null,this.repath=1.2}_pathRemaining(){if(!this.path)return 0;let e=F.nav.nodes[this.path[this.path.length-1]];return Math.hypot(e.x-this.a.pos.x,e.z-this.a.pos.z)}_fatLos(e,t,n,r,i,a){let o=r-e,s=a-n,c=Math.hypot(o,s)||1,l=-s/c*.34,u=o/c*.34;for(let o of[0,1,-1])if($r.set(e+l*o,t+.45,n+u*o),ei.set(r+l*o,i+.45,a+u*o),!F.physics.los($r,ei))return!1;return!0}_steer(e){let t=this.a,n=F.nav,r=this._mv||=new j;if(r.set(0,0,0),!this.path||this.pi>=this.path.length)return r;for(;this.pi<this.path.length;){let e=n.nodes[this.path[this.pi]],r=e.x-t.pos.x,i=e.z-t.pos.z,a=e.y-t.pos.y;if(r*r+i*i<.6*.6&&a<.9&&a>-1.8)this.pi++,this.bestD=1/0,this.noProg=0;else break}if(this.pi>=this.path.length)return r;let i=n.nodes[this.path[this.pi]],a=Math.hypot(i.x-t.pos.x,i.z-t.pos.z);if(t.grounded&&i.y-t.pos.y>.9&&a<1.2&&n.edgeType(this.path[Math.max(0,this.pi-1)],this.path[this.pi])!==`jump`)return this.path=null,this.repath=0,this.goalTimer=0,r;let o=this.pi;for(let e=this.pi+1;e<Math.min(this.path.length,this.pi+7);e++){let r=n.nodes[this.path[e]];if(Math.abs(r.y-t.pos.y)>.4||n.edgeType(this.path[e-1],this.path[e])!==`walk`||!this._fatLos(t.pos.x,t.pos.y,t.pos.z,r.x,r.y,r.z))break;o=e}let s=n.nodes[this.path[o]];r.set(s.x-t.pos.x,0,s.z-t.pos.z);let c=r.length();c>.001&&r.multiplyScalar(1/c),this.pi>0&&n.edgeType(this.path[this.pi-1],this.path[this.pi])===`jump`&&i.y-t.pos.y>.4&&a<1.6&&(this._needJump=!0);for(let e of F.actors){if(e===t||!e.alive)continue;let n=t.pos.x-e.pos.x,i=t.pos.z-e.pos.z,a=n*n+i*i;if(a<1.4*1.4&&a>1e-4){let e=(1.4-Math.sqrt(a))*.7,t=n*-r.z+i*r.x>=0?1:-1,o=r.x,s=r.z;r.x=o-s*t*e,r.z=s+o*t*e}}let l=r.length();return l>1&&r.multiplyScalar(1/l),a<this.bestD-.2?(this.bestD=a,this.noProg=0):this.noProg+=e,r}},ii=new j,ai=new j,oi=new j,si=new j,ci=new ar,li={t:0,dist:0},ui={x:0,y:0,mag:0},di=Math.PI/180;function fi(e){return e<.75?.62*(e/.75)**1.6:.62+(e-.75)/.25*.38}var pi=class{constructor(e,t,n){this.a=e,this.rig=t,this.input=n,this.mapHeld=!1,this.onTarget=null,this.inRange=!1,this.padLook={x:0,y:0},this.enabled=!0,this.edgeT=0,this.assist={target:null,yaw:0,pitch:0,has:!1,strength:0}}update(e){let t=this.a,n=this.rig,r=this.input,i=F.settings,a=t.intent;if(!this.enabled){a.move.set(0,0,0),a.fire=a.jump=a.squid=a.sub=a.special=!1,this.assist.has=!1;return}let o=!!r.pad&&r.lastDevice===`pad`,s=this._assistTarget(o?i.aimAssist??1:i.aimAssistMouse?.5:0),c=i.invertY?-1:1,l=s?z(1,.58,s.closeness*s.strength):1,u=!1,d=r.mouse.dx,f=r.mouse.dy;if(d||f){let e=.0021*(i.sensitivity??1)*(i.aimAssistMouse?l:1);n.yaw-=d*e,n.pitch-=f*e*c,u=!0}if(r.pad){r.padStick(2,3,ui,.11,.96);let t=i.padSensitivity??1;ui.mag>.93?this.edgeT=Math.min(.5,this.edgeT+e):this.edgeT=Math.max(0,this.edgeT-e*3);let a=1+.55*R((this.edgeT-.16)/.3,0,1),o=ui.mag>0?fi(ui.mag)/ui.mag:0,s=1-Math.exp(-60*e);this.padLook.x+=(ui.x*o-this.padLook.x)*s,this.padLook.y+=(ui.y*o-this.padLook.y)*s,ui.mag>0&&(u=!0),n.yaw-=this.padLook.x*3.6*t*a*l*e,n.pitch-=this.padLook.y*2.4*t*l*e*c}let p=0,m=0;(r.down(`KeyW`)||r.down(`ArrowUp`))&&(m+=1),(r.down(`KeyS`)||r.down(`ArrowDown`))&&--m,(r.down(`KeyA`)||r.down(`ArrowLeft`))&&--p,(r.down(`KeyD`)||r.down(`ArrowRight`))&&(p+=1),r.pad&&(r.padStick(0,1,ui,.14,.95),p+=ui.x,m-=ui.y);let h=Math.hypot(p,m);if(h>1&&(p/=h,m/=h),s&&s.prevValid&&(u||h>.2||a.fire)){let e=.42*s.strength*s.closeness;n.yaw+=Fe(s.prevYaw,s.yaw)*e,n.pitch+=(s.pitch-s.prevPitch)*e*.7}n.pitch=R(n.pitch,-1.05,1.15),t.aimYaw=n.yaw,t.aimPitch=n.pitch;let g=Math.sin(n.yaw),_=Math.cos(n.yaw);if(a.move.set(g*m-_*p,0,_*m+g*p),a.jump=r.down(`Space`)||r.padButton(0),a.squid=r.down(`ShiftLeft`)||r.down(`ShiftRight`)||r.padValue(6)>.3,a.fire=r.mouse.left||r.padValue(7)>.3,a.sub=r.mouse.right||r.down(`KeyE`)||r.padButton(5),a.special=r.down(`KeyF`)||r.down(`KeyQ`)||r.padButton(3)||r.padButton(11),this.mapHeld=r.down(`Tab`)||r.padButton(8),this.mapHeld&&(a.fire=!1,a.sub=!1),this.mapHeld&&t.canSuperJump()){let e=F.actors.filter(e=>e.team===t.team&&e!==t),n=n=>{let r=e[n];r&&r.alive&&!r.superJumpState&&t.superJump(r)};if((r.wasPressed(`Digit1`)||r.padPressed.has(14))&&n(0),(r.wasPressed(`Digit2`)||r.padPressed.has(12))&&n(1),(r.wasPressed(`Digit3`)||r.padPressed.has(15))&&n(2),r.wasPressed(`Digit4`)||r.padPressed.has(13)){let e=F.level.spawnPads[t.team];t.superJump(e.clone())}}this.computeAim()}_assistTarget(e){let t=this.assist,n=this.a,r=F.camera;if(!(e>0)||!r)return t.has=!1,t.target=null,null;let i=r.getWorldDirection(oi),a=n.weapon,o=Math.min(32,(a.kind===`charger`?a.rangeMax:a.kind===`roller`?7:a.range||12)*1.15+2),s=null,c=1/0,l=0,u=0,d=0;for(let e of F.actors){if(e.team===n.team||!e.alive||e.anim.form===`swim`||e.invuln>0)continue;si.set(e.pos.x,e.pos.y+(e.smoothY||0)+(e.form===`squid`?.3:.95),e.pos.z),ii.copy(si).sub(r.position);let t=ii.length();if(t>o+4||t<.5||n.pos.distanceTo(e.pos)>o)continue;ii.multiplyScalar(1/t);let a=Math.acos(R(ii.dot(i),-1,1)),f=R(Math.atan2(1,t),2.5*di,10*di);if(a>f||!F.physics.los(r.position,si))continue;let p=a/f+t*.01;p<c&&(c=p,s=e,l=Math.atan2(ii.x,ii.z),u=Math.asin(R(ii.y,-1,1)),d=1-a/f)}return s?(t.prevValid=t.has&&t.target===s,t.prevYaw=t.yaw,t.prevPitch=t.pitch,t.target=s,t.yaw=l,t.pitch=u,t.closeness=R(d*1.3,0,1),t.strength=e,t.has=!0,t):(t.has=!1,t.target=null,null)}computeAim(){let e=this.a,t=F.camera,n=t.getWorldDirection(oi);ii.copy(e.pos),ii.y+=1.3;let r=Math.max(0,ii.sub(t.position).dot(n)),i=ai.copy(t.position).addScaledVector(n,r),a=F.physics.raycast(i,n,70,ci,!0),o=a.hit?a.dist:70;e.aimPoint.copy(i).addScaledVector(n,o),this.onTarget=null;let s=o,c=Math.min(o,34),l=ii.copy(i).addScaledVector(n,c);for(let t of F.actors)if(!(t.team===e.team||!t.alive)&&t.anim.form!==`swim`&&(si.set(t.pos.x,t.pos.y+(t.smoothY||0),t.pos.z),sr.segmentCapsuleDist(i,l,si,V.radius,t.form===`squid`?V.squidHeight:V.height,li),li.dist<V.radius+.2)){let e=li.t*c;e<s&&(s=e,li.t,this.onTarget=t)}if(this.onTarget){let t=this.onTarget,r=t.form===`squid`?V.squidHeight:V.height,a=i.y+n.y*s,o=t.pos.y+(t.smoothY||0);e.aimPoint.set(t.pos.x,R(a,o+.2,o+r-.12),t.pos.z)}let u=e.weapon,d=u.kind===`charger`?u.rangeMax:u.kind===`roller`?6:u.range||12;this.inRange=e.aimPoint.distanceTo(e.pos)<=d+.5}},mi=new j,hi=class{constructor(e){this.opts=e,this.attract=!!e.attract,this.duration=e.duration||gt.defaultDuration,this.time=this.duration,this.state=`init`,this.stateT=0,this.actors=[],this.controller=null,this.result=null,this.paused=!1,this.lastMinuteFired=!1,this.lastCount=99,this.events=[]}playing(){return this.state===`playing`&&!this.paused}canRespawn(){return this.state===`playing`}setup(){let e=this.opts,t=e.CharacterClass,n=e=>{let t=[...pt],n=[];for(e&&(n.push(e),t.splice(t.indexOf(e),1));n.length<gt.teamSize;)t.length||t.push(...pt),n.push(t.splice(Math.random()*t.length|0,1)[0]);return n},r=gi([...yt]),i=0;for(let a=0;a<2;a++){let o=n(a===0&&!this.attract?e.weapon:null);for(let n=0;n<gt.teamSize;n++){let s=a===0&&n===0&&!this.attract,c=new Qr({team:a,slot:n,weapon:o[n],isLocal:s,isBot:!s,name:s?e.playerName||`You`:r[i++%r.length],style:{hair:Math.random()*4|0,skin:Math.random()*4|0},CharacterClass:t});s&&e.style,F.scene.add(c.character.root),(!s||e.autopilot)&&(c.bot=new ri(c,e.difficulty)),this.actors.push(c)}}F.actors=this.actors,this.local=this.actors.find(e=>e.isLocal)||null,F.local=this.local,this.local&&!e.autopilot&&(this.controller=new pi(this.local,e.rig,e.input));for(let e of this.actors){let t=F.level.spawnPads[e.team],n=e.slot/4*Math.PI*2+.6;mi.set(t.x+Math.cos(n)*1.2,t.y,t.z+Math.sin(n)*1.2),e.spawnAt(mi,e.team===0?0:Math.PI),e.invuln=0,e.bot&&(e.bot.aimYaw=e.yaw,e.bot.aimPitch=0)}this.unsubs=[I(`splatted`,e=>this._onSplatted(e))]}start(){this.setState(this.attract?`playing`:`intro`)}setState(e){this.state=e,this.stateT=0,L(`match:state`,{state:e,match:this})}dispose(){for(let e of this.actors)F.scene.remove(e.character.root),e.weaponRunner.reset(),e.character.dispose?.();this.unsubs?.forEach(e=>e()),F.actors=[],F.local=null}_onSplatted({victim:e,attacker:t,cause:n}){this.events.push({t:this.duration-this.time,victim:e,attacker:t,cause:n})}update(e){if(this.paused)return;switch(this.stateT+=e,this.state){case`intro`:this.stateT>4.2&&this.setState(`playing`);break;case`playing`:if(this.time-=e,!this.attract){!this.lastMinuteFired&&this.time<=60&&this.duration>60&&(this.lastMinuteFired=!0,L(`match:oneminute`,{}));let e=Math.ceil(this.time);this.time<=gt.finalCountdown&&e!==this.lastCount&&e>0&&(this.lastCount=e,L(`match:count`,{n:e}))}this.time<=0&&(this.time=0,this.setState(`finish`));break;case`finish`:this.stateT>2.6&&this._judge();break}let t=this.state===`playing`;for(let n of this.actors)n.bot&&(t?n.bot.update(e):(n.intent.move.set(0,0,0),n.intent.fire=n.intent.squid=n.intent.sub=n.intent.jump=n.intent.special=!1));for(let t of this.actors)t.update(e);for(let e=0;e<this.actors.length;e++)for(let t=e+1;t<this.actors.length;t++){let n=this.actors[e],r=this.actors[t];if(!n.alive||!r.alive)continue;let i=r.pos.x-n.pos.x,a=r.pos.z-n.pos.z,o=r.pos.y-n.pos.y,s=i*i+a*a,c=V.radius*1.7;if(s<c*c&&Math.abs(o)<1.2&&s>1e-5){let e=Math.sqrt(s),t=(c-e)*.5;n.pos.x-=i/e*t,n.pos.z-=a/e*t,r.pos.x+=i/e*t,r.pos.z+=a/e*t}}}updateController(e){this.controller&&(this.controller.enabled=this.state===`playing`&&!this.paused&&this.local.alive,this.controller.update(e))}_judge(){let e=F.paint.coverage();this.result={coverage:e,winner:e[0]===e[1]?Math.random()<.5?0:1:e[0]>e[1]?0:1},this.setState(`judge`)}teamSummary(){return[0,1].map(e=>({color:F.teamHex[e],players:this.actors.filter(t=>t.team===e).map(e=>({name:e.name,weapon:e.weaponId,alive:e.alive,respawn:e.alive?0:Math.max(0,e.respawnTimer),specialReady:e.specialReady(),isSelf:e.isLocal}))}))}};function gi(e){for(let t=e.length-1;t>0;t--){let n=Math.random()*(t+1)|0;[e[t],e[n]]=[e[n],e[t]]}return e}var _i=Math.PI*2,vi=null,yi=[],bi=()=>{let e=F.match;return!!(e&&!e.attract)};function xi(e){!vi||!bi()||(yi.length>40&&yi.shift(),yi.push(e))}I(`special:slam`,({actor:e,pos:t,radius:n})=>xi({kind:`slam`,x:t.x,z:t.z,team:e?e.team:0,r:n||ht.slam.radius,t:0,life:.9})),I(`bomb:explode`,({pos:e,team:t,radius:n})=>xi({kind:`boom`,x:e.x,z:e.z,team:t|0,r:n||mt.bomb.radius,t:0,life:.7})),I(`superjump`,({actor:e,phase:t,to:n})=>{t===`flight`&&n&&xi({kind:`jump`,x:n.x,z:n.z,team:e.team,actor:e,t:0,life:3})}),I(`superjump:land`,({actor:e})=>{for(let t of yi)t.kind===`jump`&&t.actor===e&&(t.life=Math.min(t.life,t.t+.35))}),I(`respawn`,({actor:e})=>{let t=F.level?.spawnPads?.[e.team];t&&xi({kind:`spawn`,x:t.x,z:t.z,team:e.team,t:0,life:.8})}),I(`splatted`,({victim:e,attacker:t})=>{e&&e.pos&&xi({kind:`splat`,x:e.pos.x,z:e.pos.z,team:t?t.team:1-e.team,t:0,life:1.6})});function Si(e){return Math.round(255*(e<=.0031308?e*12.92:1.055*e**(1/2.4)-.055))}var Ci=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},wi=class{constructor(e,t,n=7){this.level=e,this.paint=t;let r=e.bounds;this.s=n,this.w=Math.round((r.maxX-r.minX)*n),this.h=Math.round((r.maxZ-r.minZ)*n);let i=()=>{let e=document.createElement(`canvas`);return e.width=this.w,e.height=this.h,e};this.canvas=i(),this.ctx=this.canvas.getContext(`2d`),this.base=i(),this.bctx=this.base.getContext(`2d`,{willReadFrequently:!0}),this.inkC=i(),this.ictx=this.inkC.getContext(`2d`),this.flashC=i(),this.fctx=this.flashC.getContext(`2d`),this.inkImg=this.ictx.createImageData(this.w,this.h),this.flashImg=this.fctx.createImageData(this.w,this.h),this.flip=!1,this.version=-1,this.timer=0,this.time=0,this.flashT=9,this._team=[null,null],vi=this,yi.length=0,this._built=!1,this._band=0,(typeof requestIdleCallback==`function`?e=>requestIdleCallback(e,{timeout:1500}):e=>setTimeout(e,60))(()=>{!this._built&&vi===this&&this._build()})}setViewerTeam(e){let t=e===1;if(t===this.flip&&this._built){this.version=-1;return}this.flip=t,this._build(),this.version=-1}ensure(){this._built||this._build()}toCanvas(e,t,n={x:0,y:0}){let r=this.level.bounds,i=(r.maxX-e)*this.s,a=(r.maxZ-t)*this.s;return this.flip&&(i=this.w-i,a=this.h-a),n.x=i,n.y=a,n}_worldX(e){let t=this.level.bounds,n=this.flip?this.w-e:e;return t.maxX-n/this.s}_worldZ(e){let t=this.level.bounds,n=this.flip?this.h-e:e;return t.maxZ-n/this.s}_build(){let e=this.w,t=this.h,n=e*t,r=this.level;this.s;let i=this.hgt=new Float32Array(n).fill(-99),a=this.topBlock=new Int32Array(n).fill(-1),o=this.nrm=new Float32Array(n*2),s={x:0,y:0};for(let n of r.blocks){if(!n.solid)continue;let r=n.axes[1];if(r.y<.45)continue;let c=n.center.x+r.x*n.half.y,l=n.center.y+r.y*n.half.y,u=n.center.z+r.z*n.half.y;this.toCanvas(n.aabbMax.x,n.aabbMax.z,s);let d=s.x,f=s.y;this.toCanvas(n.aabbMin.x,n.aabbMin.z,s);let p=s.x,m=s.y;d>p&&([d,p]=[p,d]),f>m&&([f,m]=[m,f]);let h=Math.max(0,Math.floor(d)),g=Math.min(e-1,Math.ceil(p)),_=Math.max(0,Math.floor(f)),v=Math.min(t-1,Math.ceil(m)),y=n.axes[0],b=n.axes[2],x=this.flip?r.x:-r.x,S=this.flip?r.z:-r.z;for(let t=_;t<=v;t++){let s=this._worldZ(t+.5);for(let d=h;d<=g;d++){let f=this._worldX(d+.5),p=l-(r.x*(f-c)+r.z*(s-u))/r.y,m=f-n.center.x,h=p-.01-n.center.y,g=s-n.center.z;if(Math.abs(m*y.x+h*y.y+g*y.z)>n.half.x||Math.abs(m*b.x+h*b.y+g*b.z)>n.half.z)continue;let _=t*e+d;p>i[_]&&(i[_]=p,a[_]=n.id,o[_*2]=x,o[_*2+1]=S)}}}let c=this.paint,l=c.paintFaces.filter(e=>e.turf).sort((e,t)=>e.origin.y-t.origin.y),u=this.pixCell=new Int32Array(n).fill(-1),d=this.pixFx=new Uint8Array(n),f=this.pixFy=new Uint8Array(n),p=this.pixSx=new Int8Array(n),m=this.pixSy=new Int32Array(n);for(let n of l){if(n.n.y<.45)continue;let r=n.u.x,a=n.u.z,o=n.v.x,l=n.v.z,h=r*r+a*a,g=o*o+l*l;if(h<1e-4||g<1e-4)continue;let _=1/0,v=1/0,y=-1/0,b=-1/0;for(let[e,t]of[[0,0],[1,0],[0,1],[1,1]])this.toCanvas(n.origin.x+r*n.su*e+o*n.sv*t,n.origin.z+a*n.su*e+l*n.sv*t,s),_=Math.min(_,s.x),y=Math.max(y,s.x),v=Math.min(v,s.y),b=Math.max(b,s.y);let x=Math.max(0,Math.floor(_)),S=Math.min(e-1,Math.ceil(y)),C=Math.max(0,Math.floor(v)),w=Math.min(t-1,Math.ceil(b)),T=n.origin.y+Math.max(0,n.u.y*n.su)+Math.max(0,n.v.y*n.sv);for(let t=C;t<=w;t++){let s=this._worldZ(t+.5);for(let _=x;_<=S;_++){let v=t*e+_;if(i[v]>T+.05)continue;let y=this._worldX(_+.5)-n.origin.x,b=s-n.origin.z,x=(y*r+b*a)/h,S=(y*o+b*l)/g;if(x<0||S<0||x>=n.su||S>=n.sv)continue;let C=x/n.cu-.5,w=S/n.cv-.5,E=Math.floor(C),D=Math.floor(w),O=C-E,ee=w-D;E<0&&(E=0,O=0),D<0&&(D=0,ee=0),E>=n.nu-1&&(E=n.nu-1,O=0),D>=n.nv-1&&(D=n.nv-1,ee=0);let te=n.grid+D*n.nu+E;c.dead[te]||(u[v]=te,d[v]=Math.round(O*255),f[v]=Math.round(ee*255),p[v]=E<n.nu-1&&!c.dead[te+1]?1:0,m[v]=D<n.nv-1&&!c.dead[te+n.nu]?n.nu:0)}}}this._drawBase(),this.owner=new Uint8Array(n),this._built=!0}_drawBase(){let e=this.w,t=this.h;e*t;let n=this.hgt,r=this.topBlock,i=this.nrm,a=this.level,o=this.s,s=this.bctx.createImageData(e,t),c=s.data,l=(F.game?.mapDef?.theme||`day`)===`sunset`,u=-.62,d=-.78,f=new Map,p=e=>{let t=f.get(e);if(t)return t;let n=a.blocks[e],r=Si(n.color.r),i=Si(n.color.g),o=Si(n.color.b),s=n.hidden?.35:.52,c=l?[236,214,196]:[242,236,222];return t=[r+(c[0]-r)*s,i+(c[1]-i)*s,o+(c[2]-o)*s],n.grate&&(t=[150,162,176]),n.hidden&&(t=[t[0]*.78,t[1]*.78,t[2]*.84]),f.set(e,t),t},m=l?[70,64,120]:[36,104,170],h=l?[104,86,150]:[62,146,206];for(let o=0;o<t;o++)for(let s=0;s<e;s++){let l=o*e+s,f=l*4,g=n[l];if(r[l]<0){let n=.5+.5*Math.sin((s*.9+o*.55)*.13)*Math.sin(o*.05+s*.012),i=0;for(let n=1;n<=6&&!i;n++)(s-n>=0&&r[l-n]>=0||s+n<e&&r[l+n]>=0||o-n>=0&&r[l-n*e]>=0||o+n<t&&r[l+n*e]>=0)&&(i=1-(n-1)/6);let a=.25+n*.35;c[f]=m[0]+(h[0]-m[0])*a+i*60,c[f+1]=m[1]+(h[1]-m[1])*a+i*55,c[f+2]=m[2]+(h[2]-m[2])*a+i*40,c[f+3]=255;continue}let _=a.blocks[r[l]],v=p(r[l]),y=.9+Math.max(-.14,Math.min(.16,g*.035)),b=i[l*2],x=i[l*2+1];b*b+x*x>.002&&(y*=1+(b*u+x*d)*1.6);let S=0;for(let r=3;r<=27;r+=3){let i=Math.round(s+u*r),a=Math.round(o+d*r);if(i<0||a<0||i>=e||a>=t)break;let c=n[i+a*e]-g-r*.11;c>0&&(S=Math.max(S,Math.min(1,c/.5)*(1-r/30)))}y*=1-S*.3;let C=0,w=0;for(let i=-2;i<=2;i++)for(let a=-2;a<=2;a++){if(!a&&!i||Math.abs(a)+Math.abs(i)>2)continue;let c=s+a,l=o+i;if(c<0||l<0||c>=e||l>=t)continue;let u=c+l*e,d=(r[u]<0?-3:n[u])-g,f=1/(Math.abs(a)+Math.abs(i));d>.3&&(C+=f*Math.min(1,d)),d<-.3&&Math.abs(a)+Math.abs(i)===1&&(w=1)}y*=1-Math.min(.28,C*.07);let T=v[0]*y,E=v[1]*y,D=v[2]*y;w&&(T*=.42,E*=.4,D*=.48),_.grate&&((s+o)%4<1.5||(s-o+4e3)%4<1.5)&&(T*=.62,E*=.64,D*=.7),c[f]=Math.min(255,T),c[f+1]=Math.min(255,E),c[f+2]=Math.min(255,D),c[f+3]=255}this.bctx.putImageData(s,0,0);let g=this.bctx;g.save(),g.globalAlpha=.07,g.strokeStyle=`#1b1830`,g.lineWidth=1;let _=5*o;g.beginPath();for(let e=this.w%_/2;e<this.w;e+=_)g.moveTo(Math.round(e)+.5,0),g.lineTo(Math.round(e)+.5,this.h);for(let e=this.h%_/2;e<this.h;e+=_)g.moveTo(0,Math.round(e)+.5),g.lineTo(this.w,Math.round(e)+.5);g.stroke(),g.restore()}_teamRGB(){let e=F.teamColors?.[0],t=F.teamColors?.[1];return!e||!t?[[255,138,20],[47,91,255]]:[[Si(e.r),Si(e.g),Si(e.b)],[Si(t.r),Si(t.g),Si(t.b)]]}_drawInk(e=0,t=this.h){let n=this.w,r=this.h,i=n*r,a=this.paint.grid,o=this.pixCell,s=this.pixFx,c=this.pixFy,l=this.pixSx,u=this.pixSy,d=this.inkImg.data,f=this.flashImg.data,p=this.owner;e===0&&(this._rgb=this._teamRGB());let[m,h]=this._rgb||this._teamRGB(),g=this._alpha||=new Float32Array(i),_=this._tm||=new Uint8Array(i),v=this._tt||=new Uint8Array(i),y=Math.max(0,e-1)*n,b=Math.min(r,t+1)*n;for(let e=y;e<b;e++){let t=o[e];if(t<0){g[e]=0;continue}let n=l[e],r=u[e],i=a[t],d=a[t+n],f=a[t+r],p=a[t+n+r];if(i===d&&i===f&&i===p){g[e]=i?1:0,_[e]=i,v[e]=i||1;continue}let m=s[e]*(1/255),h=c[e]*(1/255),y=(1-m)*(1-h),b=m*(1-h),x=(1-m)*h,S=m*h,C=(i===1?y:0)+(d===1?b:0)+(f===1?x:0)+(p===1?S:0),w=(i===2?y:0)+(d===2?b:0)+(f===2?x:0)+(p===2?S:0),T=C>=w?1:2,E=Ci(.34,.62,T===1?C:w);g[e]=E,_[e]=E>.5?T:0,v[e]=T}let x=0;for(let i=e;i<t;i++)for(let e=0;e<n;e++){let t=i*n+e,a=t*4,o=g[t];if(o<=.003){d[a+3]=0,f[a+3]=0,p[t]=0;continue}let s=v[t]===2?h:m,c=e>0&&i>0?g[t-n-1]:o,l=e<n-1&&i<r-1?g[t+n+1]:o,u=o-c>0?o-c:0,y=.94-(o-l>0?o-l:0)*.32,b=u*150;d[a]=s[0]*y+b,d[a+1]=s[1]*y+b,d[a+2]=s[2]*y+b,d[a+3]=o*255;let S=_[t];S&&p[t]!==S?(f[a]=255,f[a+1]=255,f[a+2]=255,f[a+3]=170,x++):f[a+3]=0,p[t]=S}this.ictx.putImageData(this.inkImg,0,0,0,e,n,t-e),this.fctx.putImageData(this.flashImg,0,0,0,e,n,t-e),x&&!this._quiet&&(this.flashT=0)}update(e,t=!1){this._built||this._build(),this.time+=e,this.timer-=e;let n=F.teamHex?F.teamHex[0]+F.teamHex[1]:``;n!==this._teamKey&&(this._teamKey=n,this.version=-1);let r=F.game?.mapDef?.theme||`day`;if(r!==this._theme){let e=this._theme;this._theme=r,e&&this._drawBase()}if(this._band>0){let e=this._band;this._drawInk(Math.floor(this.h*e/3),Math.floor(this.h*(e+1)/3)),this._band=e+1>=3?0:e+1,this._band||(this._quiet=!1)}else if(t||this.timer<=0&&this.version!==this.paint.version){this.timer=.15;let e=this.version===-1;this.version=this.paint.version,e||t?(this._quiet=e,this._drawInk(0,this.h),this._quiet=!1,e&&(this.flashT=9)):(this._drawInk(0,Math.floor(this.h/3)),this._band=1)}this.flashT+=e,this._compose(e)}_compose(e){let t=this.ctx;this.w,this.h;let n=this.s;t.globalAlpha=1,t.drawImage(this.base,0,0),t.drawImage(this.inkC,0,0),this.flashT<.45&&(t.globalAlpha=(1-this.flashT/.45)*.85,t.drawImage(this.flashC,0,0),t.globalAlpha=1);let r=F.teamHex||[`#ff8a14`,`#2f5bff`],i=this.time,a=this._tc||={x:0,y:0},o=this.level.spawnPads||[];for(let e=0;e<2;e++){let i=o[e];if(!i)continue;this.toCanvas(i.x,i.z,a);let s=(this.level.spawnBarrier||4)*n*.62;t.beginPath(),t.arc(a.x,a.y,s,0,_i),t.fillStyle=r[e],t.globalAlpha=.28,t.fill(),t.globalAlpha=1,t.lineWidth=3,t.strokeStyle=`#15121c`,t.stroke(),t.lineWidth=1.6,t.strokeStyle=`#ffffff`,t.stroke(),t.beginPath(),t.arc(a.x,a.y,s*.45,0,_i),t.fillStyle=r[e],t.fill(),t.lineWidth=2.5,t.strokeStyle=`#15121c`,t.stroke()}for(let o=yi.length-1;o>=0;o--){let s=yi[o];if(s.t+=e,s.t>=s.life){yi.splice(o,1);continue}this.toCanvas(s.x,s.z,a);let c=s.t/s.life,l=r[s.team]||`#fff`;if(s.kind===`slam`||s.kind===`boom`){let e=s.r*n*(.3+.7*(1-(1-c)**3));t.globalAlpha=(1-c)*.45,t.fillStyle=l,t.beginPath(),t.arc(a.x,a.y,e,0,_i),t.fill(),t.globalAlpha=1-c,t.lineWidth=s.kind===`slam`?4:3,t.strokeStyle=`#ffffff`,t.stroke(),t.globalAlpha=1}else if(s.kind===`jump`){let e=n*(1.1+.35*(.5+.5*Math.sin(i*10)));t.lineWidth=3,t.strokeStyle=`#15121c`,t.beginPath(),t.arc(a.x,a.y,e+1,0,_i),t.stroke(),t.lineWidth=2,t.strokeStyle=l,t.beginPath(),t.arc(a.x,a.y,e,0,_i),t.stroke(),t.beginPath(),t.moveTo(a.x-e*1.5,a.y),t.lineTo(a.x-e*.5,a.y),t.moveTo(a.x+e*.5,a.y),t.lineTo(a.x+e*1.5,a.y),t.moveTo(a.x,a.y-e*1.5),t.lineTo(a.x,a.y-e*.5),t.moveTo(a.x,a.y+e*.5),t.lineTo(a.x,a.y+e*1.5),t.stroke()}else if(s.kind===`spawn`){let e=n*(2+5*c);t.globalAlpha=1-c,t.lineWidth=3,t.strokeStyle=`#ffffff`,t.beginPath(),t.arc(a.x,a.y,e,0,_i),t.stroke(),t.globalAlpha=1}else if(s.kind===`splat`){let e=c<.15?c/.15:1-(c-.15)/.85,r=n*.9;t.globalAlpha=Math.max(0,e),t.lineWidth=4,t.strokeStyle=`#15121c`,this._cross(t,a.x,a.y,r),t.lineWidth=2.2,t.strokeStyle=l,this._cross(t,a.x,a.y,r),t.globalAlpha=1}}let s=F.projectiles;if(s&&s.clouds)for(let e of s.clouds){let o=e.group&&e.group.position;if(!o)continue;this.toCanvas(o.x,o.z,a);let s=r[e.team]||`#fff`,c=(ht.storm.radius||3.4)*n,l=Math.max(0,1-e.t/(e.dur||6.5));t.globalAlpha=.22,t.fillStyle=s,t.beginPath(),t.arc(a.x,a.y,c,0,_i),t.fill(),t.globalAlpha=1,t.setLineDash([4,4]),t.lineDashOffset=-i*12,t.lineWidth=2,t.strokeStyle=s,t.stroke(),t.setLineDash([]),t.lineWidth=3,t.strokeStyle=`#ffffff`,t.beginPath(),t.arc(a.x,a.y,c+3,-Math.PI/2,-Math.PI/2+l*_i),t.stroke(),this._cloud(t,a.x,a.y-1,n*1.1,s)}if(s&&s.bombs)for(let e of s.bombs){this.toCanvas(e.pos.x,e.pos.z,a);let i=r[e.team]||`#fff`;if(e.kind===`storm`){this._cloud(t,a.x,a.y,n*.8,i);continue}let o=e.fuse>=0,s=o?1-e.fuse/(mt.bomb.fuse||1):0;o&&(t.globalAlpha=.35+(.5+.5*Math.sin(e.age*(10+s*30)))*.4,t.fillStyle=i,t.beginPath(),t.arc(a.x,a.y,(mt.bomb.radius||3)*n*(.5+.5*s),0,_i),t.fill(),t.globalAlpha=1);let c=n*.62;t.beginPath(),t.arc(a.x,a.y,c+1.5,0,_i),t.fillStyle=`#15121c`,t.fill(),t.beginPath(),t.arc(a.x,a.y,c,0,_i),t.fillStyle=i,t.fill(),t.beginPath(),t.arc(a.x-c*.3,a.y-c*.3,c*.3,0,_i),t.fillStyle=`rgba(255,255,255,.75)`,t.fill()}t.globalAlpha=1}_cross(e,t,n,r){e.beginPath(),e.moveTo(t-r,n-r),e.lineTo(t+r,n+r),e.moveTo(t+r,n-r),e.lineTo(t-r,n+r),e.stroke()}_cloud(e,t,n,r,i){e.beginPath(),e.arc(t-r*.55,n+r*.1,r*.55,0,_i),e.arc(t+r*.55,n+r*.1,r*.5,0,_i),e.arc(t,n-r*.25,r*.7,0,_i),e.lineWidth=3,e.strokeStyle=`#15121c`,e.stroke(),e.fillStyle=i,e.fill(),e.beginPath(),e.arc(t-r*.15,n-r*.45,r*.25,0,_i),e.fillStyle=`rgba(255,255,255,.6)`,e.fill()}},$=Math.PI*2,Ti=e=>e<0?0:e>1?1:e,Ei=(e,t,n)=>{let r=Ti((n-e)/(t-e));return r*r*(3-2*r)},Di=e=>(e=1-Ti(e),1-e*e*e),Oi=e=>(e=Ti(e),e*e*e*(e*(e*6-15)+10)),ki=(e,t=1.70158)=>(e=Ti(e)-1,1+e*e*((t+1)*e+t)),Ai=(e,t,n)=>{let r=Ti(.5+.5*(t-e)/n);return z(t,e,r)-n*r*(1-r)},ji=(e,t=17,n=7)=>e<0?0:Math.exp(-e*n)*Math.sin(e*t),Mi=(e,t=22,n=4.2)=>e<0?0:(1-Math.exp(-e*t))*Math.exp(-e*n),Ni=new j(0,1,0),Pi={R:.64,bevel:.09,groove:{y:-.235,h:.021,d:.022},flange:{y:-.5,out:.075,b:.04},bottom:-3,ink:.014},Fi={bevel:.09,groove:{y:-.2,h:.019,d:.02},flange:{y:-.44,out:.065,b:.035},bottom:-3.2,ink:.013},Ii=[{x:0,z:0,R:.7,top:.72,yaw:0},{x:-1.34,z:-.14,R:.63,top:.46,yaw:.2},{x:1.34,z:-.14,R:.63,top:.46,yaw:-.2},{x:2.55,z:-.36,R:.56,top:.22,yaw:-.34}],Li=1.62,Ri=.76;function zi(e){let t=[];for(let n of e)for(let e=0;e<n.length;e++){let r=n[Math.max(0,e-1)],i=n[Math.min(n.length-1,e+1)],a=i[0]-r[0],o=i[1]-r[1],s=Math.hypot(a,o)||1;a/=s,o/=s,t.push({r:n[e][0],y:n[e][1],nr:-o,ny:a})}return t}function Bi(e,t,n,r,i,a,o,s){for(let c=s?1:0;c<=o;c++){let s=i+(a-i)*(c/o);e.push([t+Math.cos(s)*r,n+Math.sin(s)*r])}}function Vi(e,t){let n=t.bevel,r=t.groove,i=t.flange,a=[];for(let t=0;t<8;t++)a.push([(e-n)*(t/8),0]);Bi(a,e-n,-n,n,Math.PI/2,0,18),a.push([e,r.y+r.h+.022]);for(let t=0;t<=12;t++){let n=t/12*Math.PI;a.push([e-r.d*Math.sin(n),r.y+r.h*Math.cos(n)])}a.push([e,r.y-r.h-.022]),a.push([e,i.y]);let o=[[e,i.y],[e+i.out-i.b,i.y]];return Bi(o,e+i.out-i.b,i.y-i.b,i.b,Math.PI/2,0,10,!0),o.push([e+i.out,i.y-.25],[e+i.out,t.bottom*.5],[e+i.out,t.bottom]),zi([a,o])}function Hi(e,t,n){let r=e.length,i=r*t,a=new Float32Array(i*3),o=new Float32Array(i*3),s=new Float32Array(i*3),c=new Float32Array(i);for(let i=0;i<r;i++){let r=e[i],l=z(.2,1,Ei(-1.7,-.06,r.y))*(1+.1*Math.exp(-(((r.y+.14)/.08)**2))),u=(r.y-n.y)/.055,d=.26*Math.exp(-u*u)+.05*Math.exp(-(((r.y-n.y)/.2)**2));for(let e=0;e<t;e++){let n=e/t*$,u=Math.sin(n),f=Math.cos(n),p=i*t+e;a[p*3]=r.r*u,a[p*3+1]=r.y,a[p*3+2]=r.r*f,o[p*3]=r.nr*u,o[p*3+1]=r.ny,o[p*3+2]=r.nr*f,s[p*3]=s[p*3+1]=s[p*3+2]=l,c[p]=d}}let l=[];for(let e=0;e<r-1;e++)for(let n=0;n<t;n++){let r=e*t+n,i=e*t+(n+1)%t,a=(e+1)*t+n,o=(e+1)*t+(n+1)%t;l.push(r,a,i,i,a,o)}let u=new D;return u.setAttribute(`position`,new oe(a,3)),u.setAttribute(`normal`,new oe(o,3)),u.setAttribute(`color`,new oe(s,3)),u.setAttribute(`aGlow`,new oe(c,1)),u.setIndex(l),u}function Ui(e,t,n){let r=Hi(Vi(e,t),n,t.groove),i=t.groove.h*.8,a=new we(e-t.groove.d+i,i,10,n).rotateX(Math.PI/2);a.translate(0,t.groove.y,0),a.deleteAttribute(`uv`);let o=a.attributes.position.count;a.setAttribute(`color`,new oe(new Float32Array(o*3).fill(.03),3)),a.setAttribute(`aGlow`,new oe(new Float32Array(o).fill(1),1));let s=nn([r,a]);return r.dispose(),a.dispose(),s}function Wi(e,t,n){let r=[];for(let n=0;n<12;n++)r.push([(e-t)*(n/12),0]);Bi(r,e-t,-t,t,Math.PI/2,0,22);let i=r.length-1;for(let i=1;i<=36;i++)r.push([e,-t-i/36*n]);let a=zi([r]);a[0].s=0;for(let e=1;e<a.length;e++)a[e].s=a[e-1].s+Math.hypot(a[e].r-a[e-1].r,a[e].y-a[e-1].y);return{rows:a,sRim:a[i].s,sTopEnd:e-t,sMax:a[a.length-1].s,R:e}}function Gi(e,t,n){let r=e.rows,i=0,a=r.length-1;for(t<=0?(i=0,a=1,t=0):t>=r[a].s&&(i=a-1,t=r[a].s);a-i>1;){let e=i+a>>1;r[e].s<=t?i=e:a=e}let o=r[i],s=r[a],c=Ti((t-o.s)/(s.s-o.s||1));n.r=z(o.r,s.r,c),n.y=z(o.y,s.y,c);let l=z(o.nr,s.nr,c),u=z(o.ny,s.ny,c),d=Math.hypot(l,u)||1;return n.nr=l/d,n.ny=u/d,n}function Ki(e,t,n,r){let i=Wi(e,t,r.depth||.45),a=Le(r.seed||1),o=a()*$,s=a()*$,c=a()*$,l=a()*$,u=$*e,d=r.T0,f=r.Dt||.016;for(let t of n)t.u=t.th*e;let p=e=>Math.max(.01,(r.lip||.03)+.011*Math.sin(3*e+o)+.007*Math.sin(7*e+s)+.004*Math.sin(13*e+c)),m=(t,r)=>{let a=t/e,o=r-(i.sRim+p(a));for(let e=0;e<n.length;e++){let a=n[e],s=t-a.u;if(s-=Math.round(s/u)*u,Math.abs(s)>a.w+.06)continue;let c=a.w*.5,l=i.sRim-.04,d=i.sRim+a.L-c;o=Ai(o,Math.hypot(s,r-(r<l?l:r>d?d:r))-c,.018)}return o},h=[],g=Math.ceil(u/r.du);for(let e=0;e<g;e++)h.push(e/g*$);for(let t of n){let n=(t.w*.5+.04)/e,i=Math.ceil(2*n*e/r.duF);for(let e=0;e<=i;e++){let r=t.th-n+2*n*(e/i);r=(r%$+$)%$,h.push(r)}}h.sort((e,t)=>e-t);let _=[h[0]],v=r.duF*.45/e;for(let e=1;e<h.length;e++)h[e]-_[_.length-1]>v&&_.push(h[e]);$-_[_.length-1]+_[0]<v&&_.pop();let y=_.length,b=new Float32Array(y);for(let t=0;t<y;t++){let n=_[t]*e,r=i.sRim-.035,a=Math.min(i.sMax,i.sRim+.5);for(let e=0;e<26;e++){let e=(r+a)*.5;m(n,e)<0?r=e:a=e}b[t]=r}let x=[];for(let e=0;e<9;e++)x.push(i.sTopEnd*(e/9));for(let e=0;e<14;e++)x.push(i.sTopEnd+(i.sRim-i.sTopEnd)*(e/14));let S=r.NB||24,C=x.length,w=C+S+1,T=new Float32Array(y*w*3),E={r:0,y:0,nr:0,ny:0};for(let t=0;t<y;t++){let r=_[t],a=Math.sin(r),o=Math.cos(r),c=r*e;for(let e=0;e<w;e++){let p;if(e<C)p=x[e];else{let n=(e-C)/S;p=i.sRim+(b[t]-i.sRim)*(1-(1-n)**1.55)}let h=Ti(-m(c,p)/f),g=d*(1+.5*Ti((p-i.sRim-.03)/.2));for(let e=0;e<n.length;e++){let t=n[e],r=c-t.u;if(r-=Math.round(r/u)*u,Math.abs(r)>t.w)continue;let a=t.w*.5,o=i.sRim+t.L-a*1.1,s=((p-o)/(a*.95))**2+(r/(a*.8))**2;g+=d*.6*Math.exp(-s)*Ti((t.L-.05)/.08)}g*=1+.08*Math.sin(r*5+p*11+l)*Math.sin(r*3-p*7+s);let _=g*Math.sqrt(1-(1-h)*(1-h))+.0012;Gi(i,p,E);let v=(t*w+e)*3,y=E.r+E.nr*_;T[v]=y*a,T[v+1]=E.y+E.ny*_,T[v+2]=y*o}}let O=[];for(let e=0;e<y;e++){let t=(e+1)%y;for(let n=0;n<w-1;n++){let r=e*w+n,i=t*w+n,a=e*w+n+1,o=t*w+n+1;O.push(r,a,i,i,a,o)}}let ee=new D;return ee.setAttribute(`position`,new oe(T,3)),ee.setIndex(O),ee.computeVertexNormals(),ee}function qi(e,t,n){let r=Le(e),i=[];for(let e=0;e<t;e++){let a;a=n.front?(e/(t-1)-.5)*n.front*2+(r()-.5)*(n.front/t):e*2.39996+(r()-.5)*.25;let o=r()<n.longChance;i.push({th:(a%$+$)%$,w:z(n.w0,n.w1,r()),L:o?z(n.L1*.8,n.L1,r()):z(n.L0,n.L1*.6,r())})}return i}function Ji(){let e=Le(77),t=[],r=(r,i,a,o,s,c,l)=>{let u=[e()*$,e()*$,e()*$],d=e=>a*(1+o*(.55*Math.sin(5*e+u[0])+.3*Math.sin(9*e+u[1])+.15*Math.sin(14*e+u[2]))),f=[r,l,i];for(let e=1;e<=c;e++){let t=e/c;for(let e=0;e<s;e++){let n=e/s*$,a=d(n)*t;f.push(r+Math.sin(n)*a,l*Math.max(0,1-t*t)**.7+.004,i+Math.cos(n)*a)}}let p=[];for(let e=0;e<s;e++)p.push(0,1+e,1+(e+1)%s);for(let e=1;e<c;e++){let t=1+(e-1)*s,n=1+e*s;for(let e=0;e<s;e++){let r=(e+1)%s;p.push(t+e,n+e,t+r,t+r,n+e,n+r)}}let m=new D;m.setAttribute(`position`,new n(f,3)),m.setIndex(p),m.computeVertexNormals(),t.push(m)};r(0,0,1,.2,44,4,.16);for(let t=0;t<5;t++){let t=e()*$,n=1.25+e()*.45;r(Math.sin(t)*n,Math.cos(t)*n,.1+e()*.12,.08,12,2,.06)}let i=nn(t);return t.forEach(e=>e.dispose()),i}function Yi(){let e=new l(1,1,1,4),t=e.attributes.position;for(let e=0;e<t.count;e++){let n=t.getY(e);t.setZ(e,.22*n*n-.05)}return e.deleteAttribute(`uv`),e.computeVertexNormals(),e}var Xi=new g,Zi=new C;new C;var Qi=new j,$i=new j,ea=new j,ta=new g().makeScale(0,0,0),na=new C().setFromAxisAngle(new j(1,0,0),-Math.PI/2),ra=class{constructor(e,t,n){this.rand=n;let r=this.N=150;this.mesh=new se(new p(1,2),t,r),this.P=new Float32Array(r*3),this.V=new Float32Array(r*3),this.R=new Float32Array(r),this.A=new Float32Array(r),this.L=new Float32Array(r),this.S=new Float32Array(r),this.K=new Uint8Array(r);let i=this.SN=56;this.splats=new se(Ji(),t,i),this.SP=new Float32Array(i*3),this.SS=new Float32Array(i),this.SY=new Float32Array(i),this.SA=new Float32Array(i).fill(1e9),this.SL=new Float32Array(i),this.sNext=0;let a=this.RN=10;this.rings=new se(new we(1,.034,8,96).rotateX(Math.PI/2),t,a),this.RP=new Float32Array(a*3),this.R0=new Float32Array(a),this.R1=new Float32Array(a),this.RA=new Float32Array(a).fill(1e9),this.RL=new Float32Array(a),this.rNext=0;for(let t of[this.mesh,this.splats,this.rings]){t.frustumCulled=!1,t.count=0;for(let e=0;e<t.instanceMatrix.count;e++)t.setMatrixAt(e,ta);e.add(t)}this.mesh.castShadow=!0,this.splats.receiveShadow=!0,this.mesh.renderOrder=1}_slot(){for(let e=0;e<this.N;e++)if(!this.K[e])return e;return-1}drop(e,t,n,r,i,a,o,s=1,c=6){let l=this._slot();if(l<0)return-1;let u=l*3;return this.P[u]=e,this.P[u+1]=t,this.P[u+2]=n,this.V[u]=r,this.V[u+1]=i,this.V[u+2]=a,this.R[l]=o,this.A[l]=0,this.L[l]=c,this.S[l]=this.rand()*$,this.K[l]=s,l}bubble(e,t,n,r,i,a){return this.drop(e,t,n,e,i,n,r,3,a)}splat(e,t,n,r,i){let a=this.sNext;this.sNext=(a+1)%this.SN,this.SP[a*3]=e,this.SP[a*3+1]=t+8e-4+a%7*35e-5,this.SP[a*3+2]=n,this.SS[a]=r,this.SY[a]=this.rand()*$,this.SA[a]=0,this.SL[a]=i}ripple(e,t,n,r,i,a){let o=this.rNext;this.rNext=(o+1)%this.RN,this.RP[o*3]=e,this.RP[o*3+1]=t+.002,this.RP[o*3+2]=n,this.R0[o]=r,this.R1[o]=i,this.RA[o]=0,this.RL[o]=a}crown(e,t,n,r,i,a=.2){let o=this.rand;for(let s=0;s<i;s++){let c=s/i*$+o()*.45,l=a*(.8+o()*.6),u=(.5+o()*.9)*r,d=(1.7+o()*1.7)*r;this.drop(e+Math.sin(c)*l,t+.01,n+Math.cos(c)*l,Math.sin(c)*u,d,Math.cos(c)*u,.011+o()*o()*.026,1,4)}this.ripple(e,t,n,a*.8,a+.55*r,.6)}clear(){this.K.fill(0),this.SA.fill(1e9),this.RA.fill(1e9);for(let e of[this.mesh,this.splats,this.rings]){for(let t=0;t<e.instanceMatrix.count;t++)e.setMatrixAt(t,ta);e.count=0,e.instanceMatrix.needsUpdate=!0}}_land(e,t,n,r,i){let a=this.R[e],o=this.rand;if(t===1)this.splat(n,r,i,a*2.5,1.4+o()*.9);else if(t===4)this.splat(n,r,i,a*2.1,1.1+o()*.5),this.ripple(n,r,i,.02,.2+a*3,.5);else if(t===2){this.splat(n,r,i,a*3.3,3.4+o()),this.ripple(n,r,i,a,.55+a*4,.75);for(let e=0;e<9;e++){let t=e/9*$+o()*.6,s=.9+o()*1.3;this.drop(n+Math.sin(t)*a,r+.02,i+Math.cos(t)*a,Math.sin(t)*s,1.3+o()*1.8,Math.cos(t)*s,.012+o()*.02,1,3)}}}update(e,t){let n=this.P,r=this.V,i=-1;for(let a=0;a<this.N;a++){let o=this.K[a];if(!o)continue;let s=a*3,c=this.A[a]+=e,l=n[s],u=n[s+1],d=n[s+2],f=this.R[a];if(o===3){let t=this.L[a];if(c>=t){this.K[a]=0,this.mesh.setMatrixAt(a,ta);continue}let n=this.S[a];u+=r[s+1]*e*(.75+.25*Math.sin(c*1.9+n)),l=r[s]+.035*Math.sin(c*1.7+n)*Math.min(1,c),d=r[s+2]+.035*Math.cos(c*1.3+n*1.3)*Math.min(1,c);let i=Di(c/.5),o=c>t-.14?1+.35*((c-(t-.14))/.14):1,p=c>t-.03?0:1,m=1+.12*Math.sin(c*8+n),h=f*i*o*p;Zi.identity(),$i.set(h/Math.sqrt(m),h*m,h/Math.sqrt(m))}else{let n=o===2?9.5:o===4?9.8:10.5;r[s+1]-=n*e,o===4&&r[s+1]<-5.2&&(r[s+1]=-5.2);let i=u;l+=r[s]*e,u+=r[s+1]*e,d+=r[s+2]*e;let p=!1;for(let e=0;e<t.length;e++){let n=t[e];if(i>=n.y&&u<n.y){let e=l-n.x,t=d-n.z;if(e*e+t*t<n.r*n.r){p=!0,this.K[a]=0,this.mesh.setMatrixAt(a,ta),this._land(a,o,l,n.y,d);break}}}if(p)continue;if(u<-3.5||c>this.L[a]){this.K[a]=0,this.mesh.setMatrixAt(a,ta);continue}let m=r[s],h=r[s+1],g=r[s+2],_=Math.hypot(m,h,g),v=1+Math.min(_*.055,.9);_>.05?Zi.setFromUnitVectors(Ni,ea.set(m/_,h/_,g/_)):Zi.identity();let y=o===2?Di(c/.12):1;$i.set(f*y/Math.sqrt(v),f*y*v,f*y/Math.sqrt(v))}n[s]=l,n[s+1]=u,n[s+2]=d,Xi.compose(Qi.set(l,u,d),Zi,$i),this.mesh.setMatrixAt(a,Xi),i=a}this.mesh.count=i+1,this.mesh.instanceMatrix.needsUpdate=!0;let a=-1;for(let t=0;t<this.SN;t++){let n=this.SL[t];if(this.SA[t]>=n)continue;let r=this.SA[t]+=e;if(r>=n){this.splats.setMatrixAt(t,ta);continue}let i=ki(r/.16,2.2),o=1-Oi((r-n*.5)/(n*.5)),s=this.SS[t]*i*Math.max(.001,o);Zi.setFromAxisAngle(Ni,this.SY[t]),$i.set(s,s*(.35+.65*o),s),Xi.compose(Qi.set(this.SP[t*3],this.SP[t*3+1],this.SP[t*3+2]),Zi,$i),this.splats.setMatrixAt(t,Xi),a=t}let o=-1;for(let t=0;t<this.RN;t++){let n=this.RL[t];if(this.RA[t]>=n)continue;let r=this.RA[t]+=e;if(r>=n){this.rings.setMatrixAt(t,ta);continue}let i=r/n,a=z(this.R0[t],this.R1[t],Di(i)),s=(1-i)*(1-i);Zi.identity(),$i.set(a,Math.max(.001,a*.55*s),a),Xi.compose(Qi.set(this.RP[t*3],this.RP[t*3+1],this.RP[t*3+2]),Zi,$i),this.rings.setMatrixAt(t,Xi),o=t}this.splats.count=this._span(this.SA,this.SL,this.SN,a),this.rings.count=this._span(this.RA,this.RL,this.RN,o),this.splats.instanceMatrix.needsUpdate=!0,this.rings.instanceMatrix.needsUpdate=!0}_span(e,t,n,r){for(let i=n-1;i>r;i--)if(e[i]<t[i])return i+1;return r+1}},ia=class{constructor(e,t){this.rand=t;let n=Yi();this.NP=280,this.NF=72;let r=this.N=this.NP+this.NF;this.paper=new se(n,new x({color:16777215,side:2,roughness:.62,metalness:0}),this.NP),this.foil=new se(n,new x({color:16777215,side:2,roughness:.26,metalness:.9}),this.NF);let i=new k(1,1,1);for(let t of[this.paper,this.foil]){t.frustumCulled=!1,t.count=0,t.renderOrder=2;for(let e=0;e<t.instanceMatrix.count;e++)t.setMatrixAt(e,ta),t.setColorAt(e,i);e.add(t)}this.P=new Float32Array(r*3),this.V=new Float32Array(r*3),this.AX=new Float32Array(r*3),this.ANG=new Float32Array(r),this.SPIN=new Float32Array(r),this.PH=new Float32Array(r),this.FQ=new Float32Array(r),this.SW=new Float32Array(r),this.SH=new Float32Array(r),this.AGE=new Float32Array(r),this.LIFE=new Float32Array(r),this.YAW=new Float32Array(r),this.REST=new Float32Array(r),this.ST=new Uint8Array(r),this.acc=0,this.palette=[new k,new k,new k,new k],this.foils=[new k(1,.72,.28),new k(.86,.88,.92),new k]}setColor(e){let t=this.palette;t[0].copy(e),t[1].setRGB(.92,.92,.95),t[2].setRGB(1,.66,.08),t[3].copy(e).lerp(t[1],.55),this.foils[2].copy(e).lerp(this.foils[1],.25)}_slot(e){let t=e?this.NP:0,n=e?this.N:this.NP;for(let e=t;e<n;e++)if(!this.ST[e])return e;return-1}spawn(e,t,n,r,i,a,o){let s=this._slot(o);if(s<0)return;let c=this.rand,l=s*3;this.P[l]=e,this.P[l+1]=t,this.P[l+2]=n,this.V[l]=r,this.V[l+1]=i,this.V[l+2]=a,ea.set(c()-.5,c()-.5,c()-.5).normalize(),this.AX[l]=ea.x,this.AX[l+1]=ea.y,this.AX[l+2]=ea.z,this.ANG[s]=c()*$,this.SPIN[s]=(5+c()*9)*(c()<.5?-1:1),this.PH[s]=c()*$,this.FQ[s]=2.2+c()*2.6;let u=.8+c()*.45;if(this.SW[s]=(o?.034:.03)*u,this.SH[s]=(o?.034:.064)*u,this.AGE[s]=0,this.LIFE[s]=11+c()*4,this.ST[s]=1,this.YAW[s]=c()*$,this.REST[s]=4+c()*5,o)this.foil.setColorAt(s-this.NP,this.foils[c()*3|0]),this.foil.instanceColor.needsUpdate=!0;else{let e=c();this.paper.setColorAt(s,this.palette[e<.46?0:e<.72?1:e<.86?2:3]),this.paper.instanceColor.needsUpdate=!0}}burst(e,t,n,r,i,a,o,s,c){let l=this.rand;for(let u=0;u<o;u++){Qi.set(r+(l()-.5)*c,i+(l()-.5)*c*.6,a+(l()-.5)*c).normalize();let o=s*(.55+l()*.6);this.spawn(e+(l()-.5)*.3,t+(l()-.5)*.3,n+(l()-.5)*.3,Qi.x*o,Qi.y*o,Qi.z*o,l()<.2)}}rain(e,t,n,r,i,a,o){this.acc+=e*t;let s=this.rand;for(;this.acc>=1;)--this.acc,this.spawn(z(n,r,s()),o+s()*.6,z(i,a,s()),(s()-.5)*.4,-.3-s()*.5,(s()-.5)*.3,s()<.18)}clear(){this.ST.fill(0),this.acc=0;for(let e of[this.paper,this.foil]){for(let t=0;t<e.instanceMatrix.count;t++)e.setMatrixAt(t,ta);e.count=0,e.instanceMatrix.needsUpdate=!0}}update(e,t){let n=this.P,r=this.V,i=-1,a=-1,o=Math.exp(-2.9*e);for(let s=0;s<this.N;s++){let c=this.ST[s];if(!c)continue;let l=s>=this.NP,u=l?this.foil:this.paper,d=l?s-this.NP:s,f=s*3,p=this.AGE[s]+=e,m=n[f],h=n[f+1],g=n[f+2],_=1;if(c===1){r[f+1]-=4.1*e,r[f]*=o,r[f+1]*=o,r[f+2]*=o;let n=Math.min(1,p*1.5),i=h;m+=(r[f]+n*.5*Math.sin(p*this.FQ[s]+this.PH[s]))*e,h+=r[f+1]*e,g+=(r[f+2]+n*.3*Math.cos(p*this.FQ[s]*.73+this.PH[s]))*e,this.ANG[s]+=this.SPIN[s]*e;for(let e=0;e<t.length;e++){let n=t[e];if(i>=n.y&&h<n.y){let e=m-n.x,t=g-n.z;if(e*e+t*t<n.r*n.r){this.ST[s]=2,h=n.y+.003+s%5*6e-4,this.AGE[s]=0;break}}}if(h<-3.2||p>this.LIFE[s]){this.ST[s]=0,u.setMatrixAt(d,ta);continue}Zi.setFromAxisAngle(ea.set(this.AX[f],this.AX[f+1],this.AX[f+2]),this.ANG[s])}else{let e=this.REST[s];if(p>e){this.ST[s]=0,u.setMatrixAt(d,ta);continue}_=1-Ei(e-.6,e,p),Zi.setFromAxisAngle(Ni,this.YAW[s]).multiply(na)}n[f]=m,n[f+1]=h,n[f+2]=g,$i.set(this.SW[s]*_,this.SH[s]*_,this.SW[s]*_),Xi.compose(Qi.set(m,h,g),Zi,$i),u.setMatrixAt(d,Xi),l?a=d:i=d}this.paper.count=i+1,this.foil.count=a+1,this.paper.instanceMatrix.needsUpdate=!0,this.foil.instanceMatrix.needsUpdate=!0}},aa=class{constructor(e,t,n){this.rand=n;let r=this.N=36;this.mesh=new se(new l(1,1),t,r),this.mesh.frustumCulled=!1,this.mesh.count=0,this.mesh.renderOrder=20;let i=new k(1,1,1);for(let e=0;e<r;e++)this.mesh.setMatrixAt(e,ta),this.mesh.setColorAt(e,i);e.add(this.mesh),this.P=new Float32Array(r*3),this.A=new Float32Array(r).fill(1e9),this.L=new Float32Array(r),this.S=new Float32Array(r),this.next=0,this.acc=0}spawn(e,t,n,r,i,a){let o=this.next;this.next=(o+1)%this.N,this.P[o*3]=e,this.P[o*3+1]=t,this.P[o*3+2]=n,this.A[o]=0,this.L[o]=a,this.S[o]=r,this.mesh.setColorAt(o,i),this.mesh.instanceColor.needsUpdate=!0}clear(){this.A.fill(1e9),this.acc=0;for(let e=0;e<this.N;e++)this.mesh.setMatrixAt(e,ta);this.mesh.count=0,this.mesh.instanceMatrix.needsUpdate=!0}update(e){let t=-1;for(let n=0;n<this.N;n++){if(this.A[n]>=this.L[n])continue;let r=this.A[n]+=e,i=this.L[n];if(r>=i){this.mesh.setMatrixAt(n,ta);continue}let a=r/i,o=Math.sin(Math.PI*a)**1.6*(.82+.18*Math.sin(r*31+n)),s=this.S[n]*o;Xi.makeScale(s,s,s).setPosition(this.P[n*3],this.P[n*3+1]+r*.05,this.P[n*3+2]),this.mesh.setMatrixAt(n,Xi),t=n}let n=t+1;for(let e=this.N-1;e>=n;e--)if(this.A[e]<this.L[e]){n=e+1;break}this.mesh.count=n,this.mesh.instanceMatrix.needsUpdate=!0}};function oa(e){let t=new y({color:3682410,roughness:.36,metalness:0,clearcoat:.85,clearcoatRoughness:.16,vertexColors:!0});return t.onBeforeCompile=t=>{t.uniforms.uGlow=e,t.vertexShader=t.vertexShader.replace(`#include <common>`,`#include <common>
attribute float aGlow;
varying float vGlow;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vGlow = aGlow;`),t.fragmentShader=t.fragmentShader.replace(`#include <common>`,`#include <common>
uniform vec3 uGlow;
varying float vGlow;`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
totalEmissiveRadiance += uGlow * vGlow;`)},t.customProgramCacheKey=()=>`iw-showcase-drum`,t}var sa=`
  varying vec2 vUv; varying float vA;
  void main() {
    vUv = uv; vA = 1.0;
    #ifdef USE_INSTANCING_COLOR
      vA = instanceColor.r;
    #endif
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  }`;function ca(){return new N({uniforms:{uColor:{value:new k(.018,.012,.04)}},vertexShader:sa,fragmentShader:`
      uniform vec3 uColor; varying vec2 vUv; varying float vA;
      void main() {
        float r = length(vUv - 0.5) * 2.0;
        float a = 1.0 - smoothstep(0.0, 1.0, r);
        a = a * a * (0.45 + 0.55 * a) * vA;
        gl_FragColor = vec4(uColor, a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-6})}function la(){return new N({vertexShader:`
      varying vec2 vUv; varying vec3 vCol;
      void main() {
        vUv = uv; vCol = vec3(1.0);
        #ifdef USE_INSTANCING_COLOR
          vCol = instanceColor;
        #endif
        vec4 mv = modelViewMatrix * vec4(instanceMatrix[3].xyz, 1.0);
        mv.xy += position.xy * length(instanceMatrix[0].xyz);
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`
      varying vec2 vUv; varying vec3 vCol;
      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        float r = length(p);
        float core = exp(-r * r * 26.0);
        float rays = exp(-abs(p.y) * 30.0) * pow(max(0.0, 1.0 - abs(p.x)), 2.0) + exp(-abs(p.x) * 30.0) * pow(max(0.0, 1.0 - abs(p.y)), 2.0);
        float halo = exp(-r * r * 5.0) * 0.18;
        float a = clamp(core * 1.3 + rays * 0.9 + halo, 0.0, 1.0);
        if (a < 0.004) discard;
        gl_FragColor = vec4(vCol * (1.2 + 3.0 * core), a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,transparent:!0,depthWrite:!1})}function ua(){return new N({uniforms:{tMap:{value:null},uOpacity:{value:1},uSat:{value:1.06}},vertexShader:`varying vec2 vUv; void main() { vUv = position.xy * 0.5 + 0.5; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`
      uniform sampler2D tMap; uniform float uOpacity; uniform float uSat; varying vec2 vUv;
      void main() {
        vec4 t = texture2D(tMap, vUv);
        float a = clamp(t.a, 0.0, 1.0) * uOpacity;
        if (a < 0.002) discard;
        vec3 c = max(t.rgb, 0.0) / max(t.a, 1e-4);
        float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
        c = max(mix(vec3(l), c, uSat), 0.0);
        gl_FragColor = vec4(c, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        float n = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
        gl_FragColor.rgb = clamp(gl_FragColor.rgb + (n - 0.5) / 255.0, 0.0, 1.0);
        gl_FragColor = vec4(gl_FragColor.rgb * a, a);
      }`,blending:5,blendEquation:100,blendSrc:201,blendDst:205,blendSrcAlpha:201,blendDstAlpha:205,depthTest:!1,depthWrite:!1,transparent:!0})}var da={loadout:{key:2.75,keyCol:16773342,rimA:3.4,rimB:1.9,fill:.5,hemi:.8,sky:14477567,ground:2892866,env:.6,glow:2.2},win:{key:2.9,keyCol:16773596,rimA:3.6,rimB:2,fill:.55,hemi:.85,sky:14674431,ground:3024452,env:.62,glow:2.3},lose:{key:1.85,keyCol:14279423,rimA:1.7,rimB:2.5,fill:.36,hemi:.62,sky:12570868,ground:1907248,env:.46,glow:1.2}},fa=class{constructor(e,t){this.r=e,this.CharacterClass=t,this.scene=new ve,this.camera=new ge(26,1,.05,90),this.mode=null,this.chars=[],this.color=new k(16747028),this.won=!0,this.t=0,this.fadeIn=0,this._out=0,this._lastMode=null,this.spin=0,this.spinVel=0,this.sinceDrag=99,this.drag=null,this.weapon=null,this.hopT=-99,this.hopWeapon=null,this.pop=null,this.ui={panelR:-1,titleR:-1,titleB:-1,bandB:-1,s:null,W:0,H:0,next:0,stamp:-1},this.decks=[],this.rand=Le(6070699),this._tgt=new j,this._clr=new k,this._dbs=new M,this._c=new k,this._rt=null,this.emit={spark:0,bubble:0},this.fxRoot=new v,this.scene.add(this.fxRoot),this._buildLights(),this.glowU={value:new k},this.inkMat=new y({color:this.color.clone(),roughness:.17,metalness:0,clearcoat:1,clearcoatRoughness:.045,sheen:.3,sheenRoughness:.32,sheenColor:new k(1,1,1)}),this.bodyMat=oa(this.glowU),this.fx=new ra(this.fxRoot,this.inkMat,this.rand),this.confetti=new ia(this.scene,this.rand),this.sparks=new aa(this.fxRoot,la(),this.rand),this.contact=new se(new l(1,1).rotateX(-Math.PI/2),ca(),8),this.contact.frustumCulled=!1,this.contact.count=0,this.contact.renderOrder=1;for(let e=0;e<8;e++)this.contact.setMatrixAt(e,ta),this.contact.setColorAt(e,this._c.setRGB(0,0,0));this.scene.add(this.contact);let n=new D;n.setAttribute(`position`,new oe(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),this.compMat=ua(),this.compQuad=new P(n,this.compMat),this.compQuad.frustumCulled=!1,this.compScene=new ve,this.compScene.add(this.compQuad),this.compCam=new u(-1,1,1,-1,0,1),this.stageL=null,this.stageR=null,this._bindDrag(),addEventListener(`resize`,()=>{this.ui.next=0})}_buildLights(){let e=this.scene,t=this.key=new O(16773342,2.7);t.castShadow=!0,t.shadow.mapSize.set(2048,2048),t.shadow.bias=-3e-4,t.shadow.normalBias=.012,t.shadow.radius=3,this.rimA=new O(16777215,3),this.rimB=new O(13953279,1.8),this.fill=new O(14937343,.5),this.hemi=new r(14477567,2892866,.8);for(let n of[t,this.rimA,this.rimB,this.fill])e.add(n,n.target);e.add(this.hemi)}_aimLights(e,t,n){let r=da[n],i=e;this.key.position.set(i.x-3.4*t,i.y+5.4*t,i.z+4.6*t),this.key.target.position.copy(i),this.rimA.position.set(i.x+3.8,i.y+2.8,i.z-4.4),this.rimA.target.position.copy(i),this.rimB.position.set(i.x-4.4,i.y+2,i.z-3.6),this.rimB.target.position.copy(i),this.fill.position.set(i.x+4.6,i.y+.6,i.z+3.8),this.fill.target.position.copy(i);let a=this.key.shadow.camera,o=1.25*t;a.left=-o,a.right=o,a.top=o,a.bottom=-o,a.near=.5,a.far=16*t,a.updateProjectionMatrix(),this.key.intensity=r.key,this.key.color.set(r.keyCol),this.rimB.intensity=r.rimB,this.fill.intensity=r.fill,this.hemi.intensity=r.hemi,this.hemi.color.set(r.sky),this.hemi.groundColor.set(r.ground),this.mood=r,this._tintLights()}_tintLights(){let e=this.mood||da.loadout,t=this._c.copy(this.color),n=Math.max(t.r,t.g,t.b,1e-4);t.multiplyScalar(1/n).lerp(new k(1,1,1),.18),this.rimA.color.copy(t),this.rimA.intensity=e.rimA,this.glowU.value.copy(this.color).multiplyScalar(1/n).lerp(this._c.setRGB(1,1,1),.3).multiplyScalar(e.glow)}_setColor(e){this.color.copy(e),this.inkMat.color.copy(e),this.inkMat.sheenColor.copy(e).lerp(this._c.setRGB(1,1,1),.55),this.confetti.setColor(e),this._tintLights()}_buildLoadoutStage(){let e=new v,t=new P(Ui(Pi.R,Pi,144),this.bodyMat);t.receiveShadow=!0;let n=qi(11,14,{w0:.036,w1:.07,L0:.05,L1:.3,longChance:.3}),r=new P(Ki(Pi.R,Pi.bevel,n,{T0:Pi.ink,du:.02,duF:.0034,NB:26,seed:5,depth:.42}),this.inkMat);return r.receiveShadow=!0,e.add(t,r),e.visible=!1,this.scene.add(e),{group:e,parts:[t,r]}}_buildResultsStage(){let e=new v,t=Ii.map((t,n)=>{let r=new v,i=new P(Ui(t.R,Fi,112),this.bodyMat);i.receiveShadow=!0;let a=qi(31+n*7,8,{front:1.35,w0:.034,w1:.064,L0:.05,L1:.26,longChance:.35}),o=new P(Ki(t.R,Fi.bevel,a,{T0:Fi.ink,du:.024,duF:.0042,NB:22,seed:9+n,depth:.36}),this.inkMat);return o.receiveShadow=!0,r.add(i,o),r.position.set(t.x,t.top,t.z),e.add(r),r});return e.visible=!1,this.scene.add(e),{group:e,drums:t}}_bindDrag(){let e=document.getElementById(`app`);e&&(e.addEventListener(`pointerdown`,e=>{if(this.mode!==`loadout`)return;let t=this.ui.s?this.ui.s.panelR:innerWidth*.52;e.clientX>t&&(this.drag={x:e.clientX,t:performance.now()},this.spinVel=0)}),addEventListener(`pointermove`,e=>{let t=this.drag;if(!t)return;let n=performance.now(),r=e.clientX-t.x,i=Math.max(.008,(n-t.t)/1e3);this.spin+=r*.011,this.spinVel=z(this.spinVel,r*.011/i,.5),t.x=e.clientX,t.t=n,this.sinceDrag=0}),addEventListener(`pointerup`,()=>{this.drag=null}))}_clear(){for(let e of this.chars)this.scene.remove(e.root),e.dispose?.();this.chars=[],this.fx.clear(),this.confetti.clear(),this.sparks.clear();for(let e=0;e<8;e++)this.contact.setMatrixAt(e,ta);this.contact.count=0,this.contact.instanceMatrix.needsUpdate=!0,this.stageL&&(this.stageL.group.visible=!1),this.stageR&&(this.stageR.group.visible=!1),this.pop&&=(this.pop.scale.setScalar(1),null),this.decks.length=0,this._out=0}_anim(){return{time:0,speed:0,localMove:{x:0,z:0},grounded:!0,vy:0,aimPitch:0,firing:!1,charge:0,rolling:!1,form:`kid`,wallNormal:new j(0,0,1),ink:1,lowInk:!1,special:0,invuln:!1}}showLoadout(e,t){let n=this.mode!==`loadout`||!this.chars.length;if(n){if(this._out>0&&this._lastMode===`loadout`&&this.chars.length)this._out=0;else{this._clear(),this.stageL||=this._buildLoadoutStage();let n=new this.CharacterClass({color:t.clone(),weapon:e,style:{hair:0,skin:1},name:`preview`,isLocal:!1});n._a=this._anim(),n._a.grounded=!1,n._y=-1.6,n.root.position.set(0,-1.6,0),this.scene.add(n.root),this.chars.push(n),this.t=0,this.fadeIn=0,this.spin=0,this.spinVel=0,this.sinceDrag=99,this.hopT=-99,this.hopWeapon=null,this.phase=`emerge`,this.landT=-99,this.emerged=!1,this.weapon=e,this.stageL.group.visible=!0,this.ui.next=0}this.mode=`loadout`,this._lastMode=`loadout`,this._aimLights(this._tgt.set(0,.8,0),1,`loadout`)}this._setColor(t);let r=this.chars[0];r.setColor(t),e!==this.weapon&&!n?(this.weapon=e,this.hopWeapon=e,this.hopT=this.t,this.phase!==`emerge`&&(this.phase=`hop`)):n&&r.setWeapon(e)}showResults(e,t,n,r){this._clear(),this.stageR||=this._buildResultsStage(),this.mode=`results`,this._lastMode=`results`,this.won=!!t,this.t=0,this.fadeIn=0,this._setColor(n),this.stageR.group.visible=!0;let i=Math.min(r.length,Ii.length);this.slots=Ii.slice(0,Math.max(1,i)),this.stageR.drums.forEach((e,t)=>{e.visible=t<this.slots.length,e.position.y=-9});for(let e=0;e<i;e++){let t=r[e],i=Ii[e],a=new this.CharacterClass({color:n.clone(),weapon:t.weapon,style:t.style,name:t.name,isLocal:!1});if(a._a=this._anim(),a._slot=i,a._land=this.won?.46+e*.13+(e===3?.05:0):-1,a._landed=!this.won,a.root.rotation.y=i.yaw,a.root.visible=!this.won,!this.won){a.setDance(`defeat`);for(let t=0;t<e*7+3;t++)a.update(.1,a._a)}this.scene.add(a.root),this.chars.push(a)}this.events={cannon:0,bombs:0},this._aimLights(this._tgt.set(.55,1.25,0),2.6,this.won?`win`:`lose`),this.ui.next=0}hide(){this.mode&&(this._lastMode=this.mode,this.mode=null,this._out=.2)}dispose(){this.mode=null,this._clear();for(let e of[this.stageL,this.stageR])e&&(e.group.traverse(e=>e.geometry?.dispose()),this.scene.remove(e.group));this.stageL=this.stageR=null,this._rt?.dispose(),this._rt=null}update(e){e=Math.min(e||0,.1);let t=this.mode;if(!t&&this._out>0){if(this._out-=e,this._out<=0){this._clear();return}t=this._lastMode}!t||!this.chars.length||(this.t+=e,this.fadeIn=Math.min(1,this.fadeIn+e/.25),t===`loadout`?this._updateLoadout(e):this._updateResults(e),this.fx.update(e,this.decks),this.confetti.update(e,this.decks),this.sparks.update(e),this.contact.instanceMatrix.needsUpdate=!0,this.contact.instanceColor&&(this.contact.instanceColor.needsUpdate=!0))}_contactAt(e,t,n,r,i,a){Xi.makeScale(i,1,i).setPosition(t,n,r),this.contact.setMatrixAt(e,Xi),this.contact.setColorAt(e,this._c.setRGB(a,0,0)),this.contact.count<e+1&&(this.contact.count=e+1)}_updateLoadout(e){let t=this.t,n=this.chars[0],r=this.stageL,i=this.rand,a=n._a;a.time=F.time;let o=-.95*(1-ki(t/.6,1.25));r.group.position.y=o;let s=o+Pi.ink;this.drag||(this.spin+=this.spinVel*e,this.spinVel*=Math.exp(-3.4*e),this.sinceDrag+=e,this.sinceDrag>2.4&&Math.abs(this.spinVel)<.35&&(this.spin=B(this.spin,Math.round(this.spin/$)*$,1.1,e)));let c=.17*Math.sin((t-1.6)*.5)*Ei(1.6,4,t),l=this.spin+c;r.group.rotation.y=l,this.fxRoot.rotation.y=l,this.fxRoot.position.y=o,this.decks.length=1;let u=this.decks[0]||(this.decks[0]={x:0,z:0,r:0,y:0});u.x=0,u.z=0,u.r=Pi.R-.035,u.y=Pi.ink;let d=0,f=1,p=0,m=!1,h=0;if(this.phase===`emerge`){let e=-1.45,r=.4,i=2*(.3-e)/(r*r),a=i*r,o=t-.12;o<0?(d=e,m=!0):(d=e+a*o-.5*i*o*o,h=a-i*o,m=!0,!this.emerged&&d>0&&(this.emerged=!0,this.fx.crown(0,Pi.ink,0,1.25,26,.24),n.trigger(`jump`)),o>r&&d<=0&&(d=0,m=!1,this.phase=`pose`,this.landT=t,n.trigger(`land`,7),n.setDance(`lobby_pose`),this.fx.crown(0,Pi.ink,0,.7,16,.3)),f=1+.16*Ti(h/7)),p=-.6*(1-Di(Ti(o/.55)))}else if(this.phase===`hop`){let e=t-this.hopT,r=.075,i=.46,a=.3;if(e<r)f=1-.1*Math.sin(Math.PI*.5*e/r);else if(e<r+i){let o=(e-r)/i;d=4*a*o*(1-o),h=4*a*(1-2*o)/i,m=!0,p=$*Oi(o),f=1+.12*Ti(h/3)-.04*Ti(-h/3),this.hopWeapon&&o>.12&&(this.pop&&this.pop.scale.setScalar(1),n.setWeapon(this.hopWeapon),this.pop=n.weapon?.pivot||null,this.pop&&(this.pop.scale.setScalar(.001),this.popT=t),this.hopWeapon=null,n.setDance(null),n.trigger(`jump`))}else this.phase=`pose`,this.landT=t,n.trigger(`land`,6),n.setDance(`lobby_pose`),this.fx.crown(0,Pi.ink,0,1,22,.26)}if(this.phase===`pose`&&(f=1-.13*ji(t-this.landT,15,6.5)),this.pop){let e=ki((t-this.popT)/.34,2.4);this.pop.scale.setScalar(Math.max(.001,e)),t-this.popT>.34&&(this.pop.scale.setScalar(1),this.pop=null)}a.grounded=!m,a.vy=h;let g=1/Math.sqrt(f);n.root.position.set(0,o+Pi.ink*.5+d,0),n.root.scale.set(g,f,g),n.root.rotation.y=-.45+l+p,n.update(e,a);let _=Math.max(0,d);if(this._contactAt(0,0,s+.004,0,.78*(1+_*.8),d<-.05?0:.8*(1-Ti(_/1.1)*.75)),t>1.2){for(this.emit.bubble+=e*.85;this.emit.bubble>=1;){--this.emit.bubble;let e=i()*$,t=.36+i()*.34;this.fx.bubble(Math.sin(e)*t,Pi.ink+.01,Math.cos(e)*t,.009+i()*.016,.16+i()*.16,3+i()*3)}for(this.emit.spark+=e*2;this.emit.spark>=1;){--this.emit.spark;let e=i()*$,t=.38+i()*.5,n=i()<.3?this._c.copy(this.color).lerp(pa.setRGB(1,1,1),.45):this._c.setRGB(1,.97,.9);this.sparks.spawn(Math.sin(e)*t,.25+i()*1.55,Math.cos(e)*t,.05+i()*.07,n,.7+i()*.7)}}}_updateResults(e){let t=this.t,n=this.rand,r=this.won,i=this.slots;this.decks.length=i.length;for(let e=0;e<i.length;e++){let n=i[e],r=this.stageR.drums[e],a=ki((t-.04*e)/.72,1.15);r.position.set(n.x,n.top-2.4*(1-a),n.z);let o=this.decks[e]||(this.decks[e]={x:0,z:0,r:0,y:0});o.x=n.x,o.z=n.z,o.r=n.R-.04,o.y=r.position.y+Fi.ink}for(let n=0;n<this.chars.length;n++){let i=this.chars[n],a=i._slot,o=i._a,s=this.decks[n];o.time=F.time;let c=s.y-Fi.ink*.5,l=1,u=!1,d=0;if(r){let e=.5,r=3.1,o=2*r/(e*e),f=t-(i._land-e);f<0?i.root.visible=!1:f<e?(i.root.visible=!0,u=!0,c+=r-.5*o*f*f,d=-o*f,l=1+.1*Ti(-d/12)):(i.root.visible=!0,i._landed||(i._landed=!0,i.trigger(`land`,9),i.setDance(`victory`),this.fx.crown(a.x,s.y,a.z,n===0?1.15:.95,n===0?24:16,.24)),l=1-.15*ji(t-i._land,14,6))}o.grounded=!u,o.vy=d;let f=1/Math.sqrt(l);i.root.position.set(a.x,c,a.z),i.root.scale.set(f,l,f),i.update(e,o);let p=Math.max(0,c-s.y);this._contactAt(n,a.x,s.y+.004,a.z,.74*(1+p*.35),i.root.visible?.78*(1-Ti(p/2.5)*.85):0)}if(r){let r=this.events;r.cannon===0&&t>.98&&(r.cannon=1,this.confetti.burst(-3.3,.1,.8,.42,1,-.12,95,8.8,.7),this.confetti.burst(4.3,.1,.8,-.42,1,-.12,95,8.8,.7)),r.cannon===1&&t>1.3&&(r.cannon=2,this.confetti.burst(-3,.2,.6,.3,1,-.1,45,7.2,.8),this.confetti.burst(4,.2,.6,-.3,1,-.1,45,7.2,.8)),t>.9&&this.confetti.rain(e,z(30,5,Ei(1.5,7,t)),-2.9,4,-1.1,1,3.9);let a=[[1.05,0,-1],[1.3,2,1],[1.62,1,-1],[2,3,1],[3.6,0,1],[5.2,2,-1],[6.9,1,1]];for(;r.bombs<a.length&&t>a[r.bombs][0];){let[,e,t]=a[r.bombs++];if(e>=i.length)continue;let o=i[e],s=n()*$,c=o.R*(.5+n()*.3),l=o.x+Math.sin(s)*c,u=o.z+Math.cos(s)*c*.6-.1,d=this.decks[e].y,f=l+t*(2.4+n()),p=d-1.2,m=u-2.2,h=.78;this.fx.drop(f,p,m,(l-f)/h,(d-p)/h+.5*9.5*h,(u-m)/h,.05+n()*.025,2,3)}for(this.emit.spark+=e*(t<3?7:3.5);this.emit.spark>=1;){--this.emit.spark;let e=n()<.5?this._c.setRGB(1,.84,.45):n()<.5?this._c.setRGB(1,1,1):this._c.copy(this.color).lerp(pa.setRGB(1,1,1),.5),t=i[n()*i.length|0];this.sparks.spawn(t.x+(n()-.5)*1.3,t.top+.3+n()*2,t.z+(n()-.5)*.8,.07+n()*.08,e,.6+n()*.7)}}else if(t>1)for(this.emit.spark+=e*2.4;this.emit.spark>=1;)--this.emit.spark,this.fx.drop(-2.4+n()*5.6,3.6+n()*.8,-.8+n()*1.4,0,-2.5,0,.013+n()*.012,4,3);if(t>1.5)for(this.emit.bubble+=e*(r?1.1:.7);this.emit.bubble>=1;){--this.emit.bubble;let e=n()*i.length|0,t=i[e],r=n()*$,a=t.R*(.45+n()*.45);this.fx.bubble(t.x+Math.sin(r)*a,this.decks[e].y+.01,t.z+Math.cos(r)*a,.01+n()*.016,.16+n()*.18,2.5+n()*3)}}_measureUI(e,t){let n=this.ui,r=Math.min(e*.01,t*.017778);if((n.W!==e||n.H!==t)&&(n.W=e,n.H=t,n.next=0),n.s||={panelR:0,titleR:0,titleB:0,bandB:0},this.t>=n.next){n.next=this.t<.4?this.t+.1:this.t<1.5?this.t+.35:this.t<9?this.t+.2:1e9,n.panelR=3.6*r+Math.min(52*r,.54*e),n.titleR=3.8*r+33.2*r,n.titleB=12.3*r,n.bandB=.42*t;let i=e=>{let t=document.querySelectorAll(e),n=t[t.length-1];if(!n||!n.offsetParent)return null;let r=0,i=0;for(let e=n;e;e=e.offsetParent)r+=e.offsetLeft,i+=e.offsetTop;return{l:r,t:i,r:r+n.offsetWidth,b:i+n.offsetHeight}};if(this.mode===`loadout`||this._lastMode===`loadout`){let t=i(`.iw-loadout:not(.is-leaving) .iw-loadout__body`);t&&t.r>e*.2&&t.r<e*.8&&(n.panelR=t.r)}else{let r=i(`.iw-results:not(.is-leaving) .iw-res__title`),a=i(`.iw-results:not(.is-leaving) .iw-res__head`),o=i(`.iw-results:not(.is-leaving) .iw-res__body`);r&&r.r<e*.75&&(n.titleR=r.r);let s=i(`.iw-results:not(.is-leaving) .iw-res__metarow`);a&&a.b<t*.5&&(n.titleB=Math.min(a.b,s?s.b+8:a.b)),o&&o.t>t*.25&&(n.bandB=o.t),document.querySelector(`.iw-results.is-intro:not(.is-leaving)`)&&(n.bandB=t*.86)}n.stamp<0&&(n.s.panelR=n.panelR,n.s.titleR=n.titleR,n.s.titleB=n.titleB,n.s.bandB=n.bandB),n.stamp=this.t}let i=1-Math.exp(-8*(this._fdt||.016));return n.s.panelR+=(n.panelR-n.s.panelR)*i,n.s.titleR+=(n.titleR-n.s.titleR)*i,n.s.titleB+=(n.titleB-n.s.titleB)*i,n.s.bandB+=(n.bandB-n.s.bandB)*i,n.s}_place(e,t,n,r,i,a,o,s,c,l=0){let u=this.camera,d=Math.cos(n);u.fov=i,u.position.set(e.x+r*Math.sin(t)*d,e.y-r*Math.sin(n),e.z+r*Math.cos(t)*d),u.up.set(0,1,0),u.lookAt(e),l&&u.rotateZ(l),u.near=Math.max(.05,r-12),u.far=r+14,u.setViewOffset(s,c,s*.5-a,c*.5-o,s,c),u.updateMatrixWorld()}_cameraLoadout(e,t){let n=this._measureUI(e,t),r=this.t,i=Math.tan(25*Math.PI/360),a=n.panelR+e*.012,o=e*.985,s=Math.max(e*.18,o-a),c=.6*t/Li,l=.84*s/(2*(Pi.R+Pi.flange.out)),u=Math.min(c,l),d=t/(2*u*i),f=(a+o)*.5,p=.735*t-Ri*u,m=Di(r/1.45),h=.36*(1-m)+.03*Math.sin(r*.41)*m,g=-.1-.05*(1-m)+.012*Math.sin(r*.29+1.3)*m;d*=1+.3*(1-m)+.012*Math.sin(r*.23+2.1)*m;let _=0,v=r-this.hopT;if(v>=0&&v<1.6){let e=Mi(v);d*=1-.075*e,h-=.035*e,_=.012*ji(v,11,5)}this._place(this._tgt.set(0,Ri,0),h,g,d,25,f,p,e,t,_)}_cameraResults(e,t){let n=this._measureUI(e,t),r=this.t,i=this.won,a=Math.tan(22*Math.PI/360),o=this.slots[0],s=o.top,c=o.top+Li+.28,l=t*.05,u=Math.min(t*.66,Math.max(t*.34,n.bandB-t*.11)),d=(u-l)/(c-s),f=0,p=0,m=c;for(let e of this.slots)e.x-.42<f&&(f=e.x-.42,m=e.top+Li+.28),p=Math.max(p,e.x+e.R+.12);let h=e*.5;for(let r=0;r<8;r++){h=e*.5;let r=u-(m-s)*d,i=h+f*d;if(r<n.titleB+t*.01&&i<n.titleR+e*.012&&(h+=n.titleR+e*.012-i),h+p*d>e*.975){d*=.95;continue}break}let g=s+.55,_=u-(g-s)*d,v=t/(2*d*a),y=Di(r/2.5),b=i?-.075:-.15,x=-.3*(1-y)+.02*Math.sin(r*.33)*y,S=b+.08*(1-y)+.007*Math.sin(r*.21+1)*y;v*=(1+.32*(1-y))*(1-.045*Oi((r-2.5)/13)),this._place(this._tgt.set(0,g,0),x,S,v,22,h,_,e,t)}_target(){this.r.getDrawingBufferSize(this._dbs);let e=this._dbs.x,t=this._dbs.y,n=F.post?.composer,r=n&&n.writeBuffer;return r&&r.isWebGLRenderTarget&&r.depthBuffer&&r.texture.type!==1009&&Math.abs(r.width-e)<=1&&Math.abs(r.height-t)<=1?(this._rt&&=(this._rt.dispose(),null),r):(this._rt?(this._rt.width!==e||this._rt.height!==t)&&this._rt.setSize(e,t):this._rt=new Ae(e,t,{type:i,samples:(F.post?.q?.msaa??4)>0?4:0}),this._rt)}render(){let e=this.mode||(this._out>0?this._lastMode:null);if(!e||!this.chars.length)return;let t=this.r,n=innerWidth,r=innerHeight;this._fdt=1/60,e===`loadout`?this._cameraLoadout(n,r):this._cameraResults(n,r),this.scene.environment=F.env?.envMap||null,this.scene.environmentIntensity=(this.mood||da.loadout).env;let i=this.mode?Di(this.fadeIn):Ti(this._out/.2),a=t.getRenderTarget(),o=t.autoClear,s=t.getClearAlpha();t.getClearColor(this._clr),t.autoClear=!1;let c=this._target();t.setRenderTarget(c),t.setClearColor(0,0),t.clear(!0,!0,!1),t.render(this.scene,this.camera),t.setRenderTarget(a),this.compMat.uniforms.tMap.value=c.texture,this.compMat.uniforms.uOpacity.value=i,t.render(this.compScene,this.compCam),this.compMat.uniforms.tMap.value=null,t.setClearColor(this._clr,s),t.autoClear=o}},pa=new k,ma=`modulepreload`,ha=function(e,t){return new URL(e,t).href},ga={},_a=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=ha(t,n),t in ga)return;ga[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:ma,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},va=new URLSearchParams(location.search),ya=()=>new Promise(e=>requestAnimationFrame(()=>e()));function ba(e,t){try{let n=JSON.parse(localStorage.getItem(e));return n?{...t,...n}:{...t}}catch{return{...t}}}function xa(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}var Sa={name:`Player`,level:1,xp:0,wins:0,matches:0,totalTurf:0,weapon:`shooter`};async function Ca(e,t){try{return await _a(()=>import(e),[],import.meta.url)}catch(n){console.error(`[inkwave] failed to load ${e} — using stub`,n);let r=await _a(()=>import(`./stubs-UQxurf4W.js`),__vite__mapDeps([0,1]),import.meta.url);return t?r:{}}}new class{async boot(){let e=performance.now();for(let e of vt)try{e.thumb=Gn(Ot[e.layout||e.id],e.theme)}catch(t){console.warn(`thumb`,e.id,t)}this.settings=F.settings=ba(`inkwave.settings`,xt),this.settings.fovMode!==`h`&&(this.settings.fov=xt.fov,this.settings.fovMode=`h`,xa(`inkwave.settings`,this.settings)),this.profile=ba(`inkwave.profile`,Sa);let t=document.getElementById(`app`);this.uiRoot=document.getElementById(`ui-root`),this.fadeEl=document.getElementById(`fade`);let[n,r]=await Promise.all([Ca(`./ui/menus.js`),Ca(`./ui/hud.js`)]);this.menus=F.menus=n.Menus?new n.Menus(this.uiRoot,this._menuApi()):null,this.hud=F.hud=r.HUD?new r.HUD(this.uiRoot,{playSound:(e,t)=>F.audio?.play(e,t)}):null,this.hud?.setVisible(!1),this.menus?.show(`loading`),this.bootMarks=[];let i=async(t,n)=>{this.bootMarks.push([n,Math.round(performance.now()-e)]),this.menus?.setLoading(t,n),await ya()};await i(.05,`Mixing ink…`),this.R=new wt(t,this.settings),F.renderer=this.R.renderer;let a=F.scene=new ve,o=F.camera=new ge(this.settings.fov,innerWidth/innerHeight,.15,6500);o.position.set(0,40,-60),this.R.setScene(a,o),this.input=F.input=new Tt(this.R.renderer.domElement),this.input.onKey=(e,t)=>this._onKey(e,t),this.input.onUnlock=()=>this._onPointerUnlock();let[s,c,l,u,d]=await Promise.all([Ca(`./game/character.js`,!0),Ca(`./fx/fx.js`,!0),Ca(`./world/environment.js`,!0),Ca(`./audio/audio.js`,!0),Ca(`./audio/music.js`,!0)]);this.CharacterClass=s.Character;try{this.PropKit=(await _a(async()=>{let{PropKit:e}=await import(`./props-BMyS5khO.js`);return{PropKit:e}},__vite__mapDeps([2,1]),import.meta.url)).PropKit}catch(e){console.error(`[inkwave] prop kit failed to load`,e),this.PropKit=null}F.audio=u.audio,F.music=d.music,await i(.15,`Building the plaza…`);let f=vt.find(e=>e.id===va.get(`map`))||vt[0],p=St[this.settings.quality]||St.high;this.murals=await Pn();try{let{createTextureLibrary:e}=await _a(async()=>{let{createTextureLibrary:e}=await Promise.resolve().then(()=>Ht);return{createTextureLibrary:e}},void 0,import.meta.url);this.texlib=await e(F.renderer,{size:p.paintAtlas>=4096?512:256})}catch(e){console.error(`[inkwave] texture library failed — procedural fallback`,e),this.texlib=null}await this._buildWorld(f),await i(.4,`Filling the harbor…`);let m=F.level.bounds;F.env=new l.Environment(F.renderer,a,{bounds:m,theme:f.theme,shadowSize:p.shadowSize,footprint:this._footprint(F.level)}),F.env.envMap&&(a.environment=F.env.envMap),a.environmentIntensity=.66,F.renderer.toneMappingExposure=.94,F.env.hemi&&(F.env.hemi.intensity=Math.max(F.env.hemi.intensity,.38)),await i(.55,`Teaching squids to swim…`),F.projectiles=new Mr(a),F.fx=new c.FX(a,{quality:p}),F.fx.setLighting?.(F.env.getSkyColors?.()),F.fx.setCollider?.((e,t)=>{let n=F.physics.segment(e,t,this._fxHit||=new ar,!0);return n.hit?{point:n.point,normal:n.normal}:null}),F.fx.onDropletLand=(e,t,n,r)=>{let i=this._teamOfColor(n);i<0||F.paint.splat(this._tmpV.copy(e).addScaledVector(t,.05),R(r*2.4,.12,.45),i,{seed:Math.random()})},this._tmpV=new j,this._tmpC=new k,this.rig=new Kr(o),F.post=this.R,F.game=this,F.rig=this.rig;try{this.fxHooks=(await _a(()=>import(`./fxHooks-C6vgeqTv.js`),__vite__mapDeps([3,1]),import.meta.url)).initFxHooks?.(F)||null}catch(e){/Failed to fetch|Cannot find module|404/i.test(String(e))||console.error(`[inkwave] fxHooks`,e)}try{let e=await _a(()=>import(`./screenfx-CppRqF8p.js`),__vite__mapDeps([4,1]),import.meta.url);this.screenfx=e.ScreenFX?new e.ScreenFX(this.R,F):null}catch(e){/Failed to fetch|Cannot find module|404/i.test(String(e))||console.error(`[inkwave] screenfx`,e)}this.showcase=new fa(F.renderer,this.CharacterClass),await i(.7,`Tuning the tentacles…`),this._setPalette(this._pickPalette()),this._bindEvents(),this._startAttract(),await i(.85,`Warming up…`),this._warmup();try{await F.renderer.compileAsync(a,o)}catch{F.renderer.compile(a,o)}await i(.93,`Warming up…`);for(let e=0;e<3;e++)this._frame(1/60),await ya();await i(1,`Ready!`),await new Promise(e=>setTimeout(e,250)),this.timer=new le,this.timer.connect?.(document),this.fpsAcc=0,this.fpsN=0,this.fps=60,F.mode=`menu`,this.menus?.show(va.has(`skipTitle`)?`main`:`title`),this._applyAudioVolumes(),requestAnimationFrame(()=>this._loop()),va.has(`autostart`)&&this.api.startMatch({mapId:f.id,difficulty:this.settings.difficulty,duration:+va.get(`autostart`)||this.settings.matchLength}),this.bootMs=Math.round(performance.now()-e),window.__inkwave=this,window.__G=F,this.debug={endMatch:(e=.5)=>{this.match&&!this.match.attract&&(this.match.time=e)},paintRandom:(e=400)=>{let t=new j;for(let n=0;n<e;n++)t.set((Math.random()-.5)*48,.4,(Math.random()-.5)*86),F.paint.splat(t,.8+Math.random()*1.4,Math.random()<.5?0:1)},freeze:()=>{this.frozen=!0},unfreeze:()=>{this.frozen=!1,this.timer.update()},step:(e=16.7)=>{let t=Math.max(1,Math.round(e/(1e3/60)));this._skipRender=!0;for(let e=0;e<t-1;e++)this._frame(1/60);this._skipRender=!1,this._frame(1/60)},key:(e,t)=>{t?(this.input.keys.add(e),this.input.pressed.add(e)):this.input.keys.delete(e)},fire:e=>{this.input.mouse.left=e},freezeBots:()=>{for(let e of F.actors)e.bot&&!e.isLocal&&(e.bot.update=()=>{e.intent.move.set(0,0,0),e.intent.fire=!1})}}}async _buildWorld(e){let t=F.scene,n=e.layout||e.id;if(this.layoutId===n){this.mapDef=e;return}this.levelMesh&&(t.remove(this.levelMesh,this.grateMesh),this.levelMesh.geometry.dispose(),this.grateMesh?.geometry.dispose(),this.levelMat.dispose(),this.grateMat?.dispose()),this.decor&&t.remove(this.decor.group),this.props&&=(this.props.dispose?.(),null),F.paint?.dispose(),this.layoutId=n,this.mapDef=e;let r=St[this.settings.quality]||St.high,i=[];if(this.PropKit)try{this.props=new this.PropKit(t,{castShadow:!0,quality:this.settings.quality});for(let e of Yn(n)){let t=this.props.add(e.type,e);t&&t.colliders&&i.push(...t.colliders)}this.props.build()}catch(e){console.error(`[inkwave] props failed`,e),this.props=null}let a=F.level=new Mt(Ot[n],i);F.physics=new sr(a);let o=await this._loadLightmap(a,n);F.paint=new Vt(F.renderer,a,{atlasSize:r.paintAtlas,maxDensity:r.paintAtlas>=4096?30:18}),this.levelMat=tn(F.paint.texture,F.paint.size,this.murals,{lightmap:o,texlib:this.texlib}),this.levelMesh=new P(a.buildGeometry(F.paint.size),this.levelMat),this.levelMesh.castShadow=!0,this.levelMesh.receiveShadow=!0,this.levelMesh.name=`level`,t.add(this.levelMesh),this.grateMat=tn(F.paint.texture,F.paint.size,this.murals,{grate:!0,lightmap:o,texlib:this.texlib});let s=a.buildGeometry(F.paint.size,e=>e.grate);this.grateMesh=new P(s,this.grateMat),this.grateMesh.receiveShadow=!0,this.grateMesh.visible=s.index.count>0,t.add(this.grateMesh),this.decor=new Tn(t,a),F.nav=new dr(a,F.physics),this.minimap=new wi(a,F.paint),F.env?.rebuildForArena?F.env.rebuildForArena(a.bounds,this._footprint(a)):F.env?.setFootprint&&F.env.setFootprint(this._footprint(a)),F.teamColors[0]&&this._setPalette(this.palette||this._pickPalette())}async _loadLightmap(e,t){try{let n=await(await fetch(`assets/lightmaps/${t}.json`,{cache:`no-cache`})).json();if(e.layoutLightmap(n.ppm,n.size),e.layoutHash!==n.hash){console.warn(`[inkwave] lightmap for ${t} is stale — re-run tools/bake-ao.mjs`),e.lightSize=0;for(let t of e.faces)t.light=null;return null}let r=await new ee().loadAsync(`assets/lightmaps/${t}.png?h=${n.hash}`);return r.colorSpace=``,r.generateMipmaps=!0,r.minFilter=c,r.magFilter=a,r.anisotropy=4,r}catch(n){console.warn(`[inkwave] no lightmap for`,t,n.message);for(let t of e.faces)t.light=null;return null}}_footprint(e){return e.blocks.filter(e=>e.aligned&&e.aabbMax.y<.01&&e.aabbMax.y>-2.5&&e.aabbMin.y<-1).map(e=>({minX:e.aabbMin.x,maxX:e.aabbMax.x,minZ:e.aabbMin.z,maxZ:e.aabbMax.z}))}_warmup(){let e=new j(0,-30,0),t=new j(0,1,0),n=F.teamColors[0];try{F.fx.burst(e,t,n,{count:4}),F.fx.ring(e,t,n,{}),F.fx.explosion(e,n,2),F.fx.splatted(e,n),F.fx.wake(e,t,n,5),F.fx.muzzle(e,t,n),F.fx.spawnFlash(e,n)}catch(e){console.warn(`fx warmup`,e)}}_pickPalette(){return this.settings.colorblind?ut:lt[Math.random()*lt.length|0]}_setPalette(e){this.palette=e,F.teamHex=[e.a,e.b],F.teamColors=[new k(e.a),new k(e.b)],this.levelMat.userData.uniforms.uTeamA.value.copy(F.teamColors[0]),this.levelMat.userData.uniforms.uTeamB.value.copy(F.teamColors[1]),this.grateMat&&(this.grateMat.userData.uniforms.uTeamA.value.copy(F.teamColors[0]),this.grateMat.userData.uniforms.uTeamB.value.copy(F.teamColors[1])),this.levelMat.userData.uniforms.uInkGlow.value=this.mapDef?.theme===`sunset`?.2:.07,this.decor.setTeamColors(F.teamColors),this.props?.setTeamColors?.(F.teamColors[0],F.teamColors[1]),F.projectiles.refreshColors();for(let e of F.actors)e.character.setColor(F.teamColors[e.team]);this.minimap.version=-1,this.menus?.setAccent?.(e.a,e.b)}_teamOfColor(e){let t=e.isColor?e:this._tmpC.set(e);for(let e=0;e<2;e++){let n=F.teamColors[e];if(Math.abs(n.r-t.r)+Math.abs(n.g-t.g)+Math.abs(n.b-t.b)<.05)return e}return-1}_menuApi(){let e=this;return this.api={version:ct,weapons:ft,weaponOrder:pt,specials:ht,sub:mt.bomb,maps:vt,difficulties:_t,getSettings:()=>({...e.settings}),setSettings:t=>e._setSettings(t),getProfile:()=>{let t=e.profile;return{...t,played:t.matches,xpToNext:bt.xpForLevel(t.level)}},setProfileName:t=>{e.profile.name=String(t||`Player`).slice(0,16),xa(`inkwave.profile`,e.profile)},getLoadout:()=>({weapon:e.profile.weapon||`shooter`}),setLoadout:({weapon:t})=>{ft[t]&&(e.profile.weapon=t,xa(`inkwave.profile`,e.profile),e.menus?.current===`loadout`&&e.showcase.showLoadout(t,F.teamColors[0]))},startMatch:t=>e.startMatch(t),resumeMatch:()=>e.resume(),quitMatch:()=>e.quitToMenu(),rematch:()=>e.startMatch(e.lastMatchOpts||{}),toMainMenu:()=>e.quitToMenu(),onScreenChange:t=>e._onScreen(t),playSound:e=>{F.audio?.init?.(),F.audio?.play(e)}}}_setSettings(e){Object.assign(this.settings,e),xa(`inkwave.settings`,this.settings),(`quality`in e||`shadows`in e||`bloom`in e)&&this.R?.applySettings(this.settings),(`master`in e||`music`in e||`sfx`in e)&&this._applyAudioVolumes(),`colorblind`in e&&F.mode!==`match`&&this._setPalette(this._pickPalette())}_applyAudioVolumes(){F.audio?.setVolumes?.({master:this.settings.master,music:this.settings.music,sfx:this.settings.sfx})}_onScreen(e){this.showcase&&(e===`loadout`?this.showcase.showLoadout(this.profile.weapon||`shooter`,F.teamColors[0]):e!==`results`&&this.showcase.mode===`loadout`&&this.showcase.hide(),F.mode===`menu`&&(e===`title`||e===`main`||e===`setup`||e===`settings`||e===`howto`||e===`credits`||e===`loadout`)&&this._musicTrack!==(e===`title`?`title`:`menu`)&&this._playMusic(e===`title`?`title`:`menu`))}_playMusic(e){this._musicTrack=e;try{F.music?.play(e,{fade:1.2})}catch{}}_onKey(e,t){return this._audioOn||(this._audioOn=!0,F.audio?.init?.(),this._applyAudioVolumes(),this._playMusic(this.menus?.current===`title`||!this.menus?`title`:`menu`)),F.mode===`match`&&this.match&&!this.match.paused&&!this.menus?.current?e.code===`Escape`||e.code===`KeyP`?(this.pause(),!0):!1:this.menus&&this.menus.current&&this.menus.handleKey(e)||!1}_onPointerUnlock(){F.mode===`match`&&this.match&&!this.match.paused&&this.match.state===`playing`&&!this.menus?.current&&this.pause()}_bindEvents(){let e=0,t=0;I(`hit`,({attacker:t,victim:n,damage:r,killed:i})=>{!this.match||this.match.attract||t?.isLocal&&(this.hud?.hitMarker(i?`kill`:`hit`),F.time-e>.06&&(e=F.time,F.audio?.play(`hit_marker`,{volume:.6})))}),I(`damage`,({victim:e,amount:n,attacker:r,source:i})=>{if(!this.match||this.match.attract||!e.isLocal)return;let a=null;if(r&&r!==e){let e=this._dmgV||=new j;e.copy(r.pos),e.y+=1,e.project(F.camera);let t=e.x,n=-e.y,i=e.z>1;i&&(t=-t,n=-n),a=!i&&Math.abs(t)<1&&Math.abs(n)<1?t>=0?0:Math.PI:Math.atan2(n*innerHeight,t*innerWidth)}this.hud?.damage(R(n/80,.15,1),F.teamHex[e.enemyTeam],a),F.time-t>.25&&(t=F.time,F.audio?.play(`hurt`,{volume:.7})),n>=40&&this.rig.addShake(R((n-30)/220,0,.4))}),I(`splatted`,({victim:e,attacker:t,cause:n})=>{if(!this.match||this.match.attract)return;let r=this.match.local;if(t?.isLocal)F.audio?.play(`splat_enemy`,{volume:.9}),this.hud?.feed({text:`You splatted ${e.name}!`,color:F.teamHex[r.team],kind:`kill`});else if(e.isLocal){F.audio?.play(`splatted_self`),F.audio?.duck?.(.45,2.2);let r=t?t.name:n===`water`?`the sea`:`enemy ink`;this.hud?.showSplatted({by:r,byColor:t?F.teamHex[t.team]:`#6fd0ff`,respawn:V.respawnTime}),this.rig.mode=`spectate`,this.rig.spectate={actor:t&&t.alive?t:null,pos:e.pos.clone(),from:e.pos.clone()},this.rig.lookAt.copy(e.pos)}else e.team===r?.team?(F.audio?.play(`ally_splatted`,{volume:.5}),this.hud?.feed({text:`${e.name} was splatted${t?` by `+t.name:``}`,color:F.teamHex[e.enemyTeam],kind:`death`})):t&&t.team===r?.team&&this.hud?.feed({text:`${t.name} splatted ${e.name}`,color:F.teamHex[t.team],kind:`ally`})}),I(`respawn`,({actor:e})=>{!this.match||this.match.attract||e.isLocal&&(this.hud?.hideSplatted(),this.rig.follow(e,!0),this.rig.yaw=e.yaw,this.rig.pitch=-.12)}),I(`special:ready`,({actor:e})=>{e.isLocal&&!this.match?.attract&&F.audio?.play(`special_ready`)}),I(`special:use`,({actor:e,id:t})=>{e.isLocal&&!this.match?.attract&&this.hud?.banner(`special`,ht[t].name.toUpperCase()+`!`)}),I(`shake`,({amount:e,pos:t})=>{this.match?.attract||this.rig.addShake(e,t)}),I(`recoil`,({amount:e})=>{this.match?.attract||this.rig.recoil(e)}),I(`lowink`,({actor:e})=>{e.isLocal&&(this._lowInkFlash=1.2)}),I(`actor:footstep`,({actor:e,surface:t,pos:n,speed:r})=>{if(!e||!e.alive||e.form===`squid`)return;let i=n||e.pos;if(!e.isLocal&&F.camera.position.distanceToSquared(i)>324)return;let a=t===1?`step_ink`:t===2?`step_enemy`:`step_dry`,o=(e.isLocal?.7:.45)*Math.min(1,.45+(r||e.anim.speed||0)/8);F.audio?.play(a,{pos:e.isLocal?void 0:i,volume:o})}),I(`match:oneminute`,()=>{this.hud?.banner(`one_minute`),F.audio?.play(`one_minute`),this._playMusic(`battle_final`)}),I(`match:count`,({n:e})=>{this.hud?.countdown(e),F.audio?.play(`final_count`)}),I(`match:state`,({state:e,match:t})=>{t.attract||t!==this.match||(e===`intro`&&this._intro(),e===`playing`&&(this.hud?.banner(`go`),F.audio?.play(`go_horn`),this._playMusic(`battle`),this.match.local&&this.rig.follow(this.match.local,!0)),e===`finish`&&(this.hud?.banner(`timesup`),F.audio?.play(`times_up`),F.music?.stop?.(.4),this._musicTrack=null,this.input.exitLock()),e===`judge`&&this._judge())})}_startAttract(){this.match&&this.match.dispose(),F.projectiles.clear(),F.fx.clear?.(),F.paint.clear();let e=this.match=F.match=new hi({attract:!0,duration:99999,difficulty:`normal`,CharacterClass:this.CharacterClass,rig:this.rig,input:this.input});e.setup(),e.start();for(let t of e.actors)t.respawnTimer=0;this.attractT=0,this.shotT=0,this.shotIdx=0,this._attractShot(),this.hud?.setVisible(!1)}_attractShot(){let e=[`orbit`,`follow`,`orbit2`,`follow`],t=e[this.shotIdx++%e.length];if(this.shotT=t.startsWith(`follow`)?7:10,t===`orbit`)this.rig.orbit(new j(0,1,0),34,17,.05,Math.random()*6);else if(t===`orbit2`)this.rig.orbit(new j(0,2,-8),18,7,-.07,Math.random()*6);else{let e=this.match.actors.filter(e=>e.alive),t=e[Math.random()*e.length|0];t&&(this.rig.follow(t,!0),this.rig.yaw=t.yaw,this.rig.pitch=-.28,this._attractFollow=t)}}_updateAttract(e){if(this.attractT+=e,this.shotT-=e,this.menus?.current===`title`?this.rig.mode!==`orbit`&&this.rig.orbit(new j(0,1,0),34,17,.05,0):this.shotT<=0&&this._attractShot(),this.rig.mode===`follow`&&this._attractFollow){let t=this._attractFollow;t.alive||(this.shotT=Math.min(this.shotT,.5)),this.rig.yaw=F.time>0?this.rig.yaw+((t.yaw-this.rig.yaw+Math.PI*3)%(Math.PI*2)-Math.PI)*(1-Math.exp(-2*e)):t.yaw}let t=F.paint.coverage();(this.attractT>110||t[0]+t[1]>.72)&&(this._fade(1,400).then(()=>{this._setPalette(this._pickPalette()),this._startAttract(),this._fade(0,600)}),this.attractT=-999)}async startMatch(e={}){let t={mapId:e.mapId||this.mapDef.id,difficulty:e.difficulty||this.settings.difficulty,duration:e.duration||this.settings.matchLength||gt.defaultDuration};this.lastMatchOpts=t,F.audio?.init?.(),this.input.requestLock(),this.menus?.show(null),await this._fade(1,350),F.music?.stop?.(.3),this._musicTrack=null,this.showcase.hide(),this.match&&this.match.dispose(),F.projectiles.clear(),F.fx.clear?.(),F.paint.clear();let n=vt.find(e=>e.id===t.mapId)||vt[0];(n.layout||n.id)!==this.layoutId&&await this._buildWorld(n),n.theme!==this.mapDef.theme&&(F.env.setTheme?.(n.theme),F.env.envMap&&(F.scene.environment=F.env.envMap),F.fx.setLighting?.(F.env.getSkyColors?.())),this.mapDef=n,this._setPalette(this._pickPalette());let r=this.match=F.match=new hi({attract:!1,duration:t.duration,difficulty:t.difficulty,weapon:this.profile.weapon||`shooter`,playerName:this.profile.name||`Player`,CharacterClass:this.CharacterClass,rig:this.rig,input:this.input,autopilot:va.has(`autopilot`)});r.setup(),this.minimap.setViewerTeam(0),F.mode=`match`,this.hud?.setVisible(!1),this.hudPrompt=null,this._hintT=0,this._hints={},r.start(),this._fade(0,500)}_intro(){let e=F.level.spawnPads[0];this.match.local;let t=new j(18,26,30),n=new j(e.x,e.y+2.6,e.z-5.2),r=new j(0,0,10),i=new j(e.x,e.y+1.6,e.z+6);this.rig.cinematic(t,n,r,i,3.6,()=>{}),this.rig.yaw=0,this.rig.pitch=-.12,F.audio?.play(`ready`),setTimeout(()=>{this.match?.state===`intro`&&this.hud?.banner(`ready`)},1700),setTimeout(()=>{this.match?.state===`intro`&&this.hud?.setVisible(!0)},3e3),this._playMusic(null)}pause(){!this.match||this.match.attract||this.match.paused||this.match.state!==`playing`&&this.match.state!==`intro`||(this.match.paused=!0,this.input.exitLock(),this.menus?.show(`pause`),F.audio?.duck?.(.5,99))}resume(){this.match&&(this.menus?.show(null),this.match.paused=!1,this.input.requestLock(),F.audio?.duck?.(1,.01))}async quitToMenu(){this.input.exitLock(),this.menus?.show(null),await this._fade(1,350),this.hud?.setVisible(!1),this.hud?.hideSplatted?.(),this.showcase.hide(),F.mode=`menu`,this._setPalette(this._pickPalette()),this._startAttract(),this.menus?.show(`main`),this._playMusic(`menu`),F.audio?.duck?.(1,.01),this._fade(0,500)}async _judge(){let e=this.match;this.hud?.hideSplatted?.(),this.rig.overview(),this.hud?.setVisible(!0);let t=e.result.coverage;await(this.hud?.judge({colors:[F.teamHex[0],F.teamHex[1]],percents:[t[0]*100,t[1]*100],names:this.palette.names||dt})||new Promise(e=>setTimeout(e,4e3)));let n=e.result.winner===0;e.setState(`results`),this.hud?.setVisible(!1);let r=e.local,i=this.profile,a=Math.round(r.stats.turf),o=Math.round((n?bt.xpWin:bt.xpLose)+a*bt.xpPerTurfPoint+r.stats.splats*bt.xpPerSplat),s={level:i.level,xp:i.xp,toNext:bt.xpForLevel(i.level)};for(i.xp+=o,i.matches++,n&&i.wins++,i.totalTurf+=a;i.xp>=bt.xpForLevel(i.level);)i.xp-=bt.xpForLevel(i.level),i.level++;xa(`inkwave.profile`,i);let c={win:n,percents:[t[0]*100,t[1]*100],colors:[F.teamHex[0],F.teamHex[1]],teamNames:this.palette.names||dt,players:e.actors.map(e=>({name:e.name,team:e.team,weapon:e.weaponId,turf:Math.round(e.stats.turf),splats:e.stats.splats,deaths:e.stats.deaths,isSelf:e.isLocal})),xp:{gained:o,levelBefore:s.level,levelAfter:i.level,xpBefore:s.xp,xpAfter:i.xp,xpToNextBefore:s.toNext,xpToNextAfter:bt.xpForLevel(i.level)},mapName:this.mapDef.name},l=e.actors.filter(e=>e.team===0);this.showcase.showResults(0,n,F.teamColors[0],l.map(e=>({weapon:e.weaponId,style:e.character.style||{hair:e.slot%4,skin:e.slot*3%4},name:e.name}))),this.menus?.showResults(c),this.menus?.show(`results`),F.audio?.play(n?`victory_fanfare`:`defeat_jingle`),setTimeout(()=>this._playMusic(n?`results_win`:`results_lose`),2600)}_fade(e,t){return new Promise(n=>{let r=this.fadeEl;if(!r)return n();r.style.transition=`opacity ${t}ms ease`,r.style.opacity=String(e),r.style.pointerEvents=e>.5?`all`:`none`,setTimeout(n,t+20)})}_loop(){requestAnimationFrame(()=>this._loop()),this.timer.update();let e=this.timer.getDelta();this.frozen||(this.fpsAcc+=e,this.fpsN++,this.fpsAcc>.5&&(this.fps=Math.round(this.fpsN/this.fpsAcc),this.fpsAcc=0,this.fpsN=0),this._dynRes(e),e=Math.min(e,1/24),this._frame(e))}_dynRes(e){if(e<=0||e>.25)return;let t=this._dyn||={acc:0,n:0,t:0,fast:0,ups:0};if(t.acc+=e,t.n++,t.t+=e,t.t<4)return;let n=t.acc/t.n;t.acc=0,t.n=0,t.t=0;let r=this.match;if(this.settings.quality===`ultra`||document.hidden||!r||r.attract||r.state!==`playing`){t.fast=0;return}let i=this.R.dynScale||1;n>1/40&&i>.76?(this.R.setDynamicScale(i-.125),t.fast=0):n<1/75&&i<1&&t.ups<2?++t.fast>=3&&(this.R.setDynamicScale(i+.125),t.fast=0,t.ups++):t.fast=0}_frame(e){let t=performance.now();F.renderer.info.reset(),F.time+=e,this.input.pollPad(),this._padMenus();let n=this.match;if(n){n.updateController(e);let t=e>1/45?2:1;for(let r=0;r<t;r++)n.update(e/t);n.paused||F.projectiles.update(e),n.attract?this._updateAttract(e):n.state===`playing`&&n.local?.alive&&this.rig.mode!==`follow`&&this.rig.mode!==`path`&&this.rig.follow(n.local,!0)}(!n||!n.paused)&&F.fx.update(e,F.camera),(!n||!n.paused)&&this.fxHooks?.update?.(e),this.screenfx?.update?.(e,this),F.env.update?.(e,F.camera),this.decor.update(e),this.props?.update?.(e,F.time),this.rig.update(e),n&&n.controller&&n.state===`playing`&&n.controller.computeAim?.();let r=n?.local;F.projectiles.updateArc(r,!!(r&&r.alive&&r.weaponRunner.aimingSub&&n.state===`playing`&&!n.paused));let i=performance.now();F.paint.flush(e),this.levelMat.userData.uniforms.uTime.value=F.time;{let t=this.levelMat.userData.uniforms,i=!!(n&&!n.attract&&r&&r.alive&&this.rig.mode===`follow`&&this.rig.target===r);if(t.uSeeOn.value=B(t.uSeeOn.value,i?1:0,10,e),t.uSeeA.value.copy(F.camera.position),r&&t.uSeeB.value.set(r.pos.x,r.pos.y+(r.form===`squid`?.4:1),r.pos.z),this.grateMat){let e=this.grateMat.userData.uniforms;e.uSeeOn.value=t.uSeeOn.value,e.uSeeA.value.copy(t.uSeeA.value),e.uSeeB.value.copy(t.uSeeB.value)}}if(this.grateMat&&(this.grateMat.userData.uniforms.uTime.value=F.time),this.showcase.update(e),this._updateLocalLoops(e),this._updateAmbience(e),F.audio?.setListener){let e=F.camera;F.audio.setListener(e.position,e.getWorldDirection(this._lf||=new j),e.up)}let a=this.R.grade.uniforms,o=r&&n&&!n.attract&&r.alive?R(1-r.hp/55,0,1):0;a.uHurt.value=B(a.uHurt.value,o*.8,6,e),r&&a.uHurtColor.value.copy(F.teamColors[r.enemyTeam]);let s=F.renderer.shadowMap;s.autoUpdate=!1,this._frameN=(this._frameN||0)+1,(this.settings.quality!==`low`||this._frameN&1)&&(s.needsUpdate=!0),this._skipRender||(this.R.render(),this.showcase.mode&&(s.needsUpdate=!0),this.showcase.render());let c=performance.now(),l=this.perf||={sim:0,render:0,calls:0,tris:0};l.sim+=(i-t-l.sim)*.05,l.render+=(c-i-l.render)*.05,l.calls=F.renderer.info.render.calls,l.tris=F.renderer.info.render.triangles,n&&!n.attract&&this.hud&&(n.state===`playing`||n.state===`intro`||n.state===`finish`)&&this._updateHud(e),this.menus?.update?.(e),this.input.endFrame()}_updateAmbience(e){if(!(!this._audioOn||!F.audio?.loop)&&(this._amb||=F.audio.loop(`harbor_ambience`,{volume:.55}),this._gullT=(this._gullT??4)-e,this._gullT<=0)){this._gullT=7+Math.random()*12;let e=F.level.bounds,t=Math.random()*Math.PI*2,n=this._gullP||=new j;n.set(Math.cos(t)*(e.maxX+25),12+Math.random()*8,Math.sin(t)*(e.maxZ+20)),F.audio.play(`gull`,{pos:n,volume:.6+Math.random()*.4,pitch:.9+Math.random()*.25})}}_updateLocalLoops(e){let t=this.match,n=t&&!t.attract&&!t.paused?t.local:null,r=this._loops||={},i=(t,n,i,a=1)=>{n&&!r[t]&&(r[t]=F.audio?.loop?.(t,{volume:0}));let o=r[t];o&&(o._v=B(o._v||0,n?i:0,n?10:7,e),o.set({volume:o._v,pitch:a}),!n&&o._v<.01&&(o.stop(.05),r[t]=null))},a=!!(n&&n.alive),o=a?Math.hypot(n.vel.x,n.vel.z):0;i(`swim`,a&&n.anim.form===`swim`&&o>.5,Math.min(.6,o/11.8*.6+.08),.6+Math.min(1,o/11.8)),i(`climb`,a&&n.anim.form===`climb`,.5,a?.6+Math.min(1,Math.abs(n.vel.y)/7.5):1),i(`enemy_ink_sizzle`,a&&n.grounded&&n.groundTeam===2,.45,1)}_padMenus(){let e=this.input;if(!e.pad)return;let t=e.padPressed;if(this.menus?.current){let n=e=>this.menus.nav?.(e);t.has(12)&&n(`up`),t.has(13)&&n(`down`),t.has(14)&&n(`left`),t.has(15)&&n(`right`),t.has(0)&&n(`accept`),t.has(1)&&n(`back`),t.has(4)&&n(`tab_prev`),t.has(5)&&n(`tab_next`);let r=e.padAxis(1),i=e.padAxis(0);this._stickT=(this._stickT||0)-1/60,this._stickT<=0&&(r<-.6?(n(`up`),this._stickT=.22):r>.6?(n(`down`),this._stickT=.22):i<-.6?(n(`left`),this._stickT=.22):i>.6&&(n(`right`),this._stickT=.22)),t.has(9)&&this.menus.current===`pause`&&this.resume()}else F.mode===`match`&&t.has(9)&&this.pause()}_updateHud(e){let t=this.match,n=t.local,r=F.camera;this.minimap.update(e);let i=n.weapon,a=F.camera.fov*Math.PI/360,o=n.weaponRunner.spread??(i.kind===`shooter`?5.5:i.kind===`blaster`?1.2:0),s=i.kind===`roller`?28:Math.min(90,Math.tan(o*Math.PI/180)/Math.tan(a)*(innerHeight/2)),c=[],l={x:0,y:0};for(let e of t.actors)e.alive&&(e.team!==n.team&&!e.isLocal&&e.anim.form===`swim`||(this.minimap.toCanvas(e.pos.x,e.pos.z,l),c.push({x:l.x/this.minimap.w,y:l.y/this.minimap.h,team:e.team,isSelf:e.isLocal,yaw:-e.yaw+(this.minimap.flip?Math.PI:0),alive:e.alive,color:F.teamHex[e.team]})));let u=[],d=this._mv||=new j,f=innerWidth,p=innerHeight;for(let e of t.actors){if(e.isLocal||e.team!==n.team||!e.alive)continue;e.character.getHeadPosition&&e.form!==`squid`?(e.character.getHeadPosition(d),d.y+=.45):(e.visualPos?e.visualPos(d):d.copy(e.pos),d.y+=e.form===`squid`?1:1.9),d.project(r);let t=d.z>1,i=(d.x*.5+.5)*f,a=(-d.y*.5+.5)*p,o=!t&&i>20&&i<f-20&&a>20&&a<p-20,s=0;if(!o){let e=i-f/2,n=a-p/2;t&&(e=-e,n=-n),s=Math.atan2(n,e);let r=Math.min((f/2-40)/Math.max(.001,Math.abs(Math.cos(s))),(p/2-40)/Math.max(.001,Math.abs(Math.sin(s))));i=f/2+Math.cos(s)*r,a=p/2+Math.sin(s)*r}u.push({x:i,y:a,name:e.name,color:F.teamHex[e.team],onScreen:o,angle:s,dist:e.pos.distanceTo(n.pos)})}this._hintT+=e;let m=null,h=n.ink/V.inkMax;t.state===`playing`&&n.alive&&(t.controller?.mapHeld?m=`Press 1 – 3 to Super Jump to a teammate  ·  4 to jump home`:n.superJumpState?m=null:this._lowInkFlash>0?(this._lowInkFlash-=e,m=`Low ink! Hold SHIFT in your ink to refill`):n.specialReady()&&(this._hints.specialT=(this._hints.specialT||0)+e)>2?m=`Special ready! Press F`:h<.25&&n.form!==`squid`?m=`Hold SHIFT to swim in your ink and refill`:t.duration-t.time<8&&!this._hints.shot&&(m=`Paint the ground — most turf wins!`),n.specialReady()||(this._hints.specialT=0),n.intent.fire&&(this._hints.shot=!0));let g={time:t.time,teams:t.teamSummary(),ink:n.ink/V.inkMax,inkLow:n.ink<18||this._lowInkFlash>0,subCost:mt.bomb.inkCost/V.inkMax,special:n.specialFrac(),specialReady:n.specialReady(),specialActive:!!n.specialActive,hp:n.hp/V.hp,weapon:n.weaponId,charge:n.weaponRunner.charge,crosshair:{spread:s,onTarget:t.controller?.onTarget?`enemy`:null,inRange:t.controller?t.controller.inRange!==!1:!0},map:this.settings.minimap!==!1||t.controller?.mapHeld?{canvas:this.minimap.canvas,expanded:!!t.controller?.mapHeld,players:c}:null,markers:u,prompt:m,fps:this.settings.showFps?this.fps:void 0};this.hud.update(e,g)}}().boot().catch(e=>{console.error(e);let t=document.getElementById(`boot-error`);t&&(t.textContent=`Something went wrong while loading: `+e.message,t.style.display=`block`)});export{ht as a,Ue as c,B as d,z as f,St as i,F as l,an as n,mt as o,I as p,V as r,ft as s,ar as t,R as u};