import { showLoginModal, getLoggedUser } from './LoginModal.js';
import { renderNewsPanel } from './NewsPanel.js';
import { renderGameApp } from './GameApp.js';
import { renderDynamicBanner } from './DynamicBanner.js';

function renderHomePage(container) {
    // Spraw by #app miał padding tylko jeśli nie jest LoginModal
    container.innerHTML = `
        <div id="main-root-home">
            ${getAnnouncementPanel()}
            ${getTopNav()}
            <section class="highlighted-news-panel">
                ${getHighlightedNewsPanel()}
            </section>
            <section class="hero-section">
                <div class="logo-wrap-hero">
                    <img src="assets/logo.png" class="logo-main-hero" alt="Logo gry 4Survive.pl">
                </div>
                <div class="hero-content">
                    <h1>4Survive.pl</h1>
                    <div class="hero-slogan">
                        <span class="hero-icon">☢️</span> Przetrwaj. Odkrywaj. Rywalizuj.
                        <br>
                        <span class="hero-slogan-small">Postapokaliptyczna gra przeglądarkowa online</span>
                    </div>
                    <button class="cta-btn-hero" id="btn-play">Zagraj teraz</button>
                </div>
                <div class="dynamic-banner" id="dynamic-banner"></div>
            </section>
            <section id="panel-main" class="main-panel-content"></section>
            <section class="community-panel">
                <div class="community-title"><span class="community-icon">💬</span> Społeczność</div>
                <div class="community-links">
                    <a href="https://discord.com/" target="_blank" class="community-link">
                        <span class="community-link-icon">🗨️</span>
                        <span>Discord</span>
                    </a>
                    <a href="https://facebook.com/" target="_blank" class="community-link">
                        <span class="community-link-icon">📘</span>
                        <span>Facebook</span>
                    </a>
                    <a href="mailto:kontakt@4survive.pl" class="community-link">
                        <span class="community-link-icon">✉️</span>
                        <span>Email</span>
                    </a>
                </div>
                <div class="community-desc">
                    Dołącz do naszej społeczności, dziel się pomysłami i graj razem!
                </div>
            </section>
            <footer class="footer-adv">
                &copy; ${new Date().getFullYear()} 4Survive.pl &mdash; Gra autorska polskiego zespołu. Wszelkie prawa zastrzeżone.
            </footer>
        </div>
    `;

    document.getElementById('nav-about').onclick = showAboutSection;
    document.getElementById('nav-news').onclick = showNewsSection;

    // Domyślnie "O grze"
    showAboutSection();

    document.getElementById('btn-play').onclick = () => {
        if (getLoggedUser()) {
            renderGameApp(document.getElementById('app'), getLoggedUser());
        } else {
            // Zablokuj przewijanie tła gdy modal aktywny
            document.body.style.overflow = 'hidden';
            showLoginModal(() => {
                document.body.style.overflow = '';
                renderGameApp(document.getElementById('app'), getLoggedUser());
            }, () => {
                // Odblokuj scroll jeśli zamknięto modal
                document.body.style.overflow = '';
            });
        }
    };

    renderDynamicBanner();
}

// NAV
function getTopNav() {
    return `
        <nav class="top-nav">
            <ul>
                <li><a href="#" id="nav-about"><span class="icon-btn-panel">🧭</span> O grze</a></li>
                <li><a href="#" id="nav-news"><span class="icon-btn-panel">📰</span> Aktualności</a></li>
            </ul>
        </nav>
    `;
}

