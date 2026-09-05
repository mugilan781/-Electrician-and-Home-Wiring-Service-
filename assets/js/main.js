/* ============================================================
   ElectraPro — Main JavaScript (ES6)
   ============================================================ */
'use strict';

/* ── ██ UTILS ██ ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const on = (el, ev, fn) => el && el.addEventListener(ev, fn);
const off = (el, ev, fn) => el && el.removeEventListener(ev, fn);
const debounce = (fn, ms = 100) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

/* ── ██ THEME (Dark / Light) ██ ── */
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('ep_theme') || 'dark';
    this.init();
  }
  init() {
    this.apply();
    $$('[data-theme-toggle]').forEach(btn => on(btn, 'click', () => this.toggle()));
  }
  apply() {
    document.documentElement.setAttribute('data-theme', this.theme);
    $$('[data-theme-toggle]').forEach(btn => {
      btn.setAttribute('aria-label', this.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.innerHTML = this.theme === 'dark'
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    });
  }
  toggle() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('ep_theme', this.theme);
    this.apply();
  }
}

/* ── ██ RTL TOGGLE ██ ── */
class RTLManager {
  constructor() {
    this.dir = localStorage.getItem('ep_dir') || 'ltr';
    this.init();
  }
  init() {
    this.apply();
    $$('[data-rtl-toggle]').forEach(btn => on(btn, 'click', () => this.toggle()));
  }
  apply() {
    document.documentElement.setAttribute('dir', this.dir);
    $$('[data-rtl-toggle]').forEach(btn => {
      btn.setAttribute('aria-label', this.dir === 'ltr' ? 'Switch to RTL' : 'Switch to LTR');
      btn.textContent = this.dir === 'ltr' ? 'RTL' : 'LTR';
    });
  }
  toggle() {
    this.dir = this.dir === 'ltr' ? 'rtl' : 'ltr';
    localStorage.setItem('ep_dir', this.dir);
    this.apply();
  }
}

