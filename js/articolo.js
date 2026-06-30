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

function caricaBlog(){
    const container = ebi("containerArticoliSuggeriti");
    container.innerText="";
    let delayS = 0;

    articoli.forEach(a => {
        if(!(a.id == localStorage.getItem("paginaDaAprire"))){
            const art = create("div");
            art.classList.add("articolo");

            const img = create("img");
            img.src = a.imgPath;

            const inner = create("div");

            const h1 = create("h1");
            h1.innerText = a.titolo;

            const p = create("p");
            p.innerText = a.estratto;

            const btn = create("a");
            const btnP = create("p");
            btnP.innerText = "Leggi di più...";
            btn.appendChild(btnP);

            btn.addEventListener("click", function(){
                localStorage.setItem("paginaDaAprire", a.id);
                window.location.href = "./articolo.html";
            });

            inner.appendChild(h1);
            inner.appendChild(p);
            inner.appendChild(btn);

            art.appendChild(img);
            art.appendChild(inner);

            art.classList.add("toFade");
            art.style.animationDelay = delayS + "s";
            delayS += 0.1;
            container.appendChild(art);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    riempiArticolo();
    caricaBlog();
});