import * as model from "./model.js";
import showContentView from "./showContentView.js";
import searchView from "./searchView.js";
import resultsView from "./resultsView.js";
import paginationView from "./paginationView.js";
import profileView from "./profileView.js";

const controlShowContent = async function () {
    try {
        const composite_id = window.location.hash.slice(1);

        if (!composite_id || composite_id === "profile") return;
        showContentView.renderSpinner();

        //0 update results view to matk selected show
        resultsView.update(model.getSearchResultsPage());

        //1 load data
        await model.loadShow(composite_id);
        // const show = model.state.show;

        //2 render data

        showContentView.render(model.state.show);
        // console.log(model.state);
    } catch (err) {
        showContentView.renderError(`${err}`);
    }
};

const controlSearchResults = async function () {
    try {
        resultsView.renderSpinner();

        const query = searchView.getQuery();
        if (!query) return;
        // ////////////////////////////////  added V
        await model.loadSearchResults(query, model.state);
        // console.log(model.state.search.results);

        // resultsView.render(model.state.search.results);
        resultsView.render(model.getSearchResultsPage());

        paginationView.render(model.state.search);
    } catch (err) {
        showContentView.renderError(`${err}`);
    }
};

const controlPagination = function (goToPage) {
    resultsView.render(model.getSearchResultsPage(goToPage));
    paginationView.render(model.state.search);
};

const controlProfile = function () {
    try {
        const id = window.location.hash.slice(1);

        // console.log("controller", model.state.bookmarks);

        if (!id) return;
        profileView.renderSpinner();

        // transfer this code to model !!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (!Object.values(model.state.bookmarks).some((arr) => arr.length > 0))
            throw profileView.errorMessage;

        profileView.render(model.state.bookmarks);
    } catch (err) {
        showContentView.renderError(`${err}`);
    }
};

const controlAddBookmark = function (bookmarkStatus) {
    if (model.state.show.bookmarked !== bookmarkStatus) {
        // console.log(model.state.show.composite_id);
        model.deleteBookmark(model.state.show.composite_id, bookmarkStatus);
        model.addBookmark(model.state.show, bookmarkStatus);
    } else {
        model.deleteBookmark(model.state.show.composite_id, bookmarkStatus);
    }

    showContentView.update(model.state.show);
    // resultsView.update(model.state.search.results);
};

const init = function () {
    showContentView.addHandlerRender(controlShowContent);
    profileView.addHandlerRenderProfile(controlProfile);
    showContentView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
};
init();

// const cl = function () {
//     const { toWatch, watching, watched } = model.state.bookmarks;
//     const states = [...toWatch, ...watching, ...watched];
//     console.log("towatch:", toWatch);
//     console.log("watching:", watching);
//     console.log("watched:", watched);
//     console.log("all", ...toWatch, ...watching, ...watched);
//     console.log("obj", model.state.bookmarks);
//     console.log("states", states);
// };
// cl();
