import {API_KEY, API_URL} from './config.js'

const REQUEST = API_URL + 'discover/movie?sort_by=popularity.desc&' + API_KEY;

const test = 'https://api.themoviedb.org/3/movie/550?api_key=6b51cc23bca4d4e7532b1fc9c8c8f576'

// function getMovie(url){
//     fetch(url).then(res => res.json()).then(data => {
//         console.log(data);
//     })
// }

// getMovie(test);


const getMovie = async function(url){
    const res = await fetch(url);
    const data = await res.json();

    // const {movieData} = data
    const movieData={
        id: data.id,
        title: data.original_title,
        overview: data.overview,
        runtime: data.runtime,
        score: data.vote_average,
        date: data.release_date,
        homepage: data.homepage,
        genres: data.genres
    }

    
    console.log(data);
}


const renderContent = await function(){

}

getMovie(test)

// const getJSON = async function(url){

//         const res = await fetch(url)
//         const data = await res.json();

// };

// const getMovie = async function(discover){
//     const data = await getJSON(API_URL + discover + '&' + API_KEY);
//     console.log(data);
// }

// getMovie(example);