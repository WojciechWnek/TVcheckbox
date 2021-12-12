import { API_IMAGE_PATH } from "./config.js";
import View from "./View.js";

class ShowContentView extends View {
    _parentElement = document.querySelector(".content");

    addHandlerRender(handler) {
        ["hashchange", "load"].forEach((event) =>
            window.addEventListener(event, handler)
        );
    }

    addHandlerAddBookmark(handler) {
        this._parentElement.addEventListener("click", function (e) {
            const btn = e.target.closest(".btn--toWatch");
            if (!btn) return;
            handler();
        });
    }

    _generateMarkup() {
        return `
        <img class="content__poster" src="${API_IMAGE_PATH}${
            this._data.image
        }" alt="${this._data.title}">

        <button class="btn--toWatch">
            <img width="100px" height="100px" src=assets/img/${
                this._data.bookmarked === "toWatch"
                    ? "bookmark-solid.svg"
                    : "bookmark-regular.svg"
            } alt="bookmark">
        </button>

        <h1 class="content__title">${this._data.title}</h1>
        <p class="content__overview">
            ${this._data.overview}
        </p>
        `;
    }
}

export default new ShowContentView();
