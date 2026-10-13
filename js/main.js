/* Invictus Clean — Home
   Only two behaviours: the mobile menu and the testimonial carousel.
   In Elementor both come built into the widgets (Nav Menu and Testimonial Carousel),
   so this file is not needed in WordPress. */

(function () {
  'use strict';

  /* ---------- Mobile menu ---------- */
  var burger = document.querySelector('.ic-burger');
  var menu = document.getElementById('ic-mobile-menu');

  if (burger && menu) {
    var setOpen = function (open) {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.hidden = !open;
      document.body.style.overflow = open ? 'hidden' : '';
    };

    burger.addEventListener('click', function () {
      setOpen(burger.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) setOpen(false);
    });

    window.matchMedia('(min-width: 1025px)').addEventListener('change', function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  /* ---------- Testimonial carousel ---------- */
  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var track = carousel.querySelector('[data-carousel-track]');
    var prev = carousel.querySelector('[data-carousel-prev]');
    var next = carousel.querySelector('[data-carousel-next]');
    if (!track) return;

    var step = function () {
      var slide = track.children[0];
      if (!slide) return 0;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return slide.getBoundingClientRect().width + gap;
    };

    var go = function (dir) {
      var max = track.scrollWidth - track.clientWidth;
      var target = track.scrollLeft + dir * step();
      // Loop at the ends, like the Squarespace carousel
      if (dir > 0 && track.scrollLeft >= max - 2) target = 0;
      if (dir < 0 && track.scrollLeft <= 2) target = max;
      track.scrollTo({ left: target, behavior: 'smooth' });
    };

    if (prev) prev.addEventListener('click', function () { go(-1); });
    if (next) next.addEventListener('click', function () { go(1); });
  });

  /* ======================================================================
     v2 — animations
     ====================================================================== */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  /* ---------- Typing headline (Home hero) ----------
     Types each phrase letter by letter, holds it, highlights it, clears it,
     then types the next one (same behaviour as the reference site). */
  document.querySelectorAll('[data-typing]').forEach(function (el) {
    var text = el.querySelector('.ic-typing__text');
    var words;
    try { words = JSON.parse(el.getAttribute('data-typing')); } catch (e) { return; }
    if (!text || !words || words.length < 2 || reduceMotion) return;

    var TYPE = 110, HOLD = 2200, SELECT = 450, GAP = 350;
    var i = 0;
    (async function loop() {
      await wait(HOLD);
      for (;;) {
        text.classList.add('is-selected');
        await wait(SELECT);
        text.textContent = '';
        text.classList.remove('is-selected');
        await wait(GAP);
        i = (i + 1) % words.length;
        for (var k = 1; k <= words[i].length; k++) {
          text.textContent = words[i].slice(0, k);
          await wait(TYPE);
        }
        await wait(HOLD);
      }
    })();
  });

  /* ---------- Client logos strip (Home) ----------
     Repeats the logos until one copy is wider than the screen, then adds a
     second copy so the CSS loop (translateX -50%) has no visible gap. */
  document.querySelectorAll('[data-logo-marquee]').forEach(function (m) {
    if (reduceMotion) return;
    var inner = m.querySelector('.ic-logo-marquee__inner');
    var list = inner && inner.querySelector('ul');
    if (!list || !list.children.length) return;

    var originals = Array.prototype.slice.call(list.children);
    for (var n = 0; n < 5 && list.scrollWidth < m.clientWidth; n++) {
      originals.forEach(function (li) {
        var c = li.cloneNode(true);
        c.setAttribute('aria-hidden', 'true');
        list.appendChild(c);
      });
    }
    var copy = list.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    inner.appendChild(copy);

    inner.style.animationDuration = Math.round(list.scrollWidth / 40) + 's';   // ~40px per second
    m.classList.add('is-animated');
  });

  /* ---------- Photo carousel (About) ----------
     Fade between slides, autoplay every 4.5s (always running: it does not
     pause on hover; clicking an arrow/dot just restarts the 4.5s count),
     arrows, dots and swipe on touch screens. */
  document.querySelectorAll('[data-slider]').forEach(function (s) {
    var slides = Array.prototype.slice.call(s.querySelectorAll('.ic-slider__slide'));
    var dotsWrap = s.querySelector('[data-slider-dots]');
    if (slides.length < 2) return;
    var current = 0, timer = null;

    var dots = slides.map(function (_, k) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'ic-slider__dot';
      b.setAttribute('aria-label', 'Show photo ' + (k + 1));
      b.addEventListener('click', function () { go(k); restart(); });
      if (dotsWrap) dotsWrap.appendChild(b);
      return b;
    });

    function go(n) {
      current = (n + slides.length) % slides.length;
      slides.forEach(function (sl, k) {
        sl.classList.toggle('is-active', k === current);
        sl.setAttribute('aria-hidden', k === current ? 'false' : 'true');
      });
      dots.forEach(function (d, k) { d.setAttribute('aria-current', k === current ? 'true' : 'false'); });
    }
    function restart() {
      clearInterval(timer);
      timer = setInterval(function () { go(current + 1); }, 4500);
    }

    var prev = s.querySelector('[data-slider-prev]');
    var next = s.querySelector('[data-slider-next]');
    if (prev) prev.addEventListener('click', function () { go(current - 1); restart(); });
    if (next) next.addEventListener('click', function () { go(current + 1); restart(); });


    var startX = null;
    s.addEventListener('pointerdown', function (e) { startX = e.clientX; });
    s.addEventListener('pointerup', function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 40) { go(current + (dx < 0 ? 1 : -1)); restart(); }
      startX = null;
    });

    go(0);
    restart();
  });

  /* ---------- Sectors card carousel (Home) ----------
     Native horizontal scroll with snap (so touch swipe works for free);
     arrows and dots move one "page" (= the cards that fit on screen) at a time. */
  document.querySelectorAll('[data-card-carousel]').forEach(function (c) {
    var vp = c.querySelector('[data-cc-viewport]');
    var items = vp ? Array.prototype.slice.call(vp.querySelectorAll('li')) : [];
    var prev = c.querySelector('[data-cc-prev]');
    var next = c.querySelector('[data-cc-next]');
    var dotsWrap = c.querySelector('[data-cc-dots]');
    if (!items.length) return;
    var dots = [];

    function gap() { return parseFloat(getComputedStyle(items[0].parentElement).columnGap) || 0; }
    function step() { return items[0].getBoundingClientRect().width + gap(); }
    // N cards fit when N*card + (N-1)*gap <= width, i.e. N <= (width + gap) / (card + gap)
    function perView() { return Math.max(1, Math.floor((vp.clientWidth + gap() + 1) / step())); }
    function pageCount() { return Math.max(1, Math.ceil(items.length / perView())); }
    function maxScroll() { return vp.scrollWidth - vp.clientWidth; }
    function currentPage() {
      if (vp.scrollLeft >= maxScroll() - 2) return pageCount() - 1;
      return Math.round(vp.scrollLeft / (perView() * step()));
    }
    function goPage(n) {
      n = Math.max(0, Math.min(pageCount() - 1, n));
      vp.scrollTo({ left: Math.min(n * perView() * step(), maxScroll()) });
    }
    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      dots = [];
      for (var k = 0; k < pageCount(); k++) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'ic-card-carousel__dot';
        b.setAttribute('aria-label', 'Go to page ' + (k + 1));
        b.addEventListener('click', goPage.bind(null, k));
        dotsWrap.appendChild(b);
        dots.push(b);
      }
    }
    function update() {
      var p = currentPage();
      dots.forEach(function (d, k) { d.setAttribute('aria-current', k === p ? 'true' : 'false'); });
      if (prev) prev.disabled = vp.scrollLeft <= 2;
      if (next) next.disabled = vp.scrollLeft >= maxScroll() - 2;
    }

    if (prev) prev.addEventListener('click', function () { goPage(currentPage() - 1); });
    if (next) next.addEventListener('click', function () { goPage(currentPage() + 1); });

    var ticking = false;
    vp.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { update(); ticking = false; });
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { buildDots(); update(); }, 150);
    });

    buildDots();
    update();
  });
})();
