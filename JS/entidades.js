
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
      this.elemento.remove(); // Remove a moeda da tela
    }
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

  checarEntrada(jogador, moedas) {
    if (!this.ativa) return;
    const r1 = this.el.getBoundingClientRect();
    const r2 = jogador.el.getBoundingClientRect();
    const encostou = !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
    if (encostou) {
      mostrarTelaFinal();
    }
  }
}
