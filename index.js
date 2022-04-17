async function DisplayPokemon(){
    var id = document.querySelector('#pokemon_id');
        
    var pokemon = await GetPokemonById(id.value);
    var display = document.querySelector('#pokemon_display');

    display.src = pokemon['sprites']['front_shiny'];
    id.value = pokemon['forms'][0]['name'].toUpperCase();
}

async function GetPokemonById(id){

    if (!id) id = 1;

    let url = `https://pokeapi.co/api/v2/pokemon/${id}/`
    let pokeapiResponse = await fetch(url);

    if (pokeapiResponse.ok) { // if HTTP-status is 200-299
        return await pokeapiResponse.json();
    } else {
        alert("HTTP-Error: " + pokeapiResponse.status);
    }
}

document.addEventListener('readystatechange', async (event) => {
    event.preventDefault();
    if (document.readyState == 'complete'){
        await DisplayPokemon();
    }
});

document.querySelector('#search').addEventListener('click', async (event) => {
    event.preventDefault();
    await DisplayPokemon();
});