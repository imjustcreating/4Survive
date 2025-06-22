import { getLoggedUser, logoutUser } from './LoginModal.js';

/**
 * Pobiera lub generuje statystyki gracza dla zalogowanego użytkownika.
 */
function getOrCreatePlayerStats(login) {
    const key = '4survive_playerstats_' + login;
    let stats = localStorage.getItem(key);
    if (stats) return JSON.parse(stats);

    stats = {
        id: "ID" + Math.floor(Math.random()*90000+10000),
        avatar: "🧑‍🚀",
        level: Math.floor(Math.random()*7)+1,
        exp: Math.floor(Math.random()*500+150),
        expNext: Math.floor(Math.random()*400+300),
        points: Math.floor(Math.random()*1000+200),
        health: Math.floor(Math.random()*30)+70,
        energy: Math.floor(Math.random()*50)+50,
        inventory: [
            { name: "Chleb", qty: 2, emoji: "🍞" },
            { name: "Woda", qty: 1, emoji: "💧" },
            { name: "Apteczka", qty: 1, emoji: "🩹" }
        ],
        eventsLog: [
            {date: new Date().toLocaleString(), text: "Rozpocząłeś przygodę na pustkowiach.", emoji: "🚀"}
        ]
    };
    localStorage.setItem(key, JSON.stringify(stats));
    return stats;
}
/** Zapisuje statystyki gracza. */
function savePlayerStats(login, stats) {
    localStorage.setItem('4survive_playerstats_' + login, JSON.stringify(stats));
}

/** Renderuje dashboard gracza w podanym kontenerze. */
function renderPlayerDashboard(container) {
    const user = getLoggedUser();
    if (!user) {
        // Jeśli nie ma użytkownika, nie pokazuj dashboardu!
        container.innerHTML = `<div class="panel"><b>Błąd:</b> Nie jesteś zalogowany.</div>`;
        return;
    }
    const stats = getOrCreatePlayerStats(user.login);
    const expPct = Math.min(100, Math.round(100 * stats.exp / stats.expNext));
    const healthPct = Math.max(0, Math.min(100, stats.health));
    const energyPct = Math.max(0, Math.min(100, stats.energy));
    const lastEvent = stats.eventsLog[stats.eventsLog.length-1];

    container.innerHTML = `
    <div class="player-dashboard player-dashboard--wide">
      <div class="player-dash-header">
        <span class="player-avatar" title="Avatar gracza">${stats.avatar}</span>
        <div class="player-header-info">
          <div class="player-login">${user.login}</div>
          <div class="player-id">ID: <span>${stats.id}</span></div>
          <div class="player-level">Poziom: <b>${stats.level}</b></div>
        </div>
        <button class="player-logout-btn" id="logout-btn" title="Wyloguj">Wyloguj</button>
      </div>

      <div class="player-dash-main">
        <div class="player-stats">
          <div class="stat-row xp-row">
            <span class="player-stat-label">XP</span>
            <div class="stat-bar-wrap">
              <div class="stat-bar player-xp-bar" style="width:${expPct}%"></div>
            </div>
            <span class="stat-value">${stats.exp} / ${stats.expNext}</span>
          </div>
          <div class="stat-row health-row">
            <span class="player-stat-label">Zdrowie</span>
            <div class="stat-bar-wrap">
              <div class="stat-bar player-health-bar" style="width:${healthPct}%"></div>
            </div>
            <span class="stat-value">${healthPct}%</span>
          </div>
          <div class="stat-row energy-row">
            <span class="player-stat-label">Energia</span>
            <div class="stat-bar-wrap">
              <div class="stat-bar player-energy-bar" style="width:${energyPct}%"></div>
            </div>
            <span class="stat-value">${energyPct}%</span>
          </div>
          <div class="stat-row points-row">
            <span class="player-stat-label">Punkty</span>
            <span class="stat-value" style="margin-left:10px;">${stats.points}</span>
          </div>
        </div>

        <div class="player-inventory-preview">
          <div class="inv-preview-title">Ekwipunek:</div>
          <div class="inv-preview-list">
            ${stats.inventory.length ? stats.inventory.map(i =>
                `<span class="inv-preview-item" title="${i.name} x${i.qty}">${i.emoji}<span class="inv-item-qty">${i.qty}</span></span>`
            ).join("") : "<i>pusto</i>"}
          </div>
          <button class="player-action-btn player-inv-btn" id="inv-btn"><span>🎒</span> Szczegóły</button>
        </div>

        <div class="player-actions">
          <button class="player-action-btn" id="explore-btn"><span>🌍</span> Eksploruj</button>
          <button class="player-action-btn" id="rest-btn"><span>🛏️</span> Odpocznij</button>
          <button class="player-action-btn" id="rank-btn"><span>🏆</span> Ranking</button>
        </div>
      </div>

      <div class="player-dash-bottom">
        <div class="player-last-event">
          <span class="player-event-emoji">${lastEvent.emoji}</span>
          <span class="player-event-text">${lastEvent.text}</span>
          <span class="player-event-date">${lastEvent.date}</span>
        </div>
        <details class="player-history-details">
          <summary>Pokaż historię akcji</summary>
          <ul class="player-history-log">
            ${stats.eventsLog.slice(-7).reverse().map(ev =>
                `<li><span>${ev.emoji}</span> <span>${ev.text}</span> <span class="ev-log-date">${ev.date}</span></li>`
            ).join("")}
          </ul>
        </details>
        <div class="player-dash-hint">
          <span>🚀 Wkrótce: Czat, klan, sklep i więcej!</span>
        </div>
      </div>

      <div id="player-dash-modal"></div>
    </div>
    `;

    // Obsługa przycisków
    container.querySelector("#logout-btn").onclick = () => {
        logoutUser();
        window.location.reload();
    };
    container.querySelector("#explore-btn").onclick = () => showExploreEvent(container, user.login);
    container.querySelector("#rest-btn").onclick = () => showRestEvent(container, user.login);
    container.querySelector("#inv-btn").onclick = () => showInventoryModal(container, stats.inventory, user.login);
    container.querySelector("#rank-btn").onclick = () => showRankingModal(container, user.login);
}

