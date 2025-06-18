
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
      mostrarTelaFinal(); // Exibe resultado ou ranking
    }
  }
}

class Piso {
  constructor(elemento) {
    this.el = elemento;
  }

  colideCom(jogador) {
    const r1 = this.el.getBoundingClientRect();
    const r2 = jogador.getBoundingClientRect();

    return !(
      r1.right < r2.left ||
      r1.left > r2.right ||
      r1.bottom < r2.top ||
      r1.top > r2.bottom
    );
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

    this.pisos = Array.from(document.querySelectorAll('.piso'));
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

    if (this.moedas.length === 0 && typeof porta !== 'undefined') {
      porta.ativar();
    }
  }
}
