// Testowe konta (login/hasło)
const USERS = [
  {login:"admin", password:"admin"},
  {login:"maxplayer", password:"maxplayer"},
  {login:"shadowwolf", password:"hunter99"},
  {login:"irondduck", password:"quack123"},
  {login:"atomjoe", password:"radium"},
  {login:"mutant27", password:"wasteland"},
  {login:"natalie", password:"survive"},
  {login:"stranger", password:"unknown"},
  {login:"lonewolf", password:"solitude"},
  {login:"radgirl", password:"gogogo"},
  {login:"ranger", password:"forest"},
  {login:"techno", password:"future"},
  {login:"outlaw", password:"freedom"},
  {login:"harold", password:"test123"},
  {login:"slavko", password:"vodka"},
];

// Users w localStorage
if(!localStorage.getItem("4survive_users")) {
  localStorage.setItem("4survive_users", JSON.stringify(USERS));
}

function getUsers() {
  return JSON.parse(localStorage.getItem("4survive_users") || "[]");
}

function showLoginModal(onLogin) {
  document.getElementById("login-modal")?.remove();

  const modal = document.createElement("div");
  modal.className = "login-modal-bg";
  modal.id = "login-modal";
  modal.innerHTML = `
    <div class="login-modal-window">
      <button class="login-modal-close" title="Zamknij" id="login-close">&times;</button>
      <div class="login-modal-title">Logowanie do 4Survive</div>
      <form id="login-form" autocomplete="off">
        <label for="login-username">Login</label>
        <input type="text" id="login-username" autocomplete="username" required maxlength="20">
        <label for="login-password">Hasło</label>
        <input type="password" id="login-password" autocomplete="current-password" required maxlength="20">
        <div class="login-error" id="login-error"></div>
        <button type="submit" class="login-submit-btn">Zaloguj się</button>
      </form>
      <div class="login-test-accounts-title">Dostępne konta testowe:</div>
      <div class="login-test-accounts-list">
        ${getUsers().map(u => `<div><b>${u.login}</b> / <span>${u.password}</span></div>`).join("")}
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  setTimeout(() => {
    document.getElementById("login-username").focus();
  }, 200);

  document.getElementById("login-close").onclick = () => modal.remove();
  modal.onclick = e => { if(e.target === modal) modal.remove(); };

  document.getElementById("login-form").onsubmit = e => {
    e.preventDefault();
    const login = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;
    const users = getUsers();
    const user = users.find(u => u.login === login && u.password === password);
    const error = document.getElementById("login-error");
    if(!user) {
      error.textContent = "Nieprawidłowy login lub hasło!";
      error.classList.add("show");
      return;
    }
    error.textContent = "";
    error.classList.remove("show");
    modal.remove();
    sessionStorage.setItem("4survive_currentUser", JSON.stringify(user));
    if(typeof onLogin === "function") onLogin(user);
  };
}

function getLoggedUser() {
  try {
    return JSON.parse(sessionStorage.getItem("4survive_currentUser"));
  } catch { return null; }
}

function logoutUser() {
  sessionStorage.removeItem("4survive_currentUser");
}

export { showLoginModal, getLoggedUser, logoutUser };