const NEWS = [
  {
    date: "2025-06-22",
    title: "Dynamiczny banner i jeszcze lepszy interfejs gry!",
    body: `Na stronie głównej pojawił się dynamiczny, animowany banner z poradami i informacjami. Rozbudowaliśmy także interfejs gry: nowe panele, lepsza prezentacja statystyk i przygotowania pod system ekwipunku. Piszcie swoje opinie na Discordzie!`,
    tags: ["banner", "UI", "nowość"]
  },
  {
    date: "2025-06-22",
    title: "Dynamiczne tło i animacje cząsteczek — nowy wygląd strony!",
    body: `Uruchomiliśmy nową wersję strony głównej z animowanym tłem, efektami i dynamicznym banerem. Dziękujemy za opinie oraz zgłoszenia błędów!`,
    tags: ["nowość", "UI"]
  },
  {
    date: "2025-06-21",
    title: "Nowy system ekwipunku i konkurs dla graczy",
    body: `Dodaliśmy prototyp systemu ekwipunku! Możesz już zbierać i przeglądać przedmioty. Wystartował konkurs na najlepszą sugestię mechaniki – do wygrania unikalne nagrody w grze. Zajrzyj na Discord po szczegóły!`,
    tags: ["ekwipunek", "konkurs", "społeczność"]
  },
  {
    date: "2025-06-20",
    title: "Efekty wizualne i glassmorphism",
    body: `Panele i interfejs korzystają teraz z efektu glassmorphism, a całość jest bardziej immersyjna i przejrzysta. To dopiero początek zmian wizualnych!`,
    tags: ["update", "design"]
  },
  {
    date: "2025-06-19",
    title: "Plany na przyszłość – roadmapa na lato",
    body: `Pracujemy nad systemem klanów, rankingiem graczy oraz nową mapą. Zajrzyj do roadmapy na stronie głównej i podziel się pomysłami!`,
    tags: ["roadmapa", "społeczność"]
  },
  {
    date: "2025-06-18",
    title: "Start developmentu ekranu gry!",
    body: `Ruszyły prace nad dashboardem gracza oraz systemem mapy. Wkrótce pierwsze zrzuty ekranu i testy!`,
    tags: ["dev", "game"]
  },
  {
    date: "2025-06-15",
    title: "Projekt 4Survive.pl oficjalnie wystartował!",
    body: `Zapraszamy wszystkich do śledzenia postępów i udziału w tworzeniu gry. Każda sugestia mile widziana!`,
    tags: ["start"]
  }
];

function renderNewsPanel(container) {
  container.innerHTML = `
    <div class="news-slider-panel">
      <div class="news-slider-header">
        <span class="news-slider-title"><span>📰</span> Aktualności</span>
        <div class="news-slider-controls">
          <button id="news-prev" title="Poprzednia"><span>◀</span></button>
          <span id="news-indicator"></span>
          <button id="news-next" title="Następna"><span>▶</span></button>
        </div>
      </div>
      <div id="news-slider-content" class="news-slider-content"></div>
    </div>
  `;

  let idx = 0;
  const slider = container.querySelector("#news-slider-content");
  const indicator = container.querySelector("#news-indicator");

  function renderItem(index, animate=true) {
    const n = NEWS[index];
    // Fade out
    if (animate) {
      slider.classList.remove("fade-in");
      void slider.offsetWidth; // trigger reflow
    }
    slider.innerHTML = `
      <div class="news-slide${animate ? " fade-in" : ""}">
        <div class="news-slide-date">${n.date}</div>
        <div class="news-slide-title">${n.title}</div>
        <div class="news-slide-body">${n.body}</div>
        <div class="news-slide-tags">${n.tags.map(tag=>`<span class="news-tag">${tag}</span>`).join(" ")}</div>
      </div>
    `;
    indicator.textContent = `${index+1} / ${NEWS.length}`;
  }

  function prev() {
    idx = (idx - 1 + NEWS.length) % NEWS.length;
    renderItem(idx);
  }
  function next() {
    idx = (idx + 1) % NEWS.length;
    renderItem(idx);
  }

  container.querySelector("#news-prev").onclick = prev;
  container.querySelector("#news-next").onclick = next;

  // Auto-slide (with mouse hover pause)
  let auto;
  function startAuto() {
    auto = setInterval(next, 9000);
  }
  function stopAuto() {
    clearInterval(auto);
  }
  startAuto();

  container.querySelector(".news-slider-panel").addEventListener('mouseenter', stopAuto);
  container.querySelector(".news-slider-panel").addEventListener('mouseleave', startAuto);

  renderItem(idx, false);
}

export { renderNewsPanel };