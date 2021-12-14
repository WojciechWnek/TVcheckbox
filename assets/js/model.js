import { API_KEY, API_URL, RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
    show: {},
    search: {
        query: "",
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks: {
        toWatch: [],
        watching: [],
        watched: [],
    },
};

/**
 * Featching data from the webAPI
 * @param {string} path String containing media type and its id
 */
export const loadShow = async function (path) {
    try {
        const data = await getJSON(`${API_URL}${path}?${API_KEY}`);

        state.show = {
            ...data,
            bookmarked: "",
            media_type: path.substring(0, path.indexOf("/")),
            composite_id: path,
        };

        // console.log(state.show);

        // if (state.bookmarks.toWatch.some((bookmark) => bookmark.id === +id)) {
        //     state.show.bookmarked = "toWatch";
        // } else {
        //     state.show.bookmarked = "";
        // }
        console.log(state.search.results[0]);
        console.log(state.bookmarks);
    } catch (err) {
        throw err;
    }
};
/////////////////////////////////////////////////  added  V
export const loadSearchResults = async function (query, state) {
    try {
        state.search.query = query;
        const data = await getJSON(
            `${API_URL}search/multi?${API_KEY}&query=${query}`
        );

        state.search.results = [];
        state.search.page = 1;

        for (let page = 1; page <= data.total_pages; page++) {
            const data = await getJSON(
                `${API_URL}search/multi?${API_KEY}&query=${query}&page=${page}`
            );

            state.search.results.push(
                ...data.results.map((result) => {
                    return {
                        ...result,
                        composite_id: result.media_type + "/" + result.id,
                        //////////////////////////// pokombinować z bookmarks{}
                        // bookmarked: state.show.bookmarked,
                    };
                })
            );
        }
        console.log(state.search.results[0]);
        console.log(state.bookmarks);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start, end);
};

const persistBookmarks = function () {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (show, bookmarkStatus) {
    //add bookmark
    if (bookmarkStatus === "toWatch") {
        state.bookmarks.toWatch.push(show);
        if (show.composite_id === state.show.composite_id)
            state.show.bookmarked = bookmarkStatus;
    }
    if (bookmarkStatus === "watching") {
        state.bookmarks.watching.push(show);
        if (show.composite_id === state.show.composite_id)
            state.show.bookmarked = bookmarkStatus;
    }
    if (bookmarkStatus === "watched") {
        state.bookmarks.watched.push(show);
        if (show.composite_id === state.show.composite_id)
            state.show.bookmarked = bookmarkStatus;
    }
    persistBookmarks();
};

export const deleteBookmark = function (composite_id, bookmarkStatus) {
    //Delete bookmark
    // console.log(composite_id, bookmarkStatus);
    console.log(state.show);

    // /////////////////////////////////
    // console.log(state.bookmarks);
    for (const arr in state.bookmarks) {
        // console.log(state.bookmarks[arr]);
        const index = state.bookmarks[arr].findIndex(
            (el) => el.composite_id === composite_id
        );
        console.log("Przed ucięciem", state.bookmarks[arr]);

        state.bookmarks[arr].splice(index, 1);
        console.log("Po ucięciu", state.bookmarks[arr]);
    }
    console.log(state.show);

    // let index;
    // index = state.bookmarks.toWatch.findIndex((el) => el.id === +id);
    // state.bookmarks.toWatch.splice(index, 1);
    // index = state.bookmarks.watching.findIndex((el) => el.id === +id);
    // state.bookmarks.watching.splice(index, 1);
    // index = state.bookmarks.watched.findIndex((el) => el.id === +id);
    // state.bookmarks.watched.splice(index, 1);

    //mark current show as NOT bookmarked
    if (composite_id === state.show.composite_id) state.show.bookmarked = "";
    persistBookmarks();
};

const init = function () {
    const storage = localStorage.getItem("bookmarks");
    if (storage) state.bookmarks = JSON.parse(storage);
};

init();

// localStorage.clear("bookmarks");