// ==== Akcje gracza ====

function showExploreEvent(container, login) {
    const events = [
        { emoji: "🪙", text: "Znalazłeś garść kapsli! (+15 punktów)", effect: s=>s.points+=15 },
        { emoji: "🍎", text: "Natrafiłeś na porzucone jabłko. (+1 do ekwipunku)", effect: s=>{
            let f = s.inventory.find(x=>x.name==="Jabłko");
            if(f) f.qty++; else s.inventory.push({name:"Jabłko",qty:1,emoji:"🍎"});
        }},
        { emoji: "💤", text: "Nic ciekawego... odpoczynek regeneruje energię! (+10%)", effect: s=>s.energy=Math.min(100,s.energy+10) },
        { emoji: "☢️", text: "Napromieniowany teren... tracisz zdrowie (-10%)", effect: s=>s.health=Math.max(0,s.health-10) },
        { emoji: "🩹", text: "Znalazłeś apteczkę! (+1 do ekwipunku)", effect: s=>{
            let f = s.inventory.find(x=>x.name==="Apteczka");
            if(f) f.qty++; else s.inventory.push({name:"Apteczka",qty:1,emoji:"🩹"});
        }},
        { emoji: "👾", text: "Spotkałeś mutanta! Walka zakończona sukcesem. (+25 exp)", effect: s=>s.exp+=25 }
    ];
    const ev = events[Math.floor(Math.random()*events.length)];
    let stats = getOrCreatePlayerStats(login);
    ev.effect(stats);
    stats.eventsLog.push({date: new Date().toLocaleString(), text: ev.text, emoji: ev.emoji});
    savePlayerStats(login, stats);
    renderPlayerDashboard(container);
}

function showRestEvent(container, login) {
    let stats = getOrCreatePlayerStats(login);
    stats.energy = Math.min(100, stats.energy + 20);
    stats.health = Math.min(100, stats.health + 5);
    stats.eventsLog.push({date: new Date().toLocaleString(), text: "Odpocząłeś. (+20% energia, +5% zdrowie)", emoji: "🛏️"});
    savePlayerStats(login, stats);
    renderPlayerDashboard(container);
}

function showInventoryModal(container, inventory, login) {
    const modal = container.querySelector("#player-dash-modal");
    modal.innerHTML = `
      <div class="player-modal-bg">
        <div class="player-modal-window">
          <button class="player-modal-close" id="close-inv">&times;</button>
          <div class="player-modal-title">Twój ekwipunek</div>
          <div class="player-modal-list">
            ${inventory.length ? inventory.map(i =>
                `<div class="inv-modal-row">${i.emoji} <b>${i.name}</b> <span>x${i.qty}</span></div>`
            ).join("") : "<i>Brak przedmiotów.</i>"}
          </div>
        </div>
      </div>
    `;
    modal.querySelector("#close-inv").onclick = () => modal.innerHTML = "";
    modal.onclick = (e) => { if(e.target===modal) modal.innerHTML=""; };
}

function showRankingModal(container, login) {
    const modal = container.querySelector("#player-dash-modal");
    const all = [
        {login:"admin", points:1260},{login:"maxplayer", points:1205},
        {login:"shadowwolf", points:1175},{login:"ironduck", points:1020},
        {login:"atomjoe", points:1000},{login:"outlaw", points:950},
        {login:"stranger", points:900},{login:login, points:888}
    ];
    all.sort((a,b)=>b.points-a.points);
    modal.innerHTML = `
      <div class="player-modal-bg">
        <div class="player-modal-window">
          <button class="player-modal-close" id="close-rank">&times;</button>
          <div class="player-modal-title">Ranking TOP</div>
          <ol class="player-modal-ranking-list">
            ${all.map(u=>`<li${u.login===login?' style="color:var(--accent-dark);font-weight:700;"':''}>${u.login} <span style="float:right;">${u.points} pkt</span></li>`).join("")}
          </ol>
        </div>
      </div>
    `;
    modal.querySelector("#close-rank").onclick = () => modal.innerHTML = "";
    modal.onclick = (e) => { if(e.target===modal) modal.innerHTML=""; };
}

export { renderPlayerDashboard };