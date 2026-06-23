const carosello = ebi("carosello");
const fadeLeft = ebi("fadeLeft");
const fadeRight = ebi("fadeRight");
const next = ebi("next");
const previous = ebi("previous");
const contenitore = ebi("containerRecensioni");

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
    setFade();
    caricaArticoli();
    generaRecensioni();
    animate();
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

function creaRecensione(recensione){

    const recensioneDiv = create("div");
    recensioneDiv.classList.add("recensione");

    const info = create("div");
    info.classList.add("infoRecensione");

    const icona = create("div");
    icona.classList.add("icona");
    icona.textContent = recensione.nome.charAt(0);

    const nomeUtente = create("div");
    nomeUtente.classList.add("nomeUtente");

    const nome = create("div");
    nome.textContent = recensione.nome;

    const stelle = create("div");
    stelle.classList.add("contenitoreStelle");

    for(let i = 0; i < 5; i++){

        const s = create("span");
        s.textContent = "★";

        if(i < recensione.rating) s.classList.add("attiva");

        stelle.append(s);
    }

    nomeUtente.append(nome, stelle);
    info.append(icona, nomeUtente);

    const desc = create("div");
    desc.classList.add("corpoDescrizione");
    desc.textContent = recensione.testo;

    recensioneDiv.append(info, desc);

    return recensioneDiv;
}

function generaRecensioni(){
    contenitore.replaceChildren();
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const cardWidth = 20 * root;
    const needed = Math.ceil(window.innerWidth / cardWidth) + 3; //posso calcolare quante me ne servono arrotondando avendo le grandezze

    for(let i = 0; i < needed; i++){
        const r = recensioni[i % recensioni.length]; //tramite il modulo mi assicuro di avere sempre valori compresi tra 0 e lenght-1 anche con ripetizione
        contenitore.appendChild(creaRecensione(r));
    }
}

let offset = 0;
let speed = .5; 

//funzione ricorsiva che continua a traslare a sinistra e sposta ogni volta il primo elemento in coda una volta che non è piu' visibile
function animate(){
    offset += speed;

    contenitore.style.transform = `translateX(${-offset}px)`;
    const first = contenitore.firstElementChild;
    if(!first) return requestAnimationFrame(animate); //in caso non sia presente perchè non ancora generato anche se non dovrebbe capitare
    const firstWidth = first.offsetWidth;
    const gap = parseFloat(getComputedStyle(contenitore).gap) || 0;

    if(offset >= firstWidth + gap){
        offset -= firstWidth + gap;
        contenitore.appendChild(first);
    }

    requestAnimationFrame(animate);
}

const observerRecensioni = new ResizeObserver(() => {
    generaRecensioni();
});

//controlla quando ridimensiono la pagina
observerRecensioni.observe(document.body);

function caricaArticoli(){
    const contenitoreArticoli = ebi("containerArticoli");
    contenitoreArticoli.innerHTML="";

    ultimi_articoli.forEach(articolo =>{
        let divArticolo = create("div");
        divArticolo.classList.add("articolo");

        let imgArticolo = create("img");
        imgArticolo.src = articolo.imgPath;

        let divDati = create("div");
        divDati.classList.add("datiArticolo");

        let data = create("p");
        data.classList.add("data")
        data.innerText = articolo.data;

        let titoloArticolo = create("p");
        titoloArticolo.classList.add("titoloArticolo");
        titoloArticolo.innerText = articolo.nome;

        let estratto = create("p");
        estratto.classList.add("descrizioneArticolo");
        estratto.innerText = articolo.estratto;

        /*let linkLettura = create("a");
        linkLettura.classList.add("underlined");
        linkLettura.innerText ="Continua a leggere..."*/

        divDati.appendChild(data);
        divDati.appendChild(titoloArticolo);
        divDati.appendChild(estratto);
        //divDati.appendChild(linkLettura);

        divArticolo.appendChild(imgArticolo);
        divArticolo.appendChild(divDati);

        contenitoreArticoli.appendChild(divArticolo);
    })
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

