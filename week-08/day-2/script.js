
    const skillData = {
      baseball: {
        name: 'Baseball',
        text: 'Baseball is all about discipline, quick decisions, and staying calm when the pressure rises. Every swing and every throw is a lesson in timing and control.',
        tags: ['Timing', 'Focus', 'Movement'],
        art: ['Ready', 'Fast feet', 'Sharp eyes']
      },
      drumming: {
        name: 'Drumming',
        text: 'Drumming is rhythm, control, and feeling the groove in your body. It teaches patience, coordination, and how to build energy with each beat.',
        tags: ['Rhythm', 'Coordination', 'Energy'],
        art: ['Steady pulse', 'Locked in', 'Big fill']
      },
      computer: {
        name: 'Computer work',
        text: 'Computer work is creative problem solving. I like turning ideas into layouts, interactions, and smooth digital experiences that feel polished and useful.',
        tags: ['Coding', 'Design', 'Problem solving'],
        art: ['Structure', 'Flow', 'Launch']
      }
    };

    const spotlightName = document.getElementById('spotlight-name');
    const spotlightText = document.getElementById('spotlight-text');
    const spotlightTags = document.getElementById('spotlight-tags');
    const artOne = document.getElementById('art-one');
    const artTwo = document.getElementById('art-two');
    const artThree = document.getElementById('art-three');
    const spotlightArt = document.getElementById('spotlight-art');
    const chips = [...document.querySelectorAll('.chip')];
    const cards = [...document.querySelectorAll('.skill-card')];

    function setActiveSkill(skillKey) {
      const info = skillData[skillKey];
      if (!info) return;

      spotlightName.textContent = info.name;
      spotlightText.textContent = info.text;
      spotlightTags.innerHTML = info.tags.map(tag => `<li>${tag}</li>`).join('');
      [artOne.textContent, artTwo.textContent, artThree.textContent] = info.art;

      const accentMap = {
        baseball: '#ff9f1c',
        drumming: '#8b5cf6',
        computer: '#22c55e'
      };

      spotlightArt.style.setProperty('--active-accent', accentMap[skillKey]);

      chips.forEach((chip) => {
        chip.classList.toggle('is-active', chip.dataset.skill === skillKey);
      });

      cards.forEach((card) => {
        card.classList.toggle('is-selected', card.dataset.skill === skillKey);
      });
    }

    chips.forEach((chip) => {
      chip.addEventListener('click', () => setActiveSkill(chip.dataset.skill));
    });

    cards.forEach((card) => {
      card.addEventListener('click', () => setActiveSkill(card.dataset.skill));
    });

    document.querySelectorAll('.primary-btn, .secondary-btn, .ghost-btn, .card-button, .chip').forEach((btn) => {
      btn.addEventListener('pointerdown', (event) => {
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
        ripple.className = 'ripple';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

    const counters = [...document.querySelectorAll('[data-count]')];
    const countUp = (el) => {
      const target = Number(el.dataset.count);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 30));
      const ticker = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(ticker);
        }
        el.textContent = current;
      }, 40);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.55 });

    counters.forEach((counter) => observer.observe(counter));

    cards.forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 8;
        const rotateX = (0.5 - (y / rect.height)) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  