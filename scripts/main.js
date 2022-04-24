/** document ready event */
document.addEventListener('readystatechange', async (event) => {
    event.preventDefault();
    if (document.readyState == 'complete'){
        await DisplayPokemon();
    }
});

/** Displays the pokemon on the screen */
async function DisplayPokemon(){
    let carousel = document.querySelector('.carousel-inner');
    let pokemonApiResponse = await GetPokemon();
    let pokemonUrls = pokemonApiResponse['results'];

    for(let i = 0; i < pokemonUrls.length; i++){
        let pokemon = await GetPokemonFromUrl(pokemonUrls[i]['url']);
        let img = pokemon['sprites']['front_shiny'];
        let name = pokemon['name'].toUpperCase();
        if (i == 0){
            let firstImg = document.querySelector('img');
            let firstName = document.querySelector('h5');
            firstImg.src = img;
            firstName.innerText = name;
        } else {
            carousel.innerHTML += 
            `<div class="carousel-item" data-bs-interval="2000">
                <img src=${img} class="d-block w-100">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${name}</h5>
                </div>
            </div>`;
        }
    }
}

/**
 * Searches the pokeapi.co api for the specified pokemon
 * @param {The id or name of the pokemon to get} id 
 */
async function GetPokemon(){
    let url = 'https://pokeapi.co/api/v2/pokemon/?limit=150'
    let pokeapiResponse = await fetch(url);

    if (pokeapiResponse.ok) { // if HTTP-status is 200-299
        return await pokeapiResponse.json();
    } else {
        alert("HTTP-Error: " + pokeapiResponse.status);
    }
}

/** 
 * Retrieves the pokemon from the provided url
 * @param {The url of the pokemon to get} url 
 */
async function GetPokemonFromUrl(url){
    let pokeapiResponse = await fetch(url);

    if (pokeapiResponse.ok) { // if HTTP-status is 200-299
        return await pokeapiResponse.json();
    } else {
        alert("HTTP-Error: " + pokeapiResponse.status);
    }
}