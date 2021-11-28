import { API_IMAGE_PATH } from "./config.js";

class ShowContentView {
    #parentElement = document.querySelector(".content");
    #data;

    render(data) {
        this.#data = data;
        const markup = this._generateMarkup();
        this._clear();
        this.#parentElement.insertAdjacentHTML("afterbegin", markup);
        // console.log(this.#data.title);
    }

    _clear() {
        this.#parentElement.innerHTML = "";
    }

    _generateMarkup() {
        return `
        <img class="content__poster" src="${API_IMAGE_PATH}${
            this.#data.image
        }" alt="${this.#data.title}">

        <h1 class="content__title">${this.#data.title}</h1>
        <p class="content__overview">
            ${this.#data.overview}
        </p>
        `;
    }

    renderSpinner() {
        const markup = `
            <div class="spinner">
                <div class="rod"></div>
                <div class="rod"></div>
            </div>
        `;
        this._clear();
        this.#parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    renderError(message) {
        const markup = `
            <div class="error">
                <div>
                    <img 
                        class="error__icon"
                        src="assets/img/error.svg"
                        alt="Error"
                    />
                </div>
                <p>${message}</p>
            </div>
        `;
        this._clear();
        this.#parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    addHandlerRender(handler) {
        ["hashchange", "load"].forEach((event) =>
            window.addEventListener(event, handler)
        );
    }
}

export default new ShowContentView();
