document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
    loadRepositories();
    loadSuggestedContent();
    loadColleagues();
});

function loadProfile() {
    const username = 'dev1amin'; // Substitua pelo seu nome de usuário do GitHub
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            const profileDiv = document.getElementById('profile');
            profileDiv.innerHTML = `
                <img src="${data.avatar_url}" alt="Foto de Perfil" width="150">
                <div>
                    <h3>${data.name}</h3>
                    <p>${data.bio}</p>
                    <p>Location: ${data.location}</p>
                    <p>Site: <a href="${data.blog}" target="_blank">${data.blog}</a></p>
                    <p>Followers: ${data.followers}</p>
                    <a href="${data.html_url}" target="_blank"><i class="fa fa-github"></i></a>
                    <a href="https://twitter.com/${data.twitter_username}" target="_blank"><i class="fa fa-twitter"></i></a>
                    <a href="https://instagram.com/${data.instagram_username}" target="_blank"><i class="fa fa-instagram"></i></a>
                </div>
            `;
        })
        .catch(error => console.error('Erro ao carregar o perfil:', error));
}

function loadRepositories() {
    const username = 'dev1amin'; // Substitua pelo seu nome de usuário do GitHub
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            const repositoriesDiv = document.getElementById('repositories');
            const toggleButton = document.getElementById('toggleButton');
            const maxToShow = 6;
            let showingAll = false;

            const renderRepositories = (repos, showAll) => {
                repositoriesDiv.innerHTML = '';
                const reposToShow = showAll ? repos : repos.slice(0, maxToShow);
                reposToShow.forEach(repo => {
                    const repoDiv = document.createElement('div');
                    repoDiv.classList.add('repo');
                    repoDiv.innerHTML = `
                        <h4>${repo.name}</h4>
                        <p>${repo.description}</p>
                        <a href="repo.html?repo=${repo.name}" >Ver Repositório</a>
                    `;
                    repositoriesDiv.appendChild(repoDiv);
                });
                toggleButton.innerText = showAll ? 'Ver Menos' : 'Ver Mais';
            };

            renderRepositories(data, showingAll);

            toggleButton.onclick = () => {
                showingAll = !showingAll;
                renderRepositories(data, showingAll);
            };
        })
        .catch(error => console.error('Erro ao carregar repositórios:', error));
}

function loadSuggestedContent() {
    fetch('https://api-trabalho-pratico.onrender.com/highlights') // Substitua pela URL da sua API do JSONServer
        .then(response => response.json())
        .then(data => {
            const suggestedContentDiv = document.querySelector('.swiper-wrapper');
            data.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('swiper-slide');
                itemDiv.innerHTML = `
                    <img src="${item.coverImageUrl}" alt="${item.title}" width="150">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <a href="${item.contentUrl}" target="_blank">Ver Conteúdo</a>
                `;
                suggestedContentDiv.appendChild(itemDiv);
            });
            initializeCarousel();
        })
        .catch(error => console.error('Erro ao carregar conteúdo sugerido:', error));
}

function loadColleagues() {
    fetch('https://api-trabalho-pratico.onrender.com/colleagues') // Substitua pela URL da sua API do JSONServer
        .then(response => response.json())
        .then(data => {
            const colleaguesDiv = document.getElementById('colleagues');
            data.forEach(colleague => {
                const colleagueDiv = document.createElement('div');
                colleagueDiv.classList.add('colleague');
                colleagueDiv.innerHTML = `
                    <img src="${colleague.photoUrl}" alt="${colleague.name}" width="100">
                    <h4>${colleague.name}</h4>
                    <a href="${colleague.githubProfileUrl}" target="_blank">Ver Perfil no GitHub</a>
                `;
                colleaguesDiv.appendChild(colleagueDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar colegas:', error));
}

function initializeCarousel() {
    new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
        },
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadRepositoryDetails();
});

function loadRepositoryDetails() {
    const params = new URLSearchParams(window.location.search);
    const repoName = params.get('repo');
    const username = 'dev1amin'; // Substitua pelo seu nome de usuário do GitHub

    if (repoName) {
        fetch(`https://api.github.com/repos/${username}/${repoName}`)
            .then(response => response.json())
            .then(data => {
                const repoDetailsDiv = document.getElementById('repository-details');
                repoDetailsDiv.innerHTML = `
                    <h2>${data.name}</h2>
                    <p>${data.description}</p>
                    <p>Data de Criação: ${new Date(data.created_at).toLocaleDateString()}</p>
                    <p>Linguagem: ${data.language}</p>
                    <p>Estrelas: ${data.stargazers_count}</p>
                    <p>Forks: ${data.forks_count}</p>
                    <a href="${data.html_url}" target="_blank">Ver no GitHub</a>
                `;
            })
            .catch(error => console.error('Erro ao carregar detalhes do repositório:', error));
    } else {
        console.error('Nenhum repositório especificado na URL');
    }
}