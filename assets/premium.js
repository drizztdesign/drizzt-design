/* =========================================================
   PREMIUM LAYER — JS
   Mesh-gradient parallax, magnetic cursor, kinetic typography,
   word-reveal, scroll reveal, tilt cards, count-up, page
   transitions, scroll progress.
   ========================================================= */

(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  /* ---------- 1. Orbs: floating + parallax con mouse ---------- */
  if (!reduced) {
    const orbs = document.querySelectorAll('.orb');
    if (orbs.length) {
      let mx = 0, my = 0, cx = 0, cy = 0;
      if (!isTouch) {
        window.addEventListener('mousemove', (e) => {
          mx = (e.clientX / window.innerWidth - 0.5) * 80;
          my = (e.clientY / window.innerHeight - 0.5) * 80;
        }, { passive: true });
      }
      const start = performance.now();
      function tick(now) {
        cx += (mx - cx) * 0.04;
        cy += (my - cy) * 0.04;
        const t = (now - start) * 0.0001;
        orbs.forEach((orb, i) => {
          const f = i + 1;
          const ax = Math.sin(t * f) * 30;
          const ay = Math.cos(t * f * 0.75) * 30;
          const px = cx * (i + 1) * 0.4;
          const py = cy * (i + 1) * 0.4;
          orb.style.transform = `translate3d(${ax + px}px, ${ay + py}px, 0)`;
        });
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
  }

  /* ---------- 2. Cursor custom: aro con lag + pelotita rápida ---------- */
  if (!isTouch && !reduced) {
    const ring = document.querySelector('.cursor');
    const dot = document.querySelector('.cursor-dot');
    if (ring && dot) {
      document.body.classList.add('has-custom-cursor');
      let mx = 0, my = 0;
      let rx = 0, ry = 0;   // ring (lagged)
      let dx = 0, dy = 0;   // dot (fast follow)
      let started = false;
      window.addEventListener('mousemove', (e) => {
        mx = e.clientX; my = e.clientY;
        if (!started) { rx = dx = mx; ry = dy = my; started = true; }
      }, { passive: true });
      function loop() {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        dx += (mx - dx) * 0.6;
        dy += (my - dy) * 0.6;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
        dot.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        requestAnimationFrame(loop);
      }
      requestAnimationFrame(loop);

      const hoverables = document.querySelectorAll(
        'a, button, .servicio, .proyecto-card, .proyecto, .principio, .team-card, .proceso-card, .valor-card, .servicio-card, .feature-card, [data-cursor]'
      );
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          ring.classList.add('is-hovering');
          dot.classList.add('is-hovering');
        });
        el.addEventListener('mouseleave', () => {
          ring.classList.remove('is-hovering');
          dot.classList.remove('is-hovering');
        });
      });
    }
  }

  /* ---------- 3. Scroll progress ---------- */
  const progress = document.querySelector('.scroll-progress');
  if (progress) {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = p + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---------- 4. Hero H1: sin animación de entrada (el gradient text del <em> ya
        anima por sí solo y la animación de bloque interfiere con el render del em) ---------- */

  /* ---------- 5. Word-reveal: split en palabras (preserva <br>) ---------- */
  document.querySelectorAll('.word-reveal').forEach((el) => {
    const segments = el.innerHTML.split(/<br\s*\/?>/i);
    let wordIdx = 0;
    const html = segments
      .map((seg) => {
        const text = seg.replace(/<[^>]+>/g, '').trim();
        if (!text) return '';
        const words = text.split(/\s+/);
        return words
          .map((w) => `<span class="word" style="--word-i:${wordIdx++}">${w}</span>`)
          .join(' ');
      })
      .join('<br>');
    el.innerHTML = html;
  });

  /* ---------- 6. On-scroll reveal (IntersectionObserver) ---------- */
  if (!reduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('.reveal, .word-reveal').forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal, .word-reveal').forEach((el) => el.classList.add('in-view'));
  }

  /* ---------- 7. Tilt cards (mouse-position 3D) ---------- */
  if (!isTouch && !reduced) {
    const tilts = document.querySelectorAll(
      '.servicio, .proyecto-card, .proyecto, .principio, .team-card, .proceso-card, .valor-card, .servicio-card, .feature-card'
    );
    tilts.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateZ(0)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------- 8. Count-up ---------- */
  if ('IntersectionObserver' in window) {
    const counters = document.querySelectorAll('.count-up');
    if (counters.length) {
      const co = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.dataset.target ?? el.textContent);
            if (Number.isNaN(target)) { co.unobserve(el); return; }
            const dur = 1500;
            const t0 = performance.now();
            const isInt = Number.isInteger(target);
            function step(now) {
              const t = Math.min(1, (now - t0) / dur);
              const eased = 1 - Math.pow(1 - t, 3);
              const v = target * eased;
              el.textContent = isInt ? Math.round(v) : v.toFixed(1);
              if (t < 1) requestAnimationFrame(step);
              else el.textContent = isInt ? target : target.toString();
            }
            requestAnimationFrame(step);
            co.unobserve(el);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach((el) => co.observe(el));
    }
  }

  /* ---------- 9. Page transitions ---------- */
  if (!reduced) {
    const overlay = document.querySelector('.page-transition');
    if (overlay) {
      // Animar salida solo si venimos de una navegación interna (mismo origen).
      try {
        const ref = document.referrer;
        const sameOrigin = ref && new URL(ref).origin === window.location.origin;
        if (sameOrigin) overlay.classList.add('exit');
      } catch (_) { /* noop */ }

      document.querySelectorAll('a[href]').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) return;
        if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
        if (link.target === '_blank' || link.hasAttribute('download')) return;
        try {
          const url = new URL(href, window.location.href);
          if (url.origin !== window.location.origin) return;
          if (url.pathname === window.location.pathname && url.search === window.location.search) return;
        } catch (_) { return; }

        link.addEventListener('click', (e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
          e.preventDefault();
          overlay.classList.remove('exit');
          // forzar reflow para reiniciar animación
          void overlay.offsetWidth;
          overlay.classList.add('enter');
          setTimeout(() => { window.location.href = link.href; }, 520);
        });
      });
    }
  }

  /* ---------- 10. Section indicator (active dot por scroll) ---------- */
  const indicator = document.querySelector('.section-indicator');
  if (indicator && 'IntersectionObserver' in window) {
    const dots = indicator.querySelectorAll('a[href^="#"]');
    const sections = [];
    dots.forEach((d) => {
      const id = d.getAttribute('href').slice(1);
      const sec = document.getElementById(id);
      if (sec) sections.push({ sec, dot: d });
    });
    if (sections.length) {
      const so = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sections.find((s) => s.sec === entry.target);
            if (match) {
              sections.forEach((s) => s.dot.classList.toggle('active', s === match));
            }
          }
        });
      }, { threshold: 0.45 });
      sections.forEach((s) => so.observe(s.sec));
    }
  }
})();
