const baseUrl = "https://pokeapi.co/api/v2/";
const containerDiv = document.getElementById('container');
let pokeName = null;
let pokeNum = null;
let pokeDiv = null;
let pokeAbilityName = null;

const searchDiv = document.getElementById('searchContainer');


function mkString(stringInput) {
    return stringInput.toString();
}

function lowCaseSearch(string) {
    return string.toLowerCase();
}

const getPokeResults = (e) => {
    
    const searchInput = document.getElementById("search");
    const name = mkString(searchInput.value);
    console.log(name);
    pokeNum = null;
    
    pokeName = lowCaseSearch(name)
    console.log("this button works")

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.name);
            makePokeDiv(data.sprites.other["official-artwork"].front_default, data.name, searchDiv)

        }).catch((err) => {
            console.log("Pokemon not found", err);
            searchContainer.textContent = "Sorry I can't find that pokemon!"
        });
    // e.preventDefault();

    searchInput.value = ""
}
const getRandomPokemon = (e) => {
    console.log("this random button works")
    pokeNum = Math.floor(Math.random() * 905) + 1
    console.log(pokeNum)
    pokeName = null;

    const pokeDiv = document.getElementById('pokeInfo')
    const pokeAbility = document.getElementById('ability')

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.name);
            makePokeDiv(data.sprites.other["official-artwork"].front_default, data.name, searchDiv)
            

        }).catch((err) => {
            console.log("Pokemon not found", err);
        });
    
    
    // e.preventDefault();
}

const makePokeDiv = (image, name, divForInfo) => {
    
    searchDiv.firstElementChild != null
    // if true
    ? searchDiv.removeChild(pokeDiv)
    // if false
    : null

    
    console.log("this function makePokeDiv works")
    pokeDiv = document.createElement('div')
    
    const pokePic = document.createElement('img')
    const pokeName = document.createElement('h1')
    const pokeAbility = document.createElement('button')
    

    
    pokePic.src = image
    pokeName.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    pokeAbility.onClick = viewAbilities
    pokeDiv.setAttribute("id", "pokeInfo")

    pokeDiv.appendChild(pokePic)
    pokeDiv.appendChild(pokeName)
    pokeAbility.innerHTML = 'Show Abilities';
    pokeAbility.onclick = viewAbilities;
    pokeDiv.appendChild(pokeAbility)


    divForInfo.appendChild(pokeDiv)
    
    
}

const viewAbilities = (e) => {
    
    console.log(`pokeName = ${pokeName}`);
    console.log(`pokeNum = ${pokeNum}`);
    console.log("viewAbilities work")

    if (pokeName === null) {
        numAbilities()

    } 
    else {
        nameAbilities()
}

}
const numAbilities = (e) => {
    console.log('Start of numAbilities function');
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data.abilities);
        for (i = 0; i < data.abilities.length; i++){
            console.log(data.abilities[i].ability.name);
            
            makePokeAbilityDiv(data.abilities[i].ability.name, searchDiv)
        }
        
        
    }).catch((err) => {
        // searchContainer.textContent = "Sorry I can't do that!"
        console.log(err);
    });
}
const nameAbilities = (e) => {
    console.log('Start of nameAbilities function');
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data.abilities);
        for (i = 0; i < data.abilities.length; i++){
            console.log(data.abilities[i].ability.name);
            makePokeAbilityDiv(data.abilities[i].ability.name, searchDiv)
        }
        
        
    }).catch((err) => {
        // searchContainer.textContent = "Sorry I can't do that!"
        console.log(err);
    });
}
const makePokeAbilityDiv = (abilityName, divForInfo) => {
    pokeAbilityName = document.createElement('div')
    
    pokeAbilityName.textContent = abilityName.charAt(0).toUpperCase() + abilityName.slice(1);
    pokeAbilityName.setAttribute("id", "ability")

    pokeDiv.appendChild(pokeAbilityName)

    divForInfo.appendChild(pokeDiv)

}