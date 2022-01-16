import { API_IMAGE_PATH, UNIX_EPOCH } from "./config.js";
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
        if (this._data.media_type === "movie") {
            return `
        <img class="content__poster" src="${
            this._data.poster_path
                ? API_IMAGE_PATH + this._data.poster_path
                : "assets/img/blank_poster.svg"
        }" alt="${
                this._data.title
                    ? "Poster of " + this._data.title
                    : "Movie poster"
            }">

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
            ${this._showBookmarksButtons()}
        </div>
            
        <div class="content__overview">
            ${
                this._data.overview
                    ? this._showOverview(this._data.overview)
                    : "No info about this movie"
            }
        </div>
        <ul class="content__genres">
            ${this._showGenres()}
        </ul>
        `;
        }

        if (this._data.media_type === "tv") {
            return `
            <img class="content__poster" src="${
                this._data.poster_path
                    ? API_IMAGE_PATH + this._data.poster_path
                    : "assets/img/blank_poster.svg"
            }" alt="${
                this._data.name
                    ? "Poster of " + this._data.name
                    : "Series poster"
            }">

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
                    this._data.status ? "Status: " + this._data.status : ""
                }</p>
                <p class="content__lastAir">${
                    this._data.last_air_date
                        ? "Last air date: " + this._data.last_air_date
                        : ""
                }</p>

            </div>

            <div class="content__bookmarks">
                ${this._showBookmarksButtons()}
            </div>
                
            <div class="content__overview">
                ${
                    this._data.overview
                        ? this._showOverview(this._data.overview)
                        : "No info about this series"
                }
            </div>
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
            return `
            <img class="content__poster" src="${
                this._data.profile_path
                    ? API_IMAGE_PATH + this._data.profile_path
                    : "assets/img/blank_profile.svg"
            }" alt="${
                this._data.name
                    ? "Poster of " + this._data.name
                    : "Profile picture"
            }">

            <div class="content__note">
                <h1 class="content__title">${
                    this._data.name ? this._data.name : ""
                }
                </h1>
                <p class="content__status">${
                    this._data.birthday ? "Born: " + this._data.birthday : ""
                }</p>
                <p class="content__status">${
                    this._data.deathday ? "Died: " + this._data.deathday : ""
                }</p>
            </div>
                
            <div class="content__overview">
                ${
                    this._data.biography
                        ? this._showOverview(this._data.biography)
                        : "No info about this person"
                }
            </div>
            <div class="content__personalInfo">
                <h1 class="title">Personal info</h1>
                <p class="info">Known for<br><span class="value">${
                    this._data.known_for_department
                        ? this._data.known_for_department
                        : ""
                }</span></p>
                <p class="info">Gender<br><span class="value">${
                    this._data.gender
                        ? this._data.gender === 1
                            ? "Female"
                            : "Male"
                        : "No data"
                }</span></p>
                <p class="info">Place of birth<br><span class="value">${
                    this._data.place_of_birth
                        ? this._data.place_of_birth
                        : "No data"
                }</span></p>
                <p class="info">Age<br><span class="value">${
                    this._data.birthday
                        ? this._showAge() + " yeras old"
                        : "No data"
                }</span></p>
            </div>
        `;
        }
    }

    _showBookmarksButtons() {
        return `
        <button class="btn btn--bookmark tooltip" data-bookmark="toWatch">
            <img class="icon" src="assets/img/${
                this._data.bookmarked === "toWatch"
                    ? this._data.bookmarked + "--marked"
                    : "toWatch"
            }.svg" alt="bookmark">
            <span class="tooltiptext tooltiptext--bookmarks">
                Bookmark show as <b>to watch</b>
            </span>
        </button>
        <button class="btn btn--bookmark tooltip" data-bookmark="watching">
            <img class="icon" src="assets/img/${
                this._data.bookmarked === "watching"
                    ? this._data.bookmarked + "--marked"
                    : "watching"
            }.svg" alt="bookmark">
            <span class="tooltiptext tooltiptext--bookmarks">
                Bookmark show as still <b>watching</b>
            </span>
        </button>
        <button class="btn btn--bookmark tooltip" data-bookmark="watched">
            <img class="icon" src="assets/img/${
                this._data.bookmarked === "watched"
                    ? this._data.bookmarked + "--marked"
                    : "watched"
            }.svg" alt="bookmark">
            <span class="tooltiptext tooltiptext--bookmarks">
                Bookmark show as <b>watched</b>
            </span>
        </button>
        `;
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
                <img class="season__poster icon" src="${
                    season.poster_path
                        ? API_IMAGE_PATH + season.poster_path
                        : "assets/img/blank_poster.svg"
                }" alt="${
                season.name ? "Poster of " + season.name : "Season poster"
            }">
                <div class="season__note">
                    <h1 class="season__title">${
                        season.name ? season.name : ""
                    }</h1>
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

    _showAge() {
        const birthday = new Date(this._data.birthday);
        let aliveUntil;
        if (this._data.deathday) {
            aliveUntil = new Date(this._data.deathday).getTime();
            console.log("here");
        } else {
            aliveUntil = Date.now();
        }

        const differenceInMs = aliveUntil - birthday.getTime();
        const ageInMs = new Date(differenceInMs);
        const age = Math.abs(ageInMs.getUTCFullYear() - UNIX_EPOCH);

        return age;
    }

    _showOverview(overview) {
        const paragraph = overview.split("\n");
        let description = "";
        paragraph.forEach((paragraph) => {
            description += `
                <p class="paragraph">${paragraph}</p>
                `;
        });
        return description;
    }
}

export default new ShowContentView();
