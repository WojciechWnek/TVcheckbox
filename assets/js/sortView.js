import { API_IMAGE_PATH } from "./config.js";
import View from "./View.js";

class SortView extends View {
    _parentElement = document.querySelector(".results__sort");

    addHandlerSort(handler) {
        this._parentElement.addEventListener("click", function (e) {
            const btn = e.target.closest(".btn--sort");
            if (!btn) return;

            const sortBy = btn.dataset.sort;

            handler(sortBy);
        });
    }

    _generateMarkup() {
        return `
            <li>
                <button class="btn btn--sort" data-sort="alphaAsc">
                    <img class="icon"
                    src="assets/img/sort/${
                        this._data.sorted === "alphaAsc"
                            ? this._data.sorted + "--marked"
                            : "alphaAsc"
                    }.svg"
                    alt="Sort alphabetically ascending"
                    />
                </button>
            </li>
            <li>
                <button class="btn btn--sort" data-sort="alphaDesc">
                    <img class="icon"
                    src="assets/img/sort/${
                        this._data.sorted === "alphaDesc"
                            ? this._data.sorted + "--marked"
                            : "alphaDesc"
                    }.svg"
                    alt="Sort alphabetically descending"
                    />
                </button>
            </li>

            <li>
                <button class="btn btn--sort" data-sort="popularityDesc">
                    <img class="icon"
                    src="assets/img/sort/${
                        this._data.sorted === "popularityDesc"
                            ? this._data.sorted + "--marked"
                            : "popularityDesc"
                    }.svg"
                    alt="Sort by popularity descending"
                    />
                </button>
            </li>
            <li>
                <button class="btn btn--sort" data-sort="popularityAsc">
                    <img class="icon"
                    src="assets/img/sort/${
                        this._data.sorted === "popularityAsc"
                            ? this._data.sorted + "--marked"
                            : "popularityAsc"
                    }.svg"
                    alt="Sort by popularity ascending"
                    />
                </button>
            </li>

            <li>
                <button class="btn btn--sort" data-sort="scoreDesc">
                    <img class="icon"
                    src="assets/img/sort/${
                        this._data.sorted === "scoreDesc"
                            ? this._data.sorted + "--marked"
                            : "scoreDesc"
                    }.svg"
                    alt="Sort by score descending"
                    />
                </button>
            </li>
            <li>
                <button class="btn btn--sort" data-sort="scoreAsc">
                    <img class="icon"
                    src="assets/img/sort/${
                        this._data.sorted === "scoreAsc"
                            ? this._data.sorted + "--marked"
                            : "scoreAsc"
                    }.svg"
                    alt="Sort by score ascending"
                    />
                </button>
            </li>
            
        `;
    }
}

export default new SortView();
