// A transparent WebGL layer over the scrubbed film. Warm dust in the accent colour drifts
// through the frame, speeds up with scroll, and leans with the cursor.
import * as THREE from "three";
import { makeParticles } from "./particles.js";

const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const LITE = matchMedia("(max-width: 768px), (hover: none)").matches;

export function initAtmosphere({ lenis }) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  const canvas = document.getElementById("atmos");
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false }); } catch { return null; }
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(devicePixelRatio, LITE ? 1.25 : 1.5));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.1, 40);
  camera.position.set(0, 1.5, 6);            // in front of the whole particle field
  const dust = makeParticles(LITE ? 260 : 700, css("--accent"), renderer.getPixelRatio(), 26, 0.55, { fall: 0.12 });
  const sparks = makeParticles(LITE ? 30 : 70, "#ffb27a", renderer.getPixelRatio(), 46, 0.8, { fall: 0.06 });
  scene.add(dust, sparks);

  const pointer = { x: 0, y: 0 };
  addEventListener("pointermove", (e) => {
    pointer.x = (e.clientX / innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / innerHeight) * 2 + 1;
  }, { passive: true });
  const resize = () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight, false);
  };
  addEventListener("resize", resize);
  resize();

  const cover = document.querySelector(".stage-cover");
  const clock = new THREE.Clock();
  const api = { renderer, scene, camera, fade: 1 };
  renderer.setAnimationLoop(() => {
    if (document.hidden || (cover && cover.getBoundingClientRect().top <= 0)) return;
    const t = clock.getElapsedTime();
    camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.04;
    camera.position.y += (1.5 + pointer.y * 0.3 - camera.position.y) * 0.04;
    camera.lookAt(0, 1.5, 0);
    const boost = Math.min(1.2, Math.abs(lenis?.velocity || 0) * 0.015);
    for (const p of [dust, sparks]) {
      p.material.uniforms.uTime.value = t;
      p.material.uniforms.uBoost.value = boost;
      p.material.uniforms.uFade.value = api.fade;
    }
    renderer.render(scene, camera);
  });
  return api;
}
