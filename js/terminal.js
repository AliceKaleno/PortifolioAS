(function(){

    const body = document.getElementById("terminalBody");
    const input = document.getElementById("terminalInput");

    if (!body || !input) return;

    function printLine(text, className){

        const line = document.createElement("div");
        line.className = "terminal-line" + (className ? " " + className : "");
        line.textContent = text;
        body.appendChild(line);
        body.scrollTop = body.scrollHeight;

    }

    function printCommand(cmd){

        printLine(cmd, "cmd");

    }

    const commands = {

        help(){
            printLine("Comandos disponíveis:");
            printLine("  whoami        - quem é a Alice");
            printLine("  about         - um resumo da trajetória");
            printLine("  skills        - principais habilidades");
            printLine("  projects      - onde ver os projetos");
            printLine("  contact       - formas de contato");
            printLine("  sudo hire-me  - ??? tenta e descobre");
            printLine("  clear         - limpa o terminal");
        },

        whoami(){
            printLine("Alice Maria da Silva", "highlight");
            printLine("Cybersecurity Student & Front-End Developer");
            printLine("Apaixonada por segurança da informação e interfaces bem feitas.");
        },

        about(){
            printLine("Estudante de Cybersecurity, em transição/expansão pra área de");
            printLine("desenvolvimento front-end. Gosto de entender como as coisas");
            printLine("quebram pra saber como protegê-las melhor.");
            printLine("→ saiba mais em /pages/about.html", "highlight");
        },

        skills(){
            printLine("JavaScript        [█████████░] 90%");
            printLine("HTML / CSS        [█████████░] 90%");
            printLine("React             [████████░░] 85%");
            printLine("APIs REST         [████████░░] 85%");
            printLine("Git / GitHub      [████████░░] 85%");
            printLine("Cybersecurity     [███████░░░] 75%");
            printLine("Python            [███████░░░] 70%");
            printLine("UI / UX           [███████░░░] 70%");
        },

        projects(){
            printLine("Meus repositórios são puxados em tempo real do GitHub.");
            printLine("→ confira em /pages/projects.html", "highlight");
        },

        contact(){
            printLine("email   : webdev.alice7@gmail.com");
            printLine("github  : github.com/AliceKaleno");
            printLine("→ todos os links em /pages/contact.html", "highlight");
        },

        clear(){
            body.innerHTML = "";
        },

        ls(){
            printLine("about.html  projects.html  skills.html  certificates.html  contact.html");
        },

        whoarewe(){
            printLine("não, whoami. tenta de novo.", "error");
        }

    };

    const easterEggs = {

        "sudo hire-me"(){
            printLine("[sudo] senha para alice: ", "highlight");
            printLine("Permissão concedida. ✔", "highlight");
            printLine("Acesso liberado: contrate a Alice. Ela commita até de madrugada.");
        },

        "rm -rf /"(){
            printLine("Boa tentativa. Esse terminal é só decorativo (felizmente).", "error");
        },

        "cat secrets.txt"(){
            printLine("Acesso negado. Alguns segredos só no café da tarde.", "error");
        },

        "matrix"(){
            printLine("Você não pode sair da Matrix por um portfólio. Mas valeu a tentativa.", "highlight");
        }

    };

    function runCommand(raw){

        const cmd = raw.trim();

        if (cmd === "") return;

        printCommand(cmd);

        const lower = cmd.toLowerCase();

        if (commands[lower]) {
            commands[lower]();
            return;
        }

        if (easterEggs[lower]) {
            easterEggs[lower]();
            return;
        }

        printLine(`comando não encontrado: ${cmd}. Digite "help" pra ver as opções.`, "error");

    }

    input.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {
            runCommand(input.value);
            input.value = "";
        }

    });

    document.querySelector(".terminal-window")?.addEventListener("click", () => {
        input.focus();
    });

})();
