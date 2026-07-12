/* Catalyst Growth Coaching · The Broadsheet
   Small, vanilla, progressive. Nothing here is required to read the paper. */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* ------------------------------------------------------------------
     Sections menu (small screens). Button is hidden without JS;
     the nav list simply shows in full.
  ------------------------------------------------------------------ */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.paper-nav');
  if (toggle && nav) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     Living photographs: pause when out of view, resume when visible.
     Honour reduced motion by leaving them on their poster frame.
  ------------------------------------------------------------------ */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var videos = Array.prototype.slice.call(document.querySelectorAll('video'));

  if (reduceMotion.matches) {
    videos.forEach(function (v) {
      v.removeAttribute('autoplay');
      v.pause();
    });
  } else if ('IntersectionObserver' in window && videos.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (entry.isIntersecting) {
          var p = v.play();
          if (p && p.catch) { p.catch(function () {}); }
        } else {
          v.pause();
        }
      });
    }, { rootMargin: '80px 0px' });
    videos.forEach(function (v) { io.observe(v); });
  }

  /* ------------------------------------------------------------------
     Contact form: quiet inline validation, local confirmation.
     Without JS, native `required` validation still applies.
  ------------------------------------------------------------------ */
  var form = document.querySelector('form[name="contact"]');
  if (form) {
    form.setAttribute('novalidate', 'novalidate');

    function fieldWrap(el) {
      return el.closest('.form-field, .form-fieldset');
    }
    function setInvalid(el, invalid) {
      var wrap = fieldWrap(el);
      if (!wrap) { return; }
      wrap.classList.toggle('is-invalid', invalid);
      if (el.type !== 'radio') {
        el.setAttribute('aria-invalid', invalid ? 'true' : 'false');
      }
    }
    function validEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    function checkField(el) {
      if (el.type === 'radio') {
        var group = form.querySelectorAll('input[name="' + el.name + '"]');
        var chosen = Array.prototype.some.call(group, function (r) { return r.checked; });
        setInvalid(el, !chosen);
        return chosen;
      }
      var value = el.value.trim();
      var ok = value !== '';
      if (ok && el.type === 'email') { ok = validEmail(value); }
      setInvalid(el, !ok);
      return ok;
    }

    var fields = Array.prototype.slice.call(
      form.querySelectorAll('input[required], textarea[required]')
    );

    fields.forEach(function (el) {
      var evt = el.type === 'radio' ? 'change' : 'blur';
      el.addEventListener(evt, function () {
        var wrap = fieldWrap(el);
        if (wrap && wrap.classList.contains('is-invalid')) { checkField(el); }
        if (el.type === 'radio') { checkField(el); }
      });
      if (el.type !== 'radio') {
        el.addEventListener('input', function () {
          var wrap = fieldWrap(el);
          if (wrap && wrap.classList.contains('is-invalid')) { checkField(el); }
        });
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      var seenRadio = {};
      fields.forEach(function (el) {
        if (el.type === 'radio') {
          if (seenRadio[el.name]) { return; }
          seenRadio[el.name] = true;
        }
        if (!checkField(el) && !firstBad) { firstBad = el; }
      });
      if (firstBad) {
        firstBad.focus();
        return;
      }
      form.hidden = true;
      var confirmation = document.getElementById('form-confirmation');
      if (confirmation) {
        confirmation.hidden = false;
        confirmation.setAttribute('tabindex', '-1');
        confirmation.focus();
      }
    });
  }
})();
