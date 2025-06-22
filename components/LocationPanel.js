import { renderLocationList } from "./LocationList.js";

export function renderLocationPanel(container, user) {
  container.innerHTML = "";
  // Obsługa podróży
  function handleTravel(location) {
    if (!user.history) user.history = [];
    const now = new Date();
    user.history.push({
      text: `Odwiedził(a) lokację: <b>${location.name}</b>`,
      date: now.toLocaleString("pl-PL"),
    });
    sessionStorage.setItem("4survive_currentUser", JSON.stringify(user));
    container.innerHTML = `
      <div class="panel">
        <div class="section-title">${location.name}</div>
        <div class="intro-text">${location.desc}</div>
        <div style="margin-top:15px;color:var(--accent);font-size:1.12em;">
          Dotarłeś do tej lokacji! (Tu możesz dodać eventy, losowe nagrody itd.)
        </div>
        <button class="home-btn" id="btn-back-locations" style="margin-top:20px;">Powrót</button>
      </div>
    `;
    container.querySelector("#btn-back-locations").onclick = () => renderLocationPanel(container, user);
  }
  renderLocationList(container, user, handleTravel);
}