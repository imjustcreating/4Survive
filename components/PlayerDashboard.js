import { renderLocationList } from "./LocationList.js";

// Funkcja renderująca panel gracza z listą lokacji zależną od poziomu
export function renderPlayerDashboard(container, player) {
  container.innerHTML = "";

  // Panel gracza
  const panel = document.createElement("div");
  panel.className = "player-dashboard panel player-dashboard--wide";

  // Nagłówek z danymi gracza
  panel.innerHTML = `
    <div class="player-dash-header">
      <span class="player-avatar" title="Avatar">${player.avatar || "🧑"}</span>
      <div class="player-header-info">
        <span class="player-login">${player.login}</span>
        <span class="player-level">Poziom: <b>${player.level || 1}</b></span>
        <span class="player-id">ID: ${player.id || "-"}</span>
      </div>
      <button class="player-logout-btn" id="logout-btn">Wyloguj</button>
    </div>
    <div class="player-dash-main">
      <div class="player-stats">
        <div class="stat-row">
          <span class="player-stat-label">Zdrowie:</span>
          <div class="stat-bar-wrap">
            <div class="stat-bar player-health-bar" style="width:${player.health || 100}%;"></div>
          </div>
          <span class="stat-value">${player.health || 100}/100</span>
        </div>
        <div class="stat-row">
          <span class="player-stat-label">Energia:</span>
          <div class="stat-bar-wrap">
            <div class="stat-bar player-energy-bar" style="width:${player.energy || 100}%;"></div>
          </div>
          <span class="stat-value">${player.energy || 100}/100</span>
        </div>
        <div class="stat-row">
          <span class="player-stat-label">XP:</span>
          <div class="stat-bar-wrap">
            <div class="stat-bar player-xp-bar" style="width:${player.xp || 0}%;"></div>
          </div>
          <span class="stat-value">${player.xp || 0}</span>
        </div>
      </div>
      <div class="player-inventory-preview">
        <span class="inv-preview-title">Ekwipunek</span>
        <div class="inv-preview-list">
          ${
            Array.isArray(player.inventory) && player.inventory.length > 0
              ? player.inventory
                  .map(
                    (item) =>
                      `<span class="inv-preview-item">${item.emoji || "🎒"} ${item.name} ${
                        item.qty ? `<span class="inv-item-qty">${item.qty}</span>` : ""
                      }</span>`
                  )
                  .join("")
              : "<span style='color:var(--text-muted)'>pusty</span>"
          }
        </div>
      </div>
    </div>
    <div class="player-dash-bottom">
      <details class="player-history-details">
        <summary>Historia zdarzeń</summary>
        <ul class="player-history-log">
          ${
            Array.isArray(player.history) && player.history.length > 0
              ? player.history
                  .slice(-8)
                  .reverse()
                  .map(
                    (ev) =>
                      `<li>${ev.text} <span class="ev-log-date">${ev.date}</span></li>`
                  )
                  .join("")
              : "<li>Brak zdarzeń.</li>"
          }
        </ul>
      </details>
      <div class="player-dash-hint">
        Wskazówka: Odwiedzaj nowe lokacje, aby zdobywać doświadczenie i przedmioty!
      </div>
    </div>
  `;

  container.appendChild(panel);

  // Sekcja lokalizacji zależnych od poziomu
  const locationsContainer = document.createElement("div");
  locationsContainer.id = "locations-list";
  locationsContainer.style.marginTop = "24px";
  panel.appendChild(locationsContainer);

  function handleTravel(location) {
    // Przykładowa obsługa podróży - możesz rozwinąć!
    alert(`Podróżujesz do: ${location.name}\n\n${location.desc}`);
    // Tu można dodać logikę: zmiana stanu gracza, log zdarzeń, losowe eventy itd.
  }

  renderLocationList(locationsContainer, player, handleTravel);

  // Obsługa wylogowania
  const logoutBtn = panel.querySelector("#logout-btn");
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      sessionStorage.removeItem("playerSession");
      location.reload();
    };
  }
}