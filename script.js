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

const titleDiv = document.getElementById('titleSearch');
const searchDiv = document.getElementById('searchContainer');
const pAudio = document.getElementById('pokeAudio')

//* Sets the volume level for the audio
pAudio.volume = 0.2;

//* Mute audio when button is pressed 
mute = () => {
    pAudio.volume = 0;

    //* Changes the mute button to an unmute button
    muteControl.value = 'Music Unmute 🔊';
    muteControl.onclick = unmute;
}

//* Unmute audio when button is pressed
unmute = () => {
    pAudio.volume = 0.2;

    //* Changes the unmute button to a mute button
    muteControl.value = 'Music Mute 🔇';
    muteControl.onclick = mute;
}

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

    //! Since google chrome is against autoplay when creating the audio, the audio is set to play here because it guarentees user interaction on the webpage and will coninue to play unless the user completly refreshes the page.
    pAudio.play();
    
    //* There are two ways to pull up a pokemon 1. By searching for a specific pokemon (function getPokeResults()). 2. The other by randomly picking on by the pokemon ID number (function getRandomPokemon())
    //! pokeNum refers to the function getRandomPokemon and is used later to help display the proper pokemon abilities and not return an error. pokeNum is assigned value "null" so that the function (nameAbilities) is triggered and the proper fetch is used.
    pokeNum = null;
    
    
    pokeName = lowCaseSearch(name)
    // console.log("this button works")
    //* searchContainer is set to have no value here so that if the .catch is triggered then the text it displays will be wiped once another search has happened
    searchContainer.textContent = ""

    //* Checks to see if the CSS in the titleSearch Div or the searchContainer already has a class value assigned to it. If so then it will remove it before it gets assigned a new class later in the code.
    if (pokeType1 !== "") {
        searchDiv.classList.remove(pokeType1)
        titleDiv.classList.remove(pokeType1)        
    } else {}

    //* gets the information of the pokemon that was searched for by user
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        .then(res => res.json())
        .then(data => {
            
            //* Assigns values to the pokeType varables initialized at the start. 
            if (data.types.length === 2) {
                pokeType1 = data.types[0].type.name
                pokeType2 = data.types[1].type.name
                pType2 = "- " + pokeType2.charAt(0).toUpperCase() + pokeType2.slice(1) //! This variable was created for formating purposes when displaying in the HTML so it will read: type1 "- type2"
                cssType2 = pokeType2 + "T" //! Variable used to change CSS depending on of the pokemon has a second type assigned to it
            } else { //* Adds a varable if pokeon only has one type value and clears the 2nd type value so no errors occur when pulling up pokemon wiht only one type value
                pokeType1 = data.types[0].type.name
                pokeType2 = "";
                pType2 = "";
                cssType2 = "";
            }
            
            //* Triggers function (makePokeDiv) and gives the function information on what image to display, the name, and the div where it will be populated at in the HTML page.
            makePokeDiv(data.sprites.other["official-artwork"].front_default, data.name, data.id, data.base_experience, data.height, data.weight, pokeType1, searchDiv)

        }).catch((err) => { //* If the API cannot locate the pokemon the user searched for it will add text to the HTML to let the user know that the information that was typed did not return any results. 
            console.log("Pokémon not found", err);
            searchContainer.textContent = "Sorry I can't find that Pokémon!"
        });
    
    //* clears what the user inputed into the search bar
    searchInput.value = ""
}
//* Function triggered when user clicks the Random pokemon button
const getRandomPokemon = () => {

    //* Generates a random number and will search the API using the number generated between 1-905
    pokeNum = Math.floor(Math.random() * 905) + 1
    
    //* There are two ways to pull up a pokemon 1. By searching for a specific pokemon (function getPokeResults()). 2. The other by randomly picking on by the pokemon ID number (function getRandomPokemon())
    //! pokeName refers to the function getPokeResults and is used later to help display the proper pokemon abilities and not return an error. pokeName is assigned value "null" so that the function (numAbilities) is triggered and the proper fetch is used.
    pokeName = null;
    
    //! Since google chrome is against autoplay when creating the audio, the audio is set to play here because it guarentees user interaction on the webpage and will coninue to play unless the user completly refreshes the page.
    pAudio.play();
    
    //* searchContainer is set to have no value here so that if the .catch is triggered then the text it displays will be wiped once this button is pressed 
    searchContainer.textContent = ""
    
    //* Checks to see if the CSS in the titleSearch Div or the searchContainer already has a class value assigned to it. If so then it will remove it before it gets assigned a new class later in the code.
    if (pokeType1 !== "") {
        searchDiv.classList.remove(pokeType1)
        titleDiv.classList.remove(pokeType1)  
    } else { }
    
    //* Gets the pokemon with the random number that was generated by searching with the pokemon ID in the API
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`)
        .then(res => res.json())
        .then(data => {                      

            //* Assigns values to the pokeType varables initialized at the start. 
            if (data.types.length === 2) {
                pokeType1 = data.types[0].type.name
                pokeType2 = data.types[1].type.name
                pType2 = "- " + pokeType2.charAt(0).toUpperCase() + pokeType2.slice(1)//! This variable was created for formating purposes when displaying in the HTML so it will read: type1 "- type2"
                cssType2 = pokeType2 + "T" //! Variable used to change CSS depending on of the pokemon has a second type assigned to it
            } else { //* Adds a varable if pokeon only has one type value and clears the 2nd type value so no errors occur when pulling up pokemon wiht only one type value
                pokeType1 = data.types[0].type.name
                pokeType2 = "";
                pType2 = "";
                cssType2 = "";
            }
            
            //* Triggers function (makePokeDiv) and gives the function information on what image to display, the name, and the div where it will be populated at in the HTML page
            makePokeDiv(data.sprites.other["official-artwork"].front_default, data.name, data.id, data.base_experience, data.height, data.weight, pokeType1, searchDiv)

        }).catch((err) => {//! This function should not trigger an error but the catch is still here just in case
            console.log("Pokémon not found", err);
            searchContainer.textContent = "Sorry I can't find that Pokémon!"
        });
}
const makePokeDiv = (image, name, id, exp, height, weight, type1, divForInfo) => {

    //! Can either use the "if else" or the "ternary" below, both should work. Comment out take out the on not is use.

    //* This "if else" statement will wipe the previously generated pokemon if there is information in the pokeDiv and generate new information if provided the proper input. 
    if (searchDiv.firstElementChild != null) {   
        searchDiv.removeChild(pokeDiv)
    } else {null}
    
    //* "Ternary" that does the same thing as the if else above. Commented it out for testing purposes.
    // searchDiv.firstElementChild != null
    // // if true
    // ? searchDiv.removeChild(pokeDiv)
    // // if false
    // : null
    
    
    //* Initializing and assigning  new variables with their values
    pokeDiv = document.createElement('div')
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

    //* "if else" was added so that if there is no image for the pokemon then it will have text appear on the web page. And if not it will add the image.
    if (image === null) {
        pokeNoPic.textContent = "No image available for this Pokémon"
    } else {pokePic.src = image}

    //* Gives the created variables their information to display from the API    
    pokeName.textContent = name.charAt(0).toUpperCase() + name.slice(1); //! capitalizes the first letter in pokemon name
    pokeID.textContent = `Pokémon ID: ${id}`;
    pokeEXP.textContent = `EXP: ${exp}`;
    pokeHeight.textContent = `Height: ${height}`;
    pokeWeight.textContent = `Weight: ${weight}`;
    pokeTypes.textContent = `Type: ${type1.charAt(0).toUpperCase() + type1.slice(1)} ${pType2}`;
    pokeAbility.setAttribute("id", "pokeAbilityBtn")//! assigns id to the new button
    pokeAbility.onClick = viewAbilities //! creates a function to be triggeres when button is clicked
    pokeDiv.setAttribute("id", "pokeInfo")
    imgNameDiv.setAttribute("id", "pokePicName")
    abilityButtonDiv.setAttribute("id", "abilityBtn")
    divForInfo.classList.add(pokeType1)
    titleDiv.classList.add(pokeType1)
    pokeAbility.classList.add("button")

    //* Will give the corresponding divs a class to alter the CSS if "cssType2" has a value assigned to it
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
//* Creates the divs so that the abilities have a place to go
const createAbilityDiv = () => {    
    abilityDiv = document.createElement('div')
    searchDiv.appendChild(abilityDiv)
    abilityDiv.setAttribute("id", "pokeAbility")    
}
//* Hides abilities when the hide ability is pressed
const hideAbilities = () => {
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

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`)
    .then(res => res.json())
    .then(data => {
        numOfAbilities = data.abilities.length;        
        
        for (i = 0; i < numOfAbilities; i++){
            makePokeAbilityDiv(data.abilities[i].ability.name, abilityDiv)
        }
        
    }).catch((err) => {
        // searchContainer.textContent = "Sorry I can't do that!"
        console.log(err);
    });
}
//* function to display the abilities of pokemon that was searched by user
const nameAbilities = () => {

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    .then(res => res.json())
        .then(data => {
        
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
//* Adds the elements to be desplayed in the div for abilities
const makePokeAbilityDiv = (abilityName, divForInfo) => {
    pokeAbilityName = document.createElement('p')
    
    pokeAbilityName.textContent = abilityName.charAt(0).toUpperCase() + abilityName.slice(1);
    divForInfo.appendChild(pokeAbilityName)
    pokeAbility.innerHTML = 'Hide Abilities';
    pokeAbility.onclick = hideAbilities;

    if (cssType2 !== "") {
        abilityDiv.classList.add(cssType2)
    } else {}

}