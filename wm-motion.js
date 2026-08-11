/* WebMI shared motion v2: scroll reveals, magnetic pills, nav spotlight,
   liquid-glass tilt + specular tracking, and starfield page-travel
   transitions (camera pans between pages; starfield.js listens to wm:pan).
   Honours prefers-reduced-motion throughout. */
(function () {
  if (window.__wmMotion) return; window.__wmMotion = true;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = window.matchMedia && window.matchMedia('(pointer: fine)').matches;

  /* ---- liquid glass: true animated refraction where supported ----
     A displacement filter warps the live starfield behind each tile;
     the displacement strength breathes slowly, so the glass reads as
     liquid rather than frost. Fallback stays plain blur. */
  /* Set once the FPS governor reports trouble. The displacement filter runs as a
     backdrop-filter over the live starfield canvas, so the browser re-filters the
     whole backdrop behind every tile on every frame — by far the most expensive
     thing on the page. On a struggling device it goes first, and stays off:
     liquidize() polls for ~9s, so this has to be sticky, not just a class swap. */
  var lqOff = false;
  window.addEventListener('wm:perf', function () {
    if (lqOff) return;
    lqOff = true;
    document.querySelectorAll('.js-glass').forEach(function (el) {
      el.style.backdropFilter = 'blur(8px) saturate(1.65)';
      el.style.webkitBackdropFilter = 'blur(8px) saturate(1.65)';
    });
    var def = document.getElementById('wm-liquid-def');
    if (def && def.parentNode) def.parentNode.removeChild(def);
  });

  function liquidize() {
    if (!document.body || lqOff) return;
    if (!document.getElementById('wm-liquid-def')) {
      var w = document.createElement('div');
      w.innerHTML = '<svg id="wm-liquid-def" width="0" height="0" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">'
        + '<filter id="wm-liquid" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">'
        + '<feTurbulence type="fractalNoise" baseFrequency="0.007 0.013" numOctaves="2" seed="4" result="n"/>'
        + '<feGaussianBlur in="n" stdDeviation="2.6" result="sn"/>'
        + '<feDisplacementMap in="SourceGraphic" in2="sn" xChannelSelector="R" yChannelSelector="G" scale="18">'
        + (reduced ? '' : '<animate attributeName="scale" values="12;30;12" dur="8s" repeatCount="indefinite"/>')
        + '</feDisplacementMap></filter></svg>';
      document.body.appendChild(w.firstElementChild);
    }
    if (window.CSS && CSS.supports && CSS.supports('backdrop-filter', 'url(#wm-liquid)')) {
      document.querySelectorAll('.js-glass:not([data-wm-lq])').forEach(function (el) {
        el.setAttribute('data-wm-lq', '1');
        el.style.backdropFilter = 'url(#wm-liquid) blur(2.5px) saturate(1.7) brightness(1.05)';
      });
    }
  }

  /* ---- logo star glimmer: mostly lit, fast random dips ---- */
  var starOn = false;
  function starGlimmer() {
    if (starOn || reduced) return;
    var star = document.querySelector('.js-star');
    if (!star) return;
    starOn = true;
    var BRIGHT = 'drop-shadow(0 0 10px rgba(255,255,255,0.92)) brightness(2.1)';
    (function tick() {
      var hold = 500 + Math.random() * 2200;
      setTimeout(function () {
        var el = document.querySelector('.js-star') || star;
        var depth = (0.25 + Math.random() * 0.6).toFixed(2);
        var glow = (1 + Math.random() * 4).toFixed(1);
        var down = 30 + Math.random() * 90;
        el.style.transition = 'filter ' + down + 'ms ease-out';
        el.style.filter = 'drop-shadow(0 0 ' + glow + 'px rgba(255,255,255,0.35)) brightness(' + depth + ')';
        setTimeout(function () {
          var up = 50 + Math.random() * 110;
          el.style.transition = 'filter ' + up + 'ms ease-in';
          el.style.filter = BRIGHT;
          setTimeout(tick, Math.random() < 0.35 ? 40 + Math.random() * 80 : 0);
        }, down + 10);
      }, hold);
    })();
  }

  /* ---- entrances + scroll reveals (polls while the page streams in) ---- */
  var t0 = Date.now(), n = 0;
  var iv = setInterval(function () {
    liquidize();
    starGlimmer();
    if (Date.now() - t0 > 9000) { clearInterval(iv); return; }
    if (!window.gsap || !window.ScrollTrigger) return;
    window.gsap.registerPlugin(window.ScrollTrigger);
    if (reduced) { clearInterval(iv); return; }
    document.querySelectorAll('.js-enter:not([data-wm-r])').forEach(function (el) {
      el.setAttribute('data-wm-r', '1');
      window.gsap.from(el, { opacity: 0, y: 30, duration: 0.9, delay: 0.12 + (n++) * 0.1, ease: 'power3.out' });
    });
    document.querySelectorAll('.js-reveal:not([data-wm-r])').forEach(function (el) {
      el.setAttribute('data-wm-r', '1');
      window.gsap.from(el, { opacity: 0, y: 14, duration: 0.4, ease: 'power1.out',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } });
    });
  }, 150);

  /* ---- magnetic pills [data-magnet], nav spotlight [data-spot],
          glass tiles .js-glass (tilt + specular highlight).
          Delegated so late/streamed DOM needs no re-binding. ---- */
  var curMag = null, curGlass = null;
  document.addEventListener('mousemove', function (e) {
    if (!window.gsap || !FINE || reduced) return;
    var g = window.gsap;
    var mag = e.target.closest ? e.target.closest('[data-magnet]') : null;
    if (curMag && curMag !== mag) {
      g.to(curMag, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' });
      curMag.style.setProperty('--so', '0');
      curMag = null;
    }
    if (mag) {
      curMag = mag;
      var r = mag.getBoundingClientRect();
      g.to(mag, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: 'power3.out' });
      if (mag.hasAttribute('data-spot')) {
        mag.style.setProperty('--sx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        mag.style.setProperty('--sy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
        mag.style.setProperty('--so', '0.16');
      }
    }
    var gl = e.target.closest ? e.target.closest('.js-glass') : null;
    if (curGlass && curGlass !== gl) {
      g.to(curGlass, { rotationY: 0, rotationX: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
      curGlass.style.setProperty('--go', '0');
      curGlass = null;
    }
    if (gl) {
      curGlass = gl;
      var b = gl.getBoundingClientRect();
      gl.style.setProperty('--gx', (e.clientX - b.left).toFixed(1) + 'px');
      gl.style.setProperty('--gy', (e.clientY - b.top).toFixed(1) + 'px');
      gl.style.setProperty('--go', '1');
      g.to(gl, { rotationY: ((e.clientX - b.left) / b.width - 0.5) * 4, rotationX: -((e.clientY - b.top) / b.height - 0.5) * 4, transformPerspective: 1200, duration: 0.45, ease: 'power2.out' });
    }
  });

  /* ---- starfield page-travel ----
     Each page has a coordinate on an imaginary sky map. Leaving a page
     pans the starfield toward the destination and slides the content out;
     the next page reads wmTravel and carries the same motion to a stop. */
  var COORDS = {
    Home: [0, 0], Services: [-1, 0], WebDesign: [-2, -0.6], MonthlyCare: [-2, 0.6],
    Support: [-2, 0.6], LocalSEO: [-2, 1], FreeDemo: [-1.4, 0.9], About: [0, 1],
    FAQ: [1, 1], Contact: [1, 0], Pricing: [-1, 0], OurWork: [0.6, -1],
    TownBoyneCity: [-2.7, -1.1], TownCharlevoix: [-3, -0.7], TownPetoskey: [-2.7, -0.3],
    TownHarborSprings: [-3, 0.1], TownEastJordan: [-2.7, 0.5], TownBoyneFalls: [-3, 0.9],
    TownWalloonLake: [-2.7, 1.3]
  };
  var SLUG = {
    '': 'Home', 'index': 'Home', 'services': 'Services', 'web-design': 'WebDesign',
    'local-seo': 'LocalSEO', 'free-demo': 'FreeDemo', 'our-work': 'OurWork',
    'about': 'About', 'faq': 'FAQ', 'contact': 'Contact',
    'web-design-boyne-city': 'TownBoyneCity', 'web-design-charlevoix': 'TownCharlevoix',
    'web-design-petoskey': 'TownPetoskey', 'web-design-harbor-springs': 'TownHarborSprings',
    'web-design-east-jordan': 'TownEastJordan', 'web-design-boyne-falls': 'TownBoyneFalls',
    'web-design-walloon-lake': 'TownWalloonLake'
  };
  function keyOf(p) {
    if (!p) return null;
    var m = /([A-Za-z0-9_-]+)\.dc\.html/.exec(p);
    if (!m) {
      var s = (p.split(/[?#]/)[0] || '').replace(/^\/+|\/+$/g, '').replace(/\.html$/, '');
      return SLUG[s] || null;
    }
    return m ? m[1] : null;
  }
  var cur = keyOf(location.pathname) || 'Home';
  function els() { return [].slice.call(document.querySelectorAll('main, .js-nav, footer')); }

  // Entrance: pick up the previous page's camera move and settle it
  var tv = null;
  try { tv = JSON.parse(sessionStorage.getItem('wmTravel') || 'null'); sessionStorage.removeItem('wmTravel'); } catch (e) {}
  if (tv && Date.now() - tv.ts < 6000 && !reduced) {
    // gsap.fromTo per element: the gsap ticker re-asserts values every frame,
    // so a DC re-render mid-stream can't park the page at opacity 0.
    var applyIn = function () {
      if (!window.gsap) return;
      els().forEach(function (el) {
        if (el.hasAttribute('data-wm-tv')) return;
        el.setAttribute('data-wm-tv', '1');
        window.gsap.fromTo(el,
          { x: tv.dx * 90, y: tv.dy * 90, opacity: 0 },
          { x: 0, y: 0, opacity: 1, delay: 0.25, duration: 0.9, ease: 'expo.out',
            clearProps: 'transform,opacity', overwrite: 'auto' });
      });
    };
    applyIn();
    var ivt = setInterval(applyIn, 60);
    setTimeout(function () { clearInterval(ivt); }, 1600);
    // safety net: whatever happened, nothing stays hidden
    setTimeout(function () {
      els().forEach(function (el) {
        if (parseFloat(getComputedStyle(el).opacity) < 0.9) {
          if (window.gsap) window.gsap.set(el, { clearProps: 'transform,opacity' });
          el.style.opacity = ''; el.style.transform = ''; el.style.transition = '';
        }
      });
    }, 2600);
  }

  // Departure: intercept internal .dc.html links, pan the sky, slide out
  var leaving = false;
  document.addEventListener('click', function (e) {
    if (leaving || reduced || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    var href = a.getAttribute('href');
    if (!href || /^(mailto:|tel:|#|javascript:|https?:)/i.test(href)) return;
    var key = keyOf(href);
    if (!key || key === cur) return;
    e.preventDefault();
    leaving = true;
    var c0 = COORDS[cur] || [0, 0], c1 = COORDS[key] || [0, 0.8];
    var dx = c1[0] - c0[0], dy = c1[1] - c0[1];
    var L = Math.hypot(dx, dy) || 1; dx /= L; dy /= L;
    try { sessionStorage.setItem('wmTravel', JSON.stringify({ dx: dx, dy: dy, ts: Date.now() })); } catch (e2) {}
    window.dispatchEvent(new CustomEvent('wm:pan', { detail: { vx: dx * 1100, vy: dy * 900 } }));
    els().forEach(function (el) {
      el.style.transition = 'transform 0.5s cubic-bezier(0.55,0,0.85,0.45), opacity 0.5s ease';
      el.style.transform = 'translate(' + (-dx * 70).toFixed(1) + 'px,' + (-dy * 70).toFixed(1) + 'px)';
      el.style.opacity = '0';
    });
    setTimeout(function () { location.href = href; }, 480);
  });
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    leaving = false;
    window.dispatchEvent(new CustomEvent('wm:pan', { detail: { vx: 0, vy: 0 } }));
    els().forEach(function (el) { el.style.transition = 'none'; el.style.transform = ''; el.style.opacity = ''; });
  });
})();
