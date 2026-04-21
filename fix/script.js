/* ═══════════════════════════════════════════════
   Portfolio — Meurahmah | script.js
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── SCROLL PROGRESS BAR ─── */
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }, { passive: true });

  /* ─── BACK TO TOP ─── */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── PARTICLE SYSTEM ─── */
  (function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const colors = ['rgba(200,168,240,', 'rgba(240,168,204,', 'rgba(125,211,252,', 'rgba(155,109,223,'];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.pulse += p.pulseSpeed;
        const alpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + alpha + ')';
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  })();
  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');
  let mouseX = 0, mouseY = 0, outX = 0, outY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  (function animateCursor() {
    outX += (mouseX - outX) * 0.12;
    outY += (mouseY - outY) * 0.12;
    outline.style.left = outX + 'px';
    outline.style.top = outY + 'px';
    requestAnimationFrame(animateCursor);
  })();

  document.addEventListener('mousedown', () => outline.classList.add('click'));
  document.addEventListener('mouseup', () => outline.classList.remove('click'));

  document.querySelectorAll('a, button, .tech-card, .gallery-card, .bio-card, .playlist-item, .contact-card, .back-to-top').forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hover'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hover'));
  });

  /* ─── NAVBAR SCROLL ─── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Active nav link
    let current = '';
    sections.forEach(section => {
      const sTop = section.offsetTop - 100;
      if (window.scrollY >= sTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) link.classList.add('active');
    });
  });

  /* ─── HAMBURGER ─── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ─── SCROLL REVEAL ─── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ─── SMOOTH NAV CLICK ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ─── WELCOME POPUP ─── */
  const popupOverlay = document.getElementById('popupOverlay');
  const popupClose = document.getElementById('popupClose');
  const popupBtn = document.getElementById('popupBtn');

  setTimeout(() => {
    popupOverlay.classList.add('show');
  }, 1200);

  [popupClose, popupBtn].forEach(el => {
    el.addEventListener('click', () => {
      popupOverlay.classList.remove('show');
    });
  });

  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) popupOverlay.classList.remove('show');
  });

  /* ─── TOAST NOTIFICATION ─── */
  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  /* ─── COPY EMAIL ─── */
  window.copyEmail = function () {
    navigator.clipboard.writeText('meurahmah27@gmail.com')
      .then(() => showToast('📋 Email copied to clipboard!'))
      .catch(() => showToast('📋 meurahmah27@gmail.com'));
  };

  /* ─── MUSIC PLAYER ─── */
  const audio = document.getElementById('audioPlayer');
  const playBtn = document.getElementById('playBtn');
  const playIcon = document.getElementById('playIcon');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const muteBtn = document.getElementById('muteBtn');
  const volumeIcon = document.getElementById('volumeIcon');
  const musicTitle = document.getElementById('musicTitle');
  const musicArtist = document.getElementById('musicArtist');
  const progressFill = document.getElementById('progressFill');
  const currentTimeEl = document.getElementById('currentTime');
  const totalTimeEl = document.getElementById('totalTime');
  const musicDisc = document.getElementById('musicDisc');
  const playlistItems = document.querySelectorAll('.playlist-item');

  let currentTrack = 0;
  let isPlaying = false;
  let discAngle = 0;
  let discAnim = null;

  function loadTrack(index) {
    const item = playlistItems[index];
    const src = item.getAttribute('data-src');
    const title = item.getAttribute('data-title');
    const artist = item.getAttribute('data-artist');

    musicTitle.textContent = title;
    musicArtist.textContent = artist;

    playlistItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    if (src) {
      audio.src = src;
      audio.load();
      if (isPlaying) audio.play().catch(() => {});
    } else {
      // No file attached yet — show info but don't crash
      audio.src = '';
      progressFill.style.width = '0%';
      currentTimeEl.textContent = '0:00';
      totalTimeEl.textContent = '0:00';
      if (isPlaying) {
        showToast('⚠️ Taruh file MP3 dulu ya! Ganti data-src di HTML.');
        setPlaying(false);
      }
    }
  }

  function setPlaying(state) {
    isPlaying = state;
    if (state) {
      playIcon.className = 'fa-solid fa-pause';
      musicDisc.classList.add('spinning');
      startDiscSpin();
    } else {
      playIcon.className = 'fa-solid fa-play';
      musicDisc.classList.remove('spinning');
      stopDiscSpin();
    }
  }

  function startDiscSpin() {
    stopDiscSpin();
    let last = null;
    function step(ts) {
      if (!last) last = ts;
      const delta = ts - last;
      last = ts;
      discAngle = (discAngle + delta * 0.08) % 360;
      musicDisc.style.transform = `rotate(${discAngle}deg)`;
      discAnim = requestAnimationFrame(step);
    }
    discAnim = requestAnimationFrame(step);
  }

  function stopDiscSpin() {
    if (discAnim) { cancelAnimationFrame(discAnim); discAnim = null; }
  }

  playBtn.addEventListener('click', () => {
    if (!isPlaying) {
      const src = playlistItems[currentTrack].getAttribute('data-src');
      if (src) {
        audio.play().then(() => setPlaying(true)).catch(() => showToast('⚠️ Tidak bisa memutar audio.'));
      } else {
        showToast('⚠️ Tambahkan file MP3 ke data-src di HTML!');
        // Still spin the disc visually for demo
        setPlaying(true);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  });

  prevBtn.addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + playlistItems.length) % playlistItems.length;
    loadTrack(currentTrack);
  });

  nextBtn.addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % playlistItems.length;
    loadTrack(currentTrack);
  });

  muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    volumeIcon.className = audio.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
  });

  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = pct + '%';
      currentTimeEl.textContent = formatTime(audio.currentTime);
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    totalTimeEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % playlistItems.length;
    loadTrack(currentTrack);
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  });

  document.querySelector('.progress-bar').addEventListener('click', (e) => {
    if (!audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  });

  playlistItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      currentTrack = i;
      loadTrack(i);
      const src = item.getAttribute('data-src');
      if (src) {
        audio.play().then(() => setPlaying(true)).catch(() => {});
      } else {
        setPlaying(true);
        showToast('⚠️ Tambahkan file MP3 terlebih dahulu!');
      }
    });
  });

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  // Init first track display
  loadTrack(0);

  /* ─── GALLERY SLIDER ─── */
  const slider = document.getElementById('gallerySlider');
  const prevGallery = document.getElementById('galleryPrev');
  const nextGallery = document.getElementById('galleryNext');
  const dotsContainer = document.getElementById('galleryDots');
  const slides = document.querySelectorAll('.gallery-slide');

  let currentSlide = 0;
  const slideWidth = 296; // 280 + 16 gap

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    currentSlide = Math.max(0, Math.min(index, slides.length - 1));
    slider.scrollTo({ left: currentSlide * slideWidth, behavior: 'smooth' });
    updateDots();
  }

  function updateDots() {
    document.querySelectorAll('.gallery-dots .dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentSlide);
    });
  }

  prevGallery.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextGallery.addEventListener('click', () => goToSlide(currentSlide + 1));

  // Auto slide
  let autoSlide = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }, 4000);

  slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
  slider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      goToSlide(currentSlide);
    }, 4000);
  });

  // Touch swipe
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? goToSlide(currentSlide + 1) : goToSlide(currentSlide - 1);
  });

  /* ─── LIGHTBOX ─── */
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose = document.getElementById('lightboxClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  let lbIndex = 0;

  const galleryImgs = document.querySelectorAll('.gallery-card');

  galleryImgs.forEach((card, i) => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (!img) return; // No image yet, skip lightbox
      lbIndex = i;
      openLightbox(img.src);
    });
  });

  function openLightbox(src) {
    lightboxContent.innerHTML = `<img src="${src}" alt="Gallery" />`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  lbPrev.addEventListener('click', () => {
    lbIndex = (lbIndex - 1 + galleryImgs.length) % galleryImgs.length;
    const img = galleryImgs[lbIndex].querySelector('img');
    if (img) { lightboxContent.innerHTML = `<img src="${img.src}" alt="Gallery" />`; }
  });

  lbNext.addEventListener('click', () => {
    lbIndex = (lbIndex + 1) % galleryImgs.length;
    const img = galleryImgs[lbIndex].querySelector('img');
    if (img) { lightboxContent.innerHTML = `<img src="${img.src}" alt="Gallery" />`; }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbPrev.click();
    if (e.key === 'ArrowRight') lbNext.click();
  });

  /* ─── PARALLAX HERO ORBS ─── */
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    document.querySelectorAll('.hero-orb').forEach((orb, i) => {
      const factor = (i + 1) * 0.5;
      orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });

  /* ─── TECH CARD TILT ─── */
  document.querySelectorAll('.tech-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
      // Only tilt on front (no flip)
      if (!card.matches(':hover')) return;
    });
  });

  /* ─── TYPEWRITER EFFECT (hero sub) ─── */
  const heroSub = document.querySelector('.hero-sub');
  const originalText = heroSub.textContent;
  // Keep as-is for simplicity, but add typing cursor blink
  heroSub.style.borderRight = 'none';

  /* ─── COUNT UP STATS ─── */
  function countUp(el, target, suffix = '') {
    let current = 0;
    const step = target / 40;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(interval); }
      el.textContent = Math.floor(current) + suffix;
    }, 30);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll('.stat-num');
        nums.forEach(num => {
          const val = num.textContent;
          if (val === '5+') countUp(num, 5, '+');
          else if (val === '∞') { /* keep */ }
        });
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statObserver.observe(heroStats);

  /* ─── SPARKLE ON ACCENT TEXT ─── */
  function createSparkle(parent) {
    const sparkle = document.createElement('span');
    sparkle.style.cssText = `
      position:absolute;
      pointer-events:none;
      width:6px;height:6px;
      border-radius:50%;
      background:var(--accent);
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      animation:sparkleAnim 0.8s ease forwards;
    `;
    parent.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  }

  if (!document.querySelector('#sparkleStyle')) {
    const style = document.createElement('style');
    style.id = 'sparkleStyle';
    style.textContent = `@keyframes sparkleAnim{0%{opacity:1;transform:scale(0) translateY(0)}100%{opacity:0;transform:scale(1.5) translateY(-20px)}}`;
    document.head.appendChild(style);
  }

  document.querySelectorAll('.name-highlight, .accent-text').forEach(el => {
    el.style.position = 'relative';
    el.style.display = 'inline-block';
    el.addEventListener('mousemove', () => {
      if (Math.random() > 0.7) createSparkle(el);
    });
  });

  /* ─── GALLERY CARD FLIP CSS TOGGLE ─── */
  // Gallery cards flip-reveal overlay on hover is handled by CSS

  /* ─── CONSOLE EASTER EGG ─── */
  console.log('%c✨ Hi there! Welcome to Meurahmah\'s Portfolio', 
    'font-family:Syne,sans-serif;font-size:18px;color:#c8a8f0;font-weight:bold;');
  console.log('%cBuilt with ❤️ HTML · CSS · JS', 
    'font-size:12px;color:#9896b0;');

  /* ─── INIT ─── */
  // Trigger initial reveal for elements in view
  setTimeout(() => {
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('revealed');
    });
  }, 100);

});
