
// I am wrapping the function in a IIFE
let pokemonRepository = (function () {
  // the constructor function below allows you to simplify adding new objects to the array
  function Pokemon(name, HP, height, types) {
    this.name = name;
    this.HP = HP;
    this.height = height;
    this.types = types;
  }
  //the pokémon array is below
  let pokemonArray = [
    new Pokemon('Marill', 70, 0.4, ['water', 'fairy']),
    new Pokemon('Beedrill', 65, 1.1, ['bug', 'poison']),
    new Pokemon('Squirtle', 44, 2, ['water', 'poison']),
    new Pokemon('Psyduck', 50, 0.8, ['water', 'fairy']),
  ];

  //first i will create the functions separately to make sure code is tidy

  // create a function to add pokemon to the array
  function add(pokemon){
    // the add function should only work if we are trying to add an object
    if (pokemon && typeof pokemon === 'object')  {
      pokemonArray.push(pokemon);
    }
    else {
      console.log('This pokémon is not an object');
    }
  }

  //create a function to show the pokemons in a list of buttons
  function addListItem(pokemon) {

    // create a new variable that selects the pokemon list node
    let pokemonList = document.querySelector('.pokemon-list');

    // create list items and corresponding buttons
    let listItem = document.createElement('li');
    let pokemonButton = document.createElement('button');

    // make the button display the name of the pokemon
    pokemonButton.innerText = pokemon.name;

    // add css to the buttons
    pokemonButton.classList.add('list-button');

    // append the buttons to the list items and the list items to the list itself
    listItem.appendChild(pokemonButton);
    pokemonList.appendChild(listItem);

    //add an event listener to the addListItem function
    pokemonButton.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }
  // create a function to show the details of each pokemon
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  // create a function that returns the array
  function getAll() {
    return pokemonArray;
  }

  //next i will create the return object and assign the keys as public functions

  return {
    add: add,
    addListItem: addListItem,
    getAll: getAll
  };

})();

// the forEach loop below is returning the repository by calling getAll and making it appear as a list of buttons by calling addListItem

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
