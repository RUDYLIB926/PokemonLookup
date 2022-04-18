/** Displays the pokemon on the screen */
async function DisplayPokemon(){
    var id = document.querySelector('#pokemon_id');
        
    var pokemon = await GetPokemonById(id.value);
    var display = document.querySelector('#pokemon_display');

    display.src = pokemon['sprites']['front_shiny'];
    id.value = pokemon['forms'][0]['name'].toUpperCase();

    DisplayStats(pokemon);
}

/** Displays the stats of the pokemon on the screen */
function DisplayStats(pokemon){
    let types = document.querySelector('#types');
    let abilities = document.querySelector('#abilities');
    let attack = document.querySelector('#stats_attack');
    let defense = document.querySelector('#stats_defense');
    let special_attack = document.querySelector('#stats_special_attack');
    let special_defense = document.querySelector('#stats_special_defense');
    let speed = document.querySelector('#stats_speed');
    let hp = document.querySelector('#stats_hp');

    types.value = '';
    var numberOfTypes = 1;
    pokemon['types'].forEach(function(type){
        if (numberOfTypes == pokemon['types'].length){
            types.value += type['type']['name'];
        } else{
            types.value += type['type']['name'] + "/";
            numberOfTypes++;
        }
    });

    abilities.value = '';
    pokemon['abilities'].forEach(function(ability){
        abilities.value += ability['ability']['name'] + ", ";
    });

    var hp_stat = pokemon['stats'].filter(s => s['stat']['name'] == 'hp')[0];
    hp.value = hp_stat['base_stat']

    var attack_stat = pokemon['stats'].filter(s => s['stat']['name'] == 'attack')[0];
    attack.value = attack_stat['base_stat']

    var defense_stat = pokemon['stats'].filter(s => s['stat']['name'] == 'defense')[0];
    defense.value = defense_stat['base_stat']

    var special_attack_stat = pokemon['stats'].filter(s => s['stat']['name'] == 'special-attack')[0];
    special_attack.value = special_attack_stat['base_stat']

    var special_defense_stat = pokemon['stats'].filter(s => s['stat']['name'] == 'special-defense')[0];
    special_defense.value = special_defense_stat['base_stat']

    var speed_stat = pokemon['stats'].filter(s => s['stat']['name'] == 'speed')[0];
    speed.value = speed_stat['base_stat']
}

/**
 * Searches the pokeapi.co api for the specified pokemon
 * @param {The id or name of the pokemon to get} id 
 */
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