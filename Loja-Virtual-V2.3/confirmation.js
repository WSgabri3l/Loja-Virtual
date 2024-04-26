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

const bodyConfirmatioField = document.querySelector(".confirmation-container-buy-items-list");

/* Script das compras */

window.addEventListener("load", (event) =>{
    console.log("It's running...");

    displayBuy();
    Test();
});

function Test(session) {
    
    console.log(JSON.parse(sessionStorage.getItem("buyInfo")))
}


function displayBuy(storedBuy) {

    let buyList = JSON.parse(sessionStorage.getItem("buyInfo"));
    
    for (let index = 0; index < buyList.length; index++) {
        
        let buyDiv = document.createElement("div");
        buyDiv.className = "buy-div";

        let buyDivSecond = document.createElement("div");
        buyDivSecond.className = "buy-div-second" 

        let buyImage = document.createElement("img");
        buyImage.id = "buy-img"

        buyImage.src = buyList[index].image;

        let buyTitle = document.createElement("h3");
        buyTitle.id = "buy-title";

        buyTitle.textContent = buyList[index].title;

        let buyPrice = document.createElement("p");
        buyPrice.id = "buy-price";

        buyPrice.textContent = "R$ " + buyList[index].price;

        buyDiv.appendChild(buyImage);

        buyDivSecond.appendChild(buyTitle);
        buyDivSecond.appendChild(buyPrice);

        buyDiv.appendChild(buyDivSecond);
        
        bodyConfirmatioField.appendChild(buyDiv);
    }
}