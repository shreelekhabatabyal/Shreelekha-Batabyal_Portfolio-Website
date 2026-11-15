
(() => {
  const buttons = [
    ...document.querySelectorAll('[data-writing-filter]')
  ];

  const shelves = [
    ...document.querySelectorAll('[data-shelf]')
  ];

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.writingFilter;

      buttons.forEach((item) => {
        const active = item === button;

        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      shelves.forEach((shelf) => {
        shelf.hidden =
          selected !== 'all' &&
          shelf.dataset.shelf !== selected;
      });
    });
  });
})();
