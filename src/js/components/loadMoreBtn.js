export default class LoadMoreBtn {
  constructor({ selector, isHidden = false }) {
    this.button = this.getButton(selector);

    // if (isHidden) {
    //   this.hide();
    // }
    isHidden && this.hide();
  }

  getButton(selector) {
    return document.querySelector(selector);
  }

  enebled() {
    this.button.removeAttribute('disabled');
    this.button.disebled = false;
    this.button.textContent = 'Load More';
  }

  disable() {
    this.button.disebled = true;
    this.button.textContent = 'Loading.....';
  }

  hide() {
    this.button.classList.add('hidden');
  }

  show() {
    this.button.classList.remove('hidden');
  }
}
