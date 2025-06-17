function salvarNome() {
  const nome = document.getElementById('nomeJogador').value;
  if (nome.trim() !== "") {
    localStorage.setItem('nomeJogador', nome);
    alert("Nome salvo!");
  } else {
    alert("Digite um nome primeiro.");
  }
document.getElementById('play').style.display = none
}
let moedas = Array.from(document.querySelectorAll('.moeda')).map(el => new Moeda(el));
const porta = new Porta(document.querySelector('.porta'));
const jogador = document.querySelector('#jogador');


function loopJogo() {
  verificarColisoesMoedas(jogador);
  porta.checarEntrada({ el: jogador });

  
  requestAnimationFrame(loopJogo);
}


loopJogo();
