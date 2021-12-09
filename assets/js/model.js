import { API_KEY, API_URL, RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
    show: {},
    search: {
        query: "",
        results: [],
        resultsPerPage: RES_PER_PAGE,
        page: 1,
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
        // console.log(data);
        // console.log(state.show);
        // console.log(res);
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
        console.log(data);
        console.log(`${API_URL}search/multi?${API_KEY}&query=${query}`);

        state.search.results = data.results.map((show) => {
            return {
                id: show.id,
                adult: show.adult,
                title: show.original_title,
                overview: show.overview,
                mediaType: show.media_type,
                score: show.vote_average,
                date: show.release_date,
                popularity: show.popularity,
                image: show.poster_path,
            };
        });
        // console.log(state.search.results);
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
