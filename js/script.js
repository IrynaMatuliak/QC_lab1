const pageContent = document.getElementById("page-content");
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        pages.forEach(p => p.classList.add("hidden"));
        document.getElementById(link.dataset.page).classList.remove("hidden");
    });
});

// Background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const particles = [];
const colors = ["#c3eaff", "#aee1f9", "#9fd9f0", "#b3f0ff"];
const particleCount = 60;

for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 10 + Math.random() * 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
    });
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    });
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-content').textContent = `This is the ${tab.textContent} tab.`;
    });
});

// Button
const actionBtn = document.getElementById('action-btn');
const btnMessage = document.getElementById('btn-message');
let btnTimeout;

actionBtn.addEventListener('click', () => {
    clearTimeout(btnTimeout);
    btnMessage.textContent = "You clicked the button!";
    btnMessage.classList.remove("hidden");
    btnTimeout = setTimeout(() => {
        btnMessage.classList.add("hidden");
        btnMessage.textContent = "";
    }, 5000);
});

// Data grid sorting
window.sortTable = function (n) {
    const table = document.querySelector("table");
    let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (dir === "asc" && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            } else if (dir === "desc" && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else if (switchcount === 0 && dir === "asc") {
            dir = "desc";
            switching = true;
        }
    }
}

// Search
document.getElementById("search").addEventListener("keyup", function () {
    const filter = this.value.toLowerCase();
    const rows = document.getElementById("data-body").getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        const txtValue = rows[i].textContent || rows[i].innerText;
        rows[i].style.display = txtValue.toLowerCase().includes(filter) ? "" : "none";
    }
});
