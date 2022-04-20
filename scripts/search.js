/** Displays the pokemon on the screen */
async function DisplayPokemon(){
    let id = document.querySelector('#pokemon_id');
        
    let pokemon = await GetPokemonById(id.value);
    let display = document.querySelector('#pokemon_display');

    display.src = pokemon['sprites']['front_shiny'];
    id.value = pokemon['forms'][0]['name'].toUpperCase();

    DisplayStats(pokemon);
}

/** Displays the stats of the pokemon on the screen */
function DisplayStats(pokemon){
    var types = document.querySelector('#types');
    var abilities = document.querySelector('#abilities');
    var attack = document.querySelector('#stats_attack');
    var defense = document.querySelector('#stats_defense');
    var special_attack = document.querySelector('#stats_special_attack');
    var special_defense = document.querySelector('#stats_special_defense');
    var speed = document.querySelector('#stats_speed');
    var hp = document.querySelector('#stats_hp');
    
    { let numberOfTypes;
        types.value = '';
        numberOfTypes = 1;
        pokemon['types'].forEach(function(type){
            if (numberOfTypes == pokemon['types'].length){
                types.value += type['type']['name'];
            } else{
                types.value += type['type']['name'] + "/";
                numberOfTypes++;
            }
        });
        console.log("Types: " + types.value);
    }

    { let numberOfAbilities;
        abilities.value = '';
        numberOfAbilities = 1;
        pokemon['abilities'].forEach(function(ability){
            if (numberOfAbilities == pokemon['abilities'].length){
                abilities.value += ability['ability']['name'];
            } else{
                abilities.value += ability['ability']['name'] + ", ";
                numberOfAbilities++;
            }
        });
        console.log("Abilities: " + abilities.value);
    }
    
    { let hp_stat;
        hp_stat = pokemon['stats'].filter(s => s['stat']['name'] == 'hp')[0];
        hp.value = hp_stat['base_stat'];
        console.log("HP: " + hp.value);
    }
    
    { let attack_stat;
        attack_stat = pokemon['stats'].filter(s => s['stat']['name'] == 'attack')[0];
        attack.value = attack_stat['base_stat'];
        console.log("Attack: " + attack.value);
    }
    
    { let defense_stat;
        defense_stat = pokemon['stats'].filter(s => s['stat']['name'] == 'defense')[0];
        defense.value = defense_stat['base_stat'];
        console.log("Defense: " + defense.value);
    }
    
    { let special_attack_stat;
        special_attack_stat = pokemon['stats'].filter(s => s['stat']['name'] == 'special-attack')[0];
        special_attack.value = special_attack_stat['base_stat'];
        console.log("Special Attack: " + special_attack.value);
    }
    
    { let special_defense_stat;
        special_defense_stat = pokemon['stats'].filter(s => s['stat']['name'] == 'special-defense')[0];
        special_defense.value = special_defense_stat['base_stat'];
        console.log("Special Defense: " + special_defense.value);
    }
    
    { let speed_stat;
        speed_stat = pokemon['stats'].filter(s => s['stat']['name'] == 'speed')[0];
        speed.value = speed_stat['base_stat'];
        console.log("Speed: " + speed.value);
    }
    
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

/** document ready event */
document.addEventListener('readystatechange', async (event) => {
    event.preventDefault();
    if (document.readyState == 'complete'){
        await DisplayPokemon();
    }
});

/** Search for pokemon event */
document.querySelector('#search').addEventListener('click', async (event) => {
    event.preventDefault();
    await DisplayPokemon();
});