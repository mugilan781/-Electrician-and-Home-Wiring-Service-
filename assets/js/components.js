/* ============================================================
   ElectraPro — Shared Components (Navbar + Footer)
   Injected dynamically into every page
   ============================================================ */
'use strict';

const NAV_HTML = `
<nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
  <div class="container">
    <div class="navbar-inner">
      <!-- Logo -->
      <a href="index.html" class="navbar-logo" aria-label="ElectraPro Home">
        <div class="navbar-logo__icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#101C2C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>
        <div>
          <span class="navbar-logo__text">ElectraPro</span>
          <span class="navbar-logo__sub">Electrical Services</span>
        </div>
      </a>

      <!-- Desktop Nav Links -->
      <ul class="nav-links" role="list">
        <li class="nav-item">
          <a href="index.html" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a href="home2.html" class="nav-link">Home 2</a>
        </li>
        <li class="nav-item">
          <a href="about.html" class="nav-link">About</a>
        </li>
        <li class="nav-item">
          <a href="services.html" class="nav-link">Services</a>
        </li>
        <li class="nav-item">
          <a href="pricing.html" class="nav-link">Pricing</a>
        </li>
        <li class="nav-item">
          <a href="blog.html" class="nav-link">Blog</a>
        </li>
        <li class="nav-item">
          <a href="contact.html" class="nav-link">Contact</a>
        </li>
      </ul>

      <!-- Actions -->
      <div class="navbar-actions">
        <button class="navbar-toggle-btn" data-theme-toggle aria-label="Toggle theme" title="Toggle dark/light mode"></button>
        <button class="navbar-toggle-btn" data-rtl-toggle aria-label="Toggle RTL" style="font-size:0.6875rem;font-weight:700;letter-spacing:0.05em;">LTR</button>
        <a href="contact.html" class="btn btn-primary btn-sm" aria-label="Book a service">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px;" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Book Now
        </a>
        <button class="hamburger" id="hamburger" aria-label="Toggle navigation" aria-expanded="false" aria-controls="mobile-nav">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </div>
</nav>

<!-- Mobile Nav -->
<div class="mobile-nav" id="mobile-nav" role="dialog" aria-label="Mobile navigation">
  <nav class="mobile-nav-links" aria-label="Mobile menu">
    <a href="index.html">Home</a>
    <a href="home2.html">Home 2</a>
    <a href="about.html">About</a>
    <a href="services.html">Services</a>
    <a href="pricing.html">Pricing</a>
    <a href="blog.html">Blog</a>
    <a href="contact.html">Contact</a>
  </nav>
  <div class="mobile-nav-actions">
    <a href="contact.html" class="btn btn-primary" style="width:100%;justify-content:center;">Book Now</a>
    <a href="tel:+18005550199" class="btn btn-outline" style="width:100%;justify-content:center;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91A16 16 0 0 0 14 15l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 16l.42.92z"/></svg>Call 1-800-555-0199</a>
  </div>
</div>
`;

const FOOTER_HTML = `
<footer class="footer" role="contentinfo">
  <div class="footer-top">
    <div class="container">
      <div class="footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <a href="index.html" class="navbar-logo" aria-label="ElectraPro Home">
            <div class="navbar-logo__icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#101C2C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <div>
              <span class="navbar-logo__text">ElectraPro</span>
              <span class="navbar-logo__sub">Electrical Services</span>
            </div>
          </a>
          <p>Premium residential electrical services with 15+ years of expertise. Licensed, insured, and available 24/7 for emergencies across the greater metro area.</p>
          <div class="footer-social" role="list" aria-label="Social media links">
            <a href="#" class="social-link" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter/X">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
            </a>
          </div>
        </div>

        <!-- Services -->
        <div>
          <h3 class="footer-col-title">Services</h3>
          <ul class="footer-links">
            <li><a href="services.html">Home Wiring</a></li>
            <li><a href="services.html">Circuit Breaker Installation</a></li>
            <li><a href="services.html">Lighting Fitting</a></li>
            <li><a href="services.html">Fan Installation</a></li>
            <li><a href="services.html">Panel Upgrades</a></li>
            <li><a href="services.html">Switchboard Repair</a></li>
            <li><a href="emergency.html">Emergency Service</a></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="footer-col-title">Company</h3>
          <ul class="footer-links">
            <li><a href="about.html">About Us</a></li>
            <li><a href="pricing.html">Pricing Guide</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="privacy.html">Privacy Policy</a></li>
            <li><a href="terms.html">Terms &amp; Conditions</a></li>
            <li><a href="sitemap.html">Sitemap</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="footer-col-title">Contact</h3>
          <div class="footer-contact">
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.1.88.3 1.74.61 2.57a2 2 0 0 1-.45 2.11L7.91 8.91A16 16 0 0 0 15 15l.91-.91a2 2 0 0 1 2.11-.45c.83.31 1.69.51 2.57.61A2 2 0 0 1 22.28 16l-.28.92z"/></svg>
              <div>
                <div style="color:rgba(255,255,255,.9);font-weight:600;">1-800-555-0199</div>
                <div style="font-size:0.8125rem;">24/7 Emergency Line</div>
              </div>
            </div>
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <div>info@electrapro.com</div>
            </div>
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <div>123 Volt Avenue, Suite 400<br>Metro City, MC 10001</div>
            </div>
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <div>Mon–Fri: 7am–7pm<br>Sat–Sun: 8am–5pm<br>Emergency: 24/7</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="container">
      <div class="footer-bottom-inner">
        <p class="footer-copy">© 2026 ElectraPro Electrical Services. All rights reserved.</p>
        <nav class="footer-legal" aria-label="Legal links">
          <a href="privacy.html">Privacy Policy</a>
          <a href="terms.html">Terms &amp; Conditions</a>
          <a href="sitemap.html">Sitemap</a>
          <a href="contact.html">Support</a>
        </nav>
      </div>
    </div>
  </div>
</footer>

<!-- Back to Top -->
<button id="back-to-top" aria-label="Back to top" title="Back to top">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
</button>
`;

// Inject components
document.addEventListener('DOMContentLoaded', () => {
  const navMount = document.getElementById('nav-mount');
  const footerMount = document.getElementById('footer-mount');
  if (navMount) navMount.outerHTML = NAV_HTML;
  if (footerMount) footerMount.outerHTML = FOOTER_HTML;
});
