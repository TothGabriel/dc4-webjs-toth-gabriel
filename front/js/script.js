fetch('http://127.0.0.1:3000/api/products')
.then(response => response.json())
.then(products => {
    // Trouver l'élément parent où les produits seront ajoutés
    let parentElement = document.querySelector('#items');

    // Pour chaque produit, créer un nouvel élément de produit et l'ajouter à l'élément parent
    for (let product of products) {
        let productElement = `
            <a href="./product.html?id=${product._id}">
                <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                </article>
            </a>
        `;

        parentElement.innerHTML += productElement;
    }
})
.catch(error => console.error('Erreur :', error));