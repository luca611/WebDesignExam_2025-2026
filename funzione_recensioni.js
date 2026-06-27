function ebi(id){
    return document.getElementById(id);
}

function create(elemento){
    return document.createElement(elemento);
}

const container = ebi("containerRecensioni");

recensioni.forEach(recensione => {
    const card = create("div");
    card.classList.add("review-card");

    const info = create("div");
    info.classList.add("infoRecensione");

    const icona = create("div");
    icona.classList.add("icona");
    icona.textContent = recensione.nome.charAt(0);

    const starsContainer = create("div");
    starsContainer.classList.add("stars");

    for (let i = 0; i < 5; i++) {
        const s = create("span");
        s.textContent = "★";
        s.classList.add("star");
        if (i < recensione.rating) s.classList.add("active");
        starsContainer.appendChild(s);
    }

    const reviewHeader = create("div");
    reviewHeader.classList.add("reviewHeader");

    const infoRecensioneDiv = create("div");
    infoRecensioneDiv.classList.add("infoRecensione");

    const h3 = create("h3");
    h3.textContent = recensione.nome;

    infoRecensioneDiv.appendChild(h3);
    infoRecensioneDiv.appendChild(starsContainer);

    reviewHeader.appendChild(icona);
    reviewHeader.appendChild(infoRecensioneDiv);

    const p = create("p");
    p.textContent = recensione.testo;

    card.appendChild(reviewHeader);
    card.appendChild(p);

    container.appendChild(card);
});