import * as model from "./model.js";
import showContentView from "./showContentView.js";
import searchView from "./searchView.js";
import resultsView from "./resultsView.js";
import paginationView from "./paginationView.js";

const controlShowContent = async function () {
    try {
        const id = window.location.hash.slice(1);

        if (!id) return;
        showContentView.renderSpinner();

        //1 load data
        await model.loadShow(id);
        const show = model.state.show;

        //2 render data

        showContentView.render(model.state.show);
    } catch (err) {
        showContentView.renderError(`${err}`);
    }
};

const controlSearchResults = async function () {
    try {
        resultsView.renderSpinner();

        const query = searchView.getQuery();
        if (!query) return;

        await model.loadSearchResults(query);
        // console.log(model.state.search.results);

        // resultsView.render(model.state.search.results);
        resultsView.render(model.getSearchResultsPage());

        paginationView.render(model.state.search);
    } catch (err) {
        console.log(err);
    }
};

const controlPagination = function (goToPage) {
    resultsView.render(model.getSearchResultsPage(goToPage));
    paginationView.render(model.state.search);
};

const init = function () {
    showContentView.addHandlerRender(controlShowContent);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
};
init();
