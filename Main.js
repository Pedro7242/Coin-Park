function salvarNome() {
  const nome = document.getElementById('nomeJogador').value;

  if (nome.trim() !== "") {
    localStorage.setItem('nomeJogador', nome);
    alert("Nome salvo!");

    
    document.getElementById('play').style.display = 'none';

   
    document.getElementById('jogo').style.display = 'block';

     
    iniciarGameplay();
  } else {
    alert("Digite um nome primeiro.");
  }
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
