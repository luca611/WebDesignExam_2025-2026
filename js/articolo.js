// ebi e create sono delle abbreviazioni per comodità di document.getElementById e document.createElement in quanto le uso spesso  

function ebi(id){
    return document.getElementById(id);
}

function create(elemento){
    return document.createElement(elemento);
}


function riempiArticolo(){
    let paginaDaAprire= localStorage.getItem("paginaDaAprire");
    if(!paginaDaAprire) return;

    let contenuto = articoli[paginaDaAprire];

    ebi("immagineArticolo").src = contenuto.imgPath;
    ebi("titoloArticolo").innerText = contenuto.titolo;
    ebi("contenutoArticolo").innerText = contenuto.descrizione;
}

document.addEventListener("DOMContentLoaded", function() {
    riempiArticolo()
});