const username = "JiRaYaOG"; // 🔥 Remplace si besoin

const repoContainer = document.getElementById("repo-list");
const searchInput = document.getElementById("search");

async function fetchRepos() {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await response.json();

    displayRepos(data);

    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filtered = data.filter(repo =>
        repo.name.toLowerCase().includes(searchTerm)
      );
      displayRepos(filtered);
    });

  } catch (error) {
    repoContainer.innerHTML = `<p>⚠️ Impossible de charger les repositories.</p>`;
  }
}

function displayRepos(repos) {
  if (repos.length === 0) {
    repoContainer.innerHTML = `<p>Aucun repository trouvé.</p>`;
    return;
  }

  repoContainer.innerHTML = repos
    .map(repo => `
      <div class="repo-card">
        <h3>${repo.name}</h3>
        <p>${repo.description || "Aucune description"}</p>
        <div class="repo-stats">
          <span>⭐ ${repo.stargazers_count}</span>
          <span>🍴 ${repo.forks_count}</span>
        </div>
        <a href="${repo.html_url}" target="_blank" style="color:#00ffff; text-decoration:none;">🔗 Voir sur GitHub</a>
      </div>
    `)
    .join("");
}

fetchRepos();
