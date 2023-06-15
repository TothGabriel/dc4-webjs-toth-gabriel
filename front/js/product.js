//récupérer l'ID du produit à partir de l'URL

let url = new URL(window.location.href);
let id = url.searchParams.get('id');


// récupérer les données du produit et les injecter dans la page


fetch(`http://127.0.0.1:3000/api/products/${id}`)
    .then(response => response.json())
    .then(product => {
        // Injecter les données du produit dans la page
        document.querySelector('.item__img').innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
        document.querySelector('#title').textContent = product.name;
        document.querySelector('#price').textContent = product.price;
        document.querySelector('#description').textContent = product.description;

        // Ajouter les options de couleur au select
        let colorsSelect = document.querySelector('#colors');
        for (let color of product.colors) {
            let option = document.createElement('option');
            option.value = color;
            option.textContent = color;
            colorsSelect.appendChild(option);
        }

        // Ajouter un écouteur d'événements au bouton "Ajouter au panier"
        document.querySelector('#addToCart').addEventListener('click', () => {
            let quantity = document.querySelector('#quantity').value;
            addToCart(product._id, colorsSelect.value, quantity);
        });

    })
    .catch(error => console.error('Erreur :', error));


    function addToCart(_id, color, quantity) {
        // Récupérer le panier du localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        // Vérifier si le produit est déjà dans le panier avec la même couleur
        let existingProduct = cart.find(p => p._id === _id && p.chosenColor === color);
    
        if (existingProduct) {
            // Si le produit est déjà dans le panier, mettre à jour sa quantité
            existingProduct.quantity += Number(quantity);
        } else {
            // Si le produit n'est pas dans le panier, l'ajouter avec la quantité choisie
            cart.push({ _id: _id, chosenColor: color, quantity: Number(quantity) });
        }
    
        // Enregistrer le panier dans le localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    


