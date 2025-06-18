let tempo = 0;
let moedasPegas = 0;
let totalMoedas = 0;
let timerInterval;
let jogadorInstancia;
let porta;

function iniciarTimer() {
  timerInterval = setInterval(() => {
    tempo++;
    document.getElementById('timer').textContent = `Tempo: ${tempo}s`;
  }, 1000);
}

function pararTimer() {
  clearInterval(timerInterval);
}

function mostrarTelaFinal() {
  document.getElementById('fim').style.display = 'block';
  document.getElementById('pontuacao-final').textContent = moedasPegas;
  const maiorPontuacao = Math.max(
    moedasPegas,
    parseInt(localStorage.getItem('maiorPontuacao')) || 0
  );
  localStorage.setItem('maiorPontuacao', maiorPontuacao);
  document.getElementById('maior-pontuacao').textContent = maiorPontuacao;
}

function adicionarMoeda() {
  moedasPegas++;
  document.getElementById('contador').textContent = `Moedas: ${moedasPegas}/${totalMoedas}`;

  if (moedasPegas === totalMoedas) {
    porta.ativar();
  }
}

class Moeda {
  constructor(elementoHtml) {
    this.elemento = elementoHtml;
  }

  verificarColisao(jogador) {
    const retJogador = jogador.getBoundingClientRect();
    const retMoeda = this.elemento.getBoundingClientRect();

    const colidiu =
      retJogador.left < retMoeda.right &&
      retJogador.right > retMoeda.left &&
      retJogador.top < retMoeda.bottom &&
      retJogador.bottom > retMoeda.top;

    if (colidiu) {
      this.elemento.remove();
      adicionarMoeda();
      return true;
    }

    return false;
  }
}

class Porta {
  constructor(elemento) {
    this.el = elemento;
    this.ativa = false;
  }

  ativar() {
    this.ativa = true;
    this.el.classList.remove('trancada');
  }

  checarEntrada(jogador) {
    if (!this.ativa) return;

    const r1 = this.el.getBoundingClientRect();
    const r2 = jogador.el.getBoundingClientRect();

    const encostou = !(
      r1.right < r2.left ||
      r1.left > r2.right ||
      r1.bottom < r2.top ||
      r1.top > r2.bottom
    );

    if (encostou) {
      pararTimer();
      mostrarTelaFinal();
    }
  }
}

class Jogador {
  constructor(elementoHtml) {
    this.el = elementoHtml;
    this.x = parseInt(this.el.style.left) || 0;
    this.y = parseInt(this.el.style.top) || 0;

    this.velX = 0;
    this.velY = 0;

    this.largura = this.el.offsetWidth;
    this.altura = this.el.offsetHeight;

    this.noChao = false;
    this.velocidade = 4;
    this.forcaPulo = 15;
    this.gravidade = 1;
    this.limiteVelY = 12;

    this.pisos = Array.from(document.querySelectorAll('.piso, .chao, .teto, .plataforma, .plataforma2, .camada1, .camada2, .camada3'));
    this.moedas = Array.from(document.querySelectorAll('.moeda')).map(el => new Moeda(el));
  }

  mover(direcao) {
    this.velX = direcao * this.velocidade;
  }

  pular() {
    if (this.noChao) {
      this.velY = -this.forcaPulo;
      this.noChao = false;
    }
  }

  aplicarGravidade() {
    this.velY += this.gravidade;
    if (this.velY > this.limiteVelY) this.velY = this.limiteVelY;
  }

  atualizar() {
    this.aplicarGravidade();

    this.x += this.velX;
    this.y += this.velY;

    this.detectarColisoesComPiso();
    this.coletarMoedas();

    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
  }

  detectarColisoesComPiso() {
    this.noChao = false;

    const jogadorRect = this.el.getBoundingClientRect();

    for (const piso of this.pisos) {
      const pisoRect = piso.getBoundingClientRect();

      const colidiu =
        jogadorRect.bottom > pisoRect.top &&
        jogadorRect.top < pisoRect.bottom &&
        jogadorRect.right > pisoRect.left &&
        jogadorRect.left < pisoRect.right;

      if (colidiu && this.velY >= 0 && jogadorRect.bottom <= pisoRect.top + this.velY) {
        this.y = piso.offsetTop - this.altura;
        this.velY = 0;
        this.noChao = true;
      }
    }
  }

  coletarMoedas() {
    this.moedas = this.moedas.filter(moeda => {
      const foiColetada = moeda.verificarColisao(this.el);
      return !foiColetada;
    });
  }
}

function loopJogo() {
  if (jogadorInstancia) {
    jogadorInstancia.atualizar();
    porta.checarEntrada(jogadorInstancia);
  }

  requestAnimationFrame(loopJogo);
}

// Aguarda DOM carregar
document.addEventListener("DOMContentLoaded", () => {
  const btnPlay = document.getElementById("butao");
  const telaPlay = document.getElementById("play");
  const jogadorEl = document.getElementById('jogador');
  const portaEl = document.querySelector('.porta');

  porta = new Porta(portaEl);

  totalMoedas = document.querySelectorAll('.moeda').length;
  document.getElementById('contador').textContent = `Moedas: 0/${totalMoedas}`;

  if (btnPlay && telaPlay) {
    btnPlay.addEventListener("click", () => {
      telaPlay.style.display = "none";
      iniciarTimer();
      jogadorInstancia = new Jogador(jogadorEl);
      jogadorInstancia.el.style.backgroundColor = 'red';
      loopJogo();
    });
  }

  // Reiniciar jogo (opcional)
  const btnReiniciar = document.getElementById('reiniciar');
  if (btnReiniciar) {
    btnReiniciar.addEventListener('click', () => {
      window.location.reload();
    });
  }
});

// CONTROLES DO JOGADOR
document.addEventListener('keydown', (e) => {
  if (!jogadorInstancia) return;

  if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
    jogadorInstancia.mover(-1);
  } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
    jogadorInstancia.mover(1);
  } else if (e.code === 'ArrowUp' || e.code === 'Space') {
    jogadorInstancia.pular();
  }
});

document.addEventListener('keyup', (e) => {
  if (!jogadorInstancia) return;

  if (
    e.code === 'ArrowLeft' ||
    e.code === 'ArrowRight' ||
    e.code === 'KeyA' ||
    e.code === 'KeyD'
  ) {
    jogadorInstancia.mover(0);
  }
});

