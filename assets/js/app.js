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
  document.documentElement.setAttribute("data-theme", "light");
  document.body.classList.add("mode-anim");
  document.getElementById("home").classList.add("hidden");
  document.getElementById("animacao").classList.remove("hidden");

  const fakeBox = document.getElementById("fakeSearch");
  const mouse = document.getElementById("fakeMouse");

  mouse.style.display = "block";

  const rect = fakeBox.getBoundingClientRect();

  setTimeout(() => {
    moverMousePara(rect.left + 30, rect.top + 24, 800);
  }, 500);

  setTimeout(() => {
    digitarTexto(texto);
  }, 1500);
}

function digitarTexto(texto) {
  const fakeBox = document.getElementById("fakeSearch");
  const sendBtn = document.getElementById("fakeSend");
  const voiceBtn = document.getElementById("fakeVoice");
  let i = 0;

  function digitar() {
    if (i < texto.length) {
      if (i === 0) {
        sendBtn.classList.add("show");
        voiceBtn.style.display = "none";
      }

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
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  setTimeout(() => {
    moverMousePara(x, y, 1050);

    setTimeout(() => {
      sendBtn.style.transform = "scale(0.92)";
      criarClick(x, y);

      setTimeout(() => {
        window.location.href =
          "https://chat.openai.com/?q=" +
          encodeURIComponent(texto);
      }, 650);

    }, 1150);

  }, 450);
}

function moverMousePara(x, y, duracao = 950) {
  const mouse = document.getElementById("fakeMouse");
  mouse.style.transitionDuration = duracao + "ms";
  mouse.style.left = x + "px";
  mouse.style.top = y + "px";
}

function criarClick(x, y) {
  const click = document.createElement("div");
  click.className = "click-effect";
  click.style.left = x - 10 + "px";
  click.style.top  = y - 10 + "px";

  document.body.appendChild(click);

  setTimeout(() => click.remove(), 400);
}