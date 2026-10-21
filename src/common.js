// Shared by every page: smooth scroll, header, in-page links, reveals, the enquiry form and tabs.
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
export const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
export { gsap, ScrollTrigger };

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

// ---- phone menu ----
const navToggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");
const setMenu = (open) => {
  nav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.textContent = open ? "Close" : "Menu";
};
navToggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// ---- reveals ----
export function reveal(selector) {
  if (REDUCED) return;
  gsap.utils.toArray(selector).forEach((el) => {
    el.classList.add("reveal");
    gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
  });
}

// ---- the illustrative load profile draws itself, then the waste band and the "after" line fade in ----
export function drawLoadProfile() {
  document.querySelectorAll(".loadprofile").forEach((fig) => {
    const paths = fig.querySelectorAll(".lp-draw");
    const later = fig.querySelectorAll(".lp-later");
    if (REDUCED) return;
    paths.forEach((p) => { const len = p.getTotalLength(); p.style.strokeDasharray = len; p.style.strokeDashoffset = len; });
    gsap.set(later, { opacity: 0 });
    const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 75%", once: true } });
    tl.to(paths, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", stagger: 0.5 })
      .to(later, { opacity: 1, duration: 0.6, stagger: 0.15 }, "-=0.6");
  });
}

// ---- accessible tabs (SSEG audience switcher) ----
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

// ---- enquiry form: validates, then sends to /api/enquiry.php, which emails it to the practice ----
const form = document.getElementById("enquiry");
if (form) {
  const status = form.querySelector(".enquiry__status");
  const sendBtn = form.querySelector('button[type="submit"]');
  form.t.value = String(Date.now());          // the server ignores forms sent within 3 s of loading (bots)
  document.querySelectorAll("[data-service]").forEach((a) => a.addEventListener("click", () => {
    const pick = { sseg: ["SSEG commissioning", "Solar or battery system installed, awaiting sign-off"],
      energy: ["Energy loss audit", "High electricity bills, want to know why"],
      assurance: ["Project assurance", "Pre-appointment"] }[a.dataset.service];
    if (!pick) return;
    form.service.value = pick[0];
    form.stage.value = pick[1];
  }));
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let ok = true;
    for (const name of ["decision", "name", "email"]) {
      const el = form[name], field = el.closest(".field");
      const valid = el.value.trim() !== "" && (name !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
      field.classList.toggle("is-invalid", !valid);
      if (!valid && ok) { el.focus(); ok = false; }
    }
    status.classList.remove("is-sent", "is-error");
    if (!ok) { status.textContent = "Please add what you need help with, your name and a valid email."; return; }

    const data = new FormData(form);
    data.set("page", location.pathname);
    sendBtn.disabled = true;
    status.textContent = "Sending…";
    try {
      const res = await fetch("/api/enquiry.php", { method: "POST", body: data, headers: { Accept: "application/json" } });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || res.status);
      form.reset();
      form.t.value = String(Date.now());
      status.classList.add("is-sent");
      status.textContent = "Thank you. Your enquiry is on its way to consultant@bynergex.com, and we'll reply by email.";
    } catch (err) {
      status.classList.add("is-error");
      status.textContent = String(err.message) === "rate"
        ? "You've sent several enquiries in the last hour. Please email consultant@bynergex.com or call +27 66 252 2655."
        : "Sorry, the enquiry didn't send. Please email consultant@bynergex.com or call +27 66 252 2655.";
    } finally {
      sendBtn.disabled = false;
    }
  });
}

if (import.meta.env.DEV) { window.__lenis = lenis; window.__ST = ScrollTrigger; }
