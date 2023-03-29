import pokemonCardTpl from '../templates/pokemon-card.hbs';

const refs = {
  cardConteiner: document.querySelector('.js-card-conteiner'),
};

fetchPokemonByIdName(6)
  .then(renderPokemonCard)
  .catch(error => console.log(error));

function fetchPokemonByIdName(pokemonId) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(
    response => {
      return response.json();
    }
  );
}

function renderPokemonCard(pokemon) {
  const markup = pokemonCardTpl(pokemon);
  refs.cardConteiner.innerHTML = markup;
}