/* ── ██ NAVBAR ██ ── */
class Navbar {
  constructor() {
    this.nav = $('#navbar');
    this.hamburger = $('#hamburger');
    this.mobileNav = $('#mobile-nav');
    this.scrollY = 0;
    this.init();
  }
  init() {
    if (!this.nav) return;
    on(window, 'scroll', debounce(() => this.onScroll(), 10));
    on(this.hamburger, 'click', () => this.toggleMobile());
    // Close mobile nav on outside click
    on(document, 'click', e => {
      if (this.mobileNav?.classList.contains('open') &&
          !this.mobileNav.contains(e.target) &&
          !this.hamburger?.contains(e.target)) {
        this.closeMobile();
      }
    });
    this.setActive();
  }
  onScroll() {
    const y = window.scrollY;
    if (y > 60) { this.nav.classList.add('scrolled'); }
    else { this.nav.classList.remove('scrolled'); }
    this.scrollY = y;
  }
  toggleMobile() {
    const open = this.mobileNav?.classList.toggle('open');
    this.hamburger?.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  closeMobile() {
    this.mobileNav?.classList.remove('open');
    this.hamburger?.classList.remove('active');
    document.body.style.overflow = '';
  }
  setActive() {
    let path = location.pathname.split('/').pop() || 'index.html';
    if (!path.endsWith('.html')) path = 'index.html';
    $$('.nav-link, .mobile-nav-links a').forEach(a => {
      const href = a.getAttribute('href')?.split('?')[0].split('#')[0];
      if (!href) return;
      if (href === path || (path === 'blog-details.html' && href === 'blog.html')) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }
}

/* ── ██ SCROLL REVEAL ██ ── */
class ScrollReveal {
  constructor() {
    this.els = $$('.reveal, .reveal-left, .reveal-right');
    this.init();
  }
  init() {
    if (!this.els.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    this.els.forEach(el => observer.observe(el));
  }
}

/* ── ██ ANIMATED COUNTERS ██ ── */
class CounterAnimation {
  constructor() {
    this.els = $$('[data-counter]');
    this.init();
  }
  init() {
    if (!this.els.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          this.animateCounter(e.target);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    this.els.forEach(el => observer.observe(el));
  }
  animateCounter(el) {
    const target = parseFloat(el.dataset.counter);
    const duration = parseInt(el.dataset.duration || 2000);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const start = performance.now();
    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = (target * eased).toFixed(decimals);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}

/* ── ██ ACCORDION / FAQ ██ ── */
class Accordion {
  constructor(containerSel = '.accordion') {
    this.containers = $$(containerSel);
    this.init();
  }
  init() {
    this.containers.forEach(container => {
      const items = $$('.accordion-item', container);
      items.forEach(item => {
        const header = $('.accordion-header', item);
        on(header, 'click', () => this.toggle(item, items));
      });
    });
  }
  toggle(item, siblings) {
    const isOpen = item.classList.contains('active');
    // Close all
    siblings.forEach(s => s.classList.remove('active'));
    if (!isOpen) item.classList.add('active');
  }
}

/* ── ██ HERO SLIDER ██ ── */
class HeroSlider {
  constructor(sel = '#hero-slider') {
    this.slider = $(sel);
    if (!this.slider) return;
    this.slides = $$('.hero-slide', this.slider);
    this.dots = $$('.hero-dot', this.slider);
    this.current = 0;
    this.interval = null;
    this.init();
  }
  init() {
    if (this.slides.length < 2) return;
    this.dots.forEach((dot, i) => on(dot, 'click', () => this.goTo(i)));
    this.startAuto();
    on(this.slider, 'mouseenter', () => this.stopAuto());
    on(this.slider, 'mouseleave', () => this.startAuto());
    // Touch support
    let touchStartX = 0;
    on(this.slider, 'touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    on(this.slider, 'touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) dx < 0 ? this.next() : this.prev();
    });
    this.update();
  }
  goTo(idx) {
    this.current = (idx + this.slides.length) % this.slides.length;
    this.update();
  }
  next() { this.goTo(this.current + 1); }
  prev() { this.goTo(this.current - 1); }
  update() {
    this.slides.forEach((s, i) => s.classList.toggle('active', i === this.current));
    this.dots.forEach((d, i) => d.classList.toggle('active', i === this.current));
  }
  startAuto() { this.interval = setInterval(() => this.next(), 5500); }
  stopAuto() { clearInterval(this.interval); }
}

/* ── ██ TESTIMONIAL SLIDER ██ ── */
class Slider {
  constructor(sel) {
    this.container = $(sel);
    if (!this.container) return;
    this.track = $('.slider-track', this.container);
    this.slides = $$('.slider-slide', this.container);
    this.prevBtn = $('.slider-prev', this.container);
    this.nextBtn = $('.slider-next', this.container);
    this.dotsContainer = $('.slider-dots', this.container);
    this.current = 0;
    this.total = this.slides.length;
    this.init();
  }
  init() {
    if (!this.track || this.total < 2) return;
    if (this.dotsContainer) this.buildDots();
    on(this.prevBtn, 'click', () => this.go(this.current - 1));
    on(this.nextBtn, 'click', () => this.go(this.current + 1));
    // Touch
    let startX = 0;
    on(this.track, 'touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    on(this.track, 'touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) dx < 0 ? this.go(this.current + 1) : this.go(this.current - 1);
    });
    this.update();
    this.autoPlay = setInterval(() => this.go(this.current + 1), 6000);
    on(this.container, 'mouseenter', () => clearInterval(this.autoPlay));
  }
  buildDots() {
    for (let i = 0; i < this.total; i++) {
      const d = document.createElement('button');
      d.className = 'hero-dot';
      d.setAttribute('aria-label', `Slide ${i + 1}`);
      on(d, 'click', () => this.go(i));
      this.dotsContainer.appendChild(d);
    }
    this.dots = $$('.hero-dot', this.dotsContainer);
  }
  go(idx) {
    this.current = (idx + this.total) % this.total;
    this.update();
  }
  update() {
    this.track.style.transform = `translateX(-${this.current * 100}%)`;
    this.dots?.forEach((d, i) => d.classList.toggle('active', i === this.current));
  }
}

/* ── ██ FORM VALIDATION ██ ── */
class FormValidator {
  constructor(formSel) {
    this.forms = $$(formSel);
    this.init();
  }
  init() {
    this.forms.forEach(form => {
      on(form, 'submit', e => this.handleSubmit(e, form));
      // Real-time validation
      $$('[data-validate]', form).forEach(field => {
        on(field, 'blur', () => this.validateField(field));
        on(field, 'input', () => {
          if (field.classList.contains('error')) this.validateField(field);
        });
      });
    });
  }
  validateField(field) {
    const rules = field.dataset.validate?.split(',') || [];
    const value = field.value.trim();
    let error = '';
    if (rules.includes('required') && !value) error = 'This field is required.';
    else if (rules.includes('email') && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email address.';
    else if (rules.includes('phone') && value && !/^\+?[\d\s\-\(\)]{7,}$/.test(value)) error = 'Please enter a valid phone number.';
    else if (rules.includes('minlength') && value.length < 10) error = 'Minimum 10 characters required.';
    field.classList.toggle('error', !!error);
    const errorEl = field.nextElementSibling;
    if (errorEl?.classList.contains('form-error')) errorEl.textContent = error;
    return !error;
  }
  handleSubmit(e, form) {
    e.preventDefault();
    const fields = $$('[data-validate]', form);
    const valid = fields.every(f => this.validateField(f));
    if (!valid) {
      fields.find(f => f.classList.contains('error'))?.focus();
      return;
    }
    this.submitForm(form);
  }
  submitForm(form) {
    const btn = $('[type="submit"]', form);
    if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> Sending…'; }
    // Simulate submission
    setTimeout(() => {
      showToast('Message sent successfully! We\'ll be in touch shortly.', 'success');
      form.reset();
      if (btn) { btn.disabled = false; btn.innerHTML = btn.dataset.original || 'Submit'; }
    }, 1800);
  }
}

/* ── ██ BACK TO TOP ██ ── */
class BackToTop {
  constructor() {
    this.btn = $('#back-to-top');
    this.init();
  }
  init() {
    if (!this.btn) return;
    on(window, 'scroll', debounce(() => {
      this.btn.classList.toggle('visible', window.scrollY > 300);
    }, 50));
    on(this.btn, 'click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}

/* ── ██ TOAST NOTIFICATION ██ ── */
function showToast(msg, type = 'info', duration = 4000) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => { requestAnimationFrame(() => { toast.classList.add('show'); }); });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}
window.showToast = showToast;

/* ── ██ PROGRESS BARS ██ ── */
class ProgressBars {
  constructor() {
    this.bars = $$('[data-progress]');
    this.init();
  }
  init() {
    if (!this.bars.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const bar = $('.progress-bar', e.target.closest('.progress-item') || e.target.parentElement);
          if (bar) { bar.style.width = e.target.dataset.progress + '%'; }
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    this.bars.forEach(b => observer.observe(b));
  }
}

/* ── ██ STICKY HEADER ── */
function initStickyNavbar() {
  const nav = $('#navbar');
  if (!nav) return;
  const navHeight = nav.offsetHeight;
  document.documentElement.style.setProperty('--nav-height', navHeight + 'px');
}

/* ── ██ SMOOTH PAGE TRANSITIONS ── */
function initPageTransitions() {
  const overlay = document.createElement('div');
  overlay.className = 'page-transition';
  document.body.appendChild(overlay);

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      overlay.classList.add('entering');
      setTimeout(() => { window.location.href = href; }, 350);
    });
  });

  // Fade out on load
  setTimeout(() => { overlay.classList.add('leaving'); setTimeout(() => overlay.classList.remove('entering', 'leaving'), 500); }, 50);
}

/* ── ██ IMAGE LAZY LOADING ── */
function initLazyImages() {
  const imgs = $$('img[data-src]');
  if (!imgs.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.src = e.target.dataset.src;
        observer.unobserve(e.target);
      }
    });
  }, { rootMargin: '200px' });
  imgs.forEach(img => observer.observe(img));
}

