import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
if ("scrollRestoration" in history) history.scrollRestoration = "manual";   // the story always starts at beat one

const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

// ---- in-page links go through Lenis, clear of the fixed header ----
document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
  const target = document.querySelector(a.getAttribute("href"));
  if (!target) return;
  e.preventDefault();
  lenis.scrollTo(target, { offset: a.getAttribute("href") === "#top" ? 0 : -70 });
}));

// ---- header turns solid once the hero has scrolled away ----
const header = document.querySelector(".site-header");
const setHeader = () => header.classList.toggle("is-solid", scrollY > innerHeight * 0.6);
lenis.on("scroll", setHeader);
setHeader();

// ---- the film: scrubbed across the story only, loaded as a Blob so seeks work on any host ----
const story = document.getElementById("story");
const bgVideo = document.getElementById("bgv");
const STATIC_HERO = matchMedia("(max-width: 768px), (hover: none), (prefers-reduced-motion: reduce)");
let seekBusy = false, pendingTime = null, lastVideoT = -1;
function requestSeek(t) {
  if (!bgVideo.duration) return;
  if (Math.abs(t - lastVideoT) < 0.008) return;
  if (seekBusy) { pendingTime = t; return; }
  seekBusy = true; lastVideoT = t; bgVideo.currentTime = t;
}
bgVideo.addEventListener("seeked", () => {
  seekBusy = false;
  if (pendingTime !== null) { const t = pendingTime; pendingTime = null; requestSeek(t); }
});
bgVideo.addEventListener("error", () => { seekBusy = false; pendingTime = null; document.body.classList.add("video-failed"); });
const storyProgress = () => gsap.utils.clamp(0, 1, (scrollY - story.offsetTop) / Math.max(1, story.offsetHeight - innerHeight));
function scrubVideo() { requestSeek(storyProgress() * (bgVideo.duration - 0.05)); }
async function initVideo() {
  if (STATIC_HERO.matches) return;                 // phones / reduced motion: poster only
  try {
    const res = await fetch("film.mp4");
    if (!res.ok) throw new Error(res.status);
    bgVideo.src = URL.createObjectURL(await res.blob());
    bgVideo.load();
    bgVideo.addEventListener("loadedmetadata", () => { scrubVideo(); document.body.classList.add("video-ready"); }, { once: true });
    lenis.on("scroll", scrubVideo);
  } catch { document.body.classList.add("video-failed"); }
}
initVideo();

// ---- live atmosphere over the film (three.js loads after the text has painted) ----
let atmos = null;
import("./atmosphere.js").then(({ initAtmosphere }) => { atmos = initAtmosphere({ lenis }); });

// ---- story beats: each line fades up, holds for most of its 120vh, then fades before the next arrives ----
// The window runs from the beat's top at 55% of the screen to its bottom at 55%, so two beats never share the screen.
const beats = gsap.utils.toArray(".beat");
beats.forEach((beat, i) => {
  const copy = beat.querySelector(".beat__copy");
  if (REDUCED) return;
  const first = i === 0;
  const tl = gsap.timeline({ scrollTrigger: { trigger: beat, start: first ? "top top" : "top 55%", end: "bottom 55%", scrub: 0.6 } });
  if (first) tl.to(copy, { opacity: 1, duration: 0.6 });
  else tl.fromTo(copy, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }).to(copy, { opacity: 1, duration: 0.52 });
  tl.to(copy, { opacity: 0, y: -30, duration: first ? 0.4 : 0.23, ease: "power2.in" });
});

// ---- after the story the film rests and dims behind the content ----
const dimState = { v: 0 };
gsap.to(dimState, { v: 1, ease: "none",
  onUpdate: () => {
    gsap.set(".film-dim", { opacity: dimState.v * 0.82 });
    if (atmos) atmos.fade = 1 - dimState.v * 0.55;
  },
  scrollTrigger: { trigger: "#story", start: "bottom 95%", end: "bottom 35%", scrub: true } });

// ---- impact: the accent rule draws under the punchline ----
gsap.fromTo(".impact__punch", { "--draw": 0 }, { "--draw": 1, ease: "none",
  scrollTrigger: { trigger: ".impact__punch", start: "top 85%", end: "top 45%", scrub: true } });

