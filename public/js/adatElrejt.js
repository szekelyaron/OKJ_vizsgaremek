/*function showImage(){
    let cardBody = document.querySelector(".card-body");

    if(cardBody.style.display === 'block'){
        cardBody.style.display = 'none';
        cardBody.addEventListener('click',showImage);
        console.log("elrejtve")
    }else{
        cardBody.style.display = 'block';
        cardBody.removeEventListener('click',showImage)
        console.log("mutatva")
    }
}*/

function showDetails() {
    let details = document.querySelector(".details")
    let button = document.querySelector(".details-button")

    if (details.style.display === 'block') {
        details.style.display = 'none';
        button.innerHTML = 'RÉSZLETEK';
        console.log("elrejtve")
    } else {
        details.style.display = 'block';
        button.innerHTML = 'ELREJT';
        console.log("mutatva")
    }
}