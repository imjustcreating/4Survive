export function renderInventoryPanel(container, user) {
  container.innerHTML = `
    <div class="panel inventory-panel">
      <div class="section-title">Ekwipunek</div>
      <div class="inv-list">
        ${
          Array.isArray(user.inventory) && user.inventory.length > 0
            ? user.inventory.map(item =>
              `<div class="inv-item">
                <span class="inv-item-emoji">${item.emoji || "🎒"}</span>
                <span class="inv-item-name">${item.name}</span>
                <span class="inv-item-qty">${item.qty ? "x"+item.qty : ""}</span>
              </div>`
            ).join("")
            : "<div style='color:var(--text-muted)'>Ekwipunek pusty</div>"
        }
      </div>
    </div>
  `;
}