// ---- signature: the evidence line fills and each hold point lights as it is reached ----
gsap.to(".evidence__fill", { scaleY: 1, ease: "none",
  scrollTrigger: { trigger: ".evidence", start: "top 62%", end: "bottom 62%", scrub: true } });
gsap.utils.toArray(".stage").forEach((stage) => ScrollTrigger.create({
  trigger: stage, start: "top 62%", onEnter: () => stage.classList.add("is-reached"), onLeaveBack: () => stage.classList.remove("is-reached"),
}));

// ---- reveals ----
const revealSel = [".impact__lead", ".impact__punch", ".assurance__head > *", ".stage__body", ".sseg__intro", ".sseg__who", ".sseg__steps > div",
  ".focus__copy > *", ".focus__list li", ".about__copy > *", ".record__item", ".integrity > h2", ".integrity__cols", ".integrity__roles",
  ".clients__who > *", ".clients__when", ".outcomes > h2", ".register li", ".outcomes__close", ".contact__head > *", ".way", ".enquiry"].join(",");
if (!REDUCED) {
  gsap.utils.toArray(revealSel).forEach((el) => {
    el.classList.add("reveal");
    gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
  });
}

// ---- record in numbers: count up once ----
document.querySelectorAll("[data-count]").forEach((el) => {
  const to = +el.dataset.count, obj = { n: 0 };
  if (REDUCED) return;
  el.textContent = "0";
  ScrollTrigger.create({ trigger: el, start: "top 85%", once: true,
    onEnter: () => gsap.to(obj, { n: to, duration: 1.6, ease: "power2.out", onUpdate: () => { el.textContent = Math.round(obj.n); } }) });
});

// ---- SSEG audience switcher (accessible tabs) ----
const tabs = [...document.querySelectorAll('.seg [role="tab"]')];
function selectTab(tab) {
  tabs.forEach((t) => {
    const on = t === tab;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
  });
}
tabs.forEach((t, i) => {
  t.addEventListener("click", () => selectTab(t));
  t.addEventListener("keydown", (e) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    const next = tabs[(i + d + tabs.length) % tabs.length];
    selectTab(next); next.focus();
  });
});

// ---- 3D tilt on the copper image (desktop only, max 6°) ----
if (matchMedia("(hover: hover) and (min-width: 769px)").matches && !REDUCED) {
  document.querySelectorAll(".tilt").forEach((card) => {
    const wrap = card.parentElement;
    wrap.style.perspective = "1200px";
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, { rotateY: x * 12, rotateX: -y * 12, duration: 0.6, ease: "power2.out" });
    });
    card.addEventListener("pointerleave", () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power2.out" }));
  });
}

// ---- enquiry form: validates, then opens the visitor's email app addressed to the practice ----
const form = document.getElementById("enquiry");
const status = form.querySelector(".enquiry__status");
document.querySelectorAll('[data-service="sseg"]').forEach((a) => a.addEventListener("click", () => {
  form.service.value = "SSEG commissioning";
  form.stage.value = "Solar or battery system installed, awaiting sign-off";
}));
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let ok = true;
  for (const name of ["decision", "name", "email"]) {
    const el = form[name], field = el.closest(".field");
    const valid = el.value.trim() !== "" && (name !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
    field.classList.toggle("is-invalid", !valid);
    if (!valid && ok) { el.focus(); ok = false; }
  }
  if (!ok) { status.textContent = "Please add the pending decision, your name and a valid email."; return; }
  const v = (n) => form[n].value.trim();
  const body = [
    `Service: ${v("service")}`, `Project stage: ${v("stage")}`, "", "Decision pending:", v("decision"), "",
    `Name: ${v("name")}`, `Email: ${v("email")}`, v("company") ? `Company / site: ${v("company")}` : null, v("phone") ? `Phone: ${v("phone")}` : null,
  ].filter((l) => l !== null).join("\n");
  const href = `mailto:consultant@bynergex.com?subject=${encodeURIComponent(`Enquiry: ${v("service")} (${v("stage")})`)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
  status.textContent = "Your email app should open with the enquiry ready to send. If it doesn't, write to consultant@bynergex.com.";
});

if (import.meta.env.DEV) { window.__lenis = lenis; window.__ST = ScrollTrigger; window.__bgv = bgVideo; }
