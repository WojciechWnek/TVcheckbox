import { API_KEY, API_URL, RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
    show: {},
    search: {
        query: "",
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
        sorted: "",
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

        for (const arr in state.bookmarks) {
            if (
                state.bookmarks[arr].some(
                    (bookmark) => bookmark.composite_id === path
                )
            ) {
                state.show.bookmarked = arr;
                break;
            } else {
                state.show.bookmarked = "";
            }
        }
    } catch (err) {
        throw err;
    }
};

export const loadSearchResults = async function (query, state) {
    try {
        if (state.search.query !== query) state.search.page = 1;
        // if (query === "")

        state.search.query = query;
        const data = await getJSON(
            `${API_URL}search/multi?${API_KEY}&query=${query}`
        );

        state.search.results = [];

        for (let page = 1; page <= data.total_pages; page++) {
            const data = await getJSON(
                `${API_URL}search/multi?${API_KEY}&query=${query}&page=${page}`
            );

            state.search.results.push(
                ...data.results.map((result) => {
                    for (const arr in state.bookmarks) {
                        if (
                            state.bookmarks[arr].some(
                                (bookmark) =>
                                    bookmark.composite_id ===
                                    result.media_type + "/" + result.id
                            )
                        ) {
                            result.bookmarked = arr;
                            break;
                        } else {
                            result.bookmarked = "";
                        }
                    }
                    return {
                        ...result,
                        composite_id: result.media_type + "/" + result.id,
                        vote_average: result.vote_average
                            ? result.vote_average
                            : 0,
                    };
                })
            );
        }

        sortResults(state.search.results, state.search.sorted);
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

export const deleteBookmark = function (composite_id) {
    //Delete bookmark

    for (const arr in state.bookmarks) {
        const index = state.bookmarks[arr].findIndex(
            (el) => el.composite_id === composite_id
        );

        if (index >= 0) state.bookmarks[arr].splice(index, 1);
    }

    //mark current show as NOT bookmarked
    if (composite_id === state.show.composite_id) state.show.bookmarked = "";
    persistBookmarks();
};

export const sortResults = function (results, sortedBy) {
    switch (sortedBy) {
        case "scoreDesc":
            return results.sort(
                (showOne, showTwo) =>
                    showTwo.vote_average - showOne.vote_average
            );
        case "scoreAsc":
            return results.sort(
                (showOne, showTwo) =>
                    showOne.vote_average - showTwo.vote_average
            );
        case "popularityAsc":
            return results.sort(
                (showOne, showTwo) => showOne.popularity - showTwo.popularity
            );
        case "popularityDesc":
            return results.sort(
                (showOne, showTwo) => showTwo.popularity - showOne.popularity
            );
        case "alphaAsc":
            return results.sort((showOne, showTwo) => {
                const showOneTitle = showOne.title
                    ? showOne.title.toLowerCase()
                    : showOne.name.toLowerCase();
                const showTwoTitle = showTwo.title
                    ? showTwo.title.toLowerCase()
                    : showTwo.name.toLowerCase();

                if (showOneTitle < showTwoTitle) return -1;
                if (showOneTitle > showTwoTitle) return 1;
                return 0;
            });
        case "alphaDesc":
            return results.sort((showOne, showTwo) => {
                const showOneTitle = showOne.title
                    ? showOne.title.toLowerCase()
                    : showOne.name.toLowerCase();
                const showTwoTitle = showTwo.title
                    ? showTwo.title.toLowerCase()
                    : showTwo.name.toLowerCase();

                if (showTwoTitle < showOneTitle) return -1;
                if (showTwoTitle > showOneTitle) return 1;
                return 0;
            });
        default:
            return results;
    }
};

const init = function () {
    const storage = localStorage.getItem("bookmarks");
    if (storage) state.bookmarks = JSON.parse(storage);
};

init();

// localStorage.clear("bookmarks");
