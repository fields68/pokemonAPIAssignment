//* Initialize global variables to be used across functions
const baseUrl = "https://pokeapi.co/api/v2/";
let pokeName = null;
let pokeNum = null;
let pokeDiv = null;
let abilityDiv = null;
let abilityButtonDiv = null;
let imgNameDiv = null;
let pokeTypeDiv = null;
let pokeAbilityName = null;
let pokeAbility = "";
let numOfAbilities = "";
let pokeType1 = "";
let pokeType2 = "";
let typeSlot = "";
let pType2 = "";
let cssType2 = "";

const searchDiv = document.getElementById('searchContainer');



//* Turns users search value into a string to be manipulated later 
function mkString(stringInput) {
    return stringInput.toString();
}
//* Changes string (user input value) to all lower case letters to match the name in the Poke API
function lowCaseSearch(string) {
    return string.toLowerCase();
}
//* Function triggered when user hits the search button on the HTML
const getPokeResults = () => {
    
    const searchInput = document.getElementById("search");
    //* Triggers function "mkString" and assigns "name" a value
    const name = mkString(searchInput.value);
    // console.log(name);

    //* There are two ways to pull up a pokemon 1. By searching for a specific pokemon (function getPokeResults()). 2. The other by randomly picking on by the pokemon ID number (function getRandomPokemon())
    //! pokeNum refers to the function getRandomPokemon and is used later to help display the proper pokemon abilities and not return an error. pokeNum is assigned value "null" so that the function (nameAbilities) is triggered and the proper fetch is used.
    pokeNum = null;
    
    
    pokeName = lowCaseSearch(name)
    // console.log("this button works")
    //* searchContainer is set to have no value here so that if the .catch is triggered then the text it displays will be wiped once another search has happened
    searchContainer.textContent = ""

    if (pokeType1 !== "") {
        searchDiv.classList.remove(pokeType1)
    } else {}

    //* gets the information of the pokemon that was searched for by user
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.name);
            //* Triggers function (makePokeDiv) and gives the function information on what image to display, the name, and the div where it will be populated at in the HTML page.
            
            // console.log(`Types array lenght ${data.types.length}`);            
            
            
            if (data.types.length === 2) {
                // console.log("2 slots");
                pokeType1 = data.types[0].type.name
                pokeType2 = data.types[1].type.name
                pType2 = "- " + pokeType2.charAt(0).toUpperCase() + pokeType2.slice(1)
                cssType2 = pokeType2 + "T"
                // console.log("1 slot");
            } else {
                // console.log("1 slot");
                pokeType1 = data.types[0].type.name
                pokeType2 = "";
                pType2 = "";
                cssType2 = "";
            }
            
            makePokeDiv(data.sprites.other["official-artwork"].front_default, data.name, data.id, data.base_experience, data.height, data.weight, pokeType1, searchDiv)
            // for (i = 0; i <= 1; i++){
            //     typeSlot = data.types[i].slot
            //     console.log(`Type Slot: ${typeSlot}`);

            //     switch (typeSlot) {
            //         case 1:
            //             console.log("slot 1");
            //             break;
            //         case 2:
            //             console.log("slot 2");
            //             break;
            //         default:
            //             console.log("no more slots");
                // }

                // if (i === 1) {
                //     pokeType1 = data.types[1].type.name
                // } else {
                //     pokeType2 = data.types[2].type.name
                // }
                console.log(pokeType1);
                console.log(pokeType2);
                // makePokeTypeDiv(data.types[i].type.name, searchDiv)
            // }

        }).catch((err) => { //* If the API cannot locate the pokemon the user searched for it will add text to the HTML to let the user know that the information that was typed did not return any results. 
            console.log("Pokemon not found", err);
            searchContainer.textContent = "Sorry I can't find that pokemon!"
        });
    // e.preventDefault();
    //* clears what the user inputed into the search bar
    searchInput.value = ""
}
//* Function triggered when user clicks the Random pokemon button
const getRandomPokemon = () => {
    // console.log("this random button works")
    pokeNum = Math.floor(Math.random() * 905) + 1
    // console.log(pokeNum)

    if (pokeType1 !== "") {
        searchDiv.classList.remove(pokeType1)
    } else {}

    //* There are two ways to pull up a pokemon 1. By searching for a specific pokemon (function getPokeResults()). 2. The other by randomly picking on by the pokemon ID number (function getRandomPokemon())
    //! pokeName refers to the function getPokeResults and is used later to help display the proper pokemon abilities and not return an error. pokeName is assigned value "null" so that the function (numAbilities) is triggered and the proper fetch is used.
    pokeName = null;

    //* searchContainer is set to have no value here so that if the .catch is triggered then the text it displays will be wiped once this button is pressed 
    searchContainer.textContent = ""

    //* Gets the pokemon with the random number that was generated by searching by the pokemon ID in the API
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.name);
            // if (cssType2 !== "") {
            //     classType2();
            // } else {                
            // }
            
            

            if (data.types.length === 2) {
                // console.log("2 slots");
                pokeType1 = data.types[0].type.name
                pokeType2 = data.types[1].type.name
                pType2 = "- " + pokeType2.charAt(0).toUpperCase() + pokeType2.slice(1)
                cssType2 = pokeType2 + "T"
                // console.log("1 slot");
            } else {
                // console.log("1 slot");
                pokeType1 = data.types[0].type.name
                pokeType2 = "";
                pType2 = "";
                cssType2 = "";
            }
            console.log(pokeType1);
            console.log(pokeType2);
            
            //* Triggers function (makePokeDiv) and gives the function information on what image to display, the name, and the div where it will be populated at in the HTML page
            makePokeDiv(data.sprites.other["official-artwork"].front_default, data.name, data.id, data.base_experience, data.height, data.weight, pokeType1, searchDiv)

        }).catch((err) => {//! This function should not trigger an error but the catch is still here just in case
            console.log("Pokemon not found", err);
            searchContainer.textContent = "Sorry I can't find that pokemon!"
        });
    
    
    // e.preventDefault();
}
const classType2 = () => {
    // searchDiv.classList.remove(pokeType1)
    // imgNameDiv.classList.remove(cssType2)
    // pokeDiv.classList.remove(cssType2)
    // abilityButtonDiv.classList.remove(cssType2)
    imgNameDiv.classList.add(cssType2)
    pokeDiv.classList.add(cssType2)
    abilityButtonDiv.classList.add(cssType2)
    // abilityDiv.classList.add(cssType2)
    
}
const makePokeDiv = (image, name, id, exp, height, weight, type1, divForInfo) => {

    //* This if else statement will wipe the previously generated pokemon if there is information in the pokeDiv and generate new information if provided the proper input. 
    if (searchDiv.firstElementChild != null) {   
        searchDiv.removeChild(pokeDiv)
    } else {null}
    
    //* Ternary that does the samething as the if else above. Commented it out for testing purposes.
    // searchDiv.firstElementChild != null
    // // if true
    // ? searchDiv.removeChild(pokeDiv)
    // // if false
    // : null
    
    
    // console.log("this function makePokeDiv works")
    //* Initializing and assigning  new variables with their values
    pokeDiv = document.createElement('div')
    // abilityDiv = document.createElement('div')
    abilityButtonDiv = document.createElement('div')
    imgNameDiv = document.createElement('div')
    
    const pokePic = document.createElement('img')
    const pokeNoPic = document.createElement('p')
    const pokeName = document.createElement('h1')
    const pokeID = document.createElement('h3')
    const pokeEXP = document.createElement('p')
    const pokeHeight = document.createElement('p')
    const pokeWeight = document.createElement('p')
    const pokeTypes = document.createElement('h3')
    pokeAbility = document.createElement('button')

    console.log(pType2);
    
    if (image === null) {
        pokeNoPic.textContent = "No image available for this pokemon"
    } else {pokePic.src = image}

    //* Gives the created variables their information to display from the API
    
    pokeName.textContent = name.charAt(0).toUpperCase() + name.slice(1); //! capitalizes the first letter in pokemon name
    pokeID.textContent = `Pokemon ID: ${id}`;
    pokeEXP.textContent = `EXP: ${exp}`;
    pokeHeight.textContent = `Height: ${height}`;
    pokeWeight.textContent = `Weight: ${weight}`;
    pokeTypes.textContent = `Type: ${type1.charAt(0).toUpperCase() + type1.slice(1)} ${pType2}`;
    pokeAbility.setAttribute("id", "pokeAbilityBtn")//! assigns id to the new button
    pokeAbility.onClick = viewAbilities //! creates a function to be triggeres when button is clicked
    pokeDiv.setAttribute("id", "pokeInfo")
    imgNameDiv.setAttribute("id", "pokePicName")
    abilityButtonDiv.setAttribute("id", "abilityBtn")
    // abilityDiv.setAttribute("id", "pokeAbility")
    divForInfo.classList.add(pokeType1)

    if (cssType2 !== "") {
        console.log(`cssType2: ${cssType2}`);
        imgNameDiv.classList.add(cssType2)
        pokeDiv.classList.add(cssType2)
        abilityButtonDiv.classList.add(cssType2)
    } else {}

    //* adds all the elements to the created pokeDiv
    if (image === null) {
        imgNameDiv.appendChild(pokeNoPic)
    } else {imgNameDiv.appendChild(pokePic)}
    
    
    imgNameDiv.appendChild(pokeName)
    pokeDiv.appendChild(pokeID)
    pokeDiv.appendChild(pokeEXP)
    pokeDiv.appendChild(pokeHeight)
    pokeDiv.appendChild(pokeWeight)
    pokeDiv.appendChild(pokeTypes)
    pokeAbility.innerHTML = 'Show Abilities';
    pokeAbility.onclick = viewAbilities;

    divForInfo.appendChild(imgNameDiv)
    divForInfo.appendChild(pokeDiv)
    divForInfo.appendChild(abilityButtonDiv)
    
    abilityButtonDiv.appendChild(pokeAbility)
    
}
//* OnClick function for ability button
const viewAbilities = () => {
    
    // console.log(`pokeName = ${pokeName}`);
    // console.log(`pokeNum = ${pokeNum}`);
    // console.log("viewAbilities work")
    //* if else statement to lead the code to the proper fetch statement 
    //! i.e. if user searched by name function nameAbilities will be triggered. If user generated a number function numAbilities will be triggered
    if (pokeName === null) {
        createAbilityDiv()
        numAbilities()

    } 
    else {
        createAbilityDiv()
        nameAbilities()
}
}
const createAbilityDiv = () => {
    
    abilityDiv = document.createElement('div')
    searchDiv.appendChild(abilityDiv)
    abilityDiv.setAttribute("id", "pokeAbility")

    
}
const hideAbilities = () => {
    // const abilities = document.getElementById('ability')
    // console.log("hideAbilities work")    
    // console.log(`numOfAbilities = ${numOfAbilities}`);


    searchDiv.firstElementChild != null
    // if true
    ? searchDiv.removeChild(abilityDiv)
    // if false
        : null
    
    pokeAbility.innerHTML = 'Show Abilities';
    pokeAbility.onclick = viewAbilities;


}
//* function to display the abilities of pokemon that was randomly generated
const numAbilities = () => {
    // console.log('Start of numAbilities function');
    //* clears array before abilities are genereated for a new pokemon
    pokeAbilityArray = [];

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data.abilities);
        numOfAbilities = data.abilities.length;        
        
        for (i = 0; i < numOfAbilities; i++){
            // console.log(data.abilities[i].ability.name);

            makePokeAbilityDiv(data.abilities[i].ability.name, abilityDiv)
        }
        
    }).catch((err) => {
        // searchContainer.textContent = "Sorry I can't do that!"
        console.log(err);
    });
}
//* function to display the abilities of pokemon that was searched by user
const nameAbilities = () => {
    console.log('Start of nameAbilities function');
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data.abilities);
        numOfAbilities = data.abilities.length;

        for (i = 0; i < numOfAbilities; i++){
            console.log(data.abilities[i].ability.name);
            makePokeAbilityDiv(data.abilities[i].ability.name, abilityDiv)
        }
        
        
    }).catch((err) => {
        // searchContainer.textContent = "Sorry I can't do that!"
        console.log(err);
    });
}
const makePokeAbilityDiv = (abilityName, divForInfo) => {
    pokeAbilityName = document.createElement('p')
    
    pokeAbilityName.textContent = abilityName.charAt(0).toUpperCase() + abilityName.slice(1);
    divForInfo.appendChild(pokeAbilityName)
    pokeAbility.innerHTML = 'Hide Abilities';
    pokeAbility.onclick = hideAbilities;
    if (cssType2 !== "") {
        console.log(`cssType2: ${cssType2}`);
        abilityDiv.classList.add(cssType2)
    } else {}

}
const makePokeTypeDiv = (abilityName, divForInfo) => {
    pokeAbilityName = document.createElement('div')
    
    pokeAbilityName.textContent = abilityName.charAt(0).toUpperCase() + abilityName.slice(1);
    pokeAbilityName.setAttribute("id", "ability")

    pokeDiv.appendChild(pokeAbilityName)

    divForInfo.appendChild(pokeDiv)

}