/* Catalyst Growth Coaching, companion pages. Shared behaviour. */

(function () {
  'use strict';

  // Scroll reveal, gentle and once-only.
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // Background video rescue (adapted from the main site).
  var videos = document.querySelectorAll('video[autoplay]');
  if (!videos.length) return;

  videos.forEach(function (v) {
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
  });

  var tryPlay = function (v) {
    try {
      var p = v.play();
      if (p && typeof p.then === 'function') {
        return p.then(function () { return true; }).catch(function () { return false; });
      }
      return Promise.resolve(true);
    } catch (e) {
      return Promise.resolve(false);
    }
  };

  var rescueAll = function () {
    videos.forEach(function (v) { tryPlay(v); });
  };

  ['touchstart', 'click', 'scroll', 'keydown'].forEach(function (evt) {
    window.addEventListener(evt, rescueAll, { once: true, passive: true });
  });

  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) tryPlay(entry.target);
      });
    }, { threshold: 0.25 });
    videos.forEach(function (v) { vio.observe(v); });
  }
})();