function showAboutSection() {
    document.getElementById('panel-main').innerHTML = `
        <section class="about-panel">
            <div class='section-title'><span class="about-panel-icon">🧭</span> O grze</div>
            <div class='about-description'>
                4Survive to przeglądarkowa gra MMO osadzona w klimacie postapokalipsy. Twórz klany, eksploruj świat, walcz o przetrwanie!
            </div>
            <div class='about-features-grid'>
                <div class='about-feature'>
                    <div class="about-emoji">🌆</div>
                    <div class="about-label">Postapokalipsa</div>
                    <h3>Postapokaliptyczny świat</h3>
                    <p>Odkrywaj zrujnowane lokacje, szukaj zasobów, walcz o przetrwanie.</p>
                </div>
                <div class='about-feature'>
                    <div class="about-emoji">🎒</div>
                    <div class="about-label">Ekwipunek</div>
                    <h3>Rozbudowany ekwipunek</h3>
                    <p>Zbieraj, ulepszaj i wykorzystuj przedmioty zwiększające Twoje szanse na przetrwanie.</p>
                </div>
                <div class='about-feature'>
                    <div class="about-emoji">🤝</div>
                    <div class="about-label">Społeczność</div>
                    <h3>Klanowy system</h3>
                    <p>Twórz klany, współpracuj lub rywalizuj z innymi graczami, bierz udział w eventach.</p>
                </div>
                <div class='about-feature'>
                    <div class="about-emoji">📜</div>
                    <div class="about-label">Zadania</div>
                    <h3>Zadania i wyzwania</h3>
                    <p>Codzienne misje, wyzwania i nagrody czekają na najbardziej wytrwałych.</p>
                </div>
                <div class='about-feature'>
                    <div class="about-emoji">⚔️</div>
                    <div class="about-label">PvP & PvE</div>
                    <h3>Walki PvP & PvE</h3>
                    <p>Walcz z potworami, innymi graczami i zdobywaj unikalne łupy!</p>
                </div>
                <div class='about-feature'>
                    <div class="about-emoji">🎉</div>
                    <div class="about-label">Wydarzenia</div>
                    <h3>Dynamiczne wydarzenia</h3>
                    <p>Specjalne eventy, które zmieniają świat gry i pozwalają zdobyć nowe nagrody.</p>
                </div>
            </div>
        </section>
    `;
    setActiveNav('nav-about');
}

function showNewsSection() {
    document.getElementById('panel-main').innerHTML = `
        <section class="news-section-home">
            <div class="news-preview-grid">
                <div class="news-card">
                    <div class="news-card-title"><span class="news-card-emoji">🎃</span> Nowy event: Noc Mutantów!</div>
                    <div class="news-card-date">2025-06-20</div>
                    <div class="news-card-body">Przygotuj się na walkę ze zmutowanymi potworami i zbierz specjalne nagrody! Sprawdź szczegóły w dziale wydarzenia.</div>
                </div>
                <div class="news-card">
                    <div class="news-card-title"><span class="news-card-emoji">🪙</span> Wielka aktualizacja ekwipunku</div>
                    <div class="news-card-date">2025-06-10</div>
                    <div class="news-card-body">System ekwipunku został przebudowany. Nowe przedmioty i możliwości ulepszania już dostępne!</div>
                </div>
                <div class="news-card">
                    <div class="news-card-title"><span class="news-card-emoji">💬</span> Dołącz do społeczności Discord</div>
                    <div class="news-card-date">2025-05-22</div>
                    <div class="news-card-body">Porozmawiaj z innymi graczami, zgłaszaj pomysły i bierz udział w konkursach!</div>
                </div>
            </div>
        </section>
    `;
    setActiveNav('nav-news');
}

function setActiveNav(id) {
    document.getElementById('nav-about').classList.remove('active-nav');
    document.getElementById('nav-news').classList.remove('active-nav');
    document.getElementById(id).classList.add('active-nav');
}

// OGŁOSZENIE
function getAnnouncementPanel() {
    return `
        <div class="announcement-panel">
            <div class="announcement-item urgent">
                <span class="announcement-emoji urgent">❗</span>
                <b>Gra jest w wersji testowej.</b> Obecnie serwery są wyłączone.
            </div>
        </div>
    `;
}

// Najważniejsze newsy (pod ogłoszeniem, nad hero)
function getHighlightedNewsPanel() {
    return `
        <div class="highlighted-news-list">
            <div class="highlighted-news-card">
                <div class="highlighted-news-emoji">🎃</div>
                <div>
                    <div class="highlighted-news-title">Nowy event: Noc Mutantów!</div>
                    <div class="highlighted-news-date">2025-06-20</div>
                    <div class="highlighted-news-body">Przygotuj się na walkę ze zmutowanymi potworami i zbierz specjalne nagrody! Sprawdź szczegóły w dziale wydarzenia.</div>
                </div>
            </div>
            <div class="highlighted-news-card">
                <div class="highlighted-news-emoji">🪙</div>
                <div>
                    <div class="highlighted-news-title">Wielka aktualizacja ekwipunku</div>
                    <div class="highlighted-news-date">2025-06-10</div>
                    <div class="highlighted-news-body">System ekwipunku został przebudowany. Nowe przedmioty i możliwości ulepszania już dostępne!</div>
                </div>
            </div>
            <div class="highlighted-news-card">
                <div class="highlighted-news-emoji">💬</div>
                <div>
                    <div class="highlighted-news-title">Dołącz do społeczności Discord</div>
                    <div class="highlighted-news-date">2025-05-22</div>
                    <div class="highlighted-news-body">Porozmawiaj z innymi graczami, zgłaszaj pomysły i bierz udział w konkursach!</div>
                </div>
            </div>
        </div>
    `;
}

export { renderHomePage };