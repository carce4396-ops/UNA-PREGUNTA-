const secretForm = document.getElementById("secretForm");
const answer = document.getElementById("answer");
const error = document.getElementById("error");
const gate = document.getElementById("gate");
const experience = document.getElementById("experience");
const musicFrame = document.getElementById("musicFrame");
const musicBtn = document.getElementById("musicBtn");
const musicStatus = document.getElementById("musicStatus");
const scrollBtn = document.getElementById("scrollBtn");
const yesBtn = document.getElementById("yesBtn");
const thinkBtn = document.getElementById("thinkBtn");
const choiceMessage = document.getElementById("choiceMessage");
const celebration = document.getElementById("celebration");
const closeCelebration = document.getElementById("closeCelebration");
const hearts = document.getElementById("hearts");

const videoId = "SXcFYnHSG08";
let musicPlaying = false;

function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function startMusic() {
  musicFrame.innerHTML = `
    <iframe
      id="ytMusic"
      width="2"
      height="2"
      src="https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1"
      title="Locos - León Larregui"
      allow="autoplay; encrypted-media"
      frameborder="0">
    </iframe>`;
  musicPlaying = true;
  musicBtn.textContent = "♫ Música sonando";
  musicStatus.textContent = "Locos · León Larregui";
}

function showMusicButton() {
  musicBtn.textContent = musicPlaying ? "♫ Música sonando" : "♫ Tocar música";
}

secretForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (normalize(answer.value) === "pimenton") {
    error.textContent = "";
    gate.classList.add("hidden");
    experience.classList.remove("hidden");
    document.body.classList.add("experience-open");

    // The user has just interacted with the page, so this is the best
    // moment for the browser to allow YouTube autoplay with sound.
    startMusic();

    setTimeout(() => {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    }, 250);
  } else {
    error.textContent = "Mmm... esa no es la respuesta ❤️";
    answer.select();
  }
});

musicBtn.addEventListener("click", () => {
  if (!musicPlaying) {
    startMusic();
  } else {
    const iframe = document.getElementById("ytMusic");
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(JSON.stringify({
        event: "command",
        func: "pauseVideo",
        args: []
      }), "*");
    }
    musicPlaying = false;
    musicBtn.textContent = "♫ Volver a poner música";
    musicStatus.textContent = "Locos · León Larregui";
  }
});

scrollBtn.addEventListener("click", () => {
  document.querySelector(".letter").scrollIntoView({behavior:"smooth"});
});

thinkBtn.addEventListener("click", () => {
  choiceMessage.textContent = "Está bien... pero yo aquí voy a esperar ese sí ❤️";
  thinkBtn.textContent = "Piénsalo bien 😌";
});

yesBtn.addEventListener("click", () => {
  celebration.classList.remove("hidden");
  for (let i = 0; i < 28; i++) createHeart();
});

closeCelebration.addEventListener("click", () => {
  celebration.classList.add("hidden");
});

function createHeart() {
  const h = document.createElement("span");
  h.className = "float-heart";
  h.textContent = Math.random() > .35 ? "♥" : "♡";
  h.style.left = `${Math.random()*100}%`;
  h.style.fontSize = `${12 + Math.random()*24}px`;
  h.style.animationDuration = `${4 + Math.random()*5}s`;
  hearts.appendChild(h);
  setTimeout(() => h.remove(), 9500);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold:0.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
