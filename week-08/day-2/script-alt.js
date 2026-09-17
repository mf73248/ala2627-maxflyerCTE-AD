const modeData = {
  baseball: {
    name: 'Baseball',
    text: 'Baseball is all about discipline, timing, and staying calm under pressure. Every move teaches me to react fast and stay locked in.',
    tags: ['Timing', 'Focus', 'Movement'],
    labels: ['Ready', 'Fast feet', 'Sharp eyes']
  },
  drumming: {
    name: 'Drumming',
    text: 'Drumming gives me rhythm, precision, and confidence. It is all about feeling the beat and building energy with every motion.',
    tags: ['Rhythm', 'Coordination', 'Energy'],
    labels: ['Steady pulse', 'Locked in', 'Big fill']
  },
  computer: {
    name: 'Computer work',
    text: 'Computer work is where I turn ideas into structure, motion, and polished experiences. It rewards creativity and problem solving together.',
    tags: ['Coding', 'Design', 'Problem solving'],
    labels: ['Structure', 'Flow', 'Launch']
  }
};

const title = document.getElementById('mode-title');
const text = document.getElementById('mode-text');
const tags = document.getElementById('mode-tags');
const sceneTop = document.getElementById('scene-top');
const sceneMid = document.getElementById('scene-mid');
const sceneBottom = document.getElementById('scene-bottom');
const buttons = [...document.querySelectorAll('.mode')];
const cards = [...document.querySelectorAll('.skill-card')];

function setMode(mode) {
  const info = modeData[mode];
  if (!info) return;

  title.textContent = info.name;
  text.textContent = info.text;
  tags.innerHTML = info.tags.map((tag) => `<li>${tag}</li>`).join('');
  [sceneTop.textContent, sceneMid.textContent, sceneBottom.textContent] = info.labels;

  buttons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.mode === mode);
  });

  cards.forEach((card) => {
    card.classList.toggle('is-selected', card.dataset.mode === mode);
  });
}

buttons.forEach((button) => {
  button.addEventListener('click', () => setMode(button.dataset.mode));
});

cards.forEach((card) => {
  card.addEventListener('click', () => setMode(card.dataset.mode));
});

const counters = [...document.querySelectorAll('[data-target]')];
const countUp = (element) => {
  const target = Number(element.dataset.target);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 30));

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = current;
  }, 40);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => observer.observe(counter));

const rippleButtons = document.querySelectorAll('.nav-button, .primary-btn, .secondary-btn, .card-button, .mode');

rippleButtons.forEach((button) => {
  button.addEventListener('pointerdown', (event) => {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    ripple.className = 'ripple';

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const cardTilt = document.querySelectorAll('.skill-card');
cardTilt.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = (0.5 - (y / rect.height)) * 12;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});
