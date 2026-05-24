// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "ISI_API_KEY_KAMU",
  authDomain: "ISI_PROJECT.firebaseapp.com",
  projectId: "ISI_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ================= LOGIN =================
function login() {
  let u = document.getElementById('username').value;
  let p = document.getElementById('password').value;

  if (u === "nandacantik" && p === "alifsayangndaa") {
    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    startLoveRain();
    loadFoto();
    loadVideo();
    // Optionally start backsound when user logs in
    try { playBacksound(); } catch(e) { /* ignore if audio blocked */ }
  } else {
    alert("Salah 😢");
  }
}

function logout() {
  if (confirm("Yakin logout? 😭")) location.reload();
}

// ================= NAVIGATION =================
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  document.getElementById(page).style.display = 'block';
}

// ================= LOVE RAIN =================
function startLoveRain() {
  setInterval(() => {
    let heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💖';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }, 300);
}

// ================= LOVE BURST =================
function jawab(p) {
  let j = document.getElementById('jawaban');

  if (p === "iya") {
    j.innerHTML = "Sekarang kamu milik aku 💖";
    loveBurst();
  } else {
    j.innerHTML = "Aku tetap sayang kamu 😢";
  }
}

function loveBurst() {
  for (let i = 0; i < 30; i++) {
    let h = document.createElement('div');
    h.className = 'burst-heart';
    h.innerHTML = '💖';

    h.style.left = window.innerWidth/2 + 'px';
    h.style.top = window.innerHeight/2 + 'px';

    let angle = Math.random() * 2 * Math.PI;
    let distance = Math.random() * 200;

    let dx = Math.cos(angle) * distance;
    let dy = Math.sin(angle) * distance;

    h.style.setProperty('--dx', dx + 'px');
    h.style.setProperty('--dy', dy + 'px');

    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1000);
  }
}

// ================= FOTO =================
// NOTE: Foto sekarang dimuat dari array lokal. Jika kamu ingin menambah foto,
// letakkan file di folder "foto/" dan tambahkan namanya ke array `fotoFiles`.
const fotoFiles = [
  'foto/juhop1.jpeg',
  'foto/juhop2.jpeg',
  'foto/juhop3.jpeg',
  'foto/juhop4.jpeg',
  'foto/juhop5.jpeg',
  'foto/juhop6.jpeg',
  'foto/juhop7.jpeg',
  'foto/juhop8.jpeg',
  'foto/juhop9.jpeg',
  'foto/juhop10.jpeg',
  'foto/juhop11.jpeg',
  'foto/juhop12.jpeg',
  'foto/juhop13.jpeg',
  'foto/juhop14.jpeg',
  'foto/juhop15.jpeg'
];

function loadFoto() {
  let galeri = document.getElementById('galeriFoto');
  galeri.innerHTML = "";

  fotoFiles.forEach(path => {
    let img = document.createElement('img');
    img.src = path;
    img.alt = 'Foto';
    img.title = path.split('/').pop();
    // buka modal saat foto diklik
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openImageModal(path));
    galeri.appendChild(img);
  });
}

// ================= VIDEO =================
// NOTE: Video sekarang dimuat dari array lokal. Jika kamu ingin menambah video,
// letakkan file di folder "vidio/" dan tambahkan namanya ke array `videoFiles`.
const videoFiles = [
  'vidio/nikwil1.mp4',
  'vidio/nikwil2.mp4',
  'vidio/nikwil3.mp4',
  'vidio/nikwil4.mp4',
  'vidio/nikwil5.mp4'
];

function loadVideo() {
  let galeri = document.getElementById('galeriVideo');
  galeri.innerHTML = "";

  videoFiles.forEach(path => {
    let vidWrap = document.createElement('div');
    let vid = document.createElement('video');
    vid.src = path;
    vid.controls = true;
    vid.preload = 'metadata';
    vid.width = 320;
    vidWrap.appendChild(vid);
    galeri.appendChild(vidWrap);
  });
}

// ================= BACKSOUND =================
// Letakkan file audio di folder project, misalnya `backsound.mp3`.
const backsoundFile = 'backsound.mp3';

function getBacksoundElement() {
  return document.getElementById('backsound');
}

function updateBacksoundButton() {
  const btn = document.getElementById('bsButton');
  const a = getBacksoundElement();
  if (!btn || !a) return;
  if (a.paused) btn.textContent = 'Play Backsound';
  else btn.textContent = 'Pause Backsound';
}

function playBacksound() {
  const a = getBacksoundElement();
  if (!a) return;
  // if audio src is placeholder, set it from variable
  if (!a.src || a.src.endsWith('/')) a.src = backsoundFile;
  a.play().then(updateBacksoundButton).catch(err => {
    // autoplay may be blocked; just update UI
    updateBacksoundButton();
  });
}

function pauseBacksound() {
  const a = getBacksoundElement();
  if (!a) return;
  a.pause();
  updateBacksoundButton();
}

function toggleBacksound() {
  const a = getBacksoundElement();
  if (!a) return;
  if (a.paused) playBacksound();
  else pauseBacksound();
}

// Update button text on load
window.addEventListener('load', () => {
  const a = getBacksoundElement();
  if (a) a.src = backsoundFile; // ensure src set
  updateBacksoundButton();
  // modal backdrop click closes
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.querySelector('.image-modal-backdrop').addEventListener('click', closeImageModal);
  }
  // Escape key closes modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeImageModal();
  });
});

function openImageModal(src) {
  const modal = document.getElementById('imageModal');
  const img = document.getElementById('modalImage');
  if (!modal || !img) return;
  img.src = src;
  modal.style.display = 'flex';
  // hide foto page content behind modal (keamanan UX)
  showPage('foto');
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  const img = document.getElementById('modalImage');
  if (!modal) return;
  modal.style.display = 'none';
  if (img) img.src = '';
  // ensure foto page visible
  showPage('foto');
}