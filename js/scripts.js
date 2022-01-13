
// I am wrapping the function in a IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl='https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modal = document.querySelector("#detailsModal");

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

    
    // create the buttons and add the attributes to connect them to the modal
    let pokemonButton = document.createElement('button');
        pokemonButton.setAttribute('data-target', '#detailsModal');
        pokemonButton.setAttribute('data-toggle', 'modal');

        //add bootstrap utility class to buttons
        pokemonButton.classList.add('btn');
        pokemonButton.classList.add('btn-outline-secondary');

        // add css to the buttons
        pokemonButton.classList.add('list-button');


    // make the button display the name of the pokemon
    pokemonButton.innerText = pokemon.name;



    // append the buttons to the list items and the list items to the list itself
    listItem.appendChild(pokemonButton);
    pokemonList.appendChild(listItem);

    //add an event listener to the addListItem function
    pokemonButton.addEventListener('click', function() {
      showDetails(pokemon, modal);
    });
  }

  // create a function that returns the array
  function getAll() {
    return pokemonList;
  }

  // create a function that loads the list
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
function loadDetails(pokemon) {
  let url = pokemon.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    pokemon.imageUrl = details.sprites.front_default;
    pokemon.height = details.height;
    pokemon.weight = details.weight;
    pokemon.abilities = details.abilities;
    pokemon.types = details.types.type;

  }).catch(function (e) {
    console.error(e);
  });
}

// create a function to show the details of each pokemon
function showDetails(pokemon) {
  pokemonRepository.loadDetails(pokemon).then(function () {
    showModal(pokemon);
  });
}

// let's add the bootstrap modal

function showModal (pokemon) {

  let modalBody = $('.modal-body');
  let modalTitle = $('.modal-title');
  let modalHeader = $('.modal-header');

 //empty the modal before we start
  modalTitle.empty();
  modalBody.empty();

  // create the elements we want in the modal
  let nameElement = $('<h1>' + pokemon.name + '</h1>');
  let imageElement = $('<img class="modal-img">');
      imageElement.attr('src', pokemon.imageUrl);
  let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
  let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');
  let typesElement = $('<p>' + 'Types: ' + pokemon.types + '</p>');
  let abilitiesElement = $('<p>' + 'Abilities: ' + pokemon.abilities + '</p>');

  // append the elements to the modal
  modalTitle.append(nameElement);
  modalBody.append(imageElement);
  modalBody.append(heightElement);
  modalBody.append(weightElement);
  modalBody.append(typesElement);
  modalBody.append(abilitiesElement);

  $('#detailsmodal').modal();

}

  //next i will create the return object and assign the keys as public functions

  return {
    add: add,
    addListItem: addListItem,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();


// load the data
pokemonRepository.loadList().then(function() {
  // the forEach loop below is returning the repository by calling getAll and making it appear as a list of buttons by calling addListItem
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
