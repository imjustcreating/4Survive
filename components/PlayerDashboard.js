import { getLoggedUser, logoutUser } from './LoginModal.js';

function renderPlayerDashboard(container) {
    let user = getLoggedUser();
    if (!user) {
        container.innerHTML = '<div class="panel">Brak zalogowanego użytkownika.</div>';
        return;
    }

    // Zabezpieczenie!
    if (!user.history) user.history = [];

    container.innerHTML = `
        <div class="player-dashboard">
            <div class="player-dash-header">
                <div class="player-avatar">🙂</div>
                <div class="player-header-info">
                    <div class="player-login">${user.login}</div>
                    <div class="player-level">Poziom: ${user.level || 1}</div>
                    <div class="player-id">ID: ${user.id || '-'}</div>
                </div>
                <button class="player-logout-btn" id="logout-btn">Wyloguj</button>
            </div>
            <div class="player-dash-main">
                <div class="player-stats">
                    <div class="stat-row">
                        <span class="player-stat-label">HP:</span>
                        <span class="stat-value">${user.hp || 100}</span>
                    </div>
                    <!-- inne statystyki -->
                </div>
                <div class="player-history-details">
                    <details>
                        <summary>Historia gracza (${user.history.length})</summary>
                        <ul class="player-history-log">
                            ${user.history.map(ev =>
                                `<li>${ev.text} <span class="ev-log-date">${ev.date}</span></li>`
                            ).join('')}
                        </ul>
                    </details>
                </div>
            </div>
        </div>
    `;

    document.getElementById('logout-btn').onclick = () => {
        logoutUser();
        location.reload();
    };
}

export { renderPlayerDashboard };