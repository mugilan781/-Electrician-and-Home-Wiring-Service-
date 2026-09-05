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
        <!-- COLUMN 1: COMPANY -->
        <div class="footer-brand footer-col">
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
          <p class="footer-brand-desc">Licensed, insured residential and commercial electrical contracting. Delivering certified wiring, precision panel upgrades, and 24/7 rapid emergency service across the metro area.</p>
          <div class="footer-social" role="list" aria-label="Official social media links">
            <a href="https://www.instagram.com" class="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com" class="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://x.com" class="social-link" aria-label="X (formerly Twitter)" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.youtube.com" class="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/></svg>
            </a>
          </div>
        </div>

        <!-- COLUMN 2: QUICK LINKS -->
        <div class="footer-col">
          <h3 class="footer-col-title">Quick Links</h3>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="home2.html">Home 2</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="pricing.html">Pricing</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>

        <!-- COLUMN 3: CONTACT US -->
        <div class="footer-col">
          <h3 class="footer-col-title">Contact Us</h3>
          <div class="footer-contact">
            <div class="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <div>
                <a href="https://maps.google.com/?q=123+Volt+Avenue+Metro+City+MC+10001" target="_blank" rel="noopener noreferrer" class="footer-contact-link">123 Volt Avenue, Suite 400<br>Metro City, MC 10001</a>
              </div>
            </div>
            <div class="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91A16 16 0 0 0 14 15l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 16l.42.92z"/></svg>
              <div>
                <a href="tel:+18005550199" class="footer-contact-link footer-phone-link">1-800-555-0199</a>
                <div class="footer-contact-sub">24/7 Emergency Line</div>
              </div>
            </div>
            <div class="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <div>
                <a href="mailto:info@electrapro.com" class="footer-contact-link">info@electrapro.com</a>
              </div>
            </div>
            <div class="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <div class="footer-hours-text">
                <div>Mon–Fri: 7:00 AM – 7:00 PM</div>
                <div>Sat–Sun: 8:00 AM – 5:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        <!-- COLUMN 4: NEWSLETTER -->
        <div class="footer-col footer-col--newsletter">
          <h3 class="footer-col-title">Newsletter</h3>
          <p class="footer-newsletter-desc">Subscribe to receive electrical safety tips, seasonal maintenance checklists, and exclusive service discounts.</p>
          <form class="footer-newsletter-form" id="footer-newsletter-form" novalidate>
            <div class="footer-newsletter-group">
              <input type="email" id="footer-newsletter-email" class="footer-newsletter-input" name="email" placeholder="Enter your email" required aria-label="Enter your email">
              <button type="submit" class="btn btn-primary footer-newsletter-btn" id="footer-newsletter-btn">Subscribe</button>
            </div>
            <div id="footer-newsletter-msg" class="footer-newsletter-msg" role="status" aria-live="polite"></div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="container">
      <div class="footer-bottom-inner">
        <p class="footer-copy">&copy; 2026 ElectraPro Electrical Services. All rights reserved.</p>
        <nav class="footer-legal" aria-label="Legal links">
          <a href="privacy.html">Privacy Policy</a>
          <span class="footer-legal-sep" aria-hidden="true">|</span>
          <a href="terms.html">Terms &amp; Conditions</a>
          <span class="footer-legal-sep" aria-hidden="true">|</span>
          <a href="sitemap.html">Sitemap</a>
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

// Newsletter form interaction
document.addEventListener('submit', (e) => {
  if (e.target && e.target.id === 'footer-newsletter-form') {
    e.preventDefault();
    const emailInput = document.getElementById('footer-newsletter-email');
    const msgEl = document.getElementById('footer-newsletter-msg');
    if (!emailInput || !msgEl) return;
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      msgEl.textContent = 'Please enter a valid email address.';
      msgEl.className = 'footer-newsletter-msg footer-newsletter-msg--error';
      emailInput.focus();
      return;
    }
    msgEl.textContent = 'Thank you for subscribing! Check your inbox for updates.';
    msgEl.className = 'footer-newsletter-msg footer-newsletter-msg--success';
    emailInput.value = '';
    setTimeout(() => {
      msgEl.textContent = '';
      msgEl.className = 'footer-newsletter-msg';
    }, 6000);
  }
});

// Inject components
document.addEventListener('DOMContentLoaded', () => {
  const navMount = document.getElementById('nav-mount');
  const footerMount = document.getElementById('footer-mount');
  if (navMount) navMount.outerHTML = NAV_HTML;
  if (footerMount) footerMount.outerHTML = FOOTER_HTML;
});

