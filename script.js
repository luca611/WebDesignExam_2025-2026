function ebi(id){
    return document.getElementById(id);
}

window.addEventListener("scroll", setBorder);

function setBorder(){
    const navbar = ebi("navbar");
    if (window.scrollY > 0) {
        navbar.classList.add("scrolled");
    } 
    else {
        navbar.classList.remove("scrolled");
    }
}

const carosello = ebi("carosello");
const fadeLeft = ebi("fadeLeft");
const fadeRight = ebi("fadeRight");
const next = ebi("next");
const previous = ebi("previous");

fadeLeft.classList.add("fadeHidden");
previous.classList.add("hideButton");

carosello.addEventListener("scroll", setFade)

function setFade(){
    let posizione = Math.round(carosello.scrollLeft); //arrotondo per evitare situazioni in cui lo scrollo "smooth" si ferma prima del vero massimo
    let massimo = carosello.scrollWidth - carosello.clientWidth; //Scroll massimo del mio carosello - porzione visibile del carosello -> valore massimo di scroll

    fadeLeft.classList.remove("fadeHidden");
    fadeRight.classList.remove("fadeHidden");
    next.classList.remove("hideButton");
    previous.classList.remove("hideButton");

    console.log("posizione: " +posizione+ " massimo: "+ massimo)
    if (posizione >= massimo){
        fadeRight.classList.add("fadeHidden");
        next.classList.add("hideButton");
    }
    else if (posizione <= 0){
        fadeLeft.classList.add("fadeHidden");
        previous.classList.add("hideButton");
    }
}

const prodottiCarosello = document.querySelectorAll(".card");
let index = 0;

next.addEventListener("click", avanti);

function avanti() {
    let max = prodottiCarosello.length - 1;
    if(index < max) index += 1; 
    console.log(index);
    carosello.scrollTo({
        left: prodottiCarosello[index].offsetLeft,
        behavior: "smooth"
    });
}

previous.addEventListener("click" ,indietro);

function indietro() {
    let min = 0;
    if(index > 0) index -= 1; 
    console.log(index);
    carosello.scrollTo({
        left: prodottiCarosello[index].offsetLeft,
        behavior: "smooth"
    });
}