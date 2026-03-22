/**
 * @fileoverview Lightbox logic for the gallery.
 * @module Lightbox
 */

export function initLightbox() {
  const dialog = document.getElementById('lightbox');
  const closeBtn = document.getElementById('close-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const galleryItems = document.querySelectorAll('.gallery-item img');

  if (!dialog || !(dialog instanceof HTMLDialogElement) || !closeBtn || !lightboxImg) return;

  const closeDialog = () => {
    dialog.close();
    document.body.style.overflow = '';
    lightboxImg.src = '';
    lightboxImg.alt = '';
  };

  galleryItems.forEach((img) => {
    if (!(img instanceof HTMLImageElement)) return;
    
    const item = img.closest('.gallery-item');
    if (!item) return;

    const openDialog = () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || 'Imagem ampliada';
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    };

    item.addEventListener('click', openDialog);
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDialog();
      }
    });
  });

  closeBtn.addEventListener('click', closeDialog);
  
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) closeDialog();
  });
  
  dialog.addEventListener('cancel', closeDialog);
}
