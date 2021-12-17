function Pokemon(name, HP, height, types) {
  this.name = name;
  this.HP = HP;
  this.height = height;
  this.types = types;
}

let pokemonList = [
  new Pokemon('Marill', 70, 0.4, ['water', 'fairy']),
  new Pokemon('Beedrill', 65, 1.1, ['bug', 'poison']),
  new Pokemon('Squirtle', 44, 2, ['water', 'poison']),
  new Pokemon('Psyduck', 50, 0.8, ['water', 'fairy']),
];

// I have replaced the for loop with a forEach loop to print the pokémon list

pokemonList.forEach(function(pokemon) {
  if (pokemon.height > 1.5){
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') -- what a big pokémon!');
  } else {
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')');
  }
});
