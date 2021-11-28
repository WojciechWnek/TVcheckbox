import * as model from "./model.js";
import showContentView from "./showContentView.js";
import searchView from "./searchView.js";

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
        const query = searchView.getQuery();
        if (!query) return;

        await model.loadSearchResults(query);
        console.log(model.state.search.results);
    } catch (err) {
        console.log(err);
    }
};

const init = function () {
    showContentView.addHandlerRender(controlShowContent);
    searchView.addHandlerSearch(controlSearchResults);
};
init();
