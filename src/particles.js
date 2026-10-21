// GPU particles in the brand accent: slow warm dust and the odd spark drifting through the film.
import * as THREE from "three";

export function makeParticles(count, color, pixelRatio, size = 22, opacity = 0.5, { streak = false, fall = 0.18 } = {}) {
  const g = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3), speed = new Float32Array(count), phase = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 12;
    pos[i * 3 + 1] = Math.random() * 7 - 1;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    speed[i] = 0.5 + Math.random();
    phase[i] = Math.random() * 6.28;
  }
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("aSpeed", new THREE.BufferAttribute(speed, 1));
  g.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
  const m = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 }, uBoost: { value: 0 }, uFall: { value: fall }, uFade: { value: 1 },
      uColor: { value: new THREE.Color(color) }, uSize: { value: size * pixelRatio }, uOpacity: { value: opacity },
    },
    vertexShader: /* glsl */ `
      attribute float aSpeed, aPhase;
      uniform float uTime, uBoost, uSize, uFall;
      varying float vAlpha;
      void main() {
        vec3 p = position;
        p.y = mod(p.y - uTime * aSpeed * (uFall + uBoost), 7.0) - 1.0;          // drift down, wrap
        p.x += sin(uTime * 0.3 * aSpeed + aPhase) * 0.25;                         // lazy sideways sway
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = uSize * aSpeed / -mv.z;
        vAlpha = smoothstep(9.0, 1.2, -mv.z) * (0.55 + 0.45 * sin(uTime * 1.3 * aSpeed + aPhase));   // fade with distance, flicker
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity, uFade;
      varying float vAlpha;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = ${streak ? "length(c * vec2(7.0, 1.0))" : "length(c)"};
        float glow = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(uColor, glow * glow * vAlpha * uOpacity * uFade);
      }`,
  });
  const pts = new THREE.Points(g, m);
  pts.frustumCulled = false;
  return pts;
}
