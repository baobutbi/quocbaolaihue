// Atmospheric chill acoustic/lofi ambient synthesizer using Web Audio API

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let isPlaying = false;
let loopTimer: number | null = null;
let listenersAttached = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Gentle warm chord progressions: Cmaj7 -> Am7 -> Dm7 -> G7sus4 -> Em7
const CHORDS = [
  [261.63, 329.63, 392.0, 493.88], // Cmaj7: C4, E4, G4, B4
  [220.0, 261.63, 329.63, 392.0], // Am7: A3, C4, E4, G4
  [293.66, 349.23, 440.0, 523.25], // Dm7: D4, F4, A4, C5
  [196.0, 293.66, 392.0, 440.0], // Gsus4: G3, D4, G4, A4
  [164.81, 246.94, 329.63, 392.0], // Em7: E3, B3, E4, G4
];

function playAcousticChord(chord: number[], startTime: number) {
  if (!audioCtx || !masterGain) return;

  // Strumming effect: play each note in chord slightly offset
  chord.forEach((freq, idx) => {
    if (!audioCtx || !masterGain) return;
    const noteTime = startTime + idx * 0.055;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    // Warm triangle/sine blend
    osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, noteTime);

    // Warm vintage lowpass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, noteTime);
    filter.frequency.exponentialRampToValueAtTime(300, noteTime + 1.8);

    // Gentle pluck envelope
    gain.gain.setValueAtTime(0.001, noteTime);
    gain.gain.linearRampToValueAtTime(0.12, noteTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 2.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    osc.start(noteTime);
    osc.stop(noteTime + 2.5);
  });
}

export function startMusic(onStateChange?: (playing: boolean) => void): boolean {
  try {
    const ctx = getAudioContext();
    if (isPlaying) return true;

    isPlaying = true;
    onStateChange?.(true);

    let chordStep = 0;
    const intervalTime = 2200; // ms per chord

    const loop = () => {
      if (!isPlaying || !audioCtx) return;
      const now = audioCtx.currentTime;
      const currentChord = CHORDS[chordStep % CHORDS.length];
      playAcousticChord(currentChord, now);
      chordStep++;
    };

    loop();
    loopTimer = window.setInterval(loop, intervalTime);
    return true;
  } catch (err) {
    console.debug('Autoplay not allowed yet without user action', err);
    return false;
  }
}

export function stopMusic(onStateChange?: (playing: boolean) => void) {
  if (loopTimer) {
    clearInterval(loopTimer);
    loopTimer = null;
  }
  isPlaying = false;
  onStateChange?.(false);
}

export function toggleMusic(onStateChange?: (playing: boolean) => void): boolean {
  if (isPlaying) {
    stopMusic(onStateChange);
    return false;
  } else {
    return startMusic(onStateChange);
  }
}

export function setupAutoPlayOnInteraction(onStateChange?: (playing: boolean) => void) {
  if (listenersAttached) return;
  listenersAttached = true;

  const trigger = () => {
    if (!isPlaying) {
      startMusic(onStateChange);
    }
    // Remove listeners once activated
    window.removeEventListener('click', trigger);
    window.removeEventListener('keydown', trigger);
    window.removeEventListener('touchstart', trigger);
  };

  window.addEventListener('click', trigger, { once: true });
  window.addEventListener('keydown', trigger, { once: true });
  window.addEventListener('touchstart', trigger, { once: true });
}

// Gentle acoustic tap / pop for like interactions
export function playSoftClick() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(880.0, now + 0.1);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  } catch (e) {
    console.debug('Audio not ready', e);
  }
}
