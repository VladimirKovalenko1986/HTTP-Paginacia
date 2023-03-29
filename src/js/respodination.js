import NewsApiService from './news-service';
import ariclesTpl from '../templates/articles.hbs';
import LoadMoreBtn from './load-more-btn';

const refs = {
  searchForm: document.querySelector('.search-form'),
  articleContainer: document.querySelector('.js-articles-conteiner'),
  //   loadeMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
  e.preventDefault();

  clearArticlesConteiner();

  newsApiService.query = e.currentTarget.elements.query.value;

  // Делаем проверку на пустую графу заполнения
  if (newsApiService.query === '') {
    return alert('Введите данные в графу!!!!');
  }
  loadMoreBtn.show();

  newsApiService.resetPage();

  fetchArticles();
}

function fetchArticles() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(articles) {
  refs.articleContainer.insertAdjacentHTML('beforeend', ariclesTpl(articles));
}

function clearArticlesConteiner() {
  refs.articleContainer.innerHTML = '';
}
