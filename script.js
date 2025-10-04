const username = "JiRaYaOG";
const repoContainer = document.getElementById("repo-list");
const searchInput = document.getElementById("searchInput");

async function fetchRepos() {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await response.json();

    if (!Array.isArray(data)) {
      repoContainer.innerHTML = `<p class="loading">⚠️ Erreur : impossible de charger les repositories.</p>`;
      return;
    }

    displayRepos(data);

    // Ajout de la recherche
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = data.filter(repo =>
        repo.name.toLowerCase().includes(term) ||
        (repo.description && repo.description.toLowerCase().includes(term))
      );
      displayRepos(filtered);
    });

  } catch (error) {
    console.error("Erreur API GitHub :", error);
    repoContainer.innerHTML = `<p class="loading">⚠️ Erreur de chargement des données.</p>`;
  }
}

function displayRepos(repos) {
  repoContainer.innerHTML = "";

  repos.forEach(repo => {
    const card = document.createElement("div");
    card.className = "repo-card";
    card.innerHTML = `
      <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
      <p>${repo.description ? repo.description : "Aucune description"}</p>
      <div class="repo-stats">
        <span>⭐ ${repo.stargazers_count}</span>
        <span>🍴 ${repo.forks_count}</span>
      </div>
    `;
    repoContainer.appendChild(card);
  });
}

fetchRepos();
