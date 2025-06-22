// Przykładowy zestaw lokacji z wymaganym poziomem
const ALL_LOCATIONS = [
  { name: "Opuszczone Miasto",      desc: "Ruiny starego miasta, pełne niebezpieczeństw.", minLevel: 1 },
  { name: "Las Cieni",              desc: "Gęsty las, w którym łatwo się zgubić.", minLevel: 1 },
  { name: "Zardzewiała Stacja",     desc: "Opuszczona stacja kolejowa.", minLevel: 2 },
  { name: "Baza Łupieżców",         desc: "Schronienie bandytów, bardzo niebezpieczne!", minLevel: 3 },
  { name: "Jezioro Mutantów",       desc: "Woda nie jest tu bezpieczna...", minLevel: 4 },
  { name: "Zatopiony Bunkier",      desc: "Stary bunkier z czasów wojny.", minLevel: 5 },
];

// Zwraca dostępne dla gracza lokacje
function getAvailableLocations(player) {
  if (!player || typeof player.level !== "number") return [];
  return ALL_LOCATIONS.filter(loc => player.level >= loc.minLevel);
}

// Renderuje listę lokacji
export function renderLocationList(container, player, onTravel) {
  const locations = getAvailableLocations(player);
  let html = `<div class="panel">
    <div class="section-title">Dostępne lokacje</div>
    <ul style="list-style:none;padding:0;margin:0;">`;

  if (locations.length === 0) {
    html += `<li style="color:var(--text-muted);margin-bottom:8px;">Brak dostępnych lokacji dla Twojego poziomu.</li>`;
  } else {
    locations.forEach((loc, idx) => {
      html += `<li style="margin-bottom:14px;">
        <button class="home-btn" style="width:100%;font-size:1.07em;" data-idx="${idx}">${loc.name}</button>
        <div style="color:var(--text-muted);font-size:.97em;margin:3px 0 0 0;">${loc.desc}</div>
      </li>`;
    });
  }

  html += `</ul></div>`;
  container.innerHTML = html;

  // Obsługa podróży do lokacji
  locations.forEach((loc, idx) => {
    const btn = container.querySelector(`[data-idx="${idx}"]`);
    if (btn) btn.onclick = () => onTravel(loc);
  });
}