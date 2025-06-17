
let moedas = Array.from(document.querySelectorAll('.moeda')).map(el => new Moeda(el));
const porta = new Porta(document.querySelector('.porta'));
const jogador = document.querySelector('#jogador');


function loopJogo() {
  verificarColisoesMoedas(jogador);
  porta.checarEntrada({ el: jogador });

  
  requestAnimationFrame(loopJogo);
}


loopJogo();
