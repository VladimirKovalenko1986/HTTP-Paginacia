const ENDPOINT = 'https://newsapi.org/v2/everything';
const API_KEY = 'd8847f02a17a4f339957c5e8d851cb8e';

//* Пишемо через клас
export default class NewsApi {
  constructor() {
    this.queryPage = 1;
    this.searchQuery = '';
  }

  getNews() {
    const url = `${ENDPOINT}?q=${this.searchQuery}&pageSize=5&page=${this.queryPage}`;
    const options = {
      headers: {
        'X-Api-Key': API_KEY,
      },
    };

    return fetch(url, options)
      .then(respons => respons.json())
      .then(data => {
        this.incrementPage();
        return data;
      });
  }

  resetPage() {
    this.queryPage = 1;
  }

  incrementPage() {
    this.queryPage += 1;
  }
}

// export default { getNews };
