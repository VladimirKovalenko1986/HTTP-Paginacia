import LoadMoreBtn from './components/loadMoreBtn';
import NewsApi from './NewsApi';

const form = document.getElementById('form');
const loadMoreBtn = new LoadMoreBtn({
  selector: '#loadMoreBtn',
  isHidden: true,
});
const newsApi = new NewsApi();

form.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', fetchNews);

function onSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  newsApi.searchQuery = form.elements.news.value.trim();
  clearNewsList();
  newsApi.resetPage();
  loadMoreBtn.show();

  fetchNews().finally(() => form.reset());
}

function createMurkup({ author, title, description, url, urlToImage }) {
  return `
  <div class="article-card">
  <h2 class="article-title">${title}</h2>
  <h3 class="aricle-author">${author || 'Anonym'}</h3>
  <img src=${urlToImage} class="article-img">
  <p class="article-description">${description}</p>
  <a href=${url} class="article-link" target =_blank>Read more</a>
  </div>
    `;
}

function updateNewsList(markup) {
  document
    .getElementById('articlesWrapper')
    .insertAdjacentHTML('beforeend', markup);
}

function clearNewsList() {
  document.getElementById('articlesWrapper').innerHTML = '';
}

function onError(err) {
  console.error(err);
  updateNewsList('<p>Articles not found</p>');
}

function fetchNews() {
  loadMoreBtn.disable();
  return newsApi
    .getNews()
    .then(({ articles }) => {
      if (articles.length === 0) throw new Error('No data');
      //   console.log(createMurkup(articles[0]));
      return articles.reduce(
        (markup, article) => createMurkup(article) + markup,
        ''
      );
    })
    .then(markup => {
      updateNewsList(markup);
      loadMoreBtn.enebled();
    })
    .catch(onError);
}
