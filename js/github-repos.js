(function(){

    const GITHUB_USER = "AliceKaleno";
    const container = document.getElementById("githubRepos");

    if (!container) return;

    const langColors = {
        JavaScript: "#f1e05a",
        HTML: "#e34c26",
        CSS: "#563d7c",
        Python: "#3572A5",
        TypeScript: "#3178c6",
        Java: "#b07219",
        default: "#ff003c"
    };

    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=9`)
        .then(res => {
            if (!res.ok) throw new Error("Falha ao buscar repositórios");
            return res.json();
        })
        .then(repos => {

            const filtered = repos.filter(r => !r.fork);

            if (filtered.length === 0) {
                container.innerHTML = '<p class="github-loading mono">Nenhum repositório encontrado.</p>';
                return;
            }

            container.innerHTML = "";

            filtered.forEach(repo => {

                const card = document.createElement("div");
                card.className = "github-card";

                const lang = repo.language || "Code";
                const color = langColors[lang] || langColors.default;

                const demoHtml = repo.homepage && repo.homepage.trim() !== ""
                    ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="github-demo-btn">Ver Demo</a>`
                    : `<span class="github-demo-empty mono">sem demo cadastrado</span>`;

                card.innerHTML = `
                    <div class="github-card-top">
                        <h3>${repo.name}</h3>
                        <span class="github-star mono">★ ${repo.stargazers_count}</span>
                    </div>
                    <p>${repo.description ? repo.description : "Sem descrição disponível."}</p>
                    <div class="github-card-bottom">
                        <span class="github-lang">
                            <span class="lang-dot" style="background:${color}"></span>
                            ${lang}
                        </span>
                        <span class="github-updated mono">
                            atualizado em ${new Date(repo.updated_at).toLocaleDateString("pt-BR")}
                        </span>
                    </div>
                    <div class="github-card-actions">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="github-code-btn">Ver Código</a>
                        ${demoHtml}
                    </div>
                `;

                container.appendChild(card);

            });

        })
        .catch(() => {

            container.innerHTML = `
                <p class="github-loading mono">
                    Não foi possível carregar os repositórios agora.
                    <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener noreferrer">Ver no GitHub</a>
                </p>
            `;

        });

})();
