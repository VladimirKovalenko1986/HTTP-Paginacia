import pokemonCardTpl from '../templates/pokemon-card.hbs';
import API from './api-service';
import getRefs from './get-refs';

const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  // Проверяем значение инпута во вреся отправки формы
  const form = e.currentTarget;
  const searchQuery = form.elements.query.value;

  API.fetchPokemonByIdName(searchQuery)
    .then(renderPokemonCard)
    .catch(onFatchError)
    //Делаем так чтобы посли нажатия поиска очищаем форму
    .finally(() => form.reset());
}

function renderPokemonCard(pokemon) {
  const markup = pokemonCardTpl(pokemon);
  refs.cardConteiner.innerHTML = markup;
}

function onFatchError(error) {
  alert('что-то пошло не так!!!!');
}
