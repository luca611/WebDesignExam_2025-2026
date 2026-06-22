const carosello = ebi("carosello");
const fadeLeft = ebi("fadeLeft");
const fadeRight = ebi("fadeRight");
const next = ebi("next");
const previous = ebi("previous");

let prodottiCarosello = 0;

next.addEventListener("click", avanti);
previous.addEventListener("click" ,indietro);

function ebi(id){
    return document.getElementById(id);
}

function create(tipo){
    return document.createElement(tipo);
}

//funzioni eseguite al caricamento della pagina home
window.addEventListener("DOMContentLoaded", function() {
    caricaCarosello();
    prodottiCarosello = document.querySelectorAll(".card");
    setFade()
});

//effetto fade up per gli elementi
window.addEventListener("DOMContentLoaded", function() {
    /*  prendo tutti gli oggetti che sto osservando
        e controllo, interseca la mia "vista"? */
    const observer = new IntersectionObserver((elementiOsservati) => {
        elementiOsservati.forEach(elemento => {
            if (elemento.isIntersecting) {
            // se è vero allora gli metto l'animazione del fade up
            elemento.target.classList.add("slideUpFade");
            observer.unobserve(elemento.target);
            }
        });
    });

    //metto in osservazione tutti gli elementi conclasse .toFade
    document.querySelectorAll(".toFade").forEach(section => {
        observer.observe(section);
    });
});

window.addEventListener("scroll", setBorder);
carosello.addEventListener("scroll", setFade)

function caricaCarosello(){
    const contenitoreCarosello= ebi("carosello");
    contenitoreCarosello.innerHTML=""; //anche se non c'è niente mi assicuro sia vuoto

    prodotti_Carosello.forEach(prodotto => {
        let card = create("div")
        card.classList.add("card");

        let prodImg = create("img");
        prodImg.src = prodotto.imgPath;

        let containerDescrizione = create("div");

        let tipologia = create("p");
        tipologia.innerText = prodotto.tipologia;
        tipologia.classList.add("quickDescription");

        let nomeProd = create("p");
        nomeProd.innerText = prodotto.nome; 
        nomeProd.classList.add("productName");

        let prezzo = create("p");
        prezzo.innerText = prodotto.prezzo;
        prezzo.classList.add("productPrice");

        containerDescrizione.appendChild(tipologia);
        containerDescrizione.appendChild(nomeProd);
        containerDescrizione.appendChild(prezzo);

        card.appendChild(prodImg);
        card.appendChild(containerDescrizione);

        contenitoreCarosello.appendChild(card);
    });

}

function setBorder(){
    const navbar = ebi("navbar");
    if (window.scrollY > 0) {
        navbar.classList.add("scrolled");
    } 
    else {
        navbar.classList.remove("scrolled");
    }
}

function setFade(){
    let sensibilita = 10;
    let posizione = carosello.scrollLeft; //arrotondo per evitare situazioni in cui lo scrollo "smooth" si ferma prima del vero massimo
    let massimo = carosello.scrollWidth - carosello.clientWidth - sensibilita; //Scroll massimo del mio carosello - porzione visibile del carosello -> valore massimo di scroll
    let minimo = 0 + sensibilita;

    if(prodotti_Carosello.length == 1){
        fadeLeft.classList.add("fadeHidden");
        previous.classList.add("hideButton");
        fadeRight.classList.add("fadeHidden");
        next.classList.add("hideButton");
        return;
    }

    fadeLeft.classList.remove("fadeHidden");
    fadeRight.classList.remove("fadeHidden");
    next.classList.remove("hideButton");
    previous.classList.remove("hideButton");

    //console.log("posizione: " +posizione+ " massimo: "+ massimo)
    if (posizione >= massimo){
        fadeRight.classList.add("fadeHidden");
        next.classList.add("hideButton");
    }
    else if (posizione <= minimo){
        fadeLeft.classList.add("fadeHidden");
        previous.classList.add("hideButton");
    }
}

let index = 0;

function avanti() {
    let max = prodottiCarosello.length - 1;
    if(index < max) index += 1; 
    //console.log(index);
    carosello.scrollTo({
        left: prodottiCarosello[index].offsetLeft,
        behavior: "smooth"
    });
}

function indietro() {
    let min = 0;
    if(index > 0) index -= 1; 
    //console.log(index);
    carosello.scrollTo({
        left: prodottiCarosello[index].offsetLeft,
        behavior: "smooth"
    });
}

