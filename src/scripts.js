const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Load theme from localStorage or default to dark
if (localStorage.getItem('theme') === 'light') {
  htmlElement.setAttribute('data-bs-theme', 'light');
  themeToggle.checked = true;
  themeToggle.nextElementSibling.textContent = 'Dark Mode';
} else {
  htmlElement.setAttribute('data-bs-theme', 'dark');
  themeToggle.checked = false;
  themeToggle.nextElementSibling.textContent = 'Light Mode';
}

themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    htmlElement.setAttribute('data-bs-theme', 'light');
    localStorage.setItem('theme', 'light');
    themeToggle.nextElementSibling.textContent = 'Dark Mode';
  } else {
    htmlElement.setAttribute('data-bs-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeToggle.nextElementSibling.textContent = 'Light Mode';
  }
});

//Projects
const projectsContainer = document.getElementById('projects-container');

fetch('https://api.github.com/users/sharwaridali/repos')
  .then(response => response.json())
  .then(repos => {
    repos
      .filter(repo => !repo.fork)
      .forEach(repo => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';

        col.innerHTML = `
          <div class="card h-100 shadow-sm border-0">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title purple-text">${repo.name}</h5>
              <p class="card-text flex-grow-1">${repo.description || 'No description provided.'}</p>
              <a href="${repo.html_url}" class="btn btn-outline-primary mt-auto" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </div>
          </div>
        `;
        projectsContainer.appendChild(col);
      });
  })
  .catch(error => {
    projectsContainer.innerHTML = '<p class="text-danger">Failed to load projects. Please try again later.</p>';
    console.error('Error fetching repos:', error);
  });