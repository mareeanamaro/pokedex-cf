
// I am wrapping the function in a IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl='https://pokeapi.co/api/v2/pokemon/?limit=150';

  // create a function to add pokemon to the array
  function add(pokemon){
    // the add function should only work if we are trying to add an object
    if (pokemon && typeof pokemon === 'object')  {
      pokemonList.push(pokemon);
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

  // create a function that returns the array
  function getAll() {
    return pokemonList;
  }

  // create a funtion that loads the list
  function loadList() {
    function showLoadingMessage() {
      return 'Loading...'
    };
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    }
  )
  }

  // create a function that loads the detailed data for a given pokémon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // create a function to show the details of each pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function(){
      console.log(pokemon);
    });
  }

  //next i will create the return object and assign the keys as public functions

  return {
    add: add,
    addListItem: addListItem,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails
  };

})();


// load the data
pokemonRepository.loadList().then(function() {
  // the forEach loop below is returning the repository by calling getAll and making it appear as a list of buttons by calling addListItem
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
});
