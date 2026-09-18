// Cookie banner — GDPR / ZVOP-2 compliant.
// Hides itself until consent given. Rejection still allows the site to work —
// analytics scripts (PostHog, Sentry) load only on "Accept".
(function () {
  const KEY = "hds-cookie-consent";
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;
  const accept = document.getElementById("cookieAccept");
  const reject = document.getElementById("cookieReject");

  let choice = null;
  try {
    choice = localStorage.getItem(KEY);
  } catch {
    /* private mode */
  }

  if (!choice) {
    // Show banner after a tick so it doesn't flash during page render.
    setTimeout(() => banner.classList.remove("hidden"), 300);
  } else {
    applyConsent(choice);
  }

  function applyConsent(value) {
    // value: "accepted" | "rejected"
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* swallow */
    }
    banner.classList.add("hidden");
    if (value === "accepted") {
      // Fire analytics scripts here. Phase 4 ships no actual scripts — the
      // banner is wired and ready for Phase 5 when PostHog / Sentry are added.
      // For now, set a flag that any embedded widget can check.
      window.__hds_consent = "accepted";
    } else {
      window.__hds_consent = "rejected";
    }
  }

  if (accept) accept.addEventListener("click", () => applyConsent("accepted"));
  if (reject) reject.addEventListener("click", () => applyConsent("rejected"));
})();
