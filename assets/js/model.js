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

export const loadShow = async function (id) {
    try {
        const data = await getJSON(`${API_URL}movie/${id}?${API_KEY}`);

        state.show = {
            id: data.id,
            title: data.original_title,
            overview: data.overview,
            runtime: data.runtime,
            score: data.vote_average,
            date: data.release_date,
            homepage: data.homepage,
            genres: data.genres,
            image: data.poster_path,
        };

        if (state.bookmarks.toWatch.some((bookmark) => bookmark.id === +id)) {
            state.show.bookmarked = "toWatch";
        } else {
            state.show.bookmarked = "";
        }
    } catch (err) {
        throw err;
    }
};

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await getJSON(
            `${API_URL}search/multi?${API_KEY}&query=${query}`
        );
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1MI

        state.search.results = [];
        state.search.page = 1;

        for (let page = 1; page <= data.total_pages; page++) {
            const dataNext = await getJSON(
                `${API_URL}search/multi?${API_KEY}&query=${query}&page=${page}`
            );

            state.search.results.push(
                ...dataNext.results.map((show) => {
                    return {
                        id: show.id,
                        adult: show.adult,
                        title:
                            show.original_title ||
                            show.title ||
                            show.name ||
                            show.origina_name,
                        overview: show.overview,
                        mediaType: show.media_type,
                        score: show.vote_average,
                        date: show.release_date,
                        popularity: show.popularity,
                        image: show.poster_path || show.profile_path,
                    };
                })
            );
        }
    } catch (err) {
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

export const addBookmark = function (show) {
    //add bookmark
    state.bookmarks.toWatch.push(show);

    //mark current show as bookmarked
    if (show.id === state.show.id) state.show.bookmarked = "toWatch";
    persistBookmarks();
};

export const deleteBookmark = function (id) {
    //Delete bookmark
    const index = state.bookmarks.toWatch.findIndex((el) => el.id === +id);
    state.bookmarks.toWatch.splice(index, 1);

    //mark current show as NOT bookmarked
    if (id === state.show.id) state.show.bookmarked = "";
    persistBookmarks();
};

const init = function () {
    const storage = localStorage.getItem("bookmarks");
    if (storage) state.bookmarks = JSON.parse(storage);
};

init();

// localStorage.clear("bookmarks");
