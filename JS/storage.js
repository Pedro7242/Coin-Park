

function iniciarJogo(){
    const nome = document.getElementById('nick').value.trim()
    if (nome === ""){
        alert("Por favor, insira um nome!")
    }
    localStorage.setItem('nomeJogador', nome)
    window.location.href = "jogo.html"
}