/* ── ██ MOBILE NAV CLOSE ON LINK ── */
function initMobileNavClose() {
  const mobileNav = $('#mobile-nav');
  const hamburger = $('#hamburger');
  $$('.mobile-nav-links a').forEach(a => {
    on(a, 'click', () => {
      mobileNav?.classList.remove('open');
      hamburger?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ── ██ TAB SYSTEM ── */
class Tabs {
  constructor(containerSel = '.tabs') {
    this.containers = $$(containerSel);
    this.init();
  }
  init() {
    this.containers.forEach(container => {
      const triggers = $$('[data-tab]', container);
      triggers.forEach(trigger => {
        on(trigger, 'click', () => {
          const tabId = trigger.dataset.tab;
          triggers.forEach(t => t.classList.remove('active'));
          $$('[data-tab-content]', container).forEach(c => c.classList.remove('active'));
          trigger.classList.add('active');
          $(`[data-tab-content="${tabId}"]`, container)?.classList.add('active');
        });
      });
      triggers[0]?.click();
    });
  }
}

/* ── ██ PRICING TOGGLE (Monthly/Annual) ── */
class PricingToggle {
  constructor() {
    this.toggle = $('#pricing-toggle');
    this.init();
  }
  init() {
    if (!this.toggle) return;
    on(this.toggle, 'change', () => {
      const annual = this.toggle.checked;
      $$('[data-monthly]').forEach(el => {
        const monthly = el.dataset.monthly;
        const annualVal = el.dataset.annual;
        el.textContent = annual ? annualVal : monthly;
      });
    });
  }
}

/* ── ██ COPY TO CLIPBOARD ── */
function initCopyButtons() {
  $$('[data-copy]').forEach(btn => {
    on(btn, 'click', () => {
      const text = btn.dataset.copy;
      navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!', 'success', 2000);
      });
    });
  });
}

/* ── ██ SMOOTH ANCHOR SCROLL ── */
function initSmoothAnchors() {
  $$('a[href^="#"]').forEach(a => {
    on(a, 'click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 80;
        const y = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
}

/* ── ██ INIT ALL ██ ── */
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new RTLManager();
  new Navbar();
  new ScrollReveal();
  new CounterAnimation();
  new Accordion('.accordion');
  new HeroSlider('#hero-slider');
  new Slider('#testimonial-slider');
  new FormValidator('.needs-validation');
  new BackToTop();
  new ProgressBars();
  new Tabs();
  new PricingToggle();
  initStickyNavbar();
  initMobileNavClose();
  initLazyImages();
  initCopyButtons();
  initSmoothAnchors();
  // Page transitions last
  setTimeout(initPageTransitions, 100);
});
