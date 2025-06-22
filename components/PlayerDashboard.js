import { renderLocationList } from "./LocationList.js";
import { getLoggedUser, logoutUser } from './LoginModal.js';

export function renderPlayerDashboard(container, player = null) {
  // Pozwól na przekazanie usera lub pobranie z sesji
  const user = player || getLoggedUser();
  if (!user) {
    container.innerHTML = '<div class="panel">Brak zalogowanego użytkownika.</div>';
    return;
  }

  if (!user.history) user.history = [];
  if (!user.inventory) user.inventory = [];

  container.innerHTML = "";

  const panel = document.createElement("div");
  panel.className = "player-dashboard panel player-dashboard--wide";
  panel.innerHTML = `
    <div class="player-dash-header">
      <span class="player-avatar" title="Avatar">${user.avatar || "🧑"}</span>
      <div class="player-header-info">
        <span class="player-login">${user.login}</span>
        <span class="player-level">Poziom: <b>${user.level || 1}</b></span>
        <span class="player-id">ID: ${user.id || "-"}</span>
      </div>
      <button class="player-logout-btn" id="logout-btn">Wyloguj</button>
    </div>
    <div class="player-dash-main">
      <div class="player-stats">
        <div class="stat-row">
          <span class="player-stat-label">Zdrowie:</span>
          <div class="stat-bar-wrap">
            <div class="stat-bar player-health-bar" style="width:${user.health || 100}%;"></div>
          </div>
          <span class="stat-value">${user.health || 100}/100</span>
        </div>
        <div class="stat-row">
          <span class="player-stat-label">Energia:</span>
          <div class="stat-bar-wrap">
            <div class="stat-bar player-energy-bar" style="width:${user.energy || 100}%;"></div>
          </div>
          <span class="stat-value">${user.energy || 100}/100</span>
        </div>
        <div class="stat-row">
          <span class="player-stat-label">XP:</span>
          <div class="stat-bar-wrap">
            <div class="stat-bar player-xp-bar" style="width:${user.xp || 0}%;"></div>
          </div>
          <span class="stat-value">${user.xp || 0}</span>
        </div>
      </div>
      <div class="player-inventory-preview">
        <span class="inv-preview-title">Ekwipunek</span>
        <div class="inv-preview-list">
          ${
            Array.isArray(user.inventory) && user.inventory.length > 0
              ? user.inventory
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
            Array.isArray(user.history) && user.history.length > 0
              ? user.history
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

  // Sekcja lokalizacji
  const locationsSection = document.createElement("section");
  locationsSection.id = "locations-section";
  locationsSection.style.marginTop = "32px";
  panel.appendChild(locationsSection);

  // Obsługa podróży
  function handleTravel(location) {
    if (!user.history) user.history = [];
    const now = new Date();
    user.history.push({
      text: `Odwiedził(a) lokację: <b>${location.name}</b>`,
      date: now.toLocaleString("pl-PL"),
    });
    locationsSection.innerHTML = `<div class="panel" style="margin-bottom:24px;">
      <div class="section-title">${location.name}</div>
      <div class="intro-text">${location.desc}</div>
      <div style="margin-top:15px;color:var(--accent);font-size:1.12em;">
        Dotarłeś do tej lokacji! (Tu możesz dodać eventy, losowe nagrody itd.)
      </div>
      <button class="home-btn" id="btn-back-to-locations" style="margin-top:20px;">Powrót do wyboru</button>
    </div>`;
    locationsSection.querySelector("#btn-back-to-locations").onclick = () => {
      renderLocationList(locationsSection, user, handleTravel);
    };
    // Odśwież historię (nie przeładowując całego dashboardu)
    const historyList = panel.querySelector(".player-history-log");
    if (historyList) {
      historyList.innerHTML =
        user.history
          .slice(-8)
          .reverse()
          .map(ev => `<li>${ev.text} <span class="ev-log-date">${ev.date}</span></li>`)
          .join("") || "<li>Brak zdarzeń.</li>";
    }
    // Możesz zapisać usera w sessionStorage, jeśli chcesz zachować historię po odświeżeniu
    sessionStorage.setItem("4survive_currentUser", JSON.stringify(user));
  }

  renderLocationList(locationsSection, user, handleTravel);

  // Obsługa wylogowania
  const logoutBtn = panel.querySelector("#logout-btn");
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      logoutUser();
      location.reload();
    };
  }
}