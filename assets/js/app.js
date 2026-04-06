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

  const linkBonito = `${window.location.origin}${window.location.pathname}`;

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `
    <div class="result-header">
      <strong>Link pronto para compartilhar</strong>
      <span class="result-subtitle">A pessoa vai abrir com a pergunta preenchida.</span>
    </div>

    <div class="result-url-wrap">
      <span class="result-url-base">${linkBonito}</span>
      <input type="text" class="result-url-input" value="${link}" readonly aria-label="Link gerado" />
    </div>

    <div class="result-actions">
      <button type="button" class="result-btn result-btn-copy" onclick="copiarLinkGerado('${link}')">Copiar link</button>
      <a class="result-btn result-btn-open" href="${link}" target="_blank" rel="noopener noreferrer">Abrir link</a>
    </div>
  `;
}

async function copiarLinkGerado(link) {
  const botaoCopiar = document.querySelector(".result-btn-copy");

  try {
    await navigator.clipboard.writeText(link);
  } catch (erro) {
    const campoTemporario = document.createElement("textarea");
    campoTemporario.value = link;
    document.body.appendChild(campoTemporario);
    campoTemporario.select();
    document.execCommand("copy");
    campoTemporario.remove();
  }

  if (botaoCopiar) {
    botaoCopiar.textContent = "Copiado";
    setTimeout(() => {
      botaoCopiar.textContent = "Copiar link";
    }, 1400);
  }
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