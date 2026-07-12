/* 05 · The Whiteboard · one continuous session
   Draw-in strokes, agenda spy, living-photo videos, lessons, form. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Marker strokes: draw once on entry ---------- */
  var drawables = document.querySelectorAll('[data-draw]');
  if ('IntersectionObserver' in window) {
    var drawIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-drawn');
          drawIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4, rootMargin: '0px 0px -6% 0px' });
    drawables.forEach(function (el) { drawIO.observe(el); });
  } else {
    drawables.forEach(function (el) { el.classList.add('is-drawn'); });
  }

  /* ---------- Gentle text reveals ---------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
    reveals.forEach(function (el) { revealIO.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Hero: the strike through "Stuck." ---------- */
  var hero = document.getElementById('first-word');
  if (hero && 'IntersectionObserver' in window) {
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText =
      'position:absolute;top:0;left:0;width:1px;height:90px;pointer-events:none;';
    document.body.style.position = 'relative';
    document.body.appendChild(sentinel);
    var struck = false;
    var strikeIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!struck && !entry.isIntersecting) {
          struck = true;
          hero.classList.add('hero-struck');
          strikeIO.disconnect();
        }
      });
    }, { threshold: 0 });
    strikeIO.observe(sentinel);
  } else if (hero) {
    hero.classList.add('hero-struck');
  }

  /* ---------- Agenda: scrollspy for rail + chip ---------- */
  var sectionIds = ['first-word', 'problem', 'practice', 'resolved', 'words',
    'contexts', 'practitioner', 'in-practice', 'going-further', 'solution'];
  var railItems = document.querySelectorAll('.rail-item');
  var chipNum = document.querySelector('[data-chip-num]');

  function setActive(id) {
    var index = sectionIds.indexOf(id);
    if (index < 0) return;
    railItems.forEach(function (item, i) {
      item.classList.toggle('is-active', i === index);
    });
    if (chipNum) chipNum.textContent = ('0' + (index + 1)).slice(-2);
  }

  if ('IntersectionObserver' in window) {
    var spyIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-38% 0px -52% 0px', threshold: 0 });
    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spyIO.observe(el);
    });
    setActive('first-word');
  }

  /* ---------- Agenda chip + overlay (small screens) ---------- */
  var chip = document.querySelector('.agenda-chip');
  var overlay = document.getElementById('agenda-overlay');
  if (chip && overlay) {
    var closeBtn = overlay.querySelector('.agenda-close');

    function openAgenda() {
      overlay.hidden = false;
      chip.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      var first = overlay.querySelector('a');
      if (first) first.focus();
    }
    function closeAgenda(refocus) {
      overlay.hidden = true;
      chip.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (refocus) chip.focus();
    }

    chip.addEventListener('click', function () {
      if (overlay.hidden) { openAgenda(); } else { closeAgenda(true); }
    });
    closeBtn.addEventListener('click', function () { closeAgenda(true); });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeAgenda(true);
      if (e.target.closest('a')) closeAgenda(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !overlay.hidden) closeAgenda(true);
    });
  }

  /* ---------- Videos: living photos, play only in view ---------- */
  var videos = document.querySelectorAll('video');
  if ('IntersectionObserver' in window) {
    var videoIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (entry.isIntersecting) {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.15 });
    videos.forEach(function (v) { videoIO.observe(v); });
  }

  /* ---------- Lessons: inline accordion, eased ---------- */
  var lessons = document.querySelectorAll('.lesson');
  lessons.forEach(function (lesson) {
    var summary = lesson.querySelector('summary');
    var panel = lesson.querySelector('.lesson-panel');
    var animating = false;

    summary.addEventListener('click', function (e) {
      if (reduceMotion.matches || !panel.animate) return; /* native toggle */
      e.preventDefault();
      if (animating) return;

      if (lesson.open) {
        animating = true;
        var closing = panel.animate(
          [{ height: panel.scrollHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }],
          { duration: 250, easing: 'cubic-bezier(.3,.6,.3,1)' }
        );
        closing.onfinish = function () {
          lesson.open = false;
          animating = false;
        };
      } else {
        lesson.open = true;
        animating = true;
        var opening = panel.animate(
          [{ height: '0px', opacity: 0 }, { height: panel.scrollHeight + 'px', opacity: 1 }],
          { duration: 250, easing: 'cubic-bezier(.3,.6,.3,1)' }
        );
        opening.onfinish = function () { animating = false; };
      }
    });
  });

  /* Escape closes the lesson that has focus */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = document.activeElement && document.activeElement.closest
      ? document.activeElement.closest('details.lesson[open]') : null;
    if (open) {
      open.open = false;
      var s = open.querySelector('summary');
      if (s) s.focus();
    }
  });

  /* ---------- Enquiry form: quiet validation, local confirmation ---------- */
  var form = document.querySelector('form.enquiry');
  if (form) {
    var confirmation = document.querySelector('.confirmation');

    function setError(fieldWrap, errorEl, invalid) {
      errorEl.hidden = !invalid;
      fieldWrap.classList.toggle('is-invalid', invalid);
      var control = fieldWrap.querySelector('input:not([type="hidden"]), textarea');
      if (control) control.setAttribute('aria-invalid', invalid ? 'true' : 'false');
    }

    function validate(focusFirst) {
      var ok = true;
      var firstBad = null;

      var nameWrap = form.querySelector('#f-name').closest('.field');
      var nameBad = form.querySelector('#f-name').value.trim() === '';
      setError(nameWrap, document.getElementById('err-name'), nameBad);
      if (nameBad) { ok = false; firstBad = firstBad || form.querySelector('#f-name'); }

      var emailEl = form.querySelector('#f-email');
      var emailBad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim());
      setError(emailEl.closest('.field'), document.getElementById('err-email'), emailBad);
      if (emailBad) { ok = false; firstBad = firstBad || emailEl; }

      var typeWrap = form.querySelector('.field-radios');
      var typeBad = !form.querySelector('input[name="enquiry-type"]:checked');
      document.getElementById('err-type').hidden = !typeBad;
      typeWrap.classList.toggle('is-invalid', typeBad);
      if (typeBad) { ok = false; firstBad = firstBad || form.querySelector('input[name="enquiry-type"]'); }

      var msgEl = form.querySelector('#f-message');
      var msgBad = msgEl.value.trim() === '';
      setError(msgEl.closest('.field'), document.getElementById('err-message'), msgBad);
      if (msgBad) { ok = false; firstBad = firstBad || msgEl; }

      if (!ok && focusFirst && firstBad) firstBad.focus();
      return ok;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(true)) return;
      form.hidden = true;
      var prompt = document.querySelector('.form-prompt');
      if (prompt) prompt.hidden = true;
      confirmation.hidden = false;
      confirmation.focus();
    });

    /* clear errors quietly as they are fixed */
    form.addEventListener('input', function (e) {
      var wrap = e.target.closest('.field');
      if (!wrap || !wrap.classList.contains('is-invalid')) return;
      validate(false);
    });
  }
})();
