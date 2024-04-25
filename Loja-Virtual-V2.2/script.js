/* Variaveis */

var count = 0;

/* Variaveis de Session Storage */

var buyList = [];

/* Body Variaveis */

const navContentField = document.querySelector("#nav-content-categories");
const bodyContentField = document.querySelector(".content");

/* Modal Variaveis */

const modalContainer = document.querySelector(".modal-container");
const modalContent = document.querySelector(".modal-content");
const modalContentProduct = document.querySelector(".modal-content-product");
const modalLever = 'modal-show';

/* Carrinho de Compras (Dropdown) Variaveis */

const buttonBuyCar = document.querySelector(".nav-content-kart");
const modalDropdownBuyCarContent = document.querySelector(".nav-content-img-buy-car");
const modalDropdownBuyCarLever = 'dropdown-show';
const modalDropdownBuyCarTotal = document.querySelector(".nav-content-buy-infotmation-total");

var priceValue = 0;

/* Carrinho de Compras (Compras) Variaveis */

const buyCarItemsField = document.querySelector(".nav-content-buy-items");
const buyCarButtonsField = document.querySelector(".nav-content-buy-buttons");
const buyCarCount = document.querySelector("#nav-content-kart-count");

var buyCount = 0;

/* Script */

window.addEventListener("load", (event) =>{
    console.log("It's running...");

    displayCategories();
});

function displayCategories(){

    //Chamando a URL.

    var urlFakeStoreApi = 'https://fakestoreapi.com/products/categories'

    var request = new XMLHttpRequest();
    request.open("GET", urlFakeStoreApi, false);
    request.send();

    var categories = JSON.parse(request.response);

    console.log(categories);

    //Acrescentando as categorias dentro da Nav.

    for (let index = 0; index < categories.length; index++) {
        
        let categoryList = document.createElement("li");
        let categoryField = document.createElement("a");

        categoryField.id = "nav-src";
        //categoryField.name = categories[index];
        categoryField.textContent = categories[index];

        categoryField.addEventListener("click", (event) =>{

            bodyContentField.innerHTML = "";
            displayProducts(categories[index]);

        });

        categoryList.appendChild(categoryField);
        navContentField.appendChild(categoryList);
    }
}

