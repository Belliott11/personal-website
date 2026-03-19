(function(){
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Theme toggle
  const btn = document.getElementById('theme-toggle');
  const current = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', current);
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();
