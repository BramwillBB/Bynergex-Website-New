// Blog posts: the 1–5 rating, approved reader questions, the "Ask the engineer" form and the
// download (lead magnet) form. All talk to the PHP scripts in /api on Hostinger.

const API = "/api/comments.php";

// Forms share the same send pattern: validate, post as FormData, show the outcome in .form-status.
function wireForm(form, { url, action, required, onSuccess }) {
  const status = form.querySelector(".form-status");
  const button = form.querySelector('button[type="submit"]');
  form.t.value = String(Date.now());          // the server ignores forms sent within 3 s of loading (bots)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form-status";
    let ok = true;
    for (const name of required) {
      const el = form[name];
      const valid = el.type === "checkbox" ? el.checked
        : el.value.trim().length >= (name === "question" ? 10 : 1) && (el.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
      (el.closest(".field") || el.closest(".check")).classList.toggle("is-invalid", !valid);
      if (!valid && ok) { el.focus(); ok = false; }
    }
    if (!ok) { status.textContent = "Please complete the highlighted fields."; return; }
    const data = new FormData(form);
    if (action) data.set("action", action);
    button.disabled = true;
    status.textContent = "Sending…";
    try {
      const res = await fetch(url, { method: "POST", body: data, headers: { Accept: "application/json" } });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || res.status);
      const email = form.email.value.trim();
      form.reset();
      form.t.value = String(Date.now());
      status.classList.add("is-sent");
      status.textContent = onSuccess(email, json);
    } catch (err) {
      status.classList.add("is-error");
      status.textContent = String(err.message) === "rate"
        ? "You've sent several requests in the last hour. Please email consultant@bynergex.com instead."
        : "Sorry, that didn't send. Please try again, or email consultant@bynergex.com.";
    } finally {
      button.disabled = false;
    }
  });
}

const magnet = document.querySelector(".magnet-form");
if (magnet) wireForm(magnet, {
  url: "/api/lead.php", required: ["name", "email", "consent"],
  onSuccess: (email, json) => {
    // The files are offered on the page straight away; the email is a copy to keep.
    let box = magnet.querySelector(".magnet-files");
    if (!box) { box = document.createElement("div"); box.className = "magnet-files"; magnet.querySelector(".form-status").before(box); }
    box.replaceChildren();
    for (const f of json.files || []) {
      const a = document.createElement("a");
      a.className = "btn magnet-files__link";
      a.href = f.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = `Download: ${f.label}`;
      box.append(a);
    }
    return `Thank you. Your downloads are ready above, and we've sent a copy of the links to ${email}.`;
  },
});

const engage = document.querySelector(".engage");
if (engage) {
  const slug = engage.dataset.post;
  const stars = [...engage.querySelectorAll(".star")];
  const summary = engage.querySelector(".rate__summary");
  const list = engage.querySelector(".qa-list");
  const KEY = `rating:${slug}`;
  const remembered = () => { try { return +localStorage.getItem(KEY) || 0; } catch { return 0; } };

  const showStars = (n) => stars.forEach((s, i) => {
    s.classList.toggle("is-on", i < n);
    s.setAttribute("aria-checked", String(i + 1 === n));
  });
  const showSummary = (r, mine) => {
    const parts = [];
    if (r && r.count) parts.push(`Rated ${r.average.toFixed(1)} out of 5 by ${r.count} ${r.count === 1 ? "reader" : "readers"}.`);
    if (mine) parts.push(`You gave it ${mine}. Tap a star to change your rating.`);
    else if (!r || !r.count) parts.push("Be the first to rate it.");
    summary.textContent = parts.join(" ");
  };

  // Approved questions, newest first. Text is set with textContent, never as HTML.
  const renderQuestions = (qs) => {
    list.replaceChildren();
    for (const q of qs) {
      const item = document.createElement("article");
      item.className = "qa";
      const who = document.createElement("p");
      who.className = "qa__who";
      who.textContent = `${q.name} asked · ${new Date(q.date).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}`;
      const question = document.createElement("p");
      question.className = "qa__q";
      question.textContent = q.question;
      item.append(who, question);
      if (q.answer) {
        const answer = document.createElement("div");
        answer.className = "qa__a";
        const label = document.createElement("p");
        label.className = "qa__who";
        label.textContent = "Bramwill Bruinders, Pr. Tech. Eng., answered";
        const text = document.createElement("p");
        text.textContent = q.answer;
        answer.append(label, text);
        item.append(answer);
      }
      list.append(item);
    }
  };

  showStars(remembered());
  fetch(`${API}?post=${encodeURIComponent(slug)}`, { headers: { Accept: "application/json" } })
    .then((r) => r.json())
    .then((json) => { if (json.ok) { showSummary(json.rating, remembered()); renderQuestions(json.questions); } })
    .catch(() => showSummary(null, remembered()));

  // Rating: hover previews, click saves (one rating per visitor; clicking again changes it).
  stars.forEach((star, i) => {
    star.addEventListener("mouseenter", () => showStars(i + 1));
    star.addEventListener("focus", () => showStars(i + 1));
    star.addEventListener("click", async () => {
      const n = i + 1;
      try { localStorage.setItem(KEY, String(n)); } catch {}
      showStars(n);
      const data = new FormData();
      data.set("action", "rate"); data.set("post", slug); data.set("stars", String(n));
      try {
        const res = await fetch(API, { method: "POST", body: data, headers: { Accept: "application/json" } });
        const json = await res.json();
        if (!json.ok) throw new Error(json.error);
        showSummary(json.rating, n);
      } catch {
        summary.textContent = `Thanks, you gave it ${n}. Your rating couldn't be saved just now.`;
      }
    });
  });
  engage.querySelector(".stars").addEventListener("mouseleave", () => showStars(remembered()));

  const ask = engage.querySelector(".ask-form");
  wireForm(ask, {
    url: API, action: "ask", required: ["name", "email", "question", "consent"],
    onSuccess: () => "Thank you. Your question has gone to Bramwill. If it's published with an answer, we'll email you.",
  });
}