function displayProducts(category){

    var urlFakeStoreApi = 'https://fakestoreapi.com/products/category/' + category;

    var request = new XMLHttpRequest();
    request.open("GET", urlFakeStoreApi, false);
    request.send();

    var products = JSON.parse(request.response);

    console.log(products);

    for (let index = 0; index < products.length; index++) {
        
        let productDiv = document.createElement("div");
        productDiv.id = "content-div-product";

        let productImage = document.createElement("img");
        productImage.id = "content-image-product";
        productImage.src = products[index].image;

        /* Modal Configuracao */

        productImage.addEventListener("click", (event) =>{

            modalContentProduct.innerHTML = "";

            let productModalDiv = document.createElement("div");
            productModalDiv.id = "modal-product-div";

            /* Imagem Modal Element */
            let productModalImage = document.createElement("img");
            productModalImage.id = "modal-product-image";
            productModalImage.src = products[index].image;

            /* Imagem Modal Div */
            let productModalImageDiv = document.createElement("div");
            productModalImageDiv.className = "modal-product-image-div";

            /* Texto Modal Element */
            let productModalTitle = document.createElement("h2");
            productModalTitle.id = "modal-product-title";
            productModalTitle.textContent = products[index].title;

            let productModalDescription = document.createElement("p");
            productModalDescription.id = "modal-product-description";
            productModalDescription.textContent = products[index].description;

            let productModalPrice = document.createElement("h3");
            productModalPrice.id = "modal-product-price";
            productModalPrice.textContent = "R$ " + products[index].price;

            /* Texto Modal Div */

            let productModalTextDiv = document.createElement("div");
            productModalTextDiv.className = "modal-product-text-div";

            /* Adicionar Produto */
            /* ----------------- */

            /* Botao Modal Element */

            let productModalButton = document.createElement("button");
            productModalButton.id = "modal-product-button";
            productModalButton.textContent = "Add to Buy Car";

            /* Botao Modal Div */

            let productModalButtonDiv = document.createElement("div");
            productModalButtonDiv.className = "modal-product-text-div";

            //Botao de Compra
            productModalButton.addEventListener("click", (event) =>{

                console.log(productModalButton.id + "." + " I was clicked.")

                //Variaveis
                let buyItemTitle = "";

                //Divs para organizacao

                let buyCarItemDivFirst = document.createElement("div");
                buyCarItemDivFirst.className = "content-buy-items-div-1";

                let buyCarItemDivSecond = document.createElement("div");
                buyCarItemDivSecond.className = "content-buy-items-div-2";

                //Image

                let buyCarItemImageDiv = document.createElement("div");
                buyCarItemImageDiv.className = "content-buy-items-image-div";
                
                let buyCarItemImageImg = document.createElement("img");
                buyCarItemImageImg.id = "content-buy-items-image";
                buyCarItemImageImg.src = products[index].image;

                buyCarItemImageDiv.appendChild(buyCarItemImageImg);

                //Title

                let buyCarItemTitleDiv = document.createElement("div");
                buyCarItemTitleDiv.className = "content-buy-items-title-div";

                let buyCarItemTitle = document.createElement("h3");
                
                if (products[index].title.length > 20) {

                    buyCarItemTitle.textContent = products[index].title.substring(0,50) + "...";
                    buyItemTitle = products[index].title.substring(0,50) + "...";
        
                } else {
        
                    buyCarItemTitle.textContent = products[index].title;
                    buyItemTitle = products[index].title;
        
                }

                buyCarItemTitle.id = "content-buy-items-title";

                buyCarItemTitleDiv.appendChild(buyCarItemTitle);

                //Price

                let buyCarPriceDiv = document.createElement("div");
                buyCarPriceDiv.className = "content-buy-items-price-div";

                let buyCarPrice = document.createElement("h2");
                buyCarPrice.id = "content-buy-items-price";
                buyCarPrice.textContent = "R$ " + products[index].price;

                buyCarPriceDiv.appendChild(buyCarPrice);

                //Botao para remover item

                let buyCarItemRemoveButtonDiv = document.createElement("button");
                buyCarItemRemoveButtonDiv.className = "content-buy-items-remove-button-div";      

                let buyCarItemRemoveButton = document.createElement("button");
                buyCarItemRemoveButton.id = "content-buy-items-remove-button";
                buyCarItemRemoveButton.textContent = "Remove";

                buyCarItemRemoveButton.addEventListener("click", (event) =>{

                    count = count - 1;

                    buyCount = buyCount - 1;

                    buyCarCount.textContent = buyCount;

                    priceValue = priceValue - products[index].price;

                    modalDropdownBuyCarTotal.textContent = "Subtotal " + "R$ " + priceValue.toFixed(2);

                    buyCarItemsField.removeChild(buyCarItemDiv);

                });

                buyCarItemRemoveButtonDiv.appendChild(buyCarItemRemoveButton);

                //Manda tudo para uma única Div

                let buyCarItemDiv = document.createElement("div");
                buyCarItemDiv.className = "content-buy-items-div";

                buyCarItemDivFirst.appendChild(buyCarItemImageDiv);
                buyCarItemDivFirst.appendChild(buyCarItemTitleDiv);

                buyCarItemDiv.appendChild(buyCarItemDivFirst);

                buyCarItemDivSecond.appendChild(buyCarPriceDiv);
                buyCarItemDivSecond.appendChild(buyCarItemRemoveButton);

                buyCarItemDiv.appendChild(buyCarItemDivSecond);

                //E depois para a Div principal

                buyCarItemsField.appendChild(buyCarItemDiv);

                /* Adicionar o Subtotal da Compra */

                priceValue = priceValue + products[index].price;

                modalDropdownBuyCarTotal.textContent = "Subtotal " + "R$ " + priceValue.toFixed(2);

                /* Adicionar o Subtotal da Compra */

                /* Criar a lista com as informacoes da compra */

                //Lista de items
                let buyItem = [];
                buyItem.push(buyItemTitle, products[index].image, products[index].price);

                buyList.push(buyItem);

                //JSON
                sessionStorage.setItem("buyInformations", JSON.stringify(buyList))

                //Teste
                var storedTest = JSON.parse(sessionStorage.getItem("buyInformations"));
                console.log(storedTest);

                /* Criar a lista com as informacoes da compra */

                //Aumentando o contador
                buyCount = buyCount + 1;

                buyCarCount.textContent = buyCount;

                count = count + 1;

                //Fechar o Modal de Compras
                closeModal(modalContainer, modalLever);

            });

            /* ----------------- */
            /* Adicionar Produto */

            /* Div para Texto e Botao */

            let productModalSecondDiv = document.createElement("div");
            productModalSecondDiv.className = "modal-product-second-div";

            //Adicionando aos modais

            //Imagem
            productModalImageDiv.appendChild(productModalImage);

            //Texto
            productModalTextDiv.appendChild(productModalTitle);
            productModalTextDiv.appendChild(productModalDescription);
            productModalTextDiv.appendChild(productModalPrice);

            productModalSecondDiv.appendChild(productModalTextDiv);


            //Botao
            productModalButtonDiv.appendChild(productModalButton);

            productModalSecondDiv.appendChild(productModalButtonDiv);
            
            //Principal
            productModalDiv.appendChild(productModalImageDiv);
            productModalDiv.appendChild(productModalSecondDiv);

            //Geral
            modalContentProduct.appendChild(productModalDiv);

            var productValue = products[index].price;

            //console.log(productValue);

            openModal(modalContainer, modalLever);

        });

        /* Modal Configuracao */

        let productTitle = document.createElement("h4");
        productTitle.id = "content-title-product";

        if (products[index].title.length > 50) {

            productTitle.textContent = products[index].title.substring(0,50) + "...";

        } else {

            productTitle.textContent = products[index].title;

        }
   
        let productPrice = document.createElement("p");
        productPrice.id = "content-price-product";
        productPrice.textContent = "R$ " + products[index].price;

        productDiv.appendChild(productImage);
        productDiv.appendChild(productTitle);
        productDiv.appendChild(productPrice);

        bodyContentField.appendChild(productDiv);
    }
}

