document.addEventListener("DOMContentLoaded", function() {
    // Récupérer le panier du local storage
    let panier = JSON.parse(localStorage.getItem("cart"));
  
    // Obtenir le conteneur des articles du panier
    let conteneurArticlesPanier = document.getElementById("cart__items");
  
    // Obtenir les éléments de prix total et de quantité totale
    let elementPrixTotal = document.getElementById("totalPrice");
    let elementQuantiteTotal = document.getElementById("totalQuantity");
  
    // Initialiser le prix total et la quantité totale
    let prixTotal = 0;
    let quantiteTotal = 0;
  
    // Parcourir chaque article dans le panier
    panier.forEach(article => {
      // Récupérer les données du produit de l'API
      fetch(`https://votre-url-api/produits/${article._id}`)
        .then(reponse => reponse.json())
        .then(produit => {
          // Créer un nouvel élément d'article de panier
          let elementArticlePanier = document.createElement("article");
          elementArticlePanier.classList.add("cart__item");
          elementArticlePanier.dataset.id = produit._id;
          elementArticlePanier.dataset.color = article.color;
  
          // Remplir l'élément d'article de panier avec les données du produit
          elementArticlePanier.innerHTML = `
            <div class="cart__item__img">
              <img src="${produit.image}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${produit.name}</h2>
                <p>${article.color}</p>
                <p>${produit.price} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          `;
  
          // Ajouter l'élément d'article de panier au conteneur des articles du panier
          conteneurArticlesPanier.appendChild(elementArticlePanier);
  
          // Mettre à jour le prix total et la quantité totale
          prixTotal += produit.price * article.quantity;
          quantiteTotal += article.quantity;
  
          // Mettre à jour les éléments de prix total et de quantité totale
          elementPrixTotal.textContent = prixTotal.toFixed(2);
          elementQuantiteTotal.textContent = quantiteTotal;
  
          // Ajouter un écouteur d'événement au bouton "Supprimer"
          elementArticlePanier.querySelector(".deleteItem").addEventListener("click", function() {
            // Supprimer l'article du panier
            panier = panier.filter(a => a._id !== article._id || a.color !== article.color);
  
            // Mettre à jour le panier dans le local storage
            localStorage.setItem("panier", JSON.stringify(panier));
  
            // Mettre à jour le panier dans le local storage
            localStorage.setItem("panier", JSON.stringify(panier));
  
            // Supprimer l'élément d'article de panier de la page
            conteneurArticlesPanier.removeChild(elementArticlePanier);
  
            // Mettre à jour le prix total et la quantité totale
            prixTotal -= produit.price * article.quantity;
            quantiteTotal -= article.quantity;
            elementPrixTotal.textContent = prixTotal.toFixed(2);
            elementQuantiteTotal.textContent = quantiteTotal;
          });
        });
    });
  });