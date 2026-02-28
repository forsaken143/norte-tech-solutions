document.addEventListener('DOMContentLoaded', () => {
  const zoomableImages = document.querySelectorAll('.product-image, .menu-image');
  if (!zoomableImages.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'image-zoom-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  overlay.innerHTML = `
    <div class="image-zoom-modal" role="dialog" aria-modal="true" aria-label="Image preview">
      <button class="image-zoom-close" aria-label="Close image preview">×</button>
      <img alt="Zoomed image preview" />
    </div>
  `;

  document.body.appendChild(overlay);

  const modal = overlay.querySelector('.image-zoom-modal');
  const previewImage = overlay.querySelector('img');
  const closeButton = overlay.querySelector('.image-zoom-close');

  const openZoom = (sourceImage) => {
    previewImage.src = sourceImage.currentSrc || sourceImage.src;
    previewImage.alt = sourceImage.alt || 'Zoomed image preview';
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeZoom = () => {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    previewImage.src = '';
    document.body.style.overflow = '';
  };

  zoomableImages.forEach((image) => {
    image.addEventListener('click', () => openZoom(image));
  });

  closeButton.addEventListener('click', closeZoom);
  overlay.addEventListener('click', (event) => {
    if (!modal.contains(event.target)) closeZoom();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('active')) {
      closeZoom();
    }
  });
});
