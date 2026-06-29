// ebi e create sono delle abbreviazioni per comodità di document.getElementById e document.createElement in quanto le uso spesso  

function ebi(id){
    return document.getElementById(id);
}

function create(elemento){
    return document.createElement(elemento);
}

window.addEventListener("DOMContentLoaded", function() {
    caricaProdotti();
});

function caricaProdotti(){
    const listaProdotti= ebi("listaProdotti");
    listaProdotti.innerHTML=""; //anche se non c'è niente mi assicuro sia vuoto

    //per ogni prodotto creo con le API del DOM l'elemento html e lo metto nel carosello
    prodotti.forEach(prodotto => {
        let card = create("div")
        card.classList.add("card");

        let prodImg = create("img");
        prodImg.src = prodotto.imgPath;

        let divImg = create("div");
        divImg.classList.add("contImg");
        divImg.appendChild(prodImg);

        let buttonShop = create("button");
        buttonShop.classList.add("acquistaProdotto");
        buttonShop.onclick = function() {
            acquista(prodotto.id, 1);
        };
        let testo = create("p")
        testo.innerText="Acquista";
        buttonShop.appendChild(testo);

        divImg.appendChild(buttonShop);

        let buttonLente = create("button");
        buttonLente.classList.add("search");
        buttonLente.onclick =function(){
            preview(prodotto.id);
        };
        divImg.appendChild(buttonLente);

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

        card.appendChild(divImg);
        card.appendChild(containerDescrizione);

        listaProdotti.appendChild(card);
    });

}

