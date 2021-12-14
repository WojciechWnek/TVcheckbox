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
        // console.log(this._data);

        return `
            <div class="profile">
                <h1 class="profile__heading">Welcome to your profile</h1>
                <div class="profile__time">
                    <p>Aprox time spent watching</p>
                </div>
                <div class="profile__shows">
                    ${
                        this._data.toWatch.length > 0
                            ? `
                                <div class="status">
                                    <h4>To watch</h4>
                                    <ul class="status__list">
                                        ${this._data.toWatch
                                            .map(this._generateMarkupProfile)
                                            .join("")}
                                    </ul>
                                </div>`
                            : ""
                    }
                    ${
                        this._data.watching.length > 0
                            ? `
                                <div class="status">
                                    <h4>Watching</h4>
                                    <ul class="status__list">
                                        ${this._data.watching
                                            .map(this._generateMarkupProfile)
                                            .join("")}
                                    </ul>
                                </div>`
                            : ""
                    }
                    ${
                        this._data.watched.length > 0
                            ? `
                                <div class="status">
                                    <h4>Watched</h4>
                                    <ul class="status__list">
                                        ${this._data.watched
                                            .map(this._generateMarkupProfile)
                                            .join("")}
                                    </ul>
                                </div>`
                            : ""
                    }                   
                </div>
            </div>
        `;
    }

    _generateMarkupProfile(res) {
        // console.log("profile", res);

        return `  
            <li class="show">
                <img class="show__image"src="${API_IMAGE_PATH}${res.image}" alt="${res.title}">
            </li>
        `;
    }
}

export default new ProfileView();

/*

<nav class="nav">
<ul class="nav__list">
    <li class="nav__item">
        <button class="nav__btn nav__btn--to_watch">
            <!-- <span>To watch</span> -->
            <img
                class="nav__icon"
                src="assets/img/pending.svg"
                alt="Movies to watch"
            />
        </button>
        <!-- <div class="bookmarks">
        <ul class="bookmarks__list">
            <div class="message">
                <div>
                <svg>
                    <use href="src/img/icons.svg#icon-smile"></use>
                </svg>
                </div>
                <p>
                No bookmarks yet. Find a nice recipe and bookmark it :)
                </p>
            </div>
        </ul>
    </div> -->
    </li>
    <li class="nav__item">
        <button class="nav__btn nav__btn--watching">
            <!-- <span>Watching</span> -->
            <img
                class="nav__icon"
                src="assets/img/in_progress.svg"
                alt="Currently watching"
            />
        </button>
        <!-- <div class="bookmarks">
        <ul class="bookmarks__list">
            <div class="message">
                <div>
                <svg>
                    <use href="src/img/icons.svg#icon-smile"></use>
                </svg>
                </div>
                <p>
                No bookmarks yet. Find a nice recipe and bookmark it :)
                </p>
            </div>
        </ul>
    </div> -->
    </li>
    <li class="nav__item">
        <button class="nav__btn nav__btn--watched">
            <!-- <span>Watched</span> -->
            <img
                class="nav__icon"
                src="assets/img/check.svg"
                alt="Watched shows"
            />
        </button>
        <!-- <div class="bookmarks">
        <ul class="bookmarks__list">
            <div class="message">
                <div>
                <svg>
                    <use href="src/img/icons.svg#icon-smile"></use>
                </svg>
                </div>
                <p>
                No bookmarks yet. Find a nice recipe and bookmark it :)
                </p>
            </div>
        </ul>
    </div> -->
    </li>
</ul>
</nav>

*/
