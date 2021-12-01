import { API_IMAGE_PATH } from "./config.js";
import View from "./View.js";

class ShowContentView extends View {
    _parentElement = document.querySelector(".content");

    _generateMarkup() {
        return `
        <img class="content__poster" src="${API_IMAGE_PATH}${this._data.image}" alt="${this._data.title}">

        <h1 class="content__title">${this._data.title}</h1>
        <p class="content__overview">
            ${this._data.overview}
        </p>
        `;
    }

    addHandlerRender(handler) {
        ["hashchange", "load"].forEach((event) =>
            window.addEventListener(event, handler)
        );
    }
}

export default new ShowContentView();
