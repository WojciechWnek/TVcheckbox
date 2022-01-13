import { API_IMAGE_PATH } from "./config.js";
import View from "./View.js";

class ResultsView extends View {
    _parentElement = document.querySelector(".results__list");
    _errorMessage = "No show found for your query! <br> Please try again.";
    _messagr = "";

    _generateMarkup() {
        return this._data.map(this._generateMarkupPreview).join("");
    }

    _generateMarkupPreview(res) {
        const id = window.location.hash.slice(1);

        return `
        <li class="preview ${
            res.composite_id === id ? "preview--selected" : ""
        }">
            <a class="preview__link" href="#${res.media_type}/${res.id}">
                <figure class="preview__fig">
                    <img
                        class="icon"
                        src="${
                            res.poster_path
                                ? API_IMAGE_PATH + res.poster_path
                                : res.profile_path
                                ? API_IMAGE_PATH + res.profile_path
                                : res.media_type === "person"
                                ? "assets/img/blank_profile.svg"
                                : "assets/img/blank_poster.svg"
                        }"
                        alt="${res.title}"
                    />
                </figure>
                <div class="preview__data">
                    <h4 class="title" title="${
                        res.title ? res.title : res.name
                    }">${res.title ? res.title : res.name}</h4>
                    <p class="release ${
                        res.media_type === "person" ? "hide" : ""
                    }">${
            res.release_date
                ? res.release_date
                : res.first_air_date
                ? res.first_air_date
                : ""
        }</p>
                </div>
                <div class="preview__score ${
                    res.media_type === "person" ? "hide" : ""
                }">
                    <p class="paragraf">score</p>
                    <p class="score">${res.vote_average}</p>
                    <div class="star">
                    <img
                        class="icon"
                        src="assets/img/star.svg"
                        alt="Star"
                    />
                    </div>
                </div>
                <div class="preview__state">
                <img
                    class="icon"
                    src="assets/img/${
                        res.bookmarked ? res.bookmarked + "--marked" : "empty"
                    }.svg"
                    alt="Star"
                />
                </div>
                <div class="preview__type">
                    <p class="type">${res.media_type}</p>
                </div>
            </a>
        </li>
        `;
    }
}

export default new ResultsView();
