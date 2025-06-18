let tempo = 0;
let moedasPegas = 0;
let totalMoedas = 0;
let timerInterval;

function iniciarTimer() {
  timerInterval = setInterval(() => {
    tempo++;
    document.getElementById('timer').textContent = `Tempo: ${tempo}s`;
  }, 1000);
}

function pararTimer() {
  clearInterval(timerInterval);
}

function adicionarMoeda() {
  moedasPegas++;
  document.getElementById('moedas').textContent = `Moedas: ${moedasPegas}`;

  if (moedasPegas === totalMoedas) {
    pararTimer();
    mostrarTelaFinal();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btnPlay = document.getElementById("butao");
  const telaPlay = document.getElementById("play");

  if (btnPlay && telaPlay) {
    btnPlay.addEventListener("click", () => {
      telaPlay.style.display = "none";
      iniciarTimer();
    });
  }

  totalMoedas = document.querySelectorAll('.moeda').length;
});
