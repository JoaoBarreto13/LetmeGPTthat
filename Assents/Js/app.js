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

  document.getElementById("resultado").innerHTML =
    `Link para enviar:<br><br>
     <a href="${link}" target="_blank">${link}</a>`;
}

function iniciarAnimacao(texto) {
  document.getElementById("home").style.display = "none";
  document.getElementById("animacao").classList.remove("hidden");

  const fakeBox = document.getElementById("fakeSearch");
  const mouse = document.getElementById("fakeMouse");
  const container = document.getElementById("container");

  mouse.style.display = "block";

  const rect = fakeBox.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  setTimeout(() => {
    mouse.style.left =
      rect.left - containerRect.left + 20 + "px";
    mouse.style.top =
      rect.top - containerRect.top + 20 + "px";
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
  const mouse = document.getElementById("fakeMouse");
  const sendBtn = document.getElementById("fakeSend");
  const container = document.getElementById("container");

  const rect = sendBtn.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  setTimeout(() => {
    mouse.style.left =
      rect.left - containerRect.left + rect.width / 2 + "px";
    mouse.style.top =
      rect.top - containerRect.top + rect.height / 2 + "px";

    setTimeout(() => {
      criarClick(mouse.offsetLeft, mouse.offsetTop);

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
  click.style.top = y - 10 + "px";

  document
    .getElementById("container")
    .appendChild(click);

  setTimeout(() => click.remove(), 400);
}