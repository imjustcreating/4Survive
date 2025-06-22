import { renderPlayerPanel } from "./PlayerPanel.js";
import { renderLocationPanel } from "./LocationPanel.js";
import { renderInventoryPanel } from "./InventoryPanel.js";
import { renderShopPanel } from "./ShopPanel.js";
import { getLoggedUser, logoutUser } from "./LoginModal.js";

const SECTIONS = [
  { id: "player", label: "Panel Gracza", icon: "🧑" },
  { id: "locations", label: "Lokalizacje", icon: "🌍" },
  { id: "inventory", label: "Ekwipunek", icon: "🎒" },
  { id: "shop", label: "Sklep", icon: "🛒" },
  { id: "logout", label: "Wyloguj", icon: "🚪" }
];

export function renderGameApp(container, player = null) {
  const user = player || getLoggedUser();
  if (!user) {
    container.innerHTML = '<div class="panel">Brak zalogowanego użytkownika.</div>';
    return;
  }

  container.innerHTML = `
    <div class="app-main-layout">
      <nav class="sidebar">
        <div class="sidebar-user">
          <span class="sidebar-avatar">${user.avatar || "🧑"}</span>
          <div class="sidebar-user-info">
            <span class="sidebar-username">${user.login}</span>
            <span class="sidebar-level">Poziom ${user.level || 1}</span>
            <span class="sidebar-hp">💚 ${user.health || 100}/100</span>
          </div>
        </div>
        <div class="sidebar-menu">
          ${SECTIONS.map(sec =>
            `<button class="sidebar-btn" data-section="${sec.id}">
             <span>${sec.icon}</span> <span class="sidebar-btn-label">${sec.label}</span>
             </button>`
          ).join("")}
        </div>
      </nav>
      <main class="main-content" id="main-content"></main>
    </div>
  `;

  // Funkcja renderująca wybraną sekcję
  function showSection(sectionId) {
    const main = container.querySelector("#main-content");
    // Podświetlanie aktywnego przycisku
    container.querySelectorAll(".sidebar-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.section === sectionId);
    });
    // Renderowanie sekcji
    if (sectionId === "player") {
      renderPlayerPanel(main, user);
    } else if (sectionId === "locations") {
      renderLocationPanel(main, user);
    } else if (sectionId === "inventory") {
      renderInventoryPanel(main, user);
    } else if (sectionId === "shop") {
      renderShopPanel(main, user);
    } else if (sectionId === "logout") {
      logoutUser();
      location.reload();
    }
  }

  // Obsługa kliknięć w menu
  container.querySelectorAll(".sidebar-btn").forEach(btn => {
    btn.onclick = () => showSection(btn.dataset.section);
  });

  // Domyślnie pierwszy panel
  showSection("player");
}