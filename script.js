// Função para validar notas
function parseNotas(texto) {
    let notas = texto.split(",").map(n => parseFloat(n.trim()));
    if (notas.some(n => isNaN(n) || n < 0 || n > 200)) {
        return null;
    }
    return notas.reduce((a, b) => a + b, 0) / notas.length;
}

// Gerar inputs conforme disciplina
function carregarCampos() {
    let d = document.getElementById("disciplina").value;
    let c = document.getElementById("campos");
    let r = document.getElementById("resultado");

    // Limpar resultado ao mudar disciplina
    r.innerHTML = "";

    if (d === "pt") {
        c.innerHTML = `
            <input id="leitura" placeholder="Notas Leitura (ex: 120,150)">
            <input id="ed" placeholder="Notas ED">
            <input id="gram" placeholder="Notas Gramática">
            <input id="oral" placeholder="Notas Oralidade">
            <input id="comp" placeholder="Notas Comportamento">
        `;
    } 
    else if (d === "mat") {
        c.innerHTML = `
            <input id="testes" placeholder="Notas Testes">
            <input id="comp" placeholder="Notas Comportamento">
        `;
    } 
    else if (d === "fis") {
        c.innerHTML = `
            <input id="testes" placeholder="Notas Testes">
            <input id="lab" placeholder="Notas Laboratório">
            <input id="comp" placeholder="Notas Comportamento">
        `;
    } 
    else {
        c.innerHTML = "";
    }
}

// Cálculo final
function calcular() {
    let d = document.getElementById("disciplina").value;
    let r = document.getElementById("resultado");

    r.innerHTML = ""; // limpar erros anteriores

    if (!d) {
        r.innerHTML = "❌ Escolhe uma disciplina!";
        return;
    }

    let media_final = 0;

    // ---- PORTUGUÊS ----
    if (d === "pt") {
        let leitura = parseNotas(document.getElementById("leitura").value);
        let ed = parseNotas(document.getElementById("ed").value);
        let gram = parseNotas(document.getElementById("gram").value);
        let oral = parseNotas(document.getElementById("oral").value);
        let comp = parseNotas(document.getElementById("comp").value);

        if ([leitura, ed, gram, oral, comp].includes(null)) {
            r.innerHTML = "❌ Notas inválidas! Valores entre 0 e 200.";
            return;
        }

        media_final =
            ed * 0.5 +
            leitura * 0.1 +
            gram * 0.1 +
            oral * 0.2 +
            comp * 0.1;
    }

    // ---- MATEMÁTICA ----
    else if (d === "mat") {
        let testes = parseNotas(document.getElementById("testes").value);
        let comp = parseNotas(document.getElementById("comp").value);

        if ([testes, comp].includes(null)) {
            r.innerHTML = "❌ Notas inválidas!";
            return;
        }

        media_final = testes * 0.9 + comp * 0.1;
    }

    // ---- FÍSICA ----
    else if (d === "fis") {
        let testes = parseNotas(document.getElementById("testes").value);
        let lab = parseNotas(document.getElementById("lab").value);
        let comp = parseNotas(document.getElementById("comp").value);

        if ([testes, lab, comp].includes(null)) {
            r.innerHTML = "❌ Notas inválidas!";
            return;
        }

        media_final = testes * 0.65 + lab * 0.25 + comp * 0.1;
    }

    r.innerHTML = "📘 Média Final: <b>" + media_final.toFixed(2) + "</b>";
}

