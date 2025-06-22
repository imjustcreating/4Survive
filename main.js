import { renderHomePage } from './components/HomePage.js';

const app = document.getElementById('app');

function animateParticles() {
    const canvas = document.getElementById('particles-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = w; canvas.height = h;

    let particles = [];
    const colors = ['#ffe066', '#ffd700', '#ffb700', '#fffbe6', '#ffef80'];
    const NUM = Math.floor(window.innerWidth / 40);

    function rand(min, max) { return Math.random() * (max - min) + min; }

    for (let i = 0; i < NUM; i++) {
        particles.push({
            x: rand(0, w), y: rand(0, h),
            r: rand(1.2, 3.6),
            dx: rand(-0.3, 0.3), dy: rand(-0.16, 0.16),
            color: colors[Math.floor(rand(0, colors.length))]
        });
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
            ctx.fillStyle = p.color + '99';
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 18 * p.r;
            ctx.globalAlpha = 0.7;
            ctx.fill();
            p.x += p.dx; p.y += p.dy;
            if (p.x < -10) p.x = w + 5;
            if (p.x > w + 10) p.x = -5;
            if (p.y < -10) p.y = h + 5;
            if (p.y > h + 10) p.y = -5;
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener('resize', () => {
        w = window.innerWidth; h = window.innerHeight;
        canvas.width = w; canvas.height = h;
    });
}

function runBannerRotation() {
    const banners = [
        '🔥 <b>Nowa aktualizacja!</b> System eksploracji już dostępny!',
        '🤝 <b>Dołącz do społeczności Discord!</b>',
        '🎁 <b>Wspieraj rozwój gry – zgłaszaj propozycje i błędy!</b>',
        '🏆 <b>Ranking graczy:</b> Wkrótce oficjalne turnieje!'
    ];
    let idx = 0;
    function update() {
        const banner = document.getElementById('dynamic-banner');
        if (banner) {
            banner.innerHTML = banners[idx % banners.length];
            idx++;
        }
    }
    setInterval(update, 4800);
    update();
}

function route() {
    renderHomePage(app);
    animateParticles();
    runBannerRotation();
}
window.addEventListener('DOMContentLoaded', route);

export { route };