
// I am wrapping the function in a IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl='https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector("#modal-container");

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
    pokemon.types = details.types;
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

  // now we create the function that will show us the modal
  function showModal(pokemon) {
    // clear any html in the modal
    modalContainer.innerHTML = '';
    // create a new div
    let modal = document.createElement('div');
    // add the modal class to this div
    modal.classList.add('modal');

    // now let's add the close button
    let closeButtonElement = document.createElement('button');
    // we'll add its css class
    closeButtonElement.classList.add('modal-close');
    // write the text we want in the button
    closeButtonElement.innerText = 'close';
    // tell the app what to do when someone clicks on this button
    closeButtonElement.addEventListener('click', hideModal);

    //now let's add title and text to the modal
    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = 'height: ' + pokemon.height;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

    //now let's append these elements to to the modal and modal container
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    //below we are making the modal container visible via its css class
    modalContainer.classList.add('is-visible');
  }

    // it's time to define the function called above to hide the modal
    function hideModal() {
      //all it needs to do is apply the css class that makes it invisible
      modalContainer.classList.remove('is-visible');
    }

    // let's add the event listener that lets us esc out of the modal
    window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
      }
      });


    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

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
