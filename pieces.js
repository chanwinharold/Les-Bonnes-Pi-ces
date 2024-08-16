/* Récupération des données depuis le fichier JSON */
const response = await fetch("pieces-autos.json")
const piece = await response.json();

/* Création et affichage des éléments */

const sectionFiches = document.querySelector(".fiches")

/* Résumé des articles au prix abordables */
const articlesPrixAbordables = piece.map(piece => piece.nom)

for (let i = articlesPrixAbordables.length -1; i >= 0; i--) {
    if (piece[i].prix >= 35) {
        articlesPrixAbordables.splice(i, 1)
    }
}

const divPrixAbordable = document.querySelector(".prix-abordable")
const ul1 = document.createElement("ul")

for (let i = 0; i < articlesPrixAbordables.length; i++) {
    let li = document.createElement("li")
    li.innerText = articlesPrixAbordables[i]
    ul1.appendChild(li)
    divPrixAbordable.appendChild(ul1)
}
sectionFiches.appendChild(divPrixAbordable)

/* Résumé des articles disponibles */
const nomArticlesDisponibles = piece.map(piece => piece.nom)
const prixArticlesDisponibles = piece.map(piece => piece.prix)

for (let j = nomArticlesDisponibles.length -1; j >= 0; j--) {
    if (piece[j].disponibilite === false) {
        nomArticlesDisponibles.splice(j, 1)
        prixArticlesDisponibles.splice(j, 1)
    }
}

const divPieceDisponibles = document.querySelector(".disponibles")
const ul2 = document.createElement("ul")

for (let j = 0; j < nomArticlesDisponibles.length; j++) {
    let li = document.createElement("li")
    li.innerText = `${nomArticlesDisponibles[j]} - ${prixArticlesDisponibles[j]} €.`
    ul2.appendChild(li)
    divPieceDisponibles.appendChild(ul2)
}
sectionFiches.appendChild(divPieceDisponibles)

/**************** MISE À JOUR DU CODE *************/
function genererArticles(piece) {
    // Cette boucle permettra d'afficher de façon dynamique chaque article du fichier JSON 
    for (let i = 0; i < piece.length; i++) {
        // on récupère l'ensemble des données qu'on veut afficher
        const article = piece[i]

        // on crée les balises qui contiendront ces données
        const image = document.createElement("img")
        const nom = document.createElement("h2")
        const prix = document.createElement("p")
        const categorie = document.createElement("p")
        const description = document.createElement("p")
        const disponibilite = document.createElement("p")

        // on insère chaque donnée dans la balise appropriée
        image.src = article.image
        nom.innerText = article.nom
        prix.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        categorie.innerText = article.categorie ?? "(aucune catégorie)"
        description.innerText = article.Description ?? "(Pas d'information)"
        disponibilite.innerText = article.disponibilite === true ? "En stock" : "Rupture de stock"

        // Et on intègre ces balises dans le DOM afin d'afficher l'article dans la page
        const articles = document.createElement("article")
        sectionFiches.appendChild(articles)
        
        articles.appendChild(image)
        articles.appendChild(nom)
        articles.appendChild(prix)
        articles.appendChild(categorie)
        articles.appendChild(description)
        articles.appendChild(disponibilite)
    }
}

genererArticles(piece)

let btnTrierCroissant = document.querySelector(".btn-trier-croissant")
btnTrierCroissant.addEventListener("click", () => {
    let pieceTrierCroissant = Array.from(piece)
    pieceTrierCroissant.sort(function(a, b) {
        return a.prix - b.prix
    })
    document.querySelector(".fiches").innerHTML = ""
    genererArticles(pieceTrierCroissant)
})

let btnTrierDecroissant = document.querySelector(".btn-trier-decroissant")
btnTrierDecroissant.addEventListener("click", () => {
    let pieceTrierDecroissant = Array.from(piece)
    pieceTrierDecroissant.sort(function(a, b) {
        return b.prix - a.prix
    })
    document.querySelector(".fiches").innerHTML = ""
    genererArticles(pieceTrierDecroissant)
})

let btnFiltrerPrix = document.querySelector(".btn-filtrer-prix")
btnFiltrerPrix.addEventListener("click", () => {
    const pieceFiltrerPrix = piece.filter(function(pieces) {
        return pieces.prix <= 35
    })
    document.querySelector(".fiches").innerHTML = ""
    genererArticles(pieceFiltrerPrix)
})

let btnFiltrerDescription = document.querySelector(".btn-filtrer-description")
btnFiltrerDescription.addEventListener("click", () => {
    const pieceFiltrerDescription = piece.filter(function(pieces) {
        return pieces.Description !== undefined
    })
    document.querySelector(".fiches").innerHTML = ""
    genererArticles(pieceFiltrerDescription)
})

let btnPrixMax = document.getElementById("prix-max")
btnPrixMax.addEventListener("click", () => {
    const piecePrixMax = piece.filter(function(pieces) {
        return pieces.prix <= btnPrixMax.value
    })
    document.querySelector(".fiches").innerHTML = ""
    genererArticles(piecePrixMax)
})