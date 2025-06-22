import { renderHomePage } from './components/HomePage.js';

const app = document.getElementById('app');

// Animacja tła (opcjonalna, jeśli masz kod)
function animateParticles() {
  // Twój kod do animacji particles-bg (jeśli używasz)
}

function run() {
  renderHomePage(app);
  // animateParticles(); // odkomentuj jeśli masz animacje
}

window.addEventListener('DOMContentLoaded', run);

export { run };