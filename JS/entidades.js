
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