//Algumas Funcoes do Código.

function openModal(name, lever){

    name.classList.add(lever);

}

function closeModal(name, lever){

    name.classList.remove(lever);

}

//Abrir e fechar Dropdown do Carrinho de Compras.

//Abrir
buttonBuyCar.addEventListener("click", (event) =>{

    openModal(modalDropdownBuyCarContent, modalDropdownBuyCarLever);

});

//Fechar
/* Adiciona eventos na área de exibição */
 
window.onclick = function(event){
     
    /* Se a área com a o identificador for disparada, um evento ocorrerá */
    if (!event.target.matches(".nav-content-kart")){

        /* Desse jeito eu capturo os objetos dentro de uma classe */
        var cssStatement = document.getElementsByClassName("nav-content-img-buy-car")

        /* Rodo dentro dele para achar a classe que adicionei para exibi-la */
        for (let index = 0; index < cssStatement.length; index++){
            
            /* Cada uma delas será anexada nessa variavel */
            var cssProperty = cssStatement[index];

            /* Aqui dentro ela será eximinada */
            if (cssProperty.classList.contains("dropdown-show")){

                /* E entao eu elimino com a minha funcao */
                closeModal(modalDropdownBuyCarContent, modalDropdownBuyCarLever);
            }
        }
    } 
} 


// modalDropdownBuyCarContent.addEventListener("click", (event) =>{

//     /*if (modalDropdownBuyCarContent.contains(event.target)){*/

//     console.log(event.target.parentNode)

//     if (event.target.parentNode.parentNode.parentNode.className === "nav-content-img" || "nav-content-buy-items") {

//         return;

//     } else {

//         closeModal(modalDropdownBuyCarContent, modalDropdownBuyCarLever);

//     }

// });

//Fechar o Modal dos Produtos.

modalContainer.addEventListener("click", (event) =>{

    if (modalContent.contains(event.target)){

        return;

    } else {

        closeModal(modalContainer, modalLever);

    }
});