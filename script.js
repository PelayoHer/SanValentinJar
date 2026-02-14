
// Constants
const YOUTUBE_VIDEO_ID = '3S3pdc_bYkY'; // Stardew Valley - Spring (The Valley Comes Alive) use a reliable cover if OST is blocked
// Use a video that allows embedding.

// Estado Global
// Array de razones hardcodeado para evitar problemas de CORS al abrir index.html directamente
const reasons = [
    {
        "text": "Tu sonrisa ilumina mi día.",
        "type": "romantic"
    },
    {
        "text": "Amo la forma en que siempre me apoyas.",
        "type": "deep"
    },
    {
        "text": "Me encanta cómo te ríes de tus propios chistes.",
        "type": "funny"
    },
    {
        "text": "Lo guapa que estás incluso cuando te acabas de despertar.",
        "type": "romantic"
    },
    {
        "text": "Cómo me robas las patatas fritas aunque dijiste que no querías.",
        "type": "funny"
    },
    {
        "text": "Tu paciencia infinita (sobre todo conmigo).",
        "type": "deep"
    },
    {
        "text": "Amo cómo hueles, incluso sin perfume.",
        "type": "romantic"
    },
    {
        "text": "Cómo te pones de intensa viendo tus series favoritas.",
        "type": "funny"
    },
    {
        "text": "Tus 'buenos días' son mi parte favorita de la mañana.",
        "type": "romantic"
    },
    {
        "text": "Que me dejes elegir la película aunque acabemos viendo la que tú querías.",
        "type": "funny"
    },
    {
        "text": "Tu inteligencia y la forma en que ves el mundo.",
        "type": "deep"
    },
    {
        "text": "Esa risa escandalosa que me hace reír a mí también.",
        "type": "funny"
    },
    {
        "text": "Porque eres mi mejor amiga y mi amor, todo en uno.",
        "type": "romantic"
    },
    {
        "text": "Tus besos en la frente que me transmiten tanta paz.",
        "type": "romantic"
    },
    {
        "text": "Que siempre me dejes el último trozo de pizza.",
        "type": "funny"
    },
    {
        "text": "Tu forma de arrugar la nariz cuando algo no te gusta.",
        "type": "funny"
    },
    {
        "text": "Porque contigo el silencio nunca es incómodo.",
        "type": "deep"
    },
    {
        "text": "Simplemente, porque la vida es mucho mejor contigo.",
        "type": "romantic"
    },
    {
        "type": "¡Un Easter Egg!",
        "image": "foto1.jpeg"
    },
    {
        "text": "¡Secretito!",
        "type": "photo",
        "image": "foto2.jpeg"
    },
    {
        "text": "¡Bonus oculto descubierto! 🕵️‍♀️",
        "type": "photo",
        "image": "foto3.jpeg"
    }
];

let availableIndices = [];
let player;
let isMusicPlaying = false;

// Elementos del DOM (Referencias a objetos HTML)
const pullBtn = document.getElementById('pull-btn');
const noteDisplay = document.getElementById('note-display');
const reasonText = document.getElementById('reason-text');
const noteContent = document.querySelector('.note-content');
const closeNoteBtn = document.getElementById('close-note');
const musicBtn = document.getElementById('music-btn');
const musicIcon = document.getElementById('music-icon');
const counterDisplay = document.getElementById('counter');
const particlesContainer = document.getElementById('particles-container');
const jarLid = document.querySelector('.jar-lid');
const giftModal = document.getElementById('gift-modal');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    console.log("Evento DOMContentLoaded disparado.");
    // Inicializar datos

    resetAvailableIndices();
    updateCounter();
    console.log(`Loaded ${reasons.length} reasons.`);

    // Initialize YouTube
    loadYouTubeAPI();

    // Event Listeners
    pullBtn.addEventListener('click', showReason);
    closeNoteBtn.addEventListener('click', hideNote);
    musicBtn.addEventListener('click', toggleMusic);


});

function resetAvailableIndices() {
    availableIndices = reasons.map((_, index) => index);
}

// Lógica Principal: Mostrar una Razón
function showReason() {
    console.log("showReason: Función llamada.");
    // Si no quedan razones, mostrar regalo final
    if (availableIndices.length === 0) {
        console.log("showReason: All reasons shown. Showing gift modal.");
        showGiftModal();
        return;
    }

    // Elegir un índice aleatorio de los disponibles
    const randomIndexPosition = Math.floor(Math.random() * availableIndices.length);
    const reasonIndex = availableIndices[randomIndexPosition];

    // Eliminar de disponibles para que no se repitan
    availableIndices.splice(randomIndexPosition, 1);

    const reasonObj = reasons[reasonIndex];
    console.log(`showReason: Selected index ${reasonIndex}. Reason: "${reasonObj.text}" (Type: ${reasonObj.type})`);

    // Actualizar la Interfaz de Usuario (UI)
    if (reasonObj.type === 'photo') {
        reasonText.innerHTML = `<img src="${reasonObj.image}" class="note-img" alt="Foto sorpresa"><p style="font-size: 1.2rem; margin-top: 10px;">${reasonObj.text}</p>`;
    } else {
        reasonText.textContent = reasonObj.text;
    }

    // Configurar Estilo de la Nota (Colores y rotaciones)
    noteContent.className = 'note-content'; // Resetear clases
    const type = reasonObj.type || 'romantic';
    noteContent.classList.add(type);

    // Fondo Reactivo (Cambia según el tipo de nota)
    document.body.className = ''; // Resetear
    if (reasonObj.image || reasonObj.type === 'photo') {
        document.body.classList.add('bg-retro');
    } else {
        document.body.classList.add(`bg-${type}`);
    }

    // Sonido
    playSound('pop');

    // Animación de aparición
    noteDisplay.classList.remove('hidden');
    // Force reflow
    void noteDisplay.offsetWidth;
    noteDisplay.classList.add('visible');

    // Animar Tapa del Tarro
    jarLid.classList.add('opened');

    // Efecto de Corazones Flotantes
    startFloatingHearts();

    updateCounter();
}

