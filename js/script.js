window-alert ('ola, seja bem vindo');

function mudarTamanho() {
    if (window.innerwidth >=768) {
        itens.style.display = 'inline-block'
    } else {
        itens.style.display = 'none'
    }
}

function clickMenu() {
    if (itens.style.display == 'block') {
        itens.style.display = 'none'
    } else {
        itens.style.display = 'block'
    }
}