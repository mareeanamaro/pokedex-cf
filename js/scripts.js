
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
  let pokemonList = [
    new Pokemon('Marill', 70, 0.4, ['water', 'fairy']),
    new Pokemon('Beedrill', 65, 1.1, ['bug', 'poison']),
    new Pokemon('Squirtle', 44, 2, ['water', 'poison']),
    new Pokemon('Psyduck', 50, 0.8, ['water', 'fairy']),
  ];

  //first i will create the functions separately to make sure code is tidy

  function add(pokemon){
    if (typeof pokemon === 'object')  {
      pokemonList.push(pokemon);
    }
    else {
      console.log('This pokémon is not an object');
    }
  }

  function getAll() {
    return pokemonList;
  }

  //next i will create the return object and assign the keys as public functions

  return {
    add: add,
    getAll: getAll
  };

})();

// I have replaced the for loop with a forEach loop and updated the loop with the new pokemonRepository IIFE

pokemonRepository.getAll().forEach(function(pokemon) {
  if (pokemon.height > 1.5){
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') -- what a big pokémon!');
  } else {
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')');
  }
});
