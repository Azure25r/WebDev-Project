// Grab DOM elements
const modal = document.getElementById('loginModal');
const openBtn = document.getElementById('openLogin');
const closeBtn = document.getElementById('closeModal');

openBtn.addEventListener('click', (e) => {
  e.preventDefault(); // Prevents link from refreshing the page
  modal.style.display = 'flex'; // Shows the modal centered on screen
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

