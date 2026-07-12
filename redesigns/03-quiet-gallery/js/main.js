/* THE QUIET GALLERY - small, vanilla, progressive */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Entry fades: works and wall texts drift in once ---------- */
  var revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealables.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Videos: play only while hung in view ---------- */
  var videos = document.querySelectorAll('video[autoplay]');
  if ('IntersectionObserver' in window && videos.length) {
    var videoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (entry.isIntersecting) {
          var p = v.play();
          if (p && p.catch) { p.catch(function () {}); }
        } else {
          v.pause();
        }
      });
    }, { rootMargin: '80px 0px', threshold: 0.1 });
    videos.forEach(function (v) { videoObserver.observe(v); });
  }

  /* ---------- Lesson lightbox (In Practice) ---------- */
  var lightbox = document.getElementById('lesson-lightbox');
  if (lightbox) {
    var lbNo = lightbox.querySelector('.cat-no');
    var lbTitle = lightbox.querySelector('.cat-title');
    var lbBody = lightbox.querySelector('.lb-body');
    var closeBtn = lightbox.querySelector('.lightbox__close');
    var lastOpener = null;
    var supportsDialog = typeof lightbox.showModal === 'function';

    function openLesson(btn) {
      var entry = btn.closest('.cat-entry');
      if (!entry) { return; }
      lbNo.textContent = entry.querySelector('.cat-no').textContent;
      lbTitle.textContent = entry.querySelector('.cat-title').textContent;
      lbBody.innerHTML = entry.querySelector('.cat-full').innerHTML;
      lastOpener = btn;
      if (supportsDialog) {
        lightbox.showModal();
      } else {
        lightbox.setAttribute('open', '');
      }
      document.body.classList.add('lightbox-open');
      lightbox.scrollTop = 0;
      closeBtn.focus();
    }

    function closeLesson() {
      if (supportsDialog && lightbox.open) {
        lightbox.close();
      } else {
        lightbox.removeAttribute('open');
      }
    }

    function onClosed() {
      document.body.classList.remove('lightbox-open');
      if (lastOpener) { lastOpener.focus(); lastOpener = null; }
    }

    document.querySelectorAll('.cat-open').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (lightbox.open || lightbox.hasAttribute('open')) {
          closeLesson();
        } else {
          openLesson(btn);
        }
      });
    });

    closeBtn.addEventListener('click', closeLesson);
    lightbox.addEventListener('close', onClosed);
    lightbox.addEventListener('cancel', function () { /* Escape: allow default close */ });
    if (!supportsDialog) {
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.hasAttribute('open')) {
          closeLesson();
          onClosed();
        }
      });
    }
    /* Click on the wall (outside the text column) closes */
    lightbox.addEventListener('click', function (e) {
      if (!e.target.closest('.lightbox__inner') && !e.target.closest('.lightbox__close')) {
        closeLesson();
        if (!supportsDialog) { onClosed(); }
      }
    });
  }

  /* ---------- Contact form: quiet validation, local confirmation ---------- */
  var form = document.querySelector('form[name="contact"]');
  if (form) {
    form.setAttribute('novalidate', 'novalidate');
    var confirmBlock = document.getElementById('form-confirmation');

    function setFieldState(fieldWrap, invalid) {
      fieldWrap.classList.toggle('is-invalid', invalid);
      var control = fieldWrap.querySelector('input, textarea');
      if (control) { control.setAttribute('aria-invalid', invalid ? 'true' : 'false'); }
    }

    function validate() {
      var ok = true;
      var firstBad = null;

      var nameWrap = document.getElementById('field-name');
      var nameInput = form.querySelector('#f-name');
      var nameBad = nameInput.value.trim() === '';
      setFieldState(nameWrap, nameBad);
      if (nameBad) { ok = false; firstBad = firstBad || nameInput; }

      var emailWrap = document.getElementById('field-email');
      var emailInput = form.querySelector('#f-email');
      var emailBad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
      setFieldState(emailWrap, emailBad);
      if (emailBad) { ok = false; firstBad = firstBad || emailInput; }

      var typeWrap = document.getElementById('field-type');
      var typeChecked = form.querySelector('input[name="enquiry-type"]:checked');
      typeWrap.classList.toggle('is-invalid', !typeChecked);
      if (!typeChecked) {
        ok = false;
        firstBad = firstBad || form.querySelector('input[name="enquiry-type"]');
      }

      var msgWrap = document.getElementById('field-message');
      var msgInput = form.querySelector('#f-message');
      var msgBad = msgInput.value.trim() === '';
      setFieldState(msgWrap, msgBad);
      if (msgBad) { ok = false; firstBad = firstBad || msgInput; }

      if (firstBad) { firstBad.focus(); }
      return ok;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) { return; }
      form.hidden = true;
      if (confirmBlock) {
        confirmBlock.hidden = false;
        confirmBlock.setAttribute('tabindex', '-1');
        confirmBlock.focus();
      }
    });

    /* Clear an error as soon as the visitor corrects it */
    form.addEventListener('input', function (e) {
      var wrap = e.target.closest('.field.is-invalid');
      if (wrap) { wrap.classList.remove('is-invalid'); }
    });
    form.addEventListener('change', function (e) {
      if (e.target.name === 'enquiry-type') {
        document.getElementById('field-type').classList.remove('is-invalid');
      }
    });
  }
})();
