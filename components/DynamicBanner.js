// Dynamiczny ticker z efektami i obsługą typów wiadomości

const DYNAMIC_MESSAGES = [
  { type: "tip",   icon: "💡",   text: "Eksploruj lokacje, by zdobywać doświadczenie i przedmioty!" },
  { type: "info",  icon: "🌐",   text: "Dołącz do naszej społeczności na Discordzie!" },
  { type: "alert", icon: "⚠️",   text: "Niektóre lokacje mogą być niebezpieczne dla początkujących graczy." },
  { type: "event", icon: "🎉",   text: "Wkrótce specjalne wydarzenie z nagrodami dla aktywnych!" },
  { type: "bonus", icon: "🎁",   text: "Codzienne logowanie = codzienne bonusy!" },
  { type: "stat",  icon: "👥",   text: "Obecnie online: 17 graczy" },
  { type: "quote", icon: "🧭",   text: "„Przetrwanie to nie przypadek, to wybór.”" },
];

const TYPE_COLORS = {
  tip:   "var(--accent)",
  info:  "#3fd0ff",
  alert: "#ffc92b",
  event: "#ff61fa",
  bonus: "#7afc60",
  stat:  "#9ad2fc",
  quote: "#f2f2f2"
};

export function renderDynamicBanner() {
  const banner = document.getElementById("dynamic-banner");
  if (!banner) return;

  let idx = 0;

  function showMessage(i) {
    const msg = DYNAMIC_MESSAGES[i];
    const color = TYPE_COLORS[msg.type] || "var(--accent)";
    banner.innerHTML = `
      <span class="banner-icon" style="color:${color}; font-size:1.25em; margin-right:0.35em;">${msg.icon}</span>
      <span class="banner-text" style="color:${color}; font-weight:500;">${msg.text}</span>
    `;
    // Ticker effect (marquee-like)
    banner.classList.remove("banner-ticker-animate");
    void banner.offsetWidth; // force reflow
    banner.classList.add("banner-ticker-animate");
  }

  showMessage(idx);

  setInterval(() => {
    idx = (idx + 1) % DYNAMIC_MESSAGES.length;
    showMessage(idx);
  }, 6000);
}