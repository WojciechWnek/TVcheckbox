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
            const btn = e.target.closest(".btn--bookmark");
            if (!btn) return;

            const bookmarkStatus = btn.dataset.bookmark;

            handler(bookmarkStatus);
        });
    }

    _generateMarkup() {
        console.log(this);
        if (this._data.media_type === "movie") {
            return `
        <img class="content__poster" src="${API_IMAGE_PATH}${
                this._data.poster_path
            }" alt="${this._data.title}">

        <div class="content__note">
            <h1 class="content__title">${
                this._data.title ? this._data.title : ""
            }
            <span class="content__runtime">
                ${this._showTime()}
            </span>
            </h1>
            
            
            <p class="content__status">${
                this._data.status ? this._data.status : ""
            } ${this._data.release_date ? this._data.release_date : ""}</p>
        </div>

        <div class="content__bookmarks">

            <button class="btn btn--bookmark" data-bookmark="toWatch">
                <img class="icon" src="assets/img/${
                    this._data.bookmarked === "toWatch"
                        ? this._data.bookmarked + "--marked"
                        : "toWatch"
                }.svg" alt="bookmark">
            </button>
            <button class="btn btn--bookmark" data-bookmark="watching">
            <img class="icon" src="assets/img/${
                this._data.bookmarked === "watching"
                    ? this._data.bookmarked + "--marked"
                    : "watching"
            }.svg" alt="bookmark">
            </button>
            <button class="btn btn--bookmark" data-bookmark="watched">
            <img class="icon" src="assets/img/${
                this._data.bookmarked === "watched"
                    ? this._data.bookmarked + "--marked"
                    : "watched"
            }.svg" alt="bookmark">
            </button>
        </div>
            
        <p class="content__overview">
            ${this._data.overview ? this._data.overview : "No info"}
        </p>
        <ul class="content__genres">
            ${this._showGenres()}
        </ul>
        `;
        }

        if (this._data.media_type === "tv") {
            return `
        <img class="content__poster" src="${API_IMAGE_PATH}${
                this._data.poster_path
            }" alt="${this._data.name}">

        <div class="content__note">
            <h1 class="content__title">${
                this._data.name
                    ? this._data.name
                    : this._data.original_name
                    ? this._data.original_name
                    : ""
            }
            </h1>
            <p class="content__status">${
                this._data.in_production === true ? "Ongoing" : "Ended"
            }</p>
            <p class="content__lastAir">${
                this._data.last_air_date
                    ? "Last air date: " + this._data.last_air_date
                    : ""
            }</p>

        </div>

        <div class="content__bookmarks">

            <button class="btn btn--bookmark" data-bookmark="toWatch">
                <img class="icon" src="assets/img/${
                    this._data.bookmarked === "toWatch"
                        ? this._data.bookmarked + "--marked"
                        : "toWatch"
                }.svg" alt="bookmark">
            </button>
            <button class="btn btn--bookmark" data-bookmark="watching">
            <img class="icon" src="assets/img/${
                this._data.bookmarked === "watching"
                    ? this._data.bookmarked + "--marked"
                    : "watching"
            }.svg" alt="bookmark">
            </button>
            <button class="btn btn--bookmark" data-bookmark="watched">
            <img class="icon" src="assets/img/${
                this._data.bookmarked === "watched"
                    ? this._data.bookmarked + "--marked"
                    : "watched"
            }.svg" alt="bookmark">
            </button>
        </div>
            
        <p class="content__overview">
            ${this._data.overview ? this._data.overview : "No info"}
        </p>
        <ul class="content__genres">
            ${this._showGenres()}
        </ul>

        <div class="content__seasons seasons">
            <h1 class="seasons__heading">Seasons</h1>
            <ul class="seasons__list">
                ${this._showSeasons()}
            </ul>
        </div>
        `;
        }
        if (this._data.media_type === "person") {
            console.log("person");
        }
    }

    _showGenres() {
        let genres = "";
        this._data.genres.forEach((genre) => {
            genres += `
            <li class="content__genres__item">
                ${genre.name ? genre.name : ""}
            </li>
            `;
        });

        return genres;
    }

    _showSeasons() {
        let seasons = "";
        this._data.seasons.forEach((season) => {
            seasons += `
            <li class="seasons__list__item season">
                <img class="season__poster icon" src="${API_IMAGE_PATH}${
                season.poster_path
            }" alt="${season.name}">
                <div class="season__note">
                    <h1 class="season__title">${season.name}</h1>
                    <span class="season__airDate">${
                        season.air_date
                            ? "First air date: " + season.air_date
                            : ""
                    }</span>
                    <span class="season__episodes">${
                        season.episode_count
                            ? "Number of episodes: " + season.episode_count
                            : ""
                    }</span>
                </div>
                <p class="season__overview">${
                    season.overview ? season.overview : ""
                }</p>
            </li>
            `;
        });

        return seasons;
    }

    _showTime() {
        const time = this._data.runtime;
        return `
        <span content__runtime>
        ${Math.floor(time / 60) % 24 === 0 ? "" : Math.floor(time / 60) % 24}
        ${Math.floor(time / 60) % 24 === 0 ? "" : "h"}
        ${Math.floor(time) % 60 === 0 ? "" : Math.floor(time) % 60}
        ${Math.floor(time) % 60 === 0 ? "" : "m"}
        </span>
        `;
    }
}

export default new ShowContentView();
