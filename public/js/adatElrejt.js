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