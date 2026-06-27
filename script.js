// ebi e create sono delle abbreviazioni per comodità di document.getElementById e document.createElement in quanto le uso spesso  

function ebi(id){
    return document.getElementById(id);
}

function create(elemento){
    return document.createElement(elemento);
}

//apertura elementi foldable del footer
const sezioni = document.querySelectorAll(".fold");

sezioni.forEach(sezione => {
    const header = sezione.querySelector(".containerTitoloFold");
    const bottone = sezione.querySelector(".pusanteFold");

    header.addEventListener("click",()=>{
        sezione.classList.toggle("open");
        if(sezione.classList.contains("open")){
            bottone.textContent = "−";
        }else{
            bottone.textContent = "+";
        }
    });
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

//applica il bordo alla navbar
function setBorder(){
    const navbar = ebi("navbar");
    if (window.scrollY > 0) {
        navbar.classList.add("scrolled");
    } 
    else {
        navbar.classList.remove("scrolled");
    }
}

const pulsanteNavBar = ebi("menuIcon");
const pulsanteChiusuraNav = ebi("navCLose");

pulsanteNavBar.addEventListener("click", apriNav);
pulsanteChiusuraNav.addEventListener("click", chiudiNav);

function apriNav(){
    ebi("sfondoNero").classList.add("active");
    ebi("mobileNav").classList.add("active");
    ebi("links").classList.add("active");
}

function chiudiNav(){
    ebi("sfondoNero").classList.remove("active");
    ebi("mobileNav").classList.remove("active");
    ebi("links").classList.remove("active");
}

const shopCloseBtn = ebi("shopClose");
shopCloseBtn.addEventListener("click", closeShop);

function closeShop(){
    ebi("carrello").classList.remove("active");
    ebi("productPreview").classList.remove("active");
    ebi("sfondoNeroShop").classList.remove("active");
    ebi("shopBar").classList.remove("active")
}
function apriShop(){
    ebi("sfondoNeroShop").classList.add("active");
    ebi("shopBar").classList.add("active")
}

function preview(id){
    if(!prodotti[id]) return;
    ebi("carrello").classList.remove("active");
    ebi("productPreview").classList.add("active");
    ebi("headerBar").innerText= prodotti[id].nome;
    ebi("previewImage").src = prodotti[id].imgPath;
    ebi("prodDesc").innerText = prodotti[id].desc;
    ebi("listaIng").innerHTML= "";
    prodotti[id].ingredienti.forEach(ingrediente =>{
        let elementoLista = create("li"); 
        elementoLista.innerText = ingrediente
        ebi("listaIng").appendChild(elementoLista);
    })

    ebi("pulsanteAcquista").onclick = function() {
        acquista(id, 1);
    }
    apriShop()
}

function acquista(id, animazione = 0){
    ebi("headerBar").innerText= "Carrello";
    let carrello = JSON.parse(localStorage.getItem('carrello')) || [];;
    const container = ebi("carrello");
    let giaNelCarrello;

    if (id == -1){
        
    }else{
        giaNelCarrello = carrello.find(item => item.id === id);
        if(giaNelCarrello){
            giaNelCarrello.quantita += 1;
        } else {
            carrello.push({id: id, quantita: 1});
        }
        localStorage.setItem("carrello", JSON.stringify(carrello));
    }

    renderCarrello(animazione);
    ebi("carrello").classList.add("active");
    ebi("productPreview").classList.remove("active");
    apriShop();
}

function rimuoviProd(id){
    let carrello = JSON.parse(localStorage.getItem('carrello')) || [];
    const index = carrello.findIndex(item => item.id === id);
    if (index === -1) return;

    if (carrello[index].quantita <= 1) {
        carrello.splice(index, 1);
    } else {
        carrello[index].quantita -= 1;
    }

    localStorage.setItem('carrello', JSON.stringify(carrello));

    renderCarrello();
}

function renderCarrello(animation = 0){
    ebi("headerBar").innerText= "Carrello";
    let carrello = JSON.parse(localStorage.getItem('carrello')) || [];;
    const container = ebi("carrello");

    if(container){
        container.innerHTML = "";
        let delay = 0;

        if (carrello.length === 0) {
            const divPlaceholder = create("div");
            divPlaceholder.classList.add("placeholderDiv")

            const imgVuota = create("img");
            imgVuota.classList.add("emptyCartImg");
            imgVuota.src = "./resources/iconSet/emptyCart.svg";

            const emptyText = create("p");
            emptyText.classList.add("emptyCartText");
            emptyText.innerText = "Il carrello è vuoto.";

            divPlaceholder.appendChild(imgVuota);
            divPlaceholder.appendChild(emptyText);

            container.appendChild(divPlaceholder);
            return;
        }

        carrello.forEach(item => {
            const prod = prodotti[item.id];
            if(!prod) return;

            let contenitore = create("div");
            contenitore.classList.add("wrapperCarrello");

            if (animation == 1) {
                contenitore.classList.add("slideUpFade");
                contenitore.style.animationDelay = delay + "s";
                delay += 0.2;
            }

            let img = create("img");
            img.classList.add("imgProductCarrello");
            img.src = prod.imgPath;
            img.alt = prod.nome;

            let text = create("div");
            text.classList.add("descrizioneProdotti");
            
            let nomeProd = create("p");
            nomeProd.innerText = prod.nome;

            text.appendChild(nomeProd);

            let quantitaProdotto = create("p");
            quantitaProdotto.classList.add("quantitaProd");
            quantitaProdotto.innerText= "Nel carrello: " + item.quantita;

            text.appendChild(quantitaProdotto);

            let addProdBtn = create("button");
            addProdBtn.classList.add("rimuoviProd");
            addProdBtn.textContent = "+";
            addProdBtn.onclick = function() {
                acquista(item.id);
            }

            let rimuoviProdBtn = create("button");
            rimuoviProdBtn.classList.add("rimuoviProd");
            rimuoviProdBtn.textContent = "-";
            rimuoviProdBtn.onclick = function() {
                rimuoviProd(item.id);
            }

            let div = create("div");
            div.classList.add("btnContainer");
            div.appendChild(addProdBtn);
            div.appendChild(rimuoviProdBtn);

            contenitore.appendChild(img);
            contenitore.appendChild(text);
            contenitore.appendChild(div);
            container.appendChild(contenitore);
            
    }); 
    }
}

const pulsanteAperturaCarrello = ebi("apriCarrello");
pulsanteAperturaCarrello.addEventListener("click", apriCarrelloAnimato);


function apriCarrelloAnimato(){
    console.log("apro")
    renderCarrello(1);
    ebi("carrello").classList.add("active");
    ebi("productPreview").classList.remove("active");
    apriShop();
}