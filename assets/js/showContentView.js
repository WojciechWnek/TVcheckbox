import { API_IMAGE_PATH } from "./config.js";
import View from "./View.js";

class ShowContentView extends View {
    _parentElement = document.querySelector(".content");

    addHandlerRender(handler) {
        //hashchange neds to be changed to click like in paginationView
        ["hashchange", "load"].forEach((event) =>
            window.addEventListener(event, handler)
        );
    }

    addHandlerAddBookmark(handler) {
        this._parentElement.addEventListener("click", function (e) {
            const btn = e.target.closest(".btn--bookmark");
            if (!btn) return;

            const bookmarkStatus = btn.dataset.bookmark;
            // console.log(bookmarkStatus);

            handler(bookmarkStatus);
        });
    }

    _generateMarkup() {
        return `
        <img class="content__poster" src="${API_IMAGE_PATH}${
            this._data.image
        }" alt="${this._data.title}">

        <h1 class="content__title">${this._data.title}</h1>

        <div class="content__bookmarks">

            <button class="btn--bookmark" data-bookmark="toWatch">
                <img src=assets/img/${
                    this._data.bookmarked === "toWatch"
                        ? "pending--marked.svg"
                        : "pending.svg"
                } alt="bookmark">
            </button>
            <button class="btn--bookmark" data-bookmark="watching">
                <img src=assets/img/${
                    this._data.bookmarked === "watching"
                        ? "in_progress--marked.svg"
                        : "in_progress.svg"
                } alt="bookmark">
            </button>
            <button class="btn--bookmark" data-bookmark="watched">
                <img src=assets/img/${
                    this._data.bookmarked === "watched"
                        ? "check--marked.svg"
                        : "check.svg"
                } alt="bookmark">
            </button>
        </div>
            
        <p class="content__overview">
            ${this._data.overview}
        </p>
        `;
    }
}

export default new ShowContentView();
