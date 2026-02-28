document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.highlights-carousel');
  if (!carousels.length) return;

  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.highlights-track');
    const slides = carousel.querySelectorAll('.highlight-slide');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const dotsWrap = carousel.querySelector('.highlights-dots');

    if (!track || !slides.length) return;

    let index = 0;

    const renderDots = () => {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `highlights-dot${i === index ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
          index = i;
          update();
        });
        dotsWrap.appendChild(dot);
      });
    };

    const update = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      const dots = carousel.querySelectorAll('.highlights-dot');
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    };

    prevBtn?.addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      update();
    });

    nextBtn?.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      update();
    });

    setInterval(() => {
      index = (index + 1) % slides.length;
      update();
    }, 5000);

    renderDots();
    update();
  });
});
