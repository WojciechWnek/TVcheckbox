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
                <button class="btn--sort" data-sort="alphaAsc">
                    <img
                    src="assets/img/sort/alphaAsc.svg"
                    alt="Sort alphabetically ascending"
                    />
                </button>
            </li>
            <li>
                <button class="btn--sort" data-sort="alphaDesc">
                    <img
                    src="assets/img/sort/alphaDesc.svg"
                    alt="Sort alphabetically descending"
                    />
                </button>
            </li>

            <li>
                <button class="btn--sort" data-sort="popularityDesc">
                    <img
                    src="assets/img/sort/popularityDesc.svg"
                    alt="Sort by popularity descending"
                    />
                </button>
            </li>
            <li>
                <button class="btn--sort" data-sort="popularityAsc">
                    <img
                    src="assets/img/sort/popularityAsc.svg"
                    alt="Sort by popularity ascending"
                    />
                </button>
            </li>

            <li>
                <button class="btn--sort" data-sort="scoreDesc">
                    <img
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
                <button class="btn--sort" data-sort="scoreAsc">
                    <img
                    src="assets/img/sort/scoreAsc.svg"
                    alt="Sort by score ascending"
                    />
                </button>
            </li>
            
        `;
    }

    // scoreDesc(arr, byCriteria) {
    //     return arr.sort(
    //         (showOne, showTwo) => showTwo[byCriteria] - showOne[byCriteria]
    //     );
    // }

    // scoreAsc(arr, byCriteria) {
    //     return arr.sort(
    //         (showOne, showTwo) => showOne[byCriteria] - showTwo[byCriteria]
    //     );
    // }

    // popularityAsc(arr, byCriteria) {
    //     return arr.sort(
    //         (showOne, showTwo) => showOne[byCriteria] - showTwo[byCriteria]
    //     );
    // }

    // popularityDesc(arr, byCriteria) {
    //     return arr.sort(
    //         (showOne, showTwo) => showTwo[byCriteria] - showOne[byCriteria]
    //     );
    // }
}

export default new SortView();
