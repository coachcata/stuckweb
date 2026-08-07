/* Catalyst Growth Coaching, Shared JS */

(function () {
  'use strict';

  // Smooth scroll for in-page anchor links (e.g. /#programmes)
  document.querySelectorAll('a[href^="#"]').forEach(a =>
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const t = document.querySelector(href);
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    })
  );

  // Mobile autoplay rescue for silent background video clips.
  // Silent best-effort first; tap-to-play overlay only when autoplay
  // is genuinely blocked (e.g. iOS Low Power Mode, Android Data Saver).
  const videos = document.querySelectorAll('video[autoplay]');
  if (!videos.length) return;

  // Safari sometimes drops muted/playsInline on bfcache restore.
  videos.forEach(v => {
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
  });

  const tryPlay = v => {
    try {
      const p = v.play();
      if (p && typeof p.then === 'function') {
        return p.then(() => true).catch(() => false);
      }
      return Promise.resolve(true);
    } catch (_) {
      return Promise.resolve(false);
    }
  };

  const retryAll = () => videos.forEach(tryPlay);

  // First-touch retry handles the common "Safari blocks until interaction" case.
  ['touchstart', 'click', 'scroll', 'keydown'].forEach(ev =>
    document.addEventListener(ev, retryAll, { once: true, passive: true })
  );

  // Play each clip when it enters the viewport (covers slow-metadata races,
  // saves battery, and re-fires after pause-on-scroll-away).
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) tryPlay(e.target); });
    }, { threshold: 0.1 });
    videos.forEach(v => io.observe(v));
  }

  const installOverlay = v => {
    if (v.dataset.cgcOverlay) return;
    v.dataset.cgcOverlay = '1';
    const wrap = v.parentElement;
    if (!wrap) return;
    if (getComputedStyle(wrap).position === 'static') {
      wrap.style.position = 'relative';
    }
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Play video');
    btn.style.cssText = [
      'position:absolute',
      'inset:0',
      'margin:auto',
      'width:72px',
      'height:72px',
      'border:none',
      'border-radius:50%',
      'background:rgba(245,241,232,0.92)',
      'color:#8B5A3C',
      'cursor:pointer',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'box-shadow:0 4px 24px rgba(0,0,0,0.25)',
      'padding:0',
      'z-index:2',
      '-webkit-tap-highlight-color:transparent'
    ].join(';');
    btn.innerHTML =
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M8 5v14l11-7z"/></svg>';
    btn.addEventListener('click', () => {
      tryPlay(v).then(ok => { if (ok) btn.remove(); });
    });
    wrap.appendChild(btn);
  };

  const checkStillBlocked = () => {
    videos.forEach(v => { if (v.paused) installOverlay(v); });
  };

  // 1.5s after the first user gesture, any clip still paused gets a tap target.
  ['touchstart', 'click'].forEach(ev =>
    document.addEventListener(ev, () => setTimeout(checkStillBlocked, 1500),
      { once: true, passive: true })
  );

  // Cheap initial best-effort: covers every desktop browser silently.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', retryAll, { once: true });
  } else {
    retryAll();
  }
})();
