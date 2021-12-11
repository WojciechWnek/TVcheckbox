import { API_IMAGE_PATH } from "./config.js";
import View from "./View.js";

class ResultsView extends View {
    _parentElement = document.querySelector(".results__list");
    _errorMessage = "No show found for your query! <br> Please try again.";
    _messagr = "";

    _generateMarkup() {
        // console.log(this._data);
        return this._data.map(this._generateMarkupPreview).join("");
    }

    _generateMarkupPreview(res) {
        const id = +window.location.hash.slice(1);

        return `
        <li class="preview ${res.id === id ? "preview--selected" : ""}">
            <a class="preview__link" href="#${res.id}">
                <figure class="preview__fig">
                    <img
                        class="preview__icon"
                        src="${
                            res.image
                                ? API_IMAGE_PATH + res.image
                                : res.mediaType === "person"
                                ? "assets/img/blank_profile.svg"
                                : "assets/img/blank_poster.svg"
                        }"
                        alt="${res.title}"
                    />
                </figure>
                <div class="preview__data">
                    <h4 class="title">${res.title}</h4>
                    <p class="release">${res.date}</p>
                </div>
                <div class="preview__score">
                    <p class="paragraf">score</p>
                    <p class="score">${res.score}</p>
                    <div class="star">
                    <img
                        class="star"
                        src="assets/img/star.svg"
                        alt="Star"
                    />
                    </div>
                </div>
            </a>
            <div>
                <img
                    class="preview__state"
                    src="assets/img/empty.svg"
                    alt="Star"
                />
            </div>
        </li>
        `;
    }
}

export default new ResultsView();
