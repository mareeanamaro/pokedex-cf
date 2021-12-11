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

for (let i=0; i < pokemonList.length; i++){
  if (pokemonList[i].height > 1.5){
    document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') -- what a big pokémon!');
  } else {
    document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
  }
}
