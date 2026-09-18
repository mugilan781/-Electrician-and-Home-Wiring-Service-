/* ============================================================
   ElectraPro — Authentication JS (Login / Signup)
   Vanilla JS. Frontend validation only (no backend).
   - Applies stored theme (ep_theme) + direction (ep_dir)
   - Password visibility toggles
   - Email / password / name validation with .form-error
   - Simulated submit -> toast + redirect to index.html
   ============================================================ */
'use strict';

(function () {
  /* ── Apply stored theme + direction early (auth pages are standalone,
        they don't load components.js, so sync here) ── */
  try {
    var savedTheme = localStorage.getItem('ep_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  } catch (e) { /* private mode */ }
  try {
    var savedDir = localStorage.getItem('ep_dir') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
    document.documentElement.setAttribute('lang', 'en');
  } catch (e) { /* private mode */ }

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ── Minimal toast (mirrors main.js toast styling) ── */
  function showAuthToast(msg, type) {
    var existing = document.querySelector('.toast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.className = 'toast ' + (type || 'info');
    toast.setAttribute('role', 'status');
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { toast.classList.add('show'); });
    });
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 400);
    }, 3500);
  }

  /* ── Password visibility toggles ── */
  $all('[data-pass-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-pass-toggle');
      var input = document.getElementById(targetId);
      if (!input) return;
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      btn.setAttribute('aria-pressed', show ? 'true' : 'false');
      var eyeOpen = btn.querySelector('.eye-open');
      var eyeOff = btn.querySelector('.eye-off');
      if (eyeOpen && eyeOff) {
        eyeOpen.style.display = show ? 'none' : '';
        eyeOff.style.display = show ? '' : 'none';
      }
      input.focus({ preventScroll: true });
    });
  });

  /* ── Field helpers ── */
  function setError(input, message) {
    input.classList.toggle('error', !!message);
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    var wrap = input.closest('.form-group');
    var err = wrap ? wrap.querySelector('.form-error') : null;
    if (err) err.textContent = message || '';
    return !message;
  }

  function validateEmail(input) {
    var v = input.value.trim();
    if (!v) return setError(input, 'Email address is required.');
    if (!EMAIL_RE.test(v)) return setError(input, 'Please enter a valid email address.');
    return setError(input, '');
  }

  function validatePassword(input, min) {
    var v = input.value;
    if (!v) return setError(input, 'Password is required.');
    if (v.length < (min || 6)) return setError(input, 'Password must be at least ' + (min || 6) + ' characters.');
    return setError(input, '');
  }

  function liveValidate(input, fn) {
    input.addEventListener('blur', fn);
    input.addEventListener('input', function () {
      if (input.classList.contains('error')) fn();
    });
  }

  /* ── LOGIN form ── */
  var loginForm = $('#login-form');
  if (loginForm) {
    var loginEmail = $('#login-email');
    var loginPass = $('#login-password');
    var loginStatus = $('#login-status');

    if (loginEmail) liveValidate(loginEmail, function () { return validateEmail(loginEmail); });
    if (loginPass) liveValidate(loginPass, function () {
      var v = loginPass.value;
      if (!v) return setError(loginPass, 'Password is required.');
      return setError(loginPass, '');
    });

    // Prefill remembered email (frontend-only convenience)
    try {
      var remembered = localStorage.getItem('ep_remember_email');
      if (remembered && loginEmail && !loginEmail.value) {
        loginEmail.value = remembered;
        var rememberBox = $('#login-remember');
        if (rememberBox) rememberBox.checked = true;
      }
    } catch (e) { /* ignore */ }

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var okEmail = validateEmail(loginEmail);
      var passVal = loginPass.value;
      var okPass = passVal ? setError(loginPass, '') : setError(loginPass, 'Password is required.');
      if (loginStatus) { loginStatus.className = 'auth-status'; loginStatus.textContent = ''; }

      if (!okEmail || !okPass) {
        var firstBad = !okEmail ? loginEmail : loginPass;
        if (firstBad) firstBad.focus();
        return;
      }

      var btn = loginForm.querySelector('[type="submit"]');
      var original = btn ? btn.innerHTML : '';
      if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Signing in…'; }

      try {
        var rememberBox = $('#login-remember');
        if (rememberBox && rememberBox.checked) {
          localStorage.setItem('ep_remember_email', loginEmail.value.trim());
        } else {
          localStorage.removeItem('ep_remember_email');
        }
      } catch (err) { /* ignore */ }

      setTimeout(function () {
        showAuthToast('Welcome back! Signed in successfully.', 'success');
        if (loginStatus) {
          loginStatus.textContent = 'Signed in successfully. Redirecting…';
          loginStatus.className = 'auth-status show auth-status--success';
        }
        setTimeout(function () { window.location.href = 'index.html'; }, 900);
        if (btn) { btn.disabled = false; btn.innerHTML = original; }
      }, 900);
    });
  }

  /* ── SIGNUP form ── */
  var signupForm = $('#signup-form');
  if (signupForm) {
    var suName = $('#signup-name');
    var suEmail = $('#signup-email');
    var suPass = $('#signup-password');
    var suConfirm = $('#signup-confirm');
    var suTerms = $('#signup-terms');
    var suStatus = $('#signup-status');

    if (suName) liveValidate(suName, function () {
      var v = suName.value.trim();
      if (!v) return setError(suName, 'Full name is required.');
      if (v.length < 2) return setError(suName, 'Please enter your full name.');
      return setError(suName, '');
    });
    if (suEmail) liveValidate(suEmail, function () { return validateEmail(suEmail); });
    if (suPass) liveValidate(suPass, function () { return validatePassword(suPass, 6); });
    if (suConfirm && suPass) liveValidate(suConfirm, function () {
      var v = suConfirm.value;
      if (!v) return setError(suConfirm, 'Please confirm your password.');
      if (v !== suPass.value) return setError(suConfirm, 'Passwords do not match.');
      return setError(suConfirm, '');
    });

    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var vName = (function () {
        var v = suName.value.trim();
        if (!v) return setError(suName, 'Full name is required.');
        if (v.length < 2) return setError(suName, 'Please enter your full name.');
        return setError(suName, '');
      })();
      var vEmail = validateEmail(suEmail);
      var vPass = validatePassword(suPass, 6);
      var vConfirm = (function () {
        var v = suConfirm.value;
        if (!v) return setError(suConfirm, 'Please confirm your password.');
        if (v !== suPass.value) return setError(suConfirm, 'Passwords do not match.');
        return setError(suConfirm, '');
      })();
      var vTerms = true;
      if (!suTerms.checked) {
        vTerms = false;
        showAuthToast('Please accept the Terms & Privacy Policy to continue.', 'error');
        suTerms.focus();
      }
      if (suStatus) { suStatus.className = 'auth-status'; suStatus.textContent = ''; }

      var firstBad = !vName ? suName : (!vEmail ? suEmail : (!vPass ? suPass : (!vConfirm ? suConfirm : null)));
      if (firstBad) { firstBad.focus(); return; }
      if (!vTerms) return;

      var btn = signupForm.querySelector('[type="submit"]');
      var original = btn ? btn.innerHTML : '';
      if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Creating account…'; }

      setTimeout(function () {
        showAuthToast('Account created successfully. Welcome to ElectraPro!', 'success');
        if (suStatus) {
          suStatus.textContent = 'Account created successfully. Redirecting…';
          suStatus.className = 'auth-status show auth-status--success';
        }
        setTimeout(function () { window.location.href = 'index.html'; }, 900);
        if (btn) { btn.disabled = false; btn.innerHTML = original; }
      }, 900);
    });
  }

  /* ── Social buttons (frontend UI only — no real OAuth) ── */
  $all('[data-social]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var provider = btn.getAttribute('data-social') || 'Social';
      showAuthToast(provider + ' sign-in is not connected yet. Please use email instead.', 'info');
    });
  });

  /* ── Forgot password placeholder ── */
  $all('[data-forgot]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      showAuthToast('Password recovery is not available yet. Please contact support at 1-800-555-0199.', 'info');
    });
  });
})();
