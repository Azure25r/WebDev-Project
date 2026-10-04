// ==========================================
// 1. LOGIN MODAL LOGIC
// ==========================================
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

// ==========================================
// 2. CODEFORCES STATS TRACKER LOGIC
// ==========================================
const searchBtn = document.getElementById('search-button');
const searchInput = document.getElementById('search');

if (searchBtn && searchInput) {
  searchBtn.addEventListener('click', fetchStats);

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      fetchStats();
    }
  });
}

async function fetchStats() {
  const handle = searchInput.value.trim();

  const ratingEl = document.getElementById('rating');
  const rankEl = document.getElementById('rank');
  const maxRatingEl = document.getElementById('max-rating');
  const contribEl = document.getElementById('contribution');

  if (!handle) {
    alert('Please enter a Codeforces handle.');
    return;
  }

  ratingEl.textContent = '...';
  rankEl.textContent = '...';
  maxRatingEl.textContent = '...';
  contribEl.textContent = '...';

  try {
    const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
    const data = await response.json();

    if (data.status === 'OK') {
      const user = data.result[0];

      ratingEl.textContent = user.rating ?? 'Unrated';
      rankEl.textContent = user.rank ?? 'N/A';
      maxRatingEl.textContent = user.maxRating ?? 'Unrated';
      contribEl.textContent = user.contribution ?? '0';
    } else {
      alert('User not found. Please check the handle.');
      resetFields();
    }
  } catch (error) {
    alert('Failed to fetch data. Check your internet connection.');
    resetFields();
  }
}

function resetFields() {
  document.getElementById('rating').textContent = '--';
  document.getElementById('rank').textContent = '--';
  document.getElementById('max-rating').textContent = '--';
  document.getElementById('contribution').textContent = '--';
}
