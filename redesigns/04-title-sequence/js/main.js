/* Catalyst Growth Coaching · concept 04 "The Title Sequence" */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- scroll progress bar + topbar state ---------- */
  var bar = document.querySelector('.progress span');
  var topbar = document.querySelector('.topbar');
  if (bar) {
    var ticking = false;
    var setProgress = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = 'scaleX(' + p + ')';
      if (topbar) topbar.classList.toggle('scrolled', window.scrollY > 40);
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(setProgress);
      }
    }, { passive: true });
    window.addEventListener('resize', setProgress);
    setProgress();
  }

  /* ---------- menu overlay ---------- */
  var menu = document.getElementById('menu');
  var menuBtn = document.getElementById('menuBtn');
  var menuClose = document.getElementById('menuClose');
  var lastFocus = null;

  function openMenu() {
    lastFocus = document.activeElement;
    menu.classList.add('open');
    document.body.classList.add('menu-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuClose.focus();
  }
  function closeMenu() {
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    if (lastFocus) lastFocus.focus();
  }
  if (menu && menuBtn && menuClose) {
    menuBtn.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    menu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
      if (e.key === 'Tab') {
        var focusables = menu.querySelectorAll('a, button');
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    });
  }

  /* ---------- scroll-driven reveals ---------- */
  var revealEls = document.querySelectorAll('.reveal, .settle');
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- pause offscreen videos ---------- */
  var vids = document.querySelectorAll('video[autoplay]');
  if (vids.length && 'IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (entry.isIntersecting) {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.12 });
    vids.forEach(function (v) { vio.observe(v); });
  }

  /* ---------- lesson interstitial (in practice) ---------- */
  var overlay = document.getElementById('interstitial');
  if (overlay) {
    var oKicker = overlay.querySelector('[data-slot="kicker"]');
    var oTitle = overlay.querySelector('[data-slot="title"]');
    var oBody = overlay.querySelector('[data-slot="body"]');
    var oClose = overlay.querySelector('.interstitial__close');
    var openerBtn = null;

    function openLesson(ep) {
      var num = ep.getAttribute('data-num');
      var title = ep.querySelector('.episode__title').textContent;
      var full = ep.querySelector('.episode__full');
      oKicker.textContent = 'Lesson ' + num;
      oTitle.textContent = title;
      oBody.innerHTML = full.innerHTML;
      overlay.classList.add('open');
      overlay.removeAttribute('hidden');
      document.body.classList.add('overlay-open');
      overlay.scrollTop = 0;
      oClose.focus();
    }
    function closeLesson() {
      overlay.classList.remove('open');
      document.body.classList.remove('overlay-open');
      window.setTimeout(function () { overlay.setAttribute('hidden', ''); }, 500);
      if (openerBtn) openerBtn.focus();
    }

    document.querySelectorAll('.episode__open').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openerBtn = btn;
        openLesson(btn.closest('.episode'));
      });
    });
    oClose.addEventListener('click', closeLesson);
    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLesson();
      if (e.key === 'Tab') {
        // single focusable control plus links in body; simple containment
        var focusables = overlay.querySelectorAll('button, a');
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    });
  }

  /* ---------- global escape for menu ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu && menu.classList.contains('open')) closeMenu();
  });

  /* ---------- contact form ---------- */
  var form = document.getElementById('contactForm');
  if (form) {
    var confirmation = document.getElementById('confirmation');

    function setInvalid(fieldEl, invalid) {
      fieldEl.classList.toggle('invalid', invalid);
      var control = fieldEl.querySelector('input, textarea');
      if (control && control.type !== 'radio') {
        control.setAttribute('aria-invalid', invalid ? 'true' : 'false');
      }
    }

    form.setAttribute('novalidate', '');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      var firstBad = null;

      var nameField = document.getElementById('fieldName');
      var nameInput = nameField.querySelector('input');
      var nameBad = nameInput.value.trim() === '';
      setInvalid(nameField, nameBad);
      if (nameBad) { ok = false; firstBad = firstBad || nameInput; }

      var emailField = document.getElementById('fieldEmail');
      var emailInput = emailField.querySelector('input');
      var emailBad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
      setInvalid(emailField, emailBad);
      if (emailBad) { ok = false; firstBad = firstBad || emailInput; }

      var typeField = document.getElementById('fieldType');
      var typeBad = !typeField.querySelector('input[type="radio"]:checked');
      setInvalid(typeField, typeBad);
      if (typeBad) { ok = false; firstBad = firstBad || typeField.querySelector('input[type="radio"]'); }

      var msgField = document.getElementById('fieldMessage');
      var msgInput = msgField.querySelector('textarea');
      var msgBad = msgInput.value.trim() === '';
      setInvalid(msgField, msgBad);
      if (msgBad) { ok = false; firstBad = firstBad || msgInput; }

      if (!ok) {
        if (firstBad) firstBad.focus();
        return;
      }
      form.setAttribute('hidden', '');
      confirmation.removeAttribute('hidden');
      confirmation.focus();
    });

    // clear an error as soon as the field is corrected
    form.addEventListener('input', function (e) {
      var fieldEl = e.target.closest('.field');
      if (fieldEl && fieldEl.classList.contains('invalid')) {
        setInvalid(fieldEl, false);
      }
    });
    form.addEventListener('change', function (e) {
      if (e.target.type === 'radio') {
        var fieldEl = e.target.closest('.field');
        if (fieldEl) setInvalid(fieldEl, false);
      }
    });
  }
})();
