import { API_IMAGE_PATH } from "./config.js";
import View from "./View.js";

class SortView extends View {
    _parentElement = document.querySelector(".results__sort");
    _searchViev = document.querySelector(".search");

    // addHandlerRender(handler) {
    //     ["hashchange", "submit"].forEach((event) =>
    //         window.addEventListener(event, handler)
    //     );
    // }
    addHandlerRender(handler) {
        this._searchViev.addEventListener("submit", function (e) {
            e.preventDefault();
            handler();
        });
    }

    // addHandlerSort(handler) {
    //     this._parentElement.addEventListener("click", function (e) {
    //         const btn = e.target.closest(".btn--sort");
    //         if (!btn) return;

    //         const sortBy = btn.dataset.sort;
    //         console.log("btn sort: ", sortBy);

    //         handler(sortBy);
    //     });
    // }

    _generateMarkup() {
        return `
            <li>
                <button class="btn--sort" data-sort="alpha_asc">
                    <img
                    src="assets/img/sort/alpha_asc.svg"
                    alt="Sort alphabetically ascending"
                    />
                </button>
            </li>
            <li>
                <button class="btn--sort" data-sort="alpha_desc">
                    <img
                    src="assets/img/sort/alpha_desc.svg"
                    alt="Sort alphabetically descending"
                    />
                </button>
            </li>
        `;
    }
}

export default new SortView();
