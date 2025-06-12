window.onload = function(){
    const nome = localStorage.getItem("nomeJogador")
    if(!nome){
        alert("Você precisa escolher um nome!")
        window.location.href = "PaginaInicial.html"
        return
    }
}
