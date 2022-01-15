import * as model from "./model.js";
import showContentView from "./showContentView.js";
import searchView from "./searchView.js";
import resultsView from "./resultsView.js";
import paginationView from "./paginationView.js";
import profileView from "./profileView.js";
import sortView from "./sortView.js";

const controlShowContent = async function () {
    try {
        const composite_id = window.location.hash.slice(1);

        if (!composite_id || composite_id === "profile") return;
        showContentView.renderSpinner();

        //0 update results view to mark selected show
        resultsView.update(model.getSearchResultsPage());

        //1 load data
        await model.loadShow(composite_id);

        //2 render data

        showContentView.render(model.state.show);
    } catch (err) {
        showContentView.renderError(`${err}`);
    }
};

const controlSearchResults = async function (oldQuery = "") {
    try {
        let query = searchView.getQuery();
        if (!query || (query !== oldQuery && oldQuery !== ""))
            query = model.state.search.query;
        if (!query) return;

        resultsView.renderSpinner();

        await model.loadSearchResults(query, model.state);

        resultsView.render(model.getSearchResultsPage());

        if (model.state.search.results.length === 0) return;

        sortView.render(model.state.search);

        paginationView.render(model.state.search);
    } catch (err) {
        showContentView.renderError(`${err}`);
    }
};

const controlProfile = function () {
    try {
        const id = window.location.hash.slice(1);

        if (id !== "profile") return;

        profileView.renderSpinner();

        if (!Object.values(model.state.bookmarks).some((arr) => arr.length > 0))
            throw profileView.errorMessage;

        profileView.render(model.state.bookmarks);
    } catch (err) {
        showContentView.renderError(`${err}`);
    }
};

const controlAddBookmark = async function (bookmarkStatus) {
    try {
        if (model.state.show.bookmarked !== bookmarkStatus) {
            model.deleteBookmark(model.state.show.composite_id, bookmarkStatus);
            model.addBookmark(model.state.show, bookmarkStatus);
        } else {
            model.deleteBookmark(model.state.show.composite_id, bookmarkStatus);
        }

        showContentView.update(model.state.show);

        if (!model.state.search.query) return;
        await model.loadSearchResults(model.state.search.query, model.state);
        resultsView.render(model.getSearchResultsPage());

        paginationView.render(model.state.search);
    } catch (err) {
        showContentView.renderError(`${err}`);
    }
};

const controlSort = function (sortBy) {
    model.state.search.page = 1;
    if (sortBy === model.state.search.sorted) {
        sortBy = "";
        controlSearchResults(model.state.search.query);
    }

    model.state.search.sorted = sortBy;
    model.sortResults(model.state.search.results, sortBy);

    sortView.update(model.state.search);
    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
};

const controlPagination = function (goToPage) {
    resultsView.render(model.getSearchResultsPage(goToPage));
    paginationView.render(model.state.search);
};

const init = function () {
    showContentView.addHandlerRender(controlShowContent);
    profileView.addHandlerRenderProfile(controlProfile);
    showContentView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    sortView.addHandlerSort(controlSort);
    paginationView.addHandlerClick(controlPagination);
};
init();
