import { showLoginModal, getLoggedUser } from './LoginModal.js';
import { renderNewsPanel } from './NewsPanel.js';
import { renderGameApp } from './GameApp.js';
import { renderDynamicBanner } from './DynamicBanner.js';

function renderHomePage(container) {
    container.innerHTML = `
        <div class="logo-wrap">
            <div class="logo-bg-circle"></div>
            <img src="assets/logo.png" class="logo-main" alt="Logo gry 4Survive.pl">
        </div>
        <h1>4Survive.pl</h1>
        <div class="slogan">
            Przetrwaj. Odkrywaj. Rywalizuj.<br>
            <span style="font-size:1em; color:var(--accent-dark)">Postapokaliptyczna gra przeglądarkowa online</span>
        </div>
        <div class="dynamic-banner" id="dynamic-banner"></div>
        <div class="hero-art"></div>
        <div class="home-actions">
            <button class="home-btn" id="btn-play">Zagraj teraz</button>
            <button class="home-btn secondary-btn" id="btn-about">O grze</button>
            <button class="home-btn secondary-btn" id="btn-news">Aktualności</button>
        </div>
        <div id="panel-main">
            ${getIntroPanel()}
        </div>
        <div class="social-links" aria-label="Linki społecznościowe">
            <a href="https://discord.com/" target="_blank" title="Discord" aria-label="Discord"><span>🗨️</span></a>
            <a href="https://facebook.com/" target="_blank" title="Facebook" aria-label="Facebook"><span>📘</span></a>
            <a href="mailto:kontakt@4survive.pl" title="E-mail" aria-label="Email"><span>✉️</span></a>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} 4Survive.pl &mdash; Gra autorska polskiego zespołu. Wszelkie prawa zastrzeżone.
        </div>
    `;

    document.getElementById('btn-play').onclick = () => {
        if (getLoggedUser()) {
            renderGameApp(document.getElementById('app'), getLoggedUser());
        } else {
            showLoginModal(() => renderGameApp(document.getElementById('app'), getLoggedUser()));
        }
    };
    document.getElementById('btn-about').onclick = () => {
        document.getElementById('panel-main').innerHTML = getAboutPanel();
    };
    document.getElementById('btn-news').onclick = () => {
        const panel = document.getElementById('panel-main');
        renderNewsPanel(panel);
    };

    renderDynamicBanner();
}

function getIntroPanel() {
    return `<div class='panel'>
        <div class='section-title'>4Survive</div>
        <div class='intro-text'>Witaj w postapokaliptycznej grze przeglądarkowej! Zaloguj się, by zacząć przygodę i być częścią rozwoju.</div>
    </div>`;
}

// ROZBUDOWANA SEKCJA "O GRZE" Z EMOJI I NAZWĄ
function getAboutPanel() {
    return `<div class='panel about-panel'>
        <div class='section-title'>O grze</div>
        <div class='about-description'>
            4Survive to przeglądarkowa gra MMO w klimacie postapokaliptycznym, tworzona przez pasjonatów. Rywalizuj, eksploruj i przetrwaj w świecie po zagładzie!
        </div>
        <div class='about-features-grid'>
            <div class='about-feature'>
                <div class="about-emoji">🌆</div>
                <div class="about-label">Postapokalipsa</div>
                <h3>Postapokaliptyczny świat</h3>
                <p>Odkrywaj zrujnowane lokacje, szukaj zasobów i walcz o przetrwanie.</p>
            </div>
            <div class='about-feature'>
                <div class="about-emoji">🎒</div>
                <div class="about-label">Ekwipunek</div>
                <h3>Rozbudowany ekwipunek</h3>
                <p>Zbieraj, ulepszaj i wykorzystuj przedmioty, które zwiększą Twoje szanse na przeżycie.</p>
            </div>
            <div class='about-feature'>
                <div class="about-emoji">🤝</div>
                <div class="about-label">Społeczność</div>
                <h3>Społeczność graczy</h3>
                <p>Twórz klany, współpracuj lub rywalizuj z innymi graczami, bierz udział w wydarzeniach.</p>
            </div>
            <div class='about-feature'>
                <div class="about-emoji">📜</div>
                <div class="about-label">Zadania</div>
                <h3>Zadania i wyzwania</h3>
                <p>Wykonuj codzienne misje, podejmuj wyzwania i zdobywaj nagrody.</p>
            </div>
            <div class='about-feature'>
                <div class="about-emoji">⚔️</div>
                <div class="about-label">PvP & PvE</div>
                <h3>Walki PvP & PvE</h3>
                <p>Walcz z potworami i innymi graczami. Każde starcie to nowe doświadczenie!</p>
            </div>
            <div class='about-feature'>
                <div class="about-emoji">🎉</div>
                <div class="about-label">Wydarzenia</div>
                <h3>Dynamiczne wydarzenia</h3>
                <p>Weź udział w eventach, które na stałe zmieniają świat gry.</p>
            </div>
        </div>
    </div>`;
}

export { renderHomePage };