let ytPlayer = null;
let ytReady = false;

function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('youtubePlayer', {
    videoId: 'SXcFYnHSG08',
    playerVars: {
      autoplay: 0,
      controls: 0,
      loop: 1,
      playlist: 'SXcFYnHSG08',
      playsinline: 1,
      rel: 0
    },
    events: {
      onReady: () => { ytReady = true; }
    }
  });
}

const gate = document.getElementById('gate');
const experience = document.getElementById('experience');
const form = document.getElementById('secretForm');
const answer = document.getElementById('answer');
const error = document.getElementById('error');
const scrollBtn = document.getElementById('scrollBtn');
const yesBtn = document.getElementById('yesBtn');
const thinkBtn = document.getElementById('thinkBtn');
const choiceMessage = document.getElementById('choiceMessage');
const celebration = document.getElementById('celebration');
const closeCelebration = document.getElementById('closeCelebration');

function normalize(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Se acepta "pimentón", "pimenton" y espacios extra.
  if (normalize(answer.value) === 'pimenton') {
    error.textContent = '';
    gate.classList.add('hidden');
    experience.classList.remove('hidden');
    document.body.style.overflowY = 'auto';

    // La entrada al sitio ocurre por un clic, por lo que intentamos iniciar
    // la canción oficial embebida de YouTube.
    setTimeout(() => {
      if (ytReady && ytPlayer && ytPlayer.playVideo) {
        try { ytPlayer.playVideo(); } catch (_) {}
      }
    }, 500);

    observeReveals();
    startHearts();
    setTimeout(() => document.querySelector('.hero').scrollIntoView({behavior:'smooth'}), 80);
  } else {
    error.textContent = 'Mmm... esa no es la respuesta. Inténtalo otra vez ❤️';
    answer.select();
  }
});

scrollBtn.addEventListener('click', () => {
  document.querySelector('.letter').scrollIntoView({behavior:'smooth'});
});

yesBtn.addEventListener('click', () => {
  celebration.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  burstHearts(55);
  if (ytReady && ytPlayer && ytPlayer.playVideo) {
    try { ytPlayer.playVideo(); } catch (_) {}
  }
});

thinkBtn.addEventListener('click', () => {
  choiceMessage.textContent = 'Tómate tu tiempo. Lo importante para mí es que tu respuesta sea sincera. ❤️';
});

closeCelebration.addEventListener('click', () => {
  celebration.classList.add('hidden');
  document.body.style.overflow = 'auto';
  document.querySelector('.question').scrollIntoView({behavior:'smooth'});
});

function observeReveals() {
  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, {threshold: .16});
  items.forEach(item => io.observe(item));
}

function spawnHeart() {
  const h = document.createElement('div');
  h.className = 'heart-particle';
  h.textContent = Math.random() > .5 ? '♡' : '♥';
  h.style.left = Math.random() * 100 + 'vw';
  h.style.bottom = '-25px';
  h.style.fontSize = (10 + Math.random() * 16) + 'px';
  h.style.animationDuration = (5 + Math.random() * 4) + 's';
  document.getElementById('hearts').appendChild(h);
  setTimeout(() => h.remove(), 10000);
}
function startHearts() {
  setInterval(spawnHeart, 1100);
}
function burstHearts(n) {
  for (let i = 0; i < n; i++) {
    setTimeout(() => {
      const h = document.createElement('div');
      h.className = 'heart-particle';
      h.textContent = Math.random() > .35 ? '♥' : '♡';
      h.style.left = (30 + Math.random() * 40) + 'vw';
      h.style.bottom = (20 + Math.random() * 35) + 'vh';
      h.style.fontSize = (12 + Math.random() * 22) + 'px';
      h.style.animationDuration = (2.5 + Math.random() * 3) + 's';
      document.getElementById('hearts').appendChild(h);
      setTimeout(() => h.remove(), 7000);
    }, i * 25);
  }
}

// Por seguridad visual: la pantalla inicial no hace scroll detrás del acceso.
document.body.style.overflow = 'hidden';
