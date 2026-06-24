
(function(){

    const body = document.getElementById("aboutTerminalBody");

    if (!body) return;

    const lines = [
        { type: "cmd", text: "whoami" },
        { type: "highlight", text: "alice_maria_da_silva" },
        { type: "cmd", text: "cat status.txt" },
        { type: "normal", text: "Cybersecurity Student & Front-End Developer" },
        { type: "normal", text: "Formação técnica em Dev. de Sistemas - IFPE" },
        { type: "normal", text: "Cursando Segurança Cibernética - Gran Faculdade" },
        { type: "cmd", text: "echo $FOCO" },
        { type: "highlight", text: "código limpo + segurança + criatividade" }
    ];

    let started = false;

    function typeLine(line, callback){

        const el = document.createElement("div");
        el.className = "terminal-line" + (line.type === "cmd" ? " cmd" : line.type === "highlight" ? " highlight" : "");
        body.appendChild(el);

        if (line.type === "cmd") {
            el.textContent = line.text;
            body.scrollTop = body.scrollHeight;
            setTimeout(callback, 350);
            return;
        }

        let i = 0;

        function step(){

            el.textContent = line.text.slice(0, i);
            body.scrollTop = body.scrollHeight;

            i++;

            if (i <= line.text.length) {
                setTimeout(step, 18);
            } else {
                setTimeout(callback, 250);
            }

        }

        step();

    }

    function runSequence(index){

        if (index >= lines.length) {

            const cursor = document.createElement("div");
            cursor.className = "terminal-line cmd typing-cursor";
            body.appendChild(cursor);
            return;

        }

        typeLine(lines[index], () => runSequence(index + 1));

    }

    function start(){

        if (started) return;
        started = true;

        body.innerHTML = "";
        runSequence(0);

    }

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                start();
                observer.unobserve(entry.target);
            }

        });

    }, { threshold: 0.3 });

    observer.observe(body);

})();
