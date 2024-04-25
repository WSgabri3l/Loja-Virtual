/* Variaveis do endereco */

const zipCodeField = document.querySelector("#zipcode");
const streetField = document.querySelector("#street");
const districtField = document.querySelector("#district");
const moreField = document.querySelector("#more");

/* Script do endereco */

zipCodeField.addEventListener("keypress", (event) =>{

    if (event.key == "Enter"){

        var url = "https://viacep.com.br/ws/" + zipCodeField.value + "/json/"

        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send();

        let address = JSON.parse(request.response);
        streetField.value = address.logradouro;
        districtField.value = address.bairro;
        moreField.value = address.localidade;
    }
});

/* Body Variaveis */

const bodyConfirmatioField = document.querySelector(".confirmation-content");

var storedBuy = JSON.parse(sessionStorage.getItem("buyInformations"));

/* Script das compras */

window.addEventListener("load", (event) =>{
    console.log("It's running...");

    displayBuy();
    Test();
});

function Test(session) {
    
    for (let index = 0; index < sessionStorage.length; index++) {
        
        console.log(sessionStorage.key(index));
        
    }
}

function displayBuy(storedBuy) {
    
    for (let index = 0; index < sessionStorage.length; index++) {
        
        let buyDiv = document.createElement("div");
        buyDiv.className = "buy-div";

        let buyImage = document.createElement("img");
        buyImage.id = "buy-img"

        buyImage.src = "";

        let buyTitle = document.createElement("h3");
        buyTitle.id = "buy-title";

        buyTitle.textContent = "";

        let buyPrice = document.createElement("p");
        buyPrice.id = "buy-price";

        buyPrice.textContent = "";

        buyDiv.appendChild(buyImage);
        buyDiv.appendChild(buyTitle);
        buyDiv.appendChild(buyPrice);
        
        bodyConfirmatioField.appendChild(buyDiv);
    }
}