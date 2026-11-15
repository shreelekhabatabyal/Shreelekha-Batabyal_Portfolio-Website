(() => {
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.work-card[data-category]')];

  filterButtons.forEach((button) => button.addEventListener('click', () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });

    cards.forEach((card) => {
      card.hidden = selected !== 'all' &&
        card.dataset.category !== selected;
    });
  }));

  const dialog = document.querySelector('#project-dialog');

  if (dialog) {
    const title = dialog.querySelector('#dialog-title');
    const description = dialog.querySelector('#dialog-description');
    const meta = dialog.querySelector('#dialog-meta');
    const link = dialog.querySelector('#dialog-link');

    const previews = {
      research: {
        title: 'Questions worth investigating.',
        description: 'A research space for following a question from first observation to evidence, interpretation and a more thoughtful conclusion. Add the specific research question, method, findings and sources as the project develops.',
        meta: 'RESEARCH · INQUIRY · EVIDENCE',
        href: '#project-notes',
        link: 'Read research notes'
      },
      community: {
        title: 'Showing up with purpose.',
        description: 'A record of community initiatives and shared work: the need behind each effort, the people involved, the contribution made and what the experience taught me.',
        meta: 'COMMUNITY · PARTICIPATION · REFLECTION',
        href: '#community-notes',
        link: 'Read community reflections'
      },
      design: {
        title: 'From an idea to something tangible.',
        description: 'A place for prototypes, creative experiments and design decisions. Document the brief, iterations, feedback and what changed between the first idea and the final outcome.',
        meta: 'DESIGN · PROTOTYPING · ITERATION',
        href: '#making-notes',
        link: 'Read design decisions'
      },
      journal: {
        title: 'The thinking behind the outcome.',
        description: 'Short working notes about what worked, what did not, what changed and what I would approach differently next time.',
        meta: 'PROCESS · NOTES · LEARNING',
        href: '#project-notes',
        link: 'Read the research log'
      }
    };

    document.querySelectorAll('[data-project]').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const item = previews[trigger.dataset.project];
        if (!item) return;

        title.textContent = item.title;
        description.textContent = item.description;
        meta.textContent = item.meta;
        link.textContent = item.link;
        link.setAttribute('href', item.href);

        dialog.showModal();
      });
    });

    dialog.querySelector('.dialog-close').addEventListener('click', () => {
      dialog.close();
    });

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });

    link.addEventListener('click', () => dialog.close());
  }

  const revealItems = document.querySelectorAll('.reveal');

  if (
    'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -25px 0px'
    });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();