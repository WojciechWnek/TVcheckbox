class SearchView {
    _parentElement = document.querySelector(".search");
    _errorMessage = "Try putting something in the input field.";

    getQuery() {
        const query = this._parentElement.querySelector(".search__field").value;
        this._clearInput();
        if (query == "") throw this._errorMessage;
        // const query = "";
        // const query = "avatar the last airbender";
        return query.trim();
        // return query;
    }

    _clearInput() {
        this._parentElement.querySelector(".search__field").value = "";
    }

    addHandlerSearch(handler) {
        this._parentElement.addEventListener("submit", function (e) {
            e.preventDefault();
            handler();
        });
    }
}

export default new SearchView();
