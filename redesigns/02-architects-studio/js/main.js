/* CATALYST GROWTH COACHING · SHEET SET 02 · behaviour layer
   Vanilla, small, progressive. Nothing here is required to read the copy. */

(function () {
  'use strict';

  var docEl = document.documentElement;
  docEl.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---- Exposed grid guide (decorative) ---------------------------------- */

  function buildGridGuide() {
    var guide = document.createElement('div');
    guide.className = 'grid-guide';
    guide.setAttribute('aria-hidden', 'true');
    var cols = document.createElement('div');
    cols.className = 'grid-guide-cols';
    for (var i = 0; i < 12; i++) cols.appendChild(document.createElement('span'));
    guide.appendChild(cols);
    document.body.insertBefore(guide, document.body.firstChild);
  }
  buildGridGuide();

  /* ---- Mobile nav --------------------------------------------------------- */

  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function closeNav() {
    if (!nav) return;
    nav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.textContent = 'Menu';
    }
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      document.body.classList.toggle('nav-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.textContent = open ? 'Close' : 'Menu';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        navToggle.focus();
      }
    });
  }

  /* ---- Reveal on scroll ----------------------------------------------------- */

  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reducedMotion.matches && revealEls.length) {
    docEl.classList.add('js-reveal');
    var pending = [];
    var flushTimer = null;

    function flush() {
      pending.forEach(function (el, i) {
        el.style.setProperty('--reveal-delay', (i * 60) + 'ms');
        el.classList.add('is-in');
      });
      pending = [];
      flushTimer = null;
    }

    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          pending.push(entry.target);
          revealIO.unobserve(entry.target);
        }
      });
      if (pending.length && !flushTimer) flushTimer = setTimeout(flush, 16);
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    revealEls.forEach(function (el) { revealIO.observe(el); });
  }

  /* ---- Living photos: play only in view ---------------------------------------- */

  var videos = document.querySelectorAll('video');

  function applyMotionPreference() {
    videos.forEach(function (v) {
      if (reducedMotion.matches) {
        v.removeAttribute('autoplay');
        v.pause();
      }
    });
  }
  applyMotionPreference();
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', applyMotionPreference);

  if ('IntersectionObserver' in window && videos.length) {
    var videoIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (reducedMotion.matches) { v.pause(); return; }
        if (entry.isIntersecting) {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { rootMargin: '80px 0px', threshold: 0.1 });
    videos.forEach(function (v) { videoIO.observe(v); });
  }

  /* ---- Lessons: the side panel -------------------------------------------------- */

  var lessons = document.querySelectorAll('details.lesson');
  if (lessons.length) {
    var panel = document.createElement('aside');
    panel.className = 'lesson-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-labelledby', 'lesson-panel-title');
    panel.tabIndex = -1;
    panel.innerHTML =
      '<div class="panel-head">' +
        '<p class="coord"><span class="num" id="lesson-panel-no"></span><span id="lesson-panel-label"> / LESSON</span></p>' +
        '<button type="button" class="panel-close">Close &#215;</button>' +
      '</div>' +
      '<h3 id="lesson-panel-title"></h3>' +
      '<div class="lesson-full" id="lesson-panel-body"></div>';
    panel.hidden = true;

    var scrim = document.createElement('div');
    scrim.className = 'panel-scrim';
    scrim.hidden = true;

    document.body.appendChild(scrim);
    document.body.appendChild(panel);

    var closeBtn = panel.querySelector('.panel-close');
    var panelNo = panel.querySelector('#lesson-panel-no');
    var panelTitle = panel.querySelector('#lesson-panel-title');
    var panelBody = panel.querySelector('#lesson-panel-body');
    var lastFocus = null;
    var panelOpen = false;

    function openPanel(lesson) {
      lastFocus = document.activeElement;
      panelNo.textContent = lesson.querySelector('.l-no').textContent;
      panelTitle.textContent = lesson.querySelector('.l-title').textContent;
      panelBody.innerHTML = lesson.querySelector('.lesson-full').innerHTML;
      panel.hidden = false;
      scrim.hidden = false;
      panel.scrollTop = 0;
      document.body.classList.add('panel-open');
      requestAnimationFrame(function () {
        panel.classList.add('is-in');
        scrim.classList.add('is-in');
      });
      panelOpen = true;
      closeBtn.focus();
    }

    function closePanel() {
      if (!panelOpen) return;
      panelOpen = false;
      panel.classList.remove('is-in');
      scrim.classList.remove('is-in');
      document.body.classList.remove('panel-open');
      var done = function () {
        panel.hidden = true;
        scrim.hidden = true;
      };
      if (reducedMotion.matches) done(); else setTimeout(done, 260);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    lessons.forEach(function (lesson) {
      var summary = lesson.querySelector('summary');
      summary.addEventListener('click', function (e) {
        e.preventDefault();               /* keep <details> closed; use the panel */
        if (panelOpen) closePanel(); else openPanel(lesson);
      });
    });

    closeBtn.addEventListener('click', closePanel);
    scrim.addEventListener('click', closePanel);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panelOpen) closePanel();
      if (e.key === 'Tab' && panelOpen) {
        /* modest focus containment across the panel's focusable elements */
        var focusables = panel.querySelectorAll('button, a[href]');
        if (!focusables.length) return;
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

  /* ---- Contact form ----------------------------------------------------------------- */

  var form = document.querySelector('form[name="contact"]');
  if (form) {
    form.setAttribute('novalidate', 'novalidate');
    var confirmBlock = document.getElementById('form-confirm');

    function setError(fieldWrap, input, on) {
      fieldWrap.classList.toggle('has-error', on);
      if (input) input.setAttribute('aria-invalid', on ? 'true' : 'false');
    }

    function validate() {
      var ok = true;
      var firstBad = null;

      var name = form.querySelector('#f-name');
      var nameWrap = name.closest('.field');
      var nameBad = !name.value.trim();
      setError(nameWrap, name, nameBad);
      if (nameBad && !firstBad) firstBad = name;
      ok = ok && !nameBad;

      var email = form.querySelector('#f-email');
      var emailWrap = email.closest('.field');
      var emailBad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      setError(emailWrap, email, emailBad);
      if (emailBad && !firstBad) firstBad = email;
      ok = ok && !emailBad;

      var typeWrap = form.querySelector('#field-type');
      var typeChecked = form.querySelector('input[name="enquiry-type"]:checked');
      setError(typeWrap, null, !typeChecked);
      if (!typeChecked && !firstBad) firstBad = form.querySelector('input[name="enquiry-type"]');
      ok = ok && !!typeChecked;

      var msg = form.querySelector('#f-message');
      var msgWrap = msg.closest('.field');
      var msgBad = !msg.value.trim();
      setError(msgWrap, msg, msgBad);
      if (msgBad && !firstBad) firstBad = msg;
      ok = ok && !msgBad;

      if (!ok && firstBad) firstBad.focus();
      return ok;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) return;
      form.hidden = true;
      if (confirmBlock) {
        confirmBlock.hidden = false;
        confirmBlock.tabIndex = -1;
        confirmBlock.focus();
      }
    });

    /* clear a field's error as soon as it is corrected */
    form.addEventListener('input', function (e) {
      var wrap = e.target.closest('.field');
      if (wrap && wrap.classList.contains('has-error')) {
        if (e.target.type === 'radio') { setError(wrap, null, false); return; }
        if (e.target.value.trim()) setError(wrap, e.target, false);
      }
    });
  }
})();
