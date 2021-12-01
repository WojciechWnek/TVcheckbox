import View from "./View.js";

class ResultsView extends View {
    _parentElement = document.querySelector(".results__list");

    _generateMarkup() {
        console.log(this._data);
        return `
        <li class="preview">
            <a class="preview__link preview__link--active" href="#808">
                <figure class="preview__fig">
                    <img 
                        class="preview__icon"
                        src="assets/img/blank_poster.svg"
                        alt="Error"
                    />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">Pasta with Tomato Cream ...</h4>
                    <p class="preview__publisher">The Pioneer Woman</p>
                    <div class="preview__user-generated">
                        <svg>
                        <use href="src/img/icons.svg#icon-user"></use>
                        </svg>
                    </div>
                </div>
            </a>
        </li>
    `;
    }
}

export default new ResultsView();
