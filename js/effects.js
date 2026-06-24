(function(){

    const canvas = document.createElement("canvas");
    canvas.id = "bg-canvas";
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");

    let particles = [];
    let width, height;

    const mouse = { x: -9999, y: -9999 };

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener("mouseleave", () => {
        mouse.x = -9999;
        mouse.y = -9999;
    });

    function resize(){
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createParticles(){

        const count = Math.floor((width * height) / 12000);

        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.4 + 0.3,
            speed: Math.random() * 0.15 + 0.02,
            alpha: Math.random() * 0.5 + 0.2,
            color: Math.random() > 0.85 ? "255,0,60" : "255,255,255"
        }));

    }

    function draw(){

        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {

            p.y -= p.speed;

            if (p.y < 0) {
                p.y = height;
                p.x = Math.random() * width;
            }


            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 110;

            if (dist < radius) {

                const force = (radius - dist) / radius;
                const angle = Math.atan2(dy, dx);

                p.x += Math.cos(angle) * force * 2.2;
                p.y += Math.sin(angle) * force * 2.2;

            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
            ctx.fill();

        });

        requestAnimationFrame(draw);

    }

    resize();
    createParticles();
    draw();

    window.addEventListener("resize", () => {
        resize();
        createParticles();
    });


    const btn = document.createElement("button");
    btn.id = "backToTop";
    btn.innerHTML = '<span style="font-size:1.3rem;line-height:1;">&uarr;</span>';
    btn.setAttribute("aria-label", "Voltar ao topo");
    document.body.appendChild(btn);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            btn.classList.add("visible");
        } else {
            btn.classList.remove("visible");
        }
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const revealSelectors = [
        ".profile > *",
        ".about-header",
        ".card",
        ".timeline-card",
        ".tech-grid span",
        ".github-card",
        ".certificate-card",
        ".interest-card",
        ".skill",
        ".hacker-skill",
        ".hacker-node",
        ".tool-hex",
        ".cyber-node",
        ".contact-card",
        ".quote-box",
        ".alice-terminal",
        ".section-title",
        ".title",
        "#projetos > .subtitle",
        "#skills > .subtitle",
        "#certificados > .subtitle",
        "#contato .contact-header"
    ];

    const revealEls = document.querySelectorAll(revealSelectors.join(","));

    revealEls.forEach((el, i) => {
        el.classList.add("reveal");
        el.style.transitionDelay = `${Math.min(i % 8, 8) * 0.06}s`;
    });

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                const bar = entry.target.querySelector(".hacker-bar .progress[data-width]");

                if (bar) {
                    requestAnimationFrame(() => {
                        bar.style.width = bar.dataset.width;
                    });
                }

                revealObserver.unobserve(entry.target);
            }

        });

    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(el => revealObserver.observe(el));

    const navToggle = document.getElementById("navToggle");
    const navLinksEl = document.getElementById("navLinks");

    if (navToggle && navLinksEl) {

        function closeMenu(){
            navToggle.classList.remove("open");
            navLinksEl.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        }

        navToggle.addEventListener("click", () => {

            const isOpen = navLinksEl.classList.toggle("open");
            navToggle.classList.toggle("open", isOpen);
            navToggle.setAttribute("aria-expanded", String(isOpen));

        });

        navLinksEl.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", (e) => {

                if (!navLinksEl.classList.contains("open")) return;

                e.preventDefault();

                const targetId = link.getAttribute("href");
                const targetEl = document.querySelector(targetId);

                /* fecha o menu instantaneamente (sem animação) antes de rolar */

                navLinksEl.style.transition = "none";
                closeMenu();

                requestAnimationFrame(() => {

                    if (targetEl) {
                        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
                    }

                    requestAnimationFrame(() => {
                        navLinksEl.style.transition = "";
                    });

                });

            });

        });

        document.addEventListener("click", (e) => {

            if (!navLinksEl.classList.contains("open")) return;

            const clickedInsideMenu = navLinksEl.contains(e.target) || navToggle.contains(e.target);

            if (!clickedInsideMenu) closeMenu();

        });

        document.addEventListener("keydown", (e) => {

            if (e.key === "Escape") closeMenu();

        });

    }

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    if (sections.length && navLinks.length) {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const id = entry.target.getAttribute("id");

                    navLinks.forEach(link => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${id}`
                        );
                    });

                }

            });

        }, { rootMargin: "-45% 0px -50% 0px" });

        sections.forEach(section => observer.observe(section));

    }

})();
