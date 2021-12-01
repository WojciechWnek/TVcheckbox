export default class View {
    _data;

    render(data) {
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    _clear() {
        this._parentElement.innerHTML = "";
    }

    renderSpinner() {
        const markup = `
            <div class="spinner">
                <div class="rod"></div>
                <div class="rod"></div>
            </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
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
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
}
