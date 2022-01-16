import { API_IMAGE_PATH } from "./config.js";
import View from "./View.js";

class ProfileView extends View {
    _parentElement = document.querySelector(".content");
    errorMessage =
        "You haven't added anything to your profile yet. <br> First search for a show.";

    addHandlerRenderProfile(handler) {
        ["hashchange", "load"].forEach((event) =>
            window.addEventListener(event, handler)
        );
    }

    _generateMarkup() {
        return `
            <div class="profile">
                <h1 class="profile__heading">All of Your bookmarked shows are listed below</h1>
                <div class="profile__timer">
                    ${
                        this._data.watched.length >= 0
                            ? `
                                
                                <p class="profile__timer__message">Time spent watching</p>
                                <div class="profile__timer__counter">
                                    ${this._countTime()}
                                </div>
                                `
                            : ""
                    }
                </div>
                <div class="profile__shows">
                    ${
                        this._data.toWatch.length > 0
                            ? `
                                <div class="profile__shows__container">
                                    <h4>To watch</h4>
                                    <ul class="profile__shows__list">
                                        ${this._data.toWatch
                                            .map(this._getBookmarkedShows)
                                            .join("")}
                                    </ul>
                                </div>`
                            : ""
                    }
                    ${
                        this._data.watching.length > 0
                            ? `
                                <div class="profile__shows__container">
                                    <h4>Watching</h4>
                                    <ul class="profile__shows__list">
                                        ${this._data.watching
                                            .map(this._getBookmarkedShows)
                                            .join("")}
                                    </ul>
                                </div>`
                            : ""
                    }
                    ${
                        this._data.watched.length > 0
                            ? `
                                <div class="profile__shows__container">
                                    <h4>Watched</h4>
                                    <ul class="profile__shows__list">
                                        ${this._data.watched
                                            .map(this._getBookmarkedShows)
                                            .join("")}
                                    </ul>
                                </div>`
                            : ""
                    }              
                </div>
            </div>
        `;
    }

    _getBookmarkedShows(res) {
        return `  
            <li class="show tooltip">
                <a class="show__link" href="#${res.media_type}/${res.id}">
                    <img class="show__image icon" src="${
                        res.poster_path
                            ? API_IMAGE_PATH + res.poster_path
                            : "assets/img/blank_poster.svg"
                    }" alt="${
            res.title
                ? "Poster of " + res.title
                : res.name
                ? "Poster of " + res.name
                : "Show poster"
        }">
                </a>
                <span class="tooltiptext">
                    ${
                        res.title
                            ? res.title
                            : res.name
                            ? res.name
                            : "Show poster"
                    }
                </span>
            </li>
        `;
    }

    _countTime() {
        let time = 0;
        this._data.watched.forEach((show) => {
            if (show.runtime) {
                time += show.runtime;
            } else if (show.episode_run_time && show.number_of_episodes) {
                time += show.episode_run_time * show.number_of_episodes;
            } else {
                time += 0;
            }
        });
        return `
            <div class="months">
                ${Math.floor(time / 60 / 24 / 30)}
                <span>
                    ${
                        Math.floor(time / 60 / 24 / 30) === 1
                            ? "month"
                            : "months"
                    }
                </span>
            </div>
            <div class="days">
                ${Math.floor(time / 60 / 24) % 30}
                <span>
                    ${Math.floor(time / 60 / 24) % 30 === 1 ? "day" : "days"}
                </span>
            </div>
            <div class="hours">
                ${Math.floor(time / 60) % 24}
                <span>
                    ${Math.floor(time / 60) % 24 === 1 ? "hour" : "hours"}
                </span>
            </div>
            <div class="minutes">
                ${Math.floor(time) % 60}
                <span>
                    ${Math.floor(time) % 60 === 1 ? "minute" : "minutes"}
                </span>
            </div>
        `;
    }
}

export default new ProfileView();
