const params = new URLSearchParams(window.location.search);
const perguntaURL = params.get("q");

if (perguntaURL) {
  iniciarAnimacao(perguntaURL);
}

function gerarLink() {
  const pergunta = document.getElementById("pergunta").value;

  if (!pergunta.trim()) {
    alert("Digite algo primeiro");
    return;
  }

  const link =
    window.location.origin +
    window.location.pathname +
    "?q=" +
    encodeURIComponent(pergunta);

  const resultado = document.getElementById("resultado");
  resultado.innerHTML =
    `Link para enviar:<br><br>
     <a href="${link}" target="_blank">${link}</a>`;
}

function iniciarAnimacao(texto) {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("animacao").classList.remove("hidden");

  const fakeBox = document.getElementById("fakeSearch");
  const mouse = document.getElementById("fakeMouse");

  mouse.style.display = "block";

  const rect = fakeBox.getBoundingClientRect();

  setTimeout(() => {
    mouse.style.left = rect.left + 20 + "px";
    mouse.style.top  = rect.top  + 20 + "px";
  }, 500);

  setTimeout(() => {
    digitarTexto(texto);
  }, 1500);
}

function digitarTexto(texto) {
  const fakeBox = document.getElementById("fakeSearch");
  let i = 0;

  function digitar() {
    if (i < texto.length) {
      fakeBox.innerHTML =
        texto.slice(0, i + 1) +
        '<span class="cursor-text"></span>';
      i++;
      setTimeout(digitar, 50);
    } else {
      moverParaEnviar(texto);
    }
  }

  digitar();
}

function moverParaEnviar(texto) {
  const mouse   = document.getElementById("fakeMouse");
  const sendBtn = document.getElementById("fakeSend");

  const rect = sendBtn.getBoundingClientRect();

  setTimeout(() => {
    mouse.style.left = rect.left + rect.width  / 2 + "px";
    mouse.style.top  = rect.top  + rect.height / 2 + "px";

    setTimeout(() => {
      criarClick(rect.left + rect.width / 2, rect.top + rect.height / 2);

      setTimeout(() => {
        window.location.href =
          "https://chat.openai.com/?q=" +
          encodeURIComponent(texto);
      }, 600);

    }, 1000);

  }, 500);
}

function criarClick(x, y) {
  const click = document.createElement("div");
  click.className = "click-effect";
  click.style.left = x - 10 + "px";
  click.style.top  = y - 10 + "px";

  document.body.appendChild(click);

  setTimeout(() => click.remove(), 400);
}