import { API_IMAGE_PATH } from "./config.js";
import View from "./View.js";

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");

    addHandlerClick(handler) {
        this._parentElement.addEventListener("click", function (e) {
            const btn = e.target.closest(".pagination__btn");
            if (!btn) return;

            const goToPage = +btn.dataset.goto;

            handler(goToPage);
        });
    }

    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(
            this._data.results.length / this._data.resultsPerPage
        );

        if (curPage === 1 && numPages > 1) {
            return `
            <span class="pagination--cur">${curPage}</span>
            <button data-goto="${
                curPage + 1
            }" class="btn pagination__btn pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <span>&#10095</span>
            </button>
        `;
        }

        if (curPage === numPages && numPages > 1) {
            return `
                <button data-goto="${
                    curPage - 1
                }" class="btn pagination__btn pagination__btn--prev">
                    <span>&#10094 </span>
                    <span>Page ${curPage - 1}</span>
                </button>
                <span class="pagination--cur">${curPage}</span>
            `;
        }

        if (curPage < numPages) {
            return `
                <button data-goto="${
                    curPage - 1
                }" class="btn pagination__btn pagination__btn--prev">
                    <span>&#10094 </span>
                    <span>Page ${curPage - 1}</span>
                </button>
                <span class="pagination--cur">${curPage}</span>
                <button data-goto="${
                    curPage + 1
                }" class="btn pagination__btn pagination__btn--next">
                    <span>Page ${curPage + 1}</span>
                    <span>&#10095</span>
                </button>
            `;
        }

        return `
        <span class="pagination--cur">${curPage}</span>
        `;
    }
}

export default new PaginationView();