function hideNote() {
    console.log("hideNote: Closing note.");
    playSound('paper'); // Sound effect
    noteDisplay.classList.remove('visible');

    // Close Lid with delay
    setTimeout(() => {
        jarLid.classList.remove('opened');
    }, 200);

    setTimeout(() => {
        noteDisplay.classList.add('hidden');
        stopFloatingHearts();
    }, 500);
}

function updateCounter() {
    const total = reasons.length;
    const current = total - availableIndices.length;
    counterDisplay.innerText = `${current} Razones`;
}

// Sistema de Partículas (Corazones)
let particlesInterval;

function startFloatingHearts() {
    console.log("startFloatingHearts: Starting particle effect.");
    // Immediate burst
    spawnHeart(); spawnHeart(); spawnHeart();

    // Continuous flow
    if (particlesInterval) clearInterval(particlesInterval);
    particlesInterval = setInterval(spawnHeart, 300);
}

function stopFloatingHearts() {
    if (particlesInterval) clearInterval(particlesInterval);
}

function spawnHeart() {
    // console.log("spawnHeart: Spawning heart particle."); // Too noisy for console
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = '<i class="fas fa-heart"></i>';

    // Randomize position
    const startLeft = Math.random() * 100;
    heart.style.left = `${startLeft}%`;

    // Randomize size
    const size = Math.random() * 1.5 + 0.5; // 0.5 to 2.0 rem
    heart.style.fontSize = `${size}rem`;

    // Randomize color slightly
    const hue = Math.random() * 40 + 330; // Pinks/Reds
    heart.style.color = `hsl(${hue}, 100%, 80%)`;

    // Randomize animation duration
    const duration = Math.random() * 3 + 4; // 4-7s
    heart.style.animationDuration = `${duration}s`;

    particlesContainer.appendChild(heart);

    // Cleanup
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// YouTube API
function loadYouTubeAPI() {
    console.log("loadYouTubeAPI: Loading iframe_api script.");
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
    console.log("onYouTubeIframeAPIReady: API ready. Creating player.");

    if (window.location.protocol === 'file:') {
        console.warn("⚠️ Running correctly locally via file:// protocol, but YouTube API might block music. Deploy to GitHub Pages for best results.");
    }

    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playlist': YOUTUBE_VIDEO_ID, // Required for loop to work
            'origin': window.location.origin // Best practice for GitHub Pages
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Player is ready
    console.log("Music player ready");
    event.target.setVolume(50); // Set volume to 50%
}

function toggleMusic() {
    if (!player || typeof player.getPlayerState !== 'function') {
        console.warn("toggleMusic: Player not ready or function missing.");
        return;
    }

    if (isMusicPlaying) {
        console.log("toggleMusic: Pausing video.");
        player.pauseVideo();
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-play');
        isMusicPlaying = false;
    } else {
        console.log("toggleMusic: Playing video (unMute called).");
        player.unMute(); // Ensure sound is on
        player.playVideo();
        musicIcon.classList.remove('fa-play');
        musicIcon.classList.add('fa-pause');
        isMusicPlaying = true;
    }
}

// Funciones del Modal (Regalo Final)
function showGiftModal() {
    giftModal.classList.remove('hidden');
    startFloatingHearts(); // ¡Celebración!
    playSuccessSound();
}

function closeModal() {
    giftModal.classList.add('hidden');
    // Optional: Reset if they want to play again after seeing the gift
    if (confirm("¿Quieres reiniciar el tarro para leer las razones otra vez?")) {
        resetAvailableIndices();
        updateCounter();
    }
}

function selectGift(type) {
    const modalContent = document.querySelector('.modal-content');

    let title = "";
    let message = "";
    let icon = "";

    if (type === 'sushi') {
        title = "¡Genial! 🍣";
        message = "Prepárate para comer mucho sushi. ¡Te quiero!";
        icon = "🍣";
    } else if (type === 'cats') {
        title = "¡Shhh! 🐈";
        // Image added here
        message = "¡Que no se entere Loto de esto! 🤫🐈<br><br>Compraremos muchas latitas.<br><img src='Loto.jpeg' class='modal-img' alt='Loto juzgándote' onerror=\"this.style.display='none'\">";
        icon = "🤫";
    }

    // Replace modal content with confirmation
    modalContent.innerHTML = `
        <h2>${title}</h2>
        <div style="font-size: 3rem; margin: 10px 0; animation: popIn 0.5s;">${icon}</div>
        <p style="font-size: 1.2rem; color: #5d405c;">${message}</p>
        <button class="close-modal-btn" onclick="closeModal()" style="margin-top: 20px; background-color: var(--accent-color);">¡Entendido!</button>
    `;

    playSuccessSound();
}

// Efectos de Sonido (Sintetizados con Web Audio API)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'pop') {
        // Short high pitched pop
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'paper') {
        // White noise burst
        // (Simplified for brevity, using a low tone puff instead)
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(100, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.15);
    } else if (type === 'success') {
        // Major Chord Arpeggio
        const now = audioCtx.currentTime;
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gn = audioCtx.createGain();
            osc.connect(gn);
            gn.connect(audioCtx.destination);

            osc.frequency.value = freq;
            gn.gain.setValueAtTime(0.1, now + i * 0.1);
            gn.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.5);

            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.5);
        });
    }
}
function playSuccessSound() { playSound('success'); }
