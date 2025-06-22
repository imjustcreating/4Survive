export function renderPlayerPanel(container, user) {
  container.innerHTML = `
    <div class="panel player-panel">
      <div class="player-panel-header">
        <span class="player-panel-avatar">${user.avatar || "🧑"}</span>
        <div>
          <span class="player-panel-login">${user.login}</span>
          <span class="player-panel-level">Poziom: <b>${user.level || 1}</b></span>
        </div>
      </div>
      <div class="player-panel-stats">
        <div>💚 Zdrowie: <b>${user.health || 100}/100</b></div>
        <div>⚡ Energia: <b>${user.energy || 100}/100</b></div>
        <div>⭐ XP: <b>${user.xp || 0}</b></div>
      </div>
      <details class="player-panel-history">
        <summary>Historia zdarzeń</summary>
        <ul>
        ${
          Array.isArray(user.history) && user.history.length > 0
            ? user.history.slice(-10).reverse().map(ev =>
                `<li>${ev.text} <span class="ev-log-date">${ev.date}</span></li>`).join("")
            : "<li>Brak zdarzeń.</li>"
        }
        </ul>
      </details>
    </div>
  `;